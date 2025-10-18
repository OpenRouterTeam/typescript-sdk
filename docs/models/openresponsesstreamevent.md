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
    output: [],
    user: "Polly.Oberbrunner",
    outputText: "<value>",
    promptCacheKey: "<value>",
    safetyIdentifier: "<value>",
    error: null,
    incompleteDetails: null,
    usage: {
      inputTokens: 10,
      inputTokensDetails: {
        cachedTokens: 0,
      },
      outputTokens: 25,
      outputTokensDetails: {
        reasoningTokens: 0,
      },
      totalTokens: 35,
      cost: 0.0012,
      isByok: false,
      costDetails: {
        upstreamInferenceCost: 5882.86,
        upstreamInferenceInputCost: 6012.25,
        upstreamInferenceOutputCost: 7726.94,
      },
    },
    maxToolCalls: 6635.84,
    topLogprobs: 7051.98,
    maxOutputTokens: null,
    temperature: null,
    topP: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    background: false,
    previousResponseId: "<id>",
    reasoning: {
      effort: "low",
      summary: "auto",
      maxTokens: 411.41,
      enabled: true,
    },
    serviceTier: "flex",
    store: true,
    truncation: "disabled",
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
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
    output: [],
    user: "Kale.Mueller",
    outputText: "<value>",
    promptCacheKey: "<value>",
    safetyIdentifier: "<value>",
    error: null,
    incompleteDetails: null,
    usage: {
      inputTokens: 10,
      inputTokensDetails: {
        cachedTokens: 0,
      },
      outputTokens: 25,
      outputTokensDetails: {
        reasoningTokens: 0,
      },
      totalTokens: 35,
      cost: 0.0012,
      isByok: false,
      costDetails: {
        upstreamInferenceCost: 5882.86,
        upstreamInferenceInputCost: 6012.25,
        upstreamInferenceOutputCost: 7726.94,
      },
    },
    maxToolCalls: 5511.35,
    topLogprobs: 3841.87,
    maxOutputTokens: null,
    temperature: null,
    topP: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    background: true,
    previousResponseId: "<id>",
    reasoning: {
      effort: "high",
      summary: "auto",
      maxTokens: null,
      enabled: true,
    },
    serviceTier: "priority",
    store: true,
    truncation: null,
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
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
    output: [
      {
        id: "item-1",
        role: "assistant",
        type: "message",
        status: "completed",
        content: [
          {
            type: "output_text",
            text: "Hello! How can I help you?",
            annotations: [],
          },
        ],
      },
    ],
    user: "Ethyl_Wolf86",
    outputText: "<value>",
    promptCacheKey: "<value>",
    safetyIdentifier: null,
    error: null,
    incompleteDetails: null,
    usage: {
      inputTokens: 10,
      inputTokensDetails: {
        cachedTokens: 0,
      },
      outputTokens: 25,
      outputTokensDetails: {
        reasoningTokens: 0,
      },
      totalTokens: 35,
      cost: 0.0012,
      isByok: false,
      costDetails: {
        upstreamInferenceCost: 5882.86,
        upstreamInferenceInputCost: 6012.25,
        upstreamInferenceOutputCost: 7726.94,
      },
    },
    maxToolCalls: 3089.58,
    topLogprobs: 6411.11,
    maxOutputTokens: null,
    temperature: null,
    topP: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    background: true,
    previousResponseId: "<id>",
    reasoning: {
      effort: "minimal",
      summary: "auto",
      maxTokens: 8630.87,
      enabled: true,
    },
    serviceTier: "default",
    store: true,
    truncation: "auto",
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
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
    output: [],
    user: "Bonnie2",
    outputText: "<value>",
    promptCacheKey: "<value>",
    safetyIdentifier: "<value>",
    error: null,
    incompleteDetails: null,
    usage: {
      inputTokens: 10,
      inputTokensDetails: {
        cachedTokens: 0,
      },
      outputTokens: 25,
      outputTokensDetails: {
        reasoningTokens: 0,
      },
      totalTokens: 35,
      cost: 0.0012,
      isByok: true,
      costDetails: {
        upstreamInferenceCost: 5882.86,
        upstreamInferenceInputCost: 6012.25,
        upstreamInferenceOutputCost: 7726.94,
      },
    },
    maxToolCalls: 5440.53,
    topLogprobs: 5246.72,
    maxOutputTokens: null,
    temperature: null,
    topP: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    background: false,
    previousResponseId: "<id>",
    reasoning: {
      effort: "minimal",
      summary: "auto",
      maxTokens: 2298.59,
      enabled: true,
    },
    serviceTier: "default",
    store: true,
    truncation: "disabled",
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
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
    output: [],
    user: "Alden.Carroll21",
    outputText: "<value>",
    promptCacheKey: null,
    safetyIdentifier: "<value>",
    error: null,
    incompleteDetails: null,
    usage: {
      inputTokens: 10,
      inputTokensDetails: {
        cachedTokens: 0,
      },
      outputTokens: 25,
      outputTokensDetails: {
        reasoningTokens: 0,
      },
      totalTokens: 35,
      cost: 0.0012,
      isByok: true,
      costDetails: {
        upstreamInferenceCost: 5882.86,
        upstreamInferenceInputCost: 6012.25,
        upstreamInferenceOutputCost: 7726.94,
      },
    },
    maxToolCalls: null,
    topLogprobs: 7860.28,
    maxOutputTokens: null,
    temperature: null,
    topP: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    background: true,
    previousResponseId: "<id>",
    reasoning: {
      effort: "medium",
      summary: "auto",
      maxTokens: 3318.92,
      enabled: true,
    },
    serviceTier: "priority",
    store: true,
    truncation: "disabled",
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
  },
  sequenceNumber: 3,
};
```

### `models.OpenResponsesStreamEventError`

```typescript
const value: models.OpenResponsesStreamEventError = {
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
    status: "in_progress",
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
    status: "completed",
    content: [
      {
        type: "output_text",
        text: "Hello! How can I help you?",
        annotations: [],
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
    annotations: [],
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
    annotations: [],
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
      endIndex: 7,
      startIndex: 0,
      title: "Example",
      url: "https://example.com",
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

### `models.OpenResponsesStreamEventResponseReasoningTextDelta`

```typescript
const value: models.OpenResponsesStreamEventResponseReasoningTextDelta = {
  type: "response.reasoning_text.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "First, we need",
  sequenceNumber: 4,
};
```

### `models.OpenResponsesStreamEventResponseReasoningTextDone`

```typescript
const value: models.OpenResponsesStreamEventResponseReasoningTextDone = {
  type: "response.reasoning_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text:
    "First, we need to identify the key components and then combine them logically.",
  sequenceNumber: 6,
};
```

### `models.OpenResponsesStreamEventResponseReasoningSummaryPartAdded`

```typescript
const value: models.OpenResponsesStreamEventResponseReasoningSummaryPartAdded =
  {
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

### `models.OpenResponsesStreamEventResponseReasoningSummaryTextDelta`

```typescript
const value: models.OpenResponsesStreamEventResponseReasoningSummaryTextDelta =
  {
    type: "response.reasoning_summary_text.delta",
    itemId: "item-1",
    outputIndex: 0,
    summaryIndex: 0,
    delta: "Analyzing",
    sequenceNumber: 4,
  };
```

### `models.OpenResponsesStreamEventResponseReasoningSummaryTextDone`

```typescript
const value: models.OpenResponsesStreamEventResponseReasoningSummaryTextDone = {
  type: "response.reasoning_summary_text.done",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  text: "Analyzing the problem step by step to find the optimal solution.",
  sequenceNumber: 6,
};
```

### `models.OpenResponsesStreamEventResponseImageGenerationCallInProgress`

```typescript
const value:
  models.OpenResponsesStreamEventResponseImageGenerationCallInProgress = {
    type: "response.image_generation_call.in_progress",
    itemId: "item-abc123",
    outputIndex: 0,
    sequenceNumber: 1,
  };
```

### `models.OpenResponsesStreamEventResponseImageGenerationCallGenerating`

```typescript
const value:
  models.OpenResponsesStreamEventResponseImageGenerationCallGenerating = {
    type: "response.image_generation_call.generating",
    itemId: "item-abc123",
    outputIndex: 0,
    sequenceNumber: 2,
  };
```

### `models.OpenResponsesStreamEventResponseImageGenerationCallPartialImage`

```typescript
const value:
  models.OpenResponsesStreamEventResponseImageGenerationCallPartialImage = {
    type: "response.image_generation_call.partial_image",
    itemId: "item-abc123",
    outputIndex: 0,
    sequenceNumber: 3,
    partialImageB64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
    partialImageIndex: 0,
  };
```

### `models.OpenResponsesStreamEventResponseImageGenerationCallCompleted`

```typescript
const value:
  models.OpenResponsesStreamEventResponseImageGenerationCallCompleted = {
    type: "response.image_generation_call.completed",
    itemId: "item-abc123",
    outputIndex: 0,
    sequenceNumber: 4,
  };
```

