# WebSearchCallSearchingEvent

Web search call is searching

## Example Usage

```typescript
import { WebSearchCallSearchingEvent } from "@openrouter/sdk/models";

let value: WebSearchCallSearchingEvent = {
  type: "response.web_search_call.searching",
  itemId: "<id>",
  outputIndex: 112521,
  sequenceNumber: 0,
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `type`                                 | *"response.web_search_call.searching"* | :heavy_check_mark:                     | N/A                                    |
| `itemId`                               | *string*                               | :heavy_check_mark:                     | N/A                                    |
| `outputIndex`                          | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `sequenceNumber`                       | *number*                               | :heavy_check_mark:                     | N/A                                    |