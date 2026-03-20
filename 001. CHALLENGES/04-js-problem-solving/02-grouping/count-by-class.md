# 🏫 Count By Class
### Menghitung Jumlah Data Per Kategori

![Kategori](https://img.shields.io/badge/Kategori-Grouping-purple)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Loop%20%7C%20Object%20%7C%20Frequency--Counter-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Count By Class |
| 2 | [🧠 Memahami Konsep](#-memahami-konsep) | Inti cara kerjanya |
| 3 | [🧪 Contoh Kasus](#-contoh-kasus) | Input & output yang diharapkan |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |

---

## 📋 Deskripsi

**Count By Class** adalah kombinasi dari **Grouping** dan **Frequency Counter** — menghitung jumlah data berdasarkan nilai properti tertentu dari sebuah objek.

Digunakan ketika:
- menghitung **jumlah siswa per kelas**
- menghitung **jumlah produk per kategori**
- menghitung **jumlah transaksi per kota**

> Perbedaan dengan Basic Grouping: Basic Grouping **mengumpulkan** datanya, Count By Class hanya **menghitung** jumlahnya.

---

## 🧠 Memahami Konsep

> Inti dari count by class:
> **Ambil nilai properti tertentu dari setiap objek, lalu hitung kemunculannya.**

Ini seperti Frequency Counter, tapi datanya bukan array sederhana — melainkan array of object. Kamu perlu masuk ke dalam objek dulu untuk mengambil key yang ingin dihitung.

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const students = [
  { name: 'Dimitri', score: 90, class: 'foxes' },
  { name: 'Alexei', score: 85, class: 'wolves' },
  { name: 'Sergei', score: 74, class: 'foxes' },
  { name: 'Anastasia', score: 78, class: 'wolves' }
]
```

**Output yang diharapkan:**
```javascript
{
  foxes: 2,
  wolves: 2
}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi (loop) | Menelusuri setiap objek dalam array |
| Destructuring | Mengambil properti `class` dari setiap objek |
| Object sebagai map | Menyimpan hitungan per kategori |
| Frequency Counter | Menghitung kemunculan setiap kategori |

---

## 🔄 Implementasi

```javascript
const countByClass = (students) => {              // 1️⃣ Fungsi menerima array of object
  const result = {}                               // 2️⃣ Wadah kosong untuk hasil hitungan

  for (const { class: className } of students) { // 3️⃣ Destructuring: ambil properti class
    result[className] = (result[className] || 0) + 1 // 4️⃣ Hitung kemunculan per kelas
  }

  return result                                   // 5️⃣ Kembalikan object hasil hitungan
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const countByClass = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `const result = {}` | Object kosong sebagai wadah — setiap kelas akan jadi key di sini |
| 3️⃣ | `const { class: className } of students` | Destructuring mengambil nilai `class` dari tiap objek. Karena `class` adalah reserved word di JS, di-rename jadi `className` |
| 4️⃣ | `(result[className] \|\| 0) + 1` | Jika key belum ada, mulai dari `0`. Jika sudah ada, tambah `1` |
| 5️⃣ | `return result` | Kembalikan object berisi jumlah per kelas |

---

## 🧪 Visualisasi

**Data:** `students` (4 objek)

| Langkah | Objek Saat Ini | `className` | Nilai Sebelumnya | Operasi | Nilai Setelah |
|---------|---------------|-------------|------------------|---------|---------------|
| 1 | `Dimitri` | `foxes` | `undefined` | `(undefined \|\| 0) + 1` | `foxes: 1` |
| 2 | `Alexei` | `wolves` | `undefined` | `(undefined \|\| 0) + 1` | `wolves: 1` |
| 3 | `Sergei` | `foxes` | `1` | `(1 \|\| 0) + 1` | `foxes: 2` |
| 4 | `Anastasia` | `wolves` | `1` | `(1 \|\| 0) + 1` | `wolves: 2` |

**Hasil akhir:**
```javascript
{ foxes: 2, wolves: 2 }
```

---

## 🔀 Versi Alternatif

### Versi 2 — Tanpa Destructuring

```javascript
const countByClass = (students) => {         // 1️⃣ Fungsi menerima array of object
  const result = {}                          // 2️⃣ Wadah kosong

  for (const student of students) {         // 3️⃣ Loop tiap objek siswa
    const className = student.class          // 4️⃣ Ambil nilai class secara eksplisit
    result[className] = (result[className] || 0) + 1 // 5️⃣ Hitung kemunculan
  }

  return result                              // 6️⃣ Kembalikan hasil
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const countByClass = (students)` | Fungsi menerima array of object |
| 2️⃣ | `const result = {}` | Object kosong sebagai wadah hitungan |
| 3️⃣ | `for (const student of students)` | Loop tiap objek — `student` adalah objek lengkap saat ini |
| 4️⃣ | `const className = student.class` | Ambil nilai properti `class` menggunakan dot notation, tanpa destructuring |
| 5️⃣ | `(result[className] \|\| 0) + 1` | Pola Frequency Counter: mulai dari `0` jika belum ada, tambah `1` jika sudah |
| 6️⃣ | `return result` | Kembalikan object hasil hitungan |

**Visualisasi — fokus: akses properti tanpa destructuring**

Data: `students` (4 objek)

| Langkah | `student.class` | `className` | `result` setelah |
|---------|-----------------|-------------|------------------|
| 1 | `'foxes'` | `foxes` | `{ foxes: 1 }` |
| 2 | `'wolves'` | `wolves` | `{ foxes: 1, wolves: 1 }` |
| 3 | `'foxes'` | `foxes` | `{ foxes: 2, wolves: 1 }` |
| 4 | `'wolves'` | `wolves` | `{ foxes: 2, wolves: 2 }` |

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const countByClass = (students) => {
  return students.reduce((result, { class: className }) => { // 1️⃣ reduce + destructuring langsung
    result[className] = (result[className] || 0) + 1         // 2️⃣ Hitung kemunculan
    return result                                            // 3️⃣ Kembalikan akumulator
  }, {})                                                     // 4️⃣ Nilai awal: object kosong
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `students.reduce((result, { class: className }) =>` | `.reduce()` dengan destructuring langsung di parameter — `result` adalah akumulator, `className` adalah nilai `class` dari objek saat ini |
| 2️⃣ | `(result[className] \|\| 0) + 1` | Pola Frequency Counter yang sama — hitung kemunculan per kelas |
| 3️⃣ | `return result` | Wajib dikembalikan agar akumulator terbawa ke iterasi berikutnya |
| 4️⃣ | `}, {})` | Object kosong `{}` adalah nilai awal `result` sebelum iterasi pertama |

**Visualisasi — fokus: akumulator `.reduce()` yang terus terbawa**

Data: `students` (4 objek)

| Iterasi | `className` | `result` masuk | `result` keluar |
|---------|-------------|----------------|-----------------|
| 1 | `foxes` | `{}` | `{ foxes: 1 }` |
| 2 | `wolves` | `{ foxes: 1 }` | `{ foxes: 1, wolves: 1 }` |
| 3 | `foxes` | `{ foxes: 1, wolves: 1 }` | `{ foxes: 2, wolves: 1 }` |
| 4 | `wolves` | `{ foxes: 2, wolves: 1 }` | `{ foxes: 2, wolves: 2 }` |

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional. Destructuring langsung di parameter `.reduce()` membuat kode sangat ringkas.

---

## ⚠️ Jebakan Umum

### ❌ 1. Tidak handle nilai awal

```javascript
result[className]++ // ❌ undefined++ → NaN
```

**Masalah:** Jika key belum ada, nilainya `undefined` — dan `undefined++` menghasilkan `NaN`.

✅ **Solusi:** Gunakan pola `(result[className] || 0) + 1`

---

### ❌ 2. Lupa rename `class` saat destructuring

```javascript
const { class } = student // ❌ SyntaxError: class adalah reserved word
```

**Masalah:** `class` adalah kata kunci JavaScript — tidak bisa langsung dijadikan nama variabel.

✅ **Solusi:** Rename saat destructuring:
```javascript
const { class: className } = student // ✅
```

---

### ❌ 3. Salah menulis key

```javascript
result['className'] = ... // ❌ Semua masuk ke key literal 'className'
```

**Masalah:** String `'className'` adalah key literal, bukan nilai variabel.

✅ **Solusi:** Gunakan variabel tanpa tanda kutip: `result[className]`

---

## 💡 Insight

> **Count By Class adalah Frequency Counter yang bekerja pada array of object.**
> Satu-satunya perbedaan: kamu perlu masuk ke dalam objek dulu untuk mengambil key yang ingin dihitung.

Perbandingan dengan Frequency Counter biasa:

| | Frequency Counter | Count By Class |
|--|-------------------|----------------|
| Input | Array of primitive | Array of object |
| Ambil key | Langsung dari elemen | Dari properti objek |
| Contoh | `result[item]` | `result[student.class]` |

---

## 📝 Pelajaran yang Didapat

- ✅ Count By Class adalah Frequency Counter pada array of object
- ✅ Cara mengambil properti objek menggunakan destructuring vs dot notation
- ✅ Mengapa `class` harus di-rename saat destructuring (`class` adalah reserved word)
- ✅ Pola `(result[className] || 0) + 1` untuk handle nilai awal yang aman
- ✅ Tiga cara menulis solusi: destructuring, dot notation, `.reduce()`
