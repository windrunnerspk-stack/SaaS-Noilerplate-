import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { BillingForm } from "@/components/billing-form"

export const metadata = {
  title: "Facturación y Suscripciones",
  description: "Gestiona tu suscripción procesada por Lemon Squeezy.",
}

export default async function BillingDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
          Facturación y Suscripción
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona tu plan activo procesado de forma segura a través de Lemon Squeezy.
        </p>
      </div>

      <div className="max-w-2xl">
        <BillingForm subscriptionPlan={subscriptionPlan} />
      </div>
    </div>
  )
}
