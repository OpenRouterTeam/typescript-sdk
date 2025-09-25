# ToolChoiceResponseUnion


## Supported Types

### `operations.ToolChoiceAutoResponse`

```typescript
const value: operations.ToolChoiceAutoResponse = "auto";
```

### `operations.ToolChoiceNoneResponse`

```typescript
const value: operations.ToolChoiceNoneResponse = "none";
```

### `operations.ToolChoiceRequiredResponse`

```typescript
const value: operations.ToolChoiceRequiredResponse = "required";
```

### `operations.ToolChoiceResponse`

```typescript
const value: operations.ToolChoiceResponse = {
  type: "web_search_preview",
};
```

### `operations.ToolChoiceFunctionResponse`

```typescript
const value: operations.ToolChoiceFunctionResponse = {
  type: "function",
  name: "<value>",
};
```

