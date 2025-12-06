# API Contract: Chat Endpoint

**Feature Branch**: `001-ai-chatbot`
**Date**: 2025-12-06

## POST /api/chat

Sends messages to the AI and receives a streaming response.

### Request

**Headers**:
```
Content-Type: application/json
```

**Body**:
```typescript
{
  messages: UIMessage[]
}
```

**UIMessage Schema**:
```typescript
interface UIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: Array<{
    type: 'text' | 'reasoning' | 'tool-call' | 'tool-result';
    text?: string;
    [key: string]: unknown;
  }>;
  createdAt?: Date;
}
```

**Example Request Body**:
```json
{
  "messages": [
    {
      "id": "msg_1",
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "Hello, how are you?"
        }
      ]
    }
  ]
}
```

### Response

**Success (200 OK)**:
- Returns a streaming response using the UI Message Stream Protocol
- Content-Type: `text/plain; charset=utf-8` (streaming)
- Transfer-Encoding: `chunked`

**Stream Format**:
The response follows the AI SDK UI Message Stream Protocol, sending newline-delimited JSON chunks.

**Example Stream Chunks**:
```
0:"Hello"
0:", I"
0:"'m doing"
0:" well"
0:"!"
e:{"finishReason":"stop","usage":{"inputTokens":10,"outputTokens":8}}
d:{"finishReason":"stop"}
```

### Error Responses

**500 Internal Server Error**:
- AI service unavailable
- Authentication error (Claude Code CLI not authenticated)

**Example Error**:
```json
{
  "error": "Authentication failed. Please run 'claude login'."
}
```

### Configuration

**Max Duration**: 30 seconds (streaming timeout)

```typescript
export const maxDuration = 30;
```

### Implementation Notes

1. Messages are converted using `convertToModelMessages()` before passing to the model
2. Streaming is handled by `streamText()` and `toUIMessageStreamResponse()`
3. The endpoint uses the Claude Code CLI under the hood via `claudeCode('sonnet')`
