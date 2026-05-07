# ChatRequestDataCollection

Data collection setting. If no available model provider meets the requirement, your request will return an error.
- allow: (default) allow providers which store user data non-transiently and may train on it

- deny: use only providers which do not collect user data.

## Example Usage

```typescript
import { ChatRequestDataCollection } from "@openrouter/sdk/models";

let value: ChatRequestDataCollection = "allow";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"deny" | "allow" | Unrecognized<string>
```