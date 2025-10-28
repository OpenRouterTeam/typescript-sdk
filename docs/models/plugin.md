# Plugin


## Supported Types

### `models.PluginModeration`

```typescript
const value: models.PluginModeration = {
  id: "moderation",
};
```

### `models.PluginWeb`

```typescript
const value: models.PluginWeb = {
  id: "web",
  maxResults: 7404.94,
  searchPrompt: "<value>",
  engine: "exa",
};
```

### `models.PluginFileParser`

```typescript
const value: models.PluginFileParser = {
  id: "file-parser",
  maxFiles: 5518.4,
  pdf: {
    engine: "mistral-ocr",
  },
};
```

