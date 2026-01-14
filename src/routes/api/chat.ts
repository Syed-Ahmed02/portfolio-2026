import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { createFileRoute } from '@tanstack/react-router';
import { openrouter } from '@/lib/openrouter';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages }: { messages: UIMessage[] } = await request.json();

        const result = streamText({
          model: openrouter.chat('tngtech/tng-r1t-chimera:free'),
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse();
      },
    },
  },
});