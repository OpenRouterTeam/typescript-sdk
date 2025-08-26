# Chat
(*chat*)

## Overview

Chat completion operations

### Available Operations

* [complete](#complete) - Create a chat completion
* [completeStream](#completestream) - Create a chat completion

## complete

Creates a model response for the given chat conversation. Supports both streaming and non-streaming modes.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createChatCompletion" method="post" path="/chat/completions" -->
```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  bearerAuth: process.env["OPENROUTER_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await openRouter.chat.complete({
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "open-router/core.js";
import { chatComplete } from "open-router/funcs/chatComplete.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  bearerAuth: process.env["OPENROUTER_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await chatComplete(openRouter, {
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("chatComplete failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.ChatCompletionCreateParams](../../models/chatcompletioncreateparams.md)                                                                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.ChatCompletion](../../models/chatcompletion.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.ChatCompletionError    | 400, 401, 429                 | application/json              |
| errors.ChatCompletionError    | 500                           | application/json              |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |

## completeStream

Creates a model response for the given chat conversation. Supports both streaming and non-streaming modes.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="streamChatCompletion" method="post" path="/chat/completions#stream" -->
```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  bearerAuth: process.env["OPENROUTER_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await openRouter.chat.completeStream({
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });

  for await (const event of result) {
    // Handle the event
    console.log(event);
  }
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "open-router/core.js";
import { chatCompleteStream } from "open-router/funcs/chatCompleteStream.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  bearerAuth: process.env["OPENROUTER_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await chatCompleteStream(openRouter, {
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const event of result) {
    // Handle the event
    console.log(event);
  }
  } else {
    console.log("chatCompleteStream failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.ChatStreamCompletionCreateParams](../../models/chatstreamcompletioncreateparams.md)                                                                                    | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[EventStream<operations.StreamChatCompletionResponseBody>](../../models/.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.ChatCompletionError    | 400, 401, 429                 | application/json              |
| errors.ChatCompletionError    | 500                           | application/json              |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |