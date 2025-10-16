# OpenResponsesToolUnion

Union of all supported tool definitions


## Supported Types

### `models.OpenResponsesToolUnionFunction`

```typescript
const value: models.OpenResponsesToolUnionFunction = {
  type: "function",
  name: "get_weather",
  description: "Get the current weather in a location",
  strict: true,
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
  searchContextSize: "low",
  userLocation: {
    type: "approximate",
    city: "Bechtelarstad",
    country: "Bangladesh",
    region: "<value>",
    timezone: "America/Blanc-Sablon",
  },
};
```

### `models.OpenResponsesWebSearchPreview20250311Tool`

```typescript
const value: models.OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
  searchContextSize: "low",
  userLocation: {
    type: "approximate",
    city: "Bechtelarstad",
    country: "Bangladesh",
    region: "<value>",
    timezone: "America/Blanc-Sablon",
  },
};
```

### `models.OpenResponsesWebSearchTool`

```typescript
const value: models.OpenResponsesWebSearchTool = {
  type: "web_search",
  filters: {
    allowedDomains: null,
  },
  searchContextSize: "medium",
  userLocation: null,
};
```

### `models.OpenResponsesWebSearch20250826Tool`

```typescript
const value: models.OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
  filters: {
    allowedDomains: [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
  },
  searchContextSize: "low",
  userLocation: {
    type: "approximate",
    city: "Bechtelarstad",
    country: "Bangladesh",
    region: "<value>",
    timezone: "America/Blanc-Sablon",
  },
};
```

