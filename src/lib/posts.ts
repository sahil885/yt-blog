import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  keywords: string[];
  ogImage?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as Omit<PostMeta, "slug">),
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<PostMeta, "slug">),
  };
}
