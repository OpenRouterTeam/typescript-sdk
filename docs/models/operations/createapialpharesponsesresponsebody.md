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
        cost: 7012.95,
        isByok: false,
        costDetails: {
          upstreamInferenceCost: 9784.78,
          upstreamInferenceInputCost: 4970.36,
          upstreamInferenceOutputCost: 6210.54,
        },
      },
      maxToolCalls: 6966.49,
      topLogprobs: 8530.14,
      maxOutputTokens: null,
      temperature: null,
      topP: null,
      instructions: null,
      metadata: null,
      tools: [],
      toolChoice: "auto",
      parallelToolCalls: true,
      prompt: {
        id: "prompt-abc123",
        variables: {
          "name": {
            type: "input_text",
            text: "John",
          },
        },
      },
      background: null,
      previousResponseId: "<id>",
      reasoning: {
        effort: null,
        summary: "auto",
        maxTokens: 6241.29,
        enabled: true,
      },
      serviceTier: null,
      store: false,
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

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `data`                                                              | *models.OpenResponsesStreamEvent*                                   | :heavy_check_mark:                                                  | Union of all possible event types emitted during response streaming |