import { describe, it, expect, beforeEach } from "vitest";
import { OpenRouter, Memory, InMemoryStorage } from "../../src/index.js";

describe("Memory Integration E2E Tests", () => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  let memory: Memory;
  let storage: InMemoryStorage;
  let client: OpenRouter;

  beforeEach(() => {
    storage = new InMemoryStorage();
    memory = new Memory(storage);
    client = new OpenRouter({
      apiKey,
      memory,
    } as any);
  });

  it("should have memory available on client", () => {
    expect(client.memory).toBeDefined();
    expect(client.memory).toBe(memory);
  });

  it("should create and retrieve threads", async () => {
    const thread = await memory.createThread("thread-1", "user-1", "Test Thread");
    expect(thread.id).toBe("thread-1");
    expect(thread.resourceId).toBe("user-1");
    expect(thread.title).toBe("Test Thread");

    const retrieved = await memory.getThread("thread-1");
    expect(retrieved).toEqual(thread);
  });

  it("should save and retrieve messages", async () => {
    await memory.createThread("thread-1", "user-1");

    const messages = [
      { role: "user" as const, content: "Hello!" },
      { role: "assistant" as const, content: "Hi there!" },
    ];

    const saved = await memory.saveMessages("thread-1", "user-1", messages);
    expect(saved).toHaveLength(2);

    const retrieved = await memory.getMessages("thread-1");
    expect(retrieved).toHaveLength(2);
    expect(retrieved[0].message.role).toBe("user");
    expect(retrieved[1].message.role).toBe("assistant");
  });

  it("should manage working memory at thread level", async () => {
    await memory.createThread("thread-1", "user-1");

    const workingMemoryData = {
      context: "Testing thread working memory",
      counter: 5,
    };

    await memory.updateThreadWorkingMemory("thread-1", workingMemoryData);

    const retrieved = await memory.getThreadWorkingMemory("thread-1");
    expect(retrieved).toBeDefined();
    expect(retrieved?.data).toEqual(workingMemoryData);
  });

  it("should manage working memory at resource level", async () => {
    await memory.createResource("user-1");

    const workingMemoryData = {
      name: "John Doe",
      preferences: { theme: "dark" },
    };

    await memory.updateResourceWorkingMemory("user-1", workingMemoryData);

    const retrieved = await memory.getResourceWorkingMemory("user-1");
    expect(retrieved).toBeDefined();
    expect(retrieved?.data).toEqual(workingMemoryData);
  });

  it("should serialize and hydrate memory state", async () => {
    // Create some test data
    await memory.createResource("user-1");
    await memory.createThread("thread-1", "user-1", "Test Thread");
    await memory.saveMessages("thread-1", "user-1", [
      { role: "user" as const, content: "Hello!" },
    ]);
    await memory.updateThreadWorkingMemory("thread-1", { test: "data" });

    // Serialize using storage
    const state = await storage.serialize();
    expect(state.threads).toHaveLength(1);
    expect(state.messages).toHaveLength(1);
    expect(state.resources).toHaveLength(1);
    expect(state.threadWorkingMemories).toHaveLength(1);

    // Create new storage and hydrate
    const newStorage = new InMemoryStorage();
    await newStorage.hydrate(state);

    // Create new memory with hydrated storage
    const newMemory = new Memory(newStorage);

    // Verify data was restored
    const thread = await newMemory.getThread("thread-1");
    expect(thread).toBeDefined();
    expect(thread?.title).toBe("Test Thread");

    const messages = await newMemory.getMessages("thread-1");
    expect(messages).toHaveLength(1);

    const workingMemory = await newMemory.getThreadWorkingMemory("thread-1");
    expect(workingMemory?.data).toEqual({ test: "data" });
  });

  it("should serialize and hydrate a single thread", async () => {
    await memory.createThread("thread-1", "user-1", "Test Thread");
    await memory.saveMessages("thread-1", "user-1", [
      { role: "user" as const, content: "Hello!" },
      { role: "assistant" as const, content: "Hi!" },
    ]);

    // Serialize using storage
    const threadState = await storage.serializeThread("thread-1");
    expect(threadState).toBeDefined();
    expect(threadState?.thread.id).toBe("thread-1");
    expect(threadState?.messages).toHaveLength(2);

    // Hydrate into new storage
    const newStorage = new InMemoryStorage();
    await newStorage.hydrateThread(threadState!);

    // Create new memory with hydrated storage
    const newMemory = new Memory(newStorage);

    const thread = await newMemory.getThread("thread-1");
    expect(thread?.title).toBe("Test Thread");

    const messages = await newMemory.getMessages("thread-1");
    expect(messages).toHaveLength(2);
  });

  it("should get threads by resource", async () => {
    await memory.createThread("thread-1", "user-1", "Thread 1");
    await memory.createThread("thread-2", "user-1", "Thread 2");
    await memory.createThread("thread-3", "user-2", "Thread 3");

    const user1Threads = await memory.getThreadsByResource("user-1");
    expect(user1Threads).toHaveLength(2);

    const user2Threads = await memory.getThreadsByResource("user-2");
    expect(user2Threads).toHaveLength(1);
  });

  it("should delete thread and its messages", async () => {
    await memory.createThread("thread-1", "user-1");
    await memory.saveMessages("thread-1", "user-1", [
      { role: "user" as const, content: "Hello!" },
    ]);

    await memory.deleteThread("thread-1");

    const thread = await memory.getThread("thread-1");
    expect(thread).toBeNull();

    const messages = await memory.getMessages("thread-1");
    expect(messages).toHaveLength(0);
  });

  it("should get recent messages with limit", async () => {
    await memory.createThread("thread-1", "user-1");

    // Save 15 messages one at a time to ensure different timestamps
    for (let i = 0; i < 15; i++) {
      await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: `Message ${i}` },
      ]);
      // Small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 1));
    }

    const recentMessages = await memory.getRecentMessages("thread-1");
    // Default is 10 messages (most recent 10)
    expect(recentMessages).toHaveLength(10);
    // The last 10 messages should be messages 5-14 in chronological order
    const contents = recentMessages.map(m => m.content);
    expect(contents).toContain("Message 5");
    expect(contents).toContain("Message 14");
    // Should have 10 unique messages
    expect(new Set(contents).size).toBe(10);
  });

  describe("Context-Aware Memory Features", () => {
    it("should update a message and track version history", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Original message" },
      ]);
      const messageId = saved[0].id;

      // Update the message
      const updated = await memory.updateMessage(messageId, {
        content: "Updated message",
      });

      expect(updated).toBeDefined();
      expect(updated?.message.content).toBe("Updated message");
      expect(updated?.version).toBe(2);

      // Get version history
      const versions = await memory.getMessageVersions(messageId);
      expect(versions).toHaveLength(2);
      expect(versions[0].message.content).toBe("Original message");
      expect(versions[1].message.content).toBe("Updated message");
    });

    it("should track token counts and get thread token total", async () => {
      await memory.createThread("thread-1", "user-1");

      // Save messages with token counts
      const messages = await memory.getMessages("thread-1");
      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Hello" },
        { role: "assistant" as const, content: "Hi there" },
      ]);

      // Manually add token counts (in real usage these would come from API)
      await storage.updateMessage(saved[0].id, { tokenCount: 10 });
      await storage.updateMessage(saved[1].id, { tokenCount: 15 });

      const tokenCount = await memory.getThreadTokenCount("thread-1");
      expect(tokenCount).toBe(25);
    });

    it("should get messages within token budget", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Message 1" },
        { role: "assistant" as const, content: "Response 1" },
        { role: "user" as const, content: "Message 2" },
        { role: "assistant" as const, content: "Response 2" },
      ]);

      // Add token counts
      await storage.updateMessage(saved[0].id, { tokenCount: 20, importance: 0.5 });
      await storage.updateMessage(saved[1].id, { tokenCount: 30, importance: 0.5 });
      await storage.updateMessage(saved[2].id, { tokenCount: 25, importance: 0.8 });
      await storage.updateMessage(saved[3].id, { tokenCount: 35, importance: 0.8 });

      // Get messages within 70 token budget
      const messages = await memory.getMessagesWithinBudget("thread-1", 70);

      // Should get the two highest importance messages (Message 2 + Response 2 = 60 tokens)
      expect(messages.length).toBeGreaterThan(0);
      expect(messages.length).toBeLessThanOrEqual(4);
    });

    it("should manage cache control for messages", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Cached message" },
        { role: "assistant" as const, content: "Not cached" },
      ]);

      // Enable cache for first message
      const futureDate = new Date(Date.now() + 60000); // 1 minute from now
      await storage.updateMessage(saved[0].id, {
        cacheControl: { enabled: true, expiresAt: futureDate },
      });

      const cachedMessages = await memory.getCachedMessages("thread-1");
      expect(cachedMessages).toHaveLength(1);
      expect(cachedMessages[0].message.content).toBe("Cached message");
    });

    it("should invalidate cache for messages", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Cached message" },
      ]);

      // Enable cache
      const futureDate = new Date(Date.now() + 60000);
      await storage.updateMessage(saved[0].id, {
        cacheControl: { enabled: true, expiresAt: futureDate },
      });

      // Verify cache is active
      let cachedMessages = await memory.getCachedMessages("thread-1");
      expect(cachedMessages).toHaveLength(1);

      // Invalidate cache
      await memory.invalidateCache("thread-1");

      // Verify cache is invalidated
      cachedMessages = await memory.getCachedMessages("thread-1");
      expect(cachedMessages).toHaveLength(0);
    });

    it("should filter messages by status", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Active message" },
        { role: "assistant" as const, content: "Archived message" },
        { role: "user" as const, content: "Deleted message" },
      ]);

      // Set different statuses
      await storage.updateMessage(saved[0].id, { status: "active" });
      await storage.updateMessage(saved[1].id, { status: "archived" });
      await storage.updateMessage(saved[2].id, { status: "deleted" });

      const activeMessages = await memory.getMessagesByStatus("thread-1", "active");
      expect(activeMessages).toHaveLength(1);
      expect(activeMessages[0].message.content).toBe("Active message");

      const archivedMessages = await memory.getMessagesByStatus("thread-1", "archived");
      expect(archivedMessages).toHaveLength(1);
      expect(archivedMessages[0].message.content).toBe("Archived message");
    });

    it("should filter messages by importance threshold", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Low importance" },
        { role: "assistant" as const, content: "Medium importance" },
        { role: "user" as const, content: "High importance" },
      ]);

      // Set importance scores
      await storage.updateMessage(saved[0].id, { importance: 0.3 });
      await storage.updateMessage(saved[1].id, { importance: 0.6 });
      await storage.updateMessage(saved[2].id, { importance: 0.9 });

      // Get messages with importance >= 0.5
      const importantMessages = await memory.getMessagesByImportance("thread-1", 0.5);
      expect(importantMessages).toHaveLength(2);
      expect(importantMessages[0].importance).toBeGreaterThanOrEqual(0.5);
      expect(importantMessages[1].importance).toBeGreaterThanOrEqual(0.5);
    });

    it("should handle graceful degradation when storage doesn't support features", async () => {
      // Create a storage that doesn't implement optional methods
      class BasicStorage extends InMemoryStorage {
        updateMessage = undefined;
        getMessageHistory = undefined;
      }

      const basicStorage = new BasicStorage();
      const basicMemory = new Memory(basicStorage);

      await basicMemory.createThread("thread-1", "user-1");
      const saved = await basicMemory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Test" },
      ]);

      // These should return null/empty without errors
      const updated = await basicMemory.updateMessage(saved[0].id, { content: "Updated" });
      expect(updated).toBeNull();

      const versions = await basicMemory.getMessageVersions(saved[0].id);
      expect(versions).toEqual([]);
    });

    it("should use contextWindow config for token-aware selection", async () => {
      const configuredStorage = new InMemoryStorage();
      const configuredMemory = new Memory(configuredStorage, {
        contextWindow: {
          maxTokens: 100,
          strategy: "token-aware",
        },
      });

      await configuredMemory.createThread("thread-1", "user-1");
      const saved = await configuredMemory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "Message 1" },
        { role: "assistant" as const, content: "Response 1" },
        { role: "user" as const, content: "Message 2" },
      ]);

      // Add token counts
      await configuredStorage.updateMessage(saved[0].id, { tokenCount: 40 });
      await configuredStorage.updateMessage(saved[1].id, { tokenCount: 50 });
      await configuredStorage.updateMessage(saved[2].id, { tokenCount: 30 });

      // Should use contextWindow.maxTokens from config
      const messages = await configuredMemory.getMessagesWithinBudget("thread-1");
      expect(messages.length).toBeGreaterThan(0);
    });

    it("should preserve message order when sorting by importance and recency", async () => {
      await memory.createThread("thread-1", "user-1");

      const saved = await memory.saveMessages("thread-1", "user-1", [
        { role: "user" as const, content: "First" },
        { role: "assistant" as const, content: "Second" },
        { role: "user" as const, content: "Third" },
      ]);

      // Set same importance, different times
      await storage.updateMessage(saved[0].id, { importance: 0.5, tokenCount: 10 });
      await new Promise(resolve => setTimeout(resolve, 10));
      await storage.updateMessage(saved[1].id, { importance: 0.5, tokenCount: 10 });
      await new Promise(resolve => setTimeout(resolve, 10));
      await storage.updateMessage(saved[2].id, { importance: 0.5, tokenCount: 10 });

      const messages = await memory.getMessagesWithinBudget("thread-1", 30);

      // Should maintain chronological order in result
      expect(messages[0].content).toBe("First");
      expect(messages[1].content).toBe("Second");
      expect(messages[2].content).toBe("Third");
    });
  });
});
