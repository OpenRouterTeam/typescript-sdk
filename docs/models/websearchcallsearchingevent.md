# WebSearchCallSearchingEvent

Web search call is searching

## Example Usage

```typescript
import { WebSearchCallSearchingEvent } from "@openrouter/sdk/models";

let value: WebSearchCallSearchingEvent = {
  itemId: "<id>",
  outputIndex: 112521,
  sequenceNumber: 0,
  type: "response.web_search_call.searching",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `itemId`                               | *string*                               | :heavy_check_mark:                     | N/A                                    |
| `outputIndex`                          | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `sequenceNumber`                       | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `type`                                 | *"response.web_search_call.searching"* | :heavy_check_mark:                     | N/A                                    |