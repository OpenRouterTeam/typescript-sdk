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
  sequenceNumber: 1,
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
    status: "completed",
    completedAt: 7739.3,
    output: [
      {
        type: "message",
        status: "completed",
      },
    ],
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
  sequenceNumber: 10,
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
    status: "incomplete",
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
  sequenceNumber: 5,
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
    status: "failed",
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
  sequenceNumber: 3,
};
```

### `models.ErrorEvent`

```typescript
const value: models.ErrorEvent = {
  type: "error",
  code: "rate_limit_exceeded",
  message: "Rate limit exceeded. Please try again later.",
  param: null,
  sequenceNumber: 2,
};
```

### `models.StreamEventsResponseOutputItemAdded`

```typescript
const value: models.StreamEventsResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 0,
  item: {
    type: "message",
    status: "in_progress",
  },
  sequenceNumber: 2,
};
```

### `models.StreamEventsResponseOutputItemDone`

```typescript
const value: models.StreamEventsResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 0,
  item: {
    type: "message",
    status: "completed",
  },
  sequenceNumber: 8,
};
```

### `models.ContentPartAddedEvent`

```typescript
const value: models.ContentPartAddedEvent = {
  type: "response.content_part.added",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  part: {
    type: "output_text",
    text: "",
  },
  sequenceNumber: 3,
};
```

### `models.ContentPartDoneEvent`

```typescript
const value: models.ContentPartDoneEvent = {
  type: "response.content_part.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  part: {
    type: "output_text",
    text: "Hello! How can I help you?",
  },
  sequenceNumber: 7,
};
```

### `models.TextDeltaEvent`

```typescript
const value: models.TextDeltaEvent = {
  type: "response.output_text.delta",
  logprobs: [],
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "Hello",
  sequenceNumber: 4,
};
```

### `models.TextDoneEvent`

```typescript
const value: models.TextDoneEvent = {
  type: "response.output_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text: "Hello! How can I help you?",
  sequenceNumber: 6,
  logprobs: [],
};
```

### `models.RefusalDeltaEvent`

```typescript
const value: models.RefusalDeltaEvent = {
  type: "response.refusal.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "I'm sorry",
  sequenceNumber: 4,
};
```

### `models.RefusalDoneEvent`

```typescript
const value: models.RefusalDoneEvent = {
  type: "response.refusal.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  refusal: "I'm sorry, but I can't assist with that request.",
  sequenceNumber: 6,
};
```

### `models.AnnotationAddedEvent`

```typescript
const value: models.AnnotationAddedEvent = {
  type: "response.output_text.annotation.added",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  sequenceNumber: 5,
  annotationIndex: 0,
  annotation: {
    type: "url_citation",
    url: "https://example.com",
    title: "Example",
    startIndex: 0,
    endIndex: 7,
  },
};
```

### `models.FunctionCallArgsDeltaEvent`

```typescript
const value: models.FunctionCallArgsDeltaEvent = {
  type: "response.function_call_arguments.delta",
  itemId: "item-1",
  outputIndex: 0,
  delta: "{\"city\": \"San",
  sequenceNumber: 4,
};
```

### `models.FunctionCallArgsDoneEvent`

```typescript
const value: models.FunctionCallArgsDoneEvent = {
  type: "response.function_call_arguments.done",
  itemId: "item-1",
  outputIndex: 0,
  name: "get_weather",
  arguments: "{\"city\": \"San Francisco\", \"units\": \"celsius\"}",
  sequenceNumber: 6,
};
```

### `models.ReasoningDeltaEvent`

```typescript
const value: models.ReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "First, we need",
  sequenceNumber: 4,
};
```

### `models.ReasoningDoneEvent`

```typescript
const value: models.ReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text:
    "First, we need to identify the key components and then combine them logically.",
  sequenceNumber: 6,
};
```

### `models.ReasoningSummaryPartAddedEvent`

```typescript
const value: models.ReasoningSummaryPartAddedEvent = {
  type: "response.reasoning_summary_part.added",
  outputIndex: 0,
  itemId: "item-1",
  summaryIndex: 0,
  part: {
    type: "summary_text",
    text: "",
  },
  sequenceNumber: 3,
};
```

### `models.ReasoningSummaryPartDoneEvent`

```typescript
const value: models.ReasoningSummaryPartDoneEvent = {
  type: "response.reasoning_summary_part.done",
  outputIndex: 0,
  itemId: "item-1",
  summaryIndex: 0,
  part: {
    type: "summary_text",
    text: "Analyzing the problem step by step to find the optimal solution.",
  },
  sequenceNumber: 7,
};
```

### `models.ReasoningSummaryTextDeltaEvent`

```typescript
const value: models.ReasoningSummaryTextDeltaEvent = {
  type: "response.reasoning_summary_text.delta",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  delta: "Analyzing",
  sequenceNumber: 4,
};
```

### `models.ReasoningSummaryTextDoneEvent`

```typescript
const value: models.ReasoningSummaryTextDoneEvent = {
  type: "response.reasoning_summary_text.done",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  text: "Analyzing the problem step by step to find the optimal solution.",
  sequenceNumber: 6,
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

