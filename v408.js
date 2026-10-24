/* [Grok-Bot] V4.08: Zusatz-Aufnahmen "Prabhus" aus YouTube 0yvn6RxTiU8 (Zeiten = Vorgabe des Nutzers), bearbeitet wie V4.05 (Hochpass 80 Hz, -16 LUFS, mono 56 kbit/s):
   - The Govinda Prayer (govinda): 35:08-46:20 (2108-2780 s, V4.10 neu geschnitten) -> audio/govinda-prabhus2.mp3. Marken: 29/29 gemessen (Demucs-Gesang + Whisper-Refrain "govindam"; Str. 24-28 ueber Pausenraster). V4.10: Govinda Suprabhatam am Anfang entfernt (Schnitt in der Pause vor Str. 1), Str. 1 beginnt bei 2.3 s; Marken um -318 s verschoben.
   - Narasimha Kavacam (kavacham): 46:30-1:05:18 (2790-3918 s) -> audio/narasimha-prabhus.mp3. Marken: 49/55 gemessen (Whisper-Anker + Pausenraster); Str. 50-55 (Kirtan-Schluss) ohne Marke.
   Standard bleibt die bisherige Aufnahme; Taste unter dem Titel, Wahl in localStorage "bpp-prabhus-<id>". Govinda: neben "SPN live" (v402.js), Prabhus schaltet SPN aus und umgekehrt.
   YT-Version (Taste MP3/YT) 2108-2780 bzw. 2790-3918 s (Endpunkt per &end= am Einbettungslink). */
// build via v409.js
(function(){
  if(window.bppV408) return; window.bppV408=1;
  var YT="0yvn6RxTiU8";
  var CF=[{id:"govinda",F:"audio/govinda-prabhus2.mp3",S:2108,M:[2.3,25.8,51.3,76.4,99.6,122.8,147.2,171.0,194.6,218.0,241.4,264.7,288.1,311.4,334.5,357.8,380.9,403.8,426.8,450.0,472.9,495.2,517.5,538.8,559.9,580.9,601.7,622.7,644.9],r:"35:08–46:20",spn:1},
          {id:"kavacham",F:"audio/narasimha-prabhus.mp3",S:2790,M:[15.5,41.3,66.6,91.1,115.6,139.6,163.6,187.4,211.2,235.1,259.3,282.4,306.3,328.1,349.6,369.4,388.8,407.9,426.7,444.9,463.1,481.1,499.1,516.3,533.8,550.7,567.5,583.7,599.6,615.4,630.8,646.3,661.6,683.3,710.5,736.6,761.8,794.3,810.0,825.8,841.5,857.2,872.8,888.5,903.4,917.9,933.4,948.4,963.7,null,null,null,null,null,null],r:"46:30–1:05:18",spn:0}];
  /* [Grok-Bot] V4.13: "bisherige" -> "Matajis" (Name, unuebersetzt) */
  var B={"de":["Rec: Pbj","Rec: Mtj"],"en":["Rec: Pbj","Rec: Mtj"],"fr":["Rec: Pbj","Rec: Mtj"],"es":["Rec: Pbj","Rec: Mtj"],"ru":["Rec: Pbj","Rec: Mtj"],"hi":["Rec: Pbj","Rec: Mtj"],"pt":["Rec: Pbj","Rec: Mtj"]};
  var HQ={"de":"Aufnahme Prabhus","en":"Recording Prabhus","fr":"Enregistrement Prabhus","es":"Grabación Prabhus","ru":"Запись Prabhus","hi":"रिकॉर्डिंग Prabhus","pt":"Gravação Prabhus"};
  function lg(){ return (typeof lang!=="undefined"&&B[lang])?lang:"en"; }
  function K(c){ return "bpp-prabhus-"+c.id; }
  function on(c){ try{ return localStorage.getItem(K(c))==="prabhus"; }catch(e){ return false; } }
  function rnd(x){ return Math.round(x*10)/10; }
  CF.forEach(function(c){ var M=c.M, sq=function(o){ var s=[]; M.forEach(function(x,k){ if(x!=null) s.push([rnd(x+o),k]); }); return s; },
      mk=function(o){ return M.map(function(x){ return x==null?null:rnd(x+o); }); };
    c.R={audio:c.F, audioAlt:["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+c.F], youtube:YT, youtubeStart:c.S,
      seqFile:sq(0), marksFile:mk(0), seqYt:sq(c.S), marksYt:mk(c.S)}; c.hk=null; });
  function hook(){ if(typeof PRAYERS==="undefined") return; CF.forEach(function(c){ if(c.spn&&!window.bppV402) return;
    var P=PRAYERS.find(function(p){ return p.id===c.id; }); if(!P||c.hk===P) return;
    Object.keys(c.R).forEach(function(k){ var d=Object.getOwnPropertyDescriptor(P,k)||{}, base=d.get?undefined:P[k];
      Object.defineProperty(P,k,{configurable:true,enumerable:true,
        get:function(){ return on(c)?c.R[k]:(d.get?d.get.call(P):base); }, set:function(v){ if(d.set) d.set.call(P,v); else base=v; }}); });
    c.hk=P; }); }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function cfg(p){ if(!p) return null; for(var k=0;k<CF.length;k++) if(CF[k].id===p.id&&CF[k].hk) return CF[k]; return null; }
  function replay(p,c){ var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    try{ play(PRAYERS.indexOf(p),true,was); }catch(e){} }
  function sw(){ var p=cur(), c=cfg(p); if(!c) return; var o=on(c);
    try{ localStorage.setItem(K(c),o?"alt":"prabhus"); if(!o&&c.spn) localStorage.setItem("bpp-spn-"+c.id,"alt"); }catch(e){}
    replay(p,c); paint(); }
  function paint(){ var p=cur(), c=cfg(p), b=document.getElementById("bppRec408");
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec408"; b.style.cssText="display:none;margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); }); now.parentNode.insertBefore(b,now.nextSibling); }
    var s=document.getElementById("bppRec402");
    if(s&&!s.__v408){ s.__v408=1; s.addEventListener("click",function(){ try{ if(localStorage.getItem("bpp-prabhus-govinda")==="prabhus") localStorage.setItem("bpp-prabhus-govinda","alt"); }catch(e){} },true); } /* SPN gewaehlt -> Prabhus aus */
    b.style.display=c?"":"none"; if(!c) return;
    var o=on(c), t=o?"Rec: Pbj":"Rec: Mtj";
    if(b.textContent!==t) b.textContent=t;
    b.classList.remove("on"); b.setAttribute("aria-pressed",o?"true":"false"); }
  function src(){ var b=document.getElementById("bppSrcInfo"), c=cfg(cur()); if(!b||!b.innerHTML||!c) return; if(b.querySelector(".hq408")) return;
    var u="https://www.youtube.com/watch?v="+YT+"&t="+c.S+"s";
    b.insertAdjacentHTML("beforeend",'<br><span class="hq408"><b>'+HQ[lg()]+':</b> YouTube <a href="'+u+'" target="_blank" rel="noopener">'+u+'</a>, '+c.r+' (MP3 und YT-Version)</span>'); }
function busy409(u){ try{ var a=document.getElementById("a"), s=a&&a.currentSrc?new URL(a.currentSrc,location.href).href.split("?")[0]:""; return s===u.split("?")[0]; }catch(e){ return false; } } /* [Grok-Bot] V4.09: nicht cachen, waehrend genau diese Datei im Player geladen ist (sonst MEDIA_ERR beim Zurueckspulen -> Neustart bei ~2 s) */
    function pre(){ try{ if(!navigator.onLine||!window.caches) return; caches.open("bpp-audio-v2").then(function(ca){ CF.forEach(function(c){ var u=new URL(c.F,location.href).href;
      if(busy409(u)){ setTimeout(pre,30000); return; }
      ca.match(u).then(function(r){ if(!r) return fetch(u,{cache:"no-store"}).then(function(x){ if(x.ok) return ca.put(u,x); }); }).catch(function(){}); }); }).catch(function(){}); }catch(e){} }
  window.bppPrabhus408=function(){ var p=cur(), c=cfg(p); return {id:p&&p.id, has:!!c, on:!!c&&on(c), audio:p&&p.audio}; };
  (function(){ var d=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,"src"); if(!d||!d.set) return;
    Object.defineProperty(HTMLIFrameElement.prototype,"src",{configurable:true,enumerable:d.enumerable,get:d.get,set:function(v){
      try{ var m=typeof v==="string"&&v.indexOf("/embed/"+YT)>=0&&v.indexOf("end=")<0&&v.match(/[?&]start=(\d+)/);
        if(m){ var s=+m[1];
          var e=(s>=2108&&s<2780)?2780:(s>=2790&&s<3918)?3918:0; if(e) v+="&end="+e; } }catch(x){}
      return d.set.call(this,v); }}); })(); /* YT-Endpunkt */
  hook(); setInterval(function(){ hook(); paint(); src(); },300);
  window.addEventListener("load",function(){ hook(); paint(); setTimeout(pre,10000); });
})();
/* <audio src="audio/govinda-prabhus2.mp3"> <audio src="audio/narasimha-prabhus.mp3"> */
