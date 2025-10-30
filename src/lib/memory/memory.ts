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
  Thread,
  ThreadWorkingMemory,
  WorkingMemoryData,
} from "./types.js";

/**
 * Resolved configuration with all defaults applied
 */
type ResolvedMemoryConfig = Required<Pick<MemoryConfig, 'maxHistoryMessages' | 'autoInject' | 'autoSave' | 'trackTokenUsage'>> & Pick<MemoryConfig, 'contextWindow'>;

/**
 * Memory class for managing conversation history, threads, and working memory
 */
export class Memory {
  private storage: MemoryStorage;
  private config: ResolvedMemoryConfig;

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
      ...(config.contextWindow !== undefined && { contextWindow: config.contextWindow }),
      trackTokenUsage: config.trackTokenUsage ?? false,
    };
  }

  /**
   * Get the current memory configuration
   */
  getConfig(): ResolvedMemoryConfig {
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

  // ===== Enhanced Message Operations =====

  /**
   * Update an existing message
   * @param messageId The message ID
   * @param updates Partial message updates
   * @returns The updated message, or null if storage doesn't support updates
   */
  async updateMessage(
    messageId: string,
    updates: Partial<Message>,
  ): Promise<MemoryMessage | null> {
    if (!this.storage.updateMessage) {
      return null;
    }

    return await this.storage.updateMessage(messageId, {
      message: updates as Message,
    } as Partial<MemoryMessage>);
  }

  /**
   * Get edit history for a message
   * @param messageId The message ID
   * @returns Array of message versions, or empty if storage doesn't support history
   */
  async getMessageVersions(messageId: string): Promise<MemoryMessage[]> {
    if (!this.storage.getMessageHistory) {
      return [];
    }

    return await this.storage.getMessageHistory(messageId);
  }

  // ===== Token-Aware Operations =====

  /**
   * Get total token count for a thread
   * @param threadId The thread ID
   * @returns Token count, or 0 if storage doesn't support token counting
   */
  async getThreadTokenCount(threadId: string): Promise<number> {
    if (!this.storage.getThreadTokenCount) {
      return 0;
    }

    return await this.storage.getThreadTokenCount(threadId);
  }

  /**
   * Get messages within a token budget
   * Uses contextWindow config if available, otherwise falls back to maxHistoryMessages
   * @param threadId The thread ID
   * @param maxTokens Optional max tokens (uses config if not provided)
   * @returns Array of messages within token budget
   */
  async getMessagesWithinBudget(
    threadId: string,
    maxTokens?: number,
  ): Promise<Message[]> {
    const tokenLimit =
      maxTokens || this.config.contextWindow?.maxTokens;

    if (!tokenLimit || !this.storage.getMessagesByTokenBudget) {
      // Fall back to regular getRecentMessages
      return await this.getRecentMessages(threadId);
    }

    const memoryMessages = await this.storage.getMessagesByTokenBudget(
      threadId,
      tokenLimit,
    );

    return memoryMessages.map((mm) => mm.message);
  }

  // ===== Cache Management =====

  /**
   * Get messages with active cache
   * @param threadId The thread ID
   * @returns Array of cached messages, or empty if storage doesn't support caching
   */
  async getCachedMessages(threadId: string): Promise<MemoryMessage[]> {
    if (!this.storage.getCachedMessages) {
      return [];
    }

    return await this.storage.getCachedMessages(threadId);
  }

  /**
   * Invalidate cache for messages
   * @param threadId The thread ID
   * @param beforeDate Optional date - invalidate cache before this date
   */
  async invalidateCache(threadId: string, beforeDate?: Date): Promise<void> {
    if (!this.storage.invalidateCache) {
      return;
    }

    await this.storage.invalidateCache(threadId, beforeDate);
  }

  // ===== Filtered Retrieval =====

  /**
   * Get messages by status
   * @param threadId The thread ID
   * @param status The status to filter by
   * @returns Array of messages with matching status
   */
  async getMessagesByStatus(
    threadId: string,
    status: "active" | "archived" | "deleted",
  ): Promise<MemoryMessage[]> {
    if (!this.storage.getMessagesByStatus) {
      // Fall back to getting all messages and filtering
      const all = await this.storage.getMessages(threadId);
      return all.filter((m) => m.status === status);
    }

    return await this.storage.getMessagesByStatus(threadId, status);
  }

  /**
   * Get messages by importance threshold
   * @param threadId The thread ID
   * @param minImportance Minimum importance score (0-1)
   * @returns Array of messages meeting importance threshold
   */
  async getMessagesByImportance(
    threadId: string,
    minImportance: number,
  ): Promise<MemoryMessage[]> {
    if (!this.storage.getMessagesByImportance) {
      // Fall back to getting all messages and filtering
      const all = await this.storage.getMessages(threadId);
      return all.filter(
        (m) => m.importance !== undefined && m.importance >= minImportance,
      );
    }

    return await this.storage.getMessagesByImportance(threadId, minImportance);
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
