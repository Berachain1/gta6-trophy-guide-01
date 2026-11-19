// Missables view: the one possibly-missable trophy with its save plan, the one
// time-sensitive strand, and the five trophies still unconfirmed at launch.
// Each unconfirmed row names that trophy's believed trigger - a guess, labelled
// as one - instead of repeating the same sentence five times.
import { escapeHtml } from '../html.js';

export function missablesPageHtml(trophyData, state) {
  const unconfirmed = trophyData.trophies.filter((t) => t.unconfirmed);
  const unconfRows = unconfirmed.map((t) =>
    '<tr><td><strong>' + escapeHtml(t.name) + '</strong><br>'
    + escapeHtml(t.description) + '</td><td>'
    + escapeHtml(t.belief || 'No confirmed method yet.') + '</td><td class="rowsrc">'
    + t.sources.map((s) => '[' + s + ']').join(' ') + '</td></tr>'
  ).join('');
  const pma = trophyData.trophies.find((t) => t.id === 28);
  const pmaDone = state.earned.has(28);
  const pmaState = pmaDone ? '(already earned in your tracker)' : '(not earned yet)';
  return '<div class="alert"><h2>1 missable + 1 time-sensitive</h2>'
    + '<p><strong>Positive Mental Attitude</strong> - Lucia&rsquo;s balcony meditation '
    + 'in Chapter 1 disappears after Chapter 1. Do it early, and keep a manual save '
    + 'from the start of Chapter 1. <strong>Strangers &amp; Freaks</strong> has one '
    + 'time-sensitive strand - do Yago&rsquo;s race in Chapter 3 the moment it appears.</p></div>'
    + '<div class="panel"><h2>Still unconfirmed at launch - listed honestly</h2>'
    + '<p>Five trophies have no confirmed method yet, as of 19 November 2026 '
    + '(PowerPyx, OutputLag). This guide invents no method for them &mdash; the '
    + 'right-hand column is what players believe so far, each one a guess:</p>'
    + '<table class="nums"><tr><th>Trophy</th>'
    + '<th>What we know - believed trigger (unconfirmed)</th><th>Source</th></tr>'
    + unconfRows + '</table>'
    + '<p>Still being confirmed: whether the Chapter 1 meditation is strictly required '
    + 'for Positive Mental Attitude, and which animal unlocks Fair Game.</p></div>'
    + '<div class="panel"><h2>The only possibly-missable trophy</h2>'
    + '<p><strong>Positive Mental Attitude</strong> ' + pmaState
    + ' - meditate at every spot across Leonida. ' + escapeHtml(pma.guide) + '</p>'
    + '<h3>Save plan (no mission replay, no New Game+)</h3><ul>'
    + '<li>Keep a manual save from the start of every chapter - 15 manual slots plus 1 autosave.</li>'
    + '<li>Keep the Chapter 1 save until Positive Mental Attitude pops.</li>'
    + '<li>Keep one untouched save from just before the final mission.</li>'
    + '<li>Never use cheats on your trophy save: cheats disable trophies and saving.</li></ul>'
    + '<h3>Time-sensitive, but NOT missable</h3>'
    + '<p><strong>Race Against Yago</strong> (Chapter 3, hourglass icon) counts toward '
    + 'Strangers &amp; Freaks. Do it the moment it appears - the strand itself can '
    + 'pass you by, but the trophy has other strands to reach 8.</p>'
    + '<p>Optional missions that disappear (black icons, pink letters) do '
    + '<strong>not</strong> affect any trophy or the 100% checklist - there are '
    + '200-300+ of them and only 100 are needed.</p></div>';
}
