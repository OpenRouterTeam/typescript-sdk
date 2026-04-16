# FusionServerToolParameters

## Example Usage

```typescript
import { FusionServerToolParameters } from "@openrouter/sdk/models";

let value: FusionServerToolParameters = {};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       | Example                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `analysisModels`                                                                  | *string*[]                                                                        | :heavy_minus_sign:                                                                | Model slugs to fan out the query to. Defaults to a curated set of quality models. | [<br/>"openai/gpt-4o",<br/>"anthropic/claude-sonnet-4",<br/>"google/gemini-2.5-flash"<br/>] |