/* [Grok-Bot] V4.77: Nach F5 springt Audio ~jede 1 s an die gespeicherte Resume-Position zurück
   (Windows-Desktop): pendingSeek blieb nach dem ersten Seek gesetzt; loadedmetadata / v362
   und Media-Session-seekto (Echo von setPositionState alle ~1 s, v468) setzten currentTime
   erneut auf die Boot-Resume-Zeit. Strophe wirkte „wiederholt“.
   Fix an EINER Stelle: Resume-Ziel nur einmal anwenden – pendingSeek nach erfolgreichem
   Apply auf 0; danach Seeks/seekto zurück auf das Boot-Ziel verwerfen. critical=true. */
window.BPP_BUILD = "4.77";
window.BPP_SHOW = "4.77";

(function () {
  if (window.bppV477) return;
  window.bppV477 = 1;

  var resumeTarget = 0;
  var applied = false;
  var blocked = 0;
  var t0 = Date.now();

  try {
    var m = JSON.parse(window.bppBootMem || "{}") || {};
    var id = m.lastId;
    var st = (m.songs && id && m.songs[id]) || {};
    resumeTarget = +st.time || 0;
  } catch (e) {}
  if (!(resumeTarget >= 3)) resumeTarget = 0;

  function audioEl() {
    try {
      if (typeof a !== "undefined" && a) return a;
    } catch (e) {}
    return document.getElementById("a");
  }

  function markApplied() {
    applied = true;
    window.bppResumeOnce = 1;
    try {
      if (typeof pendingSeek === "number" && pendingSeek >= 3) pendingSeek = 0;
    } catch (e) {}
  }

  function near(x, y, d) {
    return isFinite(x) && isFinite(y) && Math.abs(x - y) <= (d == null ? 1.5 : d);
  }

  /* Snap zurück auf Resume-Ziel, obwohl Playback schon weiter ist → verwerfen */
  function isStaleResumeSeek(to, from) {
    if (!applied || !(resumeTarget >= 3)) return false;
    if (!isFinite(to)) return false;
    var cur = isFinite(from) ? from : 0;
    if (cur < resumeTarget + 2) return false;
    if (!near(to, resumeTarget, 1.6)) return false;
    if (!(to < cur - 0.8)) return false;
    return true;
  }

  function maybeClearPending(el) {
    try {
      if (typeof pendingSeek !== "number" || pendingSeek < 3) {
        if (!applied && resumeTarget >= 3 && el && near(el.currentTime, resumeTarget, 1.5)) markApplied();
        return;
      }
      if (!el || !isFinite(el.duration)) return;
      if (near(el.currentTime, pendingSeek, 1.5)) {
        if (!(resumeTarget >= 3)) resumeTarget = pendingSeek;
        markApplied();
      }
    } catch (e) {}
  }

  function hookAudio() {
    var el = audioEl();
    if (!el || el.__bpp477) return;
    el.__bpp477 = 1;

    el.addEventListener("loadedmetadata", function () {
      /* nach index.html-Handler: einmal anwenden, dann pendingSeek leeren */
      setTimeout(function () {
        maybeClearPending(el);
      }, 0);
      setTimeout(function () {
        maybeClearPending(el);
      }, 120);
      setTimeout(function () {
        maybeClearPending(el);
      }, 400);
    });

    el.addEventListener("seeked", function () {
      maybeClearPending(el);
    });

    var desc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "currentTime");
    if (!desc || !desc.get || !desc.set) return;
    Object.defineProperty(el, "currentTime", {
      configurable: true,
      enumerable: desc.enumerable,
      get: function () {
        return desc.get.call(this);
      },
      set: function (v) {
        v = +v;
        var cur = 0;
        try {
          cur = desc.get.call(this);
        } catch (e) {}
        if (isStaleResumeSeek(v, cur)) {
          blocked++;
          window.bppV477Blocked = blocked;
          return cur;
        }
        var r = desc.set.call(this, v);
        /* Erster Resume-Seek (v362 / loadedmetadata): Ziel merken und später clearen */
        if (!applied && resumeTarget >= 3 && near(v, resumeTarget, 1.5)) {
          setTimeout(function () {
            maybeClearPending(el);
          }, 0);
        } else if (!applied && !(resumeTarget >= 3) && v >= 3 && typeof pendingSeek === "number" && near(v, pendingSeek, 1.5)) {
          resumeTarget = pendingSeek;
          setTimeout(function () {
            maybeClearPending(el);
          }, 0);
        }
        return r;
      }
    });
  }

  function wrapSeekto() {
    try {
      if (!window.bppMS468 || !window.bppMS468.handlers) return;
      var h = window.bppMS468.handlers;
      if (!h.seekto || h.seekto.__bpp477) return;
      var prev = h.seekto;
      var wrapped = function (d) {
        if (d && typeof d.seekTime === "number") {
          var el = audioEl();
          var cur = el ? el.currentTime : 0;
          if (isStaleResumeSeek(d.seekTime, cur)) {
            blocked++;
            window.bppV477Blocked = blocked;
            return;
          }
        }
        return prev.apply(this, arguments);
      };
      wrapped.__bpp477 = 1;
      h.seekto = wrapped;
      try {
        navigator.mediaSession.setActionHandler("seekto", wrapped);
      } catch (e) {}
    } catch (e2) {}
  }

  /* YT: pendingSeek nach erstem Start ebenfalls nur einmal – kein MS-Echo, aber Clear */
  function clearYtPending() {
    try {
      if (typeof ytOn === "undefined" || !ytOn) return;
      if (typeof pendingSeek === "number" && pendingSeek >= 3) {
        if (!(resumeTarget >= 3)) resumeTarget = pendingSeek;
        markApplied();
      }
    } catch (e) {}
  }

  function tick() {
    hookAudio();
    wrapSeekto();
    var el = audioEl();
    if (el) maybeClearPending(el);
    clearYtPending();
    /* v362-Fenster: nach 8 s Resume sowieso als erledigt betrachten, pendingSeek leeren */
    if (!applied && Date.now() - t0 > 8000) {
      try {
        if (typeof pendingSeek === "number" && pendingSeek >= 3) {
          var el2 = audioEl();
          if (el2 && el2.currentTime >= 2) markApplied();
          else if (Date.now() - t0 > 20000) markApplied();
        }
      } catch (e) {}
    }
  }

  hookAudio();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      hookAudio();
      tick();
    });
  }
  window.addEventListener("load", function () {
    hookAudio();
    tick();
  });
  setTimeout(tick, 200);
  setTimeout(tick, 800);
  setTimeout(tick, 1600);
  setInterval(tick, 1000);

  window.bppV477Api = {
    target: function () {
      return resumeTarget;
    },
    applied: function () {
      return applied;
    },
    blocked: function () {
      return blocked;
    },
    mark: markApplied
  };
})();
