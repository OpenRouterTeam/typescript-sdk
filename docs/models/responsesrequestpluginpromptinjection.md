# ResponsesRequestPluginPromptInjection

## Example Usage

```typescript
import { ResponsesRequestPluginPromptInjection } from "@openrouter/sdk/models";

let value: ResponsesRequestPluginPromptInjection = {
  id: "prompt-injection",
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       | Example                                                           |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `id`                                                              | *"prompt-injection"*                                              | :heavy_check_mark:                                                | N/A                                                               |                                                                   |
| `mode`                                                            | [models.PromptInjectionMode](../models/promptinjectionmode.md)    | :heavy_minus_sign:                                                | Detection mode for prompt injection attempts. Defaults to detect. | detect                                                            |