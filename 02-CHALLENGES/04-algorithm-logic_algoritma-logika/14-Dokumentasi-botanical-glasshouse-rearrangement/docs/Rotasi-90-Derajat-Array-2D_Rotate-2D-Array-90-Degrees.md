# 🔄 Rotasi 90 Derajat Array 2D

![Topik](https://img.shields.io/badge/Topik-Array%202D-blue?style=for-the-badge)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow?style=for-the-badge)
![Tipe](https://img.shields.io/badge/Tipe-Materi%20Umum-purple?style=for-the-badge)

> Rotasi array 2D adalah teknik yang sering muncul di berbagai challenge. Setelah paham polanya, kamu bisa menerapkannya ke soal apapun yang melibatkan grid.

---

## 📑 Daftar Isi

- 📖 [Apa itu Rotasi Array 2D?](#apa-itu-rotasi)
- 🔬 [Visualisasi Pola Rotasi](#visualisasi-pola)
- 🧠 [Logika di Balik Rotasi](#logika-rotasi)
- 💻 [Implementasi JavaScript](#implementasi)
- 🔁 [4 Arah Rotasi](#empat-arah)
- 📚 [Keywords](#keywords)
- ⚠️ [Pitfalls](#pitfalls)
- ❓ [FAQ](#faq)

---

<a name="apa-itu-rotasi"></a>
## 📖 Apa itu Rotasi Array 2D?

Array 2D bisa dibayangkan sebagai **grid** atau tabel. Rotasi berarti memutar seluruh grid ke arah tertentu — seperti memutar selembar kertas.

```
Sebelum rotasi:       Sesudah rotasi 90° clockwise:
┌───┬───┐             ┌───┬───┐
│ A │ B │             │ C │ A │
├───┼───┤    ──►      ├───┼───┤
│ C │ D │             │ D │ B │
└───┴───┘             └───┴───┘
```

---

<a name="visualisasi-pola"></a>
## 🔬 Visualisasi Pola Rotasi

Mari kita lihat dengan grid 3x3 agar polanya lebih jelas:

```
Sebelum:          Sesudah 90° clockwise:
┌───┬───┬───┐     ┌───┬───┬───┐
│ 1 │ 2 │ 3 │     │ 7 │ 4 │ 1 │
├───┼───┼───┤     ├───┼───┼───┤
│ 4 │ 5 │ 6 │  ►  │ 8 │ 5 │ 2 │
├───┼───┼───┤     ├───┼───┼───┤
│ 7 │ 8 │ 9 │     │ 9 │ 6 │ 3 │
└───┴───┴───┘     └───┴───┴───┘
```

Perhatikan apa yang terjadi pada setiap kolom:

```
Kolom 0 (dari atas ke bawah): [1, 4, 7]
  → dibalik:                  [7, 4, 1]  = baris baru 0

Kolom 1 (dari atas ke bawah): [2, 5, 8]
  → dibalik:                  [8, 5, 2]  = baris baru 1

Kolom 2 (dari atas ke bawah): [3, 6, 9]
  → dibalik:                  [9, 6, 3]  = baris baru 2
```

---

<a name="logika-rotasi"></a>
## 🧠 Logika di Balik Rotasi

Rumus rotasi 90° clockwise:

```
kolom ke-i (dari atas ke bawah) → dibalik → baris baru ke-i
```

Dalam notasi indeks:

```
hasil[i][j] = asli[n - 1 - j][i]

di mana n = jumlah baris
```

Tapi di JavaScript, kita tidak perlu hafal rumus ini — cukup pakai kombinasi `map` dan `reverse`.

### Tiga langkah sederhana

```
1. Tentukan jumlah baris baru = jumlah kolom lama (arr[0].length)
2. Untuk setiap kolom ke-i: ambil semua elemen di kolom itu dari setiap baris
3. Balik urutan hasilnya → jadikan baris baru ke-i
```

---

<a name="implementasi"></a>
## 💻 Implementasi JavaScript

### Versi dengan fungsi terpisah (lebih mudah dibaca)

```js
const rotate90Clockwise = (arr) => {
  // Jumlah baris baru = jumlah kolom lama
  return Array.from({ length: arr[0].length }, (_, colIndex) => {
    // Ambil semua elemen di kolom ke-colIndex dari setiap baris
    // lalu balik urutannya → jadi baris baru
    return arr.map((row) => row[colIndex]).reverse()
  })
}
```

### Versi inline (lebih ringkas)

```js
// Versi yang dipakai di solusi Coddy
arr = arr[0].map((_, colIndex) =>
  arr.map((row) => row[colIndex]).reverse()
)
```

Keduanya menghasilkan output yang sama. Versi fungsi terpisah lebih mudah dibaca dan di-debug.

### Contoh penggunaan

```js
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

console.log(rotate90Clockwise(grid))
// [[7, 4, 1],
//  [8, 5, 2],
//  [9, 6, 3]]
```

### Trace langkah demi langkah

```
colIndex = 0:
  arr.map((row) => row[0])  →  [1, 4, 7]
  .reverse()                →  [7, 4, 1]  ← baris baru 0

colIndex = 1:
  arr.map((row) => row[1])  →  [2, 5, 8]
  .reverse()                →  [8, 5, 2]  ← baris baru 1

colIndex = 2:
  arr.map((row) => row[2])  →  [3, 6, 9]
  .reverse()                →  [9, 6, 3]  ← baris baru 2

Hasil: [[7,4,1], [8,5,2], [9,6,3]] ✅
```

---

<a name="empat-arah"></a>
## 🔁 4 Arah Rotasi

Sebagai referensi, berikut implementasi untuk semua arah rotasi:

### 90° Clockwise (searah jarum jam)

```js
const rotate90CW = (arr) =>
  Array.from({ length: arr[0].length }, (_, col) =>
    arr.map((row) => row[col]).reverse()
  )
```

```
1 2 3        7 4 1
4 5 6  ──►   8 5 2
7 8 9        9 6 3
```

### 90° Counter-Clockwise (berlawanan jarum jam)

```js
const rotate90CCW = (arr) =>
  Array.from({ length: arr[0].length }, (_, col) =>
    arr.map((row) => row[arr[0].length - 1 - col])
  )
```

```
1 2 3        3 6 9
4 5 6  ──►   2 5 8
7 8 9        1 4 7
```

### 180°

```js
const rotate180 = (arr) =>
  arr.map((row) => [...row].reverse()).reverse()
```

```
1 2 3        9 8 7
4 5 6  ──►   6 5 4
7 8 9        3 2 1
```

---

<a name="keywords"></a>
## 📚 Keywords

| Istilah | Penjelasan |
|--------|-----------|
| `Array 2D` | Array yang berisi array lain — dipakai untuk merepresentasikan grid |
| `Rotasi clockwise` | Putar searah jarum jam — kolom kiri jadi baris atas |
| `Rotasi counter-clockwise` | Putar berlawanan jarum jam — kolom kanan jadi baris atas |
| `Array.from({ length: n })` | Membuat array baru dengan panjang `n` |
| `colIndex` | Indeks kolom yang sedang diproses — tetap konstan saat iterasi baris |
| `.reverse()` | Membalik urutan array — **mengubah array asli (mutasi)** |
| `arr[0].length` | Jumlah kolom — diambil dari panjang baris pertama |
| `Transpose` | Operasi menukar baris dan kolom — langkah awal rotasi clockwise |

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

### 🪲 Pitfall #1 — Mengambil diagonal alih-alih kolom

Ini kesalahan yang paling sering terjadi saat pertama kali mengerjakan rotasi.

```js
// ❌ Salah — index berubah seiring iterasi baris → diagonal
arr.map((row, index) => row[index])
// baris 0 → row[0] = 1
// baris 1 → row[1] = 5
// baris 2 → row[2] = 9
// hasil: [1, 5, 9] ← ini diagonal, bukan kolom!
```

```js
// ✅ Benar — colIndex tetap konstan untuk semua baris → kolom penuh
arr.map((row) => row[colIndex])
// colIndex = 0: [1, 4, 7] ← kolom pertama ✅
```

---

### 🪲 Pitfall #2 — Mengambil seluruh baris bukan elemen kolom

```js
// ❌ Salah — arr[colIndex] mengambil seluruh baris ke-colIndex
Array.from({ length: arr[0].length }, (_, colIndex) => {
  return arr[colIndex]  // ini baris, bukan kolom!
})
```

```js
// ✅ Benar — map ke semua baris untuk ambil satu elemen per baris
Array.from({ length: arr[0].length }, (_, colIndex) => {
  return arr.map((row) => row[colIndex]).reverse()
})
```

---

### 🪲 Pitfall #3 — Memakai `arr[colIndex].length` sebagai panjang

```js
// ❌ Error — colIndex belum tersedia di luar callback
Array.from({ length: arr[colIndex].length }, (_, colIndex) => { ... })
//                        ^^^^^^^^ ReferenceError!
```

```js
// ✅ Benar — gunakan arr[0].length untuk jumlah kolom
Array.from({ length: arr[0].length }, (_, colIndex) => { ... })
```

---

### 🪲 Pitfall #4 — Lupa bahwa `.reverse()` mengubah array asli

```js
// ⚠️ Hati-hati — reverse() mengubah array asli secara langsung
const kolom = arr.map((row) => row[colIndex])
kolom.reverse()  // array kolom ikut berubah!
```

```js
// ✅ Aman — kalau perlu jaga array asli, buat salinan dulu
const kolom = arr.map((row) => row[colIndex])
const kolomTerbalik = [...kolom].reverse()  // kolom asli tidak berubah
```

> Dalam konteks rotasi, memanggil `.reverse()` langsung setelah `.map()` aman karena array hasil `.map()` adalah array baru.

---

<a name="faq"></a>
## ❓ FAQ

<details>
<summary>🤔 Kenapa jumlah baris baru diambil dari arr[0].length bukan arr.length?</summary>

Karena setelah rotasi, **jumlah baris = jumlah kolom lama**, bukan jumlah baris lama.

Contoh: grid 2×3 (2 baris, 3 kolom) setelah dirotasi 90° menjadi grid 3×2 (3 baris, 2 kolom).

```
Sebelum (2×3):      Sesudah (3×2):
1 2 3               4 1
4 5 6      ──►      5 2
                    6 3
```

Makanya kita pakai `arr[0].length` (jumlah kolom) sebagai panjang array baru.

</details>

<details>
<summary>🤔 Apa itu transpose dan hubungannya dengan rotasi?</summary>

**Transpose** adalah menukar baris dan kolom — elemen di posisi `[i][j]` pindah ke `[j][i]`.

Rotasi 90° clockwise bisa dilakukan dengan dua langkah:
1. Transpose array
2. Reverse setiap baris

Implementasi dengan `Array.from` + `map` + `reverse` yang kita pakai sudah menggabungkan keduanya dalam satu langkah.

</details>

<details>
<summary>🤔 Apakah teknik ini bekerja untuk grid yang tidak persegi (non-square)?</summary>

Ya! Implementasi dengan `Array.from({ length: arr[0].length })` sudah menangani grid non-persegi secara otomatis karena jumlah baris baru selalu diambil dari jumlah kolom lama.

```js
const grid = [[1, 2, 3], [4, 5, 6]]  // 2 baris × 3 kolom
rotate90CW(grid)
// [[4, 1], [5, 2], [6, 3]]           // 3 baris × 2 kolom ✅
```

</details>

<details>
<summary>🤔 Berapa kali rotasi 90° clockwise untuk kembali ke posisi semula?</summary>

4 kali. Karena 4 × 90° = 360° — satu putaran penuh. Jadi kalau kamu merotasi array yang sama 4 kali, hasilnya akan sama persis dengan array awal.

```js
let grid = [[1,2],[3,4]]
grid = rotate90CW(grid)  // rotasi 1
grid = rotate90CW(grid)  // rotasi 2
grid = rotate90CW(grid)  // rotasi 3
grid = rotate90CW(grid)  // rotasi 4
// kembali ke [[1,2],[3,4]] ✅
```

</details>
