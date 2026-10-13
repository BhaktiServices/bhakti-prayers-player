/* [Grok-Bot] V1.73: Morgen- und Abendliste genau nach dem Inhaltsverzeichnis des Prathana (Sri Vitthal Dham), fuer jeden Wochentag gleich.
   Sonntag bleibt das Abendgebet um 21:00 (Kopfzeile aus listview.js). Ueberschreibt nur die Anordnung, die listview.js erzeugt; listview.js selbst bleibt unveraendert.
   Ausgeblendete Prayers (window.bppHidden, z. B. Gayatri und Ganesa) stehen grau an ihrem Platz und sind nicht anklickbar. Arati Saprem ist im Player.
   Das lange Abend-Nrsimha-Prayer steht im Heft nicht als eigener Eintrag (es ist Teil des Kavaca-Videos) und erscheint deshalb nur noch unter "Weitere" und "Alle". */
(function(){
  if(typeof PRAYERS==="undefined") return;
  var M=["guru-stotram","ashtotram","vaishnava-mantra","guruji-gayatri","ganesha-mantra","gayatri","suprabhatam","govinda","narasimha","ramanuja","vishnu-arati","closing-morning"];
  var E=["guru-stotram-abend","ashtotram","ganesha-mantra","gayatri","kavacham","hanuman","bhajare","closing-evening","saprem" /* [Grok.com] jetzt im Player */,"closing-arati"];
  var MISS={ saprem:"\u0100rat\u012b Saprem" };
  var LL=["de","en","fr","es","ru","hi"];
  var NOTYET=["noch nicht im Player","not in the player yet","pas encore dans le lecteur","a\u00fan no est\u00e1 en el reproductor","\u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0432 \u043f\u043b\u0435\u0435\u0440\u0435","\u0905\u092d\u0940 \u092a\u094d\u0932\u0947\u092f\u0930 \u092e\u0947\u0902 \u0928\u0939\u0940\u0902"];
  var HID=["noch ohne eigenen Ton","no own recording yet","pas encore d'enregistrement propre","a\u00fan sin grabaci\u00f3n propia","\u043f\u043e\u043a\u0430 \u0431\u0435\u0437 \u0441\u0432\u043e\u0435\u0439 \u0437\u0430\u043f\u0438\u0441\u0438","\u0905\u092d\u0940 \u0905\u092a\u0928\u0940 \u0930\u093f\u0915\u0949\u0930\u094d\u0921\u093f\u0902\u0917 \u0928\u0939\u0940\u0902"];
  function tr(a){ var k=-1; try{ k=LL.indexOf(lang); }catch(e){} return a[k<0?1:k]; }
  function day(){ var b=document.querySelector(".daybar button.on"); return b ? +b.getAttribute("data-d") : (new Date().getDay()+6)%7; }
  function hidden(id){ return (window.bppHidden||[]).indexOf(id)>=0; }
  function grey(txt, tip){ var d=document.createElement("div"); d.className="item miss"; d.textContent=txt; d.title=tip; return d; }
  function re(){
    var list=document.getElementById("list"); if(!list || day()<0) return;
    var heads=list.querySelectorAll(":scope > .grp"); if(heads.length<2) return;
    var hM=heads[0].textContent, hE=heads[1].textContent, hR=heads.length>2 ? heads[heads.length-1].textContent : "";
    var btn={}; list.querySelectorAll(":scope > button.item[data-i]").forEach(function(b){ var k=b.getAttribute("data-i"); if(!btn[k]) btn[k]=b; });
    var used={}, frag=document.createDocumentFragment();
    function head(t){ var h=document.createElement("div"); h.className="grp"; h.textContent=t; frag.appendChild(h); }
    function put(id){
      if(id.charAt(0)==="~"){ frag.appendChild(grey(MISS[id.slice(1)]||id.slice(1), tr(NOTYET))); return; }
      var idx=PRAYERS.findIndex(function(p){ return p.id===id; }); if(idx<0) return;
      if(hidden(id)){ used[idx]=true; frag.appendChild(grey(PRAYERS[idx].titel, tr(HID))); return; }
      var b0=btn[idx]; if(!b0) return;
      var node=used[idx] ? b0.cloneNode(true) : b0;
      node.onclick=function(){ play(idx, true); };
      used[idx]=true; frag.appendChild(node);
    }
    /* [Grok-Bot] V3.17: nach SVD-Heften: freitags Laksmi Arati statt Visnu Arati (morgens) und Mukunda Mala (abends), donnerstags Vishwananda Calisa (abends),
       Tvam eva mata (final-prayers) als Abschluss morgens und abends; diese vier nicht mehr unter "Weitere" */
    var d=day(), M2=M.map(function(x){ return (d===4&&x==="vishnu-arati")?"lakshmi-arati":(x==="closing-morning"?"final-prayers":x); });
    var E2=E.filter(function(x){ return x!=="closing-evening"&&x!=="closing-arati"; });
    if(d===3) E2.splice(E2.indexOf("bhajare")+1,0,"vchalisa"); if(d===4) E2.splice(E2.indexOf("bhajare")+1,0,"mukunda");
    E2.push("final-prayers");
    head(hM); M2.forEach(put); head(hE); E2.forEach(put);
    ["lakshmi-arati","final-prayers","mukunda","vchalisa"].concat(d===4?["vishnu-arati"]:[]).forEach(function(id){ var k=PRAYERS.findIndex(function(p){ return p.id===id; }); if(k>=0) used[k]=true; });
    var rest=[]; PRAYERS.forEach(function(p, idx){ if(!used[idx] && btn[idx] && !hidden(p.id)) rest.push(p.id); });
    if(rest.length){ head(hR || "More"); rest.forEach(put); }
    list.innerHTML=""; list.appendChild(frag);
    if(window.__ldPaint) window.__ldPaint();
  }
  window.bppPlanApply=re;
  document.addEventListener("DOMContentLoaded", function(){
    var pl=window.paintList; if(typeof pl==="function"){ window.paintList=function(){ var r=pl.apply(this, arguments); re(); return r; }; }
    re();
    setTimeout(function(){ var v=document.querySelector("h1 .ver"); if(v) v.textContent="V1.73"; document.title="Bhakti Prayers Player V1.73"; }, 200);
  });
})();
