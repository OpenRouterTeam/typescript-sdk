# ChatCompletionToolFunction

Function definition for tool calling

## Example Usage

```typescript
import { ChatCompletionToolFunction } from "open-router/models";

let value: ChatCompletionToolFunction = {
  name: "<value>",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`                                                           | *string*                                                         | :heavy_check_mark:                                               | Function name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars) |
| `description`                                                    | *string*                                                         | :heavy_minus_sign:                                               | Function description for the model                               |
| `parameters`                                                     | [models.ParametersT](../models/parameterst.md)                   | :heavy_minus_sign:                                               | Function parameters as JSON Schema object                        |
| `strict`                                                         | *boolean*                                                        | :heavy_minus_sign:                                               | Enable strict schema adherence                                   |