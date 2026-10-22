/* [Grok-Bot] V3.41: Knopf "Als App installieren" unter den Lyrics (neben "Prayers runterladen", Standard-Stil, Gold nur beim Tippen-Hinweis).
   Chrome/Edge/Android: beforeinstallprompt abfangen, beim Tippen prompt(). iOS/iPadOS Safari: Hinweis "Teilen -> Zum Home-Bildschirm".
   Andere Browser ohne Installations-Dialog (z.B. Firefox): Hinweis auf das Browser-Menue. Ausgeblendet, wenn die App schon als App laeuft. */
window.BPP_BUILD="3.87"; window.BPP_SHOW="3.87";
(function(){
  if(window.bppV341) return; window.bppV341=1;
  var deferred=null, installed=false;
  var T={
    de:{b:"Als App installieren",t:"Player auf den Startbildschirm legen (eigenes Fenster, offline nutzbar)",
        ios:"iPhone/iPad: In Safari unten (bzw. oben) auf <b>Teilen</b> <span style='font-size:1.1em'>⎋</span> tippen, dann <b>„Zum Home-Bildschirm“</b>. Danach den Player über das neue Symbol öffnen und einmal „Prayers runterladen“.",
        oth:"Dieser Browser bietet keinen Installations-Dialog an. Im Browser-Menü <b>„App installieren“</b> bzw. <b>„Zum Startbildschirm hinzufügen“</b> wählen (Chrome, Edge, Samsung Internet). Firefox am Computer kann keine Apps installieren; die Seite läuft dort trotzdem offline.",
        ok:"OK"},
    en:{b:"Install as app",t:"Put the player on your home screen (own window, works offline)",
        ios:"iPhone/iPad: in Safari tap <b>Share</b> <span style='font-size:1.1em'>⎋</span>, then <b>“Add to Home Screen”</b>. Then open the player from the new icon and tap “Download prayers” once.",
        oth:"This browser offers no install dialog. Use the browser menu: <b>“Install app”</b> or <b>“Add to Home screen”</b> (Chrome, Edge, Samsung Internet). Firefox on desktop cannot install apps; the page still works offline there.",
        ok:"OK"}
  };
  function L(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?T[l]:T.en; }
  function standalone(){ try{ return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || window.navigator.standalone===true; }catch(e){ return false; } }
  function isIOS(){ var u=navigator.userAgent||""; return /iPad|iPhone|iPod/.test(u) || (navigator.platform==="MacIntel" && navigator.maxTouchPoints>1); }
  window.addEventListener("beforeinstallprompt", function(e){ e.preventDefault(); deferred=e; sync(); });
  window.addEventListener("appinstalled", function(){ installed=true; deferred=null; sync(); });
  var css=document.createElement("style");
  css.textContent="#btnInstall{display:inline-flex;align-items:center;gap:6px;margin:0;font:inherit;font-size:.9rem;padding:6px 12px;min-height:32px;cursor:pointer}"+
    "#bppInstHint{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;width:min(92vw,460px);box-sizing:border-box;padding:14px 16px;border-radius:14px;"+
    "background:#16254C;color:#fff;border:1px solid rgba(255,255,255,.18);box-shadow:0 8px 30px rgba(0,0,0,.45);font-size:.95rem;line-height:1.45}"+
    "#bppInstHint button{margin-top:10px;float:right;padding:4px 16px;min-height:30px;cursor:pointer}";
  document.head.appendChild(css);
  function hint(html){
    var h=document.getElementById("bppInstHint"); if(h) h.remove();
    h=document.createElement("div"); h.id="bppInstHint"; h.setAttribute("role","dialog");
    h.innerHTML="<div>"+html+"</div><button type='button'>"+L().ok+"</button><div style='clear:both'></div>";
    h.querySelector("button").onclick=function(){ h.remove(); };
    document.body.appendChild(h); setTimeout(function(){ if(h.parentNode) h.remove(); }, 20000);
  }
  function click(e){
    e.preventDefault(); e.stopPropagation();
    if(deferred){ var d=deferred; deferred=null; d.prompt(); (d.userChoice||Promise.resolve()).then(function(c){ if(c&&c.outcome==="accepted") installed=true; sync(); }); return; }
    hint(isIOS()?L().ios:L().oth);
  }
  function sync(){
    var b=document.getElementById("btnInstall"); if(!b) return;
    var hide=standalone()||installed; if(b.style.display!==(hide?"none":"")) b.style.display=hide?"none":"";
    var l=L(); if(b.textContent!==l.b){ b.textContent=l.b; } b.title=l.t;
  }
  function build(){
    if(document.getElementById("btnInstall")){ sync(); return; }
    var o=document.getElementById("btnOffAll"); if(!o||!o.parentNode) return;
    var b=document.createElement("button"); b.id="btnInstall"; b.type="button"; b.addEventListener("click",click);
    o.parentNode.insertBefore(b, o.nextSibling); sync();
  }
  build(); setInterval(build,1000);
})();
