# OpenResponsesStreamEvent

Union of all possible event types emitted during response streaming


## Supported Types

### `models.OpenResponsesStreamEventResponseCreated`

```typescript
const value: models.OpenResponsesStreamEventResponseCreated = {
  type: "response.created",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 7999.81,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 6463.74,
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

### `models.OpenResponsesStreamEventResponseInProgress`

```typescript
const value: models.OpenResponsesStreamEventResponseInProgress = {
  type: "response.in_progress",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "in_progress",
    completedAt: 5374.05,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 6221.3,
    frequencyPenalty: 1294.49,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 1,
};
```

### `models.OpenResponsesStreamEventResponseCompleted`

```typescript
const value: models.OpenResponsesStreamEventResponseCompleted = {
  type: "response.completed",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "completed",
    completedAt: 3370.61,
    output: [
      {
        id: "item-1",
        role: "assistant",
        type: "message",
        content: [
          {
            type: "output_text",
            text: "Hello! How can I help you?",
          },
        ],
      },
    ],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 9760.35,
    frequencyPenalty: 8654.54,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 10,
};
```

### `models.OpenResponsesStreamEventResponseIncomplete`

```typescript
const value: models.OpenResponsesStreamEventResponseIncomplete = {
  type: "response.incomplete",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "incomplete",
    completedAt: 1221.53,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 7501.6,
    frequencyPenalty: 258.79,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 5,
};
```

### `models.OpenResponsesStreamEventResponseFailed`

```typescript
const value: models.OpenResponsesStreamEventResponseFailed = {
  type: "response.failed",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "failed",
    completedAt: 257.96,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 1169.05,
    frequencyPenalty: 2180.11,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 3,
};
```

### `models.OpenResponsesErrorEvent`

```typescript
const value: models.OpenResponsesErrorEvent = {
  type: "error",
  code: "rate_limit_exceeded",
  message: "Rate limit exceeded. Please try again later.",
  param: null,
  sequenceNumber: 2,
};
```

### `models.OpenResponsesStreamEventResponseOutputItemAdded`

```typescript
const value: models.OpenResponsesStreamEventResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 0,
  item: {
    id: "item-1",
    role: "assistant",
    type: "message",
    content: [],
  },
  sequenceNumber: 2,
};
```

### `models.OpenResponsesStreamEventResponseOutputItemDone`

```typescript
const value: models.OpenResponsesStreamEventResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 0,
  item: {
    id: "item-1",
    role: "assistant",
    type: "message",
    content: [
      {
        type: "output_text",
        text: "Hello! How can I help you?",
      },
    ],
  },
  sequenceNumber: 8,
};
```

### `models.OpenResponsesStreamEventResponseContentPartAdded`

```typescript
const value: models.OpenResponsesStreamEventResponseContentPartAdded = {
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

### `models.OpenResponsesStreamEventResponseContentPartDone`

```typescript
const value: models.OpenResponsesStreamEventResponseContentPartDone = {
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

### `models.OpenResponsesStreamEventResponseOutputTextDelta`

```typescript
const value: models.OpenResponsesStreamEventResponseOutputTextDelta = {
  type: "response.output_text.delta",
  logprobs: [],
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "Hello",
  sequenceNumber: 4,
};
```

### `models.OpenResponsesStreamEventResponseOutputTextDone`

```typescript
const value: models.OpenResponsesStreamEventResponseOutputTextDone = {
  type: "response.output_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text: "Hello! How can I help you?",
  sequenceNumber: 6,
  logprobs: [],
};
```

### `models.OpenResponsesStreamEventResponseRefusalDelta`

```typescript
const value: models.OpenResponsesStreamEventResponseRefusalDelta = {
  type: "response.refusal.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "I'm sorry",
  sequenceNumber: 4,
};
```

### `models.OpenResponsesStreamEventResponseRefusalDone`

```typescript
const value: models.OpenResponsesStreamEventResponseRefusalDone = {
  type: "response.refusal.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  refusal: "I'm sorry, but I can't assist with that request.",
  sequenceNumber: 6,
};
```

### `models.OpenResponsesStreamEventResponseOutputTextAnnotationAdded`

```typescript
const value: models.OpenResponsesStreamEventResponseOutputTextAnnotationAdded =
  {
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

### `models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta`

```typescript
const value: models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta =
  {
    type: "response.function_call_arguments.delta",
    itemId: "item-1",
    outputIndex: 0,
    delta: "{\"city\": \"San",
    sequenceNumber: 4,
  };
```

### `models.OpenResponsesStreamEventResponseFunctionCallArgumentsDone`

```typescript
const value: models.OpenResponsesStreamEventResponseFunctionCallArgumentsDone =
  {
    type: "response.function_call_arguments.done",
    itemId: "item-1",
    outputIndex: 0,
    name: "get_weather",
    arguments: "{\"city\": \"San Francisco\", \"units\": \"celsius\"}",
    sequenceNumber: 6,
  };
```

### `models.OpenResponsesReasoningDeltaEvent`

```typescript
const value: models.OpenResponsesReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "First, we need",
  sequenceNumber: 4,
};
```

### `models.OpenResponsesReasoningDoneEvent`

```typescript
const value: models.OpenResponsesReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text:
    "First, we need to identify the key components and then combine them logically.",
  sequenceNumber: 6,
};
```

### `models.OpenResponsesReasoningSummaryPartAddedEvent`

```typescript
const value: models.OpenResponsesReasoningSummaryPartAddedEvent = {
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

### `models.OpenResponsesStreamEventResponseReasoningSummaryPartDone`

```typescript
const value: models.OpenResponsesStreamEventResponseReasoningSummaryPartDone = {
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

### `models.OpenResponsesReasoningSummaryTextDeltaEvent`

```typescript
const value: models.OpenResponsesReasoningSummaryTextDeltaEvent = {
  type: "response.reasoning_summary_text.delta",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  delta: "Analyzing",
  sequenceNumber: 4,
};
```

### `models.OpenResponsesReasoningSummaryTextDoneEvent`

```typescript
const value: models.OpenResponsesReasoningSummaryTextDoneEvent = {
  type: "response.reasoning_summary_text.done",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  text: "Analyzing the problem step by step to find the optimal solution.",
  sequenceNumber: 6,
};
```

### `models.OpenResponsesImageGenCallInProgress`

```typescript
const value: models.OpenResponsesImageGenCallInProgress = {
  type: "response.image_generation_call.in_progress",
  itemId: "<id>",
  outputIndex: 8869.44,
  sequenceNumber: 0,
};
```

### `models.OpenResponsesImageGenCallGenerating`

```typescript
const value: models.OpenResponsesImageGenCallGenerating = {
  type: "response.image_generation_call.generating",
  itemId: "<id>",
  outputIndex: 1669.75,
  sequenceNumber: 0,
};
```

### `models.OpenResponsesImageGenCallPartialImage`

```typescript
const value: models.OpenResponsesImageGenCallPartialImage = {
  type: "response.image_generation_call.partial_image",
  itemId: "<id>",
  outputIndex: 4078.33,
  sequenceNumber: 0,
  partialImageB64: "<value>",
  partialImageIndex: 6154.36,
};
```

### `models.OpenResponsesImageGenCallCompleted`

```typescript
const value: models.OpenResponsesImageGenCallCompleted = {
  type: "response.image_generation_call.completed",
  itemId: "<id>",
  outputIndex: 776.49,
  sequenceNumber: 0,
};
```

