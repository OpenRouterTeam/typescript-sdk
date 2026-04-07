# ChatRequestFilters

Filters to narrow the candidate model set

## Example Usage

```typescript
import { ChatRequestFilters } from "@openrouter/sdk/models";

let value: ChatRequestFilters = {};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `provider`                                           | *string*[]                                           | :heavy_minus_sign:                                   | Provider restrictions (e.g. ["anthropic", "openai"]) | [<br/>"anthropic"<br/>]                              |
| `family`                                             | *string*[]                                           | :heavy_minus_sign:                                   | Model family restrictions (e.g. ["opus", "sonnet"])  | [<br/>"opus"<br/>]                                   |
| `capabilities`                                       | *string*[]                                           | :heavy_minus_sign:                                   | Required capabilities (e.g. ["vision", "tool_use"])  | [<br/>"vision"<br/>]                                 |