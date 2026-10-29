/* [Grok-Bot] V4.68: Media Session API – Musik-Steuerleiste in Android-Benachrichtigung (Runterwischen)
   und iPhone-Sperrbildschirm/Kontrollzentrum. Eine einzige Stelle: metadata (Prayer-Titel,
   artist z. B. Aufnahme Pbj/Mtj, album „Bhakti Prayers Player“, Artwork = App-Icons),
   Handler play/pause, previoustrack/nexttrack (= Prayer-Knöpfe btnPPrev/btnPNext),
   seekbackward/seekforward (±30 s), seekto; setPositionState regelmäßig; playbackState aktuell.
   Nur MP3 (YouTube setzt eigene Session – wir greifen dort nicht ein). Überschreibt ältere
   Media-Session-Handler aus v201/v205 ohne deren übrige Logik (Prayer-Nav, Aktivität) zu stören. */
window.BPP_BUILD = "4.68";
window.BPP_SHOW = "4.68";

(function () {
  if (window.bppV468) return;
  window.bppV468 = 1;
  if (!("mediaSession" in navigator)) {
    window.bppMS468 = { ok: false, reason: "no-mediaSession" };
    return;
  }

  var ms = navigator.mediaSession;
  var OWNER = "468";
  window.bppMediaSessionOwner = OWNER;
  var SEEK = 30;
  var lastPosAt = 0;
  var lastTitle = "";
  var lastArtist = "";
  var handlers = {};
  var ART = [];
  var _setAction = ms.setActionHandler.bind(ms);
  var setting = false;

  /* Fremde setActionHandler-Aufrufe (v201/v205) ignorieren, solange wir Owner sind */
  try {
    ms.setActionHandler = function (name, fn) {
      if (window.bppMediaSessionOwner === OWNER && !setting) return;
      return _setAction(name, fn);
    };
  } catch (e) {}

  function abs(u) {
    try {
      return new URL(u, location.href).href;
    } catch (e) {
      return u;
    }
  }

  function buildArt() {
    var list = [
      { src: "icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "icon-maskable-192.png", sizes: "192x192", type: "image/png" },
      { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png" },
      { src: "icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "icon-512.svg", sizes: "512x512", type: "image/svg+xml" }
    ];
    ART = list.map(function (a) {
      return { src: abs(a.src), sizes: a.sizes, type: a.type };
    });
    /* Zusätzlich 96×96 PNG aus icon-512 für Android-Kompatibilität */
    try {
      var im = new Image();
      im.onload = function () {
        try {
          var c = document.createElement("canvas");
          c.width = c.height = 96;
          c.getContext("2d").drawImage(im, 0, 0, 96, 96);
          ART.unshift({ src: c.toDataURL("image/png"), sizes: "96x96", type: "image/png" });
          meta(true);
        } catch (e) {}
      };
      im.src = abs("icon-512.png");
    } catch (e) {}
  }

  function audioEl() {
    return document.getElementById("a");
  }

  function curPrayer() {
    try {
      return typeof i !== "undefined" && i >= 0 && PRAYERS ? PRAYERS[i] : null;
    } catch (e) {
      return null;
    }
  }

  function ytMode() {
    return typeof ytOn !== "undefined" && ytOn;
  }

  function isMp3Playing() {
    var a = audioEl();
    return !!(a && a.src && !a.paused && !a.ended);
  }

  function isPlaying() {
    if (ytMode()) return !!(typeof ytPlaying !== "undefined" && ytPlaying);
    return isMp3Playing();
  }

  /* Artist: sichtbarer Rec-Knopf (Aufnahme Mtj/Pbj), sonst autor, sonst App-Name */
  function artistOf(P) {
    try {
      var btns = document.querySelectorAll(".bppRec, [id^=bppRec]");
      for (var k = 0; k < btns.length; k++) {
        var b = btns[k];
        if (!b || b.style.display === "none") continue;
        var t = String(b.textContent || "").trim();
        if (/Rec:\s*Pbj/i.test(t)) return "Aufnahme Pbj";
        if (/Rec:\s*Mtj/i.test(t)) return "Aufnahme Mtj";
        if (/^Aufnahme:/i.test(t)) return t;
      }
    } catch (e) {}
    if (P && P.id === "hanuman") {
      try {
        return localStorage.getItem("bpp-prabhus-hanuman") === "prabhus"
          ? "Aufnahme Pbj"
          : "Aufnahme Mtj";
      } catch (e) {}
    }
    if (P && P.autor) {
      var who = String(P.autor).split("\u00b7")[0].trim();
      if (who) return who;
    }
    return "Bhakti Prayers Player";
  }

  function titleOf(P) {
    if (!P) return "Bhakti Prayers Player";
    return String(P.titel || P.id || "Bhakti Prayers Player");
  }

  function setH(name, fn) {
    handlers[name] = fn;
    setting = true;
    try {
      _setAction(name, fn);
    } catch (e) {}
    setting = false;
  }

  function clearHandlers() {
    ["play", "pause", "stop", "previoustrack", "nexttrack", "seekbackward", "seekforward", "seekto"].forEach(function (n) {
      setting = true;
      try {
        _setAction(n, null);
      } catch (e) {}
      setting = false;
      delete handlers[n];
    });
  }

  function meta(force) {
    if (typeof MediaMetadata === "undefined") return;
    if (ytMode()) return; /* YouTube: eigene Session, ok */
    var P = curPrayer();
    var t = titleOf(P);
    var art = artistOf(P);
    var cur = ms.metadata;
    var ours = !!(cur && cur.album === "Bhakti Prayers Player" && cur.title === t && cur.artist === art);
    if (!force && ours && lastTitle === t && lastArtist === art) return;
    try {
      ms.metadata = new MediaMetadata({
        title: t,
        artist: art,
        album: "Bhakti Prayers Player",
        artwork: ART.slice()
      });
      lastTitle = t;
      lastArtist = art;
    } catch (e) {}
  }

  function state() {
    try {
      if (ytMode()) return;
      ms.playbackState = isMp3Playing() ? "playing" : hasMp3Src() ? "paused" : "none";
    } catch (e) {}
  }

  function hasMp3Src() {
    var a = audioEl();
    return !!(a && a.src);
  }

  function pos() {
    if (ytMode() || !ms.setPositionState) return;
    var a = audioEl();
    if (!a || !isFinite(a.duration) || a.duration <= 0) return;
    try {
      var rate = a.playbackRate > 0 ? a.playbackRate : 1;
      var p = Math.max(0, Math.min(a.currentTime || 0, a.duration));
      ms.setPositionState({ duration: a.duration, playbackRate: rate, position: p });
    } catch (e) {}
  }

  function refresh(force) {
    if (ytMode()) {
      /* YouTube: keine eigenen Handler/Metadaten erzwingen */
      return;
    }
    meta(!!force);
    state();
    pos();
  }

  function doToggle() {
    try {
      if (typeof togglePlay === "function") togglePlay();
    } catch (e) {}
    setTimeout(function () {
      refresh(false);
    }, 250);
  }

  function seekBy(delta) {
    if (ytMode()) return;
    var a = audioEl();
    if (!a || !a.src) return;
    var t = Math.max(0, Math.min((a.duration || 1e9) - 0.05, (a.currentTime || 0) + delta));
    try {
      a.currentTime = t;
    } catch (e) {}
    pos();
    state();
  }

  function seekTo(t) {
    if (ytMode()) return;
    var a = audioEl();
    if (!a || !a.src || typeof t !== "number" || !isFinite(t)) return;
    t = Math.max(0, Math.min(a.duration || t, t));
    try {
      if (a.fastSeek) a.fastSeek(t);
      else a.currentTime = t;
    } catch (e) {
      try {
        a.currentTime = t;
      } catch (e2) {}
    }
    pos();
  }

  function prevTrack() {
    try {
      if (window.bppPrayerNav && typeof window.bppPrayerNav.prev === "function") window.bppPrayerNav.prev();
      else if (typeof prevSong === "function") prevSong();
    } catch (e) {}
    setTimeout(function () {
      refresh(true);
    }, 500);
  }

  function nextTrack() {
    try {
      if (window.bppPrayerNav && typeof window.bppPrayerNav.next === "function") window.bppPrayerNav.next();
      else if (typeof nextSong === "function") nextSong();
    } catch (e) {}
    setTimeout(function () {
      refresh(true);
    }, 500);
  }

  function installHandlers() {
    if (ytMode()) {
      clearHandlers();
      return;
    }
    setH("play", function () {
      if (!isMp3Playing()) doToggle();
      else refresh(false);
    });
    setH("pause", function () {
      if (isMp3Playing()) doToggle();
      else refresh(false);
    });
    setH("stop", function () {
      if (isMp3Playing()) doToggle();
    });
    setH("previoustrack", prevTrack);
    setH("nexttrack", nextTrack);
    setH("seekbackward", function (d) {
      var o = (d && d.seekOffset) || SEEK;
      seekBy(-o);
    });
    setH("seekforward", function (d) {
      var o = (d && d.seekOffset) || SEEK;
      seekBy(o);
    });
    setH("seekto", function (d) {
      if (!d || typeof d.seekTime !== "number") return;
      seekTo(d.seekTime);
    });
  }

  function hookAudio() {
    var a = audioEl();
    if (!a || a.__bpp468) return;
    a.__bpp468 = 1;
    ["play", "playing"].forEach(function (ev) {
      a.addEventListener(ev, function () {
        installHandlers();
        refresh(true);
      });
    });
    ["pause", "ended", "emptied"].forEach(function (ev) {
      a.addEventListener(ev, function () {
        refresh(false);
      });
    });
    ["loadedmetadata", "durationchange", "ratechange", "seeked"].forEach(function (ev) {
      a.addEventListener(ev, function () {
        refresh(ev === "loadedmetadata");
      });
    });
    a.addEventListener("timeupdate", function () {
      var n = Date.now();
      if (n - lastPosAt > 1000) {
        lastPosAt = n;
        pos();
        state();
      }
    });
  }

  function wrapPlay() {
    if (typeof window.play !== "function" || window.play.__bpp468) return;
    var p0 = window.play;
    window.play = function () {
      var r = p0.apply(this, arguments);
      setTimeout(function () {
        installHandlers();
        refresh(true);
      }, 60);
      setTimeout(function () {
        refresh(true);
      }, 800);
      return r;
    };
    window.play.__bpp468 = 1;
  }

  function init() {
    buildArt();
    hookAudio();
    installHandlers();
    wrapPlay();
    refresh(true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  window.addEventListener("load", function () {
    wrapPlay();
    hookAudio();
    installHandlers();
    refresh(true);
  });
  setTimeout(function () {
    wrapPlay();
    hookAudio();
    installHandlers();
    refresh(true);
  }, 1200);

  /* regelmäßig Position/State + Handler behaupten (gegen späte v205-Hooks) */
  setInterval(function () {
    if (ytMode()) return;
    installHandlers();
    /* Meta immer gegen v201/v205 behaupten */
    meta(false);
    if (isMp3Playing() || hasMp3Src()) { state(); pos(); }
  }, 1000);

  /* Test-/Debug-API für Playwright */
  window.bppMS468 = {
    ok: true,
    seekDefault: SEEK,
    handlers: handlers,
    refresh: refresh,
    install: installHandlers,
    meta: function () {
      return ms.metadata
        ? {
            title: ms.metadata.title,
            artist: ms.metadata.artist,
            album: ms.metadata.album,
            artwork: ms.metadata.artwork ? ms.metadata.artwork.length : 0
          }
        : null;
    },
    state: function () {
      return ms.playbackState;
    },
    invoke: function (name, detail) {
      var f = handlers[name];
      if (typeof f === "function") {
        f(detail || {});
        return true;
      }
      return false;
    },
    artistOf: artistOf,
    titleOf: titleOf
  };
})();
