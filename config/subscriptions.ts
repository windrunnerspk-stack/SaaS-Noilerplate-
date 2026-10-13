export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  lemonSqueezyVariantId: string
  price: string
  interval: "month" | "year"
  features: string[]
}

export const freePlan: SubscriptionPlan = {
  id: "free",
  name: "Gratuito",
  description: "Plan de inicio para proyectos personales y pruebas.",
  lemonSqueezyVariantId: "",
  price: "$0",
  interval: "month",
  features: [
    "Hasta 3 proyectos",
    "Hasta 10 tareas por proyecto",
    "Soporte estándar de la comunidad",
    "Acceso a temas visuales",
  ],
}

export const proPlan: SubscriptionPlan = {
  id: "pro",
  name: "PRO Ilimitado",
  description: "Para desarrolladores y equipos que construyen SaaS sin restricciones.",
  lemonSqueezyVariantId: process.env.LEMONSQUEEZY_PRO_VARIANT_ID || "variant_pro_123",
  price: "$19",
  interval: "month",
  features: [
    "Proyectos ilimitados",
    "Tareas y subtareas ilimitadas",
    "Webhooks y automatizaciones",
    "Portal de facturación de Lemon Squeezy",
    "Soporte prioritario",
    "3 Temas visuales avanzados",
  ],
}

export const subscriptionPlans = [freePlan, proPlan]
