// Context-matched handoff to the paid summarizer product.
// Rendered only on summarizer-intent posts (see isSummarizerIntent).
// Deliberately INDIGO so it reads as a different action from the red
// transcript CTAs used everywhere else on the blog.

export default function SummarizerCTA() {
  return (
    <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-indigo-900 text-base">
            Just want the summary, not the whole transcript?
          </p>
          <p className="text-sm text-indigo-700/90 mt-1 max-w-xl">
            Skip the copy-paste. <strong>YTSummarizer</strong> turns any YouTube
            video into clean AI notes, key points, and chapters in one click —
            no prompt engineering required.
          </p>
        </div>
        <a
          href="https://ytsummarizer.app"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          Summarize a video →
        </a>
      </div>
    </div>
  );
}
