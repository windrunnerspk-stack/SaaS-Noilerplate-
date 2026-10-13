"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Folder, MoreVertical, Trash, ArrowUpRight, ListTodo, Calendar, Loader2 } from "lucide-react"

import { deleteProject } from "@/lib/actions/project"

interface ProjectItemProps {
  project: {
    id: string
    name: string
    description?: string | null
    slug: string
    color?: string | null
    createdAt: Date | string
    _count?: {
      tasks: number
    }
  }
  onProjectDeleted?: () => void
}

export function ProjectItem({ project, onProjectDeleted }: ProjectItemProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const res = await deleteProject(project.id)
      if (res.success) {
        if (onProjectDeleted) onProjectDeleted()
        router.refresh()
      } else {
        alert(res.error || "No se pudo eliminar el proyecto")
      }
    } catch (e: any) {
      alert(e?.message || "Error al eliminar")
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  const createdDate = new Date(project.createdAt).toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="h-3.5 w-3.5 rounded-full ring-2 ring-background shrink-0"
              style={{ backgroundColor: project.color || "#3b82f6" }}
            />
            <span className="font-mono text-[11px] text-muted-foreground">
              /{project.slug}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              disabled={isDeleting}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted transition-colors"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {showConfirm && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowConfirm(false)}
                />
                <div className="absolute right-0 top-8 z-40 w-36 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-50">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash className="h-3.5 w-3.5" />
                    )}
                    <span>Eliminar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Project Title & Description */}
        <h4 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {project.name}
        </h4>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description || "Sin descripción proporcionada."}
        </p>
      </div>

      {/* Footer stats */}
      <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-medium">
            <ListTodo className="h-3.5 w-3.5 text-primary" />
            {project._count?.tasks ?? 0} tareas
          </span>
          <span className="inline-flex items-center gap-1 text-[11px]">
            <Calendar className="h-3 w-3" />
            {createdDate}
          </span>
        </div>

        <Link
          href={`/dashboard/projects/${project.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Ver <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
