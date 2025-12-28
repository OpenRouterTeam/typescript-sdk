/**
 * Type compatibility tests for tool() function
 * Verifies all permutations of tool definitions work with plain 'zod' imports
 */
import { describe, it, expect } from 'vitest';
import { z } from 'zod'; // Plain zod import (what users typically use)
import { tool } from '../../src/lib/tool.js';

describe('Tool Type Compatibility with plain zod imports', () => {
  describe('Regular tools with execute function', () => {
    it('should accept simple inputSchema with execute function', () => {
      const simpleTool = tool({
        name: 'simple_tool',
        description: 'A simple tool',
        inputSchema: z.object({
          message: z.string(),
        }),
        execute: async (params) => {
          return `Received: ${params.message}`;
        },
      });

      expect(simpleTool.type).toBe('function');
      expect(simpleTool.function.name).toBe('simple_tool');
    });

    it('should accept complex nested inputSchema', () => {
      const complexTool = tool({
        name: 'complex_tool',
        inputSchema: z.object({
          user: z.object({
            name: z.string(),
            age: z.number(),
            email: z.string().email(),
          }),
          preferences: z.object({
            theme: z.enum(['light', 'dark']),
            notifications: z.boolean(),
          }),
          tags: z.array(z.string()),
        }),
        execute: async (params) => {
          return { processed: true, userName: params.user.name };
        },
      });

      expect(complexTool.function.name).toBe('complex_tool');
    });

    it('should accept tool with outputSchema', () => {
      const typedOutputTool = tool({
        name: 'typed_output_tool',
        inputSchema: z.object({
          query: z.string(),
        }),
        outputSchema: z.object({
          result: z.string(),
          count: z.number(),
        }),
        execute: async (params) => {
          return { result: params.query.toUpperCase(), count: params.query.length };
        },
      });

      expect(typedOutputTool.function.name).toBe('typed_output_tool');
    });

    it('should accept tool with sync execute function', () => {
      const syncTool = tool({
        name: 'sync_tool',
        inputSchema: z.object({
          value: z.number(),
        }),
        execute: (params) => {
          return params.value * 2;
        },
      });

      expect(syncTool.function.name).toBe('sync_tool');
    });

    it('should accept tool with optional fields in schema', () => {
      const optionalFieldsTool = tool({
        name: 'optional_fields_tool',
        inputSchema: z.object({
          required: z.string(),
          optional: z.string().optional(),
          nullable: z.string().nullable(),
          defaulted: z.string().default('default'),
        }),
        execute: async (params) => params.required,
      });

      expect(optionalFieldsTool.function.name).toBe('optional_fields_tool');
    });

    it('should accept tool with union types in schema', () => {
      const unionTool = tool({
        name: 'union_tool',
        inputSchema: z.object({
          value: z.union([z.string(), z.number()]),
          status: z.enum(['active', 'inactive', 'pending']),
        }),
        execute: async (params) => String(params.value),
      });

      expect(unionTool.function.name).toBe('union_tool');
    });

    it('should accept tool with array types', () => {
      const arrayTool = tool({
        name: 'array_tool',
        inputSchema: z.object({
          items: z.array(z.object({
            id: z.number(),
            name: z.string(),
          })),
          counts: z.array(z.number()),
        }),
        execute: async (params) => params.items.length,
      });

      expect(arrayTool.function.name).toBe('array_tool');
    });

    it('should accept tool with descriptions on schema fields', () => {
      const describedTool = tool({
        name: 'described_tool',
        description: 'A tool with field descriptions',
        inputSchema: z.object({
          location: z.string().describe('City and country e.g. Tokyo, Japan'),
          units: z.enum(['celsius', 'fahrenheit']).describe('Temperature units'),
        }),
        execute: async (params) => ({ temp: 22, location: params.location }),
      });

      expect(describedTool.function.name).toBe('described_tool');
    });
  });

  describe('Manual tools (execute: false)', () => {
    it('should accept manual tool with simple schema', () => {
      const manualTool = tool({
        name: 'manual_tool',
        description: 'A manual tool that requires external handling',
        inputSchema: z.object({
          action: z.string(),
          target: z.string(),
        }),
        execute: false,
      });

      expect(manualTool.type).toBe('function');
      expect(manualTool.function.name).toBe('manual_tool');
      expect('execute' in manualTool.function).toBe(false);
    });

    it('should accept manual tool with complex schema', () => {
      const complexManualTool = tool({
        name: 'complex_manual_tool',
        inputSchema: z.object({
          admin_access: z.boolean().describe('Whether to request admin access'),
          permissions: z.array(z.enum(['read', 'write', 'delete'])),
          metadata: z.object({
            reason: z.string(),
            timestamp: z.string(),
          }).optional(),
        }),
        execute: false,
      });

      expect(complexManualTool.function.name).toBe('complex_manual_tool');
    });
  });

  describe('Generator tools (with eventSchema)', () => {
    it('should accept generator tool with event and output schemas', () => {
      const generatorTool = tool({
        name: 'generator_tool',
        description: 'A tool that streams progress updates',
        inputSchema: z.object({
          task: z.string(),
        }),
        eventSchema: z.object({
          progress: z.number(),
          status: z.string(),
        }),
        outputSchema: z.object({
          result: z.string(),
          totalSteps: z.number(),
        }),
        execute: async function* (params) {
          yield { progress: 0, status: 'Starting...' };
          yield { progress: 50, status: 'Processing...' };
          yield { progress: 100, status: 'Done' };
          yield { result: `Completed: ${params.task}`, totalSteps: 3 };
        },
      });

      expect(generatorTool.type).toBe('function');
      expect(generatorTool.function.name).toBe('generator_tool');
      expect('eventSchema' in generatorTool.function).toBe(true);
    });

    it('should accept generator tool with complex event types', () => {
      const complexGeneratorTool = tool({
        name: 'complex_generator_tool',
        inputSchema: z.object({
          files: z.array(z.string()),
        }),
        eventSchema: z.object({
          type: z.enum(['progress', 'warning', 'info']),
          message: z.string(),
          data: z.record(z.unknown()).optional(),
        }),
        outputSchema: z.object({
          processedFiles: z.array(z.string()),
          errors: z.array(z.string()),
        }),
        execute: async function* (params) {
          for (const file of params.files) {
            yield { type: 'progress' as const, message: `Processing ${file}` };
          }
          yield { processedFiles: params.files, errors: [] };
        },
      });

      expect(complexGeneratorTool.function.name).toBe('complex_generator_tool');
    });
  });

  describe('Tools with nextTurnParams', () => {
    it('should accept tool with nextTurnParams functions', () => {
      const adaptiveTool = tool({
        name: 'adaptive_tool',
        inputSchema: z.object({
          complexity: z.enum(['low', 'medium', 'high']),
        }),
        nextTurnParams: {
          temperature: (params) => {
            switch (params.complexity) {
              case 'low': return 0.3;
              case 'medium': return 0.7;
              case 'high': return 1.0;
            }
          },
          maxOutputTokens: (params) => params.complexity === 'high' ? 4000 : 2000,
        },
        execute: async (params) => `Processed with ${params.complexity} complexity`,
      });

      expect(adaptiveTool.function.name).toBe('adaptive_tool');
      expect(adaptiveTool.function.nextTurnParams).toBeDefined();
    });

    it('should accept manual tool with nextTurnParams', () => {
      const manualWithParams = tool({
        name: 'manual_with_params',
        inputSchema: z.object({
          model_preference: z.string(),
        }),
        nextTurnParams: {
          model: (params) => params.model_preference,
        },
        execute: false,
      });

      expect(manualWithParams.function.name).toBe('manual_with_params');
      expect(manualWithParams.function.nextTurnParams).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty object schema', () => {
      const emptyInputTool = tool({
        name: 'empty_input_tool',
        inputSchema: z.object({}),
        execute: async () => 'No input needed',
      });

      expect(emptyInputTool.function.name).toBe('empty_input_tool');
    });

    it('should handle deeply nested schemas', () => {
      const deeplyNestedTool = tool({
        name: 'deeply_nested_tool',
        inputSchema: z.object({
          level1: z.object({
            level2: z.object({
              level3: z.object({
                level4: z.object({
                  value: z.string(),
                }),
              }),
            }),
          }),
        }),
        execute: async (params) => params.level1.level2.level3.level4.value,
      });

      expect(deeplyNestedTool.function.name).toBe('deeply_nested_tool');
    });

    it('should handle schema with all Zod primitive types', () => {
      const allPrimitivesTool = tool({
        name: 'all_primitives_tool',
        inputSchema: z.object({
          str: z.string(),
          num: z.number(),
          bool: z.boolean(),
          bigint: z.bigint(),
          date: z.date(),
          undef: z.undefined(),
          nullVal: z.null(),
          any: z.any(),
          unknown: z.unknown(),
        }),
        execute: async (params) => ({ received: true }),
      });

      expect(allPrimitivesTool.function.name).toBe('all_primitives_tool');
    });

    it('should handle schema with refinements', () => {
      const refinedTool = tool({
        name: 'refined_tool',
        inputSchema: z.object({
          email: z.string().email(),
          url: z.string().url(),
          uuid: z.string().uuid(),
          positiveNumber: z.number().positive(),
          integerOnly: z.number().int(),
          minMax: z.number().min(0).max(100),
          lengthConstrained: z.string().min(1).max(255),
        }),
        execute: async (params) => params.email,
      });

      expect(refinedTool.function.name).toBe('refined_tool');
    });
  });
});
