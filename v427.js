/* [Grok-Bot] V4.27: Link-Zeit ?t= nach dem Laden der gewaehlten Aufnahme (loadedmetadata) setzen; Lyrics-Sync. Auch Erststart t=10.2. */
(function(){ window.BPP_BUILD="4.29"; window.BPP_SHOW="4.29"; /* [Grok-Bot] V4.28 */

  (function(){ var q=new URLSearchParams(location.search), pid=q.get("p"), t=parseFloat(q.get("t")); if(!pid||!(t>0)) return;
    var t0=Date.now(), ok=0, user=0;
    ["pointerdown","keydown","touchstart"].forEach(function(e){ addEventListener(e,function(ev){ var x=ev.target; if(x&&x.closest&&x.closest("audio,#btnBack10,#btnFwd10,.bppJmp,#btnPPrev,#btnPNext,.list,.item,.stanza,.line")) user=1; },{capture:true,passive:true}); });
    var iv=setInterval(function(){ var a=document.getElementById("a"), P=(typeof PRAYERS!=="undefined"&&typeof i!=="undefined")?PRAYERS[i]:null;
      if(user||Date.now()-t0>20000||ok>=25){ clearInterval(iv); return; }
      if(!a||!P||P.id!==pid||!(a.readyState>=1)||!a.duration) return;
      if(Math.abs(a.currentTime-t)>1.5 && a.currentTime<t+3){ try{ a.currentTime=Math.min(t,a.duration-1); ok=0; window.bppLinkSeek=(window.bppLinkSeek||0)+1; }catch(e){} try{ typeof autoLineFromTime==="function"&&autoLineFromTime(); }catch(e){} }
      else ok++; },120); })();

})();
