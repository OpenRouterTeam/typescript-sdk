# ChatFormatJsonSchemaConfig

JSON Schema response format for structured outputs

## Example Usage

```typescript
import { ChatFormatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: ChatFormatJsonSchemaConfig = {
  type: "json_schema",
  jsonSchema: {
    name: "math_response",
  },
};
```

## Fields

| Field                                                                                                                                                                                             | Type                                                                                                                                                                                              | Required                                                                                                                                                                                          | Description                                                                                                                                                                                       | Example                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                                                                                            | *"json_schema"*                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                | N/A                                                                                                                                                                                               |                                                                                                                                                                                                   |
| `jsonSchema`                                                                                                                                                                                      | [models.ChatJsonSchemaConfig](../models/chatjsonschemaconfig.md)                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                | JSON Schema configuration object                                                                                                                                                                  | {<br/>"name": "math_response",<br/>"description": "A mathematical response",<br/>"schema": {<br/>"type": "object",<br/>"properties": {<br/>"answer": {<br/>"type": "number"<br/>}<br/>},<br/>"required": [<br/>"answer"<br/>]<br/>},<br/>"strict": true<br/>} |