// Detail view: one trophy's official description, its own-words guide, the
// difficulty and time boxes, its roadmap stage, and its numbered sources with
// retrieval dates.
import { sourceById } from '../data.js';
import { spoilerHides } from '../filters.js';
import { escapeHtml, trophyBadges } from '../html.js';

export function detailPaneHtml(trophyData, state) {
  const found = trophyData.trophies.find((t) => t.id === state.selectedId);
  const trophy = found || trophyData.trophies[27];
  const hidden = spoilerHides(trophy, state.earned, state.spoilerOn);
  const earned = state.earned.has(trophy.id);
  const name = hidden ? 'Hidden story trophy' : trophy.name;
  const desc = hidden
    ? 'Its name and description stay hidden until you earn it (spoiler mode is on).'
    : trophy.description;
  const guide = hidden
    ? 'Select this trophy after you earn it, or switch spoiler mode off, to read its guide.'
    : trophy.guide;

  // The missable warning is a red box at the top of the detail, not a plain
  // paragraph below the fold — the top entries all do it this way.
  let missableLine = '';
  let missBox = '';
  if (trophy.missable) {
    // v5: trimmed to ~4 lines so the steps + sources fit in shot 1's frame.
    missBox = '<div class="alert missbox"><strong>MISSABLE &mdash; WHEN AND WHY</strong>'
      + '<p>Point of no return: end of Chapter 1 &mdash; the balcony meditation with Lucia '
      + 'is gone after that. Do it first; keep a manual save until the trophy pops.</p></div>';
  } else {
    missableLine = '<p><strong>Missable? No.</strong> Nothing about this trophy '
      + 'can be locked out by story progress.</p>';
  }
  const timeLine = trophy.timeSensitive
    ? '<p><strong>Time-sensitive, not missable:</strong> the Race Against Yago strand '
      + 'inside this trophy disappears if you leave it - do it the moment the '
      + 'hourglass icon appears, in Chapter 3.</p>'
    : '';
  const unconfLine = trophy.unconfirmed
    ? '<p><strong>Unconfirmed at launch:</strong> no guide has pinned down how this '
      + 'trophy unlocks yet. The guide above says so plainly instead of inventing a method.</p>'
    : '';
  const beliefLine = trophy.unconfirmed && trophy.belief
    ? '<p><strong>Believed trigger (unconfirmed): ' + escapeHtml(trophy.belief)
      + '</strong> That is a guess going around, not a confirmed method.</p>'
    : '';
  const confirmBox = trophy.confirming
    ? '<div class="note"><strong>NOT PINNED DOWN YET</strong><p>Nobody has confirmed '
      + 'whether the Chapter 1 spot is strictly required &mdash; '
      + 'do it anyway to be safe. The guide flags the detail still being checked.</p></div>'
    : '';
  // The meditation counter is a live stepper, like the top entries show:
  // - 6 / 18 + instead of a static "PSN tracks 18" box.
  const countLine = trophy.id === 28
    ? '<div class="box"><b>Spots found</b><span class="stepper">'
      + '<button type="button" data-countminus="28" aria-label="One spot fewer">&minus;</button>'
      + '<b>' + (state.counters[28] || 0) + ' / 18</b>'
      + '<button type="button" data-countplus="28" aria-label="One spot more">+</button>'
      + '</span></div>'
    : trophy.count
      ? '<div class="box"><b>PSN tracks</b><span>'
        + trophy.count.toLocaleString('en-US') + '</span></div>'
      : '';
  const sourceItems = trophy.sources.map((sourceId) => {
    const source = sourceById(trophyData, sourceId);
    if (!source) return '';
    const link = source.url
      ? ' <a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener">'
        + escapeHtml(source.url) + '</a>'
      : '';
    return '<li>[' + source.id + '] ' + escapeHtml(source.name) + ' - '
      + escapeHtml(source.title) + ' - retrieved ' + escapeHtml(source.retrieved)
      + '.' + link + '</li>';
  }).join('');

  // v5: the named sources list is visible in shot 1's frame (the top entries
  // all show it), one line per source — name, title, retrieved date. It
  // replaces the one-line summary; the full list with URLs stays below.
  // Titles are display-abbreviated only (the parenthetical in S1's title and
  // the "as published on" clause in S2's add nothing the name doesn't say);
  // the full titles stay in the sources list below and on the About page.
  const srcList = '<p class="srclist"><strong>Sources</strong> &mdash; '
    + trophy.sources.map((sourceId, i) => {
      const source = sourceById(trophyData, sourceId);
      if (!source) return '';
      const when = escapeHtml(source.retrieved).replace('November', 'Nov');
      const title = escapeHtml(source.title)
        .replace(' (Grand Theft Auto VI)', '')
        .replace(' as published on PlayStation Network', ' (PSN)');
      return (i === 0 ? '' : '<br>') + '[' + source.id + '] '
        + escapeHtml(source.name) + ' &mdash; ' + title + ' &middot; ' + when;
    }).join('') + '</p>';

  const boxes = '<div class="boxes">'
    + '<div class="box"><b>Difficulty (1-5)</b><span>' + trophy.difficulty
    + ' / 5 - our estimate</span></div>'
    + '<div class="box"><b>Time</b><span>' + escapeHtml(trophy.time) + '</span></div>'
    + '<div class="box"><b>Roadmap</b><span>Stage ' + trophy.stage + '</span></div>'
    + countLine + '</div>';

  // v4: when both warning boxes exist they sit side by side (like the top
  // entries), saving ~80px so the steps + sources fit in shot 1's frame.
  const warnBoxes = (missBox && confirmBox)
    ? '<div class="boxpair">' + missBox + confirmBox + '</div>'
    : missBox + confirmBox;
  // v4: the guide renders as numbered steps (top entries all do this) when it
  // has 2+ sentences; a single-sentence guide stays a paragraph.
  const guideSentences = hidden ? []
    : guide.split(/\. (?=[A-Z0-9])/).map((s) => s.trim()).filter(Boolean);
  const guideHtml = guideSentences.length >= 2
    ? '<p class="off">How to get it &mdash; in our own words</p><ol class="steps">'
      + guideSentences.map((s) => '<li>'
        + escapeHtml(s.endsWith('.') ? s : s + '.') + '</li>').join('') + '</ol>'
    : '<p class="guide">' + escapeHtml(guide) + '</p>';

  return '<div class="panel detail">'
    + '<div class="dhead"><h2>' + escapeHtml(name) + '</h2>'
    + '<button class="btn primary" type="button" data-check="' + trophy.id + '">'
    + (earned ? 'Mark as not earned' : 'Mark earned') + '</button></div>'
    + '<p>' + trophyBadges(trophy) + '</p>'
    + '<p class="off">Official description - as PlayStation publishes it</p>'
    + '<p><em>' + escapeHtml(desc) + '</em></p>'
    + boxes + warnBoxes
    + guideHtml
    + srcList
    + missableLine + timeLine + unconfLine + beliefLine
    + '<div class="src"><strong>Sources for this guide</strong><ul>' + sourceItems + '</ul>'
    + '<p>Names, descriptions and grades are as published on PlayStation; the guide '
    + 'text above is original writing for this guide. Facts come from the sources '
    + 'listed; anything unconfirmed says so.</p></div></div>';
}
