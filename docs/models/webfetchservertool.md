# WebFetchServerTool

OpenRouter built-in server tool: fetches full content from a URL (web page or PDF)

## Example Usage

```typescript
import { WebFetchServerTool } from "@openrouter/sdk/models";

let value: WebFetchServerTool = {
  type: "openrouter:web_fetch",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `parameters`                                                             | [models.WebFetchServerToolConfig](../models/webfetchservertoolconfig.md) | :heavy_minus_sign:                                                       | Configuration for the openrouter:web_fetch server tool                   | {<br/>"max_content_tokens": 100000,<br/>"max_uses": 10<br/>}             |
| `type`                                                                   | [models.WebFetchServerToolType](../models/webfetchservertooltype.md)     | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |