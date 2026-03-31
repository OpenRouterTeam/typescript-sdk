# ChatContentFile

File content part for document processing

## Example Usage

```typescript
import { ChatContentFile } from "@openrouter/sdk/models";

let value: ChatContentFile = {
  type: "file",
  file: {},
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `type`                                                         | [models.ChatContentFileType](../models/chatcontentfiletype.md) | :heavy_check_mark:                                             | N/A                                                            |
| `file`                                                         | [models.FileT](../models/filet.md)                             | :heavy_check_mark:                                             | N/A                                                            |