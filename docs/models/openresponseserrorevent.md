# OpenResponsesErrorEvent

Event emitted when an error occurs during streaming

## Example Usage

```typescript
import { OpenResponsesErrorEvent } from "@openrouter/sdk/models";

let value: OpenResponsesErrorEvent = {
  type: "error",
  code: "rate_limit_exceeded",
  message: "Rate limit exceeded. Please try again later.",
  param: null,
  sequenceNumber: 2,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"error"*          | :heavy_check_mark: | N/A                |
| `code`             | *string*           | :heavy_check_mark: | N/A                |
| `message`          | *string*           | :heavy_check_mark: | N/A                |
| `param`            | *string*           | :heavy_check_mark: | N/A                |
| `sequenceNumber`   | *number*           | :heavy_check_mark: | N/A                |