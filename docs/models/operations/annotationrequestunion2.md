# AnnotationRequestUnion2


## Supported Types

### `operations.AnnotationFileCitationRequest2`

```typescript
const value: operations.AnnotationFileCitationRequest2 = {
  type: "file_citation",
  fileId: "<id>",
  filename: "example.file",
  index: 7161.66,
};
```

### `operations.AnnotationURLCitationRequest2`

```typescript
const value: operations.AnnotationURLCitationRequest2 = {
  type: "url_citation",
  endIndex: 9707.88,
  startIndex: 4008.22,
  title: "<value>",
  url: "https://admired-smog.com/",
};
```

### `operations.AnnotationFilePathRequest2`

```typescript
const value: operations.AnnotationFilePathRequest2 = {
  type: "file_path",
  fileId: "<id>",
  index: 1893.51,
};
```

