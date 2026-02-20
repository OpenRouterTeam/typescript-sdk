# Chat

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
  httpReferer: "<value>",
  xTitle: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.chat.send({
    chatGenerationParams: {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "What is the capital of France?",
        },
      ],
      temperature: 0.7,
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
import { chatSend } from "@openrouter/sdk/funcs/chatSend.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  xTitle: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await chatSend(openRouter, {
    chatGenerationParams: {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "What is the capital of France?",
        },
      ],
      temperature: 0.7,
    },
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

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.SendChatCompletionRequestRequest](../../models/operations/sendchatcompletionrequestrequest.md)                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.SendChatCompletionRequestResponse](../../models/operations/sendchatcompletionrequestresponse.md)\>**

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