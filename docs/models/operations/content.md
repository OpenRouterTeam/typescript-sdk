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
    data: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...",
  },
  type: "input_audio",
};
```

### `operations.ContentVideoURL`

```typescript
const value: operations.ContentVideoURL = {
  type: "video_url",
  videoUrl: {
    data: "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",
  },
};
```

### `operations.ContentInputFile`

```typescript
const value: operations.ContentInputFile = {
  inputFile: {
    data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAw...",
  },
  type: "input_file",
};
```

