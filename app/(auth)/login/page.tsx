import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Command, Mail, Github } from "lucide-react"

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Ingresa a tu cuenta de SaaS Boilerplate",
}

export default function LoginPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground md:left-8 md:top-8"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al Inicio
      </Link>

      {/* Panel lateral con branding */}
      <div className="relative hidden h-full flex-col justify-between bg-zinc-900 p-10 text-white lg:flex border-r border-border">
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-xs">
            TX
          </div>
          <span>SaaS Boilerplate Premium</span>
        </div>

        <div className="space-y-2">
          <p className="text-base font-medium italic text-zinc-300">
            &ldquo;Este boilerplate nos ahorró más de 3 semanas de desarrollo y configuración de pagos. Pudimos lanzar y validar nuestro producto en tiempo récord.&rdquo;
          </p>
          <p className="text-xs text-zinc-500 font-semibold">— Equipo de Ingeniería</p>
        </div>
      </div>

      {/* Formulario de Login */}
      <div className="p-8 lg:p-12 w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Bienvenido de nuevo</h1>
            <p className="text-xs text-muted-foreground">
              Ingresa tu correo para recibir un enlace de acceso seguro
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-foreground" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Mail className="mr-2 h-4 w-4" /> Enviar Enlace Mágico
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O continuar con</span>
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
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="font-semibold text-primary underline underline-offset-4 hover:opacity-80">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
