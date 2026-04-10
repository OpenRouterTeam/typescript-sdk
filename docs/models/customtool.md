# CustomTool

Custom tool configuration

## Example Usage

```typescript
import { CustomTool } from "@openrouter/sdk/models";

let value: CustomTool = {
  name: "my_tool",
  type: "custom",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `description`      | *string*           | :heavy_minus_sign: | N/A                |
| `format`           | *models.Format*    | :heavy_minus_sign: | N/A                |
| `name`             | *string*           | :heavy_check_mark: | N/A                |
| `type`             | *"custom"*         | :heavy_check_mark: | N/A                |