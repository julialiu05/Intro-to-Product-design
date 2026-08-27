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

const line = (k, v, cls = "") =>
  `<div class="line ${cls}"><span class="line__k">${esc(k)}</span><span class="line__d"></span><span class="line__v">${esc(v)}</span></div>`;

const isLive = (w) => w.status !== "draft";

const weekHref = (n) => `week.html?w=${n}`;

const orderNo = () =>
  `${COURSE.term.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase()}-${COURSE.code.replace(/\D/g, "")}`;

const printedAt = () => {
  const d = new Date();
  const t = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()}  ${t}`;
};

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
    ${item("index.html", "Order")}
    ${item("syllabus.html", "Fine print")}
    <button type="button" onclick="toggleTheme()">Lights</button>
  </nav>`;
}

function footerBlock(current) {
  return `<hr class="hr">
  ${navBar(current)}
  <div class="foot">
    <p class="barcode" aria-hidden="true">*${COURSE.code.replace(/\s/g, "")}*</p>
    <p class="xs faded">${esc(COURSE.code)} &middot; ${esc(COURSE.term)} &middot; ORDER ${esc(orderNo())}</p>
    <p class="xs faded">QUESTIONS &mdash; ${esc(COURSE.contact)}</p>
    <p class="xs faded" style="margin-top:.9rem">*** THANK YOU, PLEASE COME AGAIN ***</p>
    <p class="xs faded">NO REFUNDS ON TIME SPENT</p>
  </div>`;
}

/* ==========================================================================
   INDEX — the full check
   ========================================================================== */

function renderIndex() {
  const weeks = COURSE.weeks;
  const cur = COURSE.CURRENT_WEEK;

  const rows = weeks
    .map((w, k) => {
      const now = w.week === cur;
      const past = w.week < cur;

      const inner = `
        <div class="item__top">
          <span class="item__qty">${pad2(w.week)}</span>
          <span class="item__name">${esc(w.title)}${
            now ? '<span class="stamp item__stamp">Now serving</span>' : ""
          }${!isLive(w) ? '<span class="stamp stamp--ghost item__stamp">Not yet fired</span>' : ""}</span>
          <span class="item__price">${esc(w.date)}</span>
        </div>
        ${w.summary ? `<p class="item__note">${esc(w.summary)}</p>` : ""}`;

      const cls = ["item", now ? "item--now" : "", past ? "item--past" : "", !isLive(w) ? "item--void" : ""]
        .filter(Boolean)
        .join(" ");

      return isLive(w)
        ? `<a class="${cls}" style="--i:${k + 4}" href="${weekHref(w.week)}">${inner}</a>`
        : `<div class="${cls}" style="--i:${k + 4}">${inner}</div>`;
    })
    .join("");

  document.getElementById("app").innerHTML = `
    <div class="feed">
      <header class="masthead" style="--i:0">
        <p class="masthead__est">Est. ${esc(COURSE.term)} &middot; Berkeley DeCal</p>
        <h1 class="masthead__title">${esc(COURSE.title)}</h1>
        <hr class="masthead__rule">
        <p class="masthead__sub">${esc(COURSE.subtitle)}</p>
      </header>

      <hr class="hr" style="--i:1">

      <div class="txn" style="--i:2">
        ${line("Server", COURSE.facilitators[0].name)}
        ${line("Table", COURSE.meets)}
        ${line("Seating", COURSE.room)}
        ${line("Order #", orderNo())}
      </div>

      <hr class="hr hr--dbl" style="--i:3">

      <div class="order feed" style="animation:none">${rows}</div>

      <hr class="hr hr--dbl" style="--i:${weeks.length + 5}">

      <div class="totals" style="--i:${weeks.length + 6}">
        ${line("Sessions", String(weeks.length))}
        ${line("Units", String(COURSE.units))}
        ${line("Grading", COURSE.grading)}
      </div>

      <hr class="hr hr--dbl" style="--i:${weeks.length + 7}">
      <div class="grand" style="--i:${weeks.length + 8}"><span>Total due</span><span>90 min / wk</span></div>
      <hr class="hr hr--dbl" style="--i:${weeks.length + 9}">

      <div style="--i:${weeks.length + 10}">
        ${footerBlock("index.html")}
        <p class="xs faded c" style="margin-top:1rem">PRINTED ${esc(printedAt())}</p>
      </div>
    </div>`;
}

/* ==========================================================================
   WEEK — a kitchen ticket
   ========================================================================== */

function renderWeek() {
  const n = parseInt(new URLSearchParams(location.search).get("w"), 10);
  const w = COURSE.weeks.find((x) => x.week === n);
  const app = document.getElementById("app");

  if (!w) {
    app.innerHTML = `
      <div class="c">
        <p class="big big--sm">Order not found</p>
        <p class="sm faded" style="margin-top:.75rem">There is no week ${esc(
          new URLSearchParams(location.search).get("w") || "?"
        )} on the menu.</p>
        <div class="btnrow" style="margin-top:1.25rem"><a class="btn" href="index.html">Back to the check</a></div>
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
      ? `<hr class="hr">
         <div class="course">
           <div class="course__head">${esc(label)}${note ? `<span>${esc(note)}</span>` : ""}</div>
           ${body}
         </div>`
      : "";

  const agenda = w.agenda && w.agenda.length
    ? `<ol class="agenda">${w.agenda.map((a) => `<li><span>${esc(a)}</span></li>`).join("")}</ol>`
    : "";

  const readings = w.readings && w.readings.length
    ? w.readings
        .map(
          (r) => `<div class="reading">
            <div class="reading__t">${esc(r.title)}</div>
            <div class="reading__a">${esc(r.author)}</div>
            ${r.note ? `<div class="reading__n">${esc(r.note)}</div>` : ""}
          </div>`
        )
        .join("")
    : "";

  const assignment = w.assignment
    ? `<div class="assign">
        <p class="assign__t">${esc(w.assignment.title)}</p>
        <div class="assign__due">Due &mdash; ${esc(w.assignment.due)}</div>
        <p class="assign__b">${esc(w.assignment.body)}</p>
        ${w.assignment.deliverable ? `<p class="assign__d"><b>Hand in</b>${esc(w.assignment.deliverable)}</p>` : ""}
      </div>`
    : "";

  const materials = w.materials && w.materials.length
    ? `<ul class="mats">${w.materials
        .map((m) => `<li>${esc(m.label)}<span>${esc(m.kind)}</span></li>`)
        .join("")}</ul>`
    : "";

  app.innerHTML = `
    <div class="ticket__kicker">
      <span>${esc(COURSE.code)}</span>
      <span>${now ? "Fired &mdash; now serving" : isLive(w) ? "Ticket" : "Not yet fired"}</span>
    </div>

    <p class="ticket__qty">${pad2(w.week)}</p>
    <p class="ticket__of">Week ${w.week} of ${COURSE.weeks.length} &middot; ${esc(w.date)}</p>
    <h1 class="ticket__name">${esc(w.title)}</h1>
    ${w.summary ? `<p class="ticket__sum">${esc(w.summary)}</p>` : ""}
    ${now ? '<p class="c" style="margin-top:1rem"><span class="stamp stamp--big">This week</span></p>' : ""}

    <div class="btnrow">
      <a class="btn btn--stamp" href="slides.html?w=${w.week}">Open slides</a>
      <a class="btn" href="index.html">All weeks</a>
    </div>

    ${block("Service order", agenda, `${(w.agenda || []).length} courses`)}
    ${block("Read before", readings, `${(w.readings || []).length}`)}
    ${block("To take home", assignment)}
    ${block("On the pass", materials)}

    <hr class="hr hr--dbl">
    <div class="pager">
      ${
        prev
          ? `<a href="${isLive(prev) ? weekHref(prev.week) : "index.html"}"><span class="caps">&larr; ${pad2(
              prev.week
            )}</span><b>${esc(prev.title)}</b></a>`
          : `<span></span>`
      }
      ${
        next
          ? `<a href="${isLive(next) ? weekHref(next.week) : "index.html"}"><span class="caps">${pad2(
              next.week
            )} &rarr;</span><b>${esc(next.title)}</b></a>`
          : `<span></span>`
      }
    </div>

    ${footerBlock("")}`;
}

/* ==========================================================================
   SYLLABUS — the fine print
   ========================================================================== */

function renderSyllabus() {
  const people = [...COURSE.facilitators, COURSE.sponsor]
    .map(
      (p) => `<div class="person">
        <em>${esc(p.role)}</em>
        <b>${esc(p.name)}</b>
        <span>${esc(p.detail)}</span>
      </div>`
    )
    .join("");

  document.getElementById("app").innerHTML = `
    <header class="masthead">
      <p class="masthead__est">${esc(COURSE.code)} &middot; ${esc(COURSE.term)}</p>
      <h1 class="masthead__title">The fine print</h1>
      <hr class="masthead__rule">
      <p class="masthead__sub">Everything you'd otherwise have to ask about: what it costs you, what passing means, and what happens when things go wrong.</p>
    </header>

    <hr class="hr hr--dbl">

    <div class="txn">
      ${line("Course", COURSE.code)}
      ${line("Term", COURSE.term)}
      ${line("Meets", COURSE.meets)}
      ${line("Room", COURSE.room)}
      ${line("Units", String(COURSE.units))}
      ${line("Grading", COURSE.grading)}
      ${line("Sessions", String(COURSE.weeks.length))}
    </div>

    <hr class="hr">
    <p class="head">What this is</p>
    <div class="prose">${COURSE.description.map((p) => `<p>${esc(p)}</p>`).join("")}</div>

    <hr class="hr">
    <p class="head">House rules</p>
    ${COURSE.policies
      .map((p) => `<div class="policy"><h3>${esc(p.heading)}</h3><p>${esc(p.body)}</p></div>`)
      .join("")}

    <hr class="hr">
    <p class="head">Staff</p>
    ${people}

    <hr class="hr">
    <p class="head">Enrollment</p>
    <div class="prose"><p>${esc(COURSE.enrollment)}</p><p>Office hours &mdash; ${esc(COURSE.office_hours)}</p></div>

    <hr class="hr">
    <p class="head">By the end you can</p>
    <ol class="list list--num">${COURSE.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ol>

    ${footerBlock("syllabus.html")}`;
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
        <p class="s-kick">${esc(COURSE.code)} &middot; Week ${pad2(w.week)} &middot; ${esc(w.date)}</p>
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
        <ol class="s-points">${(s.points || []).map((p) => `<li><span>${esc(p)}</span></li>`).join("")}</ol>
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
        <blockquote class="s-quote">&ldquo;${esc(s.quote)}&rdquo;</blockquote>
        ${s.attribution ? `<p class="s-attr">${esc(s.attribution)}</p>` : ""}
      </div>`;

    case "exercise":
      return `<div class="slide s-ex">
        <p class="s-kick" style="margin-bottom:1rem">Exercise${s.heading ? " &mdash; " + esc(s.heading) : ""}</p>
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
      if (!a) return `<div class="slide"><p class="s-state">No assignment this week.</p></div>`;
      return `<div class="slide s-assign">
        <p class="s-kick" style="margin-bottom:0">To take home</p>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.body)}</p>
        <p class="s-attr" style="margin-top:1.25rem">Due ${esc(a.due)}</p>
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
      <p class="big big--sm">No deck for that week</p>
      <div class="btnrow" style="margin-top:1.25rem"><a class="btn" href="index.html">Back to the check</a></div>
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
      <a href="week.html?w=${w.week}">&larr; Week ${pad2(w.week)} &middot; ${esc(w.title)}</a>
      <div class="deck__keys">
        <span>&larr; &rarr; move</span><span>O grid</span><span>N notes</span><span>F full</span><span>&#8984;P pdf</span>
      </div>
      <span class="deck__count"><b>${pad2(i + 1)}</b> / ${pad2(deck.length)}${isAuto ? " &middot; auto" : ""}</span>`;
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
        (s, k) => `<button class="thumb" data-i="${k}" aria-current="${k === i}">
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
