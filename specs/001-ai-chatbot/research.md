# Research: AI Chatbot Page

**Feature Branch**: `001-ai-chatbot`
**Date**: 2025-12-06

## Technology Decisions

### 1. AI SDK Version

**Decision**: Use AI SDK v5 (latest stable)

**Rationale**:
- V5 provides the latest streaming patterns with `toUIMessageStreamResponse()`
- Better integration with `useChat` hook and `sendMessage` API
- Improved token usage properties (`inputTokens`, `outputTokens`, `totalTokens`)
- The ai-sdk-provider-claude-code package supports both v4 and v5

**Alternatives Considered**:
- AI SDK v4: Older patterns, less optimal streaming API

### 2. Claude Code Provider Package

**Decision**: Use `ai-sdk-provider-claude-code` (community package)

**Rationale**:
- Official integration for using Claude via the Claude Code CLI
- Supports streaming via `streamText()`
- Provides `claudeCode()` model factory with model selection (opus, sonnet, haiku)
- Authentication handled automatically through Claude Code CLI

**Key Usage Pattern**:
```typescript
import { streamText } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';

const result = streamText({
  model: claudeCode('sonnet'),
  prompt: 'Hello',
});

return result.toUIMessageStreamResponse();
```

**Alternatives Considered**:
- Direct Anthropic API: Would require managing API keys separately; not aligned with Claude Code CLI approach
- @ai-sdk/anthropic: Standard provider but doesn't use Claude Code CLI

### 3. Authentication Approach

**Decision**: Use Claude Code CLI authentication (no explicit OAuth token in env file needed)

**Rationale**:
- The ai-sdk-provider-claude-code uses the Claude Code CLI under the hood
- Authentication is handled by running `claude login` once on the development machine
- No API keys or OAuth tokens need to be stored in `.env.local`
- The CLI manages token refresh automatically

**Prerequisites**:
1. Install Claude Code CLI globally: `npm install -g @anthropic-ai/claude-code`
2. Authenticate: `claude login`
3. Verify: The CLI handles all authentication thereafter

**Alternatives Considered**:
- ANTHROPIC_API_KEY environment variable: Not needed when using Claude Code provider

### 4. AI Elements Components

**Decision**: Use Vercel AI Elements from shadcn.io registry

**Rationale**:
- Pre-built, accessible components designed for AI chat interfaces
- Built on shadcn/ui with Tailwind CSS styling
- Components include: Conversation, Message, PromptInput
- Seamless integration with AI SDK's `useChat` hook

**Installation**:
```bash
npx ai-elements@latest
# Or individual components:
npx shadcn@latest add https://registry.ai-sdk.dev/conversation.json
npx shadcn@latest add https://registry.ai-sdk.dev/message.json
npx shadcn@latest add https://registry.ai-sdk.dev/prompt-input.json
```

**Required CSS Import** (in globals.css):
```css
@source "../node_modules/streamdown/dist/index.js";
```

**Alternatives Considered**:
- Custom components: More work, less accessible by default
- shadcn.io/ai premium components: Requires purchase, more features than needed

### 5. Frontend Hook Pattern

**Decision**: Use `useChat` hook from `@ai-sdk/react`

**Rationale**:
- Built-in state management for messages
- Handles streaming automatically
- Provides `sendMessage`, `messages`, `status` for UI integration
- Works seamlessly with AI Elements components

**Usage Pattern**:
```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };
  // ...
}
```

**Alternatives Considered**:
- Custom fetch + useState: More boilerplate, no streaming handling

### 6. API Route Structure

**Decision**: Single `/api/chat/route.ts` endpoint

**Rationale**:
- Simple route structure following Next.js App Router conventions
- Handles POST requests with message array
- Returns streaming response via `toUIMessageStreamResponse()`

**Implementation Pattern**:
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

**Alternatives Considered**:
- Multiple endpoints: Unnecessary complexity for this feature

## Dependencies to Install

```bash
# AI SDK core
bun add ai @ai-sdk/react

# Claude Code provider
bun add ai-sdk-provider-claude-code

# AI Elements (installed via CLI, includes shadcn dependencies)
npx ai-elements@latest

# Additional dependencies that may be installed by AI Elements
bun add use-stick-to-bottom lucide-react
```

## Error Handling Patterns

```typescript
import {
  isAuthenticationError,
  isTimeoutError,
  getErrorMetadata
} from 'ai-sdk-provider-claude-code';

try {
  // AI SDK call
} catch (error) {
  if (isAuthenticationError(error)) {
    console.error('Please run: claude login');
  } else if (isTimeoutError(error)) {
    console.error('Request timed out');
  } else {
    const metadata = getErrorMetadata(error);
    console.error('Error:', metadata);
  }
}
```

## Environment Setup

No `.env.local` entries required for authentication when using Claude Code CLI.

Optional environment variables for customization:
```env
# Optional: Override Claude model (default uses 'sonnet')
# CLAUDE_MODEL=opus
```

## Key Implementation Notes

1. **React Compiler Compatibility**: Since the project uses React Compiler, do NOT use `useMemo`, `useCallback`, or `memo` - the compiler handles optimizations automatically.

2. **Streaming CSS**: Must add streamdown CSS import for proper markdown rendering in AI responses.

3. **Message Parts**: AI SDK v5 uses `message.parts` array instead of `message.content` string. Each part has a `type` (text, reasoning, tool-call, etc.).

4. **Status Handling**: The `status` from `useChat` can be 'streaming', 'ready', or 'error' - use for UI feedback.
