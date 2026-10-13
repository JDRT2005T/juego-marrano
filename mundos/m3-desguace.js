/* =================== MUNDO 3: DESGUACE / FÁBRICA DE CARROS ===================
   Patio · Oficina (contenedor) · Perrera · Grúa · Almacén · Pintura · Prensa · Fábrica (cinta)
   Solución: oficina: lonchera → costilla; calendario (14/09) → cajón 1409 → llave de la grúa; nota "bujías caja 4".
   Perrera: costilla al perro (si pasas sin dormirlo, te muerde). Grúa (llave) → mover el gancho hasta el montón →
   se libera la puerta de la FÁBRICA. Fábrica: agarrar el pistón de la cinta (cuidado con el brazo robot).
   Almacén: caja 4 → bujía; batería descargada. Pintura: cargador → batería cargada; póster: palancas ↑↓↑↑↓.
   Prensa: palancas → sube la prensa → volante del carro aplastado (si entras con la prensa abajo, mueres).
   Marranomóvil (patio): pistón + bujía + batería cargada + volante → arrancar → portal. */
(function(){
const KK=K, k2=K2;
Object.assign(ITEMS,{
  costilla:{n:'Costilla asada',icon:`<path d="M-14 6 Q-6 -14 12 -8 Q16 4 4 10Z" fill="#a0522d" ${k2}/><path d="M8 -6 L16 -14" stroke="#000" stroke-width="6" stroke-linecap="round"/><path d="M8 -6 L16 -14" stroke="#f4f0e0" stroke-width="3" stroke-linecap="round"/>`},
  llaveGrua:{n:'Llave de la grúa',icon:`<rect x="-14" y="-6" width="12" height="12" rx="3" fill="#e9b949" ${k2}/><path d="M-2 0 H14 M8 0 V5 M12 0 V4" stroke="#000" stroke-width="6" stroke-linecap="round"/><path d="M-2 0 H14 M8 0 V5 M12 0 V4" stroke="#c9ccd1" stroke-width="3" stroke-linecap="round"/>`},
  piston:{n:'Pistón',icon:`<rect x="-9" y="-14" width="18" height="14" rx="3" fill="#c9ccd1" ${k2}/><path d="M-9 -9 H9 M-9 -5 H9" stroke="#555" stroke-width="1.5"/><path d="M0 0 V14" stroke="#000" stroke-width="7"/><path d="M0 0 V14" stroke="#999" stroke-width="4"/>`},
  bujia:{n:'Bujía',icon:`<rect x="-5" y="-15" width="10" height="12" rx="2" fill="#fff" ${k2}/><rect x="-7" y="-3" width="14" height="7" fill="#999" ${k2}/><path d="M0 4 V12 M-3 12 H3" stroke="#000" stroke-width="2.5"/>`},
  bateria:{n:'Batería descargada',icon:`<rect x="-15" y="-9" width="30" height="20" rx="2" fill="#333" ${k2}/><rect x="-11" y="-13" width="6" height="4" fill="#e01b1b"/><rect x="5" y="-13" width="6" height="4" fill="#999"/><rect x="-10" y="-3" width="6" height="8" fill="#e01b1b"/>`},
  bateriaOk:{n:'Batería cargada',icon:`<rect x="-15" y="-9" width="30" height="20" rx="2" fill="#333" ${k2}/><rect x="-11" y="-13" width="6" height="4" fill="#e01b1b"/><rect x="5" y="-13" width="6" height="4" fill="#999"/><rect x="-10" y="-3" width="20" height="8" fill="#4dd84d"/>`},
  aceitera:{n:'Aceitera de mecánico',icon:`<path d="M-12 12 V-2 Q-12 -8 -4 -8 H4 Q12 -8 12 -2 V12Z" fill="#c1121f" ${k2}/><path d="M6 -8 L18 -18" stroke="#000" stroke-width="5"/><path d="M6 -8 L18 -18" stroke="#999" stroke-width="2.5"/>`},
  cablesArranque:{n:'Cables de arranque',icon:`<path d="M-14 -10 Q0 14 14 -10" stroke="#000" stroke-width="7" fill="none"/><path d="M-14 -10 Q0 14 14 -10" stroke="#c1121f" stroke-width="3.5" fill="none"/><path d="M-14 -4 Q0 18 14 -4" stroke="#000" stroke-width="6" fill="none"/><path d="M-14 -4 Q0 18 14 -4" stroke="#333" stroke-width="3" fill="none"/>`},
  cableTV:{n:'Cable de antena enrollado',icon:`<ellipse rx="13" ry="10" fill="none" stroke="#000" stroke-width="7"/><ellipse rx="13" ry="10" fill="none" stroke="#e8e8e8" stroke-width="3.5"/><path d="M12 4 l6 6" stroke="#c9ccd1" stroke-width="4"/>`},
  aerosol:{n:'Aerosol de pintura (INFLAMABLE)',icon:`<rect x="-8" y="-10" width="16" height="24" rx="3" fill="#2f6db0" ${k2}/><rect x="-5" y="-16" width="10" height="7" fill="#999" ${k2}/><path d="M-4 0 h8" stroke="#ff8a1e" stroke-width="3"/>`},
  bocina:{n:'Bocina de carro',icon:`<path d="M-14 -6 H-2 L12 -14 V14 L-2 6 H-14Z" fill="#e9b949" ${k2}/><circle cx="-10" cy="0" r="3" fill="#333"/>`},
  iman:{n:'Imán',icon:`<path d="M-11 -10 a11 11 0 0 0 22 0 v14 h-7 v-14 a4 4 0 0 0 -8 0 v14 h-7z" fill="#c1121f" ${k2}/><rect x="-11" y="2" width="7" height="4" fill="#ddd"/><rect x="4" y="2" width="7" height="4" fill="#ddd"/>`},
  huesoDormido:{n:'Hueso con somníferos',icon:`<path d="M-12 -6 L12 6" stroke="#000" stroke-width="10" stroke-linecap="round"/><path d="M-12 -6 L12 6" stroke="#f4f0e0" stroke-width="6" stroke-linecap="round"/><circle cx="-14" cy="-6" r="4" fill="#f4f0e0" ${k2}/><circle cx="14" cy="6" r="4" fill="#f4f0e0" ${k2}/>${txt(4,-8,'Zz',9,'#2f6db0')}`},
  volante:{n:'Volante',icon:`<circle r="13" fill="none" stroke="#000" stroke-width="7"/><circle r="13" fill="none" stroke="#5a3a20" stroke-width="4"/><path d="M-12 0 H12 M0 0 V12" stroke="#000" stroke-width="4"/><circle r="4" fill="#c1121f" ${k2}/>`}
});
tagItems(3,['costilla','llaveGrua','piston','bujia','bateria','bateriaOk','volante','aceitera','cablesArranque','cableTV','aerosol','bocina','iman','huesoDormido'],['aceitera','cablesArranque','cableTV','aerosol','bocina','iman']);
RECIPES.push({a:'hueso',b:'somnifero',out:'huesoDormido',gone:['hueso','somnifero'],say:'Le meto los somníferos al hueso por el huequito... ¡un hueso para dormir perros!'});
Object.assign(DEATHS,{
  perro:['¡EL PERRO TE MORDIÓ!','Un pitbull de 80 kilos no es buen compañero de juegos. Había que darle algo rico primero.'],
  prensa:['¡APLASTADO!','Juan se metió debajo de la prensa con la prensa abajo... y quedó como una tortilla. Primero hay que subirla.'],
  robot:['¡EL BRAZO ROBOT TE AGARRÓ!','Pasaste por debajo del brazo robot de la fábrica... y te soldó a la cinta. Fíjate en el piso marcado.']
});
const YARD=['#6a7a8a','#9a8a6a','#b0a080','#8a7a5a'];
function junk(x,y,s){return `<g transform="translate(${x},${y}) scale(${s||1})"><path d="M-60 0 L-50 -40 L-20 -60 L20 -56 L50 -30 L62 0Z" fill="#7a5a4a" ${KK}/><circle cx="-30" cy="-20" r="12" fill="#222" ${k2}/><circle cx="24" cy="-34" r="10" fill="#222" ${k2}/><rect x="-10" y="-50" width="30" height="16" fill="#3a6a8a" ${k2}/><path d="M-40 -8 L40 -14" stroke="#000" stroke-width="2"/></g>`}
function car(x,y,f,full){
  const p=f||{};
  return `<g transform="translate(${x},${y}) scale(.86)">
   <path d="M-120 -10 Q-118 -50 -80 -54 L-50 -90 H50 L80 -54 Q118 -50 120 -10Z" fill="#c1121f" ${KK}/>
   <path d="M-44 -84 H-4 V-56 H-74Z M4 -84 H44 L72 -56 H4Z" fill="#9fd3ff" ${k2}/>
   <circle cx="-70" cy="-6" r="24" fill="#222" ${KK}/><circle cx="-70" cy="-6" r="10" fill="#999" ${k2}/><circle cx="72" cy="-6" r="24" fill="#222" ${KK}/><circle cx="72" cy="-6" r="10" fill="#999" ${k2}/>
   <g transform="translate(108,-58) scale(.28)">${pig()}</g>
   ${txt(0,-16,'MARRANOMÓVIL',13,'#fff')}
   ${full?'':`<g font-size="11">${['d_piston','d_bujia','d_bateria','d_volante','d_llave'].map((k,i)=>`<circle cx="${-56+i*28}" cy="-40" r="8" fill="${p[k]?'#4dd84d':'#555'}" ${k2}/>`).join('')}</g>`}
  </g>`;
}
function dog(sleep){
  return `<g><path d="M40 -10 Q70 -20 64 -50" stroke="#000" stroke-width="8" fill="none"/><path d="M40 -10 Q70 -20 64 -50" stroke="#a0805a" stroke-width="4" fill="none"/>
   <ellipse cx="10" cy="-30" rx="46" ry="30" fill="#a0805a" ${KK}/><rect x="-30" y="-10" width="14" height="30" rx="6" fill="#a0805a" ${k2}/><rect x="30" y="-10" width="14" height="30" rx="6" fill="#a0805a" ${k2}/>
   <circle cx="-40" cy="-50" r="30" fill="#b89068" ${KK}/><path d="M-66 -70 L-60 -40 L-52 -72Z M-14 -72 L-24 -42 L-30 -74Z" fill="#7a5a3a" ${k2}/>
   <path d="M-62 -28 Q-40 -18 -18 -28" fill="#e8d8c0" ${k2}/><ellipse cx="-40" cy="-40" rx="8" ry="5" fill="#000"/>
   <path d="M-60 -24 h40" stroke="#c1121f" stroke-width="8"/>${[-56,-46,-36,-26].map(x=>`<path d="M${x} -28 l3 -7 l3 7" fill="#ccc" ${k2}/>`).join('')}
   ${sleep?`<path d="M-54 -56 h8 M-32 -56 h8" stroke="#000" stroke-width="3"/>${txt(-10,-92,'Zzz',22,'#fff')}`:`<circle cx="-50" cy="-56" r="5" fill="#ff2a2a" ${k2}/><circle cx="-28" cy="-56" r="5" fill="#ff2a2a" ${k2}/><path d="M-52 -26 l4 8 l4 -8 l4 8 l4 -8 l4 8" stroke="#fff" stroke-width="2" fill="none"/>`}</g>`;
}

Object.assign(ROOMS,{
d_patio:{name:'Patio del desguace',start:[400,360],
  draw:f=>`${shell(['#5a6a7a','#9aa8b4','#b4c0ca','#8a7a5a'])}
   <rect x="150" y="40" width="500" height="250" fill="#b4c0ca"/>
   <g ${H('chatarra1')}>${junk(220,290,1.1)}</g><g ${H('chatarra2')}>${junk(600,290,1)}${f.d_bocina?'':`<path d="M640 262 h12 l8 -6 v16 l-8 -6 h-12z" fill="#e9b949" ${k2}/>`}</g>
   <g ${H('pila')}>${f.d_pila?`<rect x="350" y="170" width="100" height="120" fill="#222" ${KK}/>${txt(400,160,'FÁBRICA',14,'#fff')}`:`<rect x="350" y="170" width="100" height="120" fill="#3a3a3a" ${KK}/>${txt(400,160,'FÁBRICA',14,'#fff')}${junk(400,292,.9)}${junk(390,250,.8)}`}</g>
   <g ${H('portal')}><rect x="440" y="44" width="150" height="90" rx="8" fill="#222" ${KK}/><rect x="450" y="54" width="130" height="70" rx="4" fill="${G&&G.portal?'#7a2aff':'#2a2a3a'}"/>${G&&G.portal?`<g transform="translate(515,89)"><g class="spin"><path d="M0 0 m-26 0 a26 26 0 1 0 26 -26 a16 16 0 1 0 -16 16" stroke="#e0b8ff" stroke-width="4" fill="none"/></g></g>`:txt(515,96,'SALIDA',16,'#888')}
     <path d="M470 134 V160 M560 134 V160" stroke="#000" stroke-width="5"/></g>
   <g ${H('carro')}>${car(400,362,f)}</g>
   ${doorL('#5a7a5a','OFICINA')}${doorR('#6a5a4a','PERRERA')}`,
  ex:[{to:'d_oficina',...EX.L},{to:'d_perrera',...EX.R},{to:'d_pintura',a:[250,300,-90],at:[300,318]},{to:'d_prensa',a:[620,300,-90],at:[560,318]},
      {to:'d_cinta',a:[400,300,-90],at:[400,312],show:f=>f.d_pila}]},

d_oficina:{name:'Oficina del contenedor',start:[400,360],
  draw:f=>`${shell(['#4a5a4a','#6a8a6a','#7a9a7a','#a09070'])}
   <g stroke="#4a6a4a" stroke-width="3">${[0,1,2,3,4,5,6,7,8].map(i=>`<path d="M${170+i*56} 40 V290"/>`).join('')}</g>
   <g ${H('calendario')}><rect x="180" y="80" width="80" height="90" fill="#fff" ${KK}/><rect x="180" y="80" width="80" height="18" fill="#c1121f"/>${txt(220,94,'SEPTIEMBRE',9,'#fff')}
     <g fill="#ccc">${[...Array(20)].map((_,i)=>`<rect x="${186+(i%5)*14}" y="${104+(i/5|0)*14}" width="10" height="10"/>`).join('')}</g><circle cx="233" cy="123" r="9" fill="none" stroke="#c1121f" stroke-width="3"/></g>
   <g ${H('poster')}><rect x="290" y="80" width="90" height="70" fill="#fff8dc" ${KK}/>${txt(335,108,'BUJÍAS:',12)}${txt(335,128,'CAJA 4',16,'#c1121f')}</g>
   <g ${H('escritorio')}><rect x="400" y="220" width="200" height="14" fill="#7a5a3a" ${KK}/><rect x="410" y="234" width="180" height="56" fill="#6a4a2a" ${KK}/>
     <rect x="500" y="244" width="80" height="22" fill="#8a6a4a" ${k2}/><rect x="566" y="248" width="10" height="14" fill="#333"/></g>
   <g ${H('aceitera')}>${f.d_aceitera?'':`<path d="M292 300 V284 Q292 278 300 278 H308 Q316 278 316 284 V300Z" fill="#c1121f" ${k2}/><path d="M310 278 L322 266" stroke="#000" stroke-width="4"/>`}</g>
   <g ${H('lonchera')}>${false?'':`<rect x="430" y="196" width="50" height="26" rx="4" fill="#2f6db0" ${k2}/><path d="M444 196 v-8 h22 v8" stroke="#000" stroke-width="3" fill="none"/>`}</g>
   <g ${H('compu')}><rect x="520" y="170" width="60" height="46" rx="3" fill="#ddd" ${k2}/><rect x="526" y="176" width="48" height="32" fill="#2a4a2a"/>${txt(550,196,'SOLITARIO',7,'#4dd84d')}</g>`,
  ex:[{to:'d_patio',...EX.R}]},

d_perrera:{name:'La perrera',start:[400,360],
  draw:f=>`${shell(['#4a3a2a','#7a6a4a','#8a7a5a','#9a8a6a'])}
   <path d="M150 120 H650 M150 200 H650" stroke="#555" stroke-width="3"/>${[...Array(26)].map((_,i)=>`<path d="M${150+i*20} 60 V290" stroke="#666" stroke-width="2"/>`).join('')}
   <g ${H('casita')}><path d="M180 290 V220 L230 180 L280 220 V290Z" fill="#a0522d" ${KK}/><path d="M212 290 V250 Q230 236 248 250 V290Z" fill="#222"/>${txt(230,212,'FIRULAIS',11,'#fff')}</g>
   <g ${H('escalera')}><path d="M380 290 L390 40 M430 290 L420 40" stroke="#000" stroke-width="7"/><path d="M380 290 L390 40 M430 290 L420 40" stroke="#e9b949" stroke-width="3"/>${[70,110,150,190,230,270].map(y=>`<path d="M386 ${y} H424" stroke="#e9b949" stroke-width="5"/>`).join('')}${txt(405,36,'GRÚA',14,'#fff')}</g>
   ${doorR('#5a5a6a','ALMACÉN')}
   ${f.d_perro?`<g ${H('perro')} transform="translate(560,370) scale(.7)">${dog(true)}</g>`:''}`,
  ex:[{to:'d_patio',...EX.L},{to:'d_grua',a:[405,300,-90],at:[460,318],lock:f=>f.d_perro?null:'¡Firulais no me deja pasar!'},{to:'d_almacen',...EX.R,lock:f=>f.d_perro?null:'¡Firulais no me deja pasar!'}]},

d_grua:{name:'Cabina de la grúa',start:[400,360],
  draw:f=>`${shell(['#3a4a5a','#5a7a9a','#9fd3ff','#555'])}
   <rect x="170" y="60" width="460" height="150" fill="#bfe8ff" ${KK}/><path d="M400 60 V210" stroke="#000" stroke-width="4"/>
   ${junk(260,200,.6)}${junk(540,200,.6)}<path d="M450 60 V120" stroke="#333" stroke-width="3"/><path d="M440 120 Q450 140 460 120" stroke="#e9b949" stroke-width="5" fill="none"/>
   <g ${H('iman')}><rect x="190" y="250" width="70" height="40" fill="#5a5a5a" ${KK}/>${f.d_iman?'':`<path d="M210 250 a15 15 0 0 0 30 0 v-16 h-9 v16 a6 6 0 0 0 -12 0 v-16 h-9z" fill="#c1121f" ${k2}/>`}</g>
   <g ${H('controles')}><rect x="300" y="230" width="200" height="60" fill="#e9b949" ${KK}/><rect x="330" y="214" width="12" height="24" fill="#333" ${k2}/><circle cx="336" cy="210" r="9" fill="#c1121f" ${k2}/><rect x="440" y="244" width="40" height="24" rx="4" fill="#222" ${k2}/>
     <circle cx="460" cy="256" r="6" fill="${f.d_grua?'#4dd84d':'#5a1010'}"/>${f.d_llaveGruaPuesta?`<rect x="380" y="246" width="20" height="10" fill="#c9ccd1" ${k2}/>`:''}</g>`,
  ex:[{to:'d_perrera',...EX.D}]},

d_almacen:{name:'Almacén de piezas',start:[400,360],
  draw:f=>`${shell(['#4a4a3a','#7a7a5a','#8a8a6a','#a09a80'])}
   <g ${H('cajas')}>${[0,1,2,3,4,5].map(i=>{const x=180+(i%3)*150,y=80+(i/3|0)*100;return `<rect x="${x}" y="${y}" width="110" height="70" fill="#c49a5c" ${KK}/><path d="M${x} ${y+20} H${x+110}" stroke="#000" stroke-width="2"/>${txt(x+55,y+54,'CAJA '+(i+1),16)}`}).join('')}</g>
   <rect x="170" y="150" width="460" height="8" fill="#5a3a20" ${k2}/><rect x="170" y="250" width="460" height="8" fill="#5a3a20" ${k2}/>
   ${f.d_bateriaTomada?'':`<g ${H('bateria')}><rect x="560" y="300" width="56" height="36" rx="3" fill="#333" ${KK}/><rect x="568" y="292" width="10" height="8" fill="#e01b1b"/><rect x="596" y="292" width="10" height="8" fill="#999"/></g>`}`,
  ex:[{to:'d_perrera',...EX.L}]},

d_pintura:{name:'Taller de pintura',start:[400,360],
  draw:f=>`${shell(['#4a3a5a','#7a5a8a','#9a7aaa','#a8a0b0'])}
   <g opacity=".7">${['#e01b1b','#2f6db0','#e9b949','#3aa83a'].map((c,i)=>`<circle cx="${220+i*120}" cy="${100+(i%2)*30}" r="${30+i*4}" fill="${c}"/>`).join('')}</g>
   <g ${H('posterP')}><rect x="180" y="150" width="120" height="90" fill="#fff8dc" ${KK}/>${txt(240,170,'PRENSA: SEGURIDAD',10)}
     ${[1,0,1,1,0].map((u,i)=>`<path d="M${196+i*22} ${u?212:192} l8 ${u?-14:14} l8 ${u?14:-14}" fill="${u?'#4dd84d':'#e01b1b'}" ${k2}/>`).join('')}${txt(240,234,'↑ ↓ ↑ ↑ ↓',14)}</g>
   <g ${H('cargador')}><rect x="480" y="210" width="100" height="80" rx="6" fill="#555" ${KK}/><rect x="496" y="222" width="68" height="26" fill="#111"/>
     ${f.d_cargando?`<rect x="498" y="224" width="${Math.min(64,(f.d_carga||0)*16)}" height="22" fill="#4dd84d"/>`:txt(530,240,f.d_bateriaOk?'100%':'CARGADOR',10,'#4dd84d')}
     <path d="M500 290 Q480 320 520 330" stroke="#c1121f" stroke-width="4" fill="none"/><path d="M560 290 Q590 320 550 330" stroke="#111" stroke-width="4" fill="none"/>
     ${f.d_cargando?`<rect x="510" y="318" width="40" height="26" rx="3" fill="#333" ${k2}/>`:''}</g>
   <g ${H('aerosol')}>${f.d_aerosol?'':`<rect x="452" y="262" width="14" height="28" rx="3" fill="#2f6db0" ${k2}/><rect x="455" y="256" width="8" height="7" fill="#999" ${k2}/>${txt(459,252,'🔥',10)}`}</g>
   <g ${H('taquilla')}><rect x="596" y="110" width="50" height="180" fill="${f.d_taquilla?'#333':'#7a8a9a'}" ${KK}/><path d="M604 126 h34 M604 134 h34 M604 142 h34" stroke="#000" stroke-width="2"/>
     ${txt(621,104,'DR. MARRANO',8,'#fff')}${f.d_taquilla?'':`<rect x="610" y="190" width="22" height="28" rx="3" fill="#222" ${k2}/><circle cx="621" cy="198" r="3" fill="#e01b1b"/>`}</g>
   <g ${H('cabina')}><rect x="340" y="120" width="110" height="170" fill="#cfd8e0" opacity=".7" ${KK}/>${txt(395,140,'CABINA',12)}<path d="M360 290 Q395 230 430 290" fill="#2f6db0" opacity=".6"/></g>`,
  ex:[{to:'d_patio',...EX.D}]},

d_prensa:{name:'La prensa',start:[400,360],
  draw:f=>{const up=f.d_prensaArriba;return `${shell(['#3a3a3a','#5a5a5a','#6a6a6a','#7a7060'])}
   <rect x="250" y="40" width="20" height="300" fill="#555" ${KK}/><rect x="530" y="40" width="20" height="300" fill="#555" ${KK}/>
   <g style="transition:transform .8s" transform="translate(0,${up?-40:110})"><rect x="260" y="60" width="280" height="80" fill="#e9b949" ${KK}/>${[0,1,2,3,4,5,6].map(i=>`<path d="M${270+i*40} 60 l20 80" stroke="#000" stroke-width="10"/>`).join('')}</g>
   <polygon points="300,330 500,330 520,372 280,372" fill="#555" ${KK}/>
   <g ${H('aplastado')}>${up&&!f.d_volanteT?`<path d="M310 330 Q330 300 360 304 L440 300 Q480 304 490 330Z" fill="#2f6db0" ${k2}/><circle cx="400" cy="318" r="12" fill="none" stroke="#5a3a20" stroke-width="5"/>`:`<path d="M310 330 Q400 ${up?306:318} 490 330Z" fill="#2f6db0" ${k2}/>`}</g>
   <g ${H('panel')}><rect x="600" y="190" width="70" height="100" rx="6" fill="#333" ${KK}/>${[0,1,2,3,4].map(i=>`<rect x="${608+i*12}" y="210" width="8" height="40" fill="#777"/>`).join('')}<circle cx="635" cy="270" r="8" fill="${up?'#4dd84d':'#e01b1b'}" ${k2}/></g>
   ${up?'':`<g pointer-events="none">${txt(400,300,'⚠ PELIGRO ⚠',18,'#e9b949')}</g>`}`},
  ex:[{to:'d_patio',...EX.D}]},

d_cinta:{name:'La fábrica',start:[400,360],
  draw:f=>`${shell(['#2a2a3a','#4a4a5a','#5a5a6a','#6a6a70'])}
   <rect x="150" y="196" width="500" height="34" fill="#333" ${KK}/>${[...Array(12)].map((_,i)=>`<circle cx="${170+i*42}" cy="213" r="12" fill="#555" ${k2}/>`).join('')}
   ${beltItems(f)}
   <g ${H('robot')}><rect x="560" y="40" width="40" height="50" fill="#e9b949" ${KK}/><path d="M580 90 L540 150 L580 186" stroke="#000" stroke-width="18" fill="none" class="robotarm"/><path d="M580 90 L540 150 L580 186" stroke="#e9b949" stroke-width="12" fill="none"/>
     <path d="M570 186 h20 M572 186 l-6 12 M588 186 l6 12" stroke="#000" stroke-width="5"/></g>
   <polygon points="500,330 640,330 660,372 490,372" fill="#e9b949" opacity=".85" ${k2}/>${[0,1,2,3,4].map(i=>`<path d="M${506+i*30} 334 l18 34" stroke="#000" stroke-width="8"/>`).join('')}
   <g ${H('torno')}><rect x="180" y="250" width="120" height="40" fill="#3a6a8a" ${KK}/><circle cx="200" cy="246" r="10" fill="#999" ${k2}/></g>`,
  ex:[{to:'d_patio',...EX.D}]}
});
/* cosas que pasan por la cinta: hay que agarrar el pistón */
function beltItems(f){
  const it=[['zapato','#5a3a20'],['piston','#c9ccd1'],['tuerca','#999'],['pato','#e9b949']];
  return `<g>${it.map(([id,c],i)=>(id==='piston'&&f.d_pistonT)?'':`<g class="beltItem" style="animation-delay:-${i*1.6}s"><g ${H('cinta_'+id)} transform="translate(0,192)">
    ${id==='piston'?`<rect x="-14" y="-24" width="28" height="22" rx="4" fill="${c}" ${KK}/><path d="M0 -2 V14" stroke="#000" stroke-width="8"/>`
     :id==='zapato'?`<path d="M-18 0 Q-18 -18 0 -18 L6 -8 L20 -6 Q22 0 20 2 H-18Z" fill="${c}" ${KK}/>`
     :id==='pato'?`<circle cx="0" cy="-12" r="12" fill="${c}" ${KK}/><path d="M10 -12 l10 3 l-10 3Z" fill="#ff8a1e" ${k2}/><circle cx="4" cy="-15" r="2"/>`
     :`<path d="M-12 -6 l6 -10 h12 l6 10 l-6 10 h-12Z" fill="${c}" ${KK}/><circle r="5" cy="-6" fill="#333"/>`}
    <rect x="-24" y="-30" width="48" height="44" fill="transparent"/></g></g>`).join('')}</g>`;
}
TRAPS.d_cinta=[{x1:490,x2:660,y1:328,y2:374,death:'robot'}];

Object.assign(HS,{
d_patio:{
  pila:{at:[400,312],do(){say(G.f.d_pila?'La puerta de la fábrica quedó libre.':'Un montón de carros aplastados tapa la puerta de la FÁBRICA. Necesitaría una grúa para moverlos.')}},
  portal:{at:[515,312],do(){say('Un cartel con una tele que dice SALIDA. Está apagada... como mi esperanza.')}},
  chatarra1:{at:[230,318],do(){if(G.f.d_cables)return say('Un carro destrozado. Ya le saqué los cables.');G.f.d_cables=1;give('cablesArranque');
    say('En el baúl de este carro destrozado hay unos cables de arranque, rojo y negro. ¿Pa\' qué? Bueno... me los llevo.')}},
  chatarra2:{at:[590,318],do(){if(G.f.d_bocina)return say('Este carro ya no tiene bocina. Ni dignidad.');G.f.d_bocina=1;give('bocina');gRender();if(started)tone(330,.5,{type:'square',g:.12});
    say('Le arranco la bocina a este carro... ¡MEEEC! Todavía suena. Me la llevo.')}},
  carro:{at:[300,360],uses:['piston','bujia','bateriaOk','bateria','volante','llaveCarro'],do(){
    const f=G.f;
    if(G.sel==='bateria')return say('Esta batería está descargada. Habría que cargarla primero.');
    const map={piston:'d_piston',bujia:'d_bujia',bateriaOk:'d_bateria',volante:'d_volante',llaveCarro:'d_llave'};
    if(G.sel&&map[G.sel]){f[map[G.sel]]=1;drop(G.sel);gRender();if(started)SFX.clank()}
    const falta=[!f.d_piston&&'el pistón',!f.d_bujia&&'la bujía',!f.d_bateria&&'una batería cargada',!f.d_volante&&'el volante',!f.d_llave&&'la llave (la del llavero de cerdito, que no sé dónde está)'].filter(Boolean);
    if(falta.length)return say('El Marranomóvil. Le falta: '+falta.join(', ')+'.');
    if(f.d_listo)return;
    f.d_listo=1;if(started){tone(70,2.5,{type:'sawtooth',g:.14,slide:180});noise(2,{f:400,g:.3,a:.3})}
    say('¡Todo montado! Giro la llave y... ¡BRRRUM! ¡ARRANCÓ! ¡Ingeniería mecánica, nena!',3500);
    setTimeout(()=>portalTo(0,'¿Arreglaste mi carro? Qué tierno. Ahora vente a mi circo... Juan Pablo es la atracción principal. JA JA JA.'),3800)}}
},
d_oficina:{
  calendario:{at:[220,312],do(){say('Un calendario de septiembre. Tiene marcado el día 14 con un círculo: "Cumple de mamá Marrana". 14 del 09...')}},
  poster:{at:[335,312],do(){say('Una nota pegada: "BUJÍAS: CAJA 4". Me sirve.')}},
  lonchera:{at:[455,312],do(){say('La lonchera del Marrano. Está vacía: solo hay migajas y una nota: "Firulais, no te comas mi almuerzo".')}},
  aceitera:{at:[304,330],do(){if(G.f.d_aceitera)return say('Ya me llevé la aceitera.');G.f.d_aceitera=1;give('aceitera');gRender();say('Una aceitera de mecánico. Sirve para aflojar cosas oxidadas. Me la llevo, por si acaso.')}},
  escritorio:{at:[540,312],do(){
    if(G.f.d_cajon)return say('El cajón del escritorio ya está vacío.');
    openKeypad({title:'CAJÓN: 4 NÚMEROS',len:4,code:'1409',onOK:()=>{G.f.d_cajon=1;give('llaveGrua');say('¡14-09, el cumple de su mamá! Adentro está la llave de la grúa.')}})}},
  compu:{at:[550,312],do(){say('El ordenador tiene un solitario a medio jugar. Hasta los villanos se aburren.')}}
},
d_perrera:{
  perro:{at:[520,354],do(){say('Firulais duerme abrazado al hueso. Ronca como una moto. Buen chico.')}},
  casita:{at:[230,312],do(){say('"FIRULAIS". La casita tiene una tele chiquita adentro. El perro ve novelas.')}},
  escalera:{at:[460,318],do(){useHotspot('go:d_grua')}}
},
d_grua:{
  iman:{at:[225,320],do(){if(G.f.d_iman)return say('Una caja de herramientas vacía.');G.f.d_iman=1;give('iman');gRender();say('¡Un imán de repuesto del gancho de la grúa! Atrae todo lo que sea de metal.')}},
  controles:{at:[400,312],uses:['llaveGrua'],do(){
    const f=G.f;
    if(f.d_grua)return say('Ya moví los carros de la puerta de la fábrica.');
    if(G.sel==='llaveGrua'){f.d_llaveGruaPuesta=1;drop('llaveGrua');gRender();say('La llave entra y la grúa se enciende.',1800)}
    if(!f.d_llaveGruaPuesta)return say('Los controles de la grúa. Sin la llave no arranca.');
    openCrane({title:'GRÚA: lleva el gancho al montón azul (sin chocar)',size:5,start:[0,0],target:[4,2],walls:[[1,0],[1,1],[1,3],[3,1],[3,2],[3,3],[2,4]],
      onOK:()=>{f.d_grua=1;f.d_pila=1;gRender();if(started){SFX.clank();SFX.thud()}say('¡Enganchado! Levanto el montón y lo tiro a un lado. ¡La puerta de la FÁBRICA quedó libre!')}})}}
},
d_almacen:{
  cajas:{at:[400,312],do(){
    if(G.f.d_bujia_c)return say('Ya tengo la bujía de la caja 4.');
    openChoice({title:'¿Qué caja abro?',cols:3,options:[1,2,3,4,5,6].map(n=>({label:'CAJA '+n})),correct:3,
      onOK:()=>{G.f.d_bujia_c=1;give('bujia');say('¡Caja 4: bujías! Me llevo una.')},
      onWrong:()=>say(['Tornillos oxidados. No.','¡Una araña! ...Cierro rápido.','Revistas viejas de carros. Qué nostalgia.','Calcetines sucios. ¿Por qué?','Más tornillos.'][Math.floor(Math.random()*5)])})}},
  bateria:{at:[588,350],do(){G.f.d_bateriaTomada=1;give('bateria');say('Una batería de carro. El indicador está en rojo: descargada.')}}
},
d_pintura:{
  posterP:{at:[240,312],do(){say('Un cartel: "PRENSA: SEGURIDAD". Dibujó flechas: arriba, abajo, arriba, arriba, abajo.')}},
  cabina:{at:[395,312],do(){if(!G.f.d_cableTV){G.f.d_cableTV=1;give('cableTV');return say('Detrás de la cabina de pintura hay un cable de antena enrollado. ¿Pa\' qué lo quiero? ...Me lo llevo.')}
    say('La cabina de pintura. Huele tan fuerte que veo cerditos voladores.')}},
  aerosol:{at:[459,318],do(){if(G.f.d_aerosol)return say('Ya me llevé el aerosol.');G.f.d_aerosol=1;give('aerosol');gRender();say('Un aerosol de pintura azul. Dice "MUY INFLAMABLE: NO ACERCAR AL FUEGO". Mmm... interesante.')}},
  taquilla:{at:[610,330],do(){
    if(G.f.d_taquilla)return say('La taquilla del Dr. Marrano ya está vacía.');
    openKeypad({title:'TAQUILLA DR. MARRANO · clave: "el año en que me gradué"',len:4,code:'2013',onOK:()=>{G.f.d_taquilla=1;gRender();give('trozo3');say('¡2013! Adentro hay una bata de doctor... ¡y un trozo de corazón rosa!')}})}},
  cargador:{at:[530,312],uses:['bateria'],do(){
    const f=G.f;
    if(f.d_bateriaOk)return say('El cargador ya terminó.');
    if(f.d_cargando)return say('Está cargando... paciencia.');
    if(G.sel!=='bateria')return say('Un cargador de baterías de carro.');
    drop('bateria');f.d_cargando=1;f.d_carga=0;gRender();say('Conecto la batería... ¡cargando! Tarda unos segundos.');
    const iv=setInterval(()=>{if(!G||G.over){clearInterval(iv);return}f.d_carga++;if(G.room==='d_pintura')gRender();
      if(f.d_carga>=4){clearInterval(iv);f.d_cargando=0;f.d_bateriaOk=1;give('bateriaOk');say('¡Batería al 100%! Me la llevo.')}},1000)}}
},
d_prensa:{
  panel:{at:[620,330],do(){
    if(G.f.d_prensaArriba)return say('La prensa está arriba y bloqueada. Seguro... creo.');
    openLevers({title:'PRENSA: posición de seguridad',n:5,code:'10110',ok:'ACTIVAR',onOK:()=>{G.f.d_prensaArriba=1;gRender();if(started)SFX.clank();say('¡La prensa subió y se trabó arriba! Ahora puedo meterme... con miedo.')}})}},
  aplastado:{at:[400,352],do(){
    if(!G.f.d_prensaArriba)return die('prensa');
    if(G.f.d_volanteT)return say('Ese carro ya no tiene nada útil.');
    G.f.d_volanteT=1;give('volante');say('Del carro aplastado saco el volante. ¡Está intacto!')}}
},
d_cinta:{
  robot:{at:[460,330],do(){say('Un brazo robot que suelda todo lo que pasa debajo. Mejor no pisar la zona amarilla.')}},
  torno:{at:[240,312],do(){say('Un torno. Si tuviera tiempo, me haría un llavero con forma de cerdo.')}},
  cinta_piston:{at:[360,312],do(){if(G.f.d_pistonT)return;G.f.d_pistonT=1;give('piston');say('¡Lo agarré al vuelo! Un pistón nuevecito.')}},
  cinta_zapato:{at:[360,312],do(){say('Un zapato. ¿Qué fabrican aquí?')}},
  cinta_tuerca:{at:[360,312],do(){say('Una tuerca. Hay miles.')}},
  cinta_pato:{at:[360,312],do(){say('¿Un pato de goma? Esta fábrica es rarísima.')}}
}
});
FIGHTS.d_perrera={id:'perro',name:'Firulais',line:360,pos:[525,372],h:110,time:10,win:'huesoDormido',
  parts:[{it:'hueso',riddle:'"Un perro solo se calma con lo que más le gusta: un HUESO. Busca donde un esqueleto vende boletos..."',
          comp:'Firulais se lo traga en un segundo y quiere más. Se complementa con algo que lo haga DORMIR... ¿qué guardan en una farmacia?'},
         {it:'somnifero',riddle:'"Algo que lo haga dormir..."',comp:'Firulais no se traga pastillas solas. Hay que esconderlas dentro de algo que le guste mucho... ¿un HUESO?'}],
  draw:()=>`<g transform="translate(0,-20)">${dog(false)}</g>`,
  look:'Hay una línea roja en el piso... y detrás, Firulais. Si la cruzo, me ataca.',cry:'¡CRUCÉ LA LÍNEA! ¡FIRULAIS VIENE CORRIENDO!',
  partial:{hueso:'¡Se tragó el hueso de un bocado y quiere más! Si el hueso llevara algo para dormirlo...',somnifero:'¡Escupió las pastillas! No se las come solas.',
    jeringa:'¡No me deja acercarme con la aguja! ¡Casi me muerde la mano!',costilla:'¡Se comió la costilla y sigue con hambre!'},
  winSay:'¡Toma, Firulais! ...Se come el hueso, bosteza... y se queda roncando. Buen chico.',
  onWin:f=>{f.d_perro=1},killT:'¡FIRULAIS TE MORDIÓ!',killS:'Un pitbull de 80 kilos que no come desde el martes. Cruzar la línea con las manos vacías no fue buena idea.',boom:'¡GUAU!',killScale:1.8};
Object.assign(ROOM_INTRO,{
  d_oficina:'Una oficina dentro de un contenedor. Huele a café y a gasolina.',
  d_perrera:'¡Un pitbull gigante detrás de una línea roja! Que no me vea, que no me vea...',
  d_grua:'¡La cabina de la grúa! Desde aquí se ve todo el desguace.',
  d_almacen:'Un almacén de piezas. Seguro hay de todo.',
  d_pintura:'El taller de pintura. Cuántos colores...',
  d_prensa:'La prensa de carros. Esa cosa aplasta un carro en 2 segundos.',
  d_cinta:'¡Una fábrica! La cinta no para de moverse.'
});
Object.assign(ROOM_TAUNT,{
  d_perrera:['EL MARRANO','Te presento a Firulais. No come desde el martes. Je je je.',1],
  d_prensa:['JUAN PABLO','¡JUAN! ¡Huele a aceite y el palo está más cerca! ¡Arregla ese carro y ven por mí!'],
  d_cinta:['EL MARRANO','¿Te gusta mi fábrica? Aquí hago mortadela... y robots. Cuidado con mi brazo.',1]
});
WORLDS[3]={title:'El desguace',start:'d_patio',pos:[560,360],
  card:'El portal escupe a Juan encima de un montón de chatarra... en el desguace del Marrano.',
  cardVoice:'Bienvenido a mi desguace, ingeniero. Arregla mi carro... si puedes.',
  arrive:'¡Ay! ¿Un desguace? Esto sí es lo mío... ¿Y ese carro con cara de cerdo?',
  taunt:['EL MARRANO','Si quieres salir, tendrás que arreglar el Marranomóvil. Le faltan cuatro piezas... escondidas por todo el desguace.',1],
  map:{boxes:[['d_pintura',250,70,'Pintura'],['d_cinta',400,70,'Fábrica'],['d_prensa',550,70,'Prensa'],['d_oficina',130,190,'Oficina'],['d_patio',400,190,'Patio'],['d_perrera',650,190,'Perrera'],['d_grua',650,80,'Grúa'],['d_almacen',650,300,'Almacén']],
    links:'M194 190H336M464 190H586M330 160L270 102M400 158V102M470 160L530 102M650 158V112M650 222V268'}};
})();
