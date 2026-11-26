// Fotos y videos reales para la app (Wikimedia Commons, con autor y licencia).
// Se renuevan cada 7 días. Salida: data/fotos.json
import { readFile, writeFile } from 'node:fs/promises';
const UA = { 'User-Agent': 'VibrasPositivasHM-robot/1.0 (https://seguridad-alimentaria.netlify.app)' };
const OUT = 'data/fotos.json';

// Cada sección: búsquedas + palabras que DEBEN aparecer en el nombre del archivo
const SECCIONES = {
  hero:     { q: ['farmers market vegetables', 'vegetable market stall', 'harvest vegetables farmers', 'fresh vegetables basket'], si: /vegetable|verdura|harvest|cosecha|fruit|fruta|produce/i },
  hogar:    { q: ['beans rice plate', 'bandeja paisa', 'rice and beans', 'fruits vegetables basket', 'cooking vegetables kitchen'], si: /beans|frijol|rice|arroz|plate|plato|basket|fruit|vegetable|cooking|bandeja/i },
  huerta:   { q: ['vegetable garden', 'home garden vegetables', 'raised bed garden', 'urban garden community'], si: /garden|huerta|huerto|raised bed|allotment|seedling/i },
  campo:    { q: ['Colombia farmer', 'plantain plantation', 'cassava harvest', 'maize field farmer', 'rice field'], si: /farm|campesin|plantain|platano|cassava|yuca|maize|corn|rice|arroz|field|harvest/i },
  mercado:  { q: ['fruit stall market Colombia', 'frutas plaza de mercado', 'Paloquemao frutas', 'fruit vendor market', 'vegetable stall market'], si: /fruit|fruta|vegetable|verdura|stall|vendor|puesto|paloquemao/i },
  programas:{ q: ['school meal children', 'school lunch', 'food bank volunteers', 'food distribution'], si: /school|lunch|meal|food bank|distribution|volunteer|comedor/i },
  mundo:    { q: ['World Food Programme distribution', 'FAO agriculture', 'food aid', 'smallholder farmers Africa'], si: /wfp|food programme|fao|food aid|smallholder|farmer|distribution/i }
};
const NO = /elevation|front\b|edificio|building|facade|fachada|exterior|\b1[89]\d\d\b|google art|israëls|painting|francia m|secretary|minister|president|administrator|ambassador|senator|governor|explosion|protest|strike|riot|police|war\b|cctv|military|army|cheese|refugee|logo|map\b|mapa|chart|diagram|stamp|coin|svg|drawing|painting|poster|book|text|screenshot|portrait|selfie|museum|statue|church|meat|carne|butcher|slaughter|dead|blood|alcohol|beer|wine|cigar|toy|doll|cartoon|illustration|icon/i;

async function buscar(q, tipo) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=40' +
    '&gsrsearch=' + encodeURIComponent(`filetype:${tipo} ${q}`) + '&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1000';
  const j = await (await fetch(url, { headers: UA })).json();
  return Object.values(j.query?.pages || {}).map(p => {
    const ii = p.imageinfo?.[0]; if (!ii) return null;
    const md = ii.extmetadata || {};
    const desc = (md.ImageDescription?.value || '').replace(/<[^>]+>/g, ' ');
    return {
      titulo: p.title, src: ii.thumburl || ii.url, full: ii.url, page: ii.descriptionurl, w: ii.width, h: ii.height,
      autor: (md.Artist?.value || 'Wikimedia Commons').replace(/<[^>]+>/g, '').trim().slice(0, 60),
      lic: md.LicenseShortName?.value || '', texto: p.title + ' ' + desc
    };
  }).filter(Boolean);
}

export async function fotos(force = false) {
  try {
    const prev = JSON.parse(await readFile(OUT, 'utf8'));
    if (!force && Date.now() - new Date(prev.actualizado).getTime() < 7 * 864e5) return;
  } catch {}
  const out = { actualizado: new Date().toISOString(), secciones: {}, videos: [] };
  const usadas = new Set();
  for (const [k, { q: qs, si }] of Object.entries(SECCIONES)) {
    const lista = [];
    for (const q of qs) {
      try {
        for (const f of await buscar(q, 'bitmap')) {
          const ok = si.test(f.titulo) && !NO.test(f.texto) && f.w >= 900 && f.w > f.h * 1.15;
          if (ok && !usadas.has(f.titulo)) { usadas.add(f.titulo); lista.push(f); }
        }
      } catch (e) { console.log('Fotos', q, e.message); }
      if (lista.length >= 8) break;
    }
    out.secciones[k] = lista.slice(0, 8).map(({ texto, ...f }) => f);
    console.log('Fotos', k, out.secciones[k].length);
  }
  try {
    for (const q of ['vegetable harvest', 'vegetable garden', 'fruit harvest', 'farmers market vegetables']) {
      for (const v of await buscar(q, 'video')) {
        if (/vegetable|harvest|garden|fruit|farmers market|cosecha|verdura/i.test(v.titulo) && !NO.test(v.texto) && !out.videos.find(x => x.titulo === v.titulo)) {
          out.videos.push((({ texto, ...f }) => f)(v));
        }
      }
      if (out.videos.length >= 6) break;
    }
    console.log('Videos', out.videos.length);
  } catch (e) { console.log('Videos', e.message); }
  await writeFile(OUT, JSON.stringify(out, null, 1));
}
