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
  url: "https://classic-citizen.biz",
  title: "<value>",
  startIndex: 485813,
  endIndex: 302701,
};
```

### `models.FilePath`

```typescript
const value: models.FilePath = {
  type: "file_path",
  fileId: "file-abc123",
  index: 0,
};
```

