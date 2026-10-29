/* [Grok-Bot] V4.69: Beim Start (Seitenaufruf, Reload inkl. Auto-Update-Reload, PWA-Start)
   immer ganz nach oben zum Titel scrollen, damit der BPP komplett sichtbar ist.
   history.scrollRestoration='manual'; nach Laden und nach spaeterer Layout-Verschiebung
   (Fonts/Lyrics/Statistik, ~1,5 s) window.scrollTo(0,0). Auto-Scrolls zur aktiven Strophe
   (pinStanza Seiten-Scroll) beim Start unterdruecken, bis der Nutzer Play drueckt oder
   selbst scrollt – danach normales Verhalten. Eine Stelle. */
window.BPP_BUILD = "4.69";
window.BPP_SHOW = "4.69";

(function () {
  if (window.bppV469) return;
  window.bppV469 = 1;

  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch (e) {}

  var locked = true;
  var forcing = false;
  var unlockReason = "";
  var started = Date.now();
  var HOLD_MS = 2000; /* Layout-Nachlauf Fonts/Lyrics/Statistik */

  function top() {
    forcing = true;
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
    try {
      var sc = document.scrollingElement || document.documentElement;
      if (sc) sc.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } catch (e2) {}
    forcing = false;
  }

  function unlock(why) {
    if (!locked) return;
    locked = false;
    unlockReason = why || "user";
    try {
      window.dispatchEvent(new CustomEvent("bpp-start-top-unlock", { detail: { why: unlockReason } }));
    } catch (e) {}
  }

  function isLocked() {
    return locked;
  }

  /* Sofort + nach Load/Layout */
  top();
  function schedule() {
    [0, 50, 100, 200, 400, 800, 1200, 1500, 2000, 2500].forEach(function (ms) {
      setTimeout(function () {
        if (locked) top();
      }, ms);
    });
  }
  schedule();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (locked) top();
    });
  } else if (locked) top();

  window.addEventListener("load", function () {
    if (locked) top();
    try {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          if (locked) top();
        });
      }
    } catch (e) {}
    schedule();
  });

  /* Spaete Layout-Verschiebungen: Lyrics/Statistik/Relayout */
  var moTimer = null;
  try {
    var mo = new MutationObserver(function () {
      if (!locked) return;
      if (moTimer) return;
      moTimer = setTimeout(function () {
        moTimer = null;
        if (locked) top();
      }, 40);
    });
    function observe() {
      if (document.documentElement) {
        mo.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: false
        });
      }
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observe);
    else observe();
    setTimeout(function () {
      try {
        mo.disconnect();
      } catch (e) {}
    }, HOLD_MS + 800);
  } catch (e) {}

  /* Seiten-Auto-Scroll zuruecksetzen, solange gelockt */
  window.addEventListener(
    "scroll",
    function () {
      if (!locked || forcing) return;
      if (window.scrollY > 0 || (document.scrollingElement && document.scrollingElement.scrollTop > 0)) {
        top();
      }
    },
    { passive: true, capture: true }
  );

  /* pinStanza: Seiten-Scroll beim Start unterdruecken (Lyrics-Fenster darf weiter gesetzt werden) */
  function wrapPin() {
    var fn = window.pinStanza;
    if (typeof fn !== "function" || fn.__v469) return;
    var o = fn;
    var f = function () {
      var r = o.apply(this, arguments);
      if (locked) {
        top();
        Promise.resolve().then(function () {
          if (locked) top();
        });
        setTimeout(function () {
          if (locked) top();
        }, 0);
        setTimeout(function () {
          if (locked) top();
        }, 30);
      }
      return r;
    };
    f.__v469 = 1;
    window.pinStanza = f;
    try {
      pinStanza = f;
    } catch (e) {}
  }
  wrapPin();
  setInterval(wrapPin, 500);

  /* Nutzer scrollt selbst -> freigeben (nicht unsere Force-Scrolls) */
  var NAV = { ArrowUp: 1, ArrowDown: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1, " ": 1 };
  function userIntent(e) {
    if (!locked) return;
    if (e.type === "keydown" && !NAV[e.key]) return;
    /* Klicks auf Play nicht als Scroll werten – Play-Pfad unlocked separat */
    if (e.type === "pointerdown" || e.type === "mousedown" || e.type === "touchstart") {
      var t = e.target;
      if (t && t.closest && t.closest("#btnPlay, #btnP, .play, [data-play], button.play")) return;
    }
    if (e.type === "wheel" || e.type === "touchmove" || e.type === "keydown") {
      unlock(e.type);
      return;
    }
    /* Scrollbalken / sonstige Zeiger auf Document: erst beim naechsten echten Scroll freigeben */
  }
  ["wheel", "touchmove", "keydown"].forEach(function (t) {
    window.addEventListener(t, userIntent, { capture: true, passive: true });
  });

  /* Play -> freigeben (dann v223/normales Mitlesen ok) */
  function onPlay() {
    unlock("play");
  }
  function wrapPlay() {
    if (typeof window.play === "function" && !window.play.__v469) {
      var pl = window.play;
      var w = function () {
        onPlay();
        return pl.apply(this, arguments);
      };
      w.__v469 = 1;
      window.play = w;
    }
  }
  wrapPlay();
  setInterval(wrapPlay, 800);

  function bindAudio() {
    var a = document.getElementById("a");
    if (!a || a.__v469) return;
    a.__v469 = 1;
    a.addEventListener("play", onPlay);
    a.addEventListener("playing", onPlay);
  }
  bindAudio();
  document.addEventListener("DOMContentLoaded", bindAudio);
  window.addEventListener("load", bindAudio);
  setInterval(bindAudio, 1000);

  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("#btnPlay, #btnP, button#play, .bar .play, [aria-label='Play'], [title='Play']")) onPlay();
    },
    true
  );

  window.bppStartTop = {
    locked: isLocked,
    unlock: unlock,
    top: top,
    reason: function () {
      return unlockReason;
    },
    age: function () {
      return Date.now() - started;
    }
  };
})();
