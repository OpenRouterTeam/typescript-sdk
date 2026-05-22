# Result

The full deep research report. Present when status is completed. Contains the structured report with sections and citations.

## Example Usage

```typescript
import { Result } from "@openrouter/sdk/models";

let value: Result = {
  citations: [
    {
      url: "https://squeaky-trolley.biz",
    },
  ],
  sections: [
    {
      content: "<value>",
      heading: "<value>",
    },
  ],
  summary: "<value>",
  title: "<value>",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `citations`                                | [models.Citation](../models/citation.md)[] | :heavy_check_mark:                         | N/A                                        |
| `limitations`                              | *string*                                   | :heavy_minus_sign:                         | N/A                                        |
| `sections`                                 | [models.Section](../models/section.md)[]   | :heavy_check_mark:                         | N/A                                        |
| `summary`                                  | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `title`                                    | *string*                                   | :heavy_check_mark:                         | N/A                                        |