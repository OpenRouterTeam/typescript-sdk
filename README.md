# OpenRouter SDK

The [OpenRouter](https://openrouter.ai/) SDK gives access to over 300 large language models on the OpenRouter chat and completion APIs, as well as the rest of our full API. For more information about the API: [OpenRouter Documentation](https://openrouter.ai/docs)

<br /><br />
> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/openrouter/sdk). Delete this section before > publishing to a package manager.

<!-- No Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [OpenRouter SDK](#openrouter-sdk)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [React hooks with TanStack Query](#react-hooks-with-tanstack-query)
  * [Server-sent event streaming](#server-sent-event-streaming)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add @openrouter/sdk
# Install optional peer dependencies if you plan to use React hooks
npm add @tanstack/react-query react react-dom
```

### PNPM

```bash
pnpm add @openrouter/sdk
# Install optional peer dependencies if you plan to use React hooks
pnpm add @tanstack/react-query react react-dom
```

### Bun

```bash
bun add @openrouter/sdk
# Install optional peer dependencies if you plan to use React hooks
bun add @tanstack/react-query react react-dom
```

### Yarn

```bash
yarn add @openrouter/sdk
# Install optional peer dependencies if you plan to use React hooks
yarn add @tanstack/react-query react react-dom
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

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
          description:
            "petal righteously sans athwart down front tuxedo overfeed",
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
      maxTokens: 6520.65,
      enabled: false,
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
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name     | Type | Scheme      | Environment Variable |
| -------- | ---- | ----------- | -------------------- |
| `apiKey` | http | HTTP Bearer | `OPENROUTER_API_KEY` |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:
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
          description:
            "petal righteously sans athwart down front tuxedo overfeed",
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
      maxTokens: 6520.65,
      enabled: false,
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

### Per-Operation Security Schemes

Some operations in this SDK require the security scheme to be specified at the request level. For example:
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter();

async function run() {
  const result = await openRouter.credits.addCoinbaseCharge({
    bearer: process.env["OPENROUTER_BEARER"] ?? "",
  }, {
    amount: 4821.17,
    sender: "<value>",
    chainId: 1,
  });

  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [analytics](docs/sdks/analytics/README.md)

* [getUserActivity](docs/sdks/analytics/README.md#getuseractivity) - Get user activity grouped by endpoint

### [apiKeys](docs/sdks/apikeys/README.md)

* [list](docs/sdks/apikeys/README.md#list) - List API keys
* [create](docs/sdks/apikeys/README.md#create) - Create a new API key
* [update](docs/sdks/apikeys/README.md#update) - Update an API key
* [delete](docs/sdks/apikeys/README.md#delete) - Delete an API key
* [get](docs/sdks/apikeys/README.md#get) - Get a single API key
* [getCurrentKeyMetadata](docs/sdks/apikeys/README.md#getcurrentkeymetadata) - Get current API key

#### [beta.responses](docs/sdks/responses/README.md)

* [sendRequest](docs/sdks/responses/README.md#sendrequest) - Submit a response request

### [chat](docs/sdks/chat/README.md)

* [send](docs/sdks/chat/README.md#send) - Create a chat completion

### [completions](docs/sdks/completions/README.md)

* [generate](docs/sdks/completions/README.md#generate) - Create a completion

### [credits](docs/sdks/credits/README.md)

* [get](docs/sdks/credits/README.md#get) - Get total credits purchased and used for the authenticated user
* [addCoinbaseCharge](docs/sdks/credits/README.md#addcoinbasecharge) - Create a Coinbase charge for crypto payment

### [embeddings](docs/sdks/embeddings/README.md)

* [generate](docs/sdks/embeddings/README.md#generate) - Submit an embedding request

### [endpoints](docs/sdks/endpoints/README.md)

* [list](docs/sdks/endpoints/README.md#list) - List all endpoints for a model
* [previewZDR](docs/sdks/endpoints/README.md#previewzdr) - Preview the impact of ZDR on the available endpoints

### [generations](docs/sdks/generations/README.md)

* [getMetadata](docs/sdks/generations/README.md#getmetadata) - Get request & usage metadata for a generation

### [model](docs/sdks/model/README.md)

* [getParameters](docs/sdks/model/README.md#getparameters) - Get a model's supported parameters and data about which are most popular

### [models](docs/sdks/models/README.md)

* [getCount](docs/sdks/models/README.md#getcount) - Get total count of available models
* [list](docs/sdks/models/README.md#list) - List all models and their properties
* [listUserModels](docs/sdks/models/README.md#listusermodels) - List models filtered by user provider preferences

### [oAuth](docs/sdks/oauth/README.md)

* [exchangeAuthorizationCode](docs/sdks/oauth/README.md#exchangeauthorizationcode) - Exchange authorization code for API key
* [createAuthorizationCode](docs/sdks/oauth/README.md#createauthorizationcode) - Create authorization code

### [providers](docs/sdks/providers/README.md)

* [list](docs/sdks/providers/README.md#list) - List all available model providers

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`analyticsGetUserActivity`](docs/sdks/analytics/README.md#getuseractivity) - Get user activity grouped by endpoint
- [`apiKeysCreate`](docs/sdks/apikeys/README.md#create) - Create a new API key
- [`apiKeysDelete`](docs/sdks/apikeys/README.md#delete) - Delete an API key
- [`apiKeysGet`](docs/sdks/apikeys/README.md#get) - Get a single API key
- [`apiKeysGetCurrentKeyMetadata`](docs/sdks/apikeys/README.md#getcurrentkeymetadata) - Get current API key
- [`apiKeysList`](docs/sdks/apikeys/README.md#list) - List API keys
- [`apiKeysUpdate`](docs/sdks/apikeys/README.md#update) - Update an API key
- [`betaResponsesSendRequest`](docs/sdks/responses/README.md#sendrequest) - Submit a response request
- [`chatSend`](docs/sdks/chat/README.md#send) - Create a chat completion
- [`completionsGenerate`](docs/sdks/completions/README.md#generate) - Create a completion
- [`creditsAddCoinbaseCharge`](docs/sdks/credits/README.md#addcoinbasecharge) - Create a Coinbase charge for crypto payment
- [`creditsGet`](docs/sdks/credits/README.md#get) - Get total credits purchased and used for the authenticated user
- [`embeddingsGenerate`](docs/sdks/embeddings/README.md#generate) - Submit an embedding request
- [`endpointsList`](docs/sdks/endpoints/README.md#list) - List all endpoints for a model
- [`endpointsPreviewZDR`](docs/sdks/endpoints/README.md#previewzdr) - Preview the impact of ZDR on the available endpoints
- [`generationsGetMetadata`](docs/sdks/generations/README.md#getmetadata) - Get request & usage metadata for a generation
- [`modelGetParameters`](docs/sdks/model/README.md#getparameters) - Get a model's supported parameters and data about which are most popular
- [`modelsGetCount`](docs/sdks/models/README.md#getcount) - Get total count of available models
- [`modelsList`](docs/sdks/models/README.md#list) - List all models and their properties
- [`modelsListUserModels`](docs/sdks/models/README.md#listusermodels) - List models filtered by user provider preferences
- [`oAuthCreateAuthorizationCode`](docs/sdks/oauth/README.md#createauthorizationcode) - Create authorization code
- [`oAuthExchangeAuthorizationCode`](docs/sdks/oauth/README.md#exchangeauthorizationcode) - Exchange authorization code for API key
- [`providersList`](docs/sdks/providers/README.md#list) - List all available model providers

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start React hooks with TanStack Query [react-query] -->
## React hooks with TanStack Query

React hooks built on [TanStack Query][tanstack-query] are included in this SDK.
These hooks and the utility functions provided alongside them can be used to
build rich applications that pull data from the API using one of the most
popular asynchronous state management library.

[tanstack-query]: https://tanstack.com/query/v5/docs/framework/react/overview

To learn about this feature and how to get started, check
[REACT_QUERY.md](./REACT_QUERY.md).

> [!WARNING]
>
> This feature is currently in **preview** and is subject to breaking changes
> within the current major version of the SDK as we gather user feedback on it.

<details>

<summary>Available React hooks</summary>

- [`useAnalyticsGetUserActivity`](docs/sdks/analytics/README.md#getuseractivity) - Get user activity grouped by endpoint
- [`useApiKeysCreateMutation`](docs/sdks/apikeys/README.md#create) - Create a new API key
- [`useApiKeysDeleteMutation`](docs/sdks/apikeys/README.md#delete) - Delete an API key
- [`useApiKeysGet`](docs/sdks/apikeys/README.md#get) - Get a single API key
- [`useApiKeysGetCurrentKeyMetadata`](docs/sdks/apikeys/README.md#getcurrentkeymetadata) - Get current API key
- [`useApiKeysList`](docs/sdks/apikeys/README.md#list) - List API keys
- [`useApiKeysUpdateMutation`](docs/sdks/apikeys/README.md#update) - Update an API key
- [`useBetaResponsesSendRequestMutation`](docs/sdks/responses/README.md#sendrequest) - Submit a response request
- [`useChatSendMutation`](docs/sdks/chat/README.md#send) - Create a chat completion
- [`useCompletionsGenerateMutation`](docs/sdks/completions/README.md#generate) - Create a completion
- [`useCreditsAddCoinbaseChargeMutation`](docs/sdks/credits/README.md#addcoinbasecharge) - Create a Coinbase charge for crypto payment
- [`useCreditsGet`](docs/sdks/credits/README.md#get) - Get total credits purchased and used for the authenticated user
- [`useEmbeddingsGenerateMutation`](docs/sdks/embeddings/README.md#generate) - Submit an embedding request
- [`useEndpointsList`](docs/sdks/endpoints/README.md#list) - List all endpoints for a model
- [`useEndpointsPreviewZDR`](docs/sdks/endpoints/README.md#previewzdr) - Preview the impact of ZDR on the available endpoints
- [`useGenerationsGetMetadata`](docs/sdks/generations/README.md#getmetadata) - Get request & usage metadata for a generation
- [`useModelGetParameters`](docs/sdks/model/README.md#getparameters) - Get a model's supported parameters and data about which are most popular
- [`useModelsGetCount`](docs/sdks/models/README.md#getcount) - Get total count of available models
- [`useModelsList`](docs/sdks/models/README.md#list) - List all models and their properties
- [`useModelsListUserModels`](docs/sdks/models/README.md#listusermodels) - List models filtered by user provider preferences
- [`useOAuthCreateAuthorizationCodeMutation`](docs/sdks/oauth/README.md#createauthorizationcode) - Create authorization code
- [`useOAuthExchangeAuthorizationCodeMutation`](docs/sdks/oauth/README.md#exchangeauthorizationcode) - Exchange authorization code for API key
- [`useProvidersList`](docs/sdks/providers/README.md#list) - List all available model providers

</details>
<!-- End React hooks with TanStack Query [react-query] -->

<!-- Start Server-sent event streaming [eventstream] -->
## Server-sent event streaming

[Server-sent events][mdn-sse] are used to stream content from certain
operations. These operations will expose the stream as an async iterable that
can be consumed using a [`for await...of`][mdn-for-await-of] loop. The loop will
terminate when the server no longer has any events to send and closes the
underlying connection.

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
          description:
            "petal righteously sans athwart down front tuxedo overfeed",
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
      maxTokens: 6520.65,
      enabled: false,
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

[mdn-sse]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
[mdn-for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
<!-- End Server-sent event streaming [eventstream] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
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
          description:
            "petal righteously sans athwart down front tuxedo overfeed",
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
      maxTokens: 6520.65,
      enabled: false,
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
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
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
          description:
            "petal righteously sans athwart down front tuxedo overfeed",
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
      maxTokens: 6520.65,
      enabled: false,
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
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`OpenRouterError`](./src/models/errors/openroutererror.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { OpenRouter } from "@openrouter/sdk";
import * as errors from "@openrouter/sdk/models/errors";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  try {
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
            description:
              "petal righteously sans athwart down front tuxedo overfeed",
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
        maxTokens: 6520.65,
        enabled: false,
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
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.OpenRouterError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.ErrorResponse) {
        console.log(error.data$.error); // models.ErrorResponseError
        console.log(error.data$.userId); // string
      }
    }
  }
}

run();

```

### Error Classes
**Primary errors:**
* [`OpenRouterError`](./src/models/errors/openroutererror.ts): The base class for HTTP error responses.
  * [`ErrorResponse`](./src/models/errors/errorresponse.ts): Error response. *

<details><summary>Less common errors (8)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/httpclienterrors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/httpclienterrors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/httpclienterrors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/httpclienterrors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/httpclienterrors.ts): Unrecognised or unexpected error.


**Inherit from [`OpenRouterError`](./src/models/errors/openroutererror.ts)**:
* [`ChatError`](./src/models/errors/chaterror.ts): Bad request - invalid parameters. Applicable to 2 of 23 methods.*
* [`InternalServerError`](./src/models/errors/internalservererror.ts): Internal Server Error. Status code `500`. Applicable to 1 of 23 methods.*
* [`ResponseValidationError`](./src/models/errors/responsevalidationerror.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>

\* Check [the method documentation](#available-resources-and-operations) to see if the error is applicable.
<!-- End Error Handling [errors] -->

<!-- No Server Selection [server] -->

<!-- No Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { OpenRouter } from "@openrouter/sdk";

const sdk = new OpenRouter({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `OPENROUTER_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation.
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release.
