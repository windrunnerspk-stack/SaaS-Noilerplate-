"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

/**
 * =============================================================================
 * SCHEMAS DE VALIDACIÓN ZOD (PROJECTS & TASKS)
 * =============================================================================
 */

const projectSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(60),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Formato de color inválido").default("#3b82f6"),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones")
    .optional(),
})

const updateProjectSchema = projectSchema.partial()

const taskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(120),
  description: z.string().max(1000).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"]).default("TODO"),
  dueDate: z.date().optional().nullable(),
  projectId: z.string().cuid(),
})

/**
 * Función auxiliar para verificar la sesión del usuario autenticado.
 */
async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("No autenticado. Inicia sesión para continuar.")
  }

  return session.user
}

/**
 * Generador de slug a partir del nombre del proyecto.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * =============================================================================
 * SERVER ACTIONS: PROYECTOS (CRUD)
 * =============================================================================
 */

/**
 * CREAR PROYECTO
 */
export async function createProject(rawData: z.infer<typeof projectSchema>) {
  try {
    const user = await getAuthenticatedUser()
    const validatedData = projectSchema.parse(rawData)

    const finalSlug = validatedData.slug || slugify(validatedData.name)

    // Verificar unicidad de slug por usuario
    const existingProject = await db.project.findUnique({
      where: {
        userId_slug: {
          userId: user.id,
          slug: finalSlug,
        },
      },
    })

    if (existingProject) {
      return {
        success: false,
        error: "Ya tienes un proyecto con este nombre/slug.",
      }
    }

    const project = await db.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        color: validatedData.color,
        slug: finalSlug,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")

    return { success: true, data: project }
  } catch (error: any) {
    console.error("[createProject Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al crear el proyecto",
    }
  }
}

/**
 * OBTENER TODOS LOS PROYECTOS DEL USUARIO
 */
export async function getUserProjects() {
  try {
    const user = await getAuthenticatedUser()

    const projects = await db.project.findMany({
      where: {
        userId: user.id,
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return { success: true, data: projects }
  } catch (error: any) {
    console.error("[getUserProjects Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al obtener proyectos",
    }
  }
}

/**
 * OBTENER PROYECTO POR ID (CON SUS TAREAS)
 */
export async function getProjectById(projectId: string) {
  try {
    const user = await getAuthenticatedUser()

    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId: user.id, // Validación estricta de propiedad
      },
      include: {
        tasks: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!project) {
      return { success: false, error: "Proyecto no encontrado o sin permisos." }
    }

    return { success: true, data: project }
  } catch (error: any) {
    console.error("[getProjectById Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al obtener el proyecto",
    }
  }
}

/**
 * ACTUALIZAR PROYECTO
 */
export async function updateProject(
  projectId: string,
  rawData: z.infer<typeof updateProjectSchema>
) {
  try {
    const user = await getAuthenticatedUser()
    const validatedData = updateProjectSchema.parse(rawData)

    // Validar que el proyecto pertenezca al usuario
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    })

    if (!project) {
      return { success: false, error: "Proyecto no encontrado o sin permisos." }
    }

    const updated = await db.project.update({
      where: { id: projectId },
      data: {
        ...validatedData,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${projectId}`)

    return { success: true, data: updated }
  } catch (error: any) {
    console.error("[updateProject Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al actualizar el proyecto",
    }
  }
}

/**
 * BORRAR PROYECTO (Eliminación en cascada de sus tareas)
 */
export async function deleteProject(projectId: string) {
  try {
    const user = await getAuthenticatedUser()

    // Validar propiedad antes de borrar
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    })

    if (!project) {
      return { success: false, error: "Proyecto no encontrado o sin permisos." }
    }

    await db.project.delete({
      where: { id: projectId },
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")

    return { success: true, message: "Proyecto eliminado exitosamente." }
  } catch (error: any) {
    console.error("[deleteProject Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al eliminar el proyecto",
    }
  }
}

/**
 * =============================================================================
 * BONUS: SERVER ACTIONS DE TAREAS (CRUD COMPLETO)
 * =============================================================================
 */

/**
 * CREAR TAREA DENTRO DE UN PROYECTO
 */
export async function createTask(rawData: z.infer<typeof taskSchema>) {
  try {
    const user = await getAuthenticatedUser()
    const validatedData = taskSchema.parse(rawData)

    // Verificar que el proyecto padre pertenece al usuario
    const project = await db.project.findFirst({
      where: {
        id: validatedData.projectId,
        userId: user.id,
      },
    })

    if (!project) {
      return { success: false, error: "Proyecto no válido." }
    }

    const task = await db.task.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        priority: validatedData.priority,
        status: validatedData.status,
        dueDate: validatedData.dueDate,
        projectId: validatedData.projectId,
        userId: user.id,
      },
    })

    revalidatePath(`/dashboard/projects/${validatedData.projectId}`)

    return { success: true, data: task }
  } catch (error: any) {
    console.error("[createTask Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al crear la tarea",
    }
  }
}

/**
 * ACTUALIZAR ESTADO DE UNA TAREA
 */
export async function updateTaskStatus(
  taskId: string,
  newStatus: "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED"
) {
  try {
    const user = await getAuthenticatedUser()

    const task = await db.task.findFirst({
      where: {
        id: taskId,
        userId: user.id,
      },
    })

    if (!task) {
      return { success: false, error: "Tarea no encontrada o sin permisos." }
    }

    const updated = await db.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    })

    revalidatePath(`/dashboard/projects/${task.projectId}`)

    return { success: true, data: updated }
  } catch (error: any) {
    console.error("[updateTaskStatus Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al actualizar la tarea",
    }
  }
}

/**
 * BORRAR TAREA
 */
export async function deleteTask(taskId: string) {
  try {
    const user = await getAuthenticatedUser()

    const task = await db.task.findFirst({
      where: {
        id: taskId,
        userId: user.id,
      },
    })

    if (!task) {
      return { success: false, error: "Tarea no encontrada o sin permisos." }
    }

    await db.task.delete({
      where: { id: taskId },
    })

    revalidatePath(`/dashboard/projects/${task.projectId}`)

    return { success: true, message: "Tarea eliminada exitosamente." }
  } catch (error: any) {
    console.error("[deleteTask Action Error]:", error)
    return {
      success: false,
      error: error.message || "Error al eliminar la tarea",
    }
  }
}
