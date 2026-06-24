---
title: "YouTube Transcript API: Get Captions Programmatically (Free)"
description: "Learn how to access YouTube transcripts via API or the unofficial Python library — and discover the free no-code alternative that works in seconds."
date: "2026-05-10"
author: "YTTranscript Team"
category: "Developer Guides"
readingTime: "9 min read"
keywords:
  - youtube transcript api
  - youtube captions api
  - get youtube transcript python
  - youtube transcript python library
  - youtube data api transcripts
  - extract youtube captions programmatically
  - no code youtube transcript
ogImage: ""
howToName: "How to Get YouTube Transcripts via API"
howToSteps:
  - name: "Option 1 — Use the unofficial Python library"
    text: "Install youtube-transcript-api with pip install youtube-transcript-api, then call YouTubeTranscriptApi.get_transcript('VIDEO_ID') to retrieve the transcript as a list of timed segments."
  - name: "Option 2 — Use the official YouTube Data API v3"
    text: "Enable the YouTube Data API v3 in Google Cloud Console, obtain an API key, and call the captions.list and captions.download endpoints with OAuth 2.0 credentials."
  - name: "Option 3 — Use YTTranscript (no code)"
    text: "Go to yttranscript.app, paste the YouTube video URL, and copy or download the transcript as TXT, DOCX, or PDF — no code or API key required."
faqItems:
  - question: "Does YouTube have an official transcript API?"
    answer: "Yes — the YouTube Data API v3 includes caption endpoints (captions.list and captions.download), but they require OAuth 2.0 authentication, meaning the video owner must grant permission. For public auto-generated captions, the unofficial youtube-transcript-api Python library is far easier."
  - question: "What is the easiest way to get a YouTube transcript programmatically?"
    answer: "The youtube-transcript-api Python library is the easiest programmatic approach — one pip install and one function call. For non-developers, YTTranscript.app provides the same result without any code."
  - question: "Can I get YouTube transcripts without an API key?"
    answer: "Yes. The unofficial youtube-transcript-api Python library fetches public captions without any API key. For a fully no-code approach, YTTranscript.app also works without keys or accounts."
  - question: "Does youtube-transcript-api work for non-English videos?"
    answer: "Yes. You can specify a language code as a parameter (e.g., get_transcript('VIDEO_ID', languages=['es'])) to fetch transcripts in other languages."
---

Getting a YouTube transcript programmatically comes up in a lot of workflows: building a content pipeline, training an AI model on video data, automating note-taking, or extracting captions for accessibility. This guide covers all your options — from the official API to unofficial libraries to a completely no-code alternative.

---

## The Three Ways to Get YouTube Transcripts

1. **Official YouTube Data API v3** — requires OAuth, works for your own videos
2. **youtube-transcript-api (Python)** — unofficial, no API key, works on public videos with captions
3. **YTTranscript** — no-code web tool, paste URL, get transcript instantly

Let's go through each.

---

## Option 1: The Official YouTube Data API v3

Google's YouTube Data API v3 includes caption endpoints — `captions.list` and `captions.download` — but there's an important limitation: they require **OAuth 2.0 authentication**, which means the request must be authorized by the video owner.

This makes the official API suitable for accessing captions on your own channel's videos, but **not** for fetching auto-generated captions on arbitrary public videos.

### Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable the **YouTube Data API v3**
3. Generate OAuth 2.0 credentials (not just an API key)
4. Use the credentials to authenticate your app

### List captions for a video

```python
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
flow = InstalledAppFlow.from_client_secrets_file('client_secrets.json', SCOPES)
credentials = flow.run_local_server()

youtube = build('youtube', 'v3', credentials=credentials)

captions = youtube.captions().list(
    part='snippet',
    videoId='dQw4w9WgXcQ'
).execute()

for item in captions['items']:
    print(item['id'], item['snippet']['language'])
```

### Download a caption track

```python
caption_id = captions['items'][0]['id']

subtitle = youtube.captions().download(
    id=caption_id,
    tfmt='srt'   # or 'vtt'
).execute()

print(subtitle.decode('utf-8'))
```

**Bottom line:** great for your own videos, complex OAuth setup required, won't work on arbitrary public videos.

<div class="cta-box">
  <strong>Need transcripts without the OAuth setup?</strong><br>
  <a href="https://yttranscript.app" target="_blank" rel="noopener noreferrer">YTTranscript</a> extracts captions from any public YouTube video instantly — no API key, no account, works in your browser right now.
</div>

---

## Option 2: youtube-transcript-api (Python — Recommended for Most Use Cases)

The [youtube-transcript-api](https://pypi.org/project/youtube-transcript-api/) library is an unofficial but widely used Python package that fetches publicly available captions from YouTube — including auto-generated captions — without requiring any API key or OAuth setup.

### Installation

```bash
pip install youtube-transcript-api
```

### Basic usage

```python
from youtube_transcript_api import YouTubeTranscriptApi

video_id = 'dQw4w9WgXcQ'  # just the ID, not the full URL
transcript = YouTubeTranscriptApi.get_transcript(video_id)

for segment in transcript:
    print(f"{segment['start']:.1f}s: {segment['text']}")
```

Output:
```
0.0s: Never gonna give you up
3.6s: Never gonna let you down
7.2s: Never gonna run around and desert you
```

### Get a plain text transcript (no timestamps)

```python
text = ' '.join([seg['text'] for seg in transcript])
print(text)
```

### Fetch in a specific language

```python
transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['es', 'en'])
```

### List available languages

```python
transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
for t in transcript_list:
    print(t.language, t.language_code, 'auto' if t.is_generated else 'manual')
```

### Batch multiple videos

```python
video_ids = ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3']
for vid in video_ids:
    try:
        t = YouTubeTranscriptApi.get_transcript(vid)
        full_text = ' '.join([s['text'] for s in t])
        print(f"{vid}: {full_text[:100]}...")
    except Exception as e:
        print(f"{vid}: failed — {e}")
```

### Limitations to know

- Only works on videos with captions enabled (auto-generated or manual)
- YouTube may block requests if you're making too many in a short time
- The library may break if YouTube changes its internal endpoints (it has good community maintenance though)
- Won't work on private or age-restricted videos

---

## Option 3: YTTranscript — No Code Required

If you don't need to process transcripts programmatically and just want the text, [YTTranscript](https://yttranscript.app) is the fastest path:

1. Go to [yttranscript.app](https://yttranscript.app)
2. Paste any YouTube URL
3. Copy the transcript or download as **TXT, DOCX, or PDF**

No API key, no pip install, no OAuth, no account. Works in any browser.

This is ideal for one-off tasks: summarizing a video with ChatGPT, pasting a lecture into your notes app, extracting a quote, or checking a video's content before committing to watch it.

<div class="cta-box">
  <strong>Just need a transcript quickly?</strong><br>
  <a href="https://yttranscript.app" target="_blank" rel="noopener noreferrer">Try YTTranscript free</a> — paste any YouTube URL and get the full text in seconds. No code, no account, no extension.
</div>

---

## Comparison: Which Approach Should You Use?

| | Official API | youtube-transcript-api | YTTranscript |
|---|---|---|---|
| **Setup time** | 30–60 min | 2 min | 0 min |
| **API key required** | Yes (OAuth) | No | No |
| **Works on any public video** | No | Yes | Yes |
| **Language selection** | Yes | Yes | Auto-detected |
| **Timestamps** | Yes | Yes | Optional |
| **Batch processing** | Yes | Yes | No |
| **File download** | No | Manual | TXT, DOCX, PDF |
| **Cost** | Free quota | Free | Free |
| **Best for** | Your own channel | Developers / automation | One-off tasks |

---

## Common Use Cases

**Building a content pipeline?** Use `youtube-transcript-api` to batch-fetch transcripts and feed them into a database or text processing pipeline.

**Training an LLM or fine-tuning a model?** Use the Python library to pull transcripts at scale from YouTube playlists or search results.

**Summarizing a single video with ChatGPT?** Use YTTranscript — copy the transcript, paste into ChatGPT, ask for a summary. Done in 30 seconds.

**Making your own videos searchable?** Use the official API with OAuth — you're the owner, so authentication is straightforward.

---

## Related Guides

- [How to Use YouTube Transcripts with ChatGPT](/youtube-transcript-for-chatgpt)
- [How to Download a YouTube Transcript](/how-to-download-youtube-transcript)
- [YouTube Transcript with Timestamps](/youtube-transcript-with-timestamps)
- [Non-English YouTube Transcripts](/youtube-transcript-non-english)
