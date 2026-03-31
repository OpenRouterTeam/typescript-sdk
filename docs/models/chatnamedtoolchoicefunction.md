# ChatNamedToolChoiceFunction

## Example Usage

```typescript
import { ChatNamedToolChoiceFunction } from "@openrouter/sdk/models";

let value: ChatNamedToolChoiceFunction = {
  name: "get_weather",
};
```

## Fields

| Field                 | Type                  | Required              | Description           | Example               |
| --------------------- | --------------------- | --------------------- | --------------------- | --------------------- |
| `name`                | *string*              | :heavy_check_mark:    | Function name to call | get_weather           |