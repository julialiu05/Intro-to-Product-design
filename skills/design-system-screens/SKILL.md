---
name: design-system-screens
description: Turn a feature idea into iPhone-sized screens built from a real design system. Use when someone wants to pull a design system (from its docs website, its published CSS or token package, a Figma file, or screenshots of an app) into CSS tokens and components, build linked, clickable screens with it in plain HTML and CSS, and optionally send them into Figma. Written for DES 198, Introduction to Product Design, Week 5.
---

# Design system to screens

You are helping a design student turn a feature idea into real screens. The
screens must look like they belong to an existing app, so everything is built
from that app's design system, or from the platform it runs on, never from
your own taste.

The result is a folder of plain HTML and CSS: a token file, a page of
components, one file per screen, and an index page that links them into a
clickable prototype. It opens in any browser. Sending it into Figma is an
optional last step.

## Who decides what

The student is the designer. You are the fastest pair of hands in the room.

- **Ask before you decide, in batches.** When there is a real design choice
  (layout, wording, which component, what happens on error), offer two or
  three options in a sentence each and let the student pick. Do not quietly
  choose for them. But do not stop for every choice: save them up and ask at
  three points only. After the questions below, after the specimen page
  (Step 2), and after the versions of the key screen (Step 3).
- **Keep a decision log.** Append to `decisions.md` every time a choice is
  made: what was asked, what you made, what the student kept or changed, and
  why. The course policy on AI is: say where you used it. "A prototype
  generated in one prompt with no account of the decisions inside it is not an
  assignment, it is a screenshot." This log is that account.
- **Never invent a design system value.** Every colour, font size, radius and
  spacing value comes from a source you can name. If you had to estimate one,
  say so in a comment next to it: `/* estimated from screenshot */`.
- **Stay plain.** HTML, CSS and a little JavaScript. No frameworks, no npm
  install, no build step. A student should be able to open any file and read
  it.

## Before you start, ask

Ask these in one message, then wait for the answers.

1. Which app, and what is the feature, in one sentence?
2. Who is it for? (Their primary persona from research, if they have one.)
3. What is the flow? A list of screens, start to finish.
4. Which screen is the key screen, the one where the feature happens?
5. Where does the design system come from? (See Step 1. If they do not know,
   help them find out.)
6. Do they have wireframes or sketches? Ask for a photo or a Figma link. Build
   from their layout, not a new one.
7. Send two or three screenshots of the real app, around where the feature
   goes. You will copy sizes from them and compare against them at the end.
8. Which version of the system should it match? On iPhone, the iOS version on
   their own phone.

## Step 1: get the design system

Use the first source that exists. Write down which one you used.

### A. A published token or CSS package (most exact)

Many design systems publish their values as code. Read the package's CSS or
JSON files on jsdelivr (`https://www.jsdelivr.com/package/npm/<name>`) and
copy the values. Do not install anything.

| System | Used by | Package |
|---|---|---|
| Primer | GitHub | `@primer/primitives` |
| Carbon | IBM | `@carbon/styles` |
| Material 3 | Android, Google apps | `@material/web` |
| Polaris | Shopify | `@shopify/polaris-tokens` |
| Instructure UI | Canvas, so bCourses | `@instructure/ui-themes` |
| Atlassian Design System | Jira, Trello, Confluence | `@atlaskit/tokens` |

### B. The design system's website

Read the pages for colour, typography, spacing or layout, and every component
the flow needs. Quote what you take, with the URL.

- **iPhone apps, including apps that are not Apple's:** Apple's Human
  Interface Guidelines, https://developer.apple.com/design/human-interface-guidelines/
  Foundations (colour, typography, layout), Components (lists, sheets,
  toggles, tab bars and the rest) and Patterns (searching, onboarding,
  loading). The iOS UI kit for Figma is at
  https://developer.apple.com/design/resources/
- **Android:** Material 3, https://m3.material.io/
- **To compare how many systems build one component:** The Component Gallery,
  https://component.gallery/

Numbers from the HIG worth knowing on iPhone: body text defaults to 17 pt and
should never go below 11 pt. Controls default to 44 × 44 pt and should never
go below 28 × 28 pt.

What the HIG does and does not give you. It gives the type scale, the system
colour values, minimum sizes and contrast rules. It does not give spacing,
corner radii, component sizes, or the values of the label and background
colours. Those live in Apple's iOS UI kit for Figma (source C). Without the
kit, take them from the student's screenshots (source D) and mark each one
estimated.

Reading the HIG as an agent: the site is rendered by JavaScript, so fetch its
JSON instead, at
`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`
(for example `color`, `typography`, `lists-and-tables`, `sheets`). The system
colour RGB values are in the alt text of the swatch images on the Color page.

### C. A Figma file or library

If the student has the system as a Figma library (for example Apple's iOS UI
kit) and the Figma MCP server is connected, use it:

- `get_variable_defs` returns the variables and styles in a selection:
  colours, spacing, typography.
- `get_design_context` returns the design of a frame or layer.
- `search_design_system` searches the connected libraries for components,
  variables and styles.

Setup, if it is not connected yet, in Claude Code:

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Warn the student first: on Figma's free Starter plan, or with a View or
Collab seat, the server allows **6 tool calls a month**. Pull everything you
need in one or two calls and save it to a file. Do not call it again to look
something up you already have.

### D. Screenshots of the app

For apps that publish nothing (Instagram, most consumer apps):

1. Ask the student for screenshots of the screens around their feature.
2. Ask them to read exact colours with Figma's eyedropper and paste the hex
   codes. Do not guess colours from an image.
3. Get the font from the platform: on iPhone, most apps use the system font.
4. Estimate sizes and spacing from the screenshots, and mark every estimate.
5. Fill the gaps with the platform's system (the HIG on iPhone).

### What Step 1 produces

`design-system/tokens.css`: every value as a CSS custom property, grouped,
each group with its source.

```css
/* Source: Apple HIG, Typography
   https://developer.apple.com/design/human-interface-guidelines/typography */
:root {
  --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
  --text-body: 17px;
  --text-min: 11px;

  /* Source: Apple HIG, Accessibility (control size) */
  --tap-min: 44px;

  /* Source: Instagram screenshots, hex read with the Figma eyedropper */
  --color-accent: #0095f6;          /* estimated from screenshot */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* copy the system's dark values where it publishes them; where it
       doesn't, estimate from a dark-mode screenshot and mark it */
  }
}
```

Also write `design-system/SOURCES.md`: every URL, package, Figma file or
screenshot you used, and what you took from each.

## Step 2: build only the components the flow needs

Go through the flow screen by screen and list every component on it. Build
those, and nothing else.

- Put them in `design-system/components.css`.
- Make `design-system/components.html`, a specimen page showing each
  component in every state it needs: default, pressed, disabled, empty,
  error, selected.
- Use the design system's own names for things: "List row", "Sheet",
  "Toggle", not names you made up.
- Use tokens only. No raw colours or sizes in components, except `0` and
  `1px` hairlines. Icon sizes and stroke widths are tokens too.
- Icons: use the system's own icon set if it is published for the web. Apple's
  SF Symbols are not, so on iPhone draw simple SVG copies and say so in
  `SOURCES.md`.
- Check each component before moving on. Placement and behaviour against its
  page in the design system's docs: where buttons go, what is disabled when.
  Size and look against the student's screenshots or the UI kit, because docs
  pages are usually rules, not measurements.
- If the feature needs something the system does not have, build it last,
  from the system's tokens, so it looks like it was always there. Tell the
  student it is new, because that is a design decision for their log.

**Show the student the specimen page before you build any screen.** It is much
cheaper to fix a button once than on every screen.

## Step 3: build the screens

- One file per screen in `screens/`, numbered in flow order:
  `01-shared-list.html`, `02-new-reminder.html`.
- Each screen is one iPhone-sized frame, centred on a neutral background. Use
  the same size as the student's Figma frame, or their own phone. If they do
  not know, use 393 × 852.
- Draw the status bar (time, signal, battery) at the top and the home
  indicator at the bottom, so it reads as a phone. Keep content out of both.
- Start from the student's wireframe, or from their screenshots if there is no
  wireframe.
- **Real content.** Real names, real numbers, and at least one title long
  enough to wrap. Take it from their research. If there is nothing long
  enough, ask for one. Never invent people, and never lorem ipsum.
- One primary action per screen. It should be the most obvious thing on it.
- Build the happy path first. Then add the states people forget, where the
  flow needs them: empty, loading, error, done.
- **Explorations.** For the key screen, the student may want versions. Name
  them after the key screen's number, for example `02-new-reminder-a.html`,
  `02-new-reminder-b.html`, and put them side by side on the index page. Ask
  which one to use, and link only that one into the flow. Keep the others:
  they belong in the Explorations section of the case study.

## Step 4: link them into a prototype

- Link screens with plain `<a href>` on the buttons and rows that move the
  flow forward, and a way back on every screen.
- Make `index.html`: every screen as a thumbnail, in flow order, with its
  name, the versions of the key screen in their own row, and a link to start
  the prototype at the first screen. Do not link to `decisions.md` from it:
  browsers show Markdown as raw text.
- To open it: `python3 -m http.server 8000` in the folder, then
  http://localhost:8000. To try it on a phone, open the same address with the
  computer's local IP, on the same wifi.
- The case study needs video of the prototype running. On a Mac, QuickTime
  Player can record the screen.

## Step 5: into Figma (optional)

Pick one, in this order:

1. **`generate_figma_design`** (Figma MCP, remote server, select clients
   including Claude Code). Sends the running page into Figma as editable
   layers. Uses tool calls, so check the plan limits above.
2. **`use_figma`** (Figma MCP). Writes frames into a Figma file, and uses the
   components and variables already in that file. Best when the student's
   file has Apple's iOS UI kit or their app's library in it.
3. **html.to.design** (Figma plugin, free for 10 imports a month). Its browser
   extension captures local pages, including localhost.
4. **Screenshots.** Put them into iPhone frames in Figma by hand. Always works.

## Step 6: check before anyone sees it

Go through this list for every screen, and fix what fails.

- Every colour, size and spacing value is a token from `tokens.css`.
- Every piece of text uses one of the system's text styles.
- No text below the system's minimum (11 pt on iPhone).
- Nothing you need to tap is smaller than 44 × 44 (iPhone).
- Text has a contrast ratio of at least 4.5:1 against its background. That
  includes secondary text and text buttons. If the real app's own colours fail
  (Apple's default blue and grey on white do), leave the existing parts as
  they are, make sure the new parts pass, and write it down in `decisions.md`.
- Colour is never the only way something is shown.
- It still works with the longest real name and the biggest real number.
- Dark mode, if the system has it.
- Next to the student's screenshots of the real app, it looks like the same
  app, on the same iOS version.
- The feature is the only new thing. Everything else already existed.

## Step 7: write it down

Finish by updating `decisions.md` and tell the student it feeds three parts of
their case study: Explorations (the versions they dropped), Design decisions
(the choices, with the option turned down), and Reflections (where AI helped,
and where they overruled it).

```markdown
## Key screen: three versions
- Asked for: three layouts for picking who goes next.
- Made: a list, a picker, a row of avatars.
- Kept: the list. Dropped the picker because it hides everyone but one name.
- Changed by hand: renamed "Rotate" to "Take turns", from interview wording.
```

## Folder at the end

```
design-system/
  tokens.css
  components.css
  components.html
  SOURCES.md
screens/
  01-....html
  02-....html
  02-...-a.html     versions of the key screen
  02-...-b.html
index.html
decisions.md
```

## Things to avoid

- Making up a colour, font or size because it looks nice.
- Building the whole app. Build the feature's flow, and use screenshots of the
  real app for anything around it.
- Reaching for a framework, a UI library or a build step.
- The generic AI look: purple gradients, emoji as icons, the same font on
  everything, cards inside cards. The real app's design system is the
  antidote: match it.
- Making every decision for the student. If they have not chosen, ask.
