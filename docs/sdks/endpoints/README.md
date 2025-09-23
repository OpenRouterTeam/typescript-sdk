# Endpoints
(*endpoints*)

## Overview

### Available Operations

* [getModelsAuthorSlugEndpoints](#getmodelsauthorslugendpoints) - List all endpoints for a model
* [getEndpointsZdr](#getendpointszdr) - Preview the impact of ZDR on the available endpoints

## getModelsAuthorSlugEndpoints

List all endpoints for a model

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/models/{author}/{slug}/endpoints" method="get" path="/models/{author}/{slug}/endpoints" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.endpoints.getModelsAuthorSlugEndpoints({
    author: "<value>",
    slug: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { endpointsGetModelsAuthorSlugEndpoints } from "openrouter/funcs/endpointsGetModelsAuthorSlugEndpoints.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await endpointsGetModelsAuthorSlugEndpoints(openRouter, {
    author: "<value>",
    slug: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("endpointsGetModelsAuthorSlugEndpoints failed:", res.error);
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
  useEndpointsGetModelsAuthorSlugEndpoints,
  useEndpointsGetModelsAuthorSlugEndpointsSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchEndpointsGetModelsAuthorSlugEndpoints,
  
  // Utilities to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateEndpointsGetModelsAuthorSlugEndpoints,
  invalidateAllEndpointsGetModelsAuthorSlugEndpoints,
} from "openrouter/react-query/endpointsGetModelsAuthorSlugEndpoints.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetModelsAuthorSlugEndpointsRequestRequest](../../models/operations/getmodelsauthorslugendpointsrequestrequest.md)                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetModelsAuthorSlugEndpointsResponse](../../models/operations/getmodelsauthorslugendpointsresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |

## getEndpointsZdr

Preview the impact of ZDR on the available endpoints

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/endpoints/zdr" method="get" path="/endpoints/zdr" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.endpoints.getEndpointsZdr();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { endpointsGetEndpointsZdr } from "openrouter/funcs/endpointsGetEndpointsZdr.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await endpointsGetEndpointsZdr(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("endpointsGetEndpointsZdr failed:", res.error);
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
  useEndpointsGetEndpointsZdr,
  useEndpointsGetEndpointsZdrSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchEndpointsGetEndpointsZdr,
  
  // Utility to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateAllEndpointsGetEndpointsZdr,
} from "openrouter/react-query/endpointsGetEndpointsZdr.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetEndpointsZdrResponse](../../models/operations/getendpointszdrresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |