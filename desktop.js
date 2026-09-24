/* ==========================================================================
   DES 198 — DESKTOP

   Reads course.js and nothing else. No build step, no dependencies, in
   keeping with the rest of the site.

   The mapping, which is the whole point:

     a week            a file
     the week's date   Date Modified
     the week's theme  Kind
     draft / published the Status column, and greyed out like a file you
                       don't have permission to open yet

   Listing the weeks by Kind puts thirteen different designs in one column
   of one window, which is the site's argument stated as a file attribute.

   Icons are Apple Color Emoji, rendered by the system font. See the note at
   the top of desktop.css for why that rather than SF Symbols.
   ========================================================================== */

(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  /* an Apple Color Emoji icon, marked decorative so it is not read aloud */
  var glyph = function (ch) {
    var s = el("span", "glyph", ch);
    s.setAttribute("aria-hidden", "true");
    return s;
  };
  var pad2 = function (n) { return String(n).padStart(2, "0"); };

  /* ---------------------------------------------------------------- data -- */

  var WEEKS  = COURSE.weeks.slice();
  var CUR    = COURSE.CURRENT_WEEK;

  /* ------------------------------------------------------------ menu bar -- */

  (function clock() {
    var time = $("#mbTime");
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var mons = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    function tick() {
      var d = new Date();
      var h = d.getHours() % 12 || 12;
      time.textContent =
        days[d.getDay()] + " " + mons[d.getMonth()] + " " + d.getDate() + "  " +
        h + ":" + pad2(d.getMinutes()) + " " + (d.getHours() < 12 ? "AM" : "PM");
      time.dateTime = d.toISOString();
    }
    tick();
    setInterval(tick, 10000);
  })();


  /* --------------------------------------------------------------- glass -- */
  /* macOS 27 pulled the default transparency back because content was getting
     lost, and added a control running from tinted-and-opaque to clear glass.
     It is a real setting, so it is a real setting here: one variable drives
     every glass surface at once. Kept per-viewer, like any system preference. */

  var GLASS = [
    ["Clear",   .18],
    ["Regular", .62],
    ["Tinted",  .92],
  ];

  function setGlass(v) {
    document.documentElement.style.setProperty("--glass-op", String(v));
    try { localStorage.setItem("des198-glass", String(v)); } catch (e) {}
  }

  (function restoreGlass() {
    var v;
    try { v = localStorage.getItem("des198-glass"); } catch (e) {}
    if (v) document.documentElement.style.setProperty("--glass-op", v);
  })();

  function currentGlass() {
    var v = getComputedStyle(document.documentElement)
      .getPropertyValue("--glass-op").trim();
    return parseFloat(v || ".62");
  }

  /* ------------------------------------------------------------- windows -- */

  var zTop = 20;
  var open = {};

  function focusWin(w) {
    Object.keys(open).forEach(function (k) {
      open[k].setAttribute("data-focus", open[k] === w ? "true" : "false");
    });
    if (w) w.style.zIndex = ++zTop;
    paintDock();
  }

  function closeWin(id) {
    var w = open[id];
    if (!w) return;
    w.remove();
    delete open[id];
    var last = Object.keys(open).pop();
    focusWin(last ? open[last] : null);
  }

  function makeWindow(id, title, opts) {
    opts = opts || {};
    if (open[id]) {
      open[id].dataset.min = "false";
      focusWin(open[id]);
      return open[id];
    }

    var w = el("div", "window");
    w.dataset.id = id;
    w.dataset.focus = "true";
    w.dataset.min = "false";

    /* Size to the viewport, never past it, and never so large that the
       window swallows the desktop. A window that fills the screen is not a
       desktop, it is a page with a title bar. */
    var host = $("#windows").getBoundingClientRect();
    var n = Object.keys(open).length;
    var ww = Math.round(Math.max(340, Math.min(opts.w || 720, host.width  * 0.78)));
    var wh = Math.round(Math.max(200, Math.min(opts.h || 440, host.height * 0.70)));
    var left = Math.round(host.width  * 0.12) + n * 26;
    var top  = Math.round(host.height * 0.09) + n * 24;

    w.style.width  = ww + "px";
    w.style.height = wh + "px";
    w.style.left = Math.max(8, Math.min(left, host.width  - ww - 8)) + "px";
    w.style.top  = Math.max(8, Math.min(top,  host.height - wh - 8)) + "px";

    var bar = el("header", "window__bar glass");
    var lights = el("div", "lights");
    [["close", "Close"], ["min", "Minimise"], ["zoom", "Zoom"]].forEach(function (p) {
      var b = el("button", "light light--" + p[0]);
      b.type = "button";
      b.setAttribute("aria-label", p[1] + " " + title);
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        if (p[0] === "close") closeWin(id);
        else if (p[0] === "min") { w.dataset.min = "true"; paintDock(); }
        else w.dataset.zoom = w.dataset.zoom === "true" ? "false" : "true";
      });
      lights.appendChild(b);
    });
    bar.appendChild(lights);
    bar.appendChild(el("h2", "window__title", title));

    var tools = el("div", "window__tools");
    if (opts.href || opts.run) {
      var t = el("button", "tool", opts.runLabel || "Open");
      t.type = "button";
      t.title = opts.run ? "Open it" : "Leave the desktop and open the real page";
      tools.appendChild(t);
      t.addEventListener("click", function () {
        if (opts.run) opts.run();
        else location.href = opts.href;
      });
    }
    bar.appendChild(tools);
    w.appendChild(bar);

    var body = el("div", "window__body");
    w.appendChild(body);
    w.body = body;

    bar.addEventListener("pointerdown", function (ev) {
      if (ev.target.closest(".light, .tool")) return;
      if (w.dataset.zoom === "true") return;
      focusWin(w);
      var r = w.getBoundingClientRect(), hr = $("#windows").getBoundingClientRect();
      var dx = ev.clientX - r.left, dy = ev.clientY - r.top;
      var move = function (e) {
        w.style.left = Math.min(Math.max(-r.width + 90, e.clientX - dx - hr.left), hr.width - 70) + "px";
        w.style.top  = Math.min(Math.max(0, e.clientY - dy - hr.top), hr.height - 40) + "px";
      };
      var up = function () {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    });
    bar.addEventListener("dblclick", function (ev) {
      if (ev.target.closest(".light, .tool")) return;
      w.dataset.zoom = w.dataset.zoom === "true" ? "false" : "true";
    });
    w.addEventListener("pointerdown", function () { focusWin(w); });

    /* Resizing. Eight invisible grips around the rim, the way a real window
       has them: each one says which edges it moves, and the maths is the
       same for all of them. Dragging a left or top grip has to move the
       window as well as resize it, or the opposite edge would walk across
       the screen. */
    [
      ["n",  0, -1], ["s",  0,  1], ["e",  1,  0], ["w", -1,  0],
      ["ne", 1, -1], ["nw", -1, -1], ["se", 1,  1], ["sw", -1, 1],
    ].forEach(function (g) {
      var grip = el("i", "grip grip--" + g[0]);
      var dx = g[1], dy = g[2];
      grip.addEventListener("pointerdown", function (ev) {
        if (w.dataset.zoom === "true") return;
        ev.preventDefault();
        ev.stopPropagation();
        focusWin(w);
        var r = w.getBoundingClientRect();
        var hr = $("#windows").getBoundingClientRect();
        var x0 = ev.clientX, y0 = ev.clientY;
        var L = r.left - hr.left, T = r.top - hr.top, W = r.width, H = r.height;
        var MINW = 320, MINH = 180;

        var move = function (e) {
          var mx = e.clientX - x0, my = e.clientY - y0;
          if (dx > 0) w.style.width = Math.max(MINW, W + mx) + "px";
          if (dx < 0) {
            var nw = Math.max(MINW, W - mx);
            w.style.width = nw + "px";
            w.style.left = (L + (W - nw)) + "px";
          }
          if (dy > 0) w.style.height = Math.max(MINH, H + my) + "px";
          if (dy < 0) {
            var nh = Math.max(MINH, H - my);
            w.style.height = nh + "px";
            w.style.top = (T + (H - nh)) + "px";
          }
        };
        var up = function () {
          removeEventListener("pointermove", move);
          removeEventListener("pointerup", up);
        };
        addEventListener("pointermove", move);
        addEventListener("pointerup", up);
      });
      w.appendChild(grip);
    });

    $("#windows").appendChild(w);
    open[id] = w;
    focusWin(w);
    return w;
  }


  /* ------------------------------------------------------- a week's deck -- */
  /* The deck opens in a window on the desktop rather than navigating away, so
     the desktop is still there behind it and closing the window is the way
     back. The slides live in an iframe: the scroll deck sizes itself to the
     viewport, and inside a frame that viewport is the window, which is exactly
     what we want without the deck needing to know it is embedded. */

  function openDeck(n) {
    var w = makeWindow("deck" + n, "Week " + pad2(n) + " · Slides", { w: 1020, h: 640 });
    if (w.__built) return w;
    w.body.textContent = "";
    var f = document.createElement("iframe");
    f.className = "deckframe";
    f.src = "scroll.html?w=" + n;
    f.title = "Week " + pad2(n) + " slides";
    w.body.appendChild(f);
    w.__built = true;
    return w;
  }

  /* ------------------------------------------------------ things to look at -- */
  /* The week's reading list, opened from the week folder. It is a .md file in
     the listing, so it opens as one: the markdown source, monospaced, with the
     syntax left visible. The text is generated from the `readings` array in
     course.js, so the file and the window cannot drift apart. */

  function weekMarkdown(wk) {
    var out = [
      "# Some things to look at",
      "",
      "Not required. Not graded. These are here because they are good, and",
      "because they disagree with each other in useful ways.",
      "",
    ];
    (wk.readings || []).forEach(function (r) {
      out.push("---", "");
      out.push("### " + r.title);
      var meta = ["**" + r.author + "**"];
      if (r.kind) meta.push(r.kind.toLowerCase());
      if (r.optional) meta.push("optional");
      out.push(meta.join(" · "));
      if (r.url) out.push("<" + r.url + ">");
      if (r.note) { out.push(""); out.push(r.note); }
      out.push("");
    });
    return out.join("\n");
  }

  /* Paint the source with its syntax still showing: headings, bold markers and
     rules stay as characters, and a bare <url> is the one thing made clickable
     because a reading list you cannot open is not much of a reading list. */
  function paintMarkdown(text) {
    var pre = el("pre", "md");
    text.split("\n").forEach(function (line) {
      var row = el("span", "md__line");
      if (/^#{1,6}\s/.test(line)) {
        var hashes = line.match(/^#+/)[0];
        row.appendChild(el("span", "md__hash", hashes + " "));
        row.appendChild(el("span", "md__head", line.slice(hashes.length + 1)));
      } else if (/^---$/.test(line)) {
        row.appendChild(el("span", "md__rule", line));
      } else if (/^<https?:\/\/\S+>$/.test(line)) {
        row.appendChild(el("span", "md__punct", "<"));
        var a = el("a", "md__url", line.slice(1, -1));
        a.href = line.slice(1, -1);
        a.target = "_blank";
        a.rel = "noopener";
        row.appendChild(a);
        row.appendChild(el("span", "md__punct", ">"));
      } else if (line.indexOf("**") > -1) {
        line.split(/(\*\*[^*]+\*\*)/).forEach(function (bit) {
          if (/^\*\*[^*]+\*\*$/.test(bit)) {
            row.appendChild(el("span", "md__punct", "**"));
            row.appendChild(el("span", "md__bold", bit.slice(2, -2)));
            row.appendChild(el("span", "md__punct", "**"));
          } else if (bit) {
            row.appendChild(document.createTextNode(bit));
          }
        });
      } else {
        row.appendChild(document.createTextNode(line));
      }
      pre.appendChild(row);
      pre.appendChild(document.createTextNode("\n"));
    });
    return pre;
  }

  function openReading(n) {
    var wk = WEEKS.filter(function (x) { return x.week === n; })[0];
    if (!wk) return;
    var w = makeWindow("read" + n, "Some things to look at.md", { w: 640, h: 540 });
    if (w.__built) return w;
    w.body.textContent = "";
    w.body.appendChild(paintMarkdown(weekMarkdown(wk)));
    w.__built = true;
    return w;
  }

  /* -------------------------------------------------------- a week folder -- */
  /* Opening a week folder from the desktop. Plain list of what is in it, no
     outline: you are already inside the thing that would have expanded. */

  function openFolder(n) {
    var wk = WEEKS.filter(function (x) { return x.week === n; })[0];
    if (!wk) return;
    var draft = wk.status === "draft";

    var w = makeWindow("wk" + n, "Week " + pad2(n), {
      w: 640, h: 300,
      run: draft ? null : function () { openDeck(n); },
      runLabel: "Open",
    });
    w.body.textContent = "";

    var list = el("div", "list list--folder");

    var head = el("div", "list__head");
    ["Name", "Date", "Kind", "Status"].forEach(function (label) {
      var b = el("button", null);
      b.type = "button";
      b.appendChild(el("span", null, label));
      head.appendChild(b);
    });
    list.appendChild(head);

    var rows = el("div", "list__rows");
    rows.setAttribute("role", "listbox");
    rows.setAttribute("aria-label", "Week " + n);
    rows.tabIndex = 0;

    /* Just the deck for now. The readings, assignment and materials are still
       in course.js; they are simply not in the
       folder while the week is being written. Put them back by appending
       weekContents(wk, false) to this list. */
    var items = [{
      ch: "📽️",
      name: "Week " + pad2(n) + " · " + wk.title + ".deck",
      kind: "Slides",
      date: wk.date,
      state: draft ? "Not posted" : "Posted",
      run: draft ? null : function () { openDeck(n); },
    }];
    if ((wk.readings || []).length) {
      items.push({
        ch: "📄",
        name: "Some things to look at.md",
        kind: "Reading list",
        date: wk.date,
        state: wk.readings.length + " links",
        run: function () { openReading(n); },
      });
    }

    var sel = -1, rowEls = [];

    items.forEach(function (spec) {
      var r = el("div", "row");
      r.setAttribute("role", "option");
      r.setAttribute("aria-selected", "false");
      r.tabIndex = -1;

      var name = el("div", "row__name");
      name.appendChild(el("span", "row__disc row__disc--none"));
      name.appendChild(glyph(spec.ch));
      name.appendChild(el("span", null, spec.name));
      r.appendChild(name);
      r.appendChild(el("div", "row__date", spec.date || ""));
      r.appendChild(el("div", "row__kind", spec.kind || ""));
      r.appendChild(el("div", "row__state", spec.state || ""));

      r.__open = function () {
        if (spec.run) spec.run();
        else if (spec.href) location.href = spec.href;
      };
      r.addEventListener("click", function () {
        rowEls.forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        r.setAttribute("aria-selected", "true");
        sel = rowEls.indexOf(r);
      });
      r.addEventListener("dblclick", r.__open);
      rows.appendChild(r);
      rowEls.push(r);
    });

    rows.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();
        sel = ev.key === "ArrowDown"
          ? Math.min(sel + 1, rowEls.length - 1)
          : Math.max(sel - 1, 0);
        rowEls.forEach(function (x, j) { x.setAttribute("aria-selected", j === sel ? "true" : "false"); });
        rowEls[sel].scrollIntoView({ block: "nearest" });
      } else if (ev.key === "Enter" && sel >= 0) {
        rowEls[sel].__open();
      } else if (ev.key === " ") {
        ev.preventDefault();
        quickLook(wk, false);
      }
    });

    list.appendChild(rows);
    list.appendChild(el("div", "list__foot",
      items.length + " item" + (items.length === 1 ? "" : "s") +
      " · double-click to read the week"));
    w.body.appendChild(list);
    rows.focus({ preventScroll: true });
    return w;
  }

  /* ---------------------------------------------------------- quick look -- */

  function quickLook(wk, deck) {
    $("#qlTitle").textContent = "Week " + pad2(wk.week) + " · " + wk.title;
    var b = $("#qlBody");
    b.textContent = "";

    if (wk.summary) b.appendChild(el("p", null, wk.summary));

    var dl = el("dl");
    [["Date", wk.date],
     ["Status", wk.status === "draft" ? "Not posted" : "Posted"],
     ["Readings", String((wk.readings || []).length)]
    ].forEach(function (p) {
      dl.appendChild(el("dt", null, p[0]));
      dl.appendChild(el("dd", null, p[1]));
    });
    b.appendChild(dl);

    if ((wk.agenda || []).length) {
      b.appendChild(el("h2", null, "Agenda"));
      var ul = el("ul");
      wk.agenda.forEach(function (a) { ul.appendChild(el("li", null, a)); });
      b.appendChild(ul);
    }
    if (wk.assignment) {
      b.appendChild(el("h2", null, "Due"));
      b.appendChild(el("p", null, wk.assignment.title + " · " + wk.assignment.due));
    }

    $("#ql").hidden = false;
    var week = wk.week;
    $("[data-ql-open]").onclick = function () { $("#ql").hidden = true; openDeck(week); };
  }

  $("#ql").addEventListener("click", function (ev) {
    if (ev.target === $("#ql") || ev.target.closest("[data-ql-close]")) $("#ql").hidden = true;
  });

  /* ------------------------------------------------------------- read me -- */

  /* The Read Me: when and where, attendance, and who to contact. */
  function openReadMe() {
    var w = makeWindow("readme", "Read Me", { w: 560, h: 500 });
    w.body.textContent = "";
    var d = el("article", "doc");

    d.appendChild(el("h1", null, COURSE.code + " · " + COURSE.title));
    d.appendChild(el("p", "sub", COURSE.term + " · " + COURSE.units + " units · " +
      COURSE.meets + " · " + COURSE.room));

    if ((COURSE.attendance || []).length) {
      d.appendChild(el("h2", null, "Attendance"));
      var ul = el("ul");
      COURSE.attendance.forEach(function (r) { ul.appendChild(el("li", null, r)); });
      d.appendChild(ul);
    }

    d.appendChild(el("h2", null, "Staff"));
    var dl = el("dl");
    (COURSE.facilitators || []).forEach(function (f) {
      dl.appendChild(el("dt", null, f.role || "Staff"));
      var dd = el("dd", null, f.name);
      if (f.email) dd.appendChild(el("span", "bio", f.email));
      dl.appendChild(dd);
    });
    d.appendChild(dl);

    w.body.appendChild(d);
    return w;
  }

  /* ---------------------------------------------------------------- icons -- */

  /* One folder per week released so far, and nothing else. The desktop fills
     up as the course runs, which is the point: by December it is thirteen
     folders deep and you can see the whole term sitting there.

     DESKTOP_WEEKS in course.js is the only dial. Add one each week. */

  var DESK = (function () {
    var n = COURSE.DESKTOP_WEEKS || 1;
    var out = [];
    for (var i = 1; i <= Math.min(n, WEEKS.length); i++) {
      (function (wk) {
        var week = WEEKS.filter(function (x) { return x.week === wk; })[0];
        if (!week) return;
        out.push({
          id: "wk" + wk,
          ch: "📁",
          label: "Week " + wk,
          run: function () { openFolder(wk); },
        });
      })(i);
    }
    return out;
  })();

  (function paintIcons() {
    var host = $("#icons");
    DESK.forEach(function (d) {
      var b = el("button", "icon");
      b.type = "button";
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", "false");
      b.appendChild(glyph(d.ch));
      b.appendChild(el("span", null, d.label));
      b.addEventListener("click", function () {
        host.querySelectorAll(".icon").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true");
      });
      b.addEventListener("dblclick", d.run);
      b.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); d.run(); }
      });
      host.appendChild(b);
    });
  })();

  $("#desktop").addEventListener("pointerdown", function (ev) {
    if (ev.target.closest(".icon")) return;
    $("#icons").querySelectorAll(".icon").forEach(function (x) {
      x.setAttribute("aria-selected", "false");
    });
    focusWin(null);
  });

  /* ----------------------------------------------------------------- dock -- */

  /* THE DOCK. Placeholders until you say what belongs here. Edit this list and
     nothing else: the magnification reads whatever is in it, however many.

       { id: "notes", ch: "📝", label: "Notes", run: function () { ... } }
       { sep: true }                                  // a divider

     `run` can open a window, or send you to a page with location.href. `id`
     only has to be unique, and matching it to a window id makes the dock show
     a running dot under that app and restore it when minimised.

     An empty list hides the dock rather than leaving an empty glass pill. */

  var DOCK = [
    { id: "readme", ch: "📝",  label: "Read Me",   run: openReadMe },
    /* apps.js appends the Calendar and the games after these. The schedule
       is not here because the Calendar covers it, and ⌘1 still opens it. */
  ];

  function paintDock() {
    var host = $("#dock");
    host.textContent = "";
    host.hidden = !DOCK.length;
    if (!DOCK.length) return;
    DOCK.forEach(function (d) {
      if (d.sep) { host.appendChild(el("div", "dock__sep")); return; }
      var b = el("button", "dock__app");
      b.type = "button";
      b.dataset.label = d.label;
      b.setAttribute("aria-label", d.label);
      b.dataset.on = open[d.id] && open[d.id].dataset.min !== "true" ? "true" : "false";
      b.appendChild(glyph(d.ch));
      b.addEventListener("click", function () {
        if (open[d.id]) { open[d.id].dataset.min = "false"; focusWin(open[d.id]); paintDock(); }
        else d.run();
      });
      b.addEventListener("contextmenu", function (ev) {
        ev.preventDefault();
        dockMenu(d, b);
      });
      host.appendChild(b);
    });
    measureDock();
  }

  /* Right-click a dock icon, the way you would on a Mac: hide it, quit it, or
     open it if it is not running. Quit is the only way to actually close an
     app you have hidden, so it matters more here than it looks. */
  function dockMenu(d, btn) {
    var w = open[d.id];
    var items = [];

    if (w) {
      if (w.dataset.min === "true") {
        items.push(["Show", "", function () {
          w.dataset.min = "false"; focusWin(w); paintDock();
        }]);
      } else {
        items.push(["Hide", "", function () {
          w.dataset.min = "true"; paintDock();
        }]);
      }
      items.push(null);
      items.push(["Quit " + d.label, "", function () { closeWin(d.id); }]);
    } else {
      items.push(["Open " + d.label, "", d.run]);
    }

    /* centred above the icon, which is where the dock puts it */
    var r = btn.getBoundingClientRect();
    showMenuAt(items, Math.round(r.left + r.width / 2 - 100), Math.round(r.top), true);
  }

  /* ---------------------------------------------------- dock magnification -- */
  /* The real thing is not a hover state on one icon. Every icon reacts by how
     far it sits from the pointer, on a bell curve, so the row swells and the
     neighbours slide outward to make room. Two passes:

       1. how much each icon grows, from its distance to the pointer
       2. how far each icon slides, which is half the growth of every icon
          between it and the pointer, because an icon grows about its centre

     Base centres are measured once with the dock at rest and reused, so
     growing an icon cannot move the thing we measure against and feed back
     into itself. Transform only: no layout is touched while you sweep. */

  var MAG_GROW = .62;      /* how much the icon under the pointer grows */
  var MAG_LIFT = 13;       /* px it rises */
  var MAG_REACH = 74;      /* px: how far down the row the wave carries */

  var DOCK_PAD = 9;        /* px of glass either side of the row, at rest */

  var dockApps = [];

  function restDock() {
    dockApps.forEach(function (a) {
      a.style.setProperty("--m", "0");
      a.style.setProperty("--px", "0px");
    });
    $("#dock").style.setProperty("--dock-pad", DOCK_PAD + "px");
  }

  /* Re-run after every repaint of the dock and on resize. Measuring happens
     with the row at rest, so a magnified icon never shifts its own baseline. */
  function measureDock() {
    dockApps = Array.prototype.slice.call($("#dock").querySelectorAll(".dock__app"));
    restDock();
    dockApps.forEach(function (a) {
      var r = a.getBoundingClientRect();
      a.__cx = r.left + r.width / 2;
      a.__w = r.width;
    });
  }

  /* Listeners live on the dock element, which outlives any repaint, so this
     runs once. paintDock only re-measures. */
  function wireDock() {
    var host = $("#dock");
    addEventListener("resize", measureDock);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    host.addEventListener("pointermove", function (ev) {
      if (!dockApps.length) return;
      var mags = dockApps.map(function (a) {
        var d = ev.clientX - a.__cx;
        return Math.exp(-(d * d) / (2 * MAG_REACH * MAG_REACH));
      });
      dockApps.forEach(function (a, i) {
        var push = 0;
        for (var j = 0; j < dockApps.length; j++) {
          if (j === i) continue;
          var grow = mags[j] * MAG_GROW * dockApps[j].__w;
          push += (a.__cx > dockApps[j].__cx ? 1 : -1) * grow / 2;
        }
        a.style.setProperty("--m", mags[i].toFixed(3));
        a.style.setProperty("--px", push.toFixed(1) + "px");
      });

      /* The glass has to grow with the icons or the wave swells straight out
         through its edges. Total growth across the row, split evenly either
         side: that is exactly how far the outermost icon travels, so the
         panel ends flush around the whole wave however wide it gets. */
      var total = 0;
      for (var k = 0; k < dockApps.length; k++) {
        total += mags[k] * MAG_GROW * dockApps[k].__w;
      }
      host.style.setProperty("--dock-pad", (DOCK_PAD + total / 2).toFixed(1) + "px");
    });

    host.addEventListener("pointerleave", restDock);
  }

  /* ------------------------------------------------------------- menus ---- */

  var MENUS = {
    file: [
      null,
      ["Close Window", "⌘W", function () {
        var k = Object.keys(open).pop(); if (k) closeWin(k);
      }],
    ],
    edit: [
      ["Undo", "⌘Z", null],
      ["Cut", "⌘X", null],
      ["Copy", "⌘C", null],
      ["Paste", "⌘V", null],
    ],
    go: [],
    help: [
      ["Read Me", "", openReadMe],
      null,
      ["Email the facilitator", "", function () {
        location.href = "mailto:" + COURSE.contact
          .replace(/\[dot\]/g, ".").replace(/\[at\]/g, "@");
      }],
    ],
    /* built fresh each time it opens, so the glass setting shows its tick */
    about: function () {
      var items = [
        ["About This Course", "", openReadMe],
        null,
        null,
      ];
      var now = currentGlass();
      GLASS.forEach(function (g) {
        items.push(["Glass: " + g[0], "", function () { setGlass(g[1]); },
                    Math.abs(now - g[1]) < .02]);
      });
      return items;
    },
  };

  MENUS.go = WEEKS.map(function (wk) {
    return ["Week " + pad2(wk.week) + " · " + wk.title, "",
      wk.status === "draft" ? null : function () { openDeck(wk.week); }];
  });

  var dd = $("#dropdown");
  var openMenu = null;

  function fillMenu(items) {
    dd.textContent = "";
    items.forEach(function (it) {
      if (!it) { dd.appendChild(document.createElement("hr")); return; }
      var b = el("button", null);
      b.type = "button";
      b.appendChild(el("span", null, it[0]));
      if (it[1]) b.appendChild(el("kbd", null, it[1]));
      if (it[3]) b.setAttribute("aria-checked", "true");
      if (!it[2]) b.disabled = true;
      else b.addEventListener("click", function () { hideMenu(); it[2](); });
      dd.appendChild(b);
    });
    dd.hidden = false;
  }

  function showMenu(name, anchor) {
    var items = MENUS[name];
    if (!items) return;
    fillMenu(typeof items === "function" ? items() : items);
    var r = anchor.getBoundingClientRect();
    dd.style.left = Math.max(4, Math.min(r.left, innerWidth - dd.offsetWidth - 8)) + "px";
    dd.style.top = r.bottom + 2 + "px";
    anchor.dataset.on = "true";
    openMenu = anchor;
  }

  /* A context menu, placed at a point rather than under a menu-bar title.
     `above` flips it so its bottom edge sits at y, which is what a menu
     hanging off the dock needs: the dock is at the foot of the screen, so a
     menu dropping downward would go straight off it. */
  function showMenuAt(items, x, y, above) {
    fillMenu(items);
    var w = dd.offsetWidth, h = dd.offsetHeight;
    dd.style.left = Math.max(4, Math.min(x, innerWidth - w - 8)) + "px";
    dd.style.top = above
      ? Math.max(4, y - h - 8) + "px"
      : Math.max(4, Math.min(y, innerHeight - h - 8)) + "px";
    openMenu = null;
  }
  function hideMenu() {
    dd.hidden = true;
    if (openMenu) delete openMenu.dataset.on;
    openMenu = null;
  }

  document.querySelectorAll("[data-menu], [data-open]").forEach(function (m) {
    var name = m.dataset.menu || m.dataset.open;
    m.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (openMenu === m) hideMenu(); else showMenu(name, m);
    });
    m.addEventListener("pointerenter", function () {
      if (openMenu && openMenu !== m) { hideMenu(); showMenu(name, m); }
    });
  });
  document.addEventListener("click", hideMenu);

  /* -------------------------------------------------------------- keys ---- */

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      if (!$("#ql").hidden) { $("#ql").hidden = true; return; }
      hideMenu();
      return;
    }
    if (!(ev.metaKey || ev.ctrlKey)) return;
    if (ev.key === "w") {
      ev.preventDefault();
      var k = Object.keys(open).pop();
      if (k) closeWin(k);
    }
  });

  /* ---------------------------------------------------------------- api --- */
  /* The small print needed to add an app from another file, so games and the
     like do not have to live in here. apps.js is the one that uses it.

       Desktop.add({ id, ch, label, w, h, build: function (body, win) { ... } })

     `build` is handed the window's empty body and fills it. Everything else,
     the window chrome, dragging, the dock icon and its magnification, comes
     free. Call Desktop.add before the page finishes loading and the dock is
     repainted for you. */

  window.Desktop = {
    /* Returns the opener, so an app can be launched from somewhere other than
       the dock. Pass dock: false to register one without giving it a dock
       slot, which is how the games sit inside Games rather than beside it. */
    add: function (app) {
      var run = function () {
        var w = makeWindow(app.id, app.label, { w: app.w, h: app.h });
        if (w.__built) return w;
        w.body.textContent = "";
        app.build(w.body, w);
        w.__built = true;
        return w;
      };
      if (app.dock !== false) {
        DOCK.push({ id: app.id, ch: app.ch, label: app.label, run: run });
        paintDock();
      }
      return run;
    },
    separator: function () { DOCK.push({ sep: true }); paintDock(); },
    el: el,
    glyph: glyph,
    course: COURSE,
  };

  /* -------------------------------------------------------------- start --- */

  /* Nothing opens on load. It is a desktop: it starts as a desktop, and you
     open what you want from it. */
  paintDock();
  wireDock();
})();
