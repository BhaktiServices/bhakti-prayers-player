/* [Grok-Bot] V4.05: Zusatz-Aufnahme "Prabhus" fuer das Ashtottaram (108 Namen), morgens und abends.
   Quelle: YouTube 6QSuy1M0c84, 24:17-28:36 (Vorgabe des Nutzers), bearbeitet wie V3.67 (Hochpass 80 Hz, -16 LUFS, mono 56 kbit/s) als audio/ashtotram-prabhus.mp3 (259 s).
   Namenmarken: Stimme per demucs getrennt, Pausen + faster-whisper-Abgleich; 100 von 108 gemessen, unsicher (keine Marke): 13, 100, 101, 103-107.
   Standard bleibt die bisherige Aufnahme; Taste unter dem Titel, Wahl in localStorage "bpp-prabhus-<id>". YT-Version (Taste MP3/YT, wie bei den anderen Gebeten): YouTube 6QSuy1M0c84 ab 1457 s (bis 1716 s); preferFile folgt der MP3/YT-Wahl. */
// build via v406
(function(){
  if(window.bppV405) return; window.bppV405=1;
  var YT="6QSuy1M0c84", S=1457, M=[0.1, 3.0, 6.1, 11.3, 13.8, 15.9, 18.3, 20.6, 22.9, 25.0, 27.2, 29.4, null, 34.1, 36.7, 38.7, 41.4, 44.0, 46.6, 49.4, 51.9, 56.0, 58.3, 60.7, 63.9, 66.1, 68.5, 70.7, 73.5, 75.7, 77.7, 79.8, 82.5, 84.8, 86.9, 89.0, 91.0, 93.3, 95.7, 98.1, 100.3, 102.7, 105.2, 107.3, 109.4, 111.5, 113.7, 115.7, 117.8, 120.1, 122.3, 124.4, 126.7, 129.2, 131.7, 134.6, 137.1, 139.2, 141.8, 143.8, 145.9, 148.0, 150.5, 152.6, 154.7, 157.0, 159.2, 161.3, 163.6, 165.9, 168.1, 170.2, 172.2, 174.5, 176.8, 178.9, 181.1, 183.4, 185.6, 188.1, 190.4, 192.5, 194.9, 197.3, 199.5, 201.8, 204.2, 206.3, 208.4, 210.4, 212.4, 214.7, 216.8, 218.8, 221.1, 223.3, 225.3, 227.5, 229.5, null, null, 238.5, null, null, null, null, null, 255.0], F="audio/ashtotram-prabhus.mp3", IDS=["ashtotram","ashtotram-abend"];
  /* [Grok-Bot] V4.13: "bisherige" -> "Matajis" (Name, unuebersetzt), wie Govinda */
  var B={"de":["Rec: Pbj","Rec: Mtj"],"en":["Rec: Pbj","Rec: Mtj"],"fr":["Rec: Pbj","Rec: Mtj"],"es":["Rec: Pbj","Rec: Mtj"],"ru":["Rec: Pbj","Rec: Mtj"],"hi":["Rec: Pbj","Rec: Mtj"],"pt":["Rec: Pbj","Rec: Mtj"]};
  var HQ={"de":"Aufnahme Prabhus","en":"Recording Prabhus","fr":"Enregistrement Prabhus","es":"Grabación Prabhus","ru":"Запись Prabhus","hi":"रिकॉर्डिंग Prabhus","pt":"Gravação Prabhus"};
  function lg(){ return (typeof lang!=="undefined"&&B[lang])?lang:"en"; }
  function key(id){ return "bpp-prabhus-"+id; }
  function on(id){ try{ return localStorage.getItem(key(id))==="prabhus"; }catch(e){ return false; } }
  function marks(o){ return M.map(function(x){ return x==null?null:Math.round((x+o)*10)/10; }); }
  function seq(o){ var s=[]; M.forEach(function(x,k){ if(x!=null) s.push([Math.round((x+o)*10)/10,k]); }); return s; }
  var R={audio:F, audioAlt:["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F], youtube:YT, youtubeStart:S,
    seqFile:seq(0), marksFile:marks(0), seqYt:seq(S), marksYt:marks(S)};
  var hooked={};
  function hook(){ if(typeof PRAYERS==="undefined") return;
    IDS.forEach(function(id){ var P=PRAYERS.find(function(p){ return p.id===id; }); if(!P||hooked[id]===P) return;
      Object.keys(R).forEach(function(k){ var base=P[k];
        Object.defineProperty(P,k,{configurable:true,enumerable:true, get:function(){ return on(id)?R[k]:base; }, set:function(v){ base=v; }}); });
      hooked[id]=P; }); }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function has(c){ return !!c&&IDS.indexOf(c.id)>=0; }
  function sw(){ var c=cur(); if(!has(c)) return; var id=c.id;
    try{ localStorage.setItem(key(id),on(id)?"alt":"prabhus"); }catch(e){}
    var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    var t=0; try{ var a=document.getElementById("a"); if(a&&isFinite(a.currentTime)) t=a.currentTime; }catch(e){} try{ putSong(id,{line:line,time:t}); }catch(e){} try{ play(PRAYERS.indexOf(c),true,was); }catch(e){} paint(); }
  function paint(){ var c=cur(), b=document.getElementById("bppRec405");
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec405"; b.style.cssText="display:none;margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); }); now.parentNode.insertBefore(b,now.nextSibling); }
    var show=has(c); b.style.display=show?"":"none"; if(!show) return;
    var o=on(c.id), t=B[lg()][o?1:0];
    if(b.textContent!==t){ b.textContent=t; b.title=t; b.setAttribute("aria-label",t); }
    b.classList.toggle("on",o); b.setAttribute("aria-pressed",o?"true":"false"); }
  function src(){ var b=document.getElementById("bppSrcInfo"), c=cur(); if(!b||!b.innerHTML||!has(c)) return; if(b.querySelector(".hq405")) return;
    var u="https://www.youtube.com/watch?v="+YT+"&t="+S+"s";
    b.insertAdjacentHTML("beforeend",'<br><span class="hq405"><b>'+HQ[lg()]+':</b> YouTube <a href="'+u+'" target="_blank" rel="noopener">'+u+'</a>, 24:17–28:36 (MP3 und YT-Version)</span>'); }
function busy409(u){ try{ var a=document.getElementById("a"), s=a&&a.currentSrc?new URL(a.currentSrc,location.href).href.split("?")[0]:""; return s===u.split("?")[0]; }catch(e){ return false; } } /* [Grok-Bot] V4.09: nicht cachen, waehrend genau diese Datei im Player geladen ist (sonst MEDIA_ERR beim Zurueckspulen -> Neustart bei ~2 s) */
    function pre(){ try{ if(!navigator.onLine||!window.caches) return; caches.open("bpp-audio-v2").then(function(c){ var u=new URL(F,location.href).href;
      if(busy409(u)){ setTimeout(pre,30000); return; }
      c.match(u).then(function(r){ if(!r) return fetch(u,{cache:"no-store"}).then(function(x){ if(x.ok) return c.put(u,x); }); }).catch(function(){}); }).catch(function(){}); }catch(e){} }
  window.bppPrabhus405=function(){ var c=cur(); return {id:c&&c.id, has:has(c), on:!!(c&&on(c.id)), audio:c&&c.audio}; };
  hook(); setInterval(function(){ hook(); paint(); src(); },300);
  window.addEventListener("load",function(){ hook(); paint(); setTimeout(pre,10000); });
})();
/* <audio src="audio/ashtotram-prabhus.mp3"> */
