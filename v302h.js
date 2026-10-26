/* [Grok-Bot] V3.02: Tipp auf die Hauptueberschrift zeigt Jukebox (start.jpg) mit Hilfetext; Wiedergabe laeuft weiter */
(function(){
/* [Grok-Bot] V3.42: Hilfe komplett ueberarbeitet (Stand V3.41: Vedische Gesaenge, manuelles Springen, X im Grossbild, Offline, App installieren) */
var H={
en:[
"How the Bhakti Prayers Player works",
"<b>Choose a prayer</b> from the menus Morning prayers, Evening prayers, More and Vedic Chants (lyrics only). “All” puts everything in one menu.",
"<b>Language:</b> top right. <b>Help:</b> the “Help – click here” bubble or a tap on the title.",
"<b>Playback:</b> Play/Pause, |◀ ▶| steps through all prayers, −30/+30 s. MP3 is the default source; YouTube only works online.",
"<b>Follow:</b> the stanzas scroll along with the singing.",
"<b>Turn stanzas by hand:</b> swipe, mouse wheel or Page keys. Tap a stanza to move the recording there.",
"<b>Big:</b> full screen with only the current stanza. The ✕ at the top right is always visible and closes it (also Esc). A tap elsewhere shows the control bar; swipe sideways for the previous/next stanza. On phones Big switches to landscape where the browser allows it (Android/Chrome); on iPhone simply turn the phone sideways.",
"<b>Columns 1/2/3</b> (next to the chords button) shows several stanzas side by side, row by row; Follow scrolls to the row of the current stanza. On narrow screens always 1 column, 3 columns from a wide window.",
"<b>Chords:</b> off, above the stanza or per line. <b>Transl.</b> shows the translation. <b>Key ♭/♯</b> and <b>Pitch −/+</b> transpose.",
"<b>Menü+</b> shows more buttons: Repeat, ±10 s, tempo, YT/MP3, translation, key and pitch.",
"<b>Share:</b> the ⤴ button next to the title shares a direct link to this prayer (Follow, chords and translation on). Options: &lang=de, &chords=off|stanza|line, &tr=0.",
"<b>Below the lyrics:</b> “Origin, sources” shows where lyrics and MP3 come from (booklet note).",
"<b>Offline:</b> tap “Download prayers” once while online. After that the player and all MP3s work without internet; later only changed files are loaded. YouTube needs internet. Private/incognito windows delete everything when closed.",
"<b>Install as app:</b> the button below the lyrics puts the player on your home screen in its own window. iPhone/iPad: Safari → Share → “Add to Home Screen”, then tap “Download prayers” once inside the app. Recommended, because Safari otherwise deletes offline data after a few weeks without use.",
"<b>Pronunciation:</b> ā ī ū hold long · ṃ ṅ ñ ṇ nasal · ś ṣ soft / hard “sh” · ṛ “ri”.",
"<b>Gold</b> means a setting is on. Tap here, ✕ or Esc to close."],
de:[
"So funktioniert der Bhakti Prayers Player",
"<b>Gebet wählen</b> über die Menüs Morgengebet, Abendgebet, Weitere und Vedische Gesänge (nur Text). „Alle“ zeigt alles in einem Menü.",
"<b>Sprache:</b> oben rechts. <b>Hilfe:</b> die Blase „Hilfe – hier klicken“ oder ein Tipp auf den Titel.",
"<b>Wiedergabe:</b> Play/Pause, |◀ ▶| springt durch alle Gebete, −30/+30 s. Standard-Quelle ist MP3; YouTube geht nur online.",
"<b>Mitlesen:</b> Die Strophen folgen dem Gesang.",
"<b>Strophen von Hand blättern:</b> wischen, Mausrad oder Bild↑/↓. Tipp auf eine Strophe spult die Aufnahme dorthin.",
"<b>Groß:</b> Vollbild nur mit der aktuellen Strophe. Das ✕ oben rechts ist immer sichtbar und schließt (auch Esc). Ein Tipp sonst zeigt die Leiste; seitlich wischen = vorige/nächste Strophe. Am Handy schaltet Groß ins Querformat, wo der Browser es erlaubt (Android/Chrome); am iPhone das Handy einfach quer drehen.",
"<b>Spalten 1/2/3</b> (neben der Akkorde-Taste) zeigt mehrere Strophen nebeneinander, Reihe für Reihe; Mitlesen scrollt zur Reihe der aktuellen Strophe. Auf schmalen Bildschirmen immer 1 Spalte, 3 Spalten erst bei breitem Fenster.",
"<b>Akkorde:</b> aus, über der Strophe oder je Zeile. <b>Übers.</b> zeigt die Übersetzung. <b>Tonart ♭/♯</b> und <b>Tonhöhe −/+</b> transponieren.",
"<b>Menü+</b> zeigt weitere Tasten: Wiederholen, ±10 s, Tempo, YT/MP3, Übersetzung, Tonart und Tonhöhe.",
"<b>Teilen:</b> Der Knopf ⤴ neben dem Titel teilt einen Direktlink zu diesem Gebet (Mitlesen, Akkorde und Übersetzung an). Optionen: &lang=en, &chords=off|stanza|line, &tr=0.",
"<b>Unter den Lyrics:</b> „Herkunft, Quellen“ zeigt, woher Text und MP3 stammen (Musikheft-Hinweis).",
"<b>Offline:</b> Einmal online „Prayers runterladen“ tippen. Danach laufen Player und alle MP3s ohne Internet; später werden nur geänderte Dateien nachgeladen. YouTube braucht Internet. Private/Inkognito-Fenster löschen beim Schließen alles.",
"<b>Als App installieren:</b> Der Knopf unter den Lyrics legt den Player als eigenes Fenster auf den Startbildschirm. iPhone/iPad: Safari → Teilen → „Zum Home-Bildschirm“, dann in der App einmal „Prayers runterladen“. Empfohlen, weil Safari Offline-Daten sonst nach einigen Wochen ohne Nutzung löscht.",
"<b>Aussprache:</b> ā ī ū lang halten · ṃ ṅ ñ ṇ nasal · ś ṣ weiches / hartes sch · ṛ ri.",
"<b>Gold</b> heißt: eingeschaltet. Zum Schließen hier tippen, ✕ oder Esc."],
fr:[
"Comment fonctionne le Bhakti Prayers Player",
"<b>Choisir une prière</b> dans les menus Prière du matin, Prière du soir, Autres et Chants védiques (texte seul). « Tous » réunit tout dans un seul menu.",
"<b>Langue :</b> en haut à droite. <b>Aide :</b> la bulle « Aide – cliquez ici » ou un appui sur le titre.",
"<b>Lecture :</b> Lecture/Pause, |◀ ▶| parcourt toutes les prières, −30/+30 s. La source par défaut est le MP3 ; YouTube ne fonctionne qu’en ligne.",
"<b>Suivre :</b> les strophes défilent avec le chant.",
"<b>Tourner les strophes à la main :</b> balayer, molette ou touches Page. Toucher une strophe y place l’enregistrement.",
"<b>Grand :</b> plein écran avec seulement la strophe actuelle. Le ✕ en haut à droite est toujours visible et ferme (aussi Échap). Un appui ailleurs affiche la barre ; glisser sur le côté = strophe précédente/suivante. Sur téléphone, Grand passe en paysage si le navigateur le permet (Android/Chrome) ; sur iPhone, tournez simplement le téléphone.",
"<b>Colonnes 1/2/3</b> (à côté du bouton des accords) affiche plusieurs strophes côte à côte, rangée par rangée ; Suivre défile jusqu’à la rangée de la strophe actuelle. Sur écran étroit toujours 1 colonne, 3 colonnes seulement sur une fenêtre large.",
"<b>Accords :</b> désactivés, au-dessus de la strophe ou par ligne. <b>Trad.</b> affiche la traduction. <b>Tonalité ♭/♯</b> et <b>Hauteur −/+</b> transposent.",
"<b>Menü+</b> affiche d’autres boutons : Répéter, ±10 s, tempo, YT/MP3, traduction, tonalité et hauteur.",
"<b>Partager :</b> le bouton ⤴ à côté du titre partage un lien direct vers cette prière (Suivre, accords et traduction activés). Options : &lang=de, &chords=off|stanza|line, &tr=0.",
"<b>Sous les paroles :</b> « Origine, sources » indique d’où viennent le texte et le MP3 (note du livret).",
"<b>Hors ligne :</b> appuyez une fois sur « Télécharger les prières » en ligne. Ensuite le lecteur et tous les MP3 fonctionnent sans internet ; plus tard seuls les fichiers modifiés sont rechargés. YouTube nécessite internet. Les fenêtres privées effacent tout à la fermeture.",
"<b>Installer comme app :</b> le bouton sous les paroles place le lecteur sur l’écran d’accueil, dans sa propre fenêtre. iPhone/iPad : Safari → Partager → « Sur l’écran d’accueil », puis appuyez une fois sur « Télécharger les prières » dans l’app. Recommandé, car sinon Safari supprime les données hors ligne après quelques semaines sans utilisation.",
"<b>Prononciation :</b> ā ī ū tenir long · ṃ ṅ ñ ṇ nasal · ś ṣ « ch » doux / dur · ṛ « ri ».",
"<b>Or</b> signifie activé. Appuyez ici, sur ✕ ou Échap pour fermer."],
es:[
"Cómo funciona el Bhakti Prayers Player",
"<b>Elegir una oración</b> en los menús Oración de la mañana, Oración de la tarde, Otros y Cantos védicos (solo texto). «Todos» reúne todo en un menú.",
"<b>Idioma:</b> arriba a la derecha. <b>Ayuda:</b> la burbuja «Ayuda» o un toque en el título.",
"<b>Reproducción:</b> Play/Pausa, |◀ ▶| recorre todas las oraciones, −30/+30 s. La fuente por defecto es MP3; YouTube solo funciona en línea.",
"<b>Seguir:</b> las estrofas avanzan con el canto.",
"<b>Pasar estrofas a mano:</b> deslizar, rueda del ratón o teclas RePág/AvPág. Tocar una estrofa lleva la grabación allí.",
"<b>Grande:</b> pantalla completa solo con la estrofa actual. La ✕ arriba a la derecha está siempre visible y cierra (también Esc). Un toque en otro lugar muestra la barra; deslizar de lado = estrofa anterior/siguiente. En el móvil, Grande cambia a horizontal si el navegador lo permite (Android/Chrome); en iPhone basta con girar el móvil.",
"<b>Columnas 1/2/3</b> (junto al botón de acordes) muestra varias estrofas lado a lado, fila por fila; Seguir desplaza hasta la fila de la estrofa actual. En pantallas estrechas siempre 1 columna, 3 columnas solo con ventana ancha.",
"<b>Acordes:</b> desactivados, sobre la estrofa o por línea. <b>Trad.</b> muestra la traducción. <b>Tonalidad ♭/♯</b> y <b>Altura −/+</b> transponen.",
"<b>Menü+</b> muestra más botones: Repetir, ±10 s, tempo, YT/MP3, traducción, tonalidad y altura.",
"<b>Compartir:</b> el botón ⤴ junto al título comparte un enlace directo a esta oración (Seguir, acordes y traducción activados). Opciones: &lang=de, &chords=off|stanza|line, &tr=0.",
"<b>Debajo de la letra:</b> «Origen, fuentes» muestra de dónde vienen el texto y el MP3 (nota del cuadernillo).",
"<b>Sin conexión:</b> toca una vez «Descargar oraciones» con conexión. Después el reproductor y todos los MP3 funcionan sin internet; más tarde solo se cargan los archivos cambiados. YouTube necesita internet. Las ventanas privadas/incógnito lo borran todo al cerrarse.",
"<b>Instalar como app:</b> el botón debajo de la letra pone el reproductor en la pantalla de inicio, en su propia ventana. iPhone/iPad: Safari → Compartir → «Añadir a pantalla de inicio», luego toca una vez «Descargar oraciones» dentro de la app. Recomendado, porque si no Safari borra los datos sin conexión tras unas semanas sin uso.",
"<b>Pronunciación:</b> ā ī ū alargar · ṃ ṅ ñ ṇ nasal · ś ṣ «sh» suave / fuerte · ṛ «ri».",
"<b>Dorado</b> significa activado. Toca aquí, ✕ o Esc para cerrar."],
ru:[
"Как работает Bhakti Prayers Player",
"<b>Выбор молитвы</b> в меню Утренняя молитва, Вечерняя молитва, Другие и Ведические песнопения (только текст). «Все» объединяет всё в одном меню.",
"<b>Язык:</b> вверху справа. <b>Помощь:</b> пузырёк «Помощь» или нажатие на заголовок.",
"<b>Воспроизведение:</b> Play/Пауза, |◀ ▶| переходит по всем молитвам, −30/+30 с. Источник по умолчанию — MP3; YouTube работает только онлайн.",
"<b>Следить:</b> строфы прокручиваются вместе с пением.",
"<b>Листать строфы вручную:</b> свайп, колесо мыши или PgUp/PgDn. Нажатие на строфу переводит запись туда.",
"<b>Крупно:</b> полный экран только с текущей строфой. ✕ вверху справа видна всегда и закрывает режим (также Esc). Нажатие в другом месте показывает панель; свайп в сторону = предыдущая/следующая строфа. На телефоне «Крупно» включает альбомную ориентацию, если браузер позволяет (Android/Chrome); на iPhone просто поверните телефон.",
"<b>Колонки 1/2/3</b> (рядом с кнопкой аккордов) показывает несколько строф рядом, ряд за рядом; «Следить» прокручивает к ряду текущей строфы. На узких экранах всегда 1 колонка, 3 колонки только в широком окне.",
"<b>Аккорды:</b> выкл., над строфой или по строкам. <b>Перев.</b> показывает перевод. <b>Тональность ♭/♯</b> и <b>Высота −/+</b> транспонируют.",
"<b>Menü+</b> показывает другие кнопки: Повтор, ±10 с, темп, YT/MP3, перевод, тональность и высота.",
"<b>Поделиться:</b> кнопка ⤴ рядом с заголовком делится прямой ссылкой на эту молитву (Следить, аккорды и перевод включены). Параметры: &lang=de, &chords=off|stanza|line, &tr=0.",
"<b>Под текстом:</b> «Происхождение, источники» показывает, откуда текст и MP3 (примечание из сборника).",
"<b>Офлайн:</b> один раз нажмите «Скачать молитвы», пока есть интернет. После этого плеер и все MP3 работают без интернета; позже загружаются только изменённые файлы. Для YouTube нужен интернет. Приватные окна (инкогнито) всё удаляют при закрытии.",
"<b>Установить как приложение:</b> кнопка под текстом помещает плеер на главный экран в отдельном окне. iPhone/iPad: Safari → Поделиться → «На экран „Домой“», затем один раз нажмите «Скачать молитвы» в приложении. Рекомендуется, иначе Safari удаляет офлайн-данные через несколько недель без использования.",
"<b>Произношение:</b> ā ī ū тянуть долго · ṃ ṅ ñ ṇ носовые · ś ṣ мягкое / твёрдое «ш» · ṛ «ри».",
"<b>Золотой</b> значит включено. Нажмите здесь, ✕ или Esc, чтобы закрыть."],
hi:[
"भक्ति प्रेयर्स प्लेयर कैसे काम करता है",
"<b>प्रार्थना चुनें</b> मेनू से: प्रातः प्रार्थना, सायं प्रार्थना, अन्य और वैदिक मंत्र (केवल पाठ)। “सभी” सब कुछ एक मेनू में दिखाता है।",
"<b>भाषा:</b> ऊपर दाईं ओर। <b>सहायता:</b> “सहायता” बबल या शीर्षक पर टैप।",
"<b>प्लेबैक:</b> Play/Pause, |◀ ▶| सभी प्रार्थनाओं में आगे-पीछे, −30/+30 सेकंड। डिफ़ॉल्ट स्रोत MP3 है; YouTube केवल ऑनलाइन चलता है।",
"<b>साथ पढ़ें:</b> श्लोक गायन के साथ आगे बढ़ते हैं।",
"<b>श्लोक हाथ से बदलें:</b> स्वाइप, माउस व्हील या Page कुंजियाँ। किसी श्लोक पर टैप करने से रिकॉर्डिंग वहीं पहुँचती है।",
"<b>बड़ा:</b> पूरी स्क्रीन, केवल वर्तमान श्लोक। ऊपर दाईं ओर ✕ हमेशा दिखता है और बंद करता है (Esc भी)। कहीं और टैप करने पर नियंत्रण पट्टी दिखती है; बगल में स्वाइप = पिछला/अगला श्लोक। फ़ोन पर बड़ा मोड लैंडस्केप में बदल जाता है, जहाँ ब्राउज़र अनुमति देता है (Android/Chrome); iPhone पर फ़ोन को बस तिरछा घुमाएँ।",
"<b>कॉलम 1/2/3</b> (कॉर्ड बटन के पास) कई श्लोक साथ-साथ, पंक्ति दर पंक्ति दिखाता है; “साथ पढ़ें” वर्तमान श्लोक की पंक्ति तक स्क्रॉल करता है। संकरी स्क्रीन पर हमेशा 1 कॉलम, 3 कॉलम केवल चौड़ी विंडो में।",
"<b>कॉर्ड:</b> बंद, श्लोक के ऊपर या हर पंक्ति पर। <b>अनुवाद</b> अर्थ दिखाता है। <b>स्केल ♭/♯</b> और <b>पिच −/+</b> ट्रांसपोज़ करते हैं।",
"<b>Menü+</b> और बटन दिखाता है: दोहराएँ, ±10 सेकंड, गति, YT/MP3, अनुवाद, स्केल और पिच।",
"<b>साझा करें:</b> शीर्षक के पास ⤴ बटन इस प्रार्थना का सीधा लिंक साझा करता है (साथ पढ़ें, कॉर्ड और अनुवाद चालू)। विकल्प: &lang=de, &chords=off|stanza|line, &tr=0।",
"<b>पाठ के नीचे:</b> “स्रोत” दिखाता है कि पाठ और MP3 कहाँ से हैं (पुस्तिका का संकेत)।",
"<b>ऑफ़लाइन:</b> ऑनलाइन रहते हुए एक बार “प्रार्थनाएँ डाउनलोड करें” टैप करें। इसके बाद प्लेयर और सभी MP3 बिना इंटरनेट चलते हैं; बाद में केवल बदली हुई फ़ाइलें लोड होती हैं। YouTube के लिए इंटरनेट चाहिए। प्राइवेट/इनकॉग्निटो विंडो बंद होने पर सब मिटा देती हैं।",
"<b>ऐप के रूप में इंस्टॉल करें:</b> पाठ के नीचे का बटन प्लेयर को होम स्क्रीन पर अलग विंडो में रखता है। iPhone/iPad: Safari → शेयर → “होम स्क्रीन में जोड़ें”, फिर ऐप में एक बार “प्रार्थनाएँ डाउनलोड करें”। अनुशंसित, क्योंकि अन्यथा Safari कुछ हफ़्तों तक उपयोग न होने पर ऑफ़लाइन डेटा मिटा देता है।",
"<b>उच्चारण:</b> ā ī ū लंबा · ṃ ṅ ñ ṇ नासिक्य · ś ṣ कोमल / कठोर “श” · ṛ “रि”।",
"<b>सुनहरा</b> यानी चालू। बंद करने के लिए यहाँ टैप करें, ✕ या Esc।"],pt:["Como funciona o Bhakti Prayers Player","<b>Escolha uma oração</b> nos menus Orações da manhã, Orações da noite, Mais e Cantos Védicos (somente texto). “Todas” reúne tudo em um só menu.","<b>Idioma:</b> no canto superior direito. <b>Ajuda:</b> o balão “Ajuda – clique aqui” ou um toque no título.","<b>Reprodução:</b> Tocar/Pausa, |◀ ▶| percorre todas as orações, −30/+30 s. O MP3 é a fonte padrão; o YouTube só funciona online.","<b>Acompanhar:</b> as estrofes rolam junto com o canto.","<b>Virar estrofes à mão:</b> deslize, roda do rato ou teclas Page. Tocar numa estrofe leva a gravação até lá.","<b>Grande:</b> tela cheia só com a estrofe atual. O ✕ no canto superior direito fica sempre visível e fecha a visão (também Esc). Um toque em outro lugar mostra a barra de controles; deslize para o lado para a estrofe anterior/seguinte. No celular, Grande muda para a horizontal quando o navegador permite (Android/Chrome); no iPhone basta virar o celular de lado.","<b>Colunas 1/2/3</b> (ao lado do botão de acordes) mostra várias estrofes lado a lado, fileira por fileira; Acompanhar rola até a fileira da estrofe atual. Em telas estreitas sempre 1 coluna; 3 colunas a partir de uma janela larga.","<b>Acordes:</b> desligados, acima da estrofe ou por linha. <b>Trad.</b> mostra a tradução. <b>Tom ♭/♯</b> e <b>Altura −/+</b> transpõem.","<b>Menü+</b> mostra mais botões: Repetir, ±10 s, andamento, YT/MP3, tradução, tom e altura.","<b>Compartilhar:</b> o botão ⤴ ao lado do título compartilha um link direto para esta oração (Acompanhar, acordes e tradução ligados). Opções: &lang=pt, &chords=off|stanza|line, &tr=0.","<b>Abaixo da letra:</b> “Origem, fontes” mostra de onde vêm a letra e o MP3 (nota do livreto).","<b>Offline:</b> toque uma vez em “Baixar orações” enquanto estiver online. Depois disso o player e todos os MP3 funcionam sem internet; mais tarde só os arquivos alterados são carregados. O YouTube precisa de internet. Janelas privadas/anônimas apagam tudo ao fechar.","<b>Instalar como app:</b> o botão abaixo da letra coloca o player na tela inicial, em janela própria. iPhone/iPad: Safari → Compartilhar → “Adicionar à Tela de Início”, depois toque uma vez em “Baixar orações” dentro do app. Recomendado, pois senão o Safari apaga os dados offline após algumas semanas sem uso.","<b>Pronúncia:</b> ā ī ū sustentar longo · ṃ ṅ ñ ṇ nasal · ś ṣ “sh” suave / forte · ṛ “ri”.","<b>Dourado</b> significa que a função está ligada. Toque aqui, em ✕ ou Esc para fechar."],cz:["Jak funguje Bhakti Prayers Player", "<b>Vyberte modlitbu</b> v nabídkách Ranní modlitby, Večerní modlitby, Další a Védské zpěvy (jen text). „Vše“ ukáže všechno v jedné nabídce.", "<b>Jazyk:</b> vpravo nahoře. <b>Nápověda:</b> bublina „Nápověda – klikněte sem“ nebo klepnutí na nadpis.", "<b>Přehrávání:</b> Přehrát/Pauza, |◀ ▶| přepíná mezi všemi modlitbami, −30/+30 s. Výchozím zdrojem je MP3; YouTube funguje jen online.", "<b>Sledovat:</b> sloky se posouvají spolu se zpěvem.", "<b>Listování slokami ručně:</b> přejetím prstem, kolečkem myši nebo klávesami Page. Klepnutím na sloku se nahrávka přesune na ni.", "<b>Velké:</b> celá obrazovka jen s aktuální slokou. ✕ vpravo nahoře je vždy vidět a zavírá ji (také Esc). Klepnutím jinam se zobrazí ovládací lišta; přejetím do strany předchozí/další sloka. Na telefonech se Velké přepne na šířku, pokud to prohlížeč dovolí (Android/Chrome); na iPhonu telefon jednoduše otočte.", "<b>Sloupce 1/2/3</b> (vedle tlačítka akordů) ukazují více slok vedle sebe, řádek po řádku; Sledovat posouvá k řádku aktuální sloky. Na úzkých obrazovkách vždy 1 sloupec, 3 sloupce od širokého okna.", "<b>Akordy:</b> vypnuto, nad slokou nebo v řádku. <b>Překlad</b> zobrazí překlad. <b>Tónina ♭/♯</b> a <b>Výška −/+</b> transponují.", "<b>Menü+</b> ukáže další tlačítka: Opakovat, ±10 s, tempo, YT/MP3, překlad, tóninu a výšku.", "<b>Sdílet:</b> tlačítko ⤴ vedle nadpisu sdílí přímý odkaz na tuto modlitbu (Sledovat, akordy a překlad zapnuté). Možnosti: &lang=cz, &chords=off|stanza|line, &tr=0.", "<b>Pod textem:</b> „Původ, zdroje“ ukazuje, odkud pochází text a MP3 (poznámka ze zpěvníku).", "<b>Offline:</b> jednou, když jste online, klepněte na „Stáhnout modlitby“. Potom přehrávač i všechny MP3 fungují bez internetu; později se načítají jen změněné soubory. YouTube potřebuje internet. Soukromá/anonymní okna po zavření vše smažou.", "<b>Instalovat jako aplikaci:</b> tlačítko pod textem umístí přehrávač na domovskou obrazovku ve vlastním okně. iPhone/iPad: Safari → Sdílet → „Přidat na plochu“, pak v aplikaci jednou klepněte na „Stáhnout modlitby“. Doporučeno, protože Safari jinak po několika týdnech nepoužívání offline data smaže.", "<b>Výslovnost:</b> ā ī ū držet dlouze · ṃ ṅ ñ ṇ nosově · ś ṣ měkké / tvrdé „š“ · ṛ „ri“.", "<b>Česky:</b> překlady modliteb jsou převzaty z českého sešitu Prathana a z Mukunda Mála Stotram CZ. Kde český překlad zatím není, zobrazí se „Zatím bez překladu“. Texty rozhraní a nápovědy doplnil Grok.", "<b>Zlatá</b> znamená, že je nastavení zapnuté. Zavřete klepnutím sem, ✕ nebo Esc."]};
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
