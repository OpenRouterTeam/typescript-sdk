import dotenv from 'dotenv';

dotenv.config();

/**
 * Example usage of the @openrouter/sdk SDK for embeddings
 *
 * To run this example from the examples directory with Bun:
 * bun run embeddings.example.ts
 */

import { OpenRouter } from '@openrouter/sdk';

if (!process.env['OPENROUTER_API_KEY']) {
  throw new Error('Missing OPENROUTER_API_KEY environment variable');
}

const openRouter = new OpenRouter({
  apiKey: process.env['OPENROUTER_API_KEY'] ?? '',
});

/**
 * Basic embedding generation with a single text input
 */
async function singleTextEmbedding() {
  console.log('=== Single Text Embedding ===\n');

  const response = await openRouter.embeddings.generate({
    input: 'The quick brown fox jumps over the lazy dog',
    model: 'openai/text-embedding-3-small',
  });

  if (typeof response === 'object' && 'data' in response) {
    console.log(`Model: ${response.model}`);
    console.log(`Number of embeddings: ${response.data.length}`);

    const embedding = response.data[0];
    if (embedding && Array.isArray(embedding.embedding)) {
      console.log(`Embedding dimensions: ${embedding.embedding.length}`);
      console.log(`First 5 values: [${embedding.embedding.slice(0, 5).join(', ')}...]`);
    }

    if (response.usage) {
      console.log(`Tokens used: ${response.usage.totalTokens}`);
    }
  }

  console.log('');
}

/**
 * Batch embedding generation with multiple text inputs
 */
async function batchEmbeddings() {
  console.log('=== Batch Embeddings ===\n');

  const texts = [
    'Machine learning is a subset of artificial intelligence.',
    'Natural language processing helps computers understand text.',
    'Embeddings represent text as numerical vectors.',
  ];

  const response = await openRouter.embeddings.generate({
    input: texts,
    model: 'openai/text-embedding-3-small',
  });

  if (typeof response === 'object' && 'data' in response) {
    console.log(`Generated ${response.data.length} embeddings for ${texts.length} texts`);

    response.data.forEach((item, index) => {
      if (item && Array.isArray(item.embedding)) {
        console.log(`  Text ${index + 1}: ${item.embedding.length} dimensions`);
      }
    });

    if (response.usage) {
      console.log(`Total tokens used: ${response.usage.totalTokens}`);
    }
  }

  console.log('');
}

/**
 * Generate embeddings with custom dimensions (if supported by the model)
 */
async function customDimensionsEmbedding() {
  console.log('=== Custom Dimensions Embedding ===\n');

  const response = await openRouter.embeddings.generate({
    input: 'This text will be embedded with reduced dimensions.',
    model: 'openai/text-embedding-3-small',
    dimensions: 256, // Request smaller embedding size
  });

  if (typeof response === 'object' && 'data' in response) {
    const embedding = response.data[0];
    if (embedding && Array.isArray(embedding.embedding)) {
      console.log(`Requested dimensions: 256`);
      console.log(`Actual dimensions: ${embedding.embedding.length}`);
    }
  }

  console.log('');
}

/**
 * List available embedding models
 */
async function listEmbeddingModels() {
  console.log('=== Available Embedding Models ===\n');

  const response = await openRouter.embeddings.listModels();

  if (response.data) {
    console.log(`Found ${response.data.length} embedding models:\n`);

    // Show first 5 models
    response.data.slice(0, 5).forEach((model) => {
      console.log(`  - ${model.id}`);
      if (model.pricing) {
        console.log(`    Pricing: $${model.pricing.prompt}/1M prompt tokens`);
      }
    });

    if (response.data.length > 5) {
      console.log(`  ... and ${response.data.length - 5} more`);
    }
  }

  console.log('');
}

/**
 * Calculate cosine similarity between two embeddings
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Vectors must have same length');

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Demonstrate semantic similarity using embeddings
 */
async function semanticSimilarity() {
  console.log('=== Semantic Similarity ===\n');

  const texts = [
    'The cat sat on the mat.',
    'A feline rested on the rug.',
    'The stock market crashed today.',
  ];

  const response = await openRouter.embeddings.generate({
    input: texts,
    model: 'openai/text-embedding-3-small',
  });

  if (typeof response === 'object' && 'data' in response) {
    const embeddings = response.data
      .map((item) => (Array.isArray(item?.embedding) ? item.embedding : null))
      .filter((e): e is number[] => e !== null);

    if (embeddings.length === 3) {
      const sim01 = cosineSimilarity(embeddings[0], embeddings[1]);
      const sim02 = cosineSimilarity(embeddings[0], embeddings[2]);
      const sim12 = cosineSimilarity(embeddings[1], embeddings[2]);

      console.log('Comparing semantic similarity:\n');
      console.log(`  "${texts[0]}"`);
      console.log(`  "${texts[1]}"`);
      console.log(`  Similarity: ${(sim01 * 100).toFixed(2)}%\n`);

      console.log(`  "${texts[0]}"`);
      console.log(`  "${texts[2]}"`);
      console.log(`  Similarity: ${(sim02 * 100).toFixed(2)}%\n`);

      console.log(`  "${texts[1]}"`);
      console.log(`  "${texts[2]}"`);
      console.log(`  Similarity: ${(sim12 * 100).toFixed(2)}%\n`);

      console.log('Note: Higher similarity = more semantically related');
    }
  }

  console.log('');
}

async function main() {
  try {
    await singleTextEmbedding();
    await batchEmbeddings();
    await customDimensionsEmbedding();
    await listEmbeddingModels();
    await semanticSimilarity();

    console.log('All examples completed successfully!');
  } catch (error) {
    console.error('Error running examples:', error);
    process.exit(1);
  }
}

main();
