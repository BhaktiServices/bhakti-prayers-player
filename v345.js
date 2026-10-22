/* [Grok-Bot] V3.45: Atma-Bhog-Knopf - eigener 3-zeiliger Tooltip im AtmaBhog-Stil (Navy/Gold #D6BF90, Figtree) statt Browser-title.
   Hover/Fokus am Rechner, langes Druecken am Handy (kurzes Tippen oeffnet wie bisher den Link). Bleibt im Bildschirm (Position und Schrift
   werden angepasst), schwebt ueber dem Inhalt (position:fixed) - es springt nichts. */
window.bppV345=1;
window.BPP_BUILD="3.94"; window.BPP_SHOW="3.94";
(function(){
  /* [Grok-Bot] V3.93: neuer 4-zeiliger Text (de vom Nutzer, andere Sprachen sinngemaesse UI-Uebersetzung) */
  var T={"de": ["Entdecke eine einmalige Schatzkammer spiritueller Klänge!", "Von berührenden Bhajans bis zu kraftvollen Gebeten – Atma Bhog vereint Musik für Herz und Seele.", "Lass dich inspirieren, sing mit und spüre die Freude hingebungsvoller Musik.", "Atma Bhog: Wo jede Melodie eine Brücke zum Göttlichen schlägt."], "en": ["Discover a unique treasury of spiritual sounds!", "From moving bhajans to powerful prayers – Atma Bhog brings together music for heart and soul.", "Be inspired, sing along and feel the joy of devotional music.", "Atma Bhog: where every melody builds a bridge to the Divine."], "fr": ["Découvre un trésor unique de sons spirituels !", "Des bhajans émouvants aux prières puissantes – Atma Bhog réunit la musique pour le cœur et l’âme.", "Laisse-toi inspirer, chante avec nous et ressens la joie de la musique dévotionnelle.", "Atma Bhog : là où chaque mélodie jette un pont vers le Divin."], "es": ["¡Descubre un tesoro único de sonidos espirituales!", "De bhajans conmovedores a oraciones poderosas: Atma Bhog reúne música para el corazón y el alma.", "Déjate inspirar, canta y siente la alegría de la música devocional.", "Atma Bhog: donde cada melodía tiende un puente hacia lo Divino."], "ru": ["Открой уникальную сокровищницу духовных звуков!", "От трогательных бхаджанов до сильных молитв – Atma Bhog объединяет музыку для сердца и души.", "Вдохновляйся, пой вместе с нами и почувствуй радость преданной музыки.", "Atma Bhog: где каждая мелодия становится мостом к Божественному."], "hi": ["आध्यात्मिक ध्वनियों का एक अनोखा ख़ज़ाना खोजें!", "दिल को छू लेने वाले भजनों से लेकर शक्तिशाली प्रार्थनाओं तक – आत्म भोग हृदय और आत्मा के लिए संगीत को एक साथ लाता है।", "प्रेरित हों, साथ गाएँ और भक्ति संगीत का आनंद महसूस करें।", "आत्म भोग: जहाँ हर धुन ईश्वर तक एक सेतु बनाती है।"], "pt": ["Descubra um tesouro único de sons espirituais!", "De bhajans comoventes a orações poderosas – o Atma Bhog reúne música para o coração e a alma.", "Deixe-se inspirar, cante junto e sinta a alegria da música devocional.", "Atma Bhog: onde cada melodia constrói uma ponte para o Divino."]};
  var css=document.createElement("style");
  css.textContent="#bppAtmaTip{position:fixed;z-index:2147483600;left:0;top:0;padding:9px 14px;border:1px solid #D6BF90;border-radius:12px;background:#041236;color:#D6BF90;"+
    "font:500 13px/1.45 Figtree,'Source Sans 3',sans-serif;letter-spacing:.01em;box-shadow:0 8px 26px rgba(0,0,0,.5);pointer-events:none;opacity:0;transition:opacity .15s;white-space:normal;text-align:left;max-width:min(460px,calc(100vw - 16px));box-sizing:border-box}"+
    "#bppAtmaTip.on{opacity:1}#bppAtmaTip div{white-space:normal;overflow-wrap:anywhere}#bppAtmaTip div+div{margin-top:3px}#bppAtmaTip div:first-child{font-weight:700;color:#F1E3C0}"+
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
    /* V3.93: umbrechen statt verkleinern */
    var r=a.getBoundingClientRect(), w=tip.offsetWidth;
    var left=Math.max(M, Math.min(r.left+r.width/2-w/2, vw-M-w));
    tip.style.left=Math.round(left)+"px"; var h=tip.offsetHeight, vh=document.documentElement.clientHeight, top=r.bottom+10; if(top+h>vh-M && r.top-10-h>=M) top=r.top-10-h; tip.style.top=Math.round(Math.max(M,top))+"px";
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
