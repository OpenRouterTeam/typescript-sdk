# ResponseFormatGrammar

Custom grammar response format

## Example Usage

```typescript
import { ResponseFormatGrammar } from "open-router/models";

let value: ResponseFormatGrammar = {
  type: "grammar",
  grammar: "<value>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `type`                                         | [models.TypeGrammar](../models/typegrammar.md) | :heavy_check_mark:                             | N/A                                            |
| `grammar`                                      | *string*                                       | :heavy_check_mark:                             | Custom grammar for text generation             |