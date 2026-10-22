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
  var HLP={de:"<b>Stil</b> (Knopf oben rechts vor der Sprache): Auto, Morgen (hell), Abend (warm-golden) oder Nacht (dunkel). Der Knopf zeigt, was ein Klick einstellt; die Wahl wird gemerkt. Auto richtet sich nach Sonnenauf- und -untergang am ungefähren Ort und dämpft die Farben bei Wolken oder Regen (Open-Meteo); ohne Netz nur nach Tageszeit. <i>(von Grok ergänzt)</i>",
    en:"<b>Style</b> (button at the top right, before the language): Auto, Morning (light), Evening (warm golden) or Night (dark). The button shows what a click will set; the choice is remembered. Auto follows sunrise and sunset at your approximate location and softens the colours when it is cloudy or raining (Open-Meteo); offline it uses the time of day only. <i>(added by Grok)</i>",
    fr:"<b>Style</b> (bouton en haut à droite, avant la langue) : Auto, Matin (clair), Soir (doré chaud) ou Nuit (sombre). Le bouton indique ce qu’un clic va régler ; le choix est mémorisé. Auto suit le lever et le coucher du soleil à votre position approximative et adoucit les couleurs par temps nuageux ou pluvieux (Open-Meteo) ; hors ligne, seulement selon l’heure. <i>(ajouté par Grok)</i>",
    es:"<b>Estilo</b> (botón arriba a la derecha, antes del idioma): Auto, Mañana (claro), Tarde (dorado cálido) o Noche (oscuro). El botón muestra lo que hará un clic; la elección se recuerda. Auto sigue la salida y la puesta del sol en tu ubicación aproximada y suaviza los colores si está nublado o llueve (Open-Meteo); sin conexión, solo según la hora. <i>(añadido por Grok)</i>",
    ru:"<b>Стиль</b> (кнопка вверху справа, перед языком): Авто, Утро (светлый), Вечер (тёплый золотой) или Ночь (тёмный). Кнопка показывает, что установит нажатие; выбор запоминается. «Авто» следует восходу и закату в вашем примерном месте и приглушает цвета в облачную или дождливую погоду (Open-Meteo); без сети — только по времени суток. <i>(добавлено Grok)</i>",
    hi:"<b>शैली</b> (ऊपर दाईं ओर, भाषा से पहले बटन): स्वतः, सुबह (हल्का), शाम (गर्म सुनहरा) या रात (गहरा)। बटन दिखाता है कि क्लिक क्या सेट करेगा; चुनाव याद रहता है। स्वतः आपके अनुमानित स्थान पर सूर्योदय और सूर्यास्त के अनुसार चलता है और बादल या बारिश में रंग हल्के करता है (Open-Meteo); ऑफ़लाइन केवल समय के अनुसार। <i>(Grok द्वारा जोड़ा गया)</i>",
    pt:"<b>Estilo</b> (botão no canto superior direito, antes do idioma): Auto, Manhã (claro), Noite cedo (dourado quente) ou Noite (escuro). O botão mostra o que um clique vai definir; a escolha é lembrada. Auto segue o nascer e o pôr do sol no seu local aproximado e suaviza as cores com nuvens ou chuva (Open-Meteo); offline, só pela hora do dia. <i>(acrescentado por Grok)</i>"};
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
  function guessPos(){ if(W&&W.lat!=null) return [W.lat,W.lon]; var off=-new Date().getTimezoneOffset()/60; return [48, off*15]; }
  function sun(){ var now=Date.now(), today=new Date().toDateString();
    if(W&&W.day===today&&W.rise&&W.set) return {rise:W.rise,set:W.set};
    var p=guessPos(); return sunCalc(p[0],p[1],new Date())||{rise:new Date().setHours(7,0,0,0),set:new Date().setHours(19,0,0,0)}; }
  function autoTheme(){ var s=sun(), t=Date.now();
    if(t>=s.rise && t<s.set-90*6e4) return "morgen";
    if(t>=s.set-90*6e4 && t<s.set+60*6e4) return "abend";
    return "nacht"; }
  function dim(){ if(!W||Date.now()-W.at>3*3600e3) return false; var c=W.code|0; return (W.cloud>=75)||c===45||c===48||c>=51; }
  function eff(){ return mode==="auto"?autoTheme():mode; }
  function apply(){ var h=document.documentElement, th=eff();
    ["morgen","abend","nacht"].forEach(function(x){ h.classList.toggle("th-"+x, x===th); });
    h.classList.toggle("th-dim", mode==="auto" && dim());
    var m=document.querySelector('meta[name="theme-color"]'); if(m){ var c=th==="morgen"?"#F6F0E2":(th==="abend"?"#1E130B":"#041236"); if(m.content!==c) m.content=c; }
    btn(); }
  function btn(){ var box=document.querySelector("header .lang"); if(!box) return; var b=document.getElementById("bppTheme");
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppTheme"; b.onclick=function(e){ e.stopPropagation(); mode=MODES[(MODES.indexOf(mode)+1)%4]; set("bpp-theme",mode); apply(); };
      box.insertBefore(b, box.firstChild); }
    var nx=MODES[(MODES.indexOf(mode)+1)%4], T=N[lg()], t=SYM[nx];
    var ti=T.st+": "+T.now+" "+T[mode]+(mode==="auto"?" ("+T[eff()]+")":"")+" · "+T.cl+": "+T[nx];
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
