# WriteUserConfigResponse

Response body returned after writing per-user config.

## Example Usage

```typescript
import { WriteUserConfigResponse } from "@openrouter/sdk/models";

let value: WriteUserConfigResponse = {
  data: {
    engineId: "11111111-2222-3333-4444-555555555555",
    updatedAt: "2025-01-01T00:00:00Z",
    userId: "user_2dHFtVWx2n56w6HkM0000000000",
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `data`                                                                         | [models.WriteUserConfigResponseData](../models/writeuserconfigresponsedata.md) | :heavy_check_mark:                                                             | N/A                                                                            |