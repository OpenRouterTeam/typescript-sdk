# ResponsePrompt

Prompt configuration with variables

## Example Usage

```typescript
import { ResponsePrompt } from "@openrouter/sdk/models";

let value: ResponsePrompt = {
  id: "prompt-123",
  variables: {
    "user_name": {
      type: "input_text",
      text: "John",
    },
  },
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `id`                                          | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `variables`                                   | Record<string, *models.ResponseInputContent*> | :heavy_minus_sign:                            | N/A                                           |