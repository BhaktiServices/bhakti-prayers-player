/* [Grok-Bot] V4.73: Android Chrome Media-Steuerleiste (Runterwischen).
   Ursache: Kein WebAudio-Problem – Wiedergabe läuft über echtes <audio id="a">.
   Aber v201 setzt bei jedem play SVG-only-Artwork; v205 kann leeres/data-URL-Artwork
   schreiben; v468 mischt SVG in die Artwork-Liste. Android Chrome zeigt die
   Media-Notification zuverlässig nur mit image/png (oder jpeg) über http(s), nicht
   mit image/svg+xml. Leeres Artwork kann die Leiste verwerfen.
   Fix: MediaMetadata-Setter abfangen – SVG/data:image/svg streichen, nie leeres
   Artwork durchlassen; nur absolute PNG-URLs; bei play unmute + Meta/State erzwingen.
   YT-Modus: Host kann keine eigene Session setzen (Cross-Origin-iframe) – unverändert. */
window.BPP_BUILD = "4.73";
window.BPP_SHOW = "4.73";

(function () {
  if (window.bppV473) return;
  window.bppV473 = 1;
  if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") {
    window.bppMS473 = { ok: false, reason: "no-mediaSession" };
    return;
  }

  var ms = navigator.mediaSession;
  var ART = [];
  var wrapped = false;

  function abs(u) {
    try {
      return new URL(u, location.href).href;
    } catch (e) {
      return u;
    }
  }

  function buildArt() {
    /* Nur PNG über http(s) – kein SVG, keine data:-URLs (Android) */
    ART = [
      { src: abs("icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: abs("icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: abs("apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
      { src: abs("icon-maskable-192.png"), sizes: "192x192", type: "image/png" },
      { src: abs("icon-maskable-512.png"), sizes: "512x512", type: "image/png" }
    ];
  }

  function isSvgArt(a) {
    if (!a) return true;
    var t = String(a.type || "");
    var s = String(a.src || "");
    return /svg/i.test(t) || /\.svg(\?|#|$)/i.test(s) || /^data:image\/svg/i.test(s);
  }

  function isDataUrl(a) {
    return !!(a && /^data:/i.test(String(a.src || "")));
  }

  function sanitizeArtwork(list) {
    var out = [];
    try {
      var raw = list ? Array.prototype.slice.call(list) : [];
      for (var i = 0; i < raw.length; i++) {
        var a = raw[i];
        if (!a || isSvgArt(a) || isDataUrl(a)) continue;
        if (!/^https?:/i.test(String(a.src || ""))) continue;
        out.push({
          src: String(a.src),
          sizes: a.sizes || "512x512",
          type: a.type || "image/png"
        });
      }
    } catch (e) {}
    if (!out.length) out = ART.slice();
    return out;
  }

  function ytMode() {
    return typeof ytOn !== "undefined" && ytOn;
  }

  function audioEl() {
    try {
      if (typeof a !== "undefined" && a) return a;
    } catch (e) {}
    return document.getElementById("a");
  }

  function curPrayer() {
    try {
      return typeof i !== "undefined" && i >= 0 && PRAYERS ? PRAYERS[i] : null;
    } catch (e) {
      return null;
    }
  }

  function titleOf(P) {
    if (!P) return "Bhakti Prayers Player";
    return String(P.titel || P.id || "Bhakti Prayers Player");
  }

  function artistOf(P) {
    try {
      if (window.bppMS468 && typeof window.bppMS468.artistOf === "function") {
        return window.bppMS468.artistOf(P);
      }
    } catch (e) {}
    if (P && P.autor) {
      var who = String(P.autor).split("\u00b7")[0].trim();
      if (who) return who;
    }
    return "Bhakti Prayers Player";
  }

  function ensureAudible(el) {
    if (!el) return;
    try {
      if (el.muted) el.muted = false;
    } catch (e) {}
    try {
      /* Mobil: Systemlautstärke; nur anheben wenn exakt 0 */
      if (typeof el.volume === "number" && el.volume === 0) el.volume = 1;
    } catch (e2) {}
  }

  function forceOurMeta() {
    if (ytMode()) return;
    var P = curPrayer();
    try {
      ms.metadata = new MediaMetadata({
        title: titleOf(P),
        artist: artistOf(P),
        album: "Bhakti Prayers Player",
        artwork: ART.slice()
      });
    } catch (e) {}
    try {
      var el = audioEl();
      if (el && el.src && !el.paused && !el.ended) ms.playbackState = "playing";
      else if (el && el.src) ms.playbackState = "paused";
    } catch (e2) {}
    try {
      if (ms.setPositionState) {
        var el2 = audioEl();
        if (el2 && isFinite(el2.duration) && el2.duration > 0) {
          var rate = el2.playbackRate > 0 ? el2.playbackRate : 1;
          var p = Math.max(0, Math.min(el2.currentTime || 0, el2.duration));
          ms.setPositionState({ duration: el2.duration, playbackRate: rate, position: p });
        }
      }
    } catch (e3) {}
  }

  function wrapMetadataSetter() {
    if (wrapped) return;
    var proto = Object.getPrototypeOf(ms);
    var desc = Object.getOwnPropertyDescriptor(proto, "metadata");
    if (!desc || typeof desc.set !== "function" || typeof desc.get !== "function") {
      window.bppMS473 = window.bppMS473 || { ok: true, wrap: false };
      return;
    }
    try {
      Object.defineProperty(ms, "metadata", {
        configurable: true,
        enumerable: true,
        get: function () {
          return desc.get.call(this);
        },
        set: function (m) {
          if (ytMode()) {
            /* YT: fremde/empty Meta nicht erzwingen – YouTube-iframe besitzt Session */
            try {
              desc.set.call(this, m);
            } catch (e) {}
            return;
          }
          try {
            if (m && typeof MediaMetadata !== "undefined") {
              var arts = sanitizeArtwork(m.artwork);
              m = new MediaMetadata({
                title: m.title || titleOf(curPrayer()),
                artist: m.artist || artistOf(curPrayer()),
                album: m.album || "Bhakti Prayers Player",
                artwork: arts
              });
            } else if (!m) {
              /* leeres Löschen während MP3 → unsere Meta behalten */
              var el = audioEl();
              if (el && el.src) {
                m = new MediaMetadata({
                  title: titleOf(curPrayer()),
                  artist: artistOf(curPrayer()),
                  album: "Bhakti Prayers Player",
                  artwork: ART.slice()
                });
              }
            }
          } catch (e2) {}
          try {
            desc.set.call(this, m);
          } catch (e3) {}
        }
      });
      wrapped = true;
    } catch (e) {
      wrapped = false;
    }
  }

  function onPlay() {
    if (ytMode()) return;
    var el = audioEl();
    ensureAudible(el);
    forceOurMeta();
    setTimeout(forceOurMeta, 0);
    setTimeout(forceOurMeta, 80);
    setTimeout(forceOurMeta, 400);
  }

  function hook() {
    var el = audioEl();
    if (!el || el.__bpp473) return;
    el.__bpp473 = 1;
    ["play", "playing"].forEach(function (ev) {
      el.addEventListener(ev, onPlay);
    });
    ["pause", "ended"].forEach(function (ev) {
      el.addEventListener(ev, function () {
        if (!ytMode()) forceOurMeta();
      });
    });
  }

  function wrapPlayFn() {
    if (typeof window.play !== "function" || window.play.__bpp473) return;
    var p0 = window.play;
    window.play = function () {
      var el = audioEl();
      ensureAudible(el);
      var r = p0.apply(this, arguments);
      onPlay();
      return r;
    };
    window.play.__bpp473 = 1;
  }

  function init() {
    buildArt();
    wrapMetadataSetter();
    hook();
    wrapPlayFn();
    if (!ytMode()) forceOurMeta();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  window.addEventListener("load", function () {
    wrapMetadataSetter();
    hook();
    wrapPlayFn();
    if (!ytMode()) forceOurMeta();
  });
  setTimeout(function () {
    wrapMetadataSetter();
    hook();
    wrapPlayFn();
    if (!ytMode()) forceOurMeta();
  }, 1300);

  /* Gegen späte v201/v205-Schreibvorgänge: wenn Artwork SVG/data enthält → neu setzen */
  setInterval(function () {
    if (ytMode()) return;
    try {
      var m = ms.metadata;
      var bad = false;
      if (!m || !m.artwork || !m.artwork.length) bad = true;
      else {
        for (var i = 0; i < m.artwork.length; i++) {
          if (isSvgArt(m.artwork[i]) || isDataUrl(m.artwork[i])) {
            bad = true;
            break;
          }
        }
      }
      if (bad) forceOurMeta();
    } catch (e) {}
  }, 800);

  window.bppMS473 = {
    ok: true,
    wrap: function () {
      return wrapped;
    },
    art: function () {
      return ART.slice();
    },
    force: forceOurMeta,
    cause:
      "Android Chrome Media-Notification braucht PNG-http(s)-Artwork; SVG (v201/v468) und leeres Artwork (v205) verhindern/verwerfen die Steuerleiste. Kein WebAudio. YT: iframe-Session."
  };
})();
