# ChatStreamCompletionCreateParamsResponseFormatJSONSchema

JSON Schema response format for structured outputs

## Example Usage

```typescript
import { ChatStreamCompletionCreateParamsResponseFormatJSONSchema } from "open-router/models";

let value: ChatStreamCompletionCreateParamsResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                                                                                | Type                                                                                                                 | Required                                                                                                             | Description                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                               | [models.ChatStreamCompletionCreateParamsTypeJSONSchema](../models/chatstreamcompletioncreateparamstypejsonschema.md) | :heavy_check_mark:                                                                                                   | N/A                                                                                                                  |
| `jsonSchema`                                                                                                         | [models.ChatStreamCompletionCreateParamsJsonSchema](../models/chatstreamcompletioncreateparamsjsonschema.md)         | :heavy_check_mark:                                                                                                   | N/A                                                                                                                  |