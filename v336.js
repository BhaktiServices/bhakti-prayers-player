/* [Grok-Bot] V3.36: Grossbild, Modus "Akkorde je Zeile": beim Hochgleiten lagen Akkorde der naechsten Strophe ueber der letzten Zeile der aktuellen.
   Ursache: v195 misst die Vorschau-Box (#bppNx195, vertikal zentriert) direkt nach dem Befuellen; erst danach setzt v250 (MutationObserver)
   die Akkorde je Zeile ein -> Box waechst, ihre Oberkante rutscht um die halbe Zusatzhoehe hoch, der berechnete Abstand stimmt nicht mehr.
   Fix: dieselbe Umwandlung wie v250 sofort beim Befuellen (vor dem Messen).
   Zweitens: in der ausgleitenden alten Strophe (.bppGhost) hatten die Akkorde je Zeile keine Schriftgroesse (volle Textgroesse, ueber der neuen Strophe) -> .42em und gelb wie im Grossbild. */
window.BPP_BUILD="3.37"; window.BPP_SHOW="3.37";
(function(){
  function mode(){ return typeof chMode!=="undefined"?chMode:"aus"; }
  function norm(s){ return String(s).replace(/\s+/g," ").trim(); }
  function map(){
    var P=(typeof i!=="undefined" && i>=0)?PRAYERS[i]:null, m={}; if(!P||!P.zeilen) return m;
    P.zeilen.forEach(function(z){ if(!z.lineCh) return; var raw=String(z.sa||"").split("\n"); if(z.lineCh.length!==raw.length) return;
      raw.forEach(function(s,k){ var t=norm(s); if(t && m[t]===undefined) m[t]=z.lineCh[k]||""; }); });
    return m;
  }
  function sh(c){ try{ return typeof shiftChordLine==="function"?shiftChordLine(c, steps):c; }catch(e){ return c; } }
  function fix(bx){
    if(mode()!=="zeile") return;
    var kids=Array.prototype.slice.call(bx.children), m=map(), j=0;
    while(j<kids.length){
      var el=kids[j];
      if(el.classList.contains("fch") && el.classList.contains("vl") && !el.classList.contains("v250")){
        var grp=[], q=j+1; while(q<kids.length && kids[q].classList.contains("vl") && !kids[q].classList.contains("fch")){ grp.push(kids[q]); q++; }
        if(grp.length && grp.every(function(g){ return m[norm(g.textContent)]!==undefined; })){
          el.parentNode.removeChild(el);
          grp.forEach(function(g){ var c=m[norm(g.textContent)]; if(!c) return; var d=document.createElement("div"); d.className="fch vl v250"; d.textContent=sh(c); g.parentNode.insertBefore(d,g); });
        }
        j=q; continue;
      }
      j++;
    }
  }
  function hook(){
    var n=document.querySelector("#bppNx195 .nbox"); if(!n || n.__v336) return; n.__v336=1;
    var o=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");
    Object.defineProperty(n,"innerHTML",{configurable:true,get:function(){ return o.get.call(this); },
      set:function(v){ o.set.call(this,v); try{ fix(this); }catch(e){} }});
  }
  var css=document.createElement("style");
  css.textContent=".bppGhost .fch:not([style*='font-size']){font-size:.42em;color:#f0d24a}";
  document.head.appendChild(css);
  hook(); setInterval(hook,500);
})();
