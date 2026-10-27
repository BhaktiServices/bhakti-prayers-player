/* [Grok-Bot] V4.49: Hilfe priorisiert. Oben alles zum Lernen der Prayers (Auswahl/Menues, Wiedergabe, Mitsingen, Strophen, Wiederholen, Tempo K,
   Akkorde/Uebersetzung, Gross, Spalten, Aussprache), darunter die Sonderfunktionen (Menue+, Wochentage, Stil, Offline/Prayers runterladen,
   App installieren, Teilen, Quellen, Anregungen & Wuensche), Tastenkuerzel ganz unten. Nur umsortiert, Texte unveraendert; zwei Zwischenueberschriften.
   Umsetzung per CSS-Flex "order" (die DOM-Reihenfolge bleibt, damit die Positions-Intervalle aelterer Versionen nicht gegeneinander arbeiten). */
window.BPP_BUILD="4.49"; window.BPP_SHOW="4.49";
(function(){
  if(window.bppV449) return; window.bppV449=1;
  var HD={de:["Prayers lernen","Sonderfunktionen"],en:["Learning the prayers","Special features"],fr:["Apprendre les prières","Fonctions spéciales"],
    es:["Aprender las oraciones","Funciones especiales"],ru:["Изучение молитв","Дополнительные функции"],hi:["प्रार्थनाएँ सीखना","विशेष सुविधाएँ"],
    pt:["Aprender as orações","Funções especiais"],cz:["Učení modliteb","Zvláštní funkce"]};
  /* Rangfolge: 0-9 Kopf, 10-99 Lernen, 100-199 Sonderfunktionen, 200+ Tastenkuerzel, 300+ Abschluss */
  var CLS={esc355:0,h378:22,rep435:36,k433:38,h381:46,wd435:112,h379:114,q446:122,w447:124,kb357:200,kb352:202,jg:300,bppContact:302,s449a:10,s449b:100};
  var LB={choose:["Gebet wählen","Choose a prayer","Choisir une prière","Elegir una oración","Выбор молитвы","प्रार्थना चुनें","Escolha uma oração","Vyberte modlitbu"],
    offline:["Offline","Hors ligne","Sin conexión","Офлайн","ऑफ़लाइन"],
    language:["Sprache","Language","Langue","Idioma","Язык","भाषा","Jazyk"],
    follow:["Mitsingen","Follow","Suivre","Seguir","Следить","साथ गाएँ","Acompanhar","Sledovat"],
    manual:["Strophen von Hand blättern","Turn stanzas by hand","Tourner les strophes à la main","Pasar estrofas a mano","Листать строфы вручную","श्लोक हाथ से बदलें","Virar estrofes à mão","Listování slokami ručně"],
    big:["Groß","Big","Grand","Grande","Крупно","बड़ा","Velké"],
    chords:["Akkorde","Chords","Accords","Acordes","Аккорды","कॉर्ड","Akordy"],
    app:["Als App installieren","Install as app","Installer comme app","Instalar como app","Установить как приложение","ऐप के रूप में इंस्टॉल करें","Instalovat jako aplikaci"],
    czech:["Česky"]};
  var KO={choose:20,none:24,language:26,play:30,follow:32,manual:34,chords:40,czech:42,big:44,cols:48,pron:50,
    menuplus:110,offline:116,app:118,share:120,close:130};
  var MAP={}; for(var k in LB) LB[k].forEach(function(s){ MAP[s]=k; });
  function norm(s){ return (s||"").replace(/[\s\u00a0]+/g," ").replace(/\s*:\s*$/,"").trim(); }
  function key(p){
    var b=p.querySelector("b"), bt=b?b.textContent:"", tx=p.textContent;
    if(bt.indexOf("∅")>=0) return "none";
    if(bt.indexOf("1/2/3")>=0) return "cols";
    if(bt.indexOf("Menü+")>=0) return "menuplus";
    if(tx.indexOf("|◀ ▶|")>=0) return "play";
    if(tx.indexOf("⤴")>=0) return "share";
    if(tx.indexOf("ā ī ū")>=0) return "pron";
    if(!b) return "close";
    return MAP[norm(bt)]||"";
  }
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return HD[l]?l:"en"; }
  var st=document.createElement("style");
  st.textContent="#bppHelp>div.in{display:flex!important;flex-direction:column}#bppHelp>div.in>p{margin-top:0!important}"+
    "#bppHelp>div.in>h3.s449{color:#e0b45a;font-family:'Gentium Book Plus',Georgia,serif;font-size:1.2rem;margin:18px 0 8px;padding-bottom:3px;border-bottom:1px solid rgba(224,180,90,.35)}"+
    "html.th-morgen #bppHelp>div.in>h3.s449{color:#5e420c;border-bottom-color:rgba(94,66,12,.35)}";
  document.head.appendChild(st);
  function ord(e,o){ var v=String(o); if(e.style.order!==v) e.style.order=v; }
  function run(){
    var h=document.querySelector("#bppHelp>div.in"); if(!h) return;
    var l=lg();
    ["s449a","s449b"].forEach(function(c,n){ var e=h.querySelector("h3."+c);
      if(!e){ e=document.createElement("h3"); e.className="s449 "+c; h.appendChild(e); }
      if(e.textContent!==HD[l][n]) e.textContent=HD[l][n]; });
    [].slice.call(h.children).forEach(function(e){
      var o=null, t=e.tagName;
      if(t==="IMG") o=1; else if(t==="H2") o=2;
      else { for(var c in CLS) if(e.classList.contains(c)){ o=CLS[c]; break; } }
      if(o===null && t==="P" && !e.className){ var k=key(e); o=k?KO[k]:60; }
      if(o===null) o=126; /* unbekannte neue Absaetze: ans Ende der Sonderfunktionen */
      ord(e,o);
    });
  }
  setInterval(run,200);
  new MutationObserver(function(){ if(document.getElementById("bppHelp")) run(); }).observe(document.body,{childList:true});
})();
