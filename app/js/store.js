// Saved progress: the earned-trophy checklist in localStorage, the spoiler
// setting, export to a file, import back, and reset. The twelve seeded
// trophies are the screenshot demo set: story openers, activities and one
// silver, so a fresh screenshot shows a realistic 12 of 55.
export const PROGRESS_KEY = 'gta6-trophy-guide-v1';
export const SPOILER_KEY = 'gta6-trophy-guide-spoiler-v1';
export const COUNTERS_KEY = 'gta6-trophy-guide-counters-v1';
export const DEMO_EARNED_IDS = [2, 3, 8, 15, 16, 17, 18, 19, 21, 33, 35, 52];
export const DEMO_COUNTERS = { 28: 6 };

export function loadEarnedIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
    if (!Array.isArray(stored)) return new Set();
    return new Set(stored);
  } catch {
    return new Set();
  }
}

export function saveEarnedIds(earnedIds) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...earnedIds]));
}

export function loadSpoilerOn() {
  const stored = localStorage.getItem(SPOILER_KEY);
  if (stored === null) return true;
  return stored === '1';
}

export function saveSpoilerOn(spoilerOn) {
  localStorage.setItem(SPOILER_KEY, spoilerOn ? '1' : '0');
}

export function seedDemoProgressIfRequested() {
  const params = new URLSearchParams(location.search);
  if (params.get('seed') !== '1') return false;
  if (localStorage.getItem(PROGRESS_KEY) !== null) return false;
  saveEarnedIds(new Set(DEMO_EARNED_IDS));
  return true;
}

// Counted-trophy trackers (e.g. meditation spots found for Positive Mental
// Attitude). A fresh user starts at 0; the screenshot demo seeds 6 of 18, the
// same demo state the top entries show.
export function loadCounters() {
  try {
    const stored = JSON.parse(localStorage.getItem(COUNTERS_KEY) || '{}');
    if (stored === null || typeof stored !== 'object' || Array.isArray(stored)) return {};
    return stored;
  } catch {
    return {};
  }
}

export function saveCounters(counters) {
  localStorage.setItem(COUNTERS_KEY, JSON.stringify(counters));
}

export function seedDemoCountersIfRequested() {
  const params = new URLSearchParams(location.search);
  if (params.get('seed') !== '1') return false;
  if (localStorage.getItem(COUNTERS_KEY) !== null) return false;
  saveCounters(DEMO_COUNTERS);
  return true;
}

export function exportProgressFile(earnedIds, spoilerOn, counters) {
  const payload = {
    game: 'Grand Theft Auto VI',
    exportedAt: new Date().toISOString(),
    spoilerOn,
    earned: [...earnedIds].sort((a, b) => a - b),
    counters: counters || {},
  };
  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: 'application/json' },
  );
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'gta6-trophy-progress.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

export async function importProgressFile(file, trophyData) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const rawList = Array.isArray(parsed) ? parsed : parsed.earned;
  if (!Array.isArray(rawList)) throw new Error('Not a progress file');
  const validIds = new Set(trophyData.trophies.map((trophy) => trophy.id));
  const earnedIds = new Set(rawList.filter((id) => validIds.has(id)));
  saveEarnedIds(earnedIds);
  if (typeof parsed.spoilerOn === 'boolean') {
    saveSpoilerOn(parsed.spoilerOn);
  }
  if (parsed.counters && typeof parsed.counters === 'object' && !Array.isArray(parsed.counters)) {
    const clean = {};
    for (const [key, value] of Object.entries(parsed.counters)) {
      const id = Number(key);
      if (validIds.has(id) && Number.isInteger(value) && value >= 0) clean[id] = value;
    }
    saveCounters(clean);
  }
  return earnedIds;
}
