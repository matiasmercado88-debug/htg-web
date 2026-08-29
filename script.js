const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});nav?.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')});const track=document.querySelector('.product-track');document.querySelector('.next')?.addEventListener('click',()=>track.scrollBy({left:track.firstElementChild.getBoundingClientRect().width+18,behavior:'smooth'}));document.querySelector('.prev')?.addEventListener('click',()=>track.scrollBy({left:-(track.firstElementChild.getBoundingClientRect().width+18),behavior:'smooth'}));document.querySelectorAll('.product-track button').forEach(button=>button.addEventListener('click',()=>{const i=button.querySelector('.ico');button.classList.add('added');i?.classList.replace('ico-cart','ico-check');setTimeout(()=>{button.classList.remove('added');i?.classList.replace('ico-check','ico-cart')},1200)}));const soulTrack=document.querySelector('.soul-banner-track');document.querySelector('.soul-banner-next')?.addEventListener('click',()=>soulTrack.scrollBy({left:soulTrack.clientWidth*.82,behavior:'smooth'}));document.querySelector('.soul-banner-prev')?.addEventListener('click',()=>soulTrack.scrollBy({left:-soulTrack.clientWidth*.82,behavior:'smooth'}));

const storeGrid=document.querySelector('.store-product-grid');if(storeGrid){const products=[...storeGrid.querySelectorAll('.store-product')];const search=document.querySelector('#store-search');const sort=document.querySelector('#store-sort');const count=document.querySelector('.store-result-count');const empty=document.querySelector('.store-empty');const active=document.querySelector('.active-filters');const filters=[...document.querySelectorAll('[data-filter]')];const applyStore=()=>{const query=search.value.trim().toLowerCase();const categories=filters.filter(x=>x.checked&&x.dataset.filter==='category').map(x=>x.value);const brands=filters.filter(x=>x.checked&&x.dataset.filter==='brand').map(x=>x.value);let visible=products.filter(p=>(!query||`${p.dataset.name} ${p.dataset.code} ${p.dataset.brand}`.toLowerCase().includes(query))&&(!categories.length||categories.includes(p.dataset.category))&&(!brands.length||brands.includes(p.dataset.brand)));const mode=sort.value;if(mode==='price-asc')visible.sort((a,b)=>+a.dataset.price-+b.dataset.price);if(mode==='price-desc')visible.sort((a,b)=>+b.dataset.price-+a.dataset.price);if(mode==='name')visible.sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name));products.forEach(p=>p.hidden=!visible.includes(p));visible.forEach(p=>storeGrid.appendChild(p));count.textContent=visible.length;empty.hidden=visible.length>0;document.querySelector('.store-load-more').hidden=visible.length===0;active.innerHTML=filters.filter(x=>x.checked).map(x=>`<span>${x.dataset.label||x.value}</span>`).join('')};search.addEventListener('input',applyStore);sort.addEventListener('change',applyStore);filters.forEach(x=>x.addEventListener('change',applyStore));document.querySelectorAll('.filter-clear').forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.checked=false);search.value='';sort.value='featured';applyStore()}));document.querySelector('.store-search-trigger')?.addEventListener('click',()=>{search.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>search.focus(),450)});const filterPanel=document.querySelector('.store-filters');document.querySelector('.store-filter-toggle')?.addEventListener('click',e=>{const open=filterPanel.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));e.currentTarget.querySelector('span').textContent=open?'−':'+'});document.querySelectorAll('.store-view button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.store-view button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');storeGrid.classList.toggle('compact',btn.dataset.view==='compact')}));document.querySelector('.store-load-more')?.addEventListener('click',e=>{e.currentTarget.innerHTML='Catálogo completo disponible al conectar la tienda <span>✓</span>'});const cart=[];const drawer=document.querySelector('.store-cart-drawer');const overlay=document.querySelector('.store-cart-overlay');const format=value=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:2}).format(value);const renderCart=()=>{const area=document.querySelector('.cart-drawer-items');document.querySelector('.store-cart-count').textContent=cart.length;document.querySelector('.cart-total').textContent=format(cart.reduce((sum,x)=>sum+x.price,0));area.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-drawer-item"><img src="${x.image}" alt=""><div><b>${x.name}</b><br><span>${format(x.price)}</span></div><button data-remove="${i}" aria-label="Quitar">×</button></div>`).join(''):'<div class="cart-empty"><i class="ico ico-box"></i><p>Todavía no agregaste nada.</p></div>';area.querySelectorAll('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>{cart.splice(+btn.dataset.remove,1);renderCart()}))};const setDrawer=open=>{drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));overlay.hidden=!open};document.querySelector('.store-cart-trigger')?.addEventListener('click',()=>setDrawer(true));document.querySelector('.store-cart-close')?.addEventListener('click',()=>setDrawer(false));overlay?.addEventListener('click',()=>setDrawer(false));products.forEach(p=>{p.querySelector('.store-add').addEventListener('click',e=>{cart.push({name:p.dataset.name,price:+p.dataset.price,image:p.querySelector('img').getAttribute('src')});e.currentTarget.classList.add('added');e.currentTarget.innerHTML='Agregado <span>✓</span>';renderCart();setDrawer(true)});p.querySelector('.quick-view').addEventListener('click',()=>p.querySelector('.store-product-info').scrollIntoView({behavior:'smooth',block:'center'}))});renderCart()}

const bannerTrack=document.querySelector('.banner-track');if(bannerTrack){const slides=[...bannerTrack.children];const dots=[...document.querySelectorAll('.banner-dots button')];const banners=bannerTrack.closest('.banners');const index=()=>Math.round(bannerTrack.scrollLeft/bannerTrack.clientWidth);const go=i=>bannerTrack.scrollTo({left:bannerTrack.clientWidth*((i%slides.length)+slides.length)%(bannerTrack.clientWidth*slides.length)});const sync=()=>{const c=index();dots.forEach((d,i)=>d.classList.toggle('active',i===c))};banners.querySelector('.banner-nav.next').addEventListener('click',()=>go(index()+1));banners.querySelector('.banner-nav.prev').addEventListener('click',()=>go(index()-1));dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));bannerTrack.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',()=>go(index()));const quiet=window.matchMedia('(prefers-reduced-motion:reduce)');let timer=null;const stop=()=>{clearInterval(timer);timer=null};const play=()=>{if(quiet.matches||timer)return;timer=setInterval(()=>go(index()+1),5500)};banners.addEventListener('mouseenter',stop);banners.addEventListener('mouseleave',play);banners.addEventListener('focusin',stop);banners.addEventListener('focusout',play);document.addEventListener('visibilitychange',()=>document.hidden?stop():play());play()}

/* Los tres formularios del sitio no tienen casilla de mail:
   arman un mensaje de WhatsApp con los campos completados. */
const WA_HTG='https://wa.me/5491164369119';
document.querySelectorAll('.wholesale-form,.service-form,.contact-form').forEach(form=>{
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const status=form.querySelector('.form-status');
    if(!form.checkValidity()){form.reportValidity();if(status)status.textContent='Revisá los campos marcados para continuar.';return}
    const NL=String.fromCharCode(10);
    const lineas=[];
    form.querySelectorAll('label').forEach(label=>{
      const campo=label.querySelector('input,select,textarea');
      if(!campo||campo.type==='checkbox')return;
      const valor=(campo.value||'').trim();
      if(!valor)return;
      const titulo=(label.childNodes[0]&&label.childNodes[0].textContent||'').trim().replace(/[:\s]+$/,'');
      lineas.push(titulo?titulo+(/[?]$/.test(titulo)?' ':': ')+valor:valor);
    });
    const texto='Hola HTG, les escribo desde la web.'+NL+NL+lineas.join(NL);
    if(status)status.textContent='Abrimos WhatsApp con tu consulta cargada…';
    window.open(WA_HTG+'?text='+encodeURIComponent(texto),'_blank','noopener');
  });
});

const siteHeader=document.querySelector('.site-header');
if(siteHeader){
  const markStuck=()=>siteHeader.classList.toggle('is-stuck',window.scrollY>6);
  markStuck();
  window.addEventListener('scroll',markStuck,{passive:true});
}


/* --- barra rotativa: en desktop entran los tres, en mobile rotan ---------- */
(() => {
  const items = [...document.querySelectorAll('.topbar-item')];
  if (items.length < 2) return;
  const narrow = window.matchMedia('(max-width:900px)');
  const quiet = window.matchMedia('(prefers-reduced-motion:reduce)');
  let i = 0, timer = null;
  const show = n => items.forEach((el, k) => el.classList.toggle('is-on', k === n));
  const stop = () => { clearInterval(timer); timer = null; };
  const sync = () => {
    stop();
    if (!narrow.matches) { items.forEach(el => el.classList.remove('is-on')); return; }
    show(i = 0);
    if (quiet.matches) return;
    timer = setInterval(() => show(i = (i + 1) % items.length), 4200);
  };
  sync();
  narrow.addEventListener('change', sync);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : sync());
})();

/* --- despiece: la fila enciende su pieza en el dibujo -------------------- */
(() => {
  const diagram = document.querySelector('.dsp-diagram');
  if (!diagram) return;
  const rows = [...diagram.querySelectorAll('.dsp-row')];
  const svg = diagram.querySelector('.dsp-svg');
  // Orden de pintado original: la 5 al fondo, la 0 al frente. Al activar una
  // pieza la traemos adelante, como en un despiece de verdad, y despues la
  // devolvemos a su lugar.
  const order = svg ? [...svg.querySelectorAll('.p')] : [];
  const leads = svg && svg.querySelector('.dsp-leads');
  const restore = () => {
    order.forEach(g => svg.appendChild(g));
    if (leads) svg.appendChild(leads);   // las guias se pintan siempre al final
  };
  const off = () => {
    diagram.classList.remove('is-on');
    diagram.removeAttribute('data-on');
    rows.forEach(r => r.classList.remove('is-on'));
    restore();
  };
  const on = row => {
    const cell = row.querySelector('.dsp-cell');
    diagram.classList.add('is-on');
    diagram.setAttribute('data-on', cell.dataset.part);
    rows.forEach(r => r.classList.toggle('is-on', r === row));
    restore();
    const front = svg && svg.querySelector(`.p[data-part="${cell.dataset.part}"]`);
    if (front) svg.insertBefore(front, leads);
  };
  rows.forEach(row => {
    row.addEventListener('pointerenter', () => on(row));
    row.addEventListener('focusin', () => on(row));
  });
  diagram.addEventListener('pointerleave', off);
  diagram.addEventListener('focusout', e => {
    if (!diagram.contains(e.relatedTarget)) off();
  });
})();

/* --- tienda: leer ?cat= y ?q= --------------------------------------------
   El despiece manda a la tienda con un rubro y un termino. Sin esto los links
   prometen un filtro que no se aplica. Pendiente PRODUCT.md: la taxonomia de
   la tienda (6 categorias) no cubre los 26 rubros del listado real.          */
(() => {
  const grid = document.querySelector('.store-product-grid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat');
  const q = params.get('q');
  let touched = false;

  if (cat) {
    const box = document.querySelector(`[data-filter="category"][value="${CSS.escape(cat)}"]`);
    if (box) { box.checked = true; touched = true; }
  }
  const search = document.querySelector('#store-search');
  if (q && search) { search.value = q; touched = true; }
  if (!touched) return;

  (search || document.querySelector('[data-filter]'))
    .dispatchEvent(new Event(search ? 'input' : 'change', { bubbles: true }));

  const results = document.querySelector('.store-result-count');
  if (results) results.closest('*').scrollIntoView({ block: 'nearest' });
})();

/* --- tienda: el scroll de rubros avisa que hay mas fuera de vista -------- */
(() => {
  const box = document.querySelector('.rubro-box');
  const list = box && box.querySelector('.rubro-scroll');
  if (!list) return;
  const sync = () => {
    const more = list.scrollHeight - list.clientHeight - list.scrollTop > 2;
    box.dataset.scroll = [list.scrollTop > 2 && 'up', more && 'down'].filter(Boolean).join(' ');
  };
  list.addEventListener('scroll', sync, { passive: true });
  new ResizeObserver(sync).observe(list);
  sync();
})();

/* --- tienda: el vacío tiene que decir la verdad ---------------------------
   La grilla es una selección de 12 productos; el listado real tiene 2.752 en
   26 rubros. Filtrar por "Baterías" daba cero y el cartel decía "no
   encontramos productos", que es falso: hay 90, todavía no están cargados.  */
(() => {
  const empty = document.querySelector('.store-empty');
  const scroll = document.querySelector('.rubro-scroll');
  if (!empty) return;
  const head = empty.querySelector('h2');
  const body = empty.querySelector('p');
  const base = { h: head.textContent, p: body.textContent };

  const checked = () => [...document.querySelectorAll('[data-filter="category"]:checked')];

  const search = document.querySelector('#store-search');

  const sync = () => {
    const on = checked();
    // Un solo rubro, sin término de búsqueda y con stock declarado en el
    // listado: eso no es un vacío, es catálogo que todavía no está cargado.
    // Con búsqueda escrita el vacío sí es un vacío y vale el cartel de siempre.
    const n = on.length === 1 && !search.value.trim() && on[0].closest('label').querySelector('span');
    if (empty.hidden || !n) { head.textContent = base.h; body.textContent = base.p; return; }
    head.textContent = `${on[0].dataset.label}: ${n.textContent} productos en el listado`;
    body.textContent = 'Esta vista muestra una selección del catálogo. ' +
      'El rubro completo entra cuando se conecte la tienda.';
  };

  new MutationObserver(sync).observe(empty, { attributes: true, attributeFilter: ['hidden'] });
  document.querySelectorAll('[data-filter]').forEach(x => x.addEventListener('change', sync));
  search.addEventListener('input', sync);
  sync();

  // un rubro que llega por ?cat= puede caer fuera del alto del scroll
  if (scroll) {
    const on = checked()[0];
    if (on) {
      const box = scroll.getBoundingClientRect(), row = on.closest('label').getBoundingClientRect();
      if (row.top < box.top || row.bottom > box.bottom) {
        scroll.scrollTop += row.top - box.top - 12;
      }
    }
  }
})();
