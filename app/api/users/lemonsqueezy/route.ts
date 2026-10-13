import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createLemonSqueezyCheckout, getCustomerPortalUrl } from "@/lib/lemonsqueezy"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { proPlan } from "@/config/subscriptions"

export const runtime = "nodejs"

/**
 * =============================================================================
 * GENERADOR DE SESIÓN DE PAGO / PORTAL DE LEMON SQUEEZY
 * =============================================================================
 * GET /api/users/lemonsqueezy
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email || !session?.user.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    // 1. Si el usuario ya es PRO y tiene customer ID, redirigir a su Portal de Cliente
    if (subscriptionPlan.isPro && subscriptionPlan.lemonSqueezyCustomerId) {
      const portalUrl = await getCustomerPortalUrl(subscriptionPlan.lemonSqueezyCustomerId)

      if (portalUrl) {
        return new Response(JSON.stringify({ url: portalUrl }))
      }
    }

    // 2. Si no es PRO o no tiene portal, generar una URL de Checkout
    const variantId =
      process.env.LEMONSQUEEZY_PRO_VARIANT_ID || proPlan.lemonSqueezyVariantId

    if (!variantId) {
      return new Response(
        JSON.stringify({ error: "LEMONSQUEEZY_PRO_VARIANT_ID no configurada" }),
        { status: 500 }
      )
    }

    const checkoutUrl = await createLemonSqueezyCheckout({
      variantId,
      userEmail: session.user.email,
      userId: session.user.id,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing`,
    })

    return new Response(JSON.stringify({ url: checkoutUrl }))
  } catch (error: any) {
    console.error("[Lemon Squeezy Checkout Route Error]:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500 }
    )
  }
}
