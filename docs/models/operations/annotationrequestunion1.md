# AnnotationRequestUnion1


## Supported Types

### `operations.AnnotationFileCitationRequest1`

```typescript
const value: operations.AnnotationFileCitationRequest1 = {
  type: "file_citation",
  fileId: "<id>",
  filename: "example.file",
  index: 4510.63,
};
```

### `operations.AnnotationURLCitationRequest1`

```typescript
const value: operations.AnnotationURLCitationRequest1 = {
  type: "url_citation",
  endIndex: 4833.04,
  startIndex: 9072.05,
  title: "<value>",
  url: "https://unique-knuckle.org",
};
```

### `operations.AnnotationFilePathRequest1`

```typescript
const value: operations.AnnotationFilePathRequest1 = {
  type: "file_path",
  fileId: "<id>",
  index: 3073.38,
};
```

