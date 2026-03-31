# CreateResponsesResponse


## Supported Types

### `models.OpenResponsesResult`

```typescript
const value: models.OpenResponsesResult = {
  id: "resp-abc123",
  object: "response",
  createdAt: 1704067200,
  model: "gpt-4",
  status: "completed",
  completedAt: 7286.67,
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
  presencePenalty: 9990.37,
  frequencyPenalty: null,
  instructions: null,
  metadata: null,
  tools: [],
  toolChoice: "auto",
  parallelToolCalls: true,
};
```

### `EventStream<operations.CreateResponsesResponseBody>`

