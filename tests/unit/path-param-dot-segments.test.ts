import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { pathToFunc } from '../../src/lib/url.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

describe('path parameters that are dot segments', () => {
  let server: Server;
  let client: OpenRouter;
  const seen: string[] = [];

  beforeAll(async () => {
    server = createServer((req, res) => {
      seen.push(req.url ?? '');
      res.writeHead(200, { 'content-type': 'application/octet-stream' });
      res.end('body');
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address() as AddressInfo;
    client = new OpenRouter({
      apiKey: 'test-key',
      serverURL: `http://127.0.0.1:${port}/api/v1`,
      retryConfig: { strategy: 'none' },
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    seen.length = 0;
  });

  it('sends a normal container file download to the container route', async () => {
    await client.containers.downloadContainerFileContent({
      containerId: 'ctr-1',
      fileId: 'cfile-1',
    });
    expect(seen).toEqual(['/api/v1/containers/ctr-1/files/cfile-1/content']);
  });

  it.each([
    ['..', 'file-1'],
    ['.', 'file-1'],
    ['ctr-1', '..'],
  ])(
    'rejects containerId=%j fileId=%j without sending a request',
    async (containerId, fileId) => {
      await expect(
        client.containers.downloadContainerFileContent({ containerId, fileId }),
      ).rejects.toThrow(/dot segment/);
      expect(seen).toEqual([]);
    },
  );

  it('rejects "." and ".." in pathToFunc', () => {
    const build = pathToFunc('/files/{id}/content');
    expect(() => build({ id: '..' })).toThrow(/dot segment/);
    expect(() => build({ id: '.' })).toThrow(/dot segment/);
  });

  it('still allows ids that only contain dots alongside other characters', () => {
    const build = pathToFunc('/files/{id}/content');
    expect(build({ id: '...' })).toBe('files/.../content');
    expect(build({ id: '.env' })).toBe('files/.env/content');
    expect(build({ id: 'a..b' })).toBe('files/a..b/content');
  });
});
