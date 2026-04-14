# 🟢 Part 04 — Solusi: Set O(n) Ringkas

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🔄 Perbedaan | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-perbedaan-dengan-part-03) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami versi ringkas dari solusi Set O(n)
- ✅ Memahami cara kerja `Math.max()` sebagai pengganti `if`
- ✅ Memahami kenapa `longestLength = 0` lebih elegan dari `longestLength = 1`
- ✅ Siap untuk melihat perbandingan semua solusi di Part 05

---

## 📄 Kode

```javascript
function longestConsecutiveSequence(nums) {
  const numSet = new Set(nums)
  let longestSequence = 0

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentSequence = 1

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentSequence++
      }

      longestSequence = Math.max(longestSequence, currentSequence)
    }
  }

  return longestSequence
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Tidak ada guard clause — kenapa?

Versi ini tidak memerlukan `if (!nums.length) return 0` karena `longestSequence` diinisialisasi dengan `0`. Kalau array kosong, Set juga kosong, loop tidak jalan sama sekali, dan `longestSequence` tetap `0` — yang memang nilai yang benar untuk array kosong.

---

### 2. longestSequence dimulai dari 0

```javascript
let longestSequence = 0
```

Berbeda dengan Part 03 yang menggunakan `longestLength = 1`, versi ini menggunakan `0` sebagai nilai awal. Ini lebih elegan karena:
- Array kosong otomatis return `0` tanpa guard clause
- Nilai `0` mencerminkan "belum ada urutan yang ditemukan"

---

### 3. Math.max() menggantikan if

```javascript
longestSequence = Math.max(longestSequence, currentSequence)
```

Menggantikan kondisi `if (currentLength > longestLength)` dari Part 03. Hasilnya identik, tapi lebih ringkas — `Math.max()` secara otomatis mengambil nilai terbesar dari dua angka.

---

## 📊 Visualisasi Proses

```
Input: [100, 4, 200, 1, 3, 2]

Step 1: BUAT SET
─────────────────────────────────────
numSet = {100, 4, 200, 1, 3, 2}


Step 2: LOOP SETIAP ANGKA DI SET
─────────────────────────────────────

num=100: has(99)? ❌ → AWAL URUTAN
         currentNum=100, currentSequence=1
         while has(101)? ❌ → stop
         longestSequence = Math.max(0, 1) = 1

num=4:   has(3)? ✅ → bukan awal, skip

num=200: has(199)? ❌ → AWAL URUTAN
         currentNum=200, currentSequence=1
         while has(201)? ❌ → stop
         longestSequence = Math.max(1, 1) = 1

num=1:   has(0)? ❌ → AWAL URUTAN
         currentNum=1, currentSequence=1
         while has(2)? ✅ → currentNum=2, currentSequence=2
         while has(3)? ✅ → currentNum=3, currentSequence=3
         while has(4)? ✅ → currentNum=4, currentSequence=4
         while has(5)? ❌ → stop
         longestSequence = Math.max(1, 4) = 4

num=3:   has(2)? ✅ → bukan awal, skip

num=2:   has(1)? ✅ → bukan awal, skip


Step 3: RETURN
─────────────────────────────────────
longestSequence = 4 ✅
```

---

## 🔄 Perbedaan dengan Part 03

Logika dan struktur kedua versi **identik** — hanya ada tiga perbedaan kecil:

| | Part 03 | Part 04 (Ringkas) |
|---|---|---|
| **Guard clause** | `if (!nums.length) return 0` | Tidak ada |
| **Nilai awal** | `longestLength = 1` | `longestSequence = 0` |
| **Update longest** | `if (currentLength > longestLength)` | `Math.max(longestSequence, currentSequence)` |
| **Nama variabel** | `longestLength`, `currentLength` | `longestSequence`, `currentSequence` |

Keduanya menghasilkan output yang sama untuk semua input. Pilihan antara keduanya adalah soal preferensi gaya penulisan.

---

## 💡 Insight

> **Mana yang lebih baik — Part 03 atau Part 04?**
> Keduanya sama-sama benar dan O(n). Part 03 lebih eksplisit — guard clause dan kondisi `if` lebih mudah dibaca pemula. Part 04 lebih ringkas — cocok kalau sudah familiar dengan `Math.max()` dan ingin kode yang lebih pendek.

> **Kenapa `longestSequence = 0` bisa menggantikan guard clause?**
> Karena kalau array kosong, Set kosong, loop tidak jalan, dan `longestSequence` tetap `0`. Nilai `0` sudah menjadi jawaban yang benar untuk array kosong — tidak perlu pengecekan terpisah.

> **Apakah `Math.max()` lebih lambat dari `if`?**
> Tidak secara signifikan. `Math.max()` adalah built-in function JavaScript yang sangat dioptimalkan. Perbedaan performanya bisa diabaikan untuk keperluan sehari-hari.

---

## 🧪 Test Cases

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

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03: Solusi — Set O(n)](03-solution-set-on_solusi-set-on.md)**
- **📖 [Lanjut ke Part 05: Perbandingan Semua Solusi →](05-comparison-all-solutions_perbandingan-semua-solusi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>