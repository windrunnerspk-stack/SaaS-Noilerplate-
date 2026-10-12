import React, { useState } from 'react';
import { 
  Database, 
  Palette, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  ArrowRight,
  FolderKanban,
  ListTodo
} from 'lucide-react';

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<'minimal' | 'cyberpunk' | 'fintech'>('minimal');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const themeStyles = {
    minimal: {
      bg: 'bg-zinc-950',
      card: 'bg-zinc-900 border-zinc-800 text-zinc-100',
      badge: 'bg-zinc-800 text-zinc-200 border-zinc-700',
      accentText: 'text-zinc-200',
      btn: 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200',
      gradient: 'from-zinc-100 to-zinc-400',
      highlight: 'border-zinc-700',
      subtext: 'text-zinc-400',
      statBorder: 'border-zinc-800/80',
    },
    cyberpunk: {
      bg: 'bg-[#08090f]',
      card: 'bg-[#0e1017] border-cyan-500/30 text-cyan-50 shadow-[0_0_25px_rgba(0,240,255,0.08)]',
      badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
      accentText: 'text-cyan-400',
      btn: 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold hover:opacity-90 shadow-[0_0_15px_rgba(0,240,255,0.4)]',
      gradient: 'from-cyan-400 via-fuchsia-400 to-yellow-300',
      highlight: 'border-fuchsia-500/40',
      subtext: 'text-cyan-200/70',
      statBorder: 'border-cyan-500/20',
    },
    fintech: {
      bg: 'bg-[#06121e]',
      card: 'bg-[#0b1b2d] border-emerald-500/30 text-emerald-50 shadow-[0_4px_20px_rgba(16,185,129,0.06)]',
      badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      accentText: 'text-emerald-400',
      btn: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-semibold hover:brightness-110 shadow-[0_4px_14px_rgba(16,185,129,0.3)]',
      gradient: 'from-emerald-300 via-teal-200 to-sky-300',
      highlight: 'border-teal-500/40',
      subtext: 'text-slate-300',
      statBorder: 'border-emerald-500/20',
    },
  }[selectedTheme];

  return (
    <div className={`min-h-screen ${themeStyles.bg} transition-colors duration-300 text-white font-sans selection:bg-primary selection:text-white p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header / Intro */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Fase 1 Completada
              </span>
              <span className="text-xs text-zinc-400">Next.js 14 • Prisma • Tailwind • shadcn/ui</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              SaaS Boilerplate Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Taxonomy Refactor</span>
            </h1>
            <p className="text-sm text-zinc-400">
              Arquitectura de base de datos con Lemon Squeezy, CRUD Project/Task y 3 temas visuales.
            </p>
          </div>

          {/* Theme switcher interactive widget */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-xs font-medium px-2 text-zinc-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> Tema:
            </span>
            <button
              onClick={() => setSelectedTheme('minimal')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                selectedTheme === 'minimal' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Minimal
            </button>
            <button
              onClick={() => setSelectedTheme('cyberpunk')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                selectedTheme === 'cyberpunk' ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'text-zinc-400 hover:text-cyan-300'
              }`}
            >
              Cyberpunk
            </button>
            <button
              onClick={() => setSelectedTheme('fintech')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                selectedTheme === 'fintech' ? 'bg-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-zinc-400 hover:text-emerald-300'
              }`}
            >
              Fintech
            </button>
          </div>
        </header>

        {/* Live UI Components Showcase in the Selected Theme */}
        <div className={`p-6 md:p-8 rounded-2xl border ${themeStyles.card} transition-all duration-300`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${themeStyles.badge} mb-2`}>
                <Sparkles className="w-3.5 h-3.5" /> Vista Previa del Tema: {selectedTheme.toUpperCase()}
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                Dashboard Demo con el Tema Activo
              </h2>
              <p className={`text-sm ${themeStyles.subtext}`}>
                Las variables CSS generadas en styles/globals.css transforman la interfaz dinámicamente.
              </p>
            </div>
            <button className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${themeStyles.btn}`}>
              <Zap className="w-4 h-4" /> Crear Nuevo Proyecto <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-xl border ${themeStyles.statBorder} bg-black/20`}>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Ingresos MRR</span>
                <CreditCard className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold">$14,250</p>
              <p className="text-xs text-emerald-400 mt-1 font-medium">+18.2% este mes (Lemon Squeezy)</p>
            </div>

            <div className={`p-4 rounded-xl border ${themeStyles.statBorder} bg-black/20`}>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Proyectos Activos</span>
                <FolderKanban className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold">24</p>
              <p className="text-xs text-zinc-400 mt-1">Con soporte multi-tenant</p>
            </div>

            <div className={`p-4 rounded-xl border ${themeStyles.statBorder} bg-black/20`}>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Tareas en Progreso</span>
                <ListTodo className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold">142</p>
              <p className="text-xs text-blue-400 mt-1 font-medium">CRUD model Task optimizado</p>
            </div>
          </div>

          {/* Sample Task List Mock */}
          <div className={`rounded-xl border ${themeStyles.statBorder} bg-black/20 p-4 space-y-3`}>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 border-b border-white/5 pb-2">
              <span>DEMO CRUD: TAREAS DEL PROYECTO</span>
              <span>ESTADO / PRIORIDAD</span>
            </div>
            
            <div className="flex items-center justify-between text-sm py-1.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${themeStyles.accentText}`} />
                <span className="font-medium">Integrar Webhooks de Lemon Squeezy</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                FASE 2 • ALTA
              </span>
            </div>

            <div className="flex items-center justify-between text-sm py-1.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${themeStyles.accentText}`} />
                <span className="font-medium">Soporte multi-tema con variables HSL completas</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                COMPLETADO
              </span>
            </div>

            <div className="flex items-center justify-between text-sm py-1.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${themeStyles.accentText}`} />
                <span className="font-medium">Server Actions con validación Zod y optimismo UI</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                FASE 2 • CRÍTICA
              </span>
            </div>
          </div>
        </div>

        {/* Summary of Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Database className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">1. prisma/schema.prisma</h3>
            </div>
            <ul className="text-xs space-y-1.5 text-zinc-300">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Eliminado 100% de Stripe.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Campos Lemon Squeezy en User (Customer, Subscription, Variant/Price, PeriodEnd, Status).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Modelos <code>Project</code> y <code>Task</code> con enums de prioridad y estado.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Code2 className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">2. tailwind.config.js</h3>
            </div>
            <ul className="text-xs space-y-1.5 text-zinc-300">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sintaxis HSL de canal alfa <code>hsl(var(--...) / &lt;alpha-value&gt;)</code>.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tokens para charts, brand, sidebar y variantes.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Animaciones y keyframes ampliados para SaaS moderno.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Palette className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">3. styles/globals.css</h3>
            </div>
            <ul className="text-xs space-y-1.5 text-zinc-300">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>SaaS Minimal:</strong> Blanco y negro mate tipo Vercel.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Cyberpunk:</strong> Fondo oscuro con cian y fucsia neón.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Fintech:</strong> Fondo azul noche, esmeralda y menta.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-zinc-500 pt-4 border-t border-white/5">
          SaaS Boilerplate Premium • Fase 1 Lista para copiar y pegar en tu proyecto Next.js 14
        </div>
      </div>
    </div>
  );
}
