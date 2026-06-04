# InputReference

A reference asset used to guide video generation. Image references are supported by all providers; audio and video references are only honored by providers that support them (currently BytePlus Seedance 2.0).


## Supported Types

### `models.ContentPartAudio`

```typescript
const value: models.ContentPartAudio = {
  audioUrl: {
    url: "https://weary-poppy.biz",
  },
  type: "audio_url",
};
```

### `models.ContentPartImage`

```typescript
const value: models.ContentPartImage = {
  imageUrl: {
    url: "https://example.com/image.png",
  },
  type: "image_url",
};
```

### `models.ContentPartVideo`

```typescript
const value: models.ContentPartVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://bleak-marketplace.org/",
  },
};
```

