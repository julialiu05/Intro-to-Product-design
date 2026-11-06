/* ==========================================================================
   SPARKLES

   Fairy dust that follows the pointer, and a few bubbles drifting up the
   page. Shared by the desktop and the scroll deck, the way wallpaper.js is:
   load it after the page and it adds itself.

   Two canvases, because they belong at different depths:
     • bubbles sit just above the wallpaper and behind everything you read,
       so they never cover a window, a slide or a label
     • sparkles sit on top of everything, because they follow the pointer

   Neither ever takes a click (pointer-events: none). Sparkles only follow a
   mouse or a pen, not a finger. Under prefers-reduced-motion neither runs:
   drifting and twinkling is exactly the motion that setting asks to stop.
   ========================================================================== */

(function sparkles() {
  "use strict";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* The current week can turn things off: `fx: { bubbles: false }` on the
     week object in course.js. The cursor is set there too, so a week can
     change the feel of the desktop without touching any code. */
  var FX = (function () {
    if (typeof COURSE === "undefined") return {};
    var w = (COURSE.weeks || []).filter(function (x) { return x.week === COURSE.CURRENT_WEEK; })[0];
    return (w && w.fx) || {};
  })();
  /* "circle" is a ring drawn on a canvas: a dark 2px ring with a white
     halo so it reads on any wallpaper, hotspot in the centre. Anything else
     is passed through as a CSS cursor value. */
  function ringCursor() {
    var d = 22, c = document.createElement("canvas");
    c.width = c.height = d * 2;
    var g = c.getContext("2d");
    g.scale(2, 2);
    g.beginPath(); g.arc(d / 2, d / 2, 7.5, 0, 6.283);
    g.lineWidth = 4; g.strokeStyle = "rgba(255,255,255,.95)"; g.stroke();
    g.lineWidth = 2; g.strokeStyle = "#1d1d1f"; g.stroke();
    return "url(" + c.toDataURL() + ") " + (d / 2) + " " + (d / 2) + ", auto";
  }
  if (FX.cursor) {
    var cur = FX.cursor === "circle" ? ringCursor() : FX.cursor;
    var st = document.createElement("style");
    st.textContent = "html, body, button, a, .icon, .dock__app, .row { cursor: " + cur + " !important; }";
    document.head.appendChild(st);
  }
  var BUBBLES = FX.bubbles !== false;

  /* Pastel fairy colours: white, pink, lavender, butter, ice blue. */
  var DUST = ["#ffffff", "#ffd6f5", "#e8d9ff", "#fff1bf", "#cdf3ff"];

  /* The deck also opens inside a desktop window. The desktop already has
     bubbles behind it, so the deck inside keeps fewer. */
  var nested = window.self !== window.top;
  var desk = !!document.querySelector(".desktop");

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;

  function layer(z) {
    var c = document.createElement("canvas");
    c.setAttribute("aria-hidden", "true");
    c.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:" + z;
    document.body.appendChild(c);
    return c;
  }

  /* Desktop: above the wallpaper and icons, below windows (20) and the
     menu bar (50). Deck: level with the wallpaper but later in the page, so
     it paints over it and under the slides (1). */
  var bubbleCanvas = layer(desk ? 15 : 0);
  var dustCanvas = layer(2147483000);
  var bx = bubbleCanvas.getContext("2d");
  var dx = dustCanvas.getContext("2d");

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    [bubbleCanvas, dustCanvas].forEach(function (c) {
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    });
    bx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var pick = function (list) { return list[Math.floor(Math.random() * list.length)]; };

  /* ---------- fairy dust ---------- */

  var dust = [];
  var last = null;

  function spawn(x, y) {
    dust.push({
      x: x + rand(-4, 4), y: y + rand(-4, 4),
      vx: rand(-18, 18), vy: rand(-28, 6),
      life: 0, max: rand(0.7, 1.2),
      size: rand(3, 7.5),
      star: Math.random() < 0.6,       /* the rest are round motes */
      spin: rand(-2, 2), turn: rand(0, Math.PI),
      color: pick(DUST),
      phase: rand(0, 6.28),
    });
    if (dust.length > 160) dust.shift();
  }

  window.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    if (last) {
      /* one speck every few pixels travelled, so a fast flick leaves a
         trail rather than a single clump */
      var d = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      var n = Math.min(4, Math.floor(d / 9));
      for (var i = 1; i <= n; i++) {
        spawn(last.x + (e.clientX - last.x) * (i / n), last.y + (e.clientY - last.y) * (i / n));
      }
      if (n) last = { x: e.clientX, y: e.clientY };
    } else {
      last = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY);
    }
    wake();
  }, { passive: true });

  window.addEventListener("pointerleave", function () { last = null; });

  function star(ctx, r) {
    /* four points, with the waist pulled in: the classic twinkle */
    var k = r * 0.28;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(k, -k, r, 0);
    ctx.quadraticCurveTo(k, k, 0, r);
    ctx.quadraticCurveTo(-k, k, -r, 0);
    ctx.quadraticCurveTo(-k, -k, 0, -r);
    ctx.fill();
  }

  function drawDust(dt) {
    dx.clearRect(0, 0, W, H);
    for (var i = dust.length - 1; i >= 0; i--) {
      var p = dust[i];
      p.life += dt;
      if (p.life >= p.max) { dust.splice(i, 1); continue; }
      p.vy += 40 * dt;                  /* settles downward, like dust */
      p.vx *= 0.98;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.turn += p.spin * dt;

      var t = p.life / p.max;
      var twinkle = 0.65 + 0.35 * Math.sin(p.phase + p.life * 22);
      dx.save();
      dx.globalAlpha = (1 - t) * twinkle;
      dx.translate(p.x, p.y);
      dx.rotate(p.turn);
      dx.fillStyle = p.color;
      dx.shadowColor = p.color;
      dx.shadowBlur = 10;
      if (p.star) {
        star(dx, p.size * (1 - t * 0.5));
      } else {
        dx.beginPath();
        dx.arc(0, 0, p.size * 0.32 * (1 - t * 0.5), 0, 6.283);
        dx.fill();
      }
      dx.restore();
    }
  }

  /* ---------- bubbles ---------- */

  var bubbles = [];
  var want = Math.round(Math.min(14, Math.max(6, (W * H) / 120000)) * (nested ? 0.5 : 1));

  function bubble(anywhere) {
    var r = rand(10, 34);
    return {
      r: r,
      x: rand(r, W - r),
      y: anywhere ? rand(0, H) : H + r + rand(0, 120),
      vy: rand(9, 22) * (34 / (r + 20)),   /* small ones rise faster */
      sway: rand(6, 18), freq: rand(0.25, 0.6), phase: rand(0, 6.28),
      hue: rand(0, 360),
      t: 0,
    };
  }
  for (var b = 0; b < (BUBBLES ? want : 0); b++) bubbles.push(bubble(true));

  function drawBubbles(dt) {
    bx.clearRect(0, 0, W, H);
    for (var i = 0; i < bubbles.length; i++) {
      var q = bubbles[i];
      q.t += dt;
      q.y -= q.vy * dt;
      q.hue = (q.hue + 25 * dt) % 360;  /* the film's colours slowly turn */
      if (q.y < -q.r * 2) { bubbles[i] = bubble(false); continue; }
      var x = q.x + Math.sin(q.phase + q.t * q.freq * 6.283) * q.sway;
      var y = q.y;

      /* the body: nearly clear in the middle, tinted towards the edge */
      var body = bx.createRadialGradient(x, y, q.r * 0.2, x, y, q.r);
      body.addColorStop(0, "rgba(255,255,255,0.02)");
      body.addColorStop(0.75, "hsla(" + q.hue + ",90%,85%,0.10)");
      body.addColorStop(1, "hsla(" + ((q.hue + 60) % 360) + ",90%,88%,0.38)");
      bx.fillStyle = body;
      bx.beginPath();
      bx.arc(x, y, q.r, 0, 6.283);
      bx.fill();

      /* the rim: a thin band of shifting colour */
      var rim = bx.createLinearGradient(x - q.r, y - q.r, x + q.r, y + q.r);
      rim.addColorStop(0, "hsla(" + q.hue + ",95%,85%,0.7)");
      rim.addColorStop(0.5, "hsla(" + ((q.hue + 120) % 360) + ",95%,85%,0.55)");
      rim.addColorStop(1, "hsla(" + ((q.hue + 240) % 360) + ",95%,85%,0.7)");
      bx.strokeStyle = rim;
      bx.lineWidth = 1.2;
      bx.stroke();

      /* the window highlight, top left */
      bx.fillStyle = "rgba(255,255,255,0.75)";
      bx.beginPath();
      bx.ellipse(x - q.r * 0.38, y - q.r * 0.42, q.r * 0.22, q.r * 0.11, -0.7, 0, 6.283);
      bx.fill();
    }
  }

  /* ---------- the loop ---------- */

  var running = false, prev = 0;

  function frame(now) {
    var dt = Math.min(0.05, (now - prev) / 1000 || 0);
    prev = now;
    if (document.hidden) { running = false; return; }   /* resumes on wake */
    drawBubbles(dt);
    drawDust(dt);
    requestAnimationFrame(frame);
  }

  function wake() {
    if (running || document.hidden) return;
    running = true;
    prev = performance.now();
    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", wake);
  wake();
})();
