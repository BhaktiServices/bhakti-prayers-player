/* [Grok.com] Nach Neuladen: angezeigter Gesang und Ton sind derselbe, sonst kein Autoscroll. */
(function(){
  function cur(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined") ? PRAYERS[i] : null; }
  function fileOk(P){
    var a=document.getElementById("a"); if(!a || !P || !P.audio) return false;
    var src=a.currentSrc||a.src||"";
    var name=String(P.audio).split("?")[0].split("/").pop();
    return name && src.indexOf(name)>=0;
  }
  function ytOk(P){
    var y=document.getElementById("yt"); if(!y || !P || !P.youtube) return false;
    return (y.getAttribute("src")||"").indexOf(P.youtube)>=0;
  }
  function match(){
    var P=cur(); if(!P) return;
    if(typeof isPlaying==="function" && !isPlaying()) return; /* [Grok.com] kein Autostart nach dem Laden */
    var yt=typeof ytOn!=="undefined" && ytOn;
    if(yt){ if(!ytOk(P)) showYt(P, (typeof pendingSeek==="number"?pendingSeek:0)||P.youtubeStart||0); return; }
    if(P.audio && !fileOk(P)){
      if(P.preferFile===false && P.youtube) showYt(P, P.youtubeStart||0);
      else showFile(P);
    }
  }
  var n=0, t=setInterval(function(){ n++; try{ match(); }catch(e){} if(n>8) clearInterval(t); }, 700);
})();
