# CreateCoinbaseChargeRequest

## Example Usage

```typescript
import { CreateCoinbaseChargeRequest } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeRequest = {
  createChargeRequest: {
    amount: 100,
    sender: "0x1234567890123456789012345678901234567890",
    chainId: 1,
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/> |                                                                                                                                                   |
| `xTitle`                                                                                                                                          | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                 |                                                                                                                                                   |
| `createChargeRequest`                                                                                                                             | [models.CreateChargeRequest](../../models/createchargerequest.md)                                                                                 | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               | {<br/>"amount": 100,<br/>"sender": "0x1234567890123456789012345678901234567890",<br/>"chain_id": 1<br/>}                                          |