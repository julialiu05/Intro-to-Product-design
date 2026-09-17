# DES 198 — Introduction to Product Design

The course site: a macOS desktop you open a week from, and a deck you read by
scrolling. Plain HTML, CSS and JavaScript. No build step, no dependencies, no
server needed. Open `desktop.html`.

## Files

| File | What it is |
|---|---|
| `course.js` | **All content.** The only file you edit week to week. |
| `scroll.html` | The deck: scroll, one slide per screen. |
| `wallpaper.js` | The rotating wallpaper, shared by the desktop and the scroll deck. |
| `desktop.html` | The desktop front door. Every week is a file. |
| `base.css` | Structure: layout, flow, accessibility. |
| `site.js` | Builds the scroll deck from `course.js`. |
| `desktop.css`, `desktop.js` | The desktop. Self-contained, reads `course.js`. |
| `apps.js` | The dock apps: Calendar, and Games (2048, Connect Four). |
| `somethingstolookat.md` | Extra reading, not required. |
| `img/wall-*.jpg` | The desktop wallpapers, rotated. |
| `img/w1/` | Week 1 images: portraits and lecture examples. |
| `favicon.svg` | The tab icon, an emoji. |

## Updating it each week

Open `course.js`. Everything is in one object.

**Each week**, change one number:

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

One slide per person, for introductions:

```js
{ layout: "person",
  role: "TA",
  name: "Their Name",
  detail: "Major, year",
  photo: "img/w1/their-name.jpg",   // drop the file in img/w1/
  lines: ["A sentence.", "Another sentence."] }
```

`photo` may be left empty: the slide still works and leaves the frame blank
until you have the picture. Portraits are cropped to 4:5, so a vertical shot
needs no preparation.

One extra layout, for showing several examples at once:

```js
{ layout: "gallery", heading: "All six of these are chairs",
  items: [
    { src: "img/w1/chair-folding.jpg", label: "National Public Seating", note: "$18" },
    ...
  ],
  caption: "The line underneath that makes the point." }
```

`note` is set apart from the label, which is what makes a row of prices read
as a range rather than as six captions.

Any slide can carry `note: "..."`, shown under the card in the deck.
Any slide can carry `tap: "🔁 ×10"`: click the card and it appears.

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

## The desktop

`desktop.html` is a second way into the same content: a Finder window where
every week is a file.

| Finder thing | Course thing |
|---|---|
| File name | `Week 03 · From notes to a problem worth solving.week` |
| Date Modified | The class date |
| **Kind** | The design that week wears |
| Status | Taught, This week, Posted, Not posted |
| Greyed-out file | A draft week, the way a file you can't open yet reads |

The Kind column is the reason this exists. It puts thirteen different designs
in one sortable column of one window, which is the argument the site makes
every Wednesday, stated as a file attribute. Click Kind to sort by it.

**Assets.** Nothing here is drawn by hand. There is no official Apple design
system for the web: Apple ships the macOS UI Kit as Figma and Sketch files
only, and those, SF Symbols and SF Pro are all licensed for software running
on Apple's own operating systems, which a course site is not. So the icons are
Apple Color Emoji and the type is SF Pro via `-apple-system`, both served by
the OS. Do not replace them with drawn SVG.

**The desktop starts empty.** No window opens on load, because a desktop that
greets you with a window is not a desktop. You open what you want from it.

**One folder per week released.** The desktop carries week folders and nothing
else, and it fills up as the term runs: one folder in September, thirteen by
December, the whole course sitting there. `DESKTOP_WEEKS` in `course.js` is the
only dial. Add one each week you release, the same way you bump `CURRENT_WEEK`:

```js
DESKTOP_WEEKS: 1,   // → 2
```

Opening a week folder lists what is actually in that week: the week page
itself, its deck, each reading as a PDF, the assignment as a task, and any
materials. The schedule and Read Me live in the dock rather than on the
desktop, so the desktop stays week folders only.

**The wallpaper rotates.** `WALLPAPERS` at the top of `desktop.js` is the list
and `WALL_EVERY` is the interval; the files live in `img/`. It crossfades
between two stacked layers, since you cannot fade an element to a different
version of itself, and it preloads everything so a fade never catches an image
mid-download. Which one you get first is random, so the site does not always
greet you the same way. Under `prefers-reduced-motion` it picks one and stays.

Two things to check when you add a wallpaper. The menu bar and the icon labels
sit straight on the picture with no panel behind them, and their ink is dark
(`--desk-ink`), so a new file wants a light top edge where the menu bar lands.
And glass takes its character from what is behind it, so a flat image makes the
sidebar and toolbar look like plain grey panels.

**Each wallpaper declares its own ink.** The menu bar and the icon labels sit
straight on the picture with no panel behind them, so a pale image needs dark
text and a dark image needs white. Getting it wrong does not look slightly off,
it makes the menu bar disappear. So it is stated per file rather than assumed:

```js
var WALLPAPERS = [
  { src: "img/wall-1.jpg", ink: "dark"  },   // pale image, dark text
  { src: "img/wall-9.jpg", ink: "light" },   // dark image, white text
];
```

Judge it by the **top** of the image, where the menu bar lands, not by the
picture as a whole. The ink changes with the crossfade, so a set can mix pale
and dark images freely.

**Liquid Glass.** The desktop is built to Apple's current design language, the
one introduced with macOS 26 Tahoe and refined in macOS 27, rather than the
older flat chrome. In practice: the menu bar is transparent, sidebars and
toolbars are the glass while the content area stays solid enough to read,
corners are concentric (an inner radius equals the outer radius minus the gap,
so curves stay parallel), and every glass surface carries a lit top rim and a
shaded bottom one, because that edge is what makes it read as a material.

The Apple menu carries the glass control, Clear through Regular to Tinted.
That is a real macOS 27 setting, added because content was getting lost in the
transparency, and it is real here: one variable drives every glass surface.
Text on glass follows it. As the glass clears, dark ink would vanish into the
wallpaper, so the ink flips to white on a steep curve. Check both ends of that
control after changing anything on glass, which is Apple's own guidance.

**Components.** The parts are named after Apple's own catalog of macOS
components, so the vocabulary matches the Human Interface Guidelines rather
than being invented here: the menu bar, a window, a toolbar, a sidebar, and an
**outline view**, which is Apple's name for an expandable hierarchical list and
what Finder's list view actually is. So the weeks twist open. A week contains
its deck, its readings, its assignment and its materials, because those really
are the week's contents. Right-click a row for a context menu; right and left
arrow expand and collapse, the way an outline view should.

**What is in the dock** is the `DOCK` list at the top of `desktop.js`, and
that list is the only thing you edit. Entries look like this:

```js
{ id: "notes", ch: "📝", label: "Notes", run: function () { ... } }
{ sep: true }                                   // a divider
```

`run` can open a window or send you to a page. `id` only has to be unique, but
matching it to a window id makes the dock show a running dot under that app and
restore the window when it has been minimised. The magnification reads whatever
is in the list, however many entries, so adding and removing needs nothing else.
An empty list hides the dock rather than leaving an empty glass pill sitting at
the bottom of the screen.

**Running apps show a dot** under their icon, and right-clicking a dock icon
opens a menu above it: Hide or Show while it is running, then Quit, or Open if
it is not. Quit matters more than it looks, because hiding a window leaves the
dot as the only sign it still exists. The dot takes its colour from the glass
ink rather than being fixed: a white dot disappeared against a pale wallpaper,
and a black one would disappear once the glass goes dark.

**The dock magnifies properly.** Not a hover state on one icon: every icon
reacts by how far it sits from the pointer, on a bell curve, so the row swells
and the neighbours slide outward to make room. The slide for any icon is half
the growth of every icon between it and the pointer, because an icon grows
about its own centre. Base positions are measured once with the row at rest and
reused, so a growing icon cannot move the thing it is measured against and feed
back into itself. Nothing but transforms move, so no layout is touched while you
sweep across it.

The glass panel grows with the wave, or the icons would swell straight out
through its edges. It widens by half the total growth of the row on each side,
which is exactly how far the outermost icon travels, so the panel finishes
flush around the wave at any width. Because the dock is centred and both sides
grow together, the icons do not move in flow while it happens, which is what
keeps the measured base positions valid. `MAG_GROW`, `MAG_LIFT`, `MAG_REACH`
and `DOCK_PAD` in `desktop.js` are the dials. It is off under
`prefers-reduced-motion`.

**Keys:** arrows move down the list, right and left expand and collapse a
week, return opens one, space is Quick Look, escape closes it. `⌘1` schedule,
`⌘N` new window, `⌘W` close.
Windows drag by the title bar and zoom on double-click; the traffic lights do
what they look like they do.

It needs JavaScript, and says so. The schedule does not, so nothing is only
reachable through it.

## Reading a week

`scroll.html?w=1` is the deck read the way you read a PDF: one slide per
screen, scrolling down, each one locking into place as it arrives. The locking
is CSS scroll snapping rather than JavaScript watching the scroll position, so
the browser does it on the compositor, and `scroll-snap-stop: always` means a
fast trackpad flick can never skip a slide past you.

It shows presenter notes inline, because reading is not presenting. Arrows, space and j/k move a slide at a time.

It is styled by `desktop.css`, so it matches the desktop it opens from.

**The deck opens in a window on the desktop**, not by navigating away, so the
desktop is still behind it and closing the window is the way back. The slides
run in an iframe: the scroll deck sizes itself to the viewport, and inside a
frame that viewport is the window, so the deck needs to know nothing about
being embedded.

Opened on its own, `scroll.html` shows a **Desktop** link in the top left
instead. Inside a window it does not: the window already has a close button,
and a second way out that lands you where you are is just clutter.

No `?w=` means the current week rather than an error page.

## The dock apps

`apps.js` holds everything in the dock that is not a Finder window. Each app
registers itself and fills a window body; the chrome, dragging, dock icon and
magnification all come from `desktop.js`:

```js
Desktop.add({
  id: "thing", ch: "🧩", label: "Thing", w: 420, h: 380,
  build: function (body, win) { ... }   // body arrives empty, fill it
});
Desktop.separator();                     // a divider in the dock
```

**Calendar** marks the course's deadlines. It reads them out of `course.js`:
any week whose `assignment` carries a `dueDate` in ISO form shows a dot, and
clicking the day names what is due and links to the week. So a new deadline is
a data edit, not a code edit:

```js
assignment: {
  due: "Thu Sep 17, 11:59pm",   // what people read
  dueDate: "2026-09-17",        // what the Calendar places. Keep the two in step.
}
```

**Games** is one dock icon holding both, rather than a dock slot each. Two
controller icons side by side would say nothing about which is which, and this
way a third game costs a line in `GAMES` rather than more dock. The games
themselves register with `dock: false`, which hands back their opener without
claiming a slot.

**2048** is arrow keys or swipe, and remembers your best score per browser.
**Connect Four** plays against the computer, which takes a win, blocks yours,
and otherwise heads for the middle. Beatable on purpose.

