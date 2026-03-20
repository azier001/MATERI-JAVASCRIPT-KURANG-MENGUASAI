# 🥉 Lowest Score
### Mencari Siswa dengan Nilai Terendah

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

Diberikan array of object berisi data siswa, ambil **satu siswa dengan skor terendah** dari seluruh data.

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

lowestScore(data)   // { name: 'Sergei', score: 74 }
lowestScore([])     // null
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Solusi |
|--------|-------------------|
| Min Pattern | Mencari nilai terkecil dari seluruh data |
| Destructuring | Mengambil `name` dan `score` dari setiap objek |
| Edge case handling | Menangani array kosong dengan `null` |

---

## 🔄 Implementasi

```javascript
const lowestScore = (students) => {               // 1️⃣ Fungsi menerima array of object
  if (students.length === 0) return null           // 2️⃣ Jika array kosong, kembalikan null

  let min = null                                   // 3️⃣ Tracker dimulai dari null

  for (const { name, score } of students) {        // 4️⃣ Destructuring: ambil name dan score
    if (min === null || score < min.score) {        // 5️⃣ Jika belum ada data atau skor lebih rendah
      min = { name, score }                        //    → update tracker dengan data saat ini
    }
  }

  return min                                       // 6️⃣ Kembalikan siswa dengan skor terendah
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const lowestScore = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `if (students.length === 0) return null` | Cek array kosong di awal — jika tidak ada data, tidak ada yang bisa diproses |
| 3️⃣ | `let min = null` | Dimulai dari `null` bukan `0` — agar bisa mendeteksi kapan data pertama masuk lewat kondisi `min === null` |
| 4️⃣ | `{ name, score } of students` | Destructuring mengambil hanya `name` dan `score` — `class` tidak dibutuhkan di sini |
| 5️⃣ | `min === null \|\| score < min.score` | Dua kondisi: pertama kali masuk (`null`) ATAU skor lebih rendah dari yang tersimpan |
| 6️⃣ | `return min` | Kembalikan objek `{ name, score }` dari siswa dengan skor terendah |

**Hasil:**
```javascript
console.log(lowestScore(data))  // { name: 'Sergei', score: 74 }
console.log(lowestScore([]))    // null
```

---

## 🧪 Visualisasi

**Data:** `students` (4 objek)

| Langkah | Objek | `min` sebelum | Kondisi | `min` setelah |
|---------|-------|---------------|---------|---------------|
| 1 | `Dimitri (90)` | `null` | `null === null` → ✅ | `{ Dimitri, 90 }` |
| 2 | `Alexei (85)` | `{ Dimitri, 90 }` | `85 < 90` → ✅ | `{ Alexei, 85 }` |
| 3 | `Sergei (74)` | `{ Alexei, 85 }` | `74 < 85` → ✅ | `{ Sergei, 74 }` |
| 4 | `Anastasia (78)` | `{ Sergei, 74 }` | `78 < 74` → ❌ | `{ Sergei, 74 }` |

**Hasil akhir:** `{ name: 'Sergei', score: 74 }` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Inisialisasi dengan elemen pertama

```javascript
const lowestScore = (students) => {               // 1️⃣ Fungsi menerima array of object
  if (students.length === 0) return null           // 2️⃣ Handle array kosong

  let min = students[0]                            // 3️⃣ Inisialisasi dengan elemen pertama

  for (let i = 1; i < students.length; i++) {     // 4️⃣ Mulai loop dari index 1
    if (students[i].score < min.score) {           // 5️⃣ Bandingkan skor
      min = students[i]                            //    → update jika lebih rendah
    }
  }

  return { name: min.name, score: min.score }      // 6️⃣ Kembalikan hanya name dan score
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const lowestScore = (students)` | Fungsi menerima array of object |
| 2️⃣ | `if (students.length === 0) return null` | Handle array kosong — wajib ada sebelum mengakses `students[0]` |
| 3️⃣ | `let min = students[0]` | Inisialisasi dengan elemen pertama sebagai kandidat awal |
| 4️⃣ | `for (let i = 1; ...)` | Loop dimulai dari index 1 karena index 0 sudah dijadikan nilai awal |
| 5️⃣ | `students[i].score < min.score` | Bandingkan skor — update `min` jika skor lebih rendah |
| 6️⃣ | `return { name: min.name, score: min.score }` | Kembalikan hanya dua properti yang dibutuhkan — tanpa `class` |

**Visualisasi — fokus: inisialisasi dari elemen pertama**

| Langkah | `i` | `students[i]` | `min` sebelum | Kondisi | `min` setelah |
|---------|-----|---------------|---------------|---------|---------------|
| init | — | — | `{ Dimitri, 90 }` | Inisialisasi | `{ Dimitri, 90 }` |
| 1 | `1` | `Alexei (85)` | `{ Dimitri, 90 }` | `85 < 90` → ✅ | `{ Alexei, 85 }` |
| 2 | `2` | `Sergei (74)` | `{ Alexei, 85 }` | `74 < 85` → ✅ | `{ Sergei, 74 }` |
| 3 | `3` | `Anastasia (78)` | `{ Sergei, 74 }` | `78 < 74` → ❌ | `{ Sergei, 74 }` |

**Hasil:**
```javascript
console.log(lowestScore(data))  // { name: 'Sergei', score: 74 }
console.log(lowestScore([]))    // null
```

> **Kapan pakai ini?**
> Ketika kamu ingin menghindari pengecekan `null` di setiap iterasi. Lebih efisien karena kondisi `min === null` hanya dicek sekali di awal.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const lowestScore = (students) => {                      // 1️⃣ Fungsi menerima array of object
  if (students.length === 0) return null                  // 2️⃣ Handle array kosong

  const { name, score } = students.reduce((min, current) => { // 3️⃣ reduce + destructuring hasil
    return current.score < min.score ? current : min      // 4️⃣ Kembalikan yang skornya lebih rendah
  })                                                      // 5️⃣ Tanpa nilai awal → elemen pertama jadi akumulator

  return { name, score }                                  // 6️⃣ Kembalikan hanya name dan score
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const lowestScore = (students)` | Fungsi menerima array of object |
| 2️⃣ | `if (students.length === 0) return null` | Handle array kosong — `.reduce()` tanpa nilai awal akan throw error pada array kosong |
| 3️⃣ | `students.reduce((min, current) => {` | `.reduce()` membandingkan dua elemen sekaligus — `min` adalah kandidat terkecil saat ini, `current` adalah elemen yang sedang diperiksa |
| 4️⃣ | `current.score < min.score ? current : min` | Ternary: kembalikan `current` jika skornya lebih rendah, jika tidak kembalikan `min` yang lama |
| 5️⃣ | `})` tanpa nilai awal | Tanpa nilai awal, elemen pertama otomatis jadi akumulator pertama — loop dimulai dari elemen kedua |
| 6️⃣ | `return { name, score }` | Destructuring hasil reduce, lalu kembalikan hanya dua properti yang dibutuhkan |

**Visualisasi — fokus: akumulator `.reduce()` tanpa nilai awal**

| Iterasi | `min` | `current` | Kondisi | `min` keluar |
|---------|-------|-----------|---------|--------------|
| 1 | `{ Dimitri, 90 }` | `{ Alexei, 85 }` | `85 < 90` → ✅ | `{ Alexei, 85 }` |
| 2 | `{ Alexei, 85 }` | `{ Sergei, 74 }` | `74 < 85` → ✅ | `{ Sergei, 74 }` |
| 3 | `{ Sergei, 74 }` | `{ Anastasia, 78 }` | `78 < 74` → ❌ | `{ Sergei, 74 }` |

**Hasil:**
```javascript
console.log(lowestScore(data))  // { name: 'Sergei', score: 74 }
console.log(lowestScore([]))    // null
```

> **Kapan pakai ini?**
> Gaya fungsional yang ringkas. `.reduce()` tanpa nilai awal menjadikan elemen pertama sebagai akumulator — cocok ketika data dijamin tidak kosong (sudah dicek di awal).

---

## ⚠️ Jebakan Umum

### ❌ 1. Inisialisasi `min` dengan angka `0`

```javascript
let min = 0 // ❌ Tidak bisa menyimpan objek { name, score }
```

**Masalah:** `min` diisi angka, tapi nanti dibandingkan dengan `score` dari objek — hasilnya tidak konsisten. Selain itu, jika semua skor positif, `0` akan selalu lebih kecil sehingga `min` tidak pernah diupdate.

✅ **Solusi:** Gunakan `null` sebagai nilai awal, lalu cek `min === null` untuk data pertama.

---

### ❌ 2. Tidak handle array kosong

```javascript
const lowestScore = (students) => {
  let min = null
  for (const { name, score } of students) { ... }
  return min // ❌ Mengembalikan null tanpa validasi eksplisit
}
```

**Masalah:** Fungsi tetap berjalan tapi mengembalikan `null` tanpa pengecekan yang jelas — membingungkan pemanggil fungsi.

✅ **Solusi:** Tambahkan pengecekan di awal:
```javascript
if (students.length === 0) return null
```

---

### ❌ 3. Salah operator perbandingan

```javascript
if (min === null || score > min.score) { // ❌ Ini jadi Highest Score, bukan Lowest!
```

**Masalah:** Operator `>` mencari nilai terbesar — hasilnya kebalikan dari yang diinginkan.

✅ **Solusi:** Gunakan `<` untuk mencari nilai terkecil:
```javascript
if (min === null || score < min.score) { // ✅
```

---

## 💡 Insight

> **Lowest Score adalah kebalikan langsung dari Highest Score.**
> Satu-satunya perbedaan ada pada operator perbandingan: `<` menggantikan `>`. Semua logika lainnya identik.

Perbandingan Highest vs Lowest Score:

| | Highest Score | Lowest Score |
|--|---------------|--------------|
| Tracker | `let max = null` | `let min = null` |
| Kondisi | `score > max.score` | `score < min.score` |
| Hasil | Skor tertinggi | Skor terendah |

---

## 📝 Pelajaran yang Didapat

- ✅ Lowest Score adalah Min Pattern yang diterapkan pada array of object
- ✅ Satu-satunya perbedaan dari Highest Score: operator `<` vs `>`
- ✅ Mengapa `null` lebih aman dari `0` sebagai nilai awal tracker
- ✅ Pola `min === null || score < min.score` untuk handle data pertama sekaligus perbandingan
- ✅ Tiga cara menulis solusi: `null` tracker, inisialisasi elemen pertama, `.reduce()`

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Null Tracker

**Langkah 1** — Deklarasikan fungsi:
```javascript
const lowestScore = (students) => {

}
```
> Fungsi menerima satu parameter `students` berupa array of object.

---

**Langkah 2** — Handle array kosong:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null
}
```
> Jika array kosong, tidak ada yang bisa diproses — langsung kembalikan `null` sebelum apapun dijalankan.

---

**Langkah 3** — Siapkan tracker:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = null
}
```
> `null` digunakan sebagai nilai awal — lebih aman dari `0` karena `0` bisa lebih kecil dari semua skor sehingga `min` tidak pernah diupdate.

---

**Langkah 4** — Buka loop dengan destructuring:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = null

  for (const { name, score } of students) {

  }
}
```
> Destructuring langsung mengambil `name` dan `score` dari setiap objek — `class` tidak dibutuhkan di sini.

---

**Langkah 5** — Tambahkan kondisi untuk data pertama:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = null

  for (const { name, score } of students) {
    if (min === null) {
      min = { name, score }
    }
  }
}
```
> `min === null` bernilai `true` hanya pada iterasi pertama — data pertama langsung disimpan tanpa perlu dibandingkan.

---

**Langkah 6** — Tambahkan kondisi perbandingan:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = null

  for (const { name, score } of students) {
    if (min === null || score < min.score) {
      min = { name, score }
    }
  }
}
```
> Gabungkan dua kondisi dengan `||`: jika `min` masih `null` ATAU skor lebih rendah, update `min`. Operator `<` adalah kunci perbedaan dari Highest Score.

---

**Langkah 7** — Kembalikan hasil:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = null

  for (const { name, score } of students) {
    if (min === null || score < min.score) {
      min = { name, score }
    }
  }

  return min
}
```
> Fungsi selesai. `return min` mengembalikan objek `{ name, score }` dari siswa dengan skor terendah.

**Hasil:**
```javascript
console.log(lowestScore(data))  // { name: 'Sergei', score: 74 }
console.log(lowestScore([]))    // null
```

---

### Versi 2 — Inisialisasi Elemen Pertama

**Langkah 1** — Deklarasikan fungsi:
```javascript
const lowestScore = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Handle array kosong:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null
}
```
> Wajib dicek dulu sebelum mengakses `students[0]` — jika array kosong, `students[0]` adalah `undefined`.

---

**Langkah 3** — Inisialisasi dengan elemen pertama:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = students[0]
}
```
> `students[0]` dijadikan kandidat awal — aman karena array sudah dipastikan tidak kosong.

---

**Langkah 4** — Buka loop mulai dari index 1:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = students[0]

  for (let i = 1; i < students.length; i++) {

  }
}
```
> Loop dimulai dari index `1` karena index `0` sudah dipakai sebagai nilai awal `min`.

---

**Langkah 5** — Tambahkan perbandingan dan update:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = students[0]

  for (let i = 1; i < students.length; i++) {
    if (students[i].score < min.score) {
      min = students[i]
    }
  }
}
```
> `students[i].score < min.score` membandingkan skor elemen saat ini dengan yang tersimpan — update `min` jika lebih rendah.

---

**Langkah 6** — Kembalikan hasil:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  let min = students[0]

  for (let i = 1; i < students.length; i++) {
    if (students[i].score < min.score) {
      min = students[i]
    }
  }

  return { name: min.name, score: min.score }
}
```
> Kembalikan hanya dua properti yang dibutuhkan — properti `class` tidak ikut dikembalikan.

**Hasil:**
```javascript
console.log(lowestScore(data))  // { name: 'Sergei', score: 74 }
console.log(lowestScore([]))    // null
```

---

### Versi 3 — Menggunakan `.reduce()`

**Langkah 1** — Deklarasikan fungsi:
```javascript
const lowestScore = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Handle array kosong:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null
}
```
> `.reduce()` tanpa nilai awal akan throw error jika array kosong — wajib dicek dulu.

---

**Langkah 3** — Panggil `.reduce()` dengan dua parameter:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  students.reduce((min, current) => {

  })
}
```
> `.reduce()` menerima callback dengan dua parameter: `min` adalah akumulator (kandidat terkecil saat ini), `current` adalah elemen yang sedang diperiksa.

---

**Langkah 4** — Tambahkan logika perbandingan:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  students.reduce((min, current) => {
    return current.score < min.score ? current : min
  })
}
```
> Ternary operator: jika skor `current` lebih rendah dari `min`, kembalikan `current`. Jika tidak, pertahankan `min` yang lama.

---

**Langkah 5** — Simpan hasil reduce ke variabel:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  const loser = students.reduce((min, current) => {
    return current.score < min.score ? current : min
  })
}
```
> Tanpa nilai awal di `.reduce()`, elemen pertama otomatis jadi akumulator awal — loop dimulai dari elemen kedua.

---

**Langkah 6** — Kembalikan hanya `name` dan `score`:
```javascript
const lowestScore = (students) => {
  if (students.length === 0) return null

  const loser = students.reduce((min, current) => {
    return current.score < min.score ? current : min
  })

  return { name: loser.name, score: loser.score }
}
```
> Kembalikan hanya dua properti yang dibutuhkan — properti `class` tidak ikut dikembalikan.

**Hasil:**
```javascript
console.log(lowestScore(data))  // { name: 'Sergei', score: 74 }
console.log(lowestScore([]))    // null
```
