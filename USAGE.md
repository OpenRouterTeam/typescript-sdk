<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.getCredits();

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->