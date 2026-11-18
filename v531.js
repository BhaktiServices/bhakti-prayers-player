/* [Grok-Bot] V5.31: Nur eine BPP-Instanz spielt gleichzeitig, in allen Tabs,
   Fenstern und der installierten App desselben Browsers (gleiche Herkunft).
   BroadcastChannel("bpp-player"), als Fallback das storage-Ereignis von
   localStorage. Jede Instanz hat eine Zufalls-ID. Beim play-Ereignis
   (Knopf, Leertaste/P, Media Session, Groß, Auto-Weiter, 1-Prayer-Loop,
   YouTube) sendet sie {type:"playing",id}. Alle anderen pausieren Audio
   und YouTube und setzen den Play-Knopf auf Pause/Silber.
   Beim Start: ping/pong; wenn eine andere Instanz antwortet, kurzer Hinweis
   „BPP läuft schon in einem anderen Fenster“, nach wenigen Sekunden aus.
   V5.29 (Mitsingen bleibt) und V5.30 (Hold-Lösung beim Loop) bleiben unberührt.
   Ein anderer Browser (z. B. Chrome neben Edge) ist nicht sichtbar. */
window.BPP_BUILD="5.31"; window.BPP_SHOW="5.31";
(function(){
  if(window.bppV531) return; window.bppV531=1;

  var CH="bpp-player", LS="bpp-player-bus";
  var myId=(Date.now().toString(36)+Math.random().toString(36).slice(2,10));
  var pausing=0, seenPeer=false, hintDone=false, hintTimer=0, bc=null, bootAt=Date.now();
  var peers={};

  var TX={
    de:"BPP läuft schon in einem anderen Fenster",
    en:"BPP is already running in another window",
    fr:"BPP est déjà ouvert dans une autre fenêtre",
    es:"BPP ya está abierto en otra ventana",
    ru:"BPP уже открыт в другом окне",
    hi:"BPP पहले से दूसरे विंडो में चल रहा है",
    pt:"O BPP já está aberto noutra janela",
    cz:"BPP už běží v jiném okně"
  };

  function now(){ return Date.now(); }
  function langKey(){
    try{ if(typeof lang!=="undefined" && TX[lang]) return lang; }catch(e){}
    return "en";
  }

  function post(type){
    var msg={type:type, id:myId, t:now()};
    try{ if(bc) bc.postMessage(msg); }catch(e){}
    try{ localStorage.setItem(LS, JSON.stringify(msg)); }catch(e){}
  }

  function onMsg(msg){
    if(!msg || typeof msg!=="object") return;
    if(msg.id===myId) return;
    if(typeof msg.t==="number" && now()-msg.t>8000) return;
    if(msg.id) peers[msg.id]=now();
    if(msg.type==="ping"){ post("pong"); }
    else if(msg.type==="pong" || msg.type==="hello"){ markPeer(); }
    else if(msg.type==="playing"){ if(now()-bootAt<4000) markPeer(); pauseLocal(); }
  }

  function markPeer(){
    seenPeer=true;
    if(!hintDone && now()-bootAt<4000) showHint();
  }

  function pauseLocal(){
    pausing=now();
    try{
      var list=document.querySelectorAll("audio");
      for(var k=0;k<list.length;k++){
        try{ if(!list[k].paused) list[k].pause(); }catch(e){}
      }
    }catch(e){}
    try{
      if(typeof ytOn!=="undefined" && ytOn){
        try{ if(typeof ytCmd==="function") ytCmd("pauseVideo"); }catch(e){}
        try{ ytPlaying=false; }catch(e){}
      }
    }catch(e){}
    try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
    function paint(){
      try{ if(typeof syncPlayBtn==="function") syncPlayBtn(); }catch(e){}
      try{ if(typeof window.bppSync528==="function") window.bppSync528(); }catch(e){}
    }
    paint();
    setTimeout(paint, 80);
    setTimeout(paint, 300);
    setTimeout(function(){ if(now()-pausing>=250) pausing=0; }, 280);
  }

  function onPlay(e){
    if(pausing && now()-pausing<400) return;
    var t=e&&e.target;
    if(t && t.tagName && t.tagName!=="AUDIO" && t.tagName!=="VIDEO") return;
    post("playing");
  }

  function showHint(){
    if(hintDone) return;
    hintDone=true;
    try{
      var st=document.getElementById("bppSolo531css");
      if(!st){
        st=document.createElement("style");
        st.id="bppSolo531css";
        st.textContent="#bppSolo531{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:200;max-width:90vw;background:rgba(22,18,14,.94);color:#f0d6a8;border:1px solid #d6bf90;border-radius:10px;padding:7px 14px;font:13px system-ui,sans-serif;letter-spacing:.01em;pointer-events:none;opacity:0;transition:opacity .35s ease;text-align:center}"+
          "#bppSolo531.on{opacity:1}";
        document.head.appendChild(st);
      }
      var m=document.getElementById("bppSolo531");
      if(!m){
        m=document.createElement("div");
        m.id="bppSolo531";
        m.setAttribute("role","status");
        document.body.appendChild(m);
      }
      m.textContent=TX[langKey()]||TX.en;
      m.classList.add("on");
      clearTimeout(hintTimer);
      hintTimer=setTimeout(function(){ try{ m.classList.remove("on"); }catch(e){} }, 4000);
    }catch(e){}
  }

  try{ bc=new BroadcastChannel(CH); bc.onmessage=function(ev){ onMsg(ev&&ev.data); }; }catch(e){ bc=null; }
  window.addEventListener("storage", function(ev){
    if(!ev || ev.key!==LS || !ev.newValue) return;
    try{ onMsg(JSON.parse(ev.newValue)); }catch(e){}
  });
  document.addEventListener("play", onPlay, true);

  try{
    var y=window.ytCmd;
    if(typeof y==="function" && !y.__v531){
      var w=function(fn){
        var r=y.apply(this, arguments);
        if(fn==="playVideo" && !(pausing && now()-pausing<400)) post("playing");
        return r;
      };
      w.__v531=1;
      window.ytCmd=w;
    }
  }catch(e){}

  window.addEventListener("message", function(e){
    if(pausing && now()-pausing<400) return;
    try{
      var d=e.data; if(typeof d==="string") d=JSON.parse(d);
      if(d && d.event==="onStateChange" && d.info===1) post("playing");
    }catch(x){}
  });

  function boot(){
    post("ping");
    setTimeout(function(){ if(seenPeer) showHint(); }, 700);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.bppSoloId531=myId;
  window.bppSoloSeen531=function(){ return !!seenPeer; };
  window.bppSoloHint531=function(){ return hintDone; };
  window.bppSoloPeers531=function(){ return Object.keys(peers); };
})();
