import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";

const SITE_URL = "https://blog.yttranscript.app";
const GA_ID = "G-M75CD8BQWD";
const DEFAULT_OG = "/og-default.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "YTTranscript Blog — YouTube Transcript Guides & Tips",
    template: "%s | YTTranscript Blog",
  },
  description:
    "Free guides on how to get YouTube transcripts, use them with ChatGPT, download them as PDF or Word, and more. Powered by YTTranscript.",
  keywords: ["youtube transcript", "youtube to text", "get youtube transcript", "youtube transcript generator"],
  authors: [{ name: "YTTranscript Team" }],
  openGraph: {
    type: "website",
    siteName: "YTTranscript Blog",
    locale: "en_US",
    images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yttranscript",
    images: [DEFAULT_OG],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        {/* Header */}
        <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 font-bold text-red-600 text-lg tracking-tight">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YTTranscript Blog
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition-colors">Articles</Link>
              <a
                href="https://yttranscript.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm transition-colors"
              >
                Get Transcript Free →
              </a>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-100 mt-20 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} YTTranscript. Free YouTube transcript tool.</p>
            <div className="flex items-center gap-6">
              <a href="https://yttranscript.app" className="hover:text-gray-900 transition-colors">Tool</a>
              <a href="https://yttranscript.app/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="https://yttranscript.app/terms" className="hover:text-gray-900 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
