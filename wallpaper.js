/* ==========================================================================
   WALLPAPER

   The rotating background, shared by every page that wants one. It drives
   any element carrying data-wallpaper, so the desktop and the scroll deck
   use the same pictures and the same list without either owning it.

   Each entry carries its own `ink`, because on the desktop the menu bar and
   the icon labels sit straight on the picture with no panel behind them. A
   pale sky needs dark ink; a black hole needs white. Getting it wrong does
   not look slightly off, it makes the menu bar disappear, so it is declared
   per image rather than guessed:

     { src: "img/wall-9.jpg", ink: "dark"  }   // pale image, dark text
     { src: "img/wall-9.jpg", ink: "light" }   // dark image, white text

   Judge it by the TOP of the image, which is where the menu bar lands, not
   by the picture as a whole. Glass also takes its character from whatever is
   behind it, so a flat image makes the sidebar look like a grey panel.

   Under prefers-reduced-motion it picks one and stays there. A background
   that changes under you is exactly the kind of motion that setting is for.
   ========================================================================== */

var WALLPAPERS = [
  { src: "img/wall-1.jpg", ink: "dark" },   /* cottage garden, white fence */
  { src: "img/wall-2.jpg", ink: "dark" },   /* lily pond */
  { src: "img/wall-3.jpg", ink: "dark" },   /* wildflower shore */
  { src: "img/wall-4.jpg", ink: "dark" },   /* pastel meadow wash */
];

var WALL_EVERY = 45000;   /* ms between changes */

(function wallpaper() {
  "use strict";

  var host = document.querySelector("[data-wallpaper]");
  if (!host || !WALLPAPERS.length) return;

  var INK = {
    dark: {
      ink: "#23241f",
      shade: "0 1px 2px rgba(255,255,255,.7), 0 0 10px rgba(255,255,255,.45)",
      hover: "rgba(0, 0, 0, .1)",
    },
    light: {
      ink: "#ffffff",
      shade: "0 1px 2px rgba(0,0,0,.55), 0 0 12px rgba(0,0,0,.4)",
      hover: "rgba(255, 255, 255, .2)",
    },
  };

  var root = document.documentElement.style;
  var css = function (w) { return 'url("' + w.src + '")'; };
  var at = 0;   /* always the first entry in WALLPAPERS on load, then rotates */
  var layer = "a";

  function wearInk(w) {
    var k = INK[w.ink] || INK.dark;
    root.setProperty("--desk-ink", k.ink);
    root.setProperty("--desk-shade", k.shade);
    root.setProperty("--desk-hover", k.hover);
  }

  host.style.setProperty("--shot-a", css(WALLPAPERS[at]));
  wearInk(WALLPAPERS[at]);

  if (WALLPAPERS.length < 2 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* Hold every file in cache before it is ever faded to, so a crossfade never
     catches an image mid-download and flashes the gradient underneath. */
  WALLPAPERS.forEach(function (w) { new Image().src = w.src; });

  setInterval(function () {
    if (document.hidden) return;          /* no point animating an unseen tab */
    at = (at + 1) % WALLPAPERS.length;
    var next = layer === "a" ? "b" : "a";
    host.style.setProperty("--shot-" + next, css(WALLPAPERS[at]));
    /* let the new layer paint before it is faded up */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        host.dataset.layer = next;
        layer = next;
        wearInk(WALLPAPERS[at]);          /* ink changes with the picture */
      });
    });
  }, WALL_EVERY);
})();
