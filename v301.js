/* [Grok-Bot] V3.01 Layout Standardansicht neu geordnet (nur DOM verschoben, IDs erhalten) */
window.BPP_BUILD="3.01"; window.BPP_SHOW="3.01";
(function(){
  var css="#bppL1{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:6px 12px 2px}"+
  "#bppL1 #bppSel{position:static!important;margin:0!important;flex:1 1 auto;display:flex;flex-wrap:wrap;gap:6px}"+
  "#bppL1 .daybar{display:flex;gap:4px;margin:0}#bppL1 .lang{margin:0}"+
  "#bppL2{margin:4px 12px 2px!important}"+
  ".bar .r301{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:4px 0}"+
  ".bar>.row.e301{display:none!important}.bar #now{display:none!important}"+
  ".bar .r301>#btnRep,.bar .r301>#selRate,.bar .r301 #btnBack10,.bar .r301 #btnFwd10,.bar .r301>#bppSrc195,.bar .r301 #btnSrcYt,.bar .r301 #btnSrcMp3,.bar .r301>#btnDe,.bar .r301>#xpBox,.bar .r301 #xpBox>*,.bar .r301>#capoBox,.bar .r301 #capoBox>*{display:inline-flex!important}"+
  ".bar .r301>*{order:0!important}#bppL1>*{order:0!important}.bar .r301 #xpBox,.bar .r301 #capoBox{align-items:center;gap:3px}"+
  ".bar #a{display:block;width:100%;margin:2px 0}"+
  "#bppL6{display:none;flex-wrap:wrap;align-items:center;gap:6px;padding:4px 12px}body.menu-full #bppL6{display:flex}"+
  "#bppL6>*{display:inline-flex!important;margin:0!important}#bppL6 #foot{display:block!important;font-size:.8rem;color:var(--muted)}"+
  "@media(max-width:600px){.bar .r301{gap:4px}.bar .r301 button,.bar .r301 select{padding:4px 7px;font-size:.85rem}#bppL1 #bppSel{flex:1 1 100%;flex-wrap:nowrap;gap:4px}#bppL1 #bppSel>select{flex:1 1 0!important;min-width:0!important;max-width:none!important;width:33%!important;font-size:.85rem;padding-left:6px;padding-right:4px}}";
  var st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
  function $(i){return document.getElementById(i);}
  function mv(p,ids){ids.forEach(function(i){var e=typeof i=="string"?$(i):i; if(e) p.appendChild(e);});}
  function build(){
    var bar=document.querySelector(".bar"), row=bar&&bar.querySelector(".row"), sel=$("bppSel"), tt=$("lyrTitle");
    if(!bar||!row||!sel||!tt){return false;}
    if($("bppL1")) return true;
    var stage=$("stage"), par=bar.parentNode;
    var l1=document.createElement("div"); l1.id="bppL1";
    par.insertBefore(l1,bar);
    mv(l1,[sel, $("list"), document.querySelector(".listbar .daybar"), row.querySelector(".lang")]);
    tt.classList.add("l301"); tt.id="lyrTitle"; par.insertBefore(tt,bar); tt.setAttribute("data-l","2"); tt.style.margin=""; tt.id="lyrTitle";
    var r3=document.createElement("div"); r3.className="r301"; r3.id="bppL3";
    var r5=document.createElement("div"); r5.className="r301"; r5.id="bppL5";
    bar.insertBefore(r3,row);
    mv(r3,["btnPPrev","btnPlay","btnPNext","btnRep","btnPrev","btnNext",row.querySelector(".bppJmp"),"selRate","bppSrc195","btnSrc189"]);
    var au=$("a"); if(au) bar.insertBefore(au,row);
    bar.insertBefore(r5,row);
    mv(r5,["btnAuto","btnFs","btnScDown","scLab","btnScUp","btnDe","btnCh","xpBox","capoBox","btnMenu"]);
    mv(r5,[].slice.call(row.children)); /* Rest (z.B. Grok.com-Zusaetze) */
    row.classList.add("e301");
    var l6=document.createElement("div"); l6.id="bppL6";
    par.insertBefore(l6, stage||bar.nextSibling);
    mv(l6,["btnDet","btnOffAll","foot","legend"]);
    return true;
  }
  var n=0,t=setInterval(function(){ if(build()||++n>60) clearInterval(t); },150);
  /* Spaeter angehaengte Buttons in der alten Zeile nachziehen */
  setInterval(function(){var r=document.querySelector(".bar>.row.e301"),r5=$("bppL5"); if(r&&r5&&r.children.length) [].slice.call(r.children).forEach(function(c){r5.insertBefore(c,$("btnMenu"));});},1000);
})();
