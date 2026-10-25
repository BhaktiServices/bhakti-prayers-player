/* [Grok-Bot] V4.02: Zusatz-Aufnahme "SPN live" (The Ashram - Shree Peetha Nilaya, YouTube-Kanal UC39WcMmercUJuwX7_SxgB_A).
   Morgen: "Morning Prayers LIVE from the Bhutabhrteshwarnath Mandir" 9bXeGlXplEA (23.10.2026); Abend: "Evening Arati LIVE" vvbn9bu7wM4 (22.10.2026).
   Abschnitte per Pausen + Spracherkennung (faster-whisper, demucs) gefunden, geschnitten (Hochpass 80 Hz, -16 LUFS, mono 56 kbit/s) als audio/<id>-spn-live.mp3.
   Strophenmarken per Chroma-DTW gegen die bisherige Aufnahme gemessen; bei Sri/Bhu/Nila Suktam und Nrisimha unsicher -> nur Startmarke.
   Standard bleibt die bisherige Aufnahme; Taste unter dem Titel, Wahl in localStorage "bpp-spn-<id>". Ersatz ohne MP3: YouTube ab Startzeit. */
// build via v403
(function(){
  if(window.bppV402) return; window.bppV402=1;
  var D={"suprabhatam": {"yt": "9bXeGlXplEA", "s": 1295, "m": [4.0, 31.5, 52.9, 73.6, 94.2, 114.9, 135.9, 156.6, 177.0, 197.6, 217.4, 237.9, null, 278.4, 298.7, 322.0]}, "govinda": {"yt": "9bXeGlXplEA", "s": 1641, "m": [null, 23.1, null, null, 103.6, 131.7, null, null, null, 233.4, 258.1, null, null, null, null, 386.5, 412.7, 438.2, 469.0, 491.8, 514.5, 539.2, 565.2, 589.9, null, null, 665.3, 691.1, 719.2]}, "sri-suktam": {"yt": "9bXeGlXplEA", "s": 2421, "m": [0.0]}, "bhu-suktam": {"yt": "9bXeGlXplEA", "s": 2670, "m": [0.0]}, "nila-suktam": {"yt": "9bXeGlXplEA", "s": 2820, "m": [0.0]}, "narasimha": {"yt": "9bXeGlXplEA", "s": 3609, "m": [0.0]}, "lakshmi-arati": {"yt": "9bXeGlXplEA", "s": 4876, "m": [0.2, 24.2, 48.9, 73.7, 98.4, 130.5, 166.7, 193.2, 224.6]}, "vishnu-arati": {"yt": "vvbn9bu7wM4", "s": 34, "m": [0.0, 25.5, 46.0, 66.5, 87.0, 107.5, 128.0, 148.5, 169.0, 189.5, 210.0, 230.5, 251.0, 271.5, 292.0]}};
  ["govinda","narasimha","suprabhatam"].forEach(function(k){ delete D[k]; try{ if(localStorage.getItem("bpp-spn-"+k)==="spn") localStorage.setItem("bpp-spn-"+k,"alt"); }catch(e){} }); /* [Grok-Bot] V4.13: SPN live bei Govinda, Narasimha und Suprabhatam deaktiviert (Datei bleibt); alte Wahl -> Standard */
  var NAME={"9bXeGlXplEA":"Morning Prayers LIVE, 23.10.2026","vvbn9bu7wM4":"Evening Arati LIVE, 22.10.2026"};
  var B={"de":["Aufnahme: SPN live","Aufnahme: bisherige"],"en":["Recording: SPN live","Recording: previous"],"fr":["Enregistrement : SPN live","Enregistrement : précédent"],"es":["Grabación: SPN live","Grabación: anterior"],"ru":["Запись: SPN live","Запись: прежняя"],"hi":["रिकॉर्डिंग: SPN live","रिकॉर्डिंग: पिछली"],"pt":["Gravação: SPN live","Gravação: anterior"]};
  var HQ={"de":"Aufnahme SPN live","en":"Recording SPN live","fr":"Enregistrement SPN live","es":"Grabación SPN live","ru":"Запись SPN live","hi":"रिकॉर्डिंग SPN live","pt":"Gravação SPN live"};
  function lg(){ return (typeof lang!=="undefined"&&B[lang])?lang:"en"; }
  function key(id){ return "bpp-spn-"+id; }
  function on(id){ try{ return localStorage.getItem(key(id))==="spn"; }catch(e){ return false; } }
  function marks(m,o){ return m.map(function(x){ return x==null?null:Math.round((x+o)*10)/10; }); }
  function seq(m,o){ var s=[]; m.forEach(function(x,k){ if(x!=null) s.push([Math.round((x+o)*10)/10,k]); }); return s; }
  var PR={}; Object.keys(D).forEach(function(id){ var d=D[id], F="audio/"+id+"-spn-live.mp3";
    PR[id]={audio:F, audioAlt:["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F], preferFile:true, youtube:d.yt, youtubeStart:d.s,
      seqFile:seq(d.m,0), marksFile:marks(d.m,0), seqYt:seq(d.m,d.s), marksYt:marks(d.m,d.s)}; });
  var hooked={};
  function hook(){ if(typeof PRAYERS==="undefined") return;
    Object.keys(PR).forEach(function(id){ var P=PRAYERS.find(function(p){ return p.id===id; }); if(!P||hooked[id]===P) return;
      Object.keys(PR[id]).forEach(function(k){ var base=P[k];
        Object.defineProperty(P,k,{configurable:true,enumerable:true, get:function(){ return on(id)?PR[id][k]:base; }, set:function(v){ base=v; }}); });
      hooked[id]=P; }); }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function sw(){ var c=cur(); if(!c||!PR[c.id]) return; var id=c.id;
    try{ localStorage.setItem(key(id),on(id)?"alt":"spn"); }catch(e){}
    var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    try{ putSong(id,{line:0,time:0}); }catch(e){} try{ play(PRAYERS.indexOf(c),false,was); }catch(e){} paint(); }
  function paint(){ var c=cur(), b=document.getElementById("bppRec402");
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec402"; b.style.cssText="display:none;margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); }); now.parentNode.insertBefore(b,now.nextSibling); }
    var show=!!c&&!!PR[c.id]; b.style.display=show?"":"none"; if(!show) return;
    var o=on(c.id), t="Rec: SPN", tt=B[lg()][o?1:0]; /* [Grok-Bot] V4.20: Kurzname "Rec: SPN" (alle Sprachen), gold = SPN aktiv, Tooltip = naechste Aktion; neben dem Titel wie Rec: Pbj/Mtj */
    if(b.textContent!==t) b.textContent=t; if(b.title!==tt){ b.title=tt; b.setAttribute("aria-label",tt); }
    if(!b.classList.contains("bppRec")){ b.className="bppRec"; b.style.cssText=""; }
    b.classList.toggle("spnOn",o); b.setAttribute("aria-pressed",o?"true":"false");
    var tl=document.getElementById("lyrTitle"), sh=document.getElementById("bppShare");
    if(tl){ if(sh&&sh.parentNode===tl){ if(b.nextSibling!==sh) tl.insertBefore(b,sh); } else if(b.parentNode!==tl) tl.appendChild(b); } }
  function src(){ var b=document.getElementById("bppSrcInfo"), c=cur(); if(!b||!b.innerHTML||!c||!PR[c.id]) return; if(b.querySelector(".hq402")) return;
    var d=D[c.id], u="https://www.youtube.com/watch?v="+d.yt+"&t="+d.s+"s";
    b.insertAdjacentHTML("beforeend",'<br><span class="hq402"><b>'+HQ[lg()]+':</b> The Ashram – Shree Peetha Nilaya, „'+NAME[d.yt]+'“ <a href="'+u+'" target="_blank" rel="noopener">'+u+'</a></span>'); }
  function pre(){ try{ if(!navigator.onLine||!window.caches) return; caches.open("bpp-audio-v2").then(function(c){
      Object.keys(PR).forEach(function(id){ var u=new URL(PR[id].audio,location.href).href;
        c.match(u).then(function(r){ if(!r) return fetch(u,{cache:"no-store"}).then(function(x){ if(x.ok) return c.put(u,x); }); }).catch(function(){}); }); }).catch(function(){}); }catch(e){} }
  window.bppSpn402=function(){ var c=cur(); return {id:c&&c.id, has:!!(c&&PR[c.id]), on:!!(c&&on(c.id)), audio:c&&c.audio}; };
  hook(); setInterval(function(){ hook(); paint(); src(); },300);
  window.addEventListener("load",function(){ hook(); paint(); setTimeout(pre,10000); });
})();
/* <audio src="audio/suprabhatam-spn-live.mp3"> */
/* <audio src="audio/govinda-spn-live.mp3"> */
/* <audio src="audio/sri-suktam-spn-live.mp3"> */
/* <audio src="audio/bhu-suktam-spn-live.mp3"> */
/* <audio src="audio/nila-suktam-spn-live.mp3"> */
/* <audio src="audio/narasimha-spn-live.mp3"> */
/* <audio src="audio/lakshmi-arati-spn-live.mp3"> */
/* <audio src="audio/vishnu-arati-spn-live.mp3"> */
