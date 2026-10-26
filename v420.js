/* [Grok-Bot] V4.20: Teilen-Link mit allen Einstellungen (von Grok ergänzt).
   ?p=<id>&t=<s>&rate=<x>&vol=<0-100>&rec=pbj|mtj|spn&cols=1|2|3&chords=aus|akk|zeile&tr=0|1&src=yt|mp3
   Sprache steht NICHT im Link: der Empfaenger bekommt seine Browsersprache (v315). Alte Links (?p=..&lang=..) gehen weiter.
   Beim Oeffnen: Werte vor v315-Direktlink in localStorage setzen, play() einmal mit Position fortsetzen, Lautstaerke auf <audio>. */
window.BPP_BUILD="4.20"; window.BPP_SHOW="4.20";
(function(){
  if(window.bppV420) return; window.bppV420=1;
  var st=document.createElement("style"); st.textContent=".bppRec.spnOn{background:#e0b45a!important;border-color:#e0b45a!important;color:#222!important}"; document.head.appendChild(st);
  var RECS={"guru-stotram":1,"ashtotram":1,"ashtotram-abend":1,"govinda":1,"kavacham":1,"suprabhatam":1};
  function recKey(id){ return id==="guru-stotram"?"bpp-gs-rec":"bpp-prabhus-"+id; }
  function ls(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
  function a(){ return document.getElementById("a"); }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function nowT(){ try{ return (typeof ytOn!=="undefined"&&ytOn)?(typeof ytTime==="number"?ytTime:0):(a().currentTime||0); }catch(e){ return 0; } }
  function rateOf(id){ try{ var m=JSON.parse(ls("bpp-rate")||"{}")||{}; return typeof m[id]==="number"?m[id]:1; }catch(e){ return 1; } }
  function hasSpn(){ var b=document.getElementById("bppRec402"); return !!(b&&b.style.display!=="none"); }
  function recOf(id){ if(ls("bpp-spn-"+id)==="spn"&&hasSpn()) return "spn"; if(RECS[id]) return ls(recKey(id))==="prabhus"?"pbj":"mtj"; return hasSpn()?"mtj":""; }
  function link(){
    var P=cur(), u=location.origin+location.pathname; if(!P) return u;
    var q=new URLSearchParams(); q.set("p",P.id);
    var t=Math.round(nowT()*10)/10; if(t>0) q.set("t",String(t));
    var r=rateOf(P.id); if(r!==1) q.set("rate",String(r));
    var v=a()?Math.round(a().volume*100):100; if(v!==100) q.set("vol",String(v));
    var rc=recOf(P.id); if(rc) q.set("rec",rc); var rpm=ls("bpp-rep435"); if(rpm&&rpm!=="off") q.set("rep",rpm); /* [Grok-Bot] V4.35 */
    q.set("cols",String(parseInt(ls("bpp-cols")||"1",10)||1));
    if(typeof chMode!=="undefined") q.set("chords",chMode);
    if(typeof showDe!=="undefined") q.set("tr",showDe?"1":"0");
    q.set("src",(typeof ytOn!=="undefined"&&ytOn)?"yt":"mp3");
    return u+"?"+q.toString();
  }
  window.bppShareLink420=link;
  var TX={de:"Link kopiert",en:"Link copied",fr:"Lien copié",es:"Enlace copiado",ru:"Ссылка скопирована",hi:"लिंक कॉपी हो गया",pt:"Link copiado"};
  function toast(s){ var m=document.getElementById("bppToast"); if(!m){ m=document.createElement("div"); m.id="bppToast"; document.body.appendChild(m); }
    m.textContent=s; m.style.display=""; clearTimeout(toast._t); toast._t=setTimeout(function(){ m.style.display="none"; },2500); }
  document.addEventListener("click",function(e){ var b=e.target&&e.target.closest&&e.target.closest("#bppShare"); if(!b) return;
    e.preventDefault(); e.stopImmediatePropagation(); var P=cur()||{}, u=link(); window.bppLastShare=u;
    if(navigator.share){ navigator.share({title:P.titel||"Bhakti Prayers Player",url:u}).catch(function(){}); return; }
    var ok=function(){ toast(TX[(typeof lang!=="undefined"&&TX[lang])?lang:"en"]); };
    if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(u).then(ok,ok); else ok(); },true);

  /* Empfang */
  var q=new URLSearchParams(location.search), pid=q.get("p"); if(!pid) return;
  var rec=(q.get("rec")||"").toLowerCase();
  if(rec==="pbj"||rec==="mtj"||rec==="spn"){
    if(RECS[pid]) ls(recKey(pid), rec==="pbj"?"prabhus":(pid==="guru-stotram"?"frau":"alt"));
    ls("bpp-spn-"+pid, rec==="spn"?"spn":"alt"); }
  var rpq=(q.get("rep")||"").toLowerCase(); if(/^(str|one|list|all|off)$/.test(rpq)) ls("bpp-rep435",rpq); /* [Grok-Bot] V4.35 */
  var c=parseInt(q.get("cols"),10); if(c>=1&&c<=3) ls("bpp-cols",String(c));
  var r=parseFloat(q.get("rate")); if(r>=0.5&&r<=2){ try{ var m=JSON.parse(ls("bpp-rate")||"{}")||{}; if(r===1) delete m[pid]; else m[pid]=r; ls("bpp-rate",JSON.stringify(m)); }catch(e){} }
  var sr=(q.get("src")||"").toLowerCase();
  var t=parseFloat(q.get("t")), vol=parseInt(q.get("vol"),10);
  function hookPlay(){
    if(typeof play!=="function"||typeof PRAYERS==="undefined") return setTimeout(hookPlay,50);
    var orig=play, done=false;
    window.play=function(idx,resume,auto){
      if(!done&&PRAYERS[idx]&&PRAYERS[idx].id===pid){ done=true; window.play=orig;
        if(t>0){ try{ putSong(pid,{time:t,line:0}); }catch(e){} resume=true; }
        var res=orig.call(this,idx,resume,auto);
        try{ if(sr==="yt"||sr==="mp3"){ var P=PRAYERS[idx], want=sr==="yt";
          setTimeout(function(){ try{ if(want!==!!ytOn){ if(want&&P.youtube) showYt(P,t>0?t:(P.youtubeStart||0)); else if(!want&&P.audio) showFile(P); } }catch(e){} },400); } }catch(e){}
        if(r>=0.5&&r<=2){ [300,1500,4000].forEach(function(d){ setTimeout(function(){ try{ window.bppSetRate&&bppSetRate(r); }catch(e){} },d); }); }
        return res; }
      return orig.apply(this,arguments); };
  }
  hookPlay();
  if(vol>=0&&vol<=100){ var n=0, iv=setInterval(function(){ var x=a(); if(x) x.volume=vol/100; if(++n>40) clearInterval(iv); },250); }
})();
