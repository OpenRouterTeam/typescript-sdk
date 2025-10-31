/**
 * Memory system types for OpenRouter SDK
 * Provides thread, resource, and working memory management
 */

import type { Message } from "../../models/message.js";

/**
 * Cache control configuration for a message
 */
export interface CacheControl {
  /** Whether caching is enabled for this message */
  enabled: boolean;
  /** When the cache expires (if applicable) */
  expiresAt?: Date;
}

/**
 * Stored message with metadata for memory system
 */
export interface MemoryMessage {
  /** Unique identifier for the message */
  id: string;
  /** The actual message content (using SDK's Message type) */
  message: Message;
  /** Thread this message belongs to */
  threadId: string;
  /** Resource (user) this message is associated with */
  resourceId: string;
  /** When the message was created */
  createdAt: Date;

  // Optional enhancements for context-aware memory
  /** Message status for filtering and soft deletes */
  status?: "active" | "archived" | "deleted";
  /** Importance score (0-1) for priority-based selection */
  importance?: number;
  /** Token count for this message (provider-calculated) */
  tokenCount?: number;
  /** Cache control configuration */
  cacheControl?: CacheControl;
  /** Version number for message editing */
  version?: number;
  /** Original message ID if this is an edited version */
  editedFrom?: string;
}

/**
 * Thread represents a conversation session
 */
export interface Thread {
  /** Unique identifier for the thread */
  id: string;
  /** Resource (user) that owns this thread */
  resourceId: string;
  /** Optional human-readable title for the thread */
  title?: string;
  /** When the thread was created */
  createdAt: Date;
  /** When the thread was last updated */
  updatedAt: Date;
}

/**
 * Resource represents a user or entity that can own multiple threads
 */
export interface Resource {
  /** Unique identifier for the resource */
  id: string;
  /** When the resource was created */
  createdAt: Date;
  /** When the resource was last updated */
  updatedAt: Date;
}

/**
 * Working memory data structure - can be any JSON-serializable object
 */
export type WorkingMemoryData = Record<string, any>;

/**
 * Thread-scoped working memory
 */
export interface ThreadWorkingMemory {
  /** Thread this working memory belongs to */
  threadId: string;
  /** Working memory data */
  data: WorkingMemoryData;
  /** When the working memory was last updated */
  updatedAt: Date;
}

/**
 * Resource-scoped working memory
 */
export interface ResourceWorkingMemory {
  /** Resource this working memory belongs to */
  resourceId: string;
  /** Working memory data */
  data: WorkingMemoryData;
  /** When the working memory was last updated */
  updatedAt: Date;
}

/**
 * Context window management configuration
 */
export interface ContextWindowConfig {
  /** Maximum tokens to keep in context */
  maxTokens: number;
}

/**
 * Configuration options for the memory system
 */
export interface MemoryConfig {
  /**
   * Maximum number of messages to load from history
   * @default 10
   */
  maxHistoryMessages?: number;

  /**
   * Context window management configuration
   * When provided, overrides maxHistoryMessages with token-aware selection
   */
  contextWindow?: ContextWindowConfig;
}

/**
 * Options for retrieving messages from storage
 */
export interface GetMessagesOptions {
  /** Maximum number of messages to retrieve */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Sort order (newest first or oldest first) */
  order?: "asc" | "desc";
}

/**
 * Serialized state of the entire memory system
 */
export interface SerializedMemoryState {
  /** Version of the serialization format */
  version: string;
  /** Serialized threads */
  threads: Thread[];
  /** Serialized messages */
  messages: MemoryMessage[];
  /** Serialized resources */
  resources: Resource[];
  /** Serialized thread working memories */
  threadWorkingMemories: ThreadWorkingMemory[];
  /** Serialized resource working memories */
  resourceWorkingMemories: ResourceWorkingMemory[];
  /** When this state was serialized */
  serializedAt: Date;
}

/**
 * Serialized state of a single thread
 */
export interface SerializedThreadState {
  /** Version of the serialization format */
  version: string;
  /** The thread */
  thread: Thread;
  /** Messages in this thread */
  messages: MemoryMessage[];
  /** Thread working memory (if any) */
  threadWorkingMemory?: ThreadWorkingMemory;
  /** When this state was serialized */
  serializedAt: Date;
}
