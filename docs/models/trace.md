# Trace

Metadata for observability and tracing. Known keys (trace_id, trace_name, span_name, generation_name, parent_span_id) have special handling. Additional keys are passed through as custom metadata to configured broadcast destinations.

## Example Usage

```typescript
import { Trace } from "@openrouter/sdk/models";

let value: Trace = {};
```

## Fields

| Field                  | Type                   | Required               | Description            |
| ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| `traceId`              | *string*               | :heavy_minus_sign:     | N/A                    |
| `traceName`            | *string*               | :heavy_minus_sign:     | N/A                    |
| `spanName`             | *string*               | :heavy_minus_sign:     | N/A                    |
| `generationName`       | *string*               | :heavy_minus_sign:     | N/A                    |
| `parentSpanId`         | *string*               | :heavy_minus_sign:     | N/A                    |
| `additionalProperties` | Record<string, *any*>  | :heavy_minus_sign:     | N/A                    |