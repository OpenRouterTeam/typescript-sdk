# WebSearchCallCompletedEvent

Web search call completed

## Example Usage

```typescript
import { WebSearchCallCompletedEvent } from "@openrouter/sdk/models";

let value: WebSearchCallCompletedEvent = {
  type: "response.web_search_call.completed",
  itemId: "<id>",
  outputIndex: 871568,
  sequenceNumber: 0,
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `type`                                 | *"response.web_search_call.completed"* | :heavy_check_mark:                     | N/A                                    |
| `itemId`                               | *string*                               | :heavy_check_mark:                     | N/A                                    |
| `outputIndex`                          | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `sequenceNumber`                       | *number*                               | :heavy_check_mark:                     | N/A                                    |