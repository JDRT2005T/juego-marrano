/* =================== MUNDO 5: LA DIMENSIÓN DEL MARRANO (FINAL) ===================
   Llegada · Sala del reloj · Sala al revés · Sala de las puertas · Biblioteca · Trono · Rescate
   Solución: llegada: libro azul + cartel (azul, verde, rojo). Reloj: 12:30 → libro verde.
   Al revés: NO pararse debajo del piano y mover la palanca de GRAVEDAD → libro rojo (si estás debajo, mueres).
   Puertas: azul → verde → rojo (si fallas, vuelves a la llegada). Biblioteca: poner los 3 libros → pinzas +
   pasadizo; diario con pistas. Trono: 3 acertijos del Marrano (si fallas, mueres). Rescate: pinzas en la
   máquina → cortar el cable AZUL (la corbata del Marrano es roja) → llave del corazón en las cadenas → ¡FIN! */
(function(){
const KK=K, k2=K2;
Object.assign(ITEMS,{
  libroAzul:{n:'Libro azul',icon:`<rect x="-11" y="-14" width="22" height="28" rx="2" fill="#2f6db0" ${k2}/><path d="M-7 -14 V14" stroke="#000" stroke-width="2"/>`},
  libroVerde:{n:'Libro verde',icon:`<rect x="-11" y="-14" width="22" height="28" rx="2" fill="#3aa83a" ${k2}/><path d="M-7 -14 V14" stroke="#000" stroke-width="2"/>`},
  libroRojo:{n:'Libro rojo',icon:`<rect x="-11" y="-14" width="22" height="28" rx="2" fill="#e01b1b" ${k2}/><path d="M-7 -14 V14" stroke="#000" stroke-width="2"/>`},
  pinzas:{n:'Pinzas cortacables',icon:`<path d="M-12 12 L4 -4 M-4 12 L4 -4" stroke="#000" stroke-width="6" stroke-linecap="round"/><path d="M-12 12 L4 -4 M-4 12 L4 -4" stroke="#e01b1b" stroke-width="3" stroke-linecap="round"/><path d="M4 -4 L14 -14 M4 -4 L10 -16" stroke="#999" stroke-width="4"/>`},
  llaveCorazon:{n:'Llave del corazón',icon:`<path d="M-8 -2 Q-16 -12 -8 -14 Q-4 -15 -2 -10 Q0 -15 4 -14 Q12 -12 4 -2 L-2 4Z" fill="#ff4fa0" ${k2}/><path d="M-2 4 V16 M-2 12 H4 M-2 16 H3" stroke="#000" stroke-width="3"/>`}
});
tagItems(5,['libroAzul','libroVerde','libroRojo','pinzas']);
Object.assign(DEATHS,{
  piano:['¡TE CAYÓ UN PIANO!','Cambiaste la gravedad estando debajo del piano... y el piano cayó. Fíjate en la X del piso.'],
  acertijo:['¡RESPUESTA EQUIVOCADA!','El Marrano se rió tanto que abrió una trampilla debajo de ti. Piénsalo mejor... o lee su diario.'],
  palo:['¡CABLE EQUIVOCADO!','El palo avanzó de golpe... Juan Pablo no se va a poder sentar en un buen tiempo. 😭 La pista estaba en el diario.']
});
const PINK=['#a04a8a','#e07ab8','#ffb3d9','#d08ac0'];
const clouds=`<g fill="#fff" opacity=".7">${[[200,90],[560,70],[400,130],[280,40]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="40" ry="14"/><ellipse cx="${x+24}" cy="${y-8}" rx="24" ry="12"/>`).join('')}</g>`;
function pigStatue(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-40" y="-10" width="80" height="20" fill="#c9a0c0" ${KK}/><ellipse cx="0" cy="-60" rx="50" ry="46" fill="#f4a0c0" ${KK}/>
  <path d="M-36 -94 L-46 -122 L-14 -102Z M36 -94 L46 -122 L14 -102Z" fill="#f4a0c0" ${k2}/><ellipse cx="0" cy="-48" rx="20" ry="14" fill="#ffc0d8" ${k2}/><ellipse cx="-7" cy="-48" rx="4" ry="6" fill="#7a3a5a"/><ellipse cx="7" cy="-48" rx="4" ry="6" fill="#7a3a5a"/>
  <circle cx="-18" cy="-72" r="6"/><circle cx="18" cy="-72" r="6"/><path d="M-6 -86 l6 -12 l6 12" fill="#ffe25e" ${k2}/></g>`}

Object.assign(ROOMS,{
x_llegada:{name:'La llegada',start:[400,360],
  draw:f=>`${shell(PINK)}${clouds}
   ${pigStatue(560,290,1)}
   <g ${H('cartel')}><rect x="200" y="150" width="14" height="140" fill="#7a4a2a" ${KK}/><rect x="150" y="150" width="140" height="80" fill="#fff8dc" ${KK}/>
     ${txt(220,172,'Primero el cielo,',12)}${txt(220,192,'luego el pasto,',12)}${txt(220,212,'al final la sangre.',12)}</g>
   ${f.x_azul?'':`<g ${H('libroA')}><rect x="330" y="330" width="34" height="22" rx="2" fill="#2f6db0" ${KK} transform="rotate(-10 347 341)"/></g>`}
   <g ${H('estatua')}><rect x="500" y="160" width="120" height="140" fill="transparent"/></g>
   ${txt(400,80,'BIENVENIDO A MI MENTE',22,'#7a1a5a')}`,
  ex:[{to:'x_reloj',...EX.L},{to:'x_reves',...EX.R},{to:'x_puertas',...EX.B(400)}]},

x_reloj:{name:'Sala del reloj',start:[400,360],
  draw:f=>`${shell(['#5a3a7a','#8a6aaa','#a98ac8','#9a80b0'])}
   ${[[220,90,30],[620,110,40],[180,230,22]].map(([x,y,r],i)=>`<g transform="translate(${x},${y})"><g class="${i%2?'spinr':'spin'}"><circle r="${r}" fill="none" stroke="#e9b949" stroke-width="${r*.36}" stroke-dasharray="6 5"/><circle r="${r*.7}" fill="#c9a040" ${k2}/></g></g>`).join('')}
   <g ${H('reloj')}><circle cx="400" cy="160" r="96" fill="${f.x_reloj?'#2a1a3a':'#fff8dc'}" ${KK}/>
     ${f.x_reloj?(f.x_verde?'':`<rect x="384" y="140" width="32" height="44" rx="2" fill="#3aa83a" ${KK}/>`):`${[...Array(12)].map((_,i)=>txt(400+Math.sin(i*Math.PI/6)*76,166-Math.cos(i*Math.PI/6)*76,i||12,18)).join('')}<path d="M400 160 L360 186 M400 160 L452 120" stroke="#000" stroke-width="6" stroke-linecap="round"/>`}</g>
   <g ${H('placa')}><rect x="300" y="268" width="200" height="30" fill="#c9a040" ${KK}/>${txt(400,288,'"Cuando el cerdo desayuna..."',12)}</g>`,
  ex:[{to:'x_llegada',...EX.R}]},

x_reves:{name:'La sala al revés',start:[400,360],
  draw:f=>{const fl=f.x_flip;return `${shell(['#7a5a2a','#b08a5a','#c8a070','#e0c890'])}
   <g style="transition:transform 1s" transform="${fl?'':'rotate(180 400 165)'}">
     <rect x="200" y="250" width="100" height="40" fill="#7a3a1a" ${KK}/><rect x="190" y="242" width="120" height="10" fill="#5a2a10" ${k2}/>
     ${f.x_rojo?'':`<g ${H('libroR')}><rect x="236" y="214" width="26" height="30" rx="2" fill="#e01b1b" ${KK}/></g>`}
     <g><rect x="420" y="230" width="150" height="60" fill="#111" ${KK}/><rect x="430" y="220" width="130" height="14" fill="#fff" ${k2}/>${[...Array(8)].map((_,i)=>`<rect x="${434+i*16}" y="220" width="6" height="9" fill="#000"/>`).join('')}${txt(495,264,'PIANO',12,'#fff')}</g>
     <path d="M400 290 V264" stroke="#000" stroke-width="3"/><circle cx="400" cy="258" r="10" fill="#fff6a8" ${k2}/>
   </g>
   <g pointer-events="none">${fl?'':`<path d="M470 336 l40 20 M510 336 l-40 20" stroke="#c1121f" stroke-width="7"/>`}</g>
   <g ${H('palancaG')}><rect x="640" y="230" width="40" height="70" fill="#555" ${KK}/><path d="M660 260 L${fl?676:644} ${fl?236:236}" stroke="#000" stroke-width="7"/><circle cx="${fl?676:644}" cy="234" r="8" fill="#e01b1b" ${k2}/>${txt(660,222,'GRAVEDAD',10,'#fff')}</g>`},
  ex:[{to:'x_llegada',...EX.L}]},

x_puertas:{name:'Sala de las puertas',start:[400,360],
  draw:f=>`${shell(['#3a1a5a','#6a3a8a','#7a4a9a','#5a3a7a'])}
   ${[['rojo','#e01b1b',220],['azul','#2f6db0',340],['verde','#3aa83a',460],['amarillo','#e9b949',580]].map(([id,c,x])=>`<g ${H('p_'+id)}>${doorB(x,c,'')}</g>`).join('')}
   <g>${[0,1,2].map(i=>`<circle cx="${370+i*30}" cy="80" r="10" fill="${(f.x_paso||0)>i?'#4dd84d':'#333'}" ${k2}/>`).join('')}</g>
   ${txt(400,60,'Elige bien... o vuelve a empezar',14,'#ffe25e')}`,
  ex:[{to:'x_llegada',...EX.D}]},

x_biblioteca:{name:'La biblioteca',start:[400,360],
  draw:f=>`${shell(['#3a2010','#6a4020','#7a5030','#8a6a4a'])}
   <g ${H('estante')}>${f.x_estante?`<rect x="300" y="60" width="200" height="230" fill="#111" ${KK}/>${txt(400,180,'PASADIZO',16,'#ffe25e')}`:`<rect x="300" y="60" width="200" height="230" fill="#5a3010" ${KK}/>
     ${[0,1,2,3].map(r=>`<rect x="300" y="${110+r*55}" width="200" height="8" fill="#3a1a08"/>`).join('')}
     ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${310+i*22}" y="68" width="16" height="42" fill="${['#7a3a2a','#3a5a7a','#5a7a3a','#7a6a2a'][i%4]}" ${k2}/>`).join('')}
     ${[['x_bR','#e01b1b'],['x_bV','#3aa83a'],['x_bA','#2f6db0']].map(([k,c],i)=>`<rect x="${340+i*44}" y="182" width="26" height="42" rx="2" fill="${f[k]?c:'none'}" stroke="${c}" stroke-width="3" stroke-dasharray="${f[k]?'':'4 3'}"/>`).join('')}`}</g>
   <g ${H('diario')}><rect x="170" y="230" width="90" height="60" fill="#5a3010" ${KK}/><rect x="182" y="214" width="56" height="18" rx="2" fill="#ff4fa0" ${k2}/></g>
   <g ${H('escritorioB')}><rect x="540" y="230" width="110" height="60" fill="#5a3010" ${KK}/><rect x="556" y="246" width="40" height="16" fill="#7a5030" ${k2}/></g>`,
  ex:[{to:'x_puertas',...EX.D},{to:'x_trono',a:[400,300,-90],at:[460,318],show:f=>f.x_estante}]},

x_trono:{name:'El trono del Marrano',start:[400,360],
  draw:f=>`${shell(['#4a0a1a','#8a1a2a','#a02a3a','#5a1a1a'])}
   <path d="M400 290 L340 360 H460Z" fill="#c1121f" opacity=".7"/>
   <g ${H('marrano')}><path d="M300 290 V100 Q400 40 500 100 V290Z" fill="#e9b949" ${KK}/><path d="M320 290 V120 Q400 70 480 120 V290Z" fill="#7a0a1a" ${k2}/>
     ${f.x_marrano?`<g transform="translate(400,270) rotate(80)"><g transform="scale(.6)">${pig()}</g></g>${txt(400,170,'¡NOOO!',24,'#fff')}`:`<g transform="translate(400,190) scale(.9)">${pig()}</g>`}</g>`,
  ex:[{to:'x_biblioteca',...EX.D},{to:'x_rescate',...EX.R,show:f=>f.x_marrano}]},

x_rescate:{name:'¡Juan Pablo!',start:[400,360],
  draw:f=>`${shell(['#2a1a2a','#4a2a4a','#5a3a5a','#6a6a3c'])}
   ${f.x_libre?`<g transform="translate(470,320) scale(1)">${jpStand()}</g>`:`<g transform="translate(150,90) scale(1.05)" class="${f.x_cable?'paused':''}">${jpFours()}</g>`}
   <g ${H('maquina')}><rect x="600" y="120" width="110" height="150" fill="#555" ${KK}/>${txt(655,140,'MÁQUINA',12,'#fff')}
     ${[['#e01b1b',0],['#2f6db0',1],['#e9b949',2]].map(([c,i])=>`<path d="M${620+i*30} 160 V${f.x_cable&&i===1?190:250}" stroke="${c}" stroke-width="6"/>${f.x_cable&&i===1?`<path d="M${620+i*30} 216 V250" stroke="${c}" stroke-width="6"/>`:''}`).join('')}</g>
   ${f.x_boss?`<g transform="translate(700,372) scale(.35)">${marranoBoss(true)}</g>${txt(700,250,'¡BUAAA!',14,'#fff')}`:''}
   <g ${H('cadenas')}>${f.x_libre?'':`<rect x="200" y="300" width="160" height="40" fill="transparent"/>`}</g>`,
  ex:[{to:'x_trono',...EX.L}]}
});

Object.assign(HS,{
x_llegada:{
  cartel:{at:[230,312],do(){say('"Primero el cielo, luego el pasto, al final la sangre." Parece una pista de colores...')}},
  libroA:{at:[347,350],do(){G.f.x_azul=1;give('libroAzul');say('Un libro azul tirado en el piso. Se llama "Cómo ser malvado en 3 pasos".')}},
  estatua:{at:[520,330],do(){say('Una estatua gigante del Marrano con corona. Este cerdo se quiere mucho.')}}
},
x_reloj:{
  placa:{at:[400,312],do(){say('La placa dice: "Cuando el cerdo desayuna: las dos agujas miran al cielo... y media hora después."')}},
  reloj:{at:[400,312],do(){
    if(G.f.x_reloj){if(G.f.x_verde)return say('El reloj está abierto y vacío.');G.f.x_verde=1;give('libroVerde');gRender();return say('¡Un libro verde dentro del reloj! "Recetas con mortadela, volumen 7".')}
    openClock({title:'Pon la hora del desayuno del cerdo',h:12,m:30,onOK:()=>{G.f.x_reloj=1;gRender();if(started)SFX.clank();say('¡12:30! Las agujas se juntaron arriba y... el reloj se abrió como una puerta.')}})}}
},
x_reves:{
  libroR:{at:[250,316],do(){
    if(!G.f.x_flip)return say('Hay un libro rojo en la estantería... ¡pero está pegada al techo! Todo aquí está al revés.');
    G.f.x_rojo=1;give('libroRojo');gRender();say('¡Ahora que la gravedad cambió, el libro rojo está a mi altura! "Mi diario de cerdito".')}},
  palancaG:{at:[620,340],do(){
    const under=G.x>440&&G.x<560;
    G.f.x_flip=G.f.x_flip?0:1;gRender();if(started){tone(300,.8,{type:'sawtooth',g:.1,slide:80});SFX.thud()}
    if(G.f.x_flip&&under)return setTimeout(()=>die('piano'),500);
    say(G.f.x_flip?'¡WHOA! Todo dio la vuelta... menos yo. El piano cayó justo en la X.':'Todo vuelve a estar al revés.')}}
},
x_puertas:Object.fromEntries(['rojo','azul','verde','amarillo'].map((c,i)=>['p_'+c,{at:[220+i*120+40,318],do(){
  const code=['azul','verde','rojo'],f=G.f,st=f.x_paso||0;
  if(c===code[st]){f.x_paso=st+1;if(started)tone(600+st*200,.2,{type:'triangle',g:.15});
    if(f.x_paso>=3){f.x_paso=0;return changeRoom('x_biblioteca')}
    fx('flicker');gRender();return say(`Entro por la puerta ${c}... ¡y salgo en esta misma sala! Pero se encendió una luz verde.`)}
  f.x_paso=0;if(started)tone(150,.4,{type:'square',g:.1});say('¡Puerta equivocada! Me marea todo...',1500);setTimeout(()=>{if(!G.over)changeRoom('x_llegada')},1200)}}])),
x_biblioteca:{
  estante:{at:[400,312],uses:['libroRojo','libroVerde','libroAzul'],do(){
    const f=G.f,m={libroRojo:'x_bR',libroVerde:'x_bV',libroAzul:'x_bA'};
    if(f.x_estante)return useHotspot('go:x_trono');
    if(G.sel&&m[G.sel]){f[m[G.sel]]=1;drop(G.sel);gRender();if(started)tone(500,.1,{type:'triangle',g:.1})}
    const n=['x_bR','x_bV','x_bA'].filter(k=>f[k]).length;
    if(n<3)return say(`La estantería tiene 3 huecos con colores: rojo, verde y azul. Llevo ${n} de 3.`);
    f.x_estante=1;gRender();if(started){SFX.door();SFX.sting()}say('¡Los tres libros en su sitio! La estantería se mueve... ¡un pasadizo secreto!')}},
  diario:{at:[215,312],do(){
    panel(`<svg viewBox="0 0 800 450"><rect x="170" y="20" width="460" height="410" fill="#ffe8f4" ${KK}/>${txt(400,64,'DIARIO DEL MARRANO 🐷',24,'#a01060')}
      ${['Querido diario:','- Mi corbata es ROJA, como mi corazón.','- El cable del color de mi corbata NO se toca.','- El palo se para con el cable del cielo.','- Me encantan las peras y el ajo.','- Odio a Juan. Es muy listo.'].map((l,i)=>txt(200,120+i*48,l,20,'#000','start')).join('')}</svg>`);
    say('El diario del Marrano... esto me va a servir.',2200)}},
  escritorioB:{at:[595,312],do(){if(G.f.x_pinzas)return say('El cajón está vacío.');G.f.x_pinzas=1;give('pinzas');say('En el cajón hay unas pinzas cortacables. Útiles para... ¿cortar cables?')}}
},
x_trono:{
  marrano:{at:[400,330],do(){
    if(G.f.x_marrano)return say('El Marrano está tirado en el piso, mareado de tanto perder. ¡Ja!');
    duel(0)}}
},
x_rescate:{
  maquina:{at:[620,340],uses:['pinzas'],do(){
    if(G.f.x_cable)return say('La máquina está parada. El palo ya no se mueve.');
    if(G.sel!=='pinzas')return say('La máquina del palo. Tiene tres cables: rojo, azul y amarillo. Necesito algo para cortarlos.');
    openChoice({title:'¿Qué cable corto?',options:[{label:'ROJO',color:'#e01b1b'},{label:'AZUL',color:'#2f6db0'},{label:'AMARILLO',color:'#e9b949'}],correct:1,
      onOK:()=>{G.f.x_cable=1;gRender();if(started)SFX.clank();say('¡CLIC! Corté el cable azul... ¡EL PALO SE DETUVO!');
        setTimeout(()=>{if(!G.over)tvSay('JUAN PABLO','¡¡JUAN!! ¡¡LO LOGRASTE, PARCE!! ¡Ahora quítame estas cadenas!')},2500)},
      onWrong:()=>die('palo')})}},
  cadenas:{at:[300,350],uses:['llaveCorazon'],do(){
    if(!G.f.x_cable)return say('¡Primero hay que parar la máquina! Si toco las cadenas, el palo avanza.');
    if(G.sel!=='llaveCorazon')return say(G.inv.includes('llaveCorazon')?'Las cadenas tienen un candado con forma de corazón... ¡como mi llave!':'Un candado con forma de corazón... La llave está partida en 4 trozos, escondidos en los mundos. Hay que juntarlos en el altar del cuarto de las teles.',4000);
    drop('llaveCorazon');G.f.x_libre=1;gRender();if(started)SFX.door();
    say('¡La llave del corazón abre las cadenas! ¡JUAN PABLO ESTÁ LIBRE!',3000);
    setTimeout(()=>{if(!G.over)gameFinale()},3200)}}
}
});
/* duelo de acertijos contra el Marrano */
const RIDDLES=[
  {q:'"Blanco por dentro, verde por fuera. Si quieres que te lo diga, espera."',o:['La sandía','La pera','El pepino'],c:1},
  {q:'"Tengo cabeza y no soy hombre, tengo dientes y no como."',o:['El peine','La sierra','El ajo'],c:2},
  {q:'"¿Qué le pasa a Juan Pablo si pierdes?"',o:['Gana un premio','No se podrá sentar','Se vuelve cerdo'],c:1}
];
function duel(i){
  const R=RIDDLES[i];
  if(i===0){tvSay('EL MARRANO','¡JUAN! ¿Crees que puedes vencerme? ¡Responde mis tres acertijos!',1)}
  setTimeout(()=>openChoice({title:`ACERTIJO ${i+1} de 3: ${R.q}`,cols:1,options:R.o.map(l=>({label:l})),correct:R.c,okMsg:'✔ ¡Correcto!',
    onOK:()=>{if(i<2){say(['¡Una pera! Fácil.','¡El ajo! Gracias, diario.'][i],1800);return setTimeout(()=>duel(i+1),1900)}
      G.f.x_marrano=1;gRender();if(started){SFX.scream();SFX.thud()}
      say('¡Gané! El Marrano se cayó del trono... ¡y salió corriendo hacia donde tiene a Juan Pablo! ¡Detrás de él!',3500)},
    onWrong:()=>die('acertijo')}),i===0?2500:200);
}
FIGHTS.x_rescate={id:'marrano',name:'el Marrano',line:440,pos:[580,372],h:240,scale:.85,time:15,win:'lanzallamas',
  parts:[{it:'aerosol',riddle:'"Algo que rocíe... y que ARDA. En el taller de pintura del desguace hay algo muy inflamable."',
          comp:'el aerosol solo pinta. Se complementa con FUEGO para hacer una llamarada... ¿qué había en el cajón de la cocina del sótano?'},
         {it:'encendedor',riddle:'"Fuego..."',comp:'un fueguito no le hace nada a un cerdo tan grande. Se complementa con algo INFLAMABLE que rocíe (un aerosol del desguace) para hacer una llamarada.'}],
  draw:()=>marranoBoss(false),look:'¡El Marrano está delante de la máquina, detrás de una línea roja! Tiene un cuchillo de carnicero...',
  cry:'¡EL MARRANO VIENE CON UN CUCHILLO DE CARNICERO!',taunt:'¡Se acabaron los juegos, Juan! Si quieres a tu amigo... ¡pasa por encima de mí! Tienes 15 segundos. ¡JA JA JA!',
  partial:{aerosol:'¡Lo pinté de azul! ...sigue viniendo, pero ahora es un cerdo azul. ¡Necesito FUEGO!',encendedor:'Un fueguito... ¡le hace cosquillas! Necesito una LLAMARADA.',
    pinzas:'¡No le voy a cortar nada con esto!',libroRojo:'¡Le tiré su diario! Se puso a leerlo... y siguió caminando.'},
  winSay:'¡FUOOOSH! ¡Le chamusqué el rabo! ¡Huele a TOCINO! El Marrano sale corriendo y llorando hacia la esquina.',
  onWin:f=>{f.x_boss=1},killT:'¡EL MARRANO TE ATRAPÓ!',killS:'El Marrano te alcanzó con su cuchillo de carnicero... y ahora hay dos amigos con un palo detrás. 😭',boom:'¡OINK!',killScale:.95,killX:560};
Object.assign(ROOM_INTRO,{
  x_reloj:'Un reloj gigante... está parado.',
  x_reves:'¡Todo está pegado al techo! Hasta el piano...',
  x_puertas:'Cuatro puertas de colores. Seguro que solo una lleva a algún sitio.',
  x_biblioteca:'¡Una biblioteca! El Marrano lee... quién lo diría.',
  x_trono:'¡EL MARRANO! En persona... bueno, en cerdo.',
  x_rescate:'¡¡JUAN PABLO!! ¡Por fin!'
});
Object.assign(ROOM_TAUNT,{
  x_reves:['EL MARRANO','En mi mente, la gravedad hace lo que yo quiera. Cuidado con mi piano... je je.',1],
  x_biblioteca:['JUAN PABLO','¡JUAN! ¡Te oigo! ¡Estoy muy cerca! ¡Y EL PALO TAMBIÉN!'],
  x_rescate:['JUAN PABLO','¡¡JUAN!! ¡Cuidado con el Marrano! ¡Y luego corta un cable, pero no el que no es!']
});
WORLDS[5]={title:'La dimensión del Marrano',start:'x_llegada',pos:[260,354],
  card:'El último portal. Juan cae en un mundo rosa, con nubes con forma de cerdo... Es la mente del Marrano.',
  cardVoice:'Bienvenido a mi mente, Juan. De aquí nadie sale cuerdo.',
  arrive:'Todo es rosa... ¿estoy dentro de la cabeza del Marrano? Qué asco.',
  taunt:['EL MARRANO','Juan Pablo está al final de mi mente. Para llegar, tendrás que pensar como un cerdo. JA JA JA.',1],
  map:{boxes:[['x_biblioteca',400,70,'Biblioteca'],['x_trono',580,70,'Trono'],['x_rescate',700,170,'Rescate'],['x_reloj',160,270,'Reloj'],['x_llegada',400,270,'Llegada'],['x_reves',640,270,'Al revés'],['x_puertas',400,170,'Puertas']],
    links:'M224 270H336M464 270H576M400 238V202M400 138V102M464 70H516M640 100L680 140'}};
})();
