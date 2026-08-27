/* ==========================================================================
   Rendering. You shouldn't need to edit this file — all content lives in
   course.js. Each page calls one render function at the bottom.
   ========================================================================== */

/* ---------- small helpers ------------------------------------------------- */

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const pad2 = (n) => String(n).padStart(2, "0");

/* label left, value flush right — the only layout a receipt really has */
const row = (k, v, cls = "") =>
  `<div class="row ${cls}"><span>${esc(k)}</span><span>${esc(v)}</span></div>`;

const isLive = (w) => w.status !== "draft";

const weekHref = (n) => `week.html?w=${n}`;

/* Costco item numbers are 7 digits. Derive one per week so it's stable. */
const itemNo = (week) => String(1980000 + week * 1731);

const R = () => COURSE.receipt || {};

/* 09/02/2026 18:30 0198 03 042 0007 */
function registerLine() {
  const d = new Date();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mi = pad2(d.getMinutes());
  return `${mm}/${dd}/${d.getFullYear()} ${hh}:${mi} ${R().register || "0198 03 042 0007"}`;
}

/* ---------- theme --------------------------------------------------------- */

(function theme() {
  const saved = localStorage.getItem("des198-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  window.toggleTheme = () => {
    const cur =
      document.documentElement.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("des198-theme", next);
  };
})();

/* ---------- shared chrome ------------------------------------------------- */

function navBar(current) {
  const item = (href, label) =>
    `<a href="${href}"${current === href ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<nav class="nav">
    ${item("index.html", "Receipt")}
    ${item("syllabus.html", "Terms")}
    <button type="button">Lights</button>
  </nav>`;
}

/* the bottom of every Costco receipt: register line, door-scan barcode,
   thank you, operator. */
function footerBlock(current) {
  return `
  <div class="gap"></div>
  <p class="sm faded c">${esc(registerLine())}</p>
  <div class="foot">
    <p class="barcode" aria-hidden="true">*${esc(COURSE.code.replace(/\s/g, ""))}*</p>
    <p class="strike">THANK YOU! PLEASE COME AGAIN.</p>
    <p class="sm soft">OP# ${esc(R().op || "0000")} &nbsp; NAME: ${esc(R().name || "")}</p>
    <p class="sm faded">${esc(COURSE.contact)}</p>
    <div class="gap"></div>
    ${navBar(current)}
  </div>`;
}

/* the Lights button is bound after render so it survives innerHTML */
function bindNav(root) {
  root.querySelectorAll(".nav button").forEach((b) =>
    b.addEventListener("click", () => window.toggleTheme())
  );
}

/* ==========================================================================
   INDEX — the receipt
   ========================================================================== */

function renderIndex() {
  const weeks = COURSE.weeks;
  const cur = COURSE.CURRENT_WEEK;
  const r = R();
  let i = 0;

  const rows = weeks
    .map((w) => {
      const now = w.week === cur;
      const past = w.week < cur;
      const no = itemNo(w.week);

      /* E marks a week with something due, the way it marks an eligible item.
         The right-hand letter is the status code: A posted, N not yet. */
      const cls = ["item", now ? "item--now" : "", past ? "item--past" : "", !isLive(w) ? "item--void" : ""]
        .filter(Boolean)
        .join(" ");

      const cells = `
        <span class="item__e">${w.assignment ? "E" : ""}</span>
        <span class="item__no">${esc(no)}</span>
        <span class="item__name">${esc(w.title)}</span>
        <span class="item__price">${esc(w.date.toUpperCase())}</span>
        <span class="item__code">${isLive(w) ? "A" : "N"}</span>`;

      const el = isLive(w)
        ? `<a class="${cls}" style="--i:${i++}" href="${weekHref(w.week)}">${cells}</a>`
        : `<div class="${cls}" style="--i:${i++}">${cells}</div>`;

      /* this week prints an instant-savings line referencing the item above it */
      const savings = now
        ? `<div class="saving" style="--i:${i++}">
             <span></span><span>/${esc(no)}</span><span>NOW SERVING</span><span></span><span></span>
           </div>`
        : "";

      return el + savings;
    })
    .join("");

  const n = weeks.length;
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="feed">
      <header class="wh" style="--i:0">
        <p class="wh__banner"><span class="dw">${esc(r.banner || "WHOLESALE")}</span></p>
        <p class="wh__line">${esc(r.warehouse || "")}</p>
        <p class="wh__line">${esc(r.address1 || "")}</p>
        <p class="wh__line">${esc(r.address2 || "")}</p>
        <h1 class="wh__title">${esc(COURSE.title)}</h1>
        <p class="wh__sub">${esc(COURSE.subtitle)}</p>
      </header>

      <div class="gap" style="--i:1"></div>
      <p class="member" style="--i:2">MEMBER ${esc(r.member || "")}</p>
      <div class="gap" style="--i:3"></div>

      <div class="order feed" style="animation:none">${rows}</div>

      <div class="gap"></div>
      <hr class="hr">

      <div class="totals">
        ${row("SUBTOTAL", `${n} SESSIONS`)}
        ${row("UNITS", String(COURSE.units))}
        ${row("GRADING", COURSE.grading.toUpperCase())}
      </div>
      <div class="grand"><span>****&nbsp; TOTAL</span><span>90 MIN / WK</span></div>

      <div class="gap"></div>
      <p class="sold">TOTAL NUMBER OF ITEMS SOLD = ${n}</p>
      <div class="gap"></div>

      <p class="sm soft">XXXXXXXXXXXX${esc(String(COURSE.term).replace(/\D/g, "") || "2026")} CHIP READ</p>
      ${row("ATTENDANCE", "PAID")}
      ${row("CHANGE", "0.00")}

      <div class="gap"></div>
      <p class="legend">E = SOMETHING DUE &nbsp; A = POSTED &nbsp; N = NOT YET</p>

      ${footerBlock("index.html")}
    </div>`;

  bindNav(app);
}

/* ==========================================================================
   WEEK — one item's own tag
   ========================================================================== */

function renderWeek() {
  const n = parseInt(new URLSearchParams(location.search).get("w"), 10);
  const w = COURSE.weeks.find((x) => x.week === n);
  const app = document.getElementById("app");

  if (!w) {
    app.innerHTML = `
      <div class="c">
        <p class="wh__banner">ITEM NOT FOUND</p>
        <p class="sm faded">THERE IS NO WEEK ${esc(
          new URLSearchParams(location.search).get("w") || "?"
        )} ON THIS RECEIPT.</p>
        <div class="btnrow"><a class="btn" href="index.html">BACK TO RECEIPT</a></div>
      </div>`;
    return;
  }

  document.title = `${pad2(w.week)} · ${w.title} — ${COURSE.code}`;

  const idx = COURSE.weeks.indexOf(w);
  const prev = COURSE.weeks[idx - 1];
  const next = COURSE.weeks[idx + 1];
  const now = w.week === COURSE.CURRENT_WEEK;

  const block = (label, body, note = "") =>
    body
      ? `<div class="gap"></div>
         <div class="course">
           <div class="course__head">${esc(label)}${note ? `<span>${esc(note)}</span>` : ""}</div>
           ${body}
         </div>`
      : "";

  const agenda =
    w.agenda && w.agenda.length
      ? `<ol class="agenda">${w.agenda.map((a) => `<li><span>${esc(a)}</span></li>`).join("")}</ol>`
      : "";

  const readings =
    w.readings && w.readings.length
      ? w.readings
          .map(
            (rd) => `<div class="reading">
              <div class="reading__t">${esc(rd.title)}</div>
              <div class="reading__a">${esc(rd.author)}</div>
              ${rd.note ? `<div class="reading__n">${esc(rd.note)}</div>` : ""}
            </div>`
          )
          .join("")
      : "";

  const assignment = w.assignment
    ? `<div class="assign">
        <p class="assign__t">${esc(w.assignment.title)}</p>
        <div class="assign__due">DUE ${esc(w.assignment.due.toUpperCase())}</div>
        <p class="assign__b">${esc(w.assignment.body)}</p>
        ${w.assignment.deliverable ? `<p class="assign__d"><b>HAND IN</b>${esc(w.assignment.deliverable)}</p>` : ""}
      </div>`
    : "";

  const materials =
    w.materials && w.materials.length
      ? `<ul class="mats">${w.materials
          .map((m) => `<li>${esc(m.label)}<span>${esc(m.kind)}</span></li>`)
          .join("")}</ul>`
      : "";

  app.innerHTML = `
    <div class="feed">
      <div class="ticket__kicker" style="--i:0">
        <span>${esc(COURSE.code)}</span>
        <span>${now ? "NOW SERVING" : isLive(w) ? "POSTED" : "NOT YET POSTED"}</span>
      </div>

      <p class="ticket__no" style="--i:1">ITEM ${esc(itemNo(w.week))}</p>
      <p class="ticket__qty" style="--i:2">${pad2(w.week)}</p>
      <p class="ticket__of" style="--i:3">WEEK ${w.week} OF ${COURSE.weeks.length} &middot; ${esc(w.date.toUpperCase())}</p>
      <h1 class="ticket__name" style="--i:4">${esc(w.title)}</h1>
      ${w.summary ? `<p class="ticket__sum" style="--i:5">${esc(w.summary)}</p>` : ""}

      <div class="btnrow" style="--i:6">
        <a class="btn btn--stamp" href="slides.html?w=${w.week}">OPEN SLIDES</a>
        <a class="btn" href="index.html">ALL WEEKS</a>
      </div>

      <div style="--i:7">
        <div class="gap"></div>
        <hr class="hr">
        ${block("SERVICE ORDER", agenda, `${(w.agenda || []).length} ITEMS`)}
        ${block("READ BEFORE", readings, `${(w.readings || []).length}`)}
        ${block("TO TAKE HOME", assignment)}
        ${block("ON THE PASS", materials)}

        <div class="gap"></div>
        <hr class="hr">
        <div class="pager">
          ${
            prev
              ? `<a href="${isLive(prev) ? weekHref(prev.week) : "index.html"}"><span class="caps">&lt;&lt; ${pad2(
                  prev.week
                )}</span><b>${esc(prev.title)}</b></a>`
              : `<span></span>`
          }
          ${
            next
              ? `<a href="${isLive(next) ? weekHref(next.week) : "index.html"}"><span class="caps">${pad2(
                  next.week
                )} &gt;&gt;</span><b>${esc(next.title)}</b></a>`
              : `<span></span>`
          }
        </div>

        ${footerBlock("")}
      </div>
    </div>`;

  bindNav(app);
}

/* ==========================================================================
   SYLLABUS — the terms on the back
   ========================================================================== */

function renderSyllabus() {
  const r = R();
  const people = [...COURSE.facilitators, COURSE.sponsor]
    .map(
      (p) => `<div class="person">
        <em>${esc(p.role)}</em>
        <b>${esc(p.name)}</b>
        <span>${esc(p.detail)}</span>
      </div>`
    )
    .join("");

  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="feed">
      <header class="wh" style="--i:0">
        <p class="wh__banner"><span class="dw">TERMS</span></p>
        <p class="wh__line">${esc(r.warehouse || "")}</p>
        <p class="wh__line">${esc(COURSE.code)} &middot; ${esc(COURSE.term)}</p>
        <p class="wh__sub">Everything you'd otherwise have to ask about: what it costs you, what passing means, and what happens when things go wrong.</p>
      </header>

      <div class="gap" style="--i:1"></div>
      <hr class="hr" style="--i:2">

      <div class="totals" style="--i:3">
        ${row("COURSE", COURSE.code)}
        ${row("TERM", COURSE.term.toUpperCase())}
        ${row("MEETS", COURSE.meets.toUpperCase())}
        ${row("ROOM", COURSE.room.toUpperCase())}
        ${row("UNITS", String(COURSE.units))}
        ${row("GRADING", COURSE.grading.toUpperCase())}
        ${row("SESSIONS", String(COURSE.weeks.length))}
      </div>

      <div style="--i:4">
        <div class="gap"></div>
        <p class="head">WHAT THIS IS</p>
        <div class="prose">${COURSE.description.map((p) => `<p>${esc(p)}</p>`).join("")}</div>

        <div class="gap"></div>
        <p class="head">HOUSE RULES</p>
        ${COURSE.policies
          .map((p) => `<div class="policy"><h3>${esc(p.heading)}</h3><p>${esc(p.body)}</p></div>`)
          .join("")}

        <div class="gap"></div>
        <p class="head">STAFF</p>
        ${people}

        <div class="gap"></div>
        <p class="head">ENROLLMENT</p>
        <div class="prose"><p>${esc(COURSE.enrollment)}</p><p>Office hours &mdash; ${esc(COURSE.office_hours)}</p></div>

        <div class="gap"></div>
        <p class="head">BY THE END YOU CAN</p>
        <ol class="list list--num">${COURSE.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ol>

        ${footerBlock("syllabus.html")}
      </div>
    </div>`;

  bindNav(app);
}

/* ==========================================================================
   SLIDES
   ========================================================================== */

/* Build a deck from the week's data when no custom `slides` array exists. */
function autoDeck(w) {
  const d = [{ layout: "title" }];
  if (w.agenda && w.agenda.length) d.push({ layout: "points", heading: "Tonight", points: w.agenda });
  if (w.readings && w.readings.length)
    d.push({
      layout: "points",
      heading: "You should have read",
      points: w.readings.map((r) => `${r.title} — ${r.author}`),
    });
  if (w.summary) d.push({ layout: "statement", text: w.summary });
  if (w.assignment) d.push({ layout: "assignment" });
  return d;
}

function slideHTML(s, w) {
  switch (s.layout) {
    case "title":
      return `<div class="slide">
        <p class="s-kick">${esc(COURSE.code)} &middot; ITEM ${esc(itemNo(w.week))} &middot; ${esc(w.date.toUpperCase())}</p>
        <h1 class="s-title">${esc(s.text || w.title)}</h1>
        ${s.sub || w.summary ? `<p class="s-sub">${esc(s.sub || w.summary)}</p>` : ""}
      </div>`;

    case "section":
      return `<div class="slide s-sec">
        ${s.num ? `<p class="s-num">${esc(s.num)}</p>` : ""}
        <h2 class="s-secname">${esc(s.text)}</h2>
      </div>`;

    case "statement":
      return `<div class="slide">
        <p class="s-state">${esc(s.text)}</p>
        ${s.sub ? `<p class="s-sub">${esc(s.sub)}</p>` : ""}
      </div>`;

    case "points":
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-h">${esc(s.heading)}</h2>` : ""}
        <ol class="s-points">${(s.points || [])
          .map((p, k) => `<li style="--i:${k}"><span>${esc(p)}</span></li>`)
          .join("")}</ol>
      </div>`;

    case "two":
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-h">${esc(s.heading)}</h2>` : ""}
        <div class="s-two">
          <div><h3>${esc(s.left.label)}</h3><p>${esc(s.left.body)}</p></div>
          <div><h3>${esc(s.right.label)}</h3><p>${esc(s.right.body)}</p></div>
        </div>
      </div>`;

    case "quote":
      return `<div class="slide">
        <blockquote class="s-quote">"${esc(s.quote)}"</blockquote>
        ${s.attribution ? `<p class="s-attr">${esc(s.attribution)}</p>` : ""}
      </div>`;

    case "exercise":
      return `<div class="slide s-ex">
        <p class="s-kick">EXERCISE${s.heading ? " &mdash; " + esc(s.heading) : ""}</p>
        <p>${esc(s.prompt)}</p>
        ${s.time ? `<span class="s-time">${esc(s.time)}</span>` : ""}
      </div>`;

    case "figure":
      return `<figure class="slide s-fig">
        <img src="${esc(s.src)}" alt="${esc(s.caption || "")}">
        ${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ""}
      </figure>`;

    case "assignment": {
      const a = w.assignment;
      if (!a) return `<div class="slide"><p class="s-state">NO ASSIGNMENT THIS WEEK.</p></div>`;
      return `<div class="slide s-assign">
        <p class="s-kick">TO TAKE HOME</p>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.body)}</p>
        <p class="s-attr">DUE ${esc(a.due.toUpperCase())}</p>
      </div>`;
    }

    default:
      return `<div class="slide"><p class="s-state">${esc(s.text || "")}</p></div>`;
  }
}

function slideLabel(s, w) {
  switch (s.layout) {
    case "title": return w.title;
    case "section": return s.text;
    case "statement": return s.text;
    case "points": return s.heading || "Points";
    case "two": return s.heading || `${s.left.label} / ${s.right.label}`;
    case "quote": return s.quote;
    case "exercise": return s.heading || "Exercise";
    case "figure": return s.caption || "Figure";
    case "assignment": return w.assignment ? w.assignment.title : "Assignment";
    default: return s.layout;
  }
}

function renderSlides() {
  const n = parseInt(new URLSearchParams(location.search).get("w"), 10);
  const w = COURSE.weeks.find((x) => x.week === n);

  if (!w) {
    document.body.classList.remove("deck");
    document.body.innerHTML = `<div class="tape"><div class="paper c">
      <p class="wh__banner">NO DECK FOR THAT WEEK</p>
      <div class="btnrow"><a class="btn" href="index.html">BACK TO RECEIPT</a></div>
    </div></div>`;
    return;
  }

  const deck = w.slides && w.slides.length ? w.slides : autoDeck(w);
  const isAuto = !(w.slides && w.slides.length);
  document.title = `Slides · ${pad2(w.week)} ${w.title} — ${COURSE.code}`;

  const stage = document.getElementById("stage");
  const bar = document.getElementById("bar");
  const prog = document.getElementById("prog");
  const noteEl = document.getElementById("note");
  const gridEl = document.getElementById("grid");
  const hintEl = document.getElementById("hint");

  let i = Math.min(Math.max(parseInt(location.hash.slice(1), 10) || 1, 1), deck.length) - 1;
  let notesOn = false;

  function paint() {
    stage.innerHTML = `<div class="deck__paper">${slideHTML(deck[i], w)}</div>`;
    bar.innerHTML = `
      <a href="week.html?w=${w.week}">&lt;&lt; WEEK ${pad2(w.week)} &middot; ${esc(w.title)}</a>
      <div class="deck__keys">
        <span>&larr; &rarr; MOVE</span><span>O GRID</span><span>N NOTES</span><span>F FULL</span><span>&#8984;P PDF</span>
      </div>
      <span class="deck__count"><b>${pad2(i + 1)}</b> / ${pad2(deck.length)}${isAuto ? " &middot; AUTO" : ""}</span>`;
    prog.style.width = ((i + 1) / deck.length) * 100 + "%";

    const note = deck[i].note;
    noteEl.hidden = !(notesOn && note);
    if (notesOn && note) noteEl.textContent = note;

    history.replaceState(null, "", "#" + (i + 1));
    if (!gridEl.hidden) paintGrid();
  }

  function paintGrid() {
    gridEl.innerHTML = deck
      .map(
        (s, k) => `<button class="thumb" style="--i:${k}" data-i="${k}" aria-current="${k === i}">
          <span class="thumb__n">${pad2(k + 1)}</span>
          <span class="thumb__t">${esc(String(slideLabel(s, w)).slice(0, 70))}</span>
          <span class="thumb__k">${esc(s.layout)}</span>
        </button>`
      )
      .join("");
  }

  const go = (k) => { i = Math.min(Math.max(k, 0), deck.length - 1); paint(); };
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  function toggleGrid(force) {
    const show = force != null ? force : gridEl.hidden;
    gridEl.hidden = !show;
    if (show) paintGrid();
  }

  gridEl.addEventListener("click", (e) => {
    const t = e.target.closest(".thumb");
    if (t) { go(parseInt(t.dataset.i, 10)); toggleGrid(false); }
  });

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case "ArrowRight": case " ": case "PageDown": case "j": e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp": case "k": e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); go(0); break;
      case "End": e.preventDefault(); go(deck.length - 1); break;
      case "o": case "O": toggleGrid(); break;
      case "Escape": if (!gridEl.hidden) toggleGrid(false); break;
      case "n": case "N": notesOn = !notesOn; paint(); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        break;
      default:
        if (/^[0-9]$/.test(e.key)) { const d = parseInt(e.key, 10); if (d >= 1 && d <= deck.length) go(d - 1); }
    }
  });

  stage.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;
    (e.clientX > innerWidth * 0.35 ? next : prev)();
  });

  let touchX = null;
  stage.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });

  /* ⌘P: lay every slide out on its own page, then restore. */
  addEventListener("beforeprint", () => {
    stage.innerHTML = deck
      .map((s) => `<div class="deck__paper print-slide">${slideHTML(s, w)}</div>`)
      .join("");
  });
  addEventListener("afterprint", paint);

  paint();
  setTimeout(() => { hintEl.style.opacity = "0"; }, 4000);
}
