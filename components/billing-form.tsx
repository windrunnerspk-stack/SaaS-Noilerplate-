"use client"

import * as React from "react"
import { Loader2, Zap, ExternalLink } from "lucide-react"

import { UserSubscriptionPlan } from "@/lib/subscription"

interface BillingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  subscriptionPlan: UserSubscriptionPlan
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onUpgradeOrManage(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/lemonsqueezy")

      if (!response.ok) {
        throw new Error("Error al comunicarse con Lemon Squeezy")
      }

      const session = await response.json()
      if (session?.url) {
        window.location.href = session.url
      }
    } catch (error) {
      console.error(error)
      alert("Hubo un problema al conectar con Lemon Squeezy. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const formattedPeriodEnd = subscriptionPlan.lemonSqueezyCurrentPeriodEnd
    ? new Date(subscriptionPlan.lemonSqueezyCurrentPeriodEnd).toLocaleDateString("es-ES", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="space-y-1 mb-4">
        <h3 className="text-xl font-bold tracking-tight">Plan de Suscripción</h3>
        <p className="text-sm text-muted-foreground">
          Actualmente estás en el plan <strong>{subscriptionPlan.name}</strong>.
        </p>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        {subscriptionPlan.description}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
        <button
          onClick={onUpgradeOrManage}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4" />
          )}
          {subscriptionPlan.isPro ? "Gestionar en Lemon Squeezy" : "Mejorar a PRO ($19/mes)"}
        </button>

        {subscriptionPlan.isPro && formattedPeriodEnd && (
          <p className="text-xs text-muted-foreground">
            {subscriptionPlan.isCanceled
              ? `Tu plan expirará el ${formattedPeriodEnd}`
              : `Tu plan se renueva automáticamente el ${formattedPeriodEnd}`}
          </p>
        )}
      </div>
    </div>
  )
}
