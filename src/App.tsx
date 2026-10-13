import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  CreditCard, 
  Palette, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  Loader2, 
  Calendar, 
  ListTodo, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  ChevronDown, 
  Mail, 
  Github, 
  Layers,
  ArrowUpRight,
  Shield,
  CheckCircle2
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  taskCount: number;
  createdAt: string;
}

export default function App() {
  const [theme, setTheme] = useState<'minimal' | 'cyberpunk' | 'fintech'>('minimal');
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'dashboard'>('home');
  const [dashboardTab, setDashboardTab] = useState<'projects' | 'billing' | 'settings'>('projects');
  
  // User Authentication state
  const [user, setUser] = useState<{ name: string; email: string; isPro: boolean } | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Projects CRUD state
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj_1',
      name: 'Plataforma SaaS Principal',
      description: 'Panel de control con suscripciones activas y analítica de usuarios.',
      slug: 'plataforma-saas',
      color: '#3b82f6',
      taskCount: 9,
      createdAt: '12 Oct 2026',
    },
    {
      id: 'proj_2',
      name: 'API de Facturación Lemon Squeezy',
      description: 'Microservicio de webhooks para procesamiento de pagos y licencias.',
      slug: 'lemon-squeezy-api',
      color: '#10b981',
      taskCount: 15,
      createdAt: '08 Oct 2026',
    },
    {
      id: 'proj_3',
      name: 'Diseño Multi-Tema Web',
      description: 'Sistema de diseño modular con variables CSS para shadcn/ui.',
      slug: 'diseno-multi-tema',
      color: '#8b5cf6',
      taskCount: 6,
      createdAt: '01 Oct 2026',
    },
  ]);

  // Project Modal Dialog State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    slug: '',
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setProjectForm({ ...projectForm, name, slug });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name) return;

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: projectForm.name,
      description: projectForm.description || 'Sin descripción',
      slug: projectForm.slug || 'proyecto',
      color: projectForm.color,
      taskCount: 0,
      createdAt: 'Hoy',
    };

    setProjects([newProject, ...projects]);
    setProjectForm({ name: '', description: '', color: '#3b82f6', slug: '' });
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Auth actions
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);

    setTimeout(() => {
      setUser({
        name: authName || (authModal.mode === 'register' ? 'Nuevo Usuario' : 'Alex Morgan'),
        email: authEmail || 'alex@ejemplo.com',
        isPro: true,
      });
      setIsAuthLoading(false);
      setAuthModal({ isOpen: false, mode: 'login' });
      setCurrentPage('dashboard');
    }, 600);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    setCurrentPage('home');
  };

  // Theme styling definitions
  const themeStyles = {
    minimal: {
      bg: 'bg-zinc-950',
      text: 'text-zinc-100',
      card: 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-sm',
      cardSubtle: 'bg-zinc-900/60 border-zinc-800/80',
      accentText: 'text-zinc-100',
      btnPrimary: 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold shadow-sm',
      border: 'border-zinc-800',
      badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      nav: 'bg-zinc-950/90 border-zinc-800',
      featuredCard: 'border-zinc-300 ring-2 ring-zinc-400/20 shadow-xl bg-zinc-900',
    },
    cyberpunk: {
      bg: 'bg-[#08090f]',
      text: 'text-cyan-50',
      card: 'bg-[#0e1017] border-cyan-500/30 text-cyan-50 shadow-[0_0_20px_rgba(0,240,255,0.06)]',
      cardSubtle: 'bg-[#0e1017]/70 border-cyan-500/20',
      accentText: 'text-cyan-400',
      btnPrimary: 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-extrabold hover:opacity-90 shadow-[0_0_15px_rgba(0,240,255,0.4)]',
      border: 'border-cyan-500/30',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      nav: 'bg-[#08090f]/90 border-cyan-500/30',
      featuredCard: 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] bg-[#0e1017]',
    },
    fintech: {
      bg: 'bg-[#06121e]',
      text: 'text-emerald-50',
      card: 'bg-[#0b1b2d] border-emerald-500/30 text-emerald-50 shadow-[0_4px_20px_rgba(16,185,129,0.06)]',
      cardSubtle: 'bg-[#0b1b2d]/70 border-emerald-500/20',
      accentText: 'text-emerald-400',
      btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:brightness-110 shadow-[0_4px_14px_rgba(16,185,129,0.3)]',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
      nav: 'bg-[#06121e]/90 border-emerald-500/30',
      featuredCard: 'border-emerald-400 ring-2 ring-emerald-500/40 shadow-[0_4px_30px_rgba(16,185,129,0.25)] bg-[#0b1b2d]',
    },
  }[theme];

  return (
    <div className={`min-h-screen ${themeStyles.bg} ${themeStyles.text} transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white flex flex-col`}>
      
      {/* =========================================================================
          SITE HEADER / NAVBAR (Producción)
          ========================================================================= */}
      <header className={`sticky top-0 z-40 w-full border-b ${themeStyles.nav} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 text-black font-black text-sm shadow-sm">
                TX
              </div>
              <span className="font-extrabold text-base tracking-tight text-white hidden sm:inline-block">
                Taxonomy SaaS
              </span>
            </button>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-300">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`transition-colors hover:text-white ${currentPage === 'home' ? 'text-white' : 'text-zinc-400'}`}
              >
                Inicio
              </button>
              <button 
                onClick={() => setCurrentPage('pricing')}
                className={`transition-colors hover:text-white ${currentPage === 'pricing' ? 'text-white' : 'text-zinc-400'}`}
              >
                Precios
              </button>
              {user && (
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`transition-colors hover:text-white ${currentPage === 'dashboard' ? 'text-white' : 'text-zinc-400'}`}
                >
                  Dashboard
                </button>
              )}
            </nav>
          </div>

          {/* Right Header Controls: Theme Switcher & Auth */}
          <div className="flex items-center gap-3">
            
            {/* Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Cambiar tema visual"
              >
                <Palette className="h-3.5 w-3.5" />
                <span className="capitalize">{theme}</span>
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              </button>

              {isThemeMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsThemeMenuOpen(false)} />
                  <div className="absolute right-0 top-10 z-50 w-52 rounded-xl border border-white/15 bg-zinc-900 p-1.5 text-white shadow-2xl animate-in fade-in-50">
                    <div className="px-2 py-1.5 text-[11px] font-semibold text-zinc-400 border-b border-white/10 mb-1">
                      Tema Visual
                    </div>
                    {[
                      { id: 'minimal', label: 'SaaS Minimal', color: '#ffffff' },
                      { id: 'cyberpunk', label: 'Cyberpunk Neón', color: '#00f0ff' },
                      { id: 'fintech', label: 'Fintech Esmeralda', color: '#10b981' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id as any);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/10 ${
                          theme === t.id ? 'bg-white/10 font-bold text-white' : 'text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                          <span>{t.label}</span>
                        </div>
                        {theme === t.id && <Check className="h-3 w-3 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Auth Buttons or User Avatar */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`hidden sm:inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold ${themeStyles.btnPrimary}`}
                >
                  <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" /> Dashboard
                </button>

                {/* Avatar menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 p-1 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <ChevronDown className="h-3 w-3 text-zinc-400 mr-1" />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-white/15 bg-zinc-900 p-1.5 text-white shadow-2xl animate-in fade-in-50 text-xs">
                        <div className="px-3 py-2 border-b border-white/10 mb-1">
                          <p className="font-bold truncate">{user.name}</p>
                          <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                          <span className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            PRO Ilimitado
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setDashboardTab('projects');
                            setCurrentPage('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition-colors"
                        >
                          <FolderKanban className="h-3.5 w-3.5" /> Mis Proyectos
                        </button>

                        <button
                          onClick={() => {
                            setDashboardTab('billing');
                            setCurrentPage('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition-colors"
                        >
                          <CreditCard className="h-3.5 w-3.5" /> Facturación
                        </button>

                        <button
                          onClick={() => {
                            setDashboardTab('settings');
                            setCurrentPage('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition-colors"
                        >
                          <Settings className="h-3.5 w-3.5" /> Ajustes de Cuenta
                        </button>

                        <div className="border-t border-white/10 my-1" />

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm ${themeStyles.btnPrimary}`}
                >
                  Registrarse
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* =========================================================================
          BODY PAGES
          ========================================================================= */}
      <main className="flex-1">

        {/* -----------------------------------------------------------------------
            PAGE 1: MARKETING HOME / LANDING
            ----------------------------------------------------------------------- */}
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
            
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto space-y-6 pt-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                <Sparkles className="h-3.5 w-3.5" /> Next.js 14 • Lemon Squeezy • Prisma • shadcn/ui
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Construye y escala tu SaaS en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">días, no meses</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                La base definitiva de código abierto evolucionada para producción. Autenticación con NextAuth, pagos con Lemon Squeezy, CRUD relacional de Prisma y 3 temas visuales listos para vender.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (user) {
                      setCurrentPage('dashboard');
                    } else {
                      setAuthModal({ isOpen: true, mode: 'register' });
                    }
                  }}
                  className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${themeStyles.btnPrimary}`}
                >
                  Comenzar Ahora <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('pricing')}
                  className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Ver Precios
                </button>
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border ${themeStyles.card} space-y-3`}>
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">Cobros con Lemon Squeezy</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Webhooks verificados con HMAC-SHA256, sincronización de suscripciones en tiempo real y portal de autogestión de clientes.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${themeStyles.card} space-y-3`}>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">CRUD Completo de Prisma</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Modelos Project y Task con Server Actions seguras, validación con Zod y control estricto de propiedad de sesión.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${themeStyles.card} space-y-3`}>
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">3 Temas Visuales shadcn/ui</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  SaaS Minimal, Cyberpunk y Fintech configurados con variables HSL y soporte de modo claro/oscuro permanente.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* -----------------------------------------------------------------------
            PAGE 2: PRICING (Planes con redirección condicional)
            ----------------------------------------------------------------------- */}
        {currentPage === 'pricing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-in fade-in-50">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Facturación Global y Segura
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Precios Simples, Sin Complicaciones
              </h2>
              <p className="text-sm text-zinc-400">
                Elige el plan ideal para tu proyecto. Cancela o actualiza en cualquier momento desde tu panel de usuario.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              
              {/* Starter Plan */}
              <div className={`p-8 rounded-2xl border ${themeStyles.border} bg-black/40 flex flex-col justify-between space-y-6`}>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Starter</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">Gratuito</span>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-extrabold text-white">$0</span>
                    <span className="text-xs text-zinc-400 ml-1">/mes</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">Para desarrolladores que construyen prototipos y proyectos personales.</p>

                  <div className="mt-6 space-y-2.5 text-xs text-zinc-300 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Hasta 3 proyectos activos</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Hasta 25 tareas por proyecto</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Autenticación segura NextAuth</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Soporte comunitario</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (user) {
                      setCurrentPage('dashboard');
                    } else {
                      setAuthModal({ isOpen: true, mode: 'register' });
                    }
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold border border-white/20 hover:bg-white/10 transition-colors text-white"
                >
                  {user ? 'Ir a mi Dashboard' : 'Comenzar Gratis'}
                </button>
              </div>

              {/* PRO Plan (Destacado) */}
              <div className={`relative p-8 rounded-2xl border ${themeStyles.card} ${themeStyles.featuredCard} flex flex-col justify-between space-y-6 scale-105 z-10`}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" /> Más Popular
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-white">PRO Ilimitado</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${themeStyles.badge}`}>Suscripción</span>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-extrabold text-white">$19</span>
                    <span className="text-xs text-zinc-400 ml-1">/mes</span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-2">Todo lo que necesitas para lanzar tu SaaS a escala sin límites.</p>

                  <div className="mt-6 space-y-3 text-xs text-zinc-200 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Proyectos y tareas ilimitados</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 3 Temas Visuales (Minimal, Cyberpunk, Fintech)</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Facturación y Webhooks con Lemon Squeezy</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Portal de cliente para autogestión de planes</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Soporte prioritario en menos de 24h</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (user) {
                      setDashboardTab('billing');
                      setCurrentPage('dashboard');
                    } else {
                      // Redirige al registro primero
                      setAuthModal({ isOpen: true, mode: 'register' });
                    }
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${themeStyles.btnPrimary}`}
                >
                  {user ? 'Gestionar Suscripción' : 'Suscribirse a PRO'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className={`p-8 rounded-2xl border ${themeStyles.border} bg-black/40 flex flex-col justify-between space-y-6`}>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Enterprise</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">Equipos</span>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-extrabold text-white">$79</span>
                    <span className="text-xs text-zinc-400 ml-1">/mes</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">Para agencias y equipos con múltiples clientes y arquitectura dedicada.</p>

                  <div className="mt-6 space-y-2.5 text-xs text-zinc-300 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Todo lo del Plan PRO</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Licencia para proyectos de clientes</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Asistencia 1-a-1 de arquitectura</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> SLA de soporte del 99.9%</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (user) {
                      setDashboardTab('billing');
                      setCurrentPage('dashboard');
                    } else {
                      setAuthModal({ isOpen: true, mode: 'register' });
                    }
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold border border-white/20 hover:bg-white/10 transition-colors text-white"
                >
                  Contactar Ventas
                </button>
              </div>

            </div>

            {/* Garantía de Pago */}
            <div className="max-w-2xl mx-auto rounded-xl border border-white/10 bg-white/5 p-4 text-center flex items-center justify-center gap-3 text-xs text-zinc-400">
              <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Procesamiento de pagos cifrado con cumplimiento PCI DSS a través de Lemon Squeezy Merchant of Record.</span>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------------
            PAGE 3: USER DASHBOARD (Autenticado)
            ----------------------------------------------------------------------- */}
        {currentPage === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in-50">
            
            {/* Dashboard Sub-nav */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDashboardTab('projects')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    dashboardTab === 'projects' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FolderKanban className="h-3.5 w-3.5" /> Mis Proyectos
                </button>
                <button
                  onClick={() => setDashboardTab('billing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    dashboardTab === 'billing' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" /> Facturación
                </button>
                <button
                  onClick={() => setDashboardTab('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    dashboardTab === 'settings' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Settings className="h-3.5 w-3.5" /> Ajustes
                </button>
              </div>

              {dashboardTab === 'projects' && (
                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${themeStyles.btnPrimary}`}
                >
                  <Plus className="h-3.5 w-3.5" /> Nuevo Proyecto
                </button>
              )}
            </div>

            {/* TAB: PROJECTS CRUD */}
            {dashboardTab === 'projects' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">Panel de Proyectos</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Gestiona tus iniciativas, tareas y flujos de trabajo en un único lugar.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`flex flex-col justify-between rounded-xl border ${themeStyles.card} p-5 transition-all hover:scale-[1.01]`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3 w-3 rounded-full shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <span className="font-mono text-[11px] text-zinc-400">/{project.slug}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-colors"
                            title="Eliminar proyecto"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <h3 className="text-base font-bold text-white">{project.name}</h3>
                        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <ListTodo className="h-3.5 w-3.5 text-zinc-400" />
                          {project.taskCount} tareas
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="h-3 w-3" />
                          {project.createdAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BILLING */}
            {dashboardTab === 'billing' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">Plan y Facturación</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Gestiona tu suscripción activa procesada de forma segura por Lemon Squeezy.
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border ${themeStyles.card} space-y-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400">Estado de suscripción</span>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                        Plan PRO Ilimitado
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Activo
                        </span>
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-400">Cuota mensual</span>
                      <p className="text-lg font-extrabold text-white">$19 / mes</p>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-300 space-y-2 border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Próxima renovación</span>
                      <span className="font-medium text-white">12 de Noviembre, 2026</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Método de facturación</span>
                      <span className="font-medium text-white">Lemon Squeezy Checkout (Tarjeta)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => alert("Redirigiendo a tu Portal de Clientes de Lemon Squeezy...")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold ${themeStyles.btnPrimary}`}
                    >
                      Gestionar en Lemon Squeezy Portal
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {dashboardTab === 'settings' && (
              <div className="max-w-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">Ajustes de Perfil</h2>
                  <p className="text-xs text-zinc-400 mt-1">Actualiza tu nombre y preferencias de cuenta.</p>
                </div>

                <div className={`p-6 rounded-2xl border ${themeStyles.card} space-y-4`}>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Nombre</label>
                    <input
                      type="text"
                      defaultValue={user?.name || 'Alex Morgan'}
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      disabled
                      defaultValue={user?.email || 'alex@ejemplo.com'}
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-400 cursor-not-allowed"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => alert("Cambios guardados")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold ${themeStyles.btnPrimary}`}
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* =========================================================================
          SITE FOOTER
          ========================================================================= */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-400">Taxonomy SaaS Boilerplate</span>
            <span>•</span>
            <span>Next.js 14 &amp; Lemon Squeezy</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentPage('home')} className="hover:text-zinc-300">Inicio</button>
            <button onClick={() => setCurrentPage('pricing')} className="hover:text-zinc-300">Precios</button>
            <a href="/docs" className="hover:text-zinc-300">Docs</a>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL: INICIAR SESIÓN / REGISTRO
          ========================================================================= */}
      {authModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="fixed inset-0" onClick={() => setAuthModal({ ...authModal, isOpen: false })} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-zinc-900 p-6 text-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-bold text-sm">
                {authModal.mode === 'login' ? 'Iniciar Sesión' : 'Crear una Cuenta'}
              </h3>
              <button onClick={() => setAuthModal({ ...authModal, isOpen: false })} className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs">
              {authModal.mode === 'register' && (
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="alex@ejemplo.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 mt-2 ${themeStyles.btnPrimary}`}
              >
                {isAuthLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Mail className="h-3.5 w-3.5" />
                )}
                {authModal.mode === 'login' ? 'Ingresar con Enlace Mágico' : 'Registrarse con Email'}
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-zinc-900 px-2 text-zinc-400">O continuar con</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setUser({ name: 'Alex GitHub', email: 'alex@github.com', isPro: true });
                  setAuthModal({ isOpen: false, mode: 'login' });
                  setCurrentPage('dashboard');
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </button>
              <button
                type="button"
                onClick={() => {
                  setUser({ name: 'Alex Google', email: 'alex@gmail.com', isPro: true });
                  setAuthModal({ isOpen: false, mode: 'login' });
                  setCurrentPage('dashboard');
                }}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium"
              >
                Google
              </button>
            </div>

            <p className="text-center text-[11px] text-zinc-400 mt-4">
              {authModal.mode === 'login' ? (
                <>
                  ¿No tienes una cuenta?{' '}
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes una cuenta?{' '}
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: NUEVO PROYECTO (CRUD)
          ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="fixed inset-0" onClick={() => setIsProjectModalOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-zinc-900 p-6 text-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <FolderKanban className="h-4 w-4 text-blue-400" /> Crear Nuevo Proyecto
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Nombre del Proyecto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mi Proyecto SaaS"
                  value={projectForm.name}
                  onChange={handleNameChange}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Slug URL</label>
                <input
                  type="text"
                  value={projectForm.slug}
                  onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 font-mono text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Descripción</label>
                <textarea
                  rows={2}
                  placeholder="Describe el alcance del proyecto..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1.5">Color</label>
                <div className="flex items-center gap-2">
                  {['#3b82f6', '#10b981', '#8b5cf6', '#f43f5e', '#f59e0b', '#06b6d4'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, color })}
                      style={{ backgroundColor: color }}
                      className={`h-6 w-6 rounded-full transition-transform ${
                        projectForm.color === color ? 'ring-2 ring-white scale-110' : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/15 text-zinc-300 hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-bold ${themeStyles.btnPrimary}`}
                >
                  Guardar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
