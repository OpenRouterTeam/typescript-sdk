# CreateResponsesResponseBody

Successful response

## Example Usage

```typescript
import { CreateResponsesResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateResponsesResponseBody = {
  data: {
    type: "response.created",
    response: {
      id: "resp-abc123",
      object: "response",
      createdAt: 1704067200,
      model: "gpt-4",
      status: "in_progress",
      output: [],
      user: "Ramiro.Schowalter-Kshlerin",
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
        outputTokens: 25,
        outputTokensDetails: {
          reasoningTokens: 0,
        },
        totalTokens: 35,
        cost: 0.0012,
        isByok: false,
        costDetails: {
          upstreamInferenceCost: null,
          upstreamInferenceInputCost: 0.0008,
          upstreamInferenceOutputCost: 0.0004,
        },
      },
      maxToolCalls: 264.25,
      topLogprobs: 2443.21,
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
      background: null,
      previousResponseId: "<id>",
      reasoning: {
        effort: "medium",
        summary: "auto",
      },
      serviceTier: "default",
      store: true,
      truncation: "disabled",
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