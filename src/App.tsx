import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ChatBot from "./components/ChatBot";

function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-display font-bold text-lg">{title}</div>
          <nav className="flex gap-3 text-sm">
            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
            <Link className="hover:underline" to="/ar-i">AR-I</Link>
            <Link className="hover:underline" to="/ar-cv">AR-CV</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <ChatBot />
    </div>
  );
}

function Dashboard() {
  return (
    <PageShell title="SAC AR-CV VEN">
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-display font-bold">Sistema de Gestión</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Web lista para GitHub Pages. El chatbot está en modo demo (no se rompe aunque no haya API keys).
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Link to="/ar-i" className="p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="font-semibold">Generar AR-I</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Formulario demo</div>
          </Link>
          <Link to="/ar-cv" className="p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="font-semibold">Generar AR-CV</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Formulario demo</div>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function SimpleForm({ name }: { name: string }) {
  return (
    <PageShell title={`Formulario ${name}`}>
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-display font-bold">{name}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Este es un formulario de demostración. Aquí puedes reemplazarlo con tus pantallas reales.
        </p>
      </div>
    </PageShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ar-i" element={<SimpleForm name="AR-I" />} />
      <Route path="/ar-cv" element={<SimpleForm name="AR-CV" />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
