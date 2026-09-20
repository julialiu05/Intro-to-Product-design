# CONTINUE.md

Handover notes for DES 198, Introduction to Product Design.

Week 1 is finished and live. This document explains how to build Week 2 so it
matches, and how to get set up if you have never used GitHub before.

**Two audiences.** Part 1 is written for Claude Code, so if you are using it,
tell it to read this file first and it will have the full picture. Parts 2
onward are written for a person. You do not need to read Part 1 yourself,
though it will not hurt.

---

## Contents

1. [Brief for the agent](#1-brief-for-the-agent)
2. [Getting set up, if you have never used GitHub](#2-getting-set-up-if-you-have-never-used-github)
3. [Running the site on your computer](#3-running-the-site-on-your-computer)
4. [How Week 1 was actually made](#4-how-week-1-was-actually-made)
5. [Building Week 2, step by step](#5-building-week-2-step-by-step)
6. [Every slide layout](#6-every-slide-layout)
7. [The design language](#7-the-design-language)
8. [Images](#8-images)
9. [Checking it before you publish](#9-checking-it-before-you-publish)
10. [Publishing](#10-publishing)
11. [Saving your work with git](#11-saving-your-work-with-git)
12. [Do not touch](#12-do-not-touch)
13. [When something breaks](#13-when-something-breaks)

---

# 1. Brief for the agent

*If you are Claude Code, read this section in full before making any change.*

## What this project is

A course website for DES 198, a 2-unit student-run DeCal at UC Berkeley
taught by Julia Liu. The repo is `julialiu05/Intro-to-Product-design`, public,
deployed on Vercel.

It is **plain HTML, CSS and JavaScript. No build step, no framework, no
dependencies, no `package.json`.** This is deliberate. Do not introduce npm,
a bundler, TypeScript, React, or Tailwind. A student should be able to open
any file and read it.

## The concept

The site is a **macOS desktop**. `index.html` renders a menu bar, a wallpaper,
folder icons, a dock, and draggable windows. Each week of the course is a
folder on that desktop. Opening a folder shows a Finder-style file list.
Opening the deck inside it loads `scroll.html`, which is the week's lecture as
a vertically scrolling, snap-locked slide deck, framed inside a desktop
window.

The argument the design is making: a course is a filesystem, and each week is
a file you open.

## File map

| File | What it is | Edit it? |
|---|---|---|
| `course.js` | **All content.** Every word, date, reading, image path and slide. | **Yes. This is the file you edit.** |
| `index.html` | The desktop. The site root. | No |
| `scroll.html` | The scrolling deck page. | No |
| `site.js` | Renders slides (`slideHTML`) and the deck (`renderScroll`). | Only to add a layout |
| `desktop.js` | The desktop: windows, dock, folders, Quick Look, the generated reading list. | No |
| `apps.js` | The dock apps. | No |
| `base.css` | Structure only. Layout, flow, accessibility. No colour. | No |
| `desktop.css` | The Liquid Glass theme and all slide typography. | No |
| `wallpaper.js` | Rotates the three wallpapers. | No |
| `img/` | Wallpapers in the root, per-week images in `img/w1/`. | Add to it |
| `somethingstolookat.md` | Static copy of the Week 1 reading list, for GitHub readers. | Optional |
| `README.md` | The syllabus. Shown in the Read Me window. | If policy changes |

**The rule: content changes go in `course.js` and nowhere else.** Everything
else is shared by all thirteen weeks, and editing it to solve a one-week
problem breaks the other twelve.

## Data model

`course.js` exports one `COURSE` object. Top-level fields cover the syllabus,
staff, policies and attendance. Three switches control what the site shows:

```js
CURRENT_WEEK: 1,     // the week the site opens on
DESKTOP_WEEKS: 1,    // how many week folders appear on the desktop
weeks: [ ... ]       // one object per week
```

Each week object carries `week`, `date`, `title`, `status`, `summary`,
`agenda[]`, `readings[]`, `assignment{}`, `materials[]`, and `slides[]`.

If a week has no `slides` array, `autoDeck()` in `site.js:79` builds a usable
deck from the title, agenda, readings and assignment. So a week is never
broken, only plainer.

## Hard constraints

These came from the course owner and are not up for renegotiation:

- **No hand-drawn SVG or custom illustration.** Every icon on this site is an
  Apple Color Emoji rendered by the system emoji font, or the Apple logo
  glyph at U+F8FF. `favicon.svg` is a single `<text>` element holding one
  emoji, which is the only reason it is an SVG at all. If a graphic is needed,
  use a real photograph.
- **Slides carry only what goes on the screen.** No explanatory prose, no
  teaching notes in the slide body, nothing addressed to the reader. The
  person standing at the front does the explaining. If source material is
  being adapted into slides, reproduce its wording rather than paraphrasing
  it into an explanation.
- **Do not rewrite anyone's words.** Staff introductions, quotes and
  attributed passages are reproduced exactly as written, including the
  informal punctuation and emoji. Copy them verbatim.
- **No em dashes** anywhere in prose. Use a comma, a full stop, or a colon.
- **Third-party lecture images are cleared for use** in this course. Credit
  the source in the caption. Do not remove them on copyright grounds.
- **Emails are obfuscated** in all visible text, written as
  `name[at]berkeley[dot]edu`, because the repo is public and gets scraped.
- **Week 1 is finished.** It went through many rounds of edits and its wording
  is deliberate. Do not touch it while building Week 2.

## Verification habits

Two things have repeatedly produced false results in this project, so:

- **Do not verify by running a regex over source files.** `course.js`,
  `wallpaper.js` and `README.md` all contain doc-comment examples with fake
  paths like `img/wall-9.jpg` and `img/thing.png`. A regex scan reports these
  as missing files. Check the real DOM or real git output instead.
- **Headless Chrome does not reliably advance CSS transitions** under
  `--virtual-time-budget`. A slide that appears blank in a headless screenshot
  is usually the scroll-reveal transition not having run, not a bug. Verify
  in a real browser before chasing it.

To genuinely verify assets are committed and will survive deployment:

```bash
git status --short                      # nothing untracked
git ls-files img | wc -l                # matches the file count on disk
git check-ignore -v img/w2/*            # nothing silently ignored
```

Filename case matters. macOS is case-insensitive, the Vercel host is not, so
`Chair.jpg` referenced as `chair.jpg` works locally and 404s in production.

---

# 2. Getting set up, if you have never used GitHub

Skip this part if you already have the repo on your computer.

Nothing here is hard, and you can ask Claude Code to do most of it. The one
thing it cannot do for you is log in, because that needs your password, and
you should never give a password to an AI agent. Those steps are marked.

## What GitHub is, in two sentences

GitHub is a shared folder for code that remembers every version of every file.
You copy the folder to your computer, change things, and send your changes
back, and everyone else gets them.

Three words you will see:

- **clone** means download the project to your computer, the first time
- **pull** means get everyone else's latest changes
- **push** means send your changes back up

## Step 1: get access to the repo

Julia has to do this part. Ask her to:

1. Go to <https://github.com/julialiu05/Intro-to-Product-design>
2. Click **Settings**, then **Collaborators** in the left sidebar
3. Click **Add people**, type your GitHub username, and send the invite

You will get an email. Click the link in it and accept.

If you do not have a GitHub account yet, make one first at
<https://github.com/signup>. It is free.

## Step 2: install the GitHub command line tool

Open Terminal. It is in Applications, then Utilities, or press Cmd+Space and
type "Terminal".

Paste this and press Enter:

```bash
brew install gh
```

If it says `brew: command not found`, install Homebrew first by pasting the
command from <https://brew.sh>, then run the line above again.

## Step 3: log in

**You must do this one yourself.** Paste this and press Enter:

```bash
gh auth login
```

It asks a few questions. Answer:

- **GitHub.com**
- **HTTPS**
- **Yes**, authenticate git with your GitHub credentials
- **Login with a web browser**

It shows you a short code and opens your browser. Paste the code there and
approve. Then come back to Terminal.

You only ever do this once.

## Step 4: download the project

```bash
cd ~/Desktop
gh repo clone julialiu05/Intro-to-Product-design
cd Intro-to-Product-design
```

You now have the whole site in a folder on your Desktop.

## Step 5: point Claude Code at it

In Terminal, from inside that folder:

```bash
claude
```

Then tell it:

> Read CONTINUE.md before doing anything. I am adding Week 2 to this course site.

From that point on you can ask it to do the git work in plain English. "Save
my changes and push them" is a complete instruction. You do not need to
memorise any git commands.

---

# 3. Running the site on your computer

There is nothing to install and nothing to build.

```bash
cd ~/Desktop/Intro-to-Product-design
python3 -m http.server 8000
```

Open <http://localhost:8000> in your browser.

Leave that Terminal window running while you work. Every time you save a
change to `course.js`, just refresh the browser.

**Serve it, do not double-click `index.html`.** Opening the file directly
mostly works, but the slide deck loads inside a frame and browsers block
that on `file://`, so the decks will come up empty.

To stop the server, press Ctrl+C in that Terminal window.

---

# 4. How Week 1 was actually made

Useful context, because Week 2 should be made the same way.

1. **The source material came first.** Julia had a Google Slides deck and two
   articles she wanted taught. Nothing was invented for the site.
2. **The deck was transcribed, not summarised.** Slides were built from what
   the source said, in the source's words. Where an article was the source,
   its phrasing was kept and credited in a code comment above those slides,
   like `/* From "Product design in 2026" by Kike Peña, UX Collective, April
   2026. The wording is his. */`.
3. **Staff introductions were pasted verbatim.** Each person wrote their own
   sentence. The lowercase, the `<3`, the `😎😎` are all theirs and were left
   alone.
4. **Images were sourced as real photographs**, dropped into `img/w1/` with
   descriptive filenames, and credited in the caption where they came from
   someone else.
5. **The deck was structured with numbered section dividers.** Week 1 runs
   `01 Introductions`, `02 How this class runs`, `03 What is design?`,
   `04 What is good design?`, `05 Three jobs people confuse`, `06 Product
   design in 2026`, `07 Homework`. Seven `section` slides, each with a `num`.
6. **It closes with the homework.** An `assignment` slide, then one
   interactive example of what the homework could look like.
7. **Everything was checked in a real browser**, then committed and pushed.

The shape to copy: a title, numbered sections, a mix of statements and
points, images where a point is visual, an exercise if there is one, and the
assignment at the end. Week 1 is 47 slides. Anywhere from 30 to 50 is normal.

---

# 5. Building Week 2, step by step

## Step 1: open `course.js`

It is the only file you need. Everything below happens in it.

## Step 2: find the `weeks` array

Scroll to `weeks: [`. It contains one object, Week 1, which ends with:

```js
      ],
    },
  ],
};
```

Week 2 goes in as a second object, after the `},` that closes Week 1 and
before the `],` that closes the array.

## Step 3: paste the skeleton

```js
    {
      week: 2,
      date: "Sep 9",
      title: "The title of the week",
      status: "draft",
      summary: "",
      agenda: [
        "What happens first",
        "Then this",
      ],
      readings: [
        {
          title: "Name of the thing",
          author: "Who made it",
          kind: "Essay",              // Essay, Video, Post, Film, Book chapter
          optional: true,             // delete this line if it is required
          url: "https://...",         // delete this line if it is not online
          note: "Why it is on the list, in a sentence or two.",
        },
      ],
      assignment: {
        title: "What they are making",
        due: "Wed Sep 30, 11:59pm",
        dueDate: "2026-09-30",        // the same date, ISO format
        body: "The brief, in a sentence or two.",
        deliverable: "How they hand it in.",
      },
      materials: [],
      slides: [
        { layout: "title" },
        // the deck goes here
      ],
    },
```

Two things that bite:

- **Keep `status: "draft"` while you work.** It greys the folder out and stops
  students opening a half-written deck. Change it to `"published"` at the end.
- **`due` and `dueDate` must be the same date.** The Calendar app in the dock
  reads the ISO one and the slides read the human one. If they drift, the site
  contradicts itself.

## Step 4: write the deck

Slides are a list, in the order people will see them. Each one is an object
with a `layout`. Part 6 lists every layout with an example.

A reliable structure, taken from Week 1:

```js
slides: [
  { layout: "title" },

  { layout: "section", text: "First part", num: "01" },
  { layout: "statement", text: "The one line that sets it up." },
  { layout: "points", heading: "...", points: ["...", "..."] },

  { layout: "section", text: "Second part", num: "02" },
  { layout: "gallery", heading: "...", items: [ ... ] },
  { layout: "two", heading: "...", left: {...}, right: {...} },

  { layout: "section", text: "Homework", num: "03" },
  { layout: "assignment" },
],
```

Write the sections first, then fill them in. It is much easier to see whether
a lecture holds together as seven dividers than as fifty slides.

## Step 5: add the images

See Part 8. Short version: make `img/w2/`, use lowercase hyphenated
filenames, reference them exactly.

## Step 6: turn it on

When it is finished, three switches:

```js
status: "published",   // in the Week 2 object
CURRENT_WEEK: 2,       // at the top of course.js
DESKTOP_WEEKS: 2,      // at the top of course.js
```

`DESKTOP_WEEKS` controls how many folders sit on the desktop. It goes up by
one each week you release, so by December the desktop has thirteen folders on
it and you can see the whole term at a glance. That is the intended effect.

## Step 7: check it, then push

Parts 9 and 11.

---

# 6. Every slide layout

There are thirteen. Week 1 uses all of them, so if a description is unclear,
search `course.js` for that layout and copy the shape.

*Note: the `SLIDE CHEATSHEET` comment at the bottom of `course.js` predates
four of these and is incomplete. This list is the accurate one.*

### title

Opens the deck. Fills in the week number, title and date by itself.

```js
{ layout: "title" }
```

### section

A full-screen divider between parts of the lecture. Number them.

```js
{ layout: "section", text: "What is design?", num: "03" }
```

### statement

One large line alone on the screen. The most-used layout in Week 1. For the
sentence you want people to sit with.

```js
{ layout: "statement",
  text: "The lines between them are moving.",
  sub: "Optional smaller line underneath." }
```

### points

A numbered list. Keep each point readable from the back of the room.

```js
{ layout: "points",
  heading: "Semester at a glance",
  points: [
    "First two weeks are intros into design.",
    "Week 3 to week 10 is project weeks.",
  ] }
```

### two

Two columns. Week 1 uses it for a claim and its counter-claim, which is what
it is best at: the point is the tension, so both halves need to be visible at
once.

```js
{ layout: "two",
  heading: "Design should be simple.",
  left:  { label: "The case", body: "..." },
  right: { label: "However",  body: "..." } }
```

Use `\n` inside `body` for a line break.

### columns

Like `two`, but for three or more things, and each column can carry its own
bullet list. Week 1 compares UI/UX, product design and design engineering
with it.

```js
{ layout: "columns",
  heading: "Three jobs people confuse",
  items: [
    { label: "UI/UX design",
      body: "The screens and the path through them.",
      list: ["How it looks and how it feels to use", "Hands off an interface"] },
    { label: "Product design",
      body: "What to build, for whom, and why.",
      list: ["Research, problem framing, tradeoffs", "Hands off a decision"] },
  ] }
```

### quote

```js
{ layout: "quote",
  quote: "New designers should be measured on how big their imagination is.",
  attribution: "Carlos Pinilla" }
```

Do not add the quotation marks. The layout draws them.

### person

One slide per person, portrait on one side and their words on the other. Used
for introductions. `photo` is optional: without it the slide still renders and
leaves an empty frame, so you can write it before you have the picture.
Portraits are cropped to 4:5, so any vertical shot works as-is.

```js
{ layout: "person",
  role: "TA",
  name: "Their name",
  detail: "name[at]berkeley[dot]edu",
  photo: "img/w2/theirname.jpg",
  lines: ["Their introduction, in their own words."] }
```

Paste what they wrote. Do not tidy it up.

### figure

One image, full width, with a caption. Credit the source in the caption.

```js
{ layout: "figure",
  src: "img/w2/thing.jpg",
  caption: "© Katerina Kamprani, The Uncomfortable" }
```

### gallery

A row of captioned images, for several examples at once. Week 1 uses it for
the six chairs and for before-and-after comparisons. `note` is the small bold
bit after the label, which is what makes a row of prices read as a range
rather than as six separate captions.

```js
{ layout: "gallery",
  heading: "All six of these are chairs",
  items: [
    { src: "img/w2/one.jpg", label: "National Public Seating 50 Series", note: "$18" },
    { src: "img/w2/two.jpg", label: "BALTSAR Ikea Chair", note: "$169" },
  ],
  caption: "Optional line underneath that makes the point." }
```

Six items get a dedicated six-across grid. Other counts wrap on their own.
Images are fitted, not cropped, so mixed shapes are fine.

### exercise

An in-class prompt with a time on it.

```js
{ layout: "exercise", heading: "In pairs", prompt: "Do this.", time: "10 min" }
```

### assignment

Fills in that week's homework from the `assignment` block you already wrote.
Good last slide.

```js
{ layout: "assignment" }
```

### nametag

The interactive nametag from Week 1: you can type on it, click to recolour it,
and it tilts toward your cursor. It is specific to the Week 1 homework. Listed
here so you know what it is, not because Week 2 needs it.

### Two extras any slide can take

`note` adds a presenter note under the slide:

```js
{ layout: "statement", text: "...", note: "Remember to mention the thing." }
```

`tap` puts a badge on the slide that appears when clicked and disappears when
clicked again. Week 1 uses `tap: "🔁 ×10"` on the design process loop, so the
point that the list repeats lands as a click instead of being spelled out.

---

# 7. The design language

The site is built to look like **macOS Tahoe and its Liquid Glass finish**.
You do not need to write any CSS, because the layouts above are already
styled. But knowing what it is aiming at will keep your content from fighting
it.

## What Liquid Glass means here

- **The menu bar is fully transparent.** The wallpaper runs straight under it.
- **Windows have no opaque background.** The title bar and sidebar are glass
  and the wallpaper shows through them. Only the content area is solid enough
  to read against.
- **Corners are concentric.** An inner radius equals the outer radius minus
  the gap between them, so the curves stay parallel instead of fighting.
  `--r-win` and `--r-in` in `desktop.css` are set up that way and have to
  stay in step.
- **Glass has a lit edge.** Every glass surface carries a bright inset line
  along its top and a darker one along its bottom. That rim, not a border, is
  what makes it read as a material rather than a grey box.
- **One opacity dial.** `--glass-op` drives every glass surface at once, and
  the Apple menu exposes it, the way macOS does. Legibility has to survive at
  both ends of it.

## Typography

SF Pro, via `-apple-system`, which is the real system font on any Mac. The
scale is Apple's: tight negative letter-spacing on large text, an uppercase
grey kicker above titles, `#1d1d1f` for ink and `#6e6e73` for secondary text.
Everything is fluid, sized in `clamp()`, so it holds from a phone to a
projector.

## Assets

There is no official Apple design system for the web. Apple ships the macOS
UI Kit as Figma and Sketch files only, and those and SF Symbols are licensed
for software running on Apple's own operating systems, which a course website
is not. So the site uses the only Apple assets a Mac already serves: **SF Pro**
as the font, **Apple Color Emoji** for every file, folder and dock icon, and
the Apple logo glyph at U+F8FF.

This is why the no-custom-SVG rule exists. It is not a stylistic preference.
Hand-drawing an icon would break the one thing making the interface convincing,
which is that every icon on it is the real system artwork.

## What this asks of your content

- **Photographs, not illustrations.** Real images of real things.
- **Short lines.** The type is large and the slides are one-idea-each. If a
  point needs three sentences, it is two slides.
- **Restraint.** Week 1 alternates `statement` and `points` for most of its
  length. That monotony is intentional. Reaching for a different layout every
  slide makes the deck look nervous.
- **No emoji in slide headings.** Emoji are the icon system on this site, so
  using them as decoration in prose muddies what they mean. The one exception
  is a `tap` badge, where the emoji is the content.

---

# 8. Images

Week 1's images live in `img/w1/`. Make `img/w2/` for yours.

```bash
mkdir img/w2
```

Then drop the files in, and reference them as `img/w2/filename.jpg`.

Rules that actually matter:

- **Filenames are case sensitive once the site is live.** Your Mac does not
  care whether it is `Chair.jpg` or `chair.jpg`, but the server the site runs
  on does. A mismatch works perfectly on your computer and shows a broken
  image to every student. Use lowercase with hyphens and copy the name
  exactly.
- **Use `.jpg` and keep each file under about 500KB.** They go into a repo
  that people download.
- **Name them for what they are.** `chair-eames.jpg`, `dropbox-2019.jpg`,
  `push-pull.jpg`. Not `Screenshot 2026-09-19 at 4.02.11 PM.png`.
- **Credit anything you did not make**, in the `caption`, the way Week 1
  credits The Uncomfortable.
- **Commit them.** Images sit on your laptop until you do, so the site looks
  perfect to you and broken to everyone else. After adding any image, run
  `git status` and make sure nothing is listed as untracked. This is the
  single most common way to break this site.

---

# 9. Checking it before you publish

With the local server running, walk through all of this:

1. Open <http://localhost:8000> and double-click the Week 2 folder.
2. Open the deck and scroll the whole way through. Every slide should fill one
   screen and lock into place as it arrives.
3. Look for broken images. A missing file shows as an empty box.
4. Open "Some things to look at.md" in the folder and click every link.
5. **Open the browser console** with Cmd+Option+J and confirm there is nothing
   red. One missing comma in `course.js` stops the entire page rendering, and
   the console is where it tells you which line.
6. Check the due date on the homework slide matches the one in the Calendar
   app in the dock.
7. Drag the window narrow, and check the site on your phone if you can.
8. Run `git status` and confirm no image is listed as untracked.

---

# 10. Publishing

The site is on Vercel and redeploys itself whenever anything is pushed to
GitHub. There is no deploy button and nothing to configure.

So publishing is: flip the three switches in Part 5 Step 6, then push. Give it
about a minute and the live site updates.

---

# 11. Saving your work with git

If you are using Claude Code, you can skip this and just say "save my changes
and push them". It will do all of it. Read on if you want to know what it is
doing.

**Before you start work each day**, get everyone else's changes:

```bash
git pull
```

**When you have finished something**, save and send it:

```bash
git add .
git commit -m "Add Week 2"
git push
```

`add` marks your changes, `commit` saves them with a note about what you did,
`push` sends them to GitHub. All three, in that order, every time.

**If you would rather not push straight to the live site**, work on a branch
and let Julia review it:

```bash
git checkout -b week-2
git add .
git commit -m "Add Week 2"
git push -u origin week-2
gh pr create --title "Week 2" --body "Draft of week 2."
```

That opens a pull request, which is a proposed change Julia can look at and
merge. Nothing goes live until she does. For a first contribution this is the
safer path.

---

# 12. Do not touch

- **`index.html`.** Do not rename, move or delete it. It is what the site
  serves at its address. If it moves, the entire site goes to a 404 page.
- **`site.js`, `desktop.js`, `apps.js`, `base.css`, `desktop.css`,
  `wallpaper.js`.** All content lives in `course.js`. Every one of these is
  shared by all thirteen weeks, and changing one to fix a Week 2 problem
  breaks Week 1.
- **Week 1.** It went through many rounds of edits and the wording in it is
  deliberate.
- **New slide layouts.** There are thirteen. A deck that uses six of them
  consistently looks better than one that uses all thirteen once each.
- **Custom icons and illustrations.** See Part 7. Use a photograph.
- **npm, a build step, a framework.** The site has no dependencies and that is
  the point.

---

# 13. When something breaks

## The page is blank, or stops at the wallpaper

Almost always a typo in `course.js`: a missing comma between two slides, an
unclosed quotation mark, an unbalanced bracket. Open the browser console with
Cmd+Option+J. The red line names the file and the line number.

The most common version of this is forgetting the comma between the Week 1
object and the Week 2 object.

## An image shows as an empty box

Either the filename in `course.js` does not match the file exactly, including
capital letters, or the file was never committed. Check both.

## It works for you and is broken for everyone else

You did not commit an image. Run `git status`, and if anything under `img/` is
listed as untracked, `git add .` and push again.

## You want to undo everything since your last save

```bash
git stash        # puts your changes aside
git stash pop    # brings them back, if you change your mind
```

## Nothing above helped

Open Claude Code in the project folder, tell it to read `CONTINUE.md`, and
describe what you are seeing. Or email
julia[dot]liu05[at]berkeley[dot]edu.
