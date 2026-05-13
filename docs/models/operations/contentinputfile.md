# ContentInputFile

## Example Usage

```typescript
import { ContentInputFile } from "@openrouter/sdk/models/operations";

let value: ContentInputFile = {
  inputFile: {
    data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAw...",
  },
  type: "input_file",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `inputFile`                                                                            | [models.MultimodalInputFile](../../models/multimodalinputfile.md)                      | :heavy_check_mark:                                                                     | N/A                                                                                    | {<br/>"data": "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAw...",<br/>"format": "pdf"<br/>} |
| `type`                                                                                 | *"input_file"*                                                                         | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |