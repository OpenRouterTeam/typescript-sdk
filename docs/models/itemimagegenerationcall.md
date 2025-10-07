# ItemImageGenerationCall

## Example Usage

```typescript
import { ItemImageGenerationCall } from "@openrouter/sdk/models";

let value: ItemImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  status: "in_progress",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.ItemTypeImageGenerationCall](../models/itemtypeimagegenerationcall.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `id`                                                                           | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `status`                                                                       | [models.ItemStatusEnum3](../models/itemstatusenum3.md)                         | :heavy_check_mark:                                                             | N/A                                                                            |