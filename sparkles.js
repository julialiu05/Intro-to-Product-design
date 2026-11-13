/* ==========================================================================
   SPARKLES

   Fairy dust that follows the pointer, and now and then a shooting star
   across the sky. Shared by the desktop and the scroll deck, the way wallpaper.js is:
   load it after the page and it adds itself.

   Two canvases, because they belong at different depths:
     • shooting stars sit just above the wallpaper and behind everything you read,
       so they never cover a window, a slide or a label
     • sparkles sit on top of everything, because they follow the pointer

   Neither ever takes a click (pointer-events: none). Sparkles only follow a
   mouse or a pen, not a finger. Under prefers-reduced-motion neither runs:
   drifting and twinkling is exactly the motion that setting asks to stop.
   ========================================================================== */

(function sparkles() {
  "use strict";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* The current week can turn things off: `fx: { stars: false }` on the
     week object in course.js. The cursor is set there too, so a week can
     change the feel of the desktop without touching any code. */
  var FX = (function () {
    if (typeof COURSE === "undefined") return {};
    var w = (COURSE.weeks || []).filter(function (x) { return x.week === COURSE.CURRENT_WEEK; })[0];
    return (w && w.fx) || {};
  })();
  /* "circle" is a small white dot drawn on a canvas, with a soft shadow
     and a faint edge so it still shows on a pale wallpaper. Hotspot in the
     centre. Anything else is passed through as a CSS cursor value. */
  function ringCursor() {
    var d = 24, c = document.createElement("canvas");
    c.width = c.height = d * 2;
    var g = c.getContext("2d");
    g.scale(2, 2);
    g.shadowColor = "rgba(0,0,0,.35)"; g.shadowBlur = 4; g.shadowOffsetY = 1;
    g.beginPath(); g.arc(d / 2, d / 2, 7, 0, 6.283);
    g.fillStyle = "#ffffff"; g.fill();
    g.shadowColor = "transparent";
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,.18)"; g.stroke();
    return "url(" + c.toDataURL() + ") " + (d / 2) + " " + (d / 2) + ", auto";
  }
  /* A five-pointed star path centred on 0,0, first point straight up. */
  function starPath(ctx, outer, inner) {
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var r = i % 2 ? inner : outer, a = -Math.PI / 2 + i * Math.PI / 5;
      ctx[i ? "lineTo" : "moveTo"](Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
  }

  /* "wand", the default: a little magic wand drawn on a canvas, tip up and
     to the left with a glowing star on the end. The hotspot is the star, so
     the trail pours out of the wand rather than from somewhere along it.
     Drawn at 1x and 2x so it stays crisp on a retina screen. */
  function wandImage(scale) {
    var d = 32, c = document.createElement("canvas");
    c.width = c.height = d * scale;
    var g = c.getContext("2d");
    g.scale(scale, scale);
    g.lineCap = "round";

    /* the stick, with a soft shadow so it reads on a pale wallpaper */
    g.shadowColor = "rgba(0,0,0,.4)"; g.shadowBlur = 3; g.shadowOffsetY = 1;
    g.strokeStyle = "#3b2a5c"; g.lineWidth = 4.5;
    g.beginPath(); g.moveTo(11, 11); g.lineTo(28, 28); g.stroke();
    g.shadowColor = "transparent";
    g.strokeStyle = "#b9a4f0"; g.lineWidth = 2.5;
    g.beginPath(); g.moveTo(11, 11); g.lineTo(28, 28); g.stroke();
    /* a gold band near the handle */
    g.strokeStyle = "#ffd77a"; g.lineWidth = 3;
    g.beginPath(); g.moveTo(22, 22); g.lineTo(23.5, 23.5); g.stroke();

    /* the star, glowing */
    g.save();
    g.translate(8, 8);
    g.rotate(-0.25);
    g.shadowColor = "#fff3b0"; g.shadowBlur = 6;
    g.fillStyle = "#fff6c9";
    g.strokeStyle = "#fff6c9"; g.lineWidth = 1.6; g.lineJoin = "round";
    starPath(g, 6.5, 2.9);
    g.fill(); g.stroke();
    g.shadowBlur = 0;
    g.lineWidth = 0.9; g.strokeStyle = "rgba(196,140,40,.75)";
    g.stroke();
    g.restore();
    return c.toDataURL();
  }
  function wandCursor() {
    var one = wandImage(1), two = wandImage(2);
    /* plain url first; browsers that understand image-set take the sharper one */
    return ["url(" + one + ") 3 3, auto",
            "-webkit-image-set(url(" + one + ") 1x, url(" + two + ") 2x) 3 3, auto"];
  }

  var cur = !FX.cursor || FX.cursor === "wand" ? wandCursor()
          : FX.cursor === "circle" ? [ringCursor()] : [FX.cursor];
  var st = document.createElement("style");
  st.textContent = "html, body, button, a, .icon, .dock__app, .row { " +
    cur.map(function (v) { return "cursor: " + v + " !important;"; }).join(" ") + " }";
  document.head.appendChild(st);
  var STARS = FX.stars !== false;

  /* Pastel fairy colours: white, pink, lavender, butter, ice blue. */
  var DUST = ["#ffffff", "#ffd6f5", "#e8d9ff", "#fff1bf", "#cdf3ff"];

  /* The deck also opens inside a desktop window. The desktop already has
     shooting stars behind it, so the deck inside keeps fewer. */
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
  var skyCanvas = layer(desk ? 15 : 0);
  var dustCanvas = layer(2147483000);
  var bx = skyCanvas.getContext("2d");
  var dx = dustCanvas.getContext("2d");

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    [skyCanvas, dustCanvas].forEach(function (c) {
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

  /* Three kinds, out of the wand tip:
       • stars: chubby five-pointed stars with rounded points, the biggest
       • sparkles: four-pointed twinkles, smaller
       • motes: tiny glowing dots that fill in between */
  function spawn(x, y) {
    var r = Math.random();
    var kind = r < 0.3 ? "star" : r < 0.75 ? "sparkle" : "mote";
    dust.push({
      x: x + rand(-4, 4), y: y + rand(-4, 4),
      vx: rand(-22, 22), vy: rand(-34, 4),
      life: 0, max: kind === "star" ? rand(0.9, 1.4) : rand(0.6, 1.1),
      kind: kind,
      size: kind === "star" ? rand(6, 10) : kind === "sparkle" ? rand(3.5, 6.5) : rand(1.2, 2.2),
      spin: rand(-2.2, 2.2), turn: rand(0, Math.PI),
      color: pick(DUST),
      phase: rand(0, 6.28),
    });
    if (dust.length > 180) dust.shift();
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

  function twinkle(ctx, r) {
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

  function roundStar(ctx, r) {
    /* a plump five-pointed star; stroking it in its own colour with round
       joins softens every point, so it reads as a sticker, not a spike */
    starPath(ctx, r, r * 0.5);
    ctx.lineJoin = "round";
    ctx.lineWidth = r * 0.45;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.fill();
    ctx.stroke();
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
      var shimmer = 0.7 + 0.3 * Math.sin(p.phase + p.life * 20);
      /* pop in over the first moment, then shrink away */
      var grow = Math.min(1, p.life / 0.12) * (1 - t * 0.55);
      var s = p.size * grow;
      dx.save();
      dx.globalAlpha = (1 - t) * shimmer;
      dx.translate(p.x, p.y);
      dx.rotate(p.kind === "star" ? p.turn * 0.5 : p.turn);
      dx.fillStyle = p.color;
      dx.shadowColor = p.color;
      dx.shadowBlur = p.kind === "star" ? 16 : 12;
      if (p.kind === "star") {
        roundStar(dx, s);
        /* a white heart, so it glows from the middle */
        dx.shadowBlur = 0;
        dx.globalAlpha *= 0.85;
        dx.fillStyle = "#ffffff";
        starPath(dx, s * 0.45, s * 0.22);
        dx.fill();
      } else if (p.kind === "sparkle") {
        twinkle(dx, s);
        dx.shadowBlur = 0;
        dx.fillStyle = "#ffffff";
        twinkle(dx, s * 0.45);
      } else {
        dx.beginPath();
        dx.arc(0, 0, s, 0, 6.283);
        dx.fill();
      }
      dx.restore();
    }
  }

  /* ---------- shooting stars ---------- */

  /* Every few seconds a star streaks across the upper part of the screen,
     falling gently, with a glowing tail that tapers to nothing. Never more
     than a couple at once, so they stay a surprise rather than weather. */
  var shooters = [];
  var nextShot = rand(0.8, 2.5);            /* seconds until the first one */
  var MAX_SHOTS = nested ? 1 : 3;

  function shoot() {
    var leftward = Math.random() < 0.5;
    var speed = rand(520, 820);
    var angle = rand(0.25, 0.5);            /* radians below horizontal */
    return {
      x: leftward ? rand(W * 0.35, W * 1.05) : rand(-W * 0.05, W * 0.65),
      y: rand(-20, H * 0.4),
      vx: Math.cos(angle) * speed * (leftward ? -1 : 1),
      vy: Math.sin(angle) * speed,
      life: 0, max: rand(0.9, 1.5),
      len: rand(90, 170),
      size: rand(2.2, 3.4),
      color: pick(DUST),
    };
  }

  function drawShooters(dt) {
    bx.clearRect(0, 0, W, H);
    if (!STARS) return;

    nextShot -= dt;
    if (nextShot <= 0) {
      if (shooters.length < MAX_SHOTS) shooters.push(shoot());
      nextShot = rand(2.5, 6) * (nested ? 2 : 1);
    }

    for (var i = shooters.length - 1; i >= 0; i--) {
      var q = shooters[i];
      q.life += dt;
      if (q.life >= q.max) { shooters.splice(i, 1); continue; }
      q.x += q.vx * dt; q.y += q.vy * dt;

      var t = q.life / q.max;
      /* fade in fast, burn, fade out */
      var a = Math.min(1, t / 0.15) * Math.min(1, (1 - t) / 0.4);
      var sp = Math.hypot(q.vx, q.vy);
      var ux = q.vx / sp, uy = q.vy / sp;
      var len = q.len * Math.min(1, t / 0.25);
      var tx = q.x - ux * len, ty = q.y - uy * len;

      bx.save();
      bx.globalAlpha = a;
      bx.lineCap = "round";

      /* the tail: a soft wide glow, then a bright thin core */
      var glow = bx.createLinearGradient(q.x, q.y, tx, ty);
      glow.addColorStop(0, q.color);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      bx.strokeStyle = glow;
      bx.shadowColor = q.color; bx.shadowBlur = 14;
      bx.lineWidth = q.size * 1.8;
      bx.beginPath(); bx.moveTo(q.x, q.y); bx.lineTo(tx, ty); bx.stroke();

      var core = bx.createLinearGradient(q.x, q.y, tx, ty);
      core.addColorStop(0, "rgba(255,255,255,1)");
      core.addColorStop(0.6, "rgba(255,255,255,0)");
      bx.strokeStyle = core;
      bx.shadowBlur = 0;
      bx.lineWidth = q.size * 0.6;
      bx.beginPath(); bx.moveTo(q.x, q.y); bx.lineTo(tx, ty); bx.stroke();

      /* the head: a little twinkle with a glow */
      bx.translate(q.x, q.y);
      bx.rotate(q.life * 4);
      bx.fillStyle = "#ffffff";
      bx.shadowColor = q.color; bx.shadowBlur = 16;
      twinkle(bx, q.size * 2.6);
      bx.restore();
    }
  }

  /* ---------- the loop ---------- */

  var running = false, prev = 0;

  function frame(now) {
    var dt = Math.min(0.05, (now - prev) / 1000 || 0);
    prev = now;
    if (document.hidden) { running = false; return; }   /* resumes on wake */
    drawShooters(dt);
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
