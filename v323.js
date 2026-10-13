/* [Grok-Bot] V3.23: Nrsimha Kavaca: "oṁ namo bhagavate nārasiṁhāya" in EINER Zeile (Str. 38: Zeile 1+2 zusammen; Str. 43: "nārasiṁhāya" an Zeile 1).
   Zeilenakkorde zusammengefuehrt (keine Akkorde verloren), Strophen/Timing/Uebersetzung unveraendert.
   Anzeige: diese Zeile nowrap, Schrift wird nur fuer diese Zeile verkleinert, falls sie nicht passt (Standard + Grossbild). */
window.BPP_BUILD="3.23"; window.BPP_SHOW="3.23";
(function(){
  var RX=/namo bhagavate nārasiṁhāya/;
  function data(){
    if(typeof PRAYERS==="undefined") return false;
    var K=PRAYERS.find(function(p){ return p.id==="kavacham"; }); if(!K||!K.zeilen) return false; var ch=false;
    K.zeilen.forEach(function(z){
      var L=String(z.sa||"").split("\n");
      if(L[0]==="oṁ namo bhagavate"&&L[1]==="nārasiṁhāya"){
        L.splice(0,2,"oṁ namo bhagavate nārasiṁhāya"); z.sa=L.join("\n");
        if(z.lineCh&&z.lineCh.length===L.length+1){ var a=z.lineCh[0]||"", b=z.lineCh[1]||""; z.lineCh.splice(0,2,a+Array(Math.max(2,19-a.length)).join(" ")+b); }
        ch=true;
      } else if(L[0]==="oṁ kṣrauṁ namo bhagavate"&&/^nārasiṁhāya /.test(L[1]||"")){
        L[0]="oṁ kṣrauṁ namo bhagavate nārasiṁhāya"; L[1]=L[1].replace(/^nārasiṁhāya /,""); z.sa=L.join("\n"); ch=true;
      }
    });
    return ch;
  }
  function run(){ try{ if(data()&&typeof i!=="undefined"&&PRAYERS[i]&&PRAYERS[i].id==="kavacham"&&typeof paintLyrics==="function") paintLyrics(); }catch(e){} }
  run(); setTimeout(run,600); setInterval(run,1500);
  var st=document.createElement("style"); st.textContent=".bpp1z{white-space:nowrap!important}"; document.head.appendChild(st);
  function fit(){
    document.querySelectorAll("#lyrics .ln, #bppFs .vl").forEach(function(e){
      if(!RX.test(e.textContent)) return;
      if(!e.classList.contains("bpp1z")) e.classList.add("bpp1z");
      e.style.fontSize=""; e.style.display=e.classList.contains("ln")?"block":"";
      var par=e.parentNode, avail=(par&&par.clientWidth)||0; if(!avail) return;
      var w=e.scrollWidth; if(w>avail+1) e.style.fontSize=(Math.floor(100*avail/w*0.98)/100)+"em";
    });
  }
  var q=0; function sched(){ if(q) return; q=requestAnimationFrame(function(){ q=0; fit(); }); }
  new MutationObserver(function(m){ for(var k=0;k<m.length;k++){ var t=m[k].target; if(t.nodeType===1&&(t.id==="lyrics"||t.closest&&t.closest("#lyrics,#bppFs"))){ sched(); return; } } }).observe(document.body,{childList:true,subtree:true});
  window.addEventListener("resize",sched); setInterval(fit,2000);
})();
