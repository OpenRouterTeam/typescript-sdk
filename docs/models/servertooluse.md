# ServerToolUse

Usage for server-side tool execution (e.g., web search)

## Example Usage

```typescript
import { ServerToolUse } from "@openrouter/sdk/models";

let value: ServerToolUse = {};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `toolCallsExecuted`                                                        | *number*                                                                   | :heavy_minus_sign:                                                         | Number of OpenRouter server tool calls that executed and produced a result |
| `toolCallsRequested`                                                       | *number*                                                                   | :heavy_minus_sign:                                                         | Number of OpenRouter server tool calls the model requested                 |
| `webSearchRequests`                                                        | *number*                                                                   | :heavy_minus_sign:                                                         | Number of web searches performed by server-side tools                      |