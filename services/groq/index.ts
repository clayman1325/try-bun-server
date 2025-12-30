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

const groq = new Groq();

const chatCompletion = await groq.chat.completions.create({
  "messages": [
    {
      "role": "user",
      "content": "Como se soluciona el fibonachin en JS con DP."
    }
  ],
  "model": "moonshotai/kimi-k2-instruct-0905",
  "temperature": 0.6,
  "max_completion_tokens": 4096,
  "top_p": 1,
  "stream": true,
  "stop": null
});

for await (const chunk of chatCompletion) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}