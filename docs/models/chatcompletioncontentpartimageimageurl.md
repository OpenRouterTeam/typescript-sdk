# ChatCompletionContentPartImageImageUrl

## Example Usage

```typescript
import { ChatCompletionContentPartImageImageUrl } from "open-router/models";

let value: ChatCompletionContentPartImageImageUrl = {
  url: "https://grandiose-metal.biz/",
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `url`                                   | *string*                                | :heavy_check_mark:                      | URL of the image (data: URLs supported) |
| `detail`                                | [models.Detail](../models/detail.md)    | :heavy_minus_sign:                      | Image detail level for vision models    |