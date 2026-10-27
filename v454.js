/* [Grok-Bot] V4.54: Taste „Tagesleiste ein/aus“ – Flackern behoben.
   Ursache: v435.js setzte weiterhin „Wochentage ein/aus“, v453.js überschrieb alle 400 ms
   mit „Tagesleiste …“ → sichtbares Springen/Layout-Shift. Ab jetzt einzige Quelle: v435.js
   (TX/HP aller Sprachen). v453-Override entfernt. */
window.BPP_BUILD="4.54"; window.BPP_SHOW="4.54";
