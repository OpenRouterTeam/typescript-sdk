# OpenResponsesRequestToolFunction

Function tool definition

## Example Usage

```typescript
import { OpenResponsesRequestToolFunction } from "@openrouter/sdk/models";

let value: OpenResponsesRequestToolFunction = {
  type: "function",
  name: "get_weather",
  parameters: {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state",
      },
      "unit": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.OpenResponsesRequestType](../models/openresponsesrequesttype.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `name`                                                                   | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `description`                                                            | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `strict`                                                                 | *boolean*                                                                | :heavy_minus_sign:                                                       | N/A                                                                      |
| `parameters`                                                             | Record<string, *any*>                                                    | :heavy_check_mark:                                                       | N/A                                                                      |