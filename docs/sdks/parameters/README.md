# ParametersT
(*parameters*)

## Overview

### Available Operations

* [getParametersAuthorSlug](#getparametersauthorslug) - Get a model's supported parameters and data about which are most popular

## getParametersAuthorSlug

Get a model's supported parameters and data about which are most popular

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_/parameters/{author}/{slug}" method="get" path="/parameters/{author}/{slug}" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const result = await openRouter.parameters.getParametersAuthorSlug({
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
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { parametersGetParametersAuthorSlug } from "@openrouter/sdk/funcs/parametersGetParametersAuthorSlug.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  security: {
    apiKeyAuth: process.env["OPENROUTER_API_KEY_AUTH"] ?? "",
  },
});

async function run() {
  const res = await parametersGetParametersAuthorSlug(openRouter, {
    author: "<value>",
    slug: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("parametersGetParametersAuthorSlug failed:", res.error);
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
  useParametersGetParametersAuthorSlug,
  useParametersGetParametersAuthorSlugSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchParametersGetParametersAuthorSlug,
  
  // Utilities to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateParametersGetParametersAuthorSlug,
  invalidateAllParametersGetParametersAuthorSlug,
} from "@openrouter/sdk/react-query/parametersGetParametersAuthorSlug.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetParametersAuthorSlugRequest](../../models/operations/getparametersauthorslugrequest.md)                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetParametersAuthorSlugResponse](../../models/operations/getparametersauthorslugresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.OpenRouterDefaultError | 4XX, 5XX                      | \*/\*                         |