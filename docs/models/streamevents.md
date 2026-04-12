# StreamEvents

Union of all possible event types emitted during response streaming


## Supported Types

### `models.ErrorEvent`

```typescript
const value: models.ErrorEvent = {
  code: null,
  message: "<value>",
  param: null,
  sequenceNumber: 0,
  type: "error",
};
```

### `models.StreamEventsResponseCompleted`

```typescript
const value: models.StreamEventsResponseCompleted = {
  response: {
    completedAt: 720586,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 374.5,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 4244.7,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.completed",
};
```

### `models.ContentPartAddedEvent`

```typescript
const value: models.ContentPartAddedEvent = {
  contentIndex: 899905,
  itemId: "<id>",
  outputIndex: 34601,
  part: {
    text: "The capital of France is Paris.",
    type: "output_text",
  },
  sequenceNumber: 0,
  type: "response.content_part.added",
};
```

### `models.ContentPartDoneEvent`

```typescript
const value: models.ContentPartDoneEvent = {
  contentIndex: 112041,
  itemId: "<id>",
  outputIndex: 546268,
  part: {
    text: "The capital of France is Paris.",
    type: "output_text",
  },
  sequenceNumber: 0,
  type: "response.content_part.done",
};
```

### `models.OpenResponsesCreatedEvent`

```typescript
const value: models.OpenResponsesCreatedEvent = {
  response: {
    completedAt: 18438,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 864.34,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 9232.89,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.created",
};
```

### `models.StreamEventsResponseFailed`

```typescript
const value: models.StreamEventsResponseFailed = {
  response: {
    completedAt: 658388,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 6507.41,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 606.01,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.failed",
};
```

### `models.FunctionCallArgsDeltaEvent`

```typescript
const value: models.FunctionCallArgsDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 234869,
  sequenceNumber: 0,
  type: "response.function_call_arguments.delta",
};
```

### `models.FunctionCallArgsDoneEvent`

```typescript
const value: models.FunctionCallArgsDoneEvent = {
  arguments: "<value>",
  itemId: "<id>",
  name: "<value>",
  outputIndex: 603359,
  sequenceNumber: 0,
  type: "response.function_call_arguments.done",
};
```

### `models.ImageGenCallCompletedEvent`

```typescript
const value: models.ImageGenCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 165850,
  sequenceNumber: 0,
  type: "response.image_generation_call.completed",
};
```

### `models.ImageGenCallGeneratingEvent`

```typescript
const value: models.ImageGenCallGeneratingEvent = {
  itemId: "<id>",
  outputIndex: 708731,
  sequenceNumber: 0,
  type: "response.image_generation_call.generating",
};
```

### `models.ImageGenCallInProgressEvent`

```typescript
const value: models.ImageGenCallInProgressEvent = {
  itemId: "<id>",
  outputIndex: 788131,
  sequenceNumber: 0,
  type: "response.image_generation_call.in_progress",
};
```

### `models.ImageGenCallPartialImageEvent`

```typescript
const value: models.ImageGenCallPartialImageEvent = {
  itemId: "<id>",
  outputIndex: 173614,
  partialImageB64: "<value>",
  partialImageIndex: 192829,
  sequenceNumber: 0,
  type: "response.image_generation_call.partial_image",
};
```

### `models.OpenResponsesInProgressEvent`

```typescript
const value: models.OpenResponsesInProgressEvent = {
  response: {
    completedAt: 740024,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 9532.06,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: null,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.in_progress",
};
```

### `models.StreamEventsResponseIncomplete`

```typescript
const value: models.StreamEventsResponseIncomplete = {
  response: {
    completedAt: 881573,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 3189.43,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 5108.49,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.incomplete",
};
```

### `models.StreamEventsResponseOutputItemAdded`

```typescript
const value: models.StreamEventsResponseOutputItemAdded = {
  item: {
    content: [
      {
        text: "Hello! How can I help you today?",
        type: "output_text",
      },
    ],
    id: "msg-abc123",
    role: "assistant",
    type: "message",
  },
  outputIndex: 415042,
  sequenceNumber: 0,
  type: "response.output_item.added",
};
```

### `models.StreamEventsResponseOutputItemDone`

```typescript
const value: models.StreamEventsResponseOutputItemDone = {
  item: {
    content: [
      {
        text: "Hello! How can I help you today?",
        type: "output_text",
      },
    ],
    id: "msg-abc123",
    role: "assistant",
    type: "message",
  },
  outputIndex: 209831,
  sequenceNumber: 0,
  type: "response.output_item.done",
};
```

### `models.AnnotationAddedEvent`

```typescript
const value: models.AnnotationAddedEvent = {
  annotation: {
    fileId: "file-abc123",
    filename: "research_paper.pdf",
    index: 0,
    type: "file_citation",
  },
  annotationIndex: 104354,
  contentIndex: 252914,
  itemId: "<id>",
  outputIndex: 214233,
  sequenceNumber: 0,
  type: "response.output_text.annotation.added",
};
```

### `models.TextDeltaEvent`

```typescript
const value: models.TextDeltaEvent = {
  contentIndex: 699825,
  delta: "<value>",
  itemId: "<id>",
  logprobs: [
    {
      logprob: -0.5,
      token: "Hello",
    },
  ],
  outputIndex: 810486,
  sequenceNumber: 0,
  type: "response.output_text.delta",
};
```

### `models.TextDoneEvent`

```typescript
const value: models.TextDoneEvent = {
  contentIndex: 482041,
  itemId: "<id>",
  logprobs: [
    {
      logprob: -0.5,
      token: "Hello",
    },
  ],
  outputIndex: 634062,
  sequenceNumber: 0,
  text: "<value>",
  type: "response.output_text.done",
};
```

### `models.ReasoningSummaryPartAddedEvent`

```typescript
const value: models.ReasoningSummaryPartAddedEvent = {
  itemId: "<id>",
  outputIndex: 543957,
  part: {
    text: "Analyzed the problem using first principles",
    type: "summary_text",
  },
  sequenceNumber: 0,
  summaryIndex: 279769,
  type: "response.reasoning_summary_part.added",
};
```

### `models.ReasoningSummaryPartDoneEvent`

```typescript
const value: models.ReasoningSummaryPartDoneEvent = {
  itemId: "<id>",
  outputIndex: 831078,
  part: {
    text: "Analyzed the problem using first principles",
    type: "summary_text",
  },
  sequenceNumber: 0,
  summaryIndex: 817850,
  type: "response.reasoning_summary_part.done",
};
```

### `models.ReasoningSummaryTextDeltaEvent`

```typescript
const value: models.ReasoningSummaryTextDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 466359,
  sequenceNumber: 0,
  summaryIndex: 520709,
  type: "response.reasoning_summary_text.delta",
};
```

### `models.ReasoningSummaryTextDoneEvent`

```typescript
const value: models.ReasoningSummaryTextDoneEvent = {
  itemId: "<id>",
  outputIndex: 687012,
  sequenceNumber: 0,
  summaryIndex: 897970,
  text: "<value>",
  type: "response.reasoning_summary_text.done",
};
```

### `models.ReasoningDeltaEvent`

```typescript
const value: models.ReasoningDeltaEvent = {
  contentIndex: 55721,
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 143619,
  sequenceNumber: 0,
  type: "response.reasoning_text.delta",
};
```

### `models.ReasoningDoneEvent`

```typescript
const value: models.ReasoningDoneEvent = {
  contentIndex: 469495,
  itemId: "<id>",
  outputIndex: 408441,
  sequenceNumber: 0,
  text: "<value>",
  type: "response.reasoning_text.done",
};
```

### `models.RefusalDeltaEvent`

```typescript
const value: models.RefusalDeltaEvent = {
  contentIndex: 185954,
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 725096,
  sequenceNumber: 0,
  type: "response.refusal.delta",
};
```

### `models.RefusalDoneEvent`

```typescript
const value: models.RefusalDoneEvent = {
  contentIndex: 672921,
  itemId: "<id>",
  outputIndex: 193829,
  refusal: "<value>",
  sequenceNumber: 0,
  type: "response.refusal.done",
};
```

### `models.WebSearchCallCompletedEvent`

```typescript
const value: models.WebSearchCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 226042,
  sequenceNumber: 0,
  type: "response.web_search_call.completed",
};
```

### `models.WebSearchCallInProgressEvent`

```typescript
const value: models.WebSearchCallInProgressEvent = {
  itemId: "<id>",
  outputIndex: 153527,
  sequenceNumber: 0,
  type: "response.web_search_call.in_progress",
};
```

### `models.WebSearchCallSearchingEvent`

```typescript
const value: models.WebSearchCallSearchingEvent = {
  itemId: "<id>",
  outputIndex: 702452,
  sequenceNumber: 0,
  type: "response.web_search_call.searching",
};
```

