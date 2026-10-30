/* [Grok-Bot] V4.74: Atma-Bhog-Springen beheben.
   Ursache: v343.js (alle 500 ms) hängt #bppAtma zurück in header h1; v472.js (alle 200 ms)
   zieht ihn in #bppTopRight460; v382.js setzt dann absolute top/right und h1.paddingBottom.
   Folge: Parent wechselt H1 ↔ bppTopRight460, Position springt, Titelzeilen rutschen.
   Fix: #bppAtma nur noch hier positionieren; appendChild/insertBefore/removeChild für
   #bppAtma blockieren (außer Ziel = Home-Spalte); rechte Spalte fixed Breite/Mindesthöhe;
   Titel-padding fest (kein Nachmessen); v382-paddingBottom neutralisieren. */
window.BPP_BUILD = "4.74";
window.BPP_SHOW = "4.74";

(function () {
  if (window.bppV474) return;
  window.bppV474 = 1;
  window.bppAtmaOwner = "474";

  var ATMA_HTML = "<span class='bppAtmaL1'>Atma</span><span class='bppAtmaL2'>Bhog ↗</span>";
  var HOME_ID = "bppTopRight460";
  var LOCK_W = 72; /* px feste Breite rechte Spalte */
  var LOCK_H = 100; /* px Mindesthöhe: Sprache + Stil + Atma zweizeilig */
  var PAD_R = 88; /* px fester Titel-Einzug rechts */
  var PAD_L = 56; /* px fester Titel-Einzug links (Hilfe/Support) */

  var st = document.createElement("style");
  st.id = "bppSt474";
  st.textContent =
    /* Rechte Spalte: absolut, feste Maße – kein Einfluss auf Zeilenumbruch des Titels */
    "#" + HOME_ID + "{position:fixed!important;top:8px!important;right:8px!important;z-index:120!important;" +
      "display:flex!important;flex-direction:column!important;align-items:flex-end!important;" +
      "justify-content:flex-start!important;gap:4px!important;" +
      "width:" + LOCK_W + "px!important;min-width:" + LOCK_W + "px!important;max-width:" + LOCK_W + "px!important;" +
      "min-height:" + LOCK_H + "px!important;height:auto!important;box-sizing:border-box!important;" +
      "pointer-events:none!important;overflow:visible!important}" +
    "#" + HOME_ID + ">*{pointer-events:auto!important}" +
    "#" + HOME_ID + " .lang.l307,#" + HOME_ID + " .lang{order:0!important;position:static!important;" +
      "margin:0!important;transform:none!important;align-self:flex-end!important}" +
    "#" + HOME_ID + " #bppTheme{order:1!important;position:static!important;margin:0!important;" +
      "align-self:flex-end!important;flex:0 0 auto!important}" +
    /* Atma: feste Zwei-Zeilen-Box, nur in der rechten Spalte */
    "#" + HOME_ID + " #bppAtma,#bppAtma{order:2!important;position:static!important;" +
      "top:auto!important;right:auto!important;left:auto!important;transform:none!important;" +
      "margin:0!important;display:inline-flex!important;flex-direction:column!important;" +
      "align-items:flex-end!important;justify-content:center!important;align-self:flex-end!important;" +
      "box-sizing:border-box!important;width:64px!important;min-width:64px!important;" +
      "height:34px!important;min-height:34px!important;max-height:34px!important;" +
      "padding:2px 8px!important;border:1px solid #D6BF90!important;border-radius:10px!important;" +
      "background:#041236!important;color:#D6BF90!important;" +
      "font:600 .62rem/1.15 Figtree,'Source Sans 3',sans-serif!important;" +
      "letter-spacing:.05em;text-transform:uppercase;text-decoration:none!important;" +
      "white-space:normal!important;z-index:120;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
    "#bppAtma:hover,#bppAtma:focus-visible{background:#D6BF90!important;color:#041236!important;outline:none}" +
    "#bppAtma .bppAtmaL1,#bppAtma .bppAtmaL2{display:block;line-height:1.15;height:auto}" +
    "#bppAtma svg{display:none!important}" +
    /* Titel: feste Einzüge, kein paddingBottom von v382 */
    "header h1{position:relative!important;padding-right:" + PAD_R + "px!important;" +
      "padding-left:var(--bpp-hl472,var(--bpp-hl461," + PAD_L + "px))!important;" +
      "padding-bottom:0!important;box-sizing:border-box!important}" +
    "header h1 #bppAtma{display:none!important}" + /* falls doch in h1: unsichtbar, kein Layout */
    "@media(max-width:400px){#" + HOME_ID + "{top:6px!important;right:6px!important;width:68px!important;" +
      "min-width:68px!important;max-width:68px!important;min-height:96px!important}" +
      "#bppAtma{width:60px!important;min-width:60px!important;font-size:.58rem!important;padding:2px 6px!important}" +
      "header h1{padding-right:78px!important}}";
  document.head.appendChild(st);

  /* DOM-Züge von #bppAtma durch fremde Module unterbinden */
  function isAtma(n) {
    return !!(n && n.nodeType === 1 && n.id === "bppAtma");
  }
  function home() {
    return document.getElementById(HOME_ID);
  }
  function allowedParent(parent) {
    var h = home();
    return !!(h && parent === h);
  }

  if (!Node.prototype.__bpp474AtmaGate) {
    Node.prototype.__bpp474AtmaGate = 1;
    var _append = Node.prototype.appendChild;
    var _insert = Node.prototype.insertBefore;
    var _remove = Node.prototype.removeChild;
    Node.prototype.appendChild = function (child) {
      if (window.bppAtmaOwner === "474" && isAtma(child) && !allowedParent(this)) {
        return child;
      }
      return _append.call(this, child);
    };
    Node.prototype.insertBefore = function (child, ref) {
      if (window.bppAtmaOwner === "474" && isAtma(child) && !allowedParent(this)) {
        return child;
      }
      return _insert.call(this, child, ref);
    };
    Node.prototype.removeChild = function (child) {
      if (window.bppAtmaOwner === "474" && isAtma(child) && this === home()) {
        /* nicht aus der Home-Spalte entfernen lassen (v343-Move) */
        return child;
      }
      return _remove.call(this, child);
    };
  }

  function ensureAtma() {
    var a = document.getElementById("bppAtma");
    if (!a) {
      a = document.createElement("a");
      a.id = "bppAtma";
      a.href = "https://www.atmabhog.org";
      a.target = "_blank";
      a.rel = "noopener";
      ["click", "pointerdown", "touchstart"].forEach(function (ev) {
        a.addEventListener(
          ev,
          function (e) {
            e.stopPropagation();
          },
          { passive: true }
        );
      });
    }
    if (a.innerHTML !== ATMA_HTML) a.innerHTML = ATMA_HTML;
    /* Inline-Reste von v382/v343 löschen */
    a.style.top = "";
    a.style.right = "";
    a.style.left = "";
    a.style.position = "";
    a.style.paddingBottom = "";
    return a;
  }

  function ensureWrap() {
    var wrap = document.getElementById(HOME_ID);
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = HOME_ID;
      (document.body || document.documentElement).appendChild(wrap);
    }
    return wrap;
  }

  function clearH1AtmaEffects() {
    var h = document.querySelector("header h1");
    if (!h) return;
    if (h.style.paddingBottom && h.style.paddingBottom !== "0px") h.style.paddingBottom = "0px";
    /* feste CSS-Vars – kein Nachmessen → kein Springen */
    document.documentElement.style.setProperty("--bpp-tr460", PAD_R + "px");
    document.documentElement.style.setProperty("--bpp-tr472", PAD_R + "px");
  }

  function paint() {
    var wrap = ensureWrap();
    var theme = document.getElementById("bppTheme");
    var langBox =
      document.querySelector("#" + HOME_ID + " .lang") ||
      document.querySelector("header .lang") ||
      document.querySelector(".lang.l307");
    var a = ensureAtma();

    if (langBox && langBox.parentNode !== wrap) {
      wrap.insertBefore(langBox, wrap.firstChild);
    }
    if (theme) {
      if (theme.parentNode !== wrap) wrap.appendChild(theme);
      /* DOM: Atma vor Stil (v460 last=theme); optisch order 2 darunter */
      if (a.parentNode !== wrap || a.nextElementSibling !== theme) {
        wrap.insertBefore(a, theme);
      }
      if (wrap.lastElementChild !== theme) wrap.appendChild(theme);
    } else if (a.parentNode !== wrap) {
      wrap.appendChild(a);
    }

    clearH1AtmaEffects();
  }

  setInterval(function () {
    try {
      paint();
    } catch (e) {}
  }, 250);
  window.addEventListener("load", function () {
    try {
      paint();
    } catch (e) {}
  });
  try {
    paint();
  } catch (e) {}

  window.bppAtma474 = {
    ok: true,
    cause:
      "v343 hängt Atma alle 500ms in header h1; v472 zieht ihn alle 200ms nach #bppTopRight460; v382 setzt paddingBottom – Zeilen springen.",
    home: HOME_ID
  };
})();
