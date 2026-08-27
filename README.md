# DES 198 — Introduction to Product Design

A course site styled as a thermal-printed restaurant receipt. Plain HTML, CSS and
JavaScript. No build step, no dependencies, no server needed — open `index.html`.

## Files

| File | What it is |
|---|---|
| `course.js` | **All content.** The only file you edit week to week. |
| `index.html` | The check — course header, the full schedule, totals. |
| `week.html` | One week, as a kitchen ticket. Reached via `week.html?w=3`. |
| `slides.html` | The deck for a week. Reached via `slides.html?w=3`. |
| `syllabus.html` | The fine print — policies, staff, enrollment. |
| `site.css` | The whole design system. |
| `site.js` | Rendering. You shouldn't need to touch this. |

## Updating it each week

Open `course.js`. Everything is in one object.

**Every Wednesday**, change one number:

```js
CURRENT_WEEK: 3,   // → 4
```

That moves the red "THIS WEEK" stamp and the marker on the schedule.

**To publish a week**, set its status:

```js
status: "published",   // "draft" greys the row out and disables its page
```

**To edit a week**, find it in the `weeks` array and change the fields:

```js
{
  week: 5,
  date: "Sep 30",
  title: "Structure: flows, states, and information architecture",
  status: "published",
  summary: "One or two sentences shown on the schedule and the week page.",
  agenda: ["First thing", "Second thing"],
  readings: [{ title: "...", author: "...", note: "optional" }],
  assignment: { title: "...", due: "...", body: "...", deliverable: "..." },
  materials: [{ label: "Figma starter file", kind: "Figma" }],
}
```

**To add a week**, copy any block in `weeks` and change the numbers. Totals,
navigation and next/previous links all follow automatically.

## Slides

Every week already has a deck. If a week has no `slides` array, the deck is
generated from its title, agenda, readings and assignment — so a new week is
presentable the moment you write it. Weeks 1 and 2 have hand-written decks; use
them as a model.

To write your own, add a `slides` array to the week. Available layouts:

```js
{ layout: "title" }                                   // auto-fills from the week
{ layout: "section",   text: "Teardown", num: "01" }
{ layout: "statement", text: "One big line.", sub: "Optional." }
{ layout: "points",    heading: "...", points: ["a", "b"] }
{ layout: "two",       heading: "...",
                       left:  { label: "Leading", body: "..." },
                       right: { label: "Open",    body: "..." } }
{ layout: "quote",     quote: "...", attribution: "..." }
{ layout: "exercise",  heading: "In pairs", prompt: "...", time: "10 min" }
{ layout: "figure",    src: "img/thing.png", caption: "..." }
{ layout: "assignment" }                              // auto-fills. good closer.
```

Any slide can carry `note: "..."` — a presenter note, hidden until you press `N`.

### Presenting

| Key | Does |
|---|---|
| `→` `space` `J` | Next slide |
| `←` `K` | Previous |
| `1`–`9` | Jump to that slide |
| `O` | Overview grid |
| `N` | Toggle presenter notes |
| `F` | Fullscreen |
| `⌘P` | Export the deck to PDF, one slide per landscape page |

Clicking the right side of a slide advances; the left side goes back. Swipe on a
phone. The slide number lives in the URL hash, so you can link to
`slides.html?w=2#4` and land on slide 4.

## Publishing it

It's a static site, so anything works:

```bash
npx vercel        # from this folder
```

or drag the folder onto Netlify, or push to GitHub and turn on Pages.

To preview locally with clean URLs:

```bash
python3 -m http.server 8000
```

## Design notes

A recreation of a Costco warehouse receipt. The rules below are what actually
make one recognisable, and the CSS is written against them:

**Monochrome.** Black thermal print on white. A real Costco receipt has no
accent colour anywhere, so neither does this. Emphasis is *reverse video* —
white on black — which is a real receipt-printer mode, not a design flourish.

**One font, one weight.** Everything is Share Tech Mono at 400. Bold is faked
the way the printer fakes it, by striking the same glyph twice a hair offset:
that's the `.strike` class. Big text is the same font stretched horizontally,
not a larger point size: that's `.dw`, and it's why the WHOLESALE banner looks
squashed-tall. Both are correct.

**Almost no rules.** Costco separates things with blank feed lines, not
dividers. There are two dashed rules in the entire document. Use `.gap` and
`.gap--l` instead of adding more.

**The tells, all present:** 7-digit item numbers, hard-left item column,
right-flush prices, the single-letter tax code in the last column, the `E`
prefix, `****  TOTAL`, `TOTAL NUMBER OF ITEMS SOLD =`, the member number,
`XXXXXXXXXXXX2026 CHIP READ`, and the door-scan barcode at the bottom.

**How the course maps onto the format:**

| Receipt thing | Course thing |
|---|---|
| Item number | Derived from the week number, stable |
| Item description | The week's title |
| Price | The date |
| `E` prefix | That week has something due |
| Tax code `A` / `N` | Posted / not yet posted |
| Instant-savings line | This week, referencing the item number above it |
| Faded print | Weeks already taught — thermal print fades |

Two deliberate departures, both for reading on a screen: the tape is wider than
a real 3⅛-inch receipt, and week titles aren't truncated to 22 characters the
way a real item description is.

Other details worth not breaking:

- The paper edge is a fine serration (`--cut`), a printer's cutter rather than
  a torn edge.
- On load the receipt prints itself, line by line, with a print head sweeping
  down the page. All of it is off under `prefers-reduced-motion`.
- Dark mode is a real second palette. It follows the system setting unless you
  use the "Lights" toggle.
- `html { font-size }` in `site.css` is the single dial for scale — raise it and
  the paper and the print both grow, in proportion.

The header block (warehouse number, address, member number, operator) is edited
in `course.js` under `receipt`.
