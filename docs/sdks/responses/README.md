# Responses
(*beta.responses*)

## Overview

beta.responses endpoints

### Available Operations

* [send](#send) - Create a response

## send

Creates a streaming or non-streaming response using OpenResponses API format

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createResponses" method="post" path="/responses" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.beta.responses.send({
    input: [
      {
        type: "message",
        role: "user",
        content: "Hello, how are you?",
      },
    ],
    instructions: "<value>",
    metadata: {
      "user_id": "123",
      "session_id": "abc-def-ghi",
    },
    tools: [
      {
        type: "function",
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        strict: true,
        parameters: {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
            },
          },
        },
      },
    ],
    toolChoice: {
      type: "function",
      name: "<value>",
    },
    parallelToolCalls: true,
    model: "anthropic/claude-4.5-sonnet-20250929",
    models: [
      "<value 1>",
    ],
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
    reasoning: {
      effort: "high",
      summary: "auto",
      maxTokens: 8661.16,
      enabled: true,
    },
    maxOutputTokens: null,
    temperature: 0.7,
    topP: 0.9,
    topK: 193.77,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "<id>",
      variables: {
        "key": {
          type: "input_text",
          text: "Hello, how can I help you?",
        },
      },
    },
    include: [
      "reasoning.encrypted_content",
    ],
    background: true,
    safetyIdentifier: "<value>",
    store: true,
    serviceTier: "auto",
    truncation: "auto",
    provider: {
      allowFallbacks: null,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "OpenAI",
      ],
      only: [
        "OpenAI",
      ],
      ignore: null,
      quantizations: [
        "fp16",
      ],
      sort: "price",
      maxPrice: {
        prompt: "1000",
        completion: 1000,
        image: 1000,
        audio: "1000",
        request: 1000,
      },
      experimental: {},
    },
    plugins: [
      {
        id: "file-parser",
        maxFiles: 4870.55,
        pdf: {
          engine: "mistral-ocr",
        },
      },
    ],
    user: "Elmer_Yundt72",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { betaResponsesSend } from "@openrouter/sdk/funcs/betaResponsesSend.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await betaResponsesSend(openRouter, {
    input: [
      {
        type: "message",
        role: "user",
        content: "Hello, how are you?",
      },
    ],
    instructions: "<value>",
    metadata: {
      "user_id": "123",
      "session_id": "abc-def-ghi",
    },
    tools: [
      {
        type: "function",
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        strict: true,
        parameters: {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
            },
          },
        },
      },
    ],
    toolChoice: {
      type: "function",
      name: "<value>",
    },
    parallelToolCalls: true,
    model: "anthropic/claude-4.5-sonnet-20250929",
    models: [
      "<value 1>",
    ],
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
    reasoning: {
      effort: "high",
      summary: "auto",
      maxTokens: 8661.16,
      enabled: true,
    },
    maxOutputTokens: null,
    temperature: 0.7,
    topP: 0.9,
    topK: 193.77,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "<id>",
      variables: {
        "key": {
          type: "input_text",
          text: "Hello, how can I help you?",
        },
      },
    },
    include: [
      "reasoning.encrypted_content",
    ],
    background: true,
    safetyIdentifier: "<value>",
    store: true,
    serviceTier: "auto",
    truncation: "auto",
    provider: {
      allowFallbacks: null,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "OpenAI",
      ],
      only: [
        "OpenAI",
      ],
      ignore: null,
      quantizations: [
        "fp16",
      ],
      sort: "price",
      maxPrice: {
        prompt: "1000",
        completion: 1000,
        image: 1000,
        audio: "1000",
        request: 1000,
      },
      experimental: {},
    },
    plugins: [
      {
        id: "file-parser",
        maxFiles: 4870.55,
        pdf: {
          engine: "mistral-ocr",
        },
      },
    ],
    user: "Elmer_Yundt72",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("betaResponsesSend failed:", res.error);
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
  useBetaResponsesSendMutation
} from "@openrouter/sdk/react-query/betaResponsesSend.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.OpenResponsesRequest](../../models/openresponsesrequest.md)                                                                                                            | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateResponsesResponse](../../models/operations/createresponsesresponse.md)\>**

### Errors

| Error Type                              | Status Code                             | Content Type                            |
| --------------------------------------- | --------------------------------------- | --------------------------------------- |
| errors.BadRequestResponseError          | 400                                     | application/json                        |
| errors.UnauthorizedResponseError        | 401                                     | application/json                        |
| errors.PaymentRequiredResponseError     | 402                                     | application/json                        |
| errors.NotFoundResponseError            | 404                                     | application/json                        |
| errors.RequestTimeoutResponseError      | 408                                     | application/json                        |
| errors.PayloadTooLargeResponseError     | 413                                     | application/json                        |
| errors.UnprocessableEntityResponseError | 422                                     | application/json                        |
| errors.TooManyRequestsResponseError     | 429                                     | application/json                        |
| errors.InternalServerResponseError      | 500                                     | application/json                        |
| errors.BadGatewayResponseError          | 502                                     | application/json                        |
| errors.ServiceUnavailableResponseError  | 503                                     | application/json                        |
| errors.EdgeNetworkTimeoutResponseError  | 524                                     | application/json                        |
| errors.ProviderOverloadedResponseError  | 529                                     | application/json                        |
| errors.OpenRouterDefaultError           | 4XX, 5XX                                | \*/\*                                   |