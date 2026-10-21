/* [Grok-Bot] V3.45: Atma-Bhog-Knopf - eigener 3-zeiliger Tooltip im AtmaBhog-Stil (Navy/Gold #D6BF90, Figtree) statt Browser-title.
   Hover/Fokus am Rechner, langes Druecken am Handy (kurzes Tippen oeffnet wie bisher den Link). Bleibt im Bildschirm (Position und Schrift
   werden angepasst), schwebt ueber dem Inhalt (position:fixed) - es springt nichts. */
window.bppV345=1;
window.BPP_BUILD="3.70"; window.BPP_SHOW="3.70";
(function(){
  var T={
    de:["Im Atma Bhog findet Ihr gut sortiert","mit feiner Bedienoberfläche alle Kirtans, Abhangs,","Bhajans und Prayers von Bhakti Marga … enjoy."],
    en:["In Atma Bhog you will find, well sorted","and with a fine interface, all the kirtans, abhangs,","bhajans and prayers of Bhakti Marga … enjoy."],
    fr:["Dans Atma Bhog, vous trouverez, bien classés","et avec une interface soignée, tous les kirtans, abhangs,","bhajans et prières de Bhakti Marga … enjoy."],
    es:["En Atma Bhog encontraréis, bien ordenados","y con una interfaz cuidada, todos los kirtans, abhangs,","bhajans y oraciones de Bhakti Marga … enjoy."],
    ru:["В Atma Bhog вы найдёте, удобно рассортированные","и с красивым интерфейсом, все киртаны, абханги,","бхаджаны и молитвы Бхакти Марги … enjoy."],
    hi:["आत्म भोग में सुव्यवस्थित रूप से","और सुंदर इंटरफ़ेस के साथ सभी कीर्तन, अभंग,","भजन और भक्ति मार्ग की प्रार्थनाएँ मिलेंगी … enjoy."],pt:["No Atma Bhog você encontra, bem organizados","e com uma bela interface, todos os kirtans, abhangs,","bhajans e orações do Bhakti Marga … aproveite."]
  };
  var css=document.createElement("style");
  css.textContent="#bppAtmaTip{position:fixed;z-index:2147483600;left:0;top:0;padding:9px 14px;border:1px solid #D6BF90;border-radius:12px;background:#041236;color:#D6BF90;"+
    "font:500 13px/1.45 Figtree,'Source Sans 3',sans-serif;letter-spacing:.01em;box-shadow:0 8px 26px rgba(0,0,0,.5);pointer-events:none;opacity:0;transition:opacity .15s;white-space:nowrap;text-align:left}"+
    "#bppAtmaTip.on{opacity:1}#bppAtmaTip div{white-space:nowrap}"+
    "#bppAtmaTip:before{content:'';position:absolute;top:-6px;left:var(--ax,20px);width:10px;height:10px;background:#041236;border-left:1px solid #D6BF90;border-top:1px solid #D6BF90;transform:rotate(45deg)}"+
    "#bppAtma{-webkit-touch-callout:none}";
  document.head.appendChild(css);
  var tip=null, lpT=null, lpFired=false, hideT=null;
  function L(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?l:"en"; }
  function show(a){
    clearTimeout(hideT);
    if(!tip){ tip=document.createElement("div"); tip.id="bppAtmaTip"; tip.setAttribute("role","tooltip"); document.body.appendChild(tip); }
    tip.innerHTML=T[L()].map(function(s){ return "<div>"+s+"</div>"; }).join("");
    tip.style.fontSize="13px"; tip.style.left="0px"; tip.style.top="-999px";
    var vw=document.documentElement.clientWidth, M=8, fs=13;
    while(tip.offsetWidth>vw-2*M && fs>9){ fs-=0.5; tip.style.fontSize=fs+"px"; }
    var r=a.getBoundingClientRect(), w=tip.offsetWidth;
    var left=Math.max(M, Math.min(r.left+r.width/2-w/2, vw-M-w));
    tip.style.left=Math.round(left)+"px"; tip.style.top=Math.round(r.bottom+10)+"px";
    tip.style.setProperty("--ax", Math.round(Math.max(10, Math.min(w-20, r.left+r.width/2-left-5)))+"px");
    tip.classList.add("on");
  }
  function hide(d){ clearTimeout(hideT); hideT=setTimeout(function(){ if(tip) tip.classList.remove("on"); }, d||0); }
  function bind(){
    var a=document.getElementById("bppAtma"); if(!a || a.__v345) return; a.__v345=1;
    a.removeAttribute("title");
    a.addEventListener("mouseenter",function(){ show(a); }); a.addEventListener("mouseleave",function(){ hide(80); });
    a.addEventListener("focus",function(){ show(a); }); a.addEventListener("blur",function(){ hide(0); });
    a.addEventListener("touchstart",function(){ lpFired=false; clearTimeout(lpT); lpT=setTimeout(function(){ lpFired=true; show(a); }, 450); },{passive:true});
    a.addEventListener("touchmove",function(){ clearTimeout(lpT); },{passive:true});
    a.addEventListener("touchend",function(){ clearTimeout(lpT); if(lpFired) hide(3000); },{passive:true});
    a.addEventListener("contextmenu",function(e){ if(lpFired||matchMedia("(hover:none)").matches) e.preventDefault(); });
    a.addEventListener("click",function(e){ if(lpFired){ e.preventDefault(); lpFired=false; } }, true);
  }
  window.addEventListener("scroll",function(){ hide(0); },{passive:true});
  window.addEventListener("resize",function(){ hide(0); });
  bind(); setInterval(bind,500);
})();
