# 📜 Dokumentasi Belajar: Sorting Antique Prints Collection

> 📅 **Tanggal:** 28 Maret 2026
> 🎯 **Level:** Easy
> 🛠️ **Bahasa:** JavaScript

---

## 🗂️ Daftar Isi

- 📋 [Problem Statement](#problem-statement)
- 🐛 [Kode Awal & Bug yang Ditemukan](#kode-awal--bug-yang-ditemukan)
- 💡 [Kenapa Bug Itu Terjadi?](#kenapa-bug-itu-terjadi)
- 🔨 [Proses Perbaikan](#proses-perbaikan)
- 🧪 [Test Case](#test-case)
- ✅ [Solusi Final](#solusi-final)
- 🔄 [Perbandingan Solusi](#perbandingan-solusi)
- 📚 [Konsep yang Dipelajari](#konsep-yang-dipelajari)

---

<a name="problem-statement"></a>
## 📋 Problem Statement

### 🎯 Tujuan Fungsi

Membuat fungsi `sortAntiquePrints` yang menerima dua array terpisah — nama dan tahun cetakan antik — lalu **menggabungkannya menjadi array of objects** dan **mengurutkannya dari yang paling tua ke paling baru** berdasarkan tahun.

Bayangkan kamu sedang bekerja di toko antik yang berantakan. Ada dua daftar terpisah: satu berisi nama-nama print, satu lagi berisi tahun pembuatannya. Tugasmu adalah menyatukannya dan mengurutkan koleksi dari yang tertua.

---

### 📥 Detail Parameter

| Parameter | Tipe | Deskripsi | Contoh Nilai |
|---|---|---|---|
| `printNames` | `Array<string>` | Nama-nama cetakan antik | `['Mona Lisa', 'The Starry Night']` |
| `printYears` | `Array<number>` | Tahun pembuatan tiap cetakan | `[1503, 1889]` |

> 💡 **Penting:** Elemen di index yang sama saling berpasangan.
> `printNames[0]` → `printYears[0]`, `printNames[1]` → `printYears[1]`, dst.
> Jadi `'Mona Lisa'` berpasangan dengan `1503`, dan `'The Starry Night'` berpasangan dengan `1889`.

---

### 📤 Detail Return Value

Fungsi mengembalikan **`Array<Object>`** — setiap object memiliki tepat **dua properti**:

| Properti | Tipe | Deskripsi | Contoh |
|---|---|---|---|
| `name` | `string` | Nama cetakan, diambil dari `printNames` | `'Mona Lisa'` |
| `year` | `number` | Tahun pembuatan, diambil dari `printYears` | `1503` |

Array dikembalikan dalam urutan **ascending berdasarkan `year`** (terlama → terbaru), bukan urutan dari input aslinya.

---

### 🔢 Langkah Penyelesaian

1. **Combine** — Gabungkan `printNames` dan `printYears` menjadi array of objects
2. **Sort** — Urutkan array berdasarkan properti `year` dari terkecil ke terbesar
3. **Return** — Kembalikan array yang sudah diurutkan

---

### 💡 Contoh Input & Output

**Contoh 1 — Input sudah urut (2 item):**
```javascript
// Input
printNames = ['Mona Lisa', 'The Starry Night']
printYears  = [1503, 1889]

// Output → urutan tidak berubah karena sudah dari terlama
[
  { name: 'Mona Lisa', year: 1503 },
  { name: 'The Starry Night', year: 1889 }
]
```

**Contoh 2 — Input tidak urut (perlu disortir):**
```javascript
// Input → perhatikan urutannya acak
printNames = ['The Starry Night', 'The Birth of Venus', 'Mona Lisa']
printYears  = [1889, 1484, 1503]

// Output → diurutkan dari tahun terkecil
[
  { name: 'The Birth of Venus', year: 1484 },
  { name: 'Mona Lisa', year: 1503 },
  { name: 'The Starry Night', year: 1889 }
]
```

**Contoh 3 — Single item:**
```javascript
// Input
printNames = ['Water Lilies']
printYears  = [1906]

// Output → array dengan satu object, tidak perlu disortir
[{ name: 'Water Lilies', year: 1906 }]
```

---

### ⚠️ Asumsi & Batasan

| | Kondisi | Keterangan |
|---|---|---|
| ✅ | Kedua array **selalu sama panjang** | Tidak perlu handle kasus panjang berbeda |
| ✅ | Tipe data **selalu valid** | `printNames` selalu string, `printYears` selalu number |
| ✅ | Array **tidak akan kosong** | Minimal selalu ada 1 elemen |
| ✅ | Tidak ada nilai `null` atau `undefined` | Semua elemen dijamin terisi |
| ⚠️ | **Tahun yang sama (tie)** tidak diatur | Kalau ada dua print dengan tahun sama, urutan relatifnya bebas |

---

<a name="kode-awal--bug-yang-ditemukan"></a>
## 🐛 Kode Awal & Bug yang Ditemukan

Ini kode pertama yang ditulis saat mencoba bagian **grouping**:

```javascript
function sortAntiquePrints(printNames, printYears) {
  const result = [];
  const newObject = {}; // ⚠️ Bug ada di sini!

  for (let i = 0; i < printNames.length; i++) {
    newObject['name'] = printNames[i];
    newObject['year'] = printYears[i];

    result.push(newObject);
    console.log(result);
  }
}
```

**Gejala bug-nya:** object di dalam `result` selalu **ketimpa** — semua elemen akhirnya isi yang sama.

---

<a name="kenapa-bug-itu-terjadi"></a>
## 💡 Kenapa Bug Itu Terjadi?

Masalahnya ada di posisi `const newObject = {}` yang dideklarasikan **di luar loop**.

Karena JavaScript menyimpan **referensi** ke object (bukan kopiannya), ketika kita push `newObject` ke `result`, yang masuk ke array bukan *salinan* object-nya — melainkan **pointer** ke object yang sama.

Jadi setiap iterasi, kita menimpa object yang sama, dan semua elemen di `result` menunjuk ke object yang sama itu.

```javascript
// Ilustrasi masalahnya:
const obj = {};
const arr = [];

obj.name = 'A'; arr.push(obj); // arr[0] → { name: 'A' }
obj.name = 'B'; arr.push(obj); // arr[0] dan arr[1] → { name: 'B' } ← ikut berubah!

console.log(arr); // [{ name: 'B' }, { name: 'B' }] ← bukan yang diharapkan!
```

> 💬 **Intinya:** kalau object dibuat di luar loop, semua elemen array akan menunjuk ke object yang **sama**. Bikin object baru di **dalam** loop!

---

<a name="proses-perbaikan"></a>
## 🔨 Proses Perbaikan

### Step 1 — Fix Grouping

Solusinya simpel: pindahkan pembuatan object ke **dalam** loop, atau langsung buat object literal saat `push`:

```javascript
// ✅ Cara 1: Pindahkan newObject ke dalam loop
for (let i = 0; i < printNames.length; i++) {
  const newObject = {}; // ← buat object BARU tiap iterasi
  newObject['name'] = printNames[i];
  newObject['year'] = printYears[i];
  result.push(newObject);
}

// ✅ Cara 2: Langsung object literal (lebih ringkas)
for (let i = 0; i < printNames.length; i++) {
  result.push({
    name: printNames[i],
    year: printYears[i]
  });
}
```

### Step 2 — Tambahkan Sorting

Setelah grouping beres, tinggal tambahkan `.sort()` sebelum return:

```javascript
// sort() dengan comparator function untuk sorting berdasarkan year
result.sort((a, b) => a.year - b.year);
```

**Cara kerja `(a, b) => a.year - b.year`:**
- Kalau hasilnya **negatif** → `a` duluan
- Kalau hasilnya **positif** → `b` duluan
- Kalau hasilnya **0** → posisi tidak berubah

Karena kita mau dari terkecil ke terbesar (oldest first), maka `a.year - b.year` sudah benar.

---

<a name="test-case"></a>
## 🧪 Test Case

Berikut test case yang dipakai selama proses debug:

```javascript
// ✅ Test 1: Basic case (2 item, sudah urut)
const printNames1 = ['Mona Lisa', 'The Starry Night'];
const printYears1  = [1503, 1889];
console.log(sortAntiquePrints(printNames1, printYears1));
// Expected: [ { name: 'Mona Lisa', year: 1503 }, { name: 'The Starry Night', year: 1889 } ]

// ✅ Test 2: Single item
const printNames2 = ['Water Lilies'];
const printYears2  = [1906];
console.log(sortAntiquePrints(printNames2, printYears2));
// Expected: [ { name: 'Water Lilies', year: 1906 } ]

// ✅ Test 3: 3 item, tidak urut → sekaligus test sorting
const printNames3 = ['Print A', 'Print B', 'Print C'];
const printYears3  = [1800, 1750, 1900];
console.log(sortAntiquePrints(printNames3, printYears3));
// Expected: [ { name: 'Print B', year: 1750 }, { name: 'Print A', year: 1800 }, { name: 'Print C', year: 1900 } ]
```

> 💡 **Tips:** Test 3 sengaja dibuat tidak urut supaya bisa sekaligus memvalidasi fungsi sorting-nya bekerja dengan benar.

---

<a name="solusi-final"></a>
## ✅ Solusi Final

```javascript
function sortAntiquePrints(printNames, printYears) {
  const result = [];

  for (let i = 0; i < printNames.length; i++) {
    result.push({ name: printNames[i], year: printYears[i] });
  }

  return result.sort((a, b) => a.year - b.year);
}
```

Ringkas dan mudah dibaca — langsung `return` hasil `.sort()` tanpa perlu variabel tambahan.

---

<a name="perbandingan-solusi"></a>
## 🔄 Perbandingan Solusi

| | Solusi Saya | Solusi Coddy |
|---|---|---|
| **Grouping** | `for` loop + `push` | `.map()` |
| **Sorting** | `.sort((a, b) => a.year - b.year)` | `.sort((a, b) => a.year - b.year)` |
| **Return** | `return result.sort(...)` | `return prints` (terpisah) |

**Solusi Coddy untuk referensi:**
```javascript
function sortAntiquePrints(printNames, printYears) {
  const prints = printNames.map((name, index) => ({
    name: name,
    year: printYears[index]
  }));

  prints.sort((a, b) => a.year - b.year);

  return prints;
}
```

> 💬 **Kesimpulan:** Keduanya valid dan menghasilkan output yang sama. Solusi Coddy menggunakan `.map()` yang lebih idiomatik di JavaScript modern, tapi `for` loop lebih mudah dipahami untuk pemula. Bagian sorting-nya identik.

---

<a name="konsep-yang-dipelajari"></a>
## 📚 Konsep yang Dipelajari

### 1. 🔗 Object Reference vs Value
JavaScript menyimpan object sebagai **referensi**, bukan salinan. Kalau kamu push object yang sama berulang kali, semua elemen array akan menunjuk ke object yang sama.

### 2. 🔄 Array `.sort()` dengan Comparator
`.sort()` tanpa argumen mengurutkan sebagai string (bisa bermasalah untuk angka). Selalu pakai comparator untuk angka:
```javascript
arr.sort((a, b) => a - b);        // ascending
arr.sort((a, b) => b - a);        // descending
arr.sort((a, b) => a.year - b.year); // sorting by property
```

### 3. 🗺️ Array `.map()` untuk Transformasi
`.map()` membuat array baru dengan mentransformasi tiap elemen:
```javascript
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]
```
Untuk grouping dua array, bisa pakai index dari `.map()`:
```javascript
names.map((name, index) => ({ name, year: years[index] }));
```

### 4. 📦 Object Literal Shorthand
Kalau nama variabel sama dengan nama property, bisa disingkat:
```javascript
const name = 'Mona Lisa';
const year = 1503;

// Cara panjang
{ name: name, year: year }

// Shorthand
{ name, year } // ✅ sama hasilnya!
```
