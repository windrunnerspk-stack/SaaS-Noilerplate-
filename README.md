# 🚀 SaaS Boilerplate Premium — Next.js 14 + Lemon Squeezy + Prisma + shadcn/ui

Bienvenido a **SaaS Boilerplate Premium**, una plantilla de producción moderna, escalable y lista para lanzar tu software como servicio (SaaS) en cuestión de días en lugar de meses.

Diseñado siguiendo las mejores prácticas de **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui** y **Prisma ORM**, integrando pagos recurrentes mediante **Lemon Squeezy** y autenticación flexible con **NextAuth.js**.

---

## 🌟 Características Principales

- ⚡ **Next.js 14 App Router**: Server Components, Route Handlers y Server Actions con tipado estricto.
- 💳 **Pagos con Lemon Squeezy**:
  - Suscripciones recurrentes y pagos únicos (Lifetime Deals).
  - Webhooks seguros verificados criptográficamente con HMAC-SHA256 (`crypto.timingSafeEqual`).
  - Redirección automática al Portal de Clientes (*Customer Portal*) para autogestión de planes.
- 🎨 **Diseño Multi-Tema Premium (3 Temas Listos)**:
  - **SaaS Minimal**: Estilo blanco y negro mate inspirado en Vercel y Linear.
  - **Cyberpunk**: Base oscura obsidiana con acentos neón cian y fucsia.
  - **Fintech**: Tonos de alta confianza con azul marino profundo y esmeralda.
  - Componente `ThemeSwitcher` con persistencia en `localStorage`.
- 🗄️ **Base de Datos & ORM (Prisma)**:
  - Compatible con PostgreSQL (Supabase, Neon, Railway) o MySQL (PlanetScale).
  - Modelos optimizados: `User`, `Project`, `Task`, `Account`, `Session`, `Post`.
  - Borrado en cascada (`onDelete: Cascade`) e índices de alta velocidad.
- 🔒 **Autenticación (NextAuth.js)**:
  - Inicio de sesión con enlaces mágicos (*Email / Magic Links*).
  - Proveedores OAuth listos para activar (GitHub, Google).
  - Control de sesión seguro en Server Actions y Middlewares.
- 📁 **CRUD de Ejemplo Listo para Usar**:
  - Dashboard completo de **Proyectos** y **Tareas** con validaciones de **Zod**.
  - Modal accesible para creación en tiempo real y asignación de colores.
- 🧩 **Componentes shadcn/ui & Tailwind CSS**:
  - Formularios, Diálogos, Dropdowns, Badges, Botones y Tooltips accesibles construidos sobre Radix UI.

---

## ⚡ Guía de Inicio Rápido (Quick Start)

Sigue estos 5 sencillos pasos para tener tu SaaS corriendo en tu máquina local:

### 1. Clonar o Descomprimir el Proyecto
Descarga el código fuente y sitúate en el directorio raíz:
```bash
cd saas-boilerplate-premium
```

### 2. Configurar las Variables de Entorno
Copia el archivo de ejemplo a tu archivo local:
```bash
cp .env.example .env.local
```
Abre `.env.local` y añade tus claves de base de datos, secreto de NextAuth y credenciales de Lemon Squeezy.

### 3. Instalar Dependencias
Instala los paquetes necesarios con tu gestor de paquetes preferido:
```bash
npm install
# o con pnpm:
# pnpm install
```

### 4. Sincronizar la Base de Datos
Genera el cliente de Prisma y sube el esquema a tu base de datos:
```bash
npx prisma generate
npx prisma db push
```

### 5. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.

---

## 🍋 Configuración de Lemon Squeezy

Para activar los cobros reales o en modo de prueba (*Test Mode*):

1. **Crear una Cuenta y Tienda**:
   - Ingresa a [lemonsqueezy.com](https://lemonsqueezy.com) y crea tu tienda.
2. **Obtener API Key**:
   - Dirígete a **Settings > API** y genera una nueva clave API.
   - Pégala en `LEMONSQUEEZY_API_KEY` en tu `.env.local`.
3. **Obtener el Store ID**:
   - En **Settings > Stores**, copia el identificador numérico de tu tienda.
   - Pégalo en `LEMONSQUEEZY_STORE_ID`.
4. **Crear tu Producto y Variante**:
   - En **Store > Products**, crea tu plan (ej. *PRO Plan - $19/mes*).
   - Copia el **Variant ID** de la variante mensual y colócalo en `LEMONSQUEEZY_PRO_VARIANT_ID`.
5. **Configurar el Webhook**:
   - Ve a **Settings > Webhooks > Create Webhook**.
   - **Callback URL**: `https://tu-dominio.com/api/webhooks/lemonsqueezy` (para pruebas locales puedes usar ngrok o la herramienta de webhooks de Lemon Squeezy).
   - **Secret**: Genera una contraseña segura y asígnala a `LEMONSQUEEZY_WEBHOOK_SECRET`.
   - **Eventos a seleccionar**:
     - `subscription_created`
     - `subscription_updated`
     - `subscription_cancelled`
     - `subscription_resumed`
     - `subscription_expired`
     - `order_created`

---

## 📂 Estructura del Proyecto

```
├── app/
│   ├── (auth)/             # Páginas de Login y Registro
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/        # Panel privado del usuario
│   │   └── dashboard/
│   │       ├── billing/    # Facturación y gestión de planes
│   │       ├── projects/   # CRUD de Proyectos y Tareas
│   │       └── settings/   # Configuración de cuenta
│   ├── (marketing)/        # Landing page pública y Precios
│   │   ├── page.tsx        # Hero y presentación
│   │   └── pricing/        # Tabla de 3 planes con Lemon Squeezy
│   └── api/
│       ├── auth/           # Rutas de NextAuth
│       └── webhooks/
│           └── lemonsqueezy/ # Endpoint seguro del webhook
├── components/             # Componentes UI (shadcn/ui + custom)
│   ├── project-create-dialog.tsx
│   ├── project-item.tsx
│   ├── theme-switcher.tsx
│   └── billing-form.tsx
├── config/                 # Configuraciones de navegación y suscripciones
├── lib/
│   ├── actions/
│   │   └── project.ts      # Server Actions seguras con Zod
│   ├── db.ts               # Singleton de Prisma Client
│   ├── lemonsqueezy.ts     # Cliente API y verificación HMAC
│   └── subscription.ts     # Helpers de estado de suscripción
├── prisma/
│   └── schema.prisma       # Esquema de base de datos relacional
└── styles/
    └── globals.css         # Definición de las 3 paletas temáticas
```

---

## 🚢 Despliegue en Producción (Vercel)

1. Sube tu código a un repositorio privado de GitHub.
2. Importa el proyecto en [Vercel](https://vercel.com).
3. Añade todas las variables de entorno de tu archivo `.env.local` en la sección **Environment Variables** de Vercel.
4. Asegúrate de que `NEXT_PUBLIC_APP_URL` apunte a tu dominio personalizado en producción (ej. `https://mi-saas.com`).
5. ¡Listo! Vercel compilará y desplegará tu SaaS con soporte global en Edge.

---

## 📄 Licencia

Este boilerplate incluye una licencia comercial que te permite construir, lanzar y monetizar tus propios proyectos SaaS o los de tus clientes de manera ilimitada.
