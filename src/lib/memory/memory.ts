/**
 * Main Memory class for the OpenRouter SDK
 * Provides high-level API for managing threads, messages, resources, and working memory
 */

import type { Message } from "../../models/message.js";
import type { MemoryStorage } from "./storage/interface.js";
import type {
  GetMessagesOptions,
  MemoryConfig,
  MemoryMessage,
  Resource,
  ResourceWorkingMemory,
  SerializedMemoryState,
  SerializedThreadState,
  Thread,
  ThreadWorkingMemory,
  WorkingMemoryData,
} from "./types.js";

/**
 * Memory class for managing conversation history, threads, and working memory
 */
export class Memory {
  private storage: MemoryStorage;
  private config: Required<MemoryConfig>;

  /**
   * Create a new Memory instance
   * @param storage The storage implementation to use
   * @param config Optional configuration
   */
  constructor(storage: MemoryStorage, config: MemoryConfig = {}) {
    this.storage = storage;
    this.config = {
      maxHistoryMessages: config.maxHistoryMessages ?? 10,
      autoInject: config.autoInject ?? true,
      autoSave: config.autoSave ?? true,
    };
  }

  /**
   * Get the current memory configuration
   */
  getConfig(): Required<MemoryConfig> {
    return { ...this.config };
  }

  // ===== Thread Management =====

  /**
   * Create a new thread
   * @param threadId The thread ID
   * @param resourceId The resource (user) ID that owns this thread
   * @param title Optional title for the thread
   * @returns The created thread
   */
  async createThread(
    threadId: string,
    resourceId: string,
    title?: string,
  ): Promise<Thread> {
    const now = new Date();
    const thread: Thread = {
      id: threadId,
      resourceId,
      ...(title !== undefined && { title }),
      createdAt: now,
      updatedAt: now,
    };

    return await this.storage.saveThread(thread);
  }

  /**
   * Get a thread by ID
   * @param threadId The thread ID
   * @returns The thread, or null if not found
   */
  async getThread(threadId: string): Promise<Thread | null> {
    return await this.storage.getThread(threadId);
  }

  /**
   * Get all threads for a resource
   * @param resourceId The resource ID
   * @returns Array of threads
   */
  async getThreadsByResource(resourceId: string): Promise<Thread[]> {
    return await this.storage.getThreadsByResource(resourceId);
  }

  /**
   * Update a thread's updatedAt timestamp
   * @param threadId The thread ID
   */
  async touchThread(threadId: string): Promise<void> {
    const thread = await this.storage.getThread(threadId);
    if (thread) {
      thread.updatedAt = new Date();
      await this.storage.saveThread(thread);
    }
  }

  /**
   * Delete a thread and all its messages
   * @param threadId The thread ID
   */
  async deleteThread(threadId: string): Promise<void> {
    await this.storage.deleteThread(threadId);
  }

  // ===== Message Management =====

  /**
   * Save messages to a thread
   * @param threadId The thread ID
   * @param resourceId The resource ID
   * @param messages The messages to save
   * @returns The saved messages with IDs
   */
  async saveMessages(
    threadId: string,
    resourceId: string,
    messages: Message[],
  ): Promise<MemoryMessage[]> {
    const now = new Date();
    const memoryMessages: MemoryMessage[] = messages.map((message) => ({
      id: this.generateId(),
      message,
      threadId,
      resourceId,
      createdAt: now,
    }));

    await this.storage.saveMessages(memoryMessages);

    // Update thread's updatedAt timestamp
    await this.touchThread(threadId);

    return memoryMessages;
  }

  /**
   * Get messages for a thread
   * @param threadId The thread ID
   * @param options Optional filtering and pagination options
   * @returns Array of messages
   */
  async getMessages(
    threadId: string,
    options?: GetMessagesOptions,
  ): Promise<MemoryMessage[]> {
    return await this.storage.getMessages(threadId, options);
  }

  /**
   * Get recent messages for auto-injection into API calls
   * Uses the maxHistoryMessages config option
   * @param threadId The thread ID
   * @returns Array of recent messages (as SDK Message types)
   */
  async getRecentMessages(threadId: string): Promise<Message[]> {
    const memoryMessages = await this.storage.getMessages(threadId, {
      limit: this.config.maxHistoryMessages,
      order: "desc", // Get most recent messages
    });

    // Reverse to get chronological order
    return memoryMessages.reverse().map((mm) => mm.message);
  }

  /**
   * Delete specific messages
   * @param messageIds Array of message IDs to delete
   */
  async deleteMessages(messageIds: string[]): Promise<void> {
    await this.storage.deleteMessages(messageIds);
  }

  // ===== Resource Management =====

  /**
   * Create a new resource
   * @param resourceId The resource ID
   * @returns The created resource
   */
  async createResource(resourceId: string): Promise<Resource> {
    const now = new Date();
    const resource: Resource = {
      id: resourceId,
      createdAt: now,
      updatedAt: now,
    };

    return await this.storage.saveResource(resource);
  }

  /**
   * Get a resource by ID
   * @param resourceId The resource ID
   * @returns The resource, or null if not found
   */
  async getResource(resourceId: string): Promise<Resource | null> {
    return await this.storage.getResource(resourceId);
  }

  /**
   * Delete a resource and all its threads/messages
   * @param resourceId The resource ID
   */
  async deleteResource(resourceId: string): Promise<void> {
    await this.storage.deleteResource(resourceId);
  }

  // ===== Working Memory Management =====

  /**
   * Update thread-scoped working memory
   * @param threadId The thread ID
   * @param data The working memory data
   */
  async updateThreadWorkingMemory(
    threadId: string,
    data: WorkingMemoryData,
  ): Promise<void> {
    await this.storage.updateThreadWorkingMemory(threadId, data);
  }

  /**
   * Get thread-scoped working memory
   * @param threadId The thread ID
   * @returns The working memory, or null if not found
   */
  async getThreadWorkingMemory(
    threadId: string,
  ): Promise<ThreadWorkingMemory | null> {
    return await this.storage.getThreadWorkingMemory(threadId);
  }

  /**
   * Update resource-scoped working memory
   * @param resourceId The resource ID
   * @param data The working memory data
   */
  async updateResourceWorkingMemory(
    resourceId: string,
    data: WorkingMemoryData,
  ): Promise<void> {
    await this.storage.updateResourceWorkingMemory(resourceId, data);
  }

  /**
   * Get resource-scoped working memory
   * @param resourceId The resource ID
   * @returns The working memory, or null if not found
   */
  async getResourceWorkingMemory(
    resourceId: string,
  ): Promise<ResourceWorkingMemory | null> {
    return await this.storage.getResourceWorkingMemory(resourceId);
  }

  // ===== Serialization =====

  /**
   * Serialize the entire memory state to JSON
   * @returns The serialized state
   */
  async serialize(): Promise<SerializedMemoryState> {
    return await this.storage.exportState();
  }

  /**
   * Serialize a single thread to JSON
   * @param threadId The thread ID
   * @returns The serialized thread state, or null if thread not found
   */
  async serializeThread(threadId: string): Promise<SerializedThreadState | null> {
    const thread = await this.storage.getThread(threadId);
    if (!thread) {
      return null;
    }

    const messages = await this.storage.getMessages(threadId);
    const threadWorkingMemory =
      await this.storage.getThreadWorkingMemory(threadId);

    return {
      version: "1.0.0",
      thread,
      messages,
      ...(threadWorkingMemory !== null && { threadWorkingMemory }),
      serializedAt: new Date(),
    };
  }

  /**
   * Hydrate (restore) the entire memory state from JSON
   * Warning: This will replace all existing data in memory
   * @param state The serialized state to restore
   */
  async hydrate(state: SerializedMemoryState): Promise<void> {
    await this.storage.importState(state);
  }

  /**
   * Hydrate (restore) a single thread from JSON
   * @param threadState The serialized thread state to restore
   */
  async hydrateThread(threadState: SerializedThreadState): Promise<void> {
    // Save the thread
    await this.storage.saveThread(threadState.thread);

    // Save all messages
    await this.storage.saveMessages(threadState.messages);

    // Save thread working memory if present
    if (threadState.threadWorkingMemory) {
      await this.storage.updateThreadWorkingMemory(
        threadState.thread.id,
        threadState.threadWorkingMemory.data,
      );
    }
  }

  // ===== Utility Methods =====

  /**
   * Generate a unique ID for messages
   * @returns A unique ID string
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Ensure a thread exists, creating it if necessary
   * @param threadId The thread ID
   * @param resourceId The resource ID
   * @returns The thread
   */
  async ensureThread(threadId: string, resourceId: string): Promise<Thread> {
    let thread = await this.storage.getThread(threadId);
    if (!thread) {
      thread = await this.createThread(threadId, resourceId);
    }
    return thread;
  }

  /**
   * Ensure a resource exists, creating it if necessary
   * @param resourceId The resource ID
   * @returns The resource
   */
  async ensureResource(resourceId: string): Promise<Resource> {
    let resource = await this.storage.getResource(resourceId);
    if (!resource) {
      resource = await this.createResource(resourceId);
    }
    return resource;
  }
}
