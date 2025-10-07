# ChatGenerationParamsResponseFormatJSONSchema

## Example Usage

```typescript
import { ChatGenerationParamsResponseFormatJSONSchema } from "@openrouter/sdk/models";

let value: ChatGenerationParamsResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
    description: "consequently alert unnaturally until and orientate ski gray",
    schema: {
      "key": "<value>",
      "key1": "<value>",
    },
    strict: false,
  },
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `jsonSchema`                                                                         | [models.ChatGenerationParamsJsonSchema](../models/chatgenerationparamsjsonschema.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |