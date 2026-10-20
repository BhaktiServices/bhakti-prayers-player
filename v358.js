/* [Grok-Bot] V3.58: Umschalt-Knoepfe zeigen die AKTION, die ein Druck ausloest (nicht den Zustand); Hover/aria ebenso (+ Taste).
   Aktiv mit einer Stufe: Gold. Zwei Aktiv-Stufen (Akkorde, Spalten, Wiederholen): 1. Stufe Silber (s358), 2. Stufe Gold (act358). Inaktiv: Standard. 7 Sprachen. */
(function(){
  var L={
   de:{play:"Play",pause:"Pause",autoOn:"Mitlesen an",autoOff:"Mitlesen aus",chOn:"Akkorde an",chLine:"Akkorde in Zeile",chOff:"Akkorde aus",trOn:"Übersetzung an",trOff:"Übersetzung aus",col1:"1 Spalte",colN:"{n} Spalten",detOn:"Quellen zeigen",detOff:"Quellen ausblenden",menuOn:"Menü+",menuOff:"Menü−",tPlay:"Abspielen",tPause:"Anhalten",tMenuOn:"Weitere Knöpfe zeigen",tMenuOff:"Weitere Knöpfe ausblenden",tCols:"Umschalten auf"},
   en:{play:"Play",pause:"Pause",autoOn:"Follow on",autoOff:"Follow off",chOn:"Chords on",chLine:"Chords in line",chOff:"Chords off",trOn:"Translation on",trOff:"Translation off",col1:"1 column",colN:"{n} columns",detOn:"Show sources",detOff:"Hide sources",menuOn:"Menu+",menuOff:"Menu−",tPlay:"Play",tPause:"Pause",tMenuOn:"Show more buttons",tMenuOff:"Hide more buttons",tCols:"Switch to"},
   fr:{play:"Lecture",pause:"Pause",autoOn:"Suivre oui",autoOff:"Suivre non",chOn:"Accords oui",chLine:"Accords en ligne",chOff:"Accords non",trOn:"Traduction oui",trOff:"Traduction non",col1:"1 colonne",colN:"{n} colonnes",detOn:"Afficher les sources",detOff:"Masquer les sources",menuOn:"Menu+",menuOff:"Menu−",tPlay:"Lire",tPause:"Mettre en pause",tMenuOn:"Afficher plus de boutons",tMenuOff:"Masquer des boutons",tCols:"Passer à"},
   es:{play:"Play",pause:"Pausa",autoOn:"Seguir sí",autoOff:"Seguir no",chOn:"Acordes sí",chLine:"Acordes en línea",chOff:"Acordes no",trOn:"Traducción sí",trOff:"Traducción no",col1:"1 columna",colN:"{n} columnas",detOn:"Mostrar fuentes",detOff:"Ocultar fuentes",menuOn:"Menú+",menuOff:"Menú−",tPlay:"Reproducir",tPause:"Pausar",tMenuOn:"Mostrar más botones",tMenuOff:"Ocultar botones",tCols:"Cambiar a"},
   ru:{play:"Play",pause:"Пауза",autoOn:"Следить вкл",autoOff:"Следить выкл",chOn:"Аккорды вкл",chLine:"Аккорды в строке",chOff:"Аккорды выкл",trOn:"Перевод вкл",trOff:"Перевод выкл",col1:"1 колонка",colN:"{n} колонки",detOn:"Показать источники",detOff:"Скрыть источники",menuOn:"Меню+",menuOff:"Меню−",tPlay:"Воспроизвести",tPause:"Пауза",tMenuOn:"Показать больше кнопок",tMenuOff:"Скрыть кнопки",tCols:"Переключить на"},
   hi:{play:"चलाएँ",pause:"रोकें",autoOn:"साथ पढ़ें चालू",autoOff:"साथ पढ़ें बंद",chOn:"कॉर्ड चालू",chLine:"कॉर्ड पंक्ति में",chOff:"कॉर्ड बंद",trOn:"अनुवाद चालू",trOff:"अनुवाद बंद",col1:"1 कॉलम",colN:"{n} कॉलम",detOn:"स्रोत दिखाएँ",detOff:"स्रोत छिपाएँ",menuOn:"मेनू+",menuOff:"मेनू−",tPlay:"चलाएँ",tPause:"रोकें",tMenuOn:"और बटन दिखाएँ",tMenuOff:"बटन छिपाएँ",tCols:"बदलें:"},
   pt:{play:"Play",pause:"Pausa",autoOn:"Acompanhar lig.",autoOff:"Acompanhar desl.",chOn:"Acordes lig.",chLine:"Acordes na linha",chOff:"Acordes desl.",trOn:"Tradução lig.",trOff:"Tradução desl.",col1:"1 coluna",colN:"{n} colunas",detOn:"Mostrar fontes",detOff:"Ocultar fontes",menuOn:"Menu+",menuOff:"Menu−",tPlay:"Reproduzir",tPause:"Pausar",tMenuOn:"Mostrar mais botões",tMenuOff:"Ocultar botões",tCols:"Mudar para"}};
  var KEY={btnPlay:"Space / P",btnAuto:"M",btnCh:"A",btnDe:"T",btnCols:"S",btnMenu:"+",btnDet:"Q"};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return L[l]?l:"en"; }
  function $(i){ return document.getElementById(i); }
  function playing(){ try{ return !!isPlaying(); }catch(e){ return false; } }
  function maxCols(){ var w=window.innerWidth||1000; return w<700?1:(w<1100?2:3); }
  function cols(){ var v=parseInt(localStorage.getItem("bpp-cols")||"1",10); v=v>=1&&v<=3?v:1; return Math.min(v,maxCols()); }
  function state(){ var t=L[lg()], b=document.body, S={};
    var p=playing(); S.btnPlay=[p?t.pause:t.play,p,p?t.tPause:t.tPlay];
    var au=typeof autoScroll!=="undefined"&&!!autoScroll; S.btnAuto=[au?t.autoOff:t.autoOn,au];
    var cm=typeof chMode!=="undefined"?chMode:"aus"; S.btnCh=[cm==="akk"?t.chLine:(cm==="zeile"?t.chOff:t.chOn),cm==="akk"?1:(cm==="zeile"?2:0)];
    var de=typeof showDe!=="undefined"&&!!showDe; S.btnDe=[de?t.trOff:t.trOn,de];
    var n=cols(), mx=maxCols(), nx=n>=mx?1:n+1; S.btnCols=[nx===1?t.col1:t.colN.replace("{n}",nx),n===2?1:(n===3?2:0),t.tCols+" "+(nx===1?t.col1:t.colN.replace("{n}",nx))];
    var mf=b.classList.contains("menu-full"); S.btnMenu=[mf?t.menuOff:t.menuOn,mf,mf?t.tMenuOff:t.tMenuOn];
    var dt=b.classList.contains("show-det"); S.btnDet=[dt?t.detOff:t.detOn,dt];
    return S; }
  var HELP={de:"<b>Farben:</b> Ein Knopf zeigt, was ein Druck bewirkt. <b>Gold</b> = eingeschaltet. Knöpfe mit zwei Stufen (Akkorde, Spalten, Wiederholen): <b>Silber</b> = erste Stufe, <b>Gold</b> = zweite Stufe. Zum Schließen hier tippen, ✕ oder Esc.",
   en:"<b>Colours:</b> a button shows what pressing it will do. <b>Gold</b> = on. Buttons with two levels (chords, columns, repeat): <b>silver</b> = first level, <b>gold</b> = second level. Tap here, ✕ or Esc to close.",
   fr:"<b>Couleurs :</b> un bouton indique ce que fera un appui. <b>Or</b> = activé. Boutons à deux niveaux (accords, colonnes, répétition) : <b>argent</b> = premier niveau, <b>or</b> = second niveau. Appuyez ici, sur ✕ ou Échap pour fermer.",
   es:"<b>Colores:</b> un botón muestra lo que hará al pulsarlo. <b>Dorado</b> = activado. Botones con dos niveles (acordes, columnas, repetir): <b>plateado</b> = primer nivel, <b>dorado</b> = segundo nivel. Toca aquí, ✕ o Esc para cerrar.",
   ru:"<b>Цвета:</b> кнопка показывает, что произойдёт при нажатии. <b>Золотой</b> = включено. Кнопки с двумя ступенями (аккорды, колонки, повтор): <b>серебряный</b> = первая ступень, <b>золотой</b> = вторая. Нажмите здесь, ✕ или Esc, чтобы закрыть.",
   hi:"<b>रंग:</b> बटन दिखाता है कि दबाने पर क्या होगा। <b>सुनहरा</b> = चालू। दो स्तरों वाले बटन (कॉर्ड, कॉलम, दोहराएँ): <b>चाँदी</b> = पहला स्तर, <b>सुनहरा</b> = दूसरा स्तर। बंद करने के लिए यहाँ टैप करें, ✕ या Esc।",
   pt:"<b>Cores:</b> um botão mostra o que acontece ao premi-lo. <b>Dourado</b> = ligado. Botões com dois níveis (acordes, colunas, repetir): <b>prateado</b> = primeiro nível, <b>dourado</b> = segundo nível. Toque aqui, ✕ ou Esc para fechar."};
  function help(){ var d=$("bppHelp"); if(!d) return; var l=lg(), ps=d.querySelectorAll("p");
    for(var k=ps.length-1;k>=0;k--){ var p=ps[k]; if(p.getAttribute("data-h358")===l) return;
      if(p.getAttribute("data-h358")||(p.firstElementChild&&p.firstElementChild.tagName==="B"&&p.textContent.indexOf("✕")>=0&&p.textContent.indexOf("Esc")>=0||p.textContent.indexOf("Échap")>=0&&p.textContent.indexOf("✕")>=0)){
        p.innerHTML=HELP[l]; p.setAttribute("data-h358",l); return; } } }
  var css=document.createElement("style");
  css.textContent="button.act358,button.act358.on,button.act358.gold{background:linear-gradient(180deg,#e2be5a,#b8902a)!important;color:#1b1406!important;border:1px solid #f0d68a!important;animation:none!important;font-weight:600}"+
   "button.s358,button.s358.on,button.s358.gold{background:linear-gradient(180deg,#eef0f3,#b9bec6)!important;color:#141820!important;border:1px solid #f4f6f8!important;animation:none!important;font-weight:600}"+
   "button.s358 svg,button.act358 svg{color:inherit}"+
   "button.m358:not(.act358).on,button.m358:not(.act358).gold{background:revert-layer;color:revert-layer;border-color:revert-layer;animation:none!important}";
  document.head.appendChild(css);
  var busy=false;
  function apply(){ if(busy) return; busy=true; try{ var S=state();
    Object.keys(S).forEach(function(id){ var b=$(id); if(!b) return; var s=S[id];
      b.classList.add("m358"); if(b.textContent!==s[0]) b.textContent=s[0];
      var lv=s[1]===true?2:(s[1]===false?0:s[1]); if(b.classList.contains("act358")!==(lv===2)) b.classList.toggle("act358",lv===2); if(b.classList.contains("s358")!==(lv===1)) b.classList.toggle("s358",lv===1);
      if(b.classList.contains("on")) b.classList.remove("on"); if(b.classList.contains("gold")) b.classList.remove("gold");
      if(id!=="btnMenu"){ var ti=(s[2]||s[0])+(id==="btnPlay"?"":" ("+KEY[id]+")"); if(id==="btnPlay"&&b.title.indexOf(ti+" (")===0){} else if(b.title!==ti) b.title=ti; } if(b.getAttribute("aria-label")!==s[0]) b.setAttribute("aria-label",s[0]);
      b.setAttribute("aria-pressed",lv?"true":"false"); });
    var r=$("btnRep"); if(r){ var rp=+(localStorage.getItem("bpp-rep")||0); rp=rp===1||rp===2?rp:0; r.classList.add("m358"); r.classList.remove("on","gold");
      if(r.classList.contains("s358")!==(rp===1)) r.classList.toggle("s358",rp===1); if(r.classList.contains("act358")!==(rp===2)) r.classList.toggle("act358",rp===2); }
    help(); } catch(e){} busy=false; }
  window.bppV358=apply;
  setInterval(apply,250);
  try{ var pend=0; new MutationObserver(function(){ if(busy||pend) return; pend=1; requestAnimationFrame(function(){ pend=0; apply(); }); }).observe(document.querySelector(".bar")||document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:["class"]}); }catch(e){}
  document.addEventListener("click",function(){ setTimeout(apply,0); setTimeout(apply,120); },true);
  ["play","pause","playing","ended"].forEach(function(ev){ document.addEventListener(ev,function(){ setTimeout(apply,0); },true); });
})();
