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
├── 01-fundamentals/          # Pattern dasar
│   ├── max-pattern.md
│   ├── min-pattern.md
│   └── frequency-counter.md
│
├── 02-grouping/              # Pattern pengelompokan
│   ├── basic-grouping.md
│   └── count-by-class.md
│
├── 03-ranking/               # Pattern ranking
│   ├── manual-ranking.md
│   ├── top-1-per-group.md
│   └── top-2-per-group.md
│
├── 04-case-study/            # Penerapan ke soal nyata
│   ├── highest-score.md
│   ├── lowest-score.md
│   ├── count-by-class.md
│   └── top-two-by-class.md
│
└── 05-mental-model/          # Cara berpikir & ringkasan
    └── thinking-patterns.md
```

---

## 🗺️ Urutan Belajar yang Disarankan

Folder dirancang dengan urutan yang logis — dari fondasi hingga penerapan:

| Urutan | File | Konsep Utama |
|--------|------|--------------|
| 1 | [max-pattern.md](01-fundamentals/max-pattern.md) | Mencari nilai terbesar |
| 2 | [min-pattern.md](01-fundamentals/min-pattern.md) | Mencari nilai terkecil |
| 3 | [frequency-counter.md](01-fundamentals/frequency-counter.md) | Menghitung kemunculan data |
| 4 | [basic-grouping.md](02-grouping/basic-grouping.md) | Mengelompokkan data |
| 5 | [count-by-class.md](02-grouping/count-by-class.md) | Menghitung per kategori dari objek |
| 6 | [manual-ranking.md](03-ranking/manual-ranking.md) | Ranking tanpa sorting |
| 7 | [top-1-per-group.md](03-ranking/top-1-per-group.md) | Satu terbaik per grup |
| 8 | [top-2-per-group.md](03-ranking/top-2-per-group.md) | Dua terbaik per grup |
| 9 | [highest-score.md](04-case-study/highest-score.md) | Max Pattern pada data nyata |
| 10 | [lowest-score.md](04-case-study/lowest-score.md) | Min Pattern pada data nyata |
| 11 | [count-by-class.md](04-case-study/count-by-class.md) | Frequency Counter pada data nyata |
| 12 | [top-two-by-class.md](04-case-study/top-two-by-class.md) | Grouping + Ranking pada data nyata |
| 13 | [thinking-patterns.md](05-mental-model/thinking-patterns.md) | Cara berpikir memilih pattern |

---

## ⚡ Quick Reference

Tidak tahu harus pakai pattern apa? Lihat output yang diinginkan:

| Output yang diinginkan | Pattern yang dipakai | File |
|------------------------|---------------------|------|
| Satu nilai terbesar | Max Pattern | [max-pattern.md](01-fundamentals/max-pattern.md) |
| Satu nilai terkecil | Min Pattern | [min-pattern.md](01-fundamentals/min-pattern.md) |
| `{ key: count }` | Frequency Counter | [frequency-counter.md](01-fundamentals/frequency-counter.md) |
| `{ key: [...items] }` | Basic Grouping | [basic-grouping.md](02-grouping/basic-grouping.md) |
| `{ key: count }` dari objek | Count By Class | [count-by-class.md](02-grouping/count-by-class.md) |
| Array top-K | Manual Ranking | [manual-ranking.md](03-ranking/manual-ranking.md) |
| `{ key: item_terbaik }` | Top 1 Per Group | [top-1-per-group.md](03-ranking/top-1-per-group.md) |
| `{ key: [item1, item2] }` | Top 2 Per Group | [top-2-per-group.md](03-ranking/top-2-per-group.md) |

---

## 🔗 Hubungan Antar Pattern

```
Max Pattern ──┐
              ├──→ Top 1 Per Group ──┐
Min Pattern ──┘                     │
                                    ├──→ Case Study
Frequency Counter ──→ Count By Class│
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
