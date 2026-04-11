# ErrorEvent

Event emitted when an error occurs during streaming

## Example Usage

```typescript
import { ErrorEvent } from "@openrouter/sdk/models";

let value: ErrorEvent = {
  code: "<value>",
  message: "<value>",
  param: "<value>",
  sequenceNumber: 0,
  type: "error",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `code`             | *string*           | :heavy_check_mark: | N/A                |
| `message`          | *string*           | :heavy_check_mark: | N/A                |
| `param`            | *string*           | :heavy_check_mark: | N/A                |
| `sequenceNumber`   | *number*           | :heavy_check_mark: | N/A                |
| `type`             | *"error"*          | :heavy_check_mark: | N/A                |