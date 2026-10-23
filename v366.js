/* [Grok-Bot] V3.66: (1) "Offline gespeichert" steht ganz links in der unteren Knopfzeile (vor "Quellen zeigen"/"Prayers runterladen")
   statt unten rechts schwebend. (2) Statistik: alle Orte der letzten 24 h (nicht nur aktive TOP 10).
   Daten: bisher wurden Orte nur als Tageszahl (IP-Hash-Zaehler, ohne Ortsnamen) und als Live-Presence (MQTT, nur 10 min) gefuehrt.
   Neu: jede Sitzung legt "Ort + Zeit" als retained Nachricht unter bpp/clbuerger/visits/v1/<sitzung> ab (alle 5 min erneuert).
   Liste = alle Eintraege mit Zeit < 24 h, plus noch vorhandene Presence-Eintraege < 24 h. Vollstaendig erst 24 h nach V3.66. */
(function(){
  if(window.bppV366) return; window.bppV366=1;
  var st=document.createElement("style");
  st.textContent="#bppOff.in366{position:static!important;display:inline-block;margin:0 8px 0 0;vertical-align:middle;opacity:.9;right:auto;bottom:auto}"+
    "#bpp-orte24{font-size:.68rem;color:#cbb89a;opacity:.85;line-height:1.35;text-align:right;padding:0 12px 8px;margin:0;max-height:5.6em;overflow-y:auto}";
  document.head.appendChild(st);
  function placeOff(){ var o=document.getElementById("bppOff"), b=document.getElementById("btnOffAll"), g=b&&b.parentElement;
    if(!o||!g) return; if(o.parentElement!==g||g.firstChild!==o){ g.insertBefore(o,g.firstChild); } o.classList.add("in366"); }
  setInterval(placeOff,500); placeOff();

  var V="bpp/clbuerger/visits/v1/", P="bpp/clbuerger/presence/v1/", DAY=864e5, seen={}, me={c:"",o:""}, cl=null, sid="";
  try{ sid=sessionStorage.getItem("bpp-presence-id")||""; }catch(e){}
  if(!sid) sid="s"+Math.random().toString(16).slice(2)+Date.now().toString(16);
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  function paint(){ var s=document.getElementById("bpp-stats"); if(!s) return; var el=document.getElementById("bpp-orte24");
    if(!el){ el=document.createElement("div"); el.id="bpp-orte24"; s.parentNode.insertBefore(el,s.nextSibling); }
    var now=Date.now(), by={}, sess={};
    Object.keys(seen).forEach(function(k){ var p=seen[k]; if(!p||now-p.t>DAY||(!p.c&&!p.o)) return; var id=p.d||k.split("|")[1]; /* [Grok-Bot] V4.07: je Geraet (bpp-device-id) statt je Sitzung */
      var l=p.c?(p.c+(p.o?" ("+p.o+")":"")):p.o; /* [Grok-Bot] V4.07: Stadt (Land) */ var key=l+"|"+id; if(sess[key]) return; sess[key]=1; by[l]=(by[l]||0)+1; });
    var rows=Object.keys(by).sort(function(a,b){ return by[b]-by[a]||a.localeCompare(b); });
    el.innerHTML="Orte letzte 24 h ("+rows.length+"): "+(rows.length?rows.map(function(r){ return esc(r)+(by[r]>3?" \u00d7"+by[r]:"") /* [Grok-Bot] V4.07: Anzahl erst ab 4 */; }).join(" \u00b7 "):"noch keine Daten"); /* [Grok-Bot] V3.74: Zeile immer sichtbar */
  }
  function pub(){ if(!cl||!cl.connected||(!me.c&&!me.o)) return; var b=JSON.stringify({c:me.c.slice(0,64),o:me.o.slice(0,8),d:(function(){ try{ return (localStorage.getItem("bpp-device-id")||"").slice(0,32); }catch(e){ return ""; } })(),t:Date.now()});
    try{ cl.publish(V+sid,b,{qos:0,retain:true}); }catch(e){} seen["v|"+sid]=JSON.parse(b); paint(); }
  function go(){ if(cl||!window.mqtt||!navigator.onLine) return;
    try{ cl=window.mqtt.connect("wss://broker.emqx.io:8084/mqtt",{clientId:"bppv-"+sid.slice(0,16),clean:true,reconnectPeriod:8000,connectTimeout:12000});
      cl.on("connect",function(){ cl.subscribe([V+"#",P+"#"],{qos:0}); pub(); });
      cl.on("message",function(tp,buf){ var pre=tp.indexOf(V)===0?"v":(tp.indexOf(P)===0?"p":""); if(!pre) return; var id=tp.slice((pre==="v"?V:P).length);
        if(!id||id.indexOf("/")>=0) return; try{ var p=JSON.parse(String(buf)); if(p&&p.t) seen[pre+"|"+id]={c:String(p.c||"").slice(0,64),o:String(p.o||"").slice(0,8),t:+p.t||0}; }catch(e){}
        clearTimeout(go.t); go.t=setTimeout(paint,300); });
    }catch(e){ cl=null; } }
  function start(){ fetch("https://get.geojs.io/v1/ip/geo.json").then(function(r){ return r.json(); }).then(function(g){ me.c=String(g&&g.city||"").trim(); me.o=String(g&&(g.country_code||g.country)||"").trim(); pub(); }).catch(function(){});
    /* [Grok-Bot] V3.74: MQTT-Bibliothek selbst laden. Bis V3.69 lud v204.js sie beim Aufbau der Presence-Verbindung; seit V3.70 fehlte sie -> keine Verbindung, Zeile leer. */
    if(!window.mqtt && !document.querySelector('script[src^="lib/mqtt.min.js"]')){ var sc=document.createElement("script"); sc.src="lib/mqtt.min.js"; sc.async=true; sc.onerror=function(){}; document.head.appendChild(sc); }
    paint(); var w=setInterval(function(){ if(window.mqtt){ clearInterval(w); go(); } },1000); }
  setInterval(pub,5*60*1000); setInterval(paint,30000); setTimeout(paint,800);
  if(document.readyState==="complete") setTimeout(start,1500); else addEventListener("load",function(){ setTimeout(start,1500); });
  window.bppOrte24=function(){ return seen; };
})();
