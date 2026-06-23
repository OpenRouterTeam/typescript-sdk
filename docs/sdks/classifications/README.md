# Classifications

## Overview

Task classification market-share endpoints

### Available Operations

* [getTaskClassifications](#gettaskclassifications) - Task classification market share

## getTaskClassifications

Returns the market-share breakdown of OpenRouter traffic by task classification
(e.g. code generation, web search, summarization) over a trailing time window.

Each classification reports its share of classified sampled requests (`usage_share`)
and classified sampled token volume (`token_share`) as fractions between 0 and 1.
The unclassified `other` bucket is excluded. Absolute volumes are not exposed
because the underlying data is sampled.

Each classification also includes a `models` array listing the top models by
request volume within that classification, with their within-tag usage and token shares.

Classifications are grouped into macro-categories (Code, Data, Agent, General)
with aggregate shares provided for each.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this data, cite as:
"Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getTaskClassifications" method="get" path="/classifications/task" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.classifications.getTaskClassifications();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { classificationsGetTaskClassifications } from "@openrouter/sdk/funcs/classificationsGetTaskClassifications.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await classificationsGetTaskClassifications(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("classificationsGetTaskClassifications failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetTaskClassificationsRequest](../../models/operations/gettaskclassificationsrequest.md)                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.TaskClassificationResponse](../../models/taskclassificationresponse.md)\>**

### Errors

| Error Type                          | Status Code                         | Content Type                        |
| ----------------------------------- | ----------------------------------- | ----------------------------------- |
| errors.BadRequestResponseError      | 400                                 | application/json                    |
| errors.UnauthorizedResponseError    | 401                                 | application/json                    |
| errors.TooManyRequestsResponseError | 429                                 | application/json                    |
| errors.InternalServerResponseError  | 500                                 | application/json                    |
| errors.OpenRouterDefaultError       | 4XX, 5XX                            | \*/\*                               |