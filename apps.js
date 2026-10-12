/* ==========================================================================
   DES 198 — DESKTOP APPS

   Everything in the dock that is not a Finder window. Each app registers
   itself with Desktop.add() and fills a window body; the chrome, dragging,
   dock icon and magnification all come from desktop.js.

   To add one:

     Desktop.add({
       id: "thing", ch: "🧩", label: "Thing", w: 420, h: 380,
       build: function (body, win) { ... }
     });

   The games are here because a desktop with nothing to do on it is not much
   of a desktop, and because a class about product design may as well have
   something on the site worth poking at.
   ========================================================================== */

(function () {
  "use strict";

  if (typeof Desktop === "undefined") return;

  var el = Desktop.el;
  var COURSE = Desktop.course;

  var node = function (tag, cls, text) { return el(tag, cls, text); };

  /* ==========================================================================
     CALENDAR
     A month grid with the course's due dates marked. Dates come from
     course.js: any week whose assignment carries `dueDate` shows up here, so
     marking a new deadline is a data edit, not a code edit.
     ========================================================================== */

  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

  function dueDates() {
    var out = {};
    (COURSE.weeks || []).forEach(function (w) {
      var a = w.assignment;
      if (!a || !a.dueDate) return;
      (out[a.dueDate] = out[a.dueDate] || []).push({
        week: w.week,
        title: a.title,
        due: a.due,
      });
    });
    return out;
  }

  function iso(y, m, d) {
    return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
  }

  function buildCalendar(body) {
    var marks = dueDates();
    var today = new Date();
    var view = new Date(today.getFullYear(), today.getMonth(), 1);

    var wrap = node("div", "cal");
    var head = node("header", "cal__head");
    var back = node("button", "cal__nav", "‹");
    var title = node("h3", "cal__title", "");
    var fwd = node("button", "cal__nav", "›");
    back.type = fwd.type = "button";
    head.appendChild(back); head.appendChild(title); head.appendChild(fwd);
    wrap.appendChild(head);

    var dow = node("div", "cal__dow");
    DAYS.forEach(function (d) { dow.appendChild(node("span", null, d)); });
    wrap.appendChild(dow);

    var grid = node("div", "cal__grid");
    wrap.appendChild(grid);

    var detail = node("div", "cal__detail");
    wrap.appendChild(detail);

    function showDay(key) {
      detail.textContent = "";
      var items = marks[key];
      if (!items) {
        detail.appendChild(node("p", "cal__none", "Nothing due."));
        return;
      }
      items.forEach(function (it) {
        var row = node("div", "cal__due");
        row.appendChild(node("strong", null, it.title));
        row.appendChild(node("span", null, "Week " + it.week + " · " + it.due));
        detail.appendChild(row);
      });
    }

    function paint() {
      var y = view.getFullYear(), m = view.getMonth();
      title.textContent = MONTHS[m] + " " + y;
      grid.textContent = "";

      var first = new Date(y, m, 1).getDay();
      var days = new Date(y, m + 1, 0).getDate();
      var prev = new Date(y, m, 0).getDate();

      /* lead-in from the previous month, so the grid always starts on Sunday */
      for (var i = first - 1; i >= 0; i--) {
        grid.appendChild(node("div", "cal__day cal__day--out", String(prev - i)));
      }

      for (var d = 1; d <= days; d++) {
        var key = iso(y, m, d);
        var cell = node("button", "cal__day");
        cell.type = "button";
        cell.appendChild(node("span", "cal__n", String(d)));

        if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate()) {
          cell.dataset.today = "true";
        }
        if (marks[key]) {
          cell.dataset.due = "true";
          cell.title = marks[key].map(function (x) { return x.title; }).join(", ");
          cell.appendChild(node("span", "cal__dot"));
        }
        (function (k) {
          cell.addEventListener("click", function () {
            grid.querySelectorAll(".cal__day").forEach(function (c) {
              c.removeAttribute("data-sel");
            });
            cell.dataset.sel = "true";
            showDay(k);
          });
        })(key);

        grid.appendChild(cell);
      }

      /* If this month has something due, open on it. Otherwise open on today,
         which is the question you are most likely asking. */
      var firstDue = Object.keys(marks).filter(function (k) {
        return k.indexOf(y + "-" + String(m + 1).padStart(2, "0")) === 0;
      }).sort()[0];
      showDay(firstDue || iso(today.getFullYear(), today.getMonth(), today.getDate()));
      if (firstDue) {
        var n = parseInt(firstDue.slice(8), 10);
        var cells = grid.querySelectorAll(".cal__day:not(.cal__day--out)");
        if (cells[n - 1]) cells[n - 1].dataset.sel = "true";
      }
    }

    back.addEventListener("click", function () { view.setMonth(view.getMonth() - 1); paint(); });
    fwd.addEventListener("click", function () { view.setMonth(view.getMonth() + 1); paint(); });

    paint();
    body.appendChild(wrap);
  }

  Desktop.add({
    id: "calendar", ch: "🗓️", label: "Calendar", w: 420, h: 480,
    build: buildCalendar,
  });

  /* ==========================================================================
     TERMINAL
     The course as a command line. It reads the same course.js as everything
     else, so `ls` and `due` stay right as weeks are posted. Draft weeks are
     listed but will not open, the same as their greyed-out folders. `skills`
     prints the one line that installs the class skill for Claude Code.
     ========================================================================== */

  var REPO = "https://github.com/julialiu05/Intro-to-Product-design";
  var pad2 = function (n) { return String(n).padStart(2, "0"); };

  function shownWeeks() {
    var n = COURSE.DESKTOP_WEEKS || (COURSE.weeks || []).length;
    return (COURSE.weeks || []).filter(function (w) { return w.week <= n; });
  }

  function findWeek(arg) {
    var n = parseInt(String(arg || "").replace(/\D/g, ""), 10);
    if (!n) return { err: "usage: give a week number, like 4" };
    var wk = (COURSE.weeks || []).filter(function (w) { return w.week === n; })[0];
    if (!wk) return { err: "week " + pad2(n) + ": no such week" };
    if (wk.status === "draft" || n > (COURSE.DESKTOP_WEEKS || 99)) return { err: "week " + pad2(n) + ": not posted yet" };
    return { wk: wk };
  }

  var COMMANDS = {
    help: {
      about: "list commands",
      run: function () {
        return Object.keys(COMMANDS).map(function (k) {
          return "  " + k.padEnd(10) + COMMANDS[k].about;
        });
      },
    },
    ai: {
      about: "start here if you want to design with AI",
      run: function () {
        return [
          "Designing with AI in DES 198. Optional, never required.",
          "",
          "  setup     get Claude Code running",
          "  free      free options, including two every Berkeley student already has",
          "  skills    instructions for your AI agent, made for this class",
          "  policy    the one rule",
          "",
          "Last checked October 2026. These plans change often.",
        ];
      },
    },
    ls: {
      about: "list the weeks",
      run: function () {
        return shownWeeks().map(function (w) {
          var tag = w.status === "draft" ? "  (not posted)" : w.week === COURSE.CURRENT_WEEK ? "  ← this week" : "";
          return "Week " + pad2(w.week) + "  " + w.title + tag;
        });
      },
    },
    open: {
      about: "open a week's slides: open 5",
      run: function (arg) {
        var f = findWeek(arg || COURSE.CURRENT_WEEK);
        if (f.err) return [f.err];
        Desktop.openDeck(f.wk.week);
        return ["opening Week " + pad2(f.wk.week) + " · " + f.wk.title];
      },
    },
    readings: {
      about: "open a week's reading list: readings 5",
      run: function (arg) {
        var f = findWeek(arg || COURSE.CURRENT_WEEK);
        if (f.err) return [f.err];
        Desktop.openReading(f.wk.week);
        return ["opening Some things to look at.md"];
      },
    },
    due: {
      about: "what's due, and when",
      run: function () {
        var out = shownWeeks().filter(function (w) {
          return w.status !== "draft" && w.assignment && w.assignment.due;
        }).map(function (w) {
          return pad2(w.week) + "  " + w.assignment.title + "  ·  " + w.assignment.due;
        });
        return out.length ? out : ["nothing due"];
      },
    },
    readme: {
      about: "open the Read Me",
      run: function () { Desktop.openReadMe(); return ["opening Read Me"]; },
    },
    staff: {
      about: "who teaches this",
      run: function () {
        return (COURSE.facilitators || []).map(function (p) {
          return p.name.padEnd(12) + p.role.padEnd(13) + p.email;
        });
      },
    },
    setup: {
      about: "install Claude Code",
      run: function () {
        return [
          "Claude Code: an AI agent that works in your terminal, on your files.",
          "",
          "It needs a paid Claude plan (Pro or above). The free Claude plan does not",
          "include it. No paid plan? Type free.",
          "",
          "1. Install. Paste one line into your own Terminal:",
          "     Mac:      curl -fsSL https://claude.ai/install.sh | bash",
          "     Windows:  irm https://claude.ai/install.ps1 | iex      (in PowerShell)",
          "   Or skip the terminal: the Claude desktop app has Claude Code built in.",
          "",
          "2. Open a new Terminal window and check it worked:",
          "     claude --version",
          "",
          "3. Make a folder for your project, go into it, and start:",
          "     mkdir project-1 && cd project-1",
          "     claude",
          "   It opens your browser to log in the first time.",
          "",
          "4. Add the class skills (type skills).",
          "",
          "Docs: https://code.claude.com/docs",
        ];
      },
    },
    free: {
      about: "free ways to use AI for design",
      run: function () {
        return [
          "Free, for every Berkeley student, through CalNet:",
          "",
          "  ChatGPT Edu      Sign up through the IT Service Hub. It includes Codex,",
          "                   OpenAI's coding agent, which reads the same skills:",
          "                     npm install -g @openai/codex     (or: brew install --cask codex)",
          "                     codex   → Sign in with ChatGPT → your Berkeley account",
          "  Google AI Pro    gemini.google.com with your Berkeley account.",
          "                   Google AI Studio's Build mode makes working prototypes.",
          "",
          "  Berkeley's list: https://ai.berkeley.edu/tools-training/licensed-ai-tools",
          "  Keep non-public UC data out of all of them.",
          "",
          "Free for verified students:",
          "",
          "  Figma Education  Professional plan, Figma Make, 3,000 AI credits a month.",
          "                   figma.com/education/apply, with your school email.",
          "  GitHub Copilot   The Student plan, through GitHub Education.",
          "",
          "Free for anyone:",
          "",
          "  Claude           The free plan has chat and artifacts, not Claude Code.",
          "                   Paste a skill's SKILL.md into a chat and ask it to build",
          "                   your screens as an HTML artifact.",
          "",
          "Last checked October 2026. Limits and plans change, so check before you rely on one.",
        ];
      },
    },
    policy: {
      about: "the course rule on AI",
      run: function () {
        return [
          "Allowed and expected. The one rule: say where you used it.",
          "",
          "“A prototype generated in one prompt with no account of the decisions",
          "inside it is not an assignment, it is a screenshot.”",
          "",
          "The class skills keep a decisions.md log for you. That log is your account.",
        ];
      },
    },
    skills: {
      about: "instructions for your AI agent, made for this class",
      run: function () {
        return [
          "Skills are instructions you give an AI agent so it works the way this class does.",
          "",
          "  design-system-screens   builds your screens from your app's real design system",
          "  case-study-page         builds your Project 1 case study site from your own material",
          "",
          "Install both for Claude Code. Paste this into your own Terminal:",
          "",
          "  git clone --depth 1 " + REPO + ".git /tmp/des198 && mkdir -p ~/.claude/skills && cp -R /tmp/des198/skills/design-system-screens /tmp/des198/skills/case-study-page ~/.claude/skills/",
          "",
          "Then in Claude Code: “Use the design-system-screens skill.”",
          "",
          "Codex, Cursor and others read the same format: check where your tool keeps skills.",
          "No agent? Open a SKILL.md, copy it, and paste it into any AI chat first.",
          "",
          "All of them: " + REPO + "/tree/main/skills",
        ];
      },
    },
    date: {
      about: "today's date",
      run: function () { return [new Date().toString().replace(/ GMT.*$/, "")]; },
    },
    clear: { about: "clear the screen", run: function () { return null; } },
  };

  function buildTerminal(body) {
    var wrap = node("div", "term");
    var out = node("div", "term__out");
    var line = node("label", "term__line");
    var prompt = node("span", "term__prompt", "student@des198 ~ %");
    var input = node("input", "term__in");
    input.type = "text";
    input.spellcheck = false;
    input.autocomplete = "off";
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("aria-label", "Terminal command");
    line.appendChild(prompt);
    line.appendChild(input);
    wrap.appendChild(out);
    wrap.appendChild(line);
    body.appendChild(wrap);

    var history = [], back = 0;

    function print(text, cls) {
      out.appendChild(node("div", "term__row" + (cls ? " " + cls : ""), text));
    }

    function run(raw) {
      var cmd = raw.trim();
      print(prompt.textContent + " " + raw, "term__echo");
      if (!cmd) return;
      history.push(cmd); back = history.length;
      var parts = cmd.split(/\s+/), name = parts[0].toLowerCase();
      if (name === "clear") { out.textContent = ""; return; }
      if (name === "cd") { print("there's only one folder here. try ls"); return; }
      if (name === "sudo") { print("nice try"); return; }
      var c = COMMANDS[name];
      if (!c) { print("zsh: command not found: " + parts[0]); print("type help to see what works", "term__dim"); return; }
      (c.run(parts.slice(1).join(" ")) || []).forEach(function (r) { print(r); });
    }

    print("Last login: " + new Date().toString().slice(0, 24) + " on ttys001", "term__dim");
    print(COURSE.code + " · " + COURSE.title + ". Type help to start, or ai to design with AI.");

    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        run(input.value); input.value = "";
      } else if (ev.key === "ArrowUp") {
        if (back > 0) input.value = history[--back];
        ev.preventDefault();
      } else if (ev.key === "ArrowDown") {
        back = Math.min(history.length, back + 1);
        input.value = history[back] || "";
        ev.preventDefault();
      } else if (ev.key === "Tab") {
        var hits = Object.keys(COMMANDS).filter(function (k) { return k.indexOf(input.value) === 0; });
        if (input.value && hits.length === 1) input.value = hits[0] + " ";
        ev.preventDefault();
      } else if (ev.key === "l" && ev.ctrlKey) {
        out.textContent = ""; ev.preventDefault();
      }
      wrap.scrollTop = wrap.scrollHeight;
    });
    /* click anywhere in the window to type, unless you are selecting text */
    wrap.addEventListener("mouseup", function () {
      if (!String(window.getSelection())) input.focus();
    });
    setTimeout(function () { input.focus(); }, 0);
  }

  Desktop.add({
    id: "terminal", ch: "🖥️", label: "Terminal", w: 620, h: 400,
    build: buildTerminal,
  });

  /* ==========================================================================
     2048
     Arrow keys or swipe. The whole game is the slide function: collapse a
     row to one side, merge equal neighbours once, pad it back out.
     ========================================================================== */

  function build2048(body) {
    var N = 4;
    var cells = [];
    var score = 0, best = 0;
    try { best = parseInt(localStorage.getItem("des198-2048") || "0", 10) || 0; } catch (e) {}

    var wrap = node("div", "g2048");
    var bar = node("header", "game__bar");
    var sc = node("div", "game__score", "");
    var again = node("button", "game__btn", "New game");
    again.type = "button";
    bar.appendChild(sc); bar.appendChild(again);
    wrap.appendChild(bar);

    var boardEl = node("div", "g2048__board");
    wrap.appendChild(boardEl);

    var note = node("p", "game__note", "Arrow keys, or swipe. Same numbers merge.");
    wrap.appendChild(note);
    body.appendChild(wrap);

    function blank() { return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; }

    function spawn() {
      var free = [];
      for (var i = 0; i < 16; i++) if (!cells[i]) free.push(i);
      if (!free.length) return;
      cells[free[Math.floor(Math.random() * free.length)]] =
        Math.random() < 0.9 ? 2 : 4;
    }

    /* collapse one line towards index 0, merging each pair at most once */
    function slide(line) {
      var out = line.filter(function (v) { return v; });
      for (var i = 0; i < out.length - 1; i++) {
        if (out[i] === out[i + 1]) {
          out[i] *= 2;
          score += out[i];
          out.splice(i + 1, 1);
        }
      }
      while (out.length < N) out.push(0);
      return out;
    }

    function lineOf(dir, k) {
      var line = [];
      for (var i = 0; i < N; i++) {
        line.push(
          dir === "left"  ? cells[k * N + i] :
          dir === "right" ? cells[k * N + (N - 1 - i)] :
          dir === "up"    ? cells[i * N + k] :
                            cells[(N - 1 - i) * N + k]
        );
      }
      return line;
    }

    function putLine(dir, k, line) {
      for (var i = 0; i < N; i++) {
        var v = line[i];
        if (dir === "left")       cells[k * N + i] = v;
        else if (dir === "right") cells[k * N + (N - 1 - i)] = v;
        else if (dir === "up")    cells[i * N + k] = v;
        else                      cells[(N - 1 - i) * N + k] = v;
      }
    }

    function move(dir) {
      var before = cells.join(",");
      for (var k = 0; k < N; k++) putLine(dir, k, slide(lineOf(dir, k)));
      if (cells.join(",") === before) return false;
      spawn();
      return true;
    }

    function stuck() {
      for (var i = 0; i < 16; i++) {
        if (!cells[i]) return false;
        var r = Math.floor(i / N), c = i % N;
        if (c < N - 1 && cells[i] === cells[i + 1]) return false;
        if (r < N - 1 && cells[i] === cells[i + N]) return false;
      }
      return true;
    }

    function paint(over) {
      boardEl.textContent = "";
      for (var i = 0; i < 16; i++) {
        var v = cells[i];
        var t = node("div", "tile", v ? String(v) : "");
        if (v) t.dataset.v = v > 2048 ? "big" : String(v);
        boardEl.appendChild(t);
      }
      if (score > best) {
        best = score;
        try { localStorage.setItem("des198-2048", String(best)); } catch (e) {}
      }
      sc.textContent = "Score " + score + "   Best " + best;
      note.textContent = over
        ? "No moves left. New game?"
        : "Arrow keys, or swipe. Same numbers merge.";
    }

    function reset() {
      cells = blank(); score = 0;
      spawn(); spawn();
      paint(false);
    }

    var KEYS = {
      ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
      a: "left", d: "right", w: "up", s: "down",
    };

    wrap.tabIndex = 0;
    wrap.addEventListener("keydown", function (ev) {
      var dir = KEYS[ev.key];
      if (!dir) return;
      ev.preventDefault();
      if (move(dir)) paint(stuck());
    });

    /* swipe, for a trackpad or a phone */
    var sx = 0, sy = 0;
    wrap.addEventListener("pointerdown", function (e) { sx = e.clientX; sy = e.clientY; });
    wrap.addEventListener("pointerup", function (e) {
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
      var dir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? "right" : "left")
        : (dy > 0 ? "down" : "up");
      if (move(dir)) paint(stuck());
    });

    again.addEventListener("click", function () { reset(); wrap.focus(); });

    reset();
    setTimeout(function () { wrap.focus(); }, 0);
  }

  var open2048 = Desktop.add({
    id: "g2048", ch: "🔢", label: "2048", w: 380, h: 560,
    build: build2048, dock: false,
  });

  /* ==========================================================================
     CONNECT FOUR
     Against the computer, which is deliberately beatable: it takes a win,
     blocks yours, and otherwise plays towards the middle. That is enough to
     make it a game and little enough to stay readable.
     ========================================================================== */

  function buildC4(body) {
    var W = 7, H = 6;
    var grid = [];
    var over = false, turn = 1;    /* 1 you, 2 computer */

    var wrap = node("div", "c4");
    var bar = node("header", "game__bar");
    var status = node("div", "game__score", "Your move.");
    var again = node("button", "game__btn", "New game");
    again.type = "button";
    bar.appendChild(status); bar.appendChild(again);
    wrap.appendChild(bar);

    var boardEl = node("div", "c4__board");
    wrap.appendChild(boardEl);
    wrap.appendChild(node("p", "game__note", "Drop four in a row. You are pink."));
    body.appendChild(wrap);

    var at = function (g, c, r) { return g[r * W + c]; };

    function drop(g, col, who) {
      for (var r = H - 1; r >= 0; r--) {
        if (!at(g, col, r)) { g[r * W + col] = who; return r; }
      }
      return -1;
    }

    function wins(g, who) {
      var dirs = [[1,0],[0,1],[1,1],[1,-1]];
      for (var r = 0; r < H; r++) {
        for (var c = 0; c < W; c++) {
          if (at(g, c, r) !== who) continue;
          for (var d = 0; d < 4; d++) {
            var n = 0, cc = c, rr = r;
            while (cc >= 0 && cc < W && rr >= 0 && rr < H && at(g, cc, rr) === who) {
              n++; cc += dirs[d][0]; rr += dirs[d][1];
            }
            if (n >= 4) return true;
          }
        }
      }
      return false;
    }

    var open = function (g) {
      var out = [];
      for (var c = 0; c < W; c++) if (!at(g, c, 0)) out.push(c);
      return out;
    };

    /* take a win, else block one, else move towards the centre */
    function think() {
      var cols = open(grid);
      for (var i = 0; i < cols.length; i++) {
        var g = grid.slice();
        drop(g, cols[i], 2);
        if (wins(g, 2)) return cols[i];
      }
      for (var j = 0; j < cols.length; j++) {
        var h = grid.slice();
        drop(h, cols[j], 1);
        if (wins(h, 1)) return cols[j];
      }
      cols.sort(function (a, b) {
        return Math.abs(a - (W - 1) / 2) - Math.abs(b - (W - 1) / 2);
      });
      return cols[Math.random() < 0.75 ? 0 : Math.min(1, cols.length - 1)];
    }

    function paint() {
      boardEl.textContent = "";
      for (var r = 0; r < H; r++) {
        for (var c = 0; c < W; c++) {
          var slot = node("button", "c4__slot");
          slot.type = "button";
          var v = at(grid, c, r);
          if (v) slot.dataset.p = String(v);
          slot.dataset.col = c;
          if (over || turn !== 1) slot.disabled = true;
          boardEl.appendChild(slot);
        }
      }
    }

    function finish(msg) { over = true; status.textContent = msg; paint(); }

    function play(col) {
      if (over || turn !== 1) return;
      if (drop(grid, col, 1) < 0) return;
      if (wins(grid, 1)) return finish("You win.");
      if (!open(grid).length) return finish("A draw.");

      turn = 2;
      status.textContent = "Thinking…";
      paint();
      setTimeout(function () {
        drop(grid, think(), 2);
        if (wins(grid, 2)) return finish("The computer wins.");
        if (!open(grid).length) return finish("A draw.");
        turn = 1;
        status.textContent = "Your move.";
        paint();
      }, 320);
    }

    boardEl.addEventListener("click", function (ev) {
      var s = ev.target.closest(".c4__slot");
      if (s) play(parseInt(s.dataset.col, 10));
    });

    function reset() {
      grid = [];
      for (var i = 0; i < W * H; i++) grid.push(0);
      over = false; turn = 1;
      status.textContent = "Your move.";
      paint();
    }

    again.addEventListener("click", reset);
    reset();
  }

  var openC4 = Desktop.add({
    id: "c4", ch: "🔴", label: "Connect Four", w: 430, h: 520,
    build: buildC4, dock: false,
  });

  /* ==========================================================================
     CHESS
     Full legal movement: castling, en passant, promotion, check, checkmate and
     stalemate. The computer searches two ply on material, which makes it take
     a free piece and avoid an obvious recapture, and lose to anyone paying
     attention. Pieces are the Unicode chess glyphs from the system font, the
     same reasoning as every other icon here: nothing is drawn by hand.
     ========================================================================== */

  var GLYPH = {
    wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
    bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
  };
  var VALUE = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

  function startBoard() {
    var back = ["r", "n", "b", "q", "k", "b", "n", "r"];
    var b = new Array(64).fill(null);
    for (var i = 0; i < 8; i++) {
      b[i]      = { t: back[i], c: "b" };
      b[8 + i]  = { t: "p", c: "b" };
      b[48 + i] = { t: "p", c: "w" };
      b[56 + i] = { t: back[i], c: "w" };
    }
    return b;
  }

  function cloneState(st) {
    return {
      b: st.b.slice(),
      turn: st.turn,
      ep: st.ep,
      cast: { wk: st.cast.wk, wq: st.cast.wq, bk: st.cast.bk, bq: st.cast.bq },
    };
  }

  var SLIDE = { b: [[1,1],[1,-1],[-1,1],[-1,-1]],
                r: [[1,0],[-1,0],[0,1],[0,-1]] };
  SLIDE.q = SLIDE.b.concat(SLIDE.r);
  var HOP = { n: [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]],
              k: SLIDE.q };

  function onBoard(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

  /* Pseudo-legal moves: shape only, king safety is checked afterwards. */
  function rawMoves(st, from) {
    var pc = st.b[from];
    if (!pc) return [];
    var r = Math.floor(from / 8), c = from % 8, out = [], i, d, rr, cc, to;

    if (pc.t === "p") {
      var dir = pc.c === "w" ? -1 : 1;
      var home = pc.c === "w" ? 6 : 1;
      if (onBoard(r + dir, c) && !st.b[(r + dir) * 8 + c]) {
        out.push((r + dir) * 8 + c);
        if (r === home && !st.b[(r + 2 * dir) * 8 + c]) out.push((r + 2 * dir) * 8 + c);
      }
      [[dir, -1], [dir, 1]].forEach(function (o) {
        rr = r + o[0]; cc = c + o[1];
        if (!onBoard(rr, cc)) return;
        to = rr * 8 + cc;
        if ((st.b[to] && st.b[to].c !== pc.c) || to === st.ep) out.push(to);
      });
      return out;
    }

    if (HOP[pc.t] && pc.t !== "k") {
      HOP[pc.t].forEach(function (o) {
        rr = r + o[0]; cc = c + o[1];
        if (!onBoard(rr, cc)) return;
        to = rr * 8 + cc;
        if (!st.b[to] || st.b[to].c !== pc.c) out.push(to);
      });
      return out;
    }

    if (pc.t === "k") {
      HOP.k.forEach(function (o) {
        rr = r + o[0]; cc = c + o[1];
        if (!onBoard(rr, cc)) return;
        to = rr * 8 + cc;
        if (!st.b[to] || st.b[to].c !== pc.c) out.push(to);
      });
      /* Castling: squares empty, and the king does not start, cross or land
         on an attacked square. */
      var row = pc.c === "w" ? 7 : 0;
      if (from === row * 8 + 4 && !attacked(st, from, pc.c)) {
        var kSide = pc.c === "w" ? st.cast.wk : st.cast.bk;
        var qSide = pc.c === "w" ? st.cast.wq : st.cast.bq;
        if (kSide && !st.b[row * 8 + 5] && !st.b[row * 8 + 6] &&
            !attacked(st, row * 8 + 5, pc.c) && !attacked(st, row * 8 + 6, pc.c)) {
          out.push(row * 8 + 6);
        }
        if (qSide && !st.b[row * 8 + 1] && !st.b[row * 8 + 2] && !st.b[row * 8 + 3] &&
            !attacked(st, row * 8 + 3, pc.c) && !attacked(st, row * 8 + 2, pc.c)) {
          out.push(row * 8 + 2);
        }
      }
      return out;
    }

    SLIDE[pc.t].forEach(function (o) {
      rr = r + o[0]; cc = c + o[1];
      while (onBoard(rr, cc)) {
        to = rr * 8 + cc;
        if (!st.b[to]) { out.push(to); }
        else { if (st.b[to].c !== pc.c) out.push(to); break; }
        rr += o[0]; cc += o[1];
      }
    });
    return out;
  }

  /* Is `sq` attacked by the side that is not `me`? Pawn direction is the one
     thing worth getting right here, so it is written out rather than reused. */
  function attacked(st, sq, me) {
    var them = me === "w" ? "b" : "w";
    var r = Math.floor(sq / 8), c = sq % 8, i, rr, cc, to, pc;

    var pd = them === "w" ? 1 : -1;   /* where a `them` pawn would come from */
    for (i = -1; i <= 1; i += 2) {
      rr = r + pd; cc = c + i;
      if (onBoard(rr, cc)) {
        pc = st.b[rr * 8 + cc];
        if (pc && pc.c === them && pc.t === "p") return true;
      }
    }
    for (i = 0; i < HOP.n.length; i++) {
      rr = r + HOP.n[i][0]; cc = c + HOP.n[i][1];
      if (!onBoard(rr, cc)) continue;
      pc = st.b[rr * 8 + cc];
      if (pc && pc.c === them && pc.t === "n") return true;
    }
    for (i = 0; i < HOP.k.length; i++) {
      rr = r + HOP.k[i][0]; cc = c + HOP.k[i][1];
      if (!onBoard(rr, cc)) continue;
      pc = st.b[rr * 8 + cc];
      if (pc && pc.c === them && pc.t === "k") return true;
    }
    var rays = [["r", SLIDE.r], ["b", SLIDE.b]];
    for (var k = 0; k < rays.length; k++) {
      var kind = rays[k][0], dirs = rays[k][1];
      for (i = 0; i < dirs.length; i++) {
        rr = r + dirs[i][0]; cc = c + dirs[i][1];
        while (onBoard(rr, cc)) {
          pc = st.b[rr * 8 + cc];
          if (pc) {
            if (pc.c === them && (pc.t === kind || pc.t === "q")) return true;
            break;
          }
          rr += dirs[i][0]; cc += dirs[i][1];
        }
      }
    }
    return false;
  }

  function kingSq(st, col) {
    for (var i = 0; i < 64; i++) if (st.b[i] && st.b[i].t === "k" && st.b[i].c === col) return i;
    return -1;
  }
  function inCheck(st, col) {
    var k = kingSq(st, col);
    return k >= 0 && attacked(st, k, col);
  }

  /* Apply a move to a copy. Promotion is always a queen: offering the other
     three on a 380px window costs more than it adds. */
  function applyMove(st, from, to) {
    var n = cloneState(st);
    var pc = n.b[from];
    var r = Math.floor(from / 8), c = from % 8, tr = Math.floor(to / 8), tc = to % 8;

    if (pc.t === "p" && to === st.ep && !n.b[to]) n.b[tr === 2 ? to + 8 : to - 8] = null;
    if (pc.t === "k" && Math.abs(tc - c) === 2) {
      var row = r * 8;
      if (tc === 6) { n.b[row + 5] = n.b[row + 7]; n.b[row + 7] = null; }
      else          { n.b[row + 3] = n.b[row + 0]; n.b[row + 0] = null; }
    }

    n.b[to] = pc; n.b[from] = null;
    if (pc.t === "p" && (tr === 0 || tr === 7)) n.b[to] = { t: "q", c: pc.c };

    n.ep = (pc.t === "p" && Math.abs(tr - r) === 2) ? (r + tr) / 2 * 8 + c : -1;

    if (pc.t === "k") { if (pc.c === "w") { n.cast.wk = n.cast.wq = false; } else { n.cast.bk = n.cast.bq = false; } }
    if (from === 63 || to === 63) n.cast.wk = false;
    if (from === 56 || to === 56) n.cast.wq = false;
    if (from === 7  || to === 7)  n.cast.bk = false;
    if (from === 0  || to === 0)  n.cast.bq = false;

    n.turn = st.turn === "w" ? "b" : "w";
    return n;
  }

  function legalFrom(st, from) {
    var pc = st.b[from];
    if (!pc || pc.c !== st.turn) return [];
    return rawMoves(st, from).filter(function (to) {
      return !inCheck(applyMove(st, from, to), pc.c);
    });
  }
  function allMoves(st) {
    var out = [];
    for (var i = 0; i < 64; i++) {
      if (!st.b[i] || st.b[i].c !== st.turn) continue;
      legalFrom(st, i).forEach(function (to) { out.push([i, to]); });
    }
    return out;
  }

  function material(st, col) {
    var sum = 0;
    for (var i = 0; i < 64; i++) {
      var p = st.b[i];
      if (p) sum += (p.c === col ? 1 : -1) * VALUE[p.t];
    }
    return sum;
  }

  /* Two ply: play a move, let the other side take its best reply, keep the
     move whose worst case is best. Enough to punish a hanging piece. */
  function chooseMove(st) {
    var moves = allMoves(st), best = null, bestScore = -Infinity;
    for (var i = 0; i < moves.length; i++) {
      var after = applyMove(st, moves[i][0], moves[i][1]);
      var replies = allMoves(after), worst = Infinity;
      if (!replies.length) {
        worst = inCheck(after, after.turn) ? 1e6 : 0;
      } else {
        for (var j = 0; j < replies.length; j++) {
          var sc = material(applyMove(after, replies[j][0], replies[j][1]), st.turn);
          if (sc < worst) worst = sc;
        }
      }
      var score = worst + Math.random() * 8;
      if (score > bestScore) { bestScore = score; best = moves[i]; }
    }
    return best;
  }

  function buildChess(body) {
    var st, sel = null, targets = [], over = false, thinking = false;

    var wrap = node("div", "chess");
    var bar = node("header", "game__bar");
    var status = node("div", "game__score", "Your move.");
    var again = node("button", "game__btn", "New game");
    again.type = "button";
    bar.appendChild(status); bar.appendChild(again);
    wrap.appendChild(bar);

    var boardEl = node("div", "chess__board");
    wrap.appendChild(boardEl);
    wrap.appendChild(node("p", "game__note", "You are white. Click a piece, then where it goes."));
    body.appendChild(wrap);

    var cells = [];
    for (var i = 0; i < 64; i++) {
      var cell = node("button", "chess__sq");
      cell.type = "button";
      cell.dataset.dark = ((Math.floor(i / 8) + i) % 2 === 1) ? "true" : "false";
      cell.dataset.i = i;
      cell.addEventListener("click", onCell);
      boardEl.appendChild(cell);
      cells.push(cell);
    }

    function paint() {
      for (var i = 0; i < 64; i++) {
        var pc = st.b[i];
        cells[i].textContent = pc ? GLYPH[pc.c + pc.t] : "";
        cells[i].dataset.sel = (i === sel) ? "true" : "false";
        cells[i].dataset.to = targets.indexOf(i) >= 0 ? "true" : "false";
        cells[i].dataset.hit = (targets.indexOf(i) >= 0 && st.b[i]) ? "true" : "false";
      }
    }

    function finish() {
      var moves = allMoves(st);
      if (moves.length) {
        if (inCheck(st, st.turn)) status.textContent = st.turn === "w" ? "Check." : "Computer in check.";
        else status.textContent = st.turn === "w" ? "Your move." : "Thinking…";
        return false;
      }
      over = true;
      if (inCheck(st, st.turn)) status.textContent = st.turn === "w" ? "Checkmate. You lost." : "Checkmate. You win.";
      else status.textContent = "Stalemate.";
      return true;
    }

    function computer() {
      thinking = true;
      setTimeout(function () {
        var mv = chooseMove(st);
        if (mv) st = applyMove(st, mv[0], mv[1]);
        thinking = false;
        sel = null; targets = [];
        paint(); finish();
      }, 260);
    }

    function onCell(ev) {
      if (over || thinking || st.turn !== "w") return;
      var i = Number(ev.currentTarget.dataset.i);
      if (sel !== null && targets.indexOf(i) >= 0) {
        st = applyMove(st, sel, i);
        sel = null; targets = [];
        paint();
        if (!finish()) computer();
        return;
      }
      if (st.b[i] && st.b[i].c === "w") {
        sel = i; targets = legalFrom(st, i);
      } else {
        sel = null; targets = [];
      }
      paint();
    }

    function reset() {
      st = { b: startBoard(), turn: "w", ep: -1,
             cast: { wk: true, wq: true, bk: true, bq: true } };
      sel = null; targets = []; over = false; thinking = false;
      status.textContent = "Your move.";
      paint();
    }

    again.addEventListener("click", reset);
    reset();
  }

  var openChess = Desktop.add({
    id: "chess", ch: "♞", label: "Chess", w: 400, h: 560,
    build: buildChess, dock: false,
  });

  /* ==========================================================================
     GAMES
     One dock icon holding both, rather than a dock slot each. Two identical
     controller icons side by side would say nothing about which is which, and
     this way adding a third game costs a line rather than more dock.
     ========================================================================== */

  var GAMES = [
    { ch: "🔢", name: "2048",         note: "Slide and merge to 2048.",   open: open2048 },
    { ch: "🔴", name: "Connect Four", note: "Four in a row, against the computer.", open: openC4 },
    { ch: "\u265E", name: "Chess",     note: "Full rules, against the computer.", open: openChess },
  ];

  Desktop.separator();

  Desktop.add({
    id: "games", ch: "🎮", label: "Games", w: 330, h: 250,
    build: function (body) {
      var wrap = node("div", "games");
      GAMES.forEach(function (g) {
        var b = node("button", "games__item");
        b.type = "button";
        b.appendChild(Desktop.glyph(g.ch));
        var txt = node("span", "games__text");
        txt.appendChild(node("strong", null, g.name));
        txt.appendChild(node("span", null, g.note));
        b.appendChild(txt);
        b.addEventListener("click", function () { g.open(); });
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
    },
  });
})();
