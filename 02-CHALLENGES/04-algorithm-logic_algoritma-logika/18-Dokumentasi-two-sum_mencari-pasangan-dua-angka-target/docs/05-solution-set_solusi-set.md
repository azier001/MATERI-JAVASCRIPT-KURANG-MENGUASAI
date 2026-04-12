# 🟠 Part 05 — Solusi: Set

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | ⚠️ Kelemahan | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-kelemahan-set--indexof) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja Set untuk mencari pasangan
- ✅ Memahami perbedaan Set dan Map dalam konteks Two Sum
- ✅ Memahami kelemahan `indexOf()` untuk input dengan duplikat
- ✅ Siap untuk melihat perbandingan semua solusi di Part 06

---

## 📄 Kode

```javascript
function twoSum(nums, target) {
  const numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }
    
    numSet.add(nums[i]);
  }

  return [];
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Menyiapkan Set sebagai penampung

```javascript
const numSet = new Set()
```

Set adalah struktur data yang hanya menyimpan **nilai unik** — tanpa key, tanpa indeks. Berbeda dengan Map yang menyimpan pasangan key-value.

---

### 2. Menghitung complement

```javascript
const complement = target - nums[i];
```

Sama seperti versi HashMap — complement adalah angka yang kita butuhkan sebagai pasangan.

---

### 3. Cek apakah complement ada di Set

```javascript
if (numSet.has(complement)) {
  return [nums.indexOf(complement), i];
}
```

- `numSet.has(complement)` → cek apakah complement sudah tersimpan di Set
- `nums.indexOf(complement)` → karena Set tidak menyimpan indeks, kita harus **cari ulang** indeks complement di array asli menggunakan `indexOf()`

---

### 4. Simpan angka saat ini ke Set

```javascript
numSet.add(nums[i]);
```

Set hanya menyimpan **nilai** — tidak ada indeks yang tersimpan. Ini perbedaan utama dengan Map.

---

## 📊 Visualisasi Proses

Kita trace step by step untuk array `[2, 7, 11, 15]` target `9`:

```
Array:  [ 2,  7, 11, 15 ]
Index:    0   1   2   3
Target: 9
Set:    {}
```

```
iterasi i=0
┌─────────────────────────────────────┐
│ nums[i]     = 2                     │
│ complement  = 9 - 2 = 7             │
│                                     │
│ set.has(7)? ❌ belum ada            │
│                                     │
│ set.add(2) → simpan nilai saja      │
└─────────────────────────────────────┘
Set: { 2 }
```

```
iterasi i=1
┌─────────────────────────────────────┐
│ nums[i]     = 7                     │
│ complement  = 9 - 7 = 2             │
│                                     │
│ set.has(2)? ✅ ADA!                 │
│                                     │
│ nums.indexOf(2) → cari 2 di array   │
│ → ketemu di index 0                 │
│ return [0, 1] ← SELESAI!           │
└─────────────────────────────────────┘
Set: { 2 }
```

```
HASIL
┌─────────────────────────────────────┐
│ index 0 → angka 2                   │
│ index 1 → angka 7                   │
│ 2 + 7 = 9 ✅                        │
│ return [0, 1]                       │
└─────────────────────────────────────┘
```

---

Sekarang bandingkan Set vs Map secara visual:

```
VERSI SET                         VERSI MAP
┌───────────────────┐             ┌───────────────────┐
│ Set: { 2 }        │             │ Map: { 2→0 }      │
│                   │             │                   │
│ Simpan:           │             │ Simpan:           │
│ nilai saja        │             │ nilai + indeks    │
│                   │             │                   │
│ Ambil indeks?     │             │ Ambil indeks?     │
│ → indexOf(2)      │             │ → map.get(2)      │
│ → cari ulang ❌   │             │ → langsung! ✅    │
└───────────────────┘             └───────────────────┘
```

---

## ⚠️ Kelemahan Set + indexOf()

`indexOf()` selalu mencari dari **kiri** dan mengembalikan index **pertama** yang ditemukan. Ini bisa bermasalah kalau ada nilai duplikat di array.

Contoh kasus yang bisa gagal — array `[5, 3, 3]` target `6`:

```
iterasi i=0 → complement = 1, set.add(5) → Set: { 5 }
iterasi i=1 → complement = 3, set.add(3) → Set: { 5, 3 }
iterasi i=2 → complement = 3, set.has(3)? ✅
  → nums.indexOf(3) = 1  ✅ kebetulan benar

Tapi bayangkan array [3, 5, 3] target 8:
iterasi i=0 → complement = 5, set.add(3) → Set: { 3 }
iterasi i=1 → complement = 3, set.has(3)? ✅
  → nums.indexOf(3) = 0  ✅ benar

Array [4, 3, 3] target 6:
iterasi i=0 → complement = 2, set.add(4) → Set: { 4 }
iterasi i=1 → complement = 3, set.add(3) → Set: { 4, 3 }
iterasi i=2 → complement = 3, set.has(3)? ✅
  → nums.indexOf(3) = 1  ✅ benar (kebetulan)
```

Untuk challenge ini constraint menyatakan **input integer adalah unik** — jadi `indexOf()` kebetulan selalu benar. Tapi di dunia nyata, kalau ada duplikat, Set bisa mengembalikan indeks yang **salah**.

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ Pakai Set untuk input dengan duplikat — bisa salah!
// Set + indexOf() tidak aman jika ada nilai yang sama di array
const arr = [3, 1, 3]  // ada duplikat angka 3
// indexOf(3) selalu return 0, padahal pasangan yang benar bisa di index 2
```

```javascript
// ❌ set.add sebelum set.has — bisa cocok dengan diri sendiri!
numSet.add(nums[i])        // simpan dulu
if (numSet.has(complement)) // baru cek → SALAH!
```

---

## 💡 Insight

> **Kapan pakai Set, kapan pakai Map?**
> Untuk Two Sum, **Map lebih aman** karena menyimpan indeks secara langsung. Set cocok dipakai kalau kita hanya perlu mengecek keberadaan nilai — tanpa perlu tahu posisinya. Karena Two Sum butuh indeks, Map adalah pilihan yang lebih tepat.

> **Kenapa Set tetap dibahas kalau ada kelemahannya?**
> Karena untuk challenge ini dengan constraint "input integer unik", Set tetap menghasilkan output yang benar. Memahami kelemahannya justru penting — agar kamu tahu kapan Set aman dipakai dan kapan tidak.

> **`set.add()` vs `map.set()`**
> `set.add(value)` hanya menyimpan nilai. `map.set(key, value)` menyimpan pasangan key-value. Untuk Two Sum, kita butuh menyimpan indeks — jadi `map.set()` lebih tepat.

---

## 🧪 Test Cases

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

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 04: Solusi — HashMap (AI)](04-solution-hashmap-ai_solusi-hashmap-ai.md)**
- **📖 [Lanjut ke Part 06: Perbandingan Semua Solusi →](06-comparison-all-solutions_perbandingan-semua-solusi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>