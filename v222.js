/* [Grok.com] YouTube von Bhakti Marga Music, Kanal BhaktiMargaMusic108, Album Prathana.
   Nur wo noch kein youtube steht. Vorhandene Links bleiben. Datei bleibt erste Quelle, YouTube Ersatz. */
(function(){
  var MAP={
    "guru-stotram":"JT-ETKpWDaM",
    "ashtotram":"6xBPoif54KA",
    "ashtotram-abend":"N8CJO_Dil6s",
    "vaishnava-mantra":"QjYfK3u6rbs",
    "guruji-gayatri":"ygJImEHBaRY",
    "ganesha-mantra":"3o0m26wolWQ",
    "gayatri":"3rhnsvw2xQk",
    "suprabhatam":"VlqY4h-B6X8",
    "ramanuja":"Cvu0Za00G6M",
    "vishnu-arati":"YW1biHAjCL8",
    "closing-morning":"xO1I_QYtNWs",
    "guru-stotram-abend":"VMigesWTSuc",
    "kavacham":"DA03CHVJKzA",
    "vchalisa":"YkvY4YD3DtM",
    "bhajare":"A4JcViRiWvE",
    "closing-evening":"l7MBiAy73dA",
    "closing-arati":"l7MBiAy73dA"
  };
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    PRAYERS.forEach(function(P){
      if(P.youtube || (P.id==="vchalisa" && window.bppV490)) return;
      if(MAP[P.id]) P.youtube=MAP[P.id];
    });
  }
  apply();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", apply);
  setTimeout(apply, 600);
})();
