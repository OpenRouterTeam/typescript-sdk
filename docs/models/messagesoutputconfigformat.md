# MessagesOutputConfigFormat

A schema to specify Claude's output format in responses. See [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).

## Example Usage

```typescript
import { MessagesOutputConfigFormat } from "@openrouter/sdk/models";

let value: MessagesOutputConfigFormat = {
  schema: {},
  type: "json_schema",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `schema`                                                                                     | Record<string, *any*>                                                                        | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `type`                                                                                       | [models.MessagesOutputConfigTypeJSONSchema](../models/messagesoutputconfigtypejsonschema.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |