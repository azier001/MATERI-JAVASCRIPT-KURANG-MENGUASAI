# 🟢 Part 03 — Solusi: Set O(n)

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja Set untuk menemukan consecutive sequence
- ✅ Memahami konsep "awal urutan" sebagai kunci efisiensi solusi ini
- ✅ Memahami kenapa Set lebih efisien dari Sorting
- ✅ Siap untuk melihat versi ringkas di Part 04

---

## 📄 Kode

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const numSet = new Set(nums)

  let longestLength = 1

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentLength = 1
      let currentNum = num

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentLength++
      }

      if (currentLength > longestLength) {
        longestLength = currentLength
      }
    }
  }

  return longestLength
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Guard clause — array kosong

```javascript
if (!nums.length) return 0
```

Kalau array kosong, langsung return `0`. Tanpa ini, `longestLength` yang diinisialisasi dengan `1` akan dikembalikan untuk array kosong — yang salah.

---

### 2. Buat Set dari array

```javascript
const numSet = new Set(nums)
```

Semua angka dimasukkan ke Set. Dua keuntungan sekaligus:
- **Duplikat otomatis hilang** — Set hanya menyimpan nilai unik
- **Pengecekan `has()` adalah O(1)** — jauh lebih cepat dari mencari di array

---

### 3. Inisialisasi longestLength

```javascript
let longestLength = 1
```

Dimulai dari `1` karena minimal selalu ada satu elemen (sudah dihandle guard clause).

---

### 4. Loop dan cari awal urutan

```javascript
for (const num of numSet) {
  if (!numSet.has(num - 1)) {
```

Loop setiap angka di Set. Kondisi `!numSet.has(num - 1)` mengecek apakah angka sebelumnya tidak ada di Set — kalau tidak ada, berarti `num` adalah **awal urutan**.

Ini kunci efisiensi solusi ini — kita hanya menghitung panjang urutan dari titik awalnya saja, tidak dari tengah atau akhir.

---

### 5. Hitung panjang urutan dengan while

```javascript
let currentLength = 1
let currentNum = num

while (numSet.has(currentNum + 1)) {
  currentNum++
  currentLength++
}
```

Dari titik awal `num`, kita cek ke depan satu per satu selama angka berikutnya ada di Set:
- `currentNum` maju ke angka berikutnya
- `currentLength` bertambah setiap kali ada angka berikutnya

---

### 6. Update longestLength

```javascript
if (currentLength > longestLength) {
  longestLength = currentLength
}
```

Setelah `while` selesai (urutan habis), update `longestLength` kalau urutan yang baru ditemukan lebih panjang.

---

## 📊 Visualisasi Proses

```
Input: [100, 4, 200, 1, 3, 2]

Step 1: BUAT SET
─────────────────────────────────────
numSet = {100, 4, 200, 1, 3, 2}
(duplikat otomatis hilang)


Step 2: LOOP SETIAP ANGKA DI SET
─────────────────────────────────────

num=100: has(99)? ❌ → AWAL URUTAN
         currentNum=100, currentLength=1
         while has(101)? ❌ → stop
         currentLength=1, longestLength=1

num=4:   has(3)? ✅ → bukan awal, skip

num=200: has(199)? ❌ → AWAL URUTAN
         currentNum=200, currentLength=1
         while has(201)? ❌ → stop
         currentLength=1, longestLength=1

num=1:   has(0)? ❌ → AWAL URUTAN
         currentNum=1, currentLength=1
         while has(2)? ✅ → currentNum=2, currentLength=2
         while has(3)? ✅ → currentNum=3, currentLength=3
         while has(4)? ✅ → currentNum=4, currentLength=4
         while has(5)? ❌ → stop
         currentLength=4 > longestLength=1 → longestLength=4

num=3:   has(2)? ✅ → bukan awal, skip

num=2:   has(1)? ✅ → bukan awal, skip


Step 3: RETURN
─────────────────────────────────────
longestLength = 4 ✅
```

---

Trace untuk array dengan duplikat `[1, 2, 2, 3]`:

```
Step 1: BUAT SET
─────────────────────────────────────
numSet = {1, 2, 3}
(duplikat 2 otomatis hilang!)


Step 2: LOOP
─────────────────────────────────────

num=1: has(0)? ❌ → AWAL URUTAN
       currentNum=1, currentLength=1
       while has(2)? ✅ → currentNum=2, currentLength=2
       while has(3)? ✅ → currentNum=3, currentLength=3
       while has(4)? ❌ → stop
       currentLength=3, longestLength=3

num=2: has(1)? ✅ → bukan awal, skip

num=3: has(2)? ✅ → bukan awal, skip


Step 3: RETURN
─────────────────────────────────────
longestLength = 3 ✅
```

---

## 💡 Insight

> **Kenapa Set lebih efisien dari Sorting?**
> Sorting butuh O(n log n) karena harus mengurutkan seluruh array. Set hanya butuh O(n) — satu kali untuk membuat Set, satu kali untuk loop. Pengecekan `has()` di Set adalah O(1), jauh lebih cepat dari mencari elemen di array yang O(n).

> **Kenapa hanya angka yang `num - 1`-nya tidak ada di Set yang dihitung?**
> Kalau kita menghitung dari tengah urutan, kita akan melewatkan bagian awalnya. Dengan hanya menghitung dari awal urutan, setiap urutan hanya dihitung **satu kali** — inilah yang membuat kompleksitasnya tetap O(n) meskipun ada `while` di dalam `for`.

> **Kenapa duplikat tidak jadi masalah di solusi ini?**
> Set secara otomatis hanya menyimpan nilai unik. Jadi `[1, 2, 2, 3]` di Set menjadi `{1, 2, 3}` — duplikat `2` hilang tanpa perlu penanganan khusus.

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
- **📖 [← Part 02: Solusi — Sorting O(n log n)](02-solution-sorting-on-log-n_solusi-sorting-on-log-n.md)**
- **📖 [Lanjut ke Part 04: Solusi — Set O(n) Ringkas →](04-solution-set-on-concise_solusi-set-on-ringkas.md)**

---

<div align="center">

Made with ❤️ for learners

</div>