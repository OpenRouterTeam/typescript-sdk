import { TextDeltaEvent$inboundSchema } from '../../../src/models/textdeltaevent.ts';

const event = {
  type: 'response.output_text.delta',
  sequence_number: 1,
  item_id: 'message_1',
  output_index: 0,
  content_index: 0,
  delta: 'deterministic delta',
  logprobs: [],
};

export function run() {
  return TextDeltaEvent$inboundSchema.parse(event).type;
}
