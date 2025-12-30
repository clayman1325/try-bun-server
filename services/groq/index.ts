// import { Groq } from "groq";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// const chatCompletion = await groq.chat.completions.create({
//   "messages": [
//     {
//       "role": "user",
//       "content": "Hello, how are you?"
//     }
//   ],
//   "model": "moonshotai/kimi-k2-instruct-0905",
//   "max_tokens": 1000,
//   "temperature": 0.7,
//   "top_p": 1,
//   "frequency_penalty": 0,
//   "presence_penalty": 0,
//   "stream": true,
//   "stop": null
// });

// for await (const chunk of chatCompletion.stream) {
//   console.log(chunk.choices[0].delta.content);
// }

// export default groq;
import { Groq } from 'groq-sdk';
import type { AIService, ChatMessage } from '../../types';

const groq = new Groq();

export const groqService: AIService = {
  name: "groq",
  async chat(messages: ChatMessage[]) {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      "model": "openai/gpt-oss-120b",
      "temperature": 1,
      "max_completion_tokens": 8192,
      "top_p": 1,
      "stream": true,
      "reasoning_effort": "medium",
      "stop": null
    });

    return (async function*() {
      for await (const chunk of chatCompletion) {
        // process.stdout.write(chunk.choices[0]?.delta?.content || '');
        yield chunk.choices[0]?.delta?.content || '';
      }
    })();
  }
};
