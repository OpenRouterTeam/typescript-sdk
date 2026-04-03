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
    completedAt: 722049,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: 1040.87,
    topP: 2117.86,
    presencePenalty: 8447.53,
    frequencyPenalty: 11.8,
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
    completedAt: 180200,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: 7739.44,
    topP: 8352.86,
    presencePenalty: 2125.41,
    frequencyPenalty: 7742.81,
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
    completedAt: 720586,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: 7739.3,
    topP: 374.5,
    presencePenalty: 3994.36,
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
    completedAt: 881573,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: 7972,
    topP: 3189.43,
    presencePenalty: 8861.33,
    frequencyPenalty: 5108.49,
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
    completedAt: 658388,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: 8451.03,
    topP: 6507.41,
    presencePenalty: 4081.29,
    frequencyPenalty: 606.01,
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
  outputIndex: 415042,
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
  outputIndex: 209831,
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
  outputIndex: 899905,
  itemId: "<id>",
  contentIndex: 34601,
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
  outputIndex: 112041,
  itemId: "<id>",
  contentIndex: 546268,
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
  outputIndex: 699825,
  itemId: "<id>",
  contentIndex: 810486,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.TextDoneEvent`

```typescript
const value: models.TextDoneEvent = {
  type: "response.output_text.done",
  outputIndex: 482041,
  itemId: "<id>",
  contentIndex: 634062,
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
  outputIndex: 185954,
  itemId: "<id>",
  contentIndex: 725096,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.RefusalDoneEvent`

```typescript
const value: models.RefusalDoneEvent = {
  type: "response.refusal.done",
  outputIndex: 672921,
  itemId: "<id>",
  contentIndex: 193829,
  refusal: "<value>",
  sequenceNumber: 0,
};
```

### `models.AnnotationAddedEvent`

```typescript
const value: models.AnnotationAddedEvent = {
  type: "response.output_text.annotation.added",
  outputIndex: 104354,
  itemId: "<id>",
  contentIndex: 252914,
  sequenceNumber: 0,
  annotationIndex: 214233,
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
  outputIndex: 234869,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.FunctionCallArgsDoneEvent`

```typescript
const value: models.FunctionCallArgsDoneEvent = {
  type: "response.function_call_arguments.done",
  itemId: "<id>",
  outputIndex: 603359,
  name: "<value>",
  arguments: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningDeltaEvent`

```typescript
const value: models.ReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 55721,
  itemId: "<id>",
  contentIndex: 143619,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningDoneEvent`

```typescript
const value: models.ReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 469495,
  itemId: "<id>",
  contentIndex: 408441,
  text: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningSummaryPartAddedEvent`

```typescript
const value: models.ReasoningSummaryPartAddedEvent = {
  type: "response.reasoning_summary_part.added",
  outputIndex: 543957,
  itemId: "<id>",
  summaryIndex: 279769,
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
  outputIndex: 831078,
  itemId: "<id>",
  summaryIndex: 817850,
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
  outputIndex: 466359,
  summaryIndex: 520709,
  delta: "<value>",
  sequenceNumber: 0,
};
```

### `models.ReasoningSummaryTextDoneEvent`

```typescript
const value: models.ReasoningSummaryTextDoneEvent = {
  type: "response.reasoning_summary_text.done",
  itemId: "<id>",
  outputIndex: 687012,
  summaryIndex: 897970,
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

