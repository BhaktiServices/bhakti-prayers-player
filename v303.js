/* [Grok-Bot] V3.03: "Herkunft, Quellen" am Ende der Lyrics; Tipp blendet Quellenbereich ein (Default aus), aus nach 10 s oder beim Hochscrollen */
window.BPP_BUILD="3.03"; window.BPP_SHOW="3.03";
(function(){
  var T={de:["Herkunft","Ton","Hinweis"],en:["Source","Audio","Note"],fr:["Source","Audio","Remarque"],es:["Fuente","Audio","Nota"],ru:["Источник","Аудио","Примечание"],hi:["स्रोत","ऑडियो","टिप्पणी"]};
  function L(){var l=(typeof lang!=="undefined"&&lang)||"en";return T[l]?l:"en";}
  var st=document.createElement("style");
  st.textContent="#bppSrcEnd{margin:14px 12px 24px;display:flex;flex-direction:column;align-items:flex-start;gap:8px}"+
  "#bppSrcEnd #btnDet{display:inline-flex!important}#bppSrcInfo{display:none;font-size:.85rem;color:var(--muted);line-height:1.45;border-left:2px solid #6b5338;padding:4px 10px}"+
  "body.show-det #bppSrcInfo{display:block}#bppSrcInfo b{color:#e0b45a;font-weight:600}#bppSrcEnd #hint{display:none!important}";
  document.head.appendChild(st);
  function esc(s){return String(s==null?"":s).replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
  function fill(){
    var box=document.getElementById("bppSrcInfo"); if(!box) return;
    var P=(typeof PRAYERS!=="undefined"&&typeof i!=="undefined"&&i>=0)?PRAYERS[i]:null, t=T[L()], h=[];
    if(P){
      var q=[P.autor,P.quelle].filter(Boolean).join(" · "); if(q) h.push("<b>"+t[0]+":</b> "+esc(q));
      var au=document.getElementById("a"), yt=document.getElementById("ytBox"), src="";
      if(yt&&yt.offsetParent) src="YouTube"; else if(au&&au.currentSrc){ try{ src=decodeURIComponent(au.currentSrc.split("?")[0].split("/").pop()); }catch(e){ src=au.currentSrc; } src="MP3 · "+src; }
      if(src) h.push("<b>"+t[1]+":</b> "+esc(src));
      var hn=(L()==="en"?(P.hinweisEn||P.hinweis):(P.hinweisDe||P.hinweis))||"";
      if(hn) h.push("<b>"+t[2]+":</b> "+esc(hn));
    }
    var f=document.getElementById("foot"); if(f&&f.textContent.trim()) h.push(esc(f.textContent.trim()));
    box.innerHTML=h.join("<br>");
  }
  var timer=null, lastY=0;
  function on(){return document.body.classList.contains("show-det");}
  function off(){ var b=document.getElementById("btnDet"); if(on()&&b) b.click(); }
  function arm(){ clearTimeout(timer); if(on()){ fill(); timer=setTimeout(off,10000); } }
  function build(){
    var b=document.getElementById("btnDet"), stage=document.getElementById("stage"), l6=document.getElementById("bppL6");
    if(!b||!stage||!l6) return false;
    var h=document.getElementById("hint"); if(h&&h.parentNode===null) return false;
    var w=document.createElement("div"); w.id="bppSrcEnd";
    var inf=document.createElement("div"); inf.id="bppSrcInfo";
    stage.parentNode.insertBefore(w, stage.nextSibling);
    w.appendChild(b); w.appendChild(inf); if(h) w.appendChild(h);
    b.addEventListener("click",function(){ setTimeout(function(){ arm(); if(on()) inf.scrollIntoView({block:"nearest",behavior:"smooth"}); },0); });
    lastY=scrollY;
    addEventListener("scroll",function(){ var y=scrollY; if(on()&&y<lastY-4){ var r=w.getBoundingClientRect(); if(r.top>innerHeight-20) off(); } lastY=y; },{passive:true});
    if(on()) off();
    return true;
  }
  var n=0,t=setInterval(function(){ if(build()||++n>80) clearInterval(t); },200);
  setInterval(function(){ if(on()) fill(); },2000);
})();
