/* [Grok-Bot] V3.22: Nrsimha Kavaca Strophe 30-32: seit V2.51 (30 -> 30/31/32 geteilt) stand die ganze Uebersetzung nur bei 30, 31 und 32 waren leer.
   Uebersetzung (EN Ausgangstext, alle 6 Sprachen) passend zu den Sanskritzeilen aufgeteilt:
   30 garjantam ... tapayantam | 31 divi bhuvi ... disi disi satantam | 32 samharantam bharantam ... divya simham namami */
window.BPP_BUILD="3.22"; window.BPP_SHOW="3.22";
(function(){
  var S={
   en:["Lord Nṛsiṁha roars loudly and causes others to roar. With His multitudes of arms He tears the demons asunder and kills them in this way.",
       "He is always seeking out and tormenting the demoniac descendants of Diti, both on this earth planet and in the higher planets, and He throws them down and scatters them. He cries with great anger as He destroys the demons in all directions.",
       "Yet with His unlimited hands He sustains, protects, and nourishes the cosmic manifestation. I offer my respectful obeisances to the Lord, who has assumed the form of a transcendental lion."],
   ue:["Śrī Nṛsiṁha brüllt laut und lässt andere brüllen. Mit Seinen vielen Armen reißt Er die Dämonen auseinander und tötet sie auf diese Weise.",
       "Stets spürt Er die dämonischen Nachkommen Ditis auf und peinigt sie, sowohl auf diesem Erdplaneten als auch auf den höheren Planeten, und Er wirft sie nieder und zerstreut sie. Er schreit vor großem Zorn, während Er die Dämonen in allen Richtungen vernichtet.",
       "Und doch erhält, beschützt und nährt Er mit Seinen unbegrenzten Händen die kosmische Schöpfung. Ich bringe dem Herrn, der die Gestalt eines transzendentalen Löwen angenommen hat, meine achtungsvollen Ehrerbietungen dar."],
   fr:["Le Seigneur Nṛsiṁha rugit puissamment et fait rugir les autres. De Ses innombrables bras, Il met les démons en pièces et les tue ainsi.",
       "Sans cesse, Il traque et tourmente les descendants démoniaques de Diti, aussi bien sur cette planète Terre que sur les planètes supérieures, et Il les abat et les disperse. Il pousse des cris de grande colère tandis qu'Il détruit les démons dans toutes les directions.",
       "Et pourtant, de Ses mains illimitées, Il soutient, protège et nourrit la manifestation cosmique. J'offre mes respectueux hommages au Seigneur, qui a pris la forme d'un lion transcendantal."],
   es:["El Señor Nṛsiṁha ruge con fuerza y hace rugir a los demás. Con Sus multitudes de brazos despedaza a los demonios y así los mata.",
       "Siempre está buscando y atormentando a los descendientes demoníacos de Diti, tanto en este planeta Tierra como en los planetas superiores, y los derriba y los dispersa. Grita con gran ira mientras destruye a los demonios en todas las direcciones.",
       "Sin embargo, con Sus manos ilimitadas sustenta, protege y nutre la manifestación cósmica. Ofrezco mis respetuosas reverencias al Señor, que ha adoptado la forma de un león trascendental."],
   ru:["Господь Нрисимха громко рычит и заставляет рычать других. Множеством Своих рук Он разрывает демонов на части и так убивает их.",
       "Он неустанно выискивает и терзает демонических потомков Дити — как на этой планете Земля, так и на высших планетах, — низвергает их и рассеивает. Он кричит в великом гневе, уничтожая демонов во всех направлениях.",
       "И всё же Своими безграничными руками Он поддерживает, защищает и питает космическое проявление. Я в почтении склоняюсь перед Господом, принявшим облик трансцендентного льва."],
   hi:["भगवान नृसिंह उच्च स्वर में गर्जना करते हैं और दूसरों को भी गर्जना कराते हैं। अपनी असंख्य भुजाओं से वे असुरों को चीर डालते हैं और इस प्रकार उनका वध करते हैं।",
       "वे इस पृथ्वी-लोक तथा उच्चतर लोकों में दिति की आसुरी सन्तानों को सदा खोजते और पीड़ित करते रहते हैं, उन्हें नीचे पटकते और तितर-बितर कर देते हैं। सब दिशाओं में असुरों का संहार करते हुए वे महान क्रोध से गर्जते हैं।",
       "फिर भी अपने असीम हाथों से वे ब्रह्माण्डीय सृष्टि का पालन, रक्षण और पोषण करते हैं। दिव्य सिंह का रूप धारण करने वाले उन भगवान को मैं सादर प्रणाम करता हूँ।"]};
  S.de=S.ue;
  function apply(){
    if(typeof PRAYERS==="undefined") return false;
    var K=PRAYERS.find(function(p){ return p.id==="kavacham"; }); if(!K||!K.zeilen) return false;
    var a=K.zeilen.findIndex(function(z){ return /^garjantaṁ/.test(z.sa||""); }); if(a<0) return false;
    var b=K.zeilen[a+1], c=K.zeilen[a+2];
    if(!b||!c||!/^divi bhuvi/.test(b.sa||"")||!/^saṁ-harantaṁ/.test(c.sa||"")) return false;
    if(K.zeilen[a].en===S.en[0]&&b.en===S.en[1]&&c.en===S.en[2]) return false;
    [K.zeilen[a],b,c].forEach(function(z,k){ ["en","ue","fr","es","ru","hi"].forEach(function(l){ z[l]=S[l][k]; }); if("de" in z) z.de=S.de[k]; });
    return true;
  }
  function run(){ try{ if(apply()&&typeof i!=="undefined"&&PRAYERS[i]&&PRAYERS[i].id==="kavacham"&&typeof paintLyrics==="function") paintLyrics(); }catch(e){} }
  run(); setTimeout(run,600); setInterval(run,1500);
})();
