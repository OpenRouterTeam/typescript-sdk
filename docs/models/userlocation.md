# UserLocation

Approximate user location for location-biased search results. Passed through to native providers that support it (e.g. Anthropic).

## Example Usage

```typescript
import { UserLocation } from "@openrouter/sdk/models";

let value: UserLocation = {
  type: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `city`             | *string*           | :heavy_minus_sign: | N/A                |
| `country`          | *string*           | :heavy_minus_sign: | N/A                |
| `region`           | *string*           | :heavy_minus_sign: | N/A                |
| `timezone`         | *string*           | :heavy_minus_sign: | N/A                |
| `type`             | *string*           | :heavy_check_mark: | N/A                |