/* =================== MUNDO 2: HOSPITAL ABANDONADO ===================
   Recepción · Pasillo (enfermera) · Habitación 13 · Farmacia · Rayos X · Quirófano · Morgue · Dirección
   Solución: teléfono (acertijo: edad del paciente de la 13) → historia clínica 87 → farmacia (87) →
   pilas + jeringa; habitación: llavecita + osito; mostrador (llavecita) → linterna UV; UV + pilas →
   pared del pasillo "CERDO" → armario del quirófano → bisturí; rayos X: osito tiene una llave, placa "gaveta 6";
   osito + bisturí → llave de la morgue → morgue → gaveta 6 → tarjeta → ascensor → dirección →
   monitor cardíaco (colores de los frascos de la farmacia) → portal. */
(function(){
const KK=K, k2=K2;
Object.assign(ITEMS,{
  llavecita:{n:'Llavecita',icon:`<circle cx="-6" cy="0" r="5" fill="none" stroke="#000" stroke-width="6"/><circle cx="-6" cy="0" r="5" fill="none" stroke="#c9ccd1" stroke-width="3"/><path d="M-1 0 H12 M8 0 V5" stroke="#000" stroke-width="6" stroke-linecap="round"/><path d="M-1 0 H12 M8 0 V5" stroke="#c9ccd1" stroke-width="3" stroke-linecap="round"/>`},
  linternaUV:{n:'Linterna UV (sin pilas)',icon:`<rect x="-14" y="-5" width="18" height="10" rx="2" fill="#5a2a8a" ${k2}/><path d="M4 -8 L14 -11 V11 L4 8Z" fill="#7a4aaa" ${k2}/>`},
  linternaUVOn:{n:'Linterna UV encendida',icon:`<path d="M14 -11 L28 -18 V18 L14 11Z" fill="#c07aff" opacity=".8"/><rect x="-14" y="-5" width="18" height="10" rx="2" fill="#5a2a8a" ${k2}/><path d="M4 -8 L14 -11 V11 L4 8Z" fill="#7a4aaa" ${k2}/>`},
  osito:{n:'Osito de peluche',icon:`<circle cx="-8" cy="-11" r="5" fill="#a0703c" ${k2}/><circle cx="8" cy="-11" r="5" fill="#a0703c" ${k2}/><circle cy="-4" r="10" fill="#b8844a" ${k2}/><ellipse cy="10" rx="11" ry="9" fill="#b8844a" ${k2}/><circle cx="-3" cy="-6" r="1.6"/><circle cx="3" cy="-6" r="1.6"/>`},
  bisturi:{n:'Bisturí',icon:`<path d="M-14 6 L4 -2" stroke="#000" stroke-width="7" stroke-linecap="round"/><path d="M-14 6 L4 -2" stroke="#2f8a3e" stroke-width="4" stroke-linecap="round"/><path d="M4 -2 L16 -8 Q14 0 6 2Z" fill="#dde" ${k2}/>`},
  llaveMorgue:{n:'Llave de la morgue',icon:`<circle cx="-8" cy="0" r="7" fill="none" stroke="#000" stroke-width="8"/><circle cx="-8" cy="0" r="7" fill="none" stroke="#6a8a9a" stroke-width="4"/><path d="M-1 0 H15 M9 0 V7 M14 0 V6" stroke="#000" stroke-width="8" stroke-linecap="round"/><path d="M-1 0 H15 M9 0 V7 M14 0 V6" stroke="#6a8a9a" stroke-width="4" stroke-linecap="round"/>${txt(-8,4,'M',9,'#fff')}`},
  jeringa:{n:'Jeringa con sedante',icon:`<rect x="-12" y="-4" width="20" height="8" fill="#cfe8ff" ${k2}/><rect x="-10" y="-3" width="12" height="6" fill="#4dd84d"/><path d="M8 0 H16 M-12 -6 V6 M-16 0 H-12" stroke="#000" stroke-width="2.5"/>`},
  antena:{n:'Antena de tele (de orejitas)',icon:`<path d="M0 8 L-12 -14 M0 8 L12 -14" stroke="#000" stroke-width="5" stroke-linecap="round"/><path d="M0 8 L-12 -14 M0 8 L12 -14" stroke="#c9ccd1" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="0" cy="10" rx="10" ry="5" fill="#333" ${k2}/>`},
  somnifero:{n:'Somníferos (pastillas para dormir)',icon:`<rect x="-9" y="-10" width="18" height="24" rx="3" fill="#fff" ${k2}/><rect x="-10" y="-15" width="20" height="7" rx="2" fill="#2f6db0" ${k2}/>${txt(0,7,'Zz',9,'#2f6db0')}`},
  palas:{n:'Palas de desfibrilador (sin corriente)',icon:`<rect x="-15" y="-8" width="12" height="16" rx="3" fill="#e9b949" ${k2}/><rect x="3" y="-8" width="12" height="16" rx="3" fill="#e9b949" ${k2}/><path d="M-9 8 Q0 18 9 8" stroke="#000" stroke-width="2.5" fill="none"/>`},
  desfib:{n:'Desfibrilador con cables',icon:`<rect x="-15" y="-8" width="12" height="16" rx="3" fill="#e9b949" ${k2}/><rect x="3" y="-8" width="12" height="16" rx="3" fill="#e9b949" ${k2}/><path d="M-9 8 Q0 18 9 8" stroke="#c1121f" stroke-width="3" fill="none"/><path d="M-2 -16 l-4 8 h6 l-4 8" stroke="#ffe25e" stroke-width="2.5" fill="none"/>`},
  tarjeta:{n:'Tarjeta del director',icon:`<rect x="-15" y="-10" width="30" height="20" rx="3" fill="#fff" ${k2}/><rect x="-15" y="-6" width="30" height="5" fill="#c1121f"/><circle cx="-7" cy="5" r="3.5" fill="#f0a9a5"/><path d="M0 5 H11" stroke="#000" stroke-width="2"/>`}
});
tagItems(2,['llavecita','linternaUV','linternaUVOn','osito','bisturi','llaveMorgue','jeringa','tarjeta','antena','somnifero','palas','desfib'],['jeringa','antena','somnifero']);
RECIPES.push(
  {a:'palas',b:'cablesArranque',out:'desfib',gone:['palas','cablesArranque'],say:'Conecto los cables de arranque a las palas... ¡el desfibrilador tiene corriente! ¡BZZZT!'},
  {a:'linternaUV',b:'pilas',out:'linternaUVOn',gone:['linternaUV','pilas'],say:'¡Linterna ultravioleta funcionando! Ahora veo lo que no se ve.'},
  {a:'osito',b:'bisturi',out:'llaveMorgue',gone:['osito'],say:'Perdón, osito... ¡zas! Le abro la panza y sale una llave que dice "MORGUE".'}
);
Object.assign(DEATHS,{
  enfermera:['¡LA ENFERMERA TE VIO!','Cuando la enfermera se da la vuelta y se pone todo rojo, NO TE MUEVAS. Juan se movió... y le pusieron una inyección de 3 litros.'],
  gaveta:['¡UNA MANO TE AGARRÓ!','Abriste la gaveta equivocada y algo frío te jaló adentro. La pista estaba en los rayos X.']
});
const HOSP=['#6f8a7c','#9cbcaa','#b6d1c2','#d3dcd4'];
const tilesFloor=`<g stroke="#b7c2b9" stroke-width="2"><path d="M0 380 L150 290 M800 380 L650 290 M267 380 L317 290 M533 380 L483 290 M75 335 H725"/></g>`;
const flicker=`<g class="flk" pointer-events="none"><path d="M330 40 V52 M470 40 V52" stroke="#000" stroke-width="2"/><rect x="320" y="52" width="160" height="8" fill="#eaffea" ${k2}/></g>`;

/* ---------- habitaciones ---------- */
Object.assign(ROOMS,{
h_recepcion:{name:'Recepción',start:[400,360],
  draw:f=>`${shell(HOSP)}${tilesFloor}${flicker}
   ${txt(400,90,'HOSPITAL SAN MARRANO',22,'#3a5a4a')}
   <g ${H('ascensor')}><rect x="520" y="130" width="100" height="160" fill="#9aa3a8" ${KK}/><path d="M570 130 V290" stroke="#000" stroke-width="3"/>
     ${f.h_ascensor?`<rect x="524" y="134" width="92" height="156" fill="#3a3a3a"/>`:''}<rect x="628" y="190" width="14" height="24" rx="3" fill="#333" ${k2}/><circle cx="635" cy="202" r="4" fill="${f.h_ascensor?'#4dd84d':'#e01b1b'}"/>
     ${txt(570,122,'DIRECCIÓN',12,'#222')}</g>
   <g ${H('mostrador')}><rect x="190" y="210" width="230" height="80" fill="#e8e2d0" ${KK}/><rect x="182" y="200" width="246" height="14" fill="#7a5a3a" ${k2}/>
     <rect x="300" y="236" width="70" height="22" fill="#d0c8b0" ${k2}/><rect x="327" y="244" width="16" height="5" fill="#999"/></g>
   <g ${H('telefono')}><rect x="210" y="184" width="40" height="18" rx="4" fill="#c1121f" ${k2}/><path d="M206 184 Q230 168 254 184" stroke="#000" stroke-width="6" fill="none"/></g>
   <g ${H('campana')}><path d="M384 200 Q384 182 398 182 Q412 182 412 200Z" fill="#e9b949" ${k2}/><circle cx="398" cy="180" r="3" fill="#e9b949" ${k2}/></g>
   <g ${H('silla')}><circle cx="150" cy="352" r="22" fill="none" stroke="#000" stroke-width="5"/><path d="M130 316 H170 V340 H130Z M168 300 V340" fill="#2f6db0" ${k2}/></g>
   <g ${H('teleEspera')}><rect x="440" y="96" width="70" height="52" rx="6" fill="#5a4a3a" ${KK}/><rect x="448" y="104" width="54" height="36" fill="#bbb" filter="url(#nz)"/>
     ${f.h_antena?'':`<path d="M475 96 L458 64 M475 96 L492 64" stroke="#000" stroke-width="5"/><path d="M475 96 L458 64 M475 96 L492 64" stroke="#c9ccd1" stroke-width="2.5"/>`}</g>
   <g ${H('planta')}><path d="M660 300 h30 l-5 30 h-20z" fill="#a0703c" ${k2}/><path d="M675 300 q-20 -40 -6 -60 M675 300 q10 -50 20 -56 M675 300 q-30 -20 -40 -26" stroke="#7a6a3a" stroke-width="4" fill="none"/></g>`,
  ex:[{to:'h_pasillo',...EX.R},{to:'h_direccion',a:[570,300,-90],at:[570,310],show:f=>f.h_ascensor}]},

h_pasillo:{name:'Pasillo del hospital',start:[400,360],
  draw:f=>{const red=f.h_enfPhase==='rojo'&&!f.h_enfDormida;return `${shell(HOSP)}${tilesFloor}
   ${doorB(250,'#d9d2bf','HAB. 13')}
   ${doorB(400,f.h_farmacia?'#2a3a2a':'#cfe0cf','FARMACIA',`<g ${H('teclado')}><rect x="444" y="196" width="30" height="38" fill="transparent"/><rect x="448" y="200" width="22" height="30" rx="3" fill="#333" ${k2}/><rect x="452" y="204" width="14" height="6" fill="${f.h_farmacia?'#4dd84d':'#5a1010'}"/></g>`)}
   ${doorB(550,'#c9d6e0','RAYOS X')}
   <g ${H('pared')}><rect x="160" y="60" width="160" height="56" fill="transparent"/>${f.h_uv?`<text x="240" y="100" text-anchor="middle" font-family="'Creepster',cursive" font-size="40" fill="#c07aff" opacity=".95">C E R D O</text>`:`<path d="M180 92 Q200 80 214 96" stroke="#7c9a8a" stroke-width="2" fill="none" opacity=".5"/>`}</g>
   ${doorR('#e8e2d0','QUIRÓFANO')}
   <g pointer-events="none">${red?`<rect width="800" height="380" fill="#ff0000" opacity=".22"/>`:flicker}</g>`},
  front:f=>{const red=f.h_enfPhase==='rojo'&&!f.h_enfDormida;
   return `<g transform="translate(640,300) scale(.8)" ${H('enfermera')}><rect x="-30" y="-150" width="60" height="150" fill="transparent"/>${nurse(red,f.h_enfDormida)}</g>`},
  enter:f=>{f.h_enfT=0;f.h_enfPhase='calma'},
  tick:f=>{
    if(f.h_enfDormida)return;
    f.h_enfT=(f.h_enfT||0)+.25;const t=f.h_enfT%11;
    const ph=t<6.5?'calma':t<7.5?'aviso':'rojo';
    if(ph!==f.h_enfPhase){f.h_enfPhase=ph;gRender();
      if(ph==='aviso'&&started){[0,.25,.5].forEach(d=>tone(900,.06,{type:'square',g:.08,delay:d}))}
      if(ph==='rojo'){if(started)SFX.sting();if(!f.h_enfAviso){f.h_enfAviso=1;say('¡La enfermera se dio la vuelta! ¡Quieto, quieto, quieto!',3000)}}
    }
    if(ph==='rojo'&&G.walking){G.walking=false;die('enfermera')}
  },
  ex:[{to:'h_recepcion',...EX.L},{to:'h_habitacion',...EX.B(250)},{to:'h_farmacia',...EX.B(400),lock:f=>f.h_farmacia?null:'La farmacia tiene un teclado. Necesito un código de 2 números.'},
      {to:'h_rayos',...EX.B(550)},{to:'h_quirofano',...EX.R}]},

h_habitacion:{name:'Habitación 13',start:[400,360],
  draw:f=>`${shell(['#7a8a70','#a8b89a','#c2d0b4','#d8d8c8'])}
   <g ${H('ventana')}><rect x="180" y="80" width="110" height="90" fill="#1a2040" ${KK}/><path d="M198 80V170M216 80V170M234 80V170M252 80V170M270 80V170" stroke="#555" stroke-width="5"/></g>
   <g ${H('cama')}><rect x="330" y="220" width="220" height="40" fill="#fff" ${KK}/><rect x="330" y="180" width="14" height="110" fill="#9aa3a8" ${k2}/><rect x="536" y="200" width="14" height="90" fill="#9aa3a8" ${k2}/>
     <path d="M380 220 Q440 196 530 216 L530 222 L380 222Z" fill="#cfe0f0" ${k2}/><circle cx="366" cy="208" r="16" fill="#e8d8c0" ${k2}/><path d="M358 206 h4 M370 206 h4 M360 214 h12" stroke="#000" stroke-width="2"/></g>
   <g ${H('almohada')}><ellipse cx="366" cy="226" rx="26" ry="9" fill="#fff" ${k2}/>${f.h_osito?'':`<circle cx="384" cy="222" r="5" fill="#b8844a" ${k2}/>`}</g>
   <g ${H('historia')}><rect x="440" y="250" width="34" height="42" fill="#fff8dc" ${k2}/><path d="M446 262h22M446 270h22M446 278h14" stroke="#000" stroke-width="2"/></g>
   <g ${H('mesita')}><rect x="580" y="240" width="56" height="50" fill="#d9c9a8" ${KK}/><rect x="588" y="252" width="40" height="14" fill="#c9b998" ${k2}/></g>
   <g ${H('suero')}><path d="M300 150 V290" stroke="#9aa3a8" stroke-width="4"/><path d="M286 150 h28 v30 q-14 10 -28 0z" fill="#cfe8ff" ${k2}/></g>`,
  ex:[{to:'h_pasillo',...EX.D}]},

h_farmacia:{name:'Farmacia',start:[400,360],
  draw:f=>`${shell(['#5a7a8a','#8ab0c0','#a8c8d6','#d6dfe2'])}
   <g ${H('frascos')}><rect x="170" y="90" width="260" height="10" fill="#7a5a3a" ${k2}/><rect x="170" y="160" width="260" height="10" fill="#7a5a3a" ${k2}/>
     ${['#3aa83a','#e01b1b','#e01b1b','#2f6db0','#e9b949'].map((c,i)=>`<rect x="${186+i*48}" y="56" width="26" height="34" rx="4" fill="${c}" ${k2}/><rect x="${190+i*48}" y="50" width="18" height="8" fill="#fff" ${k2}/>${txt(199+i*48,80,i+1,14,'#fff')}`).join('')}
     ${txt(300,150,'TOMA DIARIA: DE 1 A 5',14,'#1a2a3a')}</g>
   <g ${H('nevera')}><rect x="470" y="120" width="80" height="170" rx="6" fill="#f0f0ea" ${KK}/><rect x="476" y="130" width="68" height="70" fill="#cfe8ff" ${k2}/><rect x="534" y="214" width="6" height="34" rx="3" fill="#999"/></g>
   <g ${H('cajonF')}><rect x="190" y="230" width="220" height="60" fill="#b8c8d0" ${KK}/><rect x="200" y="242" width="90" height="18" fill="#a0b4be" ${k2}/><rect x="300" y="242" width="100" height="18" fill="#a0b4be" ${k2}/></g>
   <g ${H('pastillas')}><rect x="590" y="240" width="60" height="50" fill="#fff" ${KK}/>${f.h_somn?txt(620,270,'VACÍO',10,'#999'):txt(620,262,'SOMNÍ-',10,'#2f6db0')+txt(620,276,'FEROS',10,'#2f6db0')}</g>`,
  ex:[{to:'h_pasillo',...EX.D}]},

h_rayos:{name:'Rayos X',start:[400,360],
  draw:f=>`${shell(['#2a3440','#3a4a5a','#4a5a6a','#7a868f'])}
   <g ${H('negatoscopio')}><rect x="170" y="80" width="150" height="110" fill="#eaf4ff" ${KK}/><g stroke="#8aa0b4" stroke-width="5" fill="none"><path d="M245 95 V175 M215 110 Q245 100 275 110 M210 125 Q245 115 280 125 M212 140 Q245 130 278 140 M216 155 Q245 146 274 155"/></g><circle cx="245" cy="96" r="12" fill="none" stroke="#8aa0b4" stroke-width="5"/></g>
   <g ${H('maquina')}><rect x="420" y="80" width="40" height="160" fill="#9aa3a8" ${KK}/><rect x="380" y="130" width="140" height="40" rx="8" fill="#c9ccd1" ${KK}/><rect x="420" y="240" width="200" height="30" fill="#e8e8e0" ${KK}/><rect x="430" y="270" width="12" height="20" fill="#555"/><rect x="598" y="270" width="12" height="20" fill="#555"/>
     <path d="M470 150 h30" stroke="#e01b1b" stroke-width="4" class="blink"/></g>
   <g ${H('delantal')}><path d="M650 110 h50 l6 120 h-62z" fill="#4a5a8a" ${KK}/><circle cx="675" cy="104" r="5" fill="#999"/></g>`,
  ex:[{to:'h_pasillo',...EX.D}]},

h_quirofano:{name:'Quirófano',start:[400,360],
  draw:f=>`${shell(['#3a6a6a','#6aa0a0','#8ac0c0','#c8dcdc'])}
   <g ${H('lampara')}><path d="M400 40 V70" stroke="#000" stroke-width="4"/><ellipse cx="400" cy="84" rx="60" ry="18" fill="#c9ccd1" ${KK}/><ellipse cx="400" cy="90" rx="44" ry="8" fill="#fff6c0"/></g>
   <g ${H('mesa')}><rect x="300" y="210" width="200" height="22" fill="#9aa3a8" ${KK}/><rect x="390" y="232" width="20" height="58" fill="#777" ${k2}/>
     ${f.h_sabana?`<g transform="translate(400,200) scale(.45)">${pig()}</g>`:`<path d="M310 210 Q330 170 380 184 Q420 160 460 182 Q490 176 500 210Z" fill="#e8f4f4" ${k2}/>`}</g>
   <g ${H('armario')}><rect x="170" y="110" width="100" height="160" fill="${f.h_armario?'#5a6a6a':'#e8f0f0'}" ${KK}/><path d="M220 110 V270" stroke="#000" stroke-width="2"/>
     ${f.h_armario?'':`<rect x="200" y="180" width="40" height="22" rx="4" fill="#333" ${k2}/>${txt(220,196,'ABC',10,'#4dd84d')}`}</g>
   <g ${H('desfib')}><rect x="520" y="150" width="70" height="56" rx="6" fill="#d8d8d0" ${KK}/><rect x="528" y="158" width="36" height="22" fill="#1a3a1a"/><path d="M530 170 h8 l4 -8 l4 14 l4 -6 h10" stroke="#4dd84d" stroke-width="2" fill="none"/>
     ${f.h_palas?'':`<rect x="566" y="184" width="10" height="14" rx="2" fill="#e9b949" ${k2}/><rect x="578" y="184" width="10" height="14" rx="2" fill="#e9b949" ${k2}/>`}
     <path d="M530 206 V290 M580 206 V290" stroke="#777" stroke-width="5"/>${txt(555,148,'DESFIBRILADOR',9)}</g>
   <g ${H('bajada')}><rect x="560" y="300" width="130" height="50" fill="${f.h_morgue?'#111':'#7a868f'}" ${KK}/>${f.h_morgue?txt(625,330,'▼ MORGUE',13,'#fff'):`<circle cx="625" cy="325" r="7" fill="#e9b949" ${k2}/>${txt(625,346,'MORGUE',11,'#222')}`}</g>`,
  ex:[{to:'h_pasillo',...EX.L},{to:'h_morgue',a:[625,318,90],at:[620,350],show:f=>f.h_morgue}]},

h_morgue:{name:'Morgue',start:[400,360],
  draw:f=>`${shell(['#1e2a30','#3a4a52','#4a5a62','#6a767c'])}
   <g ${H('gavetas')}>${[...Array(9)].map((_,i)=>{const x=240+(i%3)*110,y=70+(i/3|0)*70;return `<rect x="${x}" y="${y}" width="96" height="58" fill="${f.h_gaveta&&i===5?'#111':'#b8c2c8'}" ${KK}/><rect x="${x+34}" y="${y+40}" width="28" height="8" rx="3" fill="#777"/>${txt(x+48,y+30,i+1,20,'#333')}`}).join('')}</g>
   <g ${H('camilla')}><rect x="560" y="260" width="140" height="18" fill="#9aa3a8" ${KK}/><path d="M566 260 Q570 250 600 256 L604 262Z" fill="#e8f4f4" ${k2}/>
     ${f.fw_zombi?`<g transform="translate(560,372) rotate(-90) scale(.6)">${zombie()}</g>${txt(640,330,'X_X',16,'#fff')}`:''}</g>`,
  ex:[{to:'h_quirofano',a:[150,300,-90],at:[220,340]}]},

h_direccion:{name:'Dirección',start:[400,360],
  draw:f=>`${shell(['#3a2a1a','#6a4a2a','#8a6a4a','#a89070'])}
   <g ${H('diplomas')}><rect x="170" y="80" width="70" height="50" fill="#fff8dc" ${KK}/><rect x="250" y="80" width="70" height="50" fill="#fff8dc" ${KK}/>${txt(205,110,'DR. EN',9)}${txt(205,122,'MALDAD',9)}${txt(285,110,'PROMOCIÓN',8)}${txt(285,124,'2013',12,'#c1121f')}</g>
   <g ${H('formol')}><rect x="304" y="190" width="40" height="46" rx="6" fill="#cfe8a0" opacity=".85" ${KK}/><rect x="300" y="184" width="48" height="10" fill="#777" ${k2}/>
     ${f.trozo2?'':`<g transform="translate(324,220)">${heartQ(1)}</g>`}</g>
   <g ${H('tvGrande')}><rect x="350" y="70" width="170" height="120" rx="12" fill="#222" ${KK}/><rect x="362" y="82" width="146" height="96" rx="6" fill="${G&&G.portal?'#7a2aff':'#0a0a0a'}"/>
     ${G&&G.portal?`<g transform="translate(435,130)"><g class="spin"><path d="M0 0 m-36 0 a36 36 0 1 0 36 -36 a24 24 0 1 0 -24 24 a12 12 0 1 0 12 -12" stroke="#e0b8ff" stroke-width="5" fill="none"/></g></g>`:''}</g>
   <g ${H('monitor')}><rect x="560" y="150" width="100" height="80" rx="6" fill="#222" ${KK}/><path d="M570 190 h20 l8 -20 l10 40 l8 -20 h40" stroke="${f.h_latido?'#4dd84d':'#e01b1b'}" stroke-width="3" fill="none"/>
     <rect x="596" y="230" width="28" height="60" fill="#555" ${k2}/>${['#3aa83a','#e01b1b','#2f6db0','#e9b949'].map((c,i)=>`<circle cx="${574+i*24}" cy="220" r="7" fill="${c}" ${k2}/>`).join('')}</g>
   <g ${H('esqueleto')}><path d="M220 160 V180" stroke="#000" stroke-width="2"/><circle cx="220" cy="190" r="12" fill="#f4f0e0" ${k2}/><path d="M220 202 V260 M200 220 H240 M204 230 H236 M206 240 H234 M220 260 L208 290 M220 260 L232 290 M200 212 L190 250 M240 212 L250 250" stroke="#f4f0e0" stroke-width="5"/></g>
   <rect x="300" y="236" width="200" height="14" fill="#5a3010" ${KK}/><rect x="310" y="250" width="180" height="40" fill="#4a2810" ${KK}/>`,
  ex:[{to:'h_recepcion',...EX.D}]}
});

/* enfermera muñeco del pasillo */
function nurse(red,sleep){
  return `<path d="M-26 0 L-20 -80 Q0 -92 20 -80 L26 0Z" fill="#f4f4f0" ${KK}/><path d="M-6 -80 V-40 M6 -80 V-40" stroke="#c1121f" stroke-width="4"/>
   <rect x="-12" y="-6" width="10" height="8" fill="#fff" ${k2}/><rect x="2" y="-6" width="10" height="8" fill="#fff" ${k2}/>
   <circle cy="-104" r="22" fill="${red?'#f6f1e4':'#e8dcc8'}" ${KK}/><path d="M-22 -112 Q0 -140 22 -112 L18 -120 Q0 -132 -18 -120Z" fill="#fff" ${k2}/><path d="M-4 -128 h8 M0 -132 v8" stroke="#c1121f" stroke-width="3"/>
   ${sleep?`<path d="M-12 -104 h8 M4 -104 h8" stroke="#000" stroke-width="3"/>${txt(30,-130,'Zzz',18,'#fff')}`
     :red?`<circle cx="-8" cy="-104" r="5" fill="#ff1a1a" ${k2}/><circle cx="8" cy="-104" r="5" fill="#ff1a1a" ${k2}/><path d="M-10 -90 Q0 -84 10 -90" stroke="#000" stroke-width="3" fill="none"/>`
     :`<path d="M-22 -100 Q0 -96 22 -100 L22 -104 Q0 -112 -22 -104Z" fill="#3a2a1a"/>`}
   <path d="M-20 -60 L-34 -20 M20 -60 L34 -20" stroke="#f4f4f0" stroke-width="10" stroke-linecap="round"/>
   ${red?`<path d="M34 -20 l14 -10 h10" stroke="#9aa3a8" stroke-width="5"/>`:''}`;
}
function teddyXray(){
  panel(`<svg viewBox="0 0 800 450"><rect x="150" y="20" width="500" height="410" fill="#0a1a2a" ${KK}/>
    <g fill="none" stroke="#7ab0d8" stroke-width="5" opacity=".9"><circle cx="340" cy="120" r="26"/><circle cx="460" cy="120" r="26"/><circle cx="400" cy="170" r="66"/><ellipse cx="400" cy="320" rx="90" ry="76"/></g>
    <g stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none"><circle cx="370" cy="310" r="18"/><path d="M388 310 H450 M436 310 V328 M450 310 V324"/></g>
    ${txt(400,415,'¡Hay una LLAVE dentro del osito!',24,'#fff')}</svg>`);
}
function chestXray(){
  panel(`<svg viewBox="0 0 800 450"><rect x="200" y="20" width="400" height="410" fill="#0a1a2a" ${KK}/>
    <g fill="none" stroke="#cfe8ff" stroke-width="6"><path d="M400 70 V350"/>${[0,1,2,3,4].map(i=>`<path d="M300 ${120+i*40} Q400 ${100+i*40} 500 ${120+i*40}"/>`).join('')}<circle cx="400" cy="60" r="34"/></g>
    <text x="400" y="290" text-anchor="middle" font-family="'Creepster',cursive" font-size="110" fill="#ffe25e" opacity=".85">6</text>
    ${txt(400,410,'PACIENTE: J.P. — TRASLADAR A LA MORGUE',18,'#fff')}</svg>`);
}

/* ---------- qué pasa al tocar cada cosa ---------- */
Object.assign(HS,{
h_recepcion:{
  telefono:{at:[230,306],do(){telRiddle()}},
  mostrador:{at:[335,306],uses:['llavecita'],do(){
    if(G.f.h_mostrador)return say('El cajón del mostrador ya está vacío.');
    if(G.sel==='llavecita'){G.f.h_mostrador=1;drop('llavecita');give('linternaUV');return say('La llavecita abre el cajón... ¡una linterna ultravioleta! Sin pilas, obvio.')}
    say('El cajón del mostrador tiene una cerradura pequeñita.')}},
  campana:{at:[398,306],do(){if(started)tone(1800,.6,{type:'triangle',g:.2});say('¡DING! ...Nadie viene. Qué mala atención.')}},
  silla:{at:[200,350],do(){say('Es la silla de ruedas donde desperté. Todavía está calientita.')}},
  planta:{at:[650,340],do(){say('Una planta muerta. Como todo en este hospital.')}},
  teleEspera:{at:[475,306],do(){if(G.f.h_antena)return say('La tele de la sala de espera, ahora sin antena. Solo da nieve.');G.f.h_antena=1;give('antena');gRender();
    say('Una tele vieja con antena de orejitas. Se la arranco... ¿pa\' qué? Ni idea. Pero me la llevo.')}},
  ascensor:{at:[570,310],uses:['tarjeta'],do(){
    if(G.f.h_ascensor)return useHotspot('go:h_direccion');
    if(G.sel==='tarjeta'){G.f.h_ascensor=1;drop('tarjeta');gRender();if(started)tone(1200,.3,{type:'triangle',g:.15});return say('¡Bip! La tarjeta del director funciona. El ascensor se abrió.')}
    say('Un ascensor a DIRECCIÓN. Tiene un lector de tarjetas.')}}
},
h_pasillo:{
  pared:{at:[240,312],uses:['linternaUVOn'],do(){
    if(G.f.h_uv)return say('Con la luz UV se lee en la pared: C E R D O.');
    if(G.sel==='linternaUVOn'){G.f.h_uv=1;gRender();return say('¡Con la luz ultravioleta aparece algo escrito en la pared! "C E R D O".')}
    say('La pared tiene manchas raras... como si alguien hubiera escrito algo invisible.')}},
  enfermera:{at:[560,340],uses:['jeringa'],do(){
    if(G.f.h_enfDormida)return say('Duerme como un bebé. Un bebé de 2 metros.');
    if(G.sel==='jeringa'){drop('jeringa');G.f.h_enfDormida=1;gRender();return say('¡Pinchazo! A ver qué tal te sienta tu propia medicina... ¡Se durmió!')}
    say('Una enfermera muñeco. Cuando se da la vuelta, mejor no moverse. Ojalá tuviera algo para dormirla.')}},
  teclado:{at:[455,306],do(){
    if(G.f.h_farmacia)return useHotspot('go:h_farmacia');
    openKeypad({title:'FARMACIA',len:2,code:'87',onOK:()=>{G.f.h_farmacia=1;gRender();say('¡Abierto! El paciente de la 13 tenía 87 años.')}})}}
},
h_habitacion:{
  ventana:{at:[235,306],do(){say('Rejas en la ventana. Afuera solo hay niebla... y un cerdo inflable gigante.')}},
  cama:{at:[440,310],do(){say('Un paciente maniquí. Tiene cara de que lleva aquí desde 1987.')}},
  almohada:{at:[380,310],do(){if(G.f.h_osito)return say('Solo es una almohada babeada.');G.f.h_osito=1;give('osito');say('Debajo de la almohada... ¡un osito de peluche! Pesa más de lo normal.')}},
  historia:{at:[456,312],do(){
    panel(`<svg viewBox="0 0 800 450"><rect x="230" y="20" width="340" height="410" fill="#fff8dc" ${KK}/>${txt(400,70,'HISTORIA CLÍNICA',26)}
      ${txt(260,130,'Habitación: 13',22,'#000','start')}${txt(260,175,'Nombre: Don Chancho',22,'#000','start')}${txt(260,220,'Edad: 87 años',26,'#c1121f','start')}
      ${txt(260,265,'Alergias: a las bromas',22,'#000','start')}${txt(260,310,'Diagnóstico: muy viejo',22,'#000','start')}${txt(400,400,'Firma: Dr. Marrano',18)}</svg>`);
    say('Edad: 87 años. Eso me sirve...',2200)}},
  mesita:{at:[600,312],do(){if(G.f.h_llavecita)return say('La mesita está vacía.');G.f.h_llavecita=1;give('llavecita');say('En la mesita hay una llavecita. ¿De qué será?')}},
  suero:{at:[300,312],do(){say('Un suero que dice "JUGO DE MORTADELA". Qué asco.')}}
},
h_farmacia:{
  frascos:{at:[300,306],do(){say('Cinco frascos en fila: verde, rojo, rojo, azul y amarillo. Dice "TOMA DIARIA: DE 1 A 5".')}},
  nevera:{at:[510,306],do(){const n=G.f.h_jeringa||0;
    if(n>=2)return say('Solo quedan vacunas caducadas.');
    if(G.inv.includes('jeringa'))return say('Hay otra jeringa con sedante, pero ya llevo una. Si la gasto, vuelvo por esta.');
    G.f.h_jeringa=n+1;give('jeringa');say(n?'¡Otra jeringa con sedante! La última que queda.':'Una jeringa con sedante para caballos. Perfecta para una enfermera.')}},
  cajonF:{at:[300,312],do(){if(G.f.h_pilas)return say('Solo quedan curitas usadas.');G.f.h_pilas=1;give('pilas');say('¡Pilas! Los hospitales siempre tienen de todo.')}},
  pastillas:{at:[620,320],do(){if(G.f.h_somn)return say('El frasco de somníferos ya está vacío.');G.f.h_somn=1;give('somnifero');gRender();say('Somníferos para elefantes. Yo no me tomo uno... pero me los llevo. Uno nunca sabe.')}}
},
h_rayos:{
  negatoscopio:{at:[245,306],do(){chestXray();say('Una radiografía con un 6 enorme. "Paciente J.P., trasladar a la morgue". ¡J.P.! ¡¿Juan Pablo?!',3500)}},
  maquina:{at:[470,310],uses:['osito'],do(){
    if(G.sel==='osito'){teddyXray();return say('¡El osito tiene una llave adentro! Necesito algo filoso para sacarla.',3000)}
    say('Una máquina de rayos X. Si le pongo algo encima, puedo ver por dentro.')}},
  delantal:{at:[660,330],do(){say('Un delantal de plomo. Pesa como 20 kilos. No me lo llevo.')}}
},
h_quirofano:{
  desfib:{at:[555,312],do(){if(G.f.h_palas)return say('Al desfibrilador le quité las palas. El aparato está muerto: el enchufe está quemado.');
    G.f.h_palas=1;give('palas');gRender();say('Un desfibrilador con el enchufe quemado. Me llevo las palas... aunque sin corriente no sirven de nada.')}},
  lampara:{at:[400,310],do(){say('Una lámpara de quirófano. Parpadea cada vez que el Marrano se ríe.')}},
  mesa:{at:[400,312],do(){if(G.f.h_sabana)return say('Un muñeco del Marrano con una nota: "¿TE ASUSTASTE?". Pues sí.');G.f.h_sabana=1;gRender();if(started)SFX.sting();say('¡Levanto la sábana y...! ¡AAAH! Es un muñeco del Marrano. Qué susto, cerdo.')}},
  armario:{at:[220,306],do(){
    if(G.f.h_armario)return say('El armario de instrumentos ya está abierto.');
    openLetters({title:'ARMARIO: 5 LETRAS',len:5,code:'CERDO',onOK:()=>{G.f.h_armario=1;gRender();give('bisturi');say('¡CERDO! Claro. Adentro hay un bisturí. Brilla mucho.')}})}},
  bajada:{at:[620,350],uses:['llaveMorgue'],do(){
    if(G.f.h_morgue)return useHotspot('go:h_morgue');
    if(G.sel==='llaveMorgue'){G.f.h_morgue=1;drop('llaveMorgue');gRender();if(started)SFX.door();return say('La llave entra... ¡clac! Hay unas escaleras que bajan a la morgue.')}
    say('Una trampilla con cerradura que dice MORGUE. Brrr.')}}
},
h_morgue:{
  gavetas:{at:[400,306],uses:['aceitera'],do(){
    if(G.f.h_gaveta)return say('Ya saqué lo que había en la gaveta 6.');
    if(G.sel==='aceitera'){G.f.h_aceite=1;drop('aceitera');gRender();return say('Le echo aceite a las bisagras de todas las gavetas... ¡ñiiic! Ahora abren suavecito.')}
    openChoice({title:'¿Qué gaveta abro?',cols:3,options:[...Array(9)].map((_,i)=>({label:String(i+1)})),correct:5,okMsg:'✔ Gaveta 6...',
      onOK:()=>{if(!G.f.h_aceite){G.f.h_oxido=1;return say('¡La gaveta 6 está OXIDADA! No abre ni a jalones. Necesito algo para aflojar el óxido... algo de mecánico.',3800)}
        G.f.h_gaveta=1;gRender();give('tarjeta');say('Gaveta 6... solo hay una sábana y... ¡la tarjeta del director! Juan Pablo no está aquí, menos mal.')},
      onWrong:()=>die('gaveta')})}},
  camilla:{at:[620,340],do(){say('El muerto quedó tieso en el piso. Tiene calcetines de cerditos. Mejor no lo toco.')}}
},
h_direccion:{
  diplomas:{at:[245,306],do(){say('"Doctor en Maldad. Promoción 2013". Este cerdo estudió y todo... 2013, qué año.')}},
  formol:{at:[324,312],uses:['imanCuerda','iman','cuerda'],do(){
    if(G.f.trozo2)return say('Un frasco de formol vacío. Bueno, con formol.');
    if(G.sel==='iman')return say('El imán solo no llega al fondo... y no pienso meter la mano en el formol. Si lo colgara de algo...');
    if(G.sel==='cuerda')return say('¿Pescar con una cuerda sola? Necesito algo en la punta que se pegue al metal.');
    if(G.sel==='imanCuerda'){G.f.trozo2=1;drop('imanCuerda');gRender();give('trozo2');return say('Bajo el imán con la cuerda... ¡CLIC! Se pegó al ganchito. ¡Saqué un trozo de corazón! Huele a formol, qué asco.')}
    say('Un frasco con formol y... ¡un trozo de corazón rosa! Tiene un ganchito de metal. No voy a meter la mano ahí ni loco.')}},
  esqueleto:{at:[220,320],do(){say('Un esqueleto de clase. Tiene puesta una peluca. Raro.')}},
  monitor:{at:[610,312],do(){
    if(G.f.h_latido&&!G.f.done2)return portalTo(0,'Ja ja ja... el hospital se te quedó pequeño, Juan. Te espero en mi desguace.');
    if(G.f.h_latido)return say('El monitor late tranquilo.');
    openSequence({title:'MONITOR CARDÍACO: dale el ritmo',buttons:[{id:'v',color:'#3aa83a'},{id:'r',color:'#e01b1b'},{id:'a',color:'#2f6db0'},{id:'y',color:'#e9b949'}],code:['v','r','r','a','y'],
      onOK:()=>{G.f.h_latido=1;gRender();say('¡Bip, bip, bip! El corazón late... ¡y la tele se encendió sola!');
        setTimeout(()=>portalTo(0,'Ja ja ja... el hospital se te quedó pequeño, Juan. Te espero en mi desguace. Juan Pablo ya está ahí... oliendo a aceite.'),2500)}})}},
  tvGrande:{at:[435,306],do(){say(G.f.h_latido?'La tele está haciendo cosas raras...':'La tele está conectada a ese monitor cardíaco. Hay que hacerlo latir.')}}
}
});
function telRiddle(){
  G.f.h_tel=1;if(started){[0,.4].forEach(d=>tone(1300,.25,{type:'square',g:.08,delay:d}))}
  tvSay('☎️ EL MARRANO','Bienvenido a mi hospital, Juan. La farmacia se abre con la EDAD del paciente de la habitación 13. Je je je.',1);
}
Object.assign(ROOM_INTRO,{
  h_pasillo:'Un pasillo largo... ¿y esa enfermera del fondo? No me gusta nada.',
  h_habitacion:'Habitación 13. Qué número tan bonito para un hospital embrujado.',
  h_farmacia:'¡La farmacia! Aquí tiene que haber algo útil.',
  h_rayos:'La sala de rayos X. Aquí se ve todo por dentro.',
  h_quirofano:'Un quirófano... con algo debajo de una sábana. No me gusta.',
  h_morgue:'La morgue. El muerto quedó tieso... Ahora, las gavetas.',
  h_direccion:'La oficina del director. Huele a colonia barata y a cerdo.'
});
/* emboscada en la morgue: el muerto de la camilla se levanta */
FIGHTS.h_morgue={id:'zombi',name:'el muerto',ambush:true,pos:[610,368],h:200,time:10,win:'desfib',
  parts:[{it:'palas',riddle:'"Una máquina del quirófano revive a los muertos... o los vuelve a dormir de un corrientazo. Llévate sus PALAS."',
          comp:'las palas no tienen corriente. Se complementan con unos CABLES gruesos de los que pasan corriente entre carros. ¿Dónde hay carros viejos?'},
         {it:'cablesArranque',riddle:'"Algo que dé un corrientazo..."',comp:'los cables solos no hacen nada. Se complementan con las PALAS del desfibrilador del quirófano.'}],
  draw:()=>zombie(),cry:'¡¡EL MUERTO DE LA CAMILLA SE LEVANTÓ!! ¡VIENE POR MÍ!',
  taunt:'Mi paciente favorito tiene hambre, Juan. Tienes 10 segundos. ¿Llevas algo para mandarlo a dormir otra vez?',
  partial:{palas:'¡Le pongo las palas y... nada! No tienen corriente. ¡Necesitan cables!',cablesArranque:'¿Le pego con los cables? ¡No le hace nada! Hay que conectarlos a algo.',
    jeringa:'¡La aguja se dobló! Este muerto tiene la piel de cuero.',linternaOn:'¡Le alumbro la cara! ...y me sonríe. Qué asco.'},
  winSay:'¡DESPEJEN! ¡ZAAAP! El muerto quedó tieso otra vez. Ahora sí está muerto-muerto.',
  onWin:f=>{f.h_zombi=1},killT:'¡EL MUERTO TE AGARRÓ!',killS:'El paciente de la morgue tenía hambre... y Juan olía a sándwich.',boom:'¡GRRAAH!',killScale:1.4,
  killFx:`<g fill="#7a9a5a" opacity=".8"><circle cx="330" cy="300" r="14"/><circle cx="360" cy="270" r="9"/><circle cx="300" cy="250" r="7"/></g>`};
Object.assign(ROOM_TAUNT,{
  h_pasillo:['EL MARRANO','Te presento a mi enfermera favorita. Cuando se da la vuelta... ni respires.',1],
  h_quirofano:['JUAN PABLO','¡JUAN! ¡Me trajeron a un hospital y me quieren poner una inyección! ¡Y EL PALO SIGUE AQUÍ!'],
  h_morgue:['EL MARRANO','Elige bien la gaveta, Juan... algunas tienen inquilinos con hambre. Je je.',1]
});
WORLDS[2]={title:'Hospital abandonado',start:'h_recepcion',pos:[200,354],
  card:'El remolino de la tele escupe a Juan en una silla de ruedas... en un hospital que huele a cerdo.',
  cardVoice:'Bienvenido a mi hospital, Juan. Aquí nadie sale sano.',
  arrive:'¡Ay! ¿Dónde estoy? ¿Un hospital? ¿¡Y por qué estoy en una silla de ruedas!?',
  taunt:['☎️ EL MARRANO','¡Riiing! ¿No vas a contestar el teléfono, Juan? Je je je...',1],
  map:{boxes:[['h_habitacion',220,70,'Hab. 13'],['h_farmacia',400,70,'Farmacia'],['h_rayos',580,70,'Rayos X'],['h_direccion',130,290,'Dirección'],['h_recepcion',130,180,'Recepción'],['h_pasillo',400,180,'Pasillo'],['h_quirofano',640,180,'Quirófano'],['h_morgue',640,300,'Morgue']],
    links:'M194 180H336M464 180H576M400 148V102M310 150L260 102M490 150L540 102M130 212V258M640 212V268'}};
})();
