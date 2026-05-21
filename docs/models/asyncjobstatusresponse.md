# AsyncJobStatusResponse

Status of an async generation job that has not yet completed

## Example Usage

```typescript
import { AsyncJobStatusResponse } from "@openrouter/sdk/models";

let value: AsyncJobStatusResponse = {
  id: "gen-1234567890",
  jobId: "job-abc123",
  model: "openai/gpt-4o",
  status: "in_progress",
};
```

## Fields

| Field                           | Type                            | Required                        | Description                     | Example                         |
| ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| `error`                         | *string*                        | :heavy_minus_sign:              | Error message if the job failed | Provider returned 503           |
| `id`                            | *string*                        | :heavy_check_mark:              | The generation ID               | gen-1234567890                  |
| `jobId`                         | *string*                        | :heavy_check_mark:              | The async job ID                | job-abc123                      |
| `model`                         | *string*                        | :heavy_check_mark:              | Model used for the generation   | openai/gpt-4o                   |
| `status`                        | *string*                        | :heavy_check_mark:              | Current status of the async job | in_progress                     |