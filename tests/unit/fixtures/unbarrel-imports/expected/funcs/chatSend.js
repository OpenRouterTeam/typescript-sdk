import { BadRequestError$inboundSchema as errors_BadRequestError$inboundSchema } from "../models/errors/badrequest.js";
import { SendChatRequest$outboundSchema as operations_SendChatRequest$outboundSchema, SendChatResponse$inboundSchema as operations_SendChatResponse$inboundSchema } from "../models/operations/sendchat.js";
import { safeParse } from "./lib.js";

export function chatSend(request) {
  const parsed = safeParse(request, operations_SendChatRequest$outboundSchema);
  return [parsed, operations_SendChatResponse$inboundSchema, errors_BadRequestError$inboundSchema];
}
