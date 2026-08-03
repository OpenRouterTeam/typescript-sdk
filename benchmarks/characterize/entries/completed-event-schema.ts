import { StreamEventsResponseCompleted$inboundSchema } from '../../../src/models/streameventsresponsecompleted.ts';

export function run() {
  return {
    schema: StreamEventsResponseCompleted$inboundSchema.constructor.name,
  };
}
