# 💻 Sintaks & Penggunaan — Recursion — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Recursion-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 📝 [Sintaks Dasar](#sintaks-dasar)
- 🔄 [Variasi Penulisan](#variasi)
- 🛠️ [Pola Penggunaan Umum](#pola-umum)
- ⚡ [Sintaks Modern (ES6+)](#modern)
- 🚫 [Yang Tidak Boleh Dilakukan](#jangan)
- 🔗 [Navigation](#navigation)

---

<a name="sintaks-dasar"></a>
## 📝 Sintaks Dasar

### Template

Setiap fungsi rekursif yang benar selalu punya dua blok wajib:

```js
function namaFungsi(parameter) {
  // 🛑 BASE CASE — kondisi berhenti
  if (kondisiBerhenti) {
    return nilaiAkhir;
  }

  // 🔁 RECURSIVE CASE — panggil diri sendiri dengan input lebih kecil
  return namaFungsi(parameterYangLebihKecil);
}
```

**Keterangan:**
- `kondisiBerhenti` → Kondisi yang ketika terpenuhi akan menghentikan rekursif. Tanpa ini, Stack Overflow pasti terjadi.
- `nilaiAkhir` → Nilai konkret (bukan pemanggilan fungsi) yang dikembalikan sebagai "hasil dasar".
- `parameterYangLebihKecil` → Argumen yang diteruskan harus selalu **semakin mendekati** kondisi base case.

### Contoh Konkret

```js
// ✅ Contoh konkret: Menghitung mundur dari n ke 1
function countdown(n) {
  // 🛑 Base Case: Berhenti kalau sudah di bawah atau sama dengan 0
  if (n <= 0) {
    console.log("Selesai!");
    return;
  }

  // 🔁 Recursive Case: Cetak n, lalu panggil diri sendiri dengan n-1
  console.log(n);
  countdown(n - 1);
}

countdown(3);
// Output:
// 3
// 2
// 1
// Selesai!
```

---

<a name="variasi"></a>
## 🔄 Variasi Penulisan

### Variasi 1 — Function Declaration (Klasik)

```js
// Gaya tradisional menggunakan function declaration
// Paling mudah dibaca untuk pemula karena alurnya eksplisit

function generateArray(n) {
  if (n < 0) return [];

  const smaller = generateArray(n - 1); // Tampung hasil rekursif dulu
  smaller.push(n);                       // Tambahkan elemen
  return smaller;                        // Return array yang sudah dimodifikasi
}

console.log(generateArray(5));
// Output: [0, 1, 2, 3, 4, 5]
```

> 🎯 **Gunakan variasi ini ketika:** kamu sedang belajar rekursif atau ingin kode yang paling mudah di-debug — setiap langkah terlihat jelas.

---

### Variasi 2 — Concat (Immutable Style)

```js
// Menggabungkan array dengan .concat() — tidak mengubah array asli
// Cocok untuk gaya Functional Programming

function generateArray(n) {
  if (n < 0) return [];

  return generateArray(n - 1).concat(n); // Langsung chain di baris return
}

console.log(generateArray(5));
// Output: [0, 1, 2, 3, 4, 5]
```

> 🎯 **Gunakan variasi ini ketika:** kamu ingin kode yang lebih ringkas dan mengikuti prinsip immutability — `.concat()` tidak mengubah array lama, melainkan membuat array baru.

---

### Variasi 3 — Spread Operator (ES6+ Modern)

```js
// Menggunakan spread operator [...] — paling ekspresif dan modern
// Bentuk akhir array terlihat langsung dari sintaksnya

function generateArray(n) {
  if (n < 0) return [];

  return [...generateArray(n - 1), n]; // Sebar hasil rekursif, tambahkan n di akhir
}

console.log(generateArray(5));
// Output: [0, 1, 2, 3, 4, 5]
```

> 🎯 **Gunakan variasi ini ketika:** kamu menulis kode modern dan ingin sintaks yang paling ekspresif — bentuk array finalnya `[...bagianLama, elemenBaru]` langsung terbaca.

---

### Variasi 4 — Arrow Function One-Liner

```js
// Versi paling ringkas menggunakan ternary operator
// Seluruh logika dalam satu baris

const generateArray = (n) => (n < 0 ? [] : [...generateArray(n - 1), n]);

console.log(generateArray(5));
// Output: [0, 1, 2, 3, 4, 5]
```

> 🎯 **Gunakan variasi ini ketika:** kamu sudah benar-benar paham konsep rekursif dan ingin kode yang paling ringkas, misalnya dalam utility function atau saat bermain-main di konsol.

---

<a name="pola-umum"></a>
## 🛠️ Pola Penggunaan Umum

### Pola 1 — Rekursif Mundur (Decrementing)

**Masalah yang diselesaikan:** Membangun hasil dari nilai besar menuju nilai kecil (base case), lalu menyusunnya saat fase naik (unwinding).

```js
// Pattern: Decrementing Recursion
// Argumen dikurangi setiap langkah sampai mencapai base case

function numberRange(startNum, endNum) {
  // 🛑 Base Case
  if (startNum === endNum) return [startNum];

  // 🔁 Recursive Case: kurangi endNum, tambahkan endNum saat balik
  return numberRange(startNum, endNum - 1).concat(endNum);
}

console.log(numberRange(1, 5));
// Output: [1, 2, 3, 4, 5]
```

**Kapan digunakan:** Ketika kamu memulai dari nilai besar dan ingin membangun hasil urut dari kecil ke besar.

---

### Pola 2 — Rekursif Maju (Incrementing)

**Masalah yang diselesaikan:** Membangun hasil dari nilai kecil menuju nilai besar, berguna ketika urutan harus dipertahankan dari depan.

```js
// Pattern: Incrementing Recursion
// Argumen dinaikkan setiap langkah, elemen disisipkan di depan saat balik

function numberRange(startNum, endNum) {
  // 🛑 Base Case
  if (startNum === endNum) return [startNum];

  // 🔁 Recursive Case: naikkan startNum, sisipkan startNum di depan saat balik
  const numbers = numberRange(startNum + 1, endNum);
  numbers.unshift(startNum);
  return numbers;
}

console.log(numberRange(1, 5));
// Output: [1, 2, 3, 4, 5]
```

**Kapan digunakan:** Ketika kamu memulai dari nilai kecil dan ingin memastikan urutan dari kiri ke kanan.

---

### Pola 3 — Rekursif Penelusuran Struktur Bertingkat (Tree Traversal)

**Masalah yang diselesaikan:** Menelusuri dan memproses data yang bertingkat-tingkat dengan kedalaman yang tidak diketahui.

```js
// Pattern: Tree / Nested Structure Traversal
const folders = {
  name: "Root",
  subfolders: [
    { name: "Music", subfolders: [] },
    {
      name: "Photos",
      subfolders: [{ name: "2024", subfolders: [] }]
    }
  ]
};

function printFolders(folder) {
  // 🛑 Base Case: tidak ada subfolder lagi
  console.log(folder.name);

  // 🔁 Recursive Case: untuk setiap subfolder, lakukan hal yang sama
  for (const sub of folder.subfolders) {
    printFolders(sub);
  }
}

printFolders(folders);
// Output:
// Root
// Music
// Photos
// 2024
```

**Kapan digunakan:** Kapanpun berurusan dengan folder file, menu bertingkat, komentar bersarang, atau struktur data berbentuk pohon (tree).

---

<a name="modern"></a>
## ⚡ Sintaks Modern (ES6+)

| Cara Lama (ES5) | Cara Modern (ES6+) |
|:---|:---|
| `function` declaration + `push` | Arrow function + Spread `...` |
| Variabel perantara + manipulasi array | Satu ekspresi langsung di `return` |

```js
// ❌ Cara lama — ES5, verbose
function generateArray(n) {
  if (n < 0) return [];
  var smaller = generateArray(n - 1);
  smaller.push(n);
  return smaller;
}

// ✅ Cara modern — ES6+, ringkas dan immutable
const generateArray = (n) => n < 0 ? [] : [...generateArray(n - 1), n];
```

> 💡 **Kapan tetap pakai cara lama?** Ketika kamu perlu debugging yang mudah atau kode perlu dibaca oleh tim yang belum terbiasa dengan ES6+. Cara lama dengan variabel bernama jelas lebih mudah diberi `console.log` di setiap langkah.

---

<a name="jangan"></a>
## 🚫 Yang Tidak Boleh Dilakukan

### ❌ Jangan Memanggil Rekursif Tanpa Base Case

```js
// ❌ Salah — tidak ada kondisi berhenti
function countdown(n) {
  console.log(n);
  countdown(n - 1); // Tidak pernah berhenti!
}

countdown(3);
// ❌ RangeError: Maximum call stack size exceeded
```

```js
// ✅ Benar — selalu sertakan base case
function countdown(n) {
  if (n <= 0) return; // 🛑 Wajib ada!
  console.log(n);
  countdown(n - 1);
}
```

> ⚠️ **Kenapa bermasalah?** Tanpa base case, Call Stack akan terus terisi tanpa pernah dikosongkan. JavaScript Engine memiliki batas maksimum ukuran stack — begitu terlampaui, program crash dengan `RangeError: Maximum call stack size exceeded`.

---

### ❌ Jangan Membuat Base Case yang Tidak Mencakup Semua Nilai Batas

```js
// ❌ Salah — base case hanya menangkap nilai tepat 0
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

factorial(5);   // ✅ Bekerja: 120
factorial(-1);  // ❌ Stack Overflow! -1 tidak pernah === 0
```

```js
// ✅ Benar — gunakan operator perbandingan yang lebih inklusif
function factorial(n) {
  if (n <= 0) return 1; // Menangkap 0 DAN semua angka negatif
  return n * factorial(n - 1);
}

factorial(-1); // ✅ return 1, aman!
```

> ⚠️ **Kenapa bermasalah?** Base case `=== 0` hanya berhenti tepat di angka `0`. Jika nilai awalnya sudah negatif, kondisi itu tidak pernah tercapai dan rekursif berjalan selamanya.

---

### ❌ Jangan Pakai Rekursif untuk Iterasi Sederhana yang Besar

```js
// ❌ Salah — menggunakan rekursif untuk tugas yang cocoknya pakai loop
function sumTo(n) {
  if (n <= 0) return 0;
  return n + sumTo(n - 1);
}

sumTo(100000); // ❌ Stack Overflow pada input besar!
```

```js
// ✅ Benar — gunakan loop untuk iterasi sederhana dengan input besar
function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

sumTo(100000); // ✅ Aman dan efisien
```

> ⚠️ **Kenapa bermasalah?** Setiap pemanggilan rekursif mengkonsumsi satu slot di Call Stack. Untuk `n = 100.000`, kamu butuh 100.000 slot sekaligus — jauh melebihi kapasitas stack JavaScript.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02 — Cara Kerja](./02-cara-kerja_rekursif.md)**
- **📖 [Lanjut ke Part 04 — Contoh Nyata →](./04-contoh-nyata_rekursif.md)**
