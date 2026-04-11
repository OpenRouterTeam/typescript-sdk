# ContainerAuto

## Example Usage

```typescript
import { ContainerAuto } from "@openrouter/sdk/models";

let value: ContainerAuto = {
  type: "auto",
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `fileIds`                                          | *string*[]                                         | :heavy_minus_sign:                                 | N/A                                                |
| `memoryLimit`                                      | [models.MemoryLimit](../models/memorylimit.md)     | :heavy_minus_sign:                                 | N/A                                                |
| `type`                                             | [models.ContainerType](../models/containertype.md) | :heavy_check_mark:                                 | N/A                                                |