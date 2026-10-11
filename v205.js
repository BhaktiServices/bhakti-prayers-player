/* [Grok-Bot] V2.05: Android-Benachrichtigung wie bei einem Musik-Player (Media Session: Titel/Interpret/Album, PNG-Artwork 96/192/512
   aus icon-512.svg per Canvas, playbackState, setPositionState, Handler Play/Pause/Stop, voriger/naechster Titel, 10 s spulen, Spulen per Leiste).
   Naechster/Vorheriger Titel laeuft durch ALLE Gebete (Ansicht "Alle", ohne Doppelte). Aktivitaetsanzeige unten links (Download / Wiedergabe).
   YouTube spielt in einem fremden iframe, dort setzt YouTube selbst die Benachrichtigung; wir setzen trotzdem unsere Metadaten. */
window.BPP_BUILD="2.05";
(function(){
  if(window.bppV205) return; window.bppV205=1;
  var ART=[];
  (function(){ try{ var im=new Image(); im.onload=function(){ var out=[]; [96,192,512].forEach(function(n){ try{ var c=document.createElement("canvas"); c.width=c.height=n; var g=c.getContext("2d"); g.drawImage(im,0,0,n,n); out.push({src:c.toDataURL("image/png"), sizes:n+"x"+n, type:"image/png"}); }catch(e){} }); if(out.length){ ART.length=0; out.forEach(function(a){ART.push(a);}); try{ meta(true); }catch(e){} } }; im.src="icon-512.svg?v=205"; }catch(e){} })();
  window.BPP_ART=ART;
  /* V2.05: Titel-Navigation durch alle Gebete */
  window.bppAllOrder=function(snd){
    var seen={}, out=[], map={};
    PRAYERS.forEach(function(p, k){ var t=String(p.titel||"").trim().toLowerCase(); if(seen[t]===undefined){ seen[t]=k; if(!snd || snd(k)) out.push(k); } map[k]=seen[t]; });
    return {list:out, map:map};
  };
  window.bppAllNb=function(d, wrap, snd){
    if(typeof i==="undefined" || i<0) return null;
    var O=window.bppAllOrder(snd), L=O.list, pos=L.indexOf(O.map[i]); if(pos<0) return null;
    var n=pos+d; if(n<0 || n>=L.length){ if(!wrap || L.length<2) return null; n=(n+L.length)%L.length; }
    var hd=null; try{ hd=sessionStorage.getItem("bpp-head")||null; }catch(e){}
    return {idx:L[n], head:hd};
  };
  (function(){
    function snd(k){ var q=PRAYERS[k]; return !!(q && (q.audio || q.youtube) && (window.bppHidden||[]).indexOf(q.id)<0); }
    function nb(d){ var nv=window.bppPrayerNav; return window.bppAllNb(d, !!(nv && nv.rep && nv.rep()===2), snd); }
    function nm(x){ return x ? String(PRAYERS[x.idx].titel||"") : ""; }
    function esc(t){ return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
    var PD=Object.getOwnPropertyDescriptor, D=PD(HTMLButtonElement.prototype,"disabled"), TT=PD(HTMLElement.prototype,"title"), IH=PD(Element.prototype,"innerHTML");
    function fix(id, d, full){
      var b=document.getElementById(id); if(!b || b.__bpp205) return; b.__bpp205=1;
      Object.defineProperty(b, "disabled", {configurable:true, get:function(){ return D.get.call(b); }, set:function(){ D.set.call(b, !nb(d)); }});
      Object.defineProperty(b, "title", {configurable:true, get:function(){ return TT.get.call(b); }, set:function(v){ var x=nb(d), p=String(v).split(": ")[0], t=p+(x?": "+nm(x):""); TT.set.call(b, t); b.setAttribute("aria-label", t); }});
      if(full) Object.defineProperty(b, "innerHTML", {configurable:true, get:function(){ return IH.get.call(b); }, set:function(){ paint(b, d); }});
      sync(b, d, full);
    }
    function paint(b, d){ var I=window.bppIcons||{prev:"",next:""}, n=esc(nm(nb(d))); IH.set.call(b, d<0 ? I.prev+"<span>"+n+"</span>" : "<span>"+n+"</span>"+I.next); b.__nm=nm(nb(d)); }
    function sync(b, d, full){ b.disabled=true; b.title=TT.get.call(b)||""; if(full && b.__nm!==nm(nb(d))) paint(b, d); }
    function tick(){
      var nv=window.bppPrayerNav; if(!nv) return;
      if(!nv.__bpp205){ nv.__bpp205=1; var st=function(x){ if(!x) return; try{ sessionStorage.setItem("bpp-head", x.head||""); }catch(e){} try{ putSong(PRAYERS[x.idx].id, {time:0, line:0}); }catch(e){} play(x.idx, true, (typeof isPlaying==="function") && isPlaying()); /* [Grok.com] Play/Pause behalten */ };
        nv.next=function(){ st(nb(1)); }; nv.prev=function(){ st(nb(-1)); };
        var n0=nv.neighbor; nv.neighbor=function(d, w){ try{ return window.bppAllNb(d, w, snd); }catch(e){ return n0(d, w); } }; }
      [["btnPPrev",-1,0],["btnPNext",1,0],["bppFsPPrev",-1,1],["bppFsPNext",1,1]].forEach(function(x){ var b=document.getElementById(x[0]); if(!b) return; if(!b.__bpp205) fix(x[0], x[1], x[2]); else sync(b, x[1], x[2]); });
    }
    setInterval(tick, 400); setTimeout(tick, 50);
  })();
  if(!("mediaSession" in navigator)) return;
  var ms=navigator.mediaSession, lastTitle="", lastPos=0;
  function a(){ return document.getElementById("a"); }
  function cur(){ try{ return (typeof i!=="undefined" && i>=0) ? PRAYERS[i] : null; }catch(e){ return null; } }
  function yt(){ return (typeof ytOn!=="undefined" && ytOn); }
  function playing(){ var x=a(); return yt() ? !!(typeof ytPlaying!=="undefined" && ytPlaying) : !!(x && x.src && !x.paused && !x.ended); }
  function meta(force){
    if(typeof MediaMetadata==="undefined") return;
    var P=cur(), t=P ? String(P.titel||P.id||"") : "Bhakti Prayers Player";
    var who=P && P.autor ? String(P.autor).split("\u00b7")[0].trim() : "BPPlayer";
    if(!force && ms.metadata && lastTitle===t && ms.metadata.artwork && ms.metadata.artwork.length && /^data:image\/png/.test(ms.metadata.artwork[0].src)) return;
    try{ ms.metadata=new MediaMetadata({title:t, artist:who||"BPPlayer", album:"BPPlayer \u00b7 Bhakti Prayers"+(yt()?" (YouTube)":""), artwork:ART}); lastTitle=t; }catch(e){}
  }
  function state(){ try{ ms.playbackState=playing() ? "playing" : ((a() && a().src) || yt() ? "paused" : "none"); }catch(e){} }
  function pos(){
    var x=a(); if(!ms.setPositionState) return;
    try{
      if(yt()){ if(typeof ytTime==="number" && typeof ytDur==="number" && ytDur>0) ms.setPositionState({duration:ytDur, playbackRate:1, position:Math.max(0, Math.min(ytTime, ytDur))}); return; }
      if(x && isFinite(x.duration) && x.duration>0) ms.setPositionState({duration:x.duration, playbackRate:(x.playbackRate>0?x.playbackRate:1), position:Math.max(0, Math.min(x.currentTime||0, x.duration))});
    }catch(e){}
  }
  function all(force){ meta(force); state(); pos(); }
  function ytSeek(t){ try{ document.getElementById("yt").contentWindow.postMessage(JSON.stringify({event:"command", func:"seekTo", args:[Math.max(0,t), true]}), "*"); }catch(e){} }
  function h(n, f){ try{ ms.setActionHandler(n, f); }catch(e){} }
  function tp(){ try{ if(typeof togglePlay==="function") togglePlay(); }catch(e){} setTimeout(function(){ all(false); }, 300); }
  function handlers(){
    h("play", function(){ if(!playing()) tp(); else all(false); });
    h("pause", function(){ if(playing()) tp(); else all(false); });
    h("stop", function(){ if(playing()) tp(); });
    h("previoustrack", function(){ try{ window.bppPrayerNav.prev(); }catch(e){} setTimeout(function(){ all(true); }, 600); });
    h("nexttrack", function(){ try{ window.bppPrayerNav.next(); }catch(e){} setTimeout(function(){ all(true); }, 600); });
    h("seekbackward", function(d){ var x=a(), o=(d&&d.seekOffset)||10; if(yt()){ ytSeek((ytTime||0)-o); } else if(x && x.src) x.currentTime=Math.max(0,(x.currentTime||0)-o); pos(); });
    h("seekforward", function(d){ var x=a(), o=(d&&d.seekOffset)||10; if(yt()){ ytSeek((ytTime||0)+o); } else if(x && x.src) x.currentTime=Math.min(x.duration||1e9,(x.currentTime||0)+o); pos(); });
    h("seekto", function(d){ var x=a(); if(!d || typeof d.seekTime!=="number") return; if(yt()){ ytSeek(d.seekTime); } else if(x && x.src){ if(d.fastSeek && x.fastSeek) x.fastSeek(d.seekTime); else x.currentTime=d.seekTime; } pos(); });
  }
  function hook(){
    var x=a(); if(!x || x.__bpp205) return; x.__bpp205=1;
    if(x.muted) x.muted=false;
    ["play","playing"].forEach(function(ev){ x.addEventListener(ev, function(){ handlers(); all(true); }); });
    ["pause","ended","emptied"].forEach(function(ev){ x.addEventListener(ev, function(){ all(false); }); });
    ["loadedmetadata","durationchange","ratechange","seeked"].forEach(function(ev){ x.addEventListener(ev, function(){ all(ev==="loadedmetadata"); }); });
    x.addEventListener("timeupdate", function(){ var n=Date.now(); if(n-lastPos>5000){ lastPos=n; all(false); } });
  }
  function wrapPlay(){
    if(typeof window.play!=="function" || window.play.__bpp205) return;
    var p0=window.play; window.play=function(){ var r=p0.apply(this, arguments); setTimeout(function(){ all(true); }, 50); setTimeout(function(){ all(true); }, 1200); return r; };
    window.play.__bpp205=1;
  }
  function init(){ hook(); handlers(); wrapPlay(); all(true); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.addEventListener("load", function(){ wrapPlay(); hook(); });
  setTimeout(wrapPlay, 1500);
  setInterval(function(){ if(playing() || yt()) all(false); }, 5000);

  /* V2.05: Aktivitaetsanzeige unten links: Download (Pfeil + n/N + Datei) bzw. Wiedergabe (Equalizer + Titel), einfarbig gold */
  (function(){
    var G="#e8c57a", box=null;
    function mk(){
      if(box || !document.body) return box;
      var st=document.createElement("style");
      st.textContent="#bppAct{position:fixed;left:6px;bottom:6px;z-index:30;display:none;align-items:center;gap:6px;max-width:62vw;font:11px/1.3 system-ui,sans-serif;color:"+G+";background:rgba(26,20,16,.85);border:1px solid #4a372b;border-radius:8px;padding:2px 8px;pointer-events:none}"+
        "#bppAct .t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
        "#bppAct .eq{display:inline-flex;align-items:flex-end;gap:2px;height:11px}#bppAct .eq i{display:block;width:3px;background:"+G+";animation:bppEq .9s ease-in-out infinite}"+
        "#bppAct .eq i:nth-child(2){animation-delay:-.3s}#bppAct .eq i:nth-child(3){animation-delay:-.6s}"+
        "@keyframes bppEq{0%,100%{height:3px}50%{height:11px}}"+
        "#bppAct .dl{width:11px;height:11px;animation:bppDl 1.1s ease-in-out infinite}@keyframes bppDl{0%{transform:translateY(-2px);opacity:.5}60%{transform:translateY(1px);opacity:1}100%{transform:translateY(-2px);opacity:.5}}";
      document.head.appendChild(st);
      box=document.createElement("div"); box.id="bppAct"; box.setAttribute("aria-live","polite");
      document.body.appendChild(box); return box;
    }
    var last="";
    function tick(){
      var b=mk(); if(!b) return;
      var S=window.bppOfflineState||{}, html="", key="";
      if(playing()){ var P=cur(); var t=P?String(P.titel||P.id||""):""; key="p"+t;
        html='<span class="eq"><i></i><i></i><i></i></span><span class="t">'+t.replace(/</g,"&lt;")+'</span>'; }
      else if(S.cur && navigator.onLine){ key="d"+S.n+S.cur;
        html='<svg class="dl" viewBox="0 0 12 12"><path d="M6 1v7M3 5.5 6 8.5 9 5.5M2 11h8" fill="none" stroke="'+G+'" stroke-width="1.6" stroke-linecap="round"/></svg><span class="t">'+(S.n+1)+'/'+S.total+' \u00b7 '+String(S.cur).replace(/</g,"&lt;")+'</span>'; }
      if(key!==last){ last=key; b.innerHTML=html; b.style.display=html?"inline-flex":"none"; }
    }
    window.bppActTick=tick;
    setInterval(tick, 700);
  })();
  window.bppMs=function(){ var m=ms.metadata; return {title:m&&m.title, artist:m&&m.artist, album:m&&m.album, art:m&&m.artwork&&m.artwork.map(function(x){ return x.sizes+":"+x.type; }), state:ms.playbackState}; };
  function showV(){ var v=document.querySelector("h1 .ver"); if(v) v.textContent="V2.05"; document.title="Bhakti Prayers Player V2.05"; }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", showV); else showV();
  setTimeout(showV, 900); setTimeout(showV, 1500);
})();
