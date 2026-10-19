/* [Grok-Bot] V1.86: ersetzt v185.js (dessen Teile hier enthalten und korrigiert sind).
   Mitlesen:
   - Aṣṭotram: ein Name = eine Strophe (wie V1.85).
   - Geschaetzte Zeitmarken nur fuer die Quelle, die gerade spielt: MP3 → marksFile, YouTube → marksYt
     (V1.85 hat bei YouTube faelschlich marksFile mit der Videodauer geschaetzt). Gemessene Marken bleiben.
   - Gemerkte Strophen-Tipps (localStorage bpp-marks) gelten nur noch, wenn sie zu den Marken der Aufnahme passen.
     Ein alter Tipp (z. B. Strophe 2 bei Minute 5) hat vorher alle Marken dazwischen ausgehebelt; dann blieb
     Mitlesen minutenlang auf einer Strophe stehen (gesehen beim Kavaca Stotram mit 51 Strophen).
   Vollbild:
   - Keine Dauerleiste unten mehr. Tippen zeigt das Menue (blendet nach 3 s aus, am Prayer-Ende bleibt es):
     ⏮ voriges Prayer · 🔁 · naechstes Prayer ⏭ / ‹ Strophe · −10 · Play · +10 · Strophe › / −30 · +30 · ♯ · Aa · ✕ */
window.BPP_BUILD="1.86";
(function(){
  if(window.bppV186) return; window.bppV186=1;
  /* ---------- Mitlesen ---------- */
  function hookSG(){
    if(typeof window.stanzaGroups!=="function" || window.stanzaGroups._bpp186) return;
    var baseSG=window.stanzaGroups;
    window.stanzaGroups=function(P){
      if(P && P.id==="ashtotram" && P.zeilen && P.zeilen.length){
        return P.zeilen.map(function(z,n){ var m=String(z.sa||"").match(/^(\d+)/); return { key:m?m[1]:String(n+1), start:n, idx:[n] }; });
      }
      return baseSG.apply(this, arguments);
    };
    window.stanzaGroups._bpp186=1;
  }
  function hookAnchors(){
    if(typeof window.bppAnchors!=="function" || window.bppAnchors._bpp186 || typeof bppUserMarks!=="function") return;
    window.bppAnchors=function(P, gs){
      var yt=(typeof ytOn!=="undefined" && ytOn), base=yt?P.marksYt:P.marksFile, A={}, isBase={};
      if(base && base.length){ base.forEach(function(t,g){ if(typeof t==="number" && g<gs.length){ A[g]=t; isBase[g]=1; } }); }
      if(A[0]==null){ A[0]=(yt?P.youtubeStart:0)||0; isBase[0]=1; }
      var u={}; try{ u=bppUserMarks(P.id)||{}; }catch(e){}
      Object.keys(u).forEach(function(k){
        var g=+k, t=u[k]; if(!(g>=0 && g<gs.length) || typeof t!=="number") return;
        var lo=-Infinity, hi=Infinity;
        Object.keys(isBase).forEach(function(kk){ var q=+kk; if(q<g && A[q]>lo) lo=A[q]; if(q>g && A[q]<hi) hi=A[q]; });
        if(t>lo && t<hi) A[g]=t;
      });
      return A;
    };
    window.bppAnchors._bpp186=1;
  }
  function realMarks(m, flag){ return !!(m && !flag && m.filter(function(x){ return typeof x==="number"; }).length>=2); }
  function estimate(P){
    if(!P || typeof stanzaGroups!=="function" || typeof i==="undefined" || i<0 || PRAYERS[i]!==P) return false;
    var yt=(typeof ytOn!=="undefined" && ytOn), key=yt?"marksYt":"marksFile", fl=yt?"_bppEstYt":"_bppEstMarks", fd=fl+"Dur";
    /* V1.85-Altlast: marksFile mit YouTube-Dauer geschaetzt → verwerfen */
    if(!yt && P._bppEstMarks && P._bppEstSrc==="yt"){ delete P.marksFile; P._bppEstMarks=0; }
    if(realMarks(P[key], P[fl])) return false;
    var dur=0;
    if(yt){ if(typeof ytDur==="number" && ytDur>8) dur=ytDur; }
    else if(typeof a!=="undefined" && a && isFinite(a.duration) && a.duration>8) dur=a.duration;
    if(!(dur>8)) return false;
    if(P[fl] && Math.abs((P[fd]||0)-dur)<1.5) return false;
    try{
      var gs=stanzaGroups(P); if(!gs || gs.length<2) return false;
      var w=(typeof bppWeights==="function")?bppWeights(P, gs):gs.map(function(){ return 10; });
      var sum=0; w.forEach(function(x){ sum+=x; }); if(!(sum>0)) return false;
      var t0=yt?((P.youtubeStart||0)+0.6):0.6, usable=Math.max(dur-t0-1.5, gs.length), m=[], acc=0;
      for(var g=0;g<gs.length;g++){ m.push(Math.round((t0+usable*(acc/sum))*10)/10); acc+=w[g]; }
      P[key]=m; P[fl]=1; P[fd]=dur; if(!yt) P._bppEstSrc="file";
      return true;
    }catch(e){ return false; }
  }
  var paintedAsh=0;
  function refresh(){
    hookSG(); hookAnchors();
    if(typeof PRAYERS==="undefined" || typeof i==="undefined" || i<0 || !PRAYERS[i]) return;
    var P=PRAYERS[i], need=estimate(P);
    if(P.id==="ashtotram"){ if(!paintedAsh){ paintedAsh=1; need=true; } } else paintedAsh=0;
    if(need){ try{ holdLineUntil=0; }catch(e){} try{ paintLyrics(); }catch(e){} }
  }
  /* V1.85 hat ggf. schon marksFile aus der YouTube-Dauer gesetzt: markieren, damit es verworfen wird */
  if(typeof PRAYERS!=="undefined") PRAYERS.forEach(function(P){ if(P._bppEstMarks && !P._bppEstSrc) P._bppEstSrc="yt"; });

  /* ---------- Vollbild: Menue nur nach Tippen ---------- */
  var css=document.createElement("style");
  css.textContent="#bppFsSide{display:none!important}#bppFs #bppFsStage{bottom:4vh}"+
    "#bppFsBar button.str{font-size:15px;min-width:58px;padding:0 8px}#bppFsBar button.j30{font-size:15px;min-width:52px}"+
    "@media(max-width:400px){#bppFsBar button.str{min-width:54px;padding:0 6px}#bppFsBar button.j30{min-width:48px;padding:0 6px}}";
  document.head.appendChild(css);
  var STR={de:["‹ Str.","Str. ›"],en:["‹ Verse","Verse ›"],fr:["‹ Str.","Str. ›"],es:["‹ Estr.","Estr. ›"],ru:["‹ Стр.","Стр. ›"],hi:["‹ पद","पद ›"],pt:["‹ Verso","Verso ›"]};
  function arrange(){
    var bar=document.getElementById("bppFsBar"); if(!bar) return;
    var L=STR[(typeof lang!=="undefined" && STR[lang])?lang:"en"];
    var pv=document.getElementById("bppFsPrev"), nx=document.getElementById("bppFsNext");
    if(pv && pv.textContent!==L[0]) pv.textContent=L[0];
    if(nx && nx.textContent!==L[1]) nx.textContent=L[1];
    var b30=document.getElementById("bppFsB30"), f30=document.getElementById("bppFsF30"), ch=document.getElementById("bppFsCh");
    if(b30 && f30 && ch && b30.parentNode!==ch.parentNode){
      var old=b30.parentNode, tools=ch.parentNode;
      tools.insertBefore(b30, ch); tools.insertBefore(f30, ch);
      if(old && old!==tools && old.children.length===0) old.parentNode.removeChild(old);
    }
  }

  function boot(){
    refresh(); arrange();
    setInterval(refresh, 900);
    setInterval(arrange, 500);
    var lastId=null;
    setInterval(function(){
      hookSG(); hookAnchors();
      if(typeof PRAYERS==="undefined" || typeof i==="undefined" || i<0) return;
      var id=PRAYERS[i]&&PRAYERS[i].id; if(id!==lastId){ lastId=id; refresh(); }
    }, 400);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.addEventListener("load", refresh);
  setTimeout(refresh, 0); setTimeout(refresh, 600);
})();
