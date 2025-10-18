# Responses
(*beta.responses*)

## Overview

beta.responses endpoints

### Available Operations

* [send](#send) - Create a response

## send

Creates a streaming or non-streaming response using OpenResponses API format

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createApiAlphaResponses" method="post" path="/api/alpha/responses" -->
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
    toolChoice: "auto",
    parallelToolCalls: false,
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
      effort: "medium",
      summary: "auto",
      maxTokens: 6415.05,
      enabled: true,
    },
    maxOutputTokens: 5270.85,
    temperature: 0.7,
    topP: 0.9,
    topK: 5913.88,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    include: [
      "message.input_image.image_url",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "auto",
    truncation: "auto",
    stream: false,
    provider: {
      allowFallbacks: false,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "Moonshot AI",
      ],
      only: [
        "<value>",
      ],
      ignore: [
        "<value>",
      ],
      quantizations: [
        "bf16",
      ],
      sort: "price",
      maxPrice: {
        prompt: "<value>",
        completion: 4351.98,
        image: "https://loremflickr.com/916/1698?lock=7420998995259402",
        audio: "<value>",
        request: "<value>",
      },
      experimental: {},
    },
    plugins: [
      {
        id: "file-parser",
        maxFiles: 3555.38,
        pdf: {
          engine: "pdf-text",
        },
      },
    ],
    user: "Parker.OKeefe",
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
    toolChoice: "auto",
    parallelToolCalls: false,
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
      effort: "medium",
      summary: "auto",
      maxTokens: 6415.05,
      enabled: true,
    },
    maxOutputTokens: 5270.85,
    temperature: 0.7,
    topP: 0.9,
    topK: 5913.88,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    include: [
      "message.input_image.image_url",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "auto",
    truncation: "auto",
    stream: false,
    provider: {
      allowFallbacks: false,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "Moonshot AI",
      ],
      only: [
        "<value>",
      ],
      ignore: [
        "<value>",
      ],
      quantizations: [
        "bf16",
      ],
      sort: "price",
      maxPrice: {
        prompt: "<value>",
        completion: 4351.98,
        image: "https://loremflickr.com/916/1698?lock=7420998995259402",
        audio: "<value>",
        request: "<value>",
      },
      experimental: {},
    },
    plugins: [
      {
        id: "file-parser",
        maxFiles: 3555.38,
        pdf: {
          engine: "pdf-text",
        },
      },
    ],
    user: "Parker.OKeefe",
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

**Promise\<[operations.CreateApiAlphaResponsesResponse](../../models/operations/createapialpharesponsesresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |