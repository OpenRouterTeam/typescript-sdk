# WebFetchServerToolOpenRouterParameters

## Example Usage

```typescript
import { WebFetchServerToolOpenRouterParameters } from "@openrouter/sdk/models";

let value: WebFetchServerToolOpenRouterParameters = {};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `maxContentTokens`                                                                       | *number*                                                                                 | :heavy_minus_sign:                                                                       | Maximum content length in approximate tokens. Content exceeding this limit is truncated. | 100000                                                                                   |
| `maxUses`                                                                                | *number*                                                                                 | :heavy_minus_sign:                                                                       | Maximum number of web fetches per request. Once exceeded, the tool returns an error.     | 10                                                                                       |