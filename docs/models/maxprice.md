# MaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { MaxPrice } from "open-router/models";

let value: MaxPrice = {};
```

## Fields

| Field               | Type                | Required            | Description         |
| ------------------- | ------------------- | ------------------- | ------------------- |
| `prompt`            | *models.Prompt*     | :heavy_minus_sign:  | N/A                 |
| `completion`        | *models.Completion* | :heavy_minus_sign:  | N/A                 |
| `image`             | *models.Image*      | :heavy_minus_sign:  | N/A                 |
| `audio`             | *models.Audio*      | :heavy_minus_sign:  | N/A                 |
| `request`           | *models.RequestT*   | :heavy_minus_sign:  | N/A                 |