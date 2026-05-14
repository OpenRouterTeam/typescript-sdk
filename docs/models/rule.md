# Rule

## Example Usage

```typescript
import { Rule } from "@openrouter/sdk/models";

let value: Rule = {
  field: "api_key_name",
  operator: "not_contains",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `field`                                      | [models.Field](../models/field.md)           | :heavy_check_mark:                           | N/A                                          |
| `operator`                                   | [models.Operator](../models/operator.md)     | :heavy_check_mark:                           | N/A                                          |
| `value`                                      | *models.ObservabilityFilterRulesConfigValue* | :heavy_minus_sign:                           | N/A                                          |