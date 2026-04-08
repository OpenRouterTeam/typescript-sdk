# ChatFormatGrammarConfig

Custom grammar response format

## Example Usage

```typescript
import { ChatFormatGrammarConfig } from "@openrouter/sdk/models";

let value: ChatFormatGrammarConfig = {
  grammar: "root ::= \"yes\" | \"no\"",
  type: "grammar",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `grammar`                          | *string*                           | :heavy_check_mark:                 | Custom grammar for text generation | root ::= "yes" \| "no"             |
| `type`                             | *"grammar"*                        | :heavy_check_mark:                 | N/A                                |                                    |