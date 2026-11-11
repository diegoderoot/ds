(() => {
'use strict';

const D = window.DS_DATA;
const KEY = 'ds-app-v1';
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const F = [
  { k: 'peso', l: 'Peso', u: 'kg', d: 2 },
  { k: 'imc', l: 'IMC', u: '', d: 1 },
  { k: 'grasa', l: 'Grasa corporal', u: '%', d: 1 },
  { k: 'osea', l: 'Masa ósea', u: 'kg', d: 2 },
  { k: 'musculo', l: 'Masa muscular', u: '%', d: 1 },
  { k: 'agua', l: 'Agua corporal', u: '%', d: 1 },
  { k: 'proteina', l: 'Proteína', u: '%', d: 1 },
  { k: 'bmr', l: 'BMR', u: 'kcal', d: 0 },
  { k: 'edad', l: 'Edad metabólica', u: 'años', d: 0 },
  { k: 'altura', l: 'Altura', u: 'cm', d: 0 }
];

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
const dow = d => (d.getDay() + 6) % 7;
const addDays = (d, n) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; };
const monday = d => addDays(d, -dow(d));
const num = (v, dec) => Number(v).toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
const shortDate = s => { const d = parse(s); return `${d.getDate()} ${MS[d.getMonth()]}`; };
const signed = (v, dec) => {
  const r = Number(v.toFixed(dec));
  return r === 0 ? '=' : (r > 0 ? '+' : '−') + num(Math.abs(r), dec);
};

/* ---------- estado guardado en el iPhone ---------- */
let S = null;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
S = Object.assign({ who: 'diego', checks: {}, gym: {}, plan: null, cats: null, shopChecked: {}, extras: [], progress: null }, S || {});
if (!S.progress) S.progress = clone(D.progress);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const plan = () => S.plan || D.plan;
const cats = () => S.cats || D.shop;
const recs = () => S.progress.slice().sort((a, b) => (a.date < b.date ? -1 : 1));

const ui = { tab: 'hoy', planWho: null, open: null, edit: null, week: 0, metric: 'peso', shopEdit: false, form: null, day: iso(new Date()) };

/* ---------- piezas comunes ---------- */
const head = (eyebrow, title) => `<header class="head"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><div class="rule"></div></header>`;
const seg = (val, act) => `<div class="seg">${['diego', 'sheila'].map(w =>
  `<button data-a="${act}" data-v="${w}" class="${val === w ? 'on' : ''}">${w === 'diego' ? 'Diego' : 'Sheila'}</button>`).join('')}</div>`;
const mealBody = m => `<span class="body"><span class="name">${esc(m.n)}</span><span class="text">${esc(m.t)}</span>${m.k ? `<span class="macros">${esc(m.k)}</span>` : ''}</span>`;

function weekPct(who) {
  const t = new Date(), m = monday(t);
  let tot = 0, done = 0;
  for (let i = 0; i <= dow(t); i++) {
    const meals = plan()[who][i].meals, c = (S.checks[iso(addDays(m, i))] || {})[who] || {};
    tot += meals.length;
    meals.forEach((_, j) => { if (c[j]) done++; });
  }
  return tot ? Math.round(done * 100 / tot) : 0;
}

/* ---------- HOY ---------- */
function vHoy() {
  const t = new Date(), di = dow(t), k = iso(t), who = S.who;
  const day = plan()[who][di], c = (S.checks[k] || {})[who] || {}, pct = weekPct(who);
  let h = head(`${t.getDate()} de ${MONTHS[t.getMonth()]}`, DAYS[di]) + seg(who, 'who');
  if (who === 'diego') {
    const g = D.gyms[di];
    h += g
      ? `<button class="card ${S.gym[k] ? 'done' : ''}" data-a="gym" data-k="${k}"><span class="tick"></span><span><small>Hoy entrenas${S.gym[k] ? ' · hecho' : ''}</small><b>${esc(g)}</b></span></button>`
      : `<p class="rest">Día de descanso</p>`;
  } else if (day.tag) {
    h += `<p class="rest">${esc(day.tag)}</p>`;
  }
  h += `<section class="list">${day.meals.map((m, j) =>
    `<button class="meal ${c[j] ? 'done' : ''}" data-a="meal" data-j="${j}"><span class="tick"></span>${mealBody(m)}</button>`).join('')}</section>`;
  if (day.total) h += `<p class="total">${esc(day.total)}</p>`;
  h += `<div class="week"><div class="row"><span>Cumplimiento de la semana</span><b>${pct}%</b></div><div class="bar"><i style="width:${pct}%"></i></div></div>`;
  return h;
}

/* ---------- PLAN ---------- */
const emeal = m => `<div class="emeal">
  <label>Comida<input class="en" value="${esc(m.n)}"></label>
  <label>Qué se come<textarea class="et">${esc(m.t)}</textarea></label>
  <label>Macros <small>(opcional)</small><input class="ek" value="${esc(m.k)}"></label>
  <button type="button" class="link danger" data-a="delmeal">Quitar esta comida</button></div>`;

function vPlan() {
  const who = ui.planWho || S.who, today = dow(new Date());
  if (ui.open == null) ui.open = today;
  let h = head('Dieta semanal', 'Plan') + seg(who, 'planwho');
  h += plan()[who].map((day, i) => {
    if (ui.edit === i) {
      return `<article class="day open"><div class="dayhead"><span class="dname">${DAYS[i]}</span><span class="tag">Editando</span></div>
        <div class="daybody" id="editform">
          <label>Etiqueta del día <small>(opcional)</small><input class="etag" value="${esc(day.tag)}"></label>
          <div id="emeals">${day.meals.map(emeal).join('')}</div>
          <button type="button" class="link" data-a="addmeal">+ Añadir comida</button>
          <label>Total del día <small>(opcional)</small><input class="etot" value="${esc(day.total)}"></label>
          <div class="actions"><button class="btn ghost" data-a="canceledit">Cancelar</button><button class="btn" data-a="saveedit">Guardar</button></div>
        </div></article>`;
    }
    const open = ui.open === i;
    return `<article class="day ${open ? 'open' : ''} ${i === today ? 'today' : ''}">
      <button class="dayhead" data-a="open" data-i="${i}"><span class="dname">${DAYS[i]}</span><span class="tag">${esc(day.tag)}</span><span class="chev"></span></button>
      ${open ? `<div class="daybody">${day.meals.map(m => `<div class="meal">${mealBody(m)}</div>`).join('')}
        ${day.total ? `<p class="total">${esc(day.total)}</p>` : ''}
        <button class="link" data-a="edit" data-i="${i}">Editar ${DAYS[i].toLowerCase()}</button></div>` : ''}
    </article>`;
  }).join('');
  return h;
}

/* ---------- ENTRENOS ---------- */
const gymDays = Object.keys(D.gyms).map(Number);
const weekRange = base => {
  const a = base, b = addDays(base, 6);
  return `${a.getDate()} ${MS[a.getMonth()]} – ${b.getDate()} ${MS[b.getMonth()]}`;
};

function vEntrenos() {
  const now = monday(new Date()), base = addDays(now, ui.week * 7);
  const count = b => gymDays.filter(i => S.gym[iso(addDays(b, i))]).length;
  let h = head('Rutina semanal', 'Entrenos');
  h += `<div class="weeknav"><button data-a="week" data-v="-1" aria-label="Semana anterior">‹</button><span>${ui.week === 0 ? 'Esta semana · ' : ''}${weekRange(base)}</span><button data-a="week" data-v="1" aria-label="Semana siguiente" ${ui.week >= 0 ? 'disabled' : ''}>›</button></div>`;
  h += `<section class="list">${gymDays.map(i => {
    const d = addDays(base, i), k = iso(d);
    return `<button class="meal ${S.gym[k] ? 'done' : ''}" data-a="gym" data-k="${k}"><span class="tick"></span><span class="body"><span class="name">${esc(D.gyms[i])}</span><span class="macros">${DAYS[i]} ${d.getDate()} de ${MONTHS[d.getMonth()]}</span></span></button>`;
  }).join('')}</section>`;
  h += `<p class="total">${count(base)} de ${gymDays.length} sesiones</p>`;
  h += `<h2>Semanas anteriores</h2>`;
  for (let w = 1; w <= 6; w++) {
    const b = addDays(now, -7 * w), n = count(b);
    h += `<button class="hist" data-a="weekset" data-v="${-w}"><span>${weekRange(b)}</span><span><span class="dots">${gymDays.map(i => S.gym[iso(addDays(b, i))] ? '●' : '<i>●</i>').join('')}</span><em>${n}/${gymDays.length}</em></span></button>`;
  }
  return h;
}

/* ---------- PROGRESO ---------- */
function chart(f) {
  const pts = recs().filter(r => r[f.k] != null).map(r => ({ x: parse(r.date).getTime(), y: r[f.k], date: r.date }));
  if (pts.length < 2) return `<p class="total">Hacen falta al menos dos registros para dibujar la gráfica.</p>`;
  const W = 340, H = 190, L = 40, R = 14, T = 16, B = 24;
  const goal = f.k === 'peso' ? D.goal.weight : null;
  const ys = pts.map(p => p.y).concat(goal != null ? [goal] : []);
  let y0 = Math.min(...ys), y1 = Math.max(...ys);
  const m = (y1 - y0 || 1) * 0.12; y0 -= m; y1 += m;
  const x0 = pts[0].x, x1 = pts[pts.length - 1].x;
  const X = x => L + (x - x0) / (x1 - x0) * (W - L - R);
  const Y = y => T + (y1 - y) / (y1 - y0) * (H - T - B);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolución de ${esc(f.l)}">`;
  for (let i = 0; i <= 3; i++) {
    const v = y0 + (y1 - y0) * i / 3, y = Y(v);
    s += `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" stroke="rgba(22,35,59,.1)"/><text x="${L - 6}" y="${y + 3}" text-anchor="end">${num(v, f.d > 1 ? 1 : f.d)}</text>`;
  }
  if (goal != null) {
    const g = parse(D.goal.date);
    s += `<line x1="${L}" x2="${W - R}" y1="${Y(goal)}" y2="${Y(goal)}" stroke="#a8894f" stroke-dasharray="4 4"/>`
      + `<text x="${W - R}" y="${Y(goal) - 5}" text-anchor="end" style="fill:#a8894f">Objetivo ${num(goal, 0)} kg · ${g.getDate()} ${MS[g.getMonth()]}</text>`;
  }
  s += `<polyline fill="none" stroke="#6d1f2c" stroke-width="1.6" stroke-linejoin="round" points="${pts.map(p => `${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ')}"/>`;
  s += pts.map(p => `<circle cx="${X(p.x).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="2.6" fill="#fcfaf4" stroke="#6d1f2c" stroke-width="1.3"/>`).join('');
  s += `<text x="${L}" y="${H - 6}">${shortDate(pts[0].date)}</text><text x="${W - R}" y="${H - 6}" text-anchor="end">${shortDate(pts[pts.length - 1].date)}</text></svg>`;
  return `<div class="chart">${s}</div>`;
}

function vProgreso() {
  const rs = recs(), last = rs[rs.length - 1], prev = rs[rs.length - 2], first = rs[0];
  let h = head(last ? `Último registro · ${shortDate(last.date)}` : 'Sin registros', 'Progreso');
  if (last) {
    const left = last.peso - D.goal.weight;
    h += `<div class="stat"><div><b>${num(last.peso, 2)}</b><span>kg actuales</span></div>`
      + (rs.length > 1 ? `<div><b>${signed(last.peso - first.peso, 2)}</b><span>desde ${shortDate(first.date)}</span></div>` : '')
      + `<div><b>${left > 0 ? num(left, 2) : '✓'}</b><span>${left > 0 ? 'kg al objetivo' : 'objetivo'}</span></div></div>`;
  }
  h += `<div class="actions"><button class="btn wine" data-a="newrec">Nuevo registro</button></div>`;
  if (last) {
    const f = F.find(x => x.k === ui.metric);
    h += `<h2>Evolución</h2><div class="chips">${F.filter(x => x.k !== 'altura').map(x =>
      `<button data-a="metric" data-v="${x.k}" class="${x.k === ui.metric ? 'on' : ''}">${x.l}</button>`).join('')}</div>${chart(f)}`;
    h += `<h2>Último registro${prev ? ` · frente al ${shortDate(prev.date)}` : ''}</h2><table>${F.map(x => {
      const v = last[x.k];
      const diff = prev && v != null && prev[x.k] != null && x.k !== 'altura' ? signed(v - prev[x.k], x.d) : '';
      return `<tr><td>${x.l}</td><td>${v == null ? '—' : num(v, x.d)} <small>${x.u}</small></td><td>${diff}</td></tr>`;
    }).join('')}</table>`;
    h += `<h2>Historial · toca para editar</h2>` + rs.slice().reverse().map(r => {
      const i = rs.indexOf(r), p = rs[i - 1];
      return `<button class="hist" data-a="rec" data-d="${r.date}"><span>${shortDate(r.date)} ${parse(r.date).getFullYear()}</span><span>${num(r.peso, 2)} kg<em>${p ? signed(r.peso - p.peso, 2) : ''}</em></span></button>`;
    }).join('');
  }
  if (ui.form) {
    const v = ui.form.values;
    h += `<div class="sheet"><div class="panel"><h3>${ui.form.orig ? 'Editar registro' : 'Nuevo registro'}</h3><div id="recform">
      <label>Fecha<input type="date" name="date" value="${esc(v.date)}"></label>
      <div class="grid">${F.map(x => `<label>${x.l} <small>${x.u}</small><input inputmode="decimal" name="${x.k}" value="${v[x.k] == null ? '' : String(v[x.k]).replace('.', ',')}"></label>`).join('')}</div>
      <div class="actions"><button class="btn ghost" data-a="closerec">Cancelar</button><button class="btn" data-a="saverec">Guardar</button></div>
      ${ui.form.orig ? `<div class="actions"><button class="link danger" data-a="delrec" style="flex:1;text-align:center">Eliminar este registro</button></div>` : ''}
    </div></div></div>`;
  }
  return h;
}

/* ---------- COMPRA ---------- */
const split = t => { const m = String(t).match(/^(.*?)\s*\((.*)\)\s*$/); return m ? [m[1], m[2]] : [t, '']; };
function itemRow(t, del) {
  const p = split(t), body = `<span class="body">${esc(p[0])}${p[1] ? `<small>${esc(p[1])}</small>` : ''}</span>`;
  if (ui.shopEdit) return `<div class="item">${body}<button class="x" ${del} aria-label="Quitar">×</button></div>`;
  return `<button class="item ${S.shopChecked[t] ? 'done' : ''}" data-a="shop" data-t="${esc(t)}"><span class="tick"></span>${body}</button>`;
}

function vCompra() {
  const cs = cats(), all = S.extras.concat(...cs.map(c => c.items));
  const done = all.filter(t => S.shopChecked[t]).length;
  let h = head(`${done} de ${all.length} en el carro`, 'Compra');
  if (!ui.shopEdit) h += `<form class="addrow" data-s="addextra"><input name="t" placeholder="Añadir producto puntual" autocomplete="off" enterkeyhint="done"><button>Añadir</button></form>`;
  if (S.extras.length) h += `<h2>Puntuales</h2>` + S.extras.map((t, j) => itemRow(t, `data-a="delextra" data-j="${j}"`)).join('');
  cs.forEach((c, ci) => {
    h += `<h2>${esc(c.cat)}</h2>` + c.items.map((t, j) => itemRow(t, `data-a="delitem" data-c="${ci}" data-j="${j}"`)).join('');
    if (ui.shopEdit) h += `<form class="addrow" data-s="additem" data-c="${ci}" style="margin-top:10px"><input name="t" placeholder="Añadir a ${esc(c.cat.toLowerCase())}" autocomplete="off" enterkeyhint="done"><button>Añadir</button></form>`;
  });
  h += ui.shopEdit
    ? `<div class="actions"><button class="btn" data-a="shopedit">Hecho</button></div>`
    : `<div class="actions"><button class="btn ghost" data-a="shopedit">Editar lista</button><button class="btn wine" data-a="shopreset">Reiniciar</button></div>`;
  return h;
}

/* ---------- pintar ---------- */
const views = { hoy: vHoy, plan: vPlan, entrenos: vEntrenos, progreso: vProgreso, compra: vCompra };
function render(keep) {
  const m = $('#main'), y = m.scrollTop;
  m.innerHTML = views[ui.tab]();
  m.scrollTop = keep ? y : 0;
  document.querySelectorAll('#tabbar button').forEach(b => b.classList.toggle('on', b.dataset.v === ui.tab));
}

/* ---------- acciones ---------- */
const editablePlan = () => { if (!S.plan) S.plan = clone(D.plan); return S.plan; };
const editableCats = () => { if (!S.cats) S.cats = clone(D.shop); return S.cats; };
const toggle = (obj, k) => { if (obj[k]) delete obj[k]; else obj[k] = true; };

const actions = {
  tab(el) { ui.tab = el.dataset.v; ui.edit = null; ui.form = null; ui.shopEdit = false; ui.open = null; ui.week = 0; render(); },
  who(el) { S.who = el.dataset.v; save(); render(true); },
  planwho(el) { ui.planWho = el.dataset.v; ui.edit = null; render(true); },
  meal(el) {
    const k = iso(new Date());
    const day = S.checks[k] || (S.checks[k] = {}), c = day[S.who] || (day[S.who] = {});
    toggle(c, el.dataset.j); save(); render(true);
  },
  gym(el) { toggle(S.gym, el.dataset.k); save(); render(true); },
  open(el) { const i = +el.dataset.i; ui.open = ui.open === i ? -1 : i; ui.edit = null; render(true); },
  edit(el) { ui.edit = +el.dataset.i; render(true); },
  canceledit() { ui.edit = null; render(true); },
  addmeal() { $('#emeals').insertAdjacentHTML('beforeend', emeal({ n: '', t: '', k: '' })); },
  delmeal(el) { el.closest('.emeal').remove(); },
  saveedit() {
    const who = ui.planWho || S.who, box = $('#editform');
    const meals = [...box.querySelectorAll('.emeal')].map(e => ({
      n: e.querySelector('.en').value.trim(), k: e.querySelector('.ek').value.trim(), t: e.querySelector('.et').value.trim()
    })).filter(m => m.n || m.t);
    editablePlan()[who][ui.edit] = { tag: box.querySelector('.etag').value.trim(), total: box.querySelector('.etot').value.trim(), meals };
    ui.open = ui.edit; ui.edit = null; save(); render(true);
  },
  week(el) { ui.week = Math.min(0, ui.week + +el.dataset.v); render(true); },
  weekset(el) { ui.week = +el.dataset.v; render(); },
  metric(el) { ui.metric = el.dataset.v; render(true); },
  newrec() {
    const rs = recs(), last = rs[rs.length - 1];
    ui.form = { orig: null, values: { date: iso(new Date()), altura: last ? last.altura : null } };
    render(true);
  },
  rec(el) { ui.form = { orig: el.dataset.d, values: clone(S.progress.find(r => r.date === el.dataset.d)) }; render(true); },
  closerec() { ui.form = null; render(true); },
  saverec() {
    const box = $('#recform'), r = { date: box.querySelector('[name=date]').value };
    F.forEach(x => {
      const v = parseFloat(box.querySelector(`[name=${x.k}]`).value.replace(',', '.'));
      r[x.k] = isNaN(v) ? null : v;
    });
    if (!r.date || r.peso == null) { alert('Indica al menos la fecha y el peso.'); return; }
    S.progress = S.progress.filter(p => p.date !== ui.form.orig && p.date !== r.date);
    S.progress.push(r); ui.form = null; save(); render(true);
  },
  delrec() {
    if (!confirm('¿Eliminar este registro?')) return;
    S.progress = S.progress.filter(p => p.date !== ui.form.orig);
    ui.form = null; save(); render(true);
  },
  shop(el) { toggle(S.shopChecked, el.dataset.t); save(); render(true); },
  shopedit() { ui.shopEdit = !ui.shopEdit; render(true); },
  shopreset() {
    if (!confirm('¿Reiniciar la lista? Se desmarca todo y se quitan los productos puntuales.')) return;
    S.shopChecked = {}; S.extras = []; save(); render();
  },
  delextra(el) { delete S.shopChecked[S.extras[+el.dataset.j]]; S.extras.splice(+el.dataset.j, 1); save(); render(true); },
  delitem(el) {
    const items = editableCats()[+el.dataset.c].items;
    delete S.shopChecked[items[+el.dataset.j]]; items.splice(+el.dataset.j, 1); save(); render(true);
  }
};

const submits = {
  addextra(t) { if (!S.extras.includes(t)) S.extras.push(t); },
  additem(t, form) { editableCats()[+form.dataset.c].items.push(t); }
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (el && actions[el.dataset.a]) actions[el.dataset.a](el);
});
document.addEventListener('submit', e => {
  const form = e.target.closest('[data-s]');
  if (!form) return;
  e.preventDefault();
  const t = form.elements.t.value.trim();
  if (!t) return;
  submits[form.dataset.s](t, form); save(); render(true);
});

/* Al volver a abrir la app otro día, HOY pasa solo al día nuevo. */
function newDay() {
  const k = iso(new Date());
  if (k !== ui.day) { ui.day = k; if (!ui.form && ui.edit == null) render(true); }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) newDay(); });
setInterval(newDay, 60000);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

render();
})();
