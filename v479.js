/* [Grok-Bot] V4.79: Vor/Zurück – Lyrics des neuen Gebets sicher nachladen.
   Nach play()/bppPrayerNav: bei Prayer-Wechsel Lyrics-Box leeren und paintLyrics
   mehrfach nachziehen (0/50/200/600 ms), damit Mtj-Getter/async-Hooks nicht
   die alte Strophe stehen lassen. Groß-Flash: siehe v183 holdUntil nach Seek. */
(function(){
  if(window.bppV479) return; window.bppV479=1;
  var lastId=null;
  function pid(){ try{ return (typeof i==="number"&&i>=0&&PRAYERS[i])?PRAYERS[i].id:null; }catch(e){ return null; } }
  function forceLyrics(){
    try{
      var id=pid(), box=document.getElementById("lyrics");
      if(!box) return;
      if(id && id!==lastId){ box.innerHTML=""; lastId=id; }
      if(typeof paintLyrics==="function") paintLyrics();
      if(typeof layoutLyrics==="function") layoutLyrics();
      if(typeof applyUI==="function") applyUI();
    }catch(e){}
  }
  function afterNav(){ forceLyrics(); [50,200,600].forEach(function(t){ setTimeout(forceLyrics, t); }); }
  function wrapPlay(){
    var f=window.play; if(typeof f!=="function"||f.__v479) return;
    var w=function(idx, resume, auto){ var r=f.apply(this, arguments); afterNav(); return r; };
    w.__v479=1; window.play=w;
  }
  function wrapNav(){
    var nv=window.bppPrayerNav; if(!nv||nv.__v479) return;
    ["next","prev"].forEach(function(k){
      var o=nv[k]; if(typeof o!=="function") return;
      nv[k]=function(){ var r=o.apply(this, arguments); afterNav(); return r; };
    });
    nv.__v479=1;
  }
  function wrapStep(){
    ["nextSong","prevSong","stepSong"].forEach(function(n){
      var f=window[n]; if(typeof f!=="function"||f.__v479) return;
      var w=function(){ var r=f.apply(this, arguments); afterNav(); return r; };
      w.__v479=1; window[n]=w;
    });
  }
  wrapPlay(); wrapNav(); wrapStep();
  document.addEventListener("DOMContentLoaded", function(){ wrapPlay(); wrapNav(); wrapStep(); });
  setInterval(function(){ wrapPlay(); wrapNav(); wrapStep(); }, 2000);
})();
