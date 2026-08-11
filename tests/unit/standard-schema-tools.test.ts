import type { StandardSchemaV1 } from '@standard-schema/spec';
import { toJsonSchema, toStandardJsonSchema } from '@valibot/to-json-schema';
import { describe, expect, expectTypeOf, it } from 'vitest';
import * as v from 'valibot';
import { z } from 'zod/v4';
import {
  StandardSchemaError,
  convertToolsToAPIFormat,
  executeGeneratorTool,
  executeRegularTool,
  formatToolExecutionError,
  validateToolInput,
  validateToolOutput,
} from '../../src/lib/tool-executor.js';
import { tool } from '../../src/lib/tool.js';
import type { InferToolEvent, InferToolInput, InferToolOutput } from '../../src/lib/tool-types.js';
import { assertNoTildeKeys } from '../utils/schema-test-helpers.js';

const inputSchema = v.object({
  name: v.string(),
  count: v.number(),
});
const outputSchema = v.object({ message: v.string() });
const inputJsonSchema = toJsonSchema(inputSchema) as Record<string, unknown>;

const valibotTool = tool({
  name: 'valibot_tool' as const,
  inputSchema,
  inputJsonSchema,
  outputSchema,
  execute: ({ name, count }) => ({ message: name.repeat(count) }),
});

describe('Standard Schema tools', () => {
  it('infers Standard Schema input and output types', () => {
    expectTypeOf<InferToolInput<typeof valibotTool>>().toEqualTypeOf<{
      name: string;
      count: number;
    }>();
    expectTypeOf(valibotTool.function.name).toEqualTypeOf<'valibot_tool'>();
    expectTypeOf<InferToolOutput<typeof valibotTool>>().toEqualTypeOf<{
      message: string;
    }>();
    expectTypeOf(valibotTool.function.execute).parameter(0).toEqualTypeOf<{
      name: string;
      count: number;
    }>();
  });

  it('keeps the Zod path working without an explicit JSON Schema', async () => {
    const zodTool = tool({
      name: 'zod_tool',
      inputSchema: z.object({ value: z.string() }),
      outputSchema: z.object({ length: z.number() }),
      execute: ({ value }) => ({ length: value.length }),
    });

    expect(convertToolsToAPIFormat([zodTool])[0]?.parameters).toMatchObject({
      type: 'object',
      required: ['value'],
    });
    expect(validateToolInput(zodTool.function.inputSchema, { value: 'test' })).toEqual({
      value: 'test',
    });
    expect(validateToolOutput(zodTool.function.outputSchema, { length: 4 })).toEqual({
      length: 4,
    });

    const result = await executeRegularTool(
      zodTool,
      { id: 'zod-call', name: 'zod_tool', arguments: { value: 'test' } },
      { numberOfTurns: 1 },
    );
    expect(result).toMatchObject({ result: { length: 4 } });
    expect(result.error).toBeUndefined();
  });

  it('validates input and output through Valibot', async () => {
    const result = await executeRegularTool(
      valibotTool,
      { id: 'valid-call', name: 'valibot_tool', arguments: { name: 'hi', count: 2 } },
      { numberOfTurns: 1 },
    );

    expect(result).toMatchObject({ result: { message: 'hihi' } });
    expect(result.error).toBeUndefined();

    const invalidInput = await executeRegularTool(
      valibotTool,
      { id: 'invalid-input', name: 'valibot_tool', arguments: { name: 'hi', count: 'two' } },
      { numberOfTurns: 1 },
    );
    expect(invalidInput.error).toBeInstanceOf(StandardSchemaError);

    const invalidOutputTool = tool({
      name: 'invalid_output',
      inputSchema: v.object({}),
      inputJsonSchema: toJsonSchema(v.object({})) as Record<string, unknown>,
      outputSchema,
      execute: () => ({ message: 42 } as never),
    });
    const invalidOutput = await executeRegularTool(
      invalidOutputTool,
      { id: 'invalid-output', name: 'invalid_output', arguments: {} },
      { numberOfTurns: 1 },
    );
    expect(invalidOutput.error).toBeInstanceOf(StandardSchemaError);
  });

  it('uses the Standard JSON Schema trait without inputJsonSchema', () => {
    const schema = toStandardJsonSchema(v.object({ query: v.string() }));
    const apiTool = convertToolsToAPIFormat([
      tool({
        name: 'standard_json_schema',
        inputSchema: schema,
        execute: false,
      }),
    ])[0];

    expect(apiTool?.parameters).toMatchObject({
      type: 'object',
      required: ['query'],
    });
    assertNoTildeKeys(apiTool?.parameters);
  });

  it('uses and sanitizes the explicit JSON Schema for providers', () => {
    const apiTool = convertToolsToAPIFormat([
      tool({
        name: 'manual_standard_schema',
        inputSchema,
        inputJsonSchema: {
          ...inputJsonSchema,
          '~standard': { vendor: 'test' },
          properties: {
            ...(inputJsonSchema['properties'] as Record<string, unknown>),
            hidden: { type: 'string', '~metadata': true },
          },
        },
        execute: false,
      }),
    ])[0];

    expect(apiTool?.parameters).toMatchObject({ type: 'object' });
    assertNoTildeKeys(apiTool?.parameters);
  });

  it('uses inputJsonSchema when the Standard JSON Schema converter throws', () => {
    const throwingSchema = {
      '~standard': {
        version: 1 as const,
        vendor: 'throwing-test',
        validate: (value: unknown) => ({ value }),
        jsonSchema: {
          input: () => {
            throw new Error('Cannot convert');
          },
          output: () => {
            throw new Error('Cannot convert');
          },
        },
      },
    };

    const apiTool = convertToolsToAPIFormat([
      tool({
        name: 'throwing_converter',
        inputSchema: throwingSchema,
        inputJsonSchema: { type: 'string', description: 'fallback' },
        execute: false,
      }),
    ])[0];

    expect(apiTool?.parameters).toEqual({ type: 'string', description: 'fallback' });
  });

  it('prefers inputJsonSchema over the Standard JSON Schema trait', () => {
    const schema = toStandardJsonSchema(v.object({ query: v.string() }));
    const apiTool = convertToolsToAPIFormat([
      tool({
        name: 'explicit_override',
        inputSchema: schema,
        inputJsonSchema: { type: 'integer', description: 'override' },
        execute: false,
      }),
    ])[0];

    expect(apiTool?.parameters).toEqual({ type: 'integer', description: 'override' });
  });

  it('requires Standard JSON Schema or explicit JSON Schema at runtime', () => {
    const manuallyConstructedTool = {
      type: 'function' as const,
      function: {
        name: 'missing_json_schema',
        inputSchema,
      },
    };

    expect(() => convertToolsToAPIFormat([manuallyConstructedTool])).toThrow(
      'must implement StandardJSONSchemaV1 or provide inputJsonSchema',
    );
  });

  it('awaits asynchronous Standard Schema validators and maps their issues', async () => {
    const asyncSchema: StandardSchemaV1<string> = {
      '~standard': {
        version: 1,
        vendor: 'async-test',
        validate: async (value) => {
          await Promise.resolve();
          return value === 'valid'
            ? { value }
            : { issues: [{ message: 'Expected valid', path: [{ key: 'value' }] }] };
        },
      },
    };

    await expect(validateToolInput(asyncSchema, 'valid')).resolves.toBe('valid');
    const error = await validateToolInput(asyncSchema, 'invalid').catch((caught) => caught);
    expect(error).toBeInstanceOf(StandardSchemaError);
    expect((error as StandardSchemaError).issues).toEqual([
      { message: 'Expected valid', path: ['value'] },
    ]);
    expect((error as Error).message).toBe(
      '[{"message":"Expected valid","path":["value"]}]',
    );
    expect(formatToolExecutionError(error as Error, {
      id: 'async-call',
      name: 'async_tool',
      arguments: 'invalid',
    })).toContain('"path": "value"');
  });

  it('rejects validators that do not declare Standard Schema v1', async () => {
    const invalidVersionSchema = {
      '~standard': {
        version: 2,
        vendor: 'future-test',
        validate: (value: unknown) => ({ value }),
      },
    } as unknown as StandardSchemaV1;

    expect(() => validateToolInput(invalidVersionSchema, 'value')).toThrow(
      'Invalid tool schema provided',
    );
  });

  it('validates generator events and output with Standard Schema', async () => {
    const eventSchema = v.object({ progress: v.number() });
    const finalSchema = v.object({ result: v.string() });
    const generatorTool = tool({
      name: 'standard_generator',
      inputSchema: v.object({ query: v.string() }),
      inputJsonSchema: toJsonSchema(v.object({ query: v.string() })) as Record<string, unknown>,
      eventSchema,
      outputSchema: finalSchema,
      execute: async function* ({ query }) {
        yield { progress: 50 };
        yield { result: query };
      },
    });

    expectTypeOf<InferToolEvent<typeof generatorTool>>().toEqualTypeOf<{ progress: number }>();

    const result = await executeGeneratorTool(
      generatorTool,
      { id: 'generator-call', name: 'standard_generator', arguments: { query: 'done' } },
      { numberOfTurns: 1 },
    );
    expect(result.result).toEqual({ result: 'done' });
    expect(result.preliminaryResults).toEqual([{ progress: 50 }]);
    expect(result.error).toBeUndefined();
  });
});
