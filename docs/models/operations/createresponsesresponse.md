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
  completedAt: 311936,
  output: [
    {
      id: "msg-abc123",
      role: "assistant",
      type: "message",
      content: [
        {
          type: "output_text",
          text: "Hello! How can I help you today?",
        },
      ],
    },
  ],
  error: null,
  incompleteDetails: null,
  temperature: 7286.67,
  topP: 3737.69,
  presencePenalty: 9990.37,
  frequencyPenalty: 461.05,
  instructions: null,
  metadata: null,
  tools: [],
  toolChoice: "auto",
  parallelToolCalls: true,
};
```

### `EventStream<operations.CreateResponsesResponseBody>`

