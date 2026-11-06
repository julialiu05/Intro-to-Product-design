/* ==========================================================================
   EASTER EGGS

   Small things that reward poking at the desktop. None of them are needed
   for anything, none of them take a click away from real content, and all
   of them are emoji or text, like everything else on this site.

     • Flying toast. Leave the desktop alone for two minutes and After Dark
       comes back: toast drifts across the screen until you move the mouse.
     • The Konami code (up up down down left right left right b a) makes the
       dock do the wave.

   The Terminal has a few of its own: try sl, say, cowsay, whoami and rm.
   Under prefers-reduced-motion the toast and the wave stay off.
   ========================================================================== */

(function eggs() {
  "use strict";

  var desk = document.querySelector("#windows");
  if (!desk) return;   /* desktop only, not the deck */

  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------- toast ---- */

  var IDLE = 120000;   /* 2 min */
  var timer = null, layer = null, raf = null, slices = [];

  function stopToast() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (layer) layer.remove();
    layer = null; slices = [];
  }

  function slice(w, h, first) {
    return {
      x: first ? Math.random() * w : w + 60,
      y: first ? Math.random() * h : Math.random() * h * 1.2,
      v: 40 + Math.random() * 50,
      bob: Math.random() * Math.PI * 2,
      size: 28 + Math.random() * 26,
      el: null,
    };
  }

  function startToast() {
    if (still || layer || document.hidden) return;
    layer = document.createElement("div");
    layer.className = "toast";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
    var w = innerWidth, h = innerHeight;
    for (var i = 0; i < 9; i++) {
      var s = slice(w, h, true);
      s.el = document.createElement("span");
      s.el.textContent = i % 3 === 2 ? "🥪" : "🍞";
      s.el.style.fontSize = s.size + "px";
      layer.appendChild(s.el);
      slices.push(s);
    }
    var last = performance.now();
    (function tick(now) {
      var dt = Math.min(50, now - last) / 1000; last = now;
      slices.forEach(function (s) {
        s.x -= s.v * dt;
        s.y -= s.v * .55 * dt;
        s.bob += dt * 3;
        if (s.x < -80 || s.y < -80) {
          var n = slice(innerWidth, innerHeight, false);
          s.x = n.x; s.y = n.y; s.v = n.v;
        }
        s.el.style.transform = "translate(" + s.x + "px," + (s.y + Math.sin(s.bob) * 6) + "px) rotate(-12deg)";
      });
      raf = requestAnimationFrame(tick);
    })(last);
  }

  function poke() {
    stopToast();
    clearTimeout(timer);
    timer = setTimeout(startToast, IDLE);
  }
  ["mousemove", "mousedown", "keydown", "touchstart", "wheel"].forEach(function (ev) {
    addEventListener(ev, poke, { passive: true });
  });
  document.addEventListener("visibilitychange", poke);
  poke();

  /* ---------------------------------------------------------- konami --- */

  var CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight",
              "ArrowLeft", "ArrowRight", "b", "a"];
  var at = 0;
  addEventListener("keydown", function (ev) {
    if (ev.target && /input|textarea/i.test(ev.target.tagName)) return;
    at = ev.key === CODE[at] ? at + 1 : (ev.key === CODE[0] ? 1 : 0);
    if (at < CODE.length) return;
    at = 0;
    if (still) return;
    var apps = document.querySelectorAll(".dock__app");
    apps.forEach(function (a, i) {
      a.style.animationDelay = (i * 90) + "ms";
      a.classList.remove("dock__app--wave");
      void a.offsetWidth;   /* restart the animation */
      a.classList.add("dock__app--wave");
    });
  });

  /* Public, so the Terminal can send a train across the screen. */
  window.Eggs = {
    train: function () {
      if (still) return false;
      var t = document.createElement("div");
      t.className = "train";
      t.setAttribute("aria-hidden", "true");
      t.textContent = "🚃🚃🚃🚂";
      document.body.appendChild(t);
      t.addEventListener("animationend", function () { t.remove(); });
      return true;
    },
  };
})();
