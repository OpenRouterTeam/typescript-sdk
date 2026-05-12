# Content


## Supported Types

### `operations.ContentText`

```typescript
const value: operations.ContentText = {
  text: "<value>",
  type: "text",
};
```

### `operations.ContentImageURL`

```typescript
const value: operations.ContentImageURL = {
  imageUrl: {
    url: "https://zealous-march.biz/",
  },
  type: "image_url",
};
```

### `operations.ContentInputAudio`

```typescript
const value: operations.ContentInputAudio = {
  inputAudio: {
    data: "<value>",
  },
  type: "input_audio",
};
```

### `operations.ContentVideoURL`

```typescript
const value: operations.ContentVideoURL = {
  type: "video_url",
  videoUrl: {
    url: "https://pleasant-futon.com/",
  },
};
```

### `operations.ContentFile`

```typescript
const value: operations.ContentFile = {
  file: {
    fileData: "<value>",
  },
  type: "file",
};
```

