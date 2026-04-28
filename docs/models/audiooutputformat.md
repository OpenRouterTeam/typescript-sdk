# AudioOutputFormat

Format of the audio output bytes.

## Example Usage

```typescript
import { AudioOutputFormat } from "@openrouter/sdk/models";

let value: AudioOutputFormat = "mp3";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"mp3" | "wav" | "pcm16" | "opus" | "flac" | Unrecognized<string>
```