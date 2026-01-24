import { format } from 'date-fns';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { BlogPost } from '@/components/BlogPost';
import { getPostBySlug } from '@/lib/api';
import type { Author } from '@/components/circular-testimonials';

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.postId);

    if (!post) {
      throw notFound();
    }

    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {};
    }

    const { post } = loaderData;
    const title = `${post.title} | Blog`;
    const authorName = typeof post.author === 'object' && post.author !== null
      ? post.author.name
      : post.author || '';

    return {
      meta: [
        {
          title,
        },
        {
          name: 'description',
          content: post.excerpt || post.title,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: post.excerpt || post.title,
        },
        {
          property: 'og:image',
          content: post.ogImage?.url || post.coverImage || '',
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'article:published_time',
          content: post.date,
        },
        {
          property: 'article:author',
          content: authorName,
        },
      ],
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { post } = Route.useLoaderData();

  // Format the date for display
  const formattedDate = post.date
    ? format(new Date(post.date), 'MMMM d, yyyy')
    : undefined;

  // Format author name - handle both object and string types
  const authorName = typeof post.author === 'object'
    ? post.author.name
    : (post.author as string | undefined);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BlogPost
          content={post.content}
          title={post.title}
          date={formattedDate}
          author={authorName}
        />
      </div>
    </div>
  );
}
