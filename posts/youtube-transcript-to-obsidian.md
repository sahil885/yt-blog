---
title: "YouTube Transcript to Obsidian: Build a Personal Knowledge Base from Any Video"
description: "Obsidian users: here's how to pull the full transcript from any YouTube video and save it as a Markdown note in your vault — free, no plugin required."
date: "2026-05-25"
author: "YTTranscript Team"
category: "Productivity"
readingTime: "6 min read"
keywords:
  - youtube transcript obsidian
  - save youtube transcript to obsidian
  - obsidian youtube notes
  - youtube video notes obsidian
  - youtube transcript markdown obsidian
faqItems:
  - question: "How do I get a YouTube transcript into Obsidian?"
    answer: "Get the transcript with YTTranscript, copy the text, create a new note in Obsidian, and paste it in. You can also download the TXT file and drag it directly into your vault folder."
  - question: "Do I need an Obsidian plugin to import YouTube transcripts?"
    answer: "No. The simplest approach — copy from YTTranscript, paste into a new note — requires no plugin at all. Some community plugins can enhance the experience, but they're not necessary."
  - question: "What format should I save YouTube transcripts in Obsidian?"
    answer: "Markdown (.md) is the native Obsidian format. Download the TXT from YTTranscript and rename it to .md, or simply paste the text into a new note and Obsidian handles the rest."
  - question: "Can I link YouTube transcript notes to other notes in Obsidian?"
    answer: "Yes. Once the transcript is in your vault, you can use [[wikilinks]] to link it to related notes, add tags, include it in the graph view, and connect it to your other knowledge."
  - question: "Is this free?"
    answer: "Yes. YTTranscript is free and Obsidian is free for personal use."
---

Obsidian is built around a single idea: everything you know should be connected. Videos are one of the richest sources of ideas, insights, and information — and if those ideas only live in your YouTube watch history, they're essentially lost.

Getting a YouTube transcript into Obsidian turns a passive viewing experience into a permanent, searchable, linked piece of your knowledge base. Here's how to do it, without any plugins.

## Why Obsidian Users Want YouTube Transcripts

Obsidian's power comes from its graph — a web of connected notes where ideas reference each other. For that to work, the content has to be in your vault as text. Video is the one major format that doesn't naturally convert: you can link to a YouTube video, but you can't search its content, extract quotes from it, or link its specific ideas to other notes.

A transcript solves this. Once the text is in Obsidian, you can search it, quote from it, link its concepts to other notes with `[[wikilinks]]`, and surface it in your graph alongside everything else you know.

## Method 1: Copy and Paste (Quickest)

**Step 1:** Go to [YTTranscript.app](https://yttranscript.app), paste the YouTube URL, and click **Get Transcript Now**.

**Step 2:** Click **Copy** to copy the full transcript text.

**Step 3:** Open Obsidian and create a new note (**Ctrl+N** / **Cmd+N**).

**Step 4:** Give the note a clear title (e.g. the video title and channel name), then paste the transcript with **Ctrl+V** / **Cmd+V**.

The transcript is now in your vault. From here, you can edit, highlight, and link it however you like.

<div class="cta-box">
  <strong>Get the transcript in seconds:</strong> Paste any YouTube URL into YTTranscript and copy the full text — free, no account required. <a href="https://yttranscript.app">→ Try YTTranscript.app</a>
</div>

## Method 2: Download TXT and Drop Into Your Vault

This is better if you want to keep the note as a standalone file you can move around, or if your vault is a local folder you manage directly.

**Step 1:** Get the transcript at [YTTranscript](https://yttranscript.app) and click **Download TXT**.

**Step 2:** Move the downloaded file into your Obsidian vault folder using your file manager (Finder on Mac, Explorer on Windows).

**Step 3:** Rename the file with a `.md` extension if needed (e.g. `video-title.md`) — Obsidian will pick it up automatically on the next sync.

The note appears in Obsidian's file explorer and is fully editable.

## Structuring the Note for Maximum Usefulness

A raw transcript is a wall of text. Spending 5–10 minutes structuring it turns it into a genuinely useful knowledge note. Here's a template:

```markdown
# [Video Title]

**Source:** [YouTube URL]
**Channel:** [Channel Name]
**Date watched:** 2026-05-25
**Tags:** #video #[topic] #[topic]

## Key Takeaways
- 
- 
- 

## Raw Transcript

[paste transcript here]

## My Notes & Reactions

[your thoughts, questions, links to related notes]
```

Adding `[[wikilinks]]` inside the notes and reactions section — linking the ideas in this transcript to your other notes — is what creates value in Obsidian's graph over time.

## Adding YAML Front Matter

Obsidian supports YAML front matter at the top of notes. Adding it to your transcript notes makes them easier to filter, query with Dataview, and organise:

```yaml
---
title: "Video Title"
source: "https://youtube.com/watch?v=XXXXX"
channel: "Channel Name"
date: 2026-05-25
type: video-transcript
tags:
  - video
  - [topic]
---
```

This lets you build a Dataview table of all transcript notes, filtered by topic, date, or channel.

## Using AI to Process the Transcript Before Saving

If you want a summary or structured notes rather than (or in addition to) the raw transcript, paste the text into [Claude](/youtube-transcript-with-claude) or [ChatGPT](/youtube-transcript-for-chatgpt) first:

- Ask for bullet-point key takeaways
- Ask for a structured summary with headings
- Ask for glossary definitions of any new terms

Then save the AI-processed output into Obsidian alongside or instead of the raw transcript. You can always get the raw transcript back from YTTranscript if needed.

## Do You Need an Obsidian Plugin?

No. The copy-paste method requires nothing beyond Obsidian itself. That said, some community plugins can enhance transcript workflows:

- **Dataview**: Query all your transcript notes as a database
- **Templater**: Apply a consistent template automatically when creating transcript notes
- **Smart Connections**: AI-powered linking between notes (surfaces related ideas)

These are optional enhancements — the core workflow works without any of them.

## Obsidian vs Notion for Transcripts

Obsidian is better if you care about local-first storage, the graph view, and deep linking between ideas. Notion is better for collaborative access, database views across a team, and web-based availability. See our [YouTube transcript to Notion guide](/youtube-transcript-to-notion) and [YouTube transcript to Google Docs guide](/youtube-transcript-to-google-docs) for those workflows.

## Frequently Asked Questions

**How do I get a YouTube transcript into Obsidian?**
Get the transcript with YTTranscript, copy the text, create a new note in Obsidian, and paste. No plugin needed.

**Do I need an Obsidian plugin for this?**
No — the basic workflow requires no plugin. Plugins like Dataview can enhance how you query and organise the notes over time.

**What format should I save transcripts in?**
Markdown (.md) is native to Obsidian. Download the TXT from YTTranscript, rename to .md, or just paste into a new note.

**Is this free?**
Yes. YTTranscript is free and Obsidian is free for personal use.

---

Every YouTube video you watch is a potential knowledge node in your Obsidian vault. Getting the transcript is the step that turns it from something you watched and forgot into something you can search, link, and build on.

**[→ Get any YouTube transcript free at YTTranscript.app — paste it into Obsidian in seconds](https://yttranscript.app)**
