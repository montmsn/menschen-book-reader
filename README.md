# Menschen Book Reader

Interactive study companion for **Menschen A1.1**: read your own copy of the book with notes, highlights, audio, translation, saved words and a guided lesson path.

> The book PDFs and audio are **not included** (they are copyrighted by Hueber). You need your own copy.

## Features

- **Reader** – Kursbuch, Arbeitsbuch and both answer keys page by page, with zoom and keyboard navigation
- **Do the exercises on the page** – ⌨️ type answers straight into the blanks, ☑️ tick boxes (✓ / ✗); saved per page and scaled with zoom
- **Notes** – pinned notes, highlights, pen drawing and a note for each page, with undo
- **Audio** – the book's tracks grouped by lesson; follows the Kursbuch lesson you're reading; speed, loop, back 5 s
- **Translator** – select or double-click a word on the page → translation (Google Translate) and German pronunciation; 9 target languages
- **OCR correction** – fix misread words; the correction is remembered next time
- **Saved words** – save words with their translation and where they appeared; jump back to that spot; flashcard review
- **Study path (Lernpfad)** – each lesson step by step: Kursbuch → answers → Arbeitsbuch → answers → trainer; progress saved automatically
- **Trainer** (`index.html`) – extra vocabulary, quiz, grammar and fill-in-the-blank practice for Lessons 1–12
- **Interface language** – 🌐 switches menus between German and English (book content stays German)

Everything is saved in your browser; use **Export / Import** to back it up or move it.

## Setup

1. Put your book files in `A1/actual book/` with these names:

   ```
   A1/actual book/
   ├── Menschen A1.1 Kursbuch OCR neu.pdf
   ├── Menschen A1.1 Arbeitsbuch OCR.pdf
   ├── Menschen A1.1 Kursbuch-Loesungen.pdf
   ├── Menschen A1.1 Arbeitsbuch Loesungen.pdf
   ├── Menschen A1.1 Kursbuch Audio/Menschen A1.1 Kursbuch Audio/*.mp3
   └── Menschen A1.1 Arbeitsbuch Audio/Menschen A1.1 Arbeitsbuch Audio/*.mp3
   ```

   The track list is in `A1/audio/tracks.json`.

2. Start it:
   - **macOS:** double-click `start.command`. The first time, right-click → Open if macOS blocks it.
   - **Any system:** `python3 -m http.server 8001 --directory A1`, then open http://localhost:8001/reader.html

Requires Python 3 and a modern browser. Translation needs an internet connection.
