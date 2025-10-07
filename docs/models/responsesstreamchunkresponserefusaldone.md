# ResponsesStreamChunkResponseRefusalDone

## Example Usage

```typescript
import { ResponsesStreamChunkResponseRefusalDone } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseRefusalDone = {
  type: "response.refusal.done",
  itemId: "<id>",
  outputIndex: 3954.77,
  sequenceNumber: 1963.51,
  refusal: "<value>",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | [models.TypeResponseRefusalDone](../models/typeresponserefusaldone.md) | :heavy_check_mark:                                                     | N/A                                                                    |
| `itemId`                                                               | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `outputIndex`                                                          | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `sequenceNumber`                                                       | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `refusal`                                                              | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |