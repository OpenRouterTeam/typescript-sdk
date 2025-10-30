import { describe, it, expect, beforeEach } from "vitest";
import { OpenRouter, Memory, InMemoryStorage } from "../../src/index.js";

describe("Memory Integration E2E Tests", () => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  let memory: Memory;
  let client: OpenRouter;

  beforeEach(() => {
    memory = new Memory(new InMemoryStorage());
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

    // Serialize
    const state = await memory.serialize();
    expect(state.threads).toHaveLength(1);
    expect(state.messages).toHaveLength(1);
    expect(state.resources).toHaveLength(1);
    expect(state.threadWorkingMemories).toHaveLength(1);

    // Create new memory and hydrate
    const newMemory = new Memory(new InMemoryStorage());
    await newMemory.hydrate(state);

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

    const threadState = await memory.serializeThread("thread-1");
    expect(threadState).toBeDefined();
    expect(threadState?.thread.id).toBe("thread-1");
    expect(threadState?.messages).toHaveLength(2);

    // Hydrate into new memory
    const newMemory = new Memory(new InMemoryStorage());
    await newMemory.hydrateThread(threadState!);

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
});
