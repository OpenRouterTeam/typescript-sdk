# UpdatePresetRequest

Fields to update on the preset.

## Example Usage

```typescript
import { UpdatePresetRequest } from "@openrouter/sdk/models";

let value: UpdatePresetRequest = {};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         | Example                                             |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `description`                                       | *string*                                            | :heavy_minus_sign:                                  | New description for the preset. Pass null to clear. | A preset for creative writing tasks.                |
| `name`                                              | *string*                                            | :heavy_minus_sign:                                  | New name for the preset.                            | My Updated Preset                                   |