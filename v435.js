/* [Grok-Bot] V4.35: Guru Stotram Rec: Pbj beginnt bei der bisherigen Sekunde 25: neue Datei audio/guru-stotram-prabhus2.mp3
   (erste 25 s abgeschnitten, gleiche Kodierung mono 56 kbit/s 44,1 kHz), Marken -25 s, YT-Start 145 s (Daten in v387.js).
   Einmaliges Zuruecksetzen gespeicherter Nutzer-Marken fuer Guru Stotram: Mtj und Pbj teilen sich den Schluessel "guru-stotram|file/yt";
   geloescht wird nur, wenn die gespeicherten Marken naeher an den alten Pbj-Marken als an den Mtj-Marken liegen (Mtj bleibt erhalten). */
window.BPP_BUILD="4.35"; window.BPP_SHOW="4.35";
/* [Grok-Bot] V4.36: Hilfe-Absaetze in den Textblock .in setzen (vor "Jai Gurudev"), nicht direkt in den Flex-Container #bppHelp – sonst wurde die Hilfe dreispaltig */
function put436(d,p){ var i=d.querySelector(".in")||d, j=i.querySelector("p.jg"); if(j) i.insertBefore(p,j); else i.appendChild(p); }
(function(){
  var F="bpp-reset435-gs"; try{ if(localStorage.getItem(F)) return; }catch(e){ return; }
  var PF=[0,57.4,69.7,82.0,94.3,106.6,118.9,131.2,143.5,155.8,168.1,180.4,192.7,205.0], MF=[0,18.7,33.5,48.2,62.7,77.7,92.4,107.2,121.9,136.6,151.4,166.1,181.0,195.7];
  var PY=[120,177.9,190.2,202.5,214.8,227.1,239.4,251.7,264.0,276.3,288.6,300.9,313.2,325.5];
  function d(a,b){ var s=0,n=0; for(var k=1;k<Math.min(a.length,b.length);k++){ if(a[k]!=null&&b[k]!=null){ s+=Math.abs(a[k]-b[k]); n++; } } return n?s/n:1e9; }
  try{ var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}"), ch=0;
    var f=s["guru-stotram|file"]; if(Array.isArray(f)&&d(f,PF)<d(f,MF)){ delete s["guru-stotram|file"]; ch=1; }
    var y=s["guru-stotram|yt"]; if(Array.isArray(y)&&d(y,PY)<60){ delete s["guru-stotram|yt"]; ch=1; } /* Mtj-Video hat andere Zeiten; Pbj-Video ab ~120 s */
    if(ch) localStorage.setItem("bpp-marks",JSON.stringify(s));
    localStorage.setItem(F,"1"); }catch(e){}
})();
/* [Grok-Bot] V4.35: EINE Wiederholen-Taste mit 5 Modi (Reihenfolge je Druck): Strophe -> Prayer -> Liste -> Alle -> Aus -> Strophe ...
   Strophe = Logik aus V4.34 (v434.js, Ende = naechste Marke, letzte Strophe = Aufnahmeende; fehlt die naechste Marke, wird zu "Prayer" gesprungen).
   Liste = Morgen- oder Abendliste, in der der laufende Prayer steht; bei gewaehltem Tag der Plan dieses Tages (Liste wie angezeigt, "Alle" = alle).
   Weil "naechste Aktion" bei 5 Modi verwirrt, zeigt die Taste den AKTUELLEN Modus, der naechste steht im Hover-Text. Gold = Modus 1-4.
   Gespeichert in localStorage "bpp-rep435", im Teilen-Link als &rep=str|one|list|all|off. Kuerzel R vorwaerts, Umschalt+R rueckwaerts. */
(function(){
  var M=["str","one","list","all","off"], K="bpp-rep435";
  var LB={de:["Strophe","Prayer","Liste","Alle","Aus"],en:["Stanza","Prayer","List","All","Off"],fr:["Strophe","Prière","Liste","Toutes","Arrêt"],es:["Estrofa","Oración","Lista","Todas","No"],ru:["Строфа","Молитва","Список","Все","Выкл"],hi:["छंद","प्रार्थना","सूची","सभी","बंद"],pt:["Estrofe","Oração","Lista","Todas","Desl."],cz:["Sloka","Modlitba","Seznam","Vše","Vyp."]};
  var TT={de:["Wiederholen: ","Nächster Druck: "],en:["Repeat: ","Next press: "],fr:["Répéter : ","Prochain appui : "],es:["Repetir: ","Siguiente pulsación: "],ru:["Повтор: ","Следующее нажатие: "],hi:["दोहराएँ: ","अगला दबाव: "],pt:["Repetir: ","Próximo toque: "],cz:["Opakovat: ","Další stisk: "]};
  var LONG={de:["Strophe wiederholen","Diesen Prayer wiederholen","Alle Prayer der Liste wiederholen","Alle Prayer wiederholen","Wiederholen aus"],en:["Repeat stanza","Repeat this prayer","Repeat all prayers of the list","Repeat all prayers","Repeat off"],fr:["Répéter la strophe","Répéter cette prière","Répéter toute la liste","Répéter toutes les prières","Répétition désactivée"],es:["Repetir estrofa","Repetir esta oración","Repetir toda la lista","Repetir todas las oraciones","Repetición desactivada"],ru:["Повтор строфы","Повтор этой молитвы","Повтор всего списка","Повтор всех молитв","Повтор выключен"],hi:["छंद दोहराएँ","यह प्रार्थना दोहराएँ","सूची की सभी प्रार्थनाएँ दोहराएँ","सभी प्रार्थनाएँ दोहराएँ","दोहराना बंद"],pt:["Repetir estrofe","Repetir esta oração","Repetir toda a lista","Repetir todas as orações","Repetição desligada"],cz:["Opakovat sloku","Opakovat tuto modlitbu","Opakovat celý seznam","Opakovat všechny modlitby","Opakování vyp."]};
  var HELP={de:"<b>Wiederholen (R, ⇧R):</b> Strophe → Prayer → Liste → Alle → Aus; Label = nächste Aktion; gold = an; gespeichert + Teilen-Link. <i>(von Grok ergänzt)</i>",en:"<b>Repeat (R, ⇧R):</b> stanza → prayer → list → all → off; label = next action; gold = on; saved + share link. <i>(added by Grok)</i>",fr:"<b>Répéter (R, ⇧R) :</b> strophe → prière → liste → toutes → off ; libellé = action suivante ; doré = on ; mémorisé + lien. <i>(ajouté par Grok)</i>",es:"<b>Repetir (R, ⇧R):</b> estrofa → oración → lista → todas → off; etiqueta = siguiente; dorado = on; guardado + enlace. <i>(añadido por Grok)</i>",ru:"<b>Повтор (R, ⇧R):</b> строфа → молитва → список → все → выкл.; подпись = следующее; золото = вкл.; сохраняется + ссылка. <i>(добавлено Grok)</i>",hi:"<b>दोहराएँ (R, ⇧R):</b> श्लोक → प्रार्थना → सूची → सभी → बंद; लेबल = अगली क्रिया; सुनहरा = चालू; सहेजा + शेयर लिंक। <i>(Grok द्वारा जोड़ा गया)</i>",pt:"<b>Repetir (R, ⇧R):</b> estrofe → oração → lista → todas → off; rótulo = próxima; dourado = on; guardado + link. <i>(acrescentado pelo Grok)</i>",cz:"<b>Opakovat (R, ⇧R):</b> sloka → modlitba → seznam → všechny → vyp; popisek = další; zlatá = zap; uloženo + odkaz. <i>(doplněno Grokem)</i>"};
  var ICO=["↻§","↻1","↻☰","↻∞","↻⊘"];
  function lg(){ return (typeof lang!=="undefined"&&LB[lang])?lang:"en"; }
  function ls(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
  var mode=ls(K); if(M.indexOf(mode)<0){ var o=+(ls("bpp-rep")||0); mode=o===1?"one":(o===2?"all":"off"); }
  function nav(){ return window.bppPrayerNav; }
  function under(){ var n=nav(); if(!n||!n.setRep) return; var r=(mode==="one"||mode==="str")?1:(mode==="list"||mode==="all")?2:0; if(n.rep()!==r) n.setRep(r); }
  function playing(){ try{ return (typeof isPlaying==="function")?isPlaying():!document.getElementById("a").paused; }catch(e){ return false; } }
  function arm(quiet){ if(window.bppStanzaLoop) return true; var r=window.bppStanzaRange&&window.bppStanzaRange(); if(!r) return false; if(window.bppStanzaLoopToggle) window.bppStanzaLoopToggle(); return !!window.bppStanzaLoop; }
  function set(m, dir){ var prev=mode; mode=m;
    if(m==="str"){ if(!arm()){ mode=dir<0?"off":"one"; try{ var h=document.getElementById("bppHint434"); }catch(e){} hint(LONG[lg()][0]+": –"); } }
    if(mode!=="str" && window.bppStanzaLoop && window.bppStanzaLoopOff) window.bppStanzaLoopOff();
    ls(K,mode); under(); paint(); try{ window.bppV358&&bppV358(); }catch(e){} }
  function hint(s){ try{ var d=document.getElementById("bppHint434"); if(!d){ d=document.createElement("div"); d.id="bppHint434"; d.style.cssText="position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#333;color:#fff;padding:6px 12px;border-radius:8px;font-size:.85rem;z-index:99999"; document.body.appendChild(d); }
    var miss={de:"Endmarke der Strophe fehlt – weiter mit „Prayer“",en:"Stanza end mark missing – using “Prayer”"}; d.textContent=miss[lg()]||miss.en; d.style.display="block"; clearTimeout(hint.t); hint.t=setTimeout(function(){ d.style.display="none"; },3000); }catch(e){} }
  function cycle(d){ d=d||1; var k=M.indexOf(mode), n=M[(k+d+M.length)%M.length]; set(n,d); }
  window.bppRepCycle=cycle; window.bppRepMode=function(){ return mode; }; window.bppRepSet=function(m){ if(M.indexOf(m)>=0) set(m,1); };
  /* Liste: Abschnitt (Morgen/Abend/Tagesplan) wie angezeigt, in dem der laufende Prayer steht */
  function listNb(d, wrap, snd){ var n=nav(); if(!n||typeof i==="undefined"||i<0) return null; var ss=(n.sections()||[]).filter(function(s){ return s.items.indexOf(i)>=0; });
    if(!ss.length) return null; var hd=null; try{ hd=sessionStorage.getItem("bpp-head"); }catch(e){}
    var s=ss.filter(function(x){ return x.head===hd; })[0]||((ss.length>1&&new Date().getHours()>=14)?ss[1]:ss[0]);
    var it=s.items, p=it.indexOf(i), q=p+d; if(q<0||q>=it.length){ if(!wrap||it.length<2) return null; q=(q+it.length)%it.length; } return {idx:it[q], head:s.head}; }
  function hookNb(){ var f=window.bppAllNb; if(typeof f!=="function"||f.__435) return; var g=function(d,w,snd){ if(mode==="list"){ try{ var r=listNb(d,w,snd); if(r||!w) return r; }catch(e){} } return f.apply(this,arguments); }; g.__435=1; window.bppAllNb=g; }
  function html(){ var k=M.indexOf(mode); return '<span class="r435">'+ICO[k]+' '+LB[lg()][k]+'</span>'; }
  function ttl(){ var k=M.indexOf(mode), L=LONG[lg()], t=TT[lg()]; return t[0]+L[k]+" · "+t[1]+L[(k+1)%5]+" · ⇧R ← (von Grok ergänzt) (R)"; }
  function tget(){ return ttl(); }
  function fix(b){ if(!b) return; b.__v359=1; var dd=Object.getOwnPropertyDescriptor(b,"title"); if(!dd||dd.get!==tget){ try{ Object.defineProperty(b,"title",{configurable:true,get:tget,set:function(){}}); }catch(e){} }
    if(!b.__t435){ b.__t435=1;
      var sa=b.setAttribute; b.setAttribute=function(n,v){ if(n==="title"||n==="aria-label") v=ttl(); return (b.__sa435||sa).call(b,n,v); }; b.__sa435=Element.prototype.setAttribute.bind(b); }
    var h=html(); if(b.innerHTML!==h) b.innerHTML=h; var t=ttl(); if(b.getAttribute("title")!==t) Element.prototype.setAttribute.call(b,"title",t); if(b.getAttribute("aria-label")!==t) Element.prototype.setAttribute.call(b,"aria-label",t);
    var on=mode!=="off"; if(b.classList.contains("act358")!==on) b.classList.toggle("act358",on); if(b.classList.contains("s358")) b.classList.remove("s358"); }
  function paint(){ fix(document.getElementById("btnRep")); fix(document.getElementById("bppFsRep")); help(); }
  function help(){ var d=document.getElementById("bppHelp"); if(!d) return; var p=d.querySelector("p.rep435"); if(!p){ p=document.createElement("p"); p.className="rep435"; put436(d,p); } var h=HELP[lg()]||HELP.en; if(p.innerHTML!==h) p.innerHTML=h; }
  var st=document.createElement("style"); st.textContent="#btnRep .r435,#bppFsRep .r435{font-size:.78rem;white-space:nowrap;font-family:inherit;filter:grayscale(1)}#bppFsBar #bppFsRep .r435{font-size:1rem}#btnRep.act358,#bppFsRep.act358{background:linear-gradient(180deg,#e2be5a,#b8902a)!important;color:#1b1406!important}"; document.head.appendChild(st);
  document.addEventListener("click",function(e){ var b=e.target&&e.target.closest&&e.target.closest("#btnRep,#bppFsRep"); if(!b) return; e.preventDefault(); e.stopImmediatePropagation(); cycle(1); },true);
  var lastI=null;
  setInterval(function(){ try{ hookNb(); under(); paint();
    if(mode==="str" && !window.bppStanzaLoop && playing()){ arm(true); } /* nach Prayer-/Quellwechsel neu an der aktuellen Strophe einhaken */
  }catch(e){} },300);
})();
/* [Grok-Bot] V4.35: Taste Tagesleiste (nur bei Menue+): Tagesleiste nur sichtbar bei Menue+ UND Taste ein. Standard aus, gespeichert in "bpp-wd435".
   Beschriftung = naechste Aktion, gold = Tagesleiste an. Platz bleibt reserviert (visibility), daher kein Springen.
   [Grok-Bot] V4.54: Labels/Tooltip hier als einzige Quelle (kein spaeteres Ueberschreiben mehr → kein Flackern). */
(function(){
  var K="bpp-wd435", on=false; try{ on=localStorage.getItem(K)==="1"; }catch(e){}
  var TX={de:["Tagesleiste ein","Tagesleiste aus","Wochentage mit den\nverschiedenen Prayern zeigen","Tagesleiste ausblenden"],en:["Day bar on","Day bar off","Show weekdays with the\ndifferent prayers","Hide the day bar"],fr:["Barre du jour : afficher","Barre du jour : masquer","Afficher les jours avec les\ndifférentes prières","Masquer la barre du jour"],es:["Barra del día: mostrar","Barra del día: ocultar","Mostrar los días con las\ndiferentes oraciones","Ocultar la barra del día"],ru:["Лента дня: показать","Лента дня: скрыть","Показать дни недели с\nразными молитвами","Скрыть ленту дня"],hi:["दिन पट्टी दिखाएँ","दिन पट्टी छिपाएँ","सप्ताह के दिन विभिन्न\nप्रार्थनाओं के साथ दिखाएँ","दिन पट्टी छिपाएँ"],pt:["Barra do dia: mostrar","Barra do dia: ocultar","Mostrar os dias com as\ndiferentes orações","Ocultar a barra do dia"],cz:["Lišta dne zapnout","Lišta dne vypnout","Zobrazit dny týdne s\nrůznými modlitbami","Skrýt lištu dne"]}; /* [Grok-Bot] V4.54: eine Quelle, kein Überschreiben mehr */
  var HP={de:"<b>Tagesleiste (nur Menü+):</b> Mo–So mit Prayern ein/aus; Standard aus, gold = an. <i>(von Grok ergänzt)</i>",en:"<b>Day bar (Menu+ only):</b> weekdays with prayers on/off; default off, gold = on. <i>(added by Grok)</i>",fr:"<b>Barre du jour (Menu+ seulement) :</b> jours avec prières on/off ; défaut off, doré = on. <i>(ajouté par Grok)</i>",es:"<b>Barra del día (solo Menú+):</b> días con oraciones on/off; por defecto off, dorado = on. <i>(añadido por Grok)</i>",ru:"<b>Лента дня (только Меню+):</b> дни с молитвами вкл/выкл; по умолч. выкл., золото = вкл. <i>(добавлено Grok)</i>",hi:"<b>दिन पट्टी (केवल मेनू+):</b> सप्ताह के दिन प्रार्थनाओं के साथ चालू/बंद; डिफ़ॉल्ट बंद, सुनहरा = चालू। <i>(Grok द्वारा जोड़ा गया)</i>",pt:"<b>Barra do dia (só Menu+):</b> dias com orações on/off; padrão off, dourado = on. <i>(adicionado pelo Grok)</i>",cz:"<b>Lišta dne (jen Menu+):</b> dny s modlitbami zap/vyp; výchozí vyp, zlatá = zap. <i>(doplněno Grokem)</i>"};
  function t(){ return TX[(typeof lang!=="undefined"&&TX[lang])?lang:"en"]; }
  var st=document.createElement("style"); st.textContent="body:not(.menu-full) #btnWd435{display:none!important}body:not(.wd435) .daybar{visibility:hidden!important;pointer-events:none!important}#btnWd435.gold{background:#d4a017!important;color:#000!important;border-color:#b8860b!important}"; document.head.appendChild(st);
  var b=null;
  function paint(){ document.body.classList.toggle("wd435",on);
    if(!b||!document.body.contains(b)){ var det=document.getElementById("btnDet"); if(!det) return; b=document.createElement("button"); b.type="button"; b.id="btnWd435"; b.className=det.className.replace(/\b(on|gold|act358|s358)\b/g,"");
      b.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); on=!on; try{ localStorage.setItem(K,on?"1":"0"); }catch(x){} paint(); }); det.parentNode.insertBefore(b,det.nextSibling); }
    var x=t(), lab=on?x[1]:x[0], tt=(on?x[3]:x[2])+" (von Grok ergänzt)"; if(b.textContent!==lab) b.textContent=lab; if(b.title!==tt) b.title=tt; if(b.getAttribute("aria-pressed")!==(on?"true":"false")) b.setAttribute("aria-pressed",on?"true":"false");
    if(b.classList.contains("gold")!==on) b.classList.toggle("gold",on);
    var d=document.getElementById("bppHelp"); if(d){ var p=d.querySelector("p.wd435"); if(!p){ p=document.createElement("p"); p.className="wd435"; put436(d,p); } var h=HP[(typeof lang!=="undefined"&&HP[lang])?lang:"en"]; if(p.innerHTML!==h) p.innerHTML=h; } }
  if(document.body) paint(); document.addEventListener("DOMContentLoaded",paint); setInterval(function(){ try{ paint(); }catch(e){} },400);
})();
