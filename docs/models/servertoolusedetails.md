# ServerToolUseDetails

Usage for server-side tool execution (e.g., web search)

## Example Usage

```typescript
import { ServerToolUseDetails } from "@openrouter/sdk/models";

let value: ServerToolUseDetails = {};
```

## Fields

| Field                                                                                                                                                    | Type                                                                                                                                                     | Required                                                                                                                                                 | Description                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toolCallsExecuted`                                                                                                                                      | *number*                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                       | Number of OpenRouter server tool calls that executed and produced a result                                                                               |
| `toolCallsRequested`                                                                                                                                     | *number*                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                       | Total number of OpenRouter server tool calls the model requested, across all tool types (including web search).                                          |
| `webSearchRequests`                                                                                                                                      | *number*                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                       | Number of web searches performed by server-side tools. These are a subset of tool_calls_requested (a web search increments both), so do not sum the two. |