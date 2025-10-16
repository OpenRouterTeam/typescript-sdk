# OpenResponsesIncludable

Fields to include in the response that would normally be omitted

## Example Usage

```typescript
import { OpenResponsesIncludable } from "@openrouter/sdk/models";

let value: OpenResponsesIncludable = "message.input_image.image_url";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"file_search_call.results" | "message.input_image.image_url" | "computer_call_output.output.image_url" | "reasoning.encrypted_content" | "code_interpreter_call.outputs" | Unrecognized<string>
```