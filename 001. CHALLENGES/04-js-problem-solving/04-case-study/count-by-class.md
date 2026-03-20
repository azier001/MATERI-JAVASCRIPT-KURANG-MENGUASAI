# 🏫 Count By Class
### Menghitung Jumlah Siswa Per Kelas

![Kategori](https://img.shields.io/badge/Kategori-Case%20Study-darkblue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Frequency%20Counter%20%7C%20Destructuring%20%7C%20Object-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi Challenge](#-deskripsi-challenge) | Penjelasan soal |
| 2 | [🧠 Memahami Soal](#-memahami-soal) | Input & output yang diharapkan |
| 3 | [🧪 Test Cases](#-test-cases) | Contoh data dan hasil |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |
| 11 | [✍️ Latihan Menulis Ulang](#️-latihan-menulis-ulang) | Praktik bertahap |

---

## 📋 Deskripsi Challenge

Diberikan array of object berisi data siswa, hitung **jumlah siswa di setiap kelas**.

---

## 🧠 Memahami Soal

**Input:**
- Array of object
- Setiap object memiliki properti: `name`, `score`, `class`

**Output:**
```javascript
{ foxes: 2, wolves: 2 }
```

---

## 🧪 Test Cases

```javascript
const data = [
  { name: 'Dimitri', score: 90, class: 'foxes' },
  { name: 'Alexei', score: 85, class: 'wolves' },
  { name: 'Sergei', score: 74, class: 'foxes' },
  { name: 'Anastasia', score: 78, class: 'wolves' }
]

countByClass(data)   // { foxes: 2, wolves: 2 }
countByClass([])     // {}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Solusi |
|--------|-------------------|
| Frequency Counter | Menghitung kemunculan setiap kelas |
| Destructuring | Mengambil properti `class` dari setiap objek |
| Object sebagai map | Menyimpan hitungan per kelas sebagai key-value |

---

## 🔄 Implementasi

```javascript
const countByClass = (students) => {                      // 1️⃣ Fungsi menerima array of object
  const result = {}                                       // 2️⃣ Wadah kosong untuk hasil hitungan

  for (const { class: className } of students) {          // 3️⃣ Destructuring: ambil hanya class
    result[className] = (result[className] || 0) + 1      // 4️⃣ Hitung kemunculan per kelas
  }

  return result                                           // 5️⃣ Kembalikan object hasil hitungan
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const countByClass = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `const result = {}` | Object kosong sebagai wadah — setiap kelas akan jadi key, jumlahnya jadi value |
| 3️⃣ | `{ class: className } of students` | Destructuring mengambil hanya properti `class`. Di-rename jadi `className` karena `class` adalah reserved word di JavaScript |
| 4️⃣ | `(result[className] \|\| 0) + 1` | Jika key belum ada, mulai dari `0`. Jika sudah ada, tambah `1`. Ini adalah pola Frequency Counter |
| 5️⃣ | `return result` | Kembalikan object berisi jumlah siswa per kelas |

**Hasil:**
```javascript
console.log(countByClass(data))  // { foxes: 2, wolves: 2 }
console.log(countByClass([]))    // {}
```

---

## 🧪 Visualisasi

**Data:** `students` (4 objek)

| Langkah | Objek | `className` | Nilai Sebelumnya | Operasi | `result` setelah |
|---------|-------|-------------|------------------|---------|-----------------|
| 1 | `Dimitri` | `foxes` | `undefined` | `(undefined \|\| 0) + 1` | `{ foxes: 1 }` |
| 2 | `Alexei` | `wolves` | `undefined` | `(undefined \|\| 0) + 1` | `{ foxes: 1, wolves: 1 }` |
| 3 | `Sergei` | `foxes` | `1` | `(1 \|\| 0) + 1` | `{ foxes: 2, wolves: 1 }` |
| 4 | `Anastasia` | `wolves` | `1` | `(1 \|\| 0) + 1` | `{ foxes: 2, wolves: 2 }` |

**Hasil akhir:** `{ foxes: 2, wolves: 2 }` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Tanpa Destructuring

```javascript
const countByClass = (students) => {                      // 1️⃣ Fungsi menerima array of object
  const result = {}                                       // 2️⃣ Wadah kosong

  for (const student of students) {                      // 3️⃣ Loop tiap objek siswa
    const className = student.class                       // 4️⃣ Ambil nilai class secara eksplisit
    result[className] = (result[className] || 0) + 1      // 5️⃣ Hitung kemunculan
  }

  return result                                           // 6️⃣ Kembalikan hasil
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const countByClass = (students)` | Fungsi menerima array of object |
| 2️⃣ | `const result = {}` | Object kosong sebagai wadah hitungan |
| 3️⃣ | `for (const student of students)` | Loop tiap objek — `student` adalah objek lengkap saat ini |
| 4️⃣ | `const className = student.class` | Ambil nilai properti `class` menggunakan dot notation — tanpa destructuring |
| 5️⃣ | `(result[className] \|\| 0) + 1` | Pola Frequency Counter: mulai dari `0` jika belum ada, tambah `1` jika sudah |
| 6️⃣ | `return result` | Kembalikan object hasil hitungan |

**Visualisasi — fokus: akses properti tanpa destructuring**

| Langkah | `student.class` | `className` | `result` setelah |
|---------|-----------------|-------------|-----------------|
| 1 | `'foxes'` | `foxes` | `{ foxes: 1 }` |
| 2 | `'wolves'` | `wolves` | `{ foxes: 1, wolves: 1 }` |
| 3 | `'foxes'` | `foxes` | `{ foxes: 2, wolves: 1 }` |
| 4 | `'wolves'` | `wolves` | `{ foxes: 2, wolves: 2 }` |

**Hasil:**
```javascript
console.log(countByClass(data))  // { foxes: 2, wolves: 2 }
console.log(countByClass([]))    // {}
```

> **Kapan pakai ini?**
> Lebih mudah dibaca untuk pemula karena tidak menggunakan destructuring. Cocok ketika kamu ingin kode yang eksplisit dan mudah dilacak.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const countByClass = (students) => {
  return students.reduce((result, { class: className }) => {  // 1️⃣ reduce + destructuring langsung
    result[className] = (result[className] || 0) + 1          // 2️⃣ Hitung kemunculan
    return result                                             // 3️⃣ Kembalikan akumulator
  }, {})                                                      // 4️⃣ Nilai awal: object kosong
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

| Iterasi | `className` | `result` masuk | `result` keluar |
|---------|-------------|----------------|-----------------|
| 1 | `foxes` | `{}` | `{ foxes: 1 }` |
| 2 | `wolves` | `{ foxes: 1 }` | `{ foxes: 1, wolves: 1 }` |
| 3 | `foxes` | `{ foxes: 1, wolves: 1 }` | `{ foxes: 2, wolves: 1 }` |
| 4 | `wolves` | `{ foxes: 2, wolves: 1 }` | `{ foxes: 2, wolves: 2 }` |

**Hasil:**
```javascript
console.log(countByClass(data))  // { foxes: 2, wolves: 2 }
console.log(countByClass([]))    // {}
```

> **Kapan pakai ini?**
> Gaya fungsional yang ringkas. Destructuring langsung di parameter `.reduce()` membuat kode sangat padat.

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

> **Count By Class adalah penerapan nyata dari Frequency Counter pada array of object.**
> Di `02-grouping/count-by-class.md` kita belajar polanya — di sini kita terapkan langsung ke soal dengan data siswa sungguhan.

Perbedaan dengan `02-grouping/count-by-class.md`:

| | 02-grouping | 04-case-study |
|--|-------------|---------------|
| Fokus | Memahami pattern | Menerapkan ke soal nyata |
| Data | Contoh sederhana | Data siswa lengkap |
| Konteks | Konsep | Challenge |

---

## 📝 Pelajaran yang Didapat

- ✅ Count By Class adalah Frequency Counter pada array of object
- ✅ Cara mengambil properti `class` dengan destructuring dan rename ke `className`
- ✅ Pola `(result[className] || 0) + 1` untuk handle nilai awal yang aman
- ✅ Tiga cara menulis solusi: destructuring, dot notation, `.reduce()`
- ✅ Perbedaan antara mempelajari pattern (folder 02) vs menerapkannya (folder 04)

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Destructuring

**Langkah 1** — Deklarasikan fungsi:
```javascript
const countByClass = (students) => {

}
```
> Fungsi menerima satu parameter `students` berupa array of object.

---

**Langkah 2** — Siapkan wadah hasil:
```javascript
const countByClass = (students) => {
  const result = {}
}
```
> `result` adalah object kosong — setiap kelas akan jadi key, jumlah siswa jadi value-nya.

---

**Langkah 3** — Buka loop dengan destructuring:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const { class: className } of students) {

  }
}
```
> Destructuring mengambil hanya properti `class` dari setiap objek. `class` di-rename jadi `className` karena `class` adalah reserved word di JavaScript.

---

**Langkah 4** — Tambahkan pola Frequency Counter:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const { class: className } of students) {
    result[className] = (result[className] || 0) + 1
  }
}
```
> `(result[className] || 0) + 1`: jika key belum ada nilainya `undefined`, maka `undefined || 0` menghasilkan `0`, lalu ditambah `1`. Jika sudah ada, ambil nilainya dan tambah `1`.

---

**Langkah 5** — Kembalikan hasil:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const { class: className } of students) {
    result[className] = (result[className] || 0) + 1
  }

  return result
}
```
> Fungsi selesai. `return result` mengembalikan object berisi jumlah siswa per kelas.

**Hasil:**
```javascript
console.log(countByClass(data))  // { foxes: 2, wolves: 2 }
console.log(countByClass([]))    // {}
```

---

### Versi 2 — Tanpa Destructuring

**Langkah 1** — Deklarasikan fungsi:
```javascript
const countByClass = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Siapkan wadah hasil:
```javascript
const countByClass = (students) => {
  const result = {}
}
```
> Object kosong sebagai wadah hitungan per kelas.

---

**Langkah 3** — Buka loop tanpa destructuring:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const student of students) {

  }
}
```
> `student` adalah objek lengkap — kita akan ambil properti `class` secara eksplisit di dalam loop.

---

**Langkah 4** — Ambil nilai `class` secara eksplisit:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const student of students) {
    const className = student.class
  }
}
```
> `student.class` mengambil nilai properti `class` menggunakan dot notation — hasilnya disimpan ke `className` agar mudah digunakan.

---

**Langkah 5** — Tambahkan pola Frequency Counter:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const student of students) {
    const className = student.class
    result[className] = (result[className] || 0) + 1
  }
}
```
> Pola yang sama dengan Versi 1 — satu-satunya perbedaan adalah cara mengambil `className`.

---

**Langkah 6** — Kembalikan hasil:
```javascript
const countByClass = (students) => {
  const result = {}

  for (const student of students) {
    const className = student.class
    result[className] = (result[className] || 0) + 1
  }

  return result
}
```
> Fungsi selesai. `return result` mengembalikan object berisi jumlah siswa per kelas.

**Hasil:**
```javascript
console.log(countByClass(data))  // { foxes: 2, wolves: 2 }
console.log(countByClass([]))    // {}
```

---

### Versi 3 — Menggunakan `.reduce()`

**Langkah 1** — Deklarasikan fungsi:
```javascript
const countByClass = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Panggil `.reduce()` dengan nilai awal:
```javascript
const countByClass = (students) => {
  return students.reduce(() => {

  }, {})
}
```
> `.reduce()` menerima dua argumen: callback dan nilai awal. Nilai awal `{}` adalah object kosong yang akan jadi `result` di iterasi pertama.

---

**Langkah 3** — Tambahkan parameter callback dengan destructuring:
```javascript
const countByClass = (students) => {
  return students.reduce((result, { class: className }) => {

  }, {})
}
```
> Callback menerima dua parameter: `result` (akumulator) dan objek siswa saat ini. Destructuring langsung di parameter mengambil `className` dari setiap objek.

---

**Langkah 4** — Tambahkan pola Frequency Counter:
```javascript
const countByClass = (students) => {
  return students.reduce((result, { class: className }) => {
    result[className] = (result[className] || 0) + 1
  }, {})
}
```
> Logika hitungan sama seperti versi lainnya — pola `(result[className] || 0) + 1`.

---

**Langkah 5** — Kembalikan akumulator:
```javascript
const countByClass = (students) => {
  return students.reduce((result, { class: className }) => {
    result[className] = (result[className] || 0) + 1
    return result
  }, {})
}
```
> `return result` di dalam callback **wajib ada** — tanpa ini, akumulator menjadi `undefined` di iterasi berikutnya dan seluruh hasil hilang.

**Hasil:**
```javascript
console.log(countByClass(data))  // { foxes: 2, wolves: 2 }
console.log(countByClass([]))    // {}
```
