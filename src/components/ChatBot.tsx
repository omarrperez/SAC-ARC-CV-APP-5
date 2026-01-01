import React, { useMemo, useState } from "react";
import { getChatbotResponse } from "../services/chatbotService";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hola 👋 Estoy en modo demo. Pregúntame sobre AR-I o AR-CV y te respondo sin romper la web." },
  ]);

  const containerClass = useMemo(
    () =>
      "fixed bottom-4 right-4 w-[92vw] sm:w-[420px] max-w-[420px] z-50",
    []
  );

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await getChatbotResponse(text);
      setMsgs((m) => [...m, { role: "assistant", text: res }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Demo: ocurrió un error, pero la web sigue estable." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={containerClass}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 text-white shadow-lg hover:bg-slate-800"
        >
          Abrir Chat (Demo)
        </button>
      ) : (
        <div className="rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div className="font-semibold">Asistente (Demo)</div>
            <button onClick={() => setOpen(false)} className="text-sm hover:underline">Cerrar</button>
          </div>

          <div className="p-3 h-64 overflow-auto space-y-2">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block px-3 py-2 rounded-xl text-sm " +
                    (m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800">
                  Escribiendo…
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
              placeholder="Escribe aquí…"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
            />
            <button
              onClick={send}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60"
              disabled={loading}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
