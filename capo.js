/* [Grok.com] Tonhoehe in Halbtonschritten, −12 bis +12, Tempo bleibt. Nur MP3. */
(function(){
  var capo=0, ctx=null, src=null, shifter=null, gain=null, a=null;
  var mem={}; try{ mem=JSON.parse(localStorage.getItem("bpp-capo")||"{}")||{}; }catch(e){ mem={}; }
  function cur(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function mp3(){ return !!(a && a.getAttribute("src") && !(typeof ytOn!=="undefined" && ytOn)); }
  function save(n){ var P=cur(); if(!P) return; if(n) mem[P.id]=n; else delete mem[P.id]; try{ localStorage.setItem("bpp-capo", JSON.stringify(mem)); }catch(e){} }
  function want(){ var P=cur(); var n=P?mem[P.id]:0; n=n|0; return (n>=-12&&n<=12)?n:0; }

  function makeShifter(ac){
    var ratio=1, grain=Math.floor(ac.sampleRate*0.08), buf=new Float32Array(ac.sampleRate*2), w=0, phase=0;
    var sp=ac.createScriptProcessor(2048, 1, 1);
    sp.onaudioprocess=function(e){
      var inn=e.inputBuffer.getChannelData(0), out=e.outputBuffer.getChannelData(0);
      if(ratio===1){ out.set(inn); return; }
      for(var k=0;k<inn.length;k++){
        buf[w]=inn[k];
        var p=w-grain+phase;
        while(p<0) p+=buf.length;
        var i0=p|0, i1=(i0+1)%buf.length, f=p-i0;
        var s=buf[i0]*(1-f)+buf[i1]*f;
        var env=Math.sin(Math.PI*(phase/grain));
        out[k]=s*env + inn[k]*(1-env)*0.15;
        phase+=ratio;
        if(phase>=grain) phase-=grain;
        w=(w+1)%buf.length;
      }
    };
    return { node:sp, set:function(semi){ ratio=Math.pow(2, semi/12); } };
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
    if(!mp3()){ upd(); return; }
    ensure();
    if(ctx && ctx.state==="suspended") ctx.resume();
    save(n); apply();
  }
  function step(d){ var n=Math.max(-12, Math.min(12, capo+(d||0))); set(n); }
  function upd(){
    var d=document.getElementById("btnCapoDown"), u=document.getElementById("btnCapoUp"), lab=document.getElementById("capoLab"), z=document.getElementById("btnCapoZero");
    if(!d) return;
    var on=mp3();
    d.disabled=u.disabled=!on;
    if(z) z.disabled=!on;
    if(lab) lab.textContent=capo?("Ton "+(capo>0?"+":"")+capo):"Ton 0";
  }
  function btns(){
    if(document.getElementById("capoBox")) return;
    var box=document.getElementById("xpBox"); if(!box) return;
    var wrap=document.createElement("span"); wrap.id="capoBox"; wrap.style.cssText="display:flex;gap:4px;align-items:center";
    function b(id, txt, fn, title){ var el=document.createElement("button"); el.type="button"; el.id=id; el.textContent=txt; el.title=title; el.onclick=fn; return el; }
    wrap.appendChild(b("btnCapoDown","−",function(){ step(-1); },"Tonhöhe einen Halbton runter, nur MP3"));
    var lab=document.createElement("span"); lab.id="capoLab"; lab.textContent="Ton 0"; lab.style.cssText="min-width:4.2em;text-align:center;color:#e8c57a;font-size:.85rem";
    wrap.appendChild(lab);
    wrap.appendChild(b("btnCapoUp","+",function(){ step(1); },"Tonhöhe einen Halbton rauf, nur MP3"));
    wrap.appendChild(b("btnCapoZero","0",function(){ set(0); },"Tonhöhe zurück"));
    box.parentNode.insertBefore(wrap, box.nextSibling);
  }
  document.addEventListener("DOMContentLoaded", function(){ btns(); a=document.getElementById("a"); apply(); });
  setInterval(function(){ try{ btns(); if(want()!==capo || (document.getElementById("btnCapoUp")&&document.getElementById("btnCapoUp").disabled===mp3())) apply(); }catch(e){} }, 700);
  window.bppCapoApply=apply;
})();
