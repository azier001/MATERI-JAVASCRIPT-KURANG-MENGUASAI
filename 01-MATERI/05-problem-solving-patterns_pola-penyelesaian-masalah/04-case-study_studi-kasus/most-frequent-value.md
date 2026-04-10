# 🏫 Most Frequent Value
### Mencari Nilai Ujian yang Paling Banyak Didapat Siswa

![Kategori](https://img.shields.io/badge/Kategori-Case%20Study-darkblue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Frequency%20Counter%20%7C%20Max%20Pattern%20%7C%20Object-orange)
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

Diberikan array of object berisi data siswa, cari **nilai ujian yang paling banyak didapat** oleh siswa.

---

## 🧠 Memahami Soal

**Input:**
- Array of object
- Setiap object memiliki properti: `name`, `score`, `class`
- Yang dihitung adalah frekuensi kemunculan `score`

**Output:**
```javascript
"nilai yang paling sering muncul adalah 85 dan didapat 3 siswa"
```

**Hubungan dengan pattern:**

```
Frequency Counter  ──┐
                     ├──→ Most Frequent Value (Case Study)
Max Pattern        ──┘
```

> Ini adalah penerapan nyata dari `01-fundamentals/most-frequent.md` ke data array of object.
> Perbedaan utamanya: kita tidak langsung loop array angka — melainkan mengambil properti `score` dari setiap object.

---

## 🧪 Test Cases

```javascript
const students = [
  { name: 'Ivan', score: 85, class: 'foxes' },
  { name: 'Dimitri', score: 90, class: 'foxes' },
  { name: 'Sergei', score: 85, class: 'wolves' },
  { name: 'Alexei', score: 90, class: 'wolves' },
  { name: 'Anastasia', score: 85, class: 'wolves' },
]

getMostFrequentScore(students)
// → "nilai yang paling sering muncul adalah 85 dan didapat 3 siswa"

getMostFrequentScore([{ name: 'Ivan', score: 90, class: 'foxes' }])
// → "nilai yang paling sering muncul adalah 90 dan didapat 1 siswa"
// hanya satu siswa → tetap bekerja

getMostFrequentScore([])
// → null
// array kosong → kembalikan null
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Solusi |
|--------|-------------------|
| Frequency Counter | Menghitung berapa siswa yang mendapat tiap nilai |
| Max Pattern | Mencari nilai dengan jumlah siswa terbanyak |
| Akses properti objek | Mengambil `score` dari setiap objek siswa |
| `Number(key)` | Mengkonversi key string kembali ke number |

---

## 🔄 Implementasi

```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null                 // 1️⃣ Guard clause: array kosong

  const freq = {}

  // Tahap 1 — Hitung frekuensi setiap nilai (Frequency Counter)
  for (const student of students) {                 // 2️⃣ Loop setiap objek siswa
    const score = student.score                     // 3️⃣ Ambil properti score
    if (freq[score]) {                              // 4️⃣ Jika nilai sudah ada
      freq[score]++                                 //    tambah hitungan
    } else {                                        // 5️⃣ Jika nilai belum ada
      freq[score] = 1                               //    mulai dari 1
    }
  }

  let maxCount = 0                                  // 6️⃣ Tracker jumlah siswa terbanyak
  let resultScore = null                            // 7️⃣ Tracker nilai paling sering

  // Tahap 2 — Cari nilai dengan frekuensi tertinggi (Max Pattern)
  for (const key in freq) {                         // 8️⃣ Loop setiap key di freq
    if (freq[key] > maxCount) {                     // 9️⃣ Jika lebih besar dari max saat ini
      maxCount = freq[key]                          //    update maxCount
      resultScore = Number(key)                     //    update hasil (konversi ke number)
    }
  }

  return `nilai yang paling sering muncul adalah ${resultScore} dan didapat ${maxCount} siswa`
}
```

**Penjelasan kode:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `if (!students.length) return null` | Guard clause — jika array kosong, langsung kembalikan null |
| 2️⃣ | `for (const student of students)` | Loop setiap objek siswa dalam array |
| 3️⃣ | `const score = student.score` | Ambil nilai `score` dari objek — inilah perbedaan utama dari versi array angka biasa |
| 4️⃣ | `if (freq[score])` | Cek apakah nilai ini sudah pernah muncul sebelumnya |
| 5️⃣ | `freq[score] = 1` | Mulai hitungan baru jika nilai belum ada |
| 6️⃣ | `let maxCount = 0` | Tracker jumlah siswa terbanyak yang mendapat satu nilai |
| 7️⃣ | `let resultScore = null` | Tracker nilai ujian yang paling sering muncul |
| 8️⃣ | `for (const key in freq)` | Loop setiap key di object freq |
| 9️⃣ | `freq[key] > maxCount` | Bandingkan — jika lebih besar, update kedua tracker |
| | `Number(key)` | Key dalam object selalu string — konversi kembali ke number |

**Hasil:**
```javascript
getMostFrequentScore(students)
// → "nilai yang paling sering muncul adalah 85 dan didapat 3 siswa"

getMostFrequentScore([])
// → null
```

---

## 🧪 Visualisasi

**Data:** 5 objek siswa

**Tahap 1 — Frequency Counter (hitung frekuensi setiap nilai):**

| Langkah | Siswa | `score` | Kondisi | Hasil `freq` |
|---------|-------|---------|---------|--------------|
| 1 | Ivan | `85` | belum ada → set `1` | `{ 85: 1 }` |
| 2 | Dimitri | `90` | belum ada → set `1` | `{ 85: 1, 90: 1 }` |
| 3 | Sergei | `85` | sudah ada → `++` | `{ 85: 2, 90: 1 }` |
| 4 | Alexei | `90` | sudah ada → `++` | `{ 85: 2, 90: 2 }` |
| 5 | Anastasia | `85` | sudah ada → `++` | `{ 85: 3, 90: 2 }` |

**Hasil freq:** `{ 85: 3, 90: 2 }`

---

**Tahap 2 — Max Pattern (cari nilai dengan frekuensi tertinggi):**

| Langkah | Key | `freq[key]` | `maxCount` sebelum | Kondisi | `maxCount` setelah | `resultScore` |
|---------|-----|-------------|--------------------|---------|--------------------|---------------|
| 1 | `'85'` | `3` | `0` | `3 > 0` → ✅ | `3` | `85` |
| 2 | `'90'` | `2` | `3` | `2 > 3` → ❌ | `3` | `85` |

**Hasil akhir:** `"nilai yang paling sering muncul adalah 85 dan didapat 3 siswa"` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan Destructuring

```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  // Tahap 1 — Destructuring langsung di loop
  for (const { score } of students) {               // 1️⃣ Destructuring score langsung
    freq[score] = (freq[score] || 0) + 1            // 2️⃣ Pola ringkas untuk hitung frekuensi
  }

  let maxCount = 0
  let resultScore = null

  // Tahap 2 — Sama seperti Versi 1
  for (const key in freq) {
    if (freq[key] > maxCount) {
      maxCount = freq[key]
      resultScore = Number(key)
    }
  }

  return `nilai yang paling sering muncul adalah ${resultScore} dan didapat ${maxCount} siswa`
}
```

**Perbedaan dengan Versi 1:**

| Aspek | Versi 1 | Versi 2 |
|-------|---------|---------|
| Ambil score | `const score = student.score` | `for (const { score } of students)` |
| Hitung frekuensi | `if/else` | `(freq[score] \|\| 0) + 1` |
| Keterbacaan | Lebih eksplisit | Lebih ringkas |

> **Kapan pakai ini?**
> Ketika kamu sudah familiar dengan destructuring dan ingin kode yang lebih ringkas.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  // Tahap 1 — Hitung frekuensi dengan reduce
  const freq = students.reduce((acc, { score }) => {  // 1️⃣ Destructuring score di parameter
    acc[score] = (acc[score] || 0) + 1               // 2️⃣ Hitung frekuensi
    return acc                                        // 3️⃣ Kembalikan accumulator
  }, {})

  // Tahap 2 — Cari nilai terbanyak dengan reduce
  const resultKey = Object.keys(freq).reduce((bestKey, key) => {
    return freq[key] > freq[bestKey] ? key : bestKey
  })

  return `nilai yang paling sering muncul adalah ${Number(resultKey)} dan didapat ${freq[resultKey]} siswa`
}
```

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional. Perhatikan destructuring `{ score }` langsung di parameter `.reduce()` — lebih ringkas dari `student.score`.

---

## ⚠️ Jebakan Umum

### ❌ 1. Loop nilai langsung tanpa ambil properti

```javascript
for (const score of students) {
  freq[score]++ // ❌ score di sini adalah object, bukan angka!
}
```

**Masalah:** `students` berisi array of object — iterasi langsung menghasilkan object `{ name, score, class }`, bukan angka.

✅ **Solusi:** Ambil properti score terlebih dahulu:
```javascript
for (const student of students) {
  const score = student.score // ✅ ambil dulu
  freq[score] = (freq[score] || 0) + 1
}
```

---

### ❌ 2. Lupa konversi key ke Number

```javascript
resultScore = key // ❌ "85" bukan 85
```

**Masalah:** Key dalam object selalu bertipe `string` — tanpa konversi hasilnya `"85"` bukan `85`.

✅ **Solusi:** Gunakan `Number(key)` atau `+key`

---

### ❌ 3. Tidak handle array kosong

```javascript
// Tanpa guard clause
const freq = {}
for (const student of students) { ... }
// jika students kosong → freq tetap {} → maxCount tetap 0 → resultScore tetap null
```

**Masalah:** Fungsi tetap berjalan tapi output tidak bermakna.

✅ **Solusi:** Tambahkan `if (!students.length) return null` di awal fungsi

---

## 💡 Insight

> **Most Frequent Value adalah penerapan nyata dari `01-fundamentals/most-frequent.md`.**
> Di folder `01-fundamentals` kita belajar polanya dengan array angka biasa — di sini kita terapkan ke array of object dengan mengambil properti `score`.

Perbedaan utama antara versi fundamentals dan case study:

| Aspek | Fundamentals | Case Study |
|-------|-------------|------------|
| Input | `[1, 3, 2, 3, 1]` | `[{ name, score, class }, ...]` |
| Ambil data | Langsung dari elemen | Dari properti `student.score` |
| Nama fungsi | `getMostFrequent` | `getMostFrequentScore` |
| Output | Angka paling sering | Nilai ujian paling sering |

Hubungan antar file dalam dokumentasi ini:

| File | Peran |
|------|-------|
| `01-fundamentals/frequency-counter.md` | Fondasi: menghitung frekuensi |
| `01-fundamentals/max-pattern.md` | Fondasi: mencari nilai terbesar |
| `01-fundamentals/most-frequent.md` | Pattern: gabungan dua fondasi di atas |
| `04-case-study/most-frequent-value.md` | Penerapan: ke soal nyata dengan data siswa |

---

## 📝 Pelajaran yang Didapat

- ✅ Most Frequent Value adalah penerapan `most-frequent.md` ke array of object
- ✅ Perbedaan utama: ambil `student.score` dulu sebelum menghitung frekuensi
- ✅ Destructuring `{ score }` bisa menyederhanakan pengambilan properti di dalam loop
- ✅ Key dalam object selalu `string` — selalu konversi dengan `Number(key)`
- ✅ Guard clause penting untuk handle array kosong di awal fungsi
- ✅ Tiga cara menulis solusi: loop manual, destructuring, `.reduce()`

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Loop Manual

**Langkah 1** — Deklarasikan fungsi dan guard clause:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null
}
```
> Selalu tangani edge case di awal — jika array kosong, langsung kembalikan null.

---

**Langkah 2** — Siapkan object frekuensi:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}
}
```
> `freq` adalah object kosong — akan menyimpan pasangan `{ nilai: jumlah_siswa }`.

---

**Langkah 3** — Buka loop pertama dan ambil properti score:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  for (const student of students) {
    const score = student.score
    if (freq[score]) {
      freq[score]++
    } else {
      freq[score] = 1
    }
  }
}
```
> Ingat: `students` berisi array of object — kamu perlu ambil `student.score` dulu, bukan langsung gunakan `student` sebagai key.

---

**Langkah 4** — Siapkan variabel tracker:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  for (const student of students) {
    const score = student.score
    if (freq[score]) {
      freq[score]++
    } else {
      freq[score] = 1
    }
  }

  let maxCount = 0
  let resultScore = null
}
```
> `maxCount` menyimpan jumlah siswa terbanyak sementara. `resultScore` menyimpan nilai yang paling sering muncul.

---

**Langkah 5** — Buka loop kedua dan cari nilai terbanyak:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  for (const student of students) {
    const score = student.score
    if (freq[score]) {
      freq[score]++
    } else {
      freq[score] = 1
    }
  }

  let maxCount = 0
  let resultScore = null

  for (const key in freq) {
    if (freq[key] > maxCount) {
      maxCount = freq[key]
      resultScore = Number(key)
    }
  }
}
```
> `for...in` menelusuri setiap key di object. Konversi `key` ke number dengan `Number(key)`.

---

**Langkah 6** — Kembalikan hasil:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  for (const student of students) {
    const score = student.score
    if (freq[score]) {
      freq[score]++
    } else {
      freq[score] = 1
    }
  }

  let maxCount = 0
  let resultScore = null

  for (const key in freq) {
    if (freq[key] > maxCount) {
      maxCount = freq[key]
      resultScore = Number(key)
    }
  }

  return `nilai yang paling sering muncul adalah ${resultScore} dan didapat ${maxCount} siswa`
}
```

**Hasil:**
```javascript
getMostFrequentScore(students)
// → "nilai yang paling sering muncul adalah 85 dan didapat 3 siswa"

getMostFrequentScore([])
// → null
```

---

### Versi 2 — Destructuring

**Langkah 1** — Deklarasikan fungsi dan guard clause:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null
}
```

---

**Langkah 2** — Hitung frekuensi dengan destructuring:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  for (const { score } of students) {
    freq[score] = (freq[score] || 0) + 1
  }
}
```
> `{ score }` di dalam `for...of` adalah destructuring — mengambil properti `score` langsung tanpa perlu `student.score`. Pola `(freq[score] || 0) + 1` lebih ringkas dari `if/else`.

---

**Langkah 3** — Siapkan tracker, cari max, dan kembalikan hasil:
```javascript
const getMostFrequentScore = (students) => {
  if (!students.length) return null

  const freq = {}

  for (const { score } of students) {
    freq[score] = (freq[score] || 0) + 1
  }

  let maxCount = 0
  let resultScore = null

  for (const key in freq) {
    if (freq[key] > maxCount) {
      maxCount = freq[key]
      resultScore = Number(key)
    }
  }

  return `nilai yang paling sering muncul adalah ${resultScore} dan didapat ${maxCount} siswa`
}
```

**Hasil:**
```javascript
getMostFrequentScore(students)
// → "nilai yang paling sering muncul adalah 85 dan didapat 3 siswa"

getMostFrequentScore([])
// → null
```
