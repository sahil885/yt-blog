import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData, type PostMeta } from "@/lib/posts";
import { CLUSTERS, chipColorForCategory } from "@/lib/clusters";
import { LANGUAGES, languagePageSlug } from "@/lib/languages";

export const metadata: Metadata = {
  title: "YTTranscript Blog — YouTube Transcript Guides & Tips",
  description:
    "Free step-by-step guides on getting YouTube transcripts, using them with ChatGPT, downloading as PDF, and more. No signup required.",
  alternates: { canonical: "https://blog.yttranscript.app" },
};

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-red-200 hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${chipColorForCategory(
            post.category
          )}`}
        >
          {post.category}
        </span>
        <span className="text-xs text-gray-400">{post.readingTime}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-snug">
        {post.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-3 flex-1">
        {post.description}
      </p>
    </Link>
  );
}

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-14 text-center">
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

      {/* Clustered sections */}
      {CLUSTERS.map((cluster) => {
        const clusterPosts = posts.filter((p) =>
          cluster.categories.includes(p.category)
        );
        if (clusterPosts.length === 0) return null;
        return (
          <section key={cluster.key} className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {cluster.title}
              </h2>
              <p className="text-sm text-gray-500 max-w-2xl">{cluster.blurb}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {clusterPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Browse by language (programmatic pages) */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">By Language</h2>
          <p className="text-sm text-gray-500 max-w-2xl">
            Get a YouTube transcript in your language — free, no signup.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <Link
              key={l.slug}
              href={`/${languagePageSlug(l)}`}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 text-gray-700 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Summarizer handoff */}
      <div className="mb-16 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <h2 className="text-xl font-bold text-indigo-900 mb-1">
            Want summaries, not just transcripts?
          </h2>
          <p className="text-sm text-indigo-700/90 max-w-xl">
            YTSummarizer turns any YouTube video into clean AI notes, key points,
            and chapters in one click — no copy-paste, no prompting.
          </p>
        </div>
        <a
          href="https://ytsummarizer.app"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          Try YTSummarizer →
        </a>
      </div>

      {/* CTA Banner */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
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
