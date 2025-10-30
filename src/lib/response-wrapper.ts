import { OpenRouterCore } from "../core.js";
import { EventStream } from "./event-streams.js";
import { RequestOptions } from "./sdks.js";
import * as models from "../models/index.js";
import { betaResponsesSend } from "../funcs/betaResponsesSend.js";
import { ReusableReadableStream } from "./reusable-stream.js";
import {
  extractTextDeltas,
  extractReasoningDeltas,
  extractToolDeltas,
  buildMessageStream,
  consumeStreamForCompletion,
  extractMessageFromResponse,
  extractTextFromResponse,
} from "./stream-transformers.js";

export interface GetResponseOptions {
  request: models.OpenResponsesRequest;
  client: OpenRouterCore;
  options?: RequestOptions;
}

/**
 * A wrapper around a streaming response that provides multiple consumption patterns.
 *
 * Allows consuming the response in multiple ways:
 * - `await response.message` - Get the completed message
 * - `await response.text` - Get just the text
 * - `for await (const delta of response.textStream)` - Stream text deltas
 * - `for await (const msg of response.messageStream)` - Stream incremental message updates
 * - `for await (const event of response.fullResponsesStream)` - Stream all response events
 *
 * All consumption patterns can be used concurrently thanks to the underlying
 * ReusableReadableStream implementation.
 */
export class ResponseWrapper {
  private reusableStream: ReusableReadableStream<models.OpenResponsesStreamEvent> | null = null;
  private streamPromise: Promise<EventStream<models.OpenResponsesStreamEvent>> | null = null;
  private messagePromise: Promise<models.AssistantMessage> | null = null;
  private textPromise: Promise<string> | null = null;
  private options: GetResponseOptions;
  private initPromise: Promise<void> | null = null;

  constructor(options: GetResponseOptions) {
    this.options = options;
  }

  /**
   * Initialize the stream if not already started
   * This is idempotent - multiple calls will return the same promise
   */
  private initStream(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      // Force stream mode
      const request = { ...this.options.request, stream: true as const };

      // Create the stream promise
      this.streamPromise = betaResponsesSend(
        this.options.client,
        request,
        this.options.options,
      ).then((result) => {
        if (!result.ok) {
          throw result.error;
        }
        return result.value;
      });

      // Wait for the stream and create the reusable stream
      const eventStream = await this.streamPromise;
      this.reusableStream = new ReusableReadableStream(eventStream);
    })();

    return this.initPromise;
  }

  /**
   * Get the completed message from the response.
   * This will consume the stream until completion and extract the first message.
   * Returns an AssistantMessage in chat format.
   */
  get message(): Promise<models.AssistantMessage> {
    if (this.messagePromise) {
      return this.messagePromise;
    }

    this.messagePromise = (async (): Promise<models.AssistantMessage> => {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      const completedResponse = await consumeStreamForCompletion(this.reusableStream);
      return extractMessageFromResponse(completedResponse);
    })();

    return this.messagePromise;
  }

  /**
   * Get just the text content from the response.
   * This will consume the stream until completion and extract the text.
   */
  get text(): Promise<string> {
    if (this.textPromise) {
      return this.textPromise;
    }

    this.textPromise = (async () => {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      const completedResponse = await consumeStreamForCompletion(this.reusableStream);
      return extractTextFromResponse(completedResponse);
    })();

    return this.textPromise;
  }

  /**
   * Stream all response events as they arrive.
   * Multiple consumers can iterate over this stream concurrently.
   */
  get fullResponsesStream(): AsyncIterableIterator<models.OpenResponsesStreamEvent> {
    return (async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      const consumer = this.reusableStream.createConsumer();
      yield* consumer;
    }.call(this));
  }

  /**
   * Stream only text deltas as they arrive.
   * This filters the full event stream to only yield text content.
   */
  get textStream(): AsyncIterableIterator<string> {
    return (async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      yield* extractTextDeltas(this.reusableStream);
    }.call(this));
  }

  /**
   * Stream incremental message updates as content is added.
   * Each iteration yields an updated version of the message with new content.
   * Returns AssistantMessage in chat format.
   */
  get newMessagesStream(): AsyncIterableIterator<models.AssistantMessage> {
    return (async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      yield* buildMessageStream(this.reusableStream);
    }.call(this));
  }

  /**
   * Stream only reasoning deltas as they arrive.
   * This filters the full event stream to only yield reasoning content.
   */
  get reasoningStream(): AsyncIterableIterator<string> {
    return (async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      yield* extractReasoningDeltas(this.reusableStream);
    }.call(this));
  }

  /**
   * Stream only tool call argument deltas as they arrive.
   * This filters the full event stream to only yield function call arguments.
   */
  get toolStream(): AsyncIterableIterator<string> {
    return (async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      yield* extractToolDeltas(this.reusableStream);
    }.call(this));
  }

  /**
   * Stream events in chat format (compatibility layer).
   * Note: This transforms responses API events into a chat-like format.
   *
   * @remarks
   * This is a compatibility method that attempts to transform the responses API
   * stream into a format similar to the chat API. Due to differences in the APIs,
   * this may not be a perfect mapping.
   */
  get fullChatStream(): AsyncIterableIterator<any> {
    return (async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      const consumer = this.reusableStream.createConsumer();

      for await (const event of consumer) {
        if (!("type" in event)) continue;

        // Transform responses events to chat-like format
        // This is a simplified transformation - you may need to adjust based on your needs
        if (event.type === "response.output_text.delta") {
          const deltaEvent = event as models.OpenResponsesStreamEventResponseOutputTextDelta;
          yield {
            type: "content.delta",
            delta: deltaEvent.delta,
          };
        } else if (event.type === "response.completed") {
          const completedEvent = event as models.OpenResponsesStreamEventResponseCompleted;
          yield {
            type: "message.complete",
            response: completedEvent.response,
          };
        } else {
          // Pass through other events
          yield {
            type: event.type,
            event,
          };
        }
      }
    }.call(this));
  }

  /**
   * Cancel the underlying stream and all consumers
   */
  async cancel(): Promise<void> {
    if (this.reusableStream) {
      await this.reusableStream.cancel();
    }
  }
}
