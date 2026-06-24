# Datasets

## Overview

Datasets endpoints

### Available Operations

* [getAppRankings](#getapprankings) - Top apps by token usage
* [getRankingsDaily](#getrankingsdaily) - Daily token totals for top 50 models

## getAppRankings

Returns the top public apps on OpenRouter ranked by token usage inside the requested
date window, matching the public apps marketplace on openrouter.ai/apps. Token totals
are completions API `prompt_tokens + completion_tokens`; hidden and private apps are
excluded and traffic from related app aliases is merged into the canonical visible app.

`sort=popular` (default) ranks by total token volume inside the window.
`sort=trending` ranks by absolute excess token growth: window volume minus the average
volume of the three equal-length periods immediately preceding the window. Apps with
no excess growth are omitted, so `trending` may return fewer than `limit` rows.

Filter with `category` (marketplace category group, e.g. `coding`) or `subcategory`
(e.g. `cli-agent`). Ranks are re-numbered 1..N after filtering. Page with `offset` —
`rank` stays absolute, so the first row of `offset=50` is `rank: 51`.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/apps), as of {as_of}."

Token counts come from each upstream provider's own tokenizer, so a token attributed
to one app is not directly comparable to a token attributed to another app whose
traffic flows through a different provider.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getAppRankings" method="get" path="/datasets/app-rankings" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.datasets.getAppRankings();

  for await (const page of result) {
    console.log(page);
  }
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { datasetsGetAppRankings } from "@openrouter/sdk/funcs/datasetsGetAppRankings.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await datasetsGetAppRankings(openRouter);
  if (res.ok) {
    const { value: result } = res;
    for await (const page of result) {
    console.log(page);
  }
  } else {
    console.log("datasetsGetAppRankings failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetAppRankingsRequest](../../models/operations/getapprankingsrequest.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetAppRankingsResponse](../../models/operations/getapprankingsresponse.md)\>**

### Errors

| Error Type                          | Status Code                         | Content Type                        |
| ----------------------------------- | ----------------------------------- | ----------------------------------- |
| errors.BadRequestResponseError      | 400                                 | application/json                    |
| errors.UnauthorizedResponseError    | 401                                 | application/json                    |
| errors.TooManyRequestsResponseError | 429                                 | application/json                    |
| errors.InternalServerResponseError  | 500                                 | application/json                    |
| errors.OpenRouterDefaultError       | 4XX, 5XX                            | \*/\*                               |

## getRankingsDaily

Returns the top 50 public models per day by total token usage on OpenRouter, plus a
single aggregated `other` row per day that sums every model outside that top 50.
Token totals are completions API `prompt_tokens + completion_tokens`, matching the
public text rankings chart on openrouter.ai/rankings.

Each row is a distinct `(date, model_permaslug)` pair. The `other` row uses the
reserved permaslug `other` and is always returned last within its date, so callers
can compute `top-50 traffic / total daily traffic` without a second request.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."

Token counts come from each upstream provider's own tokenizer (Anthropic counts
are as reported by Anthropic, OpenAI counts are as reported by OpenAI, etc.), so
a token in one row is not directly comparable to a token in another row from a
different provider.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getRankingsDaily" method="get" path="/datasets/rankings-daily" -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.datasets.getRankingsDaily();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { datasetsGetRankingsDaily } from "@openrouter/sdk/funcs/datasetsGetRankingsDaily.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await datasetsGetRankingsDaily(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsGetRankingsDaily failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetRankingsDailyRequest](../../models/operations/getrankingsdailyrequest.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.RankingsDailyResponse](../../models/rankingsdailyresponse.md)\>**

### Errors

| Error Type                          | Status Code                         | Content Type                        |
| ----------------------------------- | ----------------------------------- | ----------------------------------- |
| errors.BadRequestResponseError      | 400                                 | application/json                    |
| errors.UnauthorizedResponseError    | 401                                 | application/json                    |
| errors.TooManyRequestsResponseError | 429                                 | application/json                    |
| errors.InternalServerResponseError  | 500                                 | application/json                    |
| errors.OpenRouterDefaultError       | 4XX, 5XX                            | \*/\*                               |