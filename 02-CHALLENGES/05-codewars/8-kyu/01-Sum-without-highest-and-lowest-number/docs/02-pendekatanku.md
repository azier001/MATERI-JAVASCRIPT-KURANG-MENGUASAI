# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-8%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

> Soal ini meminta kita menjumlahkan semua angka di dalam array, **kecuali** angka terkecil dan terbesar. Pikiran pertama saya: kalau kita sort dulu array-nya, maka elemen pertama pasti yang terkecil dan elemen terakhir pasti yang terbesar. Tinggal buang keduanya, lalu jumlahkan sisanya.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Validasi input — cek apakah array valid dan tidak kosong
2. Sort array dari kecil ke besar
3. Cari angka terkecil (elemen pertama) dan terbesar (elemen terakhir)
4. Jumlahkan semua elemen kecuali yang terkecil dan terbesar
5. Return hasilnya
```

---

## 🔄 Percobaan Pertama

```javascript
// Attempt #1 — Menggunakan reduce dengan pengecekan manual
function sumArray(array) {
  if (!array.length) return 0;

  const sortedArray = [...array].sort((a, b) => a - b);
  const minNumber = sortedArray[0];
  const maxNumber = sortedArray[sortedArray.length - 1];

  return sortedArray.reduce((total, num) => {
    if (num === minNumber || num === maxNumber || isNaN(num) || num === null) {
      num = 0;
    }

    return total + num;
  }, 0);
}
```

**Hasil:** ❌ Gagal

**Kenapa gagal — 2 Bug Utama:**

### Bug 1: `!array.length` crash pada `null`

```javascript
if (!array.length) return 0;
//    ^^^^^^^^^^^^
// ❌ Kalau array = null → TypeError: Cannot read properties of null (reading 'length')
```

Belum ada pengecekan apakah `array` itu benar-benar sebuah Array. Kalau input-nya `null` atau `undefined`, langsung crash sebelum sempat diproses.

### Bug 2: `reduce` menghapus SEMUA duplikat min/max

```javascript
if (num === minNumber || num === maxNumber) {
  num = 0; // ❌ Ini menghapus SEMUA elemen yang nilainya sama dengan min/max
}
```

Contoh kasus `[1, 1, 11, 2, 3]`:
- `minNumber = 1`, `maxNumber = 11`
- Reduce akan set **kedua** angka `1` menjadi `0` (karena keduanya `=== minNumber`)
- Hasil: `0 + 0 + 0 + 2 + 3 = 5` ❌
- Seharusnya: hanya **satu** angka `1` yang dikecualikan → `1 + 0 + 2 + 3 = 6` ✅

---

## 🔄 Percobaan Kedua *(Berhasil Submit)*

```javascript
// Attempt #2 — Menggunakan sort + loop dari index 1 sampai length-2
function sumArray(array) {
  if (!Array.isArray(array)) return 0;

  if (!array.length) return 0;

  const sortedArray = [...array].sort((a, b) => a - b);

  let total = 0;

  for (let i = 1; i < sortedArray.length - 1; i++) {
    total += sortedArray[i];
  }

  return total;
}
```

**Hasil:** ✅ Lulus

**Kenapa lebih baik — 2 Perbaikan Utama:**

### Fix 1: Validasi input yang benar

```javascript
if (!Array.isArray(array)) return 0; // ✅ Cek apakah input benar-benar Array
if (!array.length) return 0;          // ✅ Aman, karena sudah pasti array
```

Dengan `Array.isArray()`, input `null`, `undefined`, string, atau tipe lain akan langsung ditolak tanpa crash.

### Fix 2: Skip index pertama dan terakhir, bukan bandingkan nilai

```javascript
for (let i = 1; i < sortedArray.length - 1; i++) {
//         ^ mulai dari 1 (skip index 0 = min)
//                    ^^^^^^^^^^^^^^^^^ stop sebelum index terakhir (skip max)
    total += sortedArray[i];
}
```

Setelah array di-sort, cukup **skip index 0** (min) dan **index terakhir** (max). Ini otomatis hanya mengecualikan **satu** elemen min dan **satu** elemen max, tidak peduli apakah ada duplikat.

---

## ✅ Solusi Final

```javascript
function sumArray(array) {
  if (!Array.isArray(array)) return 0;

  if (!array.length) return 0;

  const sortedArray = [...array].sort((a, b) => a - b);

  let total = 0;

  for (let i = 1; i < sortedArray.length - 1; i++) {
    total += sortedArray[i];
  }

  return total;
}
```

---

## 🔍 Penjelasan Baris per Baris

```javascript
function sumArray(array) {
  // 1. Validasi: cek apakah input benar-benar sebuah Array (bukan null/undefined/dll)
  if (!Array.isArray(array)) return 0;

  // 2. Validasi: cek apakah array kosong (length === 0)
  if (!array.length) return 0;

  // 3. Buat salinan array lalu sort ascending (kecil → besar)
  //    Menggunakan [...array] agar array asli tidak bermutasi
  const sortedArray = [...array].sort((a, b) => a - b);

  // 4. Siapkan variabel penampung total
  let total = 0;

  // 5. Loop dari index 1 (skip elemen terkecil di index 0)
  //    sampai sebelum index terakhir (skip elemen terbesar)
  for (let i = 1; i < sortedArray.length - 1; i++) {
    total += sortedArray[i];
  }

  // 6. Return total penjumlahan
  return total;
}
```

---

## 🧪 Verifikasi Manual

```javascript
console.log(sumArray([6, 2, 1, 8, 10]));  // → 16 ✅  (skip 1 & 10, jumlah 2+6+8)
console.log(sumArray([1, 1, 11, 2, 3]));  // → 6  ✅  (skip satu 1 & 11, jumlah 1+2+3)
console.log(sumArray(null));               // → 0  ✅  (input bukan array)
console.log(sumArray([]));                 // → 0  ✅  (array kosong)
console.log(sumArray([5]));                // → 0  ✅  (hanya 1 elemen, loop tidak jalan)
console.log(sumArray([3, 5]));             // → 0  ✅  (2 elemen = min & max, skip keduanya)
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
