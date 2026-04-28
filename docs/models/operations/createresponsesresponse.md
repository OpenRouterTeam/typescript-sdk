# CreateResponsesResponse


## Supported Types

### `models.OpenResponsesResult`

```typescript
const value: models.OpenResponsesResult = {
  completedAt: 728667,
  createdAt: 1704067200,
  error: null,
  frequencyPenalty: 9990.37,
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
  presencePenalty: null,
  status: "completed",
  temperature: null,
  toolChoice: "auto",
  tools: [],
  topP: null,
};
```

### `EventStream<models.ResponsesStreamingResponse>`

