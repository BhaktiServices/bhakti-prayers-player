/* [Grok-Bot] V4.69: Beim Start (Seitenaufruf, Reload inkl. Auto-Update-Reload, PWA-Start)
   immer ganz nach oben zum Titel scrollen, damit der BPP komplett sichtbar ist.
   history.scrollRestoration='manual'; nach Laden und nach spaeterer Layout-Verschiebung
   (Fonts/Lyrics/Statistik, ~1,5 s) window.scrollTo(0,0). Auto-Scrolls zur aktiven Strophe
   (pinStanza Seiten-Scroll, scrollIntoView) beim Start unterdruecken, bis der Nutzer Play
   drueckt oder selbst scrollt – danach normales Verhalten. Eine Stelle.
   Hinweis: ?p=-Direktlinks rufen play()/btnPlay.click() programmatisch auf (isTrusted=false)
   und entsperren daher nicht; erst echte Nutzer-Geste. */
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
  var HOLD_MS = 3200;

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

  top();
  function schedule() {
    [0, 50, 100, 200, 400, 700, 1000, 1500, 2000, 2500, 3000].forEach(function (ms) {
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
          attributes: true
        });
      }
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observe);
    else observe();
    setTimeout(function () {
      try {
        mo.disconnect();
      } catch (e) {}
    }, HOLD_MS + 500);
  } catch (e) {}

  window.addEventListener(
    "scroll",
    function () {
      if (!locked || forcing) return;
      var y = window.scrollY || (document.scrollingElement && document.scrollingElement.scrollTop) || 0;
      if (y > 0) top();
    },
    { passive: true, capture: true }
  );

  /* pinStanza: Seiten-Scroll beim Start unterdruecken */
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
        setTimeout(function () {
          if (locked) top();
        }, 200);
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

  /* scrollIntoView (z. B. v223 nach Play) waehrend Lock neutralisieren */
  try {
    var siv = Element.prototype.scrollIntoView;
    if (siv && !Element.prototype.scrollIntoView.__v469) {
      var ws = function () {
        if (locked) {
          top();
          return;
        }
        return siv.apply(this, arguments);
      };
      ws.__v469 = 1;
      Element.prototype.scrollIntoView = ws;
    }
  } catch (e) {}

  /* Nur echte Nutzer-Geste entsperrt (nicht programmatisches play/?p=/btn.click) */
  var NAV = { ArrowUp: 1, ArrowDown: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1, " ": 1 };
  function userScroll(e) {
    if (!locked) return;
    if (e.type === "keydown" && !NAV[e.key]) return;
    if (e.isTrusted === false) return;
    unlock(e.type);
  }
  ["wheel", "touchmove", "keydown"].forEach(function (t) {
    window.addEventListener(t, userScroll, { capture: true, passive: true });
  });

  document.addEventListener(
    "click",
    function (e) {
      if (!locked || e.isTrusted === false) return;
      var t = e.target;
      if (!t || !t.closest) return;
      if (
        t.closest(
          "#btnPlay, #btnP, button#play, .bar .play, [aria-label='Play'], [title='Play'], #bppTapPlay"
        )
      ) {
        unlock("play-click");
      }
    },
    true
  );

  /* Tastatur Play (Leertaste oft Pause/Play) – nur wenn Fokus nicht in Input */
  document.addEventListener(
    "keydown",
    function (e) {
      if (!locked || e.isTrusted === false) return;
      if (e.code === "Space" || e.key === "MediaPlayPause" || e.key === "MediaPlay") {
        var tag = (e.target && e.target.tagName) || "";
        if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
        unlock("play-key");
      }
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
