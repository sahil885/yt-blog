import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPostSlugs,
  getPostData,
  getRelatedPosts,
} from "@/lib/posts";
import {
  getAllLanguageSlugs,
  getLanguageByPageSlug,
  languageTitle,
  languageDescription,
  languageFaq,
  languageSteps,
} from "@/lib/languages";
import { isSummarizerIntent } from "@/lib/clusters";
import LanguageArticle from "@/components/LanguageArticle";
import SummarizerCTA from "@/components/SummarizerCTA";
import RelatedPosts from "@/components/RelatedPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://blog.yttranscript.app";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs().map((s) => ({ slug: s.slug }));
  const langSlugs = getAllLanguageSlugs().map((slug) => ({ slug }));
  return [...slugs, ...langSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Programmatic language page
  const lang = getLanguageByPageSlug(slug);
  if (lang) {
    return {
      title: languageTitle(lang),
      description: languageDescription(lang),
      keywords: [
        `${lang.name.toLowerCase()} youtube transcript`,
        `youtube transcript ${lang.name.toLowerCase()}`,
        `${lang.name.toLowerCase()} transcript generator`,
        `download ${lang.name.toLowerCase()} youtube transcript`,
      ],
      alternates: { canonical: `${SITE_URL}/${slug}` },
      openGraph: {
        title: languageTitle(lang),
        description: languageDescription(lang),
        type: "article",
        url: `${SITE_URL}/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: languageTitle(lang),
        description: languageDescription(lang),
      },
    };
  }

  // Markdown post
  try {
    const post = await getPostData(slug);
    return {
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      authors: [{ name: post.author }],
      alternates: { canonical: `${SITE_URL}/${slug}` },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        url: `${SITE_URL}/${slug}`,
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

  // --- Programmatic language page ------------------------------------------
  const lang = getLanguageByPageSlug(slug);
  if (lang) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: languageTitle(lang),
      description: languageDescription(lang),
      author: { "@type": "Organization", name: "YTTranscript" },
      publisher: {
        "@type": "Organization",
        name: "YTTranscript",
        url: "https://yttranscript.app",
      },
      mainEntityOfPage: `${SITE_URL}/${slug}`,
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: languageFaq(lang).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to get a ${lang.name} YouTube transcript`,
      step: languageSteps(lang).map((step) => ({
        "@type": "HowToStep",
        name: step.name,
        text: step.text,
      })),
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <LanguageArticle lang={lang} />
      </>
    );
  }

  // --- Markdown post --------------------------------------------------------
  let post;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  const related = getRelatedPosts(slug, 4);
  const showSummarizer = isSummarizerIntent(post);

  const articleSchema = {
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
    mainEntityOfPage: `${SITE_URL}/${slug}`,
  };

  const faqSchema =
    post.faqItems && post.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const howToSchema =
    post.howToSteps && post.howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: post.howToName || post.title,
          step: post.howToSteps.map((step) => ({
            "@type": "HowToStep",
            name: step.name,
            text: step.text,
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
        >
          ← All Articles
        </Link>

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

        <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Get any YouTube transcript instantly — free
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              No signup · No extension · Copy or download as TXT, DOCX, PDF
            </p>
          </div>
          <a
            href="https://yttranscript.app"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Try Free →
          </a>
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {showSummarizer && <SummarizerCTA />}

        <RelatedPosts posts={related} />

        <div className="mt-16 border-t border-gray-100 pt-10 text-center">
          <p className="text-lg font-bold text-gray-900 mb-2">
            Ready to get your YouTube transcript?
          </p>
          <p className="text-sm text-gray-500 mb-5">
            YTTranscript is completely free — paste any YouTube URL and get the
            full text in seconds. No account, no extension, no limits.
          </p>
          <a
            href="https://yttranscript.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Get YouTube Transcript Free →
          </a>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-red-600 transition-colors"
          >
            ← Browse all YouTube transcript guides
          </Link>
        </div>
      </article>
    </>
  );
}
