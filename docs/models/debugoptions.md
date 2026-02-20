# DebugOptions

Debug options for inspecting request transformations (streaming only)

## Example Usage

```typescript
import { DebugOptions } from "@openrouter/sdk/models";

let value: DebugOptions = {};
```

## Fields

| Field                                                                                                                                | Type                                                                                                                                 | Required                                                                                                                             | Description                                                                                                                          | Example                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `echoUpstreamBody`                                                                                                                   | *boolean*                                                                                                                            | :heavy_minus_sign:                                                                                                                   | If true, includes the transformed upstream request body in a debug chunk at the start of the stream. Only works with streaming mode. | true                                                                                                                                 |