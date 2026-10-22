/* [Grok-Bot] V3.91: Statistik-Box (#bpp-stats, #bpp-orte24) in der gewaehlten UI-Sprache (7 Sprachen, Zahlenformat je Sprache),
   sofort beim Sprachwechsel. Alte Datei final-prayers-sunday.mp3 aus dem Offline-Speicher entfernt (neu: final-prayers-sunday2.mp3, vorne gekuerzt). */
window.BPP_BUILD="3.91"; window.BPP_SHOW="3.91";
(function(){
  if(window.bppV391) return; window.bppV391=1;
  var L={
    de:["Aufrufe","Hörzeit","Orte","heute","Monat","gesamt","Orte letzte 24 h","noch keine Daten","min","h","d"],
    en:["Visits","Listening time","Places","today","month","total","Places last 24 h","no data yet","min","h","d"],
    fr:["Visites","Temps d’écoute","Lieux","aujourd’hui","mois","total","Lieux des dernières 24 h","pas encore de données","min","h","j"],
    es:["Visitas","Tiempo de escucha","Lugares","hoy","mes","total","Lugares últimas 24 h","aún sin datos","min","h","d"],
    ru:["Посещения","Время прослушивания","Места","сегодня","месяц","всего","Места за последние 24 ч","пока нет данных","мин","ч","д"],
    hi:["विज़िट","सुनने का समय","स्थान","आज","महीना","कुल","पिछले 24 घंटे के स्थान","अभी कोई डेटा नहीं","मिनट","घंटे","दिन"],
    pt:["Acessos","Tempo de escuta","Locais","hoje","mês","total","Locais nas últimas 24 h","ainda sem dados","min","h","d"]};
  var LOC={de:"de-DE",en:"en-GB",fr:"fr-FR",es:"es-ES",ru:"ru-RU",hi:"hi-IN",pt:"pt-PT"};
  function lg(){ try{ var l=(typeof lang!=="undefined"&&lang)||document.documentElement.lang||"de"; l=String(l).slice(0,2); return L[l]?l:"de"; }catch(e){ return "de"; } }
  function num(s,l){ return s.replace(/\d+(?:\.\d+)?/g,function(m){ var n=parseFloat(m); return isNaN(n)?m:n.toLocaleString(LOC[l],{maximumFractionDigits:1}); }); }
  function tr(h,l){
    var W=L[l], D=L.de; if(l==="de") return h;
    var out=h.replace(/Orte letzte 24 h/g,W[6]).replace(/noch keine Daten/g,W[7]).replace(/(\d)\s*min\b/g,"$1 "+W[8]).replace(/(\d)\s*h\b/g,"$1 "+W[9]).replace(/(\d)\s*d\b/g,"$1 "+W[10])
      
      .replace(/Aufrufe:/g,W[0]+":").replace(/Hörzeit:/g,W[1]+":").replace(/Orte(\s*[:(])/g,W[2]+"$1")
      .replace(/\bheute\b/g,W[3]).replace(/\bMonat\b/g,W[4]).replace(/\bgesamt\b/g,W[5]);
    return out;
  }
  function fix(el){ if(!el) return; var l=lg(), cur=el.innerHTML;
    var src=(el.__t391!==undefined&&cur===el.__t391)?el.__o391:cur;
    if(cur===el.__t391&&el.__l391===l) return;
    /* nur Textteile formatieren, Tags unveraendert */
    var out=src.split(/(<[^>]*>)/).map(function(p){ return p.charAt(0)==="<"?p:num(tr(p,l),l); }).join("");
    if(cur!==out) el.innerHTML=out; el.__o391=src; el.__t391=el.innerHTML; el.__l391=l; }
  function run(){ fix(document.getElementById("bpp-stats")); fix(document.getElementById("bpp-orte24")); }
  setInterval(run,400);
  try{ new MutationObserver(function(){ run(); }).observe(document.documentElement,{childList:true,subtree:true,characterData:true}); }catch(e){}
  try{ var sl=window.setLang; if(typeof sl==="function"&&!sl.__v391){ window.setLang=function(){ var r=sl.apply(this,arguments); try{ run(); }catch(e){} return r; }; window.setLang.__v391=1; } }catch(e){}
  function clean(){ try{ if(!window.caches) return; var u=new URL("audio/final-prayers-sunday.mp3",location.href).href;
    caches.open("bpp-audio-v2").then(function(c){ c.delete(u); c.delete("https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/audio/final-prayers-sunday.mp3"); }).catch(function(){}); }catch(e){} }
  window.addEventListener("load",function(){ run(); setTimeout(clean,5000); });
})();
