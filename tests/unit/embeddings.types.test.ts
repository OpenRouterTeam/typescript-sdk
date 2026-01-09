import { describe, expect, it } from 'vitest';
import type * as operations from '../../src/models/operations/index.js';

type IsNever<T> = [T] extends [never] ? true : false;
type Assert<T extends true> = T;
type IsAssignable<From, To> = [From] extends [To] ? true : false;

describe('embeddings types', () => {
  it('should not require handling string unions for the response body itself', () => {
    // Compile-time assertion: response should not be `... | string` anymore.
    type _responseIsNotString = Assert<
      IsNever<Extract<operations.CreateEmbeddingsResponse, string>>
    >;

    // Runtime noop (keeps vitest happy even though this test is primarily type-level).
    expect(true).toBe(true);
  });

  it('should reflect base64 support (embedding can be number[] or string)', () => {
    // Compile-time assertions: SDK should reflect core behavior (supports base64).
    type _embeddingAllowsString = Assert<
      IsAssignable<string, operations.CreateEmbeddingsData['embedding']>
    >;
    type _embeddingAllowsNumberArray = Assert<
      IsAssignable<Array<number>, operations.CreateEmbeddingsData['embedding']>
    >;

    expect(true).toBe(true);
  });
});


