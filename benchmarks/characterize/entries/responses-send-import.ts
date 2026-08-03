import { responsesSend } from '../../../src/funcs/responsesSend.ts';

export function run() {
  return {
    responsesSend: typeof responsesSend,
  };
}
