# OutputTextContentAnnotation


## Supported Types

### `models.FileCitationAnnotation`

```typescript
const value: models.FileCitationAnnotation = {
  type: "file_citation",
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
};
```

### `models.URLCitationAnnotation`

```typescript
const value: models.URLCitationAnnotation = {
  type: "url_citation",
  endIndex: 42,
  startIndex: 0,
  title: "OpenRouter Documentation",
  url: "https://openrouter.ai/docs",
};
```

### `models.FilePathAnnotation`

```typescript
const value: models.FilePathAnnotation = {
  type: "file_path",
  fileId: "file-xyz789",
  index: 0,
};
```

