# OpenAIResponsesAnnotation


## Supported Types

### `models.FileCitation`

```typescript
const value: models.FileCitation = {
  type: "file_citation",
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
};
```

### `models.URLCitation`

```typescript
const value: models.URLCitation = {
  type: "url_citation",
  url: "https://openrouter.ai/docs",
  title: "OpenRouter Documentation",
  startIndex: 0,
  endIndex: 42,
};
```

### `models.FilePath`

```typescript
const value: models.FilePath = {
  type: "file_path",
  fileId: "file-xyz789",
  index: 0,
};
```

