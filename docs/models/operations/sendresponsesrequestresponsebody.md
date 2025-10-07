# SendResponsesRequestResponseBody

Successful response

## Example Usage

```typescript
import { SendResponsesRequestResponseBody } from "@openrouter/sdk/models/operations";

let value: SendResponsesRequestResponseBody = {
  data: {
    type: "response.output_text.annotation.added",
    annotation: {
      type: "url_citation",
      url: "https://regal-hammock.biz",
      title: "<value>",
      startIndex: 2449.04,
      endIndex: 8529.06,
    },
  },
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `data`                             | *models.ResponsesStreamChunkUnion* | :heavy_check_mark:                 | Streaming chunk from Responses API |