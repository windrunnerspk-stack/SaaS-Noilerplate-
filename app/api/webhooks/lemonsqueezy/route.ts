import { headers } from "next/headers"
import { db } from "@/lib/db"
import { verifyLemonSqueezyWebhookSignature } from "@/lib/lemonsqueezy"

export const runtime = "nodejs"

/**
 * =============================================================================
 * LEMON SQUEEZY WEBHOOK ROUTE HANDLER (Next.js 14 App Router)
 * =============================================================================
 * Ruta: /api/webhooks/lemonsqueezy
 * Método: POST
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const headersList = await headers()
    const signature = headersList.get("x-signature") || ""
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ""

    if (!secret) {
      console.error("[Lemon Squeezy Webhook] Error: LEMONSQUEEZY_WEBHOOK_SECRET no configurada.")
      return new Response("Webhook secret not configured", { status: 500 })
    }

    // 1. Verificación Criptográfica de la Firma (HMAC-SHA256)
    const isValidSignature = verifyLemonSqueezyWebhookSignature({
      rawBody,
      signature,
      secret,
    })

    if (!isValidSignature) {
      console.warn("[Lemon Squeezy Webhook] Firma inválida detectada.")
      return new Response("Invalid signature", { status: 401 })
    }

    // 2. Parseo del Evento
    const payload = JSON.parse(rawBody)
    const eventName = payload?.meta?.event_name as string
    const customData = payload?.meta?.custom_data || {}
    const attributes = payload?.data?.attributes || {}

    console.log(`[Lemon Squeezy Webhook] Procesando evento: ${eventName}`)

    // El userId puede venir en custom_data (enviado en el checkout) o buscarse por email
    const customUserId = customData?.user_id as string | undefined
    const customerEmail = (attributes?.user_email || attributes?.customer_email) as string | undefined

    // 3. Manejo de Eventos de Suscripción
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed": {
        const customerId = String(attributes?.customer_id)
        const subscriptionId = String(payload?.data?.id)
        const variantId = String(attributes?.variant_id)
        const status = attributes?.status as string
        const currentPeriodEnd = attributes?.renews_at
          ? new Date(attributes.renews_at)
          : attributes?.ends_at
          ? new Date(attributes.ends_at)
          : null

        // Buscar usuario por ID custom o por correo electrónico
        let userToUpdate = null
        if (customUserId) {
          userToUpdate = await db.user.findUnique({
            where: { id: customUserId },
          })
        }

        if (!userToUpdate && customerEmail) {
          userToUpdate = await db.user.findUnique({
            where: { email: customerEmail },
          })
        }

        if (!userToUpdate) {
          console.warn(`[Lemon Squeezy Webhook] Usuario no encontrado para: ${customUserId || customerEmail}`)
          return new Response("User not found for subscription", { status: 200 })
        }

        // Actualizar datos de suscripción en Prisma
        await db.user.update({
          where: { id: userToUpdate.id },
          data: {
            lemonSqueezyCustomerId: customerId,
            lemonSqueezySubscriptionId: subscriptionId,
            lemonSqueezyVariantId: variantId,
            lemonSqueezyPriceId: variantId,
            lemonSqueezyCurrentPeriodEnd: currentPeriodEnd,
            lemonSqueezyStatus: status,
          },
        })

        console.log(`[Lemon Squeezy Webhook] Suscripción actualizada con éxito para el usuario ${userToUpdate.id}`)
        break
      }

      case "subscription_cancelled": {
        const subscriptionId = String(payload?.data?.id)
        const status = attributes?.status || "cancelled"
        const currentPeriodEnd = attributes?.ends_at ? new Date(attributes.ends_at) : null

        const existingUser = await db.user.findFirst({
          where: { lemonSqueezySubscriptionId: subscriptionId },
        })

        if (existingUser) {
          await db.user.update({
            where: { id: existingUser.id },
            data: {
              lemonSqueezyStatus: status,
              lemonSqueezyCurrentPeriodEnd: currentPeriodEnd,
            },
          })
          console.log(`[Lemon Squeezy Webhook] Suscripción cancelada para el usuario ${existingUser.id}`)
        }
        break
      }

      case "subscription_expired": {
        const subscriptionId = String(payload?.data?.id)

        const existingUser = await db.user.findFirst({
          where: { lemonSqueezySubscriptionId: subscriptionId },
        })

        if (existingUser) {
          await db.user.update({
            where: { id: existingUser.id },
            data: {
              lemonSqueezyStatus: "expired",
              lemonSqueezyCurrentPeriodEnd: null,
            },
          })
          console.log(`[Lemon Squeezy Webhook] Suscripción expirada para el usuario ${existingUser.id}`)
        }
        break
      }

      case "order_created": {
        // Soporte adicional: Compras de un solo pago (Lifetime / Pago Único)
        const isSuccessful = attributes?.status === "paid"
        if (isSuccessful && (customUserId || customerEmail)) {
          const user = customUserId
            ? await db.user.findUnique({ where: { id: customUserId } })
            : await db.user.findUnique({ where: { email: customerEmail } })

          if (user) {
            await db.user.update({
              where: { id: user.id },
              data: {
                lemonSqueezyCustomerId: String(attributes?.customer_id),
                lemonSqueezyStatus: "active_lifetime",
              },
            })
          }
        }
        break
      }

      default:
        console.log(`[Lemon Squeezy Webhook] Evento no controlado: ${eventName}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("[Lemon Squeezy Webhook Error]:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
