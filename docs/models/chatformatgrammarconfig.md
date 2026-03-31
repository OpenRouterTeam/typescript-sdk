# ChatFormatGrammarConfig

Custom grammar response format

## Example Usage

```typescript
import { ChatFormatGrammarConfig } from "@openrouter/sdk/models";

let value: ChatFormatGrammarConfig = {
  type: "grammar",
  grammar: "root ::= \"yes\" | \"no\"",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `type`                             | *"grammar"*                        | :heavy_check_mark:                 | N/A                                |                                    |
| `grammar`                          | *string*                           | :heavy_check_mark:                 | Custom grammar for text generation | root ::= "yes" \| "no"             |