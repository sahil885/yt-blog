import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export const metadata: Metadata = {
  title: "YTTranscript Blog — YouTube Transcript Guides & Tips",
  description:
    "Free step-by-step guides on getting YouTube transcripts, using them with ChatGPT, downloading as PDF, and more. No signup required.",
  alternates: { canonical: "https://blog.yttranscript.app" },
};

const categoryColors: Record<string, string> = {
  "How-To": "bg-blue-50 text-blue-700",
  "Guide": "bg-green-50 text-green-700",
  "Comparison": "bg-purple-50 text-purple-700",
  "AI Tools": "bg-orange-50 text-orange-700",
};

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          YouTube Transcript Guides
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Free, practical guides on getting, downloading, and using YouTube
          transcripts — for students, creators, and AI users.
        </p>
        <a
          href="https://yttranscript.app"
          className="inline-flex items-center gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          Try YTTranscript Free — No Signup →
        </a>
      </div>

      {/* Post grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-red-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.readingTime}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-3 flex-1">
              {post.description}
            </p>
            <div className="mt-4 text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="mt-16 bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to get your transcript?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Paste any YouTube URL and get the full transcript in seconds. Free,
          instant, no login required.
        </p>
        <a
          href="https://yttranscript.app"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Get Your YouTube Transcript →
        </a>
      </div>
    </div>
  );
}
