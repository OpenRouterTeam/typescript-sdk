# OpenResponsesRequestToolUnion


## Supported Types

### `models.OpenResponsesRequestToolFunction`

```typescript
const value: models.OpenResponsesRequestToolFunction = {
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
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "New Amelie",
    country: "Liberia",
    region: null,
    timezone: "Europe/Minsk",
  },
};
```

### `models.OpenResponsesWebSearchPreview20250311Tool`

```typescript
const value: models.OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "New Amelie",
    country: "Liberia",
    region: null,
    timezone: "Europe/Minsk",
  },
};
```

### `models.OpenResponsesWebSearchTool`

```typescript
const value: models.OpenResponsesWebSearchTool = {
  type: "web_search",
  filters: {
    allowedDomains: [
      "example.com",
    ],
  },
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "San Francisco",
    country: "USA",
    region: "California",
    timezone: "America/Los_Angeles",
  },
};
```

### `models.OpenResponsesWebSearch20250826Tool`

```typescript
const value: models.OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
  filters: {
    allowedDomains: [
      "example.com",
    ],
  },
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "San Francisco",
    country: "USA",
    region: "California",
    timezone: "America/Los_Angeles",
  },
};
```

