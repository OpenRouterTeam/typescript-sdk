# Completions
(*completions*)

## Overview

### Available Operations

* [generate](#generate) - Create a completion

## generate

Creates a completion for the provided prompt and parameters. Supports both streaming and non-streaming modes.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createCompletions" method="post" path="/completions" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.completions.generate({
    model: "Model T",
    prompt: "<value>",
    bestOf: 163488,
    echo: true,
    frequencyPenalty: 27.55,
    logitBias: {
      "key": 9064.25,
      "key1": 7698.06,
      "key2": 6481.8,
    },
    logprobs: 482258,
    maxTokens: null,
    n: 629532,
    presencePenalty: 5430.28,
    seed: 853393,
    stop: [
      "<value 1>",
      "<value 2>",
    ],
    streamOptions: {
      includeUsage: false,
    },
    suffix: "<value>",
    temperature: null,
    topP: 5229.98,
    user: "Anita53",
    metadata: {
      "key": "<value>",
      "key1": "<value>",
    },
    responseFormat: {
      type: "text",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { completionsGenerate } from "@openrouter/sdk/funcs/completionsGenerate.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await completionsGenerate(openRouter, {
    model: "Model T",
    prompt: "<value>",
    bestOf: 163488,
    echo: true,
    frequencyPenalty: 27.55,
    logitBias: {
      "key": 9064.25,
      "key1": 7698.06,
      "key2": 6481.8,
    },
    logprobs: 482258,
    maxTokens: null,
    n: 629532,
    presencePenalty: 5430.28,
    seed: 853393,
    stop: [
      "<value 1>",
      "<value 2>",
    ],
    streamOptions: {
      includeUsage: false,
    },
    suffix: "<value>",
    temperature: null,
    topP: 5229.98,
    user: "Anita53",
    metadata: {
      "key": "<value>",
      "key1": "<value>",
    },
    responseFormat: {
      type: "text",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("completionsGenerate failed:", res.error);
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
  useCompletionsGenerateMutation
} from "@openrouter/sdk/react-query/completionsGenerate.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.CompletionCreateParams](../../models/completioncreateparams.md)                                                                                                        | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.CompletionResponse](../../models/completionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.ChatError              | 400, 401, 429                 | application/json              |
| errors.ChatError              | 500                           | application/json              |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |