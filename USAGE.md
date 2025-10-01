<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.alpha.responses.send2({
    provider: {
      zdr: true,
    },
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->