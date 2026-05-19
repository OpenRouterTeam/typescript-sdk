# PrivateModelLinks

Related API endpoints and resources for a private model.

## Example Usage

```typescript
import { PrivateModelLinks } from "@openrouter/sdk/models";

let value: PrivateModelLinks = {
  details: null,
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `details`                                                                                                        | *string*                                                                                                         | :heavy_check_mark:                                                                                               | URL for the public model endpoints API. Null for private model responses until a private endpoints route exists. |