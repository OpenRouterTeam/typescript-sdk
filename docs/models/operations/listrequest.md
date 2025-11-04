# ListRequest

## Example Usage

```typescript
import { ListRequest } from "@openrouter/sdk/models/operations";

let value: ListRequest = {};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `includeDisabled`                                    | *string*                                             | :heavy_minus_sign:                                   | Whether to include disabled API keys in the response | false                                                |
| `offset`                                             | *string*                                             | :heavy_minus_sign:                                   | Number of API keys to skip for pagination            | 0                                                    |