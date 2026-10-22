/* [Grok-Bot] V3.82: Atma-Bhog-Knopf direkt unter "Bhakti Prayers Player", rechtsbuendig mit dem rechten Rand des Titeltextes (nicht Seitenrand),
   in der Zeile der zentrierten Versionsnummer. Absolut positioniert (verschiebt nichts); Lage wird bei Groessenaenderung neu gerechnet. */
window.BPP_BUILD="3.82"; window.BPP_SHOW="3.82";
(function(){
  if(window.bppV382) return; window.bppV382=1;
  var st=document.createElement("style");
  st.textContent="header h1{position:relative!important}"+
    "header h1 #bppAtma{position:absolute!important;order:0!important;margin:0!important;font-size:12px!important;line-height:1.2!important;padding:2px 9px!important;white-space:nowrap;z-index:2;letter-spacing:.04em}";
  document.head.appendChild(st);
  function textRect(h){ var r=null; [].forEach.call(h.childNodes,function(n){ if(n.nodeType===3&&/Bhakti/i.test(n.nodeValue)){ var g=document.createRange(); g.selectNodeContents(n); r=g.getBoundingClientRect(); } }); return r; }
  function place(){
    var h=document.querySelector("header h1"), a=document.getElementById("bppAtma"), v=h&&h.querySelector(".ver"); if(!h||!a||!v||a.parentNode!==h) return;
    var tr=textRect(h); if(!tr||!tr.width) return; var hr=h.getBoundingClientRect(), vg=document.createRange(); vg.selectNodeContents(v); var vr=vg.getBoundingClientRect(); if(!vr.width) vr=v.getBoundingClientRect();
    var right=Math.max(0,Math.round(hr.right-tr.right)), top=Math.round(vr.top-hr.top+(vr.height-a.offsetHeight)/2);
    /* nicht mit der Versionsnummer ueberlappen */
    var aw=a.offsetWidth, left=hr.width-right-aw, vl=vr.left-hr.left, vrr=vr.right-hr.left;
    if(left<vrr+8){ top=Math.round(vr.bottom-hr.top+4); }
    if(a.style.right!==right+"px") a.style.right=right+"px";
    if(a.style.top!==top+"px") a.style.top=top+"px";
    var need=(left<vrr+8)?(a.offsetHeight+6):0; var pb=need+"px"; if(h.style.paddingBottom!==pb) h.style.paddingBottom=pb;
  }
  addEventListener("resize",function(){ setTimeout(place,50); }); setInterval(place,500);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(place);
})();
