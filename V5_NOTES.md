# gta6-trophy-guide-01 — v5 notes (19 Nov 2026, ~23:30–23:45 WIB)

RONDE TERAKHIR SEBELUM SUBMIT. Bos menegaskan: SUBMIT TERAKHIR = FINAL — tidak ada
submit untuk mengukur. Kerja harus benar dulu. NOT submitted, NOT pushed, NOT committed.
Recording 01a1f3ee-8cc7-72ce-b138-c71052483ade (PID 11409) still running, untouched (3h25m+).
Deadline: Sat 21 Nov 2026 18:00 WIB. Quota: 3/3 day-cap left for this bounty.

## Board (fresh, ~23:32 WIB)
#1 nightshift-labs 94.1836, #2 steady-koala-80 93.9131, #3 do-tinh 93.7764,
#4 hazel-kestrel-79 93.7764, #5 keen-fox-31 93.22, #10 fikril07 92.8462, ranked 2,719.
Bar #10 naik tipis (92.7921 → 92.8462); gap #1→#10 masih 1,34 pts.

## Ketiga gap v4 — SEMUA DITUTUP (diukur dengan pixel, bukan kira-kira)

### 1. Daftar sumber TERLIHAT di frame
Detail pane kini menampilkan blok SOURCES ringkas tepat di bawah numbered steps
(menggantikan one-liner "Sources: [S1] · [S2] …" yang dulu di bawah lipatan):
"SOURCES — [S1] PowerPyx — GTA 6 Trophy Guide & Roadmap · 19 Nov 2026 /
[S2] Exophase — GTA VI trophy list (PSN) · 19 Nov 2026 /
[S4] OutputLag — GTA 6 Trophy List · 19 Nov 2026".
Diukur: blok 743–786 px (43 px, 3 baris), SELURUHNYA dalam frame 800 px.
Judul disingkat hanya untuk tampilan (parentesis S1, klausa "as published on" S2);
judul lengkap tetap ada di daftar sumber lengkap di bawah lipatan + About.
Bonus sekelas (temuan head-to-head): baris goal kini juga menampilkan tag sumber
([S2] [S3] di Vice Got a Price!, [S1] [S2] [S5] di A Long Road) seperti nightshift.

### 2. Header grup chapter/stage di checklist
Baris kini dikelompokkan di bawah header "STAGE 1 · PLAY THE STORY — 3 / 13 EARNED"
(dan Stage 2 / Stage 3 lebih jauh ke bawah saat scroll). Header hanya muncul saat
sort = roadmap (default); sort lain tidak kena header berulang. Label stage diambil
dari data roadmap (Stage 1 Play the story, Stage 2 The 100% checklist,
Stage 3 Side quests and cleanup); hitungan earned dihitung live dari state.
Kepadatan dipertahankan: 6 baris checklist UTUH dalam frame (berakhir 774 px),
baris ke-7 (Trust) mengintip di lipatan seperti top entries.

### 3. Langkah 4 UTUH di shot 1
Langkah 1–4 guide PMA kini SELURUHNYA terlihat (langkah 4: 697–737 px).
Caranya bukan menggeser scroll, melainkan menghemat ruang di atasnya dengan
pengukuran: tabs jadi satu baris (61→32 px — stage chips kini muat di baris yang
sama), banner 49→45 px, audit/controls 2 px masing-masing, boxpair 157→124 px
(teks warning dipangkas ke 4 baris tanpa kehilangan fakta), steps 14→13,5 px,
boxes 53→~50 px, margin paragraf detail 7→5 px. Total ~105 px dihemat di atas steps.

## Yang dipertahankan dari v4
Tema terang (JANGAN flip ke gelap — perintah eksplisit; tema kertas bersih dan
terbaca). Banner missable, stage chips, goal strip, stepper 6/18, tag sumber per
baris, 210 pts, numbered steps, akurasi 55/55 cocok PSNProfiles/Exophase.

## Verifikasi (Playwright, Chromium 1255, 1280×800, ?seed=1)
- 4 screenshot retaken (final), semua ≤256 KiB (233.730 / 176.824 / 152.739 /
  131.156 B), saya LIHAT SENDIRI semuanya — shot 1, 2, 3, 4.
- Pengukuran elemen (measure3): nav tabs 32 px satu baris; boxpair 124 px;
  steps 1–4 berakhir 737 px; srclist 743–786 px; grouphead Stage 1 413–436 px;
  6 baris 438–774 px. Nol error halaman/konsol.
- Click-test semua lolos: stepper + → 7/18, − − → 5/18; "Show it" → detail PMA;
  Export unduh gta6-trophy-progress.json (12 earned, counters {28:6});
  Reset → 0/55, 0 pts, 0/18; Import pulihkan 12/55, 210 pts, 6/18. Nol error.
- Gate: `makefun check --kit . --repo … --worktree` → 4 passed, 0 failed,
  17 skipped, 5 at submission (langkah submit, expected).
- Sheet head-to-head: ~/workspace/make-fun/vs-top3-tg-v5.jpg (kita v5 vs
  nightshift #1, do-tinh #3, keen-fox #5 — dilihat sendiri).

## Perbandingan head-to-head (jujur)
Kita kini setara struktural dengan top entries di SEMUA sumbu yang bisa dihitung
dan dilihat: group header, sumber bernama di frame, langkah 1–4 utuh, banner,
chips, goal strip, stepper live, sitasi per baris, kotak warning berdampingan.
Sisa gap yang masih terlihat (dengan nama):
1. **Tema gelap** — semua top 10 gelap; kita satu-satunya entry terang.
   Sengaja dipertahankan (perintah Bos). Ini kini pembeda visual terbesar.
2. **Kedalaman anotasi sumber** — nightshift menulis per sumber FAKTA apa yang
   didukungnya ("18 spots at 10 locations; Chapter 1 spot only in Chapter 1…");
   kita menampilkan nama + judul + tanggal (setara do-tinh). Anotasi per sumber
   butuh ~3 baris tambahan — tidak muat tanpa mengorbankan langkah/sumber.
3. **"Saved in this browser" timestamp** — ketiga top entry menampilkannya di
   header; kita tidak. Sengaja dilewati: audit strip sudah penuh (menambah teks
   akan overflow karena flex nowrap) dan header menambah baris akan memakan
   ~15 px ruang frame. Sepele.
4. **Nama asli trophy story di baris** — nightshift/do-tinh menampilkan nama
   ("Just Like Paradise" dst.) sementara kita menyembunyikan nama story
   (spoiler-free ON, default yang disengaja). Bukan cacat — pilihan produk.

## Penilaian jujur — apakah top 10 kini kredibel?
**Ya — ketiga cacat bernama v4 sudah ditutup dan entry ini setara struktural
dengan top entries di semua sumbu yang bisa dihitung.** Paid place (top 50)
sangat mungkin; top 10 kredibel. Tapi **top 10 tetap BELUM terbukti** — tidak ada
skor lokal untuk bounty judge, dan satu-satunya bukti adalah dev grade setelah
submit. Yang bisa saya katakan dengan pasti: tidak ada lagi cacat bernama yang
belum ditutup; yang tersisa hanyalah tema (pilihan sadar) dan selera juri.

## Submit steps (butuh OK Bos)
Commit worktree → repo GitHub publik baru (anchor drand, dibuat setelah
2026-11-19 10:30 UTC) → `.makefun/owner.json` → tulis muse-usage → seal
recording (PID 11409) → submit. Deadline Sabtu 21 Nov 18:00 WIB, kuota 3/3.
