# ChatContentText

Text content part

## Example Usage

```typescript
import { ChatContentText } from "@openrouter/sdk/models";

let value: ChatContentText = {
  type: "text",
  text: "Hello, world!",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | [models.ChatContentTextType](../models/chatcontenttexttype.md)         | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `text`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `cacheControl`                                                         | [models.ChatContentCacheControl](../models/chatcontentcachecontrol.md) | :heavy_minus_sign:                                                     | Cache control for the content part                                     | {<br/>"type": "ephemeral",<br/>"ttl": "5m"<br/>}                       |