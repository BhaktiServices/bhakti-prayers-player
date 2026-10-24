/* [Grok-Bot] V4.06: Statistik unterscheidet Starts und Geraete. Pro Geraet eine zufaellige anonyme ID (localStorage "bpp-device-id", keine
   personenbezogenen Daten). Zaehlung wie bei "Orte" (v204.js) mit countapi.mileshilliard.com (nur hit/get): Schluessel je ID und Tag/Monat/gesamt,
   nur beim ersten Treffer (Wert 1) wird der Geraetezaehler erhoeht. "Aufrufe" (= Starts, einmal je Sitzung) bleiben unveraendert.
   Geraete gibt es erst ab V4.06 (23.10.2026); fuer die Zeit davor keine Zahl. Anzeige als eigene Zeile direkt unter den Aufrufen, 7 Sprachen. */
// build via v407
(function(){
  if(window.bppV406) return; window.bppV406=1;
  var API="https://countapi.mileshilliard.com/api/v1", CK="bpp-clbuerger-";
  var L={de:["Geräte (ab V4.06)","heute","Monat","gesamt"],en:["Devices (since V4.06)","today","month","total"],fr:["Appareils (depuis V4.06)","aujourd’hui","mois","total"],
    es:["Dispositivos (desde V4.06)","hoy","mes","total"],ru:["Устройства (с V4.06)","сегодня","месяц","всего"],hi:["डिवाइस (V4.06 से)","आज","महीना","कुल"],pt:["Dispositivos (desde V4.06)","hoje","mês","total"]};
  function lg(){ try{ var l=String((typeof lang!=="undefined"&&lang)||"de").slice(0,2); return L[l]?l:"de"; }catch(e){ return "de"; } }
  function p2(n){ return String(n).padStart(2,"0"); }
  var d=new Date(), DAY=d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate()), MON=DAY.slice(0,7);
  function hit(k){ return fetch(API+"/hit/"+encodeURIComponent(k)).then(function(r){ return r.json(); }).then(function(j){ return +j.value||0; }).catch(function(){ return null; }); }
  function get(k){ return fetch(API+"/get/"+encodeURIComponent(k)).then(function(r){ return r.ok?r.json():{value:0}; }).then(function(j){ return +j.value||0; }).catch(function(){ return null; }); }
  var id=""; try{ id=localStorage.getItem("bpp-device-id")||""; }catch(e){}
  if(!/^[0-9a-f]{16,}$/.test(id)){ try{ var a=new Uint8Array(12); crypto.getRandomValues(a); id=Array.prototype.map.call(a,function(x){ return p2(x.toString(16)); }).join(""); }catch(e){ id=(Math.random().toString(16).slice(2)+Date.now().toString(16)).slice(0,24); }
    try{ localStorage.setItem("bpp-device-id",id); }catch(e){} }
  var V={d:null,m:null,t:null};
  function seen(k){ try{ return localStorage.getItem("bpp-dev406-"+k)==="1"; }catch(e){ return false; } }
  function mark(k){ try{ localStorage.setItem("bpp-dev406-"+k,"1"); }catch(e){} }
  function one(scope,tag,cnt){ /* erstes Mal je Geraet und Zeitraum: hit auf ID-Schluessel; Wert 1 -> Zaehler +1 */
    if(seen(scope)) return get(cnt);
    return hit(CK+"dev-"+tag+"-"+id).then(function(v){ if(v==null) return get(cnt); mark(scope); return v===1?hit(cnt):get(cnt); }); }
  function paint(){ return; /* [Grok.com] Geräte-Zeile aus */ var s=document.getElementById("bpp-stats"); if(!s||!s.parentNode) return; var el=document.getElementById("bpp-dev406");
    if(!el){ el=document.createElement("div"); el.id="bpp-dev406"; el.style.cssText="font-size:.68rem;color:#cbb89a;opacity:.85;line-height:1.35;text-align:right;padding:0 12px 6px;margin:-6px 0 0"; }
    if(s.nextSibling!==el) s.parentNode.insertBefore(el,s.nextSibling);
    var W=L[lg()], loc={de:"de-DE",en:"en-GB",fr:"fr-FR",es:"es-ES",ru:"ru-RU",hi:"hi-IN",pt:"pt-PT"}[lg()];
    function f(x){ return x==null?"\u2014":Number(x).toLocaleString(loc); }
    var dd=V.d, mm=V.m==null?null:Math.max(V.m,dd||0), tt=V.t==null?null:Math.max(V.t,mm||0);
    var t=W[0]+": "+W[1]+" "+f(dd)+", "+W[2]+" "+f(mm)+" = "+W[3]+" "+f(tt); if(el.textContent!==t) el.textContent=t; }
  function run(){ if(!navigator.onLine){ paint(); return; }
    one("d-"+DAY,"d-"+DAY,CK+"devs-"+DAY).then(function(v){ V.d=v; paint(); return one("m-"+MON,"m-"+MON,CK+"devs-m-"+MON); })
      .then(function(v){ V.m=v; paint(); return one("all","all",CK+"devs-all"); }).then(function(v){ V.t=v; paint(); }); }
  window.bppDev406=function(){ return {id:id, day:V.d, month:V.m, total:V.t}; };
  setInterval(paint,500);
  if(document.readyState==="complete") run(); else window.addEventListener("load",run);
})();
