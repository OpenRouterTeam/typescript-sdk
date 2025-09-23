# Models
(*models*)

## Overview

### Available Operations

* [getModelsCount](#getmodelscount) - Get total count of available models
* [getModels](#getmodels) - List all models and their properties
* [getModelsUser](#getmodelsuser) - List models filtered by user provider preferences

## getModelsCount

Get total count of available models

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/models/count" method="get" path="/models/count" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.models.getModelsCount();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { modelsGetModelsCount } from "openrouter/funcs/modelsGetModelsCount.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await modelsGetModelsCount(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsGetModelsCount failed:", res.error);
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
  useModelsGetModelsCount,
  useModelsGetModelsCountSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchModelsGetModelsCount,
  
  // Utility to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateAllModelsGetModelsCount,
} from "openrouter/react-query/modelsGetModelsCount.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetModelsCountResponse](../../models/operations/getmodelscountresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |

## getModels

List all models and their properties

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/models" method="get" path="/models" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.models.getModels();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { modelsGetModels } from "openrouter/funcs/modelsGetModels.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await modelsGetModels(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsGetModels failed:", res.error);
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
  useModelsGetModels,
  useModelsGetModelsSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchModelsGetModels,
  
  // Utilities to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateModelsGetModels,
  invalidateAllModelsGetModels,
} from "openrouter/react-query/modelsGetModels.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetModelsRequestRequest](../../models/operations/getmodelsrequestrequest.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetModelsResponse](../../models/operations/getmodelsresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |

## getModelsUser

List models filtered by user provider preferences

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/models/user" method="get" path="/models/user" -->
```typescript
import { OpenRouter } from "openrouter";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.models.getModelsUser();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "openrouter/core.js";
import { modelsGetModelsUser } from "openrouter/funcs/modelsGetModelsUser.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await modelsGetModelsUser(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsGetModelsUser failed:", res.error);
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
  useModelsGetModelsUser,
  useModelsGetModelsUserSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchModelsGetModelsUser,
  
  // Utility to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateAllModelsGetModelsUser,
} from "openrouter/react-query/modelsGetModelsUser.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetModelsUserResponse](../../models/operations/getmodelsuserresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |