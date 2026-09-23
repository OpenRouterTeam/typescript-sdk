import * as errors from "../models/errors/index.js";
import * as operations from "../models/operations/index.js";
import { safeParse } from "./lib.js";

export function chatSend(request) {
  const parsed = safeParse(request, operations.SendChatRequest$outboundSchema);
  return [parsed, operations.SendChatResponse$inboundSchema, errors.BadRequestError$inboundSchema];
}
