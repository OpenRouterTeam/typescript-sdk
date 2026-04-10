# DatetimeServerToolConfig

Configuration for the openrouter:datetime server tool

## Example Usage

```typescript
import { DatetimeServerToolConfig } from "@openrouter/sdk/models";

let value: DatetimeServerToolConfig = {};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `timezone`                                                     | *string*                                                       | :heavy_minus_sign:                                             | IANA timezone name (e.g. "America/New_York"). Defaults to UTC. | America/New_York                                               |