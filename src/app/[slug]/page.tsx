import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostData } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      authors: [{ name: post.author }],
      alternates: { canonical: `https://blog.yttranscript.app/${slug}` },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        url: `https://blog.yttranscript.app/${slug}`,
        images: post.ogImage
          ? [{ url: post.ogImage, width: 1200, height: 630 }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "YTTranscript" },
    publisher: {
      "@type": "Organization",
      name: "YTTranscript",
      url: "https://yttranscript.app",
    },
    mainEntityOfPage: `https://blog.yttranscript.app/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
        >
          ← All Articles
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
            <span className="bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded-full text-xs">
              {post.category}
            </span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">{post.description}</p>
        </header>

        {/* Inline CTA */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Get any YouTube transcript instantly
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Free · No signup · Copy or download in seconds
            </p>
          </div>
          <a
            href="https://yttranscript.app"
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Try Free →
          </a>
        </div>

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Bottom CTA */}
        <div className="mt-16 border-t border-gray-100 pt-10 text-center">
          <p className="text-lg font-bold text-gray-900 mb-2">
            Ready to try it yourself?
          </p>
          <p className="text-sm text-gray-500 mb-5">
            YTTranscript is completely free — paste any YouTube URL and get the
            full text in seconds. No account needed.
          </p>
          <a
            href="https://yttranscript.app"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Get YouTube Transcript Free →
          </a>
        </div>
      </article>
    </>
  );
}
