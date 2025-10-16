# OutputTextContentAnnotation


## Supported Types

### `models.FileCitationAnnotation`

```typescript
const value: models.FileCitationAnnotation = {
  type: "file_citation",
  fileId: "<id>",
  filename: "example.file",
  index: 5362.04,
};
```

### `models.URLCitationAnnotation`

```typescript
const value: models.URLCitationAnnotation = {
  type: "url_citation",
  endIndex: 6805.23,
  startIndex: 5557.95,
  title: "<value>",
  url: "https://fat-gloom.biz",
};
```

### `models.FilePathAnnotation`

```typescript
const value: models.FilePathAnnotation = {
  type: "file_path",
  fileId: "<id>",
  index: 6594.22,
};
```

