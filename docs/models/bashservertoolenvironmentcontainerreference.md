# BashServerToolEnvironmentContainerReference

## Example Usage

```typescript
import { BashServerToolEnvironmentContainerReference } from "@openrouter/sdk/models";

let value: BashServerToolEnvironmentContainerReference = {
  containerId: "cntr_abc123",
  type: "container_reference",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   | Example                                       |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `containerId`                                 | *string*                                      | :heavy_check_mark:                            | Identifier of an existing container to reuse. | cntr_abc123                                   |
| `type`                                        | *"container_reference"*                       | :heavy_check_mark:                            | N/A                                           |                                               |