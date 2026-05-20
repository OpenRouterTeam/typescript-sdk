# Dimension

## Example Usage

```typescript
import { Dimension } from "@openrouter/sdk/models/operations";

let value: Dimension = {
  availableIn: [
    "mv",
  ],
  displayLabel: "Model",
  name: "model",
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 | Example                                     |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `availableIn`                               | *string*[]                                  | :heavy_check_mark:                          | Data sources where this item is available   |                                             |
| `displayLabel`                              | *string*                                    | :heavy_check_mark:                          | Human-readable label                        | Model                                       |
| `name`                                      | *string*                                    | :heavy_check_mark:                          | Dimension identifier used in query requests | model                                       |