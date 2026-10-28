/* [Grok-Bot] V4.40: (1) Taste "Wochentage" steht direkt links neben der Spalten-Taste (1/2/3); sichtbar nur bei Menue+ (Regel aus V4.35 bleibt).
   (2) Panduranga Arati: Strophen nach der gesungenen Reihenfolge der Aufnahme (Wiederholungen als eigene Strophen), Zeitmarken neu gemessen (siehe unten). */
window.BPP_BUILD="4.40"; window.BPP_SHOW="4.40";
(function(){
  function mv(){ if(window.bppL5Order462) return; /* [Grok-Bot] V4.62: Reihenfolge in v462 */ var w=document.getElementById("btnWd435"), c=document.getElementById("btnCols"); if(!w||!c||!c.parentNode) return;
    if(w.nextElementSibling!==c) c.parentNode.insertBefore(w,c); }
  if(document.body) mv(); document.addEventListener("DOMContentLoaded",mv); setInterval(function(){ try{ mv(); }catch(e){} },300);
})();
/* Panduranga Arati: Gesungene Reihenfolge der Aufnahme (audio/panduranga-arati.mp3, Telegram "BM Prayers – Waves of Love"):
   Refrain 2x, dann je Strophe: Zeilen 1–2, Wdh., Zeilen 3–4, Wdh. + "jai dev jai dev", danach Refrain 2x; am Ende Refrain + schneller Schluss-Refrain.
   Nur vorhandener Text, umgegliedert/wiederholt. Zeitmarken: Chroma-Abgleich (Vorlage Refrain 11,6–26,4 s, Zeilenpaare 40,0–49,7 / 59,5–69,2 s)
   mit Spracherkennung als Gegenprobe (z. B. Str. 4 "aghaṭita" ab ~252 s, Schluss "jai dev ... pāṇḍuraṅgā" ab ~290 s). */
(function(){
  if(typeof PRAYERS==="undefined") return;
  var P=PRAYERS.find(function(p){ return p.id==="panduranga-arati"; }); if(!P||P.v440) return;
  var Z=P.zeilen; if(!Z||Z.length!==26) return;
  function c(n,g,key,keep){ var o={}; for(var k in Z[n]) if(Object.prototype.hasOwnProperty.call(Z[n],k)) o[k]=Z[n][k];
    if(!keep) o.sa=String(o.sa).replace(/\s*:\/\/\s*$/,""); o.g440=g; o.k440=key; return o; }
  var N=[], g=0;
  function grp(lines,key,keep){ lines.forEach(function(n){ N.push(c(n,g,key,keep)); }); g++; }
  grp([0,1,2],"R"); grp([0,1,2],"R·");
  [[3,8],[8,13],[13,18],[18,23]].forEach(function(s,k){ var b=s[0], st=String(k+1);
    grp([b,b+1],st); grp([b,b+1],st); grp([b+2,b+3],st); grp([b+2,b+3,b+4],st);
    grp([0,1,2],"R"); grp([0,1,2],"R·"); });
  N.splice(N.length-6,6); g-=2;
  grp([23,24,25],"R·E",true); grp([23,24,25],"R·E·");
  P.zeilen=N; P.v440=1;
  P.marksFile=[11.6,26.4,40.0,49.8,59.5,69.2,82.1,96.8,110.3,120.0,129.6,139.2,152.1,166.7,180.4,190.2,200.0,209.7,222.6,237.1,250.5,260.1,269.7,279.3,290.1,316.0];
  function hook(){ var b=window.stanzaGroups; if(typeof b!=="function"||b._v440) return;
    window.stanzaGroups=function(Q){ if(Q&&Q.v440){ var gs=[],cur=null; Q.zeilen.forEach(function(z,n){ if(!cur||cur.g!==z.g440){ cur={key:z.k440,start:n,idx:[],g:z.g440}; gs.push(cur); } cur.idx.push(n); }); return gs; }
      return b.apply(this,arguments); };
    window.stanzaGroups._v440=1; try{ stanzaGroups=window.stanzaGroups; }catch(e){} }
  hook(); document.addEventListener("DOMContentLoaded",hook); setInterval(hook,500);
})();
