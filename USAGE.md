<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  bearerAuth: process.env["OPENROUTER_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await openRouter.chat.complete({
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });

  for await (const event of result) {
    // Handle the event
    console.log(event);
  }
}

run();

```
<!-- End SDK Example Usage [usage] -->