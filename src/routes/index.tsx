import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { RecentBlogPosts } from "@/components/RecentBlogPosts";

export const Route = createFileRoute("/")({ component: App });

function App() {
return (
  <div className="w-full h-screen bg-background flex flex-col space-y-6 max-w-2xl mx-auto px-4 py-8">
    <Hero />
    <RecentBlogPosts />
  </div>
);
}