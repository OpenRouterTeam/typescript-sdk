# OpenResponsesToolChoiceUnion

Tool choice for the Responses endpoint. Accepts OpenAI Responses values plus the OpenRouter shorthand `{ type: <openrouter:* | shorthand> }` for forcing a server tool. The shorthand is normalized to `{ type: "function", name }` for downstream handling.


## Supported Types

### `models.OpenResponsesToolChoiceAuto`

```typescript
const value: models.OpenResponsesToolChoiceAuto = "auto";
```

### `models.OpenResponsesToolChoiceNone`

```typescript
const value: models.OpenResponsesToolChoiceNone = "none";
```

### `models.OpenResponsesToolChoiceRequired`

```typescript
const value: models.OpenResponsesToolChoiceRequired = "required";
```

### `models.OpenAIResponsesFunctionToolChoice`

```typescript
const value: models.OpenAIResponsesFunctionToolChoice = {
  name: "get_weather",
  type: "function",
};
```

### `models.OpenResponsesToolChoice`

```typescript
const value: models.OpenResponsesToolChoice = {
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

### `models.OpenResponsesToolChoiceApplyPatch`

```typescript
const value: models.OpenResponsesToolChoiceApplyPatch = {
  type: "apply_patch",
};
```

### `models.OpenResponsesToolChoiceShell`

```typescript
const value: models.OpenResponsesToolChoiceShell = {
  type: "shell",
};
```

### `models.ResponsesServerToolChoice`

```typescript
const value: models.ResponsesServerToolChoice = {
  type: "openrouter:web_search",
};
```

