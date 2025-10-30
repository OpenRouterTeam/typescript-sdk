/**
 * Storage interface for the memory system
 * Defines the contract for different storage implementations (in-memory, file-based, database, etc.)
 */

import type {
  GetMessagesOptions,
  MemoryMessage,
  Resource,
  ResourceWorkingMemory,
  SerializedMemoryState,
  SerializedThreadState,
  Thread,
  ThreadWorkingMemory,
  WorkingMemoryData,
} from "../types.js";

/**
 * Interface for memory storage implementations
 */
export interface MemoryStorage {
  // ===== Thread Operations =====

  /**
   * Save a thread to storage
   * @param thread The thread to save
   * @returns The saved thread
   */
  saveThread(thread: Thread): Promise<Thread>;

  /**
   * Get a thread by ID
   * @param threadId The thread ID
   * @returns The thread, or null if not found
   */
  getThread(threadId: string): Promise<Thread | null>;

  /**
   * Get all threads for a resource
   * @param resourceId The resource ID
   * @returns Array of threads belonging to the resource
   */
  getThreadsByResource(resourceId: string): Promise<Thread[]>;

  /**
   * Delete a thread
   * @param threadId The thread ID to delete
   */
  deleteThread(threadId: string): Promise<void>;

  // ===== Message Operations =====

  /**
   * Save messages to storage
   * @param messages The messages to save
   */
  saveMessages(messages: MemoryMessage[]): Promise<void>;

  /**
   * Get messages for a thread
   * @param threadId The thread ID
   * @param options Optional filtering and pagination options
   * @returns Array of messages in the thread
   */
  getMessages(
    threadId: string,
    options?: GetMessagesOptions,
  ): Promise<MemoryMessage[]>;

  /**
   * Delete specific messages
   * @param messageIds Array of message IDs to delete
   */
  deleteMessages(messageIds: string[]): Promise<void>;

  // ===== Resource Operations =====

  /**
   * Save a resource to storage
   * @param resource The resource to save
   * @returns The saved resource
   */
  saveResource(resource: Resource): Promise<Resource>;

  /**
   * Get a resource by ID
   * @param resourceId The resource ID
   * @returns The resource, or null if not found
   */
  getResource(resourceId: string): Promise<Resource | null>;

  /**
   * Delete a resource
   * @param resourceId The resource ID to delete
   */
  deleteResource(resourceId: string): Promise<void>;

  // ===== Working Memory Operations =====

  /**
   * Update thread working memory
   * @param threadId The thread ID
   * @param data The working memory data
   */
  updateThreadWorkingMemory(
    threadId: string,
    data: WorkingMemoryData,
  ): Promise<void>;

  /**
   * Get thread working memory
   * @param threadId The thread ID
   * @returns The working memory, or null if not found
   */
  getThreadWorkingMemory(threadId: string): Promise<ThreadWorkingMemory | null>;

  /**
   * Update resource working memory
   * @param resourceId The resource ID
   * @param data The working memory data
   */
  updateResourceWorkingMemory(
    resourceId: string,
    data: WorkingMemoryData,
  ): Promise<void>;

  /**
   * Get resource working memory
   * @param resourceId The resource ID
   * @returns The working memory, or null if not found
   */
  getResourceWorkingMemory(
    resourceId: string,
  ): Promise<ResourceWorkingMemory | null>;

  // ===== Serialization Operations =====

  /**
   * Serialize the entire storage state
   * @returns Serialized state of all data in storage
   */
  serialize(): Promise<SerializedMemoryState>;

  /**
   * Serialize a single thread and its data
   * @param threadId The thread ID to serialize
   * @returns The serialized thread state, or null if not found
   */
  serializeThread(threadId: string): Promise<SerializedThreadState | null>;

  /**
   * Hydrate (restore) the entire storage state
   * Warning: This will replace all existing data in storage
   * @param state The state to restore
   */
  hydrate(state: SerializedMemoryState): Promise<void>;

  /**
   * Hydrate (restore) a single thread
   * @param threadState The thread state to restore
   */
  hydrateThread(threadState: SerializedThreadState): Promise<void>;
}
