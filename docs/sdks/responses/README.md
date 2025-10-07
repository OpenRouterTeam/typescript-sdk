# Responses
(*beta.responses*)

## Overview

beta.responses endpoints

### Available Operations

* [sendRequest](#sendrequest) - Submit a response request

## sendRequest

Submits a request to the Responses API (beta)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="sendResponsesRequest" method="post" path="/api/alpha/responses" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.beta.responses.sendRequest({
    input: "Hello, how can I help you today?",
    instructions: "<value>",
    metadata: {
      "user_id": "user-123",
      "session_id": "session-abc",
    },
    tools: [
      {
        type: "function",
        function: {
          name: "<value>",
          description: "petal righteously sans athwart down front tuxedo overfeed",
          parameters: {
            "key": "<value>",
          },
          strict: false,
        },
      },
    ],
    toolChoice: "auto",
    parallelToolCalls: true,
    model: "Fortwo",
    models: [
      "<value 1>",
      "<value 2>",
    ],
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
    reasoning: {
      effort: "medium",
      summary: "auto",
    },
    maxOutputTokens: 6181.51,
    temperature: 8715.21,
    topP: 3848.26,
    topK: 2241.14,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "prompt-123",
      variables: {
        "user_name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    include: [
      "file_search_call.results",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "scale",
    truncation: "auto",
    stream: null,
    provider: null,
    plugins: [
      {
        id: "chain-of-thought",
      },
    ],
    user: "Ilene51",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { betaResponsesSendRequest } from "@openrouter/sdk/funcs/betaResponsesSendRequest.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await betaResponsesSendRequest(openRouter, {
    input: "Hello, how can I help you today?",
    instructions: "<value>",
    metadata: {
      "user_id": "user-123",
      "session_id": "session-abc",
    },
    tools: [
      {
        type: "function",
        function: {
          name: "<value>",
          description: "petal righteously sans athwart down front tuxedo overfeed",
          parameters: {
            "key": "<value>",
          },
          strict: false,
        },
      },
    ],
    toolChoice: "auto",
    parallelToolCalls: true,
    model: "Fortwo",
    models: [
      "<value 1>",
      "<value 2>",
    ],
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
    reasoning: {
      effort: "medium",
      summary: "auto",
    },
    maxOutputTokens: 6181.51,
    temperature: 8715.21,
    topP: 3848.26,
    topK: 2241.14,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "prompt-123",
      variables: {
        "user_name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    include: [
      "file_search_call.results",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "scale",
    truncation: "auto",
    stream: null,
    provider: null,
    plugins: [
      {
        id: "chain-of-thought",
      },
    ],
    user: "Ilene51",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("betaResponsesSendRequest failed:", res.error);
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
  useBetaResponsesSendRequestMutation
} from "@openrouter/sdk/react-query/betaResponsesSendRequest.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.OpenAIResponsesRequest](../../models/openairesponsesrequest.md)                                                                                                        | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.SendResponsesRequestResponse](../../models/operations/sendresponsesrequestresponse.md)\>**

### Errors

| Error Type           | Status Code          | Content Type         |
| -------------------- | -------------------- | -------------------- |
| errors.ErrorResponse | 4XX                  | application/json     |
| errors.ErrorResponse | 5XX                  | application/json     |