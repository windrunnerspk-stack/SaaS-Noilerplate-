import Link from "next/link"
import { ArrowRight, Check, CreditCard, FolderKanban, Palette, Shield, Sparkles, Zap } from "lucide-react"

import { getCurrentUser } from "@/lib/session"

export default async function HomePage() {
  const user = await getCurrentUser()

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="container max-w-5xl py-20 md:py-28 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Next.js 14 App Router • Lemon Squeezy • Prisma • shadcn/ui
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          Construye y escala tu SaaS en{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400">
            días, no meses
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
          La base de código definitiva para desarrolladores independientes y agencias. Facturación con Lemon Squeezy, CRUD relacional con Prisma y 3 temas visuales de alto valor percibido.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href={user ? "/dashboard" : "/register"}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            {user ? "Ir a mi Dashboard" : "Empezar Gratis"} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            Ver Planes y Precios
          </Link>
        </div>
      </section>

      {/* Características Principales */}
      <section id="features" className="container max-w-6xl py-12 md:py-20 border-t border-border">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            Todo lo que necesitas para vender
          </h2>
          <p className="text-sm text-muted-foreground">
            Ahorra cientos de horas configurando pasarelas, esquemas de bases de datos y temas visuales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Lemon Squeezy Integrado</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Checkouts, sincronización con webhooks criptográficamente verificados con HMAC-SHA256 y portal de cliente autogestionado.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FolderKanban className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">CRUD Relacional Prisma</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modelos Project y Task con Server Actions seguras, validación Zod y borrado en cascada para tus compradores.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">3 Temas Visuales Listos</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SaaS Minimal (Vercel/Linear), Cyberpunk neón y Fintech esmeralda. Cambia con una sola variable CSS.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
