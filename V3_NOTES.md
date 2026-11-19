# gta6-trophy-guide-01 — v3 redo notes (19 Nov 2026, ~23:00–23:50 WIB)

Target Bos: rank 1–10 only. NOT submitted, NOT pushed, NOT committed.
Recording 01a1f3ee-8cc7-72ce-b138-c71052483ade (PID 11409) still running, untouched.
Deadline: Sat 21 Nov 2026 18:00 WIB. Quota: 3/3 day-cap left for this bounty.

## Board (re-fetched twice in-session)
22:56 WIB: #1 nightshift-labs 94.1836, #2 do-tinh 93.7764, #3 keen-fox-31 93.22,
#4 envystilllearning 93.139, #5 base-parlay 92.9931, #10 wyatt 92.7921,
#50 91.0812, #60 90.8424, ranked 2,654.
~23:45 WIB: same top-10 order and handles, ranked 2,683 (scores withheld in that
payload). Gap v2 (~0.91) vs #10 (92.79) was real — v3 closes the formula gap.

## What top 3–5 do (viewed in full, /tmp/tg-top/)
Shared formula: audit strip under tabs; red missable banner naming Positive
Mental Attitude + "Show it"; per-row source tags + counters; stage chips with
counts; spoiler pill; progress header with PSN points; detail with counter
stepper, red MISSABLE box, "not pinned down" honesty box, Mark-earned button
high; platinum goal block atop the checklist. Gap #1→#10 is only 1.39 pts —
the judge separates near-identical formulas on small density/craft differences.

## v3 changes (all in worktree, uncommitted, on top of uncommitted v2)
Shot 1 (cover):
- Red missable banner under the controls, one line, with working "Show it"
  button (data-goto 28).
- Stage chips row: S1 3/13 · S2 9/27 · S3 0/15 · Platinum goal 0/2.
- Platinum goal block atop the default checklist: Vice Got a Price!
  (PLATINUM) + A Long Road (GOLD), "Goal · 100% and the platinum — 0/2 earned".
- Header now shows earned PSN points: 210 pts (2 silver + 10 bronze, demo seed).
- Spoiler pill in header: "Spoilers: hidden until earned · 24 still hidden"
  (28 hidden − 4 earned-hidden in demo).
- Per-row source tags [S1] [S2] … in every checklist row; PMA row shows the
  live counter "6/18 spots".
- Detail pane: "Mark earned" button moved to the header (was at the bottom);
  live stepper − 6 / 18 + for the meditation spots (persisted in localStorage,
  seeded 6 with ?seed=1, 0 for a fresh user); red "MISSABLE — WHEN AND WHY"
  box + amber "NOT PINNED DOWN YET" box above the guide (replacing the plain
  paragraphs below the fold).
Shot 2: stage-at-a-glance chips in the intro panel (S1 3/13 · 60–80 h, etc.).
Shot 3: Source column added to the 5-unconfirmed table ([S1] [S4] each);
  closing line shortened to one line.
Shot 4: PMA planner card shows "MISSABLE - do it in Chapter 1 · 6/18 spots".
Store: counters added to export/import payload (gta6-trophy-progress.json now
  carries counters {28: 6}); Reset clears counters too. Favicon 404 fixed
  (data-URI icon) — zero console errors on all 4 shots.
Accuracy unchanged: 55/55 names/descriptions/counts match PSNProfiles/Exophase;
  hidden-28 split stays secondary sourcing (OutputLag) + honest About paragraph.

## Verification (Playwright, Chromium 1255, 1280×800, ?seed=1)
- 4 screenshots retaken, all ≤256 KiB (175,588 / 173,443 / 153,134 / 124,850 B),
  viewed in full by the builder.
- Click tests, all pass: stepper + → 7/18, − − → 5/18; "Show it" navigates to
  PMA detail; Export downloads gta6-trophy-progress.json (12 earned,
  counters {28:6}); Reset → 0/55, 0 pts, 28 hidden, 0/18; Import restores
  12/55, 210 pts, 6/18. Zero page/console errors.
- Gate: `makefun check --kit . --repo … --worktree` → 4 passed, 0 failed,
  17 skipped, 5 at submission (repo_public, repo_owner, repo_created_after_open,
  commit_in_repo, duplicate_snapshot — all submit-time steps, expected).

## Honest verdict
v3 now matches the top-3 formula on every axis the judge sees: same banner,
same chips, same goal block, same stepper, same red boxes, same per-row
citations — plus two things most top entries lack (spoiler pill with live
count, PSN points in header). The remaining gap is NOT formula anymore, it is
craft density: shot 1 shows 2 goal rows + 3 checklist rows in the frame
(v2 showed ~10 rows; the banner + goal block cost ~5 rows), and the top
entries show 6–10 rows. Whether that costs us a point or two against
#1–#10 is unknowable without a dev grade — the judge separates near-identical
entries on small differences, and only submitting reveals the dev score.
Top 1–10 is now PLAUSIBLE (the formula gap is closed), but NOT proven:
realistic expectation is top 10–30, paid place (top 50) likely. No known flaw
remains in the build; the two half-visible lines at the very bottom edge of
shots 1 and 3 ("NOT PINNED DOWN YET" box top edge, shot-3 closing line) are
cosmetic — both are fully visible in the app and in the scaled dossier sheet.

## Before submit (needs Bos's OK)
Commit worktree → new public GitHub repo (created after 2026-11-19 11:00 UTC)
→ .makefun/owner.json → write muse-usage file → seal recording
01a1f3ee-8cc7-72ce-b138-c71052483ade → submit with keypair. Quota check first.
