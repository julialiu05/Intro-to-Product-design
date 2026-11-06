---
name: clean-case-study
description: Lay out a design case study as a clean, editorial single page in plain HTML and CSS. Use when a student has their case study material and wants the page to look calm and considered, with one column of writing, large figures, a sticky side nav and a metadata grid, and none of the generic AI look. Works with the nine parts from the case-study-page skill or any project write-up.
---

# Clean case study

You are laying out a design student's case study so it reads like a good
editorial page: one column of writing, big quiet figures, a lot of air.
The page should feel like it was made by one careful person, not generated.

Structure and words are not your job here. If the student does not have
their sections written, point them to the `case-study-page` skill first.
This skill is the visual layer on top of it.

## The look, in one paragraph

Warm off-white page. One typeface. Black text, grey secondary text, one
hairline colour for rules. No cards, no shadows, no gradients, no icons,
no emoji, no decorative shapes. Headings are big and tight. Body text sits
in a narrow measure with room on both sides. Figures are wider than the
text and have a caption under them. The page scrolls; nothing animates.

## Tokens

Set these on `:root` and use nothing else.

```css
--paper: #f9f8f6;
--ink: #1a1a1a;
--ink-soft: #6b6b6b;
--hair: #e6e3de;
--text: 720px;      /* measure for prose */
--wide: 1040px;     /* figures may break out to this */
--gutter: 20px;     /* side margin on a phone */
```

Type: Inter, loaded from Google Fonts, with `-apple-system, system-ui`
as the fallback. If the student prefers the system font, drop Inter and keep
the scale.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Title | clamp(36px, 6vw, 56px) | 600 | letter-spacing -0.02em, line-height 1.05 |
| Section heading | 26px | 600 | letter-spacing -0.01em |
| Eyebrow | 12px | 500 | uppercase, letter-spacing .08em, `--ink-soft` |
| Body | 17px | 400 | line-height 1.6, max-width `--text` |
| Caption | 13px | 400 | `--ink-soft`, line-height 1.45 |

No more than three type sizes visible at once.

Spacing on an 8px grid. Between sections: 112px (64px on a phone). After a
heading: 24px. Between paragraphs: 1em. Around a figure: 48px above and
below.

## Page anatomy, top to bottom

1. **Hero.** Eyebrow (course, term), title, one-sentence dek in `--ink-soft`,
   then the metadata grid: Role, Timeline, Team, Tools. Four columns on a
   laptop, two on a phone, each a label in eyebrow style over a value.
   No hero image. The first figure comes after the Overview text.
2. **Side nav.** On screens 1024px and wider, a sticky list of the section
   names in the left margin, 13px, `--ink-soft`, current section in `--ink`.
   Hidden below 1024px; the page reads fine without it.
3. **Sections.** Each starts with a small number and the heading, like
   `01` over `Overview`, separated from the previous section by a hairline
   rule. Prose in the measure. Figures break out to `--wide` and centre.
4. **Figures.** `<figure>` with an image or video and a `<figcaption>`.
   Corners square or 4px at most. Two-up comparisons (before and after, two
   options) are a two-column grid with a label over each half, stacking on
   a phone.
5. **Quotes.** Interview quotes verbatim, as a block: 22px, regular weight,
   with the speaker's role in caption style underneath. No quotation-mark
   glyphs as decoration.
6. **Decisions.** Each decision as a three-line block: what they chose, what
   they turned down, why. Label each line in eyebrow style.
7. **Footer.** Name, email obfuscated as `name[at]berkeley[dot]edu`, a link
   to the prototype and the repository. Hairline above it.

## Media

- Images full width of their container, `height: auto`, `loading="lazy"`
  after the first.
- Videos `<video controls muted playsinline preload="metadata">` with a
  poster frame. Flows and prototypes are video, not rows of screenshots.
- Compress: images under 500 KB, videos under about 10 MB. Filenames
  lowercase with hyphens, referenced exactly.

## Writing that fights the layout

The design only works if the words are plain. Flag these to the student,
do not fix them silently:

- Openers like "In today's fast-paced world" or "Design is everywhere".
- Em dashes. Use a comma, a full stop or a colon.
- A sample turned into a percentage ("80% of users" from five people).
- Labels with colons where a sentence would do.
- Headings with emoji or exclamation marks.

## Build

One `index.html`, one `style.css`, an `assets/` folder. No framework, no
build step, no JavaScript except the few lines that mark the current
section in the side nav. Mobile first: write the phone layout, then add
the side nav and the wide figures at 1024px.

Show it in a browser before you call it done, at a phone width and a
laptop width.

## Check

- Body text never wider than `--text`; figures never wider than `--wide`.
- At 390px wide: no sideways scroll, 20px side margins, metadata in two
  columns, side nav hidden.
- Contrast: `--ink` on `--paper` for all reading text; `--ink-soft` only
  for captions, eyebrows and the dek.
- Every figure has a caption that says what it shows.
- Nothing on the page is a card, a shadow, a gradient or an icon.
- No placeholder text: search for "lorem", "TODO", "[".
- Every link works. Prototype video plays on a phone with sound off.
