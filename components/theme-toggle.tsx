"use client"

import * as React from "react"
import { Palette, Check } from "lucide-react"

export type ThemeType = "minimal" | "cyberpunk" | "fintech"

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>("minimal")
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const savedTheme = (localStorage.getItem("saas-theme") as ThemeType) || "minimal"
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const handleSelectTheme = (theme: ThemeType) => {
    setCurrentTheme(theme)
    localStorage.setItem("saas-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
    setIsOpen(false)
  }

  const themes: { id: ThemeType; label: string; desc: string; color: string }[] = [
    {
      id: "minimal",
      label: "SaaS Minimal",
      desc: "Estilo Vercel/Linear blanco y negro mate",
      color: "bg-zinc-900 border-zinc-700",
    },
    {
      id: "cyberpunk",
      label: "Cyberpunk",
      desc: "Fondo oscuro con cian y fucsia neón",
      color: "bg-cyan-500 border-cyan-400",
    },
    {
      id: "fintech",
      label: "Fintech",
      desc: "Confianza institucional, esmeralda y navy",
      color: "bg-emerald-500 border-emerald-400",
    },
  ]

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors shadow-sm"
      >
        <Palette className="h-3.5 w-3.5" />
        <span className="capitalize">{currentTheme}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl animate-in fade-in-50 zoom-in-95">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-b border-border/50 mb-1">
              Seleccionar Tema Visual
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTheme(t.id)}
                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors hover:bg-accent ${
                  currentTheme === t.id ? "bg-accent/80 font-medium" : ""
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full mt-0.5 border ${t.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{t.label}</span>
                    {currentTheme === t.id && <Check className="h-3 w-3 text-primary" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
