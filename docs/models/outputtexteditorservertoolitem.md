# OutputTextEditorServerToolItem

An openrouter:text_editor server tool output item

## Example Usage

```typescript
import { OutputTextEditorServerToolItem } from "@openrouter/sdk/models";

let value: OutputTextEditorServerToolItem = {
  status: "completed",
  type: "openrouter:text_editor",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `command`                                                                                    | [models.Command](../models/command.md)                                                       | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `filePath`                                                                                   | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_check_mark:                                                                           | N/A                                                                                          | completed                                                                                    |
| `type`                                                                                       | [models.OutputTextEditorServerToolItemType](../models/outputtexteditorservertoolitemtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |