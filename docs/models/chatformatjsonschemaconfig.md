# ChatFormatJsonSchemaConfig

JSON Schema response format for structured outputs

## Example Usage

```typescript
import { ChatFormatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: ChatFormatJsonSchemaConfig = {
  jsonSchema: {
    name: "math_response",
  },
  type: "json_schema",
};
```

## Fields

| Field                                                                                                                                                                                             | Type                                                                                                                                                                                              | Required                                                                                                                                                                                          | Description                                                                                                                                                                                       | Example                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jsonSchema`                                                                                                                                                                                      | [models.ChatJsonSchemaConfig](../models/chatjsonschemaconfig.md)                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                | JSON Schema configuration object                                                                                                                                                                  | {<br/>"description": "A mathematical response",<br/>"name": "math_response",<br/>"schema": {<br/>"properties": {<br/>"answer": {<br/>"type": "number"<br/>}<br/>},<br/>"required": [<br/>"answer"<br/>],<br/>"type": "object"<br/>},<br/>"strict": true<br/>} |
| `type`                                                                                                                                                                                            | *"json_schema"*                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                | N/A                                                                                                                                                                                               |                                                                                                                                                                                                   |