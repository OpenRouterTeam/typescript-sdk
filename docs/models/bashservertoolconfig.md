# BashServerToolConfig

Configuration for the openrouter:bash server tool

## Example Usage

```typescript
import { BashServerToolConfig } from "@openrouter/sdk/models";

let value: BashServerToolConfig = {};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `environment`                                   | *models.BashServerToolEnvironment*              | :heavy_minus_sign:                              | Execution environment for the bash server tool. | {<br/>"type": "container_auto"<br/>}            |