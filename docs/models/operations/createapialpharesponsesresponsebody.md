# CreateApiAlphaResponsesResponseBody

Successful response

## Example Usage

```typescript
import { CreateApiAlphaResponsesResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateApiAlphaResponsesResponseBody = {
  data: {
    type: "response.created",
    response: {
      id: "resp-abc123",
      object: "response",
      createdAt: 1704067200,
      model: "gpt-4",
      status: "in_progress",
      output: [],
      user: "Toby.Kunze16",
      outputText: "<value>",
      promptCacheKey: "<value>",
      safetyIdentifier: "<value>",
      error: null,
      incompleteDetails: null,
      usage: {
        inputTokens: 1595.05,
        inputTokensDetails: {
          cachedTokens: 6890.78,
        },
        outputTokens: 5882.86,
        outputTokensDetails: {
          reasoningTokens: 6012.25,
        },
        totalTokens: 7726.94,
      },
      maxToolCalls: 7012.95,
      topLogprobs: 6849.55,
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
      background: false,
      previousResponseId: "<id>",
      reasoning: {
        effort: "high",
        summary: "auto",
      },
      serviceTier: null,
      store: true,
      truncation: "auto",
      text: {
        format: {
          type: "text",
        },
        verbosity: "medium",
      },
    },
    sequenceNumber: 0,
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                                                                                                                                                                                                                                                                  | Required                                                                                                                                                                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                           | Example                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                                                                                                                                                                                                                | *models.OpenResponsesStreamEvent*                                                                                                                                                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                    | Union of all possible event types emitted during response streaming                                                                                                                                                                                                                                                                                                                                                   | {<br/>"type": "response.created",<br/>"response": {<br/>"id": "resp-abc123",<br/>"object": "response",<br/>"created_at": 1704067200,<br/>"model": "gpt-4",<br/>"status": "in_progress",<br/>"output": [],<br/>"tools": [],<br/>"tool_choice": "auto",<br/>"parallel_tool_calls": true,<br/>"error": null,<br/>"incomplete_details": null,<br/>"metadata": null,<br/>"instructions": null,<br/>"temperature": null,<br/>"top_p": null,<br/>"max_output_tokens": null<br/>},<br/>"sequence_number": 0<br/>} |