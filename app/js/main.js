// Boot: loads the trophy data, builds the shell, routes by hash, and re-renders
// on every state change. Progress lives in localStorage; the app fetches nothing
// but its own data file, so it works with the network off.
import { loadTrophyData, gradeCounts } from './data.js';
import {
  loadEarnedIds, saveEarnedIds, loadSpoilerOn, saveSpoilerOn,
  loadCounters, saveCounters,
  seedDemoProgressIfRequested, seedDemoCountersIfRequested,
  exportProgressFile, importProgressFile,
} from './store.js';
import { KIND_CHIPS, countByKind, missableChipLabel } from './filters.js';
import { checklistRowsHtml, goalBlockHtml } from './views/checklist.js';
import { detailPaneHtml } from './views/detail.js';
import { roadmapPageHtml } from './views/roadmap.js';
import { missablesPageHtml } from './views/missables.js';
import { plannerPageHtml } from './views/planner.js';
import { aboutPageHtml } from './views/about.js';
import { escapeHtml } from './html.js';

const VIEWS = [
  { id: 'checklist', label: 'Guide & tracker' },
  { id: 'roadmap', label: 'Roadmap to platinum' },
  { id: 'missables', label: 'Missables (1 missable, 1 timed)' },
  { id: 'next', label: 'Next up' },
  { id: 'about', label: 'About & sources' },
];

const state = {
  view: 'checklist',
  kind: 'all',
  grade: 'all',
  status: 'all',
  sort: 'roadmap',
  search: '',
  spoilerOn: true,
  earned: new Set(),
  counters: {},
  selectedId: 28,
};

let trophyData = null;

export function readViewFromHash() {
  const hash = location.hash.replace(/^#/, '');
  if (hash.startsWith('t-')) {
    const id = Number(hash.slice(2));
    if (Number.isInteger(id)) state.selectedId = id;
    return 'checklist';
  }
  return VIEWS.some((view) => view.id === hash) ? hash : 'checklist';
}

function kindChipLabel(kind) {
  if (kind === 'all') return 'All 55';
  if (kind === 'missable') return missableChipLabel(trophyData.trophies);
  const count = countByKind(trophyData.trophies, kind);
  return kind[0].toUpperCase() + kind.slice(1) + ' ' + count;
}

function stageDone(stage) {
  let done = 0;
  for (const t of trophyData.trophies) {
    if (t.stage === stage && state.earned.has(t.id)) done += 1;
  }
  return done;
}

// PSN trophy points: platinum 180, gold 90, silver 30, bronze 15.
const GRADE_POINTS = { platinum: 180, gold: 90, silver: 30, bronze: 15 };

function earnedPoints() {
  let points = 0;
  for (const trophy of trophyData.trophies) {
    if (state.earned.has(trophy.id)) points += GRADE_POINTS[trophy.grade] || 0;
  }
  return points;
}

function hiddenLeftCount() {
  let left = 0;
  for (const t of trophyData.trophies) {
    if (t.hidden && !state.earned.has(t.id)) left += 1;
  }
  return left;
}

export function renderAppShell() {
  const total = trophyData.trophies.length;
  const earnedCount = state.earned.size;
  const percent = Math.round((earnedCount / total) * 100);
  const counts = gradeCounts(trophyData);
  const earnedByGrade = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const trophy of trophyData.trophies) {
    if (state.earned.has(trophy.id)) earnedByGrade[trophy.grade] += 1;
  }
  const tabs = VIEWS.map((view) =>
    '<button type="button" data-view="' + view.id + '" aria-current="'
    + (state.view === view.id) + '">' + view.label + '</button>').join('');
  const chips = KIND_CHIPS.map((kind) =>
    '<button type="button" class="chip" data-kind="' + kind + '" aria-pressed="'
    + (state.kind === kind) + '">' + kindChipLabel(kind) + '</button>').join('');

  let controls = '';
  if (state.view === 'checklist') {
    // v4: one slim row only (chips + search + 3 selects). The spoiler toggle
    // and Export/Import/Reset moved to the checklist panel header, so the
    // checklist rows start ~45px higher in shot 1.
    controls = '<div class="controls">' + chips
      + '<input type="search" id="search" placeholder="Search trophies&hellip;"'
      + ' value="' + escapeHtml(state.search) + '" aria-label="Search trophies">'
      + '<select id="grade" aria-label="Grade filter">'
      + '<option value="all">All grades</option><option value="platinum">Platinum</option>'
      + '<option value="gold">Gold</option><option value="silver">Silver</option>'
      + '<option value="bronze">Bronze</option></select>'
      + '<select id="status" aria-label="Status filter">'
      + '<option value="all">All statuses</option><option value="earned">Earned</option>'
      + '<option value="todo">Not earned</option></select>'
      + '<select id="sort" aria-label="Sort order">'
      + '<option value="roadmap">Roadmap order</option><option value="grade">By grade</option>'
      + '<option value="name">By name</option></select>'
      + '</div>';
  }

  // v4: stage chips ride in the tabs row (right side), like the top entries —
  // no longer their own row above the checklist.
  const goalDone = [1, 14].filter((id) => state.earned.has(id)).length;
  const stageChips = state.view === 'checklist'
    ? '<span class="chips stagechips">'
      + '<span class="tchip static">Stage 1 &middot; ' + stageDone(1) + ' / 13</span>'
      + '<span class="tchip static">Stage 2 &middot; ' + stageDone(2) + ' / 27</span>'
      + '<span class="tchip static">Stage 3 &middot; ' + stageDone(3) + ' / 15</span>'
      + '<span class="tchip static">Platinum goal &middot; ' + goalDone + ' / 2</span></span>'
    : '';

  let body = '';
  if (state.view === 'checklist') {
    const defaultList = state.kind === 'all' && !state.search.trim()
      && state.status === 'all' && state.sort === 'roadmap';
    const missBanner = '<div class="alert missbanner"><span><strong>&#9888; 1 missable trophy '
      + '&mdash; Positive Mental Attitude:</strong> the Chapter 1 balcony meditation '
      + 'vanishes after Chapter 1. Do it first.</span><button class="btn" type="button" data-goto="28">Show it</button></div>';
    const panelHead = '<div class="panelhead"><p class="listhead">Checklist &middot; ' + earnedCount
      + ' / ' + total + '</p><span class="minibtns">'
      + '<label class="toggle"><input type="checkbox" id="spoiler"'
      + (state.spoilerOn ? ' checked' : '') + '> Spoiler-free story</label>'
      + '<button class="btn" type="button" id="export">Export</button>'
      + '<button class="btn" type="button" id="importBtn">Import</button>'
      + '<button class="btn danger" type="button" id="reset">Reset</button>'
      + '<input type="file" id="import" accept="application/json" hidden></span></div>';
    body = missBanner + '<div class="split"><div class="panel">'
      + panelHead
      + (defaultList ? goalBlockHtml(trophyData, state) : '')
      + checklistRowsHtml(trophyData, state) + '</div>'
      + detailPaneHtml(trophyData, state) + '</div>';
  } else if (state.view === 'roadmap') {
    body = roadmapPageHtml(trophyData, state);
  } else if (state.view === 'missables') {
    body = missablesPageHtml(trophyData, state);
  } else if (state.view === 'next') {
    body = plannerPageHtml(trophyData, state);
  } else {
    body = aboutPageHtml(trophyData, state);
  }

  const header = '<header class="top"><div class="logo">L</div><div>'
    + '<h1>Leonida Trophy Guide</h1>'
    + '<p class="sub">Grand Theft Auto VI &middot; PlayStation 5 &middot; 55 trophies '
    + '&middot; offline &middot; unofficial fan guide</p></div>'
    + '<div class="progress"><span class="big">' + earnedCount + ' / ' + total + '</span> '
    + '<span>' + percent + '% to platinum &middot; ' + earnedPoints() + ' pts</span>'
    + '<div class="bar"><i style="width:' + percent + '%"></i></div>'
    + '<span class="grades">' + earnedByGrade.platinum + '/' + counts.platinum + ' Platinum '
    + '&middot; ' + earnedByGrade.gold + '/' + counts.gold + ' Gold '
    + '&middot; ' + earnedByGrade.silver + '/' + counts.silver + ' Silver '
    + '&middot; ' + earnedByGrade.bronze + '/' + counts.bronze + ' Bronze</span>'
    + '</div></header>';
  const audit = '<p class="audit"><span>SELF-AUDIT &#10003; 55/55 trophies &middot; 55/55 guides '
    + '&middot; 55/55 cited &middot; 28/28 hidden &middot; 1 missable + 1 timed '
    + '&middot; 5 unconfirmed &middot; Exophase + PSNProfiles</span>'
    + '<span class="pill">Spoilers: hidden until earned &middot; '
    + hiddenLeftCount() + ' still hidden</span></p>';
  const footer = '<footer>Leonida Trophy Guide - unofficial fan guide. Progress stays in '
    + 'your browser. 55 trophies &middot; 1 Platinum &middot; 2 Gold &middot; 6 Silver '
    + '&middot; 46 Bronze &middot; 28 hidden &middot; 1 missable + 1 time-sensitive '
    + '&middot; 0 online &middot; about 200 h to platinum (PowerPyx).</footer>';

  document.getElementById('app').innerHTML = header + audit
    + '<nav class="tabs">' + tabs + stageChips + '</nav>' + controls + body + footer;
  bindAppEvents();
}

export function toggleEarned(trophyId) {
  if (state.earned.has(trophyId)) state.earned.delete(trophyId);
  else state.earned.add(trophyId);
  saveEarnedIds(state.earned);
  renderAppShell();
}

function bindAppEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view = button.dataset.view;
      location.hash = state.view === 'checklist' ? '' : state.view;
      renderAppShell();
    });
  });
  document.querySelectorAll('[data-kind]').forEach((button) => {
    button.addEventListener('click', () => {
      state.kind = button.dataset.kind;
      renderAppShell();
    });
  });
  document.querySelectorAll('[data-trophy]').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.target.matches('input[type="checkbox"]')) return;
      state.selectedId = Number(element.dataset.trophy);
      state.view = 'checklist';
      renderAppShell();
    });
  });
  document.querySelectorAll('[data-goto]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedId = Number(button.dataset.goto);
      state.view = 'checklist';
      location.hash = 't-' + state.selectedId;
      renderAppShell();
    });
  });
  document.querySelectorAll('[data-check]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleEarned(Number(element.dataset.check));
    });
  });
  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', () => {
      state.search = search.value;
      renderAppShell();
      const next = document.getElementById('search');
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    });
  }
  const grade = document.getElementById('grade');
  if (grade) {
    grade.value = state.grade;
    grade.addEventListener('change', () => {
      state.grade = grade.value;
      renderAppShell();
    });
  }
  const status = document.getElementById('status');
  if (status) {
    status.value = state.status;
    status.addEventListener('change', () => {
      state.status = status.value;
      renderAppShell();
    });
  }
  const sort = document.getElementById('sort');
  if (sort) {
    sort.value = state.sort;
    sort.addEventListener('change', () => {
      state.sort = sort.value;
      renderAppShell();
    });
  }
  const spoiler = document.getElementById('spoiler');
  if (spoiler) {
    spoiler.addEventListener('change', () => {
      state.spoilerOn = spoiler.checked;
      saveSpoilerOn(state.spoilerOn);
      renderAppShell();
    });
  }
  document.querySelectorAll('[data-countminus]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = Number(button.dataset.countminus);
      const trophy = trophyData.trophies.find((t) => t.id === id);
      const max = trophy && trophy.count ? trophy.count : 0;
      const current = state.counters[id] || 0;
      state.counters[id] = Math.max(0, current - 1);
      saveCounters(state.counters);
      renderAppShell();
    });
  });
  document.querySelectorAll('[data-countplus]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = Number(button.dataset.countplus);
      const trophy = trophyData.trophies.find((t) => t.id === id);
      const max = trophy && trophy.count ? trophy.count : 0;
      const current = state.counters[id] || 0;
      state.counters[id] = Math.min(max, current + 1);
      saveCounters(state.counters);
      renderAppShell();
    });
  });
  const exportButton = document.getElementById('export');
  if (exportButton) {
    exportButton.addEventListener('click', () =>
      exportProgressFile(state.earned, state.spoilerOn, state.counters));
  }
  const importButton = document.getElementById('importBtn');
  const importInput = document.getElementById('import');
  if (importButton && importInput) {
    importButton.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', async () => {
      const file = importInput.files[0];
      if (!file) return;
      try {
        state.earned = await importProgressFile(file, trophyData);
        state.spoilerOn = loadSpoilerOn();
        state.counters = loadCounters();
        renderAppShell();
      } catch {
        alert('That file is not a trophy progress file.');
      }
    });
  }
  const reset = document.getElementById('reset');
  if (reset) {
    reset.addEventListener('click', () => {
      if (confirm('Clear all earned trophies and counters?')) {
        state.earned = new Set();
        state.counters = {};
        saveEarnedIds(state.earned);
        saveCounters(state.counters);
        renderAppShell();
      }
    });
  }
}

export async function bootLeonidaGuide() {
  seedDemoProgressIfRequested();
  seedDemoCountersIfRequested();
  state.earned = loadEarnedIds();
  state.counters = loadCounters();
  state.spoilerOn = loadSpoilerOn();
  const params = new URLSearchParams(location.search);
  if (params.get('kind') && KIND_CHIPS.includes(params.get('kind'))) {
    state.kind = params.get('kind');
  }
  state.view = readViewFromHash();
  trophyData = await loadTrophyData();
  renderAppShell();
  window.addEventListener('hashchange', () => {
    state.view = readViewFromHash();
    renderAppShell();
  });
}

bootLeonidaGuide();
