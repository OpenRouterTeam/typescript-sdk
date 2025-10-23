import { OpenRouter } from "@openrouter/sdk";

export async function POST(request: Request) {
    const openRouter = new OpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
    });

    const { messages } = await request.json();

    const result = await openRouter.chat.send({
        model: "openai/gpt-4o",
        messages: messages,
    });

    result.choices[0].message.content;

    return new Response(result.pipeThrough(new TextEncoderStream()));
}