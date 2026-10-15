/* [Grok-Bot] V3.34: atmabhog-Theme einbinden, nur Optik. */
(function(){
  if(!document.querySelector('link[href^="theme-atmabhog.css"]')){ var l=document.createElement("link"); l.rel="stylesheet"; l.href="theme-atmabhog.css?v=3"; document.head.appendChild(l); }
  var m=document.querySelector('meta[name="theme-color"]'); if(m) m.content="#041236";
  document.documentElement.classList.add("theme-atmabhog");
})();
