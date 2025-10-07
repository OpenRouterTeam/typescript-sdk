# Chat
(*chat*)

## Overview

### Available Operations

* [send](#send) - Create a chat completion

## send

Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="sendChatCompletionRequest" method="post" path="/chat/completions" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.chat.send({
    messages: [],
    model: "Charger",
    frequencyPenalty: 8689.88,
    logitBias: {
      "key": 4876.54,
      "key1": 7346.88,
    },
    logprobs: false,
    topLogprobs: 2140.15,
    maxCompletionTokens: 89.43,
    maxTokens: 7392.4,
    metadata: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    presencePenalty: 9132.54,
    reasoning: {
      effort: "medium",
      generateSummary: "concise",
      summary: null,
    },
    responseFormat: {
      type: "grammar",
      grammar: "<value>",
    },
    seed: null,
    stop: [],
    streamOptions: {
      includeUsage: true,
    },
    toolChoice: "<value>",
    tools: [
      {
        type: "function",
        function: {
          name: "<value>",
          description: "pro even bank rewarding ha modulo aboard mentor",
          parameters: {
            "key": "<value>",
          },
          strict: null,
        },
      },
    ],
    user: "Francesco.Bartell",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { chatSend } from "@openrouter/sdk/funcs/chatSend.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await chatSend(openRouter, {
    messages: [],
    model: "Charger",
    frequencyPenalty: 8689.88,
    logitBias: {
      "key": 4876.54,
      "key1": 7346.88,
    },
    logprobs: false,
    topLogprobs: 2140.15,
    maxCompletionTokens: 89.43,
    maxTokens: 7392.4,
    metadata: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    presencePenalty: 9132.54,
    reasoning: {
      effort: "medium",
      generateSummary: "concise",
      summary: null,
    },
    responseFormat: {
      type: "grammar",
      grammar: "<value>",
    },
    seed: null,
    stop: [],
    streamOptions: {
      includeUsage: true,
    },
    toolChoice: "<value>",
    tools: [
      {
        type: "function",
        function: {
          name: "<value>",
          description: "pro even bank rewarding ha modulo aboard mentor",
          parameters: {
            "key": "<value>",
          },
          strict: null,
        },
      },
    ],
    user: "Francesco.Bartell",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("chatSend failed:", res.error);
  }
}

run();
```

### React hooks and utilities

This method can be used in React components through the following hooks and
associated utilities.

> Check out [this guide][hook-guide] for information about each of the utilities
> below and how to get started using React hooks.

[hook-guide]: ../../../REACT_QUERY.md

```tsx
import {
  // Mutation hook for triggering the API call.
  useChatSendMutation
} from "@openrouter/sdk/react-query/chatSend.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.ChatGenerationParams](../../models/chatgenerationparams.md)                                                                                                            | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.SendChatCompletionRequestResponse](../../models/operations/sendchatcompletionrequestresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.ChatError              | 400, 401, 429                 | application/json              |
| errors.ChatError              | 500                           | application/json              |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |