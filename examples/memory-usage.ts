/**
 * Memory System Usage Example
 *
 * This example demonstrates how to use the memory system in the OpenRouter SDK
 * to maintain conversation history across multiple API calls.
 */

import { OpenRouter, Memory, InMemoryStorage } from "@openrouter/sdk";

async function main() {
  // Create a memory instance with in-memory storage
  const memory = new Memory(new InMemoryStorage(), {
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
    input: [{ role: "user", content: "My name is Alice." }],
    threadId,
    resourceId: userId,
  });
  const text1 = await response1.text;
  console.log("Assistant:", text1);

  // Second message - history is automatically injected
  const response2 = client.getResponse({
    model: "meta-llama/llama-3.2-1b-instruct",
    input: [{ role: "user", content: "What's my name?" }],
    threadId,
    resourceId: userId,
  });
  const text2 = await response2.text;
  console.log("Assistant:", text2); // Should remember the name is Alice

  // Example 2: Working with thread working memory
  console.log("\n=== Example 2: Thread Working Memory ===");

  await memory.updateThreadWorkingMemory(threadId, {
    topic: "Introduction",
    lastActivity: new Date().toISOString(),
    messageCount: 2,
  });

  const threadMemory = await memory.getThreadWorkingMemory(threadId);
  console.log("Thread working memory:", threadMemory?.data);

  // Example 3: Working with resource (user) working memory
  console.log("\n=== Example 3: Resource Working Memory ===");

  await memory.updateResourceWorkingMemory(userId, {
    name: "Alice",
    preferences: {
      theme: "dark",
      language: "en",
    },
    createdAt: new Date().toISOString(),
  });

  const userMemory = await memory.getResourceWorkingMemory(userId);
  console.log("User working memory:", userMemory?.data);

  // Example 4: Managing multiple threads for a user
  console.log("\n=== Example 4: Multiple Threads ===");

  const thread2Id = "conversation-789";
  await memory.createThread(thread2Id, userId, "Second Conversation");
  await memory.saveMessages(thread2Id, userId, [
    { role: "user", content: "Hello from second thread!" },
  ]);

  const userThreads = await memory.getThreadsByResource(userId);
  console.log(`User has ${userThreads.length} threads:`,
    userThreads.map(t => ({ id: t.id, title: t.title })));

  // Example 5: Serialization and persistence
  console.log("\n=== Example 5: Serialization ===");

  // Serialize entire memory state
  const memoryState = await memory.serialize();
  console.log("Serialized state:", {
    threads: memoryState.threads.length,
    messages: memoryState.messages.length,
    resources: memoryState.resources.length,
  });

  // You can save this to a file or database
  // For example: fs.writeFileSync('memory-state.json', JSON.stringify(memoryState));

  // Later, you can restore the state
  const newMemory = new Memory(new InMemoryStorage());
  await newMemory.hydrate(memoryState);
  console.log("Memory restored successfully!");

  // Example 6: Serialize a single thread
  const threadState = await memory.serializeThread(threadId);
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
}

main().catch(console.error);
