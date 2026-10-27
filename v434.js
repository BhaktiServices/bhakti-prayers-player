/* [Grok-Bot] V4.34: Tagesleiste (Mo-So, Alle) klein und flach, nur sichtbar bei Menue+ (body.menu-full); Platz bleibt reserviert, damit beim Umschalten nichts springt. Logik und Gold unveraendert.
   Ausserdem (in v433.js): Hinweistext von |< >| wird nicht mehr staendig neu gesetzt (kein Blinken des Tooltips). */
window.BPP_BUILD="4.34"; window.BPP_SHOW="4.34";
(function(){
  var st=document.createElement("style");
  st.textContent="body:not(.menu-full) .daybar{visibility:hidden!important;pointer-events:none!important}"+
   ".daybar{gap:3px!important;margin:1px 0 0!important}"+
   ".daybar button{font-size:.7rem!important;padding:1px 6px!important;line-height:1.15!important;min-height:0!important;height:auto!important;box-shadow:none!important;border-radius:5px!important;font-weight:500}"+
   ".daybar button.today{font-weight:700}";
  document.head.appendChild(st);
})();
/* [Grok-Bot] V4.34: Strophe allein aus Medienzeit + Marken. Ursache des Fehlers: bppSkip/autoLineFromTime nutzten stanzaFromProgress -> bppStarts (marks.js),
   das aus den Marken Silben-Raten interpoliert und durch scrollTempo teilt; dazu Vorlauf (LEAD) und bei YouTube die veraltete ytTime. Bei hoher Geschwindigkeit
   und Spruengen lag die geschaetzte Strophengrenze daher neben der echten Marke. Jetzt: letzte Marke <= Medienzeit, neu nach Sprung, seeked, ratechange und laufend. */
(function(){
  function A(){ return document.getElementById("a"); }
  function marks(){ try{ var P=PRAYERS[i]; return ((ytOn?(P.marks||P.marksYt):P.marksFile)||[]); }catch(e){ return []; } }
  function mt(){ try{ if(ytOn) return typeof ytTime==="number"?ytTime:null; var a=A(); return a&&a.src?a.currentTime:null; }catch(e){ return null; } }
  function dur(){ try{ if(ytOn) return typeof ytDur==="number"&&ytDur>1?ytDur:null; var a=A(); return a&&isFinite(a.duration)?a.duration:null; }catch(e){ return null; } }
  function kAt(t){ var m=marks(),k=-1,n=0; for(var j=0;j<m.length;j++){ if(m[j]!=null){ n++; if(m[j]<=t+0.05) k=j; } } return n>=2?k:null; }
  /* [Grok-Bot] V4.50: seq vor Marken – dieselbe Quelle wie stanzaFromProgress (kein Pendeln gegen Mitlesen) */
  function kAtAuth(t){
    try{
      if(typeof i==="undefined"||i<0||typeof PRAYERS==="undefined") return kAt(t);
      var P=PRAYERS[i], s=(typeof window.bppSeqOf==="function")?window.bppSeqOf(P):((typeof ytOn!=="undefined"&&ytOn)?P.seqYt:P.seqFile);
      if(s&&s.length){ var k=s[0][1]; for(var j=0;j<s.length;j++){ if(s[j][0]<=t+0.05) k=s[j][1]; else break; } return k<0?0:k; }
    }catch(e){}
    return kAt(t);
  }
  window.bppStanzaAtMedia=function(){ var t=mt(); return t==null?null:kAtAuth(t); };
  var hold=0;
  function fix(){ try{
      if(typeof i==="undefined"||i<0||Date.now()<hold) return;
      if(!(typeof autoScroll!=="undefined"&&autoScroll)) return; /* [Grok-Bot] V4.50: nur bei Mitsingen an */
      if(typeof holdLineUntil==="number"&&Date.now()<holdLineUntil) return; /* [Grok-Bot] V4.52: manuelle Strophenwahl (Scroll/Tipp) hat Vorrang – wie autoLineFromTime */
      if(window.bppSeekPending) return; /* [Grok-Bot] V4.52: waehrend Spulen nicht zurueckziehen */
      /* [Grok-Bot] V4.50: dieselbe Instanz wie autoLineFromTime (stanzaFromProgress inkl. seq/Vorlauf) – kein zweiter Schreiber */
      var p=songProgress(); if(!p||!p.gs||!p.gs.length) return;
      var k=(typeof stanzaFromProgress==="function")?stanzaFromProgress(p):kAtAuth(mt());
      if(k==null||k<0) return; if(k>p.gs.length-1) k=p.gs.length-1;
      if(!p.gs[k]) return; var st=p.gs[k].start;
      var cg=currentGroupIndex();
      if(cg!==k){ line=st; manualShift=0; holdLineUntil=Date.now()+800; if(typeof persistNow==="function") persistNow(); paintLyrics(); } }catch(e){} }
  window.bppFixStanza=fix;
  function later(){ fix(); setTimeout(fix,150); setTimeout(fix,500); setTimeout(fix,1000); setTimeout(fix,1600); }
  var sk=window.bppSkip; if(typeof sk==="function") window.bppSkip=function(d){ var r=sk.apply(this,arguments); hold=0; later(); return r; };
  var a=A(); if(a){ a.addEventListener("seeked",later); a.addEventListener("ratechange",later); }
  var sr=window.bppSetRate; if(typeof sr==="function") window.bppSetRate=function(){ var r=sr.apply(this,arguments); later(); return r; };
  setInterval(function(){ try{ if(isPlaying()) fix(); }catch(e){} },250);

  /* ---- Strophe wiederholen (Endlosschleife, von Grok ergänzt) ---- */
  var T={de:["Strophe wiederholen (von Grok ergänzt)","Strophen-Schleife beenden (von Grok ergänzt)","Für diese Strophe fehlt die Endmarke – Schleife nicht möglich","Strophe wiederholen: Die gewählte Strophe wird endlos wiederholt (Ende = nächste Strophenmarke, bei der letzten Strophe das Ende der Aufnahme), bis die Taste wieder gedrückt wird. Zum Üben schwieriger Stellen; MP3 und YouTube, jede Geschwindigkeit. Fehlt die nächste Marke, geht es nicht. (von Grok ergänzt)"],
   en:["Repeat stanza (added by Grok)","Stop stanza loop (added by Grok)","No end mark for this stanza – loop not possible","Repeat stanza: the chosen stanza loops endlessly (end = next stanza mark, for the last stanza the end of the recording) until pressed again. For practising difficult passages; MP3 and YouTube, any speed. Not available if the next mark is missing. (von Grok ergänzt)"],
   fr:["Répéter la strophe (ajouté par Grok)","Arrêter la boucle (ajouté par Grok)","Pas de repère de fin pour cette strophe – boucle impossible","Répéter la strophe : la strophe choisie est répétée en boucle (fin = repère suivant, pour la dernière la fin de l'enregistrement) jusqu'à un nouvel appui. MP3 et YouTube, toute vitesse. (von Grok ergänzt)"],
   es:["Repetir estrofa (añadido por Grok)","Detener bucle (añadido por Grok)","Falta la marca final de esta estrofa – bucle imposible","Repetir estrofa: la estrofa elegida se repite sin fin (fin = marca siguiente, en la última el final de la grabación) hasta pulsar de nuevo. MP3 y YouTube, cualquier velocidad. (von Grok ergänzt)"],
   ru:["Повторять строфу (добавлено Grok)","Остановить повтор строфы (добавлено Grok)","Нет конечной метки для этой строфы – повтор невозможен","Повтор строфы: выбранная строфа повторяется бесконечно (конец = следующая метка, для последней – конец записи), пока кнопку не нажмут снова. MP3 и YouTube, любая скорость. (von Grok ergänzt)"],
   hi:["छंद दोहराएँ (Grok द्वारा जोड़ा गया)","छंद लूप बंद करें (Grok द्वारा जोड़ा गया)","इस छंद का अंत-चिह्न नहीं है – लूप संभव नहीं","छंद दोहराएँ: चुना गया छंद लगातार दोहराया जाता है (अंत = अगला चिह्न, अंतिम छंद में रिकॉर्डिंग का अंत) जब तक बटन फिर न दबाएँ। MP3 और YouTube, हर गति। (von Grok ergänzt)"],
   pt:["Repetir estrofe (adicionado pelo Grok)","Parar repetição da estrofe (adicionado pelo Grok)","Falta a marca final desta estrofe – repetição impossível","Repetir estrofe: a estrofe escolhida repete sem fim (fim = marca seguinte, na última o fim da gravação) até premir de novo. MP3 e YouTube, qualquer velocidade. (von Grok ergänzt)"],
   cz:["Opakovat sloku (doplněno Grokem)","Ukončit smyčku sloky (doplněno Grokem)","Chybí koncová značka této sloky – smyčka není možná","Opakovat sloku: zvolená sloka se opakuje stále dokola (konec = další značka, u poslední konec nahrávky), dokud tlačítko znovu nestisknete. MP3 i YouTube, libovolná rychlost. (von Grok ergänzt)"]};
  function tx(n){ var l=(typeof lang!=="undefined"&&T[lang])?lang:"en"; return T[l][n]; }
  var loop=null; /* {pi, k, s, e, yt} */
  function range(k){ var m=marks(); if(k==null||k<0||m[k]==null) return null; var e=null, last=true;
    for(var j=k+1;j<m.length;j++){ last=false; if(m[j]!=null){ e=(j===k+1)?m[j]:null; break; } }
    if(!last && e==null) return null; /* naechste Marke fehlt: keine Zeit erfinden */
    if(e==null) e=dur(); if(e==null) return null; return {s:m[k], e:e}; }
  function seek(t){ try{ if(ytOn){ yt.contentWindow.postMessage(JSON.stringify({event:"command",func:"seekTo",args:[t,true]}),"*"); ytTime=t; } else { A().currentTime=t; } }catch(e){} later(); }
  var btn=null, msgT=0;
  function paint(){ if(!btn) return; var on=!!loop, t=tx(on?1:0)+" (⇧R)"; if(btn.title!==t) btn.title=t; if(btn.getAttribute("aria-label")!==t) btn.setAttribute("aria-label",t);
    if(btn.classList.contains("act358")!==on) btn.classList.toggle("act358",on); if(btn.classList.contains("gold")!==on) btn.classList.toggle("gold",on);
    var r=range(window.bppStanzaAtMedia()); var dis=!on && !r; if(btn.disabled!==dis) btn.disabled=dis; if(dis && btn.title!==tx(2)) btn.title=tx(2); }
  function toggle(){ if(loop){ loop=null; window.bppStanzaLoop=null; paint(); return; }
    var k=window.bppStanzaAtMedia(), r=range(k);
    if(!r){ hint(tx(2)); return; }
    loop={pi:i,k:k,s:r.s,e:r.e,yt:ytOn}; window.bppStanzaLoop=loop; paint(); }
  function hint(s){ try{ var d=document.getElementById("bppHint434"); if(!d){ d=document.createElement("div"); d.id="bppHint434"; d.style.cssText="position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#333;color:#fff;padding:6px 12px;border-radius:8px;font-size:.85rem;z-index:99999"; document.body.appendChild(d); }
    d.textContent=s; d.style.display="block"; clearTimeout(msgT); msgT=setTimeout(function(){ d.style.display="none"; },3000); }catch(e){} }
  window.bppStanzaLoopToggle=toggle; window.bppStanzaLoopOff=function(){ loop=null; window.bppStanzaLoop=null; paint(); };
  setInterval(function(){ try{
    if(loop && (loop.pi!==i || loop.yt!==ytOn)){ loop=null; window.bppStanzaLoop=null; paint(); return; }
    if(!loop) return; var t=mt(); if(t==null) return;
    var end=loop.e - (ytOn?0.15:0.05);
    if(t>=end || t<loop.s-1.5){ seek(loop.s); }
  }catch(e){} },80);
  function mkBtn(){ /* [Grok-Bot] V4.35: eigene Taste entfaellt, Modus 1 der Wiederholen-Taste (v435.js) */ var o=document.getElementById("btnRepS"); if(o) o.remove(); return; if(btn&&document.body.contains(btn)) return; var r=document.getElementById("btnRep"); if(!r) return;
    btn=document.createElement("button"); btn.type="button"; btn.id="btnRepS"; btn.className=r.className.replace(/\b(on|gold|act358|s358)\b/g,"");
    btn.textContent="↻ Str."; btn.style.fontSize=".78rem"; btn.addEventListener("click",function(e){ e.preventDefault(); toggle(); });
    r.parentNode.insertBefore(btn, r.nextSibling); paint(); }
  var st=document.createElement("style"); st.textContent="#btnRepS.gold{background:#d4a017!important;color:#000!important;border-color:#b8860b!important}#btnRepS:disabled{opacity:.45}"; document.head.appendChild(st);
  document.addEventListener("keydown",function(e){ if(e.ctrlKey||e.altKey||e.metaKey||!e.shiftKey) return; var tg=e.target&&e.target.tagName; if(/INPUT|TEXTAREA|SELECT/.test(tg)||(e.target&&e.target.isContentEditable)) return;
    if(e.key==="R"||e.code==="KeyR"&&e.shiftKey){ e.preventDefault(); e.stopImmediatePropagation(); if(window.bppRepCycle) window.bppRepCycle(-1); } },true); /* [Grok-Bot] V4.35: Umschalt+R = Wiederholen-Modus rueckwaerts */
  window.bppStanzaRange=function(){ return range(window.bppStanzaAtMedia()); };
  function help(){ var d=document.getElementById("bppHelp"); if(!d) return; var p=d.querySelector("p.rs434"); if(p) p.remove(); return; var t=tx(3);
    if(!p){ p=document.createElement("p"); p.className="rs434"; d.appendChild(p); } if(p.textContent!==t) p.textContent=t; }
  setInterval(function(){ try{ mkBtn(); paint(); help(); }catch(e){} },400);
})();
/* [Grok-Bot] V4.34: Ruhiges Scrollen bei "Akkorde in Zeile". Ursache: paintLyrics baut die Strophen neu auf (u.a. periodisch durch Akkord-/Marken-Skripte);
   mit Zeilenakkorden sind die Strophen hoeher, nach dem Neuaufbau steht scrollTop kurz woanders, und v250 laesst das Fenster jedes Mal von dort neu zur
   GLEICHEN Strophe gleiten -> Pendeln alle paar Sekunden. Jetzt: weiches Gleiten nur bei Strophenwechsel (oder Einstellungswechsel); gleiche Strophe = sofort exakt an Ort. */
(function(){
  function wrap(){ var pin=window.pinStanza; if(typeof pin!=="function"||pin.__434) return; var last=null;
    var f=function(){ var L=document.getElementById("lyrics"), on=L&&L.querySelector(".stanza.on");
      var key=on?[(typeof i!=="undefined"?i:""),on.getAttribute("data-start"),typeof chMode!=="undefined"?chMode:"",localStorage.getItem("bpp-cols")||"",typeof lang!=="undefined"?lang:""].join("|"):null;
      var same=key&&key===last; last=key;
      var self=this, args=arguments; /* erst nach der Akkord-Umwandlung (v365, MutationObserver-Mikrotask) messen */
      Promise.resolve().then(function(){ var sv=window.bppManualAt; if(same) window.bppManualAt=Date.now(); try{ pin.apply(self,args); } finally{ if(same) window.bppManualAt=sv; } }); };
    f.__434=1; window.pinStanza=f; try{ pinStanza=f; }catch(e){} }
  wrap(); setTimeout(wrap,500); setTimeout(wrap,2000);
})();
/* [Grok-Bot] V4.34: Kavacam Pbj Marken 51=1015.0, 52=1030.0, 53=1047.0, 54=1075.0, 55=1108.0 (Vorgabe Nutzer); gespeicherte Nutzer-Marken fuer Kavacam einmalig zurueckgesetzt. */
(function(){ try{ if(localStorage.getItem("bpp-reset434-kav")) return; var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}");
  delete s["kavacham|file"]; delete s["kavacham|yt"]; localStorage.setItem("bpp-marks",JSON.stringify(s)); localStorage.setItem("bpp-reset434-kav","1"); }catch(e){} })();
