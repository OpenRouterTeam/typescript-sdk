# ResponsesStreamChunkUnion

Streaming chunk from Responses API


## Supported Types

### `models.ResponsesStreamChunkResponseOutputTextDelta`

```typescript
const value: models.ResponsesStreamChunkResponseOutputTextDelta = {
  type: "response.output_text.delta",
  delta: "<value>",
  sequenceNumber: 8865.7,
};
```

### `models.ResponsesStreamChunk`

```typescript
const value: models.ResponsesStreamChunk = {
  type: "response.incomplete",
  response: {
    incompleteDetails: {
      reason: "max_output_tokens",
    },
    usage: {
      inputTokens: 256,
      inputTokensDetails: {
        cachedTokens: 128,
      },
      outputTokens: 128,
      outputTokensDetails: {
        reasoningTokens: 64,
      },
      totalTokens: 384,
      cost: 4401.75,
      isByok: false,
      costDetails: {
        upstreamInferenceCost: 1509.42,
        upstreamInferenceInputCost: 6579.23,
        upstreamInferenceOutputCost: 1082.47,
      },
    },
  },
};
```

### `models.ResponsesStreamChunkResponseCreated`

```typescript
const value: models.ResponsesStreamChunkResponseCreated = {
  type: "response.created",
  response: {
    id: "<id>",
    createdAt: 1548.79,
    model: "Golf",
  },
};
```

### `models.ResponsesStreamChunkResponseOutputItemDone`

```typescript
const value: models.ResponsesStreamChunkResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 9090.99,
  sequenceNumber: 395.41,
  item: {
    type: "function_call",
    id: "<id>",
    callId: "<id>",
    name: "<value>",
    arguments: "<value>",
  },
};
```

### `models.ResponsesStreamChunkResponseFunctionCallArgumentsDelta`

```typescript
const value: models.ResponsesStreamChunkResponseFunctionCallArgumentsDelta = {
  type: "response.function_call_arguments.delta",
  itemId: "<id>",
  outputIndex: 3017.33,
  sequenceNumber: 7653.28,
  delta: "<value>",
};
```

### `models.ResponsesStreamChunkResponseOutputItemAdded`

```typescript
const value: models.ResponsesStreamChunkResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 3366.31,
  item: {
    type: "web_search_call",
    id: "<id>",
    status: "searching",
  },
};
```

### `models.ResponsesStreamChunkResponseOutputTextAnnotationAdded`

```typescript
const value: models.ResponsesStreamChunkResponseOutputTextAnnotationAdded = {
  type: "response.output_text.annotation.added",
  annotation: {
    type: "url_citation",
    url: "https://regal-hammock.biz",
    title: "<value>",
    startIndex: 2449.04,
    endIndex: 8529.06,
  },
};
```

### `models.ResponsesStreamChunkResponseReasoningSummaryTextDelta`

```typescript
const value: models.ResponsesStreamChunkResponseReasoningSummaryTextDelta = {
  type: "response.reasoning_summary_text.delta",
  itemId: "<id>",
  outputIndex: 6678.26,
  summaryIndex: 3667,
  sequenceNumber: 6540.31,
  delta: "<value>",
};
```

### `models.ResponsesStreamChunkResponseFunctionCallArgumentsDone`

```typescript
const value: models.ResponsesStreamChunkResponseFunctionCallArgumentsDone = {
  type: "response.function_call_arguments.done",
  itemId: "<id>",
  outputIndex: 2332.99,
  sequenceNumber: 4865.85,
  arguments: "<value>",
};
```

### `models.ResponsesStreamChunkResponseWebSearchCallCompleted`

```typescript
const value: models.ResponsesStreamChunkResponseWebSearchCallCompleted = {
  type: "response.web_search_call.completed",
  itemId: "<id>",
  outputIndex: 3153.16,
  sequenceNumber: 6887.94,
};
```

### `models.ResponsesStreamChunkResponseFileSearchCallInProgress`

```typescript
const value: models.ResponsesStreamChunkResponseFileSearchCallInProgress = {
  type: "response.file_search_call.in_progress",
  itemId: "<id>",
  outputIndex: 5415.76,
};
```

### `models.ResponsesStreamChunkResponseFileSearchCallSearching`

```typescript
const value: models.ResponsesStreamChunkResponseFileSearchCallSearching = {
  type: "response.file_search_call.searching",
  itemId: "<id>",
  outputIndex: 2727.13,
  query: "<value>",
};
```

### `models.ResponsesStreamChunkResponseFileSearchCallCompleted`

```typescript
const value: models.ResponsesStreamChunkResponseFileSearchCallCompleted = {
  type: "response.file_search_call.completed",
  itemId: "<id>",
  outputIndex: 5219.2,
  results: [
    {
      fileId: "<id>",
      filename: "example.file",
      score: 9157.25,
    },
  ],
};
```

### `models.ResponsesStreamChunkResponseWebSearchCallInProgress`

```typescript
const value: models.ResponsesStreamChunkResponseWebSearchCallInProgress = {
  type: "response.web_search_call.in_progress",
  itemId: "<id>",
  outputIndex: 3722.49,
};
```

### `models.ResponsesStreamChunkResponseWebSearchCallSearching`

```typescript
const value: models.ResponsesStreamChunkResponseWebSearchCallSearching = {
  type: "response.web_search_call.searching",
  itemId: "<id>",
  outputIndex: 1023.77,
  query: "<value>",
  sequenceNumber: 3411.69,
};
```

### `models.ResponsesStreamChunkResponseImageGenerationCallInProgress`

```typescript
const value: models.ResponsesStreamChunkResponseImageGenerationCallInProgress =
  {
    type: "response.image_generation_call.in_progress",
    itemId: "<id>",
    outputIndex: 6113.14,
    sequenceNumber: 9228.5,
  };
```

### `models.ResponsesStreamChunkResponseImageGenerationCallGenerating`

```typescript
const value: models.ResponsesStreamChunkResponseImageGenerationCallGenerating =
  {
    type: "response.image_generation_call.generating",
    itemId: "<id>",
    outputIndex: 6650.72,
    sequenceNumber: 5832.9,
  };
```

### `models.ResponsesStreamChunkResponseImageGenerationCallPartialImage`

```typescript
const value:
  models.ResponsesStreamChunkResponseImageGenerationCallPartialImage = {
    type: "response.image_generation_call.partial_image",
    itemId: "<id>",
    outputIndex: 6625.36,
    sequenceNumber: 1518.92,
    partialImageB64: "<value>",
    partialImageIndex: 7871.03,
  };
```

### `models.ResponsesStreamChunkResponseImageGenerationCallCompleted`

```typescript
const value: models.ResponsesStreamChunkResponseImageGenerationCallCompleted = {
  type: "response.image_generation_call.completed",
  itemId: "<id>",
  outputIndex: 3940.96,
  sequenceNumber: 1686.31,
};
```

### `models.ResponsesStreamChunkResponseFailed`

```typescript
const value: models.ResponsesStreamChunkResponseFailed = {
  type: "response.failed",
  response: {
    id: "<id>",
    status: "failed",
    error: {
      code: "<value>",
      message: "<value>",
    },
  },
};
```

### `models.ResponsesStreamChunkResponseError`

```typescript
const value: models.ResponsesStreamChunkResponseError = {
  type: "response.error",
  error: {
    code: "<value>",
    message: "<value>",
  },
};
```

### `models.ResponsesStreamChunkResponseRefusalDelta`

```typescript
const value: models.ResponsesStreamChunkResponseRefusalDelta = {
  type: "response.refusal.delta",
  itemId: "<id>",
  outputIndex: 4304.44,
  sequenceNumber: 3692.25,
  delta: "<value>",
};
```

### `models.ResponsesStreamChunkResponseRefusalDone`

```typescript
const value: models.ResponsesStreamChunkResponseRefusalDone = {
  type: "response.refusal.done",
  itemId: "<id>",
  outputIndex: 3954.77,
  sequenceNumber: 1963.51,
  refusal: "<value>",
};
```

### `models.ResponsesStreamChunkError`

```typescript
const value: models.ResponsesStreamChunkError = {
  type: "error",
  error: {
    code: "<value>",
    message: "<value>",
  },
};
```

