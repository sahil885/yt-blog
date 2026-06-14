import type { FaqItem, HowToStep } from "@/lib/posts";

// Programmatic SEO: one template -> a page per language.
// Each entry carries UNIQUE substance (intro + note) so pages are genuinely
// useful, not thin doorway pages. The template scaffolding is shared.

export interface Language {
  slug: string; // url segment, e.g. "spanish" -> /spanish-youtube-transcript
  name: string; // English name, e.g. "Spanish"
  native: string; // endonym, e.g. "Español"
  intro: string; // unique 2-3 sentence opener
  note: string; // unique auto-caption / usage note
}

export const LANGUAGES: Language[] = [
  {
    slug: "spanish",
    name: "Spanish",
    native: "Español",
    intro:
      "Spanish is the second-most-used language on YouTube, with enormous audiences across Spain and Latin America. Whether you're studying a news segment, a fútbol breakdown, or an online curso, pulling the Spanish transcript turns spoken audio into text you can read, search, quote, and translate.",
    note: "YouTube's auto-captions for Spanish are among the most accurate of any language, so even videos without manual subtitles usually produce a clean, usable transcript.",
  },
  {
    slug: "hindi",
    name: "Hindi",
    native: "हिन्दी",
    intro:
      "Hindi powers one of YouTube's largest and fastest-growing audiences. From film breakdowns to UPSC lectures and tech reviews, getting the Hindi transcript lets you read along, copy key quotes, and feed the text into AI tools that work far better with text than audio.",
    note: "Hindi auto-captions have improved sharply but can struggle with code-switching between Hindi and English ('Hinglish'); for those videos, manual subtitles — where the creator added them — give the cleanest result.",
  },
  {
    slug: "portuguese",
    name: "Portuguese",
    native: "Português",
    intro:
      "Portuguese — driven by Brazil's massive creator scene — is one of YouTube's most active languages. Extracting the Portuguese transcript is the fastest way to turn aulas, podcasts, and reviews into searchable text for study, citation, or repurposing.",
    note: "Brazilian and European Portuguese differ in vocabulary and pronunciation; auto-captions handle both but tend to be most accurate on clear Brazilian-Portuguese audio.",
  },
  {
    slug: "arabic",
    name: "Arabic",
    native: "العربية",
    intro:
      "Arabic spans dozens of dialects and a right-to-left script, which makes manual transcription slow and error-prone. Pulling the Arabic transcript automatically gives you the full text in seconds — ready to read, search, or translate.",
    note: "Auto-captions are mostly trained on Modern Standard Arabic, so heavily dialectal videos (Egyptian, Gulf, Levantine) may need light cleanup. The extracted text still exports cleanly in right-to-left order.",
  },
  {
    slug: "french",
    name: "French",
    native: "Français",
    intro:
      "French has a truly global YouTube footprint across France, Canada, Africa, and Belgium. Whether it's a conférence, a cooking video, or a news segment, the French transcript turns the audio into text you can quote, study, or run through an AI summarizer.",
    note: "French auto-captions are highly reliable for clear speech; liaisons and fast colloquial French are where the occasional error creeps in.",
  },
  {
    slug: "german",
    name: "German",
    native: "Deutsch",
    intro:
      "German YouTube is rich with tutorials, lectures, and long-form discussion — exactly the content that's painful to rewatch. The German transcript hands you the whole thing as text you can skim and search in seconds.",
    note: "German's long compound words occasionally trip auto-captions, but accuracy on standard Hochdeutsch is excellent; regional dialects like Bavarian or Swiss German are less reliable.",
  },
  {
    slug: "japanese",
    name: "Japanese",
    native: "日本語",
    intro:
      "Japanese is one of YouTube's biggest non-English languages, and its writing system makes manual transcription especially time-consuming. Extracting the Japanese transcript hands you the kanji, hiragana, and katakana text instantly.",
    note: "Auto-captions handle standard Japanese well but don't insert spaces (Japanese isn't space-delimited); the text is still fully searchable and ready to paste into a translator or AI tool.",
  },
  {
    slug: "korean",
    name: "Korean",
    native: "한국어",
    intro:
      "Korean YouTube — K-pop, K-drama, gaming, and study channels — has a worldwide audience. The Korean transcript lets learners and fans read the Hangul text alongside the video and translate it with a single paste.",
    note: "Korean auto-captions are solid for clear studio audio; rapid variety-show banter and heavy slang are where they tend to slip.",
  },
  {
    slug: "indonesian",
    name: "Indonesian",
    native: "Bahasa Indonesia",
    intro:
      "Indonesian is among YouTube's fastest-growing languages, with enormous reach across Southeast Asia. Grabbing the Indonesian transcript turns vlogs, tutorials, and talks into text you can study, quote, or repurpose.",
    note: "Bahasa Indonesia auto-captions are increasingly accurate; mixed Indonesian-English and strong regional accents are the main sources of error.",
  },
  {
    slug: "russian",
    name: "Russian",
    native: "Русский",
    intro:
      "Russian YouTube spans education, tech, and long-form commentary — dense, talk-heavy content that's far easier to read than to rewatch. The Russian transcript gives you the full Cyrillic text in seconds.",
    note: "Russian auto-captions are generally accurate for clear speech; proper nouns and fast overlapping dialogue are the usual weak spots.",
  },
  {
    slug: "turkish",
    name: "Turkish",
    native: "Türkçe",
    intro:
      "Turkish has a huge, highly engaged YouTube audience. From series recaps to lectures and tech reviews, the Turkish transcript turns spoken Turkish into text you can copy, search, and translate.",
    note: "Turkish is agglutinative — words carry many stacked suffixes — which auto-captions handle well on clear audio; very fast speech is where accuracy dips.",
  },
  {
    slug: "vietnamese",
    name: "Vietnamese",
    native: "Tiếng Việt",
    intro:
      "Vietnamese is one of YouTube's most active Southeast Asian languages. Extracting the Vietnamese transcript saves hours of rewatching for students and creators who just want the text.",
    note: "Vietnamese is tonal, and auto-captions can occasionally confuse tone-dependent words; for clear narration the results are reliable and fully exportable.",
  },
  {
    slug: "italian",
    name: "Italian",
    native: "Italiano",
    intro:
      "Italian YouTube is full of cooking, history, and commentary channels. The Italian transcript turns that audio into text you can read at your own pace, quote, or translate instantly.",
    note: "Italian auto-captions are accurate on standard speech; strong regional accents and overlapping conversation are the main sources of error.",
  },
  {
    slug: "chinese",
    name: "Chinese",
    native: "中文",
    intro:
      "Chinese (Mandarin) reaches an enormous global audience, and its character-based script makes manual transcription very slow. Pulling the Chinese transcript gives you the full text in seconds, ready to translate or study.",
    note: "Auto-captions typically output Simplified Chinese characters and, like Japanese, don't use spaces between words; the text remains fully searchable and translatable.",
  },
];

const SUFFIX = "-youtube-transcript";

export function getAllLanguageSlugs(): string[] {
  return LANGUAGES.map((l) => `${l.slug}${SUFFIX}`);
}

export function getLanguageByPageSlug(pageSlug: string): Language | undefined {
  if (!pageSlug.endsWith(SUFFIX)) return undefined;
  const base = pageSlug.slice(0, -SUFFIX.length);
  return LANGUAGES.find((l) => l.slug === base);
}

export function languagePageSlug(l: Language): string {
  return `${l.slug}${SUFFIX}`;
}

export function languageTitle(l: Language): string {
  return `${l.name} YouTube Transcript — Free, No Signup (${l.native})`;
}

export function languageDescription(l: Language): string {
  return `Get a free ${l.name} (${l.native}) YouTube transcript in seconds — no signup, no extension. Copy or download the full ${l.name} text, then translate or summarize it.`;
}

export function languageSteps(l: Language): HowToStep[] {
  return [
    {
      name: `Copy the ${l.name} video URL`,
      text: `Open the ${l.name} YouTube video and copy its URL from the address bar or the Share button.`,
    },
    {
      name: "Paste it into YTTranscript",
      text: "Go to yttranscript.app and paste the URL into the box.",
    },
    {
      name: "Click Get Transcript Now",
      text: `The full ${l.name} transcript appears in 2-5 seconds.`,
    },
    {
      name: `Copy or download the ${l.name} text`,
      text: `Copy the text or download it as TXT, DOCX, or PDF — then translate or summarize it however you like.`,
    },
  ];
}

export function languageFaq(l: Language): FaqItem[] {
  return [
    {
      question: `Can I get a ${l.name} transcript from any YouTube video?`,
      answer: `Yes. If the video has ${l.name} captions (manual or auto-generated), YTTranscript extracts the full text in seconds — free and with no signup.`,
    },
    {
      question: `Is the ${l.name} YouTube transcript free?`,
      answer: `Yes, completely free. YTTranscript has no account, no extension, and no limits, so you can extract as many ${l.name} transcripts as you need.`,
    },
    {
      question: `Can I translate the ${l.name} transcript to English?`,
      answer: `Yes. Once you have the text, paste it into any translation or AI tool, or follow our guide on translating YouTube transcripts.`,
    },
    {
      question: `Does it work on mobile?`,
      answer: `Yes. YTTranscript runs in any phone browser, so you can get a ${l.name} transcript on iPhone or Android with nothing to install.`,
    },
  ];
}
