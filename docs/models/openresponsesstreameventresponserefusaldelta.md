# OpenResponsesStreamEventResponseRefusalDelta

Event emitted when a refusal delta is streamed

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseRefusalDelta } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseRefusalDelta = {
  type: "response.refusal.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "I'm sorry",
  sequenceNumber: 4,
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.TypeResponseRefusalDelta](../models/typeresponserefusaldelta.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `outputIndex`                                                            | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `itemId`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `contentIndex`                                                           | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `delta`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `sequenceNumber`                                                         | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |