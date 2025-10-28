# ParametersT
(*parameters*)

## Overview

Parameters endpoints

### Available Operations

* [getParameters](#getparameters) - Get a model's supported parameters and data about which are most popular

## getParameters

Get a model's supported parameters and data about which are most popular

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getParameters" method="get" path="/parameters/{author}/{slug}" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter();

async function run() {
  const result = await openRouter.parameters.getParameters({
    bearer: process.env["OPENROUTER_BEARER"] ?? "",
  }, {
    author: "<value>",
    slug: "<value>",
    provider: "Google AI Studio",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { parametersGetParameters } from "@openrouter/sdk/funcs/parametersGetParameters.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore();

async function run() {
  const res = await parametersGetParameters(openRouter, {
    bearer: process.env["OPENROUTER_BEARER"] ?? "",
  }, {
    author: "<value>",
    slug: "<value>",
    provider: "Google AI Studio",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("parametersGetParameters failed:", res.error);
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
  useParametersGetParameters,
  useParametersGetParametersSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchParametersGetParameters,
  
  // Utilities to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateParametersGetParameters,
  invalidateAllParametersGetParameters,
} from "@openrouter/sdk/react-query/parametersGetParameters.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetParametersRequest](../../models/operations/getparametersrequest.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetParametersSecurity](../../models/operations/getparameterssecurity.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetParametersResponse](../../models/operations/getparametersresponse.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.UnauthorizedResponseError   | 401                                | application/json                   |
| errors.NotFoundResponseError       | 404                                | application/json                   |
| errors.InternalServerResponseError | 500                                | application/json                   |
| errors.OpenRouterDefaultError      | 4XX, 5XX                           | \*/\*                              |