# JSONSchemaConfig

JSON Schema configuration object

## Example Usage

```typescript
import { JSONSchemaConfig } from "@openrouter/sdk/models";

let value: JSONSchemaConfig = {
  name: "math_response",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `name`                                                                                           | *string*                                                                                         | :heavy_check_mark:                                                                               | Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)                                   | math_response                                                                                    |
| `description`                                                                                    | *string*                                                                                         | :heavy_minus_sign:                                                                               | Schema description for the model                                                                 | A mathematical response                                                                          |
| `schema`                                                                                         | Record<string, *any*>                                                                            | :heavy_minus_sign:                                                                               | JSON Schema object                                                                               | {<br/>"type": "object",<br/>"properties": {<br/>"answer": {<br/>"type": "number"<br/>}<br/>},<br/>"required": [<br/>"answer"<br/>]<br/>} |
| `strict`                                                                                         | *boolean*                                                                                        | :heavy_minus_sign:                                                                               | Enable strict schema adherence                                                                   | false                                                                                            |