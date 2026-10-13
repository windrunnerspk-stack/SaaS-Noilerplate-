import { freePlan, proPlan, SubscriptionPlan } from "@/config/subscriptions"
import { db } from "@/lib/db"

export interface UserSubscriptionPlan extends SubscriptionPlan {
  lemonSqueezyCustomerId?: string | null
  lemonSqueezySubscriptionId?: string | null
  lemonSqueezyCurrentPeriodEnd?: number | null
  lemonSqueezyStatus?: string | null
  isPro: boolean
  isCanceled: boolean
}

/**
 * Obtiene el plan de suscripción actual de un usuario comprobando la base de datos de Prisma
 * y el estado de Lemon Squeezy.
 */
export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      lemonSqueezyCustomerId: true,
      lemonSqueezySubscriptionId: true,
      lemonSqueezyPriceId: true,
      lemonSqueezyVariantId: true,
      lemonSqueezyCurrentPeriodEnd: true,
      lemonSqueezyStatus: true,
    },
  })

  if (!user) {
    throw new Error("Usuario no encontrado")
  }

  // Comprobar si el usuario tiene un plan PRO activo
  const isActive =
    user.lemonSqueezyStatus === "active" ||
    user.lemonSqueezyStatus === "active_lifetime" ||
    user.lemonSqueezyStatus === "on_trial"

  const isWithinPeriod = user.lemonSqueezyCurrentPeriodEnd
    ? user.lemonSqueezyCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false

  const isPro = Boolean(isActive || isWithinPeriod)
  const isCanceled = user.lemonSqueezyStatus === "cancelled"

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    lemonSqueezyCustomerId: user.lemonSqueezyCustomerId,
    lemonSqueezySubscriptionId: user.lemonSqueezySubscriptionId,
    lemonSqueezyCurrentPeriodEnd: user.lemonSqueezyCurrentPeriodEnd?.getTime() || null,
    lemonSqueezyStatus: user.lemonSqueezyStatus,
    isPro,
    isCanceled,
  }
}
