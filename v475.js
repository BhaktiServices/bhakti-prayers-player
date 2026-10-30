/* [Grok-Bot] V4.75: Fusszeilen-Reihenfolge (alleinige Positionsquelle, Nachfolger von v463).
   Offline (#bppOffBar466) → Statistik-Knopf (#bppStats457) → Trennstrich →
   Worldwide-Statistik (#bppStatsBox457) → Trennstrich → Historie/Quellen/Support (#bppFoot426).
   Bei ausgeblendeter Statistik bleibt der zweite Trennstrich + die drei Buttons darunter.
   Host = document.body (wie V4.74) – niemals in #foot (display:none) oder Kaempfe mit v463.
   v463-Tick und v457-Foot-Append greifen nicht, solange bppFootOrder475 gesetzt ist. */
window.BPP_BUILD = "4.75";
window.BPP_SHOW = "4.75";

(function () {
  if (window.bppV475) return;
  window.bppV475 = 1;
  window.bppFootOrder475 = 1;
  window.bppFootOrder463 = 1; /* v421 bppRow: nicht umhaengen */

  function kids(p) {
    return p ? [].slice.call(p.children) : [];
  }
  function orderWrong(parent, ids) {
    if (!parent) return false;
    var nodes = [],
      i,
      el;
    for (i = 0; i < ids.length; i++) {
      el = document.getElementById(ids[i]);
      if (el) nodes.push(el);
    }
    if (nodes.length < 2) return false;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].parentNode !== parent) return true;
    }
    for (i = 0; i < nodes.length - 1; i++) {
      if (nodes[i].nextElementSibling !== nodes[i + 1]) {
        var k = kids(parent);
        var idxs = nodes.map(function (n) {
          return k.indexOf(n);
        });
        for (var j = 1; j < idxs.length; j++) if (idxs[j] < 0 || idxs[j] < idxs[j - 1]) return true;
        return false;
      }
    }
    return false;
  }
  function placeSeq(parent, ids) {
    if (!parent) return;
    var nodes = [],
      i,
      el;
    for (i = 0; i < ids.length; i++) {
      el = document.getElementById(ids[i]);
      if (el) nodes.push(el);
    }
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].parentNode !== parent || (i && nodes[i - 1].nextElementSibling !== nodes[i])) {
        parent.appendChild(nodes[i]);
      }
    }
  }

  /* Host = body. #foot ist display:none (v305/tr-hi) – dort darf nichts landen. */
  function hostEl() {
    return document.body;
  }
  function badHost(el) {
    if (!el || !el.parentNode) return true;
    var p = el.parentNode;
    if (p === document.body) return false;
    /* #foot oder darin = falsch */
    if (p.id === "foot") return true;
    if (p.id === "bppSrcEnd") return true;
    return true; /* alles andere ausser body: zurueck auf body */
  }

  function ensureBar() {
    var bar = document.getElementById("bppOffBar466");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "bppOffBar466";
    }
    if (badHost(bar)) hostEl().appendChild(bar);
    return bar;
  }
  function ensureBox() {
    var box = document.getElementById("bppStatsBox457");
    var s = document.getElementById("bpp-stats");
    if (!box && s) {
      box = document.createElement("div");
      box.id = "bppStatsBox457";
      if (s.parentNode) s.parentNode.insertBefore(box, s);
    }
    return box;
  }
  function ensureFoot() {
    var foot = document.getElementById("bppFoot426");
    if (!foot) {
      foot = document.createElement("div");
      foot.id = "bppFoot426";
    }
    if (badHost(foot)) hostEl().appendChild(foot);
    return foot;
  }
  function ensureBtn() {
    /* Knopf wird von v457 erzeugt; falls Waise/fehlt: Platzhalter-Slot fuer Kette
       (v457 fuellt Text/Handler nach). Hier nur DOM-Verankerung. */
    return document.getElementById("bppStats457");
  }

  function chainWrong() {
    var bar = document.getElementById("bppOffBar466");
    var btn = document.getElementById("bppStats457");
    var box = document.getElementById("bppStatsBox457");
    var foot = document.getElementById("bppFoot426");
    if (!bar || !foot) return false;
    if (badHost(bar) || badHost(foot)) return true;
    if (btn && badHost(btn)) return true;
    if (box && badHost(box)) return true;
    var seq = [bar];
    if (btn) seq.push(btn);
    if (box) seq.push(box);
    seq.push(foot);
    var i;
    for (i = 0; i < seq.length; i++) {
      if (seq[i].parentNode !== bar.parentNode) return true;
    }
    for (i = 0; i < seq.length - 1; i++) {
      if (seq[i].nextElementSibling !== seq[i + 1]) return true;
    }
    return false;
  }

  function needed() {
    var bar = document.getElementById("bppOffBar466");
    var off = document.getElementById("bppOff");
    var foot = document.getElementById("bppFoot426");
    var box = document.getElementById("bppStatsBox457");
    var btn = document.getElementById("bppStats457");
    var dl = document.getElementById("btnOffAll"),
      inst = document.getElementById("btnInstall");
    if (dl && off && dl.parentNode === off) return true;
    if (inst && off && inst.parentNode === off) return true;
    if (bar && orderWrong(bar, ["bppOff", "btnOffAll", "btnInstall"])) return true;
    if (!bar && (dl || inst || off)) return true;
    if (foot && orderWrong(foot, ["bppHist421", "btnDet", "bppWishBtn447"])) return true;
    if (btn && foot && btn.parentNode === foot) return true;
    if (box && orderWrong(box, ["bpp-stats", "bpp-orte24", "bppAbc443"])) return true;
    if (btn && box && btn.parentNode === box) return true;
    if (bar && badHost(bar)) return true;
    if (foot && badHost(foot)) return true;
    if (btn && badHost(btn)) return true;
    if (box && badHost(box)) return true;
    if (chainWrong()) return true;
    return false;
  }

  function placeChain() {
    var host = hostEl();
    var bar = ensureBar();
    var foot = ensureFoot();
    var box = ensureBox();
    var btn = ensureBtn();

    /* Alles auf body, Reihenfolge bar → btn → box → foot */
    if (bar.parentNode !== host) host.appendChild(bar);
    if (btn) {
      if (btn.parentNode !== host || bar.nextElementSibling !== btn) host.insertBefore(btn, bar.nextSibling);
    }
    var afterBtn = btn || bar;
    if (box) {
      if (box.parentNode !== host || afterBtn.nextElementSibling !== box) host.insertBefore(box, afterBtn.nextSibling);
    }
    var afterBox = box || btn || bar;
    if (foot.parentNode !== host || afterBox.nextElementSibling !== foot) host.insertBefore(foot, afterBox.nextSibling);

    /* Feinschliff direkte Nachbarn */
    if (btn && bar.nextElementSibling !== btn) host.insertBefore(btn, bar.nextSibling);
    if (box && btn && btn.nextElementSibling !== box) host.insertBefore(box, btn.nextSibling);
    if (box && !btn && bar.nextElementSibling !== box) host.insertBefore(box, bar.nextSibling);
    if (box && box.nextElementSibling !== foot) host.insertBefore(foot, box.nextSibling);
    if (!box && btn && btn.nextElementSibling !== foot) host.insertBefore(foot, btn.nextSibling);
    if (!box && !btn && bar.nextElementSibling !== foot) host.insertBefore(foot, bar.nextSibling);
  }

  function apply() {
    if (!needed()) return false;
    var bar = ensureBar();
    var foot = ensureFoot();
    var box = ensureBox();
    placeSeq(bar, ["bppOff", "btnOffAll", "btnInstall"]);
    placeSeq(foot, ["bppHist421", "btnDet", "bppWishBtn447"]);
    if (box) placeSeq(box, ["bpp-stats", "bpp-orte24", "bppAbc443"]);
    placeChain();
    return true;
  }

  var st = document.createElement("style");
  st.id = "bppSt475";
  st.textContent =
    "#bppOffBar466{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:4px 0 0;width:100%}" +
    "#bppOffBar466 #bppOff{order:1}#bppOffBar466 #btnOffAll{order:2}#bppOffBar466 #btnInstall{order:3}" +
    "#bppOffBar466 #btnOffAll,#bppOffBar466 #btnInstall{pointer-events:auto!important}" +
    /* Statistik-Knopf eigene Zeile unter Offline */
    "#bppStats457{display:inline-flex!important;align-items:center;gap:4px;margin:6px 0 0 0!important;" +
    "font-size:.72rem;line-height:1.4;cursor:pointer;order:unset!important}" +
    /* Worldwide-Box: Trennstrich oben (wie bisher v457) */
    "#bppStatsBox457{display:block;width:100%;box-sizing:border-box;" +
    "border-top:1px solid rgba(176,144,96,.38);margin-top:6px;padding-top:6px}" +
    "#bppStatsBox457 #bpp-stats{order:1}#bppStatsBox457 #bpp-orte24{order:2}" +
    "#bppStatsBox457 #bppAbc443{order:3;margin:2px 12px 0 0!important}" +
    /* Historie/Quellen/Support: unter Statistik, eigener Trennstrich (auch wenn Statistik aus) */
    "#bppFoot426{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;width:100%;box-sizing:border-box;" +
    "border-top:1px solid rgba(176,144,96,.38);margin-top:6px;padding-top:6px;margin-bottom:0}" +
    "#bppFoot426 #bppHist421{order:1}#bppFoot426 #btnDet{order:2}" +
    "#bppFoot426 #bppWishBtn447{order:3}" +
    "#bppFoot426 #bppSrcInfo{order:9;flex:1 1 100%}" +
    "#bppFoot426 #bppStats457{display:none!important}"; /* falls doch im Fuss: verstecken */
  document.head.appendChild(st);

  function tick() {
    try {
      apply();
    } catch (e) {}
  }
  setInterval(tick, 200);
  window.addEventListener("load", tick);
  tick();
})();
