# NamespaceTool

Groups related function/custom tools under a named namespace

## Example Usage

```typescript
import { NamespaceTool } from "@openrouter/sdk/models";

let value: NamespaceTool = {
  description: "CRM tools for customer lookup and order management.",
  name: "crm",
  tools: [
    {
      name: "get_customer_profile",
      type: "function",
    },
  ],
  type: "namespace",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `description`                     | *string*                          | :heavy_check_mark:                | N/A                               |
| `name`                            | *string*                          | :heavy_check_mark:                | N/A                               |
| `tools`                           | *models.NamespaceToolToolUnion*[] | :heavy_check_mark:                | N/A                               |
| `type`                            | *"namespace"*                     | :heavy_check_mark:                | N/A                               |