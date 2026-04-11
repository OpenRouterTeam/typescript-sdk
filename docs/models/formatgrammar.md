# FormatGrammar

## Example Usage

```typescript
import { FormatGrammar } from "@openrouter/sdk/models";

let value: FormatGrammar = {
  definition: "<value>",
  syntax: "lark",
  type: "grammar",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `definition`                         | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `syntax`                             | [models.Syntax](../models/syntax.md) | :heavy_check_mark:                   | N/A                                  |
| `type`                               | *"grammar"*                          | :heavy_check_mark:                   | N/A                                  |