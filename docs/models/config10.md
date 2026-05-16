# Config10

## Example Usage

```typescript
import { Config10 } from "@openrouter/sdk/models";

let value: Config10 = {
  endpoint: "<value>",
};
```

## Fields

| Field                                                                                                                        | Type                                                                                                                         | Required                                                                                                                     | Description                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`                                                                                                                   | *string*                                                                                                                     | :heavy_check_mark:                                                                                                           | N/A                                                                                                                          |
| `headers`                                                                                                                    | Record<string, *string*>                                                                                                     | :heavy_minus_sign:                                                                                                           | Custom HTTP headers as a JSON object. For Axiom, use {"Authorization": "Bearer xaat-xxx", "X-Axiom-Dataset": "your-dataset"} |