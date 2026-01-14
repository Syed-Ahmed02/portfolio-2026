import { useState } from "react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { motion } from "motion/react"

const posts = [
    {
        title: "Building Scalable AI Applications with Next.js",
        date: "Jan 15, 2024",
    },
    {
        title: "Optimizing React Performance in Production",
        date: "Dec 28, 2023",
    },
    {
        title: "Introduction to TypeScript for AI Engineers",
        date: "Dec 10, 2023",
    },
    {
        title: "Deploying Full Stack Applications to Vercel",
        date: "Nov 22, 2023",
    },
    {
        title: "Best Practices for AI Model Integration",
        date: "Nov 5, 2023",
    },
]

export function RecentBlogPosts() {
    const [isOpen, setIsOpen] = useState(false)

    const initialPosts = posts.slice(0, 3)
    const remainingPosts = posts.slice(3)

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
            <div className="flex w-full items-center justify-between">
                <h2 className="text-md font-medium leading-normal">Recent blog posts</h2>
                {remainingPosts.length > 0 && (
                    <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer transition-colors">
                        <span className="text-md leading-normal">
                            {isOpen ? "Show less" : "View More"}
                        </span>
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className={`size-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                    </CollapsibleTrigger>
                )}
            </div>
            <div className="space-y-2">
                {initialPosts.map((post) => (
                    <div
                        key={post.title}
                        className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1"
                    >
                        <span className="leading-normal">{post.title}</span>
                        <span className="text-xs text-muted-foreground leading-normal">{post.date}</span>
                    </div>
                ))}
                {remainingPosts.length > 0 && (
                    <CollapsibleContent    className="space-y-2">
                        {remainingPosts.map((post) => (
                            <motion.div   
                            initial={{ opacity: 0,  }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}
                                key={post.title}
                                className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-1"
                            >
                                <span className="leading-normal">{post.title}</span>
                                <span className="text-xs text-muted-foreground leading-normal">{post.date}</span>
                            </motion.div>
                        ))}
                    </CollapsibleContent>
                )}
            </div>
        </Collapsible>
    )
}
