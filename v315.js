/* [Grok-Bot] V3.15: Direktlinks pro Gebet (?p=<id>, optional &lang=de|en|fr|es|ru|hi, &chords=aus|akk|zeile (off|stanza|line), &tr=0|1).
   Beim Oeffnen: Gebet laden, Mitlesen an, Akkorde ueber Strophe, Uebersetzung an, Sprache = Browsersprache (Fallback EN), Wiedergabe starten
   (bei Autoplay-Sperre grosser Play-Hinweis). Jukebox-Intro wird bei Direktlink uebersprungen (Inline-Skript im head). Teilen-Knopf beim Gebetstitel. */
window.BPP_BUILD="3.15"; window.BPP_SHOW="3.15";
(function(){
  var LS=["de","en","fr","es","ru","hi","pt"];
  function L(){ return (typeof lang!=="undefined"&&LS.indexOf(lang)>=0)?lang:"en"; }
  var TX={de:["Link kopiert","Gebet teilen","Zum Abspielen tippen"],en:["Link copied","Share prayer","Tap to play"],fr:["Lien copié","Partager la prière","Touchez pour écouter"],
    es:["Enlace copiado","Compartir oración","Toca para reproducir"],ru:["Ссылка скопирована","Поделиться молитвой","Нажмите, чтобы слушать"],hi:["लिंक कॉपी हो गया","प्रार्थना साझा करें","चलाने के लिए टैप करें"],pt:["Link copiado","Compartilhar oração","Toque para tocar"]};
  var st=document.createElement("style");
  st.textContent="#bppShare{margin-left:.5em;background:none;border:1px solid #6b5338;color:#e0b45a;border-radius:8px;padding:0 .4em;font-size:.85em;line-height:1.5;cursor:pointer;vertical-align:middle}"+
    "#bppToast{position:fixed;left:50%;bottom:40px;transform:translateX(-50%);z-index:80;background:#2a1f16;color:#e0b45a;border:1px solid #e0b45a;border-radius:10px;padding:8px 14px;font:15px system-ui,sans-serif}"+
    "#bppTapPlay{position:fixed;inset:0;z-index:90;background:#000a;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#e0b45a;font:600 22px system-ui,sans-serif;cursor:pointer}"+
    "#bppTapPlay span{font-size:96px;line-height:1;border:4px solid #e0b45a;border-radius:50%;width:150px;height:150px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;padding-left:12px;box-sizing:border-box}";
  document.head.appendChild(st);
  function toast(s){ var m=document.getElementById("bppToast"); if(!m){ m=document.createElement("div"); m.id="bppToast"; document.body.appendChild(m); }
    m.textContent=s; m.style.display=""; clearTimeout(toast._t); toast._t=setTimeout(function(){ m.style.display="none"; },2500); }
  function link(){ var P=(typeof i!=="undefined"&&i>=0)?PRAYERS[i]:null; var u=location.origin+location.pathname; return P?u+"?p="+encodeURIComponent(P.id):u; }
  function share(e){ if(e){ e.preventDefault(); e.stopPropagation(); }
    var P=PRAYERS[i]||{}, u=link();
    if(navigator.share){ navigator.share({title:P.titel||"Bhakti Prayers Player",url:u}).catch(function(){}); return; }
    function ok(){ toast(TX[L()][0]); }
    if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(u).then(ok,function(){ fb(u); ok(); }); else { fb(u); ok(); } }
  function fb(u){ var t=document.createElement("textarea"); t.value=u; t.style.position="fixed"; t.style.opacity="0"; document.body.appendChild(t); t.select(); try{ document.execCommand("copy"); }catch(e){} t.remove(); }
  setInterval(function(){ var t=document.getElementById("lyrTitle"); if(!t||typeof i==="undefined"||i<0) return;
    var b=document.getElementById("bppShare");
    if(!b||b.parentNode!==t){ if(b) b.remove(); b=document.createElement("button"); b.type="button"; b.id="bppShare"; b.textContent="⤴"; b.addEventListener("click",share,true); t.appendChild(b); }
    b.title=b.ariaLabel=TX[L()][1]; },400);

  /* Direktlink */
  var q=new URLSearchParams(location.search), pid=q.get("p"); if(!pid) return;
  function go(){
    if(typeof PRAYERS==="undefined"||typeof play!=="function") return setTimeout(go,200);
    var idx=PRAYERS.findIndex(function(p){ return p.id===pid; }); if(idx<0) return;
    var l=(q.get("lang")||"").toLowerCase();
    if(LS.indexOf(l)<0){ l="en"; (navigator.languages||[navigator.language||""]).some(function(x){ x=String(x).slice(0,2).toLowerCase(); if(LS.indexOf(x)>=0){ l=x; return true; } }); }
    try{ if(lang!==l) setLang(l); }catch(e){}
    play(idx,false,false);
    var c=(q.get("chords")||"akk").toLowerCase(); c={off:"aus",stanza:"akk",line:"zeile","0":"aus","1":"akk"}[c]||c; if(["aus","akk","zeile"].indexOf(c)<0) c="akk";
    var n=0; while(chMode!==c && n++<3) toggleCh();
    var tr=q.get("tr")!=="0"; if(showDe!==tr) toggleDe();
    if(!autoScroll) toggleAuto();
    try{ history.replaceState(null,"",location.pathname+location.search); }catch(e){}
    setTimeout(function(){
      var b=document.getElementById("btnPlay"); if(!b) return;
      if(!isPlaying()) b.click();
      setTimeout(function(){ if(isPlaying()) return;
        var o=document.createElement("div"); o.id="bppTapPlay"; o.innerHTML="<span>▶</span>"+TX[L()][2]+"<small style='margin-top:8px;font-weight:400'>"+(PRAYERS[idx].titel||"")+"</small>";
        o.addEventListener("click",function(){ o.remove(); if(!isPlaying()) document.getElementById("btnPlay").click(); });
        document.body.appendChild(o); },1200);
    },700);
  }
  setTimeout(go,300);
})();
