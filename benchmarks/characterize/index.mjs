import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

import { build, version as esbuildVersion } from 'esbuild';

const execFileAsync = promisify(execFile);
const benchmarkDirectory = fileURLToPath(new URL('.', import.meta.url));
const runnerPath = join(benchmarkDirectory, 'runner.mjs');
const cases = [
  [
    'root-import',
    'entries/root-import.ts',
  ],
  [
    'transport',
    'entries/transport.ts',
  ],
  [
    'validation',
    'entries/validation.ts',
  ],
  [
    'sse-fragmentation',
    'entries/sse-fragmentation.ts',
  ],
];

function parseRuns(args) {
  const argument = args.find((value) => value.startsWith('--runs='));
  const value = Number(argument?.slice('--runs='.length) ?? process.env.BENCHMARK_RUNS ?? 5);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`--runs must be a positive integer, received ${value}`);
  }
  return value;
}

function median(values) {
  const sorted = [
    ...values,
  ].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[middle];
  }
  return Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function formatBytes(value) {
  const sign = value < 0 ? '-' : '';
  const absolute = Math.abs(value);
  if (absolute < 1024) {
    return `${value} B`;
  }
  return `${sign}${(absolute / 1024).toFixed(1)} KiB`;
}

function summarizeMemory(samples) {
  const fields = [
    'afterImportHeapBytes',
    'afterImportRssBytes',
    'importHeapDeltaBytes',
    'importRssDeltaBytes',
    'scenarioPeakHeapDeltaBytes',
    'scenarioRetainedHeapDeltaBytes',
  ];
  return Object.fromEntries(
    fields.map((field) => [
      field,
      median(samples.map((sample) => sample[field])),
    ]),
  );
}

async function buildBundle(name, relativeEntry, outputDirectory) {
  const result = await build({
    absWorkingDir: benchmarkDirectory,
    bundle: true,
    entryPoints: [
      relativeEntry,
    ],
    format: 'esm',
    legalComments: 'none',
    minify: true,
    outfile: join(outputDirectory, `${name}.mjs`),
    packages: 'bundle',
    platform: 'node',
    sourcemap: false,
    target: 'node22',
    treeShaking: true,
    write: false,
  });
  const output = result.outputFiles?.find((file) => basename(file.path) === `${name}.mjs`);
  if (!output) {
    throw new Error(`esbuild did not produce ${name}.mjs`);
  }

  const artifactPath = join(outputDirectory, `${name}.mjs`);
  await writeFile(artifactPath, output.contents);
  return {
    artifactPath,
    sizes: {
      rawBytes: output.contents.byteLength,
      gzipBytes: gzipSync(output.contents, {
        level: 9,
      }).byteLength,
      brotliBytes: brotliCompressSync(output.contents, {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11,
        },
      }).byteLength,
    },
  };
}

async function measureBundle(artifactPath, runs) {
  const samples = [];
  for (let run = 0; run < runs; run++) {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        '--expose-gc',
        runnerPath,
        artifactPath,
      ],
      {
        maxBuffer: 1024 * 1024,
      },
    );
    samples.push(JSON.parse(stdout));
  }

  const results = new Set(samples.map((sample) => JSON.stringify(sample.result)));
  if (results.size !== 1) {
    throw new Error(`scenario output changed between fresh processes for ${artifactPath}`);
  }

  return {
    memory: summarizeMemory(samples),
    result: samples[0].result,
  };
}

async function main() {
  const runs = parseRuns(process.argv.slice(2));
  const outputDirectory = await mkdtemp(join(tmpdir(), 'openrouter-sdk-characterize-'));
  const measurements = [];

  try {
    for (const [name, relativeEntry] of cases) {
      const bundle = await buildBundle(name, relativeEntry, outputDirectory);
      const runtime = await measureBundle(bundle.artifactPath, runs);
      measurements.push({
        name,
        bundle: bundle.sizes,
        ...runtime,
      });
    }
  } finally {
    await rm(outputDirectory, {
      force: true,
      recursive: true,
    });
  }

  const report = {
    metadata: {
      architecture: process.arch,
      bundle: {
        format: 'esm',
        minify: true,
        packages: 'bundle',
        platform: 'node',
        target: 'node22',
        treeShaking: true,
      },
      esbuild: esbuildVersion,
      node: process.version,
      platform: process.platform,
      runs,
    },
    measurements,
  };

  if (process.argv.includes('--json')) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  console.log(
    `Node ${report.metadata.node}; esbuild ${esbuildVersion}; ${runs} fresh processes per case`,
  );
  console.log('All bundles: minified, treeShaking=true, dependencies bundled');
  console.table(
    measurements.map((measurement) => ({
      case: measurement.name,
      raw: formatBytes(measurement.bundle.rawBytes),
      gzip: formatBytes(measurement.bundle.gzipBytes),
      brotli: formatBytes(measurement.bundle.brotliBytes),
      'import heap': formatBytes(measurement.memory.importHeapDeltaBytes),
      'import RSS': formatBytes(measurement.memory.importRssDeltaBytes),
      'scenario peak': formatBytes(measurement.memory.scenarioPeakHeapDeltaBytes),
      'scenario retained': formatBytes(measurement.memory.scenarioRetainedHeapDeltaBytes),
    })),
  );
  console.log(JSON.stringify(report, null, 2));
}

await main();
