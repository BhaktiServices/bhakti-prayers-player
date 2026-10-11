/* [Grok.com] Pitch sauber: Tonhoehe in Halbtoenen, ohne Verzerrung.
   Der Ton geht mit dem Tempo mit, wie ein Band. Ein reiner Kapo ohne Tempo hat verzerrt. Nur MP3. */
(function(){
  var capo=0, a=null;
  var mem={}; try{ mem=JSON.parse(localStorage.getItem("bpp-capo")||"{}")||{}; }catch(e){ mem={}; }
  function cur(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function mp3(){ return !!(a && a.getAttribute("src") && !(typeof ytOn!=="undefined" && ytOn)); }
  function save(n){ var P=cur(); if(!P) return; if(n) mem[P.id]=n; else delete mem[P.id]; try{ localStorage.setItem("bpp-capo", JSON.stringify(mem)); }catch(e){} }
  function want(){ var P=cur(); var n=P?mem[P.id]:0; n=n|0; return (n>=-12&&n<=12)?n:0; }
  function word(){ return (typeof UI!=="undefined" && UI[lang] && UI[lang].pitch)||"Pitch"; }
  function baseRate(){
    try{ if(typeof window.bppRateApply==="function"){ /* rate module stores its own */ } }catch(e){}
    var P=cur(); var m={}; try{ m=JSON.parse(localStorage.getItem("bpp-rate")||"{}")||{}; }catch(e){}
    var r=P?m[P.id]:1; return (typeof r==="number" && r>0)?r:1;
  }
  function apply(){
    if(!a) return;
    var n=mp3()?want():0;
    capo=n;
    var rate=baseRate()*Math.pow(2, n/12);
    var keep=n===0;
    try{ a.preservesPitch=keep; a.mozPreservesPitch=keep; a.webkitPreservesPitch=keep; }catch(e){}
    try{ a.playbackRate=rate; a.defaultPlaybackRate=rate; }catch(e){}
    upd();
  }
  function set(n){
    n=Math.max(-12, Math.min(12, n|0));
    capo=n; save(n); apply();
  }
  function step(d){ set(capo+(d||0)); }
  function upd(){
    var d=document.getElementById("btnCapoDown"), u=document.getElementById("btnCapoUp"), lab=document.getElementById("capoLab"), z=document.getElementById("btnCapoZero");
    if(!d) return;
    var on=mp3(); d.disabled=u.disabled=!on; if(z) z.disabled=!on;
    if(lab) lab.textContent=word()+" "+(capo>0?"+":"")+capo;
  }
  function btns(){
    if(document.getElementById("capoBox")) return;
    var box=document.getElementById("xpBox"); if(!box) return;
    var wrap=document.createElement("span"); wrap.id="capoBox"; wrap.style.cssText="display:flex;gap:4px;align-items:center";
    function b(id, txt, fn, title){ var el=document.createElement("button"); el.type="button"; el.id=id; el.textContent=txt; el.title=title; el.onclick=fn; return el; }
    wrap.appendChild(b("btnCapoDown","−",function(){ step(-1); },"Pitch −1, sauber"));
    var lab=document.createElement("span"); lab.id="capoLab"; lab.textContent="Pitch 0"; lab.style.cssText="min-width:5em;text-align:center;color:#e8c57a;font-size:.85rem";
    wrap.appendChild(lab);
    wrap.appendChild(b("btnCapoUp","+",function(){ step(1); },"Pitch +1, sauber"));
    wrap.appendChild(b("btnCapoZero","0",function(){ set(0); },"Pitch 0"));
    box.parentNode.insertBefore(wrap, box.nextSibling);
  }
  function boot(){ a=document.getElementById("a"); btns(); apply(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  setInterval(function(){ try{ if(!a) a=document.getElementById("a"); btns(); upd(); if(capo && a && Math.abs(a.playbackRate-baseRate()*Math.pow(2, capo/12))>0.01) apply(); }catch(e){} }, 600);
  window.bppCapoApply=apply;
})();
