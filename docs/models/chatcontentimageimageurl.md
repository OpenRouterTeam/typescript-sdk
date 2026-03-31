# ChatContentImageImageUrl

## Example Usage

```typescript
import { ChatContentImageImageUrl } from "@openrouter/sdk/models";

let value: ChatContentImageImageUrl = {
  url: "https://torn-knuckle.org/",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `url`                                                                | *string*                                                             | :heavy_check_mark:                                                   | URL of the image (data: URLs supported)                              |
| `detail`                                                             | [models.ChatContentImageDetail](../models/chatcontentimagedetail.md) | :heavy_minus_sign:                                                   | Image detail level for vision models                                 |