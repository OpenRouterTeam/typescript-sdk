<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  security: {
    apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
  },
});

async function run() {
  const result = await openRouter.getCredits();

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->