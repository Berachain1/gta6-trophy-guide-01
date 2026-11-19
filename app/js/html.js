// Tiny HTML helpers every view shares: escaping text and building badges.
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function gradeBadge(grade) {
  return '<span class="badge b-' + grade + '">' + grade.toUpperCase() + '</span>';
}

export function trophyBadges(trophy) {
  const badges = [gradeBadge(trophy.grade)];
  badges.push('<span class="badge b-kind">' + escapeHtml(trophy.kind.toUpperCase()) + '</span>');
  if (trophy.hidden) badges.push('<span class="badge b-hidden">HIDDEN ON PSN</span>');
  if (trophy.missable) badges.push('<span class="badge b-miss">MISSABLE</span>');
  if (trophy.timeSensitive) badges.push('<span class="badge b-time">TIME-SENSITIVE</span>');
  if (trophy.unconfirmed) badges.push('<span class="badge b-unconf">UNCONFIRMED</span>');
  if (trophy.confirming) badges.push('<span class="badge b-unconf">BEING CONFIRMED</span>');
  return badges.join('');
}
