# ToolTypeSummary

Summary metadata for a canonical tool type the dashboard can bind to.

## Example Usage

```typescript
import { ToolTypeSummary } from "@openrouter/sdk/models";

let value: ToolTypeSummary = {
  description:
    "Returns the current date and time. Optionally accepts a timezone in the configuration.",
  displayName: "Datetime",
  fullName: "openrouter:datetime",
  inputSchemaJson:
    "{\"type\":\"object\",\"properties\":{\"timezone\":{\"type\":\"string\",\"description\":\"IANA timezone identifier\"}}}",
  supportsNativePassthrough: false,
};
```

## Fields

| Field                       | Type                        | Required                    | Description                 |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| `description`               | *string*                    | :heavy_check_mark:          | N/A                         |
| `displayName`               | *string*                    | :heavy_check_mark:          | N/A                         |
| `fullName`                  | *string*                    | :heavy_check_mark:          | N/A                         |
| `inputSchemaJson`           | *string*                    | :heavy_check_mark:          | N/A                         |
| `supportsNativePassthrough` | *boolean*                   | :heavy_check_mark:          | N/A                         |