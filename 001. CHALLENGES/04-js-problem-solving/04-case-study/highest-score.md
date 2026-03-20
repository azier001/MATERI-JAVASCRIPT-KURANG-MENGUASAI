# 🥇 Highest Score
### Mencari Siswa dengan Nilai Tertinggi

![Kategori](https://img.shields.io/badge/Kategori-Case%20Study-darkblue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Min%20Pattern%20%7C%20Destructuring%20%7C%20Edge%20Case-orange)
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

Diberikan array of object berisi data siswa, ambil **satu siswa dengan skor tertinggi** dari seluruh data.

---

## 🧠 Memahami Soal

**Input:**
- Array of object
- Setiap object memiliki properti: `name`, `score`, `class`

**Output:**
```javascript
{ name: '...', score: ... }
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

highestScore(data)   // { name: 'Dimitri', score: 90 }
highestScore([])     // null
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Solusi |
|--------|-------------------|
| Max Pattern | Mencari nilai terbesar dari seluruh data |
| Destructuring | Mengambil `name` dan `score` dari setiap objek |
| Edge case handling | Menangani array kosong dengan `null` |

---

## 🔄 Implementasi

```javascript
const highestScore = (students) => {              // 1️⃣ Fungsi menerima array of object
  if (students.length === 0) return null          // 2️⃣ Jika array kosong, kembalikan null

  let max = null                                  // 3️⃣ Tracker dimulai dari null

  for (const { name, score } of students) {       // 4️⃣ Destructuring: ambil name dan score
    if (max === null || score > max.score) {       // 5️⃣ Jika belum ada data atau skor lebih tinggi
      max = { name, score }                       //    → update tracker dengan data saat ini
    }
  }

  return max                                      // 6️⃣ Kembalikan siswa dengan skor tertinggi
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const highestScore = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `if (students.length === 0) return null` | Cek array kosong di awal — jika tidak ada data, tidak ada yang bisa diproses |
| 3️⃣ | `let max = null` | Dimulai dari `null` bukan `0` — agar bisa mendeteksi kapan data pertama masuk lewat kondisi `max === null` |
| 4️⃣ | `{ name, score } of students` | Destructuring mengambil hanya `name` dan `score` — `class` tidak dibutuhkan di sini |
| 5️⃣ | `max === null \|\| score > max.score` | Dua kondisi: pertama kali masuk (`null`) ATAU skor lebih tinggi dari yang tersimpan |
| 6️⃣ | `return max` | Kembalikan objek `{ name, score }` dari siswa dengan skor tertinggi |

**Hasil:**
```javascript
console.log(highestScore(data))  // { name: 'Dimitri', score: 90 }
console.log(highestScore([]))    // null
```

---

## 🧪 Visualisasi

**Data:** `students` (4 objek)

| Langkah | Objek | `max` sebelum | Kondisi | `max` setelah |
|---------|-------|---------------|---------|---------------|
| 1 | `Dimitri (90)` | `null` | `null === null` → ✅ | `{ Dimitri, 90 }` |
| 2 | `Alexei (85)` | `{ Dimitri, 90 }` | `85 > 90` → ❌ | `{ Dimitri, 90 }` |
| 3 | `Sergei (74)` | `{ Dimitri, 90 }` | `74 > 90` → ❌ | `{ Dimitri, 90 }` |
| 4 | `Anastasia (78)` | `{ Dimitri, 90 }` | `78 > 90` → ❌ | `{ Dimitri, 90 }` |

**Hasil akhir:** `{ name: 'Dimitri', score: 90 }` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Inisialisasi dengan elemen pertama

```javascript
const highestScore = (students) => {              // 1️⃣ Fungsi menerima array of object
  if (students.length === 0) return null          // 2️⃣ Handle array kosong

  let max = students[0]                           // 3️⃣ Inisialisasi dengan elemen pertama

  for (let i = 1; i < students.length; i++) {    // 4️⃣ Mulai loop dari index 1
    if (students[i].score > max.score) {          // 5️⃣ Bandingkan skor
      max = students[i]                           //    → update jika lebih tinggi
    }
  }

  return { name: max.name, score: max.score }     // 6️⃣ Kembalikan hanya name dan score
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const highestScore = (students)` | Fungsi menerima array of object |
| 2️⃣ | `if (students.length === 0) return null` | Handle array kosong — wajib ada sebelum mengakses `students[0]` |
| 3️⃣ | `let max = students[0]` | Inisialisasi dengan elemen pertama sebagai kandidat awal — lebih aman dari `null` karena langsung punya nilai |
| 4️⃣ | `for (let i = 1; ...)` | Loop dimulai dari index 1 karena index 0 sudah dijadikan nilai awal |
| 5️⃣ | `students[i].score > max.score` | Bandingkan skor elemen saat ini dengan yang tersimpan |
| 6️⃣ | `return { name: max.name, score: max.score }` | Kembalikan hanya dua properti yang dibutuhkan — tanpa `class` |

**Visualisasi — fokus: inisialisasi dari elemen pertama**

| Langkah | `i` | `students[i]` | `max` sebelum | Kondisi | `max` setelah |
|---------|-----|---------------|---------------|---------|---------------|
| init | — | — | `{ Dimitri, 90 }` | Inisialisasi | `{ Dimitri, 90 }` |
| 1 | `1` | `Alexei (85)` | `{ Dimitri, 90 }` | `85 > 90` → ❌ | `{ Dimitri, 90 }` |
| 2 | `2` | `Sergei (74)` | `{ Dimitri, 90 }` | `74 > 90` → ❌ | `{ Dimitri, 90 }` |
| 3 | `3` | `Anastasia (78)` | `{ Dimitri, 90 }` | `78 > 90` → ❌ | `{ Dimitri, 90 }` |

**Hasil:**
```javascript
console.log(highestScore(data))  // { name: 'Dimitri', score: 90 }
console.log(highestScore([]))    // null
```

> **Kapan pakai ini?**
> Ketika kamu ingin menghindari pengecekan `null` di setiap iterasi. Lebih efisien sedikit karena kondisi `max === null` hanya perlu dicek sekali di awal.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const highestScore = (students) => {                    // 1️⃣ Fungsi menerima array of object
  if (students.length === 0) return null                // 2️⃣ Handle array kosong

  const { name, score } = students.reduce((max, current) => {  // 3️⃣ reduce + destructuring hasil
    return current.score > max.score ? current : max    // 4️⃣ Kembalikan yang skornya lebih tinggi
  })                                                    // 5️⃣ Tanpa nilai awal → elemen pertama jadi akumulator

  return { name, score }                               // 6️⃣ Kembalikan hanya name dan score
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const highestScore = (students)` | Fungsi menerima array of object |
| 2️⃣ | `if (students.length === 0) return null` | Handle array kosong — `.reduce()` tanpa nilai awal akan throw error pada array kosong |
| 3️⃣ | `students.reduce((max, current) => {` | `.reduce()` membandingkan dua elemen sekaligus — `max` adalah kandidat terbaik saat ini, `current` adalah elemen yang sedang diperiksa |
| 4️⃣ | `current.score > max.score ? current : max` | Ternary: kembalikan `current` jika skornya lebih tinggi, jika tidak kembalikan `max` yang lama |
| 5️⃣ | `})` tanpa nilai awal | Tanpa nilai awal, elemen pertama otomatis jadi akumulator pertama — loop dimulai dari elemen kedua |
| 6️⃣ | `return { name, score }` | Destructuring hasil reduce, lalu kembalikan hanya dua properti yang dibutuhkan |

**Visualisasi — fokus: akumulator `.reduce()` tanpa nilai awal**

| Iterasi | `max` | `current` | Kondisi | `max` keluar |
|---------|-------|-----------|---------|--------------|
| 1 | `{ Dimitri, 90 }` | `{ Alexei, 85 }` | `85 > 90` → ❌ | `{ Dimitri, 90 }` |
| 2 | `{ Dimitri, 90 }` | `{ Sergei, 74 }` | `74 > 90` → ❌ | `{ Dimitri, 90 }` |
| 3 | `{ Dimitri, 90 }` | `{ Anastasia, 78 }` | `78 > 90` → ❌ | `{ Dimitri, 90 }` |

**Hasil:**
```javascript
console.log(highestScore(data))  // { name: 'Dimitri', score: 90 }
console.log(highestScore([]))    // null
```

> **Kapan pakai ini?**
> Gaya fungsional yang ringkas. `.reduce()` tanpa nilai awal menjadikan elemen pertama sebagai akumulator — cocok ketika data dijamin tidak kosong (sudah dicek di awal).

---

## ⚠️ Jebakan Umum

### ❌ 1. Inisialisasi `max` dengan angka `0`

```javascript
let max = 0 // ❌ Tidak bisa menyimpan objek { name, score }
```

**Masalah:** `max` diisi angka, tapi nanti dibandingkan dengan `score` dari objek — hasilnya tidak konsisten.

✅ **Solusi:** Gunakan `null` sebagai nilai awal, lalu cek `max === null` untuk data pertama.

---

### ❌ 2. Tidak handle array kosong

```javascript
const highestScore = (students) => {
  let max = null
  for (const { name, score } of students) { ... }
  return max // ❌ Mengembalikan null tanpa penjelasan jika array kosong
}
```

**Masalah:** Fungsi tetap berjalan tapi mengembalikan `null` tanpa validasi eksplisit — membingungkan pemanggil fungsi.

✅ **Solusi:** Tambahkan pengecekan di awal:
```javascript
if (students.length === 0) return null
```

---

### ❌ 3. Salah nama variabel

```javascript
if (!data.length) return null // ❌ 'data' tidak terdefinisi di dalam fungsi
```

**Masalah:** Parameter fungsi bernama `students`, bukan `data` — menggunakan nama yang salah akan throw `ReferenceError`.

✅ **Solusi:** Selalu gunakan nama yang sama dengan parameter: `students.length`.

---

## 💡 Insight

> **Ini adalah Max Pattern yang bekerja pada array of object.**
> Satu-satunya perbedaan dari Max Pattern biasa: kamu menyimpan seluruh objek sebagai `max`, bukan hanya nilainya — sehingga bisa mengembalikan `name` sekaligus.

Perbandingan dengan Max Pattern dasar:

| | Max Pattern (angka) | Highest Score (objek) |
|--|---------------------|----------------------|
| Tracker | `let max = arr[0]` | `let max = null` |
| Kondisi | `num > max` | `score > max.score` |
| Hasil | Angka | Objek `{ name, score }` |

---

## 📝 Pelajaran yang Didapat

- ✅ Highest Score adalah Max Pattern yang diterapkan pada array of object
- ✅ Mengapa `null` lebih aman dari `0` sebagai nilai awal tracker
- ✅ Pola `max === null || score > max.score` untuk handle data pertama sekaligus perbandingan
- ✅ Pentingnya handle array kosong sebelum mengakses elemen
- ✅ Tiga cara menulis solusi: `null` tracker, inisialisasi elemen pertama, `.reduce()`

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Null Tracker

**Langkah 1** — Deklarasikan fungsi:
```javascript
const highestScore = (students) => {

}
```
> Fungsi menerima satu parameter `students` berupa array of object.

---

**Langkah 2** — Handle array kosong:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null
}
```
> Jika array kosong, tidak ada yang bisa diproses — langsung kembalikan `null`. Ini harus dicek **sebelum** apapun dijalankan.

---

**Langkah 3** — Siapkan tracker:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = null
}
```
> `null` digunakan sebagai nilai awal karena kita belum tahu data pertama — lebih aman dari `0` yang bisa keliru untuk data tertentu.

---

**Langkah 4** — Buka loop dengan destructuring:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = null

  for (const { name, score } of students) {

  }
}
```
> Destructuring langsung mengambil `name` dan `score` dari setiap objek — `class` tidak dibutuhkan di sini.

---

**Langkah 5** — Tambahkan kondisi untuk data pertama:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = null

  for (const { name, score } of students) {
    if (max === null) {
      max = { name, score }
    }
  }
}
```
> `max === null` bernilai `true` hanya pada iterasi pertama — saat itulah data pertama langsung disimpan tanpa perlu dibandingkan.

---

**Langkah 6** — Tambahkan kondisi perbandingan:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = null

  for (const { name, score } of students) {
    if (max === null || score > max.score) {
      max = { name, score }
    }
  }
}
```
> Gabungkan dua kondisi dengan `||`: jika `max` masih `null` ATAU skor lebih tinggi, update `max`. Ini membuat kode lebih ringkas dari dua `if` terpisah.

---

**Langkah 7** — Kembalikan hasil:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = null

  for (const { name, score } of students) {
    if (max === null || score > max.score) {
      max = { name, score }
    }
  }

  return max
}
```
> Fungsi selesai. `return max` mengembalikan objek `{ name, score }` dari siswa dengan skor tertinggi.

**Hasil:**
```javascript
console.log(highestScore(data))  // { name: 'Dimitri', score: 90 }
console.log(highestScore([]))    // null
```

---

### Versi 2 — Inisialisasi Elemen Pertama

**Langkah 1** — Deklarasikan fungsi:
```javascript
const highestScore = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Handle array kosong:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null
}
```
> Wajib dicek dulu sebelum mengakses `students[0]` — jika array kosong, `students[0]` adalah `undefined`.

---

**Langkah 3** — Inisialisasi dengan elemen pertama:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = students[0]
}
```
> `students[0]` dijadikan kandidat awal — karena array sudah dipastikan tidak kosong di langkah sebelumnya, ini aman dilakukan.

---

**Langkah 4** — Buka loop mulai dari index 1:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = students[0]

  for (let i = 1; i < students.length; i++) {

  }
}
```
> Loop dimulai dari index `1` karena index `0` sudah dipakai sebagai nilai awal `max` — tidak perlu dibandingkan dengan dirinya sendiri.

---

**Langkah 5** — Tambahkan perbandingan dan update:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = students[0]

  for (let i = 1; i < students.length; i++) {
    if (students[i].score > max.score) {
      max = students[i]
    }
  }
}
```
> `students[i].score > max.score` membandingkan skor elemen saat ini dengan yang tersimpan — update `max` jika lebih tinggi.

---

**Langkah 6** — Kembalikan hasil:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  let max = students[0]

  for (let i = 1; i < students.length; i++) {
    if (students[i].score > max.score) {
      max = students[i]
    }
  }

  return { name: max.name, score: max.score }
}
```
> `return { name: max.name, score: max.score }` mengembalikan hanya dua properti yang dibutuhkan — properti `class` tidak ikut dikembalikan.

**Hasil:**
```javascript
console.log(highestScore(data))  // { name: 'Dimitri', score: 90 }
console.log(highestScore([]))    // null
```

---

### Versi 3 — Menggunakan `.reduce()`

**Langkah 1** — Deklarasikan fungsi:
```javascript
const highestScore = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Handle array kosong:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null
}
```
> `.reduce()` tanpa nilai awal akan throw error jika array kosong — wajib dicek dulu.

---

**Langkah 3** — Panggil `.reduce()` dengan dua parameter:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  students.reduce((max, current) => {

  })
}
```
> `.reduce()` menerima callback dengan dua parameter: `max` adalah akumulator (kandidat terbaik saat ini), `current` adalah elemen yang sedang diperiksa.

---

**Langkah 4** — Tambahkan logika perbandingan:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  students.reduce((max, current) => {
    return current.score > max.score ? current : max
  })
}
```
> Ternary operator: jika skor `current` lebih tinggi dari `max`, kembalikan `current` sebagai akumulator baru. Jika tidak, pertahankan `max` yang lama.

---

**Langkah 5** — Simpan hasil reduce ke variabel:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  const winner = students.reduce((max, current) => {
    return current.score > max.score ? current : max
  })
}
```
> Tanpa nilai awal di `.reduce()`, elemen pertama otomatis jadi akumulator awal — loop dimulai dari elemen kedua.

---

**Langkah 6** — Kembalikan hanya `name` dan `score`:
```javascript
const highestScore = (students) => {
  if (students.length === 0) return null

  const winner = students.reduce((max, current) => {
    return current.score > max.score ? current : max
  })

  return { name: winner.name, score: winner.score }
}
```
> Kembalikan hanya dua properti yang dibutuhkan — properti `class` tidak ikut dikembalikan.

**Hasil:**
```javascript
console.log(highestScore(data))  // { name: 'Dimitri', score: 90 }
console.log(highestScore([]))    // null
```
