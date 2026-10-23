/* [Grok-Bot] V4.01: Gross dreht mit dem Handy (S21/DuckDuckGo). Am Handy keine Ausrichtungs-Sperre mehr: screen.orientation.lock() wird
   abgeschaltet und beim Eintritt in Gross unlock() aufgerufen; die CSS-Drehung aus v397.js gilt nur noch als Erst-Ansicht und endet bei jeder
   echten Lageaenderung. Bei resize, orientationchange und screen.orientation change wird neu gelayoutet. */
// build via v402
(function(){
  if(window.bppV401) return; window.bppV401=1;
  var coarse=window.matchMedia("(pointer:coarse)");
  function phone(){ return coarse.matches && Math.min(screen.width||9999, screen.height||9999)<=600; }
  var o=screen.orientation;
  if(o&&typeof o.lock==="function"){ var orig=o.lock.bind(o);
    try{ o.lock=function(x){ if(phone()) return Promise.reject(new Error("bpp401: keine Sperre")); return orig(x); }; }catch(e){} }
  function free(){ try{ if(o&&typeof o.unlock==="function") o.unlock(); }catch(e){} }
  document.addEventListener("fullscreenchange",function(){ if(phone()) free(); });
  var last="";
  function relayout(){ var k=innerWidth+"x"+innerHeight; if(k===last) return; last=k; if(phone()) free();
    setTimeout(function(){ dispatchEvent(new Event("resize")); },120); }
  addEventListener("orientationchange",function(){ setTimeout(relayout,60); setTimeout(relayout,400); });
  try{ o&&o.addEventListener("change",function(){ setTimeout(relayout,60); setTimeout(relayout,400); }); }catch(e){}
  try{ matchMedia("(orientation: portrait)").addEventListener("change",function(){ setTimeout(relayout,60); }); }catch(e){}
})();
