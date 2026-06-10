# Subcategory

Marketplace subcategory to filter by (e.g. `cli-agent`). Takes precedence over `category` for the actual filter; when `category` is also supplied the pair must be consistent.

## Example Usage

```typescript
import { Subcategory } from "@openrouter/sdk/models/operations";

let value: Subcategory = "cli-agent";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"cli-agent" | "ide-extension" | "cloud-agent" | "programming-app" | "native-app-builder" | "creative-writing" | "video-gen" | "image-gen" | "audio-gen" | "roleplay" | "game" | "writing-assistant" | "general-chat" | "personal-agent" | "legal" | Unrecognized<string>
```