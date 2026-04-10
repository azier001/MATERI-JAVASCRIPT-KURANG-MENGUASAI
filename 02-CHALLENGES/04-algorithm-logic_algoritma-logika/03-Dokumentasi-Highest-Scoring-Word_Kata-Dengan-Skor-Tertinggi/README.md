# 📚 highestScoringWord - Complete Learning Guide

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║        🎯 highestScoringWord - COMPLETE LEARNING GUIDE 🎯               ║
║                                                                          ║
║         Dari Kode Original ke Refactoring & Berbagai Alternatif          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)
![Topics](https://img.shields.io/badge/Topics-String%20|%20Nested%20Loop%20|%20ASCII%20|%20Clean%20Code%20|%20Functional-blue)
![Status](https://img.shields.io/badge/Status-Complete-success)

---

## 📖 Tentang Dokumentasi Ini

Dokumentasi ini membahas fungsi **`highestScoringWord`** — mencari kata dengan skor alfabet tertinggi dari sebuah kalimat, dimana setiap huruf memiliki nilai sesuai posisinya di alfabet (`a=1, b=2, ..., z=26`). Mencakup proses pengerjaan dari awal, analisis kesalahan, refactoring bertahap, ringkasan algoritma, dan beberapa alternatif solusi.

**Cocok untuk:**
- 🎓 **Pemula** — Belajar konsep string, nested loop, dan ASCII conversion
- 💻 **Developer** — Improve code quality dan naming convention
- 🚀 **Enthusiast** — Eksplorasi berbagai pendekatan solusi functional

---

## 🎯 Apa yang Dibahas?

Fungsi menerima `str` (string kalimat), lalu mengembalikan kata dengan skor alfabet tertinggi:

```javascript
highestScoringWord('man i need a taxi up to ubud')
// → 'taxi'

highestScoringWord('what time are we climbing up the volcano')
// → 'volcano'

highestScoringWord('take me to semynak')
// → 'semynak'

highestScoringWord('')
// → ''
```

---

## 📚 Daftar Part Dokumentasi

| Part | Topik | Level |
|------|-------|-------|
| **[Part 1](docs/01-soal-dan-kriteria.md)** | Soal & Kriteria | 🌱 Pemula |
| **[Part 2](docs/02-proses-pengerjaan.md)** | Proses Pengerjaan (kode awal → kode final) | 🌱 Pemula |
| **[Part 3](docs/03-kesalahan-dan-pelajaran.md)** | Kesalahan & Pelajaran | 🌱 Pemula |
| **[Part 4](docs/04-refactoring-clean-code.md)** | Refactoring & Clean Code (nested loop + helper function) | 🌿 Menengah |
| **[Part 5](docs/05-alternatif-nested-loop-tanpa-helper-function.md)** | Alternatif `nested loop` tanpa helper function + Ringkasan Algoritma | 🌿 Menengah |
| **[Part 6](docs/06-alternatif-reduce.md)** | Alternatif `.reduce()` + Ringkasan Algoritma | 🌿 Menengah |
| **[Part 7](docs/07-alternatif-map-reduce.md)** | Alternatif `.map() + .reduce()` + Ringkasan Algoritma | 🌿 Menengah |
| **[Part 8](docs/08-perbandingan-dan-kesimpulan.md)** | Perbandingan & Kesimpulan | 🌿 Menengah |

---

## 🗺️ Roadmap Belajar

### **📚 Jalur Lengkap (Recommended)**
```
Part 1 → Part 2 → Part 3 → Part 4 → Part 5 → Part 6 → Part 7 → Part 8
```

**Hasil:**
- ✅ Memahami soal dan kriteria secara menyeluruh
- ✅ Tahu proses pengerjaan dari kode awal sampai kode final
- ✅ Memahami kesalahan umum dan cara menghindarinya
- ✅ Bisa refactoring ke clean code secara bertahap
- ✅ Mengenal berbagai alternatif solusi
- ✅ Memahami algoritma setiap versi secara detail

### **⚡ Jalur Cepat (Langsung ke kode)**
```
Part 1 → Part 4 → Part 8
```

**Hasil:**
- ✅ Memahami soal dan kriteria
- ✅ Kode final yang clean dan optimal
- ✅ Perbandingan semua solusi

---

## 📊 Quick Comparison: Semua Solusi

| Solusi | Pendekatan | Kompleksitas Waktu | Keunggulan |
|--------|-----------|-------------------|------------|
| **Refactored** | Nested loop + helper function | O(n × m) | Clean code, single responsibility |
| **Nested loop** | Semua logika dalam satu fungsi | O(n × m) | Ringkas, mudah dipahami pemula |
| **`.reduce()`** | Functional style | O(n × m) | Elegan, tanpa variabel tracker |
| **`.map() + .reduce()`** | Full functional | O(n × m) | Efisien, skor dihitung sekali |

---

## 🎮 Quick Start

### **Saya Pemula**
→ Mulai: **Part 1** lalu ikuti jalur lengkap
→ Focus: Pahami soal dan proses pengerjaan sebelum lihat alternatif

### **Saya Mau Refactor Code**
→ Langsung: **Part 4**
→ Focus: Proses refactoring step-by-step dan clean code

### **Saya Mau Lihat Semua Solusi**
→ Langsung: **Part 8**
→ Focus: Perbandingan dan kesimpulan semua versi

---

## 🧪 Test Cases Standar

```javascript
// Basic cases
highestScoringWord('man i need a taxi up to ubud')
// → 'taxi'

highestScoringWord('what time are we climbing up the volcano')
// → 'volcano'

highestScoringWord('take me to semynak')
// → 'semynak'
```

```javascript
// Edge cases
highestScoringWord('')
// → '' (input kosong)

highestScoringWord('a')
// → 'a' (hanya satu huruf)

highestScoringWord('javascript')
// → 'javascript' (hanya satu kata)
```

```javascript
// Tie cases — skor sama, pilih kata pertama
highestScoringWord('aa b')
// → 'aa'

highestScoringWord('abc cab')
// → 'abc'
```

```javascript
// Score cases
highestScoringWord('a bb ccc dddd')
// → 'dddd' (kata terpanjang memiliki skor terbesar)

highestScoringWord('wyn nyx')
// → 'nyx' (nyx=63 menang tipis atas wyn=62)
```

---

## 🤔 FAQ

<details>
<summary><strong>❓ Kenapa menggunakan <code>charCodeAt(0) - 96</code>?</strong></summary>

Karena nilai ASCII huruf kecil dimulai dari 97 (`a=97, b=98, ...`), bukan dari 1. Dengan mengurangi 96, kita mengkonversi ke nilai alfabet yang diinginkan — `a=1, b=2, ..., z=26`.

</details>

<details>
<summary><strong>❓ Kenapa inisialisasi <code>highestScore = -Infinity</code> bukan <code>0</code>?</strong></summary>

Karena `-Infinity` menjamin kata pertama **selalu** mengupdate `result` di iterasi pertama tanpa terkecuali. Jika pakai `0`, ada risiko logika tidak bekerja dengan benar untuk kasus-kasus ekstrem.

</details>

<details>
<summary><strong>❓ Kenapa pakai <code>></code> bukan <code>>=</code> untuk perbandingan skor?</strong></summary>

Karena challenge menyatakan jika dua kata punya skor sama, kembalikan kata yang **paling awal**. Dengan `>`, kondisi tidak terpenuhi saat skor sama — sehingga `result` tidak terupdate dan kata pertama tetap terpilih secara otomatis.

</details>

<details>
<summary><strong>❓ Kenapa pakai <code>!str</code> bukan <code>str === ''</code> di guard clause?</strong></summary>

Karena `!str` menangkap semua nilai falsy sekaligus — `''`, `null`, `undefined`, dan `0`. Ini lebih defensif dibanding hanya mengecek string kosong, sehingga fungsi tidak crash meski dipanggil dengan input yang tidak terduga.

</details>

<details>
<summary><strong>❓ Solusi mana yang paling baik?</strong></summary>

Tergantung konteks. Untuk belajar dan readability → **Refactored nested loop + helper function**. Untuk gaya functional yang ringkas → **`.reduce()`**. Untuk gaya full functional yang efisien → **`.map() + .reduce()`**.

</details>

<details>
<summary><strong>❓ Apa bedanya v3 <code>.reduce()</code> dengan v4 <code>.map() + .reduce()</code>?</strong></summary>

Pada v3, `getWordScore()` dipanggil dua kali per iterasi (untuk `word` dan `best`). Pada v4, `.map()` menghitung skor semua kata terlebih dahulu — masing-masing hanya sekali — lalu `.reduce()` tinggal membandingkan angka. V4 lebih efisien untuk input yang besar.

</details>

---

## 📚 Prerequisites

- ✅ JavaScript dasar (variabel, fungsi, loop)
- ✅ Pemahaman dasar string dan array
- ✅ Familiar dengan konsep iterasi

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Menganalisis kode dan mengidentifikasi area yang bisa diperbaiki
- ✅ Melakukan refactoring ke clean code secara bertahap
- ✅ Mengimplementasikan beberapa pendekatan berbeda untuk satu soal
- ✅ Memahami trade-off setiap pendekatan (readability vs efficiency)
- ✅ Memahami konversi nilai ASCII ke nilai alfabet
- ✅ Mengenal pola functional programming dengan `.map()` dan `.reduce()`

---

<div align="center">

## 🎯 Mari Mulai Belajar!

**📚 [Mulai dari Part 1 →](docs/01-soal-dan-kriteria.md)**

---

**Quick Links:**

[Part 1](docs/01-soal-dan-kriteria.md) • [Part 2](docs/02-proses-pengerjaan.md) • [Part 3](docs/03-kesalahan-dan-pelajaran.md) • [Part 4](docs/04-refactoring-clean-code.md) • [Part 5](docs/05-alternatif-nested-loop-tanpa-helper-function.md) • [Part 6](docs/06-alternatif-reduce.md) • [Part 7](docs/07-alternatif-map-reduce.md) • [Part 8](docs/08-perbandingan-dan-kesimpulan.md)

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>
