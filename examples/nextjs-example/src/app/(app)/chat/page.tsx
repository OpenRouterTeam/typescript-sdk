'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApiKey } from '@/lib/hooks/use-api-key';
import { useOpenRouter } from '@/lib/hooks/use-openrouter-client';
import { Message as OpenRouterMessageRequest } from '@openrouter/sdk/models';
import { Bot, MessageSquare, Send, Settings, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NotConnectedDialog } from './_dialogs/not-connected';

type Message = OpenRouterMessageRequest & {
  id: string;
  created?: number;
};

export default function Page() {
  const { client: openRouter } = useOpenRouter();
  const [apiKey] = useApiKey();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        "Hello! I'm your AI assistant powered by OpenRouter. I can help you with a wide variety of tasks. What would you like to know or discuss today?",
    },
  ]);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [
    messages,
  ]);

  const handleSend = async () => {
    const input = inputRef.current?.value;
    if (!input) return;

    setIsLoading(true);

    if (!input.trim() || isLoading) return;

    const userMessage: OpenRouterMessageRequest = {
      role: 'user',
      content: input,
    };

    const updatedMessages: Message[] = [
      ...messages,
      {
        id: crypto.randomUUID(),
        created: Date.now(),
        ...userMessage,
      },
    ];

    setMessages(updatedMessages);
    inputRef.current!.value = '';

    // Add an empty assistant message to stream into
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      created: Date.now(),
    };

    setMessages((prev) => [
      ...prev,
      assistantMessage,
    ]);

    if (!apiKey) {
      throw new Error('API key is required but not present.');
    }

    const result = await openRouter.chat.send({
      model: 'openai/gpt-4o',
      maxTokens: 1000,
      messages: updatedMessages,
      stream: true,
    });

    // Stream chunks into the latest message
    const chunks: string[] = [];
    for await (const chunk of result) {
      chunks.push(chunk.choices[0].delta.content || '');
      setMessages((prev) => {
        const newMessages = [
          ...prev,
        ];
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = chunks.join('');
        }

        return newMessages;
      });
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <NotConnectedDialog open={!apiKey} />
      <div className='flex flex-col h-screen bg-background'>
        {/* Header */}
        <div className='border-b border-border bg-card'>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <MessageSquare className='h-6 w-6 text-primary' />
                <h1 className='text-xl font-semibold'>AI Chat</h1>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger className='w-40'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt-4'>GPT-4</SelectItem>
                  <SelectItem value='gpt-3.5-turbo'>GPT-3.5 Turbo</SelectItem>
                  <SelectItem value='claude-3'>Claude 3</SelectItem>
                  <SelectItem value='gemini-pro'>Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant='ghost'
                size='icon'
              >
                <Settings className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto'>
          {messages.map((message) => {
            const isIncomingMessage =
              message.role === 'assistant' && message === messages.at(-1) && isLoading;

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                      <Bot className='h-4 w-4 text-primary' />
                    </div>
                  </div>
                )}

                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <Card
                    className={`p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-card'}`}
                  >
                    <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                      {message.content?.toString() || (isIncomingMessage ? '...' : '')}
                    </p>
                  </Card>
                  <span className='text-xs text-muted-foreground'>
                    {message.created && new Date(message.created).toLocaleString()}
                  </span>
                </div>

                {message.role === 'user' && (
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-secondary flex items-center justify-center'>
                      <User className='h-4 w-4 text-secondary-foreground' />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='border-border bg-card p-4 max-w-4xl mx-auto w-full'>
          <div className='flex gap-2'>
            <Input
              ref={inputRef}
              onKeyPress={handleKeyPress}
              placeholder='Type your message...'
              className='flex-1'
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading}
              size='icon'
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
          <p className='text-xs text-muted-foreground mt-2 text-center'>
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
}
