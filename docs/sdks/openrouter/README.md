# OpenRouter SDK

## Overview

OpenRouter API: OpenAI-compatible Chat Completions API with additional OpenRouter features

OpenRouter Documentation
<https://openrouter.ai/docs>

### Available Operations

* [getCredits](#getcredits) - Get total credits purchased and used for the authenticated user
* [postCreditsCoinbase](#postcreditscoinbase) - Create a Coinbase charge for crypto payment
* [getProviders](#getproviders)

## getCredits

Get total credits purchased and used for the authenticated user

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/credits" method="get" path="/credits" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.getCredits();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { getCredits } from "openrouter/funcs/getCredits.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await getCredits(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getCredits failed:", res.error);
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
  // Query hooks for fetching data.
  useGetCredits,
  useGetCreditsSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchGetCredits,
  
  // Utility to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateAllGetCredits,
} from "openrouter/react-query/getCredits.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetCreditsResponse](../../models/operations/getcreditsresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |

## postCreditsCoinbase

Create a Coinbase charge for crypto payment

### Example Usage

<!-- UsageSnippet language="typescript" operationID="post_/credits/coinbase" method="post" path="/credits/coinbase" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.postCreditsCoinbase();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { postCreditsCoinbase } from "openrouter/funcs/postCreditsCoinbase.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await postCreditsCoinbase(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("postCreditsCoinbase failed:", res.error);
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
  usePostCreditsCoinbaseMutation
} from "openrouter/react-query/postCreditsCoinbase.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostCreditsCoinbaseRequest](../../models/operations/postcreditscoinbaserequest.md)                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostCreditsCoinbaseResponse](../../models/operations/postcreditscoinbaseresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |

## getProviders

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/providers" method="get" path="/providers" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.getProviders();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { getProviders } from "openrouter/funcs/getProviders.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await getProviders(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getProviders failed:", res.error);
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
  // Query hooks for fetching data.
  useGetProviders,
  useGetProvidersSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchGetProviders,
  
  // Utility to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateAllGetProviders,
} from "openrouter/react-query/getProviders.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetProvidersResponse](../../models/operations/getprovidersresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.InternalServerError    | 500                           | application/json              |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |