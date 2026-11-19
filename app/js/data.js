// Trophy data lives in data/trophies.json. This module fetches it once and
// keeps it for the rest of the session; the lookups below are the views' way in.
let trophyDataCache = null;

export async function loadTrophyData() {
  if (!trophyDataCache) {
    const res = await fetch('data/trophies.json');
    trophyDataCache = await res.json();
  }
  return trophyDataCache;
}

export function sourceById(trophyData, sourceId) {
  for (const s of trophyData.sources) {
    if (s.id === sourceId) return s;
  }
  return null;
}

export function trophyById(trophyData, trophyId) {
  for (const t of trophyData.trophies) {
    if (t.id === trophyId) return t;
  }
  return null;
}

export function gradeCounts(trophyData) {
  const counts = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const trophy of trophyData.trophies) {
    counts[trophy.grade] += 1;
  }
  return counts;
}
