# MessagesMessageParamContentUnion4


## Supported Types

### `models.AnthropicTextBlockParam`

```typescript
const value: models.AnthropicTextBlockParam = {
  text: "Hello, world!",
  type: "text",
};
```

### `models.AnthropicImageBlockParam`

```typescript
const value: models.AnthropicImageBlockParam = {
  source: {
    data: "/9j/4AAQ...",
    mediaType: "image/jpeg",
    type: "base64",
  },
  type: "image",
};
```

### `models.AnthropicDocumentBlockParam`

```typescript
const value: models.AnthropicDocumentBlockParam = {
  source: {
    data: "Hello, world!",
    mediaType: "text/plain",
    type: "text",
  },
  type: "document",
};
```

### `models.ContentToolUse`

```typescript
const value: models.ContentToolUse = {
  id: "<id>",
  name: "<value>",
  type: "tool_use",
};
```

### `models.ContentToolResult`

```typescript
const value: models.ContentToolResult = {
  toolUseId: "<id>",
  type: "tool_result",
};
```

### `models.ContentThinking`

```typescript
const value: models.ContentThinking = {
  signature: "<value>",
  thinking: "<value>",
  type: "thinking",
};
```

### `models.ContentRedactedThinking`

```typescript
const value: models.ContentRedactedThinking = {
  data: "<value>",
  type: "redacted_thinking",
};
```

### `models.ContentServerToolUse`

```typescript
const value: models.ContentServerToolUse = {
  id: "<id>",
  name: "web_search",
  type: "server_tool_use",
};
```

### `models.ContentWebSearchToolResult`

```typescript
const value: models.ContentWebSearchToolResult = {
  content: [
    {
      encryptedContent: "enc_content_0",
      title: "Example Page",
      type: "web_search_result",
      url: "https://example.com",
    },
  ],
  toolUseId: "<id>",
  type: "web_search_tool_result",
};
```

### `models.AnthropicSearchResultBlockParam`

```typescript
const value: models.AnthropicSearchResultBlockParam = {
  content: [
    {
      text: "Result content",
      type: "text",
    },
  ],
  source: "example_source",
  title: "Example Result",
  type: "search_result",
};
```

### `models.ContentCompaction`

```typescript
const value: models.ContentCompaction = {
  content: null,
  type: "compaction",
};
```

