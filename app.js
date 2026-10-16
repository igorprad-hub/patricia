'use strict';
const $ = id => document.getElementById(id);
const number = n => String(n + 1).padStart(2, '0');
const image = $('slide-image'), frame = $('image-frame'), stage = $('stage');
const indexDialog = $('index-dialog'), viewer = $('viewer'), canvas = $('viewer-canvas');
let current = 0, showAnnotations = false, activePin = null, zoom = 1, pan = {x:0,y:0}, drag = null;
const annotations = [originalAnnotations[0], originalAnnotations[1],
  [{x:50,y:64,title:'Quatro lugares, uma conversa',copy:'As quatro banquetas acompanham a ilha. A frente de madeira aproxima quem cozinha de quem chega.'},{x:49,y:28,title:'Luz para ficar',copy:'Pendentes e arandelas em 3000 K se somam à luz natural, sem fitas de LED nos armários.'}],
  [{x:66,y:65,title:'A face de trabalho',copy:'Gavetas e equipamentos integrados concentram o apoio ao preparo na ilha.'},{x:39,y:24,title:'Luz natural',copy:'A janela superior envidraçada traz claridade para a cozinha.'}],
  [{x:58,y:47,title:'Da receita à mesa',copy:'A ilha aproxima o preparo da sala de refeições e mantém a conversa entre os ambientes.'},{x:22,y:36,title:'Louças à vista',copy:'Prateleiras de madeira sobre o ripado branco largo dão lugar aos pratos da casa.'}],
  [{x:58,y:65,title:'Uma ilha em duas faces',copy:'Equipamentos integrados e nichos abertos apoiam o preparo. Do outro lado, as banquetas convidam à convivência.'},{x:19,y:61,title:'Madeira e vidro',copy:'A mesa retangular recebe uma camada de vidro transparente sobre o tampo de madeira.'}],
  [{x:44,y:65,title:'À mesa, o tempo muda',copy:'O tampo retangular de madeira recebe vidro transparente. Cadeiras tradicionais e um pendente de fibra completam a composição.'},{x:49,y:34,title:'Um olhar filtrado',copy:'A janela interna se volta para outro cômodo e recebe vidro branco leitoso.'},{x:82,y:48,title:'O cantinho do café',copy:'O aparador acomoda as xícaras e os pequenos rituais da casa.'}],
  [{x:18,y:36,title:'Branco que deixa a luz entrar',copy:'A janela de madeira e as cortinas brancas filtram a luz sobre a bancada em L.'},{x:62,y:76,title:'Uma paleta mais suave',copy:'Portas claras com molduras e paredes oliva mantêm o vínculo com a cozinha verde.'}],
  [{x:48,y:73,title:'Uma peça móvel',copy:'A bandeja solta, com borda de madeira e fundo escuro, apoia-se sobre a pedra.'},{x:72,y:35,title:'Tudo à mão',copy:'Prateleiras de madeira organizam potes, livros e temperos.'}],
  [{x:78,y:43,title:'Guardar também faz parte',copy:'Portas fechadas e nichos abertos organizam os mantimentos no armário alto.'},{x:38,y:50,title:'Pequenos rituais',copy:'A batedeira com tigela de vidro e os eletrodomésticos ficam reunidos na bancada de apoio.'}],
  [{x:68,y:43,title:'Cozinhar',copy:'A bancada em L reúne pia, preparo e cocção, com marcenaria contínua e equipamentos integrados.'},{x:60,y:67,title:'Reunir',copy:'A ilha ocupa o centro do conjunto e aproxima quem prepara de quem faz companhia.'},{x:22,y:34,title:'Apoiar',copy:'A área de apoio recebe os pequenos eletrodomésticos, mantimentos e utensílios.'},{x:36,y:78,title:'Permanecer',copy:'A mesa retangular conecta as refeições aos rituais da cozinha.'}]
];

function fitImage(){
  const s = slides[current];
  if(!image.naturalWidth || image.getAttribute('src') !== s.src) return;
  const scale = Math.min(stage.clientWidth / image.naturalWidth, stage.clientHeight / image.naturalHeight);
  frame.style.width = image.naturalWidth * scale + 'px';
  frame.style.height = image.naturalHeight * scale + 'px';
}
new ResizeObserver(fitImage).observe(stage);
image.addEventListener('load', fitImage);
function closeAnnotation(restoreFocus = false){
  const previous = activePin;
  $('annotation-card')?.remove(); activePin = null;
  $('annotations').querySelectorAll('.pin').forEach(b => b.setAttribute('aria-expanded','false'));
  if(restoreFocus && previous !== null) $('annotations').querySelectorAll('.pin')[previous]?.focus();
}
function openAnnotation(n){
  if(activePin === n){closeAnnotation();return;}
  closeAnnotation(); activePin = n;
  const a = annotations[current][n];
  $('annotations').querySelectorAll('.pin').forEach((b,i)=>b.setAttribute('aria-expanded',String(i===n)));
  const card = document.createElement('section'); card.id = 'annotation-card'; card.className = 'annotation-card'; card.setAttribute('aria-label',a.title);
  const close = document.createElement('button'); close.className = 'annotation-close'; close.setAttribute('aria-label','Fechar explicação'); close.textContent = '×'; close.onclick = () => closeAnnotation(true);
  const label = document.createElement('p'); label.className = 'eyebrow'; label.textContent = `${number(n)} / ${a.kind || 'Uma escolha do projeto'}`;
  const title = document.createElement('h2'); title.textContent = a.title;
  const copy = document.createElement('p'); copy.textContent = a.copy;
  card.append(close,label,title,copy); $('annotations').append(card); close.focus();
}
function renderAnnotations(){
  closeAnnotation(); const layer = $('annotations'); layer.replaceChildren(); layer.hidden = !showAnnotations;
  annotations[current].forEach((a,i)=>{
    const b = document.createElement('button'); b.className = 'pin'; b.textContent = i+1;
    b.style.setProperty('--x',a.x+'%'); b.style.setProperty('--y',a.y+'%');
    b.setAttribute('aria-label',`Detalhe ${i+1}: ${a.title}`); b.setAttribute('aria-expanded','false');
    b.onclick = ()=>openAnnotation(i); layer.append(b);
  });
}
function toggleAnnotations(){
  showAnnotations = !showAnnotations;
  $('annotations-toggle').setAttribute('aria-pressed',String(showAnnotations));
  $('annotations-label').textContent = showAnnotations ? 'Ocultar marcações' : 'Mostrar marcações';
  renderAnnotations();
}
function goTo(n, animate = true){
  current = Math.max(0,Math.min(slides.length-1,n));
  const s = slides[current];
  image.src = s.src; image.alt = s.copy;
  $('slide-title').textContent = s.title;
  if(current === 0) $('slide-title').innerHTML = 'Uma cozinha <em>para ficar.</em>';
  $('slide-area').textContent = `${number(current)} / ${current === 0 ? 'O projeto' : s.area}`;
  $('slide-description').textContent = s.copy;
  $('slide').dataset.cover = String(current === 0);
  $('slide').setAttribute('aria-label',`${current+1} de ${slides.length}: ${s.title}`);
  $('current-number').textContent = number(current);
  $('previous').disabled = current === 0; $('next').disabled = current === slides.length-1;
  document.querySelectorAll('[data-slide]').forEach(b => {
    if(Number(b.dataset.slide) === current) b.setAttribute('aria-current','true'); else b.removeAttribute('aria-current');
  });
  renderAnnotations(); fitImage();
  if(animate){$('slide').classList.remove('changing'); void $('slide').offsetWidth; $('slide').classList.add('changing');}
  $('announcement').textContent = `Slide ${current+1} de ${slides.length}. ${s.title}`;
  try {history.replaceState(null,'',`#vista-${current+1}`);} catch {}
  // Warm only the adjacent render; no external requests are made.
  if(slides[current+1]){const nextImage=new Image();nextImage.src=slides[current+1].src;}
  if(viewer.open) updateViewer();
}
slides.forEach((s,i)=>{
  const dot=document.createElement('button');dot.dataset.slide=i;dot.setAttribute('aria-label',`Ir para slide ${i+1}: ${s.title}`);dot.title=`${number(i)} · ${s.title}`;dot.onclick=()=>goTo(i);$('timeline').append(dot);
  const b=document.createElement('button');b.className='index-item';b.dataset.slide=i;b.setAttribute('aria-label',`Abrir slide ${i+1}: ${s.title}`);
  const thumb=document.createElement('span');thumb.className='index-image';const img=document.createElement('img');img.src=s.src;img.alt='';img.loading='lazy';thumb.append(img);
  const label=document.createElement('span');label.className='index-title';const num=document.createElement('span');num.textContent=number(i);const title=document.createElement('span');title.textContent=s.title;label.append(num,title);b.append(thumb,label);
  b.onclick=()=>{goTo(i);indexDialog.close();$('open-index').focus();};$('index-grid').append(b);
  const page=document.createElement('section');page.className='print-slide';const header=document.createElement('header');const brand=document.createElement('span');brand.className='eyebrow';brand.textContent='Patricia / Uma cozinha para ficar';const count=document.createElement('span');count.className='eyebrow';count.textContent=`${number(i)} / 11`;header.append(brand,count);const photo=document.createElement('img');photo.src=s.src;photo.alt=s.title;const heading=document.createElement('h2');heading.textContent=s.title;const copy=document.createElement('p');copy.textContent=s.copy;page.append(header,photo,heading,copy);$('print-deck').append(page);
});
$('previous').onclick=()=>goTo(current-1);$('next').onclick=()=>goTo(current+1);$('start').onclick=()=>goTo(0);
$('annotations-toggle').onclick=toggleAnnotations;
$('open-index').onclick=()=>{indexDialog.showModal();$('close-index').focus();};$('close-index').onclick=()=>indexDialog.close();
indexDialog.addEventListener('click',e=>{if(e.target === indexDialog){const r=indexDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)indexDialog.close();}});
$('print').onclick=async()=>{await Promise.all([...$('print-deck').querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));window.print();};
async function toggleFullscreen(){
  try{if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();}
  catch{$('announcement').textContent='Use a opção de tela cheia do seu navegador.';}
}
$('fullscreen').onclick=toggleFullscreen;
document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Sair da tela cheia':'Entrar em tela cheia');fitImage();});
function updateZoom(){
  canvas.style.setProperty('--zoom',zoom);canvas.style.setProperty('--pan-x',pan.x+'px');canvas.style.setProperty('--pan-y',pan.y+'px');canvas.classList.toggle('zoomed',zoom>1);
  $('zoom-reset').textContent=Math.round(zoom*100)+'%';$('zoom-out').disabled=zoom<=1;$('zoom-in').disabled=zoom>=3;
}
function changeZoom(delta){zoom=Math.max(1,Math.min(3,Math.round((zoom+delta)*100)/100));if(zoom===1)pan={x:0,y:0};updateZoom();}
function updateViewer(){const s=slides[current];$('viewer-image').src=s.src;$('viewer-image').alt=s.copy;$('viewer-title').textContent=s.title;$('viewer-counter').textContent=`${number(current)} / 11`;$('viewer-prev').disabled=current===0;$('viewer-next').disabled=current===slides.length-1;zoom=1;pan={x:0,y:0};drag=null;updateZoom();}
$('enlarge').onclick=()=>{closeAnnotation();updateViewer();viewer.showModal();$('close-viewer').focus();};$('close-viewer').onclick=()=>viewer.close();
$('viewer-prev').onclick=()=>goTo(current-1);$('viewer-next').onclick=()=>goTo(current+1);$('zoom-in').onclick=()=>changeZoom(.25);$('zoom-out').onclick=()=>changeZoom(-.25);$('zoom-reset').onclick=()=>{zoom=1;pan={x:0,y:0};updateZoom();};
canvas.addEventListener('wheel',e=>{e.preventDefault();changeZoom(e.deltaY<0?.1:-.1);},{passive:false});
canvas.addEventListener('pointerdown',e=>{if(zoom<=1)return;drag={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!drag)return;const maxX=canvas.clientWidth*(zoom-1)/2,maxY=canvas.clientHeight*(zoom-1)/2;pan={x:Math.max(-maxX,Math.min(maxX,drag.px+e.clientX-drag.x)),y:Math.max(-maxY,Math.min(maxY,drag.py+e.clientY-drag.y))};updateZoom();});
canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
let swipe=null;
stage.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!e.target.closest('button,.annotation-card'))swipe={x:e.clientX,y:e.clientY};});
stage.addEventListener('pointerup',e=>{if(!swipe)return;const x=e.clientX-swipe.x,y=e.clientY-swipe.y;swipe=null;if(Math.abs(x)>55&&Math.abs(x)>Math.abs(y)*1.5)goTo(current+(x<0?1:-1));});stage.addEventListener('pointercancel',()=>swipe=null);
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
  if(indexDialog.open)return;
  if(e.key==='Escape'&&activePin!==null){e.preventDefault();closeAnnotation(true);return;}
  if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();goTo(current+1);}
  if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();goTo(current-1);}
  if(e.key==='Home'){e.preventDefault();goTo(0);}
  if(e.key==='End'){e.preventDefault();goTo(slides.length-1);}
  if(e.key===' '&&e.target===document.body){e.preventDefault();goTo(current+(e.shiftKey?-1:1));}
  if(!viewer.open&&e.key.toLowerCase()==='m')toggleAnnotations();
  if(e.key.toLowerCase()==='f')toggleFullscreen();
});
const hashMatch=location.hash.match(/^#vista-(\d+)$/);goTo(hashMatch?Number(hashMatch[1])-1:0,false);
