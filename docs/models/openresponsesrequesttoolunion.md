# OpenResponsesRequestToolUnion


## Supported Types

### `models.OpenResponsesRequestToolFunction`

```typescript
const value: models.OpenResponsesRequestToolFunction = {
  type: "function",
  name: "get_weather",
  parameters: {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state",
      },
      "unit": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
  },
};
```

### `models.OpenResponsesWebSearchPreviewTool`

```typescript
const value: models.OpenResponsesWebSearchPreviewTool = {
  type: "web_search_preview",
};
```

### `models.OpenResponsesWebSearchPreview20250311Tool`

```typescript
const value: models.OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
};
```

### `models.OpenResponsesWebSearchTool`

```typescript
const value: models.OpenResponsesWebSearchTool = {
  type: "web_search",
};
```

### `models.OpenResponsesWebSearch20250826Tool`

```typescript
const value: models.OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
};
```

