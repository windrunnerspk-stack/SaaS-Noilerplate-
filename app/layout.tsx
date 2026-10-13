import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { getCurrentUser } from "@/lib/session"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    default: "SaaS Boilerplate Premium - Taxonomy Evolution",
    template: "%s | SaaS Boilerplate Premium",
  },
  description: "Boilerplate SaaS de producción con Next.js 14, Lemon Squeezy, Prisma, shadcn/ui y temas múltiples.",
  keywords: [
    "Next.js 14",
    "App Router",
    "SaaS Boilerplate",
    "Lemon Squeezy",
    "Prisma",
    "Tailwind CSS",
    "shadcn/ui",
    "TypeScript",
  ],
  authors: [{ name: "SaaS Boilerplate Premium" }],
  creator: "SaaS Boilerplate",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://localhost:3000",
    title: "SaaS Boilerplate Premium - Taxonomy Evolution",
    description: "Boilerplate SaaS de producción con Next.js 14, Lemon Squeezy, Prisma, shadcn/ui y temas múltiples.",
    siteName: "SaaS Boilerplate Premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Boilerplate Premium - Taxonomy Evolution",
    description: "Boilerplate SaaS de producción con Next.js 14, Lemon Squeezy, Prisma, shadcn/ui y temas múltiples.",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentUser()

  return (
    <html lang="es" data-theme="minimal" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen bg-background font-sans text-foreground antialiased ${inter.variable}`}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader user={user} />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}
