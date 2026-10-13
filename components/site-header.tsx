"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, User, LogOut, LayoutDashboard, CreditCard, Settings, ChevronDown } from "lucide-react"

import { ThemeSwitcher } from "@/components/theme-switcher"

interface SiteHeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const pathname = usePathname()
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm">
              TX
            </div>
            <span className="font-heading text-base font-bold tracking-tight">
              SaaS Boilerplate
            </span>
          </Link>

          {/* Enlaces de Navegación */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Características
            </Link>
            <Link
              href="/pricing"
              className={`transition-colors hover:text-foreground ${
                pathname === "/pricing" ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              Precios
            </Link>
            <Link
              href="/docs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentación
            </Link>
          </nav>
        </div>

        {/* Acciones del Header: Theme Switcher + Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Selector de Temas Visuales */}
          <ThemeSwitcher />

          {user ? (
            /* Usuario Autenticado */
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" /> Ir al Dashboard
              </Link>

              {/* Menú de Usuario con Avatar */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-border p-1 hover:bg-accent transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Usuario"}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                      {user.name?.charAt(0) || <User className="h-4 w-4" />}
                    </div>
                  )}
                  <ChevronDown className="h-3 w-3 text-muted-foreground mr-1" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl animate-in fade-in-50">
                      <div className="px-3 py-2 border-b border-border/50 mb-1">
                        <p className="text-xs font-bold truncate">{user.name || "Usuario"}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-accent transition-colors"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                      </Link>

                      <Link
                        href="/dashboard/projects"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-accent transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> Mis Proyectos
                      </Link>

                      <Link
                        href="/dashboard/billing"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-accent transition-colors"
                      >
                        <CreditCard className="h-3.5 w-3.5" /> Facturación
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-accent transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" /> Ajustes
                      </Link>

                      <div className="border-t border-border/50 my-1" />

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          window.location.href = "/api/auth/signout"
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Usuario NO Autenticado */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
