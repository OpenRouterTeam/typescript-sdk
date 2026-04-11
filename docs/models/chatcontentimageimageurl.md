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
| `detail`                                                             | [models.ChatContentImageDetail](../models/chatcontentimagedetail.md) | :heavy_minus_sign:                                                   | Image detail level for vision models                                 |
| `url`                                                                | *string*                                                             | :heavy_check_mark:                                                   | URL of the image (data: URLs supported)                              |