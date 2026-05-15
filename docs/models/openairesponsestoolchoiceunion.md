# OpenAIResponsesToolChoiceUnion


## Supported Types

### `models.OpenAIResponsesToolChoiceAuto`

```typescript
const value: models.OpenAIResponsesToolChoiceAuto = "auto";
```

### `models.OpenAIResponsesToolChoiceNone`

```typescript
const value: models.OpenAIResponsesToolChoiceNone = "none";
```

### `models.OpenAIResponsesToolChoiceRequired`

```typescript
const value: models.OpenAIResponsesToolChoiceRequired = "required";
```

### `models.OpenAIResponsesToolChoiceFunction`

```typescript
const value: models.OpenAIResponsesToolChoiceFunction = {
  name: "<value>",
  type: "function",
};
```

### `models.OpenAIResponsesToolChoice`

```typescript
const value: models.OpenAIResponsesToolChoice = {
  type: "web_search_preview",
};
```

### `models.ToolChoiceAllowed`

```typescript
const value: models.ToolChoiceAllowed = {
  mode: "auto",
  tools: [
    {
      "name": "get_weather",
      "type": "function",
    },
  ],
  type: "allowed_tools",
};
```

