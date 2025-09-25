# PostApiAlphaResponsesResponse


## Supported Types

### `operations.PostApiAlphaResponsesResponseBody`

```typescript
const value: operations.PostApiAlphaResponsesResponseBody = {
  id: "<id>",
  object: "response",
  createdAt: 7053.54,
  model: "Camry",
  output: [
    {
      type: "reasoning",
      id: "<id>",
      summary: [],
    },
  ],
  error: {
    code: "server_error",
    message: "<value>",
  },
  incompleteDetails: {},
  temperature: 2915.54,
  topP: 7657.13,
  instructions: "<value>",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
  },
  tools: [],
  toolChoice: "required",
  parallelToolCalls: false,
};
```

### `EventStream<any>`

