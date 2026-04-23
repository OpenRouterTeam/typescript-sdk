# MessagesMessageParamContentUnion1


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

### `models.ContentToolReference`

```typescript
const value: models.ContentToolReference = {
  toolName: "<value>",
  type: "tool_reference",
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

