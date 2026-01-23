import { createFileRoute } from '@tanstack/react-router';
import { BlogPost } from '@/components/BlogPost';

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams();
  
  // Example markdown content - replace this with your actual markdown loading logic
  const sampleMarkdown = `# Welcome to My Blog Post

This is a sample blog post demonstrating markdown rendering.

## Features

- **Bold text** and *italic text*
- Code blocks with syntax highlighting
- Lists and more!

## Code Example

Here's a code example:

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

## More Content

You can add:

- Bullet points
- Numbered lists
- [Links](https://example.com)
- Images
- And much more!

> This is a blockquote example.

\`\`\`javascript
const data = {
  name: "Blog Post",
  date: "2024-01-15"
};
\`\`\`
`;
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
      
        <BlogPost 
          content={sampleMarkdown}
          title="Sample Blog Post"
          date="January 15, 2024"
          author="Your Name"
        />
      </div>
    </div>
  );
}
