/* [Grok-Bot] V3.89: Der Menueeintrag Final Prayers (CD-Aufnahme) wird ersetzt durch "Viṣṇu Bhagavān Āratī mit Final Prayers"
   (gleiche Menuestelle, id final-prayers). Ton: audio/final-prayers-sunday.mp3 (Sunday Prayers, YouTube WpcqK0Y7YjE 2:14:20 bis Ende).
   Text: Str. 1–12 = vorhandener Text vishnu-arati (Prathana S. 22 / S. 28 / S. 38, inkl. Chākar-Teil Giridhārī Lāla),
   Str. 13–22 = vorhandene Final Prayers (v324, SVD-Heft V0424K). Nichts neu gedichtet. V3.88-Umschalttaste entfaellt (v388.js nicht mehr geladen).
   Zeitmarken per Spracherkennung, ungefaehr (Str. 11/12 geschaetzt). */
window.BPP_BUILD="3.89"; window.BPP_SHOW="3.89";
(function(){
  if(window.bppV389) return; window.bppV389=1;
  var ID="final-prayers", F="audio/final-prayers-sunday2.mp3" /* [Grok-Bot] V3.91 gekuerzt */;
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F;
  var T=[0,17,35,53,77,99,117,139,154,185,207,225,259,281,294,302,309,317,343,367,379,395]; /* [Grok-Bot] V3.91: MP3 vorne 11,0 s gekuerzt, Marken -11 s, Str. 18 auf Beginn "prem se bolo" */
  var SEQ=T.map(function(t,k){ return [k?t:0,k]; }), SEQYT=SEQ.map(function(e){ return [e[0]+8071,e[1]]; });
  var TI={de:"Viṣṇu Bhagavān Āratī mit Final Prayers",en:"Viṣṇu Bhagavān Āratī with Final Prayers",fr:"Viṣṇu Bhagavān Āratī avec Final Prayers",
    es:"Viṣṇu Bhagavān Āratī con Final Prayers",ru:"Вишну Бхагаван Арати с Final Prayers",hi:"विष्णु भगवान आरती और Final Prayers",pt:"Viṣṇu Bhagavān Āratī com Final Prayers"};
  var H={
"de":"<b>Viṣṇu Bhagavān Āratī mit Final Prayers:</b> ersetzt im Menü die alten Final Prayers (CD). Aufnahme aus den Sunday Prayers (YouTube, ab 2:14:20 bis zum Ende): zuerst die Viṣṇu-Āratī „Oṁ Jaya Jagadīśa Hare“ mit „Chākar rākho jī Giridhārī Lāla“, dann Tvam eva mātā bis zu den Glorifications. Das Mitlesen ist gemessen und kann etwas abweichen. Läuft auch offline. <i>(von Grok ergänzt)</i>",
"en":"<b>Viṣṇu Bhagavān Āratī with Final Prayers:</b> replaces the old Final Prayers (CD) in the menu. Recording from the Sunday Prayers (YouTube, from 2:14:20 to the end): first the Viṣṇu Āratī “Oṁ Jaya Jagadīśa Hare” with “Chākar rākho jī Giridhārī Lāla”, then Tvam eva mātā up to the Glorifications. Follow-along is measured and may be slightly off. Also works offline. <i>(added by Grok)</i>",
"fr":"<b>Viṣṇu Bhagavān Āratī avec Final Prayers :</b> remplace dans le menu les anciennes Final Prayers (CD). Enregistrement des Sunday Prayers (YouTube, de 2:14:20 jusqu’à la fin) : d’abord la Viṣṇu Āratī « Oṁ Jaya Jagadīśa Hare » avec « Chākar rākho jī Giridhārī Lāla », puis Tvam eva mātā jusqu’aux Glorifications. Le suivi de lecture est mesuré et peut être légèrement décalé. Fonctionne aussi hors ligne. <i>(ajouté par Grok)</i>",
"es":"<b>Viṣṇu Bhagavān Āratī con Final Prayers:</b> sustituye en el menú a las antiguas Final Prayers (CD). Grabación de las Sunday Prayers (YouTube, de 2:14:20 hasta el final): primero la Viṣṇu Āratī «Oṁ Jaya Jagadīśa Hare» con «Chākar rākho jī Giridhārī Lāla», luego Tvam eva mātā hasta las Glorifications. El seguimiento está medido y puede desviarse un poco. Funciona también sin conexión. <i>(añadido por Grok)</i>",
"ru":"<b>Вишну Бхагаван Арати с Final Prayers:</b> заменяет в меню старые Final Prayers (CD). Запись из Sunday Prayers (YouTube, с 2:14:20 до конца): сначала Вишну Арати «Oṁ Jaya Jagadīśa Hare» с «Chākar rākho jī Giridhārī Lāla», затем Tvam eva mātā до Glorifications. Метки для чтения измерены и могут немного отличаться. Работает и офлайн. <i>(добавлено Grok)</i>",
"hi":"<b>विष्णु भगवान आरती और Final Prayers:</b> मेनू में पुरानी Final Prayers (CD) की जगह। रिकॉर्डिंग Sunday Prayers से (YouTube, 2:14:20 से अंत तक): पहले विष्णु आरती “Oṁ Jaya Jagadīśa Hare” और “Chākar rākho jī Giridhārī Lāla”, फिर Tvam eva mātā से Glorifications तक। साथ पढ़ने के चिह्न मापे गए हैं, थोड़ा हट सकते हैं। ऑफ़लाइन भी चलता है। <i>(Grok द्वारा जोड़ा गया)</i>",
"pt":"<b>Viṣṇu Bhagavān Āratī com Final Prayers:</b> substitui no menu as antigas Final Prayers (CD). Gravação das Sunday Prayers (YouTube, de 2:14:20 até ao fim): primeiro a Viṣṇu Āratī “Oṁ Jaya Jagadīśa Hare” com “Chākar rākho jī Giridhārī Lāla”, depois Tvam eva mātā até às Glorifications. O acompanhamento é medido e pode desviar um pouco. Funciona também offline. <i>(acrescentado por Grok)</i>"};
  function lg(){ return (typeof lang!=="undefined"&&H[lang])?lang:"en"; }
  function cp(z){ var c={}; for(var k in z) c[k]=Array.isArray(z[k])?z[k].slice():z[k]; return c; }
  var hooked=null, ZZ=null;
  function hook(){
    if(typeof PRAYERS==="undefined") return null;
    var P=PRAYERS.find(function(p){ return p.id===ID; }), A=PRAYERS.find(function(p){ return p.id==="vishnu-arati"; });
    if(!P||!A||!P._v324) return null;
    if(hooked===P) return P;
    var fin=P.zeilen.map(cp); fin.forEach(function(z){ var n=parseInt(z.nr,10); if(n) z.nr=String(n+12); });
    ZZ=A.zeilen.map(cp).concat(fin);
    /* [Grok-Bot] V3.91: Str. 18 zeilenweise mit Aufnahme abgeglichen – nicht gesungene Lobpreisungen einzeln in Klammern, gesungene ergaenzt */
    fin.forEach(function(z){ if(z.nr!=="18"||z._v391) return; z._v391=1;
      z.sa="prem se bolo\n… śrī lakṣmī nārāyaṇa bhagavān kī jay\n… śrī rādhā kṛṣṇa[?] bhagavān[?] kī jay (von Grok ergänzt)\n(… śrī gāyatrī devī mātā kī jay)\n(… śrī viṭṭhala rukmiṇī śipiviṣṭa kī jay)\n(… śrī dattātreya bhagavān kī jay)\n(… śrī gaurī śaṅkara bhagavān kī jay)\n(… śrī viṭṭhala giridhārī parabrahmaṇe kī jay)\n… śrī mahāvatār kriyā bābājī kī jay\n… śrī rāmānujācārya kī jay\nprem se bolo sat-gurudeva śrī swāmī\nvishwananda mahāprabhu kī … jay!";
      if(z.lineCh&&z.lineCh.length<12) z.lineCh=z.lineCh.concat([""]); });
    var Q="Str. 1–12 Viṣṇu Āratī: "+(A.quelle||"")+" · Str. 13–22 Final Prayers: "+(P.quelle||"").replace(/ · Ton:.*$/,"")+" · Ton: Sunday Prayers (YouTube WpcqK0Y7YjE, ab 2:14:31 bis Ende)";
    var PR={zeilen:ZZ,_v324:ZZ,audio:F,audioAlt:[CDN],preferFile:true,youtube:"WpcqK0Y7YjE",youtubeStart:8071,seqFile:SEQ,marksFile:T.map(function(t,k){return k?t:0;}),
      seqYt:SEQYT,marksYt:SEQYT.map(function(e){return e[0];}),quelle:Q,hinweis:A.hinweis||P.hinweis};
    Object.keys(PR).forEach(function(k){ Object.defineProperty(P,k,{configurable:true,enumerable:true,get:function(){ return PR[k]; },set:function(){}}); });
    Object.defineProperty(P,"titel",{configurable:true,enumerable:true,get:function(){ return TI[lg()]; },set:function(){}});
    hooked=P;
    try{ if(typeof i!=="undefined"&&PRAYERS[i]===P&&typeof paintLyrics==="function"){ line=0; paintLyrics(); } }catch(e){}
    return P;
  }
  function help(){ var d=document.getElementById("bppHelp"); if(!d) return; var ref=d.querySelector(".h387"); if(!ref) return;
    var p=d.querySelector(".h389"); if(!p){ p=document.createElement("p"); p.className="h389"; }
    var h=H[lg()]; if(p.innerHTML!==h) p.innerHTML=h;
    if(p.parentNode!==ref.parentNode||p.nextSibling!==ref) ref.parentNode.insertBefore(p,ref); }
  function pre(){ try{ if(!navigator.onLine||!window.caches) return; var u=new URL(F,location.href).href;
    caches.open("bpp-audio-v2").then(function(c){ return c.match(u).then(function(r){ if(!r) return fetch(u,{cache:"no-store"}).then(function(x){ if(x.ok) return c.put(u,x); }); }); }).catch(function(){}); }catch(e){} }
  try{ localStorage.removeItem("bpp-fp-rec"); }catch(e){}
  hook(); setInterval(function(){ hook(); help(); },300);
  window.addEventListener("load",function(){ hook(); setTimeout(pre,8000); });
})();
