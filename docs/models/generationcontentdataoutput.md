# GenerationContentDataOutput

The output from the generation

## Example Usage

```typescript
import { GenerationContentDataOutput } from "@openrouter/sdk/models";

let value: GenerationContentDataOutput = {
  completion: "The meaning of life is a philosophical question...",
  reasoning: null,
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        | Example                                            |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `completion`                                       | *string*                                           | :heavy_check_mark:                                 | The completion output                              | The meaning of life is a philosophical question... |
| `reasoning`                                        | *string*                                           | :heavy_check_mark:                                 | Reasoning/thinking output, if any                  | <nil>                                              |