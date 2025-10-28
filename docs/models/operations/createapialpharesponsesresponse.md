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
      upstreamInferenceCost: 8999.13,
      upstreamInferenceInputCost: 2970.58,
      upstreamInferenceOutputCost: 9667.63,
    },
  },
  maxToolCalls: 7325.41,
  topLogprobs: 2429,
  maxOutputTokens: null,
  temperature: null,
  topP: null,
  instructions: null,
  metadata: null,
  tools: [],
  toolChoice: "auto",
  parallelToolCalls: true,
  prompt: {
    id: "<id>",
    variables: {
      "key": {
        type: "input_text",
        text: "Hello, how can I help you?",
      },
    },
  },
  background: null,
  previousResponseId: "<id>",
  reasoning: {
    effort: "low",
    summary: "auto",
  },
  serviceTier: "auto",
  store: false,
  truncation: "auto",
  text: {
    format: {
      type: "text",
    },
    verbosity: "medium",
  },
};
```

### `EventStream<operations.CreateApiAlphaResponsesResponseBody>`

