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

