# InputsUnion

Input for a response request - can be a string or array of items


## Supported Types

### `string`

```typescript
const value: string =
  "[{\"role\":\"user\",\"content\":\"What is the weather today?\"}]";
```

### `models.InputsUnion1[]`

```typescript
const value: models.InputsUnion1[] = [
  {
    role: "user",
  },
];
```

