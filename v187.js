/* [Grok-Bot] V1.87: ersetzt v186.js (dessen Inhalt unten enthalten ist).
   Mitlesen:
   - Strophenwechsel am Ende des Gesangs: Die naechste Strophe erscheint, sobald die letzte Zeile der aktuellen
     gesungen ist (Beginn der Pause / des Zwischenspiels), nicht erst beim Einsatz der naechsten Strophe.
     Dafuer gibt es je Aufnahme (MP3 und YouTube) eine Pausentabelle (BPP_PAUSES, Lautstaerke-/Pausenerkennung
     offline gemessen: Abschnitte mind. 0,3 s, 9 dB unter dem oertlichen Pegel). Gibt es vor einer Strophe keine
     messbare Pause (Musikbegleitung), wechselt es mit einem Vorlauf von 1,2 s (hoechstens 20 % der Strophe).
     Alles in Medienzeit (MP3 currentTime / YouTube getCurrentTime), daher stimmt es auch bei geaendertem Tempo.
     Der feste Vorlauf von 0,5 s aus follow.js (V1.53) entfaellt dafuer.
   - Ashtotram: 108 Namensanfaenge in der MP3 gemessen (Pausen + Spracherkennung). Vorher geschaetzt ab 0,6 s,
     die Aufnahme beginnt aber mit einem langen Om; Name 1 setzt erst bei 4,3 s ein.
   - Vaishnava Mantra: 6 Verse gemessen; die Marke 54,2 s fuer "om shantih" war in Wirklichkeit die 2. Zeile
     von Vers 6 (die Aufnahme endet ohne om shantih), die Verse dazwischen waren nur geschaetzt.
   - Kavaca Stotram YouTube: Luecken (Str. 15, 19-21, 23-24, 26-30) aus der Melodie-Wiederholung ergaenzt, Schlussteil
     Str. 34-51 per Spracherkennung (Zeilen-Bewertung) gemessen; die alte Marke 896 s fuer "Keshava" war Str. 49.
     MP3: Str. 1-18 aus der Melodie-Wiederholung, Str. 50 (Prahlad Maharaj) per Spracherkennung, dazwischen geschaetzt. */
window.BPP_BUILD="1.87";
(function(){
  if(typeof PRAYERS==="undefined" || window.bppSw187) return; window.bppSw187=1;
  function by(id){ return PRAYERS.find(function(p){ return p.id===id; }); }
  var D={"marks":{"ashtotram|file":[4.3,8.1,11.2,15.3,19.0,22.4,25.9,29.3,32.9,36.1,39.6,43.1,46.7,50.4,54.3,57.6,61.3,65.2,69.1,73.2,76.8,82.7,86.0,89.3,93.7,97.0,100.3,103.3,107.3,110.6,113.8,117.4,121.1,124.5,127.8,131.1,134.1,137.6,141.1,144.6,148.1,151.9,155.6,158.9,162.3,165.6,168.8,171.9,175.6,179.1,182.7,186.0,189.5,193.5,196.6,201.1,204.8,208.0,211.7,214.6,217.7,220.7,224.1,227.2,230.2,233.6,236.7,239.7,243.1,246.4,249.6,252.7,255.7,259.0,262.4,265.4,268.4,271.8,275.0,278.4,281.6,284.5,287.8,291.1,294.2,297.4,300.8,303.8,306.8,309.9,313.0,316.5,319.5,322.8,326.1,329.5,332.5,335.8,338.9,342.1,345.6,348.5,351.4,355.4,359.5,362.7,366.4,370.4],"vaishnava-mantra|file":[1.7,11.0,19.8,29.1,38.6,48.6,58.5],"kavacham|yt":[7,27.3,44.8,64.8,85,106,125,145,164.8,187.7,205.3,225.8,245,265.3,284.7,304.5,323.5,341.5,358.4,375.3,392.3,407.8,424.3,439.5,454,470.5,485.3,500.1,514.7,529.1,null,590,606.8,631,643,664,679,712,724,748,778,790,805,814,841,850,865,877,898,928,958],"kavacham|file":[9.0,41.7,74.4,107.1,139.8,172.5,205.0,237.7,270.0,302.3,334.2,365.4,395.9,423.0,450.0,480.6,510.9,546.3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,905.0,null]},"pauses":{"ashtotram|file":[3890,0,18,33,43,76,81,106,112,148,153,184,190,218,224,254,259,287,293,323,329,355,361,390,396,425,431,461,467,498,504,537,543,569,576,607,613,646,652,684,690,725,732,762,768,820,827,854,860,887,893,931,937,964,970,997,1003,1027,1033,1067,1073,1100,1106,1132,1138,1168,1174,1206,1211,1240,1245,1272,1277,1306,1311,1336,1341,1370,1376,1405,1411,1440,1446,1475,1481,1513,1519,1550,1556,1583,1589,1618,1623,1650,1655,1682,1688,1712,1719,1749,1756,1784,1791,1820,1827,1853,1860,1889,1895,1928,1935,2006,2011,2043,2048,2075,2080,2112,2117,2142,2146,2172,2177,2202,2207,2236,2241,2267,2272,2297,2302,2330,2336,2361,2366,2392,2397,2426,2431,2459,2464,2491,2496,2522,2527,2552,2557,2585,2590,2619,2624,2649,2654,2679,2684,2712,2718,2745,2750,2779,2784,2811,2816,2873,2878,2906,2911,2936,2942,2969,2974,3002,3008,3032,3038,3064,3068,3094,3097,3125,3130,3158,3164,3189,3195,3224,3228,3257,3260,3289,3295,3320,3324,3352,3358,3383,3389,3414,3421,3451,3456,3509,3514,3590,3595,3621,3627,3658,3664,3700,3704,3796,3801,3835,3890],"bhajare|file":[2968,0,16,152,174,2953,2968],"closing-morning|file":[1900,0,44,96,103,161,165,226,234,295,303,376,383,436,444,500,504,530,536,578,586,609,615,670,675,818,822,896,903,938,945,998,1006,1046,1052,1321,1325,1328,1334,1351,1357,1448,1451,1507,1513,1581,1588,1642,1652,1676,1684,1739,1747,1782,1788,1891,1900],"ganesha-mantra|file":[264,0,23,60,64,94,100,132,138,170,176,245,264],"gayatri|file":[766,0,8,28,50,93,100,102,105,135,142,177,187,248,263,308,316,318,321,354,362,398,407,465,480,529,537,538,542,576,584,620,631,702,722,745,766],"giridhari-arati|file":[3335,0,44,870,873,1276,1279,1646,1649,2076,2081,2235,2238,2317,2321,2730,2733,2769,2772,2985,2988,3057,3060,3270,3274,3320,3335],"govinda|file":[7761,0,13,113,130,161,170,171,174,210,218,254,262,299,306,365,373,433,446,490,496,509,513,542,547,594,600,647,651,699,703,739,742,748,753,798,804,851,857,904,908,956,960,1004,1011,1056,1062,1108,1114,1160,1167,1211,1218,1262,1267,1314,1318,1365,1371,1418,1424,1469,1474,1521,1524,1571,1577,1614,1617,1623,1628,1675,1680,1728,1731,1827,1832,1880,1886,1932,1937,1982,1988,2034,2039,2044,2048,2086,2091,2136,2142,2189,2195,2239,2245,2290,2295,2344,2348,2394,2399,2446,2452,2548,2554,2599,2605,2650,2656,2702,2709,2754,2758,2806,2811,2856,2862,2909,2912,2960,2965,3011,3016,3062,3067,3115,3118,3165,3171,3217,3223,3318,3324,3371,3376,3423,3428,3474,3480,3525,3531,3575,3581,3627,3633,3680,3686,3731,3737,3784,3787,3836,3839,3885,3889,3988,3994,4040,4044,4142,4148,4194,4200,4246,4251,4297,4301,4348,4353,4399,4405,4451,4456,4503,4509,4555,4560,4605,4609,4657,4660,4708,4712,4760,4765,4812,4817,4862,4868,4913,4918,4965,4970,5119,5124,5171,5176,5223,5228,5274,5280,5325,5330,5376,5382,5428,5434,5479,5485,5532,5537,5585,5588,5634,5639,5686,5690,5736,5742,5788,5794,5842,5845,5891,5896,5942,5948,5993,5999,6046,6052,6148,6153,6199,6204,6251,6257,6303,6309,6355,6359,6405,6410,6510,6513,6560,6565,6612,6616,6662,6666,6714,6719,6764,6770,6817,6822,6869,6873,6918,6924,6970,6976,7023,7028,7074,7078,7126,7131,7176,7181,7228,7234,7279,7284,7331,7336,7384,7403,7433,7437,7474,7481,7515,7524,7564,7571,7630,7639,7712,7761],"govinda|yt":[7656,0,18,101,106,190,196,336,347,450,455,717,721,984,990,1522,1527,1631,1635,1792,1795,1900,1904,2170,2174,2437,2442,2599,2603,2811,2814,2967,2970,3070,3074,3122,3125,3173,3176,3481,3484,3634,3637,3838,3842,3890,3893,4143,4146,4193,4196,4646,4649,4896,4900,5097,5100,5146,5150,5397,5400,5697,5700,5846,5850,6095,6098,6144,6148,6342,6345,6589,6592,6687,6691,6836,6840,6886,6889,6936,6939,7297,7308,7461,7466,7615,7656],"guru-stotram-abend|file":[2627,0,27,95,108,178,194,261,280,310,315,346,350,381,384,2354,2358,2398,2404,2452,2456,2504,2509,2570,2590,2616,2627],"guru-stotram|file":[2266,0,19,22,38,105,111,112,116,143,148,181,186,216,221,254,260,291,296,329,334,402,408,477,481,513,516,548,554,555,558,586,591,624,627,698,702,734,738,771,777,882,886,918,922,993,997,1027,1032,1104,1107,1141,1145,1214,1219,1250,1255,1361,1365,1436,1441,1471,1477,1509,1514,1620,1625,1805,1809,1842,1845,1880,1883,1915,1920,1953,1957,1996,2001,2047,2051,2093,2099,2145,2151,2221,2266],"guruji-gayatri|file":[649,0,14,39,57,96,104,135,138,164,171,233,243,274,280,312,315,340,349,411,421,421,425,460,468,528,536,606,649],"hanuman|file":[5114,0,13,612,617,4123,4136,5064,5067,5072,5114],"hanuman|yt":[5345,0,6,101,117,226,234,471,474,686,693,772,794,4521,4539,4541,4545,5076,5081,5082,5100,5297,5345],"kavacham|file":[9719,0,14,5394,5406,6045,6071,9685,9719],"kavacham|yt":[9958,0,11,34,52,5922,5926,6540,6544,9758,9761,9762,9766,9908,9958],"lakshmi-arati|file":[2924,0,18,2799,2803,2873,2924],"mukunda|file":[10498,0,15,39,57,109,112,114,121,158,163,207,220,297,301,342,347,450,454,703,708,767,771,1188,1192,1265,1268,1531,1536,1687,1695,1994,1998,2498,2502,2696,2699,2700,2703,2710,2713,2848,2851,3013,3016,3053,3057,3106,3112,3330,3337,3503,3508,3569,3574,4157,4162,4441,4445,4956,4959,5101,5106,5251,5256,5328,5331,5401,5405,5549,5552,5554,5559,5706,5710,7089,7093,7245,7249,7678,7682,9002,9006,9541,9545,9955,9960,10453,10498],"mukunda|yt":[10486,0,6,31,34,36,44,100,103,106,114,149,154,199,211,334,338,1679,1687,3097,3103,3324,3328,3560,3564,5243,5247,10445,10486],"narasimha|file":[3637,1649,1654,3414,3420,3450,3457,3501,3520,3597,3600,3602,3637],"narasimha|yt":[4106,0,15,64,71,74,78,108,114,2246,2252,4045,4106],"ramanuja|file":[2154,0,13,394,398,400,402,433,436,471,475,549,552,625,629,695,700,769,773,842,848,918,921,991,996,996,1000,1072,1076,1298,1302,1449,1452,2071,2074,2144,2154],"suprabhatam|file":[3209,9,28,1278,1281,2508,2511,2926,2932,2966,2970,3006,3010,3047,3053,3099,3116,3175,3209],"suprabhatam|yt":[3273,0,26,62,73,1298,1301,3222,3273],"vaishnava-mantra|file":[613,0,17,72,76,107,110,157,163,193,199,254,259,287,292,346,351,381,387,421,425,453,458,482,487,541,546,585,613],"vishnu-arati|file":[3254,0,3,7,19,3175,3254]}};
  Object.keys(D.marks).forEach(function(k){
    var q=k.split("|"), P=by(q[0]); if(!P) return;
    if(q[1]==="file"){ P.marksFile=D.marks[k].slice(); P._bppEstMarks=0; P._bppEstSrc=""; }
    else { P.marksYt=D.marks[k].slice(); P._bppEstYt=0; }
  });
  window.BPP_PAUSES=D.pauses; var PZ={}; /* Zehntelsekunden: [Dauer, Pause1-Anfang, Pause1-Ende, ...] */
  var FB=1.2;
  function isYt(){ return typeof ytOn!=="undefined" && !!ytOn; }
  function rawT(p){
    try{
      if(isYt()){ if(typeof ytTime==="number") return ytTime; }
      else if(typeof a!=="undefined" && a && a.src && isFinite(a.duration) && a.duration>=8) return a.currentTime||0;
    }catch(e){}
    return p.t;
  }
  function pausesFor(P){
    var key=P.id+"|"+(isYt()?"yt":"file"), L=PZ[key];
    if(!L){ var R=D.pauses[key]; if(!R || !R.length) return null; L=PZ[key]=R.map(function(x){ return x/10; }); }
    var dur=0;
    try{ if(isYt()) dur=(typeof ytDur==="number")?ytDur:0; else dur=isFinite(a.duration)?a.duration:0; }catch(e){}
    if(!(dur>0) || Math.abs(dur-L[0])>1.5) return null;
    return L;
  }
  function bounds(P, p){
    var s=(typeof window.bppSeqOf==="function")?window.bppSeqOf(P):null;
    if(s) return s.map(function(e){ return {t:e[0], k:e[1], m:true}; });
    if(typeof bppStarts!=="function") return null;
    var st=bppStarts(p), A=bppAnchors(P, p.gs), est=isYt()?P._bppEstYt:P._bppEstMarks;
    return st.map(function(t,g){ return {t:t, k:g, m:(!est && A[g]!=null)}; });
  }
  function switchTimes(B, L){
    var E=[];
    for(var j=0;j<B.length;j++){
      if(j===0){ E.push(B[0].t); continue; }
      var T=B[j].t, Tp=B[j-1].t, Tn=(j+1<B.length)?B[j+1].t:T+30, gap=Math.max(T-Tp, 0.5), lo, hi, best=null, bd=1e9;
      if(B[j].m){ lo=T-Math.min(1.5, 0.5*gap); hi=T+0.2; }
      else { lo=T-Math.min(6, 0.3*gap); hi=T+Math.min(6, 0.3*Math.max(Tn-T, 0.5)); }
      if(L){
        for(var q=1;q+1<L.length;q+=2){
          var ps=L[q], pe=L[q+1];
          if(pe<lo || ps>hi || ps<Tp+0.25*gap) continue;
          var d=(ps<=T && T<=pe)?0:Math.min(Math.abs(pe-T), Math.abs(ps-T));
          if(d<bd-0.01 || (Math.abs(d-bd)<=0.01 && best && (pe-ps)>(best[1]-best[0]))){ bd=d; best=[ps,pe]; }
        }
      }
      var sw=best?best[0]+0.1:T-Math.min(FB, 0.2*gap);
      E.push(sw);
    }
    for(var k=1;k<E.length;k++){ if(E[k]<E[k-1]+0.2) E[k]=E[k-1]+0.2; }
    return E;
  }
  var cache={key:"", E:null, B:null};
  window.bppSwitchInfo=function(){
    if(typeof i==="undefined" || i<0) return null;
    var p=songProgress(); if(!p || !p.gs) return null;
    var P=PRAYERS[i], B=bounds(P, p); if(!B) return null;
    return {B:B, E:switchTimes(B, pausesFor(P)), t:rawT(p)};
  };
  var base=window.stanzaFromProgress;
  if(typeof base==="function"){
    window.stanzaFromProgress=function(p){
      try{
        if(!p || !p.gs || typeof i==="undefined" || i<0) return base.apply(this, arguments);
        var P=PRAYERS[i], B=bounds(P, p); if(!B || !B.length) return base.apply(this, arguments);
        var L=pausesFor(P), key=P.id+"|"+isYt()+"|"+(L?1:0)+"|"+B.map(function(b){ return b.t.toFixed(2)+(b.m?"m":""); }).join(",");
        if(cache.key!==key){ cache={key:key, E:switchTimes(B, L), B:B}; }
        var t=rawT(p), E=cache.E, k=B[0].k;
        for(var j=0;j<E.length;j++){ if(E[j]<=t+0.05) k=B[j].k; else break; }
        if(k>p.gs.length-1) k=p.gs.length-1;
        return k<0?0:k;
      }catch(e){ return base.apply(this, arguments); }
    };
  }
})();

(function(){
  if(window.bppV186) return; window.bppV186=1; window.bppV187=1;
  /* ---------- Mitlesen ---------- */
  function hookSG(){
    if(typeof window.stanzaGroups!=="function" || window.stanzaGroups._bpp186) return;
    var baseSG=window.stanzaGroups;
    window.stanzaGroups=function(P){
      if(P && P.id==="ashtotram" && P.zeilen && P.zeilen.length){
        return P.zeilen.map(function(z,n){ var m=String(z.sa||"").match(/^(\d+)/); return { key:m?m[1]:String(n+1), start:n, idx:[n] }; });
      }
      return baseSG.apply(this, arguments);
    };
    window.stanzaGroups._bpp186=1;
  }
  function hookAnchors(){
    if(typeof window.bppAnchors!=="function" || window.bppAnchors._bpp186 || typeof bppUserMarks!=="function") return;
    window.bppAnchors=function(P, gs){
      var yt=(typeof ytOn!=="undefined" && ytOn), base=yt?P.marksYt:P.marksFile, A={}, isBase={};
      if(base && base.length){ base.forEach(function(t,g){ if(typeof t==="number" && g<gs.length){ A[g]=t; isBase[g]=1; } }); }
      if(A[0]==null){ A[0]=(yt?P.youtubeStart:0)||0; isBase[0]=1; }
      var u={}; try{ u=bppUserMarks(P.id)||{}; }catch(e){}
      Object.keys(u).forEach(function(k){
        var g=+k, t=u[k]; if(!(g>=0 && g<gs.length) || typeof t!=="number") return;
        var lo=-Infinity, hi=Infinity;
        Object.keys(isBase).forEach(function(kk){ var q=+kk; if(q<g && A[q]>lo) lo=A[q]; if(q>g && A[q]<hi) hi=A[q]; });
        if(t>lo && t<hi) A[g]=t;
      });
      return A;
    };
    window.bppAnchors._bpp186=1;
  }
  function realMarks(m, flag){ return !!(m && !flag && m.filter(function(x){ return typeof x==="number"; }).length>=2); }
  function estimate(P){
    if(!P || typeof stanzaGroups!=="function" || typeof i==="undefined" || i<0 || PRAYERS[i]!==P) return false;
    var yt=(typeof ytOn!=="undefined" && ytOn), key=yt?"marksYt":"marksFile", fl=yt?"_bppEstYt":"_bppEstMarks", fd=fl+"Dur";
    /* V1.85-Altlast: marksFile mit YouTube-Dauer geschaetzt → verwerfen */
    if(!yt && P._bppEstMarks && P._bppEstSrc==="yt"){ delete P.marksFile; P._bppEstMarks=0; }
    if(realMarks(P[key], P[fl])) return false;
    var dur=0;
    if(yt){ if(typeof ytDur==="number" && ytDur>8) dur=ytDur; }
    else if(typeof a!=="undefined" && a && isFinite(a.duration) && a.duration>8) dur=a.duration;
    if(!(dur>8)) return false;
    if(P[fl] && Math.abs((P[fd]||0)-dur)<1.5) return false;
    try{
      var gs=stanzaGroups(P); if(!gs || gs.length<2) return false;
      var w=(typeof bppWeights==="function")?bppWeights(P, gs):gs.map(function(){ return 10; });
      var sum=0; w.forEach(function(x){ sum+=x; }); if(!(sum>0)) return false;
      var t0=yt?((P.youtubeStart||0)+0.6):0.6, usable=Math.max(dur-t0-1.5, gs.length), m=[], acc=0;
      for(var g=0;g<gs.length;g++){ m.push(Math.round((t0+usable*(acc/sum))*10)/10); acc+=w[g]; }
      P[key]=m; P[fl]=1; P[fd]=dur; if(!yt) P._bppEstSrc="file";
      return true;
    }catch(e){ return false; }
  }
  var paintedAsh=0;
  function refresh(){
    hookSG(); hookAnchors();
    if(typeof PRAYERS==="undefined" || typeof i==="undefined" || i<0 || !PRAYERS[i]) return;
    var P=PRAYERS[i], need=estimate(P);
    if(P.id==="ashtotram"){ if(!paintedAsh){ paintedAsh=1; need=true; } } else paintedAsh=0;
    if(need){ try{ holdLineUntil=0; }catch(e){} try{ paintLyrics(); }catch(e){} }
  }
  /* V1.85 hat ggf. schon marksFile aus der YouTube-Dauer gesetzt: markieren, damit es verworfen wird */
  if(typeof PRAYERS!=="undefined") PRAYERS.forEach(function(P){ if(P._bppEstMarks && !P._bppEstSrc) P._bppEstSrc="yt"; });

  /* ---------- Vollbild: Menue nur nach Tippen ---------- */
  var css=document.createElement("style");
  css.textContent="#bppFsSide{display:none!important}#bppFs #bppFsStage{bottom:4vh}"+
    "#bppFsBar button.str{font-size:15px;min-width:58px;padding:0 8px}#bppFsBar button.j30{font-size:15px;min-width:52px}"+
    "@media(max-width:400px){#bppFsBar button.str{min-width:54px;padding:0 6px}#bppFsBar button.j30{min-width:48px;padding:0 6px}}";
  document.head.appendChild(css);
  var STR={de:["‹ Str.","Str. ›"],en:["‹ Verse","Verse ›"],fr:["‹ Str.","Str. ›"],es:["‹ Estr.","Estr. ›"],ru:["‹ Стр.","Стр. ›"],hi:["‹ पद","पद ›"],pt:["‹ Verso","Verso ›"]};
  function arrange(){
    var bar=document.getElementById("bppFsBar"); if(!bar) return;
    var L=STR[(typeof lang!=="undefined" && STR[lang])?lang:"en"];
    var pv=document.getElementById("bppFsPrev"), nx=document.getElementById("bppFsNext");
    if(pv && pv.textContent!==L[0]) pv.textContent=L[0];
    if(nx && nx.textContent!==L[1]) nx.textContent=L[1];
    var b30=document.getElementById("bppFsB30"), f30=document.getElementById("bppFsF30"), ch=document.getElementById("bppFsCh");
    if(b30 && f30 && ch && b30.parentNode!==ch.parentNode){
      var old=b30.parentNode, tools=ch.parentNode;
      tools.insertBefore(b30, ch); tools.insertBefore(f30, ch);
      if(old && old!==tools && old.children.length===0) old.parentNode.removeChild(old);
    }
  }

  function boot(){
    refresh(); arrange();
    setInterval(refresh, 900);
    setInterval(arrange, 500);
    var lastId=null;
    setInterval(function(){
      hookSG(); hookAnchors();
      if(typeof PRAYERS==="undefined" || typeof i==="undefined" || i<0) return;
      var id=PRAYERS[i]&&PRAYERS[i].id; if(id!==lastId){ lastId=id; refresh(); }
    }, 400);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.addEventListener("load", refresh);
  setTimeout(refresh, 0); setTimeout(refresh, 600);
})();

/* [Grok-Bot] V1.87: Grossbild – animierter Strophenwechsel (0,55 s, weich).
   Hochkant und quer: neue Strophe kommt von unten, alte geht nach oben hinaus. Rueckwaerts umgekehrt.
   Gilt fuer Mitlesen, Strophentasten, Wischen und Teile langer Strophen. prefers-reduced-motion: kurzes Ueberblenden.
   Die Schriftgroesse rechnet v183 vorher fertig aus (synchron); animiert wird erst der fertige Zustand (MutationObserver). */
(function(){
  if(window.bppAnim187) return; window.bppAnim187=1;
  var css=document.createElement("style");
  css.textContent="#bppFs #bppFsStage{overflow:hidden}"+
    "#bppFsStage .bppGhost{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;will-change:transform,opacity}"+
    ".bppGhost .gbox{display:inline-block;text-align:center;line-height:1.22;max-width:100%}.bppGhost .vl{white-space:nowrap}"+
    ".bppGhost .fch{white-space:nowrap;color:#e0b45a;margin-bottom:.25em;letter-spacing:.04em}"+
    ".bppGhost .ftr{white-space:normal;color:#a9a39a;line-height:1.3;margin:.7em auto 0;font-style:italic}"+
    "#bppFs.end .bppGhost{display:none}";
  document.head.appendChild(css);
  var DUR=550, EASE="cubic-bezier(.45,0,.2,1)";
  var box=null, stage=null, mo=null, snap=null, ghost=null, anims=[];
  function reduced(){ try{ return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } }
  function state(){
    var s=null; try{ s=window.bppFsState?window.bppFsState():null; }catch(e){}
    var pid=null; try{ pid=(typeof i!=="undefined" && i>=0 && PRAYERS[i])?PRAYERS[i].id:null; }catch(e){}
    return {k:s?s.k:-1, page:s?s.page:0, on:!!(s&&s.on), pid:pid};
  }
  function take(){ return {html:box.innerHTML, fs:box.style.fontSize, st:state(), txt:box.textContent}; }
  function stop(){
    anims.forEach(function(a){ try{ a.cancel(); }catch(e){} }); anims=[];
    if(ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost); ghost=null;
  }
  function animate(prev, cur){
    stop();
    if(!prev || !prev.html || !box.animate) return;
    var fwd=(cur.st.k>prev.st.k) || (cur.st.k===prev.st.k && cur.st.page>prev.st.page);
    ghost=document.createElement("div"); ghost.className="bppGhost"; ghost.setAttribute("aria-hidden","true");
    var gb=document.createElement("div"); gb.className="gbox"; gb.innerHTML=prev.html; gb.style.fontSize=prev.fs;
    ghost.appendChild(gb); stage.appendChild(ghost);
    if(reduced()){
      anims.push(ghost.animate([{opacity:1},{opacity:0}],{duration:200,easing:"linear",fill:"forwards"}));
      anims.push(box.animate([{opacity:0},{opacity:1}],{duration:200,easing:"linear"}));
    } else {
      var s=fwd?1:-1, d=stage.clientHeight, ax="translateY";
      anims.push(ghost.animate([{transform:ax+"(0)",opacity:1},{transform:ax+"("+(-s*d)+"px)",opacity:0.2}],{duration:DUR,easing:EASE,fill:"forwards"}));
      anims.push(box.animate([{transform:ax+"("+(s*d)+"px)",opacity:0.2},{transform:ax+"(0)",opacity:1}],{duration:DUR,easing:EASE}));
    }
    var mine=anims[0]; mine.onfinish=function(){ if(anims[0]===mine) stop(); };
  }
  function onMut(){
    if(!box) return;
    var cur=take(), prev=snap; snap=cur;
    if(!prev || !cur.st.on || !prev.st.on) { stop(); return; }
    if(cur.txt===prev.txt) return;
    if(cur.st.pid!==prev.st.pid || (cur.st.k===prev.st.k && cur.st.page===prev.st.page)) { stop(); return; }
    animate(prev, cur);
  }
  function attach(){
    var b=document.getElementById("bppFsBox"); if(!b || b===box) return;
    if(mo) mo.disconnect();
    box=b; stage=document.getElementById("bppFsStage"); snap=null;
    mo=new MutationObserver(onMut); mo.observe(box,{childList:true, subtree:true, characterData:true});
    snap=take();
  }
  setInterval(attach, 500);
  document.addEventListener("click", function(){ setTimeout(attach, 0); }, true);
})();
