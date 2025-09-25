# InstructionsContentUnion5


## Supported Types

### `operations.InstructionsContentOutputText2`

```typescript
const value: operations.InstructionsContentOutputText2 = {
  type: "output_text",
  text: "<value>",
  annotations: [
    {
      type: "file_citation",
      fileId: "<id>",
      filename: "example.file",
      index: 6521.93,
    },
  ],
};
```

### `operations.InstructionsContentRefusal2`

```typescript
const value: operations.InstructionsContentRefusal2 = {
  type: "refusal",
  refusal: "<value>",
};
```

