# gta6-trophy-guide-01 — v4 notes (19 Nov 2026, ~23:15–23:30 WIB)

Target Bos: HARUS masuk top 10, rank di atas 10 = gagal. NOT submitted, NOT pushed, NOT committed.
Recording 01a1f3ee-8cc7-72ce-b138-c71052483ade (PID 11409) still running, untouched (3h10m at write time).
Deadline: Sat 21 Nov 2026 18:00 WIB. Quota: 3/3 day-cap left for this bounty.

## Board (fresh, ~23:15 WIB)
#1 nightshift-labs 94.1836, #2 do-tinh 93.7764, #3 hazel-kestrel-79 93.7764 (NEW),
#4 keen-fox-31 93.22, #5 envystilllearning 93.139, #10 idnafa-a 92.7921 (wyatt dropped out),
ranked 2,706. Bar #10 unchanged at 92.7921; gap #1→#10 still 1.39 pts.

## v3 defects — both CLOSED (verified by viewing the new screenshots myself)

### 1. Shot 1 row density (was 2 goal + 3 checklist rows)
Chrome restructured (~160px saved before content):
- Header compacted 110→~56px (logo 40, title 23px, progress 2 lines; spoiler pill moved to audit strip).
- Audit strip one line (shortened text, pill right-aligned, nowrap).
- Stage chips moved INTO the tabs row (right side), no longer their own row.
- Controls collapsed to ONE row (chips + search + 3 selects); spoiler toggle + Export/Import/Reset moved to the checklist panel header (same ids, all click tests still pass).
- Missable banner slimmed to one line (~40px).
- Goal block became a 2-column strip (both goal trophies side by side, ~65px vs ~140px).
- Checklist rows slimmed to ~46px (padding 5px, name 14.5px, desc 13px).
Result shot 1: goal strip (2 trophies) + **6 FULL checklist rows** (Just Like Paradise, Paradise Lost, 4× hidden story) + 7th row (Trust) partially visible at the bottom edge — same as top entries, which also cut a row at the fold. All v3 formula elements kept: banner, stage chips, goal block, stepper 6/18, per-row [S1]/[S2] tags, 210 pts.

### 2. Half-cut rows at bottom edges
- Shot 1: MISSABLE + NOT PINNED DOWN YET boxes now side by side (boxpair grid) and BOTH fully in frame; texts trimmed (missbox −1 line, note −1 line).
- Shot 3: closing line ("Still being confirmed: … Fair Game.") fully in frame now; 5 unconfirmed rows + Source column all visible.
- Bonus, same class: shot 2 now shows 8 FULL stage-1 rows (was 4.5); shot 4 shows 4 full planner cards (was 3.5). Remaining partials are only the next scroll item peeking at the fold (Trust row shot 1, step 4 shot 1, 5th planner card, next panel heading shot 3) — normal scroll behavior, top entries have the same.

### 3. Detail-pane depth (found in head-to-head, fixed in v4)
- Guide now renders as numbered steps ("HOW TO GET IT — IN OUR OWN WORDS") instead of one paragraph, like all top entries. PMA guide rewritten to 4 short steps (same facts: Ch1 balcony first, 18 spots/10 locations, double-count, Progress path, Coffee Break last, 15/18 for 100%; manual-save + "gone after Ch1" live in the warning boxes). All 55 guides split cleanly (no suspicious fragments; max 6 sentences).
- Steps 1–3 fully visible in shot 1; step 4 peeks at the bottom edge.
- Sources line + full sources list remain below the fold (see gap #2 below).

## Verification (Playwright, Chromium 1255, 1280×800, ?seed=1)
- 4 screenshots retaken, all ≤256 KiB (217,064 / 180,686 / 152,577 / 123,577 B), viewed in full.
- Click tests, all pass: stepper + → 7/18, − − → 5/18; "Show it" → PMA detail; Export downloads gta6-trophy-progress.json (12 earned, counters {28:6}); Reset → 0/55, 0 pts, 0/18; Import restores 12/55, 210 pts, 6/18. Zero page/console errors.
- Gate: `makefun check --kit . --repo … --worktree` → 4 passed, 0 failed, 17 skipped, 5 at submission (all submit-time steps, expected).
- Accuracy unchanged: 55/55 names/descriptions/counts match PSNProfiles/Exophase; hidden-28 split stays secondary sourcing + honest About paragraph.
- Head-to-head sheet: ~/workspace/make-fun/vs-top4-tg-v4.jpg (ours vs nightshift #1, do-tinh #2, hazel #3, keen-fox #4 — viewed by builder).

## Honest verdict
**Top 10 now genuinely credible — the two named v3 defects are closed and the entry is at structural parity with the top entries on every countable axis** (rows visible, all formula elements, no half-cut meaningful content, numbered steps, side-by-side warning boxes, per-row citations, live stepper). Paid place (top 50) very likely. But **top 10 is still NOT proven** — only a dev grade after submit proves it, and the judge separates near-identical entries on small differences (spread #1→#10 is 1.39 pts).

## Remaining visible gaps (named)
1. **Dark theme** — all top 10 are dark; ours is the only light entry. Dark reads more premium/dense at small size. NOT switched: a full theme flip 1.5 days before deadline without time to re-verify everything is reckless; the paper theme is clean and readable.
2. **Sources list in-frame** — nightshift/do-tinh/keen-fox show their named sources list inside the 800px frame; ours shows only the one-line "Sources: [S1] PowerPyx · …" line, which sits below the fold (step 4 + src-line + full list continue below). Our sources ARE in the dossier/source outline, just not visible in the screenshot.
3. **Step 4 half-cut** at shot 1's bottom edge (top entries show 3–4 full steps; ours shows 3 full + step 4 peeking).
4. **No chapter/stage group headers in the checklist** — nightshift/do-tinh/hazel group rows under "1 · CHAPTER 1" / "STAGE 1" headers; ours flows continuously (stage shown per-row instead).
5. **No "Saved in this browser" timestamp** in the header (top entries show it) — trivial.

## Submit steps (need Bos's OK)
Commit worktree → new public GitHub repo (drand anchor, created after 2026-11-19 10:30 UTC) → `.makefun/owner.json` → write muse-usage → seal recording (PID 11409) → submit. Deadline Sat 21 Nov 18:00 WIB, quota 3/3.
