# ClassifierFilters

Filter results to generations with specific classifier tag values. Can be combined with classifier_dimensions (must use the same classifier_id) or used independently with standard dimensions.

## Example Usage

```typescript
import { ClassifierFilters } from "@openrouter/sdk/models/operations";

let value: ClassifierFilters = {
  classifierId: "550e8400-e29b-41d4-a716-446655440000",
  filters: [],
};
```

## Fields

| Field                                                                                                                   | Type                                                                                                                    | Required                                                                                                                | Description                                                                                                             | Example                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `classifierId`                                                                                                          | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | UUID of the classifier whose tags to filter by. Must match classifier_dimensions.classifier_id when both are specified. | 550e8400-e29b-41d4-a716-446655440000                                                                                    |
| `filters`                                                                                                               | [operations.ClassifierFiltersFilter](../../models/operations/classifierfiltersfilter.md)[]                              | :heavy_check_mark:                                                                                                      | N/A                                                                                                                     |                                                                                                                         |