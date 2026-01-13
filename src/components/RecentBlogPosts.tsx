import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"

export function RecentBlogPosts() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between cursor-pointer transition-colors">
                <h2 className="text-md font-medium leading-normal">Recent blog posts</h2>
                <div className="flex items-center gap-2">
                    <span className="text-md leading-normal">View All</span>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
                </div>   
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1">
                    <span className="leading-normal">Building Scalable AI Applications with Next.js</span>
                    <span className="text-xs text-muted-foreground leading-normal">Jan 15, 2024</span>
                </div>
                <div className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1">
                    <span className="leading-normal">Optimizing React Performance in Production</span>
                    <span className="text-xs text-muted-foreground leading-normal">Dec 28, 2023</span>
                </div>
                <div className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1">
                    <span className="leading-normal">Introduction to TypeScript for AI Engineers</span>
                    <span className="text-xs text-muted-foreground leading-normal">Dec 10, 2023</span>
                </div>
                <div className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1">
                    <span className="leading-normal">Deploying Full Stack Applications to Vercel</span>
                    <span className="text-xs text-muted-foreground leading-normal">Nov 22, 2023</span>
                </div>
                <div className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1">
                    <span className="leading-normal">Best Practices for AI Model Integration</span>
                    <span className="text-xs text-muted-foreground leading-normal">Nov 5, 2023</span>
                </div>
            </div>
        </div>
    )
}

