/* [Grok-Bot] V3.19: am Ende der Hilfe dezent "Fragen und Anregungen": Telegram @bhaktadas1008 oder E-Mail */
window.BPP_BUILD="3.19"; window.BPP_SHOW="3.19";
(function(){
  var T={de:["Fragen und Anregungen:","oder"],en:["Questions and suggestions:","or"],fr:["Questions et suggestions :","ou"],es:["Preguntas y sugerencias:","o"],ru:["Вопросы и предложения:","или"],hi:["प्रश्न और सुझाव:","या"],pt:["Perguntas e sugestões:","ou"]};
  var st=document.createElement("style");
  st.textContent="#bppHelp .bppContact{text-align:center;font-size:.8rem;color:#a89a84;margin-top:22px}#bppHelp .bppContact a{color:#c9a560;text-decoration:underline}";
  document.head.appendChild(st);
  new MutationObserver(function(){
    var d=document.getElementById("bppHelp"), inn=d&&d.querySelector(".in"); if(!inn||inn.querySelector(".bppContact")) return;
    var t=T[(typeof lang!=="undefined"&&T[lang])?lang:"en"], p=document.createElement("p"); p.className="bppContact";
    p.innerHTML=t[0]+" Telegram <a href=\"https://t.me/bhaktadas1008\" target=\"_blank\" rel=\"noopener\">@bhaktadas1008</a> "+t[1]+" <a href=\"mailto:mail@universal-harmonics.com\">mail@universal-harmonics.com</a>";
    p.addEventListener("click",function(e){ e.stopPropagation(); });
    inn.appendChild(p);
  }).observe(document.body,{childList:true});
})();
