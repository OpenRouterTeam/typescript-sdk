# GenerationWithContentResponseOutput

The output from the generation

## Example Usage

```typescript
import { GenerationWithContentResponseOutput } from "@openrouter/sdk/models";

let value: GenerationWithContentResponseOutput = {
  completion: "The meaning of life is a philosophical question...",
  reasoning: null,
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        | Example                                            |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `completion`                                       | *string*                                           | :heavy_check_mark:                                 | The completion output                              | The meaning of life is a philosophical question... |
| `reasoning`                                        | *string*                                           | :heavy_check_mark:                                 | Reasoning/thinking output, if any                  | <nil>                                              |