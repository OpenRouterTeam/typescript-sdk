# ResponsesErrorField

Error information returned from the API

## Example Usage

```typescript
import { ResponsesErrorField } from "@openrouter/sdk/models";

let value: ResponsesErrorField = {
  code: "invalid_prompt",
  message: "<value>",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `code`                                                                 | [models.ResponsesErrorFieldCode](../models/responseserrorfieldcode.md) | :heavy_check_mark:                                                     | N/A                                                                    |
| `message`                                                              | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |