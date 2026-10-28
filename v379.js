/* [Grok-Bot] V3.79: Drei Stile (theme-v379.css): Morgen (hell), Abend (warm-golden), Nacht (bisheriges Navy). Knopf oben rechts vor der Sprache.
   Modi Auto -> Morgen -> Abend -> Nacht -> Auto, Wahl in localStorage "bpp-theme". Auto: Sonnenauf-/untergang und Wetter von Open-Meteo (frei, ohne Key),
   Position ungefaehr ueber geojs.io (IP, ohne Berechtigungsdialog; wird schon fuer die Orte-Statistik genutzt), Cache 30 min.
   Morgen = Sonnenaufgang bis 90 min vor Sonnenuntergang, Abend = bis 60 min nach Sonnenuntergang, sonst Nacht. Bewoelkung >= 75 %, Nebel,
   Niesel/Regen/Schnee/Gewitter -> gedaempfte Variante. Ohne Netz: letzte bekannte Sonnenzeiten bzw. Rechnung aus Datum + Zeitzone.
   Ausserdem: Hilfe wird beim Sprachwechsel neu aufgebaut (alle Zusatzabsaetze in der neuen Sprache). */
window.BPP_BUILD="3.79"; window.BPP_SHOW="3.79";
(function(){
  if(window.bppV379) return; window.bppV379=1;
  if(!document.querySelector('link[href^="theme-v379.css"]')){ var l=document.createElement("link"); l.rel="stylesheet"; l.href="theme-v379.css?v=1"; document.head.appendChild(l); }
  var MODES=["auto","morgen","abend","nacht"], SYM={auto:"A",morgen:"\u263c\ufe0e",abend:"\u25d0\ufe0e",nacht:"\u263e\ufe0e"};
  var N={de:{auto:"Auto",morgen:"Morgen (hell)",abend:"Abend (warm)",nacht:"Nacht (dunkel)",st:"Stil",now:"jetzt",cl:"Klick"},
    en:{auto:"Auto",morgen:"Morning (light)",abend:"Evening (warm)",nacht:"Night (dark)",st:"Style",now:"now",cl:"click"},
    fr:{auto:"Auto",morgen:"Matin (clair)",abend:"Soir (chaud)",nacht:"Nuit (sombre)",st:"Style",now:"actuel",cl:"clic"},
    es:{auto:"Auto",morgen:"Mañana (claro)",abend:"Tarde (cálido)",nacht:"Noche (oscuro)",st:"Estilo",now:"ahora",cl:"clic"},
    ru:{auto:"Авто",morgen:"Утро (светлый)",abend:"Вечер (тёплый)",nacht:"Ночь (тёмный)",st:"Стиль",now:"сейчас",cl:"нажатие"},
    hi:{auto:"स्वतः",morgen:"सुबह (हल्का)",abend:"शाम (गर्म)",nacht:"रात (गहरा)",st:"शैली",now:"अभी",cl:"क्लिक"},
    pt:{auto:"Auto",morgen:"Manhã (claro)",abend:"Noite cedo (quente)",nacht:"Noite (escuro)",st:"Estilo",now:"agora",cl:"clique"}};
  /* [Grok-Bot] V3.94: Saetze zu Klick/Auto/Open-Meteo entfernt */ var HLP={de:"<b>Stil</b> (unter Sprachwahl): Auto, Morgen, Abend oder Nacht. <i>(von Grok ergänzt)</i>",
    en:"<b>Style</b> (button under the language selector, top right): Auto, Morning, Evening or Night. <i>(added by Grok)</i>",
    fr:"<b>Style</b> (bouton sous le sélecteur de langue, en haut à droite) : Auto, Matin, Soir ou Nuit. <i>(ajouté par Grok)</i>",
    es:"<b>Estilo</b> (botón bajo el selector de idioma, arriba a la derecha): Auto, Mañana, Tarde o Noche. <i>(añadido por Grok)</i>",
    ru:"<b>Стиль</b> (кнопка под выбором языка, вверху справа): Авто, Утро, Вечер или Ночь. <i>(добавлено Grok)</i>",
    hi:"<b>शैली</b> (भाषा चयन के नीचे, ऊपर दाईं ओर बटन): स्वतः, सुबह, शाम या रात। <i>(Grok द्वारा जोड़ा गया)</i>",
    pt:"<b>Estilo</b> (botão sob o seletor de idioma, canto superior direito): Auto, Manhã, Noite cedo ou Noite. <i>(acrescentado por Grok)</i>"};
  function lg(){ var x=(typeof lang!=="undefined"&&lang)||"en"; return N[x]?x:"en"; }
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  var mode=get("bpp-theme"); if(MODES.indexOf(mode)<0) mode="auto";
  var W=null; try{ W=JSON.parse(get("bpp-wx379")||"null"); }catch(e){}
  /* Sonnenzeiten ohne Netz (NOAA-Naeherung) */
  function sunCalc(lat,lon,d){ var rad=Math.PI/180, n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);
    var g=2*Math.PI/365*(n-1), eq=229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g));
    var dec=0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g);
    var c=(Math.cos(90.833*rad)/(Math.cos(lat*rad)*Math.cos(dec))-Math.tan(lat*rad)*Math.tan(dec)); if(c>1||c<-1) return null;
    var ha=Math.acos(c)/rad, mid=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())).getTime();
    return {rise:mid+(720-4*(lon+ha)-eq)*6e4, set:mid+(720-4*(lon-ha)-eq)*6e4}; }
  function guessPos(){ if(W&&W.lat!=null) return [W.lat,W.lon]; var off=-new Date(new Date().getFullYear(),0,1).getTimezoneOffset()/60; return [48, off*15]; } /* [Grok-Bot] V3.99: Normalzeit statt Sommerzeit */
  function sun(){ var now=Date.now(), today=new Date().toDateString();
    if(W&&W.day===today&&W.rise&&W.set) return {rise:W.rise,set:W.set};
    var p=guessPos(); return sunCalc(p[0],p[1],new Date())||{rise:new Date().setHours(7,0,0,0),set:new Date().setHours(19,0,0,0)}; }
  /* [Grok-Bot] V3.99: Morgen ab 60 min vor Sonnenaufgang (spaetestens 05:00), Abend ab 90 min vor Sonnenuntergang (spaetestens 17:00)
     bis 60 min nach Sonnenuntergang (mindestens bis 21:00), sonst Nacht - damit Morgen- und Abendgebete im passenden Stil sind */
  function hm(h,m){ return new Date().setHours(h,m||0,0,0); }
  function autoTheme(){ var s=sun(), t=Date.now(), a=Math.min(s.rise-60*6e4,hm(5)), b=Math.min(s.set-90*6e4,hm(17)), c=Math.max(s.set+60*6e4,hm(21));
    if(t>=a && t<b) return "morgen";
    if(t>=b && t<c) return "abend";
    return "nacht"; }
  function dim(){ if(!W||Date.now()-W.at>3*3600e3) return false; var c=W.code|0; return (W.cloud>=75)||c===45||c===48||c>=51; }
  function eff(){ return mode==="auto"?autoTheme():mode; }
  function apply(){ var h=document.documentElement, th=eff();
    ["morgen","abend","nacht"].forEach(function(x){ h.classList.toggle("th-"+x, x===th); });
    h.classList.toggle("th-dim", mode==="auto" && dim());
    var m=document.querySelector('meta[name="theme-color"]'); if(m){ var c=th==="morgen"?"#F6F0E2":(th==="abend"?"#1E130B":"#041236"); if(m.content!==c) m.content=c; }
    btn(); }
  function btn(){ var box=document.querySelector("#bppTopRight460 .lang")||document.querySelector("header .lang")||document.querySelector(".lang.l307"); if(!box) return; var b=document.getElementById("bppTheme");
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppTheme"; b.onclick=function(e){ e.stopPropagation(); mode=MODES[(MODES.indexOf(mode)+1)%4]; set("bpp-theme",mode); apply(); };
      b.style.cssText="background:transparent;border:1px solid #6b5340;border-radius:6px;padding:1px 6px;font-size:.8rem;min-height:auto;color:#e0b45a;cursor:pointer;line-height:1.3";
      box.appendChild(b); /* [Grok-Bot] V4.60: Lage steuert v460 (unter Sprache) */ }
    var nx=MODES[(MODES.indexOf(mode)+1)%4], T=N[lg()], t="Stil "+SYM[nx];
    var ti=(mode==="auto"?"A = automatisch, wählt nach Ortszeit den passenden Stil. ":"")+T.st+": "+T.now+" "+T[mode]+(mode==="auto"?" ("+T[eff()]+")":"")+" · "+T.cl+": "+T[nx];
    if(b.textContent!==t) b.textContent=t; if(b.title!==ti){ b.title=ti; b.setAttribute("aria-label",ti); } }
  function fetchWx(){ if(!navigator.onLine) return; if(W&&Date.now()-W.at<30*6e4&&W.day===new Date().toDateString()) return;
    var pos=(W&&W.lat!=null)?Promise.resolve([W.lat,W.lon]):fetch("https://get.geojs.io/v1/ip/geo.json").then(function(r){ return r.json(); }).then(function(g){ return [+g.latitude,+g.longitude]; });
    pos.then(function(p){ if(!isFinite(p[0])||!isFinite(p[1])) throw 0;
      return fetch("https://api.open-meteo.com/v1/forecast?latitude="+p[0].toFixed(2)+"&longitude="+p[1].toFixed(2)+"&current=weather_code,cloud_cover&daily=sunrise,sunset&timezone=auto&forecast_days=1")
        .then(function(r){ return r.json(); }).then(function(j){ var off=(j.utc_offset_seconds||0)*1000;
          function ts(s){ return Date.parse(s+"Z")-off; }
          W={lat:p[0],lon:p[1],at:Date.now(),day:new Date().toDateString(),code:j.current&&j.current.weather_code,cloud:j.current&&j.current.cloud_cover,
            rise:j.daily&&ts(j.daily.sunrise[0]),set:j.daily&&ts(j.daily.sunset[0])};
          set("bpp-wx379",JSON.stringify(W)); window.bppWx379=W; apply(); }); }).catch(function(){});
  }
  window.bppTheme379=function(){ return {mode:mode, theme:eff(), dim:mode==="auto"&&dim(), wx:W}; };
  apply(); document.addEventListener("DOMContentLoaded", apply);
  document.addEventListener("visibilitychange", function(){ if(!document.hidden){ apply(); fetchWx(); } }); window.addEventListener("focus", apply); /* [Grok-Bot] V3.99 */
  setInterval(apply, 60000); setInterval(btn, 1000); setTimeout(fetchWx, 2500); setInterval(fetchWx, 10*6e4);
  /* Hilfe: Absatz Stil (vor den Tastenkuerzeln) */
  setInterval(function(){ var d=document.getElementById("bppHelp"); if(!d) return; var ref=d.querySelector(".kb357")||d.querySelector(".kb352")||d.querySelector(".jg"); if(!ref) return;
    var p=d.querySelector(".h379"); if(!p){ p=document.createElement("p"); p.className="h379"; p.innerHTML=HLP[lg()]; }
    if(!p.parentNode||p.nextSibling!==ref) ref.parentNode.insertBefore(p,ref); },300);
  /* Hilfe beim Sprachwechsel neu aufbauen */
  var lastLang=(typeof lang!=="undefined")?lang:"";
  setInterval(function(){ var l=(typeof lang!=="undefined")?lang:""; if(l===lastLang) return; lastLang=l; btn();
    var d=document.getElementById("bppHelp"); if(!d||typeof window.bppHelp!=="function") return; var top=d.scrollTop; d.remove();
    try{ window.bppHelp(); var n=document.getElementById("bppHelp"); if(n) n.scrollTop=top; }catch(e){} },300);
})();
