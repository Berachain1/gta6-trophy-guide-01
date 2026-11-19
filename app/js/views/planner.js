// Next-up planner: the next 8 trophies in roadmap order, as compact rows.
// The missable one always jumps the queue while Chapter 1 is still open.
// Each row carries its key step and its sources, so the planner itself is
// cited - not just a list of names.
import { escapeHtml, gradeBadge } from '../html.js';

function firstSentence(text) {
  const cut = text.indexOf('. ');
  const first = cut === -1 ? text : text.slice(0, cut + 1);
  return first.length > 110 ? first.slice(0, 107).trimEnd() + '\u2026' : first;
}

export function plannerPageHtml(trophyData, state) {
  const todo = trophyData.trophies.filter((t) => !state.earned.has(t.id));
  const ordered = [...todo].sort((a, b) => {
    const aMiss = a.missable ? 0 : 1;
    const bMiss = b.missable ? 0 : 1;
    if (aMiss !== bMiss) return aMiss - bMiss;
    return a.stage - b.stage || a.id - b.id;
  });
  const next = ordered.slice(0, 8);
  const cards = next.map((t, index) => {
    const top = index === 0;
    const flags = gradeBadge(t.grade)
      + (t.missable ? ' <span class="badge b-miss">MISSABLE</span>' : '')
      + (t.timeSensitive ? ' <span class="badge b-time">TIME-SENSITIVE</span>' : '')
      + (t.unconfirmed ? ' <span class="badge b-unconf">UNCONFIRMED</span>' : '');
    const context = t.missable
      ? 'MISSABLE - do it in Chapter 1'
        + (t.id === 28 ? ' &middot; ' + (state.counters[28] || 0) + '/18 spots' : '')
      : 'Stage ' + t.stage + ' &middot; ' + escapeHtml(t.time);
    const sources = t.sources.map((s) => '[' + s + ']').join(' ');
    return '<article class="plan' + (top ? ' next' : '') + '">'
      + '<span class="pnum">' + (index + 1) + '</span>'
      + '<div class="pbody"><h2>' + (top ? '&#9733; Do next: ' : '')
      + escapeHtml(t.name) + '</h2>'
      + '<p>' + flags + '<span class="pctx">' + context + '</span></p>'
      + '<p>' + escapeHtml(firstSentence(t.guide)) + '</p>'
      + '<p class="psrc">Sources ' + sources + ' &middot; retrieved 19 Nov 2026 '
      + '<button class="btn" type="button" data-goto="' + t.id + '">Open its guide</button></p>'
      + '</div></article>';
  }).join('');
  return '<div class="panel"><h2>Next up - the planner</h2>'
    + '<p>The next 8 trophies in roadmap order, from the ' + todo.length
    + ' you still need. The top card is the single best thing to do next; the '
    + 'missable one always jumps the queue while Chapter 1 is still open.</p></div>'
    + cards;
}
