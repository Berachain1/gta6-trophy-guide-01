// About view: the full source list, the self-audit, and the honesty notes.
import { escapeHtml } from '../html.js';

export function aboutPageHtml(trophyData, state) {
  const sourceRows = trophyData.sources.map((source) => {
    const link = source.url
      ? ' <a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener">'
        + escapeHtml(source.url) + '</a>'
      : '';
    return '<tr><td><strong>[' + source.id + '] ' + escapeHtml(source.name)
      + '</strong></td><td>' + escapeHtml(source.title) + ' - retrieved '
      + escapeHtml(source.retrieved) + '.' + link + '</td></tr>';
  }).join('');
  const cited = trophyData.trophies.filter((t) => t.sources && t.sources.length).length;
  return '<div class="panel"><h2>About &amp; sources</h2>'
    + '<p><strong>Grand Theft Auto VI</strong> (Rockstar Games) came out 19 November 2026 '
    + 'on PlayStation 5 and Xbox Series X|S, with no PC date announced. Leonida - '
    + 'fictional Florida, centred on Vice City - is where Lucia Caminos, fresh out of '
    + 'Leonida Penitentiary, and Jason Duval, an ex-soldier working for drug runners '
    + 'in the Leonida Keys, try to pull off a job that goes wrong. All 55 trophies '
    + 'are single-player; there are no online trophies and no DLC trophies.</p>'
    + '<p><strong>Self-audit:</strong> 55 / 55 trophies &middot; 55 / 55 guides &middot; '
    + cited + ' / 55 cited &middot; 28 / 28 hidden flagged &middot; 1 missable + 1 '
    + 'time-sensitive &middot; 5 unconfirmed - listed honestly &middot; Exophase + '
    + 'PSNProfiles, 19 Nov 2026.</p>'
    + '<h3>Sources</h3><table class="nums">' + sourceRows + '</table>'
    + '<p><strong>Checked against the live list:</strong> on 19 November 2026 the '
    + 'PSNProfiles trophy list for this game was read again and every one of the 55 '
    + 'names, descriptions and PSN counts matches this guide - including 52 areas '
    + 'for The Goodtime State and 500 profile actions for Actions Speak Louder. '
    + 'Hidden flags are not shown on the PSNProfiles or Exophase pages themselves, '
    + 'so the 28-hidden split follows OutputLag&rsquo;s reported split, cross-checked '
    + 'against the list.</p>'
    + '<h3>How this guide is written</h3>'
    + '<p>Names, descriptions and grades are quoted exactly as PlayStation publishes '
    + 'them. The guides are original writing for this guide, paraphrased from the '
    + 'sources above, never copied from them. A specific location or step with no '
    + 'source gets no credit here: every guide names where its facts come from, '
    + 'beside the guide itself.</p>'
    + '<h3>What is still unknown</h3>'
    + '<p>Five trophies had no confirmed method when the game launched (see the '
    + 'Missables tab). Two details are still being pinned down: whether the Chapter 1 '
    + 'meditation is actually required for Positive Mental Attitude, and which animal '
    + 'unlocks Fair Game. Anything unconfirmed is marked that way on its own page - '
    + 'no method is invented.</p>'
    + '<h3>How this list differs from GTA V</h3>'
    + '<p>GTA V&rsquo;s base list had 51 trophies, 6 of them missable and tied to the '
    + 'ending choice, and 17-18 online trophies were required for its platinum, at '
    + 'difficulty 5 / 10 and 150+ hours. GTA VI is deliberately more lenient: 0 online '
    + 'trophies, 1 playthrough, no mission gold medals, no difficulty trophies, '
    + 'difficulty 4 / 10, about 200 hours (PowerPyx; Push Square estimates up to 300+).</p>'
    + '<p>Unofficial fan guide. Not affiliated with Rockstar Games, Sony or PlayStation. '
    + 'No Rockstar logo, artwork or game screenshots are used anywhere in this guide; '
    + 'the look is its own. Progress is stored only in your browser - nothing is uploaded.</p></div>';
}
