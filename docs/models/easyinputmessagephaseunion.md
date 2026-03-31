# EasyInputMessagePhaseUnion

The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages.


## Supported Types

### `models.EasyInputMessagePhaseCommentary`

```typescript
const value: models.EasyInputMessagePhaseCommentary = "commentary";
```

### `models.EasyInputMessagePhaseFinalAnswer`

```typescript
const value: models.EasyInputMessagePhaseFinalAnswer = "final_answer";
```

### `any`

```typescript
const value: any = "final_answer";
```

