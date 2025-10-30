/**
 * Memory System Usage Example
 *
 * This example demonstrates how to use the memory system in the OpenRouter SDK
 * to maintain conversation history across multiple API calls.
 */

import { OpenRouter, Memory, InMemoryStorage } from "@openrouter/sdk";

async function main() {
  // Create storage instance
  const storage = new InMemoryStorage();

  // Create a memory instance with the storage
  const memory = new Memory(storage, {
    maxHistoryMessages: 10,  // Keep last 10 messages in context
    autoInject: true,        // Automatically inject history
    autoSave: true,          // Automatically save messages
  });

  // Create OpenRouter client with memory
  const client = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    memory,
  } as any);

  // Example 1: Basic conversation with automatic history management
  console.log("\n=== Example 1: Basic Conversation ===");

  const threadId = "conversation-123";
  const userId = "user-456";

  // First message
  const response1 = client.getResponse({
    model: "meta-llama/llama-3.2-1b-instruct",
    input: "My name is Alice.",
    threadId,
    resourceId: userId,
  });
  const text1 = await response1.text;
  console.log("AI Response:", text1);

  // Second message - history is automatically injected
  const response2 = client.getResponse({
    model: "meta-llama/llama-3.2-1b-instruct",
    input: "What's my name?",
    threadId,
    resourceId: userId,
  });
  const text2 = await response2.text;
  console.log("AI Response:", text2); // Should remember the name is Alice


  const userThreads = await memory.getThreadsByResource(userId);
  console.log(`User has ${userThreads.length} threads:`,
    userThreads.map(t => ({ id: t.id, title: t.title })));

  // Example 5: Serialization and persistence
  console.log("\n=== Example 5: Serialization ===");

  // Serialize entire memory state using storage
  const memoryState = await storage.serialize();
  console.log("Serialized state:", {
    threads: memoryState.threads.length,
    messages: memoryState.messages.length,
    resources: memoryState.resources.length,
  });

  // You can save this to a file or database
  // For example: fs.writeFileSync('memory-state.json', JSON.stringify(memoryState));

  // Later, you can restore the state
  const newStorage = new InMemoryStorage();
  await newStorage.hydrate(memoryState);
  const newMemory = new Memory(newStorage);
  console.log("Memory restored successfully!");

  // Example 6: Serialize a single thread
  const threadState = await storage.serializeThread(threadId);
  if (threadState) {
    console.log("Thread state:", {
      threadId: threadState.thread.id,
      messageCount: threadState.messages.length,
      hasWorkingMemory: !!threadState.threadWorkingMemory,
    });
  }

  // Example 7: Retrieve conversation history
  console.log("\n=== Example 7: Retrieve History ===");

  const allMessages = await memory.getMessages(threadId);
  console.log(`Thread has ${allMessages.length} messages:`);
  allMessages.forEach((msg, i) => {
    console.log(`  ${i + 1}. ${msg.message.role}: ${msg.message.content}`);
  });

  // Example 8: Configuration options
  console.log("\n=== Example 8: Memory Configuration ===");

  const config = memory.getConfig();
  console.log("Memory config:", config);

  // You can create memory with custom config
  const customMemory = new Memory(new InMemoryStorage(), {
    maxHistoryMessages: 20,  // Keep more history
    autoInject: true,
    autoSave: true,
  });
  console.log("Custom memory config:", customMemory.getConfig());

  // Example 9: Token-aware memory management
  console.log("\n=== Example 9: Token-Aware Features ===");

  const tokenStorage = new InMemoryStorage();
  const tokenMemory = new Memory(tokenStorage, {
    maxHistoryMessages: 10,
    autoInject: true,
    autoSave: true,
    contextWindow: {
      maxTokens: 1000,
      strategy: "token-aware",
    },
    trackTokenUsage: true,
  });

  const tokenThreadId = "token-thread-1";
  await tokenMemory.createThread(tokenThreadId, userId);

  // Save messages with token counts (in real usage, these would come from API responses)
  const savedMsgs = await tokenMemory.saveMessages(tokenThreadId, userId, [
    { role: "user" as const, content: "Tell me about AI" },
    { role: "assistant" as const, content: "AI is artificial intelligence..." },
  ]);

  // Manually set token counts (in production, these would be from API)
  await tokenStorage.updateMessage(savedMsgs[0].id, {
    tokenCount: 50,
    importance: 0.8
  });
  await tokenStorage.updateMessage(savedMsgs[1].id, {
    tokenCount: 150,
    importance: 0.9
  });

  // Get total token count for thread
  const totalTokens = await tokenMemory.getThreadTokenCount(tokenThreadId);
  console.log(`Total tokens in thread: ${totalTokens}`);

  // Get messages within token budget
  const budgetedMessages = await tokenMemory.getMessagesWithinBudget(tokenThreadId, 500);
  console.log(`Messages within 500 token budget: ${budgetedMessages.length}`);

  // Example 10: Message editing with version history
  console.log("\n=== Example 10: Message Editing ===");

  const editThreadId = "edit-thread-1";
  await memory.createThread(editThreadId, userId);

  const [originalMsg] = await memory.saveMessages(editThreadId, userId, [
    { role: "user" as const, content: "Original message content" },
  ]);

  console.log("Original message:", originalMsg.message.content);

  // Edit the message
  const updatedMsg = await memory.updateMessage(originalMsg.id, {
    content: "Updated message content",
  });

  if (updatedMsg) {
    console.log("Updated message:", updatedMsg.message.content);
    console.log("Version:", updatedMsg.version);

    // Get version history
    const versions = await memory.getMessageVersions(originalMsg.id);
    console.log(`Message has ${versions.length} versions`);
    versions.forEach((v) => {
      console.log(`  v${v.version || 1}: ${v.message.content}`);
    });
  }

  // Example 11: Cache management
  console.log("\n=== Example 11: Cache Management ===");

  const cacheThreadId = "cache-thread-1";
  await memory.createThread(cacheThreadId, userId);

  const [cacheMsg] = await memory.saveMessages(cacheThreadId, userId, [
    { role: "system" as const, content: "System prompt that should be cached" },
  ]);

  // Enable caching for this message (e.g., for provider-level prompt caching)
  const futureDate = new Date(Date.now() + 3600000); // 1 hour from now
  await storage.updateMessage(cacheMsg.id, {
    cacheControl: { enabled: true, expiresAt: futureDate },
  });

  console.log(`Cache control enabled for message: ${cacheMsg.id}`);

  // Invalidate cache when needed
  await memory.invalidateCache(cacheThreadId);
  console.log(`Cache invalidated for thread: ${cacheThreadId}`);

  // Example 12: Message filtering by status and importance
  console.log("\n=== Example 12: Message Filtering ===");

  const filterThreadId = "filter-thread-1";
  await memory.createThread(filterThreadId, userId);

  const filterMsgs = await memory.saveMessages(filterThreadId, userId, [
    { role: "user" as const, content: "Important message" },
    { role: "assistant" as const, content: "Normal response" },
    { role: "user" as const, content: "Low priority message" },
  ]);

  // Set different statuses and importance
  await storage.updateMessage(filterMsgs[0].id, {
    status: "active",
    importance: 0.9
  });
  await storage.updateMessage(filterMsgs[1].id, {
    status: "active",
    importance: 0.5
  });
  await storage.updateMessage(filterMsgs[2].id, {
    status: "archived",
    importance: 0.2
  });

  // Filter by status
  const activeMsgs = await memory.getMessagesByStatus(filterThreadId, "active");
  console.log(`Active messages: ${activeMsgs.length}`);

  const archivedMsgs = await memory.getMessagesByStatus(filterThreadId, "archived");
  console.log(`Archived messages: ${archivedMsgs.length}`);
}

main().catch(console.error);
