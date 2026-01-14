import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { createFileRoute } from '@tanstack/react-router';
import { openrouter } from '@/lib/openrouter';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages }: { messages: UIMessage[] } = await request.json();

        const result = streamText({
          model: openrouter.chat('openai/gpt-4o-mini'),
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse();
      },
    },
  },
});