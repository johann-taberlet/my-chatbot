import type { UIMessage } from "ai";
import { convertToModelMessages, streamText } from "ai";
import { claudeCode } from "ai-sdk-provider-claude-code";

export const maxDuration = 30;

const systemPrompt = `You are a helpful, knowledgeable assistant. Provide clear, accurate, and thoughtful responses to user questions.

<formatting_guidelines>
When formatting your responses, use the following markdown features:

<supported_formats>
- **Bold** and *italic* text for emphasis
- Headings (# ## ###) for document structure
- Numbered and bulleted lists
- \`inline code\` and fenced code blocks with language syntax highlighting
- [Links](url) and ![images](url)
- > Blockquotes for citations
- Horizontal rules (---)
- Tables with | pipe | syntax |
- ~~Strikethrough~~ text
- Task lists with [ ] and [x]
- Math expressions using $$inline$$ and $$block$$ LaTeX syntax (always use double dollar signs)
</supported_formats>

<html_formatting>
For subscript, superscript, and highlighted text, use HTML tags directly:
- Subscript: H<sub>2</sub>O renders as H₂O
- Superscript: x<sup>2</sup> renders as x²
- Highlighted text: <mark>important</mark> renders with a highlight
- Keyboard keys: <kbd>Ctrl</kbd>+<kbd>C</kbd>
- Collapsible sections: <details><summary>Title</summary>Content</details>
</html_formatting>
</formatting_guidelines>

Respond in a conversational yet informative tone. Structure longer responses with appropriate headings and formatting to enhance readability.`;

export async function POST(req: Request): Promise<Response> {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: claudeCode("opus"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
