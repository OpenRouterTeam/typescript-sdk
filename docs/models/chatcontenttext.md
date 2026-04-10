# ChatContentText

Text content part

## Example Usage

```typescript
import { ChatContentText } from "@openrouter/sdk/models";

let value: ChatContentText = {
  text: "Hello, world!",
  type: "text",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `cacheControl`                                                         | [models.ChatContentCacheControl](../models/chatcontentcachecontrol.md) | :heavy_minus_sign:                                                     | Cache control for the content part                                     | {<br/>"ttl": "5m",<br/>"type": "ephemeral"<br/>}                       |
| `text`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `type`                                                                 | [models.ChatContentTextType](../models/chatcontenttexttype.md)         | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |