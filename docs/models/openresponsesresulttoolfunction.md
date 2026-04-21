# OpenResponsesResultToolFunction

Function tool definition

## Example Usage

```typescript
import { OpenResponsesResultToolFunction } from "@openrouter/sdk/models";

let value: OpenResponsesResultToolFunction = {
  name: "get_weather",
  parameters: {
    "properties": {
      "location": {
        "description": "The city and state",
        "type": "string",
      },
      "unit": {
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "type": "string",
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
    "type": "object",
  },
  type: "function",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `deferLoading`        | *boolean*             | :heavy_minus_sign:    | N/A                   |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `parameters`          | Record<string, *any*> | :heavy_check_mark:    | N/A                   |
| `strict`              | *boolean*             | :heavy_minus_sign:    | N/A                   |
| `type`                | *"function"*          | :heavy_check_mark:    | N/A                   |