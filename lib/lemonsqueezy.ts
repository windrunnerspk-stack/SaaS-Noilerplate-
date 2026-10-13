import crypto from "crypto"

/**
 * =============================================================================
 * LEMON SQUEEZY CONFIGURATION & HELPERS
 * =============================================================================
 * Este módulo inicializa y encapsula la interacción con la API de Lemon Squeezy.
 * Funciona tanto con llamadas directas autenticadas como con el SDK oficial
 * @lemonsqueezy/lemonsqueezy.js
 */

export const LEMONSQUEEZY_API_URL = "https://api.lemonsqueezy.com/v1"

export const lemonSqueezyConfig = {
  apiKey: process.env.LEMONSQUEEZY_API_KEY || "",
  storeId: process.env.LEMONSQUEEZY_STORE_ID || "",
  webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
}

/**
 * Valida que las variables de entorno de Lemon Squeezy estén configuradas.
 */
export function validateLemonSqueezyEnv() {
  const missing: string[] = []
  if (!lemonSqueezyConfig.apiKey) missing.push("LEMONSQUEEZY_API_KEY")
  if (!lemonSqueezyConfig.storeId) missing.push("LEMONSQUEEZY_STORE_ID")
  if (!lemonSqueezyConfig.webhookSecret) missing.push("LEMONSQUEEZY_WEBHOOK_SECRET")

  if (missing.length > 0) {
    console.warn(`[Lemon Squeezy] Advertencia: Variables faltantes: ${missing.join(", ")}`)
  }
}

/**
 * Cliente HTTP base para realizar peticiones autenticadas a Lemon Squeezy.
 */
export async function lemonSqueezyFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY

  if (!apiKey) {
    throw new Error("Missing LEMONSQUEEZY_API_KEY environment variable.")
  }

  const response = await fetch(`${LEMONSQUEEZY_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Lemon Squeezy API error (${response.status}): ${errorText}`
    )
  }

  return response.json()
}

/**
 * Genera una URL de checkout para una variante/plan específico.
 */
export async function createLemonSqueezyCheckout({
  variantId,
  userEmail,
  userId,
  redirectUrl,
}: {
  variantId: string
  userEmail: string
  userId: string
  redirectUrl?: string
}) {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID

  if (!storeId) {
    throw new Error("Missing LEMONSQUEEZY_STORE_ID in environment variables.")
  }

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email: userEmail,
          custom: {
            user_id: userId,
          },
        },
        product_options: {
          redirect_url: redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing`,
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: storeId.toString(),
          },
        },
        variant: {
          data: {
            type: "variants",
            id: variantId.toString(),
          },
        },
      },
    },
  }

  const result = await lemonSqueezyFetch<{ data: { attributes: { url: string } } }>(
    "/checkouts",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )

  return result.data.attributes.url
}

/**
 * Obtiene la URL del portal del cliente (Billing Portal) para gestionar la suscripción.
 */
export async function getCustomerPortalUrl(customerId: string): Promise<string | null> {
  try {
    const customer = await lemonSqueezyFetch<{
      data: { attributes: { urls?: { customer_portal?: string } } }
    }>(`/customers/${customerId}`)

    return customer.data.attributes.urls?.customer_portal || null
  } catch (error) {
    console.error("Error al obtener portal de Lemon Squeezy:", error)
    return null
  }
}

/**
 * Verifica la firma criptográfica HMAC-SHA256 del webhook recibido.
 */
export function verifyLemonSqueezyWebhookSignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string
  signature: string
  secret: string
}): boolean {
  if (!signature || !secret) return false

  const hmac = crypto.createHmac("sha256", secret)
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8")
  const signatureBuffer = Buffer.from(signature, "utf8")

  if (digest.length !== signatureBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(digest, signatureBuffer)
}
