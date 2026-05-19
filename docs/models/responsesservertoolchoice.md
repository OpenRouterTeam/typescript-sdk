# ResponsesServerToolChoice

OpenRouter extension: force a specific server tool by naming it directly in `tool_choice.type` (e.g. `openrouter:web_search`).

## Example Usage

```typescript
import { ResponsesServerToolChoice } from "@openrouter/sdk/models";

let value: ResponsesServerToolChoice = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              | Example                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                   | *string*                                                                                                 | :heavy_check_mark:                                                                                       | OpenRouter server-tool type to force (e.g. `openrouter:web_search`, `web_search`, `web_search_preview`). | openrouter:web_search                                                                                    |