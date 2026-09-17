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
     GAMES
     One dock icon holding both, rather than a dock slot each. Two identical
     controller icons side by side would say nothing about which is which, and
     this way adding a third game costs a line rather than more dock.
     ========================================================================== */

  var GAMES = [
    { ch: "🔢", name: "2048",         note: "Slide and merge to 2048.",   open: open2048 },
    { ch: "🔴", name: "Connect Four", note: "Four in a row, against the computer.", open: openC4 },
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
