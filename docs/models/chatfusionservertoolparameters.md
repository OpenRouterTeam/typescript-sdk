# ChatFusionServerToolParameters

## Example Usage

```typescript
import { ChatFusionServerToolParameters } from "@openrouter/sdk/models";

let value: ChatFusionServerToolParameters = {
  analysisModels: [
    "openai/gpt-4o",
    "anthropic/claude-sonnet-4",
    "google/gemini-2.5-flash",
  ],
};
```

## Fields

| Field                                                                                                                                     | Type                                                                                                                                      | Required                                                                                                                                  | Description                                                                                                                               | Example                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `analysisModels`                                                                                                                          | *string*[]                                                                                                                                | :heavy_check_mark:                                                                                                                        | List of model slugs to query in parallel for source responses. At least 2 required, max 20. Defaults to the Quality model set if omitted. | [<br/>"openai/gpt-4o",<br/>"anthropic/claude-sonnet-4",<br/>"google/gemini-2.5-flash"<br/>]                                               |