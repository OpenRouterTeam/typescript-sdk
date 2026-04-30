# Stt

## Overview

Speech-to-text endpoints

### Available Operations

* [createTranscription](#createtranscription) - Create transcription

## createTranscription

Transcribes audio into text

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createAudioTranscriptions" method="post" path="/audio/transcriptions" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.stt.createTranscription({
    sttRequest: {
      inputAudio: {
        data: "UklGRiQA...",
        format: "wav",
      },
      language: "en",
      model: "openai/whisper-large-v3",
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
import { sttCreateTranscription } from "@openrouter/sdk/funcs/sttCreateTranscription.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await sttCreateTranscription(openRouter, {
    sttRequest: {
      inputAudio: {
        data: "UklGRiQA...",
        format: "wav",
      },
      language: "en",
      model: "openai/whisper-large-v3",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("sttCreateTranscription failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateAudioTranscriptionsRequest](../../models/operations/createaudiotranscriptionsrequest.md)                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.STTResponse](../../models/sttresponse.md)\>**

### Errors

| Error Type                             | Status Code                            | Content Type                           |
| -------------------------------------- | -------------------------------------- | -------------------------------------- |
| errors.BadRequestResponseError         | 400                                    | application/json                       |
| errors.UnauthorizedResponseError       | 401                                    | application/json                       |
| errors.PaymentRequiredResponseError    | 402                                    | application/json                       |
| errors.NotFoundResponseError           | 404                                    | application/json                       |
| errors.TooManyRequestsResponseError    | 429                                    | application/json                       |
| errors.InternalServerResponseError     | 500                                    | application/json                       |
| errors.BadGatewayResponseError         | 502                                    | application/json                       |
| errors.ServiceUnavailableResponseError | 503                                    | application/json                       |
| errors.EdgeNetworkTimeoutResponseError | 524                                    | application/json                       |
| errors.ProviderOverloadedResponseError | 529                                    | application/json                       |
| errors.OpenRouterDefaultError          | 4XX, 5XX                               | \*/\*                                  |