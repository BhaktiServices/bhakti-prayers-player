/* [Grok-Bot] V4.70: Offline immer auf MP3 – bei navigator.onLine===false (Start + offline-Event)
   oder wenn YouTube-iframe/API nicht laedt (Timeout ~4 s) automatisch auf MP3 umschalten,
   YT-Feld ausblenden, laufende Position uebernehmen falls moeglich. Nutzerwahl in bpp-src
   (YT) wird nicht dauerhaft ueberschrieben: bei online wiederherstellen (nur wenn nicht
   gerade spielt; sonst bei Pause). Fehlt die MP3 offline im Cache: Meldung
   "Offline nicht gespeichert – bitte Prayers runterladen". Button-Zustand YT/MP3 korrekt.
   Eine Stelle. */
window.BPP_BUILD = "4.70";
window.BPP_SHOW = "4.70";

(function () {
  if (window.bppV470) return;
  window.bppV470 = 1;

  var YT_TIMEOUT_MS = 4000;
  var MSG_MISS = "Offline nicht gespeichert – bitte Prayers runterladen";
  var forceMp3 = !navigator.onLine;
  var pendingRestore = false;
  var switching = false;
  var ytAlive = false;
  var ytTmr = null;
  var origShowYt = null;
  var lastToastAt = 0;

  function cur() {
    try {
      return typeof i !== "undefined" && i >= 0 && typeof PRAYERS !== "undefined" ? PRAYERS[i] : null;
    } catch (e) {
      return null;
    }
  }

  function srcMap() {
    try {
      return JSON.parse(localStorage.getItem("bpp-src") || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function wantYt(P) {
    if (!P || !P.youtube) return false;
    return srcMap()[P.id] === "yt";
  }

  function playing() {
    try {
      if (typeof isPlaying === "function") return !!isPlaying();
    } catch (e) {}
    try {
      if (typeof ytOn !== "undefined" && ytOn) return !!ytPlaying;
      var a = document.getElementById("a");
      return !!(a && a.src && !a.paused && !a.ended);
    } catch (e2) {
      return false;
    }
  }

  function toast(msg) {
    var now = Date.now();
    if (now - lastToastAt < 1500) return;
    lastToastAt = now;
    var d = document.getElementById("bppToast");
    if (!d) {
      d = document.createElement("div");
      d.id = "bppToast";
      d.style.cssText =
        "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);background:#333;color:#fff;padding:7px 14px;border-radius:8px;font-size:.85rem;z-index:9999;opacity:.93;max-width:90vw;text-align:center";
      document.body.appendChild(d);
    }
    d.textContent = msg;
    d.style.display = "block";
    clearTimeout(d._t);
    d._t = setTimeout(function () {
      d.style.display = "none";
    }, 5000);
  }

  function hideYtBox() {
    try {
      ytOn = false;
      ytPlaying = false;
      var y = document.getElementById("yt");
      if (y && y.getAttribute("src")) y.src = "";
      if (typeof ytBox !== "undefined" && ytBox) ytBox.classList.remove("on");
      if (typeof stage !== "undefined" && stage) stage.classList.remove("has-yt");
    } catch (e) {}
  }

  function syncUi() {
    try {
      if (typeof syncPlayBtn === "function") syncPlayBtn();
    } catch (e) {}
    try {
      setTimeout(function () {
        try {
          if (typeof layoutLyrics === "function") layoutLyrics();
        } catch (e2) {}
      }, 50);
    } catch (e3) {}
  }

  function capturePos(hint) {
    if (typeof hint === "number" && hint > 0) return hint;
    try {
      if (typeof ytOn !== "undefined" && ytOn && typeof ytTime === "number" && ytTime > 0) return ytTime;
    } catch (e) {}
    try {
      var a = document.getElementById("a");
      if (a && a.src && a.currentTime > 0) return a.currentTime;
    } catch (e2) {}
    try {
      if (typeof pendingSeek === "number" && pendingSeek > 0) return pendingSeek;
    } catch (e3) {}
    return 0;
  }

  function audioCached(P) {
    return new Promise(function (resolve) {
      if (!P || !P.audio) {
        resolve(false);
        return;
      }
      if (!("caches" in window)) {
        resolve(true);
        return;
      }
      var key;
      try {
        var u = new URL(P.audio, location.href);
        key = u.origin + u.pathname;
      } catch (e) {
        resolve(false);
        return;
      }
      caches
        .keys()
        .then(function (ks) {
          return Promise.all(
            ks.map(function (k) {
              return caches.open(k).then(function (c) {
                return c.match(key).then(function (h) {
                  if (h) return true;
                  return c.match(P.audio).then(function (h2) {
                    return !!h2;
                  });
                });
              });
            })
          );
        })
        .then(function (hits) {
          resolve(hits.some(Boolean));
        })
        .catch(function () {
          resolve(false);
        });
    });
  }

  function applyOfflinePrefs() {
    try {
      if (typeof PRAYERS === "undefined") return;
      PRAYERS.forEach(function (P) {
        if (P.audio) P.preferFile = true;
      });
    } catch (e) {}
  }

  function applySavedPrefs() {
    try {
      if (typeof PRAYERS === "undefined") return;
      var ch = srcMap();
      PRAYERS.forEach(function (P) {
        if (P.audio) P.preferFile = !(ch[P.id] === "yt" && P.youtube);
      });
    } catch (e) {}
  }

  function clearYtWatch() {
    if (ytTmr) {
      clearTimeout(ytTmr);
      ytTmr = null;
    }
  }

  function armYtWatch(P, startSec) {
    clearYtWatch();
    ytAlive = false;
    var y = document.getElementById("yt");
    if (!y) return;
    var src = y.getAttribute("src") || "";
    if (!/youtube/.test(src)) return;
    ytTmr = setTimeout(function () {
      ytTmr = null;
      if (ytAlive) return;
      if ((y.getAttribute("src") || "") !== src) return;
      if (typeof ytOn === "undefined" || !ytOn) return;
      goMp3(P || cur(), startSec, "yt-timeout");
    }, YT_TIMEOUT_MS);
  }

  function playFileAt(P, pos) {
    try {
      pendingSeek = pos || 0;
    } catch (e) {}
    try {
      if (typeof showFile === "function") {
        showFile(P);
        var a = document.getElementById("a");
        if (a && pos > 0) {
          var seek = function () {
            try {
              a.currentTime = pos;
            } catch (e2) {}
          };
          if (a.readyState >= 1) seek();
          else a.addEventListener("loadedmetadata", seek, { once: true });
        }
      }
    } catch (e3) {}
    syncUi();
  }

  function goMp3(P, hint, why) {
    P = P || cur();
    if (!P) return;
    if (switching) return;
    switching = true;
    setTimeout(function () {
      switching = false;
    }, 600);

    clearYtWatch();
    var pos = capturePos(hint);
    if (P.audio) P.preferFile = true;

    hideYtBox();

    if (!P.audio) {
      if (!navigator.onLine) toast(MSG_MISS);
      syncUi();
      return;
    }

    function start() {
      playFileAt(P, pos);
    }

    if (navigator.onLine && why !== "yt-timeout") {
      start();
      return;
    }

    audioCached(P).then(function (ok) {
      if (!navigator.onLine && !ok) toast(MSG_MISS);
      start();
    });
  }

  function doRestoreYt() {
    if (!navigator.onLine) return;
    pendingRestore = false;
    forceMp3 = false;
    applySavedPrefs();
    var P = cur();
    if (!wantYt(P)) {
      syncUi();
      return;
    }
    if (typeof ytOn !== "undefined" && ytOn) {
      syncUi();
      return;
    }
    var pos = capturePos(0);
    P.preferFile = false;
    try {
      pendingSeek = pos;
    } catch (e) {}
    try {
      if (typeof origShowYt === "function") origShowYt(P, pos || P.youtubeStart || 0);
      else if (typeof showYt === "function" && !showYt._v470) showYt(P, pos || P.youtubeStart || 0);
    } catch (e2) {}
    syncUi();
  }

  function restoreSaved() {
    if (!navigator.onLine) return;
    forceMp3 = false;
    applySavedPrefs();
    var P = cur();
    if (!wantYt(P)) {
      pendingRestore = false;
      syncUi();
      return;
    }
    if (playing()) {
      pendingRestore = true;
      return;
    }
    doRestoreYt();
  }

  function installShowYtWrap() {
    var fn = typeof showYt === "function" ? showYt : typeof window.showYt === "function" ? window.showYt : null;
    if (!fn || fn._v470) return !!fn;
    origShowYt = fn._v470Orig || fn;
    function wrapped(P, startSec) {
      if (!navigator.onLine || forceMp3) {
        goMp3(P, startSec, "showYt-offline");
        return;
      }
      var r = origShowYt.apply(this, arguments);
      armYtWatch(P, startSec);
      return r;
    }
    wrapped._v470 = 1;
    wrapped._v470Orig = origShowYt;
    try {
      showYt = wrapped;
    } catch (e) {}
    try {
      window.showYt = wrapped;
    } catch (e2) {}
    return true;
  }

  function onOffline() {
    forceMp3 = true;
    pendingRestore = false;
    applyOfflinePrefs();
    try {
      if (typeof ytOn !== "undefined" && ytOn) goMp3(cur(), null, "offline");
      else hideYtBox();
    } catch (e) {}
    syncUi();
  }

  function onOnline() {
    forceMp3 = false;
    restoreSaved();
  }

  window.addEventListener("message", function (e) {
    if (!/youtube/.test(e.origin || "")) return;
    var d = e.data;
    if (typeof d === "string") {
      try {
        d = JSON.parse(d);
      } catch (x) {
        return;
      }
    }
    if (!d || !d.event) return;
    if (/^(onReady|initialDelivery|infoDelivery|onStateChange)$/.test(d.event)) {
      ytAlive = true;
      clearYtWatch();
    }
    if (d.event === "onError") {
      clearYtWatch();
      if (typeof ytOn !== "undefined" && ytOn) goMp3(cur(), null, "yt-error");
    }
    /* Pause / ended while pendingRestore */
    if (pendingRestore && navigator.onLine) {
      var st =
        d.event === "onStateChange"
          ? d.info
          : d.event === "infoDelivery" && d.info
            ? d.info.playerState
            : undefined;
      /* 2=paused, 0=ended */
      if (st === 2 || st === 0) doRestoreYt();
    }
  });

  function wirePauseRestore() {
    var a = document.getElementById("a");
    if (!a || a._v470pause) return;
    a._v470pause = 1;
    a.addEventListener("pause", function () {
      if (pendingRestore && navigator.onLine && !playing()) doRestoreYt();
    });
    a.addEventListener("ended", function () {
      if (pendingRestore && navigator.onLine) doRestoreYt();
    });
  }

  function boot() {
    installShowYtWrap();
    wirePauseRestore();
    if (!navigator.onLine) {
      forceMp3 = true;
      applyOfflinePrefs();
      setTimeout(function () {
        installShowYtWrap();
        if (typeof ytOn !== "undefined" && ytOn) goMp3(cur(), null, "boot");
        else {
          /* Resume/Autostart kann spaeter showYt rufen – Wrap faengt das. */
          applyOfflinePrefs();
        }
        syncUi();
      }, 50);
      setTimeout(function () {
        installShowYtWrap();
        if (typeof ytOn !== "undefined" && ytOn) goMp3(cur(), null, "boot2");
      }, 400);
      setTimeout(function () {
        if (typeof ytOn !== "undefined" && ytOn && (!navigator.onLine || forceMp3)) goMp3(cur(), null, "boot3");
      }, 1200);
    }
  }

  window.addEventListener("offline", onOffline);
  window.addEventListener("online", onOnline);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", function () {
    installShowYtWrap();
    wirePauseRestore();
    if (!navigator.onLine) onOffline();
  });

  /* Falls showYt erst spaeter gebunden wird */
  var n = 0;
  var t = setInterval(function () {
    n++;
    installShowYtWrap();
    wirePauseRestore();
    if (n > 40) clearInterval(t);
  }, 250);

  window.bppOfflineToMp3 = {
    go: goMp3,
    force: function () {
      return forceMp3;
    },
    pendingRestore: function () {
      return pendingRestore;
    },
    cached: audioCached
  };
})();
