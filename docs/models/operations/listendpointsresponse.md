# ListEndpointsResponse

Returns a list of endpoints

## Example Usage

```typescript
import { ListEndpointsResponse } from "@openrouter/sdk/models/operations";

let value: ListEndpointsResponse = {
  data: {},
};
```

## Fields

| Field                                                                                                                                                                         | Type                                                                                                                                                                          | Required                                                                                                                                                                      | Description                                                                                                                                                                   | Example                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                        | [models.ListEndpointsResponse](../../models/listendpointsresponse.md)                                                                                                         | :heavy_check_mark:                                                                                                                                                            | List of available endpoints for a model                                                                                                                                       | {<br/>"id": "openai/gpt-4",<br/>"name": "GPT-4",<br/>"created": 1692901234,<br/>"description": "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy."<br/>} |