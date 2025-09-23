# GetModelsResponseBody

Returns a list of models or RSS feed

## Example Usage

```typescript
import { GetModelsResponseBody } from "@openrouter/sdk/models/operations";

let value: GetModelsResponseBody = {
  data: [],
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `data`                                                                 | [operations.GetModelsData](../../models/operations/getmodelsdata.md)[] | :heavy_check_mark:                                                     | List of available models                                               |