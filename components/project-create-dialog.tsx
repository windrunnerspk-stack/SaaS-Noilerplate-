"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus, Loader2, Sparkles, FolderPlus, X } from "lucide-react"

import { createProject } from "@/lib/actions/project"

interface ProjectCreateDialogProps {
  onProjectCreated?: () => void
}

const colorPresets = [
  "#3b82f6", // Azul
  "#10b981", // Esmeralda
  "#8b5cf6", // Violeta
  "#f43f5e", // Rosa / Rojo
  "#f59e0b", // Ámbar
  "#06b6d4", // Cian
]

export function ProjectCreateDialog({ onProjectCreated }: ProjectCreateDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    color: "#3b82f6",
    slug: "",
  })

  // Auto-generación de slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const autoSlug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

    setFormData((prev) => ({
      ...prev,
      name,
      slug: autoSlug,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await createProject({
        name: formData.name,
        description: formData.description || undefined,
        color: formData.color,
        slug: formData.slug || undefined,
      })

      if (!result.success) {
        setError(result.error || "Error al crear el proyecto.")
        return
      }

      setFormData({
        name: "",
        description: "",
        color: "#3b82f6",
        slug: "",
      })
      setIsOpen(false)
      if (onProjectCreated) onProjectCreated()
      router.refresh()
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
      >
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Proyecto
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => !isLoading && setIsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Crear Nuevo Proyecto</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mi Nuevo SaaS, Dashboard de Ventas..."
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Slug Identificador
                </label>
                <input
                  type="text"
                  placeholder="mi-nuevo-saas"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Se usa en URLs amigables: /dashboard/projects/{formData.slug || "slug"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Descripción (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe el objetivo y alcance de este proyecto..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Color de Etiqueta
                </label>
                <div className="flex items-center gap-2">
                  {colorPresets.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      style={{ backgroundColor: color }}
                      className={`h-7 w-7 rounded-full transition-transform ${
                        formData.color === color
                          ? "ring-2 ring-primary ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                    />
                  ))}
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0 ml-2"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="rounded-lg border border-input px-4 py-2 text-xs font-medium hover:bg-accent transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
