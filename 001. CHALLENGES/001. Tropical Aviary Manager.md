# 🦜 Tropical Aviary Manager

<div align="center">

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

**Sistem Manajemen Inventori Burung Eksotis di Penangkaran Tropis**

</div>

---

## 📑 Daftar Isi

- [Pengenalan](#pengenalan)
- [Deskripsi Challenge](#deskripsi-challenge)
- [Konsep yang Dipelajari](#konsep-yang-dipelajari)
  - [Apa itu Array?](#apa-itu-array)
  - [Apa itu Array Methods?](#apa-itu-array-methods)
  - [Apa itu Switch Statement?](#apa-itu-switch-statement)
- [Solusi](#solusi)
- [Penjelasan Kode](#penjelasan-kode)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Breakdown Setiap Action](#breakdown-setiap-action)
- [Tips & Trik](#tips--trik)
- [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini mensimulasikan pengelolaan inventori burung eksotis di sebuah penangkaran tropis. Kamu akan membuat fungsi yang dapat melakukan berbagai operasi seperti menambah, menghapus, mengganti, membalik urutan, dan mengurutkan daftar burung.

**Tingkat Kesulitan:** Easy  
**Konsep Utama:** Array Manipulation, Switch Statement, Array Methods

---

<a name="deskripsi-challenge"></a>
## 📝 Deskripsi Challenge

Buatlah fungsi bernama `manageAviary` yang menerima dua parameter:

### Parameter:
- **`birds`** (array): Array berisi nama-nama spesies burung yang ada di penangkaran
- **`action`** (number): Angka yang menentukan operasi apa yang akan dilakukan

### Aksi yang Harus Dilakukan:

| Action | Operasi | Deskripsi |
|--------|---------|-----------|
| 1 | **Tambah** | Menambahkan "Toucan" di akhir array |
| 2 | **Hapus** | Menghapus burung pertama dari array |
| 3 | **Ganti** | Mengganti burung di posisi tengah dengan "Flamingo" |
| 4 | **Balik** | Membalikkan urutan seluruh burung |
| 5 | **Urutkan** | Mengurutkan nama burung secara alfabetis |

### Catatan Penting:
⚠️ Nama burung **case-sensitive** (huruf besar/kecil berpengaruh)  
⚠️ Untuk array dengan panjang genap, posisi tengah adalah indeks `(panjang - 1) / 2` dibulatkan ke bawah

---

<a name="konsep-yang-dipelajari"></a>
## 💡 Konsep yang Dipelajari

<a name="apa-itu-array"></a>
### 📖 Apa itu Array?

**Array** adalah struktur data yang digunakan untuk menyimpan banyak nilai dalam satu variabel. Bayangkan array seperti **kotak penyimpanan dengan banyak slot** yang diberi nomor urut (indeks).

```javascript
// Contoh array burung
const birds = ["Parrot", "Eagle", "Sparrow"];
//              ^          ^        ^
//           indeks 0   indeks 1  indeks 2
```

**Karakteristik Array:**
- Dimulai dari indeks 0 (bukan 1)
- Bisa menyimpan berbagai tipe data
- Panjangnya bisa berubah (dinamis)

<a name="apa-itu-array-methods"></a>
### 📖 Apa itu Array Methods?

**Array Methods** adalah fungsi bawaan JavaScript untuk memanipulasi array. Berikut yang digunakan dalam challenge ini:

#### 1. `push()` - Menambah di Akhir
```javascript
const birds = ["Parrot", "Eagle"];
birds.push("Toucan");
// Hasil: ["Parrot", "Eagle", "Toucan"]
```

#### 2. `shift()` - Menghapus yang Pertama
```javascript
const birds = ["Parrot", "Eagle", "Toucan"];
birds.shift();
// Hasil: ["Eagle", "Toucan"]
```

#### 3. `reverse()` - Membalik Urutan
```javascript
const birds = ["Parrot", "Eagle", "Toucan"];
birds.reverse();
// Hasil: ["Toucan", "Eagle", "Parrot"]
```

#### 4. `sort()` - Mengurutkan Alfabetis
```javascript
const birds = ["Zebra Finch", "Parrot", "Eagle"];
birds.sort();
// Hasil: ["Eagle", "Parrot", "Zebra Finch"]
```

<a name="apa-itu-switch-statement"></a>
### 📖 Apa itu Switch Statement?

**Switch Statement** adalah cara untuk menjalankan kode yang berbeda berdasarkan nilai tertentu. Ini seperti **mesin penjual otomatis** - kamu tekan tombol tertentu, dan kamu dapat hasil yang sesuai.

```javascript
switch (action) {
  case 1:
    // Jalankan jika action = 1
    break;
  case 2:
    // Jalankan jika action = 2
    break;
  default:
    // Jalankan jika tidak ada yang cocok
}
```

**Keuntungan menggunakan Switch:**
- Lebih rapi dibanding banyak `if-else`
- Mudah dibaca untuk banyak kondisi
- Performa lebih baik untuk banyak case

---

<a name="solusi"></a>
## ✅ Solusi

```javascript
function manageAviary(birds, action) {
  switch (action) {
    case 1:
      birds.push("Toucan");
      break;
    case 2:
      birds.shift();
      break;
    case 3:
      const middleIndex = Math.floor((birds.length - 1) / 2);
      birds[middleIndex] = "Flamingo";
      break;
    case 4:
      birds.reverse();
      break;
    case 5:
      birds.sort();
      break;
  }
  return birds;
}
```

---

<a name="penjelasan-kode"></a>
## 🔍 Penjelasan Kode

Mari kita bedah kode baris per baris:

### 1. Deklarasi Fungsi
```javascript
function manageAviary(birds, action) {
```
- Membuat fungsi dengan nama `manageAviary`
- Menerima 2 parameter: `birds` (array) dan `action` (number)

### 2. Switch Statement
```javascript
switch (action) {
```
- Memulai switch untuk mengecek nilai `action`
- Akan menjalankan case yang sesuai dengan nilai action

### 3. Case 1 - Tambah Toucan
```javascript
case 1:
  birds.push("Toucan");
  break;
```
- Jika `action === 1`, tambahkan "Toucan" ke akhir array
- `break` menghentikan eksekusi agar tidak lanjut ke case berikutnya

### 4. Case 2 - Hapus Burung Pertama
```javascript
case 2:
  birds.shift();
  break;
```
- Jika `action === 2`, hapus elemen pertama dari array
- `shift()` menghapus dan mengembalikan elemen pertama

### 5. Case 3 - Ganti Burung Tengah
```javascript
case 3:
  const middleIndex = Math.floor((birds.length - 1) / 2);
  birds[middleIndex] = "Flamingo";
  break;
```
- Menghitung indeks tengah: `(panjang - 1) / 2` dibulatkan ke bawah
- `Math.floor()` membulatkan ke bawah
- Contoh: array 5 elemen → `(5-1)/2 = 2` (indeks ke-2)
- Contoh: array 4 elemen → `(4-1)/2 = 1.5` → 1 (indeks ke-1)

### 6. Case 4 - Balik Urutan
```javascript
case 4:
  birds.reverse();
  break;
```
- Membalikkan urutan seluruh elemen array
- Elemen terakhir jadi pertama, dan sebaliknya

### 7. Case 5 - Urutkan Alfabetis
```javascript
case 5:
  birds.sort();
  break;
```
- Mengurutkan array secara alfabetis (A-Z)
- Secara default mengurutkan berdasarkan Unicode

### 8. Return Statement
```javascript
return birds;
```
- Mengembalikan array yang sudah dimodifikasi

---

<a name="contoh-penggunaan"></a>
## 🚀 Contoh Penggunaan

### Contoh 1: Tambah Toucan (Action 1)
```javascript
const myBirds = ["Parrot", "Eagle", "Sparrow"];
const result = manageAviary(myBirds, 1);
console.log(result);
```
**Output:**
```
["Parrot", "Eagle", "Sparrow", "Toucan"]
```

### Contoh 2: Hapus Burung Pertama (Action 2)
```javascript
const myBirds = ["Parrot", "Eagle", "Sparrow", "Toucan"];
const result = manageAviary(myBirds, 2);
console.log(result);
```
**Output:**
```
["Eagle", "Sparrow", "Toucan"]
```

### Contoh 3: Ganti Burung Tengah (Action 3)
```javascript
const myBirds = ["Parrot", "Eagle", "Sparrow"];
const result = manageAviary(myBirds, 3);
console.log(result);
```
**Output:**
```
["Parrot", "Flamingo", "Sparrow"]
```
💡 Indeks tengah = (3-1)/2 = 1, jadi "Eagle" diganti "Flamingo"

### Contoh 4: Balik Urutan (Action 4)
```javascript
const myBirds = ["Parrot", "Eagle", "Sparrow"];
const result = manageAviary(myBirds, 4);
console.log(result);
```
**Output:**
```
["Sparrow", "Eagle", "Parrot"]
```

### Contoh 5: Urutkan Alfabetis (Action 5)
```javascript
const myBirds = ["Zebra Finch", "Parrot", "Eagle", "Sparrow"];
const result = manageAviary(myBirds, 5);
console.log(result);
```
**Output:**
```
["Eagle", "Parrot", "Sparrow", "Zebra Finch"]
```

---

<a name="breakdown-setiap-action"></a>
## 🎬 Breakdown Setiap Action

### 📊 Action 1: Tambah Toucan

```javascript
// SEBELUM
["Parrot", "Eagle"]

// PROSES
birds.push("Toucan")

// SESUDAH
["Parrot", "Eagle", "Toucan"]
```

**Visualisasi:**
```
[Parrot] [Eagle] [     ] ← Toucan ditambahkan di sini
                 ↓
[Parrot] [Eagle] [Toucan]
```

---

### 📊 Action 2: Hapus Burung Pertama

```javascript
// SEBELUM
["Parrot", "Eagle", "Toucan"]

// PROSES
birds.shift() // Menghapus "Parrot"

// SESUDAH
["Eagle", "Toucan"]
```

**Visualisasi:**
```
[Parrot] [Eagle] [Toucan]
   ❌      ←        ←      (semua geser ke kiri)
         [Eagle] [Toucan]
```

---

### 📊 Action 3: Ganti Burung Tengah

**Untuk array dengan panjang ganjil (5 elemen):**
```javascript
// Array: ["A", "B", "C", "D", "E"]
// Indeks:  0    1    2    3    4

// Hitung tengah: (5-1)/2 = 2
// Indeks 2 adalah "C" ✓

["A", "B", "C", "D", "E"]
           ↓
["A", "B", "Flamingo", "D", "E"]
```

**Untuk array dengan panjang genap (4 elemen):**
```javascript
// Array: ["A", "B", "C", "D"]
// Indeks:  0    1    2    3

// Hitung tengah: (4-1)/2 = 1.5 → 1 (dibulatkan ke bawah)
// Indeks 1 adalah "B" ✓

["A", "B", "C", "D"]
      ↓
["A", "Flamingo", "C", "D"]
```

---

### 📊 Action 4: Balik Urutan

```javascript
// SEBELUM
["Parrot", "Eagle", "Toucan"]
   0        1        2

// PROSES
birds.reverse()

// SESUDAH
["Toucan", "Eagle", "Parrot"]
   0        1        2
```

**Visualisasi:**
```
[Parrot] [Eagle] [Toucan]
   ↓        ↓        ↓
   └────────┼────────┘
            ↓
[Toucan] [Eagle] [Parrot]
```

---

### 📊 Action 5: Urutkan Alfabetis

```javascript
// SEBELUM
["Zebra Finch", "Parrot", "Eagle", "Sparrow"]

// PROSES
birds.sort() // Urutkan A-Z

// SESUDAH
["Eagle", "Parrot", "Sparrow", "Zebra Finch"]
```

**Visualisasi:**
```
SEBELUM (acak):
Z P E S
↓ ↓ ↓ ↓
SESUDAH (A-Z):
E P S Z
```

---

<a name="tips--trik"></a>
## 💡 Tips & Trik

### 1. **Memahami Mutability Array**
```javascript
// Array methods seperti push, shift, reverse, sort 
// MENGUBAH array asli (mutable)
const birds = ["Parrot"];
birds.push("Eagle");
console.log(birds); // ["Parrot", "Eagle"] ← array asli berubah!
```

### 2. **Menghitung Indeks Tengah**
```javascript
// Rumus: Math.floor((length - 1) / 2)

// Panjang 3: (3-1)/2 = 1 ✓
// Panjang 4: (4-1)/2 = 1.5 → 1 ✓
// Panjang 5: (5-1)/2 = 2 ✓
// Panjang 6: (6-1)/2 = 2.5 → 2 ✓
```

### 3. **Case Sensitive**
```javascript
"Parrot" !== "parrot"  // BERBEDA!
"EAGLE"  !== "Eagle"   // BERBEDA!
```

### 4. **Break Statement Penting**
```javascript
// TANPA break (SALAH):
switch(action) {
  case 1:
    birds.push("Toucan");
    // Tidak ada break, lanjut ke case 2!
  case 2:
    birds.shift(); // Ini juga dijalankan! 😱
}

// DENGAN break (BENAR):
switch(action) {
  case 1:
    birds.push("Toucan");
    break; // Stop di sini ✓
  case 2:
    birds.shift();
    break;
}
```

### 5. **Testing dengan Console.log**
```javascript
function manageAviary(birds, action) {
  console.log("SEBELUM:", [...birds]); // Copy array untuk debug
  
  switch (action) {
    case 1:
      birds.push("Toucan");
      break;
    // ... case lainnya
  }
  
  console.log("SESUDAH:", birds);
  return birds;
}
```

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan

Challenge ini mengajarkan beberapa konsep penting:

✅ **Array Manipulation** - Cara mengubah dan mengelola data dalam array  
✅ **Array Methods** - Menggunakan `push()`, `shift()`, `reverse()`, `sort()`  
✅ **Switch Statement** - Membuat keputusan berdasarkan banyak kondisi  
✅ **Index Calculation** - Menghitung posisi tengah array  
✅ **Mutable vs Immutable** - Memahami bahwa array methods mengubah array asli

### 🎯 Skill yang Didapat:
- Manipulasi data struktur array
- Penggunaan control flow (switch-case)
- Perhitungan matematika sederhana (`Math.floor`)
- Problem solving dengan multiple conditions

---

<div align="center">

### 🌟 Selamat! Kamu Telah Menyelesaikan Challenge Ini! 🌟

**Happy Coding!** 🚀

---

Dibuat dengan ❤️ untuk pembelajaran pribadi

</div>
