// Robot de Seguridad Alimentaria al Día — corre cada 30 minutos en GitHub Actions
// Trae noticias reales (Google Noticias + GDELT), las clasifica por tema y renueva
// la foto de vista previa del enlace (img/og.jpg) con una foto real.
import { readFile, writeFile } from 'node:fs/promises';
import { fotos } from './fotos.mjs';

const OUT = 'data/noticias.json';
const SITE = 'https://seguridad-alimentaria.netlify.app';
const UA = { 'User-Agent': `Mozilla/5.0 (VibrasPositivasHM robot; +${SITE})` };

const QUERIES = [
  'seguridad alimentaria Colombia', 'inseguridad alimentaria Colombia', 'hambre Colombia',
  'DANE inseguridad alimentaria', 'FAO Colombia alimentos', 'Programa Mundial de Alimentos Colombia',
  'PAE alimentación escolar', 'Alimentos para Aprender', 'ICBF desnutrición', 'Prosperidad Social alimentos',
  'seguridad alimentaria Antioquia', 'Gerencia MANÁ Antioquia', 'Bajo Cauca alimentos', 'Caucasia campesinos',
  'Córdoba Sucre hambre', 'mercados campesinos Colombia', 'precios de los alimentos Colombia',
  'banco de alimentos Colombia', 'desperdicio de alimentos Colombia', 'APPA producción de alimentos',
  'derecho a la alimentación Colombia', 'FAO hambre mundo', 'crisis alimentaria'
];

// Solo noticias de verdad sobre alimentos, hambre, nutrición, campo y abastecimiento
const CORE = /aliment|hambre|nutrici|desnutri|inseguridad alimentaria|seguridad alimentaria|soberan[ií]a alimentaria|\bpae\b|comedor|canasta|banco de alimentos|cosech|campesin|mercado campesino|abastec|fao\b|\bpma\b|programa mundial de alimentos|appa|bienestarina|huerta|agricultur|productores|desperdicio|precio de los alimentos|inflaci[oó]n de alimentos/i;
const BLOCK = /canci[oó]n|receta de|cantante|reggaet|telenovela|f[uú]tbol|hor[oó]scopo|mascota|perro|gato|concurso de belleza|reality|influencer|dieta para bajar|adelgaz/i;
const BLOCK_SRC = /^cdn$|remolacha|facebook|tiktok|instagram/i;

const TEMAS = [
  ['bajocauca', /caucasia|bajo cauca|nech[ií]|el bagre|zaragoza|c[aá]ceres|taraz[aá]|mojana|alto san jorge|asogauca/i],
  ['region', /antioquia|man[aá]\b|medell[ií]n|c[oó]rdoba|monter[ií]a|sucre|sincelejo|urab[aá]|nordeste|choc[oó]/i],
  ['programas', /\bpae\b|alimentaci[oó]n escolar|alimentos para aprender|icbf|bienestarina|prosperidad social|hambre cero|comedor|bono|canasta|subsidio|ley|decreto|minagricultura|ministerio/i],
  ['campo', /campesin|productor|cosech|siembr|cultiv|agro|mercado campesino|appa|tierra|abastec|precio|cadena|desperdicio|p[eé]rdida/i],
  ['mundo', /fao|pma|onu|mundial|mundo|global|sofi|[aá]frica|gaza|sud[aá]n|hait[ií]|venezuela/i]
];
const temaDe = t => (TEMAS.find(([, re]) => re.test(t)) || ['colombia'])[0];
const RELEVANT = n => n.titulo && CORE.test(n.titulo) && !BLOCK.test(n.titulo) && !BLOCK_SRC.test(n.fuente || '');

const decode = s => s.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const tag = (x, t) => { const m = x.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)); return m ? decode(m[1]) : ''; };

async function googleNews(q) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:14d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const r = await fetch(url, { headers: UA }); if (!r.ok) throw new Error('GN ' + r.status);
  const xml = await r.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
    const it = m[1]; let titulo = tag(it, 'title'); const fuente = tag(it, 'source');
    if (fuente && titulo.endsWith(' - ' + fuente)) titulo = titulo.slice(0, -(fuente.length + 3));
    const d = new Date(tag(it, 'pubDate'));
    return { titulo, url: tag(it, 'link'), fuente, fecha: isNaN(d) ? null : d.toISOString(), imagen: '' };
  }).filter(n => n.fecha);
}

async function gdelt() {
  const q = '("seguridad alimentaria" OR "inseguridad alimentaria" OR hambre OR desnutrición OR "alimentación escolar" OR campesinos) sourcecountry:CO';
  const url = 'https://api.gdeltproject.org/api/v2/doc/doc?format=json&mode=artlist&sort=datedesc&maxrecords=75&timespan=14d&query=' + encodeURIComponent(q);
  const r = await fetch(url, { headers: UA }); if (!r.ok) throw new Error('GDELT ' + r.status);
  const j = JSON.parse(await r.text() || '{}');
  return (j.articles || []).map(a => ({
    titulo: a.title, url: a.url, fuente: a.domain, imagen: a.socialimage || '',
    fecha: new Date(a.seendate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z')).toISOString()
  }));
}

const keyOf = t => (t || '').toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '').slice(0, 60);

async function main() {
  let prev = { items: [] };
  try { prev = JSON.parse(await readFile(OUT, 'utf8')); } catch {}
  const batches = await Promise.allSettled([gdelt(), ...QUERIES.map(googleNews)]);
  batches.forEach((b, i) => { if (b.status === 'rejected') console.log('Fuente', i, 'falló:', b.reason.message); });
  const fresh = batches.filter(b => b.status === 'fulfilled').flatMap(b => b.value);

  const map = new Map();
  for (const n of [...fresh, ...(prev.items || [])]) {
    if (!RELEVANT(n)) continue;
    const k = keyOf(n.titulo);
    const old = map.get(k);
    if (!old) map.set(k, { ...n, tema: temaDe(n.titulo) });
    else if (!old.imagen && n.imagen) old.imagen = n.imagen;
  }
  const limite = Date.now() - 45 * 864e5; // guarda 45 días
  const items = [...map.values()].filter(n => new Date(n.fecha).getTime() > limite)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 180);

  const out = { actualizado: new Date().toISOString(), zona_horaria: 'America/Bogota', total: items.length, items };
  await writeFile(OUT, JSON.stringify(out, null, 1));
  console.log('Noticias guardadas:', items.length, '· leídas en esta vuelta:', fresh.length);
  try { await fotos(process.env.FOTOS_FORCE === '1'); } catch (e) { console.log('fotos falló', e.message); }
  try { await ogImage(process.env.FOTOS_FORCE === '1'); } catch (e) { console.log('og falló', e.message); }
}

// Foto real para la vista previa del enlace (WhatsApp, Facebook): se renueva cada semana
async function ogImage(force) {
  const flag = 'img/og-fecha.txt';
  if (!force) {
    try {
      const last = new Date((await readFile(flag, 'utf8')).trim()).getTime();
      if (Date.now() - last < 7 * 864e5) return;
    } catch {}
  }
  let sharp;
  try { sharp = (await import('sharp')).default; } catch { console.log('sharp no instalado; se omite og.jpg'); return; }
  let pics = [];
  try { const f = JSON.parse(await readFile('data/fotos.json', 'utf8')); pics = [...(f.secciones.hero || []), ...(f.secciones.campo || []), ...(f.secciones.mercado || [])].filter(p => p.w >= 1200); } catch {}
  if (!pics.length) { console.log('Sin fotos aún para og.jpg'); return; }
  const pick = pics[Math.floor(Math.random() * pics.length)];
  const buf = Buffer.from(await (await fetch(pick.full, { headers: UA })).arrayBuffer());
  const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.3" stop-color="#1d2a12" stop-opacity="0"/><stop offset="1" stop-color="#1d2a12" stop-opacity="0.93"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="60" y="372" width="12" height="190" fill="#f2a516"/>
    <text x="95" y="440" font-family="Georgia, serif" font-size="66" font-weight="bold" fill="#ffffff">Seguridad Alimentaria al Día</text>
    <text x="97" y="495" font-family="Arial, sans-serif" font-size="29" fill="#f7e3b0">Hogares · Huerta · Campo · Programas · Noticias cada 30 min</text>
    <text x="97" y="540" font-family="Arial, sans-serif" font-size="24" fill="#f2a516">seguridad-alimentaria.netlify.app · Vibras Positivas HM</text>
  </svg>`);
  await sharp(buf).resize(1200, 630, { fit: 'cover', position: 'attention' }).composite([{ input: svg }]).jpeg({ quality: 84 }).toFile('img/og.jpg');
  await writeFile(flag, new Date().toISOString());
  console.log('og.jpg renovada con', pick.titulo);
}

main().catch(e => { console.error(e); process.exit(1); });
