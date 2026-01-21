import CircularBlogPosts from "./circular-testimonials";
import { StripedPattern } from "./ui/striped-pattern";
import { blogPosts } from "@/lib/data";

export function RecentBlogPosts() {

    return (
        <div className="">
            <h2 className="text-2xl font-bold py-4">Recent Blog Posts</h2>
            <CircularBlogPosts blogPosts={blogPosts} />
        </div>
    )
}
