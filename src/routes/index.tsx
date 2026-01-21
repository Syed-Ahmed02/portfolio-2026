import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { RecentBlogPosts } from "@/components/RecentBlogPosts";
import { GithubGraph } from "@/components/GithubGraph";
import Projects from "@/components/Projects";
import { Skills } from "@/components/Skills";
import CircularBlogPosts, { type BlogPost } from "@/components/circular-testimonials";

const blogPosts: Array<BlogPost> = [
  {
    image: 'https://picsum.photos/seed/AI agents/400/300',
    content: 'I love this product!',
    title: 'AI agents',
    date: 'Jan 15, 2024',
  },
  {
    image: 'https://picsum.photos/seed/AI agents in prod/400/300',
    content: 'I love this product!',
    title: 'AI agents in prod',
    date: 'Dec 28, 2023',
  },
  {
    image: 'https://picsum.photos/seed/AI For dummies/400/300',
    content: 'I love this product!',
    title: 'AI For dummies',
    date: 'Dec 10, 2023',
  },
  {
    image: 'https://picsum.photos/seed/AI agents in prod/400/300',
    content: 'I love this product!',
    title: 'AI agents in prod',
    date: 'Dec 10, 2023',
  },
]
export const Route = createFileRoute("/")({ component: App });


function App() {
  return (
    <div className=" h-screen bg-background flex flex-col space-y-6  mx-auto px-4 py-8 max-w-2xl">
      <Hero />
      <GithubGraph />
      <Projects />
      <RecentBlogPosts />
      <Skills />
    </div>
  );
}