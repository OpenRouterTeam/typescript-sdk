import { pathToFileURL } from 'node:url';

const artifactPath = process.argv[2];
if (!artifactPath) {
  throw new Error('expected a bundle path');
}
if (typeof global.gc !== 'function') {
  throw new Error('runner requires node --expose-gc');
}

async function collectGarbage() {
  for (let iteration = 0; iteration < 3; iteration++) {
    global.gc();
    await new Promise((resolve) => setImmediate(resolve));
  }
}

function snapshot() {
  const memory = process.memoryUsage();
  return {
    heapUsed: memory.heapUsed,
    rss: memory.rss,
  };
}

await collectGarbage();
const beforeImport = snapshot();
const scenario = await import(pathToFileURL(artifactPath).href);
await collectGarbage();
const afterImport = snapshot();
let peak = afterImport;

function sample() {
  const current = snapshot();
  peak = {
    heapUsed: Math.max(peak.heapUsed, current.heapUsed),
    rss: Math.max(peak.rss, current.rss),
  };
}

if (typeof scenario.run !== 'function') {
  throw new Error(`${artifactPath} must export a run function`);
}
const result = await scenario.run({
  sample,
});
sample();
await collectGarbage();
const afterScenario = snapshot();

process.stdout.write(
  `${JSON.stringify({
    afterImportHeapBytes: afterImport.heapUsed,
    afterImportRssBytes: afterImport.rss,
    importHeapDeltaBytes: afterImport.heapUsed - beforeImport.heapUsed,
    importRssDeltaBytes: afterImport.rss - beforeImport.rss,
    result,
    scenarioPeakHeapDeltaBytes: peak.heapUsed - afterImport.heapUsed,
    scenarioRetainedHeapDeltaBytes: afterScenario.heapUsed - afterImport.heapUsed,
  })}\n`,
);
