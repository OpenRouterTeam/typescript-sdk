# ListToolsResponse

Paginated list of available server tools

## Example Usage

```typescript
import { ListToolsResponse } from "@openrouter/sdk/models";

let value: ListToolsResponse = {
  data: [
    {
      description: "Search the web for current information",
      type: "openrouter:web_search",
    },
  ],
  totalCount: 4,
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    | Example                                        |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `data`                                         | [models.ServerTool](../models/servertool.md)[] | :heavy_check_mark:                             | List of available server tools                 |                                                |
| `totalCount`                                   | *number*                                       | :heavy_check_mark:                             | Total number of available server tools         | 4                                              |