# ResponseFormatTextGrammar

Custom grammar response format

## Example Usage

```typescript
import { ResponseFormatTextGrammar } from "@openrouter/sdk/models";

let value: ResponseFormatTextGrammar = {
  type: "grammar",
  grammar: "root ::= \"yes\" | \"no\"",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `type`                             | *"grammar"*                        | :heavy_check_mark:                 | N/A                                |                                    |
| `grammar`                          | *string*                           | :heavy_check_mark:                 | Custom grammar for text generation | root ::= "yes" \| "no"             |