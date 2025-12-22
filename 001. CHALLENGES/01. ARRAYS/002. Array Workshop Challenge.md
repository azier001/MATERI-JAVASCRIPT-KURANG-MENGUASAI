# 🎨 Array Workshop Challenge

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

**Manipulasi Array dengan JavaScript - Tantangan untuk Pemula**

[Daftar Isi](#daftar-isi) • [Demo](#demo) • [Penjelasan](#penjelasan)

</div>

---

## 📑 Daftar Isi

- [Pengenalan](#pengenalan)
- [Deskripsi Challenge](#deskripsi-challenge)
- [Solusi Kode](#solusi-kode)
- [Cara Kerja Fungsi](#cara-kerja-fungsi)
  - [Step 1: Menghapus Duplikat](#step-1-menghapus-duplikat)
  - [Step 2: Menambahkan Angka 0](#step-2-menambahkan-angka-0)
  - [Step 3: Mengganti Elemen Pertama dan Terakhir](#step-3-mengganti-elemen-pertama-dan-terakhir)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Penjelasan Konsep](#penjelasan-konsep)
  - [Apa itu Set?](#apa-itu-set)
  - [Apa itu Spread Operator?](#apa-itu-spread-operator)
  - [Apa itu While Loop?](#apa-itu-while-loop)
- [Tips untuk Pemula](#tips-untuk-pemula)
- [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Selamat datang di dokumentasi **Array Workshop Challenge**! 

Challenge ini dirancang khusus untuk membantu kamu memahami dasar-dasar manipulasi array di JavaScript. Kamu akan belajar bagaimana cara:
- Menghapus data yang duplikat
- Memanipulasi panjang array
- Melakukan operasi matematika pada elemen array

Cocok banget buat kamu yang baru belajar JavaScript! 🚀

---

<a name="deskripsi-challenge"></a>
## 📝 Deskripsi Challenge

### Tugas Utama

Buat sebuah fungsi bernama `arrayWorkshop` yang menerima sebuah array berisi angka-angka. Fungsi ini harus melakukan **3 operasi** berurutan:

| Step | Operasi | Deskripsi |
|------|---------|-----------|
| 1️⃣ | **Hapus Duplikat** | Menghilangkan angka yang muncul lebih dari satu kali |
| 2️⃣ | **Tambahkan 0** | Jika array kurang dari 3 elemen, tambahkan angka 0 |
| 3️⃣ | **Ganti Ujung-ujung** | Ganti elemen pertama dan terakhir dengan hasil penjumlahannya |

### Kriteria
- **Tingkat Kesulitan**: Easy ⭐
- **Konsep yang Dipelajari**: Array, Set, Loops, Spread Operator
- **Output**: Array yang sudah dimodifikasi

---

<a name="solusi-kode"></a>
## 💻 Solusi Kode

```javascript
function arrayWorkshop(arr) {
  // Remove duplicates
  let unique = [...new Set(arr)];
  
  // Add 0s if fewer than 3 elements
  while (unique.length < 3) {
    unique.push(0);
  }
  
  // Replace first and last with their sum
  let sum = unique[0] + unique[unique.length - 1];
  unique[0] = sum;
  unique[unique.length - 1] = sum;
  
  return unique;
}
```

---

<a name="cara-kerja-fungsi"></a>
## 🔧 Cara Kerja Fungsi

Mari kita bedah satu per satu bagaimana fungsi ini bekerja!

<a name="step-1-menghapus-duplikat"></a>
### Step 1: Menghapus Duplikat 🧹

```javascript
let unique = [...new Set(arr)];
```

**Apa yang terjadi?**
- `new Set(arr)` → Membuat Set yang otomatis menghapus duplikat
- `[...]` (Spread operator) → Mengubah Set kembali menjadi Array

**Contoh:**
```javascript
Input:  [1, 2, 2, 3, 3, 3]
Set:    Set {1, 2, 3}
Output: [1, 2, 3]
```

---

<a name="step-2-menambahkan-angka-0"></a>
### Step 2: Menambahkan Angka 0 ➕

```javascript
while (unique.length < 3) {
  unique.push(0);
}
```

**Apa yang terjadi?**
- Cek apakah panjang array kurang dari 3
- Jika iya, tambahkan angka 0 terus-menerus sampai array punya 3 elemen

**Contoh:**
```javascript
Input:  [5]
Loop 1: [5, 0]       // Masih < 3, tambah lagi
Loop 2: [5, 0, 0]    // Sudah = 3, berhenti
Output: [5, 0, 0]
```

---

<a name="step-3-mengganti-elemen-pertama-dan-terakhir"></a>
### Step 3: Mengganti Elemen Pertama dan Terakhir 🔄

```javascript
let sum = unique[0] + unique[unique.length - 1];
unique[0] = sum;
unique[unique.length - 1] = sum;
```

**Apa yang terjadi?**
- Hitung jumlah elemen pertama + elemen terakhir
- Ganti kedua elemen tersebut dengan hasil penjumlahan

**Contoh:**
```javascript
Input:  [3, 5, 7]
Sum:    3 + 7 = 10
Output: [10, 5, 10]
        ↑      ↑
     pertama terakhir
```

---

<a name="contoh-penggunaan"></a>
## 🎬 Contoh Penggunaan

### Contoh 1: Array dengan Duplikat

```javascript
console.log(arrayWorkshop([1, 2, 2, 3, 3, 3]));
```

**Output:**
```javascript
[4, 2, 4]
```

**Proses:**
1. Hapus duplikat: `[1, 2, 3]`
2. Sudah 3 elemen, skip penambahan 0
3. Sum = 1 + 3 = 4, ganti: `[4, 2, 4]`

---

### Contoh 2: Array dengan Elemen Sedikit

```javascript
console.log(arrayWorkshop([5]));
```

**Output:**
```javascript
[5, 0, 5]
```

**Proses:**
1. Tidak ada duplikat: `[5]`
2. Tambah 0 sampai 3 elemen: `[5, 0, 0]`
3. Sum = 5 + 0 = 5, ganti: `[5, 0, 5]`

---

### Contoh 3: Array Kosong

```javascript
console.log(arrayWorkshop([]));
```

**Output:**
```javascript
[0, 0, 0]
```

**Proses:**
1. Tidak ada elemen: `[]`
2. Tambah 0 sampai 3 elemen: `[0, 0, 0]`
3. Sum = 0 + 0 = 0, ganti: `[0, 0, 0]`

---

### Contoh 4: Array dengan Angka Negatif

```javascript
console.log(arrayWorkshop([-5, 10, -5, 20]));
```

**Output:**
```javascript
[15, 10, 15]
```

**Proses:**
1. Hapus duplikat: `[-5, 10, 20]`
2. Sudah 3 elemen, skip penambahan 0
3. Sum = -5 + 20 = 15, ganti: `[15, 10, 15]`

---

### Contoh 5: Array dengan Semua Elemen Sama

```javascript
console.log(arrayWorkshop([7, 7, 7, 7, 7]));
```

**Output:**
```javascript
[7, 0, 7]
```

**Proses:**
1. Hapus duplikat: `[7]`
2. Tambah 0 sampai 3 elemen: `[7, 0, 0]`
3. Sum = 7 + 0 = 7, ganti: `[7, 0, 7]`

---

<a name="penjelasan-konsep"></a>
## 📚 Penjelasan Konsep

<a name="apa-itu-set"></a>
### 📖 Apa itu Set?

**Set** adalah struktur data di JavaScript yang **hanya menyimpan nilai unik** (tidak ada duplikat).

```javascript
// Contoh penggunaan Set
let angka = [1, 2, 2, 3, 3, 3];
let unik = new Set(angka);

console.log(unik);
// Output: Set {1, 2, 3}
```

**Kenapa pakai Set?**
- ✅ Otomatis menghapus duplikat
- ✅ Lebih cepat daripada loop manual
- ✅ Kode lebih singkat dan mudah dibaca

---

<a name="apa-itu-spread-operator"></a>
### 📖 Apa itu Spread Operator?

**Spread Operator** (`...`) digunakan untuk "membuka" atau "menyebarkan" elemen dari array atau object.

```javascript
// Mengubah Set menjadi Array
let mySet = new Set([1, 2, 3]);
let myArray = [...mySet];

console.log(myArray);
// Output: [1, 2, 3]
```

**Kegunaan lain:**
```javascript
// Menggabungkan array
let arr1 = [1, 2];
let arr2 = [3, 4];
let gabung = [...arr1, ...arr2];
// Output: [1, 2, 3, 4]

// Copy array
let asli = [1, 2, 3];
let salinan = [...asli];
```

---

<a name="apa-itu-while-loop"></a>
### 📖 Apa itu While Loop?

**While Loop** adalah pengulangan yang terus berjalan **selama kondisi bernilai true**.

```javascript
let count = 0;

while (count < 3) {
  console.log("Count:", count);
  count++;
}

// Output:
// Count: 0
// Count: 1
// Count: 2
```

**Dalam kode kita:**
```javascript
while (unique.length < 3) {
  unique.push(0);
}
```
Artinya: "Selama panjang array masih kurang dari 3, terus tambahkan 0"

---

<a name="tips-untuk-pemula"></a>
## 💡 Tips untuk Pemula

### 1. Gunakan Console.log untuk Debug 🐛

```javascript
function arrayWorkshop(arr) {
  console.log("Input:", arr);
  
  let unique = [...new Set(arr)];
  console.log("Setelah hapus duplikat:", unique);
  
  while (unique.length < 3) {
    unique.push(0);
  }
  console.log("Setelah tambah 0:", unique);
  
  let sum = unique[0] + unique[unique.length - 1];
  unique[0] = sum;
  unique[unique.length - 1] = sum;
  console.log("Output final:", unique);
  
  return unique;
}
```

### 2. Pahami Index Array 📊

```javascript
let arr = [10, 20, 30];

arr[0]              // 10 (elemen pertama)
arr[arr.length - 1] // 30 (elemen terakhir)
arr.length          // 3 (jumlah elemen)
```

### 3. Latihan Variasi 🎯

Coba modifikasi fungsi dengan:
- Menambahkan angka selain 0
- Mengganti elemen tengah
- Mengalikan daripada menjumlahkan

### 4. Test dengan Berbagai Input 🧪

```javascript
// Test berbagai kasus
arrayWorkshop([1, 2, 3]);           // Normal
arrayWorkshop([]);                  // Kosong
arrayWorkshop([1, 1, 1]);           // Semua sama
arrayWorkshop([100]);               // Satu elemen
arrayWorkshop([-5, -10, -5, -10]); // Negatif
```

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan

Selamat! 🎉 Kamu telah berhasil memahami:

✅ Cara menghapus duplikat dengan **Set**  
✅ Cara menggunakan **Spread Operator**  
✅ Cara manipulasi array dengan **While Loop**  
✅ Cara mengakses dan mengubah elemen array  

### Konsep yang Dipelajari:

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| `Set` | Menghapus duplikat otomatis |
| `...` (Spread) | Menyebarkan elemen array/set |
| `while` | Loop dengan kondisi |
| `array[0]` | Akses elemen pertama |
| `array[length-1]` | Akses elemen terakhir |
| `.push()` | Menambah elemen di akhir array |

---

<div align="center">

### 🌟 Keep Learning & Happy Coding! 🌟

**Dokumentasi Pribadi - Dibuat untuk Pembelajaran**

---

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge)

</div>
