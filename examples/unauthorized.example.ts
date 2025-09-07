import dotenv from "dotenv";
dotenv.config();
import { OpenRouter } from "open-router";
const openRouter = new OpenRouter({
  apiKey: "",
});
async function main() {
  const result = await openRouter.chat.complete({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });
  console.log(result);
}
main()