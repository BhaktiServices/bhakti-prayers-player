/* [Grok-Bot] V2.34: Paramahamsa Vishwananda Cālīsā – vollständiger Text (Doha + Chaupais + Schluss-Doha)
   nach https://bhaktimarga.nl/vishwananda-chalisa/ und YouTube-Beschreibung. */
(function(){
  if(typeof PRAYERS==="undefined") return;
  var existing = PRAYERS.findIndex(function(p){ return p.id==="vchalisa"; });
  var zeilen = [
    {nr:"Doha", ch:"", sa:"śyām varan mukh candramā\ncandan gulāb sugandh\nkaruṇā kṛpā kī mūrti\nśrī viṣṇwananda bhagavān", ue:"Der mit dem mondgleichen Gesicht in der Dämmerung,\nvon dem Sandelholz- und Rosenduft ausgeht,\ndie Verkörperung von Mitgefühl und Gnade –\nŚrī Viṣṇwananda Bhagavān.", en:"He who is like the moon in the twilight,\nfrom whom emanates the smell of sandalwood and roses,\nHe who is compassion and grace personified –\nŚrī Viṣṇwananda Bhagavān."},
    {nr:"1", ch:"", sa:"jai gurudev jai śrī viṣṇwananda\njai jai bhaktana ke rakhavaiyā", ue:"Jai Gurudev, Jai Śrī Viṣṇwananda,\nJai dem Beschützer der Devotees.", en:"Jai Gurudev, Jai Śrī Viṣṇwananda,\nJai to the protector of the devotees."},
    {nr:"2", ch:"", sa:"jai ho prabhu tum hṛday ke vāsī\ntum śrī pīṭha nilaya nivāsī", ue:"Jai Prabhu, der im Herzen wohnt,\nder im Śrī Pīṭha Nilaya wohnt.", en:"Jai Prabhu who resides in the heart,\nwho resides in Śrī Pīṭha Nilaya."},
    {nr:"3", ch:"", sa:"tum ho dīna bandhu tum svāmī\nanāthon ke nāth tum antaryāmī", ue:"Du bist der Freund der Gefallenen, der Meister,\nHerr der Waisen, der innere Zeuge.", en:"You are the friend of the fallen, the Master,\nthe Lord of the orphans, the inner witness."},
    {nr:"4", ch:"", sa:"tum hī prabhu bhakta hitakārī\ndās ke nāth aur tum hī svāmī", ue:"Du bist der Wohltäter der Devotees,\nder Herr der Diener und der Meister.", en:"You are the benefactor of the devotees,\nthe Lord of the servants and the Master."},
    {nr:"5", ch:"", sa:"tum ho rām daśarath ke dulāre\nnarasimha aur tum muralī vāle", ue:"Du bist Rām, der Liebling Daśaraths,\nNarasimha und der Flötenspieler.", en:"You are Rām, the beloved of Daśarath,\nNarasimha and the flute player."},
    {nr:"6", ch:"", sa:"hum āye prabhu śaraṇ tumhārī\ndarśan dījo premāvatārī", ue:"Wir sind gekommen, Zuflucht bei Dir zu nehmen,\ngib uns Darśan, o Avatār der Liebe.", en:"We have come to take shelter in You,\ngive us darśan, o avatar of love."},
    {nr:"7", ch:"", sa:"rādhā ke tum kṛṣṇa kanhāī\ngopin ke saṅga rās racāye", ue:"Du bist Kṛṣṇa, der Geliebte der Rādhā,\nder mit den Gopīs den Rās tanzte.", en:"You are Kṛṣṇa, the beloved of Rādhā,\nwho danced the rās with the gopīs."},
    {nr:"8", ch:"", sa:"tum ho mahāvatār ke dāsā\nātma kriyā ke tum dātā", ue:"Du bist der Diener des Mahāvatār,\nder Geber der Ātma Kriyā.", en:"You are the servant of the Mahāvatār,\nthe giver of Ātma Kriyā."},
    {nr:"9", ch:"", sa:"nārāyaṇa mantra tumne diyā hai\nrāmānujācārya ke priya hai", ue:"Du hast uns das Nārāyaṇa-Mantra gegeben,\ndu bist dem Rāmānujācārya lieb.", en:"You have given us the Nārāyaṇa mantra,\nyou are dear to Rāmānujācārya."},
    {nr:"10", ch:"", sa:"he prabhu tum anant avināśī\nghaṭ ghaṭ vāsī antaryāmī", ue:"O Prabhu, du bist unendlich und unzerstörbar,\nin allem gegenwärtig, der innere Zeuge.", en:"O Prabhu, you are infinite and indestructible,\npresent in all, the inner witness."},
    {nr:"11", ch:"", sa:"garuḍa śeṣa hai dās tumhāre\nprabhu tum śaṅkha cakra gadādhārī", ue:"Garuḍa und Śeṣa sind deine Diener,\no Prabhu, Träger von Muschel, Diskus und Keule.", en:"Garuḍa and Śeṣa are your servants,\no Prabhu, bearer of conch, discus and mace."},
    {nr:"12", ch:"", sa:"matsya kūrma narasimha tum svāmī\npāṇḍuraṅga bhī nāma tumhāre", ue:"Matsya, Kūrma und Narasimha bist du,\nauch Pāṇḍuraṅga ist dein Name.", en:"You are Matsya, Kūrma and Narasimha,\nPāṇḍuraṅga is also your name."},
    {nr:"13", ch:"", sa:"terah jūn janma tum liye ho\nnārāyaṇa avatār tum liye ho", ue:"Am 13. Juni hast du Geburt genommen,\nals Nārāyaṇa-Avatār bist du erschienen.", en:"On the 13th of June you took birth,\nas Nārāyaṇa avatar you appeared."},
    {nr:"14", ch:"", sa:"tumhre pavitra caritra kehī vidhi\nnāth kahi kī sunāū main", ue:"Dein reines Wesen ist unbeschreiblich,\nwie soll ich es beschreiben, o Nāth?", en:"Your pure character is beyond description,\nhow shall I describe it, o Nāth?"},
    {nr:"15", ch:"", sa:"raṅganāth ke ho avatārā\ntum ho prabhu śrīraṅga nivāsī", ue:"Du bist der Avatār des Raṅganāth,\nder in Śrīraṅgam wohnt.", en:"You are the avatar of Raṅganāth,\nresiding in Śrīraṅgam."},
    {nr:"16", ch:"", sa:"mahāmaṇḍaleśvar nāma tumhāre\nnirmohī akhāṛā ke pyāre", ue:"Mahāmaṇḍaleśvar ist dein Name,\ndu bist dem Nirmohī Akhāṛā lieb.", en:"Mahāmaṇḍaleśvar is your name,\nyou are dear to the Nirmohī Akhāṛā."},
    {nr:"17", ch:"", sa:"bhakti mārga ko tum ne diyā hai\nbhakton ke tum kāj savāre", ue:"Du hast den Bhakti Mārga gegeben,\ndu erfüllst die Aufgaben der Devotees.", en:"You have given the path of Bhakti,\nyou fulfill the tasks of the devotees."},
    {nr:"18", ch:"", sa:"lakṣmī bhūmī santoṣī ke svāmī\nmīrā rādhā bhī dāsī tumhārī", ue:"Herr von Lakṣmī, Bhūmī und Santoṣī,\nauch Mīrā und Rādhā sind deine Dienerinnen.", en:"Master of Lakṣmī, Bhūmī and Santoṣī,\nMīrā and Rādhā are also your servants."},
    {nr:"Doha", ch:"", sa:"yaha cālīsā gurudev kī\njo koī bhakta bhī gāye\nsatguru dev ke prem se\nun caraṇoṃ mil jāye", ue:"Wer dieses Cālīsā des Gurudev singt,\nder möge durch die Liebe des Satguru\ndie Lotusfüße erreichen.", en:"Whoever sings this Cālīsā of Gurudev,\nby the love of the Satguru\nmay attain His lotus feet."}
  ];
  var P = {
    id:"vchalisa",
    titel:"Paramahamsa Vishwananda Cālīsā",
    autor:"Sri Vitthal Dham · Heft S. 36",
    quelle:"Dropbox · Bhakti Yoga Mantras · Text nach bhaktimarga.nl",
    audio:"audio/vishwananda-chalisa.mp3",
    preferFile:true,
    zeilen: zeilen
  };
  if(existing >= 0) PRAYERS[existing] = P;
  else PRAYERS.push(P);
})();
