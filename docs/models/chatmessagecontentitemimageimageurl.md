# ChatMessageContentItemImageImageUrl

## Example Usage

```typescript
import { ChatMessageContentItemImageImageUrl } from "@openrouter/sdk/models";

let value: ChatMessageContentItemImageImageUrl = {
  url: "https://agile-battle.info/",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `url`                                                                                      | *string*                                                                                   | :heavy_check_mark:                                                                         | URL of the image (data: URLs supported)                                                    |
| `detail`                                                                                   | [models.ChatMessageContentItemImageDetail](../models/chatmessagecontentitemimagedetail.md) | :heavy_minus_sign:                                                                         | Image detail level for vision models                                                       |