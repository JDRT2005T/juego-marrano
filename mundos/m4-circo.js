/* =================== MUNDO 4: CIRCO DEL TERROR ===================
   Entrada · Carpa · Feria · Casa de espejos · Jaulas · Camerino · Montaña rusa · Detrás del telón
   Solución: esqueleto de la taquilla → boleto → torniquete. Feria: tiro al blanco (6 patos) → tijeras;
   algodón de azúcar. Carpa: cortar la cuerda del trapecio → llave del camerino (el cañón mata).
   Jaulas: algodón al mono → nariz roja. Camerino: baúl "RISAS" (cartel de la entrada) → traje de payaso.
   Jaulas: traje al león (le dan miedo los payasos) → palanca. Espejos: el único espejo sin reflejo es la salida.
   Montaña rusa: palanca → viaje → detrás del telón: nariz al payaso gigante → portal. */
(function(){
const KK=K, k2=K2;
Object.assign(ITEMS,{
  boleto:{n:'Boleto del circo',icon:`<rect x="-15" y="-9" width="30" height="18" rx="2" fill="#ffe25e" ${k2}/><path d="M5 -9 V9" stroke="#000" stroke-width="1.5" stroke-dasharray="2 2"/>${txt(-5,4,'ADMIT',7)}`},
  tijeras:{n:'Tijeras gigantes',icon:`<circle cx="-9" cy="6" r="5" fill="none" stroke="#c1121f" stroke-width="3"/><circle cx="-9" cy="-6" r="5" fill="none" stroke="#c1121f" stroke-width="3"/><path d="M-5 4 L15 -6 M-5 -4 L15 6" stroke="#000" stroke-width="3.5"/>`},
  algodon:{n:'Algodón de azúcar',icon:`<path d="M0 14 L-3 -2" stroke="#e8d8b0" stroke-width="3"/><circle cx="-2" cy="-6" r="10" fill="#ff9ad5" ${k2}/><circle cx="6" cy="-10" r="6" fill="#ffb3e0"/>`},
  llaveCam:{n:'Llave del camerino',icon:`<circle cx="-8" cy="0" r="7" fill="none" stroke="#000" stroke-width="8"/><circle cx="-8" cy="0" r="7" fill="none" stroke="#ff4fa0" stroke-width="4"/><path d="M-1 0 H15 M9 0 V7 M14 0 V6" stroke="#000" stroke-width="8" stroke-linecap="round"/><path d="M-1 0 H15 M9 0 V7 M14 0 V6" stroke="#ff4fa0" stroke-width="4" stroke-linecap="round"/>`},
  nariz:{n:'Nariz roja de payaso',icon:`<circle r="10" fill="#e01b1b" ${k2}/><circle cx="-3" cy="-4" r="3" fill="#fff" opacity=".7"/>`},
  traje:{n:'Traje de payaso',icon:`<path d="M-12 -12 L-4 -14 L0 -8 L4 -14 L12 -12 L14 14 L-14 14Z" fill="#ffe25e" ${k2}/><circle cx="-4" cy="0" r="3" fill="#e01b1b"/><circle cx="5" cy="6" r="3" fill="#2f6db0"/><circle cx="-2" cy="9" r="3" fill="#3aa83a"/>`},
  hueso:{n:'Hueso (de esqueleto)',icon:`<path d="M-12 -6 L12 6" stroke="#000" stroke-width="10" stroke-linecap="round"/><path d="M-12 -6 L12 6" stroke="#f4f0e0" stroke-width="6" stroke-linecap="round"/><circle cx="-14" cy="-6" r="4" fill="#f4f0e0" ${k2}/><circle cx="14" cy="6" r="4" fill="#f4f0e0" ${k2}/>`},
  cuerda:{n:'Trozo de cuerda',icon:`<path d="M-14 8 Q-6 -16 2 0 Q8 14 14 -10" stroke="#000" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-14 8 Q-6 -16 2 0 Q8 14 14 -10" stroke="#a0703c" stroke-width="4" fill="none" stroke-linecap="round"/>`},
  llaveCarro:{n:'Llave de carro (llavero de cerdito)',icon:`<circle cx="-8" cy="-4" r="7" fill="#f4a0c0" ${k2}/><circle cx="-10" cy="-5" r="1.5"/><circle cx="-6" cy="-5" r="1.5"/><path d="M-1 0 H14 M9 0 V6" stroke="#000" stroke-width="6" stroke-linecap="round"/><path d="M-1 0 H14 M9 0 V6" stroke="#c9ccd1" stroke-width="3" stroke-linecap="round"/>`},
  trajeBocina:{n:'Traje de payaso + bocina',icon:`<path d="M-12 -12 L-4 -14 L0 -8 L4 -14 L12 -12 L14 14 L-14 14Z" fill="#ffe25e" ${k2}/><circle cx="-4" cy="0" r="3" fill="#e01b1b"/><path d="M2 2 H8 L16 -4 V12 L8 6 H2Z" fill="#e9b949" ${k2}/>`},
  palancaM:{n:'Palanca de la montaña rusa',icon:`<path d="M-10 12 L8 -10" stroke="#000" stroke-width="7" stroke-linecap="round"/><path d="M-10 12 L8 -10" stroke="#999" stroke-width="4" stroke-linecap="round"/><circle cx="9" cy="-12" r="6" fill="#e01b1b" ${k2}/>`}
});
tagItems(4,['boleto','tijeras','algodon','llaveCam','nariz','traje','palancaM','hueso','cuerda','llaveCarro','trajeBocina'],['hueso','cuerda','llaveCarro']);
RECIPES.push({a:'traje',b:'bocina',out:'trajeBocina',gone:['traje','bocina'],say:'Me pongo el traje de payaso y me cuelgo la bocina... ¡MEEEC! Ahora sí doy miedo.'});
Object.assign(DEATHS,{
  canon:['¡BOOM!','Juan se metió en el cañón humano... y salió volando hasta el siguiente pueblo. Algunas cosas mejor no tocarlas dos veces.'],
  leon:['¡EL LEÓN TE COMIÓ!','Pasaste al lado del león como si nada. ¿Sabías que a los leones del Marrano les dan miedo los payasos?']
});
const STRIPES=(x0,x1,c1,c2)=>[...Array(10)].map((_,i)=>`<path d="M${x0+i*(x1-x0)/10} 40 h${(x1-x0)/20} v250 h-${(x1-x0)/20}z" fill="${i%2?c1:c2}"/>`).join('');
function clown(x,y,s){return `<g transform="translate(${x},${y}) scale(${s||1})"><circle r="30" fill="#fff" ${KK}/><path d="M-30 -6 Q-46 -26 -30 -34 Q-24 -46 -10 -34 M30 -6 Q46 -26 30 -34 Q24 -46 10 -34" fill="#ff8a1e" ${k2}/>
  <circle cx="-10" cy="-6" r="5"/><circle cx="10" cy="-6" r="5"/><path d="M-10 -16 l-6 -8 M10 -16 l6 -8" stroke="#2f6db0" stroke-width="3"/><circle cy="6" r="7" fill="#e01b1b" ${k2}/><path d="M-16 14 Q0 30 16 14" stroke="#c1121f" stroke-width="5" fill="none"/></g>`}

Object.assign(ROOMS,{
c_entrada:{name:'Entrada del circo',start:[400,360],
  draw:f=>`${shell(['#1a0a2a','#3a1a4a','#2a1240','#5a4030'])}
   ${[...Array(30)].map((_,i)=>`<circle cx="${160+(i*67)%480}" cy="${60+(i*37)%90}" r="1.6" fill="#fff"/>`).join('')}
   <path d="M150 60 Q400 0 650 60" stroke="#ffe25e" stroke-width="3" fill="none" stroke-dasharray="2 12"/>
   <g ${H('cartel')}><rect x="180" y="80" width="140" height="110" fill="#ffe25e" ${KK}/>${txt(250,106,'¡HOY!',18,'#c1121f')}${txt(250,130,'EL GRAN CHANCHO',12)}${txt(250,150,'y sus',12)}${txt(250,176,'R I S A S',20,'#c1121f')}</g>
   <g ${H('taquilla')}><rect x="350" y="150" width="140" height="140" fill="#c1121f" ${KK}/><path d="M340 150 L420 110 L500 150Z" fill="#ffe25e" ${KK}/><rect x="370" y="180" width="100" height="60" fill="#1a1a2a" ${k2}/>
     <circle cx="420" cy="204" r="14" fill="#f4f0e0" ${k2}/><circle cx="415" cy="202" r="3"/><circle cx="425" cy="202" r="3"/><path d="M412 212 h16" stroke="#000" stroke-width="2" stroke-dasharray="2 2"/>${f.c_boleto?'':`<rect x="430" y="222" width="22" height="12" fill="#ffe25e" ${k2}/>`}${txt(420,170,'TAQUILLA',12,'#fff')}</g>
   <g ${H('torniquete')}><rect x="560" y="230" width="20" height="60" fill="#999" ${KK}/><path d="M570 240 l40 -10 M570 254 l40 6 M570 268 l40 -2" stroke="#000" stroke-width="5"/><circle cx="570" cy="226" r="8" fill="${f.c_torniquete?'#4dd84d':'#e01b1b'}" ${k2}/></g>
   <g ${H('globos')}>${['#e01b1b','#2f6db0','#ffe25e'].map((c,i)=>`<path d="M${230+i*16} 300 Q${226+i*16} 260 ${222+i*20} 230" stroke="#000" stroke-width="1.5" fill="none"/><ellipse cx="${222+i*20}" cy="220" rx="12" ry="15" fill="${c}" ${k2}/>`).join('')}</g>`,
  ex:[{to:'c_carpa',...EX.R,lock:f=>f.c_torniquete?null:'El torniquete no gira. Necesito un boleto.'}]},

c_carpa:{name:'La carpa',start:[400,360],
  draw:f=>`${shell(['#7a0a1a','#c1121f','#d63a3a','#c8a060'])}
   <g opacity=".85">${STRIPES(150,650,'#fff','#d63a3a')}</g>
   <ellipse cx="400" cy="345" rx="220" ry="30" fill="#e9b949" ${KK}/><ellipse cx="400" cy="345" rx="190" ry="22" fill="#c8a060" ${k2}/>
   <g ${H('cuerda')}><path d="M300 40 V${f.c_trapecio?300:150} M500 40 V${f.c_trapecio?300:150}" stroke="#a0703c" stroke-width="4"/><rect x="290" y="${f.c_trapecio?296:146}" width="220" height="8" fill="#e9b949" ${k2}/>
     ${f.c_llaveCam?'':`<g transform="translate(400,${f.c_trapecio?310:162})">${ITEMS.llaveCam.icon}</g>`}<rect x="290" y="40" width="220" height="${f.c_trapecio?270:130}" fill="transparent"/></g>
   <g ${H('canon')}><rect x="180" y="250" width="120" height="44" rx="20" fill="#3a3a4a" ${KK} transform="rotate(-25 240 272)"/><circle cx="210" cy="296" r="18" fill="#a0703c" ${k2}/><circle cx="270" cy="296" r="18" fill="#a0703c" ${k2}/></g>
   ${doorB(200,'#5a1a6a','FERIA')}${doorB(600,'#4a4a2a','JAULAS')}${doorR(f.c_camerino?'#3a1a3a':'#ff4fa0','CAMERINO')}
   ${clown(620,90,.8)}`,
  ex:[{to:'c_entrada',...EX.L},{to:'c_feria',...EX.B(200)},{to:'c_jaulas',...EX.B(600)},{to:'c_camerino',...EX.R,lock:f=>{if(f.c_camerino)return null;if(G.inv.includes('llaveCam')){f.c_camerino=1;drop('llaveCam');if(started)SFX.door();return null}return 'El camerino está cerrado con llave. Una llave rosa...'}}]},

c_feria:{name:'La feria',start:[400,360],
  draw:f=>`${shell(['#1a0a2a','#3a1a5a','#4a2a6a','#5a4a3a'])}
   ${[...Array(12)].map((_,i)=>`<circle cx="${170+i*42}" cy="56" r="7" fill="${['#ffe25e','#ff4fa0','#4dd84d'][i%3]}" class="${i%2?'blink':''}"/>`).join('')}
   <g ${H('tiro')}><rect x="170" y="110" width="220" height="180" fill="#2f6db0" ${KK}/><path d="M170 110 L280 80 L390 110Z" fill="#ffe25e" ${KK}/>${txt(280,104,'TIRO AL PATO',14)}
     <rect x="186" y="130" width="188" height="110" fill="#9fd3ff" ${k2}/>${[0,1,2].map(i=>`<g transform="translate(${215+i*60},190)"><circle cx="0" cy="-12" r="12" fill="#ffe25e" ${k2}/><path d="M10 -12 l10 3 l-10 3Z" fill="#ff8a1e"/></g>`).join('')}
     ${f.c_tijeras?txt(280,262,'¡GANASTE!',14,'#ffe25e'):`<g transform="translate(280,262)">${ITEMS.tijeras.icon}</g>`}</g>
   <g ${H('algodonM')}><rect x="440" y="190" width="90" height="100" fill="#ff9ad5" ${KK}/><circle cx="485" cy="170" r="34" fill="#fff" opacity=".7" ${k2}/><circle cx="485" cy="170" r="22" fill="#ffb3e0"/>${txt(485,240,'ALGODÓN',11)}</g>
   ${doorR('#2a1a4a','ESPEJOS')}`,
  ex:[{to:'c_carpa',...EX.D},{to:'c_espejos',...EX.R}]},

c_espejos:{name:'Casa de los espejos',start:[400,360],
  draw:f=>`${shell(['#2a2a4a','#4a4a7a','#5a5a8a','#3a3a5a'])}
   ${[0,1,2,3,4].map(i=>{const x=190+i*105;return `<g ${H('espejo'+i)}><rect x="${x}" y="90" width="80" height="190" rx="40" fill="${f.c_espejo&&i===3?'#111':'#bfe0f0'}" ${KK}/>
     ${i===3?(f.c_espejo?'':`<path d="M${x+14} 120 l20 20" stroke="#fff" stroke-width="4" opacity=".6"/>`):`<g transform="translate(${x+40},270) scale(${[.42,.38,.5,0,.36][i]},${[.42,.5,.3,0,.46][i]})" opacity=".85">${chibi({...JUAN,juan:true})}</g>`}</g>`}).join('')}
   ${txt(400,310,'"La salida es el único espejo que no te ve"',13,'#e8e8ff')}`,
  ex:[{to:'c_feria',...EX.L},{to:'c_montana',a:[555,300,-90],at:[555,318],show:f=>f.c_espejo}]},

c_jaulas:{name:'Las jaulas',start:[400,360],
  draw:f=>`${shell(['#3a2a1a','#6a5a3a','#7a6a4a','#8a7a50'])}
   <g ${H('mono')}><rect x="170" y="90" width="150" height="150" fill="#5a4a2a" ${KK}/>
     <g transform="translate(245,200)"><ellipse cy="10" rx="22" ry="26" fill="#7a4a2a" ${k2}/><circle cy="-24" r="18" fill="#7a4a2a" ${k2}/><ellipse cy="-20" rx="12" ry="10" fill="#e8c8a0"/><circle cx="-5" cy="-24" r="2.5"/><circle cx="5" cy="-24" r="2.5"/>
       ${f.c_nariz?'':`<circle cx="0" cy="-17" r="5" fill="#e01b1b" ${k2}/>`}</g>
     ${[...Array(8)].map((_,i)=>`<path d="M${178+i*19} 90 V240" stroke="#333" stroke-width="5"/>`).join('')}</g>
   <g ${H('elefante')}><rect x="350" y="80" width="150" height="160" fill="#5a4a2a" ${KK}/><ellipse cx="425" cy="190" rx="50" ry="36" fill="#9aa3a8" ${k2}/><circle cx="380" cy="170" r="22" fill="#9aa3a8" ${k2}/><path d="M362 178 Q350 210 362 226" stroke="#9aa3a8" stroke-width="10" fill="none"/>
     ${f.c_elefante?'':`<path d="M390 196 L470 196 L478 222 L382 222Z" fill="#ff9ad5" ${k2}/><g transform="translate(364,232) scale(.7)">${ITEMS.llaveCarro.icon}</g>`}
     ${[...Array(8)].map((_,i)=>`<path d="M${358+i*19} 80 V240" stroke="#333" stroke-width="5"/>`).join('')}</g>
   ${f.c_leon?`<g ${H('leon')} transform="translate(600,200) scale(.6)">${lion(true)}</g>`:''}
   ${f.c_leon?`<g>${[...Array(6)].map((_,i)=>`<path d="M${546+i*20} 130 V270" stroke="#333" stroke-width="5"/>`).join('')}</g>`:''}
   ${f.c_palanca?'':`<g ${H('palancaM')}><path d="M640 360 L660 320" stroke="#000" stroke-width="7"/><path d="M640 360 L660 320" stroke="#999" stroke-width="4"/><circle cx="661" cy="318" r="7" fill="#e01b1b" ${k2}/></g>`}`,
  ex:[{to:'c_carpa',...EX.D}]},

c_camerino:{name:'El camerino',start:[400,360],
  draw:f=>`${shell(['#4a1a3a','#8a3a6a','#a04a7a','#7a5a5a'])}
   <g ${H('tocador')}><rect x="180" y="90" width="150" height="110" fill="#bfe0f0" ${KK}/>${[...Array(6)].map((_,i)=>`<circle cx="${190+i*26}" cy="86" r="7" fill="#fff6a8" ${k2}/>`).join('')}
     <rect x="170" y="210" width="170" height="80" fill="#c49a5c" ${KK}/><circle cx="210" cy="200" r="8" fill="#fff" ${k2}/><rect x="240" y="192" width="20" height="18" fill="#e01b1b" ${k2}/></g>
   <g ${H('peluca')}><circle cx="440" cy="150" r="30" fill="#ff8a1e" ${KK}/><circle cx="420" cy="138" r="14" fill="#ff8a1e"/><circle cx="460" cy="138" r="14" fill="#ff8a1e"/><rect x="430" y="180" width="20" height="110" fill="#555" ${k2}/></g>
   ${f.fw_payaso?`<g transform="translate(330,372) rotate(-90) scale(.5)">${killerClown()}</g>${txt(300,300,'Zzz',18,'#fff')}`:''}
   <g ${H('baul')}><rect x="510" y="230" width="130" height="60" rx="6" fill="${f.c_baul?'#3a2010':'#7a3a1a'}" ${KK}/><path d="M510 250 h130" stroke="#000" stroke-width="2"/>${f.c_baul?'':`<rect x="562" y="244" width="26" height="18" rx="3" fill="#e9b949" ${k2}/>${txt(575,258,'ABC',8)}`}</g>`,
  ex:[{to:'c_carpa',...EX.L}]},

c_montana:{name:'La montaña rusa',start:[400,360],
  draw:f=>`${shell(['#0a0a2a','#1a1a4a','#14143a','#4a4050'])}
   <path d="M150 260 Q250 60 360 200 Q430 300 520 90 Q600 -10 650 160" stroke="#c1121f" stroke-width="8" fill="none"/>
   ${[...Array(14)].map((_,i)=>`<path d="M${170+i*34} 290 V${150+Math.sin(i)*60}" stroke="#555" stroke-width="3"/>`).join('')}
   <g ${H('carrito')}><path d="M300 300 h160 v-40 q0 -14 -14 -14 h-132 q-14 0 -14 14z" fill="#ffe25e" ${KK}/><circle cx="330" cy="304" r="12" fill="#333" ${k2}/><circle cx="430" cy="304" r="12" fill="#333" ${k2}/>${txt(380,282,'EL CERDITO VELOZ',11)}</g>
   <g ${H('controlM')}><rect x="540" y="220" width="70" height="70" fill="#333" ${KK}/><rect x="552" y="232" width="46" height="16" fill="${f.c_palancaPuesta?'#4dd84d':'#5a1010'}"/>${f.c_palancaPuesta?`<path d="M575 260 L590 236" stroke="#999" stroke-width="5"/><circle cx="591" cy="234" r="6" fill="#e01b1b" ${k2}/>`:`<circle cx="575" cy="268" r="6" fill="#111"/>`}</g>
   <g ${H('cartelM')}><rect x="190" y="90" width="110" height="60" fill="#fff" ${KK}/>${txt(245,114,'PROHIBIDO',12,'#c1121f')}${txt(245,134,'GRITAR',12,'#c1121f')}</g>`,
  ex:[{to:'c_espejos',...EX.L}]},

c_final:{name:'Detrás del telón',start:[400,360],
  draw:f=>`${shell(['#2a0a1a','#5a1a2a','#6a2030','#3a2a2a'])}
   <g opacity=".9">${[...Array(8)].map((_,i)=>`<path d="M${150+i*62} 40 q31 130 0 250 h62 q-31 -120 0 -250z" fill="${i%2?'#7a1020':'#8a1828'}"/>`).join('')}</g>
   <g ${H('payaso')} transform="translate(400,170)"><circle r="110" fill="#fff" ${KK}/><path d="M-110 -20 Q-160 -80 -110 -110 Q-90 -150 -40 -110 M110 -20 Q160 -80 110 -110 Q90 -150 40 -110" fill="#ff8a1e" ${KK}/>
     <circle cx="-40" cy="-30" r="16"/><circle cx="40" cy="-30" r="16"/><circle cx="-36" cy="-34" r="4" fill="#ff2a2a"/><circle cx="44" cy="-34" r="4" fill="#ff2a2a"/>
     ${f.c_narizPuesta?`<circle cy="10" r="20" fill="#e01b1b" ${k2}/>`:`<circle cy="10" r="20" fill="#333" ${k2}/>`}
     <rect x="-60" y="40" width="120" height="${f.c_narizPuesta?60:14}" rx="8" fill="#5a0a0a" ${KK}/>
     ${f.c_narizPuesta?`<rect x="-44" y="48" width="88" height="44" fill="${G&&G.portal?'#7a2aff':'#111'}"/>${G&&G.portal?`<g transform="translate(0,70)"><g class="spin"><path d="M0 0 m-18 0 a18 18 0 1 0 18 -18 a11 11 0 1 0 -11 11" stroke="#e0b8ff" stroke-width="4" fill="none"/></g></g>`:''}`:''}</g>`,
  ex:[{to:'c_montana',...EX.L}]}
});
window.lion=lion;
function lion(scared){
  return `<g><ellipse cx="30" cy="-30" rx="56" ry="30" fill="#d9a040" ${KK}/><path d="M80 -40 Q110 -60 100 -80" stroke="#d9a040" stroke-width="6" fill="none"/>
   <circle cx="-30" cy="-50" r="40" fill="#a0522d" ${KK}/><circle cx="-30" cy="-48" r="26" fill="#e8b860" ${k2}/>
   ${scared?`<circle cx="-40" cy="-54" r="6" fill="#fff" ${k2}/><circle cx="-20" cy="-54" r="6" fill="#fff" ${k2}/><circle cx="-40" cy="-54" r="2"/><circle cx="-20" cy="-54" r="2"/><ellipse cx="-30" cy="-34" rx="6" ry="8" fill="#5a0a0a"/>`
     :`<path d="M-44 -58 l8 4 M-16 -58 l-8 4" stroke="#000" stroke-width="3"/><circle cx="-39" cy="-52" r="3"/><circle cx="-21" cy="-52" r="3"/><path d="M-42 -36 l4 8 l4 -8 l4 8 l4 -8 l4 8" stroke="#fff" stroke-width="2.5" fill="#5a0a0a"/>`}
   <path d="M-10 -10 V18 M50 -10 V18 M70 -10 V18" stroke="#d9a040" stroke-width="12" stroke-linecap="round"/></g>`;
}
/* tiro al blanco: dale a 6 patos */
function openTiro(onOK){
  let hits=0;
  panel(`<div class="kp" style="width:min(640px,80vw)"><div class="kpt">TIRO AL PATO: dale a 6 patos</div>
    <div class="tiro"><svg viewBox="0 0 600 260" width="100%"><rect width="600" height="260" fill="#9fd3ff" ${KK}/>
     ${[0,1,2].map(r=>`<path d="M0 ${80+r*80} H600" stroke="#2f6db0" stroke-width="6"/>`).join('')}
     ${[0,1,2].map(r=>[0,1,2].map(c=>`<g class="duckRow" style="animation-duration:${3.2+r*.8}s;animation-delay:-${c*1.1+r*.4}s;${r%2?'animation-direction:reverse':''}"><g data-duck="1" transform="translate(0,${70+r*80})" style="cursor:pointer">
        <ellipse cx="0" cy="-14" rx="20" ry="14" fill="#ffe25e" ${k2}/><circle cx="14" cy="-30" r="10" fill="#ffe25e" ${k2}/><path d="M22 -30 l10 3 l-10 3Z" fill="#ff8a1e"/><circle cx="16" cy="-32" r="2"/><rect x="-26" y="-48" width="64" height="52" fill="transparent"/></g></g>`).join('')).join('')}
    </svg></div><div id="pzm">0 / 6</div></div>`);
  document.querySelectorAll('[data-duck]').forEach(d=>d.addEventListener('click',ev=>{ev.stopPropagation();if(d.style.opacity==='0')return;
    d.style.opacity='0';hits++;if(started)tone(1200,.08,{type:'square',g:.08});$('#pzm').textContent=hits+' / 6';
    setTimeout(()=>{d.style.opacity='1'},1800);if(hits>=6)pzWin('✔ ¡GANASTE!',onOK)}));
}

Object.assign(HS,{
c_entrada:{
  cartel:{at:[250,312],do(){say('"¡HOY! El Gran Chancho y sus R-I-S-A-S". Lo escribieron con letras gigantes.')}},
  taquilla:{at:[420,312],do(){
    if(G.f.c_boleto&&!G.f.c_hueso){G.f.c_hueso=1;give('hueso');return say('Le jalo el brazo al esqueleto y... ¡se le cae un hueso! Perdón, señor. ¿Pa\' qué lo quiero? Ni idea. Me lo llevo.')}
    if(G.f.c_boleto)return say('El esqueleto de la taquilla me guiña un ojo. ¿Cómo, si no tiene ojos? Y le falta un hueso.');G.f.c_boleto=1;give('boleto');gRender();say('Un esqueleto vendiendo boletos. Le quito uno de la mano... no protesta.')}},
  torniquete:{at:[570,320],uses:['boleto'],do(){
    if(G.f.c_torniquete)return useHotspot('go:c_carpa');
    if(G.sel==='boleto'){G.f.c_torniquete=1;drop('boleto');gRender();if(started)tone(800,.2,{type:'triangle',g:.15});return say('¡Clic! El torniquete gira. Adentro se oye una risa de payaso...')}
    say('Un torniquete. Sin boleto no pasa nadie.')}},
  globos:{at:[240,330],do(){say('Globos con cara de cerdo. Uno me sacó la lengua.')}}
},
c_carpa:{
  cuerda:{at:[400,330],uses:['tijeras'],do(){
    if(G.f.c_trapecio){if(G.f.c_llaveCam)return say('El trapecio ya está en el suelo.');G.f.c_llaveCam=1;G.f.c_cuerda=1;G.inv.push('cuerda');give('llaveCam');return say('¡La llave rosa del camerino! Y me llevo un buen trozo de la cuerda del trapecio.')}
    if(G.sel==='tijeras'){G.f.c_trapecio=1;gRender();if(started)SFX.thud();return say('¡Zas! Corto la cuerda y el trapecio baja de golpe. Tenía una llave colgando.')}
    say('El trapecio está muy alto y tiene una llave rosa colgando. La cuerda baja hasta el piso...')}},
  canon:{at:[250,330],uses:['encendedor','lanzallamas'],do(){
    if(G.sel==='encendedor'||G.sel==='lanzallamas'){
      if(G.f.trozo4)return say('El cañón ya disparó. Está vacío.');
      G.f.trozo4=1;say('Prendo la mecha y corro... 3, 2, 1...',2000);
      setTimeout(()=>{if(G.over)return;fx('shake');fx('flash');if(started){SFX.thud();noise(.8,{f:300,g:.6})}gRender();give('trozo4');say('¡BOOOM! El cañón disparó una bala de payaso... ¡y cayó un trozo de corazón rosa! Estaba atascado adentro.',3500)},1800);return}
    if(G.f.c_canonVisto)return die('canon');
    G.f.c_canonVisto=1;say('Un cañón humano. Dice "MÉTETE SI TE ATREVES". Al fondo brilla algo rosa... ¿Me meto? Mejor no lo toco otra vez.')}},
  puertaCam:{at:[628,354],do(){useHotspot('go:c_camerino')}}
},
c_feria:{
  tiro:{at:[280,312],do(){if(G.f.c_tijeras)return say('Ya gané el premio: unas tijeras gigantes. Qué premio tan raro.');openTiro(()=>{G.f.c_tijeras=1;give('tijeras');gRender();say('¡Le di a 6 patos! El premio son... unas tijeras gigantes. Bueno.')})}},
  algodonM:{at:[485,312],do(){if(G.f.c_algodon)return say('Ya tengo algodón de azúcar. No quiero más, que me empalago.');G.f.c_algodon=1;give('algodon');say('La máquina de algodón de azúcar todavía funciona. ¡Uno rosa para mí!')}}
},
c_espejos:{
  ...Object.fromEntries([0,1,2,3,4].map(i=>['espejo'+i,{at:[230+i*105,318],do(){
    if(i===3){if(G.f.c_espejo)return useHotspot('go:c_montana');G.f.c_espejo=1;gRender();if(started)SFX.door();return say('¡Este espejo no me refleja! Lo empujo y... ¡es una puerta secreta!')}
    if(started)SFX.thud();say(['¡PUM! Me di de cara contra el espejo. Ese soy yo, pero gordito.','¡Auch! Espejo de verdad. Aquí salgo flaquito.','¡PAM! Ahí salgo chaparrito.','','¡Toc! Espejo. Aquí salgo larguísimo.'][i])}}]))
},
c_jaulas:{
  mono:{at:[245,312],uses:['algodon'],do(){
    if(G.f.c_nariz)return say('El mono está feliz con su algodón.');
    if(G.sel==='algodon'){drop('algodon');G.f.c_nariz=1;give('nariz');gRender();return say('Le doy el algodón al mono... ¡y me tira su nariz de payaso! Trato justo.')}
    say('Un mono con una nariz roja de payaso. No me la quiere dar. Tiene cara de goloso.')}},
  elefante:{at:[425,312],uses:['tijeras'],do(){
    if(G.f.c_elefante)return say('El elefante está feliz sin su tutú. Me guiña el ojo.');
    if(G.sel==='tijeras'){G.f.c_elefante=1;gRender();give('llaveCarro');if(started)tone(180,.8,{type:'sawtooth',g:.1,slide:400});return say('¡Zas! Le corto el tutú al elefante... ¡PRRRUUU! Está tan feliz que me pasa con la trompa unas llaves de carro con un llavero de cerdito.')}
    say('Un elefante triste con un tutú rosado apretadísimo. Tiene unas llaves colgando de la trompa. Si le quitara ese tutú...')}},
  leon:{at:[470,350],do(){say('El león tiembla en un rincón de su jaula. Pobre.')}},
  palancaM:{at:[620,356],do(){if(!G.f.c_leon)return say('¡El león está ahí mismo!');G.f.c_palanca=1;give('palancaM');gRender();say('¡La palanca de la montaña rusa!')}}
},
c_camerino:{
  tocador:{at:[255,312],do(){say('Un tocador con luces y maquillaje de payaso. Hay una foto del Marrano disfrazado: "EL GRAN CHANCHO".')}},
  peluca:{at:[440,312],do(){say('Una peluca naranja. Huele a mortadela.')}},
  baul:{at:[575,312],do(){
    if(G.f.c_baul)return say('El baúl ya está vacío.');
    openLetters({title:'BAÚL: 5 LETRAS',len:5,code:'RISAS',onOK:()=>{G.f.c_baul=1;gRender();give('traje');say('¡RISAS! El baúl se abrió. Adentro hay un traje de payaso de mi talla.')}})}}
},
c_montana:{
  cartelM:{at:[245,312],do(){say('"PROHIBIDO GRITAR". Con estas curvas, va a ser difícil.')}},
  controlM:{at:[575,312],uses:['palancaM'],do(){
    if(G.f.c_palancaPuesta)return say('La montaña rusa está lista. Hay que subirse al carrito.');
    if(G.sel==='palancaM'){G.f.c_palancaPuesta=1;drop('palancaM');gRender();return say('Pongo la palanca en el control. ¡La luz se puso verde!')}
    say('El control de la montaña rusa. Le falta la palanca.')}},
  carrito:{at:[380,330],do(){
    if(!G.f.c_palancaPuesta)return say('"El Cerdito Veloz". Sin la palanca del control no se mueve.');
    say('Me subo y... ¡AAAAAAHHHHHH!',2500);if(started){SFX.scream();tone(200,2.5,{type:'sawtooth',g:.08,slide:900})}
    fx('shake');setTimeout(()=>{if(!G.over)changeRoom('c_final')},2600)}}
},
c_final:{
  payaso:{at:[270,344],uses:['nariz'],do(){
    if(G.f.c_narizPuesta)return say('La boca del payaso tiene una tele adentro...');
    if(G.sel==='nariz'){G.f.c_narizPuesta=1;drop('nariz');gRender();if(started)SFX.laugh();say('Le pongo la nariz al payaso gigante y... ¡JA JA JA! ¡abre la boca! Tiene una tele adentro.',3000);
      return setTimeout(()=>portalTo(0,'Llegaste lejos, Juan... Ahora ven a MI mundo. La dimensión del Marrano. Juan Pablo y yo te esperamos... ¡JA JA JA JA!'),3200)}
    say('Un payaso gigante sin nariz. Le falta algo en la cara...')}}
}
});
FIGHTS.c_camerino={id:'payaso',name:'el payaso',ambush:true,pos:[560,368],h:200,time:10,win:'jeringa',
  parts:[{it:'jeringa',riddle:'"Las enfermeras del Marrano duermen a cualquiera con lo que guardan en la nevera de la farmacia."'}],
  draw:()=>killerClown(),cry:'¡UN PAYASO SALIÓ DE DETRÁS DEL ESPEJO! ¡TIENE UN CUCHILLO!',
  taunt:'¡Te presento a Chanchín, mi payaso favorito! No le gustan las visitas. Tienes 10 segundos, Juan... JA JA JA.',
  partial:{algodon:'¡Le tiro el algodón de azúcar! ...se lo come y sigue viniendo. ¡Más contento!',tijeras:'¡Su cuchillo es más grande que mis tijeras!',
    nariz:'¿Le doy una nariz? ¡Ya tiene una!',bisturi:'¡Con un bisturí no me le acerco!'},
  winSay:'¡Pinchazo! Chanchín bosteza... se acuesta en el piso... y se queda roncando. Uf, por poco.',
  onWin:f=>{f.c_payasoZ=1},killT:'¡EL PAYASO TE ATRAPÓ!',killS:'Chanchín salió de la nada con un cuchillo y una sonrisa. A los payasos del Marrano no les gustan las visitas.',boom:'¡JA JA JA!',killScale:1.4};
FIGHTS.c_jaulas={id:'leon',name:'el león',line:500,pos:[560,350],h:110,time:12,win:'trajeBocina',
  parts:[{it:'traje',riddle:'"A los leones del Marrano les dan pánico los PAYASOS. Un baúl del camerino guarda un traje... con 5 letras."',
          comp:'un payaso calladito no asusta a nadie. Se complementa con algo que haga mucho RUIDO... ¿una bocina de carro viejo?'},
         {it:'bocina',riddle:'"Algo que haga mucho ruido..."',comp:'un tipo normal pitando no asusta a un león. Se complementa con un disfraz de PAYASO (el baúl del camerino).'}],
  draw:()=>`<g transform="translate(0,-18)">${lion(false)}</g>`,
  look:'Una línea roja en el piso... y detrás, un león suelto. Si cruzo, me come.',cry:'¡CRUCÉ LA LÍNEA! ¡EL LEÓN ME VIO!',
  partial:{traje:'¡Me puse el traje pero el león ni se inmuta! Un payaso calladito no asusta... ¡necesito hacer RUIDO!',
    bocina:'¡MEEEC! El león se asustó un poquito... pero ¿un tipo normal pitando? ¡Necesito parecer un PAYASO!',
    jeringa:'¡Tiene la piel muy dura! La aguja ni entra.',algodon:'¡Se lo comió de un bocado! Y ahora me mira a mí.'},
  winSay:'¡MEEEC MEEEC! ¡UN PAYASO RUIDOSO! El león grita como niña y se encierra solito en su jaula.',
  onWin:f=>{f.c_leon=1},killT:'¡EL LEÓN TE COMIÓ!',killS:'Cruzaste la línea roja delante de un león con hambre... y sin nada para asustarlo.',boom:'¡ROAAAR!',killScale:1.6};
Object.assign(ROOM_INTRO,{
  c_carpa:'La carpa del circo. Huele a palomitas viejas y a miedo.',
  c_feria:'¡Una feria! Los juegos todavía tienen luces.',
  c_espejos:'La casa de los espejos. ¿Cuál será la salida?',
  c_jaulas:'Las jaulas de los animales... ¡y el león está SUELTO detrás de una línea roja!',
  c_camerino:'El camerino de los payasos. Qué miedo dan las pelucas.',
  c_montana:'La montaña rusa. Ese rizo está roto... ¿no?',
  c_final:'Detrás del telón... ¡un payaso gigante!'
});
Object.assign(ROOM_TAUNT,{
  c_carpa:['EL MARRANO','¡Damas y caballeros! ¡Con ustedes, Juan Atencia, el payaso más lento del mundo! JA JA JA.',1],
  c_espejos:['EL MARRANO','En mi casa de espejos, la salida es el único espejo que no te ve. Je je je.',1],
  c_jaulas:['JUAN PABLO','¡JUAN! ¡El Marrano me dijo que el siguiente mundo es el último! ¡Ya casi!']
});
WORLDS[4]={title:'El circo del terror',start:'c_entrada',pos:[260,354],
  card:'El remolino escupe a Juan en la entrada de un circo abandonado. Se oye música de feria... y risas.',
  cardVoice:'Bienvenido a mi circo, Juan. Hoy tú eres el payaso.',
  arrive:'¡Un circo! ¿Por qué tenía que ser un circo? Odio los payasos...',
  taunt:['EL MARRANO','Para entrar a mi función necesitas un boleto. La taquilla está abierta... más o menos.',1],
  map:{boxes:[['c_feria',220,70,'Feria'],['c_jaulas',580,70,'Jaulas'],['c_entrada',130,190,'Entrada'],['c_carpa',400,190,'Carpa'],['c_camerino',660,190,'Camerino'],['c_espejos',220,300,'Espejos'],['c_montana',400,300,'Montaña'],['c_final',600,370,'Telón']],
    links:'M194 190H336M464 190H596M340 160L260 102M460 160L540 102M220 102V268M284 300H336M464 300L560 350'}};
})();
