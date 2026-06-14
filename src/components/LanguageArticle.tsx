import Link from "next/link";
import {
  type Language,
  LANGUAGES,
  languagePageSlug,
  languageSteps,
  languageFaq,
} from "@/lib/languages";

// Programmatic per-language transcript page. Shared scaffolding, unique
// substance (intro + note) supplied per language so pages are not thin.

export default function LanguageArticle({ lang }: { lang: Language }) {
  const steps = languageSteps(lang);
  const faq = languageFaq(lang);
  const others = LANGUAGES.filter((l) => l.slug !== lang.slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
      >
        ← All Articles
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
          <span className="bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full text-xs">
            Languages
          </span>
          <span>·</span>
          <span>Free guide</span>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {lang.name} YouTube Transcript: Free, No Signup
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          Extract a {lang.name} ({lang.native}) YouTube transcript in seconds —
          free, no account, no extension. Copy or download the full text, then
          translate or summarize it.
        </p>
      </header>

      <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            Get any {lang.name} YouTube transcript instantly — free
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

      <div className="prose">
        <p>{lang.intro}</p>

        <h2>Why get a {lang.name} YouTube transcript?</h2>
        <p>
          Watching is slow; reading is fast. A <strong>{lang.name} transcript</strong>{" "}
          lets you skim a long video in seconds, search for a specific word or
          quote, and copy exact passages without rewinding. It&apos;s also the
          first step for almost anything else you&apos;d want to do — translating
          the video to another language, turning it into study notes, or feeding
          it to an AI tool for a summary.
        </p>

        <h2>How to get a {lang.name} transcript (free, in seconds)</h2>
        <ol>
          {steps.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.text}
            </li>
          ))}
        </ol>

        <div className="cta-box">
          <strong>Try it free:</strong> Paste any {lang.name} YouTube URL and get
          the full transcript in seconds — no account needed.{" "}
          <a href="https://yttranscript.app">→ Try YTTranscript.app</a>
        </div>

        <h2>{lang.name} auto-captions: what to expect</h2>
        <p>{lang.note}</p>
        <p>
          If a video is missing captions entirely, see our guide on{" "}
          <Link href="/youtube-video-no-transcript">
            what to do when a YouTube video has no transcript
          </Link>
          , and the difference between{" "}
          <Link href="/youtube-auto-generated-vs-manual-transcript">
            auto-generated and manual transcripts
          </Link>
          .
        </p>

        <h2>{lang.name} transcript vs. doing it manually</h2>
        <table>
          <thead>
            <tr>
              <th>Approach</th>
              <th>Time</th>
              <th>Cost</th>
              <th>Editable text</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>YTTranscript</td>
              <td>2-5 seconds</td>
              <td>Free, no signup</td>
              <td>Yes (TXT, DOCX, PDF)</td>
            </tr>
            <tr>
              <td>Typing it out by hand</td>
              <td>Hours</td>
              <td>Free, but slow</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Paid transcription services</td>
              <td>Minutes to hours</td>
              <td>Per-minute fee</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>

        <h2>Translate your {lang.name} transcript</h2>
        <p>
          Once you have the {lang.name} text, translating it is trivial: paste it
          into any AI or translation tool. Our guide to{" "}
          <Link href="/how-to-translate-youtube-transcript">
            translating a YouTube transcript
          </Link>{" "}
          walks through it, and the{" "}
          <Link href="/youtube-transcript-non-english">
            non-English transcript guide
          </Link>{" "}
          covers multi-language workflows. New to all this? Start with{" "}
          <Link href="/how-to-get-a-youtube-transcript">
            how to get a YouTube transcript
          </Link>
          .
        </p>

        <h2>Frequently asked questions</h2>
        {faq.map((f) => (
          <div key={f.question}>
            <p>
              <strong>{f.question}</strong>
              <br />
              {f.answer}
            </p>
          </div>
        ))}

        <p>
          <strong>
            Ready to extract {lang.name} text from any video?{" "}
            <a href="https://yttranscript.app">
              Get your free {lang.name} YouTube transcript at YTTranscript.app →
            </a>
          </strong>
        </p>
      </div>

      {/* Other languages — interlinking */}
      <section className="mt-16 border-t border-gray-100 pt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Transcripts in other languages
        </h2>
        <div className="flex flex-wrap gap-2">
          {others.map((l) => (
            <Link
              key={l.slug}
              href={`/${languagePageSlug(l)}`}
              className="text-sm border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16 border-t border-gray-100 pt-10 text-center">
        <p className="text-lg font-bold text-gray-900 mb-2">
          Ready to get your {lang.name} transcript?
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
    </article>
  );
}
