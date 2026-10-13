import Link from "next/link"
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react"

import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Precios y Planes",
  description: "Planes transparentes para escalar tu proyecto con Lemon Squeezy.",
}

export default async function PricingPage() {
  const user = await getCurrentUser()

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter",
      badge: "Gratis para siempre",
      price: "$0",
      frequency: "/mes",
      description: "Ideal para desarrolladores independientes que quieren validar su MVP rápidamente.",
      featured: false,
      cta: user ? "Ir al Dashboard" : "Comenzar Gratis",
      href: user ? "/dashboard" : "/register",
      features: [
        "Hasta 3 Proyectos activos",
        "Hasta 25 Tareas por proyecto",
        "Autenticación con NextAuth.js",
        "1 Tema visual (SaaS Minimal)",
        "Soporte de la comunidad en Discord",
        "Actualizaciones estándar",
      ],
    },
    {
      id: "pro",
      name: "PRO Ilimitado",
      badge: "Más Popular",
      price: "$19",
      frequency: "/mes",
      description: "Todo lo que necesitas para escalar tu SaaS a miles de usuarios sin límites técnicos.",
      featured: true,
      cta: user ? "Mejorar con Lemon Squeezy" : "Suscribirse a PRO",
      // Si el usuario no está autenticado, lo redirige a /login para que primero cree o ingrese a su cuenta
      href: user ? "/api/users/lemonsqueezy" : "/login?from=/dashboard/billing",
      features: [
        "Proyectos ilimitados",
        "Tareas y subtareas ilimitadas",
        "Acceso completo a los 3 Temas (Minimal, Cyberpunk, Fintech)",
        "Facturación y Webhooks de Lemon Squeezy",
        "Portal de cliente autogestionado",
        "Exportación de datos y respaldos",
        "Soporte prioritario por email en < 24h",
        "Actualizaciones continuas de por vida",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "Equipos y Agencias",
      price: "$79",
      frequency: "/mes",
      description: "Para empresas y agencias que necesitan soporte de arquitectura dedicado y multi-tenant.",
      featured: false,
      cta: "Contactar Ventas",
      href: "mailto:support@example.com?subject=Interes%20en%20Plan%20Enterprise",
      features: [
        "Todo lo incluido en el Plan PRO",
        "Licencia ilimitada para proyectos de clientes",
        "Soporte 1-a-1 de arquitectura en Next.js 14",
        "Configuración personalizada de Webhooks",
        "Auditoría de seguridad para producción",
        "SLA garantizado del 99.9%",
      ],
    },
  ]

  return (
    <div className="container py-12 md:py-20 lg:py-24">
      {/* Encabezado */}
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Pagos seguros procesados por Lemon Squeezy
        </div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Precios simples, sin sorpresas
        </h1>
        <p className="max-w-[85%] text-muted-foreground sm:text-lg sm:leading-7">
          Elige el plan ideal para tu negocio. Cancela o cambia de plan en cualquier momento desde tu panel de facturación.
        </p>
      </div>

      {/* Grid de Tarjetas de Precios */}
      <div className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-3 lg:gap-8">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative flex flex-col justify-between rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md",
              tier.featured
                ? "border-primary ring-2 ring-primary/20 shadow-lg scale-105 z-10 bg-gradient-to-b from-card via-card to-card/90"
                : "border-border"
            )}
          >
            {tier.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm flex items-center gap-1">
                <Zap className="h-3 w-3" /> {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold">{tier.name}</h3>
                {!tier.featured && (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline">
                <span className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">
                  {tier.price}
                </span>
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  {tier.frequency}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <hr className="my-6 border-border" />

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Incluye:
                </p>
                <ul className="space-y-2.5 text-sm">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href={tier.href}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Garantía y Confianza */}
      <div className="mx-auto mt-16 max-w-[48rem] rounded-xl border border-border/80 bg-muted/40 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
          <Shield className="h-4 w-4 text-emerald-500" /> Facturación Segura con Lemon Squeezy
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Lemon Squeezy actúa como Comerciante Registrado (Merchant of Record). Todos los impuestos, facturas y pagos con tarjeta o PayPal se procesan de forma cifrada con cumplimiento PCI DSS.
        </p>
      </div>
    </div>
  )
}
