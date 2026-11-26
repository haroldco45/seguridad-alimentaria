/* Seguridad Alimentaria al Día — Vibras Positivas HM */
(function () {
  const TZ = 'America/Bogota';
  const C = window.CONTENT, I = window.I18N, LEG = window.LEGAL;
  let lang = localStorage.getItem('sa_lang') || 'es';
  let news = [], filter = 'all', shown = 12, robotAt = null, liveMsg = '';
  let FOTOS = null;
  const $ = s => document.querySelector(s);
  const T = k => (I[lang] && I[lang][k]) || I.es[k] || k;
  const L = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.es) : v;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const loc = () => lang === 'es' ? 'es-CO' : 'en-US';
  const fmtDate = (d, time = true) => new Intl.DateTimeFormat(loc(), { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric', ...(time ? { hour: 'numeric', minute: '2-digit' } : {}) }).format(d);
  const num = (n, dec = 0) => new Intl.NumberFormat(loc(), { maximumFractionDigits: dec, minimumFractionDigits: dec }).format(isFinite(n) ? n : 0);
  const money = n => '$' + new Intl.NumberFormat('es-CO').format(Math.round(n));
  const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2200); };

  /* ---------- Textos fijos ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i]').forEach(el => { el.textContent = T(el.dataset.i); });
    $('#btnLang').textContent = lang === 'es' ? 'EN' : 'ES';
    $('#stamp').textContent = `${T('entered')} ${fmtDate(new Date())} ${lang === 'es' ? '(hora Colombia)' : '(Colombia time)'}`;
  }

  /* ---------- Contenido ---------- */
  const card = o => `<article class="card reveal"><h4>${esc(L(o.t))}</h4><p>${esc(L(o.p))}</p>${o.l ? `<a class="lnk" href="${o.l}" target="_blank" rel="noopener">${o.l.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</a>` : ''}</article>`;

  function renderContent() {
    $('#stats').innerHTML = C.stats.map((s, i) => { const [l, src] = s[lang] || s.es; return `<div class="stat reveal" style="--d:${i * 70}ms"><div class="n">${esc(s.n)}</div><div class="l">${esc(l)}</div><div class="s">${esc(src)}</div></div>`; }).join('');

    const years = [2022, 2023, 2024, 2025];
    $('#bars').innerHTML = `<div class="legend">${years.map(y => `<span class="y${y}">${y}</span>`).join('')}</div>` + C.deptos.map(d => `
      <div class="bar-row reveal${d.total ? ' total' : ''}"><div class="bar-l">${esc(d.d)}</div><div class="bar-g">
      ${years.filter(y => d.v[y] != null).map(y => `<div class="bar y${y}" style="--w:${d.v[y] / 60 * 100}%"><span>${num(d.v[y], 1)} %</span></div>`).join('')}
      </div></div>`).join('');
    $('#deptosNota').textContent = L(C.deptosNota);
    $('#ejes').innerHTML = C.ejes.map((e, i) => `<div class="eje reveal"><span class="eje-n">${i + 1}</span><h4>${esc(L(e.t))}</h4><p>${esc(L(e.p))}</p></div>`).join('');

    renderFies();
    $('#minimo').textContent = T('minimo').replace('{s}', money(LEG.smmlv)).replace('{a}', money(LEG.auxilio)).replace('{t}', money(LEG.smmlv + LEG.auxilio));
    if (!$('#mIng').value) $('#mIng').value = store.get('sa_ing', LEG.smmlv + LEG.auxilio);
    calc();

    $('#menu').innerHTML = C.menu.map(m => `<div class="day reveal"><b>${esc(L(m.d))}</b><p>${esc(L(m.a))}</p></div>`).join('');
    $('#tips').innerHTML = C.tips.map(card).join('');
    $('#huertaPasos').innerHTML = C.huertaPasos.map((s, i) => `<div class="step reveal"><span class="num">${i + 1}</span><h4>${esc(L(s.t))}</h4><p>${esc(L(s.p))}</p></div>`).join('');
    $('#huertaTabla').innerHTML = `<tr><th>${T('th_cult')}</th><th>${T('th_tiempo')}</th><th>${T('th_nota')}</th></tr>` + C.huerta.map(h => `<tr><td><b>${esc(L(h.c))}</b></td><td>${esc(L(h.t))}</td><td>${esc(L(h.n))}</td></tr>`).join('');
    $('#campoList').innerHTML = C.campo.map(card).join('');
    $('#progList').innerHTML = C.programas.map(card).join('');
    $('#mundoList').innerHTML = C.mundo.map(card).join('');
    renderChecks();
    renderEnts();
    $('#sourceList').innerHTML = C.sources.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('');
    buildPetition();
    renderChips();
    observe();
  }

  /* ---------- Test FIES ---------- */
  function renderFies() {
    const ans = store.get('sa_fies', {});
    $('#fies').innerHTML = C.fies.map((q, i) => `<li class="q"><p>${esc(L(q))}</p><div class="yn" data-q="${i}">
      <button type="button" class="${ans[i] === 1 ? 'on' : ''}" data-v="1">${T('si')}</button>
      <button type="button" class="${ans[i] === 0 ? 'on' : ''}" data-v="0">${T('no')}</button></div></li>`).join('');
  }
  $('#fies').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const q = b.parentElement.dataset.q, ans = store.get('sa_fies', {});
    ans[q] = +b.dataset.v; store.set('sa_fies', ans);
    b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  });
  $('#btnTest').addEventListener('click', () => {
    const ans = store.get('sa_fies', {});
    const score = Object.values(ans).reduce((a, v) => a + v, 0);
    const lvl = score === 0 ? 0 : score <= 3 ? 1 : score <= 6 ? 2 : 3;
    const r = $('#testResult');
    r.hidden = false; r.className = 'result lvl' + lvl;
    r.innerHTML = `<div class="score"><b>${score}</b>/8</div><div><h4>${T('r' + lvl + 't')}</h4><p>${T('r' + lvl + 'p')}</p>
      ${lvl >= 2 ? `<a class="btn small" href="#programas">${T('nav_programas')}</a>` : `<a class="btn small" href="#huerta">${T('nav_huerta')}</a>`}</div>`;
    r.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('#btnReset').addEventListener('click', () => { store.set('sa_fies', {}); renderFies(); $('#testResult').hidden = true; });

  /* ---------- Calculadora del mercado ---------- */
  function calc() {
    const ing = +$('#mIng').value || 0, per = Math.max(1, +$('#mPer').value || 1), gas = +$('#mGas').value || 0;
    store.set('sa_ing', ing);
    const pct = ing ? gas / ing * 100 : 0, dia = gas / per / 30, comida = dia / 3;
    $('#mOut').innerHTML = `<div class="out"><b>${num(pct, 1)} %</b><span>${T('m_pct')}</span></div>
      <div class="out"><b>${money(dia)}</b><span>${T('m_dia')}</span></div>
      <div class="out"><b>${money(comida)}</b><span>${T('m_com')}</span></div>`;
    $('#mBar').style.width = Math.min(100, pct) + '%';
    $('#mBar').className = pct > 50 ? 'bad' : pct > 33 ? 'mid' : 'ok';
    $('#mMsg').textContent = T(pct > 50 ? 'm_bad' : pct > 33 ? 'm_mid' : 'm_ok');
  }
  ['#mIng', '#mPer', '#mGas'].forEach(s => $(s).addEventListener('input', calc));

  /* ---------- Veeduría ---------- */
  function renderChecks() {
    const st = store.get('sa_checks', {});
    $('#checks').innerHTML = C.veeduria.map((c, i) => `<li><label><input type="checkbox" data-c="${i}" ${st[i] ? 'checked' : ''}><span>${esc(L(c))}</span></label></li>`).join('');
  }
  $('#checks').addEventListener('change', e => { const st = store.get('sa_checks', {}); st[e.target.dataset.c] = e.target.checked; store.set('sa_checks', st); });

  /* ---------- Derecho de petición ---------- */
  const PF = ['pNom', 'pCed', 'pMail', 'pTel', 'pDir', 'pMun'];
  function allEnts() { return [...C.entidades, ...store.get('sa_extra', []).map(e => ({ n: e, e, extra: true }))]; }
  function renderEnts() {
    const off = store.get('sa_off', []);
    $('#ents').innerHTML = allEnts().map(x => `<li><label><input type="checkbox" data-e="${esc(x.e)}" ${off.includes(x.e) ? '' : 'checked'}>
      <span><b>${esc(x.n)}</b>${x.extra ? '' : ` · ${esc(x.e)}`}</span></label>${x.extra ? `<button class="x" type="button" data-del="${esc(x.e)}" aria-label="Quitar">×</button>` : ''}</li>`).join('');
  }
  $('#ents').addEventListener('change', e => {
    const off = new Set(store.get('sa_off', [])); e.target.checked ? off.delete(e.target.dataset.e) : off.add(e.target.dataset.e);
    store.set('sa_off', [...off]); buildPetition();
  });
  $('#ents').addEventListener('click', e => {
    const d = e.target.dataset.del; if (!d) return;
    store.set('sa_extra', store.get('sa_extra', []).filter(x => x !== d)); renderEnts(); buildPetition();
  });
  $('#btnAdd').addEventListener('click', () => {
    const v = $('#pExtra').value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { $('#pExtra').focus(); return; }
    const ex = store.get('sa_extra', []); if (!ex.includes(v) && !C.entidades.some(x => x.e === v)) ex.push(v);
    store.set('sa_extra', ex); $('#pExtra').value = ''; renderEnts(); buildPetition();
  });
  const selected = () => { const off = store.get('sa_off', []); return allEnts().filter(x => !off.includes(x.e)); };
  let edited = false;
  function buildPetition() {
    if (edited) return;
    const v = Object.fromEntries(PF.map(k => [k, $('#' + k).value.trim()]));
    const hoy = new Intl.DateTimeFormat('es-CO', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
    const ents = selected().map(x => x.n).join('; ');
    const preg = C.preguntas.es.map((p, i) => `${i + 1}. ${p}`).join('\n');
    $('#pTxt').value =
`${v.pMun || 'Caucasia, Antioquia'}, ${hoy}

Señores
${ents}
E. S. D.

Asunto: Derecho de petición sobre seguridad alimentaria en Caucasia y el Bajo Cauca

Yo, ${v.pNom || '[nombre completo]'}, identificado(a) con cédula de ciudadanía n.º ${v.pCed || '[número]'}, en ejercicio del derecho fundamental de petición consagrado en el artículo 23 de la Constitución Política y regulado por la Ley 1755 de 2015, respetuosamente solicito información sobre las acciones para garantizar el derecho humano a la alimentación en el municipio y la subregión.

Hechos
Según el DANE (escala FIES, publicada el 21 de mayo de 2026), el 21,1 % de los hogares del país vivió inseguridad alimentaria moderada o grave en 2025; en Antioquia la cifra fue de 20,1 %, y en los departamentos vecinos de Córdoba y Sucre llegó a 40,2 % y 50,1 %. La Ley 2046 de 2020 ordena que los programas públicos compren mínimo el 30 % de sus alimentos a pequeños productores locales.

Peticiones
${preg}

Solicito que cada entidad responda en lo de su competencia y, si algún punto no le corresponde, lo traslade a la autoridad competente según el artículo 21 de la Ley 1755 de 2015.

Notificaciones
Correo: ${v.pMail || '[correo]'} · Teléfono: ${v.pTel || '[teléfono]'} · Dirección: ${v.pDir || '[dirección]'}

Atentamente,

${v.pNom || '[nombre completo]'}
C.C. ${v.pCed || '[número]'}`;
  }
  PF.forEach(k => { const el = $('#' + k); el.value = store.get('sa_' + k, el.value); el.addEventListener('input', () => { store.set('sa_' + k, el.value); edited = false; buildPetition(); }); });
  $('#pTxt').addEventListener('input', () => { edited = true; });
  const ready = () => { const ok = $('#pNom').value.trim() && $('#pCed').value.trim(); $('#pWarn').hidden = !!ok; return ok; };
  $('#btnSend').addEventListener('click', () => {
    if (!ready()) return;
    const to = selected().map(x => x.e).join(','), cc = $('#pMail').value.trim();
    const subj = 'Derecho de petición - Seguridad alimentaria en Caucasia y el Bajo Cauca';
    location.href = `mailto:${to}?${cc ? 'cc=' + encodeURIComponent(cc) + '&' : ''}subject=${encodeURIComponent(subj)}&body=${encodeURIComponent($('#pTxt').value)}`;
  });
  $('#btnCopy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('#pTxt').value); } catch { $('#pTxt').select(); document.execCommand('copy'); } toast(T('p_copied')); });
  $('#btnWa').addEventListener('click', () => {
    const msg = (lang === 'es' ? 'Yo ya exigí respuestas sobre el hambre en Caucasia y el Bajo Cauca. Hazlo tú también desde aquí: ' : 'I demanded answers about hunger in Caucasia and Bajo Cauca. Do it too: ') + 'https://seguridad-alimentaria.netlify.app/#peticion';
    open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });

  /* ---------- Fotos y videos reales ---------- */
  const credit = f => `<a class="cred" href="${f.page}" target="_blank" rel="noopener">${esc(f.autor)}${f.lic ? ' · ' + esc(f.lic) : ''}</a>`;
  async function loadFotos() {
    try { FOTOS = await (await fetch('data/fotos.json?t=' + Date.now(), { cache: 'no-store' })).json(); } catch { FOTOS = null; }
    if (!FOTOS || !FOTOS.secciones) return;
    const S = FOTOS.secciones, pick = (k, n) => (S[k] || []).slice(0, n);
    // Hero en carrusel
    const hero = pick('hero', 6);
    if (hero.length) {
      $('#heroMedia').innerHTML = hero.map((f, i) => `<img src="${f.src}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} class="${i ? '' : 'on'}">`).join('') + `<div class="hero-cred">${credit(hero[0])}</div>`;
      let k = 0; setInterval(() => { const imgs = $('#heroMedia').querySelectorAll('img'); if (imgs.length < 2) return; imgs[k].classList.remove('on'); k = (k + 1) % imgs.length; imgs[k].classList.add('on'); $('#heroMedia .hero-cred').innerHTML = credit(hero[k]); }, 6500);
    }
    const band = (sel, f, txt) => { const el = $(sel); if (!el) return; if (f) { el.innerHTML = `<img src="${f.src}" alt="" loading="lazy"><div class="band-txt">${esc(txt)}</div>${credit(f)}`; el.classList.add('has'); } };
    band('#band1', pick('campo', 1)[0], lang === 'es' ? 'Colombia produce comida; el reto es que llegue a todas las mesas.' : 'Colombia grows food; the challenge is reaching every table.');
    band('#band2', pick('hogar', 1)[0], lang === 'es' ? 'Comer variado no tiene que ser caro.' : 'Eating varied food does not have to be expensive.');
    band('#band3', pick('programas', 1)[0], lang === 'es' ? 'La ayuda existe: hay que conocerla y vigilarla.' : 'Help exists: know it and watch over it.');
    band('#band4', pick('mundo', 1)[0], lang === 'es' ? 'El hambre se puede vencer: tres años seguidos bajando en el mundo.' : 'Hunger can be beaten: three straight years of decline.');
    const hf = pick('hogar', 3)[1] || pick('hero', 2)[1];
    if (hf) $('#hogarFoto').innerHTML = `<figure><img src="${hf.src}" alt="" loading="lazy">${credit(hf)}</figure>`;
    const gal = (sel, arr) => { $(sel).innerHTML = arr.map(f => `<figure class="reveal"><img src="${f.src}" alt="" loading="lazy">${credit(f)}</figure>`).join(''); };
    gal('#huertaFotos', pick('huerta', 4));
    gal('#mercadoFotos', [...pick('mercado', 3), ...pick('campo', 4).slice(1, 2)]);
    const v = (FOTOS.videos || [])[0];
    if (v) $('#campoVideo').innerHTML = `<video src="${v.full}" muted autoplay loop playsinline preload="metadata"></video>${credit(v)}`;
    observe();
  }

  /* ---------- Noticias: robot + búsqueda en vivo ---------- */
  const TEMAS = [
    ['bajocauca', /caucasia|bajo cauca|nech[ií]|el bagre|zaragoza|c[aá]ceres|taraz[aá]|mojana|alto san jorge|asogauca/i],
    ['region', /antioquia|man[aá]\b|medell[ií]n|c[oó]rdoba|monter[ií]a|sucre|sincelejo|urab[aá]|nordeste|choc[oó]/i],
    ['programas', /\bpae\b|alimentaci[oó]n escolar|alimentos para aprender|icbf|bienestarina|prosperidad social|hambre cero|comedor|bono|canasta|subsidio|ley|decreto|minagricultura|ministerio/i],
    ['campo', /campesin|productor|cosech|siembr|cultiv|agro|mercado campesino|appa|tierra|abastec|precio|cadena|desperdicio|p[eé]rdida/i],
    ['mundo', /fao|pma|onu|mundial|mundo|global|sofi|[aá]frica|gaza|sud[aá]n|hait[ií]|venezuela/i]
  ];
  const CORE = /aliment|hambre|nutrici|desnutri|\bpae\b|comedor|canasta|banco de alimentos|cosech|campesin|abastec|fao\b|programa mundial de alimentos|bienestarina|huerta|agricultur|desperdicio/i;
  const FOREIGN = /texas|estados unidos|ee\. ?uu|thanksgiving|per[uú]\b|midis|m[eé]xico|argentina|chile\b|ecuador|bolivia|guatemala|honduras|espa[nñ]a|cuba\b|rep[uú]blica dominicana|venezuela|brasil/i;
  const temaDe = t => (FOREIGN.test(t) && !/colombia/i.test(t)) ? 'mundo' : (TEMAS.find(([, re]) => re.test(t)) || ['colombia'])[0];
  const keyOf = t => (t || '').toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '').slice(0, 60);
  const gdeltDate = s => s ? new Date(s.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z')).toISOString() : null;

  async function robotNews() {
    try { const r = await fetch('data/noticias.json?t=' + Date.now(), { cache: 'no-store' }); const j = await r.json(); robotAt = j.actualizado ? new Date(j.actualizado) : null; return j.items || []; } catch { return []; }
  }
  async function liveSearch() {
    const q = '("seguridad alimentaria" OR "inseguridad alimentaria" OR hambre OR desnutrición OR "alimentación escolar") sourcecountry:CO';
    const url = 'https://api.gdeltproject.org/api/v2/doc/doc?format=json&mode=artlist&sort=datedesc&maxrecords=40&timespan=7d&query=' + encodeURIComponent(q);
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 9000);
    try {
      const j = await (await fetch(url, { signal: ctl.signal })).json();
      return (j.articles || []).filter(a => CORE.test(a.title)).map(a => ({ titulo: a.title, url: a.url, fuente: a.domain, imagen: a.socialimage || '', fecha: gdeltDate(a.seendate), tema: temaDe(a.title), vivo: true }));
    } finally { clearTimeout(to); }
  }
  function merge(a, b) {
    const m = new Map();
    for (const n of [...a, ...b]) { if (!n.titulo || !n.fecha) continue; const k = keyOf(n.titulo); if (!m.has(k)) m.set(k, n); else if (!m.get(k).imagen && n.imagen) m.get(k).imagen = n.imagen; }
    return [...m.values()].sort((x, y) => new Date(y.fecha) - new Date(x.fecha));
  }
  function renderChips() {
    const keys = ['all', 'bajocauca', 'region', 'programas', 'campo', 'colombia', 'mundo'];
    $('#chips').innerHTML = keys.map(k => { const c = k === 'all' ? news.length : news.filter(n => temaDe(n.titulo) === k).length; return `<button type="button" class="chip${filter === k ? ' on' : ''}" data-f="${k}">${T('f_' + k)} <small>${c}</small></button>`; }).join('');
  }
  $('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; filter = b.dataset.f; shown = 12; renderChips(); renderNews(); });
  function renderNews() {
    const list = filter === 'all' ? news : news.filter(n => temaDe(n.titulo) === filter);
    $('#news').innerHTML = list.length ? list.slice(0, shown).map((n, i) => `
      <a class="nw reveal${i === 0 && filter === 'all' ? ' big' : ''}" href="${esc(n.url)}" target="_blank" rel="noopener">
        ${n.imagen ? `<div class="nw-img"><img src="${esc(n.imagen)}" alt="" loading="lazy" onerror="this.parentElement.remove()"></div>` : ''}
        <div class="nw-b"><div class="nw-m">${n.vivo ? `<span class="livetag">${T('live')}</span>` : ''}<span>${esc(n.fuente || '')}</span><span>${fmtDate(new Date(n.fecha))}</span></div>
        <h4>${esc(n.titulo)}</h4><span class="tema">${T('f_' + temaDe(n.titulo))}</span></div></a>`).join('') : `<p class="empty">${T('noNews')}</p>`;
    $('#btnMore').style.display = list.length > shown ? '' : 'none';
    const top = news.slice(0, 14);
    if (top.length) $('#ticker').innerHTML = [...top, ...top].map(n => `<span>${esc(n.titulo)}</span>`).join('');
    status(); observe();
  }
  function status() { $('#newsStatus').textContent = liveMsg + (robotAt ? `${T('robotAt')} ${fmtDate(robotAt)} ${lang === 'es' ? 'hora Colombia' : 'Colombia time'}` : '—'); }
  $('#btnMore').addEventListener('click', () => { shown += 12; renderNews(); });

  async function loadNews() {
    const b = $('#btnRefresh'); b.classList.add('spin');
    const robot = await robotNews();
    news = merge([], robot); renderChips(); renderNews();
    try { const live = await liveSearch(); news = merge(live, robot); liveMsg = T('liveOk').replace('{n}', live.length); }
    catch { liveMsg = T('liveFail'); }
    renderChips(); renderNews(); b.classList.remove('spin');
  }
  $('#btnRefresh').addEventListener('click', () => { loadNews(); toast(lang === 'es' ? 'Actualizando...' : 'Refreshing...'); });

  /* ---------- Idioma, compartir, pestañas ---------- */
  $('#btnLang').addEventListener('click', () => { lang = lang === 'es' ? 'en' : 'es'; localStorage.setItem('sa_lang', lang); applyI18n(); renderContent(); renderNews(); loadFotos(); });
  $('#btnShare').addEventListener('click', async () => {
    const data = { title: 'Seguridad Alimentaria al Día', text: T('heroTitle'), url: 'https://seguridad-alimentaria.netlify.app/' };
    if (navigator.share) { try { await navigator.share(data); } catch {} } else { open('https://wa.me/?text=' + encodeURIComponent(data.text + ' ' + data.url), '_blank', 'noopener'); }
  });

  let io;
  function observe() {
    if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); return; }
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal:not(.in)').forEach(e => io.observe(e));
  }
  if ('IntersectionObserver' in window) {
    const tabs = [...document.querySelectorAll('.tabs a')];
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      tabs.forEach(a => { const on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('on', on); if (on) { const nav = a.parentElement; nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' }); } });
    }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => so.observe(s));
  }

  applyI18n(); renderContent(); loadFotos(); loadNews();
  setInterval(loadNews, 10 * 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loadNews(); });
})();
