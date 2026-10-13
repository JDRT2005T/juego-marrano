/* =================== ENFRENTAMIENTOS ESTILO SAW + CUARTO DE LAS TELES ===================
   Enfrentamientos: un enemigo detrás de una LÍNEA ROJA (o una emboscada al entrar a la sala).
   Al cruzarla sale un temporizador: hay que tocar un objeto de abajo y luego al enemigo.
   Si se acaba el tiempo, el enemigo mata a Juan (animación) y sale una pista según lo que lleva.
   Cuarto de las Teles: después del Mundo 1. Cada tele es un mundo; los objetos viajan con Juan.
   La llave del corazón (para soltar a Juan Pablo) está partida en 4 trozos, uno en cada mundo. */

/* ---------- registro de enfrentamientos (uno por sala) ---------- */
const FIGHTS={};
let FT=null;
function fightOf(room){const F=FIGHTS[room||G.room];return F&&!G.f['fw_'+F.id]?F:null}
/* la línea roja va en perspectiva sobre el piso */
function lineX(F,y){return F.line+(F.line-400)*.3*(y-292)/86}
function crossed(F){return F.dir<0?G.x<lineX(F,G.y):G.x>lineX(F,G.y)}
function fightFloor(){
  const F=fightOf();if(!F||F.ambush)return '';
  const x2=lineX(F,378);
  return `<g pointer-events="none"><path d="M${F.line} 292 L${x2.toFixed(1)} 378" stroke="#000" stroke-width="10"/>
   <path d="M${F.line} 292 L${x2.toFixed(1)} 378" stroke="#ff1a1a" stroke-width="6" stroke-dasharray="14 8" class="${G.fight?'blink':''}"/></g>`;
}
function enemyPos(F){
  const [x0,y0]=F.pos,s0=F.scale||1;
  if(!G.fight)return [x0,y0,s0];
  const k=Math.min(1,Math.pow(Math.max(0,1-G.fight.left/F.time),1.3)), side=x0>G.x?1:-1;
  return [x0+(G.x+side*85-x0)*k, y0+(Math.min(372,G.y+4)-y0)*k, s0*(1+.2*k)];
}
function enemyTr(F){const p=enemyPos(F);return `translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) scale(${(F.flip?-1:1)*p[2]},${p[2]})`}
function fightLayer(){
  const F=fightOf();if(!F)return '';
  return `<g id="enemy" ${H('enemy')} transform="${enemyTr(F)}"><rect x="-70" y="-${F.h||150}" width="140" height="${F.h||150}" fill="transparent"/>
   <g class="${G.fight?'fatk':'fidle'}">${F.draw(!!G.fight)}</g></g>`;
}
/* se mira en cada vuelta del motor de la sala */
function fightCheck(){
  if(G.fight||G.over)return;const F=fightOf();
  if(F&&!F.ambush&&crossed(F))startFight(F);
}
function fightHud(on){
  let t=document.getElementById('ftimer');
  if(!t){t=document.createElement('div');t.id='ftimer';stage.appendChild(t);const v=document.createElement('div');v.id='fvig';stage.appendChild(v)}
  t.style.display=on?'block':'none';$('#fvig').style.display=on?'block':'none';
}
function startFight(F){
  if(G.fight||G.over||!fightOf()||fightOf()!==F)return;
  G.fight={id:F.id,left:F.time};G.sel=null;
  fightHud(true);$('#ftimer').textContent=F.time.toFixed(1);fx('shake');
  if(started){SFX.sting();SFX.scream()}
  gRender();say(F.cry,2600);
  setTimeout(()=>{if(G.fight)tvSay('EL MARRANO',F.taunt||`¿Quieres jugar un juego, Juan? Tienes ${F.time} segundos. Usa lo que llevas encima... o muere.`,1)},900);
  let lastS=Math.ceil(F.time);clearInterval(FT);
  FT=setInterval(()=>{
    if(!G||G.over||!G.fight){clearInterval(FT);return}
    G.fight.left=Math.max(0,G.fight.left-.1);
    const el=$('#ftimer');el.textContent=G.fight.left.toFixed(1);el.classList.toggle('low',G.fight.left<=3);
    const s=Math.ceil(G.fight.left);if(s!==lastS){lastS=s;if(started)tone(s<=3?1400:900,.07,{type:'square',g:.1})}
    const e=document.getElementById('enemy');if(e)e.setAttribute('transform',enemyTr(F));
    if(G.fight.left<=0){clearInterval(FT);fightKill(F)}
  },100);
}
function endFight(){clearInterval(FT);if(G)G.fight=null;fightHud(false)}
/* tocar al enemigo */
function fightUse(){
  const F=fightOf();if(!F)return;
  if(!G.fight){G.sel=null;gRender();return say(F.look,3500)}
  const s=G.sel;G.sel=null;
  if(!s){gRender();return say(`¡Rápido! ¡Toca un objeto de abajo y luego a ${F.name}!`,2000)}
  if(s===F.win)return fightWin(F);
  gRender();if(started)tone(160,.25,{type:'square',g:.1});
  say((F.partial||{})[s]||'¡Eso no le hace nada!',2600);
}
function fightWin(F){
  endFight();cap.style.display='none';G.f['fw_'+F.id]=1;if(!F.keep)drop(F.win);
  if(F.onWin)F.onWin(G.f);
  if(started){SFX.thud();SFX.laugh()}fx('flash');
  G.cp=snap();saveGame();gRender();say(F.winSay,4000);
}
/* animación de muerte + pista */
function fightKill(F){
  G.fight.left=0;G.over=true;cancelAnimationFrame(gRaf);stage.classList.remove('walking');
  killShow(F);
  setTimeout(()=>{const k=document.getElementById('kill');if(k)k.style.display='none';G.over=false;G.fight=null;
    endScreen(false,'💀 '+F.killT,F.killS,`<button class="big" id="retry">↺ Volver a intentarlo</button>`,{retry:retryCP});
    const h=$('#endH');h.textContent='💡 '+fightHint(F);h.style.display='block'},2600);
}
/* animación de muerte (también la ve quien mira en vivo) */
function killShow(F){
  if(started){SFX.scream();SFX.thud();setTimeout(()=>{if(started)SFX.thud()},700)}
  bub.style.display='none';cap.style.display='none';fightHud(false);
  let k=document.getElementById('kill');
  if(!k){k=document.createElement('div');k.id='kill';k.className='overlay';stage.appendChild(k)}
  k.innerHTML=svg(`<rect width="800" height="450" fill="#2a0000"/><polygon points="${burst(400,225,22,560,300)}" fill="#8a0a12" ${K}/>
    <g transform="translate(250,420) scale(1.45)"><g class="tremble">${chibi({...JUAN,juan:true,expr:'scared'})}</g></g>
    <g transform="translate(${F.killX||540},420) scale(${F.killScale||1.7})"><g class="lunge"><g transform="scale(${F.flip?-1:1},1)">${F.draw(true)}</g></g></g>
    ${F.killFx||''}
    <text x="400" y="120" text-anchor="middle" font-family="Creepster,cursive" font-size="96" fill="#fff" stroke="#000" stroke-width="7" paint-order="stroke" class="boom">${F.boom||'¡ZAS!'}</text>`,'#000');
  k.style.display='flex';fx('shake');
}
function fightHint(F){
  const has=i=>G.inv.includes(i),N=i=>ITEMS[i]?ITEMS[i].n:i;
  if(has(F.win))return `¡Tenías ${N(F.win)}! Cuando sale el reloj, toca ese objeto abajo y luego toca a ${F.name}. ¡Rápido!`;
  const parts=F.parts,got=parts.filter(p=>has(p.it)),miss=parts.filter(p=>!has(p.it));
  if(parts.length>1&&!miss.length)return `Tienes ${parts.map(p=>N(p.it)).join(' y ')}... ¡pero por separado no sirven! Combínalos antes de cruzar.`;
  if(got.length)return `${N(got[0].it)} solo no basta... ${got[0].comp}`;
  return 'Te falta algo. Adivinanza: '+miss[0].riddle+(parts.length>1?' ...y eso solo no basta: hay que complementarlo con otra cosa.':'');
}

/* ---------- dibujos de enemigos (origen = pies) ---------- */
function zombie(){
  return `<path d="M-22 0 L-18 -60 M22 0 L18 -60" stroke="#000" stroke-width="16" stroke-linecap="round"/><path d="M-22 0 L-18 -60 M22 0 L18 -60" stroke="#5a6a4a" stroke-width="10" stroke-linecap="round"/>
   <path d="M-30 -56 Q0 -50 30 -56 L26 -130 Q0 -138 -26 -130Z" fill="#e8f4f4" ${K}/><path d="M-10 -100 l8 12 l6 -10 l8 14" stroke="#9a2a2a" stroke-width="3" fill="none"/>
   ${limb('M-24 -122 Q-60 -116 -84 -110','#8aa070',12)}${limb('M24 -122 Q-20 -104 -80 -96','#8aa070',12)}
   <circle cx="-88" cy="-110" r="8" fill="#8aa070" ${K2}/><circle cx="-84" cy="-96" r="8" fill="#8aa070" ${K2}/>
   <ellipse cy="-160" rx="28" ry="30" fill="#9ab07a" ${K}/><path d="M-26 -170 Q-20 -196 0 -192 Q22 -196 26 -170 Q12 -180 0 -176 Q-14 -182 -26 -170Z" fill="#3a3a2a" ${K2}/>
   <circle cx="-10" cy="-164" r="7" fill="#fff" ${K2}/><circle cx="10" cy="-162" r="5" fill="#fff" ${K2}/><circle cx="-10" cy="-164" r="2.5" fill="#c1121f"/><circle cx="10" cy="-162" r="2" fill="#c1121f"/>
   <path d="M-12 -144 Q0 -136 12 -146 L10 -140 L6 -146 L2 -138 L-2 -146 L-6 -138Z" fill="#3a0a0a" ${K2}/>
   <path d="M18 -26 l14 6 l-4 -12 l12 4" fill="#e8d8c0" ${K2}/>${txt(-2,-40,'🐷',14)}`;
}
function killerClown(){
  return `<path d="M-20 0 L-16 -50 M20 0 L16 -50" stroke="#000" stroke-width="16" stroke-linecap="round"/><path d="M-20 0 L-16 -50 M20 0 L16 -50" stroke="#2f6db0" stroke-width="10" stroke-linecap="round"/>
   <ellipse cx="-24" cy="-2" rx="20" ry="8" fill="#e01b1b" ${K2}/><ellipse cx="24" cy="-2" rx="20" ry="8" fill="#e01b1b" ${K2}/>
   <path d="M-34 -48 Q0 -40 34 -48 L30 -124 Q0 -132 -30 -124Z" fill="#ffe25e" ${K}/><circle cx="-6" cy="-100" r="5" fill="#e01b1b"/><circle cx="8" cy="-80" r="5" fill="#2f6db0"/><circle cx="-8" cy="-64" r="5" fill="#3aa83a"/>
   <path d="M-30 -126 L-44 -134 L-30 -118 L0 -130 L30 -118 L44 -134 L30 -126" fill="#fff" ${K2}/>
   ${limb('M28 -116 Q-10 -110 -56 -118','#ffe25e',12)}<path d="M-60 -122 L-104 -140 L-62 -112Z" fill="#dde" ${K2}/><path d="M-60 -122 L-66 -114" stroke="#5a3a20" stroke-width="7"/>
   ${limb('M-28 -116 Q-44 -90 -40 -70','#ffe25e',12)}
   <g transform="translate(0,-160)"><circle r="30" fill="#fff" ${K}/><path d="M-30 -6 Q-48 -28 -30 -36 Q-24 -50 -10 -36 M30 -6 Q48 -28 30 -36 Q24 -50 10 -36" fill="#3aa83a" ${K2}/>
    <path d="M-18 -10 l12 4 M18 -10 l-12 4" stroke="#000" stroke-width="4"/><circle cx="-10" cy="-2" r="4" fill="#c1121f"/><circle cx="10" cy="-2" r="4" fill="#c1121f"/>
    <circle cy="8" r="7" fill="#e01b1b" ${K2}/><path d="M-20 14 Q0 30 20 14 L16 20 L10 16 L4 22 L-2 16 L-8 22 L-14 16Z" fill="#5a0a0a" ${K2}/></g>`;
}
function marranoBoss(burnt){
  return `<g transform="translate(0,-175)">${pig({arms:false})}</g>
   ${limb('M-50 -100 Q-90 -96 -120 -120','#1c1c1c',22)}<path d="M-124 -126 l-30 -40 M-124 -126 l-40 -20" stroke="#000" stroke-width="7"/><path d="M-124 -126 l-30 -40 M-124 -126 l-40 -20" stroke="#c9ccd1" stroke-width="3"/>
   <rect x="-14" y="-118" width="28" height="40" fill="#c1121f" ${K2}/>
   ${burnt?`<g fill="#333" opacity=".85"><circle cx="20" cy="-30" r="22"/><circle cx="-14" cy="-20" r="16"/></g>${txt(60,-200,'💨🔥',28)}`:''}`;
}

/* ---------- objetos nuevos que viajan entre mundos ---------- */
const heartQ=(q,c)=>{const P=['M0 2 L0 -8 Q-4 -15 -10 -13 Q-17 -10 -13 -2Z','M0 2 L0 -8 Q4 -15 10 -13 Q17 -10 13 -2Z','M0 2 L-13 -2 Q-12 6 0 15Z','M0 2 L13 -2 Q12 6 0 15Z'];
  return `<path d="${P[q]}" fill="${c||'#ff4fa0'}" ${K2}/>`};
Object.assign(ITEMS,{
  trozo1:{n:'Trozo de corazón (sótano)',icon:`<g transform="scale(1.4)">${heartQ(0)}</g>`},
  trozo2:{n:'Trozo de corazón (hospital)',icon:`<g transform="scale(1.4)">${heartQ(1)}</g>`},
  trozo3:{n:'Trozo de corazón (desguace)',icon:`<g transform="scale(1.4)">${heartQ(2)}</g>`},
  trozo4:{n:'Trozo de corazón (circo)',icon:`<g transform="scale(1.4)">${heartQ(3)}</g>`},
  llaveCorazon:{n:'Llave del corazón',icon:`<path d="M-8 -2 Q-16 -12 -8 -14 Q-4 -15 -2 -10 Q0 -15 4 -14 Q12 -12 4 -2 L-2 4Z" fill="#ff4fa0" ${K2}/><path d="M-2 4 V16 M-2 12 H4 M-2 16 H3" stroke="#000" stroke-width="3"/>`},
  lanzallamas:{n:'Lanzallamas casero (aerosol + encendedor)',icon:`<rect x="-14" y="-10" width="12" height="24" rx="3" fill="#2f6db0" ${K2}/><rect x="-11" y="-15" width="6" height="6" fill="#999" ${K2}/><path d="M-2 -12 Q10 -20 20 -10 Q12 -8 16 0 Q6 -6 -2 -8Z" fill="#ff8a1e" ${K2}/><path d="M2 -11 Q10 -14 14 -9" stroke="#ffe25e" stroke-width="3" fill="none"/>`}
});
/* mundo de cada objeto (al terminar un mundo se tiran los que solo servían ahí; x = viaja) */
Object.keys(ITEMS).forEach(k=>{ITEMS[k].w=/^trozo|llaveCorazon|lanzallamas/.test(k)?0:1});
['encendedor','linternaOn'].forEach(k=>ITEMS[k].x=1);
RECIPES.push({a:'aerosol',b:'encendedor',out:'lanzallamas',gone:['aerosol'],say:'Aerosol inflamable + encendedor = ¡LANZALLAMAS CASERO! Esto es ingeniería, nena.'});
function tagItems(w,keys,cross){keys.forEach(k=>{if(ITEMS[k])ITEMS[k].w=w});(cross||[]).forEach(k=>{if(ITEMS[k])ITEMS[k].x=1})}

/* ---------- MUNDO 1: la rata ahora es un enfrentamiento ---------- */
FIGHTS.pasillo={id:'rata',name:'la rata',line:560,pos:[672,364],scale:1,h:90,time:10,win:'sandwich',
  parts:[{it:'sandwich',riddle:'"Donde dormiste hay algo blando... y debajo, algo que se come."'}],
  draw:()=>`<g transform="translate(0,-34)">${rat(false)}</g>`,
  look:'¿Una línea roja en el piso? ...y detrás, una rata del tamaño de un perro. Si cruzo, me ataca.',
  cry:'¡CRUCÉ LA LÍNEA! ¡LA RATA VIENE POR MÍ!',
  partial:{},winSay:'¡Toma, ratita! ...se tragó el sándwich de un bocado y se quedó dormida. Uf.',
  onWin:f=>{f.rata=1},killT:'¡LA RATA TE COMIÓ!',killS:'Era una rata del tamaño de un perro... y tenía mucha hambre.',boom:'¡ÑAM!',killScale:1.9,killX:560,
  killFx:`<g fill="#c1121f">${[0,1,2].map(i=>`<path d="M${300+i*26} 230 l10 40 l10 -40Z"/>`).join('')}</g>`};

/* ---------- MUNDO 1: un trozo del corazón congelado (se derrite con el lanzallamas) ---------- */
(()=>{const d0=ROOMS.congelador.draw;
  ROOMS.congelador.draw=f=>d0(f)+(f.trozo1?`<g ${H('hieloG')}><path d="M560 300 q30 -16 60 0" stroke="#7fb0c8" stroke-width="5" fill="none"/></g>`:
    `<g ${H('hieloG')}><rect x="540" y="196" width="110" height="100" rx="8" fill="#9fd8f5" ${K}/><path d="M552 210 l20 0 M556 222 l10 0" stroke="#fff" stroke-width="4"/>
     <g transform="translate(596,252) scale(1.6)">${heartQ(0)}</g><circle cx="596" cy="250" r="30" fill="#ff4fa0" opacity=".15" class="blink"/></g>`);
})();
HS.congelador.hieloG={at:[590,320],uses:['lanzallamas','encendedor'],do(){
  if(G.f.trozo1)return say('Solo queda un charco.');
  if(G.sel==='encendedor')return say('Con un fueguito de encendedor no derrito este bloque ni en mil años. Necesito una LLAMARADA.');
  if(G.sel==='lanzallamas'){G.f.trozo1=1;gRender();if(started){noise(1.4,{f:900,g:.4,a:.2});tone(90,1.2,{type:'sawtooth',g:.08})}
    setTimeout(()=>{give('trozo1');say('¡FUOOOSH! El hielo se derrite... ¡un trozo de corazón rosa! Era del Marrano.')},900);return}
  say('Un bloque de hielo GIGANTE. Adentro brilla algo rosa con forma de... ¿trozo de corazón? Ni la estufa podría con esto.')}};

/* ---------- CUARTO DE LAS TELES ---------- */
const TVS=[{n:1,x:200,l:'SÓTANO'},{n:2,x:300,l:'HOSPITAL'},{n:3,x:400,l:'DESGUACE'},{n:4,x:500,l:'CIRCO'},{n:5,x:600,l:'DIMENSIÓN'}];
function tvOn(n,f){f=f||G.f;return n<=2||(n===3&&f.hub_ant)||(n===4&&f.hub_cab)||(n===5&&f.done2&&f.done3&&f.done4)}
ROOMS.hub={name:'Cuarto de las Teles',start:[400,360],
  draw:f=>`${shell(['#1a0a24','#2e1440','#3a1a50','#4a3a4a'])}
   ${[...Array(9)].map((_,i)=>`<path d="M${160+i*60} 40 V290" stroke="#2a1040" stroke-width="3"/>`).join('')}
   ${txt(400,62,'📺 EL CUARTO DE LAS TELES 📺',18,'#ffe25e')}
   ${TVS.map(t=>{const on=tvOn(t.n,f),done=f['done'+t.n];return `<g ${H('tv'+t.n)}>
     <rect x="${t.x-42}" y="96" width="84" height="70" rx="8" fill="#2a2a2a" ${K}/><rect x="${t.x-34}" y="104" width="68" height="54" rx="4" fill="${on?'#7a2aff':'#050505'}"/>
     ${on?`<g transform="translate(${t.x},131)"><g class="spin"><path d="M0 0 m-18 0 a18 18 0 1 0 18 -18 a11 11 0 1 0 -11 11" stroke="#e0b8ff" stroke-width="3" fill="none"/></g></g>`
        :t.n===3?`<path d="M${t.x} 96 l-12 -16 M${t.x} 96 l12 -16" stroke="#555" stroke-width="3" stroke-dasharray="3 3"/>${txt(t.x,138,'SIN ANTENA',9,'#888')}`
        :t.n===4?`<path d="M${t.x+42} 150 q20 10 10 30" stroke="#555" stroke-width="3" stroke-dasharray="3 3" fill="none"/>${txt(t.x,138,'SIN CABLE',9,'#888')}`
        :txt(t.x,138,'APAGADA',9,'#888')}
     ${t.n===3&&f.hub_ant?`<path d="M${t.x} 96 l-12 -16 M${t.x} 96 l12 -16" stroke="#c9ccd1" stroke-width="3"/>`:''}
     ${t.n===4&&f.hub_cab?`<path d="M${t.x+42} 150 q20 10 10 30" stroke="#111" stroke-width="4" fill="none"/>`:''}
     <rect x="${t.x-30}" y="172" width="60" height="16" rx="3" fill="${done?'#4dd84d':'#fff'}" ${K2}/>${txt(t.x,184,(done?'✔ ':'')+t.l,9)}
     <rect x="${t.x-6}" y="166" width="12" height="6" fill="#222"/></g>`}).join('')}
   <g>${[2,3,4].map((n,i)=>`<g transform="translate(${572+i*28},228)"><circle r="10" fill="${f['done'+n]?'#ff4fa0':'#333'}" ${K2}/><circle cx="-3" cy="-1" r="1.5"/><circle cx="3" cy="-1" r="1.5"/></g>`).join('')}
     ${txt(600,256,'2 · 3 · 4',10,'#ccc')}</g>
   <g ${H('altar')}><polygon points="642,354 742,354 732,308 652,308" fill="#5a2a5a" ${K}/><rect x="644" y="300" width="96" height="12" fill="#7a3a7a" ${K2}/>
     <g transform="translate(692,268) scale(2.4)">${[0,1,2,3].map(q=>f['alt'+(q+1)]?heartQ(q):`<g opacity=".9">${heartQ(q,'#2a1a2a')}</g>`).join('')}</g>
     ${f.hub_llave?txt(692,338,'¡COMPLETO!',12,'#4dd84d'):txt(692,338,'S · H · D · C',11,'#e0b8ff')}</g>`,
  ex:[]};
HS.hub=Object.assign(Object.fromEntries(TVS.map(t=>['tv'+t.n,{at:[t.x,310],uses:t.n===3?['antena']:t.n===4?['cableTV']:[],do(){
  const f=G.f,n=t.n;
  if(n===3&&!f.hub_ant){if(G.sel==='antena'){f.hub_ant=1;drop('antena');gRender();if(started)SFX.static();return say('¡Le pongo la antena del hospital y la tele 3 se enciende! Sale un desguace lleno de chatarra.')}
    return say('La tele 3 no tiene antena. Solo se ve nieve... Necesito una antena de las viejas, de esas con orejitas.')}
  if(n===4&&!f.hub_cab){if(G.sel==='cableTV'){f.hub_cab=1;drop('cableTV');gRender();if(started)SFX.static();return say('¡Le conecto el cable y la tele 4 se enciende! Se oye música de circo...')}
    return say('La tele 4 está desconectada. Le falta un cable de antena, de esos enrollados.')}
  if(n===5&&!tvOn(5))return say('La tele 5 está apagada. Tiene 3 bombillos de cerdito encima: se encienden al terminar los mundos 2, 3 y 4.');
  goWorld(n)}}])),{
  altar:{at:[590,360],uses:['trozo1','trozo2','trozo3','trozo4'],do(){
    const f=G.f;
    if(G.sel&&/^trozo/.test(G.sel)){const q=G.sel.slice(5);f['alt'+q]=1;drop(G.sel);gRender();if(started)tone(700,.3,{type:'triangle',g:.15})}
    const miss=[1,2,3,4].filter(q=>!f['alt'+q]);
    if(!miss.length){if(!f.hub_llave){f.hub_llave=1;gRender();if(started){SFX.door();SFX.sting()}give('llaveCorazon');return say('¡Los 4 trozos se juntaron! ¡LA LLAVE DEL CORAZÓN! Con esto suelto las cadenas de Juan Pablo.',4000)}
      return say('El altar ya está completo.')}
    say(`Un altar con un corazón partido en 4 trozos: Sótano, Hospital, Desguace y Circo. Me faltan ${miss.length}.`,3000);
    setTimeout(()=>{const m=[1,2,3,4].filter(q=>!G.f['alt'+q]);if(!G.over&&G.room==='hub'&&m.length)tvSay('EL MARRANO',PIECE_RIDDLE[m[0]],1)},3200)}}});
const PIECE_RIDDLE={
  1:'Mi trozo del sótano está donde más frío hace... dentro de un hielo que ni una estufa derrite. Solo una LLAMARADA puede con él.',
  2:'En mi hospital, mi trozo flota en un frasco del director. No metas la mano... sácalo con algo que atraiga el metal, colgado de una cuerda.',
  3:'En mi desguace, mi trozo está en la taquilla del Doctor Marrano. La clave es el año de mi graduación. ¿No viste mis diplomas?',
  4:'En mi circo, mi trozo se lo tragó el cañón humano. No te metas adentro, tonto... hazlo disparar con FUEGO.'
};
ROOM_INTRO.hub='Un cuarto lleno de teles... y un altar con un corazón partido. Esto es como el control central del Marrano.';
WORLDS[0]={title:'Cuarto de las Teles',map:{boxes:[['hub',400,190,'Teles']],links:''}};

/* viajar a un mundo por la tele */
function goWorld(n){
  if(G.fight)return;
  say('¡Me meto en la tele! Allá voy...',1500);if(started){SFX.static();tone(200,1.4,{type:'sawtooth',g:.08,slide:1200})}
  G.over=true;
  setTimeout(()=>{fx('flash');fx('shake');G.over=false;
    const first=n>1&&!G.f['seenW'+n];G.f['seenW'+n]=1;
    if(first&&WORLDS[n].card){G.over=true;worldCard(n,()=>{G.over=false;startWorld(n)})}else startWorld(n,!first)},1400);
}
/* volver al cuarto de las teles (botón 📺 de la barra) */
function goHub(line){
  endFight();
  G.world=0;G.room='hub';G.x=G.tx=400;G.y=G.ty=362;G.sel=null;G.chained=false;G.walking=false;
  const first=!G.f.hub;G.f.hub=1;G.seen.hub=1;G.cp=snap();saveGame();gRender();
  if(first){
    setTimeout(()=>say(ROOM_INTRO.hub,4000),600);
    setTimeout(()=>{if(!G.over)tvSay('EL MARRANO','Bienvenido a mi cuarto de las teles, Juan. Cada tele es uno de mis mundos. Ah... y partí la llave de las cadenas de Juan Pablo en 4 trozos. Los escondí en mis mundos. ¡JE JE JE!',1)},4800);
  }else if(line)setTimeout(()=>{if(!G.over)tvSay('EL MARRANO',line,1)},700);
  else setTimeout(()=>say('De vuelta en el cuarto de las teles.',1800),500);
}
function hubButton(){
  if(!G||!G.f.hub||G.world===0)return '';
  return `<g data-hs="tohub" style="cursor:pointer"><rect x="704" y="392" width="84" height="46" rx="6" fill="#5a1a8a" ${K}/>${txt(746,413,'📺',16,'#fff')}${txt(746,431,'TELES',11,'#fff')}</g>`;
}

/* imán + cuerda = caña de pescar (imán del desguace, cuerda del circo) */
ITEMS.imanCuerda={n:'Imán colgado de una cuerda',w:0,icon:`<path d="M-10 -14 Q4 -18 6 -2" stroke="#a0703c" stroke-width="3" fill="none"/><path d="M0 0 a7 7 0 0 0 14 0 v8 h-4 v-8 a3 3 0 0 0 -6 0 v8 h-4z" fill="#c1121f" ${K2}/>`};
RECIPES.push({a:'iman',b:'cuerda',out:'imanCuerda',gone:['iman','cuerda'],say:'Amarro el imán a la cuerda... ¡una caña de pescar metales! Esto es ingeniería, nena.'});
