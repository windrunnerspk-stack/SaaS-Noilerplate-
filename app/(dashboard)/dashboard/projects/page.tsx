import { redirect } from "next/navigation"
import { FolderKanban, Plus, Sparkles, Layers } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserProjects } from "@/lib/actions/project"
import { ProjectCreateDialog } from "@/components/project-create-dialog"
import { ProjectItem } from "@/components/project-item"

export const metadata = {
  title: "Proyectos",
  description: "Gestiona tus proyectos y tareas con el CRUD de Prisma.",
}

export default async function ProjectsDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const response = await getUserProjects()
  const projects = response.success ? response.data || [] : []

  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
              Proyectos
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {projects.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Crea, organiza y gestiona tus proyectos con el modelo CRUD de Prisma.
          </p>
        </div>

        <div>
          <ProjectCreateDialog />
        </div>
      </div>

      {/* Grid de Proyectos o Estado Vacío */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project: any) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center bg-card/40">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <FolderKanban className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">No tienes proyectos creados</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Comienza creando tu primer proyecto para organizar tareas y sacarle el máximo partido al boilerplate.
          </p>
          <div className="mt-6">
            <ProjectCreateDialog />
          </div>
        </div>
      )}
    </div>
  )
}
