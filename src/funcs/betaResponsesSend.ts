import { responsesSend } from "./responsesSend.js";

/**
 * Create a response
 *
 * @deprecated Renamed to `responsesSend` now that the Responses API is GA. This
 * alias is kept for the `beta.responses` deprecation window and will be removed
 * on the sunset date (TBD). Import
 * `@openrouter/sdk/funcs/responsesSend.js` instead.
 */
export const betaResponsesSend = responsesSend;
