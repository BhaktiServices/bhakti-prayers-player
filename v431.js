/* [Grok-Bot] V4.31: Akkorde springen nicht mehr bei "Akk in Zeile":
   - v356.js machte das Wort "dhyānam" (gedacht nur fuer Ueberschriften in Purusa Suktam/VSN) auch mitten in Kavacam-Verszeilen kursiv/duenn -
     nach jedem Neuaufbau der Liste (Strophenwechsel) bis zu 1 s spaeter -> Akkorde rutschten um ~18 px.
   - v365.js ersetzte die alte Akkordzeile nach dem Neuaufbau erst bis zu 250 ms spaeter -> jetzt sofort per MutationObserver.
   - Kavacam Rec: Pbj startet ab Sekunde 8 der bisherigen Datei (v408.js, audio/narasimha-prabhus2.mp3, Marken -8 s). */
window.BPP_BUILD="4.31"; window.BPP_SHOW="4.31";
