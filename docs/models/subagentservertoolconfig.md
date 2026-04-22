# SubagentServerToolConfig

Configuration for the openrouter:subagent server tool

## Example Usage

```typescript
import { SubagentServerToolConfig } from "@openrouter/sdk/models";

let value: SubagentServerToolConfig = {};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `maxTokens`                                                                                        | *number*                                                                                           | :heavy_minus_sign:                                                                                 | Maximum number of tokens for the subagent response.                                                | 4096                                                                                               |
| `model`                                                                                            | *string*                                                                                           | :heavy_minus_sign:                                                                                 | Which model the subagent should use (e.g. "openai/gpt-4o-mini"). Defaults to "openai/gpt-4o-mini". | openai/gpt-4o-mini                                                                                 |