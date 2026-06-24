<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
});

async function run() {
  const result = await openRouter.analytics.getUserActivity({
    managementKey: process.env["OPENROUTER_MANAGEMENT_KEY"] ?? "",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->