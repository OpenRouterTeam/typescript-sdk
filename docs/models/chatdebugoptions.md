# ChatDebugOptions

Debug options for inspecting request transformations (streaming only)

## Example Usage

```typescript
import { ChatDebugOptions } from "@openrouter/sdk/models";

let value: ChatDebugOptions = {};
```

## Fields

| Field                                                                                                                                | Type                                                                                                                                 | Required                                                                                                                             | Description                                                                                                                          | Example                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `echoUpstreamBody`                                                                                                                   | *boolean*                                                                                                                            | :heavy_minus_sign:                                                                                                                   | If true, includes the transformed upstream request body in a debug chunk at the start of the stream. Only works with streaming mode. | true                                                                                                                                 |