/* [Grok.com] Pitch wie Kapo: zwei Delay-Linien, Tonhoehe in Halbtoenen, Tempo bleibt. Nur MP3. */
(function(){
  var capo=0, ctx=null, src=null, a=null, input=null, output=null, delay1=null, delay2=null, mix1=null, mix2=null, fade=null, fadeInv=null, osc=null, depth=null, bypass=null;
  var mem={}; try{ mem=JSON.parse(localStorage.getItem("bpp-capo")||"{}")||{}; }catch(e){ mem={}; }
  function cur(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function mp3(){ return !!(a && a.getAttribute("src") && !(typeof ytOn!=="undefined" && ytOn)); }
  function save(n){ var P=cur(); if(!P) return; if(n) mem[P.id]=n; else delete mem[P.id]; try{ localStorage.setItem("bpp-capo", JSON.stringify(mem)); }catch(e){} }
  function want(){ var P=cur(); var n=P?mem[P.id]:0; n=n|0; return (n>=-12&&n<=12)?n:0; }
  function word(){ return (typeof UI!=="undefined" && UI[lang] && UI[lang].pitch)||"Pitch"; }

  function build(){
    if(ctx) return;
    a=document.getElementById("a"); if(!a) return;
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    ctx=new AC();
    src=ctx.createMediaElementSource(a);
    input=ctx.createGain(); output=ctx.createGain(); bypass=ctx.createGain();
    delay1=ctx.createDelay(1); delay2=ctx.createDelay(1);
    mix1=ctx.createGain(); mix2=ctx.createGain();
    fade=ctx.createGain(); fadeInv=ctx.createGain();
    osc=ctx.createOscillator(); depth=ctx.createGain();
    var bufT=0.09;
    delay1.delayTime.value=bufT; delay2.delayTime.value=bufT;
    osc.type="sawtooth"; osc.frequency.value=0;
    depth.gain.value=0;
    osc.connect(depth); depth.connect(delay1.delayTime);
    var inv=ctx.createGain(); inv.gain.value=-1; depth.connect(inv); inv.connect(delay2.delayTime);
    /* crossfade follows the same saw, offset so one is loud when the other jumps */
    var fadeOsc=ctx.createOscillator(); fadeOsc.type="sawtooth"; fadeOsc.frequency.value=0;
    var fg=ctx.createGain(); fg.gain.value=0.5;
    fadeOsc.connect(fg); fg.connect(mix1.gain);
    var fg2=ctx.createGain(); fg2.gain.value=-0.5; fg.connect(fg2); fg2.connect(mix2.gain);
    mix1.gain.value=0.5; mix2.gain.value=0.5;
    src.connect(input);
    input.connect(delay1); input.connect(delay2);
    delay1.connect(mix1); delay2.connect(mix2);
    mix1.connect(output); mix2.connect(output);
    input.connect(bypass); bypass.connect(output);
    output.connect(ctx.destination);
    osc.start(); fadeOsc.start();
    window.__bppFadeOsc=fadeOsc; window.__bppFg=fg;
    setRoute(0);
  }
  function setRoute(n){
    if(!ctx) return;
    var ratio=Math.pow(2, n/12);
    var bufT=0.09;
    if(!n){
      bypass.gain.value=1; mix1.gain.value=0; mix2.gain.value=0;
      osc.frequency.value=0; depth.gain.value=0;
      if(window.__bppFadeOsc) window.__bppFadeOsc.frequency.value=0;
      return;
    }
    bypass.gain.value=0;
    var rate=Math.abs(1-ratio)/bufT;
    osc.frequency.value=rate;
    depth.gain.value=(ratio>1?1:-1)*bufT*0.5;
    delay1.delayTime.value=bufT*0.75; delay2.delayTime.value=bufT*0.25;
    if(window.__bppFadeOsc){ window.__bppFadeOsc.frequency.value=rate; }
    mix1.gain.value=0.5; mix2.gain.value=0.5;
  }
  function set(n){
    n=Math.max(-12, Math.min(12, n|0));
    capo=n; save(n);
    if(n && mp3()){ build(); if(ctx.state==="suspended") ctx.resume(); }
    if(ctx) setRoute(n);
    upd();
  }
  function step(d){ set(capo+(d||0)); }
  function upd(){
    var d=document.getElementById("btnCapoDown"), u=document.getElementById("btnCapoUp"), lab=document.getElementById("capoLab"), z=document.getElementById("btnCapoZero");
    if(!d) return;
    var on=mp3(); d.disabled=u.disabled=!on; if(z) z.disabled=!on;
    if(lab) lab.textContent=word()+" "+(capo>0?"+":"")+capo;
  }
  function btns(){
    if(document.getElementById("capoBox")) return;
    var box=document.getElementById("xpBox"); if(!box) return;
    var wrap=document.createElement("span"); wrap.id="capoBox"; wrap.style.cssText="display:flex;gap:4px;align-items:center";
    function b(id, txt, fn, title){ var el=document.createElement("button"); el.type="button"; el.id=id; el.textContent=txt; el.title=title; el.onclick=fn; return el; }
    wrap.appendChild(b("btnCapoDown","−",function(){ step(-1); },"Pitch −1"));
    var lab=document.createElement("span"); lab.id="capoLab"; lab.textContent="Pitch 0"; lab.style.cssText="min-width:5em;text-align:center;color:#e8c57a;font-size:.85rem";
    wrap.appendChild(lab);
    wrap.appendChild(b("btnCapoUp","+",function(){ step(1); },"Pitch +1"));
    wrap.appendChild(b("btnCapoZero","0",function(){ set(0); },"Pitch 0"));
    box.parentNode.insertBefore(wrap, box.nextSibling);
  }
  document.addEventListener("DOMContentLoaded", function(){ btns(); a=document.getElementById("a"); });
  setInterval(function(){ try{ btns(); var w=want(); if(w!==capo){ capo=w; if(ctx) setRoute(w); upd(); } }catch(e){} }, 800);
  window.bppCapoApply=function(){ capo=want(); upd(); if(ctx) setRoute(capo); };
  window.__bppSetRoute=setRoute; window.__bppBuild=build;
})();
