# ResponsesStreamChunkResponseRefusalDelta

## Example Usage

```typescript
import { ResponsesStreamChunkResponseRefusalDelta } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseRefusalDelta = {
  type: "response.refusal.delta",
  itemId: "<id>",
  outputIndex: 4304.44,
  sequenceNumber: 3692.25,
  delta: "<value>",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.TypeResponseRefusalDelta](../models/typeresponserefusaldelta.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `itemId`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `outputIndex`                                                            | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `sequenceNumber`                                                         | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `delta`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |