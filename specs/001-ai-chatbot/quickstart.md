# Quickstart: AI Chatbot Page

**Feature Branch**: `001-ai-chatbot`
**Date**: 2025-12-06

## Prerequisites

Before implementing this feature, ensure you have:

1. **Claude Code CLI installed and authenticated**:
   ```bash
   npm install -g @anthropic-ai/claude-code
   claude login
   ```

2. **Node.js 18+ and Bun installed**

3. **Project dependencies installed**:
   ```bash
   bun install
   ```

## Setup Steps

### 1. Install AI SDK Dependencies

```bash
# Core AI SDK packages
bun add ai @ai-sdk/react

# Claude Code provider
bun add ai-sdk-provider-claude-code
```

### 2. Install AI Elements Components

```bash
# Initialize shadcn if not already done
npx shadcn@latest init

# Install AI Elements
npx ai-elements@latest
```

When prompted, select components:
- conversation
- message
- prompt-input

### 3. Add Required CSS

In `src/app/globals.css`, add:
```css
@source "../node_modules/streamdown/dist/index.js";
```

### 4. Create API Route

Create `src/app/api/chat/route.ts`:

```typescript
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: claudeCode('sonnet'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

### 5. Create Chat Page

Update `src/app/page.tsx`:

```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  Input,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-12" />}
              title="Start a conversation"
              description="Type a message below to begin chatting"
            />
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return (
                        <MessageResponse key={`${message.id}-${i}`}>
                          {part.text}
                        </MessageResponse>
                      );
                    }
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <form onSubmit={handleSubmit} className="mt-4 relative">
        <PromptInputTextarea
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.currentTarget.value)}
          className="pr-12"
        />
        <PromptInputSubmit
          status={status === 'streaming' ? 'streaming' : 'ready'}
          disabled={!input.trim()}
          className="absolute bottom-1 right-1"
        />
      </form>
    </div>
  );
}
```

### 6. Run Development Server

```bash
bun dev
```

Open http://localhost:3000 to see your chatbot.

## Verification Checklist

- [ ] Claude Code CLI is authenticated (`claude --version` works)
- [ ] AI Elements components are installed in `src/components/ai-elements/`
- [ ] API route at `/api/chat` responds to POST requests
- [ ] Messages appear in the conversation thread
- [ ] AI responses stream in real-time
- [ ] Empty state shows when no messages exist
- [ ] Submit is disabled when input is empty

## Common Issues

### "Authentication failed"
Run `claude login` to authenticate the Claude Code CLI.

### Components not found
Ensure AI Elements are installed: `npx ai-elements@latest`

### Streaming not working
Check that `maxDuration` is set in the API route and the response uses `toUIMessageStreamResponse()`.
