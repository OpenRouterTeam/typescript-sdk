# OpenAIResponsesIncludable

## Example Usage

```typescript
import { OpenAIResponsesIncludable } from "@openrouter/sdk/models";

let value: OpenAIResponsesIncludable = "file_search_call.results";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"file_search_call.results" | "message.input_image.image_url" | "computer_call_output.output.image_url" | "reasoning.encrypted_content" | "code_interpreter_call.outputs" | Unrecognized<string>
```