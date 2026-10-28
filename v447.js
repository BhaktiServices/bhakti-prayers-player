/* [Grok-Bot] V4.47: Knopf "Support" (ex Anregungen & Wuensche) dezent in der Fusszeile (#bppFoot426). Oeffnet ein Formular (Overlay): Textfeld, Name optional,
   schliessen per X oder Esc. "Per E-Mail senden" oeffnet das E-Mail-Programm (mailto:mail@universal-harmonics.com) mit Betreff "BPP Anregung (V<Version>)"
   und vorausgefuelltem Text inkl. Version, aktuellem Prayer, Sprache, Geraet. Es werden KEINE Daten ins Repo oder per MQTT gesendet, nichts gespeichert.
   Sendewege als Liste window.bppWishSenders447 = [{id, label:{de,en,...}, send:function(d){...}}]; ein zweiter Weg (z. B. Telegram-Bot ueber
   serverseitigen Token) kann spaeter per window.bppWishAdd447({...}) ergaenzt werden und erscheint dann als weiterer Knopf. 8 Sprachen. Hilfe: kurzer Absatz. */
window.BPP_BUILD="4.47"; window.BPP_SHOW="4.47";
(function(){
  if(window.bppV447) return; window.bppV447=1;
  var MAIL="mail@universal-harmonics.com";
  var T={
    de:{btn:"Support",hd:"Support",msg:"Nachricht",ph:"Wunsch, Idee oder Hinweis …",name:"Name (optional)",mail:"Per E-Mail senden",x:"Schließen",empty:"Bitte zuerst eine Nachricht eingeben.",sent:"Das E-Mail-Programm sollte sich jetzt öffnen. Falls nicht: bitte direkt an "+MAIL+" schreiben.",info:"Version, aktuelles Gebet, Sprache und Gerät werden zur Einordnung angefügt. Nichts wird gespeichert.",help:"<b>Support:</b> Knopf oben neben der Hilfe (?) und in der Fußzeile öffnet dasselbe Formular; „Per E-Mail senden“ öffnet das E-Mail-Programm mit vorbereiteter Nachricht an "+MAIL+" (mit Version, Gebet, Sprache, Gerät)."},
    en:{btn:"Support",hd:"Support",msg:"Your message",ph:"What would you like, what did you notice?",name:"Name (optional)",mail:"Send by e-mail",x:"Close",empty:"Please enter a message first.",sent:"Your e-mail app should open now. If not, please write directly to "+MAIL+".",info:"Version, current prayer, language and device are added for context. Nothing is stored.",help:"<b>Support:</b> the button next to Help (?) at the top and in the footer opens the same form; “Send by e-mail” opens your e-mail app with a prepared message to "+MAIL+" (with version, prayer, language, device)."},
    fr:{btn:"Support",hd:"Support",msg:"Votre message",ph:"Que souhaitez-vous, qu’avez-vous remarqué ?",name:"Nom (facultatif)",mail:"Envoyer par e-mail",x:"Fermer",empty:"Veuillez d’abord saisir un message.",sent:"Votre messagerie devrait s’ouvrir. Sinon, écrivez directement à "+MAIL+".",info:"La version, la prière en cours, la langue et l’appareil sont ajoutés pour le contexte. Rien n’est enregistré.",help:"<b>Support :</b> le bouton à côté de l’aide (?) en haut et dans le pied de page ouvre le même formulaire ; « Envoyer par e-mail » ouvre la messagerie avec un message préparé à "+MAIL+" (version, prière, langue, appareil)."},
    es:{btn:"Soporte",hd:"Soporte",msg:"Mensaje",ph:"Deseo, idea o comentario…",name:"Nombre (opcional)",mail:"Enviar por correo",x:"Cerrar",empty:"Primero hay que escribir un mensaje.",sent:"El programa de correo debería abrirse ahora. Si no, por favor escribir directamente a "+MAIL+".",info:"Se añaden la versión, la oración actual, el idioma y el dispositivo como contexto. No se guarda nada.",help:"<b>Soporte:</b> el botón junto a la ayuda (?) arriba y en el pie abre el mismo formulario; «Enviar por correo» abre el programa de correo con un mensaje preparado para "+MAIL+" (versión, oración, idioma, dispositivo)."},
    ru:{btn:"Поддержка",hd:"Поддержка",msg:"Ваше сообщение",ph:"Что бы вы хотели, что вы заметили?",name:"Имя (необязательно)",mail:"Отправить по e-mail",x:"Закрыть",empty:"Сначала введите сообщение.",sent:"Сейчас должна открыться почтовая программа. Если нет — напишите напрямую на "+MAIL+".",info:"Для понимания добавляются версия, текущая молитва, язык и устройство. Ничего не сохраняется.",help:"<b>Поддержка:</b> кнопка рядом со справкой (?) сверху и внизу страницы открывает ту же форму; «Отправить по e-mail» открывает почтовую программу с готовым письмом на "+MAIL+" (версия, молитва, язык, устройство)."},
    hi:{btn:"सपोर्ट",hd:"सपोर्ट",msg:"आपका संदेश",ph:"आप क्या चाहते हैं, आपने क्या देखा?",name:"नाम (वैकल्पिक)",mail:"ई-मेल से भेजें",x:"बंद करें",empty:"कृपया पहले संदेश लिखें।",sent:"अब आपका ई-मेल ऐप खुलना चाहिए। यदि नहीं, तो सीधे "+MAIL+" पर लिखें।",info:"संदर्भ के लिए संस्करण, वर्तमान प्रार्थना, भाषा और डिवाइस जोड़े जाते हैं। कुछ भी सहेजा नहीं जाता।",help:"<b>सपोर्ट:</b> ऊपर सहायता (?) के पास और फ़ुटर में बटन वही फ़ॉर्म खोलता है; “ई-मेल से भेजें” "+MAIL+" के लिए तैयार संदेश के साथ ई-मेल ऐप खोलता है (संस्करण, प्रार्थना, भाषा, डिवाइस सहित)।"},
    pt:{btn:"Suporte",hd:"Suporte",msg:"A sua mensagem",ph:"O que gostaria, o que notou?",name:"Nome (opcional)",mail:"Enviar por e-mail",x:"Fechar",empty:"Escreva primeiro uma mensagem.",sent:"O seu programa de e-mail deve abrir agora. Se não abrir, escreva diretamente para "+MAIL+".",info:"A versão, a oração atual, o idioma e o dispositivo são anexados como contexto. Nada é guardado.",help:"<b>Suporte:</b> o botão junto à ajuda (?) no topo e no rodapé abre o mesmo formulário; «Enviar por e-mail» abre o programa de e-mail com uma mensagem preparada para "+MAIL+" (versão, oração, idioma, dispositivo)."},
    cz:{btn:"Podpora",hd:"Podpora",msg:"Vaše zpráva",ph:"Co byste si přáli, čeho jste si všimli?",name:"Jméno (nepovinné)",mail:"Odeslat e-mailem",x:"Zavřít",empty:"Nejprve napište zprávu.",sent:"Nyní by se měl otevřít váš e-mailový program. Pokud ne, napište přímo na "+MAIL+".",info:"Pro kontext se přidá verze, aktuální modlitba, jazyk a zařízení. Nic se neukládá.",help:"<b>Podpora:</b> tlačítko vedle nápovědy (?) nahoře a v zápatí otevře stejný formulář; „Odeslat e-mailem“ otevře e-mailový program s připravenou zprávou na "+MAIL+" (verze, modlitba, jazyk, zařízení)."}};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?l:"en"; }
  function t(k){ return T[lg()][k]; }
  function ver(){ return window.BPP_VERSION||"4.47"; }
  function prayer(){ try{ if(typeof PRAYERS!=="undefined"&&typeof i==="number"&&i>=0&&PRAYERS[i]) return PRAYERS[i].titel||PRAYERS[i].id; }catch(e){} var n=document.getElementById("now"); return (n&&n.textContent.trim())||"-"; }
  function device(){ var n=navigator, ua=n.userAgent||"", sa=false;
    try{ sa=matchMedia("(display-mode: standalone)").matches||n.standalone===true; }catch(e){}
    return ua+" | "+screen.width+"x"+screen.height+" @"+(window.devicePixelRatio||1)+", Fenster "+innerWidth+"x"+innerHeight+(sa?" | als App":""); }
  function data(){ var ta=document.getElementById("bppWishTxt447"), nm=document.getElementById("bppWishName447");
    return {text:(ta&&ta.value||"").trim(), name:(nm&&nm.value||"").trim(), version:ver(), prayer:prayer(), lang:lg(), device:device()}; }
  /* Sendewege: weitere spaeter ueber bppWishAdd447 */
  var S=window.bppWishSenders447=[{id:"mail",label:function(){ return t("mail"); },send:function(d){
    var sub="BPP Anregung (V"+d.version+")";
    var body=d.text+"\n\n"+(d.name?("Name: "+d.name+"\n"):"")+"---\nVersion: V"+d.version+"\nPrayer: "+d.prayer+"\nSprache: "+d.lang+"\nGerät: "+d.device+"\n";
    var a=document.createElement("a"); a.href="mailto:"+MAIL+"?subject="+encodeURIComponent(sub)+"&body="+encodeURIComponent(body); a.style.display="none";
    document.body.appendChild(a); a.click(); a.remove(); return true; }}];
  window.bppWishAdd447=function(s){ if(s&&s.id&&typeof s.send==="function"){ S.push(s); build(true); } };
  var st=document.createElement("style");
  st.textContent="#bppFoot426 #bppWishBtn447{font-size:.72rem!important;font-weight:inherit!important;line-height:1.4;cursor:pointer;order:2;margin:2px 0 0 12px!important;opacity:.85}"+
    "#bppWish447{position:fixed;inset:0;z-index:2147483600;background:rgba(0,0,0,.62);display:none;align-items:flex-start;justify-content:center;overflow:auto;padding:5vh 12px 12px}"+
    "#bppWish447.open{display:flex}"+
    "#bppWish447 .w447{position:relative;width:100%;max-width:520px;box-sizing:border-box;background:var(--card,#241c16);color:var(--text,#fff6e8);border:1px solid var(--gold,#c9a36a);border-radius:12px;padding:16px 16px 14px;box-shadow:0 8px 30px rgba(0,0,0,.45);font-size:1rem;line-height:1.4;text-align:left}"+
    "#bppWish447 h2{margin:0 36px 10px 0;font-size:1.15rem;color:var(--gold,#c9a36a)}"+
    "#bppWish447 label{display:block;margin:8px 0 4px;font-size:.9rem;color:var(--text,#fff6e8)}"+
    "#bppWish447 textarea,#bppWish447 input{display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;color:var(--text,#fff6e8);background:var(--bg,#1a1410);border:1px solid var(--muted,#d7c4a8);border-radius:8px;padding:8px}"+
    "#bppWish447 textarea{min-height:8em;resize:vertical}"+
    "#bppWish447 textarea::placeholder,#bppWish447 input::placeholder{color:var(--muted,#d7c4a8);opacity:.8}"+
    "#bppWish447 textarea:focus,#bppWish447 input:focus{outline:2px solid var(--gold,#c9a36a);outline-offset:1px}"+
    "#bppWish447 .x447{position:absolute;top:8px;right:8px;width:34px;height:34px;padding:0;border-radius:50%;border:1px solid var(--muted,#d7c4a8);background:transparent;color:var(--text,#fff6e8);font-size:20px;line-height:1;cursor:pointer}"+
    "#bppWish447 .snd447{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}"+
    "#bppWish447 .snd447 button{background:var(--gold,#c9a36a);color:var(--bg,#1a1410);border:1px solid var(--gold,#c9a36a);border-radius:8px;padding:8px 14px;font:inherit;font-weight:700;cursor:pointer}"+
    "#bppWish447 .i447{margin:10px 0 0;font-size:.8rem;color:var(--muted,#d7c4a8)}"+
    "#bppWish447 .m447{margin:8px 0 0;font-size:.9rem;color:var(--gold,#c9a36a);min-height:0}"+
    "#bppHelp p.w447{margin:.5em 0}";
  document.head.appendChild(st);
  var ov=null, last=null, lastL="";
  function build(force){
    if(!ov){ ov=document.createElement("div"); ov.id="bppWish447"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true");
      ov.innerHTML='<div class="w447"><button type="button" class="x447">×</button><h2 id="bppWishH447"></h2>'+
        '<label for="bppWishTxt447" class="lt447"></label><textarea id="bppWishTxt447" maxlength="4000"></textarea>'+
        '<label for="bppWishName447" class="ln447"></label><input id="bppWishName447" type="text" maxlength="80" autocomplete="name">'+
        '<div class="snd447"></div><p class="m447" aria-live="polite"></p><p class="i447"></p></div>';
      ov.addEventListener("click",function(e){ e.stopPropagation(); });
      ov.querySelector(".x447").addEventListener("click",close);
      document.body.appendChild(ov); force=true; }
    if(!force&&lastL===lg()) return; lastL=lg();
    ov.setAttribute("aria-labelledby","bppWishH447");
    ov.querySelector("h2").textContent=t("hd"); ov.querySelector(".lt447").textContent=t("msg"); ov.querySelector(".ln447").textContent=t("name");
    ov.querySelector("textarea").placeholder=t("ph"); ov.querySelector(".x447").title=t("x")+" (Esc)"; ov.querySelector(".x447").setAttribute("aria-label",t("x"));
    ov.querySelector(".i447").textContent=t("info");
    var w=ov.querySelector(".snd447"); w.innerHTML="";
    S.forEach(function(s){ var b=document.createElement("button"); b.type="button"; b.setAttribute("data-s447",s.id);
      var lb=typeof s.label==="function"?s.label(lg()):(s.label&&(s.label[lg()]||s.label.en))||s.id; b.textContent=lb;
      b.addEventListener("click",function(){ var d=data(), m=ov.querySelector(".m447");
        if(!d.text){ m.textContent=t("empty"); ov.querySelector("textarea").focus(); return; }
        var ok=false; try{ ok=s.send(d); }catch(e){}
        m.textContent=(s.id==="mail")?t("sent"):(ok&&s.okText?s.okText(lg()):""); });
      w.appendChild(b); });
  }
  function open(){ build(); last=document.activeElement; ov.querySelector(".m447").textContent=""; ov.classList.add("open"); setTimeout(function(){ try{ ov.querySelector("textarea").focus(); }catch(e){} },30); }
  function close(){ if(!ov) return; ov.classList.remove("open"); try{ last&&last.focus&&last.focus(); }catch(e){} }
  window.bppWishOpen447=open;
  function isOpen(){ return ov&&ov.classList.contains("open"); }
  /* Solange offen: Esc schliesst; alle anderen Tasten nur ins Formular, keine Player-Tastenkuerzel */
  window.addEventListener("keydown",function(e){ if(!isOpen()) return;
    if(e.key==="Escape"||e.key==="Esc"){ e.preventDefault(); close(); }
    e.stopImmediatePropagation(); },true);
  function foot(){
    var r=document.getElementById("bppFoot426"); if(!r) return;
    var b=document.getElementById("bppWishBtn447");
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppWishBtn447";
      var det=document.getElementById("btnDet"); if(det) b.className=det.className.replace(/\b(on|gold|act358|s358)\b/g,"").trim();
      b.addEventListener("click",function(e){ e.stopPropagation(); open(); }); }
    var d=document.getElementById("btnDet");
    if(!window.bppFootOrder463){ if(b.parentNode!==r){ if(d&&d.parentNode===r) r.insertBefore(b,d.nextSibling); else r.appendChild(b); } } /* [Grok-Bot] V4.63 */
    else if(b.parentNode!==r){ r.appendChild(b); } /* einmalig anlegen, Platz setzt v463 */
    if(b.textContent!==t("btn")) b.textContent=t("btn");
    if(ov&&lastL!==lg()) build(true);
  }
  setInterval(foot,500); window.addEventListener("load",foot);
  /* Hilfe: kurzer Absatz direkt vor "K / ⇧K" (p.k433), damit v446 (k433 -> q446 -> Tastenkuerzel) nicht umsortiert */
  function help(){
    var h=document.querySelector("#bppHelp .in"); if(!h) return;
    var k=h.querySelector(":scope>p.k433")||h.querySelector(":scope>p.q446"); if(!k) return;
    var p=h.querySelector(":scope>p.w447");
    if(!p){ p=document.createElement("p"); p.className="w447"; p.addEventListener("click",function(e){ e.stopPropagation(); }); }
    if(p.getAttribute("data-l447")!==lg()){ p.innerHTML=t("help"); p.setAttribute("data-l447",lg()); }
    if(p.nextElementSibling!==k) h.insertBefore(p,k);
  }
  setInterval(help,250);
})();
