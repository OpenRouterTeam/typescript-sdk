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
}

main().catch(console.error);
