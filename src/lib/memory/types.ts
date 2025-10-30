/**
 * Memory system types for OpenRouter SDK
 * Provides thread, resource, and working memory management
 */

import type { Message } from "../../models/message.js";

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
 * Configuration options for the memory system
 */
export interface MemoryConfig {
  /**
   * Maximum number of messages to load from history when auto-injecting
   * @default 10
   */
  maxHistoryMessages?: number;

  /**
   * Whether to enable auto-injection of conversation history
   * @default true
   */
  autoInject?: boolean;

  /**
   * Whether to enable auto-saving of messages
   * @default true
   */
  autoSave?: boolean;
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
