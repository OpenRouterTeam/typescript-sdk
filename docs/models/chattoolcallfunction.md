# ChatToolCallFunction

## Example Usage

```typescript
import { ChatToolCallFunction } from "@openrouter/sdk/models";

let value: ChatToolCallFunction = {
  arguments: "<value>",
  name: "<value>",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `arguments`                       | *string*                          | :heavy_check_mark:                | Function arguments as JSON string |
| `name`                            | *string*                          | :heavy_check_mark:                | Function name to call             |