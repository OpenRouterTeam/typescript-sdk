# CreateResponsesResponse


## Supported Types

### `models.OpenResponsesResult`

```typescript
const value: models.OpenResponsesResult = {
  completedAt: 311936,
  createdAt: 1704067200,
  error: null,
  frequencyPenalty: 7286.67,
  id: "resp-abc123",
  incompleteDetails: null,
  instructions: null,
  metadata: null,
  model: "gpt-4",
  object: "response",
  output: [
    {
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
  ],
  parallelToolCalls: true,
  presencePenalty: 3737.69,
  status: "completed",
  temperature: 9990.37,
  toolChoice: "auto",
  tools: [],
  topP: 461.05,
};
```

### `EventStream<operations.CreateResponsesResponseBody>`

