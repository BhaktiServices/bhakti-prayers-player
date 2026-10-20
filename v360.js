/* [Grok-Bot] V3.60: Pfeil hoch/runter markiert Strophe fuer Strophe (dezenter Rahmen), ohne die MP3 zu bewegen.
   Enter springt (wie Antippen der Strophe). Ohne Enter: Markierung weg, Mitlesen 2 s nach dem letzten Tastendruck wieder.
   Standard- und Grossansicht (dort Vorschau-Kaertchen), auch mit Spalten. Nicht in Eingabefeldern/Menues/Hilfe. */
(function(){
  var css=document.createElement("style");
  css.textContent="#lyrics .stanza.bpp360m{outline:2px dashed rgba(201,163,106,.85);outline-offset:3px;border-radius:10px}"+
    "#bpp360fs{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:6;max-width:86vw;padding:8px 14px;border:2px dashed rgba(201,163,106,.85);border-radius:12px;"+
    "background:rgba(10,20,50,.88);color:#f3ead8;font:17px/1.35 system-ui,sans-serif;text-align:center;pointer-events:none}#bpp360fs b{color:#e2c48a;margin-right:6px}";
  document.head.appendChild(css);
  var k=-1, tm=null;
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f&&f.classList.contains("on")); }
  function sts(){ var L=document.getElementById("lyrics"); return L?[].slice.call(L.querySelectorAll(".stanza")):[]; }
  function cur(a){ for(var j=0;j<a.length;j++) if(a[j].classList.contains("on")) return j; return 0; }
  function blocked(e){ var t=e.target, n=t&&t.tagName;
    if(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable)) return true;
    if(t&&t.closest&&t.closest("[role=menu],[role=listbox],select,.menu,.dropdown,details[open]")) return true;
    if(document.getElementById("bppHelp")) return true;
    return e.altKey||e.ctrlKey||e.metaKey||e.shiftKey; }
  function clear(){ k=-1; sts().forEach(function(s){ s.classList.remove("bpp360m"); }); var c=document.getElementById("bpp360fs"); if(c) c.remove(); }
  function end(){ clear(); try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }
  function show(a){
    a.forEach(function(s,j){ s.classList.toggle("bpp360m", j===k); });
    if(fsOn()){ var f=document.getElementById("bppFs"), c=document.getElementById("bpp360fs");
      if(!c){ c=document.createElement("div"); c.id="bpp360fs"; c.setAttribute("role","status"); f.appendChild(c); }
      var first=a[k].querySelector(".sa,.line,.ln")||a[k], t=(first.textContent||"").trim().split("\n")[0].slice(0,80);
      c.innerHTML="<b>"+(k+1)+"/"+a.length+"</b>"; c.appendChild(document.createTextNode(t+" … ⏎")); }
    else a[k].scrollIntoView({block:"nearest"});
    window.bppManualAt=Date.now();
    clearTimeout(tm); tm=setTimeout(end,2000);
  }
  /* Enter = wie Antippen (v349): Strophe holen, dann MP3 an ihre Zeitmarke; ohne Zeitmarke Hinweis (v348) */
  function jump(t){ var a=sts(), st=a[t]; if(!st) return;
    if(fsOn()){ /* Grossbild: wie Pfeil-Knopf im Grossbild (explizit) */ var n=0; try{ n=window.bppFsState().k; }catch(x){}
      if(t!==n&&window.bppFsStep){ window.bppFsStep(t-n); var m=Date.now(); window.bppManualAt=m; window.bppExplicitM=m; } return; }
    window.bppManualAt=Date.now()-1000;
    var r=st.getBoundingClientRect(), x=r.left+Math.min(30,r.width/2), y=r.top+Math.min(20,r.height/2), o={bubbles:true,cancelable:true,clientX:x,clientY:y,pointerType:"mouse",isPrimary:true};
    var tg=document.elementFromPoint(x,y); if(!tg||!st.contains(tg)) tg=st;
    tg.dispatchEvent(new PointerEvent("pointerdown",o)); tg.dispatchEvent(new PointerEvent("pointerup",o)); tg.dispatchEvent(new MouseEvent("click",o)); }
  window.addEventListener("keydown",function(e){
    var up=e.key==="ArrowUp", dn=e.key==="ArrowDown", en=e.key==="Enter";
    if(!up&&!dn&&!(en&&k>=0)) return;
    if(blocked(e)) return;
    var a=sts(); if(!a.length) return;
    if(en){ e.preventDefault(); e.stopImmediatePropagation(); var kk=k; clearTimeout(tm); clear(); jump(kk); return; }
    e.preventDefault(); e.stopImmediatePropagation();
    if(k<0) k=cur(a);
    k=Math.max(0,Math.min(a.length-1,k+(dn?1:-1)));
    show(a);
  },true);
  window.bpp360=function(){ return k; };
})();
