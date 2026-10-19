/* [Grok-Bot] V3.11: "Prayers runterladen" mit sichtbarer Rueckmeldung. Ursache: der Download (v203 bppOfflineRun) lief zwar,
   aber der Knopf zeigte nichts, der Fortschritt stand nur klein unten rechts, und wenn schon alles gespeichert war,
   kam wegen S.quick gar keine Meldung - es sah aus, als passiere nichts. Jetzt: Knopf zeigt "x/22" (gold), danach Meldung. */
window.BPP_BUILD="3.11"; window.BPP_SHOW="3.11";
(function(){
  var T={de:["Alle %n Prayers offline gespeichert","%k/%n offline gespeichert · Fehler: %e","Offline – Download nicht möglich","Zu wenig Speicher auf dem Gerät","Download läuft …"],
    en:["All %n prayers saved offline","%k/%n saved offline · errors: %e","Offline – download not possible","Not enough storage on this device","Downloading …"],
    fr:["Les %n prières sont enregistrées hors ligne","%k/%n hors ligne · erreurs : %e","Hors ligne – téléchargement impossible","Espace de stockage insuffisant","Téléchargement …"],
    es:["Las %n oraciones guardadas sin conexión","%k/%n sin conexión · errores: %e","Sin conexión – no se puede descargar","No hay espacio suficiente","Descargando …"],
    ru:["Все %n молитв сохранены офлайн","%k/%n офлайн · ошибки: %e","Нет сети – загрузка невозможна","Недостаточно памяти","Загрузка …"],
    hi:["सभी %n प्रार्थनाएँ ऑफ़लाइन सहेजी गईं","%k/%n ऑफ़लाइन · त्रुटि: %e","ऑफ़लाइन – डाउनलोड संभव नहीं","डिवाइस में जगह कम है","डाउनलोड हो रहा है …"],pt:["Todas as %n orações salvas offline","%k/%n salvas offline · erros: %e","Offline – não é possível baixar","Espaço insuficiente neste aparelho","Baixando …"]};
  function t(k){ var l=(typeof lang!=="undefined"&&T[lang])?lang:"en"; return T[l][k]; }
  var st=document.createElement("style");
  st.textContent="#btnOffAll.busy{background:#e0b45a!important;color:#1a1208!important;font-weight:700;box-shadow:0 0 0 2px #e0b45a66}"+
   "#bppDlMsg{position:fixed;right:10px;bottom:34px;z-index:60;max-width:80vw;background:#2a1f16;color:#e0b45a;border:1px solid #e0b45a;border-radius:10px;padding:8px 12px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 4px 18px #0008}";
  document.head.appendChild(st);
  function msg(s){ var m=document.getElementById("bppDlMsg"); if(!m){ m=document.createElement("div"); m.id="bppDlMsg"; document.body.appendChild(m); }
    m.textContent=s; m.style.display=""; clearTimeout(msg._t); msg._t=setTimeout(function(){ m.style.display="none"; },6000); }
  var busy=false;
  function go(e){
    if(e){ e.preventDefault(); e.stopImmediatePropagation(); }
    var b=document.getElementById("btnOffAll"); if(busy||!b) return;
    if(!navigator.onLine){ msg(t(2)); return; }
    if(!("caches" in window)||!navigator.serviceWorker||typeof window.bppOfflineRun!=="function"){ msg(t(2)); return; }
    var S=window.bppOfflineState||{}; S.done=false; S.cur=""; S.errFiles=[]; S.err=0; S.quick=true; delete S.free;
    busy=true; b.classList.add("busy"); b.textContent=t(4);
    var t0=Date.now(), loaded=false, seenCur=false;
    try{ window.bppOfflineRun(); }catch(err){}
    var iv=setInterval(function(){
      var tot=S.total||22, n=S.n||0;
      if(S.cur){ seenCur=true; b.textContent=n+"/"+tot; }
      var fin=(S.done && !S.cur) || (seenCur && !S.cur) || Date.now()-t0>15*60000;
      var noSpace=(typeof S.free==="number" && !seenCur && Date.now()-t0>4000 && !S.done);
      if(!fin && !noSpace) return;
      clearInterval(iv); busy=false; b.classList.remove("busy");
      b.textContent=""; try{ window.dispatchEvent(new Event("bpp-lang")); }catch(err){}
      var ef=S.errFiles||[];
      if(noSpace) msg(t(3));
      else if(ef.length) msg(t(1).replace("%k",n).replace("%n",tot).replace("%e",ef.join(", ")));
      else if(n>=tot) msg(t(0).replace("%n",tot));
      else msg(t(1).replace("%k",n).replace("%n",tot).replace("%e","?"));
    },400);
  }
  var n=0,iv=setInterval(function(){ var b=document.getElementById("btnOffAll"); if(b&&!b._v311){ b._v311=1; b.onclick=null; b.addEventListener("click",go,true); }
    if((b&&b._v311)||++n>100) clearInterval(iv); },300);
  /* Beschriftung zurueck: v305 setzt sie jede Sekunde; leer -> sofort neu */
  setInterval(function(){ var b=document.getElementById("btnOffAll"); if(b&&!busy&&!b.textContent){ b.textContent=({de:"Prayers runterladen",en:"Download prayers",fr:"Télécharger les prières",es:"Descargar oraciones",ru:"Скачать молитвы",hi:"प्रार्थनाएँ डाउनलोड करें",pt:"Baixar orações"})[(typeof lang!=="undefined"&&lang)]||"Download prayers"; } },200);
})();
