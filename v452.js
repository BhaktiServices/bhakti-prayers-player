/* [Grok-Bot] V4.52: Strophen-Navigation wiederhergestellt (Scrollen / Page↑↓ / Tipp / Enter → Sprung).
   Ursache (Regression V4.50): v434 fix() zog bei Mitsingen an alle 250 ms die Anzeige auf die
   Medienzeit (stanzaFromProgress) und setzte holdLineUntil auf nur +800 ms – ohne die manuelle
   Strophenwahl zu beachten. autoLineFromTime respektiert holdLineUntil; fix() tat es nicht.
   Dadurch sprang die Goldmarkierung nach dem Scrollen sofort zurück; ein Tipp gilt in v349 erst
   ≥450 ms nach bppManualAt – bis dahin war die Zielstrophe weg. Enter nach Pfeil↑↓ blieb oft ok
   (Pfeil ändert nur die Markierung, nicht line). Fix in v434.js: fix() bricht ab bei aktivem
   holdLineUntil oder bppSeekPending. Flacker-Fix unverändert (seq vor Marken, fix nur bei
   Mitsingen an, Bhavani-seq). */
window.BPP_BUILD="4.52"; window.BPP_SHOW="4.52";
