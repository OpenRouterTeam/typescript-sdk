# MessagesFallbackParam

Fallback model to try when the primary model fails or refuses. Only the `model` field is supported; per-attempt overrides are rejected.

## Example Usage

```typescript
import { MessagesFallbackParam } from "@openrouter/sdk/models";

let value: MessagesFallbackParam = {
  model: "claude-opus-4-8",
};
```

## Fields

| Field                          | Type                           | Required                       | Description                    | Example                        |
| ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ |
| `model`                        | *string*                       | :heavy_check_mark:             | N/A                            |                                |
| `additionalProperties`         | Record<string, *any*>          | :heavy_minus_sign:             | N/A                            | {<br/>"model": "claude-opus-4-8"<br/>} |