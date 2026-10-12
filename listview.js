/* [Grok-Bot] V1.63: Aufnahme fuer das Ashtotram, Mini-Ladebalken am aktiven Prayer, Zeichen fuer Prayers ohne Ton, unter "Alle" keine doppelten Titel. V1.62: Abendgebet wie im Prathana-Heft: langes Abend-Nrsimha-Prayer, Guru Arati nach dem Bhajare, in den Closing Prayers zusaetzlich Rukmini Maharani und Pandarinatha. */
(function(){
  if(typeof PRAYERS==="undefined") return;
  var Q="Prathana with chords \u00b7 Sri Vitthal Dham";
  function add(p){ if(!PRAYERS.some(function(x){ return x.id===p.id; })) PRAYERS.push(p); }
  add({ id:"narasimha-abend", titel:"\u015ar\u012b N\u1e5bsi\u1e41ha Prayer (Abend)", autor:"Abendgebet \u00b7 Sri Vitthal Dham", quelle:Q+" \u00b7 S. 21", hinweis:"Heft S. 21.", hinweisEn:"Booklet p. 21.", zeilen:[{"nr": "N\u00b7a", "ch": "Am   F   G   Am", "sa": "namaste n\u1e5bsi\u1e41h\u0101ya", "ue": "", "en": ""}, {"nr": "N\u00b7a", "ch": "Am   F   G   Am", "sa": "prahl\u0101d\u0101hl\u0101da d\u0101yine", "ue": "", "en": ""}, {"nr": "N\u00b7a", "ch": "Am   F   G   Am", "sa": "hira\u1e47y\u0101ka\u015bipur vak\u1e63a\u1e25", "ue": "", "en": ""}, {"nr": "N\u00b7a", "ch": "Am   F   G   Am", "sa": "\u015bil\u0101 ta\u1e45ka nakh\u0101l\u0101ye", "ue": "", "en": ""}, {"nr": "N\u00b7b", "ch": "Am   F   G   Am", "sa": "ito n\u1e5bsi\u1e41ho parato n\u1e5bsi\u1e41ho", "ue": "", "en": ""}, {"nr": "N\u00b7b", "ch": "Dm   G   Am", "sa": "yato yato y\u0101mi tato n\u1e5bsi\u1e41ho", "ue": "", "en": ""}, {"nr": "N\u00b7b", "ch": "Am   F   G   Am", "sa": "bahir n\u1e5bsi\u1e41ho h\u1e5bdaye n\u1e5bsi\u1e41ho", "ue": "", "en": ""}, {"nr": "N\u00b7b", "ch": "Am   F   G   Am", "sa": "n\u1e5bsi\u1e41ham \u0101di\u1e41 \u015baranam prapadye", "ue": "", "en": ""}, {"nr": "N\u00b7c", "ch": "Am   F   G   Am", "sa": "tava kara kamala vare", "ue": "", "en": ""}, {"nr": "N\u00b7c", "ch": "Am   F   G   Am", "sa": "nakh\u0101m adbhuta \u015bri\u1e45g\u0101\u1e41", "ue": "", "en": ""}, {"nr": "N\u00b7c", "ch": "Am   F   G   Am", "sa": "dalit\u0101 hira\u1e47yaka\u015bipu", "ue": "", "en": ""}, {"nr": "N\u00b7c", "ch": "Am   F   G   Am", "sa": "tanu bh\u1e5b\u1e45gam", "ue": "", "en": ""}, {"nr": "N\u00b7d", "ch": "Am   F   G   Am", "sa": "ke\u015bava dh\u1e5bta nara hari r\u016bpa", "ue": "", "en": ""}, {"nr": "N\u00b7d", "ch": "Dm   G   Am", "sa": "jaya jagad\u012b\u015ba hare", "ue": "", "en": ""}, {"nr": "N\u00b7d", "ch": "F   G   Am", "sa": "jaya jagad\u012b\u015ba hare", "ue": "", "en": ""}, {"nr": "N\u00b7d", "ch": "Am   F   G   Am", "sa": "jaya jagad\u012b\u015ba hare", "ue": "", "en": ""}, {"nr": "N\u00b7e", "ch": "Am   G", "sa": "o\u1e41 namo bhagavate n\u1e5bsi\u1e41h\u0101ya", "ue": "", "en": ""}, {"nr": "N\u00b7e", "ch": "Em   F   Am", "sa": "namas tejas tejase \u0101vir", "ue": "", "en": ""}, {"nr": "N\u00b7e", "ch": "Am   G", "sa": "\u0101vir bhava vajra nakha vajra", "ue": "", "en": ""}, {"nr": "N\u00b7e", "ch": "Em   F   Am", "sa": "da\u1e41\u1e63\u1e6dra karm\u0101say\u0101n randhaya", "ue": "", "en": ""}, {"nr": "N\u00b7f", "ch": "", "sa": "randhaya tamo grasa grasa", "ue": "", "en": ""}, {"nr": "N\u00b7f", "ch": "", "sa": "o\u1e41 sv\u0101h\u0101 abhayam abhayam", "ue": "", "en": ""}, {"nr": "N\u00b7f", "ch": "", "sa": "\u0101tmani bh\u016byi\u015bth\u0101 o\u1e41 k\u1e63rau\u1e41", "ue": "", "en": ""}, {"nr": "N\u00b7f", "ch": "", "sa": "o\u1e41 namo bhagavate \u015br\u012b mah\u0101", "ue": "", "en": ""}, {"nr": "N\u00b7g", "ch": "", "sa": "n\u1e5bsi\u1e41h\u0101ya da\u1e41\u1e63\u1e6dra kar\u0101la", "ue": "", "en": ""}, {"nr": "N\u00b7g", "ch": "", "sa": "vadan\u0101ya ghora r\u016bp\u0101ya", "ue": "", "en": ""}, {"nr": "N\u00b7g", "ch": "", "sa": "vajra nakh\u0101ya jv\u0101l\u0101 m\u0101line", "ue": "", "en": ""}, {"nr": "N\u00b7g", "ch": "", "sa": "mama vighn\u0101n paca paca", "ue": "", "en": ""}, {"nr": "N\u00b7h", "ch": "", "sa": "mama bh\u0101y\u0101n bhindi bhindi", "ue": "", "en": ""}, {"nr": "N\u00b7h", "ch": "", "sa": "mama \u015batr\u016bn vidr\u0101vaya", "ue": "", "en": ""}, {"nr": "N\u00b7h", "ch": "", "sa": "vidr\u0101vaya mama sarva ri\u1e63\u1e6d\u0101na", "ue": "", "en": ""}, {"nr": "N\u00b7h", "ch": "", "sa": "prabh\u0101\u00f1jaya prabh\u0101\u00f1jaya", "ue": "", "en": ""}, {"nr": "N\u00b7i", "ch": "", "sa": "chata chata hana hana", "ue": "", "en": ""}, {"nr": "N\u00b7i", "ch": "", "sa": "chindi chindi mama sarv\u0101", "ue": "", "en": ""}, {"nr": "N\u00b7i", "ch": "", "sa": "bh\u012b\u1e63t\u0101n p\u016braya p\u016braya m\u0101\u1e41", "ue": "", "en": ""}, {"nr": "N\u00b7i", "ch": "", "sa": "rak\u1e63a rak\u1e63a hu\u1e41 pha\u1e6d sv\u0101h\u0101", "ue": "", "en": ""}, {"nr": "N\u00b7j", "ch": "", "sa": "o\u1e41 k\u1e63rau\u1e41 namo bhagavate", "ue": "", "en": ""}, {"nr": "N\u00b7j", "ch": "", "sa": "n\u1e5bsi\u1e41h\u0101ya jv\u0101l\u0101 m\u0101line", "ue": "", "en": ""}, {"nr": "N\u00b7j", "ch": "", "sa": "d\u012bpta da\u1e41\u1e63\u1e6dray\u0101gni netr\u0101ya", "ue": "", "en": ""}, {"nr": "N\u00b7j", "ch": "", "sa": "sarva rak\u1e63o ghn\u0101ya", "ue": "", "en": ""}, {"nr": "N\u00b7k", "ch": "", "sa": "sarva bh\u016bta vin\u0101\u1e63aya", "ue": "", "en": ""}, {"nr": "N\u00b7k", "ch": "", "sa": "sarva jvara vin\u0101\u1e63aya", "ue": "", "en": ""}, {"nr": "N\u00b7k", "ch": "", "sa": "daha daha paca paca", "ue": "", "en": ""}, {"nr": "N\u00b7k", "ch": "", "sa": "rak\u1e63a rak\u1e63a hu\u1e41 pha\u1e6d k\u1e63rau\u1e41", "ue": "", "en": ""}, {"nr": "N\u00b7l", "ch": "", "sa": "ugram v\u012bram mah\u0101 vi\u1e63\u1e47u\u1e41", "ue": "", "en": ""}, {"nr": "N\u00b7l", "ch": "", "sa": "jvalantam sarvato mukham", "ue": "", "en": ""}, {"nr": "N\u00b7l", "ch": "", "sa": "n\u1e5bsi\u1e41ham bh\u012b\u015banam bhadram", "ue": "", "en": ""}, {"nr": "N\u00b7l", "ch": "", "sa": "m\u1e5btyur m\u1e5btyum nam\u0101myaham", "ue": "", "en": ""}, {"nr": "N\u00b7m", "ch": "", "sa": "o\u1e41 vajra nakh\u0101ya vidhmahe", "ue": "", "en": ""}, {"nr": "N\u00b7m", "ch": "", "sa": "t\u012bk\u1e63na da\u1e41\u1e63\u1e6dr\u0101ya dh\u012bmahi", "ue": "", "en": ""}, {"nr": "N\u00b7m", "ch": "", "sa": "tan-no n\u0101rasi\u1e41ha\u1e25 pracoday\u0101t", "ue": "", "en": ""}, {"nr": "N\u00b7m", "ch": "", "sa": "tan-no n\u0101rasi\u1e41ha\u1e25 pracoday\u0101t", "ue": "", "en": ""}, {"nr": "N\u00b7n", "ch": "", "sa": "durge\u1e63va\u1e6davy\u0101ji mukh\u0101di\u1e63u prabhu\u1e25", "ue": "", "en": ""}, {"nr": "N\u00b7n", "ch": "", "sa": "p\u0101y\u0101n-n\u1e5bsimho \u2019sura y\u016bthap\u0101ri\u1e25", "ue": "", "en": ""}, {"nr": "N\u00b7n", "ch": "", "sa": "vimu\u00f1cato yasya mah\u0101\u1e6d\u1e6da h\u0101sa\u1e41", "ue": "", "en": ""}, {"nr": "N\u00b7n", "ch": "", "sa": "di\u015bo vinedur nyapata\u1e41\u015b ca garbh\u0101\u1e25", "ue": "", "en": ""}, {"nr": "N\u00b7o", "ch": "", "sa": "vidik\u1e63u dik\u1e63\u016brdhvam adha\u1e25 samant\u0101d", "ue": "", "en": ""}, {"nr": "N\u00b7o", "ch": "", "sa": "antar bahir bhagav\u0101n n\u0101rasi\u1e41ha\u1e25", "ue": "", "en": ""}, {"nr": "N\u00b7o", "ch": "", "sa": "prah\u0101paya loka bhaya\u1e41 svanena", "ue": "", "en": ""}, {"nr": "N\u00b7o", "ch": "", "sa": "sva tejas\u0101 grasta samasta tej\u0101\u1e25", "ue": "", "en": ""}, {"nr": "N\u00b7p", "ch": "", "sa": "o\u1e41 \u0101\u1e41 hr\u012b\u1e41 k\u1e63rau\u1e41 o\u1e41 pha\u1e6d ta\u1e6d\u1e6dak\u0101", "ue": "", "en": ""}, {"nr": "N\u00b7p", "ch": "", "sa": "h\u0101taka ke\u015bagra jvalat p\u0101duka", "ue": "", "en": ""}, {"nr": "N\u00b7p", "ch": "", "sa": "locana bhadr\u0101dika nakha spar\u015ba", "ue": "", "en": ""}, {"nr": "N\u00b7p", "ch": "", "sa": "divya si\u1e41ha namostute", "ue": "", "en": ""}, {"nr": "N\u00b7q", "ch": "", "sa": "jaya jagad\u012b\u015ba hare", "ue": "", "en": ""}, {"nr": "N\u00b7q", "ch": "", "sa": "divya si\u1e41ha namostute", "ue": "", "en": ""}, {"nr": "N\u00b7q", "ch": "", "sa": "jaya jagad\u012b\u015ba hare", "ue": "", "en": ""}, {"nr": "N\u00b7q", "ch": "", "sa": "\u015br\u012b lak\u015bm\u012b n\u1e5b\u015bi\u1e45ga hare (3x)", "ue": "", "en": ""}, {"nr": "N\u00b7r", "ch": "C", "sa": "(jaya) n\u1e5b\u015bi\u1e45ga dev (4)", "ue": "", "en": ""}, {"nr": "N\u00b7r", "ch": "", "sa": "(jaya) n\u1e5b\u015bi\u1e45ga dev (4)", "ue": "", "en": ""}, {"nr": "N\u00b7r", "ch": "", "sa": "(jaya) prahl\u0101d mah\u0101r\u0101j prahl\u0101d mah\u0101r\u0101j", "ue": "", "en": ""}, {"nr": "N\u00b7r", "ch": "", "sa": "bhakta svarupa jaya prahl\u0101d mah\u0101r\u0101j ://", "ue": "", "en": ""}, {"nr": "N\u00b7s", "ch": "", "sa": "gurudev (3x)", "ue": "", "en": ""}, {"nr": "N\u00b7s", "ch": "", "sa": "jaya jaya gurudev", "ue": "", "en": ""}, {"nr": "N\u00b7s", "ch": "", "sa": "(jaya) gurudev (3x)", "ue": "", "en": ""}, {"nr": "N\u00b7s", "ch": "", "sa": "\u015br\u012b vishwananda gurudev", "ue": "", "en": ""}] });
  add({ id:"guru-arati", titel:"Guru \u0100rat\u012b", autor:"Abendgebet \u00b7 Sri Vitthal Dham", quelle:Q+" \u00b7 S. 28", hinweis:"Heft S. 28.", hinweisEn:"Booklet p. 28.", zeilen:[{"nr": "GA\u00b7a", "ch": "C   G   C", "sa": "\u0101nanda ma\u1e45gala k\u0101ru \u0101rat\u012b", "ue": "", "en": ""}, {"nr": "GA\u00b7a", "ch": "C   F   C", "sa": "hari guru santa k\u012b sev\u0101 ://", "ue": "", "en": ""}, {"nr": "GA\u00b7a", "ch": "C   G   F   C", "sa": "prema dhari mandira para \u0101vo ://", "ue": "", "en": ""}, {"nr": "GA\u00b7a", "ch": "C   F   C", "sa": "sundara sukhud\u0101 lev\u0101", "ue": "", "en": ""}, {"nr": "GA\u00b7b", "ch": "", "sa": "\u0101nanda ma\u1e45gala k\u0101ru \u0101rat\u012b", "ue": "", "en": ""}, {"nr": "GA\u00b7b", "ch": "", "sa": "hari guru santa k\u012b sev\u0101 ://", "ue": "", "en": ""}, {"nr": "GA\u00b7b", "ch": "", "sa": "mere \u0101ngane tulas\u012b ni kiy\u0101ro ://", "ue": "", "en": ""}, {"nr": "GA\u00b7b", "ch": "", "sa": "\u015b\u0101ligr\u0101ma k\u012b sev\u0101", "ue": "", "en": ""}, {"nr": "GA\u00b7c", "ch": "", "sa": "\u0101nanda ma\u1e45gala k\u0101ru \u0101rat\u012b", "ue": "", "en": ""}, {"nr": "GA\u00b7c", "ch": "", "sa": "hari guru santa k\u012b sev\u0101 ://", "ue": "", "en": ""}, {"nr": "GA\u00b7c", "ch": "", "sa": "arasathe t\u012bratha guruji ke cara\u1e47a me ://", "ue": "", "en": ""}, {"nr": "GA\u00b7c", "ch": "", "sa": "m\u0101ta pit\u0101 k\u012b sev\u0101", "ue": "", "en": ""}, {"nr": "GA\u00b7d", "ch": "", "sa": "\u0101nanda ma\u1e45gala k\u0101ru \u0101rat\u012b", "ue": "", "en": ""}, {"nr": "GA\u00b7d", "ch": "", "sa": "hari guru santa k\u012b sev\u0101 ://", "ue": "", "en": ""}, {"nr": "GA\u00b7d", "ch": "", "sa": "santa mile to maha sukha p\u0101ve ://", "ue": "", "en": ""}, {"nr": "GA\u00b7d", "ch": "", "sa": "guruji mile to meva", "ue": "", "en": ""}, {"nr": "GA\u00b7e", "ch": "", "sa": "\u0101nanda ma\u1e45gala k\u0101ru \u0101rat\u012b", "ue": "", "en": ""}, {"nr": "GA\u00b7e", "ch": "", "sa": "hari guru santa k\u012b sev\u0101 ://", "ue": "", "en": ""}, {"nr": "GA\u00b7e", "ch": "", "sa": "kahe prita\u1e41 tere bhakta janoke ://", "ue": "", "en": ""}, {"nr": "GA\u00b7e", "ch": "", "sa": "hari ke jana hari sev\u0101", "ue": "", "en": ""}, {"nr": "GA\u00b7f", "ch": "", "sa": "\u0101nanda ma\u1e45gala k\u0101ru \u0101rat\u012b", "ue": "", "en": ""}, {"nr": "GA\u00b7f", "ch": "", "sa": "hari guru santa k\u012b sev\u0101 ://", "ue": "", "en": ""}, {"nr": "GA\u00b7f", "ch": "C   F   C", "sa": "jaya jaya gurudeva k\u1e5bpa sindhu n\u0101tha ://", "ue": "", "en": ""}, {"nr": "GA\u00b7f", "ch": "C   G   C", "sa": "jaya jai \u015br\u012b Vishwananda priya pr\u0101\u1e47a n\u0101tha", "ue": "", "en": ""}, {"nr": "GA\u00b7g", "ch": "G   F   C", "sa": "jaya jaya gurudeva karun\u0101 s\u0101gara ://", "ue": "", "en": ""}, {"nr": "GA\u00b7g", "ch": "C   F   C", "sa": "jaya jai \u015br\u012b vishwananda prem\u0101vat\u0101ra ://", "ue": "", "en": ""}] });
  var EX=[["prem se bolo rukmin\u012b mah\u0101r\u0101\u1e47\u012b k\u012b... jai!","Sieg K\u00f6nigin Rukmin\u012b","victory to Queen Rukmini"],["prem se bolo pandarin\u0101tha mah\u0101r\u0101ja k\u012b... jai!","Sieg Pandarin\u0101tha","victory to Pandarinatha"]];
  ["closing-evening","closing-arati"].forEach(function(id){ var P=PRAYERS.find(function(p){ return p.id===id; }); if(!P) return;
    var z=P.zeilen, k=z.findIndex(function(r){ return /r\u0101dh\u0101 k\u1e5b\u1e63\u1e47a kanhaiya/.test(r.sa||""); });
    if(k<0 || z.some(function(r){ return /rukmin/.test(r.sa||""); })) return;
    z.splice(k+1, 0, { nr:z[k].nr, ch:"", sa:EX[0][0], ue:EX[0][1], en:EX[0][2] }, { nr:z[k].nr, ch:"", sa:EX[1][0], ue:EX[1][1], en:EX[1][2] }); });
})();
/* [Grok-Bot] V1.61: Taste "Alle" zeigt alle Prayers ohne Tagesfilter. */
/* [Grok-Bot] V1.60: Ablauf je Wochentag (Wochenuebersicht Prathana-Heft Version 10), Tagesauswahl, fehlende Gebete grau. */
/* [Grok-Bot] V1.58: Morgen- und Abendgebet vollstaendig wie im Heft (Astotram, Vaisnava Mantra, Ganesa und Gayatri vor dem Kavacam, Closing Prayers). */
/* [Grok-Bot] V1.53: Gruppen, Details-Taste und Erklaertexte in 6 Sprachen (DE EN FR ES RU HI). */
/* [Grok-Bot] V1.52: Prayer-Liste kompakt (nur Titel); Taste "Details" blendet Quellen ein, wird pro Geraet gemerkt.
   Liste gegliedert wie im Prathana-Heft: Morgengebet, Abendgebet, Weitere. Titel des laufenden Gebets steht ueber den Lyrics. Erklaertexte (Tooltip) fuer alle Tasten. Hinweise "Strophen wie im Heft ..." entfallen. */
(function(){
  var st=document.createElement("style");
  st.textContent="body:not(.menu-full) #btnDet{display:none!important}body:not(.show-det) .list .quelle{display:none}body:not(.show-det) .list{gap:4px}body:not(.show-det) .list .item{padding:5px 9px;min-height:30px;font-size:.92rem}@media(min-width:800px){body:not(.show-det) .list{grid-template-columns:repeat(4,1fr)}}.listbar{margin:8px 12px 0;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}.daybar{display:flex;gap:3px;flex-wrap:wrap}.daybar button{min-width:30px;padding:3px 6px}.daybar button.today{border-color:var(--gold)}.daybar button.on{background:var(--gold);color:#000}.list .item.miss{opacity:.45;cursor:default;font-style:italic}.list .grp{grid-column:1/-1;color:var(--gold);font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;margin:6px 2px 0}.list .grp:first-child{margin-top:0}#lyrTitle{margin:0 12px -4px;color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;font-size:1.15rem}#lyrTitle small{color:var(--muted);font-family:'Source Sans 3',sans-serif;font-size:.75rem;margin-left:.6em;letter-spacing:.04em}#lyrTitle:empty{display:none}.listbar button{padding:3px 9px;min-height:26px;font-size:.8rem;border-radius:6px}";
  document.head.appendChild(st);
  var on=false; try{ if(localStorage.getItem("bpp-det-v246")!=="1"){ localStorage.setItem("bpp-det","0"); localStorage.setItem("bpp-det-v246","1"); } on=localStorage.getItem("bpp-det")==="1"; }catch(e){} /* [Grok-Bot] V2.46: Standard aus, alter Zustand "an" einmalig zurueckgesetzt */
  document.body.classList.toggle("show-det", on);
  var list=document.getElementById("list"); if(!list) return;
  var bar=document.createElement("div"); bar.className="listbar";
  var b=document.createElement("button"); b.type="button"; b.id="btnDet";
  var LL=["de","en","fr","es","ru","hi"];
  function li(){ var k=(typeof lang==="undefined")?0:LL.indexOf(lang); return k<0?1:k; }
  function tr(a){ return a[li()]||a[1]; }
  var DET=[["Herkunft, Quellen","Origin, sources","Origine, sources","Origen, fuentes","Происхождение, источники","उत्पत्ति, स्रोत"],["Herkunft, Quellen aus","Hide origin, sources","Masquer origine, sources","Ocultar origen, fuentes","Скрыть источники","स्रोत छिपाएँ"]]; /* [Grok-Bot] V2.46: war "Details" */
  function lab(){ b.textContent=tr(on?DET[1]:DET[0]); b.classList.toggle("on", on); }
  b.onclick=function(){ on=!on; document.body.classList.toggle("show-det", on); try{ localStorage.setItem("bpp-det", on?"1":"0"); }catch(e){} lab(); };
  bar.appendChild(b); list.parentNode.insertBefore(bar, list); lab();
  /* [Grok-Bot] V1.60: Ablauf je Wochentag wie in der Wochenuebersicht des Prathana-Hefts (Version 10). Heute ist vorgewaehlt, andere Tage per Taste. Was noch nicht im Player ist, steht grau in der Liste. */
  var NM=["Morgengebet","Morning prayers","Prière du matin","Oración de la mañana","Утренняя молитва","प्रातः प्रार्थना"], NE=["Abendgebet","Evening prayers","Prière du soir","Oración de la tarde","Вечерняя молитва","सायं प्रार्थना"];
  var DAYS=[["Montag","Monday","Lundi","Lunes","\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a","\u0938\u094b\u092e\u0935\u093e\u0930"],["Dienstag","Tuesday","Mardi","Martes","\u0412\u0442\u043e\u0440\u043d\u0438\u043a","\u092e\u0902\u0917\u0932\u0935\u093e\u0930"],["Mittwoch","Wednesday","Mercredi","Mi\u00e9rcoles","\u0421\u0440\u0435\u0434\u0430","\u092c\u0941\u0927\u0935\u093e\u0930"],["Donnerstag","Thursday","Jeudi","Jueves","\u0427\u0435\u0442\u0432\u0435\u0440\u0433","\u0917\u0941\u0930\u0941\u0935\u093e\u0930"],["Freitag","Friday","Vendredi","Viernes","\u041f\u044f\u0442\u043d\u0438\u0446\u0430","\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930"],["Samstag","Saturday","Samedi","S\u00e1bado","\u0421\u0443\u0431\u0431\u043e\u0442\u0430","\u0936\u0928\u093f\u0935\u093e\u0930"],["Sonntag","Sunday","Dimanche","Domingo","\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435","\u0930\u0935\u093f\u0935\u093e\u0930"]];
  var MISS={ "guru-bhajan":"Guru Bhajan", "vedic-fr":"Vedic chanting: \u015ar\u012b S\u016bktam, Bh\u016b S\u016bktam, N\u012bl\u0101 S\u016bktam", "vedic-sa":"Vedic chanting: Puru\u1e63a S\u016bktam, Vi\u1e63\u1e47u Sahasran\u0101ma, N\u0101r\u0101ya\u1e47a S\u016bktam", "durga":"\u015ar\u012b Durg\u0101 C\u0101l\u012bs\u0101", "vchalisa":"Paramahamsa Vishwananda Chalisa", "gita":"Bhagavad G\u012bt\u0101", "ghalin":"Ghalin Lot\u0101nga\u1e47", "panduranga":"P\u0101\u1e47\u1e0dura\u1e45ga A\u1e63\u1e6dakam", "sv-arati":"Paramahamsa \u015ar\u012b Sv\u0101m\u012b Vishwananda \u0100rat\u012b", "lakshmi-ashtakam":"Mah\u0101 Lak\u1e63m\u012b A\u1e63\u1e6dakam", "sayana":"\u015ayana \u0100rat\u012b" }; /* [Grok.com] fehlende Titel aus dem Inhaltsverzeichnis, ohne vedische Gesaenge */
  var NOTYET=["noch nicht im Player","not in the player yet","pas encore dans le lecteur","a\u00fan no est\u00e1 en el reproductor","\u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0432 \u043f\u043b\u0435\u0435\u0440\u0435","\u0905\u092d\u0940 \u092a\u094d\u0932\u0947\u092f\u0930 \u092e\u0947\u0902 \u0928\u0939\u0940\u0902"];
  var ALL=["Alle","All","Tous","Todos","\u0412\u0441\u0435","\u0938\u092d\u0940"];
  function plan(d){
    if(d<0){ var seen={}, ids=[], skip=[]; PRAYERS.forEach(function(p){ var k=String(p.titel||"").trim().toLowerCase(); if(seen[k]) skip.push(p.id); else { seen[k]=1; ids.push(p.id); } }); return [ { n:ALL, ids:ids, skip:skip, all:true } ]; }
    var m=["guru-stotram","~guru-bhajan","ashtotram","vaishnava-mantra","guruji-gayatri","gayatri","ganesha-mantra","suprabhatam","govinda"];
    if(d<=3) m=m.concat(["narasimha","ramanuja","vishnu-arati","closing-morning"]);
    else if(d===4) m=m.concat(["~vedic-fr","narasimha","ramanuja","lakshmi-arati","closing-morning"]);
    else if(d===5) m=m.concat(["~vedic-sa","narasimha","ramanuja","vishnu-arati","closing-morning"]);
    else m=m.concat(["kavacham","narasimha","hanuman","ramanuja","vishnu-arati","closing-arati"]);
    var e;
    if(d===6) e=["~ghalin","saprem","closing-arati","~panduranga","~gita"];
    else { e=["guru-stotram-abend","ashtotram-abend","ganesha-mantra","gayatri","kavacham","narasimha-abend","hanuman","~sv-arati","closing-evening","saprem","closing-arati"]; }
    var more=["vchalisa","~durga","~panduranga","~lakshmi-ashtakam","hanuman-bhavani","giridhari-arati","guru-arati","lakshmi-arati","~sayana"]; /* [Grok.com] Weitere und andere Aratis, Heft S. 33 und 43 */
    return [ { n:NM, ids:m }, { n:NE, ids:e, late:d===6 }, { n:["Weitere","More","Autres","Otros","Другие","अन्य"], ids:more } ];
  }
  var day=(new Date().getDay()+6)%7, GROUPS=plan(day);
  var dbar=document.createElement("div"); dbar.className="daybar";
  DAYS.forEach(function(D,k){ var x=document.createElement("button"); x.type="button"; x.setAttribute("data-d",k); x.onclick=function(){ day=k; GROUPS=plan(day); if(typeof window.paintList==="function") window.paintList(); else regroup(); }; dbar.appendChild(x); });
  (function(){ var x=document.createElement("button"); x.type="button"; x.setAttribute("data-d","-1"); x.onclick=function(){ day=-1; GROUPS=plan(day); if(typeof window.paintList==="function") window.paintList(); else regroup(); }; dbar.appendChild(x); })();
  bar.insertBefore(dbar, b);
  function dayLab(){ var today=(new Date().getDay()+6)%7; dbar.querySelectorAll("button").forEach(function(x){ var k=+x.getAttribute("data-d"); x.textContent=k<0?tr(ALL):tr(DAYS[k]).slice(0,2); x.title=k<0?tr(ALL):tr(DAYS[k]); x.classList.toggle("on", k===day); x.classList.toggle("today", k===today); }); }
  function regroup(){
    var btns=Array.prototype.slice.call(list.querySelectorAll("button.item"));
    if(btns.length!==PRAYERS.length) return;
    var used={}, frag=document.createDocumentFragment();
    function head(t){ var h=document.createElement("div"); h.className="grp"; h.textContent=t; frag.appendChild(h); }
    function put(idx){
      var b0=btns[idx], node=b0;
      if(used[idx]){ node=b0.cloneNode(true); }
      node.onclick=function(){ play(idx, true); };
      node.setAttribute("data-i", idx); var Pq=PRAYERS[idx]; if(Pq && !Pq.audio && !Pq.youtube) node.classList.add("noaud"); else node.classList.remove("noaud");
      used[idx]=true; frag.appendChild(node);
    }
    GROUPS.forEach(function(G){
      head(G.all?tr(G.n):tr(G.n)+" \u00b7 "+tr(DAYS[day])+(G.late?" \u00b7 21:00":""));
      G.ids.forEach(function(id){
        if(id.charAt(0)==="~"){ var mx=document.createElement("div"); mx.className="item miss"; mx.textContent=MISS[id.slice(1)]||id.slice(1); mx.title=tr(NOTYET); frag.appendChild(mx); return; }
        var idx=PRAYERS.findIndex(function(p){ return p.id===id; }); if(idx>=0) put(idx); });
    });
    GROUPS.forEach(function(G){ (G.skip||[]).forEach(function(id){ var k=PRAYERS.findIndex(function(p){ return p.id===id; }); if(k>=0) used[k]=true; }); });
    var rest=[]; PRAYERS.forEach(function(p, idx){ if(!used[idx]) rest.push(idx); });
    rest=rest.filter(function(idx){ var id=PRAYERS[idx] && PRAYERS[idx].id; return id!=="ashtotram" && id!=="ashtotram-abend" && id!=="hanuman-bhavani"; }); /* [Grok.com] nicht noch einmal unter Weitere */
    if(rest.length){ head(tr(["Weitere","More","Autres","Otros","Другие","अन्य"])); rest.forEach(put); }
    list.innerHTML=""; list.appendChild(frag);
    dayLab(); title(); if(window.__ldPaint) window.__ldPaint();
  }
  var tt=document.createElement("div"); tt.id="lyrTitle";
  var stg=document.getElementById("stage"); if(stg) stg.parentNode.insertBefore(tt, stg);
  function title(){
    if(typeof i==="undefined" || i<0 || !PRAYERS[i]){ tt.textContent=""; return; }
    var P=PRAYERS[i], grp="";
    GROUPS.forEach(function(G){ if(!grp && !G.all && G.ids.indexOf(P.id)>=0) grp=tr(G.n); });
    tt.innerHTML="";
    tt.appendChild(document.createTextNode(P.titel));
    if(grp){ var sm=document.createElement("small"); sm.textContent=grp; tt.appendChild(sm); }
  }
  var TIPS={
    btnPlay:["Abspielen / Pause (Leertaste)","Play / pause (Space)","Lecture / pause (barre d'espace)","Reproducir / pausa (barra espaciadora)","Воспроизвести / пауза (пробел)","चलाएँ / रोकें (स्पेस)"],
    btnPrev:["Eine Strophe zurück (Taste V)","One stanza back (key V)","Strophe précédente (touche V)","Estrofa anterior (tecla V)","Предыдущая строфа (клавиша V)","पिछला श्लोक (कुंजी V)"],
    btnNext:["Nächste Strophe (Taste N). Bei laufendem Ton: hier beginnt die Strophe, wird gemerkt","Next stanza (key N). While playing: the stanza starts here, remembered","Strophe suivante (touche N). Pendant la lecture : la strophe commence ici, c'est mémorisé","Estrofa siguiente (tecla N). Durante la reproducción: la estrofa empieza aquí, se recuerda","Следующая строфа (клавиша N). Во время звучания: строфа начинается здесь, запоминается","अगला श्लोक (कुंजी N)। चलते समय: श्लोक यहाँ से शुरू होता है, याद रखा जाता है"],
    btnAuto:["Automatisch mitscrollen, die Lyrics folgen der Aufnahme","Scroll automatically with the recording","Défilement automatique, le texte suit l'enregistrement","Desplazamiento automático, el texto sigue la grabación","Автопрокрутка, текст следует за записью","अपने आप स्क्रॉल, पाठ रिकॉर्डिंग के साथ चलता है"],
    btnScDown:["Autoscroll langsamer","Auto scroll slower","Défilement plus lent","Desplazamiento más lento","Прокрутка медленнее","स्क्रॉल धीमा"],
    btnScUp:["Autoscroll schneller","Auto scroll faster","Défilement plus rapide","Desplazamiento más rápido","Прокрутка быстрее","स्क्रॉल तेज़"],
    btnAna:["Strophenanfänge aus der Aufnahme ermitteln, danach mit N nachkorrigieren","Find stanza starts in the recording, then correct with N","Détecter les débuts de strophe dans l'enregistrement, puis corriger avec N","Detectar el inicio de cada estrofa en la grabación y corregir con N","Найти начала строф в записи, затем поправить клавишей N","रिकॉर्डिंग में श्लोकों की शुरुआत खोजें, फिर N से सुधारें"],
    btnDe:["Übersetzung unter den Versen ein / aus","Show / hide translation below the verses","Afficher / masquer la traduction sous les vers","Mostrar / ocultar la traducción bajo los versos","Показать / скрыть перевод под стихами","श्लोकों के नीचे अनुवाद दिखाएँ / छिपाएँ"],
    btnCh:["Akkorde über den Versen ein / aus","Show / hide chords above the verses","Afficher / masquer les accords au-dessus des vers","Mostrar / ocultar los acordes sobre los versos","Показать / скрыть аккорды над стихами","श्लोकों के ऊपर कॉर्ड दिखाएँ / छिपाएँ"],
    btnXpDown:["Akkorde einen Halbton tiefer","Chords one semitone down","Accords un demi-ton plus bas","Acordes un semitono más bajo","Аккорды на полтона ниже","कॉर्ड आधा सुर नीचे"],
    btnXpUp:["Akkorde einen Halbton höher","Chords one semitone up","Accords un demi-ton plus haut","Acordes un semitono más alto","Аккорды на полтона выше","कॉर्ड आधा सुर ऊपर"],
    btnXpZero:["Originaltonart wie im Heft","Original key as in the booklet","Tonalité d'origine comme dans le livret","Tonalidad original como en el cuadernillo","Исходная тональность, как в брошюре","पुस्तिका जैसा मूल सुर"],
    btnLangDe:["Bedienung und Übersetzung auf Deutsch","Controls and translation in German","Interface et traduction en allemand","Controles y traducción en alemán","Интерфейс и перевод на немецком","नियंत्रण और अनुवाद जर्मन में"],
    btnLangEn:["Bedienung und Übersetzung auf Englisch","Controls and translation in English","Interface et traduction en anglais","Controles y traducción en inglés","Интерфейс и перевод на английском","नियंत्रण और अनुवाद अंग्रेज़ी में"],
    btnLangFr:["Bedienung und Übersetzung auf Französisch","Controls and translation in French","Interface et traduction en français","Controles y traducción en francés","Интерфейс и перевод на французском","नियंत्रण और अनुवाद फ़्रेंच में"],
    btnLangEs:["Bedienung und Übersetzung auf Spanisch","Controls and translation in Spanish","Interface et traduction en espagnol","Controles y traducción en español","Интерфейс и перевод на испанском","नियंत्रण और अनुवाद स्पेनिश में"],
    btnLangRu:["Bedienung und Übersetzung auf Russisch","Controls and translation in Russian","Interface et traduction en russe","Controles y traducción en ruso","Интерфейс и перевод на русском","नियंत्रण और अनुवाद रूसी में"],
    btnLangHi:["Bedienung und Übersetzung auf Hindi","Controls and translation in Hindi","Interface et traduction en hindi","Controles y traducción en hindi","Интерфейс и перевод на хинди","नियंत्रण और अनुवाद हिन्दी में"],
    btnDet:["Quelle und Fortsetzungsstelle in der Liste ein / aus","Show / hide source and resume point in the list","Afficher / masquer la source et le point de reprise dans la liste","Mostrar / ocultar la fuente y el punto de reanudación en la lista","Показать / скрыть источник и место продолжения в списке","सूची में स्रोत और जारी रखने का स्थान दिखाएँ / छिपाएँ"]
  };
  function tips(){
    Object.keys(TIPS).forEach(function(id){ var e=document.getElementById(id); if(e) e.title=tr(TIPS[id]); });
  }
  window.bppTips=tips;
  var NOHINT=/^(Jede Strophe|Strophen|Zeilen wie im|Stanzas as in|Each verse in)/;
  PRAYERS.forEach(function(P){ ["hinweis","hinweisDe","hinweisEn"].forEach(function(k){ if(NOHINT.test(String(P[k]||""))) P[k]=""; }); });
  document.addEventListener("DOMContentLoaded", function(){
    var pl=window.paintList; if(typeof pl==="function"){ window.paintList=function(){ pl.apply(this, arguments); regroup(); }; }
    regroup();
    var orig=window.applyUI; if(typeof orig==="function"){ window.applyUI=function(){ orig.apply(this, arguments); lab(); tips(); }; } lab(); tips(); });
})();
/* [Grok-Bot] V1.61: Versionsanzeige. */
document.addEventListener("DOMContentLoaded", function(){ setTimeout(function(){ var v=document.querySelector("h1 .ver"); if(v) v.textContent="V1.63"; document.title="Bhakti Prayers Player V1.63"; }, 0); });
/* [Grok-Bot] V1.61: Sprachauswahl als kleines Dropdown statt sechs Tasten. Die alten Tasten bleiben unsichtbar im Seitenaufbau, damit vorhandene Funktionen weiterlaufen. */
document.addEventListener("DOMContentLoaded", function(){
  var L=[["de","DE","Deutsch"],["en","EN","English"],["fr","FR","Fran\u00e7ais"],["es","ES","Espa\u00f1ol"],["ru","RU","\u0420\u0443\u0441\u0441\u043a\u0438\u0439"],["hi","HI","\u0939\u093f\u0928\u094d\u0926\u0940"]];
  var first=document.getElementById("btnLangDe"); if(!first || typeof setLang!=="function") return;
  var st=document.createElement("style"); st.textContent="#langSel{font-size:.75rem;padding:1px 2px;height:24px;border-radius:6px;background:transparent;color:inherit;border:1px solid var(--muted,#888);cursor:pointer}#langSel option{color:#000}.lang-hidden{display:none!important}";
  document.head.appendChild(st);
  var s=document.createElement("select"); s.id="langSel";
  L.forEach(function(x){ var o=document.createElement("option"); o.value=x[0]; o.textContent=x[1]; o.title=x[2]; s.appendChild(o); });
  first.parentNode.insertBefore(s, first);
  L.forEach(function(x){ var e=document.getElementById("btnLang"+x[1].charAt(0)+x[1].charAt(1).toLowerCase()); if(e) e.classList.add("lang-hidden"); });
  function sync(){ try{ if(typeof lang!=="undefined") s.value=lang; }catch(e){} var k=L.findIndex(function(x){ return x[0]===s.value; }); s.title=k>=0?L[k][2]:""; }
  s.onchange=function(){ setLang(s.value); sync(); };
  var orig=window.applyUI; if(typeof orig==="function"){ window.applyUI=function(){ orig.apply(this, arguments); sync(); }; }
  sync();
});

/* [Grok-Bot] V1.63: Ashtotram-Aufnahme + Mini-Ladebalken in der Liste */
(function(){
  try{ var P=PRAYERS.find(function(p){ return p.id==="ashtotram"; }); if(P && !P.audio) P.audio="https://www.dropbox.com/scl/fo/9jrivp0fkl4bfo9t0dejx/AH5jHUcyt3nRMmAxFO4M2V8/Sri%20Swami%20Vishwananda%20Ashtotram.mp3?rlkey=s8lox2d2652b2i133h1jjty3k&dl=1"; }catch(e){}
  var css=document.createElement("style");
  css.textContent=".item{position:relative}"+
    ".item .ldb{display:inline-block;vertical-align:middle;margin-left:8px;width:46px;height:5px;border-radius:3px;background:rgba(127,127,127,.25);overflow:hidden;position:relative}"+
    ".item .ldb i{display:block;height:100%;width:0;background:#e0a030;border-radius:3px;transition:width .3s}"+
    ".item .ldb.ind i{width:30%;position:absolute;animation:ldmv 1s linear infinite}"+
    "@keyframes ldmv{from{left:-30%}to{left:100%}}"+
    ".item .ldp{font-size:10px;opacity:.7;margin-left:4px;vertical-align:middle}"+
    ".item.noaud::after{content:'\\1F507';font-size:11px;opacity:.55;margin-left:6px}";
  document.head.appendChild(css);
  var NOA=["Noch keine Aufnahme","No recording yet","Pas encore d'enregistrement","Aún sin grabación","Записи пока нет","अभी रिकॉर्डिंग नहीं"];
  var LANGS=["de","en","fr","es","ru","hi"];
  var st={on:false,pct:0,ind:true};
  function aud(){ return window.a || document.getElementById("a"); }
  function calc(){
    var A=aud(); if(!A) return;
    var d=A.duration, p=0, ind=true;
    if(d && isFinite(d) && d>0){ ind=false;
      try{ var b=A.buffered, t=A.currentTime||0, e=0;
        for(var k=0;k<b.length;k++){ if(b.start(k)<=t+1 && b.end(k)>e) e=b.end(k); }
        if(!e && b.length) e=b.end(b.length-1);
        p=Math.max(0,Math.min(100,Math.round(e/d*100))); }catch(x){}
    }
    var on=!!A.currentSrc && (ind || p<99) && !A.error;
    if(on===st.on && p===st.pct && ind===st.ind) return;
    st.pct=p; st.ind=ind; st.on=on; paint();
  }
  function paint(){
    var list=document.getElementById("list"); if(!list) return;
    var old=list.querySelectorAll(".ldb,.ldp"); for(var k=0;k<old.length;k++) old[k].remove();
    var li=(LANGS.indexOf(window.lang)>=0)?LANGS.indexOf(window.lang):0;
    var nb=list.querySelectorAll(".item.noaud"); for(var k=0;k<nb.length;k++) nb[k].title=NOA[li];
    if(!st.on) return;
    var P=PRAYERS[window.i]; if(!P || !P.audio) return;
    var bs=list.querySelectorAll('.item[data-i="'+window.i+'"]');
    for(var k=0;k<bs.length;k++){
      var q=bs[k].querySelector(".quelle");
      var bar=document.createElement("span"); bar.className="ldb"+(st.ind?" ind":""); bar.innerHTML="<i></i>";
      if(!st.ind) bar.firstChild.style.width=st.pct+"%";
      var pc=document.createElement("span"); pc.className="ldp"; pc.textContent=st.ind?"…":st.pct+"%";
      if(q){ bs[k].insertBefore(bar,q); bs[k].insertBefore(pc,q); } else { bs[k].appendChild(bar); bs[k].appendChild(pc); }
    }
  }
  window.__ldPaint=paint;
  function init(){
    var A=aud(); if(!A) return;
    A.addEventListener("loadstart",function(){ st.on=true; st.pct=0; st.ind=true; paint(); });
    ["progress","loadedmetadata","durationchange","canplay","canplaythrough","playing","waiting","seeked","timeupdate"].forEach(function(ev){ A.addEventListener(ev,calc); });
    A.addEventListener("error",function(){ st.on=false; paint(); });
    A.addEventListener("emptied",function(){ st.on=false; paint(); });
    paint();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){ setTimeout(init,0); }); else init();
})();
