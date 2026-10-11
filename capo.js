/* [Grok.com] Tonhoehe in Halbtonschritten, −12 bis +12, Tempo bleibt. Nur MP3. */
(function(){
  var capo=0, ctx=null, src=null, shifter=null, gain=null, a=null;
  var mem={}; try{ mem=JSON.parse(localStorage.getItem("bpp-capo")||"{}")||{}; }catch(e){ mem={}; }
  function cur(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function mp3(){ return !!(a && a.getAttribute("src") && !(typeof ytOn!=="undefined" && ytOn)); }
  function save(n){ var P=cur(); if(!P) return; if(n) mem[P.id]=n; else delete mem[P.id]; try{ localStorage.setItem("bpp-capo", JSON.stringify(mem)); }catch(e){} }
  function want(){ var P=cur(); var n=P?mem[P.id]:0; n=n|0; return (n>=-12&&n<=12)?n:0; }

  function makeShifter(ac){
    var ratio=1, grain=Math.floor(ac.sampleRate*0.12), len=ac.sampleRate*4;
    var bL=new Float32Array(len), bR=new Float32Array(len), w=0, phase=0;
    var sp=ac.createScriptProcessor(2048, 2, 2);
    function read(buf, pos){
      while(pos<0) pos+=len; pos%=len;
      var i0=pos|0, i1=(i0+1)%len, f=pos-i0;
      return buf[i0]*(1-f)+buf[i1]*f;
    }
    function hann(ph){ return 0.5*(1-Math.cos(2*Math.PI*ph/grain)); }
    sp.onaudioprocess=function(e){
      var inL=e.inputBuffer.getChannelData(0);
      var inR=e.inputBuffer.numberOfChannels>1?e.inputBuffer.getChannelData(1):inL;
      var outL=e.outputBuffer.getChannelData(0), outR=e.outputBuffer.getChannelData(1);
      if(ratio===1){ outL.set(inL); outR.set(inR); return; }
      for(var k=0;k<inL.length;k++){
        bL[w]=inL[k]; bR[w]=inR[k];
        var ph2=(phase+grain*0.5)%grain;
        var s1L=read(bL, w-grain+phase), s1R=read(bR, w-grain+phase);
        var s2L=read(bL, w-grain+ph2), s2R=read(bR, w-grain+ph2);
        var e1=hann(phase), e2=hann(ph2);
        outL[k]=s1L*e1+s2L*e2; outR[k]=s1R*e1+s2R*e2;
        phase+=ratio; if(phase>=grain) phase-=grain;
        w=(w+1)%len;
      }
    };
    return { node:sp, set:function(semi){ ratio=Math.pow(2, (semi||0)/12); } };
  }
  function ensure(){
    if(ctx) return;
    a=document.getElementById("a"); if(!a) return;
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    ctx=new AC();
    src=ctx.createMediaElementSource(a);
    gain=ctx.createGain();
    shifter=makeShifter(ctx);
    src.connect(shifter.node); shifter.node.connect(gain); gain.connect(ctx.destination);
  }
  function apply(){
    var n=mp3()?want():0;
    capo=n;
    if(n && !ctx) ensure();
    if(ctx && ctx.state==="suspended") ctx.resume();
    if(shifter) shifter.set(n);
    upd();
  }
  function set(n){
    n=Math.max(-12, Math.min(12, n|0));
    capo=n; save(n);
    if(mp3()){ ensure(); if(ctx && ctx.state==="suspended") ctx.resume(); if(shifter) shifter.set(n); }
    upd();
  }
  function step(d){ var n=Math.max(-12, Math.min(12, capo+(d||0))); set(n); }
  function upd(){
    var d=document.getElementById("btnCapoDown"), u=document.getElementById("btnCapoUp"), lab=document.getElementById("capoLab"), z=document.getElementById("btnCapoZero");
    if(!d) return;
    var on=mp3();
    d.disabled=u.disabled=!on;
    if(z) z.disabled=!on;
    var word=(typeof UI!=="undefined" && UI[lang] && UI[lang].pitch)||"Pitch";
    if(lab) lab.textContent=word+" "+(capo>0?"+":"")+capo;
  }
  function btns(){
    if(document.getElementById("capoBox")) return;
    var box=document.getElementById("xpBox"); if(!box) return;
    var wrap=document.createElement("span"); wrap.id="capoBox"; wrap.style.cssText="display:flex;gap:4px;align-items:center";
    function b(id, txt, fn, title){ var el=document.createElement("button"); el.type="button"; el.id=id; el.textContent=txt; el.title=title; el.onclick=fn; return el; }
    wrap.appendChild(b("btnCapoDown","−",function(){ step(-1); },"Pitch −1, nur MP3"));
    var lab=document.createElement("span"); lab.id="capoLab"; lab.textContent="Pitch 0"; lab.style.cssText="min-width:4.2em;text-align:center;color:#e8c57a;font-size:.85rem";
    wrap.appendChild(lab);
    wrap.appendChild(b("btnCapoUp","+",function(){ step(1); },"Pitch +1, nur MP3"));
    wrap.appendChild(b("btnCapoZero","0",function(){ set(0); },"Pitch 0"));
    box.parentNode.insertBefore(wrap, box.nextSibling);
  }
  document.addEventListener("DOMContentLoaded", function(){ btns(); a=document.getElementById("a"); apply(); });
  setInterval(function(){ try{ btns(); if(want()!==capo || (document.getElementById("btnCapoUp")&&document.getElementById("btnCapoUp").disabled===mp3())) apply(); }catch(e){} }, 700);
  window.bppCapoApply=apply;
})();
