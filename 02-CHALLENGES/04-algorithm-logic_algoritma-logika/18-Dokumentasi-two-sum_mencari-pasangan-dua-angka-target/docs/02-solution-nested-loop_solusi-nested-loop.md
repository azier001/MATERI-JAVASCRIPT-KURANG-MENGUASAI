# 🔵 Part 02 — Solusi: Nested Loop

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | ❌ Pitfalls | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:-----------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-pitfalls-yang-perlu-dihindari) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja nested loop untuk mencari pasangan
- ✅ Memahami kenapa `j` dimulai dari `i + 1`
- ✅ Memahami kenapa `return [i, j]` lebih efisien dari `break`
- ✅ Siap untuk melihat versi yang lebih efisien di Part 03

---

## 📄 Kode

```javascript
const twoSum = (numbers, number) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === number) {
        return [i, j]
      }
    }
  }
  
  return []
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Loop luar — memilih elemen pertama

```javascript
for (let i = 0; i < numbers.length; i++)
```

Loop luar bertugas **memilih satu elemen** sebagai patokan. `i` jalan dari index `0` sampai index terakhir (`numbers.length - 1`). Kondisi `< numbers.length` memastikan `i` tidak melewati batas array.

---

### 2. Loop dalam — mencari pasangan

```javascript
for (let j = i + 1; j < numbers.length; j++)
```

Loop dalam bertugas **mencari pasangan** dari elemen yang dipilih `i`. Ada dua hal penting di sini:

- `j = i + 1` → `j` selalu dimulai satu langkah setelah `i`, agar tidak ada pasangan diri sendiri atau kombinasi yang sama dua kali
- `j < numbers.length` → `j` berjalan sampai index terakhir

---

### 3. Cek apakah pasangan valid

```javascript
if (numbers[i] + numbers[j] === number) {
  return [i, j]
}
```

Kalau jumlah kedua elemen sama dengan target, langsung `return [i, j]` — mengembalikan **indeks** keduanya sekaligus menghentikan seluruh loop.

---

### 4. Return kosong jika tidak ada pasangan

```javascript
return []
```

Kalau loop selesai tanpa menemukan pasangan, kembalikan array kosong. Ini penting agar fungsi selalu mengembalikan array, bukan `undefined`.

---

## 📊 Visualisasi Proses

Kita trace step by step untuk array `[2, 7, 11, 15]` target `9`:

```
Array:  [ 2,  7, 11, 15 ]
Index:    0   1   2   3
Target: 9
```

```
i=0 (numbers[0]=2)
  └─ j=1 → 2 + 7  = 9  ✅ KETEMU! return [0, 1]

Loop berhenti — i=1, i=2, i=3 tidak dijalankan
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

Sekarang trace untuk `[3, 2, 4]` target `6`:

```
Array:  [ 3,  2,  4 ]
Index:    0   1   2
Target: 6
```

```
i=0 (numbers[0]=3)
  └─ j=1 → 3 + 2 = 5  ❌
  └─ j=2 → 3 + 4 = 7  ❌

i=1 (numbers[1]=2)
  └─ j=2 → 2 + 4 = 6  ✅ KETEMU! return [1, 2]
```

```
HASIL
┌─────────────────────────────────────┐
│ index 1 → angka 2                   │
│ index 2 → angka 4                   │
│ 2 + 4 = 6 ✅                        │
│ return [1, 2]                       │
└─────────────────────────────────────┘
```

---

Sekarang trace untuk `[3, 3]` target `6`:

```
Array:  [ 3,  3 ]
Index:    0   1
Target: 6
```

```
i=0 (numbers[0]=3)
  └─ j=1 → 3 + 3 = 6  ✅ KETEMU! return [0, 1]
```

```
HASIL
┌─────────────────────────────────────┐
│ index 0 → angka 3                   │
│ index 1 → angka 3                   │
│ 3 + 3 = 6 ✅                        │
│ return [0, 1]                       │
└─────────────────────────────────────┘
```

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ j dimulai dari 0 — bisa pasangan diri sendiri!
for (let j = 0; j < numbers.length; j++) {
  // i=0, j=0 → numbers[0] + numbers[0] = 3 + 3 = 6 ✅
  // Padahal kita butuh DUA elemen berbeda!
}
```

```javascript
// ❌ j dimulai dari i — masih bisa pasangan diri sendiri!
for (let j = i; j < numbers.length; j++) {
  // i=0, j=0 → numbers[0] + numbers[0] = masalah yang sama
}
```

```javascript
// ❌ Pakai break, bukan return — loop luar tetap jalan!
if (numbers[i] + numbers[j] === number) {
  result.push(i, j)
  break  // hanya menghentikan loop dalam (j)
         // loop luar (i) tetap lanjut — tidak efisien!
}
```

```javascript
// ❌ Return string bukan array!
return `${i}, ${j}`  // ← harusnya return [i, j]
```

---

## 💡 Insight

> **Kenapa `return [i, j]` lebih baik dari `break`?**
> `return` langsung menghentikan **seluruh fungsi** — kedua loop berhenti sekaligus. `break` hanya menghentikan loop dalam (`j`), sedangkan loop luar (`i`) tetap berjalan sampai selesai. Untuk challenge ini hasilnya sama, tapi `return` lebih efisien karena tidak ada iterasi yang terbuang.

> **Kenapa `return []` di akhir?**
> Challenge menjamin selalu ada pasangan valid, tapi di luar challenge kondisi ini tidak selalu terjamin. `return []` memastikan fungsi selalu mengembalikan array — bukan `undefined` — sehingga lebih aman digunakan di kode lain.

> **Kompleksitas waktu O(n²) artinya apa?**
> Untuk setiap elemen (`n`), kita mengecek semua elemen lainnya (`n`). Total operasi = n × n = n². Untuk array 1000 elemen, bisa butuh hingga 1 juta operasi. Untuk array 1 juta elemen, bisa butuh hingga 1 triliun operasi — sangat lambat!

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
- **📖 [← Part 01: Konsep & Pendekatan](01-concept-and-approach_konsep-dan-pendekatan.md)**
- **📖 [Lanjut ke Part 03: Solusi — HashMap →](03-solution-hashmap_solusi-hashmap.md)**

---

<div align="center">

Made with ❤️ for learners

</div>