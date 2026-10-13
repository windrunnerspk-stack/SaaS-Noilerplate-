import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Ajustes de Cuenta",
  description: "Administra los detalles de tu cuenta de usuario.",
}

export default async function SettingsDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="border-b border-border pb-4">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
          Ajustes de Cuenta
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configura tus datos personales y credenciales de acceso.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Nombre de Usuario
          </label>
          <input
            type="text"
            defaultValue={user.name || ""}
            placeholder="Tu nombre"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            disabled
            defaultValue={user.email || ""}
            className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            El correo electrónico no puede ser modificado directamente.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}
