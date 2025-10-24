# OpenResponsesNonStreamingResponseToolFunction

Function tool definition

## Example Usage

```typescript
import { OpenResponsesNonStreamingResponseToolFunction } from "@openrouter/sdk/models";

let value: OpenResponsesNonStreamingResponseToolFunction = {
  type: "function",
  name: "get_weather",
  description: "Get the current weather in a location",
  strict: true,
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

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.OpenResponsesNonStreamingResponseType](../models/openresponsesnonstreamingresponsetype.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `name`                                                                                             | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `description`                                                                                      | *string*                                                                                           | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `strict`                                                                                           | *boolean*                                                                                          | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `parameters`                                                                                       | Record<string, *any*>                                                                              | :heavy_check_mark:                                                                                 | N/A                                                                                                |