<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.analytics.getActivity({
    date: "2025-08-24",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->