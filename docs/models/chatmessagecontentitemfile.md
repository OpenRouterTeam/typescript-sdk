# ChatMessageContentItemFile

## Example Usage

```typescript
import { ChatMessageContentItemFile } from "@openrouter/sdk/models";

let value: ChatMessageContentItemFile = {
  type: "file",
  file: {
    fileData: "<value>",
  },
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `type`                             | *string*                           | :heavy_check_mark:                 | N/A                                |
| `file`                             | [models.FileT](../models/filet.md) | :heavy_check_mark:                 | N/A                                |