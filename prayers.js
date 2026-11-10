/* [Grok.com] V1.31 Grundliste. Heft-Zeilen: iast.js / chords.js / govinda.js / kavacham.js / morning-prayers.js */
window.PRAYERS = [
  {
    id: "mukunda",
    titel: "Mukunda Mala Stotram",
    autor: "Kulashekhara Alvar \u00b7 Bhakti Marga Music",
    youtube: "aDg6I2Bcx-g",
    quelle: "Prathana with chords \u00b7 S. 38-42",
    hinweis: "Strophen vierzeilig wie im Heft.",
    zeilen: (function(){
      var out=[], n;
      var ue = [
        "In dessen Stadt Tag f\u00fcr Tag der Rangam-Umzug ert\u00f6nt \u2014 den K\u00f6nig Kulashekhara verehre ich mit dem Haupt.",
        "Geliebter der Shri, Geber, Ozean des Mitgef\u00fchls \u2014 lass mich dich so Tag f\u00fcr Tag rufen, Mukunda.",
        "Sieg dem Sohn der Devaki. Sieg Krishna. Sieg dem wolkendunklen Mukunda, der die Last der Erde nimmt.",
        "Mukunda, zu deinen F\u00fc\u00dfen bitte ich um eines: dass ich deine Lotosf\u00fc\u00dfe von Leben zu Leben nicht vergesse.",
        "Nicht um Himmel oder H\u00f6lle \u2014 in jedem Leben will ich dich im Herzenshaus tragen.",
        "Nicht Pflicht, Reichtum oder Genuss. Nur dies: unersch\u00fctterliche Hingabe an deine F\u00fc\u00dfe, Leben um Leben.",
        "Ob Himmel, Erde oder H\u00f6lle \u2014 im Sterben denke ich an deine F\u00fc\u00dfe.",
        "Heute schon soll der Schwan meines Geistes in das Gehege deiner F\u00fc\u00dfe eingehen.",
        "Immer denke ich an Hari, den Sohn Nandas, den die Weisen verehren.",
        "In Haris See tauche ich. Den Durst der W\u00fcste des Weltkreises lasse ich heute.",
        "Geist, h\u00f6re nicht auf, dich an Hari zu erfreuen. Nichts gleicht dem Nektar der Erinnerung an seine F\u00fc\u00dfe.",
        "F\u00fcrchte dich nicht. Shridhara ist Herr. Lege die Tr\u00e4gheit ab und sinne auf Narayana.",
        "F\u00fcr die im Ozean des Werdens: das eine Rettungsschiff ist Vishnu.",
        "Sage nicht: wie soll ich hin\u00fcber? Eine Hingabe an den Lotus\u00e4ugigen tr\u00e4gt dich.",
        "Im Ozean namens Samsara \u2014 gib uns das Boot der Hingabe zu deinen F\u00fc\u00dfen."
      ];
      out.push({ nr:"Mangala", sa:"", ue:ue[0]||"" });
      for(n=1;n<=40;n++) out.push({ nr:String(n), sa:"", ue:ue[n]||"" });
      return out;
    })()
  },
  {
    id: "narasimha",
    titel: "Shri Nrisimha Prayer",
    youtube: "Ex-FUGS3Ygw", /* [Grok-Bot] V1.46: Ton dazu, Sri Narasimha Prayer von Bhakti Marga Music */
    autor: "Prathana Daily Prayer Edition",
    quelle: "Prathana with chords, Seite 12",
    hinweis: "Zeilen wie im Musikerheft.",
    zeilen: [{ nr:"1", sa:"namaste narasimhaya ://", ue:"Verehrung dir, Narasimha." }]
  },
  {
    id: "suprabhatam",
    titel: "Shri Krishna Suprabhatam",
    autor: "Prathana Daily Prayer Edition",
    quelle: "Prathana with chords, Seite 9",
    hinweis: "Jede Strophe vierzeilig wie im Heft.",
    zeilen: [{ nr:"1", sa:"", ue:"" }]
  }
];
