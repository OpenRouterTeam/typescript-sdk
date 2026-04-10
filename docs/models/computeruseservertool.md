# ComputerUseServerTool

Computer use preview tool configuration

## Example Usage

```typescript
import { ComputerUseServerTool } from "@openrouter/sdk/models";

let value: ComputerUseServerTool = {
  displayHeight: 768,
  displayWidth: 1024,
  environment: "linux",
  type: "computer_use_preview",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `displayHeight`                                | *number*                                       | :heavy_check_mark:                             | N/A                                            |
| `displayWidth`                                 | *number*                                       | :heavy_check_mark:                             | N/A                                            |
| `environment`                                  | [models.Environment](../models/environment.md) | :heavy_check_mark:                             | N/A                                            |
| `type`                                         | *"computer_use_preview"*                       | :heavy_check_mark:                             | N/A                                            |