# CompletionCreateParamsResponseFormatJSONSchema

## Example Usage

```typescript
import { CompletionCreateParamsResponseFormatJSONSchema } from "@openrouter/sdk/models";

let value: CompletionCreateParamsResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
    description: "athletic decent scuttle among excluding react",
    schema: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    strict: false,
  },
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `jsonSchema`                                                                             | [models.CompletionCreateParamsJsonSchema](../models/completioncreateparamsjsonschema.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |