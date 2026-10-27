/* [Grok-Bot] V3.36: Grossbild, Modus "Akkorde je Zeile": beim Hochgleiten lagen Akkorde der naechsten Strophe ueber der letzten Zeile der aktuellen.
   Ursache: v195 misst die Vorschau-Box (#bppNx195, vertikal zentriert) direkt nach dem Befuellen; erst danach setzt v250 (MutationObserver)
   die Akkorde je Zeile ein -> Box waechst, ihre Oberkante rutscht um die halbe Zusatzhoehe hoch, der berechnete Abstand stimmt nicht mehr.
   Fix: dieselbe Umwandlung wie v250 sofort beim Befuellen (vor dem Messen).
   Zweitens: in der ausgleitenden alten Strophe (.bppGhost) hatten die Akkorde je Zeile keine Schriftgroesse (volle Textgroesse, ueber der neuen Strophe) -> .42em und gelb wie im Grossbild. */
window.BPP_BUILD="3.38"; window.BPP_SHOW="3.38";
(function(){
  function mode(){ return typeof chMode!=="undefined"?chMode:"aus"; }
  function norm(s){ return String(s).replace(/\s+/g," ").trim(); }
  function map(){
    var P=(typeof i!=="undefined" && i>=0)?PRAYERS[i]:null, m={}; if(!P||!P.zeilen) return m;
    P.zeilen.forEach(function(z){ var lc=(function(z){ try{ return window.bppLC442?bppLC442(z):z.lineCh; }catch(e){ return z.lineCh; } })(z); /* [Grok-Bot] V4.42 */ if(!lc) return; var raw=String(z.sa||"").split("\n"); if(lc.length!==raw.length) return;
      raw.forEach(function(s,k){ var t=norm(s); if(t && m[t]===undefined) m[t]=lc[k]||""; }); });
    return m;
  }
  function sh(c){ try{ return typeof shiftChordLine==="function"?shiftChordLine(c, steps):c; }catch(e){ return c; } }
  /* [Grok-Bot] V4.42: Zeilentext ohne Akkord-Spans von v365 (.k361). Hatte v365 die Zeile schon belegt (Wettlauf der MutationObserver),
     fand die Umwandlung den Text nicht mehr -> ganze Strophen-Akkordzeile blieb ueber Zeile 1 (Hanuman: D C G D in Zeile 1, Rest ohne Farbe). */
  function txt(g){ if(!g.querySelector(".k361")) return norm(g.textContent); var c=g.cloneNode(true); Array.prototype.forEach.call(c.querySelectorAll(".k361"),function(k){ k.remove(); }); return norm(c.textContent); }
  function clean(g){ if(g.querySelector(".k361")){ g.textContent=txt(g); g.classList.remove("c361"); try{ g.__k361=null; }catch(e){} } }
  function fix(bx){
    if(mode()!=="zeile") return;
    var kids=Array.prototype.slice.call(bx.children), m=map(), j=0;
    while(j<kids.length){
      var el=kids[j];
      if(el.classList.contains("fch") && el.classList.contains("vl") && !el.classList.contains("v250")){
        var grp=[], q=j+1; while(q<kids.length && kids[q].classList.contains("vl") && !kids[q].classList.contains("fch")){ grp.push(kids[q]); q++; }
        var cs338=window.bppV338Ch?bppV338Ch(grp.map(function(g){ return txt(g); }), bx):null; /* V3.38 je Strophe */
        if(grp.length && (cs338 || grp.every(function(g){ return m[txt(g)]!==undefined; }))){
          el.parentNode.removeChild(el); grp.forEach(clean);
          grp.forEach(function(g,gi){ var c=cs338?cs338[gi]:m[txt(g)]; if(!c) return; var d=document.createElement("div"); d.className="fch vl v250"; d.textContent=sh(c); g.parentNode.insertBefore(d,g); });
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
