import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { cn } from '@/lib/utils';

interface BlogPostProps {
  content: string;
  title?: string;
  date?: string;
  author?: string;
  className?: string;
}

// Code block component - simplified for now
function CodeBlock({ 
  language, 
  code 
}: { 
  language: string; 
  code: string 
}) {
  // Simple code block without Shiki for now to ensure it works
  return (
    <pre className="rounded-lg bg-muted dark:bg-muted/50 p-4 overflow-x-auto my-4 border border-border">
      <code className={cn("text-sm font-mono text-foreground", language && `language-${language}`)}>
        {code}
      </code>
    </pre>
  );
}

export function BlogPost({ 
  content, 
  title, 
  date, 
  author, 
  className 
}: BlogPostProps) {
  if (!content) {
    return <div className="p-4 text-red-500">Error: No content provided</div>;
  }

  const markdownComponents: Components = {
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const code = String(children).replace(/\n$/, '');
      const isInline = !match; // If no language match, it's inline code
      
      return !isInline && match ? (
        <CodeBlock language={language} code={code} />
      ) : (
        <code className={cn("px-1.5 py-0.5 rounded bg-muted text-sm font-mono", className)} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ node, ...props }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3 text-foreground" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-2xl font-semibold mt-5 mb-2 text-foreground" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2 text-foreground" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-4 leading-7 text-foreground/90" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="leading-7 text-foreground/90" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote 
        className="border-l-4 border-primary pl-4 italic my-4 text-foreground/80" 
        {...props} 
      />
    ),
    a: ({ node, ...props }) => (
      <a 
        className="text-primary hover:underline underline-offset-4" 
        target="_blank"
        rel="noopener noreferrer"
        {...props} 
      />
    ),
    img: ({ node, ...props }) => (
      <img 
        className="rounded-lg my-4 w-full max-w-2xl mx-auto" 
        {...props} 
      />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-8 border-border" {...props} />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-muted" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="border border-border px-4 py-2" {...props} />
    ),
    pre: ({ node, ...props }) => (
      <pre className="mb-4" {...props} />
    ),
  };

  return (
    <article className={cn("prose prose-lg max-w-none", className)}>
      {(title || date || author) && (
        <header className="mb-8 pb-6 border-b border-border">
          {title && (
            <h1 className="text-4xl font-bold mb-2 text-foreground">{title}</h1>
          )}
          {(date || author) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {date && <time>{date}</time>}
              {author && <span>By {author}</span>}
            </div>
          )}
        </header>
      )}
      <div className="markdown-content text-foreground">
        <ReactMarkdown components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
