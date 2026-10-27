/* [Grok-Bot] V4.42: Grossbild, Modus "Akkorde in Zeile" (z.B. Hanuman Calisa): Akkorde falsch.
   Ursache: v365 (Akkorde in die Zeile setzen) und v250/v336 (Strophen-Akkordzeile in eine Akkordzeile je Verszeile aufteilen) laufen beide per MutationObserver.
   Lief v365 zuerst, stand in Zeile 1 schon der Akkord-Span -> v250 fand den Zeilentext nicht mehr und teilte nicht auf:
   Zeile 1 bekam die ganze Strophenfolge (D C G D, gleichmaessig verteilt), die anderen Zeilen keine oder ungefaerbte Akkorde.
   Fix: v250/v336 vergleichen den Text ohne Akkord-Spans und setzen die Zeile vor dem Aufteilen zurueck (v365 baut sie dann richtig neu).
   Zusaetzlich gilt im Grossbild dieselbe Regel wie in der Standardansicht, wenn eine Strophe keine eigenen Zeilen-Akkorde hat
   (Akkordzeile der Strophe auf die Zeilen verteilt, z.B. Mukunda Mala): window.bppLC442, benutzt von v250, v336, v338. */
window.BPP_BUILD="4.42"; window.BPP_SHOW="4.42";
window.bppLC442=function(z){
  if(!z) return null; var L=String(z.sa||"").split("\n");
  if(z.lineCh && z.lineCh.length===L.length) return z.lineCh;
  if(z.ch && L.length>1){ var p=String(z.ch).trim().split(/\s+/); return L.map(function(_,k){ return p[Math.min(k,p.length-1)]||""; }); }
  return null;
};
