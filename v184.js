/* [Grok-Bot] V1.84: Zusatz zu v183.js (wird danach geladen).
   - Voriges/naechstes Prayer im Vollbild immer sichtbar: eigene Tasten unten links/rechts, solange die Leiste ausgeblendet ist
     (bei sichtbarer Leiste stehen dieselben Tasten oben in der Leiste). Reihenfolge und Ende-Verhalten wie V1.83:
     aktive Liste, ohne Ton uebersprungen, am Anfang/Ende deaktiviert, Umlauf nur bei 🔁 (ganze Liste).
   - Grosse Sprungtasten -30 s / +30 s (MP3 und YouTube, Mitlesen springt mit, ueber window.bppSkip aus tr-hi.js):
     im normalen Player neben -10/+10, im Vollbild als eigene Zeile in der Leiste und dauerhaft unten (mit voriges/naechstes Prayer).
   - Govinda: MP3 = CD "Morning Prayers" Track 11 (gleiche Melodie/Fassung wie das YouTube-Video, aber andere Aufnahme).
     YouTube bleibt Standard; MP3 ueber ♪ und als Ersatz, wenn YouTube nicht laedt. */
window.BPP_BUILD="1.84";
(function(){
  if(typeof PRAYERS==="undefined" || window.bppV184) return; window.bppV184=1;
  var g=PRAYERS.find(function(p){ return p.id==="govinda"; });
  if(g){
    g.audio="audio/govinda.mp3";
    g.youtube="3tMcSlnV_rc"; g.youtubeStart=5;
    /* preferFile bleibt wie in tr-hi.js: Nutzerwahl (♪/YT) und YouTube-Ausfall gelten weiter */
    g.audioAlt=["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/audio/govinda.mp3",
      "https://www.dropbox.com/scl/fo/9jrivp0fkl4bfo9t0dejx/ALRtqWJM1YcKX8RHhDN0ijg/Govindam-Prayer-CD.mp3?rlkey=s8lox2d2652b2i133h1jjty3k&dl=1"];
    g.quelle="YouTube: Govindam Prayer (Bhakti Marga Music) \u00b7 MP3: CD Morning Prayers Track 11 (gleiche Melodie, andere Aufnahme) \u00b7 \u00dcbersetzung: Prathana SVD S. 22\u201325";
    g.hinweis=g.hinweisDe="Standard ist YouTube. Die MP3 ist die CD-Fassung derselben Melodie (nicht dieselbe Aufnahme); umschalten mit \u266a / YT.";
    g.hinweisEn="YouTube is the default. The MP3 is the CD version of the same melody (not the same recording); switch with \u266a / YT.";
    /* Zeitmarken der CD: YouTube-Marken per Ausrichtung (Chroma/Lautstaerke, DTW) auf die CD uebertragen, ca. +-1 s */
    g.marksFile=[null,43.7,null,null,123.2,150.5,null,null,null,251.0,275.7,null,null,null,null,404.0,430.5,456.0,481.2,507.5,533.2,558.3,584.4,610.2,null,null,687.5,713.2,742.5];
  }
  var css=document.createElement("style");
  css.textContent="#bppFsSide{position:absolute;left:0;right:0;bottom:14px;display:flex;justify-content:space-between;pointer-events:none;padding:0 6px;z-index:2}"+
    "#bppFsSide button{pointer-events:auto;display:flex;align-items:center;gap:6px;font-size:18px;min-width:48px;min-height:48px;border:0;border-radius:12px;background:rgba(62,58,51,.88);color:#fff;padding:0 12px;cursor:pointer;overflow:hidden;font-family:inherit}"+
    "#bppFsSide button:disabled{opacity:.28;cursor:default}#bppFsSide button i{font-style:normal;flex:none}"+
    "#bppFsSide button span{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}"+
    "#bppFsSide .mid{display:flex;gap:6px;pointer-events:none}#bppFsSide button.j{max-width:none;padding:0 8px;font-size:15px;justify-content:center;background:rgba(90,81,70,.9)}"+
    "#bppFsSide button.pn{flex:1 1 0;max-width:30vw}#bppFsSide{gap:6px}"+
    "#bppFsBar:not(.hid)~#bppFsSide{visibility:hidden}#bppFs #bppFsStage{bottom:max(4vh,68px)}"+
    "#bppFsBar button.j30{font-size:15px;min-width:64px}"+
    ".bppPn{min-width:2.6em}";
  document.head.appendChild(css);
  var L={de:["Voriges Prayer","N\u00e4chstes Prayer"],en:["Previous prayer","Next prayer"],fr:["Pri\u00e8re pr\u00e9c\u00e9dente","Pri\u00e8re suivante"],
    es:["Oraci\u00f3n anterior","Oraci\u00f3n siguiente"],ru:["\u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0430\u044f \u043c\u043e\u043b\u0438\u0442\u0432\u0430","\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f \u043c\u043e\u043b\u0438\u0442\u0432\u0430"],
    hi:["\u092a\u093f\u091b\u0932\u0940 \u092a\u094d\u0930\u093e\u0930\u094d\u0925\u0928\u093e","\u0905\u0917\u0932\u0940 \u092a\u094d\u0930\u093e\u0930\u094d\u0925\u0928\u093e"],pt:["Oração anterior","Próxima oração"],cz:["Předchozí modlitba","Další modlitba"]};
  function T(k){ var l=(typeof lang!=="undefined" && L[lang])?L[lang]:L.en; return l[k]; }
  function esc(s){ return String(s).replace(/[&<>]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }
  function skip(d){ try{ if(typeof window.bppSkip==="function") window.bppSkip(d); }catch(e){} }
  function T30(k){ var de=(typeof lang!=="undefined" && lang==="de"); return k<0?(de?"30 Sekunden zur\u00fcck":"30 seconds back"):(de?"30 Sekunden vor":"30 seconds forward"); }
  function mainBtns(){
    var bk=document.getElementById("btnBack10"), fw=document.getElementById("btnFwd10"); if(!bk || !fw || document.getElementById("btnBack30")) return;
    function mk(id, txt, d){ var b=document.createElement("button"); b.type="button"; b.id=id; b.textContent=txt; b.title=T30(d); b.style.fontSize=".78rem"; b.style.padding="2px 7px"; b.onclick=function(){ skip(d); }; return b; }
    var b30=mk("btnBack30","\u221230 s",-30), f30=mk("btnFwd30","+30 s",30);
    /* -30 -10 +10 +30 als Gruppe, die nur als Ganzes in die naechste Zeile umbricht */
    var grp=document.createElement("span"); grp.className="bppJmp"; grp.style.cssText="display:inline-flex;flex-wrap:nowrap;gap:inherit;align-items:center";
    bk.parentNode.insertBefore(grp, bk); grp.appendChild(b30); grp.appendChild(bk); grp.appendChild(fw); grp.appendChild(f30);
  }
  document.addEventListener("DOMContentLoaded", function(){ mainBtns(); setTimeout(mainBtns, 800); });
  var side=null, sP=null, sN=null;
  function mk(){
    var ov=document.getElementById("bppFs"), bar=document.getElementById("bppFsBar"); if(!ov || !bar || side) return;
    side=document.createElement("div"); side.id="bppFsSide";
    side.innerHTML="<button type='button' id='bppFsSidePrev' class='pn'></button><span class='mid'><button type='button' class='j' id='bppFsSideB30'>\u221230</button><button type='button' class='j' id='bppFsSideF30'>+30</button></span><button type='button' id='bppFsSideNext' class='pn'></button>";
    bar.parentNode.insertBefore(side, bar.nextSibling);
    sP=side.querySelector("#bppFsSidePrev"); sN=side.querySelector("#bppFsSideNext");
    var jump=function(d){ return function(e){ e.stopPropagation(); skip(d); }; };
    side.querySelector("#bppFsSideB30").onclick=jump(-30); side.querySelector("#bppFsSideF30").onclick=jump(30);
    /* in der Leiste: eigene Zeile -30 s / +30 s unter voriges/naechstes Prayer */
    var r0=bar.querySelector(".row"); if(r0 && !document.getElementById("bppFsB30")){
      var r=document.createElement("div"); r.className="row";
      [["bppFsB30","\u221230 s",-30],["bppFsF30","+30 s",30]].forEach(function(x){ var b=document.createElement("button"); b.type="button"; b.id=x[0]; b.className="j30"; b.textContent=x[1];
        b.onclick=function(e){ e.stopPropagation(); skip(x[2]); var m=document.getElementById("bppFsBar"); if(m) m.classList.remove("hid"); }; r.appendChild(b); });
      r0.parentNode.insertBefore(r, r0.nextSibling);
    }
    var nav=function(d){ return function(e){ e.stopPropagation(); var n=window.bppPrayerNav; if(n) (d<0?n.prev:n.next)(); setTimeout(sync, 300); }; };
    sP.onclick=nav(-1); sN.onclick=nav(1);
    /* Tippen auf die Tasten nicht als Tippen/Doppeltippen/Wischen des Vollbilds werten */
    ["touchstart","touchend","dblclick"].forEach(function(ev){ side.addEventListener(ev, function(e){ e.stopPropagation(); }, {passive:true}); });
    sync();
  }
  function sync(){
    if(!side || !window.bppPrayerNav) return;
    var nv=window.bppPrayerNav, w=(nv.rep()===2), np=nv.neighbor(-1, w), nn=nv.neighbor(1, w);
    [[sP,np,0],[sN,nn,1]].forEach(function(x){ var b=x[0], nb=x[1], nm=nb?String(PRAYERS[nb.idx].titel||""):"";
      b.disabled=!nb; var t=T(x[2])+(nb?": "+nm:""); if(b.title!==t){ b.title=t; b.setAttribute("aria-label", t); }
      var k=nm+"|"+x[2]; if(b.getAttribute("data-k")!==k){ b.setAttribute("data-k", k); b.innerHTML=x[2]?"<span>"+esc(nm)+"</span><i>\u23ed\ufe0e</i>":"<i>\u23ee\ufe0e</i><span>"+esc(nm)+"</span>"; } });
  }
  setInterval(function(){ if(!side) mk(); var ov=document.getElementById("bppFs"); if(ov && ov.classList.contains("on")) sync(); }, 400);
})();
