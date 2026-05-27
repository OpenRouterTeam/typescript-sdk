# AsyncJobStatusResponse

Status response for an in-flight or settled async job

## Example Usage

```typescript
import { AsyncJobStatusResponse } from "@openrouter/sdk/models";

let value: AsyncJobStatusResponse = {
  error: null,
  id: "gen-abc123",
  jobId: "async-xyz789",
  model: "openai/gpt-4o",
  status: "in_progress",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `error`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | Error message if the job failed                                                  | <nil>                                                                            |
| `id`                                                                             | *string*                                                                         | :heavy_check_mark:                                                               | The generation ID associated with this async job                                 | gen-abc123                                                                       |
| `jobId`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | The async job identifier                                                         | async-xyz789                                                                     |
| `model`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | Model used for the generation                                                    | openai/gpt-4o                                                                    |
| `status`                                                                         | [models.AsyncJobStatusResponseStatus](../models/asyncjobstatusresponsestatus.md) | :heavy_check_mark:                                                               | Current status of the async job                                                  | in_progress                                                                      |