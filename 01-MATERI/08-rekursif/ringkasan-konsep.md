# 📋 Ringkasan Konsep — Recursion — Rekursif

> *Cheat sheet untuk referensi cepat — semua hal penting tentang Rekursif dalam satu halaman.*

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Recursion-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Cheat%20Sheet-orange?style=for-the-badge)

---

## 📑 Daftar Isi

- 🎯 [Definisi & Inti Konsep](#definisi)
- 💻 [Sintaks Ringkas](#sintaks)
- 🛠️ [Pola Penggunaan Umum](#pola)
- 🎯 [Kapan Digunakan / Kapan Tidak](#kapan)
- ⚠️ [Jangan Lakukan Ini](#jangan)
- 💡 [Tips & Insight Kunci](#tips)
- 🔗 [Navigation](#navigation)

---

<a name="definisi"></a>
## 🎯 Definisi & Inti Konsep

**Recursion (Rekursif)** adalah teknik di mana sebuah function memanggil dirinya sendiri secara berulang hingga mencapai kondisi berhenti yang disebut *base case*.

**Intinya:** Setiap fungsi rekursif wajib punya dua komponen: **Base Case** (titik henti) dan **Recursive Case** (langkah yang mendekati titik henti). Tanpa keduanya, program crash.

> 💡 **Analogi:** Seperti membuka kardus yang berisi kardus lagi — kamu terus buka ke dalam sampai menemukan isinya (base case), lalu kembali ke atas sambil membawa hasilnya.

---

<a name="sintaks"></a>
## 💻 Sintaks Ringkas

### Sintaks Dasar

```js
function namaFungsi(n) {
  if (kondisiBerhenti) return nilaiAkhir; // 🛑 Base Case
  return namaFungsi(inputLebihKecil);    // 🔁 Recursive Case
}
```

### Variasi Umum

```js
// Variasi 1 — Function Declaration (klasik, paling readable)
function generateArray(n) {
  if (n < 0) return [];
  const smaller = generateArray(n - 1);
  smaller.push(n);
  return smaller;
}

// Variasi 2 — Concat (immutable)
function generateArray(n) {
  if (n < 0) return [];
  return generateArray(n - 1).concat(n);
}

// Variasi 3 — Spread (immutable, ES6+)
function generateArray(n) {
  if (n < 0) return [];
  return [...generateArray(n - 1), n];
}
```

### Versi Modern (ES6+)

```js
// One-liner dengan Arrow Function + Ternary
const generateArray = (n) => (n < 0 ? [] : [...generateArray(n - 1), n]);
```

---

<a name="pola"></a>
## 🛠️ Pola Penggunaan Umum

### Pola 1 — Rekursif Mundur (Decrement)

```js
// Kurangi argumen setiap langkah, tambahkan ke array saat unwinding
function numberRange(start, end) {
  if (start === end) return [start];
  return numberRange(start, end - 1).concat(end);
}
// numberRange(1, 5) → [1, 2, 3, 4, 5]
```

### Pola 2 — Rekursif Maju (Increment)

```js
// Naikkan argumen setiap langkah, sisipkan di depan saat unwinding
function numberRange(start, end) {
  if (start === end) return [start];
  const arr = numberRange(start + 1, end);
  arr.unshift(start);
  return arr;
}
// numberRange(1, 5) → [1, 2, 3, 4, 5]
```

### Pola 3 — Tree / Nested Traversal

```js
// Telusuri struktur bercabang tanpa tahu seberapa dalam
function printAll(node) {
  console.log(node.name);                  // Proses node saat ini
  for (const child of node.children) {
    printAll(child);                       // Rekursif untuk setiap cabang
  }
}
```

### Pola 4 — Flatten Nested Array

```js
// Ratakan array bersarang tanpa .flat()
function flatten(arr) {
  return arr.reduce((acc, item) =>
    Array.isArray(item)
      ? acc.concat(flatten(item))          // Rekursif jika item adalah array
      : acc.concat(item),
  []);
}
// flatten([1, [2, [3]]]) → [1, 2, 3]
```

### Pola 5 — Faktorial

```js
// Definisi matematika rekursif: n! = n × (n-1)!
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
// factorial(5) → 120
```

---

<a name="kapan"></a>
## 🎯 Kapan Digunakan / Kapan Tidak

| ✅ Gunakan Ketika | ❌ Hindari Ketika |
|:------------------|:-----------------|
| Struktur data bercabang/nested dengan kedalaman tidak pasti | Iterasi sederhana linear dengan jumlah pasti |
| Definisi masalahnya sendiri bersifat rekursif (Faktorial, Fibonacci) | Input bisa sangat besar (>10.000) — risiko Stack Overflow |
| Menulis kode bergaya Functional Programming (immutability) | Performa kritis — loop jauh lebih efisien di sini |
| Menelusuri Tree, DOM, folder sistem, atau menu bertingkat | Tim belum familiar dengan rekursif — keterbacaan jadi prioritas |

---

<a name="jangan"></a>
## ⚠️ Jangan Lakukan Ini

```js
// ❌ Rekursif tanpa Base Case — pasti Stack Overflow
function panggilSaya() {
  panggilSaya(); // Tidak ada titik berhenti!
}

// ✅ Selalu sertakan Base Case
function panggilSaya(n) {
  if (n <= 0) return;
  panggilSaya(n - 1);
}
```

---

```js
// ❌ Base Case terlalu ketat — tidak menangkap input negatif
function countdown(n) {
  if (n === 0) return; // -1 tidak pernah === 0!
  countdown(n - 1);
}
countdown(-1); // 💥 Stack Overflow

// ✅ Gunakan operator perbandingan yang lebih inklusif
function countdown(n) {
  if (n <= 0) return; // Tangkap 0 dan semua negatif
  countdown(n - 1);
}
```

---

```js
// ❌ Aksi setelah rekursif ketika urutan besar→kecil diharapkan
function printDesc(n) {
  if (n <= 0) return;
  printDesc(n - 1);
  console.log(n); // Tercetak saat unwinding → urutan TERBALIK (1, 2, 3)
}

// ✅ Aksi sebelum rekursif untuk urutan besar→kecil
function printDesc(n) {
  if (n <= 0) return;
  console.log(n); // Tercetak saat masuk → urutan benar (3, 2, 1)
  printDesc(n - 1);
}
```

---

<a name="tips"></a>
## 💡 Tips & Insight Kunci

- 🔑 **Pola V-Shape:** Rekursif selalu turun ke dasar (base case) dulu, baru naik kembali sambil membawa nilai — visualisasikan sebagai huruf V.
- 🔑 **Aksi sebelum = fase turun, aksi sesudah = fase naik:** Posisi `console.log` atau kalkulasi relatif terhadap pemanggilan rekursif menentukan urutannya.
- 🔑 **Immutability:** `.concat()` dan spread `[...]` lebih FP-friendly dari `.push()` karena tidak mengubah array yang sudah ada.
- 🔑 **Gunakan `<=` bukan `===` untuk base case numerik:** Lebih aman, menangkap semua nilai di "sisi aman".
- 🔑 **Rekursif natural untuk masalah natural:** Kalau struktur datanya nested, rekursif adalah solusi yang paling elegant.
- ⚠️ **Tanpa base case = Stack Overflow pasti:** `RangeError: Maximum call stack size exceeded` adalah tanda rekursif tidak pernah berhenti.
- ⚠️ **Rekursif ≠ selalu lebih baik dari loop:** Untuk iterasi sederhana atau input besar, loop biasa lebih aman dan lebih efisien.
- ⚠️ **FP Connection:** Di Functional Programming (Haskell, Erlang), rekursif adalah satu-satunya cara iterasi karena `for`/`while` membutuhkan mutasi variabel yang melanggar prinsip immutability.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](./README.md)**
- **📖 [Dokumentasi Lengkap — docs/](./docs/)**
