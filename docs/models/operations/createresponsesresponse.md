# CreateResponsesResponse


## Supported Types

### `models.OpenResponsesResult`

```typescript
const value: models.OpenResponsesResult = {
  completedAt: 311936,
  createdAt: 1704067200,
  error: null,
  frequencyPenalty: 3737.69,
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
  presencePenalty: 461.05,
  status: "completed",
  temperature: null,
  toolChoice: "auto",
  tools: [],
  topP: null,
};
```

### `EventStream<operations.CreateResponsesResponseBody>`

