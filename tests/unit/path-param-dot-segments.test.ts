import { readdirSync, readFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { fileURLToPath } from 'node:url';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';
import { type Params, pathToFunc } from '../../src/lib/url.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

// A path parameter of exactly "." or ".." used to be resolved as a dot segment
// by `new URL(path, baseURL)`, which sent the request to a different route.
// src/lib/url.ts is hand-maintained (see .genignore) to reject those values.

describe('path parameters that are dot segments', () => {
  let server: Server;
  let client: OpenRouter;
  const seen: string[] = [];

  beforeAll(async () => {
    server = createServer((req, res) => {
      seen.push(`${req.method} ${req.url}`);
      res.writeHead(200, { 'content-type': 'application/octet-stream' });
      res.end('body');
    });
    await new Promise<void>((resolve) =>
      server.listen(0, '127.0.0.1', resolve),
    );
    const address = server.address();
    if (address === null || typeof address === 'string') {
      throw new Error('mock server has no port');
    }
    client = new OpenRouter({
      apiKey: 'test-key',
      serverURL: `http://127.0.0.1:${address.port}/api/v1`,
      retryConfig: { strategy: 'none' },
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    seen.length = 0;
  });

  describe('containers.downloadContainerFileContent (two path parameters)', () => {
    it('sends a normal download to the container route', async () => {
      await client.containers.downloadContainerFileContent({
        containerId: 'ctr-1',
        fileId: 'cfile-1',
      });
      expect(seen).toEqual([
        'GET /api/v1/containers/ctr-1/files/cfile-1/content',
      ]);
    });

    it.each([
      ['..', 'file-1', 'container_id'],
      ['.', 'file-1', 'container_id'],
      ['ctr-1', '..', 'file_id'],
      ['ctr-1', '.', 'file_id'],
    ])(
      'rejects containerId=%j fileId=%j without sending a request',
      async (containerId, fileId, parameter) => {
        const call = client.containers.downloadContainerFileContent({
          containerId,
          fileId,
        });
        await expect(call).rejects.toThrow(
          `Parameter '${parameter}' cannot be the dot segment`,
        );
        await expect(call).rejects.toBeInstanceOf(Error);
        expect(seen).toEqual([]);
      },
    );

    it.each([
      ['...', '/api/v1/containers/.../files/f/content'],
      ['.env', '/api/v1/containers/.env/files/f/content'],
      ['a..b', '/api/v1/containers/a..b/files/f/content'],
      ['%2e%2e', '/api/v1/containers/%252e%252e/files/f/content'],
      ['../x', '/api/v1/containers/..%2Fx/files/f/content'],
    ])('still sends containerId=%j to the container route', async (containerId, url) => {
      await client.containers.downloadContainerFileContent({
        containerId,
        fileId: 'f',
      });
      expect(seen).toEqual([`GET ${url}`]);
    });
  });

  describe('batch.getBatches (trailing path parameter)', () => {
    it('sends a normal id to the batch route', async () => {
      // The mock body is not a batch, so only the route is checked.
      await client.batch.getBatches({ id: 'batch_1' }).catch(() => undefined);
      expect(seen).toEqual(['GET /api/v1/batches/batch_1']);
    });

    it.each(['..', '.'])(
      'rejects id=%j without sending a request',
      async (id) => {
        await expect(client.batch.getBatches({ id })).rejects.toThrow(
          `Parameter 'id' cannot be the dot segment '${id}'`,
        );
        expect(seen).toEqual([]);
      },
    );
  });

  describe('presets.restore (POST, parameter in the middle)', () => {
    it('sends a normal slug to the restore route', async () => {
      await client.presets.restore({ slug: 'my-preset' }).catch(() => undefined);
      expect(seen).toEqual(['POST /api/v1/presets/my-preset/restore']);
    });

    it.each(['..', '.'])(
      'rejects slug=%j without sending a request',
      async (slug) => {
        await expect(client.presets.restore({ slug })).rejects.toThrow(
          `Parameter 'slug' cannot be the dot segment '${slug}'`,
        );
        expect(seen).toEqual([]);
      },
    );
  });
});

describe('pathToFunc', () => {
  const build = pathToFunc('/files/{id}/content');

  it('rejects "." and ".." and names the parameter', () => {
    expect(() => build({ id: '..' })).toThrow(
      "Parameter 'id' cannot be the dot segment '..'",
    );
    expect(() => build({ id: '.' })).toThrow(
      "Parameter 'id' cannot be the dot segment '.'",
    );
  });

  it('rejects them with percent encoding too', () => {
    const encode = pathToFunc('/files/{id}', { charEncoding: 'percent' });
    expect(() => encode({ id: '..' })).toThrow(/dot segment/);
    expect(encode({ id: 'a/b' })).toBe('files/a%2Fb');
    expect(encode({ id: '%2e%2e' })).toBe('files/%252e%252e');
  });

  it('allows values that only contain dots alongside other characters', () => {
    expect(build({ id: '...' })).toBe('files/.../content');
    expect(build({ id: '.env' })).toBe('files/.env/content');
    expect(build({ id: 'a..b' })).toBe('files/a..b/content');
    expect(build({ id: '%2e%2e' })).toBe('files/%2e%2e/content');
  });

  it('accepts numeric parameters', () => {
    expect(build({ id: 42 })).toBe('files/42/content');
    expect(build({ id: 0 })).toBe('files/0/content');
    expect(build({ id: 0.5 })).toBe('files/0.5/content');
  });

  it('does not reject a dot that is only part of a segment', () => {
    expect(pathToFunc('/files/{id}.json')({ id: '.' })).toBe('files/..json');
    expect(pathToFunc('/v{major}/x')({ major: '.' })).toBe('v./x');
  });

  it('rejects a dot segment assembled from several parameters', () => {
    expect(() => pathToFunc('/x/{a}{b}/y')({ a: '.', b: '.' })).toThrow(
      "Path '/x/{a}{b}/y' cannot contain a '.' or '..' segment",
    );
    expect(() => pathToFunc('/x/{a}')({ a: 'y/../z' })).toThrow(
      /cannot contain a '.' or '..' segment/,
    );
  });

  it('keeps the existing errors for missing and non-string parameters', () => {
    expect(() => build({})).toThrow("Parameter 'id' is required");
    expect(() => build()).toThrow("Parameter 'id' is required");
    // Reflect.apply passes values the Params type does not allow.
    expect(() => Reflect.apply(build, undefined, [{ id: null }])).toThrow(
      "Parameter 'id' must be a string or number",
    );
    expect(() => Reflect.apply(build, undefined, [{ id: ['..'] }])).toThrow(
      "Parameter 'id' must be a string or number",
    );
  });

  it('builds paths without parameters and strips leading slashes', () => {
    expect(pathToFunc('/private-endpoints')()).toBe('private-endpoints');
    expect(pathToFunc('//a/{b}')({ b: 'c' })).toBe('a/c');
  });
});

// src/lib/url.ts is in .genignore, so generator updates to it no longer
// arrive. These checks fail if generated code starts to use it differently,
// which is the signal to compare it with the generator's current version.
describe('generator contract for src/lib/url.ts', () => {
  const funcsDir = fileURLToPath(new URL('../../src/funcs/', import.meta.url));
  const sources = readdirSync(funcsDir)
    .filter((name) => name.endsWith('.ts'))
    .map((name) => ({
      name,
      text: readFileSync(`${funcsDir}${name}`, 'utf8'),
    }));
  const operations = sources.filter(({ text }) =>
    text.includes('client._createRequest('),
  );

  it('has the signature generated code relies on', () => {
    expectTypeOf(pathToFunc).toEqualTypeOf<
      (
        pathPattern: string,
        options?: { charEncoding?: 'percent' | 'none' },
      ) => (params?: Params) => string
    >();
    expectTypeOf<Params>().toEqualTypeOf<
      Partial<Record<string, string | number>>
    >();
  });

  it('is the only thing generated operations import from lib/url', () => {
    expect(operations.length).toBeGreaterThan(100);
    for (const { name, text } of sources) {
      const imports = text.match(/import .*"\.\.\/lib\/url\.js";/g) ?? [];
      for (const line of imports) {
        expect(line, name).toBe('import { pathToFunc } from "../lib/url.js";');
      }
    }
  });

  it('builds every operation path with pathToFunc(<literal>)(...)', () => {
    for (const { name, text } of operations) {
      const calls = text.match(/pathToFunc\(/g) ?? [];
      const paths =
        text.match(/const path = pathToFunc\(\s*"[^"]+",?\s*\)\(/g) ?? [];
      // Operations with their own server list also expand that URL template.
      const serverURLs =
        text.match(
          /pathToFunc\(\w+ServerList\[0\], \{\s*charEncoding: "percent",\s*\}\)\(/g,
        ) ?? [];
      expect(paths.length, name).toBe(1);
      expect(calls.length, name).toBe(paths.length + serverURLs.length);
      expect(text, name).toMatch(/\n    path: path,\n/);
    }
  });

  it('is kept out of generation by .genignore', () => {
    const genignore = readFileSync(
      new URL('../../.genignore', import.meta.url),
      'utf8',
    );
    expect(genignore.split('\n')).toContain('src/lib/url.ts');
  });
});
