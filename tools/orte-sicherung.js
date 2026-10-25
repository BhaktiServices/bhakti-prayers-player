// [Grok-Bot] Orte-Sicherung: sammelt retained bpp/clbuerger/visits/v1/# von 3 oeffentlichen Brokern ~30 s
// und fuehrt sie in stats/orte/YYYY-MM.json zusammen (Stadt, Land, Geraet gehasht, erste/letzte Zeit, dedup).
const mqtt=require('mqtt'), fs=require('fs'), path=require('path'), crypto=require('crypto');
const BR=["wss://broker.emqx.io:8084/mqtt","wss://broker.hivemq.com:8884/mqtt","wss://test.mosquitto.org:8081/mqtt"];
const V="bpp/clbuerger/visits/v1/", SEC=+(process.env.SECS||30);
const got={}, st={};
const h=s=>crypto.createHash('sha256').update(String(s)).digest('hex').slice(0,12);
BR.forEach(u=>{ st[u]={ok:false,n:0};
  const c=mqtt.connect(u,{clientId:"bppsave-"+Math.random().toString(16).slice(2,10),clean:true,connectTimeout:15000,reconnectPeriod:5000});
  c.on('connect',()=>{ st[u].ok=true; c.subscribe(V+"#",{qos:0}); });
  c.on('error',e=>{ st[u].err=String(e.message||e); });
  c.on('message',(tp,buf)=>{ const sid=tp.slice(V.length); if(!sid||sid.includes('/')) return;
    try{ const p=JSON.parse(String(buf)); if(!p||!p.t||(!p.c&&!p.o)) return; st[u].n++;
      const r={c:String(p.c||"").slice(0,64),o:String(p.o||"").slice(0,8),d:h(p.d?"d:"+p.d:"s:"+sid),t:+p.t};
      const k=r.c+"|"+r.o+"|"+r.d+"|"+sid; if(!got[k]||got[k].t<r.t) got[k]=r; }catch(e){} });
  setTimeout(()=>c.end(true),SEC*1000); });
setTimeout(()=>{
  const by={}; Object.values(got).forEach(r=>{ const m=new Date(r.t).toISOString().slice(0,7); (by[m]=by[m]||[]).push(r); });
  let added=0, total=0;
  Object.keys(by).forEach(m=>{ const f=path.join("stats","orte",m+".json"); let cur={orte:[]}; try{ cur=JSON.parse(fs.readFileSync(f,"utf8")); }catch(e){}
    const idx={}; cur.orte.forEach(e=>idx[e.c+"|"+e.o+"|"+e.d]=e);
    by[m].forEach(r=>{ const k=r.c+"|"+r.o+"|"+r.d, e=idx[k];
      if(!e){ idx[k]={c:r.c,o:r.o,d:r.d,first:r.t,last:r.t}; added++; } else { if(r.t<e.first){e.first=r.t;added++;} if(r.t>e.last){e.last=r.t;added++;} } });
    const orte=Object.values(idx).sort((a,b)=>b.last-a.last); total+=orte.length;
    fs.mkdirSync(path.dirname(f),{recursive:true}); fs.writeFileSync(f,JSON.stringify({monat:m,orte},null,1)+"\n"); });
  console.log(JSON.stringify({broker:st,eintraege:Object.keys(got).length,neu_oder_geaendert:added,gesamt_in_dateien:total}));
  process.exit(0); },SEC*1000+3000);
