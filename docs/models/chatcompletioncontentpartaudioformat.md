# ChatCompletionContentPartAudioFormat

Audio format

## Example Usage

```typescript
import { ChatCompletionContentPartAudioFormat } from "open-router/models";

let value: ChatCompletionContentPartAudioFormat = "mp3";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"wav" | "mp3" | "flac" | "m4a" | "ogg" | "pcm16" | "pcm24" | Unrecognized<string>
```