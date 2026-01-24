import { format } from 'date-fns';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getAllPosts } from '@/lib/api';

export const Route = createFileRoute('/posts/')({
  loader: () => {
    const posts = getAllPosts();
    return { posts };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { posts } = Route.useLoaderData();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts found.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              let formattedDate = '';
              try {
                if (post.date) {
                  formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
                }
              } catch {
                // Invalid date, leave formattedDate empty
              }
              
              const authorName = post.author.name;
              
              return (
                <article 
                  key={post.slug}
                  className="border-b border-border pb-6 last:border-b-0"
                >
                  <Link
                    to="/posts/$postId"
                    params={{ postId: post.slug }}
                    className="block group"
                  >
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {formattedDate ? <time>{formattedDate}</time> : null}
                      <span>By {authorName}</span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
