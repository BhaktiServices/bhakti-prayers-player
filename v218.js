/* [Grok.com] V2.19: Versionsanzeige bleibt stehen. Aeltere Skripte haben V2.16 wieder ueberschrieben.
   Abend-Guru-Stotram: alte MP3 mit Om (ueber 258 s) springt auf 10,7 s. */
window.BPP_SHOW="2.21"; window.BPP_BUILD="2.21"; /* [Grok.com] */ /* [Grok-Bot] V2.20: kein Rueckschritt hinter neuere Version */
window.BPP_SW="sw.js?v=218";
(function(){
  if(window.bppV218) return; window.bppV218=1;
  function showV(){ /* [Grok-Bot] V2.20: Anzeige folgt window.BPP_SHOW (neuester Stand), sonst V2.19 */
    var s="V"+(window.BPP_SHOW||"2.21"), v=document.querySelector("h1 .ver");
    if(v && v.textContent!==s) v.textContent=s;
    if(document.title!=="Bhakti Prayers Player "+s) document.title="Bhakti Prayers Player "+s;
  }
  showV();
  setInterval(showV, 400);
  var FILE="audio/guru-stotram-abend3.mp3?v=219"; /* [Grok-Bot] V2.20: gleiche Datei wie order.js, kein Hin- und Herschalten */
  function point(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="guru-stotram-abend"; });
    if(!P) return;
    P.audio=FILE; P.audioAlt=[FILE]; P.preferFile=true;
  }
  function skipOm(){
    if(typeof i==="undefined" || i<0 || !PRAYERS[i] || PRAYERS[i].id!=="guru-stotram-abend") return;
    if(typeof ytOn!=="undefined" && ytOn) return;
    var el=document.getElementById("a"); if(!el) return;
    if(isFinite(el.duration) && el.duration>258 && (el.currentTime||0)<10.5){ try{ el.currentTime=10.7; }catch(e){} }
  }
  point();
  setInterval(function(){ point(); skipOm(); }, 500);
  var el=document.getElementById("a");
  if(el) ["loadedmetadata","play","playing"].forEach(function(ev){ el.addEventListener(ev, skipOm); });
  try{ if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js?v=218", {scope:"./"}).catch(function(){}); /* [Grok-Bot] V3.41 offline still */ }catch(e){}
})();
