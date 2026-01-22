import { describe, it, expect } from 'vitest';
import {
  AssistantMessage$inboundSchema,
  AssistantMessage$outboundSchema,
} from '../../src/models/assistantmessage.js';

describe('AssistantMessage images field', () => {
  it('should preserve images field when parsing inbound response', () => {
    const response = {
      role: 'assistant',
      content: 'Here is your generated image',
      images: [{ image_url: { url: 'https://example.com/generated-image.png' } }],
    };

    const parsed = AssistantMessage$inboundSchema.parse(response);

    expect(parsed.images).toBeDefined();
    expect(parsed.images).toHaveLength(1);
    expect(parsed.images?.[0].imageUrl.url).toBe('https://example.com/generated-image.png');
  });

  it('should handle multiple images in response', () => {
    const response = {
      role: 'assistant',
      content: 'Here are your images',
      images: [
        { image_url: { url: 'https://example.com/image1.png' } },
        { image_url: { url: 'https://example.com/image2.png' } },
      ],
    };

    const parsed = AssistantMessage$inboundSchema.parse(response);

    expect(parsed.images).toHaveLength(2);
    expect(parsed.images?.[0].imageUrl.url).toBe('https://example.com/image1.png');
    expect(parsed.images?.[1].imageUrl.url).toBe('https://example.com/image2.png');
  });

  it('should handle response without images field', () => {
    const response = {
      role: 'assistant',
      content: 'Just a text response',
    };

    const parsed = AssistantMessage$inboundSchema.parse(response);

    expect(parsed.images).toBeUndefined();
  });

  it('should correctly transform image_url to imageUrl (camelCase)', () => {
    const response = {
      role: 'assistant',
      content: 'Image response',
      images: [{ image_url: { url: 'https://example.com/test.png' } }],
    };

    const parsed = AssistantMessage$inboundSchema.parse(response);

    // Verify snake_case is transformed to camelCase
    expect(parsed.images?.[0]).toHaveProperty('imageUrl');
    expect(parsed.images?.[0]).not.toHaveProperty('image_url');
  });

  it('should correctly transform imageUrl back to image_url for outbound', () => {
    const message = {
      role: 'assistant' as const,
      content: 'Image response',
      images: [{ imageUrl: { url: 'https://example.com/test.png' } }],
    };

    const outbound = AssistantMessage$outboundSchema.parse(message);

    // Verify camelCase is transformed back to snake_case for API
    expect(outbound.images?.[0]).toHaveProperty('image_url');
  });
});
