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

### `models.ApplyPatchCallOperationDiffDeltaEvent`

```typescript
const value: models.ApplyPatchCallOperationDiffDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 162755,
  sequenceNumber: 0,
  type: "response.apply_patch_call_operation_diff.delta",
};
```

### `models.ApplyPatchCallOperationDiffDoneEvent`

```typescript
const value: models.ApplyPatchCallOperationDiffDoneEvent = {
  diff: "<value>",
  itemId: "<id>",
  outputIndex: 786722,
  sequenceNumber: 0,
  type: "response.apply_patch_call_operation_diff.done",
};
```

### `models.StreamEventsResponseCompleted`

```typescript
const value: models.StreamEventsResponseCompleted = {
  response: {
    completedAt: 773930,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: null,
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
    completedAt: null,
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

### `models.CustomToolCallInputDeltaEvent`

```typescript
const value: models.CustomToolCallInputDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 98568,
  sequenceNumber: 0,
  type: "response.custom_tool_call_input.delta",
};
```

### `models.CustomToolCallInputDoneEvent`

```typescript
const value: models.CustomToolCallInputDoneEvent = {
  input: "<value>",
  itemId: "<id>",
  outputIndex: 963378,
  sequenceNumber: 0,
  type: "response.custom_tool_call_input.done",
};
```

### `models.StreamEventsResponseFailed`

```typescript
const value: models.StreamEventsResponseFailed = {
  response: {
    completedAt: 845103,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 4081.29,
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

### `models.FusionCallAnalysisCompletedEvent`

```typescript
const value: models.FusionCallAnalysisCompletedEvent = {
  analysis: {
    blindSpots: [
      "No model considered the impact on existing API consumers.",
    ],
    consensus: [
      "All panel models agree the request is asking for a concise summary.",
    ],
    contradictions: [
      {
        stances: [
          {
            model: "openai/gpt-5",
            stance: "Favors an incremental rollout.",
          },
          {
            model: "anthropic/claude-sonnet-4.5",
            stance: "Favors a single coordinated migration.",
          },
        ],
        topic: "Recommended approach",
      },
    ],
    partialCoverage: [
      {
        models: [
          "openai/gpt-5",
        ],
        point: "Only one model addressed the rollback strategy.",
      },
    ],
    uniqueInsights: [
      {
        insight:
          "Highlighted a backwards-compatibility risk the other models missed.",
        model: "anthropic/claude-sonnet-4.5",
      },
    ],
  },
  itemId: "<id>",
  outputIndex: 74526,
  sequenceNumber: 0,
  type: "response.fusion_call.analysis.completed",
};
```

### `models.FusionCallAnalysisInProgressEvent`

```typescript
const value: models.FusionCallAnalysisInProgressEvent = {
  itemId: "<id>",
  judgeModel: "<value>",
  outputIndex: 306599,
  sequenceNumber: 0,
  type: "response.fusion_call.analysis.in_progress",
};
```

### `models.FusionCallCompletedEvent`

```typescript
const value: models.FusionCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 114921,
  sequenceNumber: 0,
  type: "response.fusion_call.completed",
};
```

### `models.FusionCallInProgressEvent`

```typescript
const value: models.FusionCallInProgressEvent = {
  itemId: "<id>",
  outputIndex: 285302,
  sequenceNumber: 0,
  type: "response.fusion_call.in_progress",
};
```

### `models.FusionCallPanelAddedEvent`

```typescript
const value: models.FusionCallPanelAddedEvent = {
  itemId: "<id>",
  model: "Cruze",
  outputIndex: 246848,
  sequenceNumber: 0,
  type: "response.fusion_call.panel.added",
};
```

### `models.FusionCallPanelCompletedEvent`

```typescript
const value: models.FusionCallPanelCompletedEvent = {
  content: "<value>",
  itemId: "<id>",
  model: "Mercielago",
  outputIndex: 546615,
  sequenceNumber: 0,
  type: "response.fusion_call.panel.completed",
};
```

### `models.FusionCallPanelDeltaEvent`

```typescript
const value: models.FusionCallPanelDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  model: "Mustang",
  outputIndex: 213881,
  sequenceNumber: 0,
  type: "response.fusion_call.panel.delta",
};
```

### `models.FusionCallPanelFailedEvent`

```typescript
const value: models.FusionCallPanelFailedEvent = {
  error: "<value>",
  itemId: "<id>",
  model: "Colorado",
  outputIndex: 389396,
  sequenceNumber: 0,
  type: "response.fusion_call.panel.failed",
};
```

### `models.FusionCallPanelReasoningDeltaEvent`

```typescript
const value: models.FusionCallPanelReasoningDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  model: "Volt",
  outputIndex: 705984,
  sequenceNumber: 0,
  type: "response.fusion_call.panel.reasoning.delta",
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
    completedAt: 434412,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 945.33,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 8737.38,
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
    completedAt: 797200,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 8861.33,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 3923.12,
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

