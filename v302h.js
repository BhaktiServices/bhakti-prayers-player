/* [Grok-Bot] V3.02: Tipp auf die Hauptueberschrift zeigt Jukebox (start.jpg) mit Hilfetext; Wiedergabe laeuft weiter */
(function(){
var H={
en:["How the Bhakti Prayers Player works",
"<b>Choose a prayer</b> from the three menus Morning Prayers, Evening Prayers and Other. “All” puts everything in one menu.",
"<b>Language:</b> choose it at the top right, next to the version number.",
"<b>Playback:</b> Play/Pause, |◀ ▶| steps back or forward through all prayers, Repeat, −30/−10/+10/+30 seconds, tempo, and YT or MP3 as the source (MP3 is the default).",
"<b>Follow:</b> the stanzas scroll along with the singing.",
"<b>Big:</b> full screen. First tap shows the menu, second tap a button.",
"<b>Turn stanzas by hand</b> (standard view and Big): swipe up/down, mouse wheel or the ↑/↓ and Page keys. Works without audio too, e.g. when singing live. While Follow is on, your step wins; Follow takes over again at the next stanza change.",
"<b>Transl.</b> shows the translation. <b>Chords:</b> off, above the stanza or per line. <b>Key ♭/♯</b> and <b>Pitch −/+</b> transpose.",
"<b>Menü+</b> shows more buttons: Repeat, ±10 s, tempo, YT/MP3, translation, key and pitch.",
"<b>Below the lyrics:</b> “Origin, sources” shows where the lyrics and the MP3 come from (with the booklet note); it hides again after 10 s or when you scroll up. “Download prayers” saves all MP3s for offline use, also on your phone; later only missing or changed files are loaded. Install as an app via “Add to home screen” or “Install” in your browser.",
"<b>Pronunciation:</b> ā ī ū hold long · ṃ ṅ ñ ṇ nasal · ś ṣ soft / hard “sh” · ṛ “ri”.",
"<b>Gold</b> means a setting is on. Tap here, ✕ or Esc to close."],
de:["So funktioniert der Bhakti Prayers Player",
"<b>Gebet wählen</b> über die drei Menüs Morgengebete, Abendgebete und Weitere. „Alle“ zeigt alles in einem Menü.",
"<b>Sprache:</b> oben rechts neben der Versionsnummer wählen.",
"<b>Wiedergabe:</b> Play/Pause, |◀ ▶| springt durch alle Gebete zurück oder vor, Wiederholen, −30/−10/+10/+30 Sekunden, Tempo, und YT oder MP3 als Quelle (MP3 ist Standard).",
"<b>Mitlesen:</b> Die Strophen folgen dem Gesang.",
"<b>Groß:</b> Vollbild. Erster Tipp zeigt das Menü, zweiter Tipp eine Taste.",
"<b>Strophen von Hand weiterblättern</b> (Standardansicht und Groß): wischen hoch/runter, Mausrad oder die Tasten ↑/↓ und Bild↑/↓. Geht auch ohne Ton, z. B. beim echten Singen. Bei Mitlesen hat dein Schritt Vorrang; die Automatik übernimmt beim nächsten Strophenwechsel wieder.",
"<b>Übers.</b> zeigt die Übersetzung. <b>Akkorde:</b> aus, über der Strophe oder je Zeile. <b>Tonart ♭/♯</b> und <b>Tonhöhe −/+</b> transponieren.",
"<b>Menü+</b> zeigt weitere Tasten: Wiederholen, ±10 s, Tempo, YT/MP3, Übersetzung, Tonart und Tonhöhe.",
"<b>Unter den Lyrics:</b> „Herkunft, Quellen“ zeigt, woher Text und MP3 stammen (mit Musikheft-Hinweis); blendet sich nach 10 s oder beim Hochscrollen wieder aus. „Prayers runterladen“ speichert alle MP3s für die Offline-Nutzung, auch am Handy; danach werden nur fehlende oder geänderte Dateien nachgeladen. Als App installieren über „Zum Startbildschirm“ oder „Installieren“ im Browser.",
"<b>Aussprache:</b> ā ī ū lang halten · ṃ ṅ ñ ṇ nasal · ś ṣ weiches / hartes sch · ṛ ri.",
"<b>Gold</b> heißt: eingeschaltet. Zum Schließen hier tippen, ✕ oder Esc."],
fr:["Comment fonctionne le Bhakti Prayers Player",
"<b>Choisissez une prière</b> dans les trois menus Prières du matin, Prières du soir et Autres. « Tout » réunit tout dans un seul menu.",
"<b>Langue :</b> à choisir en haut à droite, à côté du numéro de version.",
"<b>Lecture :</b> Lecture/Pause, |◀ ▶| passe à la prière précédente ou suivante, Répéter, −30/−10/+10/+30 secondes, tempo, et YT ou MP3 comme source (MP3 par défaut).",
"<b>Suivre :</b> les strophes défilent avec le chant.",
"<b>Grand :</b> plein écran. Premier toucher : le menu, deuxième toucher : un bouton.",
"<b>Tourner les strophes à la main</b> (vue normale et Grand) : glisser haut/bas, molette ou touches ↑/↓ et Page. Fonctionne aussi sans audio. Avec Suivre, votre geste a priorité ; le suivi reprend au prochain changement de strophe.",
"<b>Trad.</b> affiche la traduction. <b>Accords :</b> désactivés, au-dessus de la strophe ou par ligne. <b>Tonalité ♭/♯</b> et <b>Hauteur −/+</b> transposent.",
"<b>Menü+</b> affiche d’autres boutons : Répéter, ±10 s, tempo, YT/MP3, traduction, tonalité et hauteur.",
"<b>Sous les paroles :</b> « Origine, sources » indique d’où viennent le texte et le MP3 (avec la note du livret) ; se masque après 10 s ou en remontant. « Télécharger les prières » enregistre tous les MP3 pour l’usage hors ligne, aussi sur mobile ; ensuite seuls les fichiers manquants ou modifiés sont chargés. Installer comme appli via « Ajouter à l’écran d’accueil » ou « Installer ».",
"<b>Prononciation :</b> ā ī ū tenir long · ṃ ṅ ñ ṇ nasal · ś ṣ « ch » doux / dur · ṛ « ri ».",
"<b>Doré</b> signifie activé. Touchez ici, ✕ ou Échap pour fermer."],
es:["Cómo funciona el Bhakti Prayers Player",
"<b>Elige una oración</b> en los tres menús Oraciones de la mañana, Oraciones de la tarde y Otras. «Todas» lo reúne todo en un menú.",
"<b>Idioma:</b> se elige arriba a la derecha, junto al número de versión.",
"<b>Reproducción:</b> Play/Pausa, |◀ ▶| salta a la oración anterior o siguiente, Repetir, −30/−10/+10/+30 segundos, tempo, y YT o MP3 como fuente (MP3 por defecto).",
"<b>Seguir:</b> las estrofas avanzan con el canto.",
"<b>Grande:</b> pantalla completa. Primer toque: el menú; segundo toque: un botón.",
"<b>Pasar estrofas a mano</b> (vista normal y Grande): deslizar arriba/abajo, rueda del ratón o teclas ↑/↓ y RePág/AvPág. Funciona también sin audio. Con Seguir activo manda tu paso; el seguimiento vuelve en el siguiente cambio de estrofa.",
"<b>Trad.</b> muestra la traducción. <b>Acordes:</b> apagados, sobre la estrofa o por línea. <b>Tono ♭/♯</b> y <b>Altura −/+</b> transponen.",
"<b>Menü+</b> muestra más botones: Repetir, ±10 s, tempo, YT/MP3, traducción, tono y altura.",
"<b>Debajo de la letra:</b> «Origen, fuentes» muestra de dónde vienen la letra y el MP3 (con la nota del cuadernillo); se oculta tras 10 s o al subir. «Descargar oraciones» guarda todos los MP3 para usarlos sin conexión, también en el móvil; después solo se cargan los archivos que faltan o han cambiado. Instalar como app con «Añadir a pantalla de inicio» o «Instalar».",
"<b>Pronunciación:</b> ā ī ū alargar · ṃ ṅ ñ ṇ nasal · ś ṣ «sh» suave / fuerte · ṛ «ri».",
"<b>Dorado</b> significa activado. Toca aquí, ✕ o Esc para cerrar."],
ru:["Как работает Bhakti Prayers Player",
"<b>Выберите молитву</b> в трёх меню: Утренние молитвы, Вечерние молитвы и Другие. «Все» объединяет всё в одно меню.",
"<b>Язык:</b> выбирается вверху справа, рядом с номером версии.",
"<b>Воспроизведение:</b> Play/Пауза, |◀ ▶| — к предыдущей или следующей молитве, Повтор, −30/−10/+10/+30 секунд, темп, источник YT или MP3 (по умолчанию MP3).",
"<b>Следить:</b> строфы прокручиваются вместе с пением.",
"<b>Крупно:</b> полный экран. Первое касание — меню, второе — кнопка.",
"<b>Листать строфы вручную</b> (обычный вид и Крупно): свайп вверх/вниз, колёсико мыши или клавиши ↑/↓ и PgUp/PgDn. Работает и без звука. При «Следить» ваш шаг важнее; автоматика вернётся при следующей смене строфы.",
"<b>Перев.</b> показывает перевод. <b>Аккорды:</b> выкл., над строфой или по строкам. <b>Тональность ♭/♯</b> и <b>Высота −/+</b> транспонируют.",
"<b>Menü+</b> показывает больше кнопок: Повтор, ±10 с, темп, YT/MP3, перевод, тональность и высота.",
"<b>Под текстом:</b> «Происхождение, источники» показывает, откуда текст и MP3 (с примечанием из сборника); скрывается через 10 с или при прокрутке вверх. «Скачать молитвы» сохраняет все MP3 для офлайн-использования, и на телефоне; потом догружаются только недостающие или изменённые файлы. Установить как приложение: «На главный экран» или «Установить» в браузере.",
"<b>Произношение:</b> ā ī ū тянуть долго · ṃ ṅ ñ ṇ носовые · ś ṣ мягкое / твёрдое «ш» · ṛ «ри».",
"<b>Золотой</b> — значит включено. Коснитесь здесь, ✕ или Esc, чтобы закрыть."],
hi:["Bhakti Prayers Player कैसे काम करता है",
"<b>प्रार्थना चुनें</b> तीन मेनू से: प्रातः प्रार्थना, सायं प्रार्थना और अन्य। “सभी” सब कुछ एक मेनू में दिखाता है।",
"<b>भाषा:</b> ऊपर दाईं ओर, संस्करण संख्या के पास चुनें।",
"<b>चलाना:</b> Play/रोकें, |◀ ▶| सभी प्रार्थनाओं में पीछे या आगे, दोहराएँ, −30/−10/+10/+30 सेकंड, गति, और स्रोत YT या MP3 (MP3 मानक)।",
"<b>साथ पढ़ें:</b> छंद गायन के साथ चलते हैं।",
"<b>बड़ा:</b> पूर्ण स्क्रीन। पहला टैप मेनू, दूसरा टैप बटन।",
"<b>छंद हाथ से बदलें</b> (सामान्य और बड़ा दृश्य): ऊपर/नीचे स्वाइप, माउस व्हील या ↑/↓ और Page कुंजियाँ। बिना ऑडियो भी चलता है। साथ पढ़ें चालू हो तो आपका कदम पहले; अगले छंद-परिवर्तन पर स्वचालन फिर लौटता है।",
"<b>अनुवाद</b> अर्थ दिखाता है। <b>कॉर्ड:</b> बंद, छंद के ऊपर या हर पंक्ति में। <b>स्वर ♭/♯</b> और <b>पिच −/+</b> ट्रांसपोज़ करते हैं।",
"<b>Menü+</b> और बटन दिखाता है: दोहराएँ, ±10 सेकंड, गति, YT/MP3, अनुवाद, स्वर और पिच।",
"<b>पाठ के नीचे:</b> “स्रोत” बताता है कि पाठ और MP3 कहाँ से हैं (पुस्तिका टिप्पणी सहित); 10 सेकंड बाद या ऊपर स्क्रॉल करने पर छिप जाता है। “प्रार्थनाएँ डाउनलोड करें” सभी MP3 ऑफ़लाइन उपयोग के लिए सहेजता है, मोबाइल पर भी; बाद में केवल छूटी या बदली फ़ाइलें आती हैं। ब्राउज़र में “होम स्क्रीन पर जोड़ें” या “इंस्टॉल” से ऐप की तरह चलाएँ।",
"<b>उच्चारण:</b> ā ī ū लंबा · ṃ ṅ ñ ṇ नासिक्य · ś ṣ कोमल / कठोर “श” · ṛ “रि”।",
"<b>सुनहरा</b> यानी चालू। बंद करने के लिए यहाँ टैप करें, ✕ या Esc।"]};
function L(){var l=(typeof lang!=="undefined"&&lang)||"en";return H[l]?l:"en";}
var st=document.createElement("style");
st.textContent="h1{cursor:pointer}#bppHelp{position:fixed;inset:0;z-index:2147483500;background:rgba(20,14,10,.96);overflow:auto;-webkit-overflow-scrolling:touch;display:flex;justify-content:center;align-items:flex-start;padding:18px 12px}"+
"#bppHelp .in{max-width:680px;width:100%;color:#f3eee2;font-size:1.12rem;line-height:1.55;padding-bottom:60vh}#bppHelp img{display:block;width:min(260px,60vw);margin:0 auto 10px;border-radius:12px}"+
"#bppHelp h2{color:#e0b45a;font-family:'Gentium Book Plus',Georgia,serif;text-align:center;margin:4px 0 12px;font-size:1.5rem}#bppHelp p{margin:9px 0}#bppHelp b{color:#e0b45a}"+
"#bppHelp .jg{text-align:center;font-size:1.15rem;margin-top:12px}#bppHelp .x{position:fixed;top:10px;right:12px;font-size:1.4rem;background:#3a2c1c;color:#f3eee2;border:1px solid #6b5338;border-radius:8px;width:40px;height:40px;cursor:pointer}";
document.head.appendChild(st);
function close(){var d=document.getElementById("bppHelp");if(d)d.remove();document.removeEventListener("keydown",esc,true);}
function esc(e){if(e.key==="Escape"){e.stopPropagation();e.preventDefault();close();}}
function open(){if(document.getElementById("bppHelp"))return;var t=H[L()];var d=document.createElement("div");d.id="bppHelp";
 d.innerHTML='<button type="button" class="x" aria-label="X">✕</button><div class="in"><img src="start.jpg?v=1" alt=""><h2>'+t[0]+'</h2>'+t.slice(1).map(function(s){return"<p>"+s+"</p>";}).join("")+'<p class="jg"><b>Jai Gurudev</b></p></div>';
 d.addEventListener("click",function(e){e.stopPropagation();close();});
 document.body.appendChild(d);document.addEventListener("keydown",esc,true);
 /* [Grok-Bot] V3.09: Abspann - langsam nach oben; Wischen/Rad/Beruehren pausiert (manuell scrollen), nach 4 s weiter */
 var pauseUntil=Date.now()+2500,pos=0,last=performance.now(),SPD=22;
 function hold(){pauseUntil=Date.now()+4000;}
 ["touchstart","touchmove","wheel","pointerdown"].forEach(function(ev){d.addEventListener(ev,hold,{passive:true});});
 (function tick(now){ if(!document.getElementById("bppHelp")) return; var dt=Math.min(0.1,Math.max(0,(now-last)/1000)); last=now;
   if(Date.now()<pauseUntil){ pos=d.scrollTop; } else { pos+=SPD*dt; d.scrollTop=pos; }
   requestAnimationFrame(tick); })(last);
}
window.bppHelp=open;
function hook(){var h=document.querySelector("header h1");if(!h)return setTimeout(hook,200);h.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".lang"))return;e.preventDefault();open();});}
hook();
})();
