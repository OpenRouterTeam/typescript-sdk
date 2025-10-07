# ResponsesAnnotation

Annotation for output text in Responses API


## Supported Types

### `models.ResponsesAnnotationFileCitation`

```typescript
const value: models.ResponsesAnnotationFileCitation = {
  type: "file_citation",
  fileId: "<id>",
  filename: "example.file",
  index: 5859.83,
};
```

### `models.ResponsesAnnotationUrlCitation`

```typescript
const value: models.ResponsesAnnotationUrlCitation = {
  type: "url_citation",
  endIndex: 42,
  startIndex: 12,
  title: "Example Article",
  url: "https://example.com/article",
};
```

### `models.ResponsesAnnotationFilePath`

```typescript
const value: models.ResponsesAnnotationFilePath = {
  type: "file_path",
  fileId: "<id>",
  index: 8899.81,
};
```

