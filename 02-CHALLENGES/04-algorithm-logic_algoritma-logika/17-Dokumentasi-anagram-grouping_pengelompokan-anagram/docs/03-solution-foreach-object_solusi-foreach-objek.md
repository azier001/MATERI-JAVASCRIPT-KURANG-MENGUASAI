# 🟢 Part 03 — Solusi: `forEach` + Object

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🔄 Perbandingan | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:---------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-perbandingan-dengan-versi-reduce) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja `forEach` untuk membangun object pengelompokan
- ✅ Memahami perbedaan gaya penulisan `forEach` vs `reduce`
- ✅ Tahu kapan lebih cocok pakai `forEach` vs `reduce`
- ✅ Siap untuk melihat versi Map di Part 04

---

## 📄 Kode

```javascript
const anagramGrouping = (words) => {
  const grouped = {}

  words.forEach((word) => {
    const key = word.split('').sort().join('')

    if (!grouped[key]) grouped[key] = []

    grouped[key].push(word)
  })

  return Object.values(grouped)
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Siapkan variabel penampung di luar loop

```javascript
const grouped = {}
```

Berbeda dengan `reduce` yang punya `acc` bawaan, di `forEach` kita harus **menyiapkan sendiri** variabel penampungnya di luar loop. Variabel ini yang akan kita isi selama iterasi berlangsung.

---

### 2. Iterasi dengan `forEach`

```javascript
words.forEach((word) => {
  // ...
})
```

`forEach` memanggil callback untuk setiap elemen array. Tidak ada nilai yang di-return — kita langsung memodifikasi `grouped` dari dalam callback.

---

### 3. Membuat derived key

```javascript
const key = word.split('').sort().join('')
```

Sama persis dengan versi `reduce` — sort huruf untuk mendapatkan key pengelompokan.

---

### 4. Lazy initialization + push

```javascript
if (!grouped[key]) grouped[key] = []

grouped[key].push(word)
```

Kalau key belum ada, buat array kosong dulu. Lalu langsung `push` kata ke dalamnya. Perhatikan bahwa `push` tidak perlu berada di dalam kondisi `if` — karena setelah baris pertama, `grouped[key]` sudah **pasti ada**.

---

### 5. Return hasil dengan `Object.values()`

```javascript
return Object.values(grouped)
```

Setelah loop selesai, `grouped` berisi object pengelompokan. `Object.values()` mengambil semua value-nya menjadi array of arrays.

---

## 📊 Visualisasi Proses

```
Input: ['cat', 'act', 'dog', 'god', 'tac']
grouped awal: {}

─────────────────────────────────────────
Iterasi 1 — word: 'cat'
  key     : 'act'
  grouped : { act: ['cat'] }
─────────────────────────────────────────
Iterasi 2 — word: 'act'
  key     : 'act'
  grouped : { act: ['cat', 'act'] }
─────────────────────────────────────────
Iterasi 3 — word: 'dog'
  key     : 'dgo'
  grouped : { act: ['cat', 'act'], dgo: ['dog'] }
─────────────────────────────────────────
Iterasi 4 — word: 'god'
  key     : 'dgo'
  grouped : { act: ['cat', 'act'], dgo: ['dog', 'god'] }
─────────────────────────────────────────
Iterasi 5 — word: 'tac'
  key     : 'act'
  grouped : { act: ['cat', 'act', 'tac'], dgo: ['dog', 'god'] }
─────────────────────────────────────────

Object.values(grouped):
  → [['cat', 'act', 'tac'], ['dog', 'god']] ✅
```

---

## 🔄 Perbandingan dengan Versi `reduce`

```javascript
// Versi reduce
const anagramGrouping = (words) => {
  const result = words.reduce((acc, word) => {
    const key = word.split('').sort().join('')
    if (!acc[key]) acc[key] = []
    acc[key].push(word)
    return acc       // ← wajib return acc
  }, {})             // ← initial value di sini

  return Object.values(result)
}

// Versi forEach
const anagramGrouping = (words) => {
  const grouped = {}  // ← variabel disiapkan di luar

  words.forEach((word) => {
    const key = word.split('').sort().join('')
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(word)
    // tidak perlu return apapun
  })

  return Object.values(grouped)
}
```

| Aspek | `reduce` | `forEach` |
|-------|----------|-----------|
| Variabel penampung | `acc` dari dalam `reduce` | `grouped` disiapkan di luar |
| Perlu `return acc` | ✅ Wajib | ❌ Tidak perlu |
| Initial value | Di argumen ke-2 `reduce` | Saat deklarasi `const grouped = {}` |
| Hasil | Sama | Sama |

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ Lupa deklarasi grouped di luar forEach
words.forEach((word) => {
  const grouped = {}  // ← ini reset setiap iterasi!
  // ...
})
```

```javascript
// ❌ Return di dalam forEach — tidak ada efeknya!
words.forEach((word) => {
  // ...
  return grouped  // ← forEach mengabaikan return value
})
```

---

## 💡 Insight

> **Kapan lebih cocok pakai `forEach` vs `reduce`?**
> Keduanya menghasilkan output yang sama. Pilih `forEach` kalau kamu ingin kode yang lebih mudah dibaca dan di-debug — alurnya lebih eksplisit karena variabel penampung terlihat jelas di luar loop. Pilih `reduce` kalau kamu ingin kode yang lebih ringkas dan bergaya functional.

> **Kenapa `grouped` harus dideklarasikan di luar `forEach`?**
> Karena kalau dideklarasikan di dalam, variabel akan di-reset setiap iterasi — semua data yang sudah dikumpulkan di iterasi sebelumnya akan hilang.

---

## 🧪 Test Cases

```javascript
// Edge case — array kosong
console.log(anagramGrouping([]));
// → []

// Normal case 1
console.log(anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']));
// → [['cat', 'act', 'tac'], ['dog', 'god']]

// Normal case 2 — ada kata yang berdiri sendiri
console.log(anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world']));
// → [['listen', 'silent', 'enlist'], ['hello'], ['world']]
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02: Solusi — reduce + Object](02-solution-reduce-object_solusi-reduce-objek.md)**
- **📖 [Lanjut ke Part 04: Solusi — forEach + Map →](04-solution-foreach-map_solusi-foreach-map.md)**

---

<div align="center">

Made with ❤️ for learners

</div>