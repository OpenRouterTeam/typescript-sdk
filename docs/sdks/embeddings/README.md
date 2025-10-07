# Embeddings
(*embeddings*)

## Overview

Text embedding endpoints

### Available Operations

* [generate](#generate) - Submit an embedding request

## generate

Submits an embedding request to the embeddings router

### Example Usage

<!-- UsageSnippet language="typescript" operationID="generate" method="post" path="/embeddings" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.embeddings.generate({
    input: [
      "<value 1>",
      "<value 2>",
    ],
    model: "Malibu",
    models: [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
    provider: {
      allowFallbacks: true,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "Lambda",
      ],
      only: [
        "<value>",
      ],
      ignore: null,
      quantizations: [
        "bf16",
      ],
      sort: "throughput",
      maxPrice: {
        prompt: "<value>",
        completion: 1014.86,
        image: "https://loremflickr.com/1953/2511?lock=5056249632066692",
        audio: "<value>",
        request: "<value>",
      },
      experimental: {},
    },
    encodingFormat: "float",
    user: "Donato3",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { embeddingsGenerate } from "@openrouter/sdk/funcs/embeddingsGenerate.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await embeddingsGenerate(openRouter, {
    input: [
      "<value 1>",
      "<value 2>",
    ],
    model: "Malibu",
    models: [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
    provider: {
      allowFallbacks: true,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "Lambda",
      ],
      only: [
        "<value>",
      ],
      ignore: null,
      quantizations: [
        "bf16",
      ],
      sort: "throughput",
      maxPrice: {
        prompt: "<value>",
        completion: 1014.86,
        image: "https://loremflickr.com/1953/2511?lock=5056249632066692",
        audio: "<value>",
        request: "<value>",
      },
      experimental: {},
    },
    encodingFormat: "float",
    user: "Donato3",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("embeddingsGenerate failed:", res.error);
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
  useEmbeddingsGenerateMutation
} from "@openrouter/sdk/react-query/embeddingsGenerate.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GenerateRequest](../../models/operations/generaterequest.md)                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GenerateResponse](../../models/operations/generateresponse.md)\>**

### Errors

| Error Type           | Status Code          | Content Type         |
| -------------------- | -------------------- | -------------------- |
| errors.ErrorResponse | 4XX                  | application/json     |
| errors.ErrorResponse | 5XX                  | application/json     |