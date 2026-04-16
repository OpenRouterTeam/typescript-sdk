# ListToolsResponse

## Example Usage

```typescript
import { ListToolsResponse } from "@openrouter/sdk/models/operations";

let value: ListToolsResponse = {
  result: {
    data: [
      {
        description: "Search the web for current information",
        type: "openrouter:web_search",
      },
    ],
    totalCount: 4,
  },
};
```

## Fields

| Field                                                                                                                                                     | Type                                                                                                                                                      | Required                                                                                                                                                  | Description                                                                                                                                               | Example                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result`                                                                                                                                                  | [models.ListToolsResponse](../../models/listtoolsresponse.md)                                                                                             | :heavy_check_mark:                                                                                                                                        | N/A                                                                                                                                                       | {<br/>"data": [<br/>{<br/>"description": "Search the web for current information",<br/>"parameters_schema": null,<br/>"type": "openrouter:web_search"<br/>}<br/>],<br/>"total_count": 4<br/>} |