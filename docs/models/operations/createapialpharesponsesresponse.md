# CreateApiAlphaResponsesResponse


## Supported Types

### `models.OpenResponsesNonStreamingResponse`

```typescript
const value: models.OpenResponsesNonStreamingResponse = {
  id: "resp-abc123",
  object: "response",
  createdAt: 1704067200,
  model: "gpt-4",
  status: "completed",
  output: [
    {
      id: "msg-abc123",
      role: "assistant",
      type: "message",
      status: "completed",
      content: [
        {
          type: "output_text",
          text: "Hello! How can I help you today?",
          annotations: [],
        },
      ],
    },
  ],
  user: "Alessandro59",
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
    cost: 5062.45,
    isByok: false,
    costDetails: {
      upstreamInferenceCost: 5882.86,
      upstreamInferenceInputCost: 6012.25,
      upstreamInferenceOutputCost: 7726.94,
    },
  },
  maxToolCalls: 8999.13,
  topLogprobs: 2970.58,
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
    effort: "high",
    summary: "auto",
    maxTokens: null,
    enabled: true,
  },
  serviceTier: "priority",
  store: false,
  truncation: "disabled",
  text: {
    format: {
      type: "text",
    },
    verbosity: "medium",
  },
};
```

### `EventStream<operations.CreateApiAlphaResponsesResponseBody>`

### `models.ErrorResponse`

```typescript
const value: models.ErrorResponse = {
  error: {
    code: 400,
    message: "Invalid request parameters",
    metadata: {
      "field": "temperature",
      "reason": "Must be between 0 and 2",
    },
  },
  userId: "user-abc123",
};
```

