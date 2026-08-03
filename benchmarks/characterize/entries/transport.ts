import { ClientSDK } from '../../../src/lib/sdks.ts';

export async function run({ sample }: { sample: () => void }) {
  const client = new ClientSDK({
    serverURL: 'https://benchmark.invalid/api/v1',
  });
  const context = {};
  let lastRequest: Request | undefined;

  for (let iteration = 0; iteration < 2_000; iteration++) {
    const result = client._createRequest(
      context,
      {
        body: JSON.stringify({
          iteration,
          prompt: 'deterministic benchmark',
        }),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        path: 'chat/completions',
        security: {
          basic: {
            password: 'password',
            username: 'benchmark',
          },
          cookies: {
            session: 'session-id',
          },
          headers: {
            'x-api-key': 'benchmark-key',
          },
          oauth2: {
            type: 'none',
          },
          queryParams: {
            source: 'characterization',
          },
        },
      },
      {
        headers: {
          'x-request-id': `request-${iteration}`,
        },
      },
    );
    if (!result.ok) {
      throw result.error;
    }
    lastRequest = result.value;
    if (iteration % 50 === 0) {
      sample();
    }
  }

  if (!lastRequest) {
    throw new Error('transport scenario produced no request');
  }
  return {
    authorization: lastRequest.headers.get('authorization'),
    body: await lastRequest.text(),
    cookie: lastRequest.headers.get('cookie'),
    url: lastRequest.url,
  };
}
