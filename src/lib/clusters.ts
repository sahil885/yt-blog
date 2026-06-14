// Cluster definitions: map the (slightly inconsistent) post categories into
// 5 display clusters used by the homepage and related-posts logic.

export interface Cluster {
  key: string;
  title: string;
  blurb: string;
  categories: string[];
  color: string;
}

export const CLUSTERS: Cluster[] = [
  { key: "how-to", title: "How-To & Guides", blurb: "Step-by-step guides to get, copy, download, and convert YouTube transcripts — free and with no signup.", categories: ["How-To", "How-To Guides", "Guide"], color: "bg-blue-50 text-blue-700" },
  { key: "ai-tools", title: "AI Tools", blurb: "Feed YouTube transcripts into ChatGPT, Claude, Gemini, Perplexity, Copilot and more for instant summaries and notes.", categories: ["AI Tools"], color: "bg-orange-50 text-orange-700" },
  { key: "use-cases", title: "Use Cases", blurb: "How students, researchers, marketers, lawyers, podcasters and other pros put transcripts to work.", categories: ["Use Cases"], color: "bg-emerald-50 text-emerald-700" },
  { key: "workflows", title: "Integrations & Workflows", blurb: "Turn transcripts into Notion notes, Google Docs, blog posts, newsletters, threads, flashcards and more.", categories: ["Productivity", "Content Creation", "Developer Guides"], color: "bg-violet-50 text-violet-700" },
  { key: "comparisons", title: "Comparisons", blurb: "Honest, side-by-side comparisons of YTTranscript vs other transcript and captioning tools.", categories: ["Comparison", "Comparisons"], color: "bg-purple-50 text-purple-700" },
];

export function clusterForCategory(category: string): Cluster {
  return CLUSTERS.find((c) => c.categories.includes(category)) ?? CLUSTERS[0];
}

export function chipColorForCategory(category: string): string {
  return clusterForCategory(category).color;
}

const SUMMARIZER_SLUG_RE =
  /(summari[sz]e|summary|chatgpt|claude|gemini|perplexity|notebooklm|copilot|grok|deepseek|tldr|notes)/i;

export function isSummarizerIntent(post: { slug: string; category: string }): boolean {
  return post.category === "AI Tools" || SUMMARIZER_SLUG_RE.test(post.slug);
}

// --- Pillar / hub pages ------------------------------------------------------
export const MASTER_PILLAR_SLUG = "youtube-transcript-generator";
export const MASTER_PILLAR_TITLE = "YouTube Transcript Generator";

export const PILLAR_SLUGS: string[] = [
  "youtube-transcript-generator",
  "youtube-to-text",
  "transcribe-youtube-video",
  "download-youtube-transcript",
];

export function isPillar(slug: string): boolean {
  return PILLAR_SLUGS.includes(slug);
}
