# GenerateDataCollection

Data collection setting. If no available model provider meets the requirement, your request will return an error.
- allow: (default) allow providers which store user data non-transiently and may train on it
- deny: use only providers which do not collect user data.


## Example Usage

```typescript
import { GenerateDataCollection } from "@openrouter/sdk/models/operations";

let value: GenerateDataCollection = "allow";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"deny" | "allow" | Unrecognized<string>
```