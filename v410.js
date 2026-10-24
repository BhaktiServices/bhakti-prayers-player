/* [Grok-Bot] V4.10: Govinda Prabhus neu geschnitten (ab 35:08 = Pause vor Str. 1, ohne Govinda Suprabhatam) als audio/govinda-prabhus2.mp3 (Daten in v408.js).
   Alte Datei audio/govinda-prabhus.mp3 aus dem Offline-Audio-Cache entfernen. */
// build via v411.js
(function(){ try{ if(!window.caches) return; var u=new URL("audio/govinda-prabhus.mp3",location.href).href;
  caches.keys().then(function(K){ K.forEach(function(k){ caches.open(k).then(function(c){ c.keys().then(function(R){ R.forEach(function(r){ if(r.url.split("?")[0]===u) c.delete(r); }); }); }); }); }).catch(function(){}); }catch(e){} })();
