# ChatStreamToolCallFunction

Function call details

## Example Usage

```typescript
import { ChatStreamToolCallFunction } from "@openrouter/sdk/models";

let value: ChatStreamToolCallFunction = {};
```

## Fields

| Field                             | Type                              | Required                          | Description                       | Example                           |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `name`                            | *string*                          | :heavy_minus_sign:                | Function name                     | get_weather                       |
| `arguments`                       | *string*                          | :heavy_minus_sign:                | Function arguments as JSON string | {"location": "..."}               |