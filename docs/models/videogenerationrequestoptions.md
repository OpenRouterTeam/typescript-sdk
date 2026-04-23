# VideoGenerationRequestOptions

Provider-specific options keyed by provider slug. The options for the matched provider are spread into the upstream request body.

## Example Usage

```typescript
import { VideoGenerationRequestOptions } from "@openrouter/sdk/models";

let value: VideoGenerationRequestOptions = {};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `oneai`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `ai21`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `aionLabs`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `akashml`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `alibaba`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `amazonBedrock`       | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `amazonNova`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `ambient`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `anthropic`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `anyscale`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `arceeAi`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `atlasCloud`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `atoma`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `avian`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `azure`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `baidu`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `baseten`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `blackForestLabs`     | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `byteplus`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `centml`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `cerebras`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `chutes`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `cirrascale`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `clarifai`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `cloudflare`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `cohere`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `crofai`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `crusoe`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `deepinfra`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `deepseek`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `dekallm`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `enfer`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `fakeProvider`        | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `featherless`         | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `fireworks`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `friendli`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `gmicloud`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `googleAiStudio`      | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `googleVertex`        | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `gopomelo`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `groq`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `huggingface`         | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `hyperbolic`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `hyperbolicQuantized` | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `inception`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `inceptron`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `inferenceNet`        | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `infermatic`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `inflection`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `inocloud`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `ioNet`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `ionstream`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `klusterai`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `lambda`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `lepton`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `liquid`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `lynn`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `lynnPrivate`         | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `mancer`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `mancerOld`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `mara`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `meta`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `minimax`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `mistral`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `modal`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `modelrun`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `modular`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `moonshotai`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `morph`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `ncompass`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `nebius`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `nextbit`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `nineteen`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `novita`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `nvidia`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `octoai`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `openInference`       | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `openai`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `parasail`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `perplexity`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `phala`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `recraft`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `recursal`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `reflection`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `reka`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `relace`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `replicate`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `sambanova`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `sambanovaCloaked`    | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `seed`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `sfCompute`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `siliconflow`         | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `sourceful`           | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `stealth`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `stepfun`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `streamlake`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `switchpoint`         | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `targon`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `together`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `togetherLite`        | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `ubicloud`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `upstage`             | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `venice`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `wandb`               | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `xai`                 | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `xiaomi`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `zAi`                 | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |