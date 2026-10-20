/* [Grok.com] Jukebox genau einmal: von klein gross, dann weg. Kein zweites Bild in der Seite. */
(function(){
  if(document.getElementById("startPic")) return;
  /* [Grok-Bot] V3.59: Jukebox (altes Bild mit alter Gebetsliste) nur beim ersten Aufruf pro Sitzung, nicht bei F5/Neuladen */
  try{ if(sessionStorage.getItem("bpp-jb359")){ document.body.classList.add("player-in"); return; } sessionStorage.setItem("bpp-jb359","1"); }catch(e){}
  var st=document.createElement("style");
  st.textContent="#startPic{position:fixed;inset:0;z-index:40;margin:0;background:#1a120c;display:flex;align-items:center;justify-content:center}"
    +"#startPic img{width:min(92vw,900px);max-height:92vh;object-fit:contain;border:0;border-radius:12px;transform:scale(.12);transition:transform 1.35s cubic-bezier(.2,.8,.2,1)}"
    +"#startPic.zoom img{transform:scale(1)}"
    +"body.player-in #startPic{opacity:0;pointer-events:none;transition:opacity .7s ease}";
  document.head.appendChild(st);
  var fig=document.createElement("figure");
  fig.id="startPic"; fig.className="startpic";
  fig.innerHTML='<img src="start.jpg?v=1" alt="Bhakti Prayers Player">';
  document.body.appendChild(fig);
  var gone=false;
  function reveal(){
    if(gone) return; gone=true;
    document.body.classList.add("player-in");
    setTimeout(function(){ var p=document.getElementById("startPic"); if(p) p.remove(); }, 750);
  }
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ fig.classList.add("zoom"); }); });
  setTimeout(reveal, 2700); /* [Grok-Bot] V2.47: Jukebox steht nach dem Zoom gut 1 s allein */
  window.addEventListener("keydown", reveal, {once:true});
  window.addEventListener("pointerdown", reveal, {once:true});
})();
