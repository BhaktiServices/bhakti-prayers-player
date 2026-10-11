/* [Grok.com] Pitch wie Kapo oder Harmonium: SoundTouch hebt die Tonhoehe, Tempo bleibt. Nur MP3. */
(function(){
  var capo=0, ctx=null, gain=null, a=null, shifter=null, buf=null, bufUrl="", loading=false, lastSync=0;
  var mem={}; try{ mem=JSON.parse(localStorage.getItem("bpp-capo")||"{}")||{}; }catch(e){ mem={}; }
  function cur(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function mp3(){ return !!(a && a.getAttribute("src") && !(typeof ytOn!=="undefined" && ytOn)); }
  function save(n){ var P=cur(); if(!P) return; if(n) mem[P.id]=n; else delete mem[P.id]; try{ localStorage.setItem("bpp-capo", JSON.stringify(mem)); }catch(e){} }
  function want(){ var P=cur(); var n=P?mem[P.id]:0; n=n|0; return (n>=-12&&n<=12)?n:0; }
  function word(){ return (typeof UI!=="undefined" && UI[lang] && UI[lang].pitch)||"Pitch"; }

  function ensureCtx(){
    if(ctx) return;
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    ctx=new AC(); gain=ctx.createGain(); gain.connect(ctx.destination);
  }
  function stopShift(){
    if(shifter){ try{ shifter.disconnect(); }catch(e){} shifter=null; }
    if(a) a.volume=1;
  }
  function startShift(){
    if(!buf || !ctx || !capo) return;
    stopShift();
    if(ctx.state==="suspended") ctx.resume();
    shifter=new window.PitchShifter(ctx, buf, 4096);
    shifter.tempo=1; shifter.pitchSemitones=capo;
    var pos=a && isFinite(a.currentTime)?a.currentTime:0;
    shifter.percentagePlayed=Math.max(0, Math.min(99, pos/(buf.duration||1)*100));
    shifter.connect(gain);
    if(a) a.volume=0;
    lastSync=Date.now();
  }
  function loadBuf(cb){
    var url=a && (a.currentSrc||a.src); if(!url){ cb&&cb(); return; }
    if(buf && bufUrl===url){ cb&&cb(); return; }
    if(loading) return; loading=true; bufUrl=url;
    fetch(url).then(function(r){ return r.arrayBuffer(); }).then(function(ab){
      ensureCtx();
      return ctx.decodeAudioData(ab);
    }).then(function(b){ buf=b; loading=false; cb&&cb(); }).catch(function(){ loading=false; });
  }
  function applyShift(){
    if(!mp3() || !capo){ stopShift(); return; }
    ensureCtx();
    loadBuf(function(){ if(capo && mp3()) startShift(); });
  }
  function set(n){
    n=Math.max(-12, Math.min(12, n|0));
    capo=n; save(n); upd();
    if(!n){ stopShift(); return; }
    applyShift();
  }
  function step(d){ set(capo+(d||0)); }
  function upd(){
    var d=document.getElementById("btnCapoDown"), u=document.getElementById("btnCapoUp"), lab=document.getElementById("capoLab"), z=document.getElementById("btnCapoZero");
    if(!d) return;
    var on=mp3();
    d.disabled=u.disabled=!on; if(z) z.disabled=!on;
    if(lab) lab.textContent=word()+" "+(capo>0?"+":"")+capo;
  }
  function btns(){
    if(document.getElementById("capoBox")) return;
    var box=document.getElementById("xpBox"); if(!box) return;
    var wrap=document.createElement("span"); wrap.id="capoBox"; wrap.style.cssText="display:flex;gap:4px;align-items:center";
    function b(id, txt, fn, title){ var el=document.createElement("button"); el.type="button"; el.id=id; el.textContent=txt; el.title=title; el.onclick=fn; return el; }
    wrap.appendChild(b("btnCapoDown","−",function(){ step(-1); },"Pitch −1, MP3"));
    var lab=document.createElement("span"); lab.id="capoLab"; lab.textContent="Pitch 0"; lab.style.cssText="min-width:5em;text-align:center;color:#e8c57a;font-size:.85rem";
    wrap.appendChild(lab);
    wrap.appendChild(b("btnCapoUp","+",function(){ step(1); },"Pitch +1, MP3"));
    wrap.appendChild(b("btnCapoZero","0",function(){ set(0); },"Pitch 0"));
    box.parentNode.insertBefore(wrap, box.nextSibling);
  }
  function tick(){
    try{ btns(); }catch(e){}
    var w=want();
    if(w!==capo){ capo=w; if(w) applyShift(); else stopShift(); upd(); }
    if(!capo || !shifter || !a || a.paused) return;
    if(Date.now()-lastSync<1500) return;
    var played=shifter.timePlayed||0, at=a.currentTime||0;
    if(Math.abs(played-at)>0.6){ startShift(); }
    lastSync=Date.now();
  }
  document.addEventListener("DOMContentLoaded", function(){ btns(); a=document.getElementById("a"); if(a){ a.addEventListener("play", function(){ if(capo) applyShift(); }); a.addEventListener("pause", function(){ if(shifter){ try{ shifter.disconnect(); }catch(e){} } }); } });
  setInterval(tick, 700);
  window.bppCapoApply=function(){ capo=want(); upd(); if(capo) applyShift(); else stopShift(); };
})();
