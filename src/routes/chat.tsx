// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  component: Chat,
})
function Chat() {
  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}