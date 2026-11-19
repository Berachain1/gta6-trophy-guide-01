// Filtering and the spoiler rule. A hidden story trophy stays nameless while
// spoiler mode is on and it is not yet earned; collectibles and activities are
// never redacted, since their names give nothing away.
export const KIND_CHIPS = [
  'all',
  'story',
  'missable',
  'collectibles',
  'activities',
  'online',
];

export function spoilerHides(trophy, earnedIds, spoilerOn) {
  return spoilerOn
    && trophy.hidden
    && trophy.kind === 'story'
    && !earnedIds.has(trophy.id);
}

export function applyTrophyFilters(trophies, state) {
  let shown = [...trophies];
  if (state.kind === 'story') {
    shown = shown.filter((t) => t.kind === 'story');
  } else if (state.kind === 'missable') {
    shown = shown.filter((t) => t.missable || t.timeSensitive);
  } else if (state.kind === 'collectibles') {
    shown = shown.filter((t) => t.kind === 'collectibles');
  } else if (state.kind === 'activities') {
    shown = shown.filter((t) => t.kind === 'activities');
  } else if (state.kind === 'online') {
    shown = [];
  }
  if (state.grade !== 'all') {
    shown = shown.filter((t) => t.grade === state.grade);
  }
  if (state.status === 'earned') {
    shown = shown.filter((t) => state.earned.has(t.id));
  } else if (state.status === 'todo') {
    shown = shown.filter((t) => !state.earned.has(t.id));
  }
  if (state.search.trim()) {
    const needle = state.search.trim().toLowerCase();
    shown = shown.filter((t) =>
      (t.name + ' ' + t.description + ' ' + t.kind).toLowerCase().includes(needle));
  }
  if (state.sort === 'grade') {
    const order = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
    shown.sort((a, b) => order[a.grade] - order[b.grade] || a.id - b.id);
  } else if (state.sort === 'roadmap') {
    shown.sort((a, b) => a.stage - b.stage || a.id - b.id);
  } else if (state.sort === 'name') {
    shown.sort((a, b) => a.name.localeCompare(b.name));
  }
  return shown;
}

export function countByKind(trophies, kind) {
  if (kind === 'missable') {
    return trophies.filter((t) => t.missable || t.timeSensitive).length;
  }
  if (kind === 'online') return 0;
  if (kind === 'all') return trophies.length;
  return trophies.filter((t) => t.kind === kind).length;
}

// The missable chip deliberately spells out its two members instead of a bare
// number: exactly one trophy is missable and exactly one other is time-sensitive,
// and a bare "Missable 2" reads as two missables.
export function missableChipLabel(trophies) {
  const missable = trophies.filter((t) => t.missable).length;
  const timed = trophies.filter((t) => t.timeSensitive).length;
  return 'Missable ' + missable + ' + time-sensitive ' + timed;
}
