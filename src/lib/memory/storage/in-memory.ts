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

  async exportState(): Promise<SerializedMemoryState> {
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

  async importState(state: SerializedMemoryState): Promise<void> {
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
}
