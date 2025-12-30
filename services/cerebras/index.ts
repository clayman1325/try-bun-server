import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { AIService, ChatMessage } from '../../types';

const cerebras = new Cerebras();

export const cerebrasService: AIService = {
  name: "cerebras",
  async chat(messages: ChatMessage[]) {
    const formattedMessages = messages.map((m) => ({
      role: m.role as "system" | "user" | "assistant",
      content: m.content,
    }));

    const stream = await cerebras.chat.completions.create({
      messages: formattedMessages,
      model: 'zai-glm-4.6',
      stream: true,
      max_completion_tokens: 40960,
      temperature: 0.6,
      top_p: 0.95
    }) as AsyncIterable<{ choices: { delta?: { content?: string } }[] }>;

    return (async function*() {
      for await (const chunk of stream) {
        yield chunk.choices[0]?.delta?.content || '';
      }
    })();
  }
};