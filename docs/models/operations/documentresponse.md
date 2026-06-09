# DocumentResponse

The document object echoing the original input (text and/or image)

## Example Usage

```typescript
import { DocumentResponse } from "@openrouter/sdk/models/operations";

let value: DocumentResponse = {};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `image`                                                | *string*                                               | :heavy_minus_sign:                                     | The image (URL or data URI) from the original document | https://example.com/image.png                          |
| `text`                                                 | *string*                                               | :heavy_minus_sign:                                     | The document text                                      | Paris is the capital of France.                        |