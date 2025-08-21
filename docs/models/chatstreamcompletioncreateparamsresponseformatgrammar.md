# ChatStreamCompletionCreateParamsResponseFormatGrammar

Custom grammar response format

## Example Usage

```typescript
import { ChatStreamCompletionCreateParamsResponseFormatGrammar } from "open-router/models";

let value: ChatStreamCompletionCreateParamsResponseFormatGrammar = {
  type: "grammar",
  grammar: "<value>",
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                         | [models.ChatStreamCompletionCreateParamsTypeGrammar](../models/chatstreamcompletioncreateparamstypegrammar.md) | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `grammar`                                                                                                      | *string*                                                                                                       | :heavy_check_mark:                                                                                             | Custom grammar for text generation                                                                             |