# StreamEvents

Union of all possible event types emitted during response streaming


## Supported Types

### `models.StreamEventsResponseCreated`

```typescript
const value: models.StreamEventsResponseCreated = {
  type: "response.created",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 1040.87,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 8447.53,
    frequencyPenalty: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 0,
};
```

### `models.StreamEventsResponseInProgress`

```typescript
const value: models.StreamEventsResponseInProgress = {
  type: "response.in_progress",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 7739.44,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 2125.41,
    frequencyPenalty: 2494.93,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 0,
};
```

### `models.StreamEventsResponseCompleted`

```typescript
const value: models.StreamEventsResponseCompleted = {
  type: "response.completed",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 7739.3,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: null,
    frequencyPenalty: 4244.7,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 0,
};
```

### `models.StreamEventsResponseIncomplete`

```typescript
const value: models.StreamEventsResponseIncomplete = {
  type: "response.incomplete",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 7972,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 8861.33,
    frequencyPenalty: 3923.12,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 0,
};
```

### `models.StreamEventsResponseFailed`

```typescript
const value: models.StreamEventsResponseFailed = {
  type: "response.failed",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 8451.03,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 4081.29,
    frequencyPenalty: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 0,
};
```

### `models.ErrorEvent`

```typescript
const value: models.ErrorEvent = {
  type: "error",
  code: null,
  message: "<value>",
  param: null,
  sequenceNumber: 0,
};
```

### `models.StreamEventsResponseOutputItemAdded`

```typescript
const value: models.StreamEventsResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 4150.42,
  item: {
    type: "message",
    status: "completed",
  },
  sequenceNumber: 0,
};
```

### `models.StreamEventsResponseOutputItemDone`

```typescript
const value: models.StreamEventsResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 2098.31,
  item: {
    type: "message",
    status: "completed",
  },
  sequenceNumber: 0,
};
```

### `models.ContentPartAddedEvent`

```typescript
const value: models.ContentPartAddedEvent = {
  type: "response.content_part.added",
  outputIndex: 8999.05,
  itemId: "<id>",
  contentIndex: 346.01,
  part: {
    type: "output_text",
    text: "The capital of France is Paris.",
  },
  sequenceNumber: 0,
};
```

### `models.ContentPartDoneEvent`

```typescript
const value: models.ContentPartDoneEvent = {
  type: "response.content_part.done",
  outputIndex: 1120.41,
  itemId: "<id>",
  contentIndex: 5462.68,
  part: {
    type: "output_text",
    text: "The capital of France is Paris.",
  },
  sequenceNumber: 0,
};
```

### `models.TextDeltaEvent`

```typescript
const value: models.TextDeltaEvent = {
  type: "response.output_text.delta",
  logprobs: [
    {
      logprob: -0.1,
      token: "world",
    },
  ],
  outputIndex: 6998.25,
  itemId: "<id>",
  contentIndex: 8104.86,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.TextDoneEvent`

```typescript
const value: models.TextDoneEvent = {
  type: "response.output_text.done",
  outputIndex: 4820.41,
  itemId: "<id>",
  contentIndex: 6340.62,
  text: "<value>",
  sequenceNumber: 0,
  logprobs: [
    {
      logprob: -0.1,
      token: "world",
    },
  ],
};
```

### `models.RefusalDeltaEvent`

```typescript
const value: models.RefusalDeltaEvent = {
  type: "response.refusal.delta",
  outputIndex: 1859.54,
  itemId: "<id>",
  contentIndex: 7250.96,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.RefusalDoneEvent`

```typescript
const value: models.RefusalDoneEvent = {
  type: "response.refusal.done",
  outputIndex: 6729.21,
  itemId: "<id>",
  contentIndex: 1938.29,
  refusal: "<value>",
  sequenceNumber: 0,
};
```

### `models.AnnotationAddedEvent`

```typescript
const value: models.AnnotationAddedEvent = {
  type: "response.output_text.annotation.added",
  outputIndex: 1043.54,
  itemId: "<id>",
  contentIndex: 2529.14,
  sequenceNumber: 0,
  annotationIndex: 2142.33,
  annotation: {
    type: "file_citation",
    fileId: "file-abc123",
    filename: "research_paper.pdf",
    index: 0,
  },
};
```

### `models.FunctionCallArgsDeltaEvent`

```typescript
const value: models.FunctionCallArgsDeltaEvent = {
  type: "response.function_call_arguments.delta",
  itemId: "<id>",
  outputIndex: 2348.69,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.FunctionCallArgsDoneEvent`

```typescript
const value: models.FunctionCallArgsDoneEvent = {
  type: "response.function_call_arguments.done",
  itemId: "<id>",
  outputIndex: 6033.59,
  name: "<value>",
  arguments: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningDeltaEvent`

```typescript
const value: models.ReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 557.21,
  itemId: "<id>",
  contentIndex: 1436.19,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningDoneEvent`

```typescript
const value: models.ReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 4694.95,
  itemId: "<id>",
  contentIndex: 4084.41,
  text: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningSummaryPartAddedEvent`

```typescript
const value: models.ReasoningSummaryPartAddedEvent = {
  type: "response.reasoning_summary_part.added",
  outputIndex: 5439.57,
  itemId: "<id>",
  summaryIndex: 2797.69,
  part: {
    type: "summary_text",
    text: "Analyzed the problem using first principles",
  },
  sequenceNumber: 0,
};
```

### `models.ReasoningSummaryPartDoneEvent`

```typescript
const value: models.ReasoningSummaryPartDoneEvent = {
  type: "response.reasoning_summary_part.done",
  outputIndex: 8310.78,
  itemId: "<id>",
  summaryIndex: 8178.5,
  part: {
    type: "summary_text",
    text: "Analyzed the problem using first principles",
  },
  sequenceNumber: 0,
};
```

### `models.ReasoningSummaryTextDeltaEvent`

```typescript
const value: models.ReasoningSummaryTextDeltaEvent = {
  type: "response.reasoning_summary_text.delta",
  itemId: "<id>",
  outputIndex: 4663.59,
  summaryIndex: 5207.09,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningSummaryTextDoneEvent`

```typescript
const value: models.ReasoningSummaryTextDoneEvent = {
  type: "response.reasoning_summary_text.done",
  itemId: "<id>",
  outputIndex: 6870.12,
  summaryIndex: 8979.7,
  text: "<value>",
  sequenceNumber: 0,
};
```

### `models.ImageGenCallInProgressEvent`

```typescript
const value: models.ImageGenCallInProgressEvent = {
  type: "response.image_generation_call.in_progress",
  itemId: "<id>",
  outputIndex: 7881.31,
  sequenceNumber: 0,
};
```

### `models.ImageGenCallGeneratingEvent`

```typescript
const value: models.ImageGenCallGeneratingEvent = {
  type: "response.image_generation_call.generating",
  itemId: "<id>",
  outputIndex: 7087.31,
  sequenceNumber: 0,
};
```

### `models.ImageGenCallPartialImageEvent`

```typescript
const value: models.ImageGenCallPartialImageEvent = {
  type: "response.image_generation_call.partial_image",
  itemId: "<id>",
  outputIndex: 1736.14,
  sequenceNumber: 0,
  partialImageB64: "<value>",
  partialImageIndex: 1928.29,
};
```

### `models.ImageGenCallCompletedEvent`

```typescript
const value: models.ImageGenCallCompletedEvent = {
  type: "response.image_generation_call.completed",
  itemId: "<id>",
  outputIndex: 1658.5,
  sequenceNumber: 0,
};
```

### `models.WebSearchCallInProgressEvent`

```typescript
const value: models.WebSearchCallInProgressEvent = {
  type: "response.web_search_call.in_progress",
  itemId: "<id>",
  outputIndex: 1535.27,
  sequenceNumber: 0,
};
```

### `models.WebSearchCallSearchingEvent`

```typescript
const value: models.WebSearchCallSearchingEvent = {
  type: "response.web_search_call.searching",
  itemId: "<id>",
  outputIndex: 7024.52,
  sequenceNumber: 0,
};
```

### `models.WebSearchCallCompletedEvent`

```typescript
const value: models.WebSearchCallCompletedEvent = {
  type: "response.web_search_call.completed",
  itemId: "<id>",
  outputIndex: 2260.42,
  sequenceNumber: 0,
};
```

