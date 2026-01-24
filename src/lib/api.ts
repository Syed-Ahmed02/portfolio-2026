import fs from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";
import type { BlogPost } from "@/components/circular-testimonials";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory).filter(
        (file) => file.endsWith(".md") || file.endsWith(".mdx")
    );
}

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.(md|mdx)$/, "");
    // Try .mdx first, then .md
    let fullPath = join(postsDirectory, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        fullPath = join(postsDirectory, `${realSlug}.md`);
    }
    
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...data, slug: realSlug, content } as BlogPost;
}

export function getAllPosts(): Array<BlogPost> {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is BlogPost => post !== null)
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}