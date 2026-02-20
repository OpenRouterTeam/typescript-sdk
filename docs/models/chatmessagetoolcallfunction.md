# ChatMessageToolCallFunction

## Example Usage

```typescript
import { ChatMessageToolCallFunction } from "@openrouter/sdk/models";

let value: ChatMessageToolCallFunction = {
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `name`                            | *string*                          | :heavy_check_mark:                | Function name to call             |
| `arguments`                       | *string*                          | :heavy_check_mark:                | Function arguments as JSON string |