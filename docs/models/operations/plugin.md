# Plugin


## Supported Types

### `operations.PluginModeration`

```typescript
const value: operations.PluginModeration = {
  id: "moderation",
};
```

### `operations.PluginWeb`

```typescript
const value: operations.PluginWeb = {
  id: "web",
  maxResults: 7404.94,
  searchPrompt: "<value>",
  engine: "exa",
};
```

### `operations.PluginChainOfThought`

```typescript
const value: operations.PluginChainOfThought = {
  id: "chain-of-thought",
};
```

### `operations.PluginFileParser`

```typescript
const value: operations.PluginFileParser = {
  id: "file-parser",
  maxFiles: 5518.4,
  pdf: {
    engine: "mistral-ocr",
  },
};
```

