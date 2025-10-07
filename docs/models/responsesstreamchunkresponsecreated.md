# ResponsesStreamChunkResponseCreated

## Example Usage

```typescript
import { ResponsesStreamChunkResponseCreated } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseCreated = {
  type: "response.created",
  response: {
    id: "<id>",
    createdAt: 1548.79,
    model: "Golf",
  },
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `type`                                                         | [models.TypeResponseCreated](../models/typeresponsecreated.md) | :heavy_check_mark:                                             | N/A                                                            |
| `response`                                                     | [models.Response2](../models/response2.md)                     | :heavy_check_mark:                                             | N/A                                                            |