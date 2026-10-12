/* [Grok-Bot] V3.04: Akkord-Knopf in beiden An-Modi (ueber Strophe und je Zeile) gold; nur "Aus" Standard. Standardansicht + Grossbild */
window.BPP_BUILD="3.04"; window.BPP_SHOW="3.04";
(function(){
  function fix(){
    var m=(typeof chMode!=="undefined")?chMode:null; if(m===null) return;
    ["btnCh","bppFsCh"].forEach(function(id){ var b=document.getElementById(id); if(!b) return;
      if(m==="zeile"&&!b.classList.contains("on")) b.classList.add("on");
      else if(m==="aus"&&b.classList.contains("on")) b.classList.remove("on"); });
  }
  var mo=new MutationObserver(fix), seen={};
  setInterval(function(){ ["btnCh","bppFsCh"].forEach(function(id){ var b=document.getElementById(id); if(b&&seen[id]!==b){ seen[id]=b; mo.observe(b,{attributes:true,attributeFilter:["class"],childList:true,characterData:true,subtree:true}); } }); fix(); },300);
  document.addEventListener("click",function(){ setTimeout(fix,0); setTimeout(fix,60); },true);
})();
