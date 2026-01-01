import { CHATBOT_CONFIG } from "../config/chatbot";

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getChatbotResponse(_prompt: string): Promise<string> {
  // Blindado: nunca rompe la web.
  if (CHATBOT_CONFIG.DEMO_MODE) return pick(CHATBOT_CONFIG.DEMO_RESPONSES);

  // Si algún día activas IA real, pon tu implementación aquí.
  return "Asistente no disponible en este entorno.";
}
