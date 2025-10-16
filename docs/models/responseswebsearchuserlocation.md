# ResponsesWebSearchUserLocation

User location information for web search

## Example Usage

```typescript
import { ResponsesWebSearchUserLocation } from "@openrouter/sdk/models";

let value: ResponsesWebSearchUserLocation = {
  type: "approximate",
  city: "Kristinaland",
  country: "Portugal",
  region: "<value>",
  timezone: "Pacific/Niue",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.ResponsesWebSearchUserLocationType](../models/responseswebsearchuserlocationtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `city`                                                                                       | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `country`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `region`                                                                                     | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `timezone`                                                                                   | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |