# 📚 Anagram Grouping - Complete Learning Guide

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)
![Topics](https://img.shields.io/badge/Topics-Anagram%20|%20Grouping%20|%20Map%20|%20Reduce%20|%20Array-blue)
![Status](https://img.shields.io/badge/Status-Complete-success)

---

## 📖 Tentang Dokumentasi Ini

Dokumentasi ini membahas fungsi **`anagramGrouping`** — mengelompokkan kata-kata yang merupakan anagram satu sama lain ke dalam sub-array terpisah.

Proses pengerjaannya dimulai dari eksplorasi konsep, menemukan pendekatan yang tepat, hingga menghasilkan 5 versi solusi dengan struktur data yang berbeda-beda.

> 💡 **Asal-usul:** Challenge ini dikerjakan dengan terinspirasi dari challenge `validAnagrams` yang sebelumnya sudah ada di repositori pribadi. Logika pengecekan anagram dari sana menjadi titik awal untuk membangun solusi `anagramGrouping`.

**Cocok untuk:**
- 🎓 **Pemula** — Belajar konsep pengelompokan data dengan key sorting
- 💻 **Developer** — Eksplorasi penggunaan `Map` vs Object sebagai struktur data
- 🚀 **Enthusiast** — Membandingkan berbagai pendekatan iterasi JavaScript

---

## 🤔 Kenapa Challenge Ini Penting?

Konsep pengelompokan data berdasarkan **kunci yang diturunkan** (derived key) sangat sering muncul di dunia nyata — misalnya mengelompokkan transaksi berdasarkan kategori, mengelompokkan user berdasarkan role, atau mengelompokkan produk berdasarkan tag. `anagramGrouping` adalah latihan yang bagus untuk memahami pola ini.

---

## 🎯 Apa yang Dibahas?

Fungsi menerima `words` (array of strings), lalu mengembalikan array of arrays berisi kata-kata yang merupakan anagram satu sama lain:

```javascript
anagramGrouping(['cat', 'act', 'dog', 'god', 'tac'])
// → [['cat', 'act', 'tac'], ['dog', 'god']]

anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world'])
// → [['listen', 'silent', 'enlist'], ['hello'], ['world']]

anagramGrouping([]) // → []
```

---

## 📚 Daftar Part Dokumentasi

| Part | Topik | Level |
|------|-------|-------|
| **[Part 00](docs/00-challenge-description_deskripsi-soal.md)** | Deskripsi Soal | 🌱 Pemula |
| **[Part 01](docs/01-concept-and-approach_konsep-dan-pendekatan.md)** | Konsep & Pendekatan | 🌱 Pemula |
| **[Part 02](docs/02-solution-reduce-object_solusi-reduce-objek.md)** | Solusi — `reduce` + Object | 🌿 Menengah |
| **[Part 03](docs/03-solution-foreach-object_solusi-foreach-objek.md)** | Solusi — `forEach` + Object | 🌿 Menengah |
| **[Part 04](docs/04-solution-foreach-map_solusi-foreach-map.md)** | Solusi — `forEach` + Map | 🌿 Menengah |
| **[Part 05](docs/05-solution-forof-map-documentation_solusi-forof-map-dokumentasi.md)** | Solusi — `for...of` + Map (dari dokumentasi) | 🌿 Menengah |
| **[Part 06](docs/06-solution-forof-map-ai_solusi-forof-map-ai.md)** | Solusi — `for...of` + Map (dari AI) | 🌿 Menengah |
| **[Part 07](docs/07-comparison-all-solutions_perbandingan-semua-solusi.md)** | Perbandingan Semua Solusi | 🌿 Menengah |
| **[Part 08](docs/08-edge-cases_kasus-tepi.md)** | Edge Cases | 🌱 Pemula |
| **[Part 09](docs/09-algorithm-summary_ringkasan-algoritma.md)** | Ringkasan Algoritma | 🌿 Menengah |

---

## 🗺️ Roadmap Belajar

### **📚 Jalur Lengkap (Recommended)**
```
Part 00 → Part 01 → Part 02 → Part 03 → Part 04 → Part 05 → Part 06 → Part 07 → Part 08 → Part 09
```

**Hasil:**
- ✅ Memahami soal dan struktur data secara menyeluruh
- ✅ Memahami konsep derived key dari sorting huruf
- ✅ Bisa mengimplementasikan semua 5 versi solusi
- ✅ Memahami perbedaan Object vs Map sebagai struktur data
- ✅ Bisa membandingkan dan memilih pendekatan yang tepat

### **⚡ Jalur Cepat (Langsung ke kode)**
```
Part 00 → Part 02 → Part 07
```

**Hasil:**
- ✅ Memahami soal
- ✅ Langsung ke solusi utama
- ✅ Perbandingan semua solusi

---

## 📊 Quick Comparison: Semua Solusi

| Solusi | Loop | Struktur Data | Return | Keunggulan |
|--------|------|---------------|--------|------------|
| **Versi 1 — `reduce` + Object** | `reduce` | `{}` | `Object.values()` | Ringkas, functional |
| **Versi 2 — `forEach` + Object** | `forEach` | `{}` | `Object.values()` | Mudah dibaca pemula |
| **Versi 3 — `forEach` + Map** | `forEach` | `new Map()` | `[...map.values()]` | Pakai struktur data modern |
| **Versi 4 — `for...of` + Map** | `for...of` | `new Map()` | `[...map.values()]` | Eksplisit, if/else jelas |
| **Versi 5 — `for...of` + Map** | `for...of` | `new Map()` | `[...map.values()]` | Mirip Versi 4, lebih ringkas |

---

## 🎮 Quick Start

### **Saya Pemula**
→ Mulai: **[Part 00](docs/00-challenge-description_deskripsi-soal.md)** lalu ikuti jalur lengkap
→ Focus: Pahami dulu konsep derived key sebelum lihat kodenya

### **Saya Mau Langsung Lihat Kode**
→ Langsung: **[Part 02](docs/02-solution-reduce-object_solusi-reduce-objek.md)**
→ Focus: Versi paling ringkas dengan `reduce`

### **Saya Mau Lihat Semua Solusi**
→ Langsung: **[Part 07](docs/07-comparison-all-solutions_perbandingan-semua-solusi.md)**
→ Focus: Perbandingan dan kesimpulan semua pendekatan

---

## 🧪 Test Cases Standar

```javascript
// Edge case — array kosong
console.log(anagramGrouping([]));
// → []
```

```javascript
// Normal case 1 — ada anagram dan non-anagram
console.log(anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']));
// → [['cat', 'act', 'tac'], ['dog', 'god']]
```

```javascript
// Normal case 2 — ada kata yang berdiri sendiri
console.log(anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world']));
// → [['listen', 'silent', 'enlist'], ['hello'], ['world']]
```

---

## 🤔 FAQ

<details>
<summary><strong>❓ Apa itu anagram?</strong></summary>

Anagram adalah kata yang terbentuk dari huruf-huruf yang sama tapi disusun dalam urutan berbeda. Contoh: `'cat'`, `'act'`, dan `'tac'` semuanya terdiri dari huruf `a`, `c`, `t` — jadi ketiganya adalah anagram satu sama lain.

</details>

<details>
<summary><strong>❓ Kenapa huruf di-sort untuk dijadikan key?</strong></summary>

Karena kata-kata yang merupakan anagram satu sama lain akan menghasilkan susunan huruf yang **identik** setelah di-sort. Misalnya `'cat'` → `'act'`, `'tac'` → `'act'` — keduanya menghasilkan key yang sama `'act'`, sehingga bisa dikelompokkan bersama.

</details>

<details>
<summary><strong>❓ Apa bedanya Object `{}` dengan Map?</strong></summary>

`Object {}` adalah struktur data bawaan JavaScript yang sudah familiar. `Map` adalah struktur data modern yang lebih powerful — key-nya bisa bertipe apa saja (bukan hanya string), dan punya method seperti `.has()`, `.get()`, `.set()`. Untuk challenge ini keduanya menghasilkan output yang sama.

</details>

<details>
<summary><strong>❓ Kenapa tidak pakai checkAnagram() seperti validAnagrams?</strong></summary>

Pendekatan `checkAnagram()` membandingkan dua kata satu per satu — artinya untuk setiap kata kita perlu membandingkannya dengan semua kata lain. Ini kurang efisien untuk grouping. Pendekatan sorting huruf jauh lebih efisien karena cukup satu operasi sort per kata untuk mendapatkan key pengelompokan.

</details>

<details>
<summary><strong>❓ Solusi mana yang paling baik?</strong></summary>

Tergantung konteks. Untuk kode ringkas dan functional → **Versi 1 (reduce)**. Untuk kemudahan membaca → **Versi 2 (forEach + Object)**. Untuk eksplorasi struktur data modern → **Versi 3–5 (Map)**. Semua versi menghasilkan output yang sama dan punya kompleksitas O(n).

</details>

---

## 📚 Prerequisites

- ✅ JavaScript dasar (variabel, fungsi, loop)
- ✅ Pemahaman dasar array dan object
- ✅ Familiar dengan `sort()`, `split()`, `join()`
- ✅ Pernah menggunakan `reduce` atau `forEach`

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Memahami konsep derived key untuk pengelompokan data
- ✅ Menggunakan sorting huruf sebagai teknik identifikasi anagram
- ✅ Mengimplementasikan grouping dengan `reduce`, `forEach`, dan `for...of`
- ✅ Memahami perbedaan Object dan Map sebagai struktur penampung data
- ✅ Menggunakan `Object.values()` dan `Map.values()` untuk mengubah hasil ke array
- ✅ Memahami trade-off setiap pendekatan

---

<div align="center">

## 🎯 Mari Mulai Belajar!

**📚 [Mulai dari Part 00 →](docs/00-challenge-description_deskripsi-soal.md)**

---

**Quick Links:**

[Part 00](docs/00-challenge-description_deskripsi-soal.md) • [Part 01](docs/01-concept-and-approach_konsep-dan-pendekatan.md) • [Part 02](docs/02-solution-reduce-object_solusi-reduce-objek.md) • [Part 03](docs/03-solution-foreach-object_solusi-foreach-objek.md) • [Part 04](docs/04-solution-foreach-map_solusi-foreach-map.md) • [Part 05](docs/05-solution-forof-map-documentation_solusi-forof-map-dokumentasi.md) • [Part 06](docs/06-solution-forof-map-ai_solusi-forof-map-ai.md) • [Part 07](docs/07-comparison-all-solutions_perbandingan-semua-solusi.md) • [Part 08](docs/08-edge-cases_kasus-tepi.md) • [Part 09](docs/09-algorithm-summary_ringkasan-algoritma.md)

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>