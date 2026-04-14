# 📚 Longest Consecutive Sequence - Complete Learning Guide

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)
![Topics](https://img.shields.io/badge/Topics-Sorting%20|%20Set%20|%20Array%20|%20Consecutive%20Sequence-blue)
![Status](https://img.shields.io/badge/Status-Complete-success)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-45--60%20minutes-blue)

---

## 📖 Tentang Dokumentasi Ini

Dokumentasi ini membahas fungsi **`longestConsecutiveSequence`** — mencari panjang urutan bilangan bulat berurutan terpanjang dalam sebuah array yang tidak terurut.

Proses pengerjaannya dimulai dari bimbingan bertahap, menemukan bug, memperbaiki langkah demi langkah, hingga menghasilkan 3 versi solusi dengan pendekatan yang berbeda-beda.

**Cocok untuk:**
- 🎓 **Pemula** — Belajar konsep sorting dan pencarian urutan dalam array
- 💻 **Developer** — Eksplorasi penggunaan `Set` sebagai struktur data yang efisien
- 🚀 **Enthusiast** — Membandingkan pendekatan dari O(n log n) ke O(n)

---

## 🎯 Apa yang Dibahas?

Fungsi menerima `nums` (array of integers) lalu mengembalikan panjang urutan bilangan bulat berurutan terpanjang:

```javascript
longestConsecutiveSequence([100, 4, 200, 1, 3, 2]);
// → 4 (urutan: [1, 2, 3, 4])
```

```javascript
longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1]);
// → 10 (urutan: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

```javascript
longestConsecutiveSequence([]);
// → 0 (array kosong)
```

```javascript
longestConsecutiveSequence([5]);
// → 1 (satu elemen)
```

---

## 📚 Daftar Part Dokumentasi

| Part | Topik | Level |
|------|-------|-------|
| **[Part 00](docs/00-challenge-description_deskripsi-soal.md)** | Deskripsi Soal | 🌱 Pemula |
| **[Part 01](docs/01-concept-and-approach_konsep-dan-pendekatan.md)** | Konsep & Pendekatan | 🌱 Pemula |
| **[Part 02](docs/02-solution-sorting-on-log-n_solusi-sorting-on-log-n.md)** | Solusi — Sorting O(n log n) | 🌿 Menengah |
| **[Part 03](docs/03-solution-set-on_solusi-set-on.md)** | Solusi — Set O(n) | 🌿 Menengah |
| **[Part 04](docs/04-solution-set-on-concise_solusi-set-on-ringkas.md)** | Solusi — Set O(n) Ringkas | 🌿 Menengah |
| **[Part 05](docs/05-comparison-all-solutions_perbandingan-semua-solusi.md)** | Perbandingan Semua Solusi | 🌿 Menengah |
| **[Part 06](docs/06-pitfalls_jebakan-umum.md)** | Pitfalls & Jebakan Umum | 🌱 Pemula |
| **[Part 07](docs/07-test-cases_pengujian-semua-versi.md)** | Test Cases | 🌿 Menengah |

---

## 🗺️ Roadmap Belajar

### **📚 Jalur Lengkap (Recommended)**
```
Part 00 → Part 01 → Part 02 → Part 03 → Part 04 → Part 05 → Part 06 → Part 07
```

**Hasil:**
- ✅ Memahami soal dan struktur data secara menyeluruh
- ✅ Memahami konsep "awal urutan" sebagai ide kunci
- ✅ Bisa mengimplementasikan semua 3 versi solusi
- ✅ Memahami perbedaan Sorting vs Set sebagai pendekatan
- ✅ Bisa membandingkan dan memilih pendekatan yang tepat

### **⚡ Jalur Cepat (Langsung ke kode)**
```
Part 00 → Part 02 → Part 05
```

**Hasil:**
- ✅ Memahami soal
- ✅ Langsung ke solusi utama
- ✅ Perbandingan semua solusi

---

## 📊 Quick Comparison: Semua Solusi

| Solusi | Pendekatan | Struktur Data | Complexity | Keunggulan |
|--------|-----------|---------------|------------|------------|
| **Versi 1 — Sorting** | Sort + Loop | — | O(n log n) | Mudah dipahami pemula |
| **Versi 2 — Set** | Set + While | `new Set()` | O(n) | Efisien, eksplisit |
| **Versi 3 — Set Ringkas** | Set + While | `new Set()` | O(n) | Lebih ringkas dengan `Math.max` |

---

## 🎮 Quick Start

### **Saya Pemula**
→ Mulai: **[Part 00](docs/00-challenge-description_deskripsi-soal.md)** lalu ikuti jalur lengkap
→ Focus: Pahami dulu konsep "awal urutan" sebelum lihat kodenya

### **Saya Mau Langsung Lihat Kode**
→ Langsung: **[Part 02](docs/02-solution-sorting-on-log-n_solusi-sorting-on-log-n.md)**
→ Focus: Versi paling mudah dipahami dengan sorting

### **Saya Mau Lihat Semua Solusi**
→ Langsung: **[Part 05](docs/05-comparison-all-solutions_perbandingan-semua-solusi.md)**
→ Focus: Perbandingan dan kesimpulan semua pendekatan

---

## 🧪 Test Cases Standar

```javascript
// Basic cases
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));          // → 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1])); // → 10
```

```javascript
// Edge cases
console.log(longestConsecutiveSequence([]));   // → 0
console.log(longestConsecutiveSequence([5]));  // → 1
```

```javascript
// Duplicate numbers
console.log(longestConsecutiveSequence([1, 2, 2, 3])); // → 3
```

---

## 🤔 FAQ

<details>
<summary><strong>❓ Apa itu consecutive sequence?</strong></summary>

Consecutive sequence adalah urutan bilangan bulat yang berurutan — setiap angka berikutnya selisihnya tepat `1` dari angka sebelumnya. Contoh: `[1, 2, 3, 4]` adalah consecutive sequence, sedangkan `[1, 3, 5]` bukan karena selisihnya `2`.

</details>

<details>
<summary><strong>❓ Kenapa array input tidak perlu terurut?</strong></summary>

Challenge ini sengaja memberikan array yang acak untuk menguji kemampuan kita menemukan urutan tanpa mengandalkan posisi elemen. Solusi Sorting mengatasi ini dengan mengurutkan dulu, sedangkan solusi Set mengatasi ini dengan memanfaatkan kemampuan `has()` yang O(1).

</details>

<details>
<summary><strong>❓ Apa bedanya solusi Sorting dan Set?</strong></summary>

Sorting mengurutkan array dulu lalu membandingkan elemen yang berdekatan — O(n log n). Set menyimpan semua angka lalu mencari titik awal urutan dan menghitung panjangnya ke depan — O(n). Set lebih cepat tapi butuh memori ekstra untuk menyimpan data di Set.

</details>

<details>
<summary><strong>❓ Bagaimana cara menangani duplikat?</strong></summary>

Solusi Sorting menangani duplikat dengan `else if (diff === 0) continue` — angka duplikat di-skip. Solusi Set menangani duplikat secara otomatis karena Set hanya menyimpan nilai unik.

</details>

<details>
<summary><strong>❓ Solusi mana yang paling baik?</strong></summary>

Tergantung konteks. Untuk kemudahan memahami → **Versi 1 (Sorting)**. Untuk efisiensi → **Versi 2 atau 3 (Set)**. Selengkapnya di **[Part 05](docs/05-comparison-all-solutions_perbandingan-semua-solusi.md)**.

</details>

---

## 📚 Prerequisites

- ✅ JavaScript dasar (variabel, fungsi, loop)
- ✅ Pemahaman dasar array dan index
- ✅ Familiar dengan `for` loop dan `while` loop
- ✅ Pernah menggunakan `Set` (opsional)

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Memahami konsep consecutive sequence dan cara menemukannya
- ✅ Mengimplementasikan solusi dengan Sorting dan Set
- ✅ Memahami cara kerja `Set` sebagai struktur data
- ✅ Memahami konsep Time & Space Complexity (O(n) vs O(n log n))
- ✅ Mengenali dan menghindari pitfalls umum di challenge ini

---

<div align="center">

## 🎯 Mari Mulai Belajar!

**📚 [Mulai dari Part 00 →](docs/00-challenge-description_deskripsi-soal.md)**

---

**Quick Links:**

[Part 00](docs/00-challenge-description_deskripsi-soal.md) • [Part 01](docs/01-concept-and-approach_konsep-dan-pendekatan.md) • [Part 02](docs/02-solution-sorting-on-log-n_solusi-sorting-on-log-n.md) • [Part 03](docs/03-solution-set-on_solusi-set-on.md) • [Part 04](docs/04-solution-set-on-concise_solusi-set-on-ringkas.md) • [Part 05](docs/05-comparison-all-solutions_perbandingan-semua-solusi.md) • [Part 06](docs/06-pitfalls_jebakan-umum.md) • [Part 07](docs/07-test-cases_pengujian-semua-versi.md)

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>