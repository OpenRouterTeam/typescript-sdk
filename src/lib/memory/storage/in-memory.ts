/**
 * In-memory storage implementation for the memory system
 * Stores all data in memory using Maps - data is lost when the process exits
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
import type { MemoryStorage } from "./interface.js";

/**
 * In-memory storage implementation
 * All data is stored in memory and will be lost when the process exits
 */
export class InMemoryStorage implements MemoryStorage {
  private threads: Map<string, Thread> = new Map();
  private messages: Map<string, MemoryMessage> = new Map();
  private messagesByThread: Map<string, Set<string>> = new Map();
  private resources: Map<string, Resource> = new Map();
  private threadWorkingMemories: Map<string, ThreadWorkingMemory> = new Map();
  private resourceWorkingMemories: Map<string, ResourceWorkingMemory> =
    new Map();
  // Message version history tracking
  private messageHistory: Map<string, MemoryMessage[]> = new Map();

  // ===== Thread Operations =====

  async saveThread(thread: Thread): Promise<Thread> {
    this.threads.set(thread.id, { ...thread });
    return thread;
  }

  async getThread(threadId: string): Promise<Thread | null> {
    return this.threads.get(threadId) || null;
  }

  async getThreadsByResource(resourceId: string): Promise<Thread[]> {
    const threads: Thread[] = [];
    for (const thread of this.threads.values()) {
      if (thread.resourceId === resourceId) {
        threads.push(thread);
      }
    }
    // Sort by most recently updated first
    return threads.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    );
  }

  async deleteThread(threadId: string): Promise<void> {
    this.threads.delete(threadId);

    // Delete all messages in this thread
    const messageIds = this.messagesByThread.get(threadId);
    if (messageIds) {
      for (const messageId of messageIds) {
        this.messages.delete(messageId);
      }
      this.messagesByThread.delete(threadId);
    }

    // Delete thread working memory
    this.threadWorkingMemories.delete(threadId);
  }

  // ===== Message Operations =====

  async saveMessages(messages: MemoryMessage[]): Promise<void> {
    for (const message of messages) {
      this.messages.set(message.id, { ...message });

      // Index by thread
      if (!this.messagesByThread.has(message.threadId)) {
        this.messagesByThread.set(message.threadId, new Set());
      }
      this.messagesByThread.get(message.threadId)!.add(message.id);
    }
  }

  async getMessages(
    threadId: string,
    options: GetMessagesOptions = {},
  ): Promise<MemoryMessage[]> {
    const messageIds = this.messagesByThread.get(threadId);
    if (!messageIds) {
      return [];
    }

    // Get all messages for this thread
    const messages: MemoryMessage[] = [];
    for (const messageId of messageIds) {
      const message = this.messages.get(messageId);
      if (message) {
        messages.push(message);
      }
    }

    // Sort by creation time
    const order = options.order || "asc";
    messages.sort((a, b) => {
      const timeA = a.createdAt.getTime();
      const timeB = b.createdAt.getTime();
      return order === "asc" ? timeA - timeB : timeB - timeA;
    });

    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit;

    if (limit !== undefined) {
      return messages.slice(offset, offset + limit);
    }

    return offset > 0 ? messages.slice(offset) : messages;
  }

  async deleteMessages(messageIds: string[]): Promise<void> {
    for (const messageId of messageIds) {
      const message = this.messages.get(messageId);
      if (message) {
        // Remove from thread index
        const threadMessages = this.messagesByThread.get(message.threadId);
        if (threadMessages) {
          threadMessages.delete(messageId);
        }
        // Remove the message
        this.messages.delete(messageId);
      }
    }
  }

  // ===== Resource Operations =====

  async saveResource(resource: Resource): Promise<Resource> {
    this.resources.set(resource.id, { ...resource });
    return resource;
  }

  async getResource(resourceId: string): Promise<Resource | null> {
    return this.resources.get(resourceId) || null;
  }

  async deleteResource(resourceId: string): Promise<void> {
    this.resources.delete(resourceId);

    // Delete all threads for this resource
    const threads = await this.getThreadsByResource(resourceId);
    for (const thread of threads) {
      await this.deleteThread(thread.id);
    }

    // Delete resource working memory
    this.resourceWorkingMemories.delete(resourceId);
  }

  // ===== Working Memory Operations =====

  async updateThreadWorkingMemory(
    threadId: string,
    data: WorkingMemoryData,
  ): Promise<void> {
    this.threadWorkingMemories.set(threadId, {
      threadId,
      data: { ...data },
      updatedAt: new Date(),
    });
  }

  async getThreadWorkingMemory(
    threadId: string,
  ): Promise<ThreadWorkingMemory | null> {
    return this.threadWorkingMemories.get(threadId) || null;
  }

  async updateResourceWorkingMemory(
    resourceId: string,
    data: WorkingMemoryData,
  ): Promise<void> {
    this.resourceWorkingMemories.set(resourceId, {
      resourceId,
      data: { ...data },
      updatedAt: new Date(),
    });
  }

  async getResourceWorkingMemory(
    resourceId: string,
  ): Promise<ResourceWorkingMemory | null> {
    return this.resourceWorkingMemories.get(resourceId) || null;
  }

  // ===== Serialization Operations =====

  async serialize(): Promise<SerializedMemoryState> {
    return {
      version: "1.0.0",
      threads: Array.from(this.threads.values()),
      messages: Array.from(this.messages.values()),
      resources: Array.from(this.resources.values()),
      threadWorkingMemories: Array.from(this.threadWorkingMemories.values()),
      resourceWorkingMemories: Array.from(
        this.resourceWorkingMemories.values(),
      ),
      serializedAt: new Date(),
    };
  }

  async serializeThread(threadId: string): Promise<SerializedThreadState | null> {
    const thread = await this.getThread(threadId);
    if (!thread) {
      return null;
    }

    const messages = await this.getMessages(threadId);
    const threadWorkingMemory = await this.getThreadWorkingMemory(threadId);

    return {
      version: "1.0.0",
      thread,
      messages,
      ...(threadWorkingMemory !== null && { threadWorkingMemory }),
      serializedAt: new Date(),
    };
  }

  async hydrate(state: SerializedMemoryState): Promise<void> {
    // Clear existing data
    this.threads.clear();
    this.messages.clear();
    this.messagesByThread.clear();
    this.resources.clear();
    this.threadWorkingMemories.clear();
    this.resourceWorkingMemories.clear();

    // Import threads
    for (const thread of state.threads) {
      await this.saveThread(thread);
    }

    // Import messages
    await this.saveMessages(state.messages);

    // Import resources
    for (const resource of state.resources) {
      await this.saveResource(resource);
    }

    // Import thread working memories
    for (const twm of state.threadWorkingMemories) {
      this.threadWorkingMemories.set(twm.threadId, twm);
    }

    // Import resource working memories
    for (const rwm of state.resourceWorkingMemories) {
      this.resourceWorkingMemories.set(rwm.resourceId, rwm);
    }
  }

  async hydrateThread(threadState: SerializedThreadState): Promise<void> {
    // Save the thread
    await this.saveThread(threadState.thread);

    // Save all messages
    await this.saveMessages(threadState.messages);

    // Save thread working memory if present
    if (threadState.threadWorkingMemory) {
      await this.updateThreadWorkingMemory(
        threadState.thread.id,
        threadState.threadWorkingMemory.data,
      );
    }
  }

  // ===== Enhanced Message Operations =====

  async updateMessage(
    messageId: string,
    updates: Partial<MemoryMessage>,
  ): Promise<MemoryMessage> {
    const existing = this.messages.get(messageId);
    if (!existing) {
      throw new Error(`Message ${messageId} not found`);
    }

    // Save current version to history
    if (!this.messageHistory.has(messageId)) {
      this.messageHistory.set(messageId, []);
    }
    this.messageHistory.get(messageId)!.push({ ...existing });

    // Create updated message with incremented version
    const updated: MemoryMessage = {
      ...existing,
      ...updates,
      version: (existing.version || 1) + 1,
      editedFrom: existing.editedFrom || existing.id,
    };

    this.messages.set(messageId, updated);
    return updated;
  }

  async getMessageHistory(messageId: string): Promise<MemoryMessage[]> {
    const history = this.messageHistory.get(messageId) || [];
    const current = this.messages.get(messageId);

    // Return history + current (oldest to newest)
    return current ? [...history, current] : history;
  }

  // ===== Token-Aware Operations =====

  async getThreadTokenCount(threadId: string): Promise<number> {
    const messages = await this.getMessages(threadId);
    return messages.reduce((sum, msg) => sum + (msg.tokenCount || 0), 0);
  }

  async getMessagesByTokenBudget(
    threadId: string,
    maxTokens: number,
    options: GetMessagesOptions = {},
  ): Promise<MemoryMessage[]> {
    const messages = await this.getMessages(threadId, options);

    // Filter to only active messages with token counts
    const activeMessages = messages.filter(
      (m) => (!m.status || m.status === "active") && m.tokenCount !== undefined,
    );

    // Sort by importance (desc) then recency (desc)
    activeMessages.sort((a, b) => {
      const importanceA = a.importance || 0;
      const importanceB = b.importance || 0;
      if (importanceA !== importanceB) {
        return importanceB - importanceA; // Higher importance first
      }
      return b.createdAt.getTime() - a.createdAt.getTime(); // More recent first
    });

    // Select messages within token budget
    const selected: MemoryMessage[] = [];
    let tokenCount = 0;

    for (const message of activeMessages) {
      const messageTokens = message.tokenCount || 0;
      if (tokenCount + messageTokens <= maxTokens) {
        selected.push(message);
        tokenCount += messageTokens;
      }
    }

    // Sort selected messages chronologically for conversation flow
    return selected.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // ===== Cache Management Operations =====

  async getCachedMessages(threadId: string): Promise<MemoryMessage[]> {
    const messages = await this.getMessages(threadId);
    const now = new Date();

    return messages.filter((msg) => {
      if (!msg.cacheControl?.enabled) return false;
      if (!msg.cacheControl.expiresAt) return true;
      return msg.cacheControl.expiresAt > now;
    });
  }

  async invalidateCache(threadId: string, beforeDate?: Date): Promise<void> {
    const messages = await this.getMessages(threadId);
    const cutoff = beforeDate || new Date();

    for (const message of messages) {
      if (message.cacheControl?.enabled) {
        // Update cache control to mark as expired
        const updated = {
          ...message,
          cacheControl: {
            ...message.cacheControl,
            enabled: false,
            expiresAt: cutoff,
          },
        };
        this.messages.set(message.id, updated);
      }
    }
  }

  // ===== Filtered Retrieval Operations =====

  async getMessagesByStatus(
    threadId: string,
    status: string,
  ): Promise<MemoryMessage[]> {
    const messages = await this.getMessages(threadId);
    return messages.filter((m) => m.status === status);
  }

  async getMessagesByImportance(
    threadId: string,
    minImportance: number,
  ): Promise<MemoryMessage[]> {
    const messages = await this.getMessages(threadId);
    return messages.filter(
      (m) => m.importance !== undefined && m.importance >= minImportance,
    );
  }
}
