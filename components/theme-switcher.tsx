"use client"

import * as React from "react"
import { Palette, Check, Sparkles, Moon, Laptop } from "lucide-react"

export type ThemeType = "minimal" | "cyberpunk" | "fintech"

interface ThemeOption {
  id: ThemeType
  name: string
  tagline: string
  previewColors: string[]
}

const THEMES: ThemeOption[] = [
  {
    id: "minimal",
    name: "SaaS Minimal",
    tagline: "Vercel / Linear matte, blanco y negro",
    previewColors: ["#ffffff", "#18181b", "#71717a"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    tagline: "Obsidiana con acentos cian y fucsia neón",
    previewColors: ["#08090f", "#00f0ff", "#ff007f"],
  },
  {
    id: "fintech",
    name: "Fintech",
    tagline: "Azul marino institucional y esmeralda",
    previewColors: ["#06121e", "#10b981", "#2563eb"],
  },
]

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>("minimal")
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const saved = (localStorage.getItem("saas-theme") as ThemeType) || "minimal"
    setCurrentTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
  }, [])

  const applyTheme = (theme: ThemeType) => {
    setCurrentTheme(theme)
    localStorage.setItem("saas-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
    setIsOpen(false)
  }

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0]

  return (
    <div className="relative inline-block text-left">
      {/* Botón Trigger en la barra de navegación */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-card-foreground shadow-sm hover:bg-accent transition-all"
        aria-label="Seleccionar tema visual"
      >
        <Palette className="h-3.5 w-3.5 text-primary" />
        <span className="hidden sm:inline-block">Tema:</span>
        <span className="font-bold text-primary capitalize">{activeThemeObj.name}</span>
      </button>

      {/* Menú Desplegable (Dropdown) */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 mb-1">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Selector de Temas Visuales
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                FASE 1
              </span>
            </div>

            <div className="space-y-1">
              {THEMES.map((theme) => {
                const isSelected = currentTheme === theme.id
                return (
                  <button
                    key={theme.id}
                    onClick={() => applyTheme(theme.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-accent border border-transparent"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {theme.name}
                        </span>
                        {isSelected && (
                          <span className="rounded-full bg-primary/20 p-0.5 text-primary">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">
                        {theme.tagline}
                      </p>
                    </div>

                    {/* Paleta visual miniatura */}
                    <div className="flex items-center gap-1 ml-3 shrink-0">
                      {theme.previewColors.map((color, i) => (
                        <span
                          key={i}
                          className="h-3.5 w-3.5 rounded-full border border-border/60 shadow-xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
