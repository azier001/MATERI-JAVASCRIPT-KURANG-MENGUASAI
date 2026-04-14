# 🔵 Part 02 — Solusi: Sorting O(n log n)

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 📝 Catatan Evolusi | 🔧 Refactor | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:-----------------:|:-----------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-catatan-evolusi-kode) | [Jump](#-versi-refactor) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja sorting untuk menemukan consecutive sequence
- ✅ Memahami kenapa perlu menangani duplikat secara terpisah
- ✅ Memahami pentingnya edge case array kosong dan satu elemen
- ✅ Siap untuk melihat versi yang lebih efisien di Part 03

---

## 📄 Kode

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const sortedNums = nums.sort((a, b) => a - b)

  let currentLength = 1
  let longestLength = 1

  for (let i = 1; i < sortedNums.length; i++) {
    if (sortedNums[i] - sortedNums[i - 1] === 1) {
      currentLength++
    } else if (sortedNums[i] - sortedNums[i - 1] === 0) {
      continue
    } else {
      currentLength = 1
    }

    if (currentLength > longestLength) longestLength = currentLength
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

Kalau array kosong, langsung return `0` sebelum masuk ke proses apapun. Tanpa ini, `longestLength` yang diinisialisasi dengan `1` akan dikembalikan untuk array kosong — yang salah.

---

### 2. Sort array secara ascending

```javascript
const sortedNums = nums.sort((a, b) => a - b)
```

Mengurutkan array dari kecil ke besar. Setelah ini, angka-angka yang berurutan akan berdekatan posisinya sehingga mudah dibandingkan.

---

### 3. Inisialisasi variabel

```javascript
let currentLength = 1
let longestLength = 1
```

Keduanya dimulai dari `1` karena minimal selalu ada satu elemen (sudah dihandle guard clause di atas). `currentLength` melacak panjang urutan yang sedang dihitung, `longestLength` menyimpan panjang terpanjang yang pernah ditemukan.

---

### 4. Loop dan bandingkan selisih

```javascript
for (let i = 1; i < sortedNums.length; i++) {
  if (sortedNums[i] - sortedNums[i - 1] === 1) {
    currentLength++
  } else if (sortedNums[i] - sortedNums[i - 1] === 0) {
    continue
  } else {
    currentLength = 1
  }

  if (currentLength > longestLength) longestLength = currentLength
}
```

Loop dimulai dari `i = 1` karena kita membandingkan elemen sekarang dengan elemen **sebelumnya** (`i - 1`). Ada tiga kondisi:

| Kondisi | Artinya | Aksi |
|---------|---------|------|
| `selisih === 1` | Berurutan | `currentLength++` |
| `selisih === 0` | Duplikat | `continue` — skip iterasi ini |
| `selisih > 1` | Putus | Reset `currentLength = 1` |

Setiap iterasi, `longestLength` diupdate kalau `currentLength` lebih besar.

---

## 📊 Visualisasi Proses

```
Input: [100, 4, 200, 1, 3, 2]

Step 1: SORT
─────────────────────────────────────
[1, 2, 3, 4, 100, 200]


Step 2: LOOP (mulai i = 1)
─────────────────────────────────────

i=1: sortedNums[1] - sortedNums[0] → 2-1 = 1 ✅ berlanjut
     currentLength = 2, longestLength = 2

i=2: sortedNums[2] - sortedNums[1] → 3-2 = 1 ✅ berlanjut
     currentLength = 3, longestLength = 3

i=3: sortedNums[3] - sortedNums[2] → 4-3 = 1 ✅ berlanjut
     currentLength = 4, longestLength = 4

i=4: sortedNums[4] - sortedNums[3] → 100-4 = 96 ❌ putus
     currentLength = 1, longestLength = 4

i=5: sortedNums[5] - sortedNums[4] → 200-100 = 100 ❌ putus
     currentLength = 1, longestLength = 4


Step 3: RETURN
─────────────────────────────────────
longestLength = 4 ✅
```

---

Trace untuk array dengan duplikat `[1, 2, 2, 3]`:

```
Step 1: SORT
─────────────────────────────────────
[1, 2, 2, 3]


Step 2: LOOP
─────────────────────────────────────

i=1: 2-1 = 1 ✅ berlanjut
     currentLength = 2, longestLength = 2

i=2: 2-2 = 0 ↩️ duplikat → continue (skip)
     currentLength tetap 2, longestLength tetap 2

i=3: 3-2 = 1 ✅ berlanjut
     currentLength = 3, longestLength = 3


Step 3: RETURN
─────────────────────────────────────
longestLength = 3 ✅
```

---

## 📝 Catatan Evolusi Kode

Versi ini melewati beberapa perbaikan sebelum sampai ke bentuk finalnya:

**Bug 1 — Perbandingan index terbalik:**
```javascript
// ❌ Versi awal — membandingkan i+1 dengan i (salah arah)
if (sortedNums[i + 1] - sortedNums[i] === 1)

// ✅ Diperbaiki — membandingkan i dengan i-1
if (sortedNums[i] - sortedNums[i - 1] === 1)
```

**Bug 2 — currentLength dimulai dari 0:**
```javascript
// ❌ Versi awal — currentLength = 0, hasil selalu kurang 1
let currentLength = 0

// ✅ Diperbaiki — dimulai dari 1 karena minimal ada satu elemen
let currentLength = 1
```

**Bug 3 — Duplikat tidak ditangani:**
```javascript
// ❌ Versi awal — selisih 0 masuk ke else, currentLength di-reset!
if (selisih === 1) {
  currentLength++
} else {
  currentLength = 1  // duplikat ikut ke sini — salah!
}

// ✅ Diperbaiki — duplikat di-skip dengan else if + continue
if (selisih === 1) {
  currentLength++
} else if (selisih === 0) {
  continue
} else {
  currentLength = 1
}
```

---

## 💡 Insight

> **Kenapa loop dimulai dari `i = 1`?**
> Karena kita membandingkan elemen sekarang (`i`) dengan elemen **sebelumnya** (`i - 1`). Kalau mulai dari `i = 0`, maka `i - 1 = -1` yang akan mengakses index di luar batas array.

> **Kenapa `continue` untuk duplikat, bukan `else if` biasa?**
> `continue` melompat langsung ke iterasi berikutnya — termasuk melewati baris `if (currentLength > longestLength)`. Ini penting agar `longestLength` tidak diupdate dengan nilai yang tidak berubah secara tidak perlu.

> **Bisa lebih ringkas tidak?**
> Bisa! Kondisi duplikat bisa disederhanakan dengan mengganti `else if (selisih === 0) continue` menjadi `else if (selisih > 1) currentLength = 1`. Hasilnya sama karena hanya selisih `> 1` yang perlu di-reset. Selain itu, perhitungan selisih yang berulang bisa disimpan ke variabel `diff` agar tidak dihitung dua kali. Ini dicatat sebagai potensi perbaikan, bukan perubahan di versi ini.

---

## 🔧 Versi Refactor

Setelah kode berjalan dengan benar, ada dua perbaikan yang bisa diterapkan untuk membuat kode lebih ringkas:

**Refactor 1 — Simpan selisih ke variabel `diff`:**

Daripada menghitung `sortedNums[i] - sortedNums[i - 1]` dua kali di kondisi `if` dan `else if`, simpan ke variabel `diff`:

```javascript
// ❌ Sebelum — perhitungan selisih dua kali
if (sortedNums[i] - sortedNums[i - 1] === 1) {
  currentLength++
} else if (sortedNums[i] - sortedNums[i - 1] === 0) {
  continue
}

// ✅ Sesudah — cukup hitung sekali
const diff = sortedNums[i] - sortedNums[i - 1]
if (diff === 1) {
  currentLength++
} else if (diff === 0) {
  continue
}
```

**Refactor 2 — Ganti `else if (diff === 0) continue` dengan `else if (diff > 1)`:**

Kondisi duplikat (`diff === 0`) bisa dihilangkan karena hanya selisih `> 1` yang perlu di-reset. Selisih `0` otomatis di-skip tanpa `continue` eksplisit:

```javascript
// ❌ Sebelum — tiga kondisi dengan continue eksplisit
if (diff === 1) {
  currentLength++
} else if (diff === 0) {
  continue  // eksplisit tapi bisa dihilangkan
} else {
  currentLength = 1
}

// ✅ Sesudah — dua kondisi, lebih ringkas
if (diff === 1) {
  currentLength++
} else if (diff > 1) {
  currentLength = 1
}
// diff === 0 (duplikat) otomatis tidak melakukan apapun
```

**Kode final setelah kedua refactor diterapkan:**

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const sortedNums = nums.sort((a, b) => a - b)

  let currentLength = 1
  let longestLength = 1

  for (let i = 1; i < sortedNums.length; i++) {
    const diff = sortedNums[i] - sortedNums[i - 1]

    if (diff === 1) {
      currentLength++
    } else if (diff > 1) {
      currentLength = 1
    }

    if (currentLength > longestLength) longestLength = currentLength
  }

  return longestLength
}
```

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
- **📖 [← Part 01: Konsep & Pendekatan](01-concept-and-approach_konsep-dan-pendekatan.md)**
- **📖 [Lanjut ke Part 03: Solusi — Set O(n) →](03-solution-set-on_solusi-set-on.md)**

---

<div align="center">

Made with ❤️ for learners

</div>