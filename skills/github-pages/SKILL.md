---
name: github-pages
description: Put a DES 198 student's project folder on GitHub and online with GitHub Pages, one step at a time, for someone who has never used git or a terminal. Use when a student says "put this online", "host my case study", "set up GitHub", "publish my site" or "save this to GitHub". Never asks for a password.
---

# GitHub Pages

You are helping a design student who has never used GitHub. The goal is a
project folder saved on GitHub and live at a `github.io` address, with the
student understanding what happened. Go one step at a time. Before each
step, say in one plain sentence what it does and why, then do it. After
each, say what changed.

## Rules that never bend

- **Never ask for a password, token or code.** When a step needs the
  student to log in, stop, give them the exact command to run themselves,
  say which options to pick, and wait. In Claude Code they can run it with
  `!` in front: `! gh auth login`.
- **Never delete anything.** No `rm -rf`, no `git reset --hard`, no force
  push. If something is in the way, show it and ask.
- **Never guess the student's name or email.** Ask.
- **Plain words.** "Save a version" before "commit", "upload" before "push",
  "shared folder on GitHub" before "repository". Use the real word after the
  plain one so they learn it.

## The steps

### 1. Check what is installed

Run `git --version` and `gh --version`. If either is missing:

- Mac: `brew install git gh`. If `brew` is missing, send them to
  <https://brew.sh> and wait.
- Windows: Git for Windows from <https://git-scm.com/download/win> and the
  GitHub CLI from <https://cli.github.com>. Wait for them to install.

Prefer the terminal route, because you can do it with them. If they would
rather click, GitHub Desktop at <https://desktop.github.com> does every step
below with buttons, and you can describe each one.

### 2. Account

Ask whether they have a GitHub account. If not, send them to
<https://github.com/signup>. Suggest their berkeley.edu email, or their own
email with berkeley.edu added later under Settings, Emails. A verified
student gets GitHub Pro free through <https://education.github.com>, which
is what allows Pages on a private repository.

### 3. Log in

Stop and hand over:

```
gh auth login
```

Options: GitHub.com, HTTPS, Yes to authenticate git, Login with a web
browser. Wait until `gh auth status` shows them logged in.

### 4. Name and email for git

Ask for the name and email they want on their saves, then:

```
git config --global user.name "Their Name"
git config --global user.email "them@berkeley.edu"
```

### 5. Turn the folder into a repository

From inside the project folder. Check first that `index.html` is at the
top level of the folder, because Pages serves that file as the home page.
If the site lives in a subfolder, say so and ask whether to move it up.

```
git init
git add .
git commit -m "First version"
```

Before `git add .`, look for anything that should not be uploaded: files
over 50 MB, `.DS_Store`, `node_modules`, anything with a password in it.
Add those to `.gitignore` and explain why.

### 6. Create it on GitHub and upload

Ask: public or private? One sentence each: public means anyone can see the
files and Pages is free; private hides the files and Pages needs the free
student Pro. Then:

```
gh repo create PROJECT-NAME --public --source=. --push
```

Give them the link it prints.

### 7. Turn on GitHub Pages

```
gh api -X POST repos/OWNER/REPO/pages -f "source[branch]=main" -f "source[path]=/"
```

If that errors because Pages is already on, that is fine. If it errors
because the repository is private without Pro, explain and offer to make it
public with `gh repo edit --visibility public --accept-visibility-change-consequences`
after they say yes.

The address is `https://OWNER.github.io/REPO/`. It takes a minute or two
the first time. Check with `gh api repos/OWNER/REPO/pages --jq .html_url`.

### 8. Check the live site

Open the address. Then check every image and video on the page loads. The
usual cause of a broken image is capitalisation: `Photo.JPG` in the folder
and `photo.jpg` in the HTML works on a Mac and fails on GitHub. Find
mismatches by comparing the filenames in the HTML with `ls`, and fix the
HTML, not the files, unless the student prefers.

### 9. Teach the every-time routine

Tell them this is all they do from now on:

```
git add .
git commit -m "What changed, in a few words"
git push
```

The site updates within a minute. If it looks the same, hard refresh.

### 10. Groups

If they work in a group: Settings, Collaborators, Add people, on github.com.
Each person starts a work session with `git pull`. If two people change the
same lines, git stops and asks. Show both versions in plain words and let
the student pick. Never pick for them.

## When something breaks

- Show the last five saves: `git log --oneline -5`.
- Put one file back to the last save: `git checkout -- path/to/file`, after
  saying what it will undo.
- Anything beyond that: explain what you would do and ask first.

## Finish

End with three lines: the repository link, the live address, and the
three-command routine from step 9.
