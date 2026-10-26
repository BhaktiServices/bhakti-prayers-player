/* [Grok-Bot] V1.53: Sprachen DE EN FR ES RU HI. Beim ersten Start automatisch nach Browsersprache (Deutsch -> DE, Franzoesisch -> FR, Spanisch -> ES, Russisch -> RU, Hindi -> HI, Englisch -> EN; sonst DE in deutscher Zeitzone, sonst EN). Eine von Hand gewaehlte Sprache wird gemerkt. Uebersetzungen kommen aus tr-*.js (Feld z.fr, z.es, z.ru, z.hi), fehlt eine Zeile, wird Englisch gezeigt. */
(function(){
  var LANGS=["de","en","fr","es","ru","hi","pt","cz"];
  UI.fr={ sub:"Lecture / pause ou barre d'espace. N et V : une strophe.", now:"Choisir un chant", play:"Lecture", pause:"Pause", prev:"◀ V", next:"N ▶", trOff:"Trad. non", trOn:"Trad. oui", chOff:"Pas d'accords", chOn:"Accords", chLine:"Accords par ligne", pitch:"Hauteur", foot:"Accords : livret Sri Vitthal Dham. Audio depuis Dropbox si disponible." };
  UI.es={ sub:"Reproducir / pausa o barra espaciadora. N y V: una estrofa.", now:"Elige un canto", play:"Play", pause:"Pausa", prev:"◀ V", next:"N ▶", trOff:"Trad. no", trOn:"Trad. sí", chOff:"Sin acordes", chOn:"Acordes", chLine:"Acordes por línea", pitch:"Tono", foot:"Acordes: cuadernillo Sri Vitthal Dham. Audio de Dropbox cuando existe." };
  UI.ru={ sub:"Воспроизведение / пауза или пробел. N и V: на строфу.", now:"Выберите песнопение", play:"Play", pause:"Пауза", prev:"◀ V", next:"N ▶", trOff:"Перевод выкл", trOn:"Перевод вкл", chOff:"Без аккордов", chOn:"Аккорды", chLine:"Аккорды по строке", pitch:"Тон", foot:"Аккорды: брошюра Sri Vitthal Dham. Аудио из Dropbox, где есть." };
  UI.hi={ sub:"चलाएँ / रोकें या स्पेस। N और V: एक श्लोक।", now:"एक प्रार्थना चुनें", play:"चलाएँ", pause:"रोकें", prev:"◀ V", next:"N ▶", trOff:"अनुवाद बंद", trOn:"अनुवाद चालू", chOff:"कोई कॉर्ड नहीं", chOn:"कॉर्ड", chLine:"हर पंक्ति पर कॉर्ड", pitch:"सुर", foot:"कॉर्ड: Sri Vitthal Dham पुस्तिका। ऑडियो Dropbox से, जहाँ उपलब्ध।" };
  UI.pt={ sub:"Tocar / Pausa ou barra de espaço. N e V: uma estrofe.", legend:"ā ī ū sustentar longo  ·  ṃ ṅ ñ ṇ nasal  ·  ś ṣ sh suave / forte  ·  ṛ ri", now:"Escolha uma oração", play:"Tocar", pause:"Pausa", prev:"◀ V", next:"N ▶", trOff:"Trad. desl.", trOn:"Trad. lig.", chOff:"Sem acordes", chOn:"Acordes", chLine:"Acordes por linha", pitch:"Altura", foot:"Acordes: livreto Sri Vitthal Dham. Áudio do Dropbox quando disponível." }; /* [Grok-Bot] V3.54 Portugues */
  UI.cz={ sub:"Přehrát / pauza nebo mezerník. N a V: o jednu sloku.", legend:"ā ī ū držet dlouze  ·  ṃ ṅ ñ ṇ nosově  ·  ś ṣ měkké / tvrdé š  ·  ṛ ri", now:"Vyberte modlitbu", play:"Přehrát", pause:"Pauza", prev:"◀ V", next:"N ▶", trOff:"Překlad vyp.", trOn:"Překlad zap.", chOff:"Bez akordů", chOn:"Akordy", chLine:"Akordy v řádku", pitch:"Výška", foot:"Akordy: zpěvník Sri Vitthal Dham. Audio z Dropboxu, pokud existuje. Texty rozhraní a nápovědy doplnil Grok." };
  var X={
    de:{ hold:"lang halten", sh:"weiches / hartes sch", key:"Tonart", on:"Auto an", off:"Auto aus" },
    en:{ hold:"hold long", sh:"soft / hard sh", key:"Key", on:"Auto on", off:"Auto off" },
    fr:{ hold:"tenir long", sh:"ch doux / dur", key:"Ton", on:"Auto oui", off:"Auto non" },
    es:{ hold:"alargar", sh:"sh suave / fuerte", key:"Tono", on:"Auto sí", off:"Auto no" },
    ru:{ hold:"тянуть долго", sh:"мягкое / твёрдое ш", key:"Тон", on:"Авто вкл", off:"Авто выкл" },
    hi:{ hold:"दीर्घ", sh:"श / ष", key:"सुर", on:"ऑटो चालू", off:"ऑटो बंद" },pt:{"hold":"sustentar longo","sh":"sh suave / forte","key":"Tom","on":"Auto lig.","off":"Auto desl."},cz:{hold:"držet dlouze",sh:"měkké / tvrdé š",key:"Tónina",on:"Auto zap.",off:"Auto vyp."}
  };
  function cap(l){ return l.charAt(0).toUpperCase()+l.slice(1); }
  function detect(){
    var L=[]; try{ L=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||""]; }catch(e){}
    var first=String(L[0]||"").toLowerCase().slice(0,2);
    if(first==="cs") return "cz";
    if(LANGS.indexOf(first)>=0) return first;
    var tz=""; try{ tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""; }catch(e){}
    return tz==="Europe/Berlin"?"de":"en";
  }
  var man=false; try{ man=localStorage.getItem("bpp-lang-man")==="1"; }catch(e){}
  var stored=""; try{ stored=localStorage.getItem("bpp-lang")||""; }catch(e){}
  lang=(man && LANGS.indexOf(stored)>=0)?stored:detect();
  window.lineText=function(z){
    if(lang==="de") return z.ue||z.en||"";
    if(lang==="cz") return z.cz||""; /* [Grok-Bot] V4.32: CZ ohne englischen Ersatz -> Hinweis */
    return z[lang]||z.en||z.ue||"";
  };
  function hint(){
    if(typeof i==="undefined"||i<0||!PRAYERS[i]) return;
    var P=PRAYERS[i];
    var t=lang==="de"?(P.hinweisDe||P.hinweis):(P["hinweis"+cap(lang)]||P.hinweisEn||P.hinweis);
    document.getElementById("hint").textContent=t||"";
  }
  function extra(){
    var x=X[lang]||X.en;
    document.getElementById("legend").innerHTML="<b>ā ī ū</b> "+x.hold+" &nbsp;·&nbsp; <b>ṃ ṅ ñ ṇ</b> nasal &nbsp;·&nbsp; <b>ś ṣ</b> "+x.sh+" &nbsp;·&nbsp; <b>ṛ</b> ri";
    if(steps===0) document.getElementById("xpLab").textContent=x.key;
    document.getElementById("btnAuto").textContent=autoScroll?x.on:x.off;
    LANGS.forEach(function(l){ var b=document.getElementById("btnLang"+cap(l)); if(b) b.classList.toggle("on", lang===l); });
    hint();
  }
  var ap=window.applyUI;
  window.applyUI=function(){ ap.apply(this, arguments); extra(); };
  var pl=window.play;
  window.play=function(){ var r=pl.apply(this, arguments); hint(); return r; };
  var sl=window.setLang;
  window.setLang=function(l){ try{ localStorage.setItem("bpp-lang-man","1"); }catch(e){} sl(l); };
  function go(){ applyUI(); paintList(); if(typeof i!=="undefined" && i>=0) paintLyrics(); if(window.bppTips) window.bppTips(); }
  go();
  document.addEventListener("DOMContentLoaded", go);
})();
