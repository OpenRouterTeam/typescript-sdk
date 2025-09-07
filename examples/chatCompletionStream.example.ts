import dotenv from "dotenv";
dotenv.config();

import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function main() {
  const result = await openRouter.chat.complete({
    model: "openai/gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });

  for await (const chunk of result) {
    if (chunk.data?.choices?.[0]?.delta?.content) {
      process.stdout.write(chunk.data.choices[0].delta.content);
    }
  }
  console.log("\n\nStreaming completed");
}

main()
