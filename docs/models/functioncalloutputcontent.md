# FunctionCallOutputContent

Content parts allowed inside function_call_output / custom_tool_call_output.


## Supported Types

### `models.InputText`

```typescript
const value: models.InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

### `models.FunctionCallOutputContentInputImage`

```typescript
const value: models.FunctionCallOutputContentInputImage = {
  detail: "low",
  type: "input_image",
};
```

### `models.InputFile`

```typescript
const value: models.InputFile = {
  type: "input_file",
};
```

