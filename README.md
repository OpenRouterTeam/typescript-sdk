


<div align="center">
    <img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/19d8ad52-cb56-4f87-8bce-9a9c2233ac16" />
    <h1>OpenRouter TypeScript SDK</h1>
    <p>Developer-friendly TypeScript SDK specifically catered to leverage the <strong>OpenRouter</strong> API.</p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" /></a>
</div>



<!-- Start Summary [summary] -->
## Summary

OpenRouter Chat Completions API: OpenAI-compatible Chat Completions API with additional OpenRouter features

For more information about the API: [OpenRouter Documentation](https://openrouter.ai/docs)
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Server-sent event streaming](#server-sent-event-streaming)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

> [!TIP]
> To finish publishing your SDK to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).


The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET> zod

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
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
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
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
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
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
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [chat](docs/sdks/chat/README.md)

* [complete](docs/sdks/chat/README.md#complete) - Create a chat completion


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

- [`chatComplete`](docs/sdks/chat/README.md#complete) - Create a chat completion

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- No Server-sent event streaming [eventstream] -->
## Server-sent event streaming

[Server-sent events][mdn-sse] are used to stream content from certain
operations. These operations will expose the stream as an async iterable that
can be consumed using a [`for await...of`][mdn-for-await-of] loop. The loop will
terminate when the server no longer has any events to send and closes the
underlying connection.

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

You can also pass the `stream` parameter to the `complete` method to control streaming behavior dynamically:

```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  bearerAuth: process.env["OPENROUTER_BEARER_AUTH"] ?? "",
});

async function run() {
  const isStreaming = true; // Set to false for non-streaming response
  
  const result = await openRouter.chat.complete({
    model: "openai/gpt-3.5-turbo",
    stream: isStreaming,
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });

  // Handle response based on stream setting
  if (isStreaming) {
    console.log("Streaming response:");
    for await (const chunk of result) {
      if (chunk.data?.choices?.[0]?.delta?.content) {
        process.stdout.write(chunk.data.choices[0].delta.content);
      }
    }
    console.log("\n\nStreaming completed");
  } else {
    console.log("Non-streaming response:");
    console.log(JSON.stringify(result, null, 2));
  }
}

run();
```

[mdn-sse]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
[mdn-for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
<!-- No Server-sent event streaming [eventstream] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.chat.complete({
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
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
import { OpenRouter } from "open-router";

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
import { OpenRouter } from "open-router";
import * as errors from "open-router/models/errors";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  try {
    const result = await openRouter.chat.complete({
      messages: [
        {
          role: "user",
          content: "Hello, how are you?",
        },
      ],
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
      if (error instanceof errors.OpenRouterInvalidRequestError) {
        console.log(error.data$.error); // models.OpenRouterInvalidRequestErrorError
      }
    }
  }
}

run();

```

### Error Classes
**Primary errors:**
* [`OpenRouterError`](./src/models/errors/openroutererror.ts): The base class for HTTP error responses.
  * [`OpenRouterInvalidRequestError`](./src/models/errors/openrouterinvalidrequesterror.ts): OpenRouter invalid request error response. Status code `400`.
  * [`OpenRouterUnauthorizedError`](./src/models/errors/openrouterunauthorizederror.ts): OpenRouter unauthorized error response. Status code `401`.
  * [`OpenRouterRateLimitError`](./src/models/errors/openrouterratelimiterror.ts): OpenRouter rate limit error response. Status code `429`.
  * [`OpenRouterServerError`](./src/models/errors/openrouterservererror.ts): OpenRouter server error response. Status code `500`.

<details><summary>Less common errors (6)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/httpclienterrors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/httpclienterrors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/httpclienterrors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/httpclienterrors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/httpclienterrors.ts): Unrecognised or unexpected error.


**Inherit from [`OpenRouterError`](./src/models/errors/openroutererror.ts)**:
* [`ResponseValidationError`](./src/models/errors/responsevalidationerror.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Select Server by Name

You can override the default server globally by passing a server name to the `server: keyof typeof ServerList` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the names associated with the available servers:

| Name         | Server                          | Variables      | Description       |
| ------------ | ------------------------------- | -------------- | ----------------- |
| `production` | `https://{provider_url}/api/v1` | `provider_url` | Production server |

If the selected server has variables, you may override its default values through the additional parameters made available in the SDK constructor:

| Variable       | Parameter             | Default           | Description |
| -------------- | --------------------- | ----------------- | ----------- |
| `provider_url` | `providerUrl: string` | `"openrouter.ai"` |             |

#### Example

```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  server: "production",
  providerUrl: "https://ruddy-guacamole.info/",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
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

### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { OpenRouter } from "open-router";

const openRouter = new OpenRouter({
  serverURL: "https://openrouter.ai/api/v1",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
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
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { OpenRouter } from "open-router";
import { HTTPClient } from "open-router/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new OpenRouter({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { OpenRouter } from "open-router";

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

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=open-router&utm_campaign=typescript)
