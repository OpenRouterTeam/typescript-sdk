import { describe, it, expect } from 'vitest';
import { sanitizeJsonSchema, convertZodToJsonSchema } from '../../src/lib/tool-executor.js';
import { z } from 'zod/v4';
import { assertNoTildeKeys } from '../utils/schema-test-helpers.js';

describe('sanitizeJsonSchema', () => {
  it('should remove ~standard property from root level', () => {
    const input = {
      type: 'object',
      properties: { name: { type: 'string' } },
      '~standard': { version: 1, vendor: 'zod' },
    };

    const result = sanitizeJsonSchema(input);

    expect(result).not.toHaveProperty('~standard');
    expect(result).toHaveProperty('type', 'object');
    expect(result).toHaveProperty('properties');
  });

  it('should remove all ~ prefixed properties from nested objects', () => {
    const input = {
      type: 'object',
      '~metadata': { foo: 'bar' },
      properties: {
        user: {
          type: 'object',
          '~internal': true,
          properties: {
            name: { type: 'string', '~validator': 'custom' },
          },
        },
      },
    };

    const result = sanitizeJsonSchema(input);
    const typedResult = result as Record<string, unknown>;
    const properties = typedResult['properties'] as Record<string, unknown>;
    const user = properties['user'] as Record<string, unknown>;
    const userProperties = user['properties'] as Record<string, unknown>;
    const name = userProperties['name'] as Record<string, unknown>;

    expect(typedResult).not.toHaveProperty('~metadata');
    expect(user).not.toHaveProperty('~internal');
    expect(name).not.toHaveProperty('~validator');
    expect(name).toHaveProperty('type', 'string');
  });

  it('should handle arrays correctly', () => {
    const input = {
      type: 'array',
      '~arrayMeta': 'remove-me',
      items: [
        { type: 'string', '~itemMeta': 'also-remove' },
        { type: 'number' },
      ],
    };

    const result = sanitizeJsonSchema(input);
    const typedResult = result as Record<string, unknown>;
    const items = typedResult['items'] as Array<Record<string, unknown>>;

    expect(typedResult).not.toHaveProperty('~arrayMeta');
    expect(items[0]).not.toHaveProperty('~itemMeta');
    expect(items[0]).toHaveProperty('type', 'string');
    expect(items[1]).toHaveProperty('type', 'number');
  });

  it('should pass through primitive values unchanged', () => {
    expect(sanitizeJsonSchema(null)).toBe(null);
    expect(sanitizeJsonSchema(undefined)).toBe(undefined);
    expect(sanitizeJsonSchema(42)).toBe(42);
    expect(sanitizeJsonSchema('string')).toBe('string');
    expect(sanitizeJsonSchema(true)).toBe(true);
  });

  it('should handle empty objects', () => {
    expect(sanitizeJsonSchema({})).toEqual({});
  });

  it('should handle empty arrays', () => {
    expect(sanitizeJsonSchema([])).toEqual([]);
  });

  it('should preserve non-~ prefixed properties', () => {
    const input = {
      type: 'object',
      description: 'A user object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    };

    const result = sanitizeJsonSchema(input);

    expect(result).toEqual(input);
  });
});

describe('convertZodToJsonSchema', () => {
  it('should return sanitized JSON schema without ~ prefixed properties', () => {
    const schema = z.object({
      name: z.string().describe("The user's name"),
      age: z.number().min(0).describe("The user's age"),
    });

    const jsonSchema = convertZodToJsonSchema(schema);

    // Check that standard schema properties are present
    expect(jsonSchema).toHaveProperty('type', 'object');
    expect(jsonSchema).toHaveProperty('properties');

    // Check that no ~ prefixed keys exist anywhere in the schema
    assertNoTildeKeys(jsonSchema);
  });

  it('should preserve all valid JSON Schema properties', () => {
    const schema = z.object({
      location: z.string().describe('City and country'),
    });

    const jsonSchema = convertZodToJsonSchema(schema);
    const properties = jsonSchema['properties'] as Record<string, unknown>;
    const location = properties['location'] as Record<string, unknown>;

    expect(location).toHaveProperty('description', 'City and country');
    expect(location).toHaveProperty('type', 'string');
  });
});
