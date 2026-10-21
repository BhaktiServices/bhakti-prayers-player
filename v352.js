/* [Grok-Bot] V3.52: Tastenkuerzel fuer alle Knoepfe (im Hover-Text), Menue+ immer ganz rechts hinter Spalten,
   Spalten immer sichtbar, Abschnitt "Tastenkuerzel" in der Hilfe (6 Sprachen).
   Flacker-Ursache (Hanuman, Mitlesen springt links/rechts) behoben in v224.js (alte Marken alle 1,5 s). */
window.BPP_BUILD="3.75"; window.BPP_SHOW="3.75";
(function(){
  function $(i){ return document.getElementById(i); }
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return SPC[l]?l:"en"; }
  var SPC={de:"Leertaste",en:"Space",fr:"Espace",es:"Espacio",ru:"Пробел",hi:"स्पेस",pt:"Espaço"};
  var MENU={de:"Weitere Knöpfe ein/aus",en:"More buttons on/off",fr:"Plus de boutons",es:"Más botones",ru:"Больше кнопок",hi:"और बटन",pt:"Mais botões lig./desl."};
  /* Taste -> Knopf. Leertaste/P, N/V, Pfeile, Bild auf/ab, Esc bleiben wie bisher (index, v313, v307, v183). */
  var K={"j":"btnBack30","l":"btnFwd30",",":"btnBack10",".":"btnFwd10","N":"btnPNext","V":"btnPPrev",
    "r":"btnRep","m":"btnAuto","g":"btnFs","t":"btnDe","a":"btnCh","s":"btnCols","+":"btnMenu",
    "b":"btnXpDown","#":"btnXpUp","x":"btnXpZero","8":"btnCapoDown","9":"btnCapoUp","0":"btnCapoZero",
    "q":"btnDet","o":"btnOffAll","i":"btnInstall","w":"bppShare"};
  var LAB={btnBack30:"J",btnFwd30:"L",btnBack10:",",btnFwd10:".",btnPNext:"⇧N",btnPPrev:"⇧V",btnRep:"R",btnAuto:"M",btnFs:"G",
    btnDe:"T",btnCh:"A",btnCols:"S",btnMenu:"+",btnXpDown:"B",btnXpUp:"#",btnXpZero:"X",btnCapoDown:"8",btnCapoUp:"9",btnCapoZero:"0",
    btnDet:"Q",btnOffAll:"O",btnInstall:"I",bppShare:"W",btnSrcYt:"Y",btnSrcMp3:"Y",btnNext:"N",btnPrev:"V"};
  function typing(t){ t=t||document.activeElement; var n=t&&t.tagName; return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable); }
  function vis(b){ return b && b.offsetParent!==null; }
  document.addEventListener("keydown",function(e){
    if(e.ctrlKey||e.altKey||e.metaKey||typing(e.target)) return;
    var k=e.key||"", id=null;
    if(k==="h"||k==="H"&&!e.shiftKey||k==="?"){ e.preventDefault(); e.stopPropagation(); try{ window.bppHelp&&window.bppHelp(); }catch(x){} return; }
    if(k==="y"||k==="Y"&&!e.shiftKey){ var y=$("btnSrcYt"), f=$("btnSrcMp3"); var t=(y&&!y.classList.contains("gold"))?y:f; if(t){ e.preventDefault(); e.stopPropagation(); t.click(); } return; }
    if(e.shiftKey&&(k==="N"||k==="V")) id=K[k];
    else if(!e.shiftKey||"+#?".indexOf(k)>=0) id=K[k.length===1&&/[A-Z]/.test(k)?k.toLowerCase():k];
    if(!id) return;
    var b=$(id); if(!b) return;
    if((id==="btnBack10"||id==="btnFwd10")&&b.disabled) return;
    if(e.repeat&&!/Back|Fwd|Xp|Capo/.test(id)) { e.preventDefault(); return; }
    e.preventDefault(); e.stopPropagation(); b.click();
  },true);
  function titles(){
    var l=lg();
    Object.keys(LAB).forEach(function(id){ var b=$(id); if(!b) return;
      if(id==="btnMenu"){ var mt=MENU[l]+" (+)"; if(b.title!==mt) b.title=mt; return; } /* V3.54: Sprache wechselt auch hier */
      if(id==="btnPNext"||id==="btnPPrev"){ /* v205: Titel = "Teil vor ': '" + Gebetsname -> Taste in den ersten Teil */
        var p0=String(b.title||"").split(": ")[0]; if(p0&&p0.indexOf("("+LAB[id]+")")<0) b.title=p0+" ("+LAB[id]+")"; return; }
      if(id==="btnMenu"&&!b.__base352&&!b.title) b.title=MENU[l];
      if(b.title===b.__k352&&b.__l352===l) return; if(/ \([^()]{1,3}\)$/.test(b.title)&&b.title.slice(-LAB[id].length-2)==="("+LAB[id]+")"){ b.__k352=b.title; b.__l352=l; return; }
      var base=(b.title===b.__k352?b.__base352:b.title)||"";
      if(id==="btnMenu"&&(!base||base===MENU[b.__l352||"en"])) base=MENU[l];
      base=base.replace(/\s*\(Space\)$/,"");
      b.__base352=base; b.__l352=l; b.__k352=base+" ("+LAB[id]+")"; b.title=b.__k352; });
    var p=$("btnPlay"); if(p){ var w=SPC[l]+" / P";
      if(p.title!==p.__k352||p.__l352!==l){ var bs=(p.title===p.__k352?p.__base352:p.title).replace(/\s*\(Space\)$/,""); p.__base352=bs; p.__l352=l; p.__k352=bs+" ("+w+")"; p.title=p.__k352; } }
  }
  function order(){
    var r=$("bppL5"), c=$("btnCols"), m=$("btnMenu"); if(!r) return;
    if(c){ if(c.style.display==="none") c.style.display=""; if(c.parentNode!==r||m&&c.nextElementSibling!==m) r.insertBefore(c, m&&m.parentNode===r?m:null); }
    if(m&&r.lastElementChild!==m) r.appendChild(m);
  }
  var HT={
    de:["Tastenkürzel","Leertaste / P Abspielen/Pause · J / L −30/+30 s · , / . −10/+10 s · N / V nächste/vorige Strophe · ⇧N / ⇧V nächstes/voriges Gebet · ↑ ↓ Bild↑ Bild↓ Strophe blättern · M Mitlesen · G Groß · Esc Groß verlassen · A Akkorde · T Übersetzung · S Spalten · + Menü+ · R Wiederholen · Y YouTube/MP3 · B / # / X Akkorde tiefer/höher/Original · 8 / 9 / 0 Tonhöhe −/+/0 · Q Herkunft, Quellen · O Gebete laden · I App installieren · W Teilen · H / ? Hilfe. Die Kürzel stehen auch im Hover-Text der Knöpfe; sie wirken nicht beim Tippen in einem Feld und nicht mit Strg/Alt/Cmd."],
    en:["Keyboard shortcuts","Space / P play/pause · J / L −30/+30 s · , / . −10/+10 s · N / V next/previous stanza · ⇧N / ⇧V next/previous prayer · ↑ ↓ PgUp PgDn turn stanzas · M follow · G big · Esc leave big · A chords · T translation · S columns · + Menu+ · R repeat · Y YouTube/MP3 · B / # / X chords down/up/original · 8 / 9 / 0 pitch −/+/0 · Q origin, sources · O download prayers · I install app · W share · H / ? help. The keys are also shown in each button's hover text; they do nothing while typing in a field or with Ctrl/Alt/Cmd."],
    fr:["Raccourcis clavier","Espace / P lecture/pause · J / L −30/+30 s · , / . −10/+10 s · N / V strophe suivante/précédente · ⇧N / ⇧V prière suivante/précédente · ↑ ↓ PgPréc PgSuiv tourner les strophes · M suivre · G grand · Échap quitter grand · A accords · T traduction · S colonnes · + Menu+ · R répéter · Y YouTube/MP3 · B / # / X accords plus bas/haut/original · 8 / 9 / 0 hauteur −/+/0 · Q origine, sources · O télécharger · I installer l’app · W partager · H / ? aide. Les touches figurent aussi dans l’info-bulle des boutons ; inactives pendant la saisie ou avec Ctrl/Alt/Cmd."],
    es:["Atajos de teclado","Espacio / P reproducir/pausa · J / L −30/+30 s · , / . −10/+10 s · N / V estrofa siguiente/anterior · ⇧N / ⇧V oración siguiente/anterior · ↑ ↓ RePág AvPág pasar estrofas · M seguir · G grande · Esc salir de grande · A acordes · T traducción · S columnas · + Menú+ · R repetir · Y YouTube/MP3 · B / # / X acordes abajo/arriba/original · 8 / 9 / 0 tono −/+/0 · Q origen, fuentes · O descargar · I instalar app · W compartir · H / ? ayuda. Las teclas aparecen también en el texto emergente de cada botón; no actúan al escribir en un campo ni con Ctrl/Alt/Cmd."],
    ru:["Горячие клавиши","Пробел / P пуск/пауза · J / L −30/+30 с · , / . −10/+10 с · N / V следующий/предыдущий куплет · ⇧N / ⇧V следующая/предыдущая молитва · ↑ ↓ PgUp PgDn листать куплеты · M следить · G крупно · Esc выйти из крупного · A аккорды · T перевод · S колонки · + Меню+ · R повтор · Y YouTube/MP3 · B / # / X аккорды ниже/выше/исходно · 8 / 9 / 0 высота −/+/0 · Q источник · O скачать молитвы · I установить приложение · W поделиться · H / ? помощь. Клавиши видны и во всплывающей подсказке кнопок; не работают при вводе текста и с Ctrl/Alt/Cmd."],
    hi:["कीबोर्ड शॉर्टकट","स्पेस / P चलाएँ/रोकें · J / L −30/+30 सेकंड · , / . −10/+10 सेकंड · N / V अगला/पिछला पद · ⇧N / ⇧V अगली/पिछली प्रार्थना · ↑ ↓ PgUp PgDn पद पलटें · M साथ पढ़ें · G बड़ा · Esc बड़े से बाहर · A कॉर्ड · T अनुवाद · S कॉलम · + मेनू+ · R दोहराएँ · Y YouTube/MP3 · B / # / X कॉर्ड नीचे/ऊपर/मूल · 8 / 9 / 0 पिच −/+/0 · Q स्रोत · O प्रार्थनाएँ डाउनलोड · I ऐप इंस्टॉल · W साझा करें · H / ? मदद। बटन पर माउस रखने पर भी कुंजी दिखती है; किसी फ़ील्ड में लिखते समय या Ctrl/Alt/Cmd के साथ काम नहीं करती।"],pt:["Atalhos de teclado","Espaço / P tocar/pausa · J / L −30/+30 s · , / . −10/+10 s · N / V estrofe seguinte/anterior · ⇧N / ⇧V oração seguinte/anterior · ↑ ↓ PgUp PgDn virar estrofes · M acompanhar · G grande · Esc sair do grande · A acordes · T tradução · S colunas · + Menu+ · R repetir · Y YouTube/MP3 · B / # / X acordes abaixo/acima/original · 8 / 9 / 0 altura −/+/0 · Q origem, fontes · O baixar orações · I instalar app · W compartilhar · H / ? ajuda. As teclas aparecem também no texto ao passar o mouse sobre cada botão; não funcionam ao digitar num campo nem com Ctrl/Alt/Cmd."]};
  function help(){ var d=$("bppHelp"); if(!d||d.__k352) return; d.__k352=1; var t=HT[lg()]||HT.en, jg=d.querySelector(".jg"); if(!jg) return;
    var p=document.createElement("p"); p.innerHTML="<b>"+t[0]+":</b> "+t[1]; jg.parentNode.insertBefore(p,jg); }
  function tick(){ try{ order(); }catch(e){} try{ titles(); }catch(e){} try{ help(); }catch(e){} }
  tick(); setInterval(tick,400);
  /* Titel, die andere Skripte neu setzen (z.B. Naechstes Gebet, Wiederholen), sofort wieder mit Taste versehen */
  try{ var pend=0; new MutationObserver(function(){ if(pend) return; pend=1; setTimeout(function(){ pend=0; try{ titles(); }catch(e){} },30); }).observe(document.body,{subtree:true,attributes:true,attributeFilter:["title"]}); }catch(e){}
  document.addEventListener("pointerover",function(){ try{ titles(); }catch(e){} },true);
})();
