# ChatCompletionCreateParamsResponseFormatJSONSchema

JSON Schema response format for structured outputs

## Example Usage

```typescript
import { ChatCompletionCreateParamsResponseFormatJSONSchema } from "open-router/models";

let value: ChatCompletionCreateParamsResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                   | [models.ChatCompletionCreateParamsTypeJSONSchema](../models/chatcompletioncreateparamstypejsonschema.md) | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `jsonSchema`                                                                                             | [models.ChatCompletionCreateParamsJsonSchema](../models/chatcompletioncreateparamsjsonschema.md)         | :heavy_check_mark:                                                                                       | N/A                                                                                                      |