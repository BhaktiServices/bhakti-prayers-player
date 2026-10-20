/* [Grok-Bot] V3.59: Leertaste = Play/Pause (v228 hatte sie verschluckt), ✕ im Grossbild-Menue immer sichtbar, Hinweis wenn 2/3 Spalten nicht passen. */
(function(){
  function $(id){ return document.getElementById(id); }
  function typing(t){ var n=t&&t.tagName; return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable); }
  function fsOn(){ try{ var s=window.bppFsState&&window.bppFsState(); return !!(s&&s.on); }catch(e){ return false; } }
  /* 1) Leertaste: window-capture laeuft vor v228 (document-capture). Strg+Leertaste bleibt bei v228 (Gross an/aus). */
  window.addEventListener("keydown",function(e){
    if(e.code!=="Space"&&e.key!==" ") return;
    if(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey||typing(e.target)) return;
    e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation();
    if(e.repeat) return;
    if(document.activeElement&&document.activeElement.blur&&document.activeElement.tagName==="BUTTON") document.activeElement.blur();
    var b=$("btnPlay"); if(b) b.click();
    if(fsOn()){ var bar=$("bppFsBar"); if(bar){ bar.classList.remove("hid"); setTimeout(function(){ bar.classList.add("hid"); },3000); } }
  },true);
  /* 2) ✕ in der Grossbild-Leiste auch im kurzen Menue */
  function fx(){ var c=$("bppFsClose"); if(c&&c.style.getPropertyValue("display")!=="inline-block") c.style.setProperty("display","inline-block","important"); }
  setInterval(fx,400);
  /* 3) Spalten-Hinweis */
  var M={de:"Für {n} Spalten ist der Bildschirm zu schmal.",en:"The screen is too narrow for {n} columns.",fr:"L’écran est trop étroit pour {n} colonnes.",es:"La pantalla es demasiado estrecha para {n} columnas.",ru:"Экран слишком узкий для {n} колонок.",hi:"{n} कॉलम के लिए स्क्रीन बहुत संकरी है।",pt:"A tela é estreita demais para {n} colunas."};
  M.ru="Экран слишком узкий для {n} колонок."; 
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return M[l]?l:"en"; }
  function maxCols(){ var w=window.innerWidth||1000; return w<700?1:(w<1100?2:3); }
  function cur(){ var v=parseInt(localStorage.getItem("bpp-cols")||"1",10); v=v>=1&&v<=3?v:1; return Math.min(v,maxCols()); }
  var tt=null;
  function toast(n){ var h=$("bppNoTime"); if(!h){ h=document.createElement("div"); h.id="bppNoTime"; h.setAttribute("role","status"); }
    if(h.parentNode!==document.body) document.body.appendChild(h);
    var s=M[lg()].replace("{n}",n); if(lg()==="ru"&&n===2) s=s.replace("колонок","колонки");
    h.textContent=s; void h.offsetWidth; h.classList.add("on"); clearTimeout(tt); tt=setTimeout(function(){ h.classList.remove("on"); },3000); }
  document.addEventListener("click",function(e){ var b=e.target&&e.target.closest&&e.target.closest("#btnCols"); if(!b) return;
    var n=cur(), mx=maxCols(); if(n>=mx&&n<3) toast(n+1); },true);
  window.bppV359Cols=toast;
})();
/* [Grok-Bot] V3.59: Hover-Texte flackerten (aeltere Skripte setzen Titel ohne "(Taste)", v352/v358 mit -> alle 0,7 s Wechsel).
   Regel: ein Titel mit Tastenhinweis wird nicht durch einen Titel ohne Tastenhinweis ersetzt; sonst nur bei echter Aenderung schreiben. */
(function(){
  var RX=/\s\([^()]{1,8}\)$/, D=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"title"), SA=Element.prototype.setAttribute;
  function ok(el,a,v){ var o=el.getAttribute(a); if(o===v) return false; v=String(v);
    if(o&&RX.test(o)&&!RX.test(v)) return false; return true; }
  function guard(el){ if(el.__v359) return; el.__v359=1;
    Object.defineProperty(el,"title",{configurable:true,get:function(){ return D.get.call(this); },set:function(v){ if(ok(this,"title",v)) D.set.call(this,v); }});
    el.setAttribute=function(a,v){ if((a==="title"||a==="aria-label")&&!ok(this,a,v)) return; return SA.call(this,a,v); }; }
  function all(){ [].forEach.call(document.querySelectorAll("button[id]"),guard); }
  all(); setInterval(all,500);
})();
/* [Grok-Bot] V3.59: Tastenkuerzel lassen den sichtbaren Knopf kurz aufleuchten (250 ms Glow, nur box-shadow/filter, kein Layout-Sprung).
   Tastenkuerzel loesen b.click() aus (nicht "trusted") -> genau diese Klicks leuchten; echte Maus-/Touch-Klicks nicht. */
(function(){
  var st=document.createElement("style");
  st.textContent=".bpp359g{box-shadow:0 0 12px 3px rgba(255,214,120,.9)!important;outline:2px solid rgba(255,214,120,.95)!important;outline-offset:1px!important;filter:brightness(1.2)}";
  document.head.appendChild(st);
  var map={btnPlay:"bppFsPlay"};
  function fl(b){ if(!b||b.offsetParent===null) return; b.classList.remove("bpp359g"); void b.offsetWidth; b.classList.add("bpp359g");
    clearTimeout(b.__g359); b.__g359=setTimeout(function(){ b.classList.remove("bpp359g"); },260); }
  document.addEventListener("click",function(e){ if(e.isTrusted) return;
    var b=e.target&&e.target.closest&&e.target.closest("button"); if(!b) return;
    fl(b); if(map[b.id]) fl(document.getElementById(map[b.id])); },true);
})();
