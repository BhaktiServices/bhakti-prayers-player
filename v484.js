/* [Grok-Bot] V4.84: Rec-Tasten Mtj/Pbj farblich klar getrennt (Mtj blau, Pbj violett), Text weiss/monochrom.
   Gold bleibt Aktiv-Kennzeichnung (.on/.spnOn): goldener Ring (box-shadow, keine Layout-Aenderung) + Aufnahmefarbe.
   Nur Farbe: keine Position, Groesse oder Logik; kennzeichnet Tasten per data-rec aus ihrem Text. critical=false. */
(function(){
window.BPP_BUILD="4.84"; window.BPP_SHOW="4.84";
  if(window.bppV484) return; window.bppV484=1;
  var C={mtj:["#1f4e86","#4f86c6"],pbj:["#5a2f86","#9066c4"]}, G="#e0b45a", css="";
  Object.keys(C).forEach(function(k){
    var s="html button[id^=bppRec][data-rec="+k+"]";
    css+=s+","+s+".pbj,"+s+".on,"+s+".spnOn{background:"+C[k][0]+"!important;border-color:"+C[k][1]+"!important;color:#fff!important}";
    css+=s+".on,"+s+".spnOn{box-shadow:0 0 0 2px "+G+"!important}";
  });
  var st=document.createElement("style"); st.id="bppV484css"; st.textContent=css;
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
