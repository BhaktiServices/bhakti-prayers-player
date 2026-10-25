/* [Grok-Bot] V4.25: Knopf "Karte anzeigen" unter der Orte-Liste: Leaflet + OpenStreetMap-Karte der Startorte der letzten 48 h.
   Ein Punkt je Ort, Popup "Stadt (Land) ×Geraete" (je bpp-device-id, sonst je Sitzung). Leaflet wird erst beim Druecken geladen.
   Daten: v366 legt je Sitzung "Stadt/Land/Geraet/Zeit" als retained MQTT-Nachricht unter bpp/clbuerger/visits/v1/<sitzung> ab,
   ohne Koordinaten und ohne Ablaufzeit (die App zeigte nur 24 h; was der oeffentliche Broker wie lange haelt, ist nicht garantiert).
   Neu ab V4.25: zusaetzlich bpp/clbuerger/visits/v2/<sitzung> mit den IP-Geo-Koordinaten von geojs.io (auf 2 Stellen gerundet).
   Alte Eintraege ohne Koordinaten: Nominatim-Suche nach "Stadt, Land", hoechstens 1 Anfrage/s, hoechstens 8 je Kartenaufruf,
   Ergebnis dauerhaft im Browser zwischengespeichert (localStorage bpp-geo-cache). */
(function(){
  if(window.bppV425) return; window.bppV425=1;
  var V1="bpp/clbuerger/visits/v1/", V2="bpp/clbuerger/visits/v2/", P="bpp/clbuerger/presence/v1/", H48=48*36e5;
  var seen={}, cl=null, me=null, sid="", open=false, map=null, layer=null, wrap, btn, info;
  try{ sid=sessionStorage.getItem("bpp-v425-sid")||""; if(!sid){ sid="m"+Math.random().toString(16).slice(2,10)+Date.now().toString(16); sessionStorage.setItem("bpp-v425-sid",sid); } }catch(e){ sid="m"+Date.now().toString(16); }
  function dev(){ try{ return (localStorage.getItem("bpp-device-id")||"").slice(0,32); }catch(e){ return ""; } }
  var T={de:["Karte anzeigen","Karte ausblenden","Orte letzte 48 h: "," noch ohne Koordinaten"," – noch keine Daten","Lade Karte …","Karte konnte nicht geladen werden (offline?)."],
    en:["Show map","Hide map","Places last 48 h: "," without coordinates yet"," – no data yet","Loading map …","Map could not be loaded (offline?)."],
    fr:["Afficher la carte","Masquer la carte","Lieux des dernières 48 h : "," encore sans coordonnées"," – pas encore de données","Chargement de la carte …","Impossible de charger la carte (hors ligne ?)."],
    es:["Mostrar mapa","Ocultar mapa","Lugares últimas 48 h: "," aún sin coordenadas"," – aún sin datos","Cargando mapa …","No se pudo cargar el mapa (¿sin conexión?)."],
    ru:["Показать карту","Скрыть карту","Места за 48 ч: "," пока без координат"," – пока нет данных","Загрузка карты …","Не удалось загрузить карту (нет сети?)."],
    hi:["नक्शा दिखाएँ","नक्शा छिपाएँ","पिछले 48 घंटे के स्थान: "," अभी बिना निर्देशांक"," – अभी कोई डेटा नहीं","नक्शा लोड हो रहा है …","नक्शा लोड नहीं हो सका (ऑफ़लाइन?)।"],
    pt:["Mostrar mapa","Ocultar mapa","Locais nas últimas 48 h: "," ainda sem coordenadas"," – ainda sem dados","A carregar o mapa …","Não foi possível carregar o mapa (offline?)."]};
  function lg(){ try{ var l=String((typeof lang!=="undefined"&&lang)||document.documentElement.lang||"de").slice(0,2); return T[l]?l:"de"; }catch(e){ return "de"; } }
  function en(){ return lg()!=="de"; }
  function W(i){ return T[lg()][i]; }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  var st=document.createElement("style");
  st.textContent="#bpp425w{padding:2px 12px 8px;text-align:right;font-size:.72rem;line-height:1.4}#bpp425b{background:transparent;border:1px solid currentColor;color:#cbb89a;border-radius:6px;padding:1px 8px;min-height:0;font:inherit;cursor:pointer;opacity:.9}#bpp425b.gold{background:#e0b45a!important;border-color:#e0b45a!important;color:#222!important;opacity:1}#bpp425map{height:340px;margin-top:8px;border:1px solid var(--gold);border-radius:8px;text-align:left}"+
    "#bpp425map .leaflet-popup-content{color:#1a1208;font:14px 'Source Sans 3',sans-serif}#bpp425map .leaflet-control-attribution{color:#333;font-size:11px}#bpp425map .leaflet-control-attribution a{color:#0645ad}"+
    "#bpp425i{font-size:.7rem;color:#cbb89a;margin-top:4px}@media(max-width:600px){#bpp425map{height:280px}}";
  document.head.appendChild(st);
  function bppRow(o){ var r=document.getElementById("bppFoot426"); if(!r){ r=document.createElement("div"); r.id="bppFoot426"; r.style.cssText="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:6px 10px;padding:0 0 8px"; } if(r.previousSibling!==o) o.parentNode.insertBefore(r,o.nextSibling); return r; } /* [Grok-Bot] V4.26: gemeinsame feste Zeile fuer Historie (links) + Karte (rechts), kein gegenseitiges Umhaengen */
  function place(){ var o=document.getElementById("bpp-orte24"); if(!o) return;
    if(!wrap){ wrap=document.createElement("div"); wrap.id="bpp425w"; btn=document.createElement("button"); btn.id="bpp425b"; btn.onclick=toggle; wrap.appendChild(btn); }
    var rw=bppRow(o); if(wrap.parentNode!==rw){ rw.appendChild(wrap); } wrap.style.order="2"; wrap.style.flex=open?"1 1 100%":"0 0 auto"; /* [Grok-Bot] V4.26 */
    var t=open?W(1):W(0); if(btn.textContent!==t) btn.textContent=t; btn.classList.toggle("gold",open); }
  setInterval(place,1000); setTimeout(place,900);

  /* [Grok-Bot] V4.27: keine eigene MQTT-Verbindung mehr (seit V4.25 war es eine dritte je Tab) – Daten aus v366 (window.bppSeen366, v1 inkl. Geraet + ab V4.27 Koordinaten). */
  function src(){ return window.bppSeen366||seen; }

  /* Nominatim (nur alte Eintraege ohne Koordinaten) */
  var cache={}; try{ cache=JSON.parse(localStorage.getItem("bpp-geo-cache")||"{}"); }catch(e){}
  var queue=[], busy=false, budget=0;
  function geo(c,o){ var k=(c+"|"+o).toLowerCase(); if(window.BPP_GEO&&BPP_GEO[k]) return BPP_GEO[k]; if(cache[k]!==undefined) return cache[k]; if(queue.indexOf(k)<0){ queue.push(k); run(); } /* [Grok-Bot] V4.27: statische Tabelle, kein 8er-Limit (1/s, gecacht) */ return null; }
  function run(){ if(busy||!queue.length) return; busy=true; var k=queue.shift(), a=k.split("|");
    fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&city="+encodeURIComponent(a[0])+(a[1]?"&countrycodes="+encodeURIComponent(a[1]):"")+"&accept-language="+lg())
      .then(function(r){ return r.json(); }).then(function(j){ cache[k]=j&&j[0]?[+(+j[0].lat).toFixed(2),+(+j[0].lon).toFixed(2)]:0; }).catch(function(){})
      .then(function(){ try{ localStorage.setItem("bpp-geo-cache",JSON.stringify(cache)); }catch(e){} draw(); setTimeout(function(){ busy=false; run(); },1100); }); }

  function places(){ var now=Date.now(), by={};
    var S=src(); Object.keys(S).forEach(function(k){ var p=S[k]; if(!p||now-p.t>H48||(!p.c&&!p.o)) return;
      var name=p.c?(p.c+(p.o?" ("+p.o+")":"")):p.o, g=by[name]||(by[name]={n:name,c:p.c,o:p.o,dev:{},ll:null});
      g.dev[p.d||k.split("|")[1]]=1; /* je Geraet */ if(isFinite(p.la)&&isFinite(p.lo)&&p.la!==null&&!g.ll) g.ll=[p.la,p.lo]; });
    return Object.keys(by).map(function(k){ return by[k]; }); }
  function draw(){ if(!open||!map) return; layer.clearLayers(); var pts=[], miss=0, all=places();
    all.forEach(function(g){ var ll=g.ll||(g.c?geo(g.c,g.o):null); if(!ll){ miss++; return; } var n=Object.keys(g.dev).length;
      L_.circleMarker(ll,{radius:6+Math.min(10,n*2),color:"#8b6914",weight:2,fillColor:"#c9a36a",fillOpacity:.85}).bindPopup(esc(g.n)+" \u00d7"+n).addTo(layer); pts.push(ll); });
    if(pts.length&&!draw.fit){ draw.fit=1; map.fitBounds(pts,{padding:[30,30],maxZoom:6}); }
    info.textContent=W(2)+all.length+(miss?" ("+miss+W(3)+")":"")+(all.length?"":W(4)); }
  var L_=null;
  function loadLeaflet(cb){ if(window.L&&window.L.map){ L_=window.L; return cb(); }
    var c=document.createElement("link"); c.rel="stylesheet"; c.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(c);
    var s=document.createElement("script"); s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; s.onload=function(){ L_=window.L; cb(); };
    s.onerror=function(){ info.textContent=W(6); }; document.head.appendChild(s); }
  function toggle(){ open=!open; place();
    if(!open){ var m=document.getElementById("bpp425box"); if(m) m.style.display="none"; return; }
    var box=document.getElementById("bpp425box"); if(!box){ box=document.createElement("div"); box.id="bpp425box"; box.innerHTML='<div id="bpp425map"></div><div id="bpp425i"></div>'; wrap.appendChild(box); }
    box.style.display=""; info=document.getElementById("bpp425i"); info.textContent=W(5);
    loadLeaflet(function(){ if(!map){ map=L_.map("bpp425map",{worldCopyJump:true}).setView([30,10],2);
        L_.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'}).addTo(map);
        layer=L_.layerGroup().addTo(map); } else map.invalidateSize(); draw(); setTimeout(draw,4000); });
  }
  setInterval(function(){ if(open) draw(); },5000); /* [Grok-Bot] V4.27 */
  window.bppKarte48=function(){ return {seen:seen, places:places()}; };
})();
