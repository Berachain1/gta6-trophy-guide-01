// Roadmap view: three stages to the platinum as tables — Trophy | Grade |
// Missable? | Key requirement | Source — plus the real-numbers 100% panel,
// the chapter-number note and a missable callout. Every number here is cited
// in the trophy guides themselves.
import { escapeHtml, gradeBadge } from '../html.js';

const STAGES = [
  {
    stage: 1,
    title: 'Stage 1 - Play the story (Chapters 1-5)',
    hours: '60-80 hours',
    total: 13,
    text: 'Finish all five chapters and take optional missions as they appear. All 12 '
      + 'story trophies pop as you play and none can be missed - but one meditation '
      + 'can be. Scan vehicles with the WAiNK app and study animals through '
      + 'binoculars as you go; both feed the 100% checklist later.',
  },
  {
    stage: 2,
    title: 'Stage 2 - The 100% checklist (free roam after the story)',
    hours: 'about 100 hours',
    total: 27,
    text: 'After the credits, work the in-game 100% checklist (Progress, Stats, 100% '
      + 'Completion). This is the long grind and it holds the gold trophy A Long Road '
      + '- the hardest trophy in the game. The real numbers are in the panel below.',
  },
  {
    stage: 3,
    title: 'Stage 3 - Side quests and cleanup',
    hours: 'about 10 hours',
    total: 15,
    text: 'Finish the character questlines and the stranger strands, then sweep up the '
      + 'remaining one-off trophies. The platinum pops when the 54th trophy is earned.',
  },
];

const CHECKLIST_NUMBERS = [
  ['Optional missions', '100', '200-300+ exist'],
  ['Vehicles scanned with WAiNK', '200 of 277', 'base models'],
  ['Animals studied through binoculars', '100 of 255', '-'],
  ['Challenges completed', '70 of 80', '50 for One Last Thing'],
  ['Stunts', '300', '250 for Cunning Stunts'],
  ['Shooting Range gold medals', '42 - all of them', 'The Shootist'],
  ['Target Decks for Bret&rsquo;s hunts', '15 - all of them', 'Fair Game'],
  ['Large bank vaults robbed', '8 - all of them', '5 for Maximum Withdrawal'],
  ['Illegal gang operations', '39 - all of them', '9 gangs for Pest Control'],
  ['Collectible card sets', '3 completed', 'Don&rsquo;t Touch My Deck'],
  ['WAiNK scans at landmarks and curiosities', '100', 'You WAiNKer!'],
  ['Meditation spots', '15 of 18', 'all 18 for Positive Mental Attitude'],
];

function stageDoneText(trophyData, state, stage) {
  return trophyData.trophies.filter((t) => t.stage === stage && state.earned.has(t.id)).length;
}

function firstSentence(text) {  const cut = text.indexOf('. ');
  const first = cut === -1 ? text : text.slice(0, cut + 1);
  return first.length > 85 ? first.slice(0, 82).trimEnd() + '\u2026' : first;
}

function stageTableHtml(trophyData, state, stage) {
  const stageTrophies = trophyData.trophies.filter((t) => t.stage === stage.stage);
  const done = stageTrophies.filter((t) => state.earned.has(t.id)).length;
  const pct = Math.round((done / stage.total) * 100);
  const rows = stageTrophies.map((t) => {
    const earned = state.earned.has(t.id);
    const missable = t.missable
      ? 'Yes - possibly'
      : (t.timeSensitive ? 'Timed' : 'No');
    const sources = t.sources.map((s) => '[' + s + ']').join(' ');
    return '<tr data-trophy="' + t.id + '"' + (earned ? ' class="done"' : '') + '>'
      + '<td><strong>' + escapeHtml(t.name) + '</strong>' + (earned ? ' &#10003;' : '') + '</td>'
      + '<td>' + gradeBadge(t.grade) + '</td>'
      + '<td>' + missable + '</td>'
      + '<td>' + escapeHtml(firstSentence(t.guide)) + '</td>'
      + '<td class="src">' + sources + '</td></tr>';
  }).join('');
  return '<section class="stage"><span class="hrs">' + stage.hours + '</span>'
    + '<h2>' + stage.title + '</h2>'
    + '<p>' + stage.text + '</p>'
    + '<p class="sans"><strong>' + done + ' / ' + stage.total + ' earned</strong> - '
    + pct + '%</p>'
    + '<div class="bar"><i style="width:' + pct + '%"></i></div>'
    + '<table class="nums road"><tr><th>Trophy</th><th>Grade</th><th>Missable?</th>'
    + '<th>Key requirement</th><th>Source</th></tr>' + rows + '</table></section>';
}

export function roadmapPageHtml(trophyData, state) {
  const stageSections = STAGES.map((stage) => stageTableHtml(trophyData, state, stage)).join('');
  const numberRows = CHECKLIST_NUMBERS.map((row) =>
    '<tr><td>' + row[0] + '</td><td class="n">' + row[1] + '</td><td>' + row[2] + '</td></tr>'
  ).join('');
  return '<div class="panel"><h2>Roadmap to the platinum - Vice Got a Price!</h2>'
    + '<p><strong>About 200 hours, difficulty 4 / 10, one playthrough (PowerPyx; '
    + 'Push Square says up to 300+).</strong> No online trophies, no difficulty '
    + 'trophies, no mission medals, no mission replay, no New Game+. Cheats disable '
    + 'trophies and saving. Keep 15 manual saves plus 1 autosave: save at the start '
    + 'of every chapter, keep one untouched save from before the final mission.</p>'
    + '<p><strong>Chapter note:</strong> the trophy descriptions name Chapters 1-4 plus '
    + 'the final mission, while PowerPyx describes five chapters (Starting From Zero '
    + 'as both the Chapter 4 finale and the final mission; Operation Savage Glory as '
    + 'Chapter 5). This guide follows PowerPyx and flags the wrinkle rather than '
    + 'silently picking one side.</p>'
    + '<p class="chips stagechips"><span class="tchip static">Stage 1 &middot; '
    + stageDoneText(trophyData, state, 1) + ' / 13 &middot; 60&ndash;80 h</span>'
    + '<span class="tchip static">Stage 2 &middot; '
    + stageDoneText(trophyData, state, 2) + ' / 27 &middot; ~100 h</span>'
    + '<span class="tchip static">Stage 3 &middot; '
    + stageDoneText(trophyData, state, 3) + ' / 15 &middot; ~10 h</span></p></div>'
    + stageSections
    + '<div class="panel"><h3>The 100% checklist - the real numbers (PowerPyx)</h3>'
    + '<table class="nums"><tr><th>What the checklist needs</th><th>Target</th>'
    + '<th>For the trophy</th></tr>' + numberRows + '</table>'
    + '<p>PowerPyx puts the checklist at closer to 60% true completion, even though '
    + 'the game calls it 100%.</p></div>'
    + '<div class="alert"><h2>&#9888; 1 missable - Positive Mental Attitude</h2>'
    + '<p>Do Lucia&rsquo;s balcony meditation in Chapter 1, and keep a manual save from '
    + 'the start of Chapter 1 until the trophy pops. Everything else stays open in '
    + 'free roam after the story.</p></div>';
}
