# 📚 Two Sum - Complete Learning Guide

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)
![Topics](https://img.shields.io/badge/Topics-Two%20Sum%20|%20HashMap%20|%20Nested%20Loop%20|%20Set%20|%20Array-blue)
![Status](https://img.shields.io/badge/Status-Complete-success)

---

## 📖 Tentang Dokumentasi Ini

Dokumentasi ini membahas fungsi **`twoSum`** — mencari dua angka dalam array yang jika dijumlahkan menghasilkan nilai target, lalu mengembalikan indeks keduanya.

Proses pengerjaannya dimulai dari mencoba mandiri, menemukan bug, memperbaiki bertahap, hingga menghasilkan 4 versi solusi dengan pendekatan yang berbeda-beda.

> 💡 **Asal-usul:** Challenge ini diambil dari repositori [traversy-js-challenges](https://github.com/bradtraversy/traversy-js-challenges/tree/main/06-hash-tables-maps-sets/09-two-sum) oleh Brad Traversy. Dikerjakan secara mandiri, lalu diperbaiki bertahap dari versi awal yang masih banyak bug.

**Cocok untuk:**
- 🎓 **Pemula** — Belajar konsep nested loop dan pencarian pasangan dalam array
- 💻 **Developer** — Eksplorasi penggunaan `Map` vs `Set` vs Nested Loop
- 🚀 **Enthusiast** — Membandingkan berbagai pendekatan dari O(n²) ke O(n)

---

## 🎯 Apa yang Dibahas?

Fungsi menerima `nums` (array of integers) dan `target` (integer), lalu mengembalikan array berisi dua indeks yang nilainya jika dijumlahkan sama dengan target:

```javascript
twoSum([2, 7, 11, 15], 9)
// → [0, 1] (2 + 7 = 9)

twoSum([3, 2, 4], 6)
// → [1, 2] (2 + 4 = 6)

twoSum([3, 3], 6)
// → [0, 1] (3 + 3 = 6)
```

---

## 📚 Daftar Part Dokumentasi

| Part | Topik | Level |
|------|-------|-------|
| **[Part 00](docs/00-challenge-description_deskripsi-soal.md)** | Deskripsi Soal | 🌱 Pemula |
| **[Part 01](docs/01-concept-and-approach_konsep-dan-pendekatan.md)** | Konsep & Pendekatan | 🌱 Pemula |
| **[Part 02](docs/02-solution-nested-loop_solusi-nested-loop.md)** | Solusi — Nested Loop | 🌿 Menengah |
| **[Part 03](docs/03-solution-hashmap_solusi-hashmap.md)** | Solusi — HashMap (versi sendiri) | 🌿 Menengah |
| **[Part 04](docs/04-solution-hashmap-ai_solusi-hashmap-ai.md)** | Solusi — HashMap (versi AI) | 🌿 Menengah |
| **[Part 05](docs/05-solution-set_solusi-set.md)** | Solusi — Set | 🌿 Menengah |
| **[Part 06](docs/06-comparison-all-solutions_perbandingan-semua-solusi.md)** | Perbandingan Semua Solusi | 🌿 Menengah |
| **[Part 07](docs/07-pitfalls_jebakan-umum.md)** | Pitfalls & Jebakan Umum | 🌱 Pemula |
| **[Part 08](docs/08-test-cases_pengujian-semua-versi.md)** | Test Cases | 🌿 Menengah |
| **[Part 09](docs/09-algorithm-summary_ringkasan-algoritma.md)** | Ringkasan Algoritma | 🌿 Menengah |

---

## 🗺️ Roadmap Belajar

### **📚 Jalur Lengkap (Recommended)**
```
Part 00 → Part 01 → Part 02 → Part 03 → Part 04 → Part 05 → Part 06 → Part 07 → Part 08 → Part 09
```

**Hasil:**
- ✅ Memahami soal dan struktur data secara menyeluruh
- ✅ Memahami konsep complement dan kenapa `j = i + 1`
- ✅ Bisa mengimplementasikan semua 4 versi solusi
- ✅ Memahami perbedaan Map vs Set sebagai struktur data
- ✅ Bisa membandingkan dan memilih pendekatan yang tepat

### **⚡ Jalur Cepat (Langsung ke kode)**
```
Part 00 → Part 02 → Part 06
```

**Hasil:**
- ✅ Memahami soal
- ✅ Langsung ke solusi utama
- ✅ Perbandingan semua solusi

---

## 📊 Quick Comparison: Semua Solusi

| Solusi | Loop | Struktur Data | Complexity | Keunggulan |
|--------|------|---------------|------------|------------|
| **Versi 1 — Nested Loop** | `for` + `for` | — | O(n²) | Mudah dipahami pemula |
| **Versi 2 — HashMap (sendiri)** | `for` | `new Map()` | O(n) | Efisien, simpel |
| **Versi 3 — HashMap (AI)** | `for` | `new Map()` | O(n) | Lebih readable dengan variabel `current` |
| **Versi 4 — Set** | `for` | `new Set()` | O(n) | Lebih ringkas, tapi ada kelemahan |

---

## 🎮 Quick Start

### **Saya Pemula**
→ Mulai: **[Part 00](docs/00-challenge-description_deskripsi-soal.md)** lalu ikuti jalur lengkap
→ Focus: Pahami dulu konsep complement sebelum lihat kodenya

### **Saya Mau Langsung Lihat Kode**
→ Langsung: **[Part 02](docs/02-solution-nested-loop_solusi-nested-loop.md)**
→ Focus: Versi paling mudah dipahami dengan nested loop

### **Saya Mau Lihat Semua Solusi**
→ Langsung: **[Part 06](docs/06-comparison-all-solutions_perbandingan-semua-solusi.md)**
→ Focus: Perbandingan dan kesimpulan semua pendekatan

---

## 🧪 Test Cases Standar

```javascript
// Basic cases
console.log(twoSum([2, 7, 11, 15], 9));  // → [0, 1]
console.log(twoSum([3, 2, 4], 6));        // → [1, 2]
console.log(twoSum([3, 3], 6));           // → [0, 1]

// Negative numbers
console.log(twoSum([-1, -2, -3, -4, -5], -8));  // → [2, 4]
console.log(twoSum([-10, 20, 10, -20], 0));      // → [0, 2]

// Edge cases
console.log(twoSum([0, 4, 3, 0], 0));   // → [0, 3]
console.log(twoSum([1, 2], 3));          // → [0, 1]

// Tidak ada pasangan
console.log(twoSum([1, 2, 3], 100));    // → []
```

---

## 🤔 FAQ

<details>
<summary><strong>❓ Apa itu complement?</strong></summary>

Complement adalah angka yang kita **butuhkan** sebagai pasangan dari angka saat ini. Rumusnya sederhana: `complement = target - nums[i]`. Misalnya target `9` dan angka saat ini `2`, maka complement-nya adalah `9 - 2 = 7` — kita butuh angka `7` sebagai pasangan.

</details>

<details>
<summary><strong>❓ Kenapa j dimulai dari i + 1, bukan 0?</strong></summary>

Karena kita mencari **pasangan unik** — dua elemen yang berbeda posisi. Kalau `j` mulai dari `0`, bisa terjadi `i` dan `j` menunjuk ke index yang sama (pasangan diri sendiri), atau menemukan kombinasi yang sama dua kali. Dengan `j = i + 1`, setiap pasangan hanya ditemukan sekali.

</details>

<details>
<summary><strong>❓ Apa bedanya Map dengan Set?</strong></summary>

`Map` menyimpan pasangan **key-value** — kita bisa simpan angka sekaligus indeksnya. `Set` hanya menyimpan **nilai unik** tanpa indeks — akibatnya kita harus pakai `indexOf()` untuk mencari indeks, yang bisa bermasalah jika ada nilai duplikat di array.

</details>

<details>
<summary><strong>❓ Kenapa versi HashMap lebih efisien dari Nested Loop?</strong></summary>

Nested Loop mengecek setiap elemen dengan semua elemen lainnya — O(n²). Untuk array 1 juta elemen, bisa butuh 1 triliun operasi. HashMap hanya loop sekali — O(n). Untuk array yang sama, cukup 1 juta operasi. HashMap **menukar memori dengan kecepatan** — ini disebut time-space trade-off.

</details>

<details>
<summary><strong>❓ Solusi mana yang paling baik?</strong></summary>

Tergantung konteks. Untuk kemudahan memahami → **Versi 1 (Nested Loop)**. Untuk efisiensi → **Versi 2 atau 3 (HashMap)**. Versi 4 (Set) valid untuk input unik, tapi kurang aman untuk input dengan duplikat. Selengkapnya di **[Part 06](docs/06-comparison-all-solutions_perbandingan-semua-solusi.md)**.

</details>

---

## 📚 Prerequisites

- ✅ JavaScript dasar (variabel, fungsi, loop)
- ✅ Pemahaman dasar array dan index
- ✅ Familiar dengan `for` loop dan nested loop
- ✅ Pernah menggunakan `Map` atau `Set` (opsional)

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Memahami konsep complement untuk mencari pasangan angka
- ✅ Mengimplementasikan solusi dengan nested loop, Map, dan Set
- ✅ Memahami perbedaan Map dan Set sebagai struktur data
- ✅ Memahami konsep Time & Space Complexity (O(n) vs O(n²))
- ✅ Memahami konsep time-space trade-off
- ✅ Mengenali dan menghindari pitfalls umum di challenge ini

---

<div align="center">

## 🎯 Mari Mulai Belajar!

**📚 [Mulai dari Part 00 →](docs/00-challenge-description_deskripsi-soal.md)**

---

**Quick Links:**

[Part 00](docs/00-challenge-description_deskripsi-soal.md) • [Part 01](docs/01-concept-and-approach_konsep-dan-pendekatan.md) • [Part 02](docs/02-solution-nested-loop_solusi-nested-loop.md) • [Part 03](docs/03-solution-hashmap_solusi-hashmap.md) • [Part 04](docs/04-solution-hashmap-ai_solusi-hashmap-ai.md) • [Part 05](docs/05-solution-set_solusi-set.md) • [Part 06](docs/06-comparison-all-solutions_perbandingan-semua-solusi.md) • [Part 07](docs/07-pitfalls_jebakan-umum.md) • [Part 08](docs/08-test-cases_pengujian-semua-versi.md) • [Part 09](docs/09-algorithm-summary_ringkasan-algoritma.md)

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>