import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { RecentBlogPosts } from "@/components/RecentBlogPosts";
import { GithubGraph } from "@/components/GithubGraph";
import Projects from "@/components/Projects";
import { Skills } from "@/components/Skills";

export const Route = createFileRoute("/")({ component: App });


function App() {
  return (
    <div className=" h-screen bg-background flex flex-col space-y-6  mx-auto px-4 py-8 max-w-2xl">
      <Hero />
      <RecentBlogPosts />
      <GithubGraph />
      <Projects />
      <Skills />
    </div>
  );
}