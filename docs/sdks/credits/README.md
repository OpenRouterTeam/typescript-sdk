# Credits
(*credits*)

## Overview

Credit management endpoints

### Available Operations

* [getCredits](#getcredits) - Get remaining credits
* [createCoinbaseCharge](#createcoinbasecharge) - Create a Coinbase charge for crypto payment

## getCredits

Get total credits purchased and used for the authenticated user

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getCredits" method="get" path="/credits" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.credits.getCredits();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { creditsGetCredits } from "@openrouter/sdk/funcs/creditsGetCredits.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await creditsGetCredits(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("creditsGetCredits failed:", res.error);
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
  useCreditsGetCredits,
  useCreditsGetCreditsSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchCreditsGetCredits,
  
  // Utility to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateAllCreditsGetCredits,
} from "@openrouter/sdk/react-query/creditsGetCredits.js";
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

## createCoinbaseCharge

Create a Coinbase charge for crypto payment

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createCoinbaseCharge" method="post" path="/credits/coinbase" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter();

async function run() {
  const result = await openRouter.credits.createCoinbaseCharge({
    bearer: process.env["OPENROUTER_BEARER"] ?? "",
  }, {
    amount: 711.16,
    sender: "<value>",
    chainId: 1,
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { creditsCreateCoinbaseCharge } from "@openrouter/sdk/funcs/creditsCreateCoinbaseCharge.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore();

async function run() {
  const res = await creditsCreateCoinbaseCharge(openRouter, {
    bearer: process.env["OPENROUTER_BEARER"] ?? "",
  }, {
    amount: 711.16,
    sender: "<value>",
    chainId: 1,
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("creditsCreateCoinbaseCharge failed:", res.error);
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
  useCreditsCreateCoinbaseChargeMutation
} from "@openrouter/sdk/react-query/creditsCreateCoinbaseCharge.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateCoinbaseChargeRequest](../../models/operations/createcoinbasechargerequest.md)                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.CreateCoinbaseChargeSecurity](../../models/operations/createcoinbasechargesecurity.md)                                                                             | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateCoinbaseChargeResponse](../../models/operations/createcoinbasechargeresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |