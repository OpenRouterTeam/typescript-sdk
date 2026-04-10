# VideoGenerationUsage

Usage and cost information for the video generation. Available once the job has completed.

## Example Usage

```typescript
import { VideoGenerationUsage } from "@openrouter/sdk/models";

let value: VideoGenerationUsage = {};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `cost`                                                                 | *number*                                                               | :heavy_minus_sign:                                                     | The cost of the video generation in USD.                               |
| `isByok`                                                               | *boolean*                                                              | :heavy_minus_sign:                                                     | Whether the request was made using a Bring Your Own Key configuration. |