# ShellServerToolEnvironment

Server-side execution environment for the shell tool. Only container-backed environments are supported; "local" shells are not.


## Supported Types

### `models.ContainerAutoEnvironment`

```typescript
const value: models.ContainerAutoEnvironment = {
  type: "container_auto",
};
```

### `models.ContainerReferenceEnvironment`

```typescript
const value: models.ContainerReferenceEnvironment = {
  containerId: "cntr_abc123",
  type: "container_reference",
};
```

