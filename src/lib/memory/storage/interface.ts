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
   * Export the entire storage state
   * @returns Serialized state of all data in storage
   */
  exportState(): Promise<SerializedMemoryState>;

  /**
   * Import a complete storage state
   * @param state The state to import
   */
  importState(state: SerializedMemoryState): Promise<void>;
}
