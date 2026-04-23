# 📚 JS Problem Solving
### Dokumentasi Pribadi — Pattern & Strategi JavaScript

![Status](https://img.shields.io/badge/Status-Aktif-brightgreen)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)
![Tipe](https://img.shields.io/badge/Tipe-Catatan%20Belajar%20Pribadi-blue)

---

## 🎯 Tentang Dokumentasi Ini

Dokumentasi ini berisi kumpulan **pattern dan strategi** yang saya pelajari saat mengerjakan soal-soal JavaScript. Setiap file mencakup:

- Penjelasan konsep secara detail
- Visualisasi langkah-langkah iterasi
- Beberapa versi solusi dengan perbandingan
- Jebakan umum yang perlu dihindari
- Latihan menulis ulang secara bertahap

> Dokumentasi ini dibuat sebagai **catatan belajar pribadi** — bukan tutorial, melainkan referensi yang bisa dibuka kembali kapan saja.

---

## 🗂️ Struktur Folder

```
js-problem-solving/
│
├── README.md
│
├── 01-fundamentals_pola-dasar/          # Pattern dasar
│   ├── max-pattern.md
│   ├── min-pattern.md
│   ├── frequency-counter.md
│   └── most-frequent.md
│
├── 02-grouping_pengelompokan/              # Pattern pengelompokan
│   ├── basic-grouping.md
│   └── count-by-class.md
│
├── 03-ranking_peringkat/               # Pattern ranking
│   ├── manual-ranking.md
│   ├── top-1-per-group.md
│   └── top-2-per-group.md
│
├── 04-case-study_studi-kasus/            # Penerapan ke soal nyata
│   ├── highest-score.md
│   ├── lowest-score.md
│   ├── count-by-class.md
│   ├── top-two-by-class.md
│   ├── most-frequent-value.md
│   └── melee-ranged-grouping.md
│
└── 05-mental-model_cara-berpikir/          # Cara berpikir & ringkasan
    └── thinking-patterns.md
```

---

## 🗺️ Urutan Belajar yang Disarankan

Folder dirancang dengan urutan yang logis — dari fondasi hingga penerapan:

| Urutan | File | Konsep Utama |
|--------|------|--------------|
| 1 | [max-pattern.md](01-fundamentals_pola-dasar/max-pattern.md) | Mencari nilai terbesar |
| 2 | [min-pattern.md](01-fundamentals_pola-dasar/min-pattern.md) | Mencari nilai terkecil |
| 3 | [frequency-counter.md](01-fundamentals_pola-dasar/frequency-counter.md) | Menghitung kemunculan data |
| 4 | [most-frequent.md](01-fundamentals_pola-dasar/most-frequent.md) | Mencari data yang paling sering muncul |
| 5 | [basic-grouping.md](02-grouping_pengelompokan/basic-grouping.md) | Mengelompokkan data |
| 6 | [count-by-class.md](02-grouping_pengelompokan/count-by-class.md) | Menghitung per kategori dari objek |
| 7 | [manual-ranking.md](03-ranking_peringkat/manual-ranking.md) | Ranking tanpa sorting |
| 8 | [top-1-per-group.md](03-ranking_peringkat/top-1-per-group.md) | Satu terbaik per grup |
| 9 | [top-2-per-group.md](03-ranking_peringkat/top-2-per-group.md) | Dua terbaik per grup |
| 10 | [highest-score.md](04-case-study_studi-kasus/highest-score.md) | Max Pattern pada data nyata |
| 11 | [lowest-score.md](04-case-study_studi-kasus/lowest-score.md) | Min Pattern pada data nyata |
| 12 | [count-by-class.md](04-case-study_studi-kasus/count-by-class.md) | Frequency Counter pada data nyata |
| 13 | [top-two-by-class.md](04-case-study_studi-kasus/top-two-by-class.md) | Grouping + Ranking pada data nyata |
| 14 | [most-frequent-value.md](04-case-study_studi-kasus/most-frequent-value.md) | Most Frequent Pattern pada data nyata |
| 15 | [melee-ranged-grouping.md](04-case-study_studi-kasus/melee-ranged-grouping.md) | Fixed Grouping (Array) pada data nyata |
| 16 | [thinking-patterns.md](05-mental-model_cara-berpikir/thinking-patterns.md) | Cara berpikir memilih pattern |

---

## ⚡ Quick Reference

Tidak tahu harus pakai pattern apa? Lihat output yang diinginkan:

| Output yang diinginkan | Pattern yang dipakai | File |
|------------------------|---------------------|------|
| Satu nilai terbesar | Max Pattern | [max-pattern.md](01-fundamentals_pola-dasar/max-pattern.md) |
| Satu nilai terkecil | Min Pattern | [min-pattern.md](01-fundamentals_pola-dasar/min-pattern.md) |
| `{ key: count }` | Frequency Counter | [frequency-counter.md](01-fundamentals_pola-dasar/frequency-counter.md) |
| Data yang paling sering muncul | Most Frequent | [most-frequent.md](01-fundamentals_pola-dasar/most-frequent.md) |
| `{ key: [...items] }` | Basic Grouping | [basic-grouping.md](02-grouping_pengelompokan/basic-grouping.md) |
| `{ key: count }` dari objek | Count By Class | [count-by-class.md](02-grouping_pengelompokan/count-by-class.md) |
| Array top-K | Manual Ranking | [manual-ranking.md](03-ranking_peringkat/manual-ranking.md) |
| `{ key: item_terbaik }` | Top 1 Per Group | [top-1-per-group.md](03-ranking_peringkat/top-1-per-group.md) |
| `{ key: [item1, item2] }` | Top 2 Per Group | [top-2-per-group.md](03-ranking_peringkat/top-2-per-group.md) |
| Array `[[], []]` posisi mutlak | Fixed Grouping | [melee-ranged-grouping.md](04-case-study_studi-kasus/melee-ranged-grouping.md) |

---

## 🔗 Hubungan Antar Pattern

```
Max Pattern ──┐
              ├──→ Top 1 Per Group ──┐
Min Pattern ──┘                     │
                                    ├──→ Case Study
Frequency Counter ──→ Count By Class│
        │                           │
        └──→ Most Frequent ─────────┤
                                    │
Basic Grouping ──┐                  │
                 ├──→ Top 2 Per Group┘
Manual Ranking ──┘
```

Semua pattern di `04-case-study` adalah **penerapan nyata** dari pattern di folder `01` sampai `03`.

---

## 📝 Catatan Format Dokumentasi

Setiap file dokumentasi mengikuti format yang konsisten:

| Section | Isi |
|---------|-----|
| 📋 Deskripsi | Penjelasan singkat pattern |
| 🧠 Memahami Konsep | Inti cara kerja dengan analogi |
| 🧪 Contoh Kasus | Input & output yang diharapkan |
| 🔍 Konsep yang Digunakan | Tabel fondasi teknis |
| 🔄 Implementasi | Kode dengan komentar inline + tabel penjelasan + tampilan hasil |
| 🧪 Visualisasi | Tabel iterasi langkah per langkah |
| 🔀 Versi Alternatif | Cara lain menulis solusi dengan visualisasi masing-masing |
| ⚠️ Jebakan Umum | Kesalahan yang sering terjadi + solusi |
| 💡 Insight | Catatan penting dan perbandingan |
| 📝 Pelajaran yang Didapat | Ringkasan poin belajar |
| ✍️ Latihan Menulis Ulang | Langkah bertahap untuk praktik mandiri |
