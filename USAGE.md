<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.beta.responses.send({
    responsesRequest: {},
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->