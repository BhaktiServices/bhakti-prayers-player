/* [Grok-Bot] V4.44: Sargam (Sa Re Ga) fuer "The Govinda Prayer", Aufnahme "Rec: Mtj" (audio/govinda.mp3) - gemessen, nicht aus einem Heft.
   Messung: Gesang mit Demucs freigestellt, Tonhoehe mit pYIN (librosa, 10 ms), 70-ms-Median, Sa = D (D4, Stimmung -2,5 Cent).
   Ton = Halbton-Abschnitt >= 0,12 s; "?" = unsicher (Abweichung > 30 Cent, schwankend, schwache Stimmhaftigkeit, < 0,15 s oder leiterfremd in D-Dur).
   Punkt davor = tiefe Oktave (.Ni = C#4, .Dha = B3), ' dahinter = hohe Oktave. Kleinbuchstaben = komal (re, ga, dha, ni).
   Zeilen: Str. 1 und Schluss nach den Phrasen der Aufnahme; Str. 2-28 im Raster der Strophenmarken (v441.js, ca. 25,7 s je Strophe = 3 Verszeilen + Refrain 2x,
   5 Zeilen a ca. 5,1 s), jede Grenze auf die tiefste Pegel-Senke +-1 s gelegt (Whisper erkennt hier keinen Text). Refrain: Tonfolge des ersten Durchgangs. Str. 28: Grenze Vers/Refrain auf Pegel-Senke 728,0 s (Refrain dort nur 1x).
   Knopf "Sa Re Ga": nur bei Menue+ und nur beim Govinda Prayer, Standard aus, gold = an (localStorage "bpp-sargam444").
   Rec: Pbj oder YouTube (andere Aufnahmen, nicht gemessen): statt Toenen Hinweis "Sargam nur fuer Mtj gemessen". */
window.BPP_BUILD="4.44"; window.BPP_SHOW="4.44";
(function(){
  if(window.bppV444) return; window.bppV444=1;
  var K="bpp-sargam444", ID="govinda";
  var SG=[["Sa? Sa? Re Sa? Re Sa Re"],["Re Re Sa Re Sa? Re Sa"],["Sa Re Sa Sa Re? Sa Re"],["Re Sa? Re Sa Re Ma Sa"],["Sa Ga Sa Re Sa? Re Sa? .Dha Sa .Dha Sa"],["Sa Re? Sa Re Re? Sa? Re Ga? Sa","Re? Re Re Sa?","Sa? Re Sa? Re Sa? Sa? Re Ga Re? Sa"],["ga? Re Sa Sa? Re Sa? Sa .Dha? Sa"],["Sa Sa? re? Sa Re Sa? Re Sa? Re Ga? Re? Sa","Sa? Sa Re re? Re Sa Re Sa Re Ga Re? Sa","Sa Re Sa? Re Sa Re Re Sa"],["ga? Re Sa? Re Sa? Re .Dha .Ni? Sa? .dha? Sa"],["Sa Sa Re Re Re? Sa Re Ga Re Sa","Sa Re? Sa Re re? Ga Re .Ni? Sa","Ga? Re Re Re Re? Ga .Ni? Sa"],["Ga? Sa re? Sa Re Sa .Dha Sa"],["Sa Re Sa? .Ni? Sa Re Sa? Re re? Re? Sa","Re .Ni? Re Sa Re Sa? Re Ga Re Sa","Sa? Ga? Re Sa? Sa? Re Sa Re? Sa? Re Ga? Sa"],["Ga? Re Sa Re? Re .Dha Sa .Dha? Sa"],["Sa Re Sa? Re? Sa Re Sa Re Ga ga? Sa","Sa? Re Re Re Re Re Sa","Sa? Re Sa? Re Re? Sa"],["Ma? Ga Re Sa Re? Re? .Ni? Sa .Dha Sa"],["Sa Sa Re Re? Sa? Re? Re Ga Re Sa","Sa? Sa? Re Re? Re Ga Re Sa","Re Sa Re Re Ga Re .Ni? Sa"],["Ga? Re Sa? Re? Re .Dha? Sa .Dha Sa .Dha Sa?"],["Re Re Re Re Ga Re .Ni? Sa","Sa? Sa? Re .Ni? Re Sa Re Ga? Re Sa","Ga? Re Sa Re Re .Ni? Re Re ga? .Ni? Sa"],["Ga Re Sa Re? Re .Dha Sa? .Dha Sa"],["Re Re Sa Re Sa? Re Ga? Re Sa","Re Sa re? Re Sa? Re Sa Re Ga? Re? Sa","Re? Sa Re Sa Re Sa? Re Ga? re? Re? Sa"],["Re? Ga Re Sa Sa Re Sa? .Dha? Sa? .Dha Sa"],["Sa Sa Re Sa? Sa Re .Ni? Re? Sa Re Ga Re .Ni Sa","Sa Re Re Ga Re Sa","Ga Re? .Ni? Sa Re .Ni? Re? Sa Re Ga Re? .Ni? Sa"],["Sa Ga Re Sa Re? Re .Dha? Sa .Dha re? Sa"],["Sa? Sa Re Sa Re Sa? Re Sa Re Ga Re? .Ni? Sa","Sa? Re Sa Re? Re Re .Ni Sa","Sa Re Sa Re? Sa? Re Re Sa"],["Ga Re Sa Re? Re Sa .Dha Sa"],[".Ni? Re Sa? Sa? Re Sa Re Ga Re? Sa","Sa Sa Re Re Sa Re Ga? Re Sa","Re Sa Re Sa Re Re Sa? Re Ga? Re .Ni Sa"],["Ga Re Sa Re? Re Sa .Dha? Sa"],["Sa Sa? Re Re Re Sa? Re Ga Re Sa","Sa Re Re Re Sa? Re Re? Sa","Sa Re? Re Sa Re? Sa Re? Ga Re .Ni? Sa"],["Re Sa Re? Re? .Dha Sa .Dha? Sa"],["Re Sa Re Sa? Re? Re Ga? Sa?","Sa Sa Sa? Re? Re .Ni Sa","Re? Sa? Re Sa? Re? Re Ga Re .Ni? Sa"],["Ga Re Sa? Re? .Dha Sa .Dha Sa"],["Sa Sa Re Sa? Re Sa Re Sa Re Ga? Re? Sa","Sa Re Sa? Re Re Ga? .Ni Sa","Sa Ga? Sa Re Sa Re Sa? Re Ga? Sa"],["ga? Re Sa Sa Re .Dha Sa .Dha? Sa"],["Sa ga? Re Sa Re Re Sa Re Ga? Re .ni? Sa","Sa Sa? Re Re Sa Sa","Re Sa Re Sa Re Sa? Re Ga Re? Sa"],["Ga? Re Sa re? Sa Re .Dha Sa .Dha Sa"],["Sa Sa Re Re Re Sa? Re Ga Re? Sa",".Ni? Sa Re Re Sa Re Re Ga Re Sa","Sa Re Sa Re? Sa? Re Ga? Re .Ni? Sa"],["Ga Re Sa Sa Re .Dha? Sa .Dha Sa"],["Sa Re Sa Re? Sa? Re Re Ga? Re Sa","Sa Sa? Re Re Sa? Re? Ga? Re Sa","Sa? re? Sa? Re Sa? Sa Re Ga? Re Sa"],["Ga? Re Sa re? Sa? Re Sa? .Dha Sa .Dha Sa"],["Sa? Re Re Sa? Re Ga Re Sa Re","Sa? Sa Re .Ni? re? Re? .Ni? Re Ga? Re? Sa","Re Re Sa Re? Sa Re Ga Re? Sa"],["ga? Re Sa Sa Re Sa? .Dha Sa .Dha Sa"],["Sa Sa? Re Sa Re Sa Re Sa Re Ga Re Sa","Sa Re Sa Re Sa Re Ga? Re? .Ni? Sa?","Sa Sa Re Sa Re Sa Re Ga? Re Sa"],["Re? Sa Sa Re .Dha Sa .Dha Sa"],["Sa Re .Ni? Sa Re? Sa? Re Re Ga Re .Ni? Sa?",".Ni? Sa Re Re Sa Re Ga? Re? Sa","Re Sa Re Sa Sa Re Ga? Sa"],["Sa? ga? Re Sa? re? Sa Re? .Dha? Sa .Dha Sa"],["Sa Re Sa Re? Sa Sa Re Re Sa","Sa Re Sa Re? Sa? Re Re Ga? Re Sa","Sa Re Sa? Re re? Ga? Re .Ni? Sa"],["Sa? ga? Re Sa Sa Re .Dha Sa .Dha Sa"],["Sa .Ni? Re Sa? Re .Ni? Re Sa Re ga? Re Sa","Sa Sa re? Re Sa? Re .Ni? Re Ga? Re Sa","re? Re? Re Sa Re .Ni? re? Ga Re Sa"],["Ga? Re Sa Sa? Re Sa? .Dha? Sa .Dha Sa"],["Sa Re Re Sa Re Re Ga? Re Sa","Sa Re Sa? Re? Re Sa? Re Re Ga Sa","Re Sa Re Sa Re Sa? Re Ga Re Sa"],["Re Sa Sa Re .Dha Sa .Dha Sa"],["Sa? Re Sa? Re re? Re? Re Sa Re Ga? Re Sa","Sa Re Sa Re? Sa Re Sa? Re Ga? Re Sa","Sa? Re Sa Re Sa Re? Sa? Re Ga? Re Sa"],["Sa Re Sa Sa? Re .Dha Sa .Dha Sa"],["Sa? .Ni? Sa Re Re? Re Sa? Re Sa Re Ga? Re Sa",".Ni? re? Sa? Re? Sa? re? Re Sa Re Ga Re Sa","Ga? Sa Re .Ni? Re Re Ga Re Sa"],["Ga? Re Sa Sa Re .Dha Sa .Dha Sa"],[".Ni? Re Sa? Re Sa? Re .Ni Re? ga? Re .Ni? Sa",".Ni? Sa Sa .Ni? Re? Sa Re Ga Re? Sa","re? Sa re? Re? .Ni? Re? Re Ga Re Sa"],[".Ni? Re Sa re? Sa Re .Dha? Sa .Dha Sa"],["Sa Re? Re re? Sa Re Ga? Sa","Sa Re? Re Re? Ga Re .Ni? Sa",".Ni? Re? Re? Sa Re Ga ga? Re Sa"],["Sa? Re? Sa Sa Re .Dha Sa .Dha .dha? Sa"],["Re? Sa? Re Sa? Re? Re"],["Re Re Sa Re Ma Sa Re Sa"],["Sa Re Sa Re? Sa? Re Sa Re"],["Sa Re .Ni? Re Ma Sa? Re Sa"],["Ga Sa Sa Re Sa? .Dha? Sa .Dha Sa"]];
  var TX={de:["Sargam (Sa Re Ga) je Zeile einblenden","Sargam ausblenden","Sargam: gemessen (von Grok ergänzt), Sa = D · ? = unsicher · Punkt davor = tiefe Oktave","Sargam nur für Mtj gemessen"],
    en:["Show sargam (Sa Re Ga) for each line","Hide sargam","Sargam: measured (added by Grok), Sa = D · ? = uncertain · leading dot = lower octave","Sargam measured for Mtj only"],
    fr:["Afficher le sargam (Sa Re Ga) par ligne","Masquer le sargam","Sargam : mesuré (ajouté par Grok), Sa = D · ? = incertain · point devant = octave grave","Sargam mesuré uniquement pour Mtj"],
    es:["Mostrar el sargam (Sa Re Ga) por línea","Ocultar el sargam","Sargam: medido (añadido por Grok), Sa = D · ? = dudoso · punto delante = octava grave","Sargam medido solo para Mtj"],
    ru:["Показать саргам (Sa Re Ga) для каждой строки","Скрыть саргам","Саргам: измерено (добавлено Grok), Sa = D · ? = неточно · точка впереди = нижняя октава","Саргам измерен только для Mtj"],
    hi:["हर पंक्ति का सरगम (Sa Re Ga) दिखाएँ","सरगम छिपाएँ","सरगम: मापा गया (Grok द्वारा जोड़ा गया), Sa = D · ? = अनिश्चित · आगे बिंदु = मंद्र सप्तक","सरगम केवल Mtj के लिए मापा गया"],
    pt:["Mostrar o sargam (Sa Re Ga) por linha","Ocultar o sargam","Sargam: medido (adicionado pelo Grok), Sa = D · ? = incerto · ponto antes = oitava grave","Sargam medido apenas para Mtj"],
    cz:["Zobrazit sargam (Sa Re Ga) u každého řádku","Skrýt sargam","Sargam: změřeno (doplnil Grok), Sa = D · ? = nejisté · tečka před = nižší oktáva","Sargam změřen jen pro Mtj"]};
  function tx(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return TX[l]||TX.en; }
  function on(){ try{ return localStorage.getItem(K)==="1"; }catch(e){ return false; } }
  function cur(){ try{ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }catch(e){ return null; } }
  function isG(){ var P=cur(); return !!(P&&P.id===ID); }
  function mtj(){ var pb=false; try{ pb=localStorage.getItem("bpp-prabhus-govinda")==="prabhus"; }catch(e){} var yt=false; try{ yt=(typeof ytOn!=="undefined"&&!!ytOn); }catch(e){} return !pb&&!yt; }
  function norm(s){ return String(s||"").replace(/\s*2x\s*$/i,"").replace(/[\s\u00a0]+/g," ").trim(); }
  var st=document.createElement("style");
  st.textContent="body:not(.menu-full) .sg444b,body:not(.sg444g) .sg444b{display:none!important}"+
    ".sg444b.gold{background:#d4a017!important;color:#000!important;border-color:#b8860b!important}"+
    ".sg444{display:block;font-size:.74em;line-height:1.35;opacity:.82;letter-spacing:.02em;font-weight:500;color:inherit;margin:.05em 0 .25em;white-space:normal;font-style:normal;font-family:inherit}"+
    ".sg444n{display:block;font-size:.72em;opacity:.75;font-style:italic;margin:0 0 .5em;color:inherit}"+
    "#bppFsBox .sg444{font-size:.5em;margin:0 0 .2em}#bppFsBox .sg444n{font-size:.44em;margin:0 0 .3em}";
  document.head.appendChild(st);
  function mkBtn(id, ref, after){ var b=document.getElementById(id); if(b&&document.body.contains(b)) return b; if(!ref) return null;
    b=document.createElement("button"); b.type="button"; b.id=id; b.className=(id==="btnSg444"?ref.className.replace(/\b(on|gold|act358|s358)\b/g,""):"")+" sg444b"; b.textContent="Sa Re Ga";
    b.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); try{ localStorage.setItem(K,on()?"0":"1"); }catch(x){} paint(); });
    ref.parentNode.insertBefore(b, after?ref.nextSibling:ref); return b; }
  function btnState(b){ if(!b) return; var o=on(), x=tx(); b.classList.toggle("gold",o); b.setAttribute("aria-pressed",o?"true":"false"); var tt=(o?x[1]:x[0])+" · Grok"; if(b.title!==tt) b.title=tt; if(b.textContent!=="Sa Re Ga") b.textContent="Sa Re Ga"; }
  function clear(root){ if(!root) return; Array.prototype.forEach.call(root.querySelectorAll(".sg444,.sg444n"),function(e){ e.parentNode.removeChild(e); }); }
  function note(root, before, txt){ var n=root.querySelector(".sg444n"); if(n&&n.textContent===txt) return false; if(n) n.parentNode.removeChild(n); n=document.createElement("span"); n.className="sg444n"; n.textContent=txt; if(before) before.parentNode.insertBefore(n,before); else root.insertBefore(n,root.firstChild); return true; }
  function addAfter(el, s){ var nx=el.nextElementSibling; if(nx&&nx.classList.contains("sg444")){ if(nx.textContent!==s) nx.textContent=s; return false; }
    var d=document.createElement(el.tagName==="DIV"?"div":"span"); d.className="sg444"; d.textContent=s; el.parentNode.insertBefore(d,el.nextSibling); return true; }
  function std(show, ok){ var L=document.getElementById("lyrics"); if(!L) return; if(!show){ clear(L); return; }
    var rows=L.querySelectorAll(".rowline[data-n]"), first=rows[0]; if(!first) return;
    note(L.contains(first)?first.parentNode:L, first, ok?tx()[2]:tx()[3]);
    Array.prototype.forEach.call(rows,function(r){ var n=+r.getAttribute("data-n"), z=SG[n]; var lns=r.querySelectorAll(".ln");
      if(!ok||!z||!z.length){ Array.prototype.forEach.call(r.querySelectorAll(".sg444"),function(e){ e.parentNode.removeChild(e); }); return; }
      Array.prototype.forEach.call(lns,function(ln,j){ var s=z[Math.min(j,z.length-1)]; if(lns.length===z.length||j<z.length) addAfter(ln,s); }); }); }
  /* Grossansicht: Zeilen per Text und Gruppe (Anzeige "n/29") zuordnen */
  var IDX=null;
  function idx(){ if(IDX) return IDX; var P=cur(); if(!P) return null; IDX={}; P.zeilen.forEach(function(z,n){ String(z.sa||"").split("\n").map(function(s){ return norm(s); }).filter(Boolean).forEach(function(s,j){ (IDX[s]=IDX[s]||[]).push([n,j]); }); }); return IDX; }
  function grp(){ var t=document.getElementById("bppFs"); if(!t) return -1; var m=null; Array.prototype.some.call(t.querySelectorAll("div,span"),function(e){ if(e.children.length) return false; var mm=/·\s*(\d+)\/(\d+)/.exec(e.textContent||""); if(mm){ m=mm; return true; } return false; }); return m?(+m[1]-1):-1; }
  function blockOf(n){ return n<=4?0:(n>=59?28:1+Math.floor((n-5)/2)); }
  function fs(show, ok){ var B=document.getElementById("bppFsBox"); if(!B||!B.offsetParent){ return; } if(!show){ if(B.querySelector(".sg444,.sg444n")){ clear(B); } return; }
    var ch=false, X=idx(), g=grp(); if(!X) return;
    var vls=B.querySelectorAll(".vl:not(.fch)"); if(!vls.length) return;
    ch=note(B, B.firstChild, ok?tx()[2]:tx()[3])||ch;
    if(ok) Array.prototype.forEach.call(vls,function(v){ var c=X[norm(v.textContent)]; if(!c) return; var hit=c.filter(function(p){ return blockOf(p[0])===g; })[0]||c[0]; var z=SG[hit[0]]; if(!z||!z.length) return; ch=addAfter(v, z[Math.min(hit[1],z.length-1)])||ch; });
    if(ch){ var stg=document.getElementById("bppFsStage"); if(stg){ for(var it=0; it<12 && (B.scrollHeight>stg.clientHeight+1 || B.scrollWidth>stg.clientWidth+1); it++){ var f=parseFloat(B.style.fontSize)||0; if(!f) break; B.style.fontSize=(f*0.93).toFixed(1)+"px";
      Array.prototype.forEach.call(B.querySelectorAll(".ftr,.fch"),function(e){ var q=parseFloat(e.style.fontSize); if(q) e.style.fontSize=(q*0.93).toFixed(1)+"px"; }); } } } }
  var lastP=null;
  function paint(){ var P=cur(); if(P!==lastP){ lastP=P; IDX=null; }
    var g=isG(); document.body.classList.toggle("sg444g",g);
    var bc=document.getElementById("btnCh"); btnState(mkBtn("btnSg444", bc, true));
    var fc=document.getElementById("bppFsCh"); btnState(mkBtn("bppFsSg444", fc, true));
    var show=g&&on(), ok=mtj();
    /* Anzeige folgt dem Knopf (an/aus); der Knopf selbst ist nur bei Menue+ sichtbar */
    std(show, ok); fs(show, ok); }
  setInterval(function(){ try{ paint(); }catch(e){} },400); document.addEventListener("DOMContentLoaded",paint); window.addEventListener("load",paint);
  window.bppSargam444=SG;
})();
