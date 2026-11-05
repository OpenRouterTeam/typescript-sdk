import { toStandardJsonSchema } from '@valibot/to-json-schema';
import { describe, expectTypeOf, it } from 'vitest';
import * as v from 'valibot';
import { z } from 'zod/v4';
import { tool } from '../../src/lib/tool.js';
import type {
  InferToolEvent,
  InferToolInput,
  InferToolOutput,
  ToolExecutionResult,
} from '../../src/lib/tool-types.js';

const regularZodTool = tool({
  name: 'regular_zod',
  inputSchema: z.object({ q: z.string() }),
  outputSchema: z.object({ length: z.number() }),
  execute: ({ q }) => ({ length: q.length }),
});

const valibotTool = tool({
  name: 'valibot_tool',
  inputSchema: v.object({ name: v.string(), count: v.number() }),
  inputJsonSchema: { type: 'object' },
  outputSchema: v.object({ message: v.string() }),
  execute: ({ name, count }) => ({ message: name.repeat(count) }),
});

const generatorTool = tool({
  name: 'generator_tool',
  inputSchema: v.object({ query: v.string() }),
  inputJsonSchema: { type: 'object' },
  eventSchema: v.object({ progress: v.number() }),
  outputSchema: v.object({ result: v.string() }),
  execute: async function* ({ query }) {
    yield { progress: 50 };
    return { result: query };
  },
});

describe('tool type inference', () => {
  it('infers Zod tool types', () => {
    expectTypeOf<InferToolInput<typeof regularZodTool>>().toEqualTypeOf<{ q: string }>();
    expectTypeOf<InferToolOutput<typeof regularZodTool>>().toEqualTypeOf<{ length: number }>();
    expectTypeOf<ToolExecutionResult<typeof regularZodTool>['result']>().toEqualTypeOf<{
      length: number;
    }>();
  });

  it('infers Standard Schema tool types', () => {
    expectTypeOf<InferToolInput<typeof valibotTool>>().toEqualTypeOf<{
      name: string;
      count: number;
    }>();
    expectTypeOf<InferToolOutput<typeof valibotTool>>().toEqualTypeOf<{ message: string }>();
    expectTypeOf<ToolExecutionResult<typeof valibotTool>['result']>().toEqualTypeOf<{
      message: string;
    }>();
  });

  it('infers generator tool event and output types', () => {
    expectTypeOf<InferToolEvent<typeof generatorTool>>().toEqualTypeOf<{ progress: number }>();
    expectTypeOf<InferToolOutput<typeof generatorTool>>().toEqualTypeOf<{ result: string }>();
  });

  it('keeps the Standard JSON Schema trait optional for inputJsonSchema', () => {
    tool({
      name: 'trait_no_explicit',
      inputSchema: toStandardJsonSchema(v.object({ q: v.string() })),
      execute: () => ({ ok: true }),
    });

    tool<{ sessionId?: string }>({
      name: 'shared_trait',
      inputSchema: toStandardJsonSchema(v.object({ q: v.string() })),
      execute: () => ({ ok: true }),
    });

    tool<{ sessionId?: string }>({
      name: 'shared_zod',
      inputSchema: z.object({ q: z.string() }),
      execute: () => ({ ok: true }),
    });
  });

  it('requires inputJsonSchema for plain Standard Schemas', () => {
    tool({
      name: 'plain_standard',
      // @ts-expect-error no JSON Schema trait and no explicit inputJsonSchema
      inputSchema: v.object({ q: v.string() }),
      execute: () => ({ ok: true }),
    });

    tool<{ sessionId?: string }>({
      name: 'shared_plain_standard',
      // @ts-expect-error no JSON Schema trait and no explicit inputJsonSchema
      inputSchema: v.object({ q: v.string() }),
      execute: () => ({ ok: true }),
    });
  });
});
