# OpenResponsesCustomTool

Custom tool configuration

## Example Usage

```typescript
import { OpenResponsesCustomTool } from "@openrouter/sdk/models";

let value: OpenResponsesCustomTool = {
  type: "custom",
  name: "my_tool",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"custom"*         | :heavy_check_mark: | N/A                |
| `name`             | *string*           | :heavy_check_mark: | N/A                |
| `description`      | *string*           | :heavy_minus_sign: | N/A                |
| `format`           | *models.Format*    | :heavy_minus_sign: | N/A                |