# CreateResponsesResponse


## Supported Types

### `models.OpenResponsesNonStreamingResponse`

```typescript
const value: models.OpenResponsesNonStreamingResponse = {
  id: "resp-abc123",
  object: "response",
  createdAt: 1704067200,
  model: "gpt-4",
  status: "completed",
  completedAt: 288.81,
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
  presencePenalty: 1980.95,
  frequencyPenalty: 5982.72,
  instructions: null,
  metadata: null,
  tools: [],
  toolChoice: "auto",
  parallelToolCalls: true,
};
```

### `EventStream<operations.CreateResponsesResponseBody>`

