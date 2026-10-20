/* [Grok-Bot] V3.57: Klar sichtbarer Abschnitt "Tastenkuerzel" in der Hilfe (7 Sprachen) als Liste, direkt unter der Ueberschrift.
   Grund: v352 haengte nur eine einzelne Fliesstext-Zeile ganz unten (vor .jg) an, ohne PT, und nur einmal pro Hilfe-Element (Flag __k352) -
   nach Sprachwechsel/Neuaufbau fehlte sie bzw. ging im Text unter. */
(function(){
  var KEYS=[["Leertaste / P","play"],["J / L","j"],[", / .","c"],["N / V","n"],["⇧N / ⇧V","sn"],["M","m"],["G","g"],["Esc","esc"],["A","a"],["T","t"],["S","s"],["+","plus"],["Q","q"],["H / ?","h"]];
  var SPACE={de:"Leertaste",en:"Space",fr:"Espace",es:"Espacio",ru:"Пробел",hi:"स्पेस",pt:"Espaço"};
  var T={
   de:{hd:"Tastenkürzel",play:"Abspielen / Pause",j:"30 s zurück / vor",c:"10 s zurück / vor",n:"nächste / vorige Strophe",sn:"nächstes / voriges Gebet",m:"Mitlesen ein/aus",g:"Groß (Vollbild)",esc:"Groß bzw. Hilfe schließen",a:"Akkorde",t:"Übersetzung ein/aus",s:"Spalten",plus:"Menü+ (weitere Knöpfe)",q:"Details",h:"diese Hilfe"},
   en:{hd:"Keyboard shortcuts",play:"Play / pause",j:"30 s back / forward",c:"10 s back / forward",n:"next / previous stanza",sn:"next / previous prayer",m:"Follow along on/off",g:"Big (full screen)",esc:"Leave big view / close help",a:"Chords",t:"Translation on/off",s:"Columns",plus:"Menu+ (more buttons)",q:"Details",h:"this help"},
   fr:{hd:"Raccourcis clavier",play:"Lecture / pause",j:"30 s en arrière / en avant",c:"10 s en arrière / en avant",n:"strophe suivante / précédente",sn:"prière suivante / précédente",m:"Suivre le texte oui/non",g:"Grand (plein écran)",esc:"Quitter le grand affichage / fermer l’aide",a:"Accords",t:"Traduction oui/non",s:"Colonnes",plus:"Menu+ (plus de boutons)",q:"Détails",h:"cette aide"},
   es:{hd:"Atajos de teclado",play:"Reproducir / pausa",j:"30 s atrás / adelante",c:"10 s atrás / adelante",n:"estrofa siguiente / anterior",sn:"oración siguiente / anterior",m:"Seguir el texto sí/no",g:"Grande (pantalla completa)",esc:"Salir de grande / cerrar ayuda",a:"Acordes",t:"Traducción sí/no",s:"Columnas",plus:"Menú+ (más botones)",q:"Detalles",h:"esta ayuda"},
   ru:{hd:"Горячие клавиши",play:"Воспроизведение / пауза",j:"30 с назад / вперёд",c:"10 с назад / вперёд",n:"следующий / предыдущий куплет",sn:"следующая / предыдущая молитва",m:"Следить за текстом вкл/выкл",g:"Крупно (полный экран)",esc:"Выйти из крупного вида / закрыть справку",a:"Аккорды",t:"Перевод вкл/выкл",s:"Колонки",plus:"Меню+ (больше кнопок)",q:"Подробности",h:"эта справка"},
   hi:{hd:"कीबोर्ड शॉर्टकट",play:"चलाएँ / रोकें",j:"30 सेकंड पीछे / आगे",c:"10 सेकंड पीछे / आगे",n:"अगला / पिछला पद",sn:"अगली / पिछली प्रार्थना",m:"साथ पढ़ें चालू/बंद",g:"बड़ा (पूर्ण स्क्रीन)",esc:"बड़ा दृश्य / सहायता बंद करें",a:"कॉर्ड",t:"अनुवाद चालू/बंद",s:"कॉलम",plus:"मेनू+ (और बटन)",q:"विवरण",h:"यह सहायता"},
   pt:{hd:"Atalhos de teclado",play:"Reproduzir / pausa",j:"30 s para trás / frente",c:"10 s para trás / frente",n:"estrofe seguinte / anterior",sn:"oração seguinte / anterior",m:"Acompanhar texto lig./desl.",g:"Grande (ecrã inteiro)",esc:"Sair do modo grande / fechar ajuda",a:"Acordes",t:"Tradução lig./desl.",s:"Colunas",plus:"Menu+ (mais botões)",q:"Detalhes",h:"esta ajuda"}};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?l:"en"; }
  var css=document.createElement("style");
  css.textContent="#bppHelp .kb357{margin:.6em 0 .9em;padding:.55em .8em;border:1px solid rgba(212,175,55,.55);border-radius:10px;background:rgba(212,175,55,.08)}"+
    "#bppHelp .kb357 .kbh357{font-weight:700;margin:0 0 .35em;font-size:1.05em;color:#d4af37}#bppHelp .kb357 ul{list-style:none;margin:0;padding:0;columns:2;column-gap:1.4em}"+
    "#bppHelp .kb357 li{break-inside:avoid;margin:.12em 0}#bppHelp .kb357 kbd{display:inline-block;min-width:1.4em;padding:0 .35em;margin-right:.45em;border:1px solid rgba(255,255,255,.4);border-radius:4px;font:600 .9em system-ui,sans-serif;text-align:center}"+
    "@media (max-width:560px){#bppHelp .kb357 ul{columns:1}}";
  document.head.appendChild(css);
  function build(l){ var t=T[l], s=document.createElement("div"); s.className="kb357"; s.setAttribute("data-l",l);
    var h=document.createElement("div"); h.className="kbh357"; h.textContent=t.hd; s.appendChild(h); var ul=document.createElement("ul");
    KEYS.forEach(function(k){ var li=document.createElement("li"); var kb=document.createElement("kbd"); kb.textContent=k[0].replace("Leertaste",SPACE[l]); li.appendChild(kb); li.appendChild(document.createTextNode(t[k[1]])); ul.appendChild(li); });
    s.appendChild(ul); return s; }
  function tick(){ var d=document.getElementById("bppHelp"); if(!d) return; var l=lg(), cur=d.querySelector(".kb357");
    /* alte einzeilige v352-Zeile ausblenden */
    [].forEach.call(d.querySelectorAll("p"),function(p){ var b=p.firstElementChild; if(b&&b.tagName==="B"&&/:$/.test(b.textContent)&&/J \/ L/.test(p.textContent)&&p.style.display!=="none") p.style.display="none"; });
    if(cur&&cur.getAttribute("data-l")===l) return; if(cur) cur.remove();
    var hd=d.querySelector("h1,h2,h3"), box=d.querySelector(".in")||d, n=build(l);
    var after=hd; if(after){ var nx=after.nextElementSibling; if(nx&&nx.tagName==="P") after=nx; after.parentNode.insertBefore(n,after.nextSibling); } else box.appendChild(n); }
  setInterval(tick,300);
})();
