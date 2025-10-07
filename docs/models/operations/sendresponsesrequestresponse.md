# SendResponsesRequestResponse


## Supported Types

### `models.ResponsesNonStreamingResponse`

```typescript
const value: models.ResponsesNonStreamingResponse = {
  id: "resp_001",
  object: "response",
  createdAt: 1234567890,
  model: "gpt-4",
  status: "completed",
  output: [
    {
      type: "message",
      id: "msg_001",
      status: "completed",
      role: "assistant",
      content: [
        {
          type: "output_text",
          text: "Hello! How can I help you today?",
          annotations: [],
        },
      ],
    },
  ],
  user: "Brittany.Larkin-Collins",
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
    outputTokens: 8,
    outputTokensDetails: {
      reasoningTokens: 0,
    },
    totalTokens: 18,
    cost: 3102.21,
    isByok: true,
    costDetails: {
      upstreamInferenceCost: 1509.42,
      upstreamInferenceInputCost: 6579.23,
      upstreamInferenceOutputCost: 1082.47,
    },
  },
  maxToolCalls: 3951.08,
  topLogprobs: 5080.07,
  maxOutputTokens: 1000,
  temperature: 0.7,
  topP: 1,
  instructions: null,
  metadata: {},
  tools: [],
  toolChoice: "auto",
  parallelToolCalls: true,
  prompt: {
    id: "prompt-123",
    variables: {
      "user_name": {
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
    maxTokens: 9872.5,
    enabled: true,
  },
  serviceTier: "scale",
  store: true,
  truncation: "disabled",
  text: {
    format: {
      type: "text",
    },
    verbosity: "medium",
  },
};
```

### `EventStream<operations.SendResponsesRequestResponseBody>`

