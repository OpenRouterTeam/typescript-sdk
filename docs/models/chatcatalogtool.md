# ChatCatalogTool

Catalog tool reference (`<orgSlug>:<engineSlug>`) resolved by the catalog DB.

## Example Usage

```typescript
import { ChatCatalogTool } from "@openrouter/sdk/models";

let value: ChatCatalogTool = {
  type: "function",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `parameters`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `type`                | *string*              | :heavy_check_mark:    | N/A                   |