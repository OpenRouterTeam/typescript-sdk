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
  339048,
  133621,
  943799,
];
```

### `number[][]`

```typescript
const value: number[][] = [
  [
    620615,
  ],
  [
    841972,
    586371,
  ],
  [
    254022,
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

