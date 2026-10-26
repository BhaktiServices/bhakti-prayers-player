/* [Grok-Bot] V4.35: Guru Stotram Rec: Pbj beginnt bei der bisherigen Sekunde 25: neue Datei audio/guru-stotram-prabhus2.mp3
   (erste 25 s abgeschnitten, gleiche Kodierung mono 56 kbit/s 44,1 kHz), Marken -25 s, YT-Start 145 s (Daten in v387.js).
   Einmaliges Zuruecksetzen gespeicherter Nutzer-Marken fuer Guru Stotram: Mtj und Pbj teilen sich den Schluessel "guru-stotram|file/yt";
   geloescht wird nur, wenn die gespeicherten Marken naeher an den alten Pbj-Marken als an den Mtj-Marken liegen (Mtj bleibt erhalten). */
window.BPP_BUILD="4.35"; window.BPP_SHOW="4.35";
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
  var HELP={de:"<b>Wiederholen (R, ⇧R rückwärts):</b> Jeder Druck wechselt den Modus: Strophe (die aktuelle Strophe endlos; fehlt die Endmarke, geht es gleich zu Prayer) → Prayer (dieser Prayer) → Liste (Morgen- oder Abendliste des laufenden Prayers bzw. Plan des gewählten Tages) → Alle (alle vorhandenen Prayer) → Aus. Die Taste zeigt den aktuellen Modus, der Hover-Text den nächsten; gold = Wiederholen aktiv. Der Modus bleibt gespeichert und steht im Teilen-Link. <i>(von Grok ergänzt)</i>",
   en:"<b>Repeat (R, ⇧R backwards):</b> each press changes the mode: Stanza (current stanza endlessly; if its end mark is missing, it goes straight to Prayer) → Prayer (this prayer) → List (morning or evening list of the current prayer, or the plan of the selected day) → All (all available prayers) → Off. The button shows the current mode, the hover text the next one; gold = repeat active. The mode is saved and included in the share link. <i>(added by Grok)</i>",
   fr:"<b>Répéter (R, ⇧R en arrière) :</b> chaque appui change le mode : Strophe → Prière → Liste (liste du matin ou du soir, ou plan du jour choisi) → Toutes → Arrêt. Le bouton montre le mode actuel, l’info-bulle le suivant ; doré = actif. Mode enregistré et inclus dans le lien de partage. <i>(ajouté par Grok)</i>",
   es:"<b>Repetir (R, ⇧R hacia atrás):</b> cada pulsación cambia el modo: Estrofa → Oración → Lista (lista de mañana o tarde, o plan del día elegido) → Todas → No. El botón muestra el modo actual, el texto emergente el siguiente; dorado = activo. Se guarda y va en el enlace compartido. <i>(añadido por Grok)</i>",
   ru:"<b>Повтор (R, ⇧R назад):</b> каждое нажатие меняет режим: Строфа → Молитва → Список (утренний или вечерний, либо план выбранного дня) → Все → Выкл. Кнопка показывает текущий режим, подсказка — следующий; золото = активно. Режим сохраняется и входит в ссылку. <i>(добавлено Grok)</i>",
   hi:"<b>दोहराएँ (R, ⇧R उल्टा):</b> हर दबाव पर मोड बदलता है: छंद → प्रार्थना → सूची (सुबह/शाम की सूची या चुने दिन की योजना) → सभी → बंद। बटन वर्तमान मोड दिखाता है, होवर-पाठ अगला; सुनहरा = सक्रिय। मोड सहेजा जाता है और साझा लिंक में रहता है। <i>(Grok द्वारा जोड़ा गया)</i>",
   pt:"<b>Repetir (R, ⇧R para trás):</b> cada toque muda o modo: Estrofe → Oração → Lista (lista da manhã ou da tarde, ou plano do dia escolhido) → Todas → Desligado. O botão mostra o modo atual, a dica o seguinte; dourado = ativo. Fica guardado e vai no link de partilha. <i>(adicionado pelo Grok)</i>",
   cz:"<b>Opakovat (R, ⇧R zpět):</b> každý stisk změní režim: Sloka → Modlitba → Seznam (ranní nebo večerní, nebo plán zvoleného dne) → Vše → Vyp. Tlačítko ukazuje aktuální režim, nápověda další; zlatá = aktivní. Režim se ukládá a je v odkazu ke sdílení. <i>(doplněno Grokem)</i>"};
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
  function help(){ var d=document.getElementById("bppHelp"); if(!d) return; var p=d.querySelector("p.rep435"); if(!p){ p=document.createElement("p"); p.className="rep435"; d.appendChild(p); } var h=HELP[lg()]||HELP.en; if(p.innerHTML!==h) p.innerHTML=h; }
  var st=document.createElement("style"); st.textContent="#btnRep .r435,#bppFsRep .r435{font-size:.78rem;white-space:nowrap;font-family:inherit;filter:grayscale(1)}#bppFsBar #bppFsRep .r435{font-size:1rem}#btnRep.act358,#bppFsRep.act358{background:linear-gradient(180deg,#e2be5a,#b8902a)!important;color:#1b1406!important}"; document.head.appendChild(st);
  document.addEventListener("click",function(e){ var b=e.target&&e.target.closest&&e.target.closest("#btnRep,#bppFsRep"); if(!b) return; e.preventDefault(); e.stopImmediatePropagation(); cycle(1); },true);
  var lastI=null;
  setInterval(function(){ try{ hookNb(); under(); paint();
    if(mode==="str" && !window.bppStanzaLoop && playing()){ arm(true); } /* nach Prayer-/Quellwechsel neu an der aktuellen Strophe einhaken */
  }catch(e){} },300);
})();
/* [Grok-Bot] V4.35: Taste "Wochentage" (nur bei Menue+): Tagesleiste nur sichtbar bei Menue+ UND Taste ein. Standard aus, gespeichert in "bpp-wd435".
   Beschriftung = naechste Aktion, gold = Tagesleiste an. Platz bleibt reserviert (visibility), daher kein Springen. */
(function(){
  var K="bpp-wd435", on=false; try{ on=localStorage.getItem(K)==="1"; }catch(e){}
  var TX={de:["Wochentage ein","Wochentage aus","Tagesleiste (Mo–So, Alle) einblenden","Tagesleiste ausblenden"],en:["Weekdays on","Weekdays off","Show the day bar (Mon–Sun, All)","Hide the day bar"],fr:["Jours : afficher","Jours : masquer","Afficher la barre des jours","Masquer la barre des jours"],es:["Días: mostrar","Días: ocultar","Mostrar la barra de días","Ocultar la barra de días"],ru:["Дни недели: показать","Дни недели: скрыть","Показать панель дней","Скрыть панель дней"],hi:["सप्ताह के दिन दिखाएँ","सप्ताह के दिन छिपाएँ","दिनों की पट्टी दिखाएँ","दिनों की पट्टी छिपाएँ"],pt:["Dias: mostrar","Dias: ocultar","Mostrar a barra de dias","Ocultar a barra de dias"],cz:["Dny zapnout","Dny vypnout","Zobrazit lištu dnů","Skrýt lištu dnů"]};
  var HP={de:"<b>Wochentage (nur bei Menü+):</b> blendet die Tagesleiste Mo–So/Alle ein oder aus; Standard aus, gold = sichtbar. Die Beschriftung zeigt die nächste Aktion. <i>(von Grok ergänzt)</i>",en:"<b>Weekdays (Menu+ only):</b> shows or hides the day bar Mon–Sun/All; default off, gold = visible. The label shows the next action. <i>(added by Grok)</i>",fr:"<b>Jours (seulement avec Menu+) :</b> affiche ou masque la barre des jours ; par défaut masquée, doré = visible. <i>(ajouté par Grok)</i>",es:"<b>Días (solo con Menú+):</b> muestra u oculta la barra de días; por defecto oculta, dorado = visible. <i>(añadido por Grok)</i>",ru:"<b>Дни недели (только с Меню+):</b> показывает или скрывает панель дней; по умолчанию скрыта, золото = видна. <i>(добавлено Grok)</i>",hi:"<b>सप्ताह के दिन (केवल मेनू+ में):</b> दिनों की पट्टी दिखाता/छिपाता है; डिफ़ॉल्ट बंद, सुनहरा = दिख रही। <i>(Grok द्वारा जोड़ा गया)</i>",pt:"<b>Dias (só com Menu+):</b> mostra ou oculta a barra de dias; padrão oculta, dourado = visível. <i>(adicionado pelo Grok)</i>",cz:"<b>Dny (jen s Menu+):</b> zobrazí nebo skryje lištu dnů; výchozí vypnuto, zlatá = viditelná. <i>(doplněno Grokem)</i>"};
  function t(){ return TX[(typeof lang!=="undefined"&&TX[lang])?lang:"en"]; }
  var st=document.createElement("style"); st.textContent="body:not(.menu-full) #btnWd435{display:none!important}body:not(.wd435) .daybar{visibility:hidden!important;pointer-events:none!important}#btnWd435.gold{background:#d4a017!important;color:#000!important;border-color:#b8860b!important}"; document.head.appendChild(st);
  var b=null;
  function paint(){ document.body.classList.toggle("wd435",on);
    if(!b||!document.body.contains(b)){ var det=document.getElementById("btnDet"); if(!det) return; b=document.createElement("button"); b.type="button"; b.id="btnWd435"; b.className=det.className.replace(/\b(on|gold|act358|s358)\b/g,"");
      b.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); on=!on; try{ localStorage.setItem(K,on?"1":"0"); }catch(x){} paint(); }); det.parentNode.insertBefore(b,det.nextSibling); }
    var x=t(), lab=on?x[1]:x[0], tt=(on?x[3]:x[2])+" (von Grok ergänzt)"; if(b.textContent!==lab) b.textContent=lab; if(b.title!==tt) b.title=tt; if(b.getAttribute("aria-pressed")!==(on?"true":"false")) b.setAttribute("aria-pressed",on?"true":"false");
    if(b.classList.contains("gold")!==on) b.classList.toggle("gold",on);
    var d=document.getElementById("bppHelp"); if(d){ var p=d.querySelector("p.wd435"); if(!p){ p=document.createElement("p"); p.className="wd435"; d.appendChild(p); } var h=HP[(typeof lang!=="undefined"&&HP[lang])?lang:"en"]; if(p.innerHTML!==h) p.innerHTML=h; } }
  if(document.body) paint(); document.addEventListener("DOMContentLoaded",paint); setInterval(function(){ try{ paint(); }catch(e){} },400);
})();
