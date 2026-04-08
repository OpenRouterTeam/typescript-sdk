# Task

The primary use-case category (chat, reasoning, code, creative, image, tts, stt, video, embedding)

## Example Usage

```typescript
import { Task } from "@openrouter/sdk/models";

let value: Task = "chat";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"chat" | "reasoning" | "code" | "creative" | "image" | "tts" | "stt" | "video" | "embedding" | Unrecognized<string>
```