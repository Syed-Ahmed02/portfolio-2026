import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { RecentBlogPosts } from "@/components/RecentBlogPosts";
import { GithubGraph } from "@/components/GithubGraph";

export const Route = createFileRoute("/")({ component: App });

function App() {
return (
  <div className=" h-screen bg-background flex flex-col space-y-6  mx-auto px-4 py-8 max-w-2xl">
    <Hero />
    <RecentBlogPosts />
    <GithubGraph />
  </div>
);
}