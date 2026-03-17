# Action


## Supported Types

### `models.ActionSearch`

```typescript
const value: models.ActionSearch = {
  type: "search",
  query: "<value>",
};
```

### `models.ActionOpenPage`

```typescript
const value: models.ActionOpenPage = {
  type: "open_page",
};
```

### `models.ActionFindInPage`

```typescript
const value: models.ActionFindInPage = {
  type: "find_in_page",
  pattern: "<value>",
  url: "https://qualified-king.org",
};
```

