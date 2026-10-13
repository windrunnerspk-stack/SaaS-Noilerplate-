export interface SidebarNavItem {
  title: string
  href: string
  icon: string
  disabled?: boolean
}

export interface DashboardConfig {
  mainNav: {
    title: string
    href: string
    disabled?: boolean
  }[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentación",
      href: "/docs",
    },
    {
      title: "Precios",
      href: "/pricing",
    },
  ],
  sidebarNav: [
    {
      title: "Proyectos",
      href: "/dashboard/projects",
      icon: "folder",
    },
    {
      title: "Facturación",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Ajustes",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
