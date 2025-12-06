import type { UIMessage } from "ai";
import { convertToModelMessages, streamText } from "ai";
import { claudeCode } from "ai-sdk-provider-claude-code";

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: claudeCode("sonnet"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
