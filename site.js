/* ==========================================================================
   RENDERING

   Builds the scroll deck from the slide data in course.js.

   The hooks a stylesheet can rely on:
     .sc .sc-slide .slide .sc-note .sc-bar .sc-count .sc-end .sc-top
     .s-kicker .s-title .s-sub .s-secname .s-num .s-statement .s-head
     .s-points .s-two .s-cols .s-gallery .s-quote .s-attr .s-time .s-fig
     .s-assign .s-person .nt .s-tap

   After each render a `course:render` event fires on document, carrying
   { page, week }. Theme scripts listen for it rather than racing the DOM.
   ========================================================================== */

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const pad2 = (n) => String(n).padStart(2, "0");

/* The current date and time, in the same shape the desktop menu bar uses. */
const DAYS3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function nowStamp() {
  const d = new Date();
  const h = d.getHours() % 12 || 12;
  return `${DAYS3[d.getDay()]} ${MON3[d.getMonth()]} ${d.getDate()} · ` +
         `${h}:${pad2(d.getMinutes())} ${d.getHours() < 12 ? "AM" : "PM"}`;
}

function tickClocks() {
  const paint = () =>
    document.querySelectorAll(".s-now").forEach((n) => { n.textContent = nowStamp(); });
  paint();
  setInterval(paint, 20000);
}

function announce(page, week) {
  document.dispatchEvent(
    new CustomEvent("course:render", { detail: { page, week } })
  );
}

/* ---------- theme toggle (light/dark within a theme) ---------------------- */

(function () {
  const saved = localStorage.getItem("des198-mode");
  if (saved) document.documentElement.setAttribute("data-mode", saved);
  window.toggleMode = () => {
    const cur =
      document.documentElement.getAttribute("data-mode") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-mode", next);
    localStorage.setItem("des198-mode", next);
  };
})();

/* ---------- shared chrome ------------------------------------------------- */






/* ==========================================================================
   SYLLABUS
   ========================================================================== */


/* ==========================================================================
   SLIDES
   ========================================================================== */

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
      /* The kicker carries the clock rather than the week date, so the title
         slide says when you are looking at it. Kept live by tickClocks(). */
      return `<div class="slide">
        <p class="s-kicker"><span class="s-now">${esc(nowStamp())}</span></p>
        <h1 class="s-title">${esc(s.text || w.title)}</h1>
        ${s.sub || w.summary ? `<p class="s-sub">${esc(s.sub || w.summary)}</p>` : ""}
      </div>`;
    case "section":
      return `<div class="slide">
        ${s.num ? `<p class="s-num">${esc(s.num)}</p>` : ""}
        <h2 class="s-secname">${esc(s.text)}</h2>
      </div>`;
    case "statement":
      return `<div class="slide">
        <p class="s-statement">${esc(s.text)}</p>
        ${s.sub ? `<p class="s-sub">${esc(s.sub)}</p>` : ""}
      </div>`;
    case "points":
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-head">${esc(s.heading)}</h2>` : ""}
        <ol class="s-points">${(s.points || [])
          .map((p, k) => `<li style="--i:${k}"><span>${esc(p)}</span></li>`)
          .join("")}</ol>
      </div>`;
    case "two":
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-head">${esc(s.heading)}</h2>` : ""}
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
        <p class="s-kicker">Exercise${s.heading ? " &mdash; " + esc(s.heading) : ""}</p>
        <p>${esc(s.prompt)}</p>
        ${s.time ? `<span class="s-time">${esc(s.time)}</span>` : ""}
      </div>`;
    case "person":
      /* One slide per person. `photo` is optional: without it the slide still
         works and leaves an empty frame to drop the picture into later. */
      return `<div class="slide s-person">
        <div class="s-person__pic">${
          s.photo
            ? `<img src="${esc(s.photo)}" alt="${esc(s.name || "")}">`
            : `<span class="s-person__empty" aria-hidden="true"></span>`
        }</div>
        <div class="s-person__text">
          ${s.role ? `<p class="s-kicker">${esc(s.role)}</p>` : ""}
          <h2 class="s-person__name">${esc(s.name)}</h2>
          ${s.detail ? `<p class="s-person__detail">${esc(s.detail)}</p>` : ""}
          ${(s.lines || []).map((l) => `<p>${esc(l)}</p>`).join("")}
        </div>
      </div>`;
    case "nametag":
      /* A worked example, live on the slide: type on it, click to recolour,
         move the pointer to tilt it. Wired up in renderScroll. */
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-head">${esc(s.heading)}</h2>` : ""}
        <div class="nt" data-c="0">
          <div class="nt__card">
            <div class="nt__top">
              <span>HELLO</span>
              <small>my name is</small>
            </div>
            <div class="nt__field">
              <span class="nt__name" contenteditable="true"
                    spellcheck="false" role="textbox"
                    aria-label="Your name">${esc(s.name || "your name")}</span>
            </div>
          </div>
        </div>
        ${s.caption ? `<p class="s-sub nt__hint">${esc(s.caption)}</p>` : ""}
      </div>`;
    case "columns":
      /* Like "two", but for any number of columns. Used for comparisons where
         the point is the difference between three or more things. */
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-head">${esc(s.heading)}</h2>` : ""}
        <div class="s-cols" data-n="${(s.items || []).length}">${(s.items || [])
          .map(
            (c) => `<div>
              <h3>${esc(c.label)}</h3>
              ${c.body ? `<p>${esc(c.body)}</p>` : ""}
              ${
                c.list
                  ? `<ul>${c.list.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
                  : ""
              }
            </div>`
          )
          .join("")}</div>
      </div>`;
    case "gallery":
      /* a row of captioned images, for showing several examples at once */
      return `<div class="slide">
        ${s.heading ? `<h2 class="s-head">${esc(s.heading)}</h2>` : ""}
        <div class="s-gallery" data-n="${(s.items || []).length}">${(s.items || [])
          .map(
            (it) => `<figure>
              <img src="${esc(it.src)}" alt="${esc(it.label || "")}" loading="lazy">
              <figcaption>${esc(it.label)}${
                it.note ? ` <b>${esc(it.note)}</b>` : ""
              }</figcaption>
            </figure>`
          )
          .join("")}</div>
        ${s.caption ? `<p class="s-sub">${esc(s.caption)}</p>` : ""}
      </div>`;
    case "figure":
      return `<figure class="slide s-fig">
        <img src="${esc(s.src)}" alt="${esc(s.caption || "")}">
        ${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ""}
      </figure>`;
    case "assignment": {
      const a = w.assignment;
      if (!a) return `<div class="slide"><p class="s-statement">No assignment this week.</p></div>`;
      return `<div class="slide s-assign">
        <p class="s-kicker">To take home</p>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.body)}</p>
        <p class="s-attr">Due ${esc(a.due)}</p>
      </div>`;
    }
    default:
      return `<div class="slide"><p class="s-statement">${esc(s.text || "")}</p></div>`;
  }
}


/* ==========================================================================
   SCROLL DECK

   The deck read the way you read a PDF: one slide per
   screen, scrolling down, each one locking into place as it arrives. Reached
   at scroll.html?w=1.

   It exists because a deck and a document want different things. Presenting
   wants one slide at a time and a remote. Reading wants a scrollbar, a sense
   of how much is left, and the ability to move at your own pace. This is the
   reading half, and it uses the same slide data so the two never drift.

   The locking is CSS scroll snapping, not JavaScript watching the scroll
   position: the browser does it on the compositor, so it stays smooth and it
   keeps working when a trackpad throws a fast flick at it.
   ========================================================================== */

function renderScroll() {
  /* No ?w means the current week. Landing on an error page because a query
     string went missing is a worse answer than showing this week. */
  const asked = parseInt(new URLSearchParams(location.search).get("w"), 10);
  const n = COURSE.weeks.some((x) => x.week === asked) ? asked : COURSE.CURRENT_WEEK;
  const w = COURSE.weeks.find((x) => x.week === n);
  const app = document.getElementById("app");

  if (!w) {
    app.innerHTML = `<section class="sc-slide"><div class="slide">
      <h1 class="s-title">No deck for that week</h1>
      <p><a class="btn" href="index.html">Back to the desktop</a></p>
    </div></section>`;
    return;
  }

  const deck = w.slides && w.slides.length ? w.slides : autoDeck(w);
  document.title = `${pad2(w.week)} · ${w.title} — ${COURSE.code}`;

  app.innerHTML =
    deck
      .map(
        (s, i) => `<section class="sc-slide" data-n="${i + 1}" id="s${i + 1}">
          ${slideHTML(s, w)}
          ${s.note ? `<p class="sc-note">${esc(s.note)}</p>` : ""}
        </section>`
      )
      .join("") +
`<section class="sc-slide sc-end">
       <button class="sc-top" type="button">
         <span aria-hidden="true">\u2191</span>
         <span>Back to top</span>
       </button>
     </section>`;

  const top = app.querySelector(".sc-top");
  if (top) {
    top.addEventListener("click", () => {
      const first = app.querySelector(".sc-slide");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* The nametag example: type on it, click to recolour, tilt toward the
     pointer. Five palettes, cycled by clicking the card. */
  app.querySelectorAll(".nt").forEach((nt) => {
    const card = nt.querySelector(".nt__card");
    const name = nt.querySelector(".nt__name");

    /* clicking recolours, but not while you are typing in the name */
    card.addEventListener("click", (ev) => {
      if (ev.target === name) return;
      nt.dataset.c = (Number(nt.dataset.c) + 1) % 5;
    });

    /* clear the placeholder the first time someone types */
    let touched = false;
    name.addEventListener("focus", () => {
      if (touched) return;
      touched = true;
      if (name.textContent.trim() === "your name") name.textContent = "";
    });
    name.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") { ev.preventDefault(); name.blur(); }
    });

    /* tilt toward the pointer, and sit flat again when it leaves */
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nt.addEventListener("pointermove", (ev) => {
        const r = nt.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (x * 16).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-y * 12).toFixed(2) + "deg");
      });
      nt.addEventListener("pointerleave", () => {
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      });
    }
  });

  /* Any slide can carry `tap: "..."`: click the card and it appears, click
     again and it goes. Used on the loop slide, where the point is that the
     list does not run once. */
  deck.forEach((spec, i) => {
    if (!spec.tap) return;
    const card = app.querySelector(`#s${i + 1} .slide`);
    if (!card) return;
    const badge = document.createElement("span");
    badge.className = "s-tap";
    badge.textContent = spec.tap;
    card.appendChild(badge);
    card.dataset.tappable = "true";
    card.addEventListener("click", () => {
      card.dataset.tapped = card.dataset.tapped === "true" ? "false" : "true";
    });
  });

  /* a hairline of progress, and the count, both fixed above the deck */
  const bar = document.createElement("div");
  bar.className = "sc-bar";
  const fill = document.createElement("i");
  bar.appendChild(fill);
  document.body.appendChild(bar);

  const count = document.createElement("p");
  count.className = "sc-count";
  document.body.appendChild(count);

  const slides = [...app.querySelectorAll(".sc-slide")];

  /* Which slide is showing, and how far through we are. An observer rather
     than a scroll handler, so nothing runs on frames where nothing changed. */
  const seen = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = slides.indexOf(e.target);
        count.textContent = `${i + 1} / ${slides.length}`;
        fill.style.transform = `scaleX(${(i + 1) / slides.length})`;
        e.target.dataset.on = "true";
      });
    },
    { threshold: 0.55 }
  );
  slides.forEach((s) => seen.observe(s));

  /* Keys, because a deck should answer to them even when it scrolls. */
  const go = (d) => {
    const here = slides.findIndex((s) => {
      const r = s.getBoundingClientRect();
      return r.top >= -r.height / 2 && r.top < innerHeight / 2;
    });
    const next = slides[Math.min(Math.max((here < 0 ? 0 : here) + d, 0), slides.length - 1)];
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  addEventListener("keydown", (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if (["ArrowDown", "PageDown", "j"].includes(ev.key) || ev.key === " ") {
      ev.preventDefault(); go(1);
    } else if (["ArrowUp", "PageUp", "k"].includes(ev.key)) {
      ev.preventDefault(); go(-1);
    } else if (ev.key === "Home") { ev.preventDefault(); slides[0].scrollIntoView(); }
    else if (ev.key === "End") { ev.preventDefault(); slides[slides.length - 1].scrollIntoView(); }
  });


  /* A way back to the desktop, but only when this page is standing on its
     own. Opened inside a desktop window it is already framed by one, and the
     window's close button is the way out. */
  if (window.self === window.top) {
    const home = document.createElement("a");
    home.className = "sc-home";
    home.href = "index.html";
    home.innerHTML = '<span aria-hidden="true">‹</span><span>Desktop</span>';
    document.body.appendChild(home);
  }
  tickClocks();
  announce("scroll", w.week);
}
