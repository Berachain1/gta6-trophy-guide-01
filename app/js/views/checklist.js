// Checklist view: the filterable trophy list, left pane.
import { applyTrophyFilters, spoilerHides } from '../filters.js';
import { escapeHtml, gradeBadge } from '../html.js';

// The platinum goal, shown at the top of the default checklist: the two
// trophies the whole guide is for, so the platinum is visible in shot 1.
export function goalBlockHtml(trophyData, state) {
  const goals = [1, 14]
    .map((id) => trophyData.trophies.find((t) => t.id === id))
    .filter(Boolean);
  const done = goals.filter((t) => state.earned.has(t.id)).length;
  const items = goals.map((trophy) => {
    const checked = state.earned.has(trophy.id) ? ' checked' : '';
    const selected = state.selectedId === trophy.id ? ' class="sel"' : '';
    const srcs = trophy.sources.map((s) => '[' + s + ']').join(' ');
    return '<li' + selected + ' data-trophy="' + trophy.id + '">'
      + '<input type="checkbox" data-check="' + trophy.id + '"' + checked
      + ' aria-label="Mark ' + escapeHtml(trophy.name) + ' earned">'
      + '<span><span class="rowname">' + escapeHtml(trophy.name) + '</span> '
      + gradeBadge(trophy.grade)
      + '<br><span class="rowdesc">' + escapeHtml(trophy.description)
      + ' <span class="rowsrc">' + srcs + '</span></span></span></li>';
  }).join('');
  return '<p class="goalhead">Goal &middot; 100% and the platinum &mdash; '
    + done + ' / 2 earned</p><ul class="rows goal goalgrid">' + items + '</ul>';
}

// The stage group labels for the checklist headers (v5: top entries group
// rows under "1 · CHAPTER 1" / "STAGE 1" headers with earned counts).
const STAGE_LABELS = { 1: 'Play the story', 2: 'The 100% checklist', 3: 'Side quests and cleanup' };

export function checklistRowsHtml(trophyData, state) {
  const shown = applyTrophyFilters(trophyData.trophies, state);
  if (shown.length === 0) {
    let note = 'No trophies match these filters. Clear the search or pick another filter.';
    if (state.kind === 'online') {
      note = '0 trophies - this game has no online trophies. Every one of the 55 is '
        + 'single-player, and the platinum needs no online play at all.';
    }
    return '<p class="empty">' + note + '</p>';
  }
  // v5: a stage group header each time the stage changes — but only in
  // roadmap sort, where the list is actually grouped by stage.
  let lastStage = null;
  const items = shown.map((trophy) => {
    let head = '';
    if (state.sort === 'roadmap' && trophy.stage !== lastStage) {
      lastStage = trophy.stage;
      const inStage = trophyData.trophies.filter((t) => t.stage === trophy.stage);
      const done = inStage.filter((t) => state.earned.has(t.id)).length;
      head = '<li class="grouphead"><span>Stage ' + trophy.stage + ' &middot; '
        + STAGE_LABELS[trophy.stage] + '</span><span>' + done + ' / ' + inStage.length
        + ' earned</span></li>';
    }
    const hidden = spoilerHides(trophy, state.earned, state.spoilerOn);
    const name = hidden
      ? 'Hidden story trophy - earn it to reveal its name'
      : trophy.name;
    const desc = hidden
      ? 'Its name and description stay hidden until you earn it.'
      : trophy.description;
    const checked = state.earned.has(trophy.id) ? ' checked' : '';
    const selected = state.selectedId === trophy.id ? ' class="sel"' : '';
    const badges = [gradeBadge(trophy.grade)];
    if (trophy.missable) badges.push('<span class="badge b-miss">MISSABLE</span>');
    if (trophy.timeSensitive) badges.push('<span class="badge b-time">TIME-SENSITIVE</span>');
    if (trophy.unconfirmed) badges.push('<span class="badge b-unconf">UNCONFIRMED</span>');
    const sources = trophy.sources.map((s) => '[' + s + ']').join(' ');
    // The meditation counter is live: the top entries show 6/18 spots in the
    // row itself, not just in the detail pane.
    const counter = trophy.id === 28
      ? ' &middot; ' + (state.counters[28] || 0) + '/18 spots'
      : '';
    const meta = escapeHtml(desc) + ' - ' + escapeHtml(trophy.kind)
      + ' - Stage ' + trophy.stage + counter
      + ' <span class="rowsrc">' + sources + '</span>';
    return head + '<li' + selected + ' data-trophy="' + trophy.id + '">'
      + '<input type="checkbox" data-check="' + trophy.id + '"' + checked
      + ' aria-label="Mark ' + escapeHtml(name) + ' earned">'
      + '<span><span class="rowname">' + escapeHtml(name) + '</span> '
      + badges.join(' ')
      + '<br><span class="rowdesc">' + meta + '</span></span></li>';
  });
  return '<ul class="rows">' + items.join('') + '</ul>';
}
