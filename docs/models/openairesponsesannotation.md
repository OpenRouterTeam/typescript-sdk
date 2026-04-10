# OpenAIResponsesAnnotation


## Supported Types

### `models.FileCitation`

```typescript
const value: models.FileCitation = {
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
  type: "file_citation",
};
```

### `models.URLCitation`

```typescript
const value: models.URLCitation = {
  endIndex: 582752,
  startIndex: 114325,
  title: "<value>",
  type: "url_citation",
  url: "https://dim-jet.biz/",
};
```

### `models.FilePath`

```typescript
const value: models.FilePath = {
  fileId: "file-abc123",
  index: 0,
  type: "file_path",
};
```

