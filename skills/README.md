# Skills for DES 198

Instructions you can give an AI coding agent, so it works the way this class
does. Optional. Nothing in the course requires them.

## design-system-screens

Takes your feature idea and your app's design system, and builds your screens
with it: a CSS file of the system's real colours, type and spacing, the
components your flow needs, one HTML file per screen, and an index page that
links them into a clickable prototype. It can then send them into Figma.

It asks you before it makes a design choice, and keeps a log of every choice
in `decisions.md`. That log is how you say where you used AI, which the course
asks for, and it is most of your Design decisions and Reflections sections.

### Install it

It is an Agent Skill: a folder with a `SKILL.md` in it. Download the
`design-system-screens` folder from this repo, then:

- **Claude Code.** Put the folder in `.claude/skills/` inside your project
  folder, so the file ends up at
  `.claude/skills/design-system-screens/SKILL.md`. Or put it in
  `~/.claude/skills/` to have it in every project.
- **Other agents** (Cursor, Codex, Gemini CLI, VS Code with Copilot and
  others) read the same format. Check your tool's docs for where its skills
  folder is.
- **Anything else.** Paste the contents of `SKILL.md` into the chat first.

### Start it

Open your agent in an empty folder for your project and say something like:

> Use the design-system-screens skill. My app is Reminders, the feature lets
> roommates take turns on chores, and the design system is Apple's iOS.

It will ask you eight questions before it builds anything. Answer them from your
research and your wireframes, and have two or three screenshots of the real
app ready.

### Before you use Figma with it

Connecting Figma is optional. On Figma's free Starter plan the connection
allows 6 tool calls a month, so the skill does everything in the browser first
and only touches Figma at the end.
