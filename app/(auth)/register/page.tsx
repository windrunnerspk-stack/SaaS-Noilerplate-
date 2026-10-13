import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail, Github, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description: "Crea tu cuenta en SaaS Boilerplate Premium",
}

export default function RegisterPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground md:left-8 md:top-8"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al Inicio
      </Link>

      {/* Panel lateral con propuesta de valor */}
      <div className="relative hidden h-full flex-col justify-between bg-zinc-900 p-10 text-white lg:flex border-r border-border">
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-xs">
            TX
          </div>
          <span>SaaS Boilerplate Premium</span>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" /> Todo incluido para tu SaaS
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Comienza a construir y monetizar tu proyecto hoy mismo.
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Autenticación segura, base de datos relacional con Prisma, pasarela de cobros con Lemon Squeezy y 3 temas visuales de alto valor percibido.
          </p>
        </div>

        <div className="text-[11px] text-zinc-500">
          © 2026 SaaS Boilerplate Premium. Todos los derechos reservados.
        </div>
      </div>

      {/* Formulario de Registro */}
      <div className="p-8 lg:p-12 w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Crear una Cuenta</h1>
            <p className="text-xs text-muted-foreground">
              Ingresa tus datos para empezar en cuestión de segundos
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-foreground" htmlFor="name">
                Nombre Completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Alex Morgan"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-foreground" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="alex@ejemplo.com"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Mail className="mr-2 h-4 w-4" /> Registrarse con Email
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O regístrate con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background py-2 text-xs font-semibold hover:bg-accent transition-colors"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background py-2 text-xs font-semibold hover:bg-accent transition-colors"
            >
              Google
            </button>
          </div>

          <p className="px-8 text-center text-xs text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Política de Privacidad
            </Link>
            .
          </p>

          <p className="px-8 text-center text-xs text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-semibold text-primary underline underline-offset-4 hover:opacity-80">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
