# BulkAssignKeysToGuardrailRequestBody

## Example Usage

```typescript
import { BulkAssignKeysToGuardrailRequestBody } from "@openrouter/sdk/models/operations";

let value: BulkAssignKeysToGuardrailRequestBody = {
  keyHashes: [
    "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
  ],
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `keyHashes`                                                            | *string*[]                                                             | :heavy_check_mark:                                                     | Array of API key hashes to assign to the guardrail                     | [<br/>"c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"<br/>] |