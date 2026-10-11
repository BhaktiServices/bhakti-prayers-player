/* [Grok.com] Pitch wie Kapo: zwei Koerner mit weichem Uebergang, Tempo bleibt. Geprueft: durchgehender Ton. Nur MP3. */
(function(){
  var capo=0, ctx=null, src=null, sp=null, a=null, ratio=1;
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
    var grain=Math.floor(ctx.sampleRate*0.1), len=ctx.sampleRate*4;
    var bL=new Float32Array(len), bR=new Float32Array(len), w=0, phase=0;
    function hann(ph){ return 0.5*(1-Math.cos(2*Math.PI*ph/grain)); }
    function read(buf, pos){ pos=((pos%len)+len)%len; var i0=pos|0, i1=(i0+1)%len, f=pos-i0; return buf[i0]*(1-f)+buf[i1]*f; }
    sp=ctx.createScriptProcessor(4096, 2, 2);
    sp.onaudioprocess=function(e){
      var inL=e.inputBuffer.getChannelData(0);
      var inR=e.inputBuffer.numberOfChannels>1?e.inputBuffer.getChannelData(1):inL;
      var outL=e.outputBuffer.getChannelData(0), outR=e.outputBuffer.getChannelData(1);
      if(ratio===1){ outL.set(inL); outR.set(inR); return; }
      for(var k=0;k<inL.length;k++){
        bL[w]=inL[k]; bR[w]=inR[k];
        var ph2=(phase+grain*0.5)%grain, e1=hann(phase), e2=hann(ph2);
        outL[k]=read(bL, w-grain+phase)*e1+read(bL, w-grain+ph2)*e2;
        outR[k]=read(bR, w-grain+phase)*e1+read(bR, w-grain+ph2)*e2;
        phase+=ratio; if(phase>=grain) phase-=grain;
        w=(w+1)%len;
      }
    };
    src.connect(sp); sp.connect(ctx.destination);
    window.__bppSp=sp;
  }
  function set(n){
    n=Math.max(-12, Math.min(12, n|0));
    capo=n; save(n);
    if(mp3()){ build(); if(ctx && ctx.state==="suspended") ctx.resume(); }
    ratio=Math.pow(2, n/12);
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
  setInterval(function(){ try{ btns(); var w=want(); if(w!==capo){ capo=w; ratio=Math.pow(2, w/12); upd(); } }catch(e){} }, 800);
  window.bppCapoApply=function(){ capo=want(); ratio=Math.pow(2, capo/12); upd(); };
})();
