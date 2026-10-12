/* [Grok-Bot] V2.53: Prayer-Liste platzsparend als drei Auswahlmenues (Morgens / Abends / Weitere), nebeneinander, auf schmalen Handys umbrechend.
   Die bisherige Liste (#list) bleibt unsichtbar im Hintergrund bestehen: Auswahl klickt den passenden Listeneintrag (Start wie bisher),
   Tagesauswahl, "Alle", Vor/Zurueck/Wiederholen bleiben unveraendert. Das gerade gewaehlte Gebet steht gold im passenden Menue,
   die anderen Menues zeigen ihren Titel. Pro Menue jedes Gebet nur einmal. */
window.BPP_BUILD="2.53"; window.BPP_SHOW="2.53";
(function(){
  var LAB={de:["Morgens","Abends","Weitere"],en:["Morning","Evening","More"],fr:["Matin","Soir","Autres"],es:["Mañana","Tarde","Más"],ru:["Утро","Вечер","Ещё"],hi:["प्रातः","सायं","अन्य"]};
  var ICO=["\u2600\uFE0E","\u263E\uFE0E","\u22EF"];
  var st=document.createElement("style");
  st.textContent="#list.v253{display:none!important}"+
    "#bppSel{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 10px}"+
    "#bppSel select{flex:1 1 180px;min-width:0;max-width:100%;appearance:none;-webkit-appearance:none;background:#2a211a url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23c9a36a' stroke-width='1.6'/%3E%3C/svg%3E\") no-repeat right 10px center;"+
    "color:#f3eee2;border:1px solid #6b5a44;border-radius:9px;padding:8px 30px 8px 11px;font:inherit;font-size:.95rem;cursor:pointer;text-overflow:ellipsis}"+
    "#bppSel select.cur{border-color:#e0b45a;color:#e0b45a;box-shadow:0 0 0 1px #e0b45a inset;font-weight:600}"+
    "#bppSel select:focus{outline:2px solid #e0b45a;outline-offset:1px}#bppSel option{background:#1a1410;color:#f3eee2}#bppSel option:disabled{color:#7d7366}"+
    "@media(max-width:430px){#bppSel select{flex:1 1 46%}}";
  document.head.appendChild(st);
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return LAB[l]?l:"en"; }
  function curI(){ return (typeof i!=="undefined")?i:-1; }
  var box=null, sig="";
  function title(el){ var t=""; Array.prototype.forEach.call(el.childNodes,function(n){ if(n.nodeType===3) t+=n.nodeValue; }); return t.trim()||el.textContent.trim(); }
  function groups(L){
    var gs=[], g=null;
    Array.prototype.forEach.call(L.children, function(el){
      if(el.classList.contains("grp")){ g={head:el.textContent.trim(), items:[]}; gs.push(g); return; }
      if(!el.classList.contains("item") || el.classList.contains("bpp-hide")) return;
      if(!g){ g={head:"", items:[]}; gs.push(g); }
      var di=el.getAttribute("data-i"), t=title(el);
      if(g.items.some(function(x){ return di!==null ? x.i===di : x.t===t; })) return; /* keine Doppelten im selben Menue */
      g.items.push({el:el, i:di, t:t, miss:el.classList.contains("miss")||el.tagName!=="BUTTON"});
    });
    return gs.filter(function(x){ return x.items.length; });
  }
  function build(){
    var L=document.getElementById("list"); if(!L) return;
    var gs=groups(L), ln=lg();
    var s=ln+"|"+gs.map(function(g){ return g.head+":"+g.items.map(function(x){ return x.i+x.t+x.miss; }).join(","); }).join("/");
    if(!box){ box=document.createElement("div"); box.id="bppSel"; }
    if(box.parentNode!==L.parentNode || box.nextSibling!==L) L.parentNode.insertBefore(box, L);
    if(!L.classList.contains("v253")) L.classList.add("v253");
    if(s===sig){ mark(); return; } sig=s;
    box.innerHTML="";
    gs.forEach(function(g,k){
      var three=gs.length===3, name=three?LAB[ln][k]:(g.head.split(" · ")[0]||g.head);
      var se=document.createElement("select"); se.setAttribute("aria-label", name); se.title=g.head;
      var o0=document.createElement("option"); o0.value=""; o0.textContent=(three?ICO[k]+"  ":"")+name; o0.className="ph"; se.appendChild(o0);
      g.items.forEach(function(x,n){ var o=document.createElement("option"); o.value=String(n); o.textContent=x.t; if(x.i!==null) o.setAttribute("data-i", x.i); if(x.miss){ o.disabled=true; } se.appendChild(o); });
      se.onchange=function(){ var x=g.items[+se.value]; if(x && !x.miss){ try{ x.el.click(); }catch(e){} } setTimeout(mark, 50); setTimeout(mark, 600); };
      se._g=g; box.appendChild(se);
    });
    mark();
  }
  function mark(){
    if(!box) return; var ci=String(curI()), first=true;
    Array.prototype.forEach.call(box.querySelectorAll("select"), function(se){
      var n=-1; se._g.items.forEach(function(x,k){ if(x.i===ci) n=k; });
      var on=n>=0 && first && curI()>=0; if(on) first=false; /* Gebet in mehreren Menues: nur das erste gold */
      var v=on?String(n):""; if(se.value!==v) se.value=v; se.classList.toggle("cur", on);
    });
  }
  function boot(){
    build();
    var L=document.getElementById("list"); if(L && !L.__v253){ L.__v253=1; new MutationObserver(function(){ build(); }).observe(L,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]}); }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.addEventListener("load", boot);
  setInterval(function(){ try{ build(); }catch(e){} }, 800);
})();
