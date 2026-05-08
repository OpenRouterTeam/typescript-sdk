# OpenAIResponseFunctionCallOutputContent

Content parts allowed inside function_call_output / custom_tool_call_output.


## Supported Types

### `models.InputFile`

```typescript
const value: models.InputFile = {
  type: "input_file",
};
```

### `models.InputImage`

```typescript
const value: models.InputImage = {
  detail: "auto",
  type: "input_image",
};
```

### `models.InputText`

```typescript
const value: models.InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

