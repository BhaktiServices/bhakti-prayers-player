/* [Grok-Bot] V2.04: Statistik wie im Tadatmya-Vedanta-Player, eigener Namensraum "bpp-clbuerger-" (countapi.mileshilliard.com) und
   Presence-Thema "bpp/clbuerger/presence/v1/" (MQTT broker.emqx.io). Aufrufe (einmal je Sitzung) und Hoerzeit (MP3 und YouTube, je volle Minute)
   als Tageswerte, Monat/gesamt als Summe der Tage ab 2026-10-07. Orte: verschiedene IPs je Tag (nur Hash gespeichert), Ort per geojs.io.
   "aktiv in": Orte der letzten 10 Minuten (TOP 10). Anzeige dezent unter der Fusszeile. Ohne Netz: keine Zaehlung, keine Fehler. */
window.BPP_BUILD="2.04";
(function(){
  if(window.bppV204) return; window.bppV204=1;
  var API="https://countapi.mileshilliard.com/api/v1", CK="bpp-clbuerger-", START="2026-10-07";
  var S={day:null, month:null, total:null, dmin:0, mmin:0, tmin:0, acc:0, last:0, oday:null, omon:null, otot:null};
  function p2(n){ return String(n).padStart(2,"0"); }
  function fmtD(d){ return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate()); }
  function ymd(){ return fmtD(new Date()); }
  function days(a, b){ var o=[], c=new Date(a+"T12:00:00"), e=new Date(b+"T12:00:00"); while(c<=e){ o.push(fmtD(c)); c.setDate(c.getDate()+1); } return o; }
  function hit(k){ return fetch(API+"/hit/"+encodeURIComponent(k)).then(function(r){ return r.json(); }).then(function(j){ return +j.value||0; }).catch(function(){ return 0; }); }
  function get(k){ return fetch(API+"/get/"+encodeURIComponent(k)).then(function(r){ return r.ok?r.json():{value:0}; }).then(function(j){ return +j.value||0; }).catch(function(){ return 0; }); }
  function sumKeys(ks){ var i=0, s=0; function nx(){ if(i>=ks.length) return Promise.resolve(s); var b=ks.slice(i, i+10); i+=10;
    return Promise.all(b.map(get)).then(function(v){ v.forEach(function(x){ s+=(+x||0); }); return nx(); }); } return nx(); }
  function sumDays(pre, a, b){ return sumKeys(days(a, b).map(function(d){ return CK+pre+d; })); }
  function hs(s){ s=String(s||""); var h=5381; for(var k=0;k<s.length;k++) h=((h<<5)+h+s.charCodeAt(k))|0; return (h>>>0).toString(16); }
  function fm(m){ return Math.max(0, Math.round(m||0))+" min"; }
  function fh(m){ var h=Math.max(0, m||0)/60; return (h<10?Math.round(h*10)/10:Math.round(h))+" h"; }
  function fd(m){ m=Math.max(0, Math.round(m||0)); var d=Math.floor(m/1440); m-=d*1440; var h=Math.floor(m/60); m-=h*60; var o=[]; if(d) o.push(d+" d"); if(h) o.push(h+" h"); if(m||!o.length) o.push(m+" min"); return o.join(" "); }
  function box(){
    var b=document.getElementById("bpp-stats"); if(b) return b;
    if(!document.body) return null;
    var st=document.createElement("style"); st.textContent="#bpp-stats{font-size:.68rem;color:#cbb89a;opacity:.85;line-height:1.35;text-align:right;padding:4px 12px 8px;margin:0}";
    document.head.appendChild(st);
    b=document.createElement("div"); b.id="bpp-stats";
    var f=document.getElementById("foot"); if(f && f.parentNode) f.parentNode.insertBefore(b, f.nextSibling); else document.body.appendChild(b);
    return b;
  }
  function draw(){
    var b=box(); if(!b) return;
    var dn=S.day==null?null:(+S.day||0), mn=S.month==null?null:Math.max(+S.month||0, dn||0), tn=S.total==null?null:Math.max(+S.total||0, mn||0);
    var dm=+S.dmin||0, mm=Math.max(+S.mmin||0, dm), tm=Math.max(+S.tmin||0, mm);
    var h="Aufrufe: heute "+(dn==null?"\u2014":dn)+", Monat "+(mn==null?"\u2014":mn)+" = gesamt "+(tn==null?"\u2014":tn);
    h+="<br>H\u00f6rzeit: heute "+fm(dm)+", Monat "+fh(mm)+" = gesamt "+fd(tm);
    if(S.oday!=null){ var od=+S.oday||0, om=Math.max(+S.omon||0, od), ot=Math.max(+S.otot||0, om); h+="<br>Orte: heute "+od+", Monat "+om+" = gesamt "+ot+'<span id="bpp-live"></span>'; }
    b.innerHTML=h; livePaint();
  }
  /* Hoerzeit: MP3 (timeupdate) und YouTube (ytPlaying) */
  function playing(){ try{ if(typeof ytOn!=="undefined" && ytOn) return !!ytPlaying; var a=document.getElementById("a"); return !!(a && a.src && !a.paused && !a.ended); }catch(e){ return false; } }
  setInterval(function(){
    var now=Date.now();
    if(!playing()){ S.last=0; return; }
    if(S.last){ var add=Math.min(2.5, (now-S.last)/1000); if(add>0){ S.acc+=add; S.dmin+=add/60; } }
    S.last=now;
    if(S.acc>=60){ S.acc-=60; if(navigator.onLine) hit(CK+"min-"+ymd()).then(function(v){ S.dmin=Math.max(S.dmin, v||0); S.mmin=Math.max((+S.mmin||0)+1, S.dmin); S.tmin=Math.max((+S.tmin||0)+1, S.mmin); draw(); }); }
  }, 1000);
  setInterval(function(){ if(playing()) draw(); }, 15000);
  function places(){
    fetch("https://get.geojs.io/v1/ip/geo.json").then(function(r){ return r.json(); }).then(function(g){
      if(!g || !g.ip) return; city=(g.city||"").trim(); country=(g.country_code||g.country||"").trim();
      var h=hs(g.ip), t=ymd();
      hit(CK+"ipd-"+t+"-"+h).then(function(v){ return v===1?hit(CK+"ips-"+t):get(CK+"ips-"+t); }).then(function(od){
        S.oday=od||0; draw();
        return Promise.all([sumDays("ips-", t.slice(0,7)+"-01", t), sumDays("ips-", START, t)]);
      }).then(function(v){ if(!v) return; S.omon=Math.max(v[0]||0, S.oday||0); S.otot=Math.max(v[1]||0, S.omon); draw(); });
      connect();
    }).catch(function(){ connect(); });
  }
  function stats(){
    draw();
    if(!navigator.onLine) return;
    var t=ymd(), dk=CK+"opens-"+t, already=false;
    try{ already=sessionStorage.getItem("bpp-open-session")==="1"; }catch(e){}
    (already?get(dk):hit(dk)).then(function(d){
      try{ sessionStorage.setItem("bpp-open-session","1"); }catch(e){}
      S.day=d||0; draw();
      return Promise.all([sumDays("opens-", t.slice(0,7)+"-01", t), sumDays("opens-", START, t), get(CK+"min-"+t), sumDays("min-", t.slice(0,7)+"-01", t), sumDays("min-", START, t)]);
    }).then(function(v){
      S.month=Math.max(v[0]||0, S.day||0); S.total=Math.max(v[1]||0, S.month);
      S.dmin=Math.max(v[2]||0, S.dmin); S.mmin=Math.max(v[3]||0, S.dmin); S.tmin=Math.max(v[4]||0, S.mmin); draw(); places();
    });
  }
  /* Presence / TOP 10 */
  var BROKER="wss://broker.emqx.io:8084/mqtt", TOPIC="bpp/clbuerger/presence/v1/", WIN=10*60*1000, peers={}, client=null, sid="", city="", country="";
  try{ sid=sessionStorage.getItem("bpp-presence-id"); if(!sid){ sid="s"+Math.random().toString(16).slice(2)+Date.now().toString(16); sessionStorage.setItem("bpp-presence-id", sid); } }catch(e){ sid="s"+Math.random().toString(16).slice(2); }
  function livePaint(){
    var el=document.getElementById("bpp-live"); if(!el) return;
    var now=Date.now(), by={};
    Object.keys(peers).forEach(function(id){ var p=peers[id]; if(!p || now-p.t>WIN){ delete peers[id]; return; } if(!p.c && !p.o) return; var l=[p.c, p.o].filter(Boolean).join(", "); by[l]=(by[l]||0)+1; });
    var rows=Object.keys(by).map(function(k){ return {n:k, c:by[k]}; }).sort(function(a, b){ return b.c-a.c || a.n.localeCompare(b.n); }).slice(0, 10);
    el.textContent=rows.length?" \u00b7 aktiv in: "+rows.map(function(r){ return r.n+(r.c>1?" \u00d7"+r.c:""); }).join(" \u00b7 "):"";
  }
  function body(){ var pr=""; try{ if(typeof i!=="undefined" && i>=0 && PRAYERS[i] && playing()) pr=String(PRAYERS[i].id||"").slice(0,40); }catch(e){} return JSON.stringify({c:city.slice(0,64), o:country.slice(0,8), l:pr, t:Date.now()}); }
  function pub(){ if(!client || !client.connected) return; var b=body(); try{ client.publish(TOPIC+sid, b, {qos:0, retain:true}); peers[sid]=JSON.parse(b); livePaint(); }catch(e){} }
  function clearMine(){ if(client && sid) try{ client.publish(TOPIC+sid, "", {qos:0, retain:true}); }catch(e){} }
  function connect(){
    if(client || !navigator.onLine) return;
    function go(){ if(!window.mqtt) return;
      try{
        client=window.mqtt.connect(BROKER, {clientId:"bpp-"+sid.slice(0,18), clean:true, reconnectPeriod:5000, connectTimeout:12000});
        client.on("connect", function(){ client.subscribe(TOPIC+"#", {qos:0}); pub(); });
        client.on("message", function(tp, buf){ if(tp.indexOf(TOPIC)!==0) return; var id=tp.slice(TOPIC.length); if(!id || id.indexOf("/")>=0) return;
          var raw=buf && buf.length?buf.toString():""; if(!raw){ delete peers[id]; livePaint(); return; }
          try{ var p=JSON.parse(raw); if(p && p.t) peers[id]={c:String(p.c||"").slice(0,64), o:String(p.o||"").slice(0,8), l:String(p.l||"").slice(0,40), t:+p.t||0}; else delete peers[id]; }catch(e){ delete peers[id]; }
          livePaint(); });
        client.on("error", function(){});
        setInterval(function(){ if(document.visibilityState==="hidden" && !playing()) return; pub(); }, 75000);
      }catch(e){}
    }
    if(window.mqtt) go(); else { var s=document.createElement("script"); s.src="lib/mqtt.min.js"; s.async=true; s.onload=go; s.onerror=function(){}; /* [Grok-Bot] V3.41 lokal (MIT), offline still */ document.head.appendChild(s); }
  }
  window.addEventListener("pagehide", clearMine);
  document.addEventListener("visibilitychange", function(){ if(document.visibilityState==="visible") pub(); });
  window.bppStats=function(){ return {S:S, peers:peers, connected:!!(client && client.connected)}; };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", stats); else stats();
  function showV(){ var v=document.querySelector("h1 .ver"); if(v) v.textContent="V2.04"; document.title="Bhakti Prayers Player V2.04"; }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", showV); else showV();
  setTimeout(showV, 900); setTimeout(showV, 1500);
})();
