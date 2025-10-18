# OpenResponsesPrompt

Prompt template with variables for the response

## Example Usage

```typescript
import { OpenResponsesPrompt } from "@openrouter/sdk/models";

let value: OpenResponsesPrompt = {
  id: "prompt-abc123",
  variables: {
    "name": {
      type: "input_text",
      text: "John",
    },
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `id`                                               | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `variables`                                        | Record<string, *models.OpenResponsesInputContent*> | :heavy_minus_sign:                                 | N/A                                                |