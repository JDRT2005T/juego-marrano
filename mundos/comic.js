/* =================== ESCENAS DE CÓMIC (viñetas animadas) + FINAL LARGO + MÁS DIFÍCIL ===================
   comic(id,cb): muestra las viñetas de COMICS[id] una por una (toca para seguir).
   Se usan al vencer a cada enemigo, al llegar por primera vez al cuarto de las teles y en el final. */
const COMICS={};
let comicOn=false;
/* fondo de viñeta: color + puntitos de cómic + rayos */
function cbg(c1,c2){return `<defs><pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.2" fill="#000" opacity=".12"/></pattern></defs>
  <rect width="800" height="450" fill="${c1}"/><polygon points="${burst(400,225,20,620,280)}" fill="${c2}"/><rect width="800" height="450" fill="url(#dots)"/>`}
function boom(x,y,t,size,fill,rot){return `<g transform="translate(${x},${y}) rotate(${rot||-6})"><text text-anchor="middle" font-family="Creepster,cursive" font-size="${size||80}" fill="${fill||'#ffe25e'}" stroke="#000" stroke-width="7" paint-order="stroke" class="cboom">${t}</text></g>`}
function speed(x,y,n){return `<g stroke="#000" stroke-width="4" stroke-linecap="round" opacity=".6">${[...Array(n||5)].map((_,i)=>`<path d="M${x} ${y+i*16} h${-60-i%2*30}"/>`).join('')}</g>`}
const J=(x,y,s,o)=>`<g transform="translate(${x},${y}) scale(${s||1})"><g class="breathe">${chibi({...JUAN,juan:true,...(o||{})})}</g></g>`;
const broom=(x,y,r)=>`<g transform="translate(${x},${y}) rotate(${r||0})"><path d="M0 0 H160" stroke="#000" stroke-width="12" stroke-linecap="round"/><path d="M0 0 H160" stroke="#c49a5c" stroke-width="7" stroke-linecap="round"/>
  <path d="M160 -14 L200 -24 L200 24 L160 14Z" fill="#e9c46a" ${K}/></g>`;
function tricycle(x,y,s){return `<g transform="translate(${x},${y}) scale(${s||1})">
  <circle cx="-60" cy="-22" r="22" fill="none" stroke="#000" stroke-width="7"/><circle cx="40" cy="-14" r="14" fill="none" stroke="#000" stroke-width="6"/><circle cx="70" cy="-14" r="14" fill="none" stroke="#000" stroke-width="6"/>
  <path d="M-60 -22 L-20 -70 L55 -40 M-20 -70 L-34 -96 M-46 -96 H-22" stroke="#c1121f" stroke-width="8" fill="none" stroke-linecap="round"/>
  <g transform="translate(20,-150) scale(.55)">${pig({arms:true})}</g></g>`}

/* muestra una historieta */
/* el cuarto de Juan (para el final) */
function roomJ(){return `<rect width="800" height="300" fill="#f1e3bc"/><rect y="300" width="800" height="150" fill="#e8e8e8"/>${floorTiles(300,450,400,120)}<rect y="288" width="800" height="12" fill="#b99f6b" ${K}/>
  <rect x="40" y="50" width="160" height="120" fill="#16204a" ${K}/><path d="M120 50V170M40 110H200" stroke="#fff" stroke-width="7"/><circle cx="160" cy="80" r="12" fill="#f4f0cc"/>
  <rect x="560" y="180" width="200" height="16" fill="#8a5a3a" ${K}/><rect x="575" y="196" width="14" height="100" fill="#6a4a2a" ${K2}/><rect x="730" y="196" width="14" height="100" fill="#6a4a2a" ${K2}/>
  <rect x="600" y="110" width="110" height="70" rx="6" fill="#222" ${K}/><rect x="608" y="118" width="94" height="52" fill="#3a6ac8"/>${txt(655,150,'FIFA',16,'#fff')}
  <rect x="250" y="60" width="90" height="120" fill="#c1121f" ${K}/>${ballLogo(295,120,1.6)}`}
function comic(id,cb){
  const P=COMICS[id];if(!P){if(cb)cb();return}
  let c=document.getElementById('comic');
  if(!c){c=document.createElement('div');c.id='comic';c.className='overlay';stage.appendChild(c)}
  const wasOver=G&&G.over;if(G)G.over=true;comicOn=true;
  bub.style.display='none';cap.style.display='none';
  let i=-1,t=null;
  const show=()=>{
    i++;clearTimeout(t);
    if(i>=P.length){if(typeof comicSend==='function')comicSend(id,-1);c.style.display='none';comicOn=false;if(G)G.over=wasOver&&G.over;if(G)G.over=false;if(cb)cb();return}
    const p=P[i];if(typeof comicSend==='function')comicSend(id,i);
    c.innerHTML=`<div class="cpanel ${p.fx||''}">${svg(typeof p.art==='function'?p.art():p.art,'#000')}</div>
      ${p.cap?`<div class="ccap">${p.who?`<b>${p.who}:</b> `:''}${p.cap}</div>`:''}<div class="chint">toca para seguir ▶</div>`;
    c.style.display='flex';
    if(started){if(p.sfx)p.sfx();else tone(520,.08,{type:'triangle',g:.08})}
    if(p.fx==='shake')fx('shake');if(p.fx==='flash')fx('flash');
    if(started&&p.who&&p.voice)speak(p.cap);
    t=setTimeout(show,p.ms||Math.max(3200,(p.cap||'').length*65));
  };
  c.onclick=ev=>{ev.stopPropagation();show()};
  show();
}
/* versión para quien mira en vivo: solo dibuja la viñeta i */
function comicShow(id,i){
  const P=COMICS[id];let c=document.getElementById('comic');
  if(!c){c=document.createElement('div');c.id='comic';c.className='overlay';stage.appendChild(c)}
  if(!P||i<0||i>=P.length){c.style.display='none';return}
  const p=P[i];c.innerHTML=`<div class="cpanel ${p.fx||''}">${svg(typeof p.art==='function'?p.art():p.art,'#000')}</div>${p.cap?`<div class="ccap">${p.who?`<b>${p.who}:</b> `:''}${p.cap}</div>`:''}`;
  c.style.display='flex';if(p.fx==='shake')fx('shake');
}

/* ---------- viñetas al vencer a cada enemigo ---------- */
Object.assign(COMICS,{
  rata_win:[
    {art:()=>`${cbg('#ffe25e','#ffb703')}${J(220,430,1.5)}<g transform="translate(470,170) rotate(20) scale(2.4)">${ITEMS.sandwich.icon}</g>${speed(420,150,4)}<g transform="translate(620,330) scale(1.5)">${rat(false)}</g>${boom(560,110,'¡TOMA!',90)}`,cap:'Juan le lanza el sándwich mordido con todas sus fuerzas...',fx:'shake'},
    {art:()=>`${cbg('#9fd3ff','#cfe8ff')}<g transform="translate(420,380) scale(2.4)">${rat(true)}</g>${boom(400,110,'ZZZ...',90,'#fff',0)}`,cap:'¡Ñam! La rata se lo traga de un bocado... y se queda roncando.'}
  ],
  zombi_win:[
    {art:()=>`${cbg('#cfe8ff','#9fd3ff')}${J(230,430,1.5)}<g transform="translate(330,250) scale(2.6)">${ITEMS.desfib.icon}</g><g transform="translate(600,430) scale(1.4)">${zombie()}</g>${boom(420,110,'¡DESPEJEN!',80)}`,cap:'Juan frota las palas del desfibrilador... ¡bzzz!'},
    {art:()=>`<rect width="800" height="450" fill="#000"/><g transform="translate(400,440) scale(1.9)" opacity=".95"><g stroke="#fff" stroke-width="6" fill="none"><circle cy="-160" r="26"/><path d="M0 -134 V-60 M-26 -110 H26 M-24 -96 H24 M-22 -82 H22 M0 -60 L-18 0 M0 -60 L18 0 M-26 -122 L-80 -110 M26 -122 L-80 -96"/></g></g>
      <g stroke="#ffe25e" stroke-width="8" fill="none">${[0,1,2,3,4,5].map(i=>`<path d="M${150+i*100} ${40+i%2*30} l20 40 l-24 10 l26 50"/>`).join('')}</g>${boom(400,110,'¡¡BZZZZT!!',100,'#ffe25e')}`,cap:'¡ZAAAP! El corrientazo le ilumina hasta los huesos.',fx:'flash',sfx:()=>{noise(1,{type:'highpass',f:2000,g:.4});tone(90,1,{type:'sawtooth',g:.15})}},
    {art:()=>`${cbg('#b8c2c8','#9aa3a8')}<g transform="translate(400,400) rotate(-90) scale(1.2)">${zombie()}</g>${boom(560,180,'X_X',90,'#fff',8)}`,cap:'Quedó tieso. Ahora sí está muerto-muerto.'}
  ],
  perro_win:[
    {art:()=>`${cbg('#ffe25e','#ffb703')}<g transform="translate(420,400) scale(2.3)">${dog(false)}</g><g transform="translate(330,260) rotate(-30) scale(3)">${ITEMS.huesoDormido.icon}</g>${boom(560,110,'¡ÑAM ÑAM!',80)}`,cap:'Firulais se traga el hueso con somníferos de un solo bocado...'},
    {art:()=>`${cbg('#2a2a5a','#3a3a7a')}<g transform="translate(420,400) scale(2.3)">${dog(true)}</g>${boom(560,110,'ZZZ...',90,'#fff',0)}<circle cx="230" cy="250" r="30" fill="#cfe8ff" opacity=".6" ${K2}/>`,cap:'...bosteza, da tres vueltas y se queda roncando como una moto.'}
  ],
  payaso_win:[
    {art:()=>`${cbg('#ff9ad5','#ff4fa0')}${J(220,430,1.5)}<g transform="translate(420,260) rotate(-20) scale(3)">${ITEMS.jeringa.icon}</g><g transform="translate(610,430) scale(1.5)">${killerClown()}</g>${boom(460,110,'¡PIC!',100)}`,cap:'¡Pinchazo en la nalga del payaso!',fx:'shake'},
    {art:()=>`${cbg('#5a1a8a','#7a2aaa')}<g transform="translate(330,380) rotate(-80) scale(1.4)">${killerClown()}</g>${[0,1,2,3].map(i=>`<text x="${300+i*60}" y="${150+i%2*30}" font-size="40">⭐</text>`).join('')}${boom(560,110,'¡PLOF!',90)}`,cap:'Chanchín da dos vueltas como bailarina... y se desploma roncando.'}
  ],
  leon_win:[
    {art:()=>`${cbg('#ffe25e','#ff8a1e')}<g transform="translate(260,430) scale(1.5)">${chibi({...JUAN,juan:true})}<g transform="translate(0,-100) scale(2.2)">${ITEMS.traje.icon}</g></g><g transform="translate(360,250) scale(2.5)">${ITEMS.bocina.icon}</g>${boom(470,110,'¡MEEEC MEEEC!',80)}`,cap:'Juan se pone el traje de payaso y suena la bocina con toda su alma.',sfx:()=>{tone(330,.4,{type:'square',g:.12});tone(330,.4,{type:'square',g:.12,delay:.5})}},
    {art:()=>`${cbg('#c1121f','#8a0a12')}<g transform="translate(450,380) scale(-2,2)">${lion(true)}</g>${speed(620,250,6)}${boom(400,110,'¡AAAAAH!',100,'#fff')}`,cap:'¡El león grita como niña y sale corriendo a encerrarse en su jaula!'}
  ],
  marrano_win:[
    {art:()=>`${cbg('#ff8a1e','#c1121f')}${J(200,430,1.5)}<g transform="translate(300,260) scale(2.6)">${ITEMS.lanzallamas.icon}</g>
      <path d="M340 250 Q460 180 560 240 Q480 260 600 300 Q470 300 340 270Z" fill="#ffe25e" ${K}/><g transform="translate(640,440) scale(.9)">${marranoBoss(false)}</g>${boom(470,110,'¡FUOOOSH!',100)}`,cap:'¡Aerosol + encendedor = LLAMARADA!',fx:'shake',sfx:()=>noise(1.4,{f:900,g:.45,a:.2})},
    {art:()=>`${cbg('#ffe25e','#ffb703')}<g transform="translate(470,430) scale(1.1)">${marranoBoss(true)}</g>${speed(640,280,6)}<text x="500" y="330" font-size="70">🔥🔥</text>${boom(400,100,'¡MI RABITOOO!',80,'#fff')}`,cap:'¡Huele a TOCINO! El Marrano sale corriendo con el rabo en llamas.',who:'EL MARRANO'}
  ],
  hub_intro:[
    {art:()=>`<rect width="800" height="450" fill="#14001f"/>${tricycle(420,400,1.6)}${boom(400,90,'Hola, Juan.',60,'#fff',0)}`,cap:'Hola, Juan. Quiero jugar un juego.',who:'EL MARRANO',voice:1,sfx:()=>SFX.sting()},
    {art:()=>`<rect width="800" height="450" fill="#14001f"/>${tricycle(420,400,1.6)}<g transform="translate(150,190) scale(1.6)">${heartQ(0)}${heartQ(1)}${heartQ(2)}${heartQ(3)}</g>${boom(560,100,'JE JE JE',70,'#ff4fa0')}`,cap:'Partí la llave de tu amigo en 4 trozos y los escondí en mis mundos. Cada mundo te necesitará... y cada mundo necesitará de los otros.',who:'EL MARRANO',voice:1}
  ]
});

/* ---------- el final largo ---------- */
COMICS.final=[
  {art:()=>`${cbg('#ff9ad5','#ff4fa0')}${J(330,430,1.5)}<g transform="translate(520,430) scale(1.5)"><g class="breathe">${jpStand()}</g></g>${boom(420,100,'¡CLIC!',90)}<g transform="translate(420,230) scale(2.5)">${ITEMS.llaveCorazon.icon}</g>`,cap:'La llave del corazón abre las cadenas...',sfx:()=>SFX.door()},
  {art:()=>`${cbg('#ffe25e','#ffb703')}${J(340,430,1.5)}<g transform="translate(470,430) scale(1.5)">${jpStand()}</g>${boom(400,100,'¡PARCE!',90)}<text x="380" y="200" font-size="70">❤️</text>`,cap:'¡¡JUAN!! ¡Me salvaste, parce! Pensé que nunca más me iba a poder sentar.',who:'JUAN PABLO'},
  {art:()=>`${cbg('#cfe8ff','#9fd3ff')}${J(330,430,1.5)}${broom(380,240,-30)}${broom(470,240,30)}${boom(420,110,'¡CRACK!',100)}`,cap:'Juan agarra el palo... y lo parte en dos sobre la rodilla. Por si acaso.',fx:'shake',sfx:()=>SFX.thud()},
  {art:()=>`<rect width="800" height="450" fill="#2a0a1a"/>${tricycle(560,410,1.4)}${J(180,430,1.2,{expr:'scared'})}<g transform="translate(290,430) scale(1.2)">${jpStand()}</g>${boom(560,90,'¡NO TAN RÁPIDO!',64,'#ff2a2a')}`,cap:'¡No tan rápido! Nadie sale de mi mente sin mi permiso.',who:'EL MARRANO',voice:1,sfx:()=>SFX.laugh()},
  {art:()=>`${cbg('#5a1a8a','#7a2aff')}<g transform="translate(400,225)"><g class="spin"><path d="M0 0 m-120 0 a120 120 0 1 0 120 -120 a80 80 0 1 0 -80 80 a40 40 0 1 0 40 -40" stroke="#e0b8ff" stroke-width="14" fill="none"/></g></g>
    <g transform="translate(330,320) rotate(-25) scale(.9)">${chibi({...JUAN,juan:true,expr:'scared'})}</g><g transform="translate(470,330) rotate(25) scale(.9)">${jpStand()}</g>${boom(400,90,'¡A LA TELE!',80)}`,cap:'¡Por la tele! Los dos se lanzan de cabeza al último portal...',fx:'flash'},
  {art:()=>`${cbg('#7a2aff','#5a1a8a')}<rect x="250" y="120" width="300" height="230" rx="20" fill="#222" ${K}/><rect x="270" y="140" width="260" height="190" rx="10" fill="#7a2aff"/>
    <g transform="translate(400,330) scale(.9)">${pig({arms:true})}</g>${boom(400,90,'¡ME ATORÉ!',80,'#fff')}`,cap:'El Marrano intenta seguirlos... ¡y se queda atorado en la tele por la panza!',sfx:()=>SFX.laugh()},
  {art:()=>`${roomJ()}<g transform="translate(330,440) scale(1.4)">${chibi({...JUAN,juan:true,expr:'dizzy'})}</g><g transform="translate(500,440) scale(1.4)">${jpStand()}</g>${boom(400,90,'¡PUM!',90)}`,cap:'¡PUM! Caen en el cuarto de Juan, justo al lado del computador.',fx:'shake',sfx:()=>SFX.thud()},
  {art:()=>`${roomJ()}<g transform="translate(330,440) scale(1.4)">${chibi({...JUAN,juan:true})}</g><g transform="translate(500,440) scale(1.4)">${jpStand()}</g>`,cap:'Bueno... ¿y si jugamos FIFA? Pero yo me quedo de pie, por si acaso.',who:'JUAN PABLO'},
  {art:()=>`<rect width="800" height="450" fill="#000"/><rect x="200" y="80" width="400" height="280" rx="20" fill="#222" ${K}/><rect x="220" y="100" width="360" height="240" rx="10" fill="#0a0a0a"/>
    <rect x="220" y="100" width="360" height="240" fill="#bbb" filter="url(#nz)" opacity=".35"/><g transform="translate(400,300) scale(.8)">${pig()}</g>`,cap:'Buen juego, Juan... Pero dime una cosa: ¿quién te pasó el link de este juego? JE JE JE.',who:'EL MARRANO',voice:1,sfx:()=>SFX.static()},
  {art:()=>`${cbg('#c1121f','#8a0a12')}<g transform="translate(400,470) scale(2.2)">${jpStand()}</g><g transform="translate(400,170) scale(1.5)"><ellipse cy="15" rx="16" ry="12" fill="#f7c4c0" ${K}/><ellipse cx="-6" cy="15" rx="3" ry="5" fill="#5a2a28"/><ellipse cx="6" cy="15" rx="3" ry="5" fill="#5a2a28"/></g>${boom(400,100,'¿¿¡¿QUÉ?!??',90,'#fff')}`,cap:'Juan Pablo sonríe... y por un segundo, Juan juraría que le vio un HOCICO de cerdo.',fx:'shake',sfx:()=>{SFX.sting();SFX.laugh()}},
  {art:()=>`<rect width="800" height="450" fill="#000"/>${boom(400,240,'¿CONTINUARÁ...?',90,'#ff2a2a',0)}`,cap:'',ms:3500}
];

/* el final de verdad: historieta larga + resultados */
gameFinale=function(){
  G.over=true;clearInterval(gTick);bub.style.display='none';cap.style.display='none';$('#hud').style.display='none';
  G.f.final=1;saveGame();endFight();
  comic('final',()=>{
    G.over=true;const d=G.deaths||0,st=d<=3?3:d<=8?2:1;
    endScreen(true,'🎉 ¡JUAN PABLO ESTÁ A SALVO! 🎉',`Tiempo total: ${fmt(G.t)}  ·  Muertes: ${d}  ·  Calificación: ${'⭐'.repeat(st)}${'☆'.repeat(3-st)}\n${['','Juan Pablo se sentará... con un cojín.','Juan Pablo se puede sentar casi normal.','¡Juan Pablo se sienta como un rey!'][st]}`,
      `<button class="big" id="retry">↺ Jugar desde el principio</button><br><button class="link" id="intro">🎬 Ver la intro</button>`,{retry:()=>startGame(false),intro:begin});
  });
};

/* contador de muertes (no se pierde al reintentar) */
(()=>{
  const _die=die;die=function(k){G.deaths=(G.deaths||0)+1;_die(k)};
  const _fk=fightKill;fightKill=function(F){G.deaths=(G.deaths||0)+1;_fk(F)};
  const _rt=retryCP;retryCP=function(){const d=G.deaths||0;_rt();G.deaths=d};
  const _sv=saveGame;saveGame=function(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({cp:G.cp,t:G.t,d:G.deaths||0}))}catch(e){}};
  const _sg=startGame;startGame=function(c){_sg(c);const sv=c&&readSave();G.deaths=sv&&sv.d||0};
})();

/* ---------- MÁS DIFÍCIL ---------- */
/* menos tiempo en los enfrentamientos */
Object.entries({pasillo:7,h_morgue:7,d_perrera:7,c_camerino:6,c_jaulas:8,x_rescate:10}).forEach(([r,t])=>{if(FIGHTS[r])FIGHTS[r].time=t});
/* usar un objeto equivocado contra el enemigo te quita 2 segundos */
(()=>{const _fu=fightUse;fightUse=function(){
  const F=fightOf();const s=G.sel;
  if(G.fight&&s&&F&&s!==F.win){G.fight.left=Math.max(.3,G.fight.left-2);const el=$('#ftimer');if(el){el.classList.add('low');setTimeout(()=>el.classList.remove('low'),600)}}
  _fu()}})();
/* al ganar un enfrentamiento: su historieta y después la frase */
(()=>{const _fw=fightWin;fightWin=function(F){const k=F.id+'_win';
  if(!COMICS[k])return _fw(F);
  const s=say;say=()=>{};_fw(F);say=s;
  comic(k,()=>{gRender();say(F.winSay,3500)})}})();
/* la primera vez en el cuarto de las teles: el Marrano llega en triciclo */
(()=>{const _gh=goHub;goHub=function(line){const first=!G.f.hub;_gh(line);if(first)setTimeout(()=>comic('hub_intro'),300)}})();

const ccss=document.createElement('style');
ccss.textContent=`#comic{display:none;z-index:9;background:#000;cursor:pointer}
#comic .cpanel{position:absolute;top:3%;left:50%;height:74%;aspect-ratio:16/9;translate:-50% 0;border:6px solid #fff;outline:4px solid #000;box-shadow:8px 10px 0 rgba(255,255,255,.15);overflow:hidden;animation:cpin .45s cubic-bezier(.2,1.4,.4,1);background:#000}
#comic .cpanel svg{position:absolute;inset:0;width:100%;height:100%}
#comic .cpanel.shake{animation:cpin .45s cubic-bezier(.2,1.4,.4,1),shake .4s .3s linear 2}
@keyframes cpin{from{transform:scale(1.18) rotate(-2deg);opacity:0}to{transform:none;opacity:1}}
#comic .ccap{position:absolute;left:5%;right:5%;bottom:5%;background:#ffe25e;color:#111;border:4px solid #000;padding:.35em .8em;font-weight:700;font-size:clamp(13px,2.4vw,26px);box-shadow:5px 6px 0 rgba(0,0,0,.5);animation:ccap .4s .15s both}
#comic .ccap b{color:#c1121f}
@keyframes ccap{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}
#comic .chint{position:absolute;right:2%;bottom:.6%;color:#aaa;font-size:clamp(10px,1.4vw,14px);animation:bl 1s steps(2) infinite}
.cboom{animation:boom .5s .2s cubic-bezier(.2,1.8,.4,1) both;transform-box:fill-box;transform-origin:center}
#endS{white-space:pre-line}`;
document.head.appendChild(ccss);

/* =================== ESTILO DEL SAW GAME DE FERNANFLOO =================== */
/* enemigos más grandes */
Object.values(FIGHTS).forEach(F=>{F.scale=(F.scale||1)*1.3;F.h=(F.h||150)*1.3});

/* Juan de angelito (pantalla de muerte) */
function angelJuan(){return `<svg viewBox="-150 -330 300 360" xmlns="http://www.w3.org/2000/svg">
  <g class="flap"><path d="M-20 -150 Q-120 -230 -150 -150 Q-150 -110 -120 -100 Q-140 -80 -110 -70 Q-120 -50 -80 -50 Q-50 -80 -20 -110Z" fill="#fff" ${K}/>
  <path d="M20 -150 Q120 -230 150 -150 Q150 -110 120 -100 Q140 -80 110 -70 Q120 -50 80 -50 Q50 -80 20 -110Z" fill="#fff" ${K}/>
  <path d="M-60 -150 Q-90 -130 -100 -110 M-70 -120 Q-90 -100 -95 -85 M60 -150 Q90 -130 100 -110 M70 -120 Q90 -100 95 -85" stroke="#999" stroke-width="2" fill="none"/></g>
  ${chibi({...JUAN,juan:true})}
  <path d="M-34 -128 Q0 -140 34 -128 Q42 -60 54 -2 Q0 10 -54 -2 Q-42 -60 -34 -128Z" fill="#cfe8ff" ${K}/><path d="M-40 -76 Q0 -70 40 -76" stroke="#e9b949" stroke-width="5" fill="none"/><path d="M-20 -40 Q-22 -20 -24 -4 M18 -50 Q22 -24 24 -6" stroke="#9fc4e8" stroke-width="3" fill="none"/><path d="M-10 -112 L0 -92 L10 -112 Z" fill="#f6d6bd" ${K2}/>
  <path d="M-14 -96 L0 -76 L14 -96" fill="#f6d6bd" ${K2}/>
  <ellipse cx="0" cy="-238" rx="44" ry="10" fill="none" stroke="#000" stroke-width="8"/><ellipse cx="0" cy="-238" rx="44" ry="10" fill="none" stroke="#e9b949" stroke-width="5"/></svg>`}
(()=>{const _es=endScreen;endScreen=function(win,title,sub,btns,handlers){
  _es(win,title,sub,btns,handlers);
  const e=$('#end');e.classList.toggle('angel',!win);
  let a=document.getElementById('angel');
  if(!win){if(!a){a=document.createElement('div');a.id='angel';e.insertBefore(a,$('#endS'))}a.innerHTML=angelJuan();a.style.display='block';
    const b=document.getElementById('retry');if(b&&/Volver a intentarlo/.test(b.textContent))b.textContent='VOLVER AL JUEGO'}
  else if(a)a.style.display='none';
}})();

/* diálogos con opciones (como "1. Seguro eres un youtuber bromista...") */
function chat(q,opts,cb){
  let c=document.getElementById('chat');
  if(!c){c=document.createElement('div');c.id='chat';stage.appendChild(c)}
  const wasOver=G.over;G.over=true;
  if(started)speak(q);if(started)SFX.static();
  c.innerHTML='<div class="q"><b>EL MARRANO:</b> '+q+'</div>'+opts.map((o,i)=>`<div class="opt" data-o="${i}">${i+1}. ${o.t}</div>`).join('');
  c.style.display='block';if(typeof liveSend==='function')liveSend('chat',{html:c.innerHTML});
  c.querySelectorAll('.opt').forEach(el=>el.onclick=ev=>{ev.stopPropagation();
    const o=opts[+el.dataset.o];c.style.display='none';if(typeof liveSend==='function')liveSend('chat',{html:''});
    G.over=wasOver;say(o.t,2600);
    setTimeout(()=>{if(o.r)tvSay('EL MARRANO',o.r,1);if(cb)setTimeout(()=>cb(+el.dataset.o),o.r?2500:0)},2700)});
}
const CHATS={
  hub:['¿Sabes por qué estás aquí, Juan?',[{t:'Seguro eres un youtuber bromista y me estás jugando una broma pesada',r:'¿Broma? Pregúntale al trasero de Juan Pablo si esto es broma.'},
    {t:'¡¿PERO QUÉ CARA$%&?!',r:'Esa boquita, Juan... Tu mamá estaría muy decepcionada. Je je.'},{t:'¿Eres un suscriptor?',r:'Soy tu peor pesadilla... y sí, activé la campanita.'}]],
  2:['¿Te gustan los hospitales, Juan?',[{t:'Me encantan, sobre todo la comida',r:'Aquí la comida es suero de mortadela. Buen provecho.'},
    {t:'¿Tienen wifi?',r:'Sí. La clave es: "no vas a salir vivo". Todo junto y en minúscula.'},{t:'Quiero hablar con el gerente',r:'Yo SOY el gerente. Y el doctor. Y la enfermera. Bueno, ella no... ella es peor.'}]],
  3:['¿Sabes arreglar carros, ingeniero?',[{t:'Soy ingeniero, arreglo hasta tu cara',r:'Mi cara no tiene arreglo, Juan. Por eso uso máscara.'},
    {t:'¿Ese perro muerde?',r:'Solo a los que respiran. ¿Tú respiras?'},{t:'Quiero mi carro de vuelta',r:'Ese carro es MÍO. El Marranomóvil. Arréglalo y hablamos.'}]],
  4:['¡Bienvenido al circo! ¿Te gustan los payasos?',[{t:'Les tengo pánico',r:'Perfecto. Tengo uno que se muere por conocerte... literalmente.'},
    {t:'El único payaso aquí eres tú',r:'Auch. Eso me dolió, Juan. Ahora el león tiene más hambre.'},{t:'¿Hay palomitas?',r:'Hay palomitas, algodón de azúcar... y un cañón. No toques el cañón dos veces.'}]],
  5:['Estás dentro de mi mente, Juan. ¿Qué se siente?',[{t:'Huele a mortadela',r:'Gracias, es mi perfume favorito.'},
    {t:'Está muy vacía',r:'¡OYE! ...Bueno, un poquito. Pero tiene un piano.'},{t:'Devuélveme a mi amigo',r:'Ven por él... si puedes pasar mis acertijos. JA JA JA.'}]]
};
/* la primera vez en cada mundo y en el cuarto de las teles, el Marrano pregunta */
(()=>{
  const _sw=startWorld;startWorld=function(n,again){const W=WORLDS[n],t=W.taunt;if(!again&&CHATS[n])W.taunt=null;_sw(n,again);W.taunt=t;
    if(!again&&CHATS[n])setTimeout(()=>{if(!G.over)chat(...CHATS[n])},3800)};
  const _hi=COMICS.hub_intro;comic=(f=>function(id,cb){return f(id,id==='hub_intro'?()=>{if(cb)cb();setTimeout(()=>chat(...CHATS.hub),400)}:cb)})(comic);
})();

const fcss=document.createElement('style');
fcss.textContent=`#end.angel{background:#fff}
#end.angel .t1{color:#c1121f;-webkit-text-stroke:2px #000;text-shadow:3px 3px 0 #000;font-size:clamp(22px,4.6vw,52px)}
#end.angel .t2{color:#111;font-weight:700;margin:.2em auto .4em}
#end.angel #endH{background:none;border:0;box-shadow:none;color:#fff;font-family:'Comic Neue',cursive;font-size:clamp(14px,2.6vw,28px);-webkit-text-stroke:1.2px #000;text-shadow:2px 2px 0 #000,-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000;max-width:88%}
#angel{width:clamp(110px,19vw,220px);display:none}#angel svg{width:100%;height:auto;display:block;animation:float 2.4s ease-in-out infinite alternate}
@keyframes float{to{transform:translateY(-10px)}}
.flap{animation:flap .6s ease-in-out infinite alternate;transform-origin:0 -120px;transform-box:view-box}
@keyframes flap{to{transform:scaleX(.9)}}
#end.angel button.big{background:none;border:0;box-shadow:none;color:#3dff3d;font-family:'Creepster',cursive;font-size:clamp(26px,5.4vw,60px);-webkit-text-stroke:2px #000;text-shadow:3px 3px 0 #000,-2px -2px 0 #000;letter-spacing:2px}
#chat{position:absolute;left:0;right:0;bottom:15.5%;z-index:7;display:none;background:#fff;border-top:4px solid #000;border-bottom:4px solid #000;padding:.4em 4%}
#chat .q{font-weight:700;font-style:italic;font-size:clamp(13px,2.2vw,24px);color:#111;margin-bottom:.2em}#chat .q b{color:#c1121f}
#chat .opt{font-weight:700;font-size:clamp(13px,2.3vw,25px);color:#111;padding:.15em .3em;cursor:pointer;border-radius:6px}
#chat .opt:hover{background:#ffe25e}`;
document.head.appendChild(fcss);
