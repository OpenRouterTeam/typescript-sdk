# ChatCompletionMessageToolCallFunction

## Example Usage

```typescript
import { ChatCompletionMessageToolCallFunction } from "open-router/models";

let value: ChatCompletionMessageToolCallFunction = {
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `name`                            | *string*                          | :heavy_check_mark:                | Function name to call             |
| `arguments`                       | *string*                          | :heavy_check_mark:                | Function arguments as JSON string |