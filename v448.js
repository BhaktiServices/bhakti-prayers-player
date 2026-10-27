/* [Grok-Bot] V4.48: zweiter Sendeweg fuer "Anregungen & Wuensche": "Per Telegram senden" oeffnet t.me/Bhakti1008bot mit vorbereitetem Text
   (Nachricht, Name, Version, Prayer, Sprache, Geraet). Absenden tippt der Nutzer in Telegram selbst. Kein Token im Client.
   Weiterleitung an den Betreiber: GitHub Action feedback-telegram.yml (alle 5 Min., Token/Chat-ID nur als Secrets, nichts ins Repo). */
window.BPP_BUILD="4.48"; window.BPP_SHOW="4.48";
(function(){
  if(window.bppV448) return; window.bppV448=1;
  var BOT="Bhakti1008bot";
  var L={de:["Per Telegram senden","Telegram öffnet sich mit der vorbereiteten Nachricht – dort bitte auf Senden tippen.","Oder „Per Telegram senden“: öffnet den Bot @"+BOT+" mit vorbereiteter Nachricht."],
    en:["Send via Telegram","Telegram opens with the prepared message – please tap Send there.","Or “Send via Telegram”: opens the bot @"+BOT+" with a prepared message."],
    fr:["Envoyer via Telegram","Telegram s’ouvre avec le message préparé – appuyez sur Envoyer.","Ou « Envoyer via Telegram » : ouvre le bot @"+BOT+" avec un message préparé."],
    es:["Enviar por Telegram","Telegram se abre con el mensaje preparado; allí pulsar Enviar.","O «Enviar por Telegram»: abre el bot @"+BOT+" con un mensaje preparado."],
    ru:["Отправить через Telegram","Telegram откроется с готовым сообщением – нажмите там «Отправить».","Или «Отправить через Telegram»: открывает бота @"+BOT+" с готовым сообщением."],
    hi:["Telegram से भेजें","Telegram तैयार संदेश के साथ खुलेगा – वहाँ भेजें दबाएँ।","या “Telegram से भेजें”: बॉट @"+BOT+" को तैयार संदेश के साथ खोलता है।"],
    pt:["Enviar pelo Telegram","O Telegram abre com a mensagem preparada – toque em Enviar.","Ou «Enviar pelo Telegram»: abre o bot @"+BOT+" com uma mensagem preparada."],
    cz:["Odeslat přes Telegram","Telegram se otevře s připravenou zprávou – tam klepněte na Odeslat.","Nebo „Odeslat přes Telegram“: otevře bota @"+BOT+" s připravenou zprávou."]};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return L[l]?l:"en"; }
  function add(){
    if(!window.bppWishAdd447) return false;
    var S=window.bppWishSenders447||[]; for(var k=0;k<S.length;k++) if(S[k].id==="tg") return true;
    window.bppWishAdd447({id:"tg",label:function(l){ return (L[l]||L.en)[0]; },okText:function(l){ return (L[l]||L.en)[1]; },send:function(d){
      var ua=d.device.split(" | "), dev=ua.slice(1).join(" | "), m=ua[0].match(/\(([^)]*)\)/); dev=(m?m[1]:"")+(dev?" | "+dev:"");
      var t="BPP Anregung (V"+d.version+")\n\n"+d.text+"\n\n"+(d.name?("Name: "+d.name+"\n"):"")+"---\nVersion: V"+d.version+"\nPrayer: "+d.prayer+"\nSprache: "+d.lang+"\nGerät: "+dev;
      if(t.length>3500) t=t.slice(0,3500)+"…";
      var a=document.createElement("a"); a.href="https://t.me/"+BOT+"?text="+encodeURIComponent(t); a.target="_blank"; a.rel="noopener"; a.style.display="none";
      document.body.appendChild(a); a.click(); a.remove(); return true; }});
    return true;
  }
  var iv=setInterval(function(){ if(add()) clearInterval(iv); },300);
  function help(){
    var p=document.querySelector("#bppHelp .in>p.w447"); if(!p) return;
    var s=p.querySelector("span.t448"), x=" "+L[lg()][2];
    if(!s){ s=document.createElement("span"); s.className="t448"; p.appendChild(s); }
    if(s.textContent!==x) s.textContent=x;
  }
  setInterval(help,250);
})();
