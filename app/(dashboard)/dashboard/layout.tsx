import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { FolderKanban, CreditCard, Settings, LayoutDashboard } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { SiteHeader } from "@/components/site-header"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const navItems = [
    { title: "Proyectos", href: "/dashboard/projects", icon: FolderKanban },
    { title: "Facturación", href: "/dashboard/billing", icon: CreditCard },
    { title: "Ajustes", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
        <aside className="hidden w-[200px] flex-col md:flex space-y-1">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Menú Principal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
