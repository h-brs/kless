'use strict';

// JavaScript setzt nur die CSS-Werte. Die Breiten berechnet die Flexbox-Engine
// des Browsers; getBoundingClientRect() liest anschließend das echte Ergebnis.
const letters = ['A', 'B', 'C'];
const elements = letters.map(letter => document.getElementById(`item-${letter}`));
const state = { width: 750, items: letters.map(() => ({ grow: 1, shrink: 1, basis: 150 })) };
const byId = id => document.getElementById(id);
const numberFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
const fmt = n => numberFormat.format(Math.abs(n) < 0.05 ? 0 : n);
const px = n => `${fmt(n)} px`;
const signed = n => (n > 0.05 ? '+' : '') + px(n);
const sum = values => values.reduce((total, value) => total + value, 0);
let announcementTimer;

// Jeder Eintrag: [grow, shrink, basis in px], in der Reihenfolge A, B, C.
const presets = {
  equal: { width: 750, items: [[1, 1, 150], [1, 1, 150], [1, 1, 150]], note: 'Starte mit gleichen Werten. Jedes Element erhält denselben Anteil am zusätzlichen Platz.' },
  'grow-b': { width: 750, items: [[1, 1, 150], [2, 1, 150], [1, 1, 150]], note: 'B bekommt doppelt so viel Zuwachs wie A. Vergleiche die Endbreiten: 225, 300 und 225 px.' },
  shrink: { width: 360, items: [[1, 1, 150], [1, 1, 150], [1, 1, 150]], note: 'Die Basisbreiten brauchen 450 px, der Container bietet 360 px. Jedes Element gibt 30 px ab.' },
  'shrink-b': { width: 360, items: [[1, 1, 150], [1, 2, 150], [1, 1, 150]], note: 'Bei gleicher Basis bedeutet shrink: 2 für B den doppelten Verlust: 45 px statt 22,5 px.' },
  weighted: { width: 350, items: [[1, 1, 100], [1, 1, 200], [1, 1, 400]], note: 'Alle haben shrink: 1. Wegen der unterschiedlichen Basisbreiten verlieren sie trotzdem unterschiedlich viele Pixel.' },
  overflow: { width: 360, items: [[1, 0, 150], [1, 0, 150], [1, 0, 150]], note: 'Mit shrink: 0 bleiben alle bei 150 px. Zusammen ragen sie 90 px über das Containerende hinaus.' },
  zero: { width: 750, items: [[1, 1, 0], [2, 1, 0], [1, 1, 0]], note: 'Die Basis ist überall 0. Jetzt entsprechen die Endbreiten dem grow-Verhältnis 1 : 2 : 1.' },
  partial: { width: 750, items: [[0.2, 1, 150], [0.2, 1, 150], [0.2, 1, 150]], note: 'Die grow-Summe beträgt nur 0,6. Es werden 60 % des zusätzlichen Platzes verteilt: 120 px bleiben frei.' }
};

function syncInputs() {
  document.querySelectorAll('input[data-prop]').forEach(input => {
    const item = state.items[letters.indexOf(input.dataset.item)];
    input.value = input.dataset.prop === 'container' ? state.width : item[input.dataset.prop];
    input.removeAttribute('aria-invalid');
  });
}

function usePreset(name) {
  const preset = presets[name];
  state.width = preset.width;
  state.items = preset.items.map(([grow, shrink, basis]) => ({ grow, shrink, basis }));
  byId('preset').value = name;
  byId('preset-note').textContent = preset.note;
  byId('stage-scroll').scrollLeft = 0;
  syncInputs();
  render();
}

function markCustom() {
  byId('preset').value = 'custom';
  byId('preset-note').textContent = 'Eigene Werte: Verändere zum Vergleich möglichst nur einen Wert auf einmal.';
}

function setInput(input, finish) {
  // Eine vorübergehend leere oder ungültige Zahl verändert das Beispiel nicht.
  const prop = input.dataset.prop;
  const item = state.items[letters.indexOf(input.dataset.item)];
  const previous = prop === 'container' ? state.width : item[prop];
  let value = input.valueAsNumber;
  const min = Number(input.min), max = Number(input.max);
  if (!Number.isFinite(value) || value < min || value > max) {
    if (!finish) { input.setAttribute('aria-invalid', 'true'); return; }
    value = Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : previous;
  }
  const precision = prop === 'grow' || prop === 'shrink' ? 10 : 1;
  value = Math.round(value * precision) / precision;
  if (prop === 'container') state.width = value;
  else item[prop] = value;
  input.removeAttribute('aria-invalid');
  // Den fokussierten Zahlenwert erst beim Abschließen normalisieren.
  document.querySelectorAll('input[data-prop]').forEach(other => {
    if (other.dataset.prop === prop && other.dataset.item === input.dataset.item && (other !== input || finish)) other.value = value;
  });
  markCustom();
  render();
}

function render() {
  const basisSum = sum(state.items.map(item => item.basis));
  const free = state.width - basisSum;
  const mode = free > 0 ? 'grow' : free < 0 ? 'shrink' : 'equal';
  byId('stage').style.setProperty('--container-width', `${state.width}px`);
  byId('container-label').textContent = px(state.width);

  state.items.forEach((item, i) => {
    const letter = letters[i];
    const declaration = `${item.grow} ${item.shrink} ${item.basis}px`;
    elements[i].style.flex = declaration;
    byId(`basis-${letter}`).style.flexBasis = `${item.basis}px`;
    byId(`basis-${letter}`).firstElementChild.textContent = `${letter} · ${px(item.basis)}`;
    byId(`code-${letter}`).textContent = `flex: ${declaration};`;
  });

  // Das Messen erzwingt nach den CSS-Änderungen eine aktuelle Layoutberechnung.
  const widths = elements.map(element => element.getBoundingClientRect().width);
  const remaining = state.width - sum(widths);
  byId('stage').style.width = `${Math.max(state.width, basisSum, sum(widths)) + 3}px`;
  state.items.forEach((item, i) => {
    const letter = letters[i];
    byId(`width-${letter}`).textContent = px(widths[i]);
    byId(`basis-value-${letter}`).textContent = px(item.basis);
    byId(`weight-${letter}`).textContent = mode === 'grow' ? fmt(item.grow) : mode === 'shrink' ? `${fmt(item.shrink)} × ${fmt(item.basis)} = ${fmt(item.shrink * item.basis)}` : '–';
    byId(`change-${letter}`).textContent = signed(widths[i] - item.basis);
    byId(`result-${letter}`).textContent = px(widths[i]);
  });
  byId('weight-heading').textContent = mode === 'shrink' ? 'shrink × basis' : mode === 'grow' ? 'grow' : 'Gewicht';
  byId('mode').textContent = mode === 'grow' ? 'Wachsen' : mode === 'shrink' ? 'Schrumpfen' : 'Passt genau';
  byId('mode').dataset.mode = mode;
  byId('calculation').textContent = `${px(state.width)} − ${px(basisSum)} = ${px(free)} ${mode === 'grow' ? 'zusätzlicher Platz' : mode === 'shrink' ? '(Platzmangel)' : '(kein Unterschied)'}`;
  byId('remainder').textContent = remaining > 0.1 ? `${px(remaining)} bleiben frei.` : remaining < -0.1 ? `${px(-remaining)} Überlauf.` : 'Der Container ist ausgefüllt.';
  byId('remainder').dataset.overflow = remaining < -0.1;

  let title, reason;
  const notes = [];
  const growSum = sum(state.items.map(item => item.grow));
  const shrinkSum = sum(state.items.map(item => item.shrink));
  const shrinkWeight = sum(state.items.map(item => item.shrink * item.basis));
  if (mode === 'grow') {
    title = 'Zusätzlichen Platz verteilen';
    reason = `Die Basisbreiten belegen ${px(basisSum)}. Für die übrigen ${px(free)} gelten die grow-Gewichte ${state.items.map(item => fmt(item.grow)).join(' : ')}. Die Basis kommt zum Zuwachs hinzu; grow beschreibt nicht direkt die Endbreite.`;
    if (growSum === 0) notes.push('Alle grow-Werte sind 0. Deshalb wird der zusätzliche Platz nicht verteilt.');
    else if (growSum < 1) notes.push(`Die grow-Summe ist ${fmt(growSum)} und damit kleiner als 1. Hier werden nur ${fmt(growSum * 100)} % des zusätzlichen Platzes verteilt.`);
  } else if (mode === 'shrink') {
    title = 'Fehlenden Platz durch Schrumpfen ausgleichen';
    reason = `Die Basisbreiten sind zusammen ${px(-free)} zu breit. Für die Verteilung des Verlusts zählt jeweils shrink × basis. Ein größeres Produkt bedeutet zunächst einen größeren Anteil am Verlust; shrink: 0 schützt das Element vor dem Schrumpfen.`;
    if (shrinkWeight === 0) notes.push('Kein Element mit positiver Basis kann schrumpfen. Deshalb bleibt Überlauf.');
    else if (shrinkSum < 1) notes.push(`Die shrink-Summe ist ${fmt(shrinkSum)} und damit kleiner als 1. Nur ein Teil des fehlenden Platzes wird ausgeglichen; Überlauf bleibt möglich.`);
    if (widths.some((width, i) => width < 0.1 && state.items[i].basis > 0)) notes.push('Mindestens ein Element erreicht 0 px. Eine Breite wird nicht negativ: Der Browser begrenzt sie und verteilt den restlichen Verlust erneut auf noch schrumpfbare Elemente.');
  } else {
    title = 'Die Basisbreiten passen bereits';
    reason = `Die drei Basisbreiten ergeben genau ${px(state.width)}. Es gibt weder zusätzlichen noch fehlenden Platz. grow und shrink verändern die Breiten hier nicht.`;
  }
  byId('reason-title').textContent = title;
  byId('reason').textContent = reason;
  byId('special-note').hidden = notes.length === 0;
  byId('special-note').textContent = notes.join(' ');
  byId('css-code').textContent = `.container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  width: ${state.width}px;\n  gap: 0;\n}\n\n.container > * {\n  min-width: 0;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n` + state.items.map((item, i) => `.${letters[i].toLowerCase()} { flex: ${item.grow} ${item.shrink} ${item.basis}px; }`).join('\n');
  clearTimeout(announcementTimer);
  announcementTimer = setTimeout(() => {
    byId('announcement').textContent = `Ergebnis: ${letters.map((letter, i) => `${letter}: ${px(widths[i])}`).join(', ')}. ${byId('remainder').textContent}`;
  }, 250);
}

byId('controls').addEventListener('submit', event => event.preventDefault());
byId('controls').addEventListener('input', event => {
  if (event.target.matches('input[data-prop]')) setInput(event.target, false);
});
byId('controls').addEventListener('change', event => {
  if (event.target.matches('input[data-prop]')) setInput(event.target, true);
});
byId('preset').addEventListener('change', event => usePreset(event.target.value));
byId('reset').addEventListener('click', () => usePreset('equal'));
byId('fit').addEventListener('click', () => {
  state.width = Math.max(160, Math.min(1100, byId('stage-scroll').clientWidth - 12));
  markCustom(); syncInputs(); render(); byId('stage-scroll').scrollLeft = 0;
});
usePreset('equal');
