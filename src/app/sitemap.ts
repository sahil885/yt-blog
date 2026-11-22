import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import {
  LANGUAGES,
  languagePageSlug,
  languageLastModified,
} from "@/lib/languages";

const SITE_URL = "https://blog.yttranscript.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Language pages use the date their content last changed (see
  // languageLastModified), not the build time, so <lastmod> stays truthful.
  const languageEntries: MetadataRoute.Sitemap = LANGUAGES.map((lang) => ({
    url: `${SITE_URL}/${languagePageSlug(lang)}`,
    lastModified: new Date(languageLastModified(lang)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...postEntries,
    ...languageEntries,
  ];
}
