# FormatGrammar

## Example Usage

```typescript
import { FormatGrammar } from "@openrouter/sdk/models";

let value: FormatGrammar = {
  type: "grammar",
  definition: "<value>",
  syntax: "lark",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `type`                               | *"grammar"*                          | :heavy_check_mark:                   | N/A                                  |
| `definition`                         | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `syntax`                             | [models.Syntax](../models/syntax.md) | :heavy_check_mark:                   | N/A                                  |