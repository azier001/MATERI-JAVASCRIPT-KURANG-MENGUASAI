# 🎯 Analyze Sparse Array Challenge

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

**Dokumentasi Pribadi - Challenge Analisis Sparse Array**

</div>

---

## 📋 Daftar Isi

- [Pengenalan](#pengenalan)
- [Apa itu Sparse Array?](#apa-itu-sparse-array)
- [Penjelasan Challenge](#penjelasan-challenge)
- [Solusi Kode](#solusi-kode)
- [Cara Kerja Kode](#cara-kerja-kode)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Penjelasan Detail](#penjelasan-detail)
- [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini bertujuan untuk menganalisis **sparse array** (array yang memiliki slot kosong) di JavaScript. Kita akan membuat sebuah fungsi yang dapat menghitung berbagai properti dari sparse array tersebut.

**Level Kesulitan:** Easy ⭐

**Konsep yang Dipelajari:**
- Sparse Array di JavaScript
- Operator `in` untuk mengecek properti
- Algoritma perhitungan gap
- Object literal sebagai return value

---

<a name="apa-itu-sparse-array"></a>
## 📖 Apa itu Sparse Array?

**Sparse Array** adalah array yang memiliki "lubang" atau slot kosong di dalamnya. Berbeda dengan array normal yang setiap indexnya memiliki nilai (meskipun `undefined`), sparse array memiliki index yang benar-benar tidak ada.

### Contoh Sparse Array:

```javascript
// Cara membuat sparse array
let arr1 = [1, , , 4, 5]; // Ada 2 slot kosong
let arr2 = new Array(5); // Array dengan 5 slot kosong
arr2[0] = 'a';
arr2[4] = 'e';
// arr2 sekarang: ['a', <3 empty items>, 'e']
```

### Perbedaan dengan Array Biasa:

```javascript
// Array biasa
let normal = [1, undefined, undefined, 4];
console.log(normal.length); // 4
console.log(1 in normal); // true (index 1 ada, nilainya undefined)

// Sparse array
let sparse = [1, , , 4];
console.log(sparse.length); // 4
console.log(1 in sparse); // false (index 1 tidak ada!)
```

---

<a name="penjelasan-challenge"></a>
## 📝 Penjelasan Challenge

Tugas kita adalah membuat fungsi `analyzeSparseArray` yang menerima sparse array dan mengembalikan object dengan 3 properti:

| Properti | Deskripsi | Contoh |
|----------|-----------|--------|
| `length` | Panjang total array | `[1, , , 4].length` = 4 |
| `elementCount` | Jumlah elemen yang benar-benar ada | `[1, , , 4]` = 2 elemen |
| `largestGap` | Ukuran celah kosong terbesar | `[1, , , 4]` = 2 (dua slot kosong berturutan) |

### Contoh Input & Output:

```javascript
// Input
let arr = [1, , , 4, 5, , 7];

// Output yang diharapkan
{
  length: 7,
  elementCount: 4,
  largestGap: 2
}
```

---

<a name="solusi-kode"></a>
## 💻 Solusi Kode

```javascript
function analyzeSparseArray(arr) {
  let elementCount = 0;
  let largestGap = 0;
  let currentGap = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      elementCount++;
      largestGap = Math.max(largestGap, currentGap);
      currentGap = 0;
    } else {
      currentGap++;
    }
  }
  
  largestGap = Math.max(largestGap, currentGap);
  
  return {
    length: arr.length,
    elementCount: elementCount,
    largestGap: largestGap
  };
}
```

---

<a name="cara-kerja-kode"></a>
## 🔍 Cara Kerja Kode

### 1️⃣ Inisialisasi Variabel

```javascript
let elementCount = 0;    // Hitung jumlah elemen
let largestGap = 0;      // Gap terbesar yang ditemukan
let currentGap = 0;      // Gap yang sedang dihitung
```

### 2️⃣ Loop Melalui Array

```javascript
for (let i = 0; i < arr.length; i++) {
  // Cek setiap index dari 0 sampai length-1
}
```

### 3️⃣ Cek Apakah Index Ada

```javascript
if (i in arr) {
  // Index ada (bukan slot kosong)
  elementCount++;
  largestGap = Math.max(largestGap, currentGap);
  currentGap = 0;
} else {
  // Index kosong
  currentGap++;
}
```

**Penjelasan `i in arr`:**
- Operator `in` mengecek apakah properti (index) ada dalam object (array)
- Return `true` jika index ada, `false` jika slot kosong

### 4️⃣ Update Largest Gap di Akhir

```javascript
largestGap = Math.max(largestGap, currentGap);
```

Ini penting! Karena jika array berakhir dengan gap, kita perlu update `largestGap` sekali lagi.

---

<a name="contoh-penggunaan"></a>
## 🎮 Contoh Penggunaan

### Contoh 1: Array dengan Gap di Tengah

```javascript
let arr1 = [1, , , 4, 5];
let result1 = analyzeSparseArray(arr1);
console.log(result1);
```

**Output:**
```javascript
{
  length: 5,
  elementCount: 3,
  largestGap: 2
}
```

**Visualisasi:**
```
Index:  0  1  2  3  4
Value: [1, _, _, 4, 5]
        ↑  ←gap→ ↑  ↑
       ada  2    ada ada
```

---

### Contoh 2: Array dengan Multiple Gaps

```javascript
let arr2 = [1, , 3, , , , 7, 8];
let result2 = analyzeSparseArray(arr2);
console.log(result2);
```

**Output:**
```javascript
{
  length: 8,
  elementCount: 4,
  largestGap: 3
}
```

**Visualisasi:**
```
Index:  0  1  2  3  4  5  6  7
Value: [1, _, 3, _, _, _, 7, 8]
        ↑  1  ↑  ←--3--→ ↑  ↑
       ada gap ada largest ada ada
```

---

### Contoh 3: Array Tanpa Gap

```javascript
let arr3 = [1, 2, 3, 4, 5];
let result3 = analyzeSparseArray(arr3);
console.log(result3);
```

**Output:**
```javascript
{
  length: 5,
  elementCount: 5,
  largestGap: 0
}
```

---

### Contoh 4: Array dengan Gap di Akhir

```javascript
let arr4 = [1, 2, , , ];
let result4 = analyzeSparseArray(arr4);
console.log(result4);
```

**Output:**
```javascript
{
  length: 4,
  elementCount: 2,
  largestGap: 2
}
```

**Catatan:** Ini menunjukkan pentingnya `largestGap = Math.max(largestGap, currentGap);` di akhir fungsi!

---

### Contoh 5: Array Kosong Semua

```javascript
let arr5 = new Array(5); // [<5 empty items>]
let result5 = analyzeSparseArray(arr5);
console.log(result5);
```

**Output:**
```javascript
{
  length: 5,
  elementCount: 0,
  largestGap: 5
}
```

---

<a name="penjelasan-detail"></a>
## 📚 Penjelasan Detail

### Mengapa Pakai `i in arr` bukan `arr[i]`?

```javascript
// ❌ SALAH - Tidak bisa membedakan
let arr = [1, undefined, , 4];
console.log(arr[1]); // undefined
console.log(arr[2]); // undefined (padahal ini slot kosong!)

// ✅ BENAR - Bisa membedakan
console.log(1 in arr); // true (index ada, nilai undefined)
console.log(2 in arr); // false (index tidak ada, slot kosong!)
```

### Algoritma Tracking Largest Gap

Mari kita trace contoh `[1, , , 4, 5]`:

| i | i in arr | elementCount | currentGap | largestGap | Keterangan |
|---|----------|--------------|------------|------------|------------|
| 0 | true | 1 | 0 | 0 | Ada elemen, reset gap |
| 1 | false | 1 | 1 | 0 | Slot kosong, gap++ |
| 2 | false | 1 | 2 | 0 | Slot kosong, gap++ |
| 3 | true | 2 | 0 | 2 | Ada elemen, update largest, reset |
| 4 | true | 3 | 0 | 2 | Ada elemen |
| End | - | 3 | 0 | 2 | Final check |

### Kenapa Perlu `Math.max` di Akhir?

Untuk menangani kasus array yang berakhir dengan gap:

```javascript
let arr = [1, 2, , , ];

// Saat loop selesai:
// currentGap = 2 (gap di akhir belum di-compare)
// largestGap = 0 (belum ada update)

// Makanya perlu:
largestGap = Math.max(largestGap, currentGap); // 2
```

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan

### Yang Sudah Dipelajari:

✅ Memahami konsep **Sparse Array** di JavaScript  
✅ Menggunakan operator `in` untuk mengecek properti  
✅ Algoritma tracking gap dengan dua variabel (`currentGap` dan `largestGap`)  
✅ Pentingnya edge case handling (gap di akhir array)  
✅ Return object dengan multiple properties  

### Key Takeaways:

🔑 **Sparse Array** berbeda dengan array yang berisi `undefined`  
🔑 Gunakan `in` operator untuk cek keberadaan index  
🔑 Track state dengan variabel counter  
🔑 Jangan lupa handle edge case!  

---

<div align="center">

### 🌟 Happy Coding! 🌟

**Tetap semangat belajar JavaScript!** 💪

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)

</div>
