import { groqService } from './services/groq';
import { cerebrasService } from './services/cerebras';
import type { AIService, ChatMessage } from './types';

const services: AIService[] = [
  groqService,
  cerebrasService,
];

let currentService: AIService | null = null;
let serviceIndex = 0;

function getNextService() {
  if (services.length === 0) {
    throw new Error("No AI services configured");
  }

  serviceIndex = (serviceIndex + 1) % services.length;
  const nextService = services[serviceIndex];
  if (!nextService) {
    throw new Error("Service index out of range");
  }

  currentService = nextService;
  return currentService;
}

const messages: ChatMessage[] = [
  {
    role: "user",
    content: "Como se soluciona el fibonachin en JS con DP.",
  },
];

const server = Bun.serve({
  port: 3000,
  hostname: "localhost",
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (pathname === "/") {
      return new Response("Hello using Bun!");
    }

    if (req.method === "POST" && pathname === "/chat") {
      const { messages } = await req.json() as { messages: ChatMessage[] };
      const service = getNextService();
      console.log(`Using service: ${service.name}`);
      const stream = await service.chat(messages);

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          // "Transfer-Encoding": "chunked",
        },
      });
    }

    const service = getNextService();
    const response = await service.chat(messages);
    return new Response(response);
    return new Response("Hello using Bun!");
  },
});

console.log(`Server is running on ${server.url}`);