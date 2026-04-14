# ⚠️ Part 06 — Pitfalls & Jebakan Umum

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| ⚠️ Sorting | ⚠️ Set | ⚠️ Edge Cases |
|:----------:|:------:|:-------------:|
| [Jump](#-pitfalls-solusi-sorting) | [Jump](#-pitfalls-solusi-set) | [Jump](#-pitfalls-edge-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Mengenali kesalahan umum yang sering terjadi di challenge ini
- ✅ Memahami kenapa kesalahan itu terjadi
- ✅ Tahu cara menghindarinya di masa depan

---

## ⚠️ Pitfalls Solusi Sorting

### 1. Perbandingan index terbalik

```javascript
// ❌ Salah — membandingkan i+1 dengan i
if (sortedNums[i + 1] - sortedNums[i] === 1)

// ✅ Benar — membandingkan i dengan i-1
if (sortedNums[i] - sortedNums[i - 1] === 1)
```

> 💬 *Waktu itu saya nulis `i + 1` padahal loop dimulai dari `i = 1` dan seharusnya membandingkan ke belakang (`i - 1`), bukan ke depan. Hasilnya selalu salah karena membandingkan pasangan yang keliru.*

---

### 2. currentLength dimulai dari 0

```javascript
// ❌ Salah — hasil selalu kurang 1
let currentLength = 0

// ✅ Benar — minimal selalu ada satu elemen
let currentLength = 1
```

> 💬 *Lupa bahwa elemen pertama sudah dihitung sebagai panjang 1. Kalau dimulai dari 0, urutan `[1, 2, 3, 4]` akan terhitung panjang 3, bukan 4.*

---

### 3. Duplikat tidak ditangani

```javascript
// ❌ Salah — selisih 0 ikut ke else, currentLength di-reset!
if (sortedNums[i] - sortedNums[i - 1] === 1) {
  currentLength++
} else {
  currentLength = 1  // duplikat (selisih 0) masuk ke sini — salah!
}

// ✅ Benar — duplikat di-skip secara eksplisit
if (sortedNums[i] - sortedNums[i - 1] === 1) {
  currentLength++
} else if (sortedNums[i] - sortedNums[i - 1] === 0) {
  continue
} else {
  currentLength = 1
}
```

> 💬 *Awalnya tidak kepikiran soal duplikat. Baru sadar setelah test `[1, 2, 2, 3]` menghasilkan `2` padahal harusnya `3` — angka duplikat `2` bikin urutan dianggap putus.*

---

### 4. Lupa guard clause untuk array kosong

```javascript
// ❌ Salah — array kosong return 1, bukan 0
const longestConsecutiveSequence = (nums) => {
  const sortedNums = nums.sort((a, b) => a - b)
  let longestLength = 1
  // ...
  return longestLength  // return 1 untuk array kosong!
}

// ✅ Benar — tambahkan guard clause di awal
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0
  // ...
}
```

> 💬 *Di solusi Sorting, `longestLength = 1` dan loop tidak jalan untuk array kosong — jadi return `1` yang salah. Perlu guard clause eksplisit di awal fungsi.*

---

## ⚠️ Pitfalls Solusi Set

### 5. Mengecek num sendiri, bukan num - 1

```javascript
// ❌ Salah — mengecek apakah num ada di Set (selalu true!)
if (!numSet.has(num)) {
  // kondisi ini tidak pernah terpenuhi
}

// ✅ Benar — mengecek apakah angka SEBELUMNYA ada di Set
if (!numSet.has(num - 1)) {
  // ini awal urutan!
}
```

> 💬 *Bingung antara "apakah num ada di Set" vs "apakah num - 1 ada di Set". Yang pertama selalu true karena kita loop dari Set itu sendiri — jadi kondisinya tidak pernah jalan.*

---

### 6. currentNum dideklarasikan dengan const

```javascript
// ❌ Salah — const tidak bisa di-increment!
const currentNum = num

while (numSet.has(currentNum + 1)) {
  currentNum++  // TypeError: Assignment to constant variable
}

// ✅ Benar — gunakan let
let currentNum = num

while (numSet.has(currentNum + 1)) {
  currentNum++  // ✅ bisa di-increment
}
```

> 💬 *Reflek pakai `const` untuk semua variabel yang "tidak berubah". Padahal `currentNum` memang harus berubah di dalam `while` loop.*

---

## ⚠️ Pitfalls Edge Cases

### 7. Tidak menangani array satu elemen

```javascript
// ❌ Salah — longestLength = -Infinity, loop tidak jalan
let longestLength = -Infinity

// Input [5]:
// Loop tidak jalan → longestLength tetap -Infinity → return -Infinity!

// ✅ Benar — inisialisasi dengan 1 (Sorting) atau 0 (Set Ringkas)
let longestLength = 1   // untuk Sorting
let longestSequence = 0 // untuk Set Ringkas
```

> 💬 *Sempat pakai `-Infinity` sebagai nilai awal longestLength, mirip pattern di challenge lain. Tapi untuk array satu elemen, loop tidak jalan sama sekali — jadi -Infinity yang dikembalikan.*

---

### 8. Lupa bahwa Set menghilangkan duplikat otomatis

```javascript
// ⚠️ Perhatikan — duplikat hilang di Set!
const nums = [1, 2, 2, 3]
const numSet = new Set(nums)
// numSet = {1, 2, 3} — bukan {1, 2, 2, 3}!

// Ini justru KEUNTUNGAN untuk challenge ini
// tapi bisa jadi masalah kalau kamu butuh informasi tentang duplikat
```

---

## ✅ Ringkasan Pitfalls

| # | Pitfall | Solusi |
|---|---------|--------|
| 1 | Index terbalik `i+1` vs `i-1` | Gunakan `sortedNums[i] - sortedNums[i-1]` |
| 2 | `currentLength = 0` | Inisialisasi dengan `1` |
| 3 | Duplikat tidak ditangani | Tambahkan `else if (selisih === 0) continue` |
| 4 | Array kosong return `1` | Tambahkan guard clause `if (!nums.length) return 0` |
| 5 | Cek `num` bukan `num - 1` | Gunakan `!numSet.has(num - 1)` |
| 6 | `currentNum` pakai `const` | Gunakan `let` untuk variabel yang berubah |
| 7 | `longestLength = -Infinity` | Gunakan `1` (Sorting) atau `0` (Set Ringkas) |
| 8 | Lupa Set hilangkan duplikat | Manfaatkan sebagai keuntungan |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 05: Perbandingan Semua Solusi](05-comparison-all-solutions_perbandingan-semua-solusi.md)**
- **📖 [Lanjut ke Part 07: Test Cases →](07-test-cases_pengujian-semua-versi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>