/* [Grok-Bot] V2.47: Abschied am Ende der Wiedergabe: Jukebox (start.jpg) mit Text in der eingestellten Sprache,
   blendet in ca. 3 s langsam aus, Tippen/Taste ueberspringt. Kommt, wenn ein Stueck zu Ende ist und danach nichts weiterspielt (MP3 oder YouTube). */
window.BPP_BUILD="2.47"; window.BPP_SHOW="2.47";
(function(){
  var TXT={en:"Study and sing the Bhakti Marga Prayers – see you soon!",de:"Lerne und singe die Bhakti-Marga-Gebete – bis bald!",
    fr:"Étudiez et chantez les prières de Bhakti Marga – à bientôt !",es:"Estudia y canta las oraciones de Bhakti Marga – ¡hasta pronto!",
    ru:"Изучайте и пойте молитвы Бхакти Марги – до скорой встречи!",hi:"भक्ति मार्ग की प्रार्थनाएँ सीखें और गाएँ – फिर मिलेंगे!"};
  var st=document.createElement("style");
  st.textContent="#bppBye{position:fixed;inset:0;z-index:2147483600;background:#1a120c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;opacity:1;transition:opacity 2.2s ease-in .8s;cursor:pointer}"+
    "#bppBye.out{opacity:0}#bppBye img{width:min(70vw,560px);max-height:62vh;object-fit:contain;border-radius:12px}"+
    "#bppBye p{margin:0 16px;color:#f3e6c8;font-size:clamp(16px,2.6vw,24px);text-align:center;line-height:1.4}#bppBye b{display:block;color:#e0b45a;margin-top:6px}";
  document.head.appendChild(st);
  var shown=false, tmr=null;
  function L(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return TXT[l]?l:"en"; }
  function bye(){
    if(shown) return; shown=true;
    var d=document.createElement("div"); d.id="bppBye";
    d.innerHTML='<img src="start.jpg?v=1" alt=""><p>'+TXT[L()]+'<b>Jai Gurudev</b></p>';
    document.body.appendChild(d);
    var done=false; function close(){ if(done) return; done=true; if(d.parentNode) d.parentNode.removeChild(d); setTimeout(function(){ shown=false; }, 500); }
    d.addEventListener("pointerdown", close); window.addEventListener("keydown", close, {once:true});
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ d.classList.add("out"); }); });
    setTimeout(close, 3100);
  }
  function playing(){ try{ return typeof isPlaying==="function" && isPlaying(); }catch(e){ return false; } }
  function ended(){ if(tmr) clearTimeout(tmr); tmr=setTimeout(function(){ tmr=null; if(!playing()) bye(); }, 1800); }
  function hook(){ var a=document.getElementById("a"); if(a && !a.__bye){ a.__bye=1; a.addEventListener("ended", ended); } }
  hook(); document.addEventListener("DOMContentLoaded", hook);
  window.addEventListener("message", function(e){
    var d=e.data; if(typeof d==="string"){ try{ d=JSON.parse(d); }catch(err){ return; } }
    if(!d || typeof ytOn==="undefined" || !ytOn) return;
    var s=(d.event==="onStateChange")?d.info:((d.event==="infoDelivery"&&d.info)?d.info.playerState:undefined);
    if(s===0) ended();
  });
  window.bppBye=bye;
})();
