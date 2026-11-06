/* [Grok-Bot] V4.85: Rec-Farben nach Nutzerwunsch: Mtj rosa (#b0477a/#e07aa8), Pbj blau (#1f4e86/#4f86c6),
   Schrift weiss; Gold-Ring (.on/.spnOn) bleibt. Ersetzt die Farben aus v484; nur Farbe, keine Position/Logik. critical=false. */
window.BPP_BUILD="4.85"; window.BPP_SHOW="4.85";
(function(){
  if(window.bppV485) return; window.bppV485=1;
  var C={mtj:["#b0477a","#e07aa8"],pbj:["#1f4e86","#4f86c6"]}, G="#e0b45a", css="";
  Object.keys(C).forEach(function(k){
    var s="html button[id^=bppRec][data-rec="+k+"]";
    css+=s+","+s+".pbj,"+s+".on,"+s+".spnOn{background:"+C[k][0]+"!important;border-color:"+C[k][1]+"!important;color:#fff!important}";
    css+=s+".on,"+s+".spnOn{box-shadow:0 0 0 2px "+G+"!important}";
  });
  var st=document.createElement("style"); st.id="bppV485css"; st.textContent=css;
  (document.head||document.documentElement).appendChild(st);
  function tag(){
    var L=document.querySelectorAll("button[id^=bppRec]");
    for(var i=0;i<L.length;i++){
      var b=L[i], t=b.textContent||"", r=/Pbj/i.test(t)?"pbj":(/Mtj/i.test(t)?"mtj":"");
      if(r){ if(b.getAttribute("data-rec")!==r) b.setAttribute("data-rec",r); }
      else if(b.hasAttribute("data-rec")) b.removeAttribute("data-rec");
    }
  }
  function start(){ tag(); try{ new MutationObserver(tag).observe(document.body,{subtree:true,childList:true,characterData:true}); }catch(e){} }
  if(document.body) start(); else document.addEventListener("DOMContentLoaded",start);
  setInterval(tag,500);
})();
