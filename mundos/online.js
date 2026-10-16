/* =================== VER EN VIVO ===================
   El que juega transmite su partida por Supabase Realtime (canal 'marrano-CÓDIGO').
   El que mira abre la página con ?ver=CÓDIGO y ve todo lo que pasa (sin poder tocar nada).
   El código sale en una esquina mientras se juega; también se puede fijar con ?sala=CÓDIGO. */
(function(){
const SUPA_URL='https://kuyeziqwschacefbgjhs.supabase.co', SUPA_KEY='sb_publishable_DAyCnLHJVHprc-QO7QOp4g_15UV8NEA';
const qs=new URLSearchParams(location.search);
const VER=(qs.get('ver')||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
let ch=null, ready=false, viewers=0;

function myCode(){
  const s=(qs.get('sala')||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(s)return s;
  let c=null;try{c=localStorage.getItem('marrano-sala')}catch(e){}
  if(!c){const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789';c=[...Array(4)].map(()=>A[Math.random()*A.length|0]).join('');try{localStorage.setItem('marrano-sala',c)}catch(e){}}
  return c;
}
function badge(html){
  let b=document.getElementById('live');
  if(!b){b=document.createElement('div');b.id='live';stage.appendChild(b)}
  b.innerHTML=html;b.style.display=html?'block':'none';
}
async function connect(code,onReady){
  try{
    const mod=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm');
    const sb=mod.createClient(SUPA_URL,SUPA_KEY,{auth:{persistSession:false}});
    ch=sb.channel('marrano-'+code,{config:{broadcast:{self:false},presence:{key:(VER?'v':'p')+Math.random().toString(36).slice(2,8)}}});
    onReady(ch);
    ch.subscribe(st=>{if(st==='SUBSCRIBED'){ready=true;ch.track({role:VER?'ver':'juega'})}});
  }catch(e){console.warn('en vivo no disponible',e)}
}
const send=(event,payload)=>{if(ready&&ch)ch.send({type:'broadcast',event,payload})};
if(!VER){window.liveSend=(e,p)=>send(e,p);window.comicSend=(id,i)=>send('comic',{id,i})}

/* ---------------- EL QUE JUEGA ---------------- */
function player(){
  const code=myCode();
  connect(code,c=>{
    c.on('presence',{event:'sync'},()=>{const st=c.presenceState();viewers=Object.values(st).flat().filter(x=>x.role==='ver').length;showBadge()});
    c.on('broadcast',{event:'hola'},()=>{lastSent='';sendPanel(true)});
  });
  /* tocar el cartel lo minimiza (queda solo 📡) o lo vuelve a abrir; además se minimiza solo a los 6 s */
  let mini=false;try{mini=localStorage.getItem('marrano-live-mini')==='1'}catch(e){}
  const showBadge=()=>{badge(mini?`📡${viewers?` 👀 ${viewers}`:''}`:`📡 EN VIVO · código <b>${code}</b>${viewers?` · 👀 ${viewers}`:''} <span class="x">✕</span>`);
    const b=document.getElementById('live');b.classList.add('tap');b.classList.toggle('mini',mini)};
  const setMini=v=>{mini=v;try{localStorage.setItem('marrano-live-mini',v?'1':'0')}catch(e){}showBadge()};
  showBadge();
  const lb=document.getElementById('live');
  ['pointerdown','mousedown','touchstart'].forEach(ev=>lb.addEventListener(ev,e=>e.stopPropagation()));
  lb.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();setMini(!mini)});
  if(!mini)setTimeout(()=>setMini(true),6000);
  /* globos, tele, muertes y final se mandan como eventos */
  const _say=say;say=function(t,ms){_say(t,ms);send('say',{t,ms})};
  const _tv=tvSay;tvSay=function(w,t,v){_tv(w,t,v);send('tv',{w,t})};
  const _kill=killShow;killShow=function(F){_kill(F);send('kill',{room:G.room})};
  const _fin=gameFinale;gameFinale=function(){_fin();send('fin',{})};
  /* el estado completo cada 1/4 de segundo (solo si cambió) */
  let lastSent='',lastT=0;
  setInterval(()=>{
    const e=$('#end'),wc=document.getElementById('wcard');
    const s={mode,started:mode==='game'};
    if(mode==='game'&&G)Object.assign(s,{room:G.room,world:G.world,x:Math.round(G.x),y:Math.round(G.y),walking:G.walking,look:G.look||0,lean:G.lean||0,
      inv:G.inv,sel:G.sel,page:G.page||0,f:G.f,chained:G.chained,portal:!!G.portal,t:G.t,
      fight:G.fight?{id:G.fight.id,left:+G.fight.left.toFixed(1)}:null,
      end:e.style.display==='flex'?{t:$('#endT').textContent,s:$('#endS').textContent,h:$('#endH').style.display==='block'?$('#endH').textContent:'',win:e.classList.contains('win')}:null,
      panel:$('#panel').style.display==='flex',card:wc&&wc.style.display==='flex'?wc.innerHTML:''});
    const js=JSON.stringify(s),now=performance.now();
    if(js!==lastSent||now-lastT>2500){lastSent=js;lastT=now;send('st',s)}
  },250);
  /* lo que hay dentro de las ventanitas (teclados, acertijos...) */
  let pT=null;
  const sendPanel=force=>{if($('#panel').style.display!=='flex'&&!force)return;clearTimeout(pT);pT=setTimeout(()=>send('panel',{html:$('#pcontent').innerHTML.slice(0,200000)}),120)};
  new MutationObserver(()=>sendPanel()).observe($('#pcontent'),{childList:true,subtree:true,attributes:true,characterData:true});
}

/* ---------------- EL QUE MIRA ---------------- */
function viewer(){
  document.body.classList.add('ver');mode='ver';
  ['#title','#final','#skip'].forEach(q=>{const e=$(q);if(e)e.style.display='none'});
  newGame();G.over=true;
  $('#scene').innerHTML=svg(`<rect width="800" height="450" fill="#14001f"/>${txt(400,200,'👀 Esperando a que tu amigo juegue...',30,'#ffe25e')}${txt(400,250,'Sala '+VER,22,'#fff')}${txt(400,300,'(toca la pantalla para activar el sonido)',16,'#aaa')}`);
  badge(`👀 VIENDO EN VIVO · sala <b>${VER}</b>`);
  stage.addEventListener('click',ev=>{ev.stopImmediatePropagation();if(!started){started=true;try{ac();startDrone()}catch(e){}}},true);
  let first=true,key='',raf=null,tgt=null;
  const glide=()=>{cancelAnimationFrame(raf);const st=()=>{if(!tgt)return;const dx=tgt[0]-G.x,dy=tgt[1]-G.y,d=Math.hypot(dx,dy);
      if(d<1){G.x=tgt[0];G.y=tgt[1]}else{const k=Math.min(1,.25);G.x+=dx*k;G.y+=dy*k}gPlace();
      const pl=document.getElementById('pjl');if(pl)pl.setAttribute('transform',`rotate(${G.walking?G.lean:0})`);
      const en=document.getElementById('enemy'),F=typeof fightOf==='function'&&fightOf();if(en&&F)en.setAttribute('transform',enemyTr(F));
      if(d>=1)raf=requestAnimationFrame(st)};raf=requestAnimationFrame(st)};
  connect(VER,c=>{
    c.on('broadcast',{event:'st'},({payload:s})=>{
      if(s.mode!=='game'){if(first)$('#scene').innerHTML=svg(`<rect width="800" height="450" fill="#14001f"/>${txt(400,220,'🎬 Tu amigo está viendo la intro...',30,'#ffe25e')}`);return}
      const k=JSON.stringify([s.room,s.world,s.inv,s.sel,s.page,s.f,s.chained,s.portal,s.fight&&s.fight.id,s.look]);
      Object.assign(G,{room:s.room,world:s.world,inv:s.inv,sel:s.sel,page:s.page,f:s.f,chained:s.chained,portal:s.portal,t:s.t,walking:s.walking,lean:s.lean,look:s.look,
        fight:s.fight?{id:s.fight.id,left:s.fight.left}:null});
      if(!ROOMS[G.room])return;
      if(first||k!==key||first){if(first||G.room!==(key&&JSON.parse(key)[0])){G.x=s.x;G.y=s.y}key=k;first=false;gRender()}
      tgt=[s.x,s.y];glide();
      stage.classList.toggle('walking',!!s.walking);
      if(typeof fightHud==='function'){fightHud(!!s.fight);if(s.fight){const el=$('#ftimer');el.textContent=s.fight.left.toFixed(1);el.classList.toggle('low',s.fight.left<=3)}}
      /* pantallas de muerte / final */
      const e=$('#end');
      if(s.end){e.classList.toggle('win',s.end.win);$('#endT').textContent=s.end.t;$('#endS').textContent=s.end.s;$('#endB').innerHTML='';
        const h=$('#endH');h.textContent=s.end.h;h.style.display=s.end.h?'block':'none';e.style.display='flex';e.classList.toggle('angel',!s.end.win);let an=document.getElementById('angel');if(!s.end.win&&typeof angelJuan==='function'){if(!an){an=document.createElement('div');an.id='angel';e.insertBefore(an,$('#endS'))}if(an.style.display!=='block'){an.innerHTML=angelJuan();an.style.display='block'}}else if(an)an.style.display='none';const kl=document.getElementById('kill');if(kl)kl.style.display='none'}
      else e.style.display='none';
      if(!s.panel)$('#panel').style.display='none';
      let wc=document.getElementById('wcard');
      if(s.card){if(!wc){wc=document.createElement('div');wc.id='wcard';wc.className='overlay';stage.appendChild(wc)}wc.innerHTML=s.card;wc.style.display='flex'}
      else if(wc)wc.style.display='none';
    });
    c.on('broadcast',{event:'say'},({payload:p})=>{if(!first)say(p.t,p.ms)});
    c.on('broadcast',{event:'tv'},({payload:p})=>{if(!first){const o=G.over;G.over=false;tvSay(p.w,p.t);G.over=o}});
    c.on('broadcast',{event:'panel'},({payload:p})=>{$('#pcontent').innerHTML=p.html;$('#panel').style.display='flex'});
    c.on('broadcast',{event:'kill'},({payload:p})=>{const F=FIGHTS[p.room];if(F)killShow(F)});
    c.on('broadcast',{event:'comic'},({payload:p})=>comicShow(p.id,p.i));
    c.on('broadcast',{event:'chat'},({payload:p})=>{let el=document.getElementById('chat');if(!el){el=document.createElement('div');el.id='chat';stage.appendChild(el)}el.innerHTML=p.html;el.style.display=p.html?'block':'none'});
    c.on('presence',{event:'sync'},()=>{});
    setTimeout(()=>send('hola',{}),1500);
  });
}

/* estilos de la etiqueta EN VIVO; quien mira no puede tocar nada del juego */
const css=document.createElement('style');
css.textContent=`#live{position:absolute;top:8px;right:60px;z-index:6;display:none;background:rgba(193,18,31,.85);color:#fff;border:2px solid #000;border-radius:8px;padding:3px 9px;font-weight:700;font-size:clamp(10px,1.4vw,15px);pointer-events:none}
#live b{letter-spacing:2px;color:#ffe25e}
#live.tap{pointer-events:auto;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent}
#live.tap .x{margin-left:6px;opacity:.8}
#live.mini{padding:2px 6px;opacity:.75}
body.ver #scene,body.ver #panel,body.ver #end button,body.ver #wcard{pointer-events:none}
body.ver #endB,body.ver #pclose{display:none}`;
document.head.appendChild(css);

window.addEventListener('DOMContentLoaded',()=>{
  if(VER)return viewer();
  player();
});
})();
