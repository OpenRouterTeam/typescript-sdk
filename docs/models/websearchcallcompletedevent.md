# WebSearchCallCompletedEvent

Web search call completed

## Example Usage

```typescript
import { WebSearchCallCompletedEvent } from "@openrouter/sdk/models";

let value: WebSearchCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 871568,
  sequenceNumber: 0,
  type: "response.web_search_call.completed",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `itemId`                               | *string*                               | :heavy_check_mark:                     | N/A                                    |
| `outputIndex`                          | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `sequenceNumber`                       | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `type`                                 | *"response.web_search_call.completed"* | :heavy_check_mark:                     | N/A                                    |