# ChatJsonSchemaConfig

JSON Schema configuration object

## Example Usage

```typescript
import { ChatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: ChatJsonSchemaConfig = {
  name: "math_response",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `description`                                                                                    | *string*                                                                                         | :heavy_minus_sign:                                                                               | Schema description for the model                                                                 | A mathematical response                                                                          |
| `name`                                                                                           | *string*                                                                                         | :heavy_check_mark:                                                                               | Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)                                   | math_response                                                                                    |
| `schema`                                                                                         | Record<string, *any*>                                                                            | :heavy_minus_sign:                                                                               | JSON Schema object                                                                               | {<br/>"properties": {<br/>"answer": {<br/>"type": "number"<br/>}<br/>},<br/>"required": [<br/>"answer"<br/>],<br/>"type": "object"<br/>} |
| `strict`                                                                                         | *boolean*                                                                                        | :heavy_minus_sign:                                                                               | Enable strict schema adherence                                                                   | false                                                                                            |