/* [Grok-Bot] V3.02: Tipp auf die Hauptueberschrift zeigt Jukebox (start.jpg) mit Hilfetext; Wiedergabe laeuft weiter */
(function(){
var H={
en:["How to use the player",
"<b>Choose a prayer</b> from the three menus Morning Prayers, Evening Prayers and Other. “All” puts everything in one menu.",
"<b>Playback:</b> Play/Pause, |◀ ▶| steps back or forward through all prayers, Repeat, −30/−10/+10/+30 seconds, tempo, and YT or MP3 as the source (MP3 is the default).",
"<b>Follow:</b> the stanzas scroll along with the singing.",
"<b>Big:</b> full screen. First tap shows the menu, second tap a button.",
"<b>Transl.</b> shows the translation. <b>Chords:</b> off, above the stanza or per line. <b>Key ♭/♯</b> and <b>Pitch −/+</b> transpose.",
"<b>Menü+</b> shows more: Origin and sources, All offline, and the pronunciation guide.",
"<b>Offline and as an app:</b> “All offline” saves the recordings. Use “Add to home screen” or “Install” in your browser to use it like an app.",
"<b>Gold</b> means a setting is on. Tap here, ✕ or Esc to close."],
de:["So funktioniert der Player",
"<b>Gebet wählen</b> über die drei Menüs Morgengebete, Abendgebete und Weitere. „Alle“ zeigt alles in einem Menü.",
"<b>Wiedergabe:</b> Play/Pause, |◀ ▶| springt durch alle Gebete zurück oder vor, Wiederholen, −30/−10/+10/+30 Sekunden, Tempo, und YT oder MP3 als Quelle (MP3 ist Standard).",
"<b>Mitlesen:</b> Die Strophen folgen dem Gesang.",
"<b>Groß:</b> Vollbild. Erster Tipp zeigt das Menü, zweiter Tipp eine Taste.",
"<b>Übers.</b> zeigt die Übersetzung. <b>Akkorde:</b> aus, über der Strophe oder je Zeile. <b>Tonart ♭/♯</b> und <b>Tonhöhe −/+</b> transponieren.",
"<b>Menü+</b> zeigt mehr: Herkunft und Quellen, Alle offline und die Ausspracheleiste.",
"<b>Offline und als App:</b> „Alle offline“ speichert die Aufnahmen. Über „Zum Startbildschirm“ oder „Installieren“ im Browser nutzt du den Player wie eine App.",
"<b>Gold</b> heißt: eingeschaltet. Zum Schließen hier tippen, ✕ oder Esc."],
fr:["Comment utiliser le lecteur",
"<b>Choisissez une prière</b> dans les trois menus Prières du matin, Prières du soir et Autres. « Tout » réunit tout dans un seul menu.",
"<b>Lecture :</b> Lecture/Pause, |◀ ▶| passe à la prière précédente ou suivante, Répéter, −30/−10/+10/+30 secondes, tempo, et YT ou MP3 comme source (MP3 par défaut).",
"<b>Suivre :</b> les strophes défilent avec le chant.",
"<b>Grand :</b> plein écran. Premier toucher : le menu, deuxième toucher : un bouton.",
"<b>Trad.</b> affiche la traduction. <b>Accords :</b> désactivés, au-dessus de la strophe ou par ligne. <b>Tonalité ♭/♯</b> et <b>Hauteur −/+</b> transposent.",
"<b>Menü+</b> affiche plus : Origine et sources, Tout hors ligne et le guide de prononciation.",
"<b>Hors ligne et comme appli :</b> « Tout hors ligne » enregistre les audios. Avec « Ajouter à l’écran d’accueil » ou « Installer » dans le navigateur, il s’utilise comme une appli.",
"<b>Doré</b> signifie activé. Touchez ici, ✕ ou Échap pour fermer."],
es:["Cómo usar el reproductor",
"<b>Elige una oración</b> en los tres menús Oraciones de la mañana, Oraciones de la tarde y Otras. «Todas» lo reúne todo en un menú.",
"<b>Reproducción:</b> Play/Pausa, |◀ ▶| salta a la oración anterior o siguiente, Repetir, −30/−10/+10/+30 segundos, tempo, y YT o MP3 como fuente (MP3 por defecto).",
"<b>Seguir:</b> las estrofas avanzan con el canto.",
"<b>Grande:</b> pantalla completa. Primer toque: el menú; segundo toque: un botón.",
"<b>Trad.</b> muestra la traducción. <b>Acordes:</b> apagados, sobre la estrofa o por línea. <b>Tono ♭/♯</b> y <b>Altura −/+</b> transponen.",
"<b>Menü+</b> muestra más: Origen y fuentes, Todo sin conexión y la guía de pronunciación.",
"<b>Sin conexión y como app:</b> «Todo sin conexión» guarda las grabaciones. Con «Añadir a pantalla de inicio» o «Instalar» en el navegador se usa como una app.",
"<b>Dorado</b> significa activado. Toca aquí, ✕ o Esc para cerrar."],
ru:["Как пользоваться плеером",
"<b>Выберите молитву</b> в трёх меню: Утренние молитвы, Вечерние молитвы и Другие. «Все» объединяет всё в одно меню.",
"<b>Воспроизведение:</b> Play/Пауза, |◀ ▶| — к предыдущей или следующей молитве, Повтор, −30/−10/+10/+30 секунд, темп, источник YT или MP3 (по умолчанию MP3).",
"<b>Следить:</b> строфы прокручиваются вместе с пением.",
"<b>Крупно:</b> полный экран. Первое касание — меню, второе — кнопка.",
"<b>Перев.</b> показывает перевод. <b>Аккорды:</b> выкл., над строфой или по строкам. <b>Тональность ♭/♯</b> и <b>Высота −/+</b> транспонируют.",
"<b>Menü+</b> показывает больше: Происхождение и источники, Всё офлайн и подсказки по произношению.",
"<b>Офлайн и как приложение:</b> «Всё офлайн» сохраняет записи. Через «На главный экран» или «Установить» в браузере плеер работает как приложение.",
"<b>Золотой</b> — значит включено. Коснитесь здесь, ✕ или Esc, чтобы закрыть."],
hi:["प्लेयर कैसे चलाएँ",
"<b>प्रार्थना चुनें</b> तीन मेनू से: प्रातः प्रार्थना, सायं प्रार्थना और अन्य। “सभी” सब कुछ एक मेनू में दिखाता है।",
"<b>चलाना:</b> Play/रोकें, |◀ ▶| सभी प्रार्थनाओं में पीछे या आगे, दोहराएँ, −30/−10/+10/+30 सेकंड, गति, और स्रोत YT या MP3 (MP3 मानक)।",
"<b>साथ पढ़ें:</b> छंद गायन के साथ चलते हैं।",
"<b>बड़ा:</b> पूर्ण स्क्रीन। पहला टैप मेनू, दूसरा टैप बटन।",
"<b>अनुवाद</b> अर्थ दिखाता है। <b>कॉर्ड:</b> बंद, छंद के ऊपर या हर पंक्ति में। <b>स्वर ♭/♯</b> और <b>पिच −/+</b> ट्रांसपोज़ करते हैं।",
"<b>Menü+</b> और दिखाता है: स्रोत, सभी ऑफ़लाइन और उच्चारण संकेत।",
"<b>ऑफ़लाइन और ऐप की तरह:</b> “सभी ऑफ़लाइन” रिकॉर्डिंग सहेजता है। ब्राउज़र में “होम स्क्रीन पर जोड़ें” या “इंस्टॉल” से इसे ऐप की तरह चलाएँ।",
"<b>सुनहरा</b> यानी चालू। बंद करने के लिए यहाँ टैप करें, ✕ या Esc।"]};
function L(){var l=(typeof lang!=="undefined"&&lang)||"en";return H[l]?l:"en";}
var st=document.createElement("style");
st.textContent="h1{cursor:pointer}#bppHelp{position:fixed;inset:0;z-index:2147483500;background:rgba(20,14,10,.96);overflow:auto;-webkit-overflow-scrolling:touch;display:flex;justify-content:center;align-items:flex-start;padding:18px 12px}"+
"#bppHelp .in{max-width:620px;width:100%;color:#f3eee2;font-size:.95rem;line-height:1.45}#bppHelp img{display:block;width:min(260px,60vw);margin:0 auto 10px;border-radius:12px}"+
"#bppHelp h2{color:#e0b45a;font-family:'Gentium Book Plus',Georgia,serif;text-align:center;margin:4px 0 10px;font-size:1.3rem}#bppHelp p{margin:6px 0}#bppHelp b{color:#e0b45a}"+
"#bppHelp .jg{text-align:center;font-size:1.15rem;margin-top:12px}#bppHelp .x{position:fixed;top:10px;right:12px;font-size:1.4rem;background:#3a2c1c;color:#f3eee2;border:1px solid #6b5338;border-radius:8px;width:40px;height:40px;cursor:pointer}";
document.head.appendChild(st);
function close(){var d=document.getElementById("bppHelp");if(d)d.remove();document.removeEventListener("keydown",esc,true);}
function esc(e){if(e.key==="Escape"){e.stopPropagation();e.preventDefault();close();}}
function open(){if(document.getElementById("bppHelp"))return;var t=H[L()];var d=document.createElement("div");d.id="bppHelp";
 d.innerHTML='<button type="button" class="x" aria-label="X">✕</button><div class="in"><img src="start.jpg?v=1" alt=""><h2>'+t[0]+'</h2>'+t.slice(1).map(function(s){return"<p>"+s+"</p>";}).join("")+'<p class="jg"><b>Jai Gurudev</b></p></div>';
 d.addEventListener("click",function(e){e.stopPropagation();close();});
 document.body.appendChild(d);document.addEventListener("keydown",esc,true);}
window.bppHelp=open;
function hook(){var h=document.querySelector("header h1");if(!h)return setTimeout(hook,200);h.addEventListener("click",function(e){e.preventDefault();open();});}
hook();
})();
