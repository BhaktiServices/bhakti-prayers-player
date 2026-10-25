/* [Grok-Bot] V4.26: (1) Historie- und Karten-Knopf in einer festen gemeinsamen Zeile unter "Orte letzte 24 h" (v421/v425 haengen sich
   nicht mehr abwechselnd direkt hinter #bpp-orte24 -> kein Auf-und-ab-Springen mehr).
   (2) "Orte letzte 24 h (0)": Die Liste kommt nur ueber den oeffentlichen MQTT-Broker broker.emqx.io (wss, Port 8084).
   Kommt keine Verbindung zustande, stand bisher "noch keine Daten". Jetzt steht dort ehrlich "Server nicht erreichbar"
   (Status je Verbindung in window.bppMqttState).
   (3) Teilen-Link ?t=: Die Position wurde nicht uebernommen (Wiedergabe begann bei 0:00), weil die gewaehlte Aufnahme
   (Rec-Wechsel Pbj/Mtj, MP3) erst danach geladen wurde und die Zeit dabei zurueckgesetzt wurde. Jetzt wird t gesetzt, sobald
   die gewaehlte Aufnahme geladen ist (loadedmetadata), bei erneutem Zuruecksetzen in den ersten Sekunden nochmals, und die
   Lyrics springen auf dieselbe Stelle. Gilt auch fuer den Erststart (t=10.2). */
window.BPP_BUILD="4.26"; window.BPP_SHOW="4.26";
(function(){
  if(window.bppV426) return; window.bppV426=1;
  var S=window.bppMqttState={ok:0,tries:0,err:"",t0:Date.now()};
  var w=setInterval(function(){ var m=window.mqtt; if(!m||!m.connect) return; clearInterval(w); if(m.connect.bpp426) return;
    var c=m.connect; m.connect=function(){ var cl=c.apply(this,arguments); S.tries++;
      try{ cl.on("connect",function(){ S.ok++; S.err=""; }); cl.on("error",function(e){ S.err=String(e&&e.message||e); }); }catch(e){} return cl; };
    m.connect.bpp426=1; },100);
  var M={de:" \u2013 Server nicht erreichbar",en:" \u2013 server not reachable",fr:" \u2013 serveur injoignable",es:" \u2013 servidor no accesible",ru:" \u2013 сервер недоступен",hi:" \u2013 सर्वर उपलब्ध नहीं",pt:" \u2013 servidor inacessível"};
  setInterval(function(){ var o=document.getElementById("bpp-orte24"); if(!o) return; var sp=document.getElementById("bpp426s");
    var bad=!S.ok && Date.now()-S.t0>25000 && /\(0\)/.test(o.textContent);
    if(bad){ var l=(typeof lang!=="undefined"&&M[lang])?lang:"de"; if(!sp){ sp=document.createElement("span"); sp.id="bpp426s"; o.appendChild(sp); } if(sp.textContent!==M[l]) sp.textContent=M[l]; }
    else if(sp) sp.remove(); },1000);

})();
