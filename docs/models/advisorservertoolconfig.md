# AdvisorServerToolConfig

Configuration for the openrouter:advisor server tool

## Example Usage

```typescript
import { AdvisorServerToolConfig } from "@openrouter/sdk/models";

let value: AdvisorServerToolConfig = {
  model: "anthropic/claude-opus-4-7",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              | Example                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `maxUses`                                                                                                | *number*                                                                                                 | :heavy_minus_sign:                                                                                       | Maximum number of advisor calls allowed per request. Defaults to 3, max 10.                              | 3                                                                                                        |
| `model`                                                                                                  | *string*                                                                                                 | :heavy_check_mark:                                                                                       | The advisor model ID to consult (e.g. "anthropic/claude-opus-4-7"). Billed at the advisor model's rates. | anthropic/claude-opus-4-7                                                                                |