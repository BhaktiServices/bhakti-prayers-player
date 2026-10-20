/* [Grok-Bot] V3.62: Neustart/Neuladen - letztes Prayer UND Position wiederherstellen (pausiert, kein Autoplay), Strophe dazu anzeigen.
   Ursache: resumeLast() laedt das Prayer ohne Tonquelle (kein Autostart) -> pendingSeek wurde nie ausgefuehrt, beim ersten Speichern stand dann 0. */
(function(){
  var m={}; try{ m=JSON.parse(window.bppBootMem||"{}")||{}; }catch(e){}
  var id=m.lastId, st=(m.songs&&id&&m.songs[id])||{}, t=+st.time||0, done=false, t0=Date.now();
  window.bppV362={id:id,t:t};
  if(!id||t<3) return;
  function P(){ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i]:null; }
  function stanza(){ try{ var p=P(), gs=stanzaGroups(p), k=stanzaFromProgress(songProgress()); if(k!=null&&gs[k]){ line=gs[k].start; persistNow(); paintLyrics(); setTimeout(function(){ try{ pinStanza(); }catch(e){} },60); } }catch(e){} }
  var iv=setInterval(function(){
    if(done||Date.now()-t0>20000){ clearInterval(iv); return; }
    var p=P(); if(!p||p.id!==id) { if(p&&Date.now()-t0>4000) clearInterval(iv); return; }
    if(typeof ytOn!=="undefined"&&ytOn){ done=true; return; } /* YouTube: eigene Startzeit (pendingSeek) */
    if(!a.src){ try{ pendingSeek=t; if(p.audio&&typeof showFile==="function"){ showFile(p); setTimeout(function(){ try{ a.pause(); }catch(e){} },0); } }catch(e){} return; }
    if(a.readyState<1){ if(!a.__l362){ a.__l362=1; try{ a.preload="auto"; a.load(); }catch(e){} } return; }
    if(!isFinite(a.duration)) return;
    if(t>a.duration-4){ done=true; return; }
    if(Math.abs(a.currentTime-t)>1.5){ try{ a.currentTime=t; }catch(e){} return; }
    if(!a.paused&&Date.now()-t0<3000){ try{ a.pause(); }catch(e){} }
    done=true; stanza(); try{ if(typeof syncPlayBtn==="function") syncPlayBtn(); }catch(e){}
  },250);
})();
