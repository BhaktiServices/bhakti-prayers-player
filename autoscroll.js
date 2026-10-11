/* [Grok.com] Auto-Scroll: 1. und 2. Tempo, N als Takt, Strophe oben */
var ytTime=null, ytDur=null, playOrigin=Date.now(), holdLineUntil=0;
var scrollTempo2=0, splitTime=-1, splitIdx=-1;
/* [Grok-Bot] V1.32: manualShift = Versatz in Strophen, den N/V bei Auto gesetzt haben (sonst sprang Auto zurück) */
var manualShift=0;
function tempoMap(){
  try{ return JSON.parse(localStorage.getItem("bpp-tempo")||"{}"); }catch(e){ return {}; }
}
function rememberTempo(){
  if(i<0 || !PRAYERS[i]) return;
  var m=tempoMap();
  m[PRAYERS[i].id]={
    tempo:scrollTempo,
    tempo2:scrollTempo2,
    splitTime:splitTime,
    splitIdx:splitIdx,
    auto:!!autoScroll,
    at:Date.now()
  };
  try{ localStorage.setItem("bpp-tempo", JSON.stringify(m)); }catch(e){}
}
function restoreTempo(id){
  var t=tempoMap()[id];
  if(!t){
    scrollTempo2=0; splitTime=-1; splitIdx=-1;
    return false;
  }
  if(typeof t.tempo==="number" && t.tempo>=0.5 && t.tempo<=1.8) scrollTempo=t.tempo;
  scrollTempo2=(typeof t.tempo2==="number" && t.tempo2>=0.5)?t.tempo2:0;
  splitTime=(typeof t.splitTime==="number")?t.splitTime:-1;
  splitIdx=(typeof t.splitIdx==="number")?t.splitIdx:-1;
  autoScroll=!!t.auto;
  return true;
}
function markPlayOrigin(){
  var already=0;
  try{ if(!ytOn && a.src && isFinite(a.currentTime)) already=a.currentTime; }catch(e){}
  if(ytOn && typeof ytTime==="number") already=ytTime;
  playOrigin=Date.now()-already*1000;
}
function toggleAuto(){
  autoScroll=!autoScroll;
  if(autoScroll && isPlaying()){ markPlayOrigin(); setTimeout(pinStanza, 200); }
  rememberTempo();
  persistNow(); applyUI();
}
function shiftScroll(d){
  var p=songProgress();
  var inSecond=p && splitTime>=0 && p.t>=splitTime;
  if(inSecond || scrollTempo2){
    if(!scrollTempo2) scrollTempo2=scrollTempo;
    scrollTempo2=Math.round((scrollTempo2+d)*100)/100;
    if(scrollTempo2<0.5) scrollTempo2=0.5;
    if(scrollTempo2>2.2) scrollTempo2=2.2;
  } else {
    scrollTempo=Math.round((scrollTempo+d)*100)/100;
    if(scrollTempo<0.5) scrollTempo=0.5;
    if(scrollTempo>1.8) scrollTempo=1.8;
  }
  rememberTempo();
  persistNow(); applyUI();
}
function askYtTime(){
  if(!ytOn) return;
  try{
    yt.contentWindow.postMessage(JSON.stringify({event:"listening",id:1}),"*");
    yt.contentWindow.postMessage(JSON.stringify({event:"command",func:"getCurrentTime",args:[]}),"*");
    yt.contentWindow.postMessage(JSON.stringify({event:"command",func:"getDuration",args:[]}),"*");
  }catch(e){}
}
function songProgress(){
  if(i<0) return null;
  var P=PRAYERS[i];
  var gs=stanzaGroups(P);
  var n=Math.max(gs.length,1);
  var est=(typeof P.dauer==="number" && P.dauer>10)?P.dauer:n*14;
  var t=0, dur=est;
  if(!ytOn && a && a.src){
    if(isFinite(a.duration) && a.duration>=8){ dur=a.duration; t=a.currentTime||0; }
    else { t=(Date.now()-playOrigin)/1000; dur=est; }
  } else {
    if(typeof ytTime==="number") t=ytTime;
    else t=(Date.now()-playOrigin)/1000;
    if(typeof ytDur==="number" && ytDur>=8) dur=ytDur;
    else dur=est;
  }
  if(t<0) t=0;
  if(dur<8) dur=est;
  return { t:t, dur:dur, gs:gs, n:n };
}
function tempoLabel(){
  if(scrollTempo2 && splitTime>=0){
    return "×"+scrollTempo.toFixed(2)+" → ×"+scrollTempo2.toFixed(2);
  }
  return "×"+scrollTempo.toFixed(2);
}
function syncAutoFromLine(){
  holdLineUntil=Date.now()+1600;
  if(!autoScroll || i<0) return;
  var p=songProgress();
  if(!p) return;
  var n=currentGroupIndex();
  if(n<=0){
    manualShift=0; /* [Grok-Bot] V1.32 */
    markPlayOrigin();
    rememberTempo();
    applyUI();
    return;
  }
  if(p.t<1.2){ keepManual(p,n); return; }
  var tempo=(n*p.dur)/(p.t*p.n);
  if(tempo<0.5) tempo=0.5;
  if(tempo>2.2) tempo=2.2;
  tempo=Math.round(tempo*100)/100;
  if(splitTime<0 && tempo>scrollTempo*1.12 && n>=2){
    splitTime=p.t;
    splitIdx=n;
    scrollTempo2=tempo;
  } else if(splitTime>=0 && p.t>=splitTime){
    scrollTempo2=tempo;
    if(splitIdx<0) splitIdx=n;
  } else {
    scrollTempo=tempo;
  }
  keepManual(p,n);
  rememberTempo();
  persistNow();
  applyUI();
  paintList();
}
/* [Grok-Bot] V1.32: gewählte Strophe bleibt, Auto läuft von dort weiter */
function keepManual(p,n){
  manualShift=0;
  var k=stanzaFromProgress(p);
  manualShift=n-k;
}
function stanzaFromProgress(p){
  var n=p.n;
  if(splitTime>=0 && scrollTempo2 && p.t>=splitTime){
    var leftT=Math.max(p.dur-splitTime, 1);
    var leftN=Math.max(n-Math.max(splitIdx,0), 1);
    var frac=((p.t-splitTime)/leftT)*scrollTempo2;
    if(frac>0.999) frac=0.999;
    if(frac<0) frac=0;
    var k=Math.max(splitIdx,0)+Math.floor(frac*leftN);
    if(k>n-1) k=n-1;
    return k;
  }
  var pos=(p.t/p.dur)*scrollTempo;
  if(pos>0.999) pos=0.999;
  if(pos<0) pos=0;
  var k=Math.floor(pos*n);
  if(k>n-1) k=n-1;
  if(k<0) k=0;
  return k;
}
/* [Grok-Bot] V1.44: aktuelle Strophe bleibt immer sichtbar; bei Spalten nebeneinander wird nicht mehr zur nächsten Spalte vorgesprungen */
function isPlaying(){
  if(typeof ytOn!=="undefined" && ytOn) return !!ytPlaying;
  var au=document.getElementById("a");
  return !!(au && au.src && !au.paused && !au.ended);
}
function pinStanza(){
  if(document.getElementById("bppFs") && document.getElementById("bppFs").classList.contains("on")) return;
  var panel=document.getElementById("lyrics");
  var on=panel&&panel.querySelector(".stanza.on");
  if(!panel||!on) return;
  /* [Grok.com] markierte Strophe oben ins Lyrics-Fenster, sofort */
  var pr=panel.getBoundingClientRect(), r=on.getBoundingClientRect();
  var first=on===panel.querySelector(".stanza");
  if(first) panel.scrollTop=0; /* [Grok.com] Titel bleibt ueber der ersten Strophe */
  else panel.scrollTop=Math.max(0, panel.scrollTop+(r.top-pr.top)-12);
  var bar=document.querySelector(".bar");
  var gap=bar?bar.getBoundingClientRect().bottom+6:8;
  var sc=document.scrollingElement||document.documentElement;
  var anchor=first?(panel.querySelector(".songtitle")||panel):on; /* [Grok.com] beim Start den Titel zeigen */
  var ar=anchor.getBoundingClientRect();
  if(ar.top<gap || ar.bottom>window.innerHeight-8) sc.scrollTop=Math.max(0, sc.scrollTop+(ar.top-gap));
}
function autoLineFromTime(){
  if(!autoScroll || i<0) return;
  if(!isPlaying()) return;
  if(Date.now()<holdLineUntil) return;
  var p=songProgress();
  if(!p) return;
  var k=stanzaFromProgress(p)+manualShift; /* [Grok-Bot] V1.32 */
  if(k<0) k=0;
  if(k>p.n-1) k=p.n-1;
  var start=p.gs[k]?p.gs[k].start:0;
  if(start!==line){ line=start; paintLyrics(); setTimeout(pinStanza, 30); setTimeout(pinStanza, 200); }
}
window.addEventListener("message", function(e){
  var d=e.data;
  if(typeof d==="string"){
    try{ d=JSON.parse(d); }catch(err){ return; }
  }
  if(!d) return;
  if(d.event==="infoDelivery" && d.info){
    if(typeof d.info.currentTime==="number") ytTime=d.info.currentTime;
    if(typeof d.info.duration==="number") ytDur=d.info.duration;
  }
});
/* [Grok-Bot] V1.77: Zeitgeber tut nichts, solange das Seitenskript (autoScroll, ytOn, i, line) noch nicht geladen ist (langsame Verbindung). */
function bppReady(){ return typeof autoScroll!=="undefined" && typeof ytOn!=="undefined" && typeof i!=="undefined" && typeof line!=="undefined" && typeof PRAYERS!=="undefined"; }
setInterval(function(){
  if(!bppReady() || !autoScroll) return;
  askYtTime();
  autoLineFromTime();
}, 400);
/* [Grok.com] Lyrics-Fenster nur beim Strophenanschlag, nicht alle 5 Sekunden */
