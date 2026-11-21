// UTM tagging for links from the blog to our product sites, so the blog shows
// up as a source in GA. Every outbound CTA to yttranscript.app (and sister
// tools) goes through here, including links inside post markdown (see
// tagProductLinks, applied in getPostData).
//   utm_source=blog · utm_medium=cta · utm_campaign=<post slug or page>
//   utm_content=<placement: top, inline, table, end; header/footer for site nav>

const PRODUCT_HOSTS = [
  "yttranscript.app",
  "www.yttranscript.app",
  "ytsummarizer.app",
  "www.ytsummarizer.app",
  "transcribetok.com",
  "www.transcribetok.com",
];

// Legal pages aren't CTAs; leave them untagged.
const SKIP_PATHS = ["/privacy", "/terms"];

export function ctaUrl(url: string, campaign: string, content?: string): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return url;
  }
  if (!PRODUCT_HOSTS.includes(u.hostname)) return url;
  if (SKIP_PATHS.some((p) => u.pathname.startsWith(p))) return url;
  if (u.searchParams.has("utm_source")) return url;
  u.searchParams.set("utm_source", "blog");
  u.searchParams.set("utm_medium", "cta");
  u.searchParams.set("utm_campaign", campaign);
  if (content) u.searchParams.set("utm_content", content);
  return u.toString();
}

// Rewrites href="https://yttranscript.app…" (and sister sites) in rendered
// post HTML. Links inside a <table> get utm_content=table, all others inline.
// blog.yttranscript.app is not in PRODUCT_HOSTS, so internal links are
// untouched.
function tagHrefs(html: string, campaign: string, content: string): string {
  return html.replace(
    /href="(https?:\/\/[^"]+)"/g,
    (_m, url: string) =>
      `href="${ctaUrl(url.replace(/&amp;/g, "&"), campaign, content).replace(/&/g, "&amp;")}"`
  );
}

export function tagProductLinks(html: string, campaign: string): string {
  return html
    .split(/(<table[\s\S]*?<\/table>)/g)
    .map((part) =>
      tagHrefs(part, campaign, part.startsWith("<table") ? "table" : "inline")
    )
    .join("");
}
