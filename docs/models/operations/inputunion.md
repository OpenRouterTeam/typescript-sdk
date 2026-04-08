# InputUnion

Text, token, or multimodal input(s) to embed


## Supported Types

### `string`

```typescript
const value: string = "The quick brown fox jumps over the lazy dog";
```

### `string[]`

```typescript
const value: string[] = [
  "<value 1>",
  "<value 2>",
];
```

### `number[]`

```typescript
const value: number[] = [
  3390.48,
  1336.21,
  9437.99,
];
```

### `number[][]`

```typescript
const value: number[][] = [
  [
    6206.15,
  ],
  [
    8419.72,
    5863.71,
  ],
  [
    2540.22,
  ],
];
```

### `operations.Input[]`

```typescript
const value: operations.Input[] = [
  {
    content: [],
  },
];
```

