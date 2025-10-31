import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Memory } from '../../../src/lib/memory/memory';
import type { MemoryStorage } from '../../../src/lib/memory/storage/interface';
import type { Thread, MemoryMessage, Resource, GetMessagesOptions } from '../../../src/lib/memory/types';

describe('Memory', () => {
  let mockStorage: MemoryStorage;
  let memory: Memory;

  beforeEach(() => {
    // Create a mock storage with all required methods
    mockStorage = {
      saveThread: vi.fn(),
      getThread: vi.fn(),
      getThreadsByResource: vi.fn(),
      deleteThread: vi.fn(),
      saveMessages: vi.fn(),
      getMessages: vi.fn(),
      deleteMessages: vi.fn(),
      saveResource: vi.fn(),
      getResource: vi.fn(),
      deleteResource: vi.fn(),
      updateThreadWorkingMemory: vi.fn(),
      getThreadWorkingMemory: vi.fn(),
      updateResourceWorkingMemory: vi.fn(),
      getResourceWorkingMemory: vi.fn(),
      serialize: vi.fn(),
      serializeThread: vi.fn(),
      hydrate: vi.fn(),
      hydrateThread: vi.fn(),
      // Optional methods
      updateMessage: undefined,
      getMessageHistory: undefined,
      getThreadTokenCount: undefined,
      getMessagesByTokenBudget: undefined,
      invalidateCache: undefined,
      getMessagesByStatus: undefined,
    };

    memory = new Memory(mockStorage);
  });

  // ===== Constructor and Configuration =====
  describe('Constructor and Configuration', () => {
    it('should use default config when no config provided', () => {
      const mem = new Memory(mockStorage);
      const config = mem.getConfig();

      expect(config.maxHistoryMessages).toBe(10);
    });

    it('should apply partial config', () => {
      const mem = new Memory(mockStorage, { maxHistoryMessages: 20 });
      const config = mem.getConfig();

      expect(config.maxHistoryMessages).toBe(20);
    });

    it('should apply full config with contextWindow', () => {
      const mem = new Memory(mockStorage, {
        maxHistoryMessages: 15,
        contextWindow: { maxTokens: 1000 },
      });
      const config = mem.getConfig();

      expect(config.maxHistoryMessages).toBe(15);
      expect(config.contextWindow?.maxTokens).toBe(1000);
    });

    it('should return copy of config not reference', () => {
      const mem = new Memory(mockStorage);
      const config1 = mem.getConfig();
      const config2 = mem.getConfig();

      expect(config1).toEqual(config2);
      expect(config1).not.toBe(config2); // Different objects
    });

    it('should handle contextWindow undefined', () => {
      const mem = new Memory(mockStorage, { maxHistoryMessages: 10 });
      const config = mem.getConfig();

      expect(config.contextWindow).toBeUndefined();
    });

    it('should default maxHistoryMessages to 10', () => {
      const mem = new Memory(mockStorage, {});
      const config = mem.getConfig();

      expect(config.maxHistoryMessages).toBe(10);
    });
  });

  // ===== Thread Management =====
  describe('Thread Management', () => {
    describe('createThread', () => {
      it('should create thread with title', async () => {
        const mockThread: Thread = {
          id: 'thread-1',
          resourceId: 'user-1',
          title: 'Test Thread',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.saveThread).mockResolvedValue(mockThread);

        const result = await memory.createThread('thread-1', 'user-1', 'Test Thread');

        expect(result).toEqual(mockThread);
        expect(mockStorage.saveThread).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'thread-1',
            resourceId: 'user-1',
            title: 'Test Thread',
          })
        );
      });

      it('should create thread without title', async () => {
        const mockThread: Thread = {
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.saveThread).mockResolvedValue(mockThread);

        await memory.createThread('thread-1', 'user-1');

        expect(mockStorage.saveThread).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'thread-1',
            resourceId: 'user-1',
          })
        );
        // Should not have title property when undefined
        const call = vi.mocked(mockStorage.saveThread).mock.calls[0][0];
        expect(call).not.toHaveProperty('title');
      });

      it('should set timestamps correctly', async () => {
        const before = Date.now();

        vi.mocked(mockStorage.saveThread).mockImplementation(async (thread) => thread);

        await memory.createThread('thread-1', 'user-1');

        const after = Date.now();
        const call = vi.mocked(mockStorage.saveThread).mock.calls[0][0];

        expect(call.createdAt.getTime()).toBeGreaterThanOrEqual(before);
        expect(call.createdAt.getTime()).toBeLessThanOrEqual(after);
        expect(call.updatedAt.getTime()).toBeGreaterThanOrEqual(before);
        expect(call.updatedAt.getTime()).toBeLessThanOrEqual(after);
      });
    });

    describe('getThread', () => {
      it('should retrieve existing thread', async () => {
        const mockThread: Thread = {
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getThread).mockResolvedValue(mockThread);

        const result = await memory.getThread('thread-1');

        expect(result).toEqual(mockThread);
        expect(mockStorage.getThread).toHaveBeenCalledWith('thread-1');
      });

      it('should return null for non-existent thread', async () => {
        vi.mocked(mockStorage.getThread).mockResolvedValue(null);

        const result = await memory.getThread('non-existent');

        expect(result).toBeNull();
      });
    });

    describe('getThreadsByResource', () => {
      it('should retrieve threads for resource', async () => {
        const mockThreads: Thread[] = [
          {
            id: 'thread-1',
            resourceId: 'user-1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        vi.mocked(mockStorage.getThreadsByResource).mockResolvedValue(mockThreads);

        const result = await memory.getThreadsByResource('user-1');

        expect(result).toEqual(mockThreads);
        expect(mockStorage.getThreadsByResource).toHaveBeenCalledWith('user-1');
      });

      it('should return empty array when no threads', async () => {
        vi.mocked(mockStorage.getThreadsByResource).mockResolvedValue([]);

        const result = await memory.getThreadsByResource('user-1');

        expect(result).toEqual([]);
      });
    });

    describe('touchThread', () => {
      it('should update thread timestamp when thread exists', async () => {
        const mockThread: Thread = {
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getThread).mockResolvedValue(mockThread);
        vi.mocked(mockStorage.saveThread).mockResolvedValue(mockThread);

        await memory.touchThread('thread-1');

        expect(mockStorage.getThread).toHaveBeenCalledWith('thread-1');
        expect(mockStorage.saveThread).toHaveBeenCalled();

        const savedThread = vi.mocked(mockStorage.saveThread).mock.calls[0][0];
        expect(savedThread.updatedAt).toBeInstanceOf(Date);
      });

      it('should not save when thread doesnt exist', async () => {
        vi.mocked(mockStorage.getThread).mockResolvedValue(null);

        await memory.touchThread('non-existent');

        expect(mockStorage.getThread).toHaveBeenCalledWith('non-existent');
        expect(mockStorage.saveThread).not.toHaveBeenCalled();
      });
    });

    describe('deleteThread', () => {
      it('should call storage deleteThread', async () => {
        vi.mocked(mockStorage.deleteThread).mockResolvedValue();

        await memory.deleteThread('thread-1');

        expect(mockStorage.deleteThread).toHaveBeenCalledWith('thread-1');
      });
    });
  });

  // ===== Message Management =====
  describe('Message Management', () => {
    describe('saveMessages', () => {
      it('should generate UUIDs for messages', async () => {
        vi.mocked(mockStorage.saveMessages).mockResolvedValue();
        vi.mocked(mockStorage.getThread).mockResolvedValue({
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        vi.mocked(mockStorage.saveThread).mockImplementation(async (t) => t);

        await memory.saveMessages('thread-1', 'user-1', [
          { role: 'user', content: 'Hello' },
        ]);

        const call = vi.mocked(mockStorage.saveMessages).mock.calls[0][0];
        expect(call[0].id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i); // UUID v4 pattern
      });

      it('should set timestamps on messages', async () => {
        const before = Date.now();

        vi.mocked(mockStorage.saveMessages).mockResolvedValue();
        vi.mocked(mockStorage.getThread).mockResolvedValue({
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        vi.mocked(mockStorage.saveThread).mockImplementation(async (t) => t);

        await memory.saveMessages('thread-1', 'user-1', [
          { role: 'user', content: 'Hello' },
        ]);

        const after = Date.now();
        const call = vi.mocked(mockStorage.saveMessages).mock.calls[0][0];

        expect(call[0].createdAt.getTime()).toBeGreaterThanOrEqual(before);
        expect(call[0].createdAt.getTime()).toBeLessThanOrEqual(after);
      });

      it('should call touchThread after saving', async () => {
        vi.mocked(mockStorage.saveMessages).mockResolvedValue();
        vi.mocked(mockStorage.getThread).mockResolvedValue({
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        vi.mocked(mockStorage.saveThread).mockImplementation(async (t) => t);

        await memory.saveMessages('thread-1', 'user-1', [
          { role: 'user', content: 'Hello' },
        ]);

        expect(mockStorage.getThread).toHaveBeenCalledWith('thread-1');
        expect(mockStorage.saveThread).toHaveBeenCalled();
      });

      it('should handle empty array', async () => {
        vi.mocked(mockStorage.saveMessages).mockResolvedValue();
        vi.mocked(mockStorage.getThread).mockResolvedValue({
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        vi.mocked(mockStorage.saveThread).mockImplementation(async (t) => t);

        const result = await memory.saveMessages('thread-1', 'user-1', []);

        expect(result).toEqual([]);
        expect(mockStorage.saveMessages).toHaveBeenCalledWith([]);
      });

      it('should handle single message', async () => {
        vi.mocked(mockStorage.saveMessages).mockResolvedValue();
        vi.mocked(mockStorage.getThread).mockResolvedValue({
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        vi.mocked(mockStorage.saveThread).mockImplementation(async (t) => t);

        const result = await memory.saveMessages('thread-1', 'user-1', [
          { role: 'user', content: 'Hello' },
        ]);

        expect(result).toHaveLength(1);
        expect(result[0].message.content).toBe('Hello');
      });

      it('should handle multiple messages', async () => {
        vi.mocked(mockStorage.saveMessages).mockResolvedValue();
        vi.mocked(mockStorage.getThread).mockResolvedValue({
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        vi.mocked(mockStorage.saveThread).mockImplementation(async (t) => t);

        const result = await memory.saveMessages('thread-1', 'user-1', [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi' },
        ]);

        expect(result).toHaveLength(2);
      });
    });

    describe('getMessages', () => {
      it('should call storage getMessages without options', async () => {
        vi.mocked(mockStorage.getMessages).mockResolvedValue([]);

        await memory.getMessages('thread-1');

        expect(mockStorage.getMessages).toHaveBeenCalledWith('thread-1', undefined);
      });

      it('should call storage getMessages with options', async () => {
        const options: GetMessagesOptions = { limit: 5, offset: 10, order: 'desc' };
        vi.mocked(mockStorage.getMessages).mockResolvedValue([]);

        await memory.getMessages('thread-1', options);

        expect(mockStorage.getMessages).toHaveBeenCalledWith('thread-1', options);
      });
    });

    describe('getRecentMessages', () => {
      it('should reverse messages to chronological order', async () => {
        const mockMessages: MemoryMessage[] = [
          {
            id: 'msg-3',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Third' },
            createdAt: new Date(),
          },
          {
            id: 'msg-2',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'assistant', content: 'Second' },
            createdAt: new Date(),
          },
          {
            id: 'msg-1',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'First' },
            createdAt: new Date(),
          },
        ];

        vi.mocked(mockStorage.getMessages).mockResolvedValue(mockMessages);

        const result = await memory.getRecentMessages('thread-1');

        expect(result[0].content).toBe('First');
        expect(result[1].content).toBe('Second');
        expect(result[2].content).toBe('Third');
      });

      it('should map to Message type', async () => {
        const mockMessages: MemoryMessage[] = [
          {
            id: 'msg-1',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Hello' },
            createdAt: new Date(),
          },
        ];

        vi.mocked(mockStorage.getMessages).mockResolvedValue(mockMessages);

        const result = await memory.getRecentMessages('thread-1');

        expect(result[0]).toEqual({ role: 'user', content: 'Hello' });
        expect(result[0]).not.toHaveProperty('id');
        expect(result[0]).not.toHaveProperty('threadId');
      });

      it('should respect maxHistoryMessages config', async () => {
        const mem = new Memory(mockStorage, { maxHistoryMessages: 3 });
        vi.mocked(mockStorage.getMessages).mockResolvedValue([]);

        await mem.getRecentMessages('thread-1');

        expect(mockStorage.getMessages).toHaveBeenCalledWith('thread-1', {
          limit: 3,
          order: 'desc',
        });
      });
    });

    describe('deleteMessages', () => {
      it('should call storage deleteMessages', async () => {
        vi.mocked(mockStorage.deleteMessages).mockResolvedValue();

        await memory.deleteMessages(['msg-1', 'msg-2']);

        expect(mockStorage.deleteMessages).toHaveBeenCalledWith(['msg-1', 'msg-2']);
      });

      it('should handle empty array', async () => {
        vi.mocked(mockStorage.deleteMessages).mockResolvedValue();

        await memory.deleteMessages([]);

        expect(mockStorage.deleteMessages).toHaveBeenCalledWith([]);
      });
    });
  });

  // ===== Resource Management =====
  describe('Resource Management', () => {
    describe('createResource', () => {
      it('should set timestamps correctly', async () => {
        const before = Date.now();

        vi.mocked(mockStorage.saveResource).mockImplementation(async (resource) => resource);

        await memory.createResource('user-1');

        const after = Date.now();
        const call = vi.mocked(mockStorage.saveResource).mock.calls[0][0];

        expect(call.createdAt.getTime()).toBeGreaterThanOrEqual(before);
        expect(call.createdAt.getTime()).toBeLessThanOrEqual(after);
        expect(call.updatedAt.getTime()).toBeGreaterThanOrEqual(before);
        expect(call.updatedAt.getTime()).toBeLessThanOrEqual(after);
      });
    });

    describe('getResource', () => {
      it('should retrieve existing resource', async () => {
        const mockResource: Resource = {
          id: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getResource).mockResolvedValue(mockResource);

        const result = await memory.getResource('user-1');

        expect(result).toEqual(mockResource);
      });

      it('should return null for non-existent resource', async () => {
        vi.mocked(mockStorage.getResource).mockResolvedValue(null);

        const result = await memory.getResource('non-existent');

        expect(result).toBeNull();
      });
    });

    describe('deleteResource', () => {
      it('should call storage deleteResource', async () => {
        vi.mocked(mockStorage.deleteResource).mockResolvedValue();

        await memory.deleteResource('user-1');

        expect(mockStorage.deleteResource).toHaveBeenCalledWith('user-1');
      });
    });
  });

  // ===== Working Memory Management =====
  describe('Working Memory Management', () => {
    describe('Thread Working Memory', () => {
      it('should call storage updateThreadWorkingMemory', async () => {
        vi.mocked(mockStorage.updateThreadWorkingMemory).mockResolvedValue();

        await memory.updateThreadWorkingMemory('thread-1', { data: 'test' });

        expect(mockStorage.updateThreadWorkingMemory).toHaveBeenCalledWith('thread-1', { data: 'test' });
      });

      it('should call storage getThreadWorkingMemory', async () => {
        const workingMemory = {
          threadId: 'thread-1',
          data: { test: 'data' },
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getThreadWorkingMemory).mockResolvedValue(workingMemory);

        const result = await memory.getThreadWorkingMemory('thread-1');

        expect(result).toEqual(workingMemory);
        expect(mockStorage.getThreadWorkingMemory).toHaveBeenCalledWith('thread-1');
      });
    });

    describe('Resource Working Memory', () => {
      it('should call storage updateResourceWorkingMemory', async () => {
        vi.mocked(mockStorage.updateResourceWorkingMemory).mockResolvedValue();

        await memory.updateResourceWorkingMemory('user-1', { preferences: 'dark' });

        expect(mockStorage.updateResourceWorkingMemory).toHaveBeenCalledWith('user-1', { preferences: 'dark' });
      });

      it('should call storage getResourceWorkingMemory', async () => {
        const workingMemory = {
          resourceId: 'user-1',
          data: { preferences: 'dark' },
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getResourceWorkingMemory).mockResolvedValue(workingMemory);

        const result = await memory.getResourceWorkingMemory('user-1');

        expect(result).toEqual(workingMemory);
        expect(mockStorage.getResourceWorkingMemory).toHaveBeenCalledWith('user-1');
      });
    });
  });

  // ===== Enhanced Message Operations =====
  describe('Enhanced Message Operations', () => {
    describe('updateMessage', () => {
      it('should throw error when storage doesnt support updateMessage', async () => {
        await expect(memory.updateMessage('msg-1', { content: 'Updated' }))
          .rejects.toThrow('Message editing is not supported by this storage backend');
      });

      it('should call storage updateMessage when supported', async () => {
        const updatedMessage: MemoryMessage = {
          id: 'msg-1',
          threadId: 'thread-1',
          resourceId: 'user-1',
          message: { role: 'user', content: 'Updated' },
          createdAt: new Date(),
          version: 2,
        };

        mockStorage.updateMessage = vi.fn().mockResolvedValue(updatedMessage);

        const result = await memory.updateMessage('msg-1', { content: 'Updated' });

        expect(result).toEqual(updatedMessage);
        expect(mockStorage.updateMessage).toHaveBeenCalled();
      });

      it('should throw error when message not found', async () => {
        mockStorage.updateMessage = vi.fn().mockResolvedValue(null);

        await expect(memory.updateMessage('msg-1', { content: 'Updated' }))
          .rejects.toThrow('Message with ID "msg-1" not found');
      });

      it('should pass partial updates through', async () => {
        const updatedMessage: MemoryMessage = {
          id: 'msg-1',
          threadId: 'thread-1',
          resourceId: 'user-1',
          message: { role: 'user', content: 'Original' },
          createdAt: new Date(),
          importance: 0.9,
        };

        mockStorage.updateMessage = vi.fn().mockResolvedValue(updatedMessage);

        await memory.updateMessage('msg-1', { content: 'test' });

        expect(mockStorage.updateMessage).toHaveBeenCalledWith(
          'msg-1',
          expect.objectContaining({
            message: { content: 'test' },
          })
        );
      });
    });

    describe('getMessageVersions', () => {
      it('should throw error when storage doesnt support getMessageHistory', async () => {
        await expect(memory.getMessageVersions('msg-1'))
          .rejects.toThrow('Message version history is not supported by this storage backend');
      });

      it('should call storage getMessageHistory when supported', async () => {
        const versions: MemoryMessage[] = [
          {
            id: 'msg-1',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Original' },
            createdAt: new Date(),
            version: 1,
          },
          {
            id: 'msg-1',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Updated' },
            createdAt: new Date(),
            version: 2,
          },
        ];

        mockStorage.getMessageHistory = vi.fn().mockResolvedValue(versions);

        const result = await memory.getMessageVersions('msg-1');

        expect(result).toEqual(versions);
        expect(mockStorage.getMessageHistory).toHaveBeenCalledWith('msg-1');
      });
    });
  });

  // ===== Token-Aware Operations =====
  describe('Token-Aware Operations', () => {
    describe('getThreadTokenCount', () => {
      it('should throw error when storage doesnt support getThreadTokenCount', async () => {
        await expect(memory.getThreadTokenCount('thread-1'))
          .rejects.toThrow('Token counting is not supported by this storage backend');
      });

      it('should call storage getThreadTokenCount when supported', async () => {
        mockStorage.getThreadTokenCount = vi.fn().mockResolvedValue(150);

        const result = await memory.getThreadTokenCount('thread-1');

        expect(result).toBe(150);
        expect(mockStorage.getThreadTokenCount).toHaveBeenCalledWith('thread-1');
      });
    });

    describe('getMessagesWithinBudget', () => {
      it('should throw error when no maxTokens and no config', async () => {
        await expect(memory.getMessagesWithinBudget('thread-1'))
          .rejects.toThrow('Token budget not specified');
      });

      it('should use explicit maxTokens parameter', async () => {
        const messages: MemoryMessage[] = [
          {
            id: 'msg-1',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Hello' },
            createdAt: new Date(),
          },
        ];

        mockStorage.getMessagesByTokenBudget = vi.fn().mockResolvedValue(messages);

        const result = await memory.getMessagesWithinBudget('thread-1', 500);

        expect(mockStorage.getMessagesByTokenBudget).toHaveBeenCalledWith('thread-1', 500);
        expect(result).toHaveLength(1);
      });

      it('should use config contextWindow maxTokens', async () => {
        const mem = new Memory(mockStorage, {
          contextWindow: { maxTokens: 1000 },
        });

        mockStorage.getMessagesByTokenBudget = vi.fn().mockResolvedValue([]);

        await mem.getMessagesWithinBudget('thread-1');

        expect(mockStorage.getMessagesByTokenBudget).toHaveBeenCalledWith('thread-1', 1000);
      });

      it('should throw error when storage doesnt support token budget', async () => {
        const mem = new Memory(mockStorage, {
          contextWindow: { maxTokens: 1000 },
        });

        await expect(mem.getMessagesWithinBudget('thread-1'))
          .rejects.toThrow('Token-based message selection is not supported by this storage backend');
      });

      it('should map MemoryMessage to Message type', async () => {
        const memoryMessages: MemoryMessage[] = [
          {
            id: 'msg-1',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Hello' },
            createdAt: new Date(),
          },
        ];

        mockStorage.getMessagesByTokenBudget = vi.fn().mockResolvedValue(memoryMessages);

        const result = await memory.getMessagesWithinBudget('thread-1', 500);

        expect(result[0]).toEqual({ role: 'user', content: 'Hello' });
        expect(result[0]).not.toHaveProperty('id');
      });
    });
  });

  // ===== Cache Management =====
  describe('Cache Management', () => {
    describe('invalidateCache', () => {
      it('should be no-op when storage doesnt support invalidateCache', async () => {
        await expect(memory.invalidateCache('thread-1')).resolves.not.toThrow();
      });

      it('should call storage invalidateCache when supported', async () => {
        mockStorage.invalidateCache = vi.fn().mockResolvedValue();

        await memory.invalidateCache('thread-1');

        expect(mockStorage.invalidateCache).toHaveBeenCalledWith('thread-1', undefined);
      });

      it('should pass beforeDate parameter', async () => {
        const beforeDate = new Date();
        mockStorage.invalidateCache = vi.fn().mockResolvedValue();

        await memory.invalidateCache('thread-1', beforeDate);

        expect(mockStorage.invalidateCache).toHaveBeenCalledWith('thread-1', beforeDate);
      });

      it('should work without beforeDate parameter', async () => {
        mockStorage.invalidateCache = vi.fn().mockResolvedValue();

        await memory.invalidateCache('thread-1');

        expect(mockStorage.invalidateCache).toHaveBeenCalledWith('thread-1', undefined);
      });
    });
  });

  // ===== Filtered Retrieval =====
  describe('Filtered Retrieval', () => {
    describe('getMessagesByStatus', () => {
      const mockMessages: MemoryMessage[] = [
        {
          id: 'msg-active',
          threadId: 'thread-1',
          resourceId: 'user-1',
          message: { role: 'user', content: 'Active' },
          createdAt: new Date(),
          status: 'active',
        },
        {
          id: 'msg-archived',
          threadId: 'thread-1',
          resourceId: 'user-1',
          message: { role: 'user', content: 'Archived' },
          createdAt: new Date(),
          status: 'archived',
        },
      ];

      it('should call storage getMessagesByStatus when supported', async () => {
        mockStorage.getMessagesByStatus = vi.fn().mockResolvedValue([mockMessages[0]]);

        const result = await memory.getMessagesByStatus('thread-1', 'active');

        expect(result).toHaveLength(1);
        expect(result[0].status).toBe('active');
        expect(mockStorage.getMessagesByStatus).toHaveBeenCalledWith('thread-1', 'active');
      });

      it('should fallback to filtering when storage doesnt support it', async () => {
        vi.mocked(mockStorage.getMessages).mockResolvedValue(mockMessages);

        const result = await memory.getMessagesByStatus('thread-1', 'active');

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('msg-active');
        expect(mockStorage.getMessages).toHaveBeenCalledWith('thread-1');
      });

      it('should correctly filter archived status in fallback', async () => {
        vi.mocked(mockStorage.getMessages).mockResolvedValue(mockMessages);

        const result = await memory.getMessagesByStatus('thread-1', 'archived');

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('msg-archived');
      });

      it('should correctly filter deleted status in fallback', async () => {
        const messagesWithDeleted: MemoryMessage[] = [
          ...mockMessages,
          {
            id: 'msg-deleted',
            threadId: 'thread-1',
            resourceId: 'user-1',
            message: { role: 'user', content: 'Deleted' },
            createdAt: new Date(),
            status: 'deleted',
          },
        ];

        vi.mocked(mockStorage.getMessages).mockResolvedValue(messagesWithDeleted);

        const result = await memory.getMessagesByStatus('thread-1', 'deleted');

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('msg-deleted');
      });
    });
  });

  // ===== Utility Methods =====
  describe('Utility Methods', () => {
    describe('ensureThread', () => {
      it('should return existing thread when it exists', async () => {
        const mockThread: Thread = {
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getThread).mockResolvedValue(mockThread);

        const result = await memory.ensureThread('thread-1', 'user-1');

        expect(result).toEqual(mockThread);
        expect(mockStorage.getThread).toHaveBeenCalledWith('thread-1');
        expect(mockStorage.saveThread).not.toHaveBeenCalled();
      });

      it('should create new thread when it doesnt exist', async () => {
        const newThread: Thread = {
          id: 'thread-1',
          resourceId: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getThread).mockResolvedValue(null);
        vi.mocked(mockStorage.saveThread).mockResolvedValue(newThread);

        const result = await memory.ensureThread('thread-1', 'user-1');

        expect(result).toEqual(newThread);
        expect(mockStorage.getThread).toHaveBeenCalledWith('thread-1');
        expect(mockStorage.saveThread).toHaveBeenCalled();
      });
    });

    describe('ensureResource', () => {
      it('should return existing resource when it exists', async () => {
        const mockResource: Resource = {
          id: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getResource).mockResolvedValue(mockResource);

        const result = await memory.ensureResource('user-1');

        expect(result).toEqual(mockResource);
        expect(mockStorage.getResource).toHaveBeenCalledWith('user-1');
        expect(mockStorage.saveResource).not.toHaveBeenCalled();
      });

      it('should create new resource when it doesnt exist', async () => {
        const newResource: Resource = {
          id: 'user-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        vi.mocked(mockStorage.getResource).mockResolvedValue(null);
        vi.mocked(mockStorage.saveResource).mockResolvedValue(newResource);

        const result = await memory.ensureResource('user-1');

        expect(result).toEqual(newResource);
        expect(mockStorage.getResource).toHaveBeenCalledWith('user-1');
        expect(mockStorage.saveResource).toHaveBeenCalled();
      });
    });
  });
});
