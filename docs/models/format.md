# Format

## Example Usage

```typescript
import { Format } from "@openrouter/sdk/models";

let value: Format = "wav";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"wav" | "mp3" | "flac" | "m4a" | "ogg" | "pcm16" | "pcm24" | Unrecognized<string>
```