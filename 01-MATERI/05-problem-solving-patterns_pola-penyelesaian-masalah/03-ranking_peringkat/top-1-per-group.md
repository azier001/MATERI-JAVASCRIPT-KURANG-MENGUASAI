# 🥇 Top 1 Per Group
### Mengambil Data Tertinggi di Setiap Grup

![Kategori](https://img.shields.io/badge/Kategori-Ranking-red)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Menengah-yellow)
![Topik](https://img.shields.io/badge/Topik-Grouping%20%7C%20Max%20Pattern%20%7C%20Destructuring-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Top 1 Per Group |
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

**Top 1 Per Group** adalah kombinasi dari **Grouping** dan **Max Pattern** — mengambil satu data terbaik (nilai tertinggi) dari setiap grup.

Digunakan ketika:
- mengambil **siswa dengan skor tertinggi** per kelas
- mengambil **produk terlaris** per kategori
- mengambil **karyawan terbaik** per departemen

> Ini bukan sekadar grouping — setiap grup hanya menyimpan **satu** data terbaik, bukan semua datanya.

---

## 🧠 Memahami Konsep

> Inti dari top 1 per group:
> **Untuk setiap grup, simpan data pertama yang ditemukan. Jika ada data berikutnya di grup yang sama, bandingkan — simpan hanya jika lebih baik.**

Ini seperti Max Pattern, tapi dijalankan secara terpisah untuk setiap grup secara bersamaan dalam satu loop.

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
  foxes: { name: 'Dimitri', score: 90 },
  wolves: { name: 'Alexei', score: 85 }
}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Grouping | Mengelompokkan data berdasarkan properti `class` |
| Max Pattern | Menyimpan data terbaik per grup |
| Destructuring | Mengambil `name`, `score`, dan `class` dari setiap objek |
| Object sebagai map | Menyimpan satu data terbaik per grup sebagai value |

---

## 🔄 Implementasi

```javascript
const topOnePerGroup = (students) => {                        // 1️⃣ Fungsi menerima array of object
  const result = {}                                           // 2️⃣ Wadah kosong untuk hasil per grup

  for (const { name, score, class: className } of students) { // 3️⃣ Destructuring semua properti yang dibutuhkan
    if (!result[className]) {                                  // 4️⃣ Jika grup belum ada...
      result[className] = { name, score }                     //    ...simpan data pertama sebagai kandidat
    } else if (score > result[className].score) {             // 5️⃣ Jika grup sudah ada, bandingkan skor
      result[className] = { name, score }                     //    ...update jika skor lebih tinggi
    }
  }

  return result                                               // 6️⃣ Kembalikan object berisi top 1 per grup
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topOnePerGroup = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `const result = {}` | Object kosong — setiap key akan berisi satu objek data terbaik |
| 3️⃣ | `{ name, score, class: className }` | Destructuring mengambil `name`, `score`, dan `class` sekaligus. `class` di-rename jadi `className` karena `class` adalah reserved word |
| 4️⃣ | `if (!result[className])` | Jika grup belum pernah ditemukan, langsung simpan data pertama sebagai kandidat awal |
| 5️⃣ | `else if (score > result[className].score)` | Jika grup sudah ada, bandingkan skor baru dengan yang tersimpan — update hanya jika lebih tinggi |
| 6️⃣ | `return result` | Kembalikan object berisi satu data terbaik per grup |

---

## 🧪 Visualisasi

**Data:** `students` (4 objek)

| Langkah | Objek | `className` | Grup Sudah Ada? | Kondisi | `result` setelah |
|---------|-------|-------------|-----------------|---------|-----------------|
| 1 | `Dimitri (90)` | `foxes` | ❌ Belum | Simpan langsung | `{ foxes: {Dimitri, 90} }` |
| 2 | `Alexei (85)` | `wolves` | ❌ Belum | Simpan langsung | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` |
| 3 | `Sergei (74)` | `foxes` | ✅ Ada | `74 > 90` → ❌ | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` |
| 4 | `Anastasia (78)` | `wolves` | ✅ Ada | `78 > 85` → ❌ | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` |

**Hasil akhir:**
```javascript
{
  foxes: { name: 'Dimitri', score: 90 },
  wolves: { name: 'Alexei', score: 85 }
}
```

---

## 🔀 Versi Alternatif

### Versi 2 — Tanpa Destructuring

```javascript
const topOnePerGroup = (students) => {          // 1️⃣ Fungsi menerima array of object
  const result = {}                             // 2️⃣ Wadah kosong

  for (const student of students) {            // 3️⃣ Loop tiap objek siswa
    const className = student.class            // 4️⃣ Ambil nilai class secara eksplisit
    const current = result[className]          // 5️⃣ Ambil data terbaik saat ini untuk grup ini

    if (!current || student.score > current.score) { // 6️⃣ Jika belum ada atau skor lebih tinggi
      result[className] = {                    //    ...simpan/update data terbaik
        name: student.name,
        score: student.score
      }
    }
  }

  return result                                // 7️⃣ Kembalikan hasil
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topOnePerGroup = (students)` | Fungsi menerima array of object |
| 2️⃣ | `const result = {}` | Object kosong sebagai wadah hasil |
| 3️⃣ | `for (const student of students)` | Loop tiap objek — `student` adalah objek lengkap |
| 4️⃣ | `const className = student.class` | Ambil nilai `class` dengan dot notation tanpa destructuring |
| 5️⃣ | `const current = result[className]` | Simpan referensi ke data terbaik saat ini untuk grup ini — membuat kondisi di baris berikutnya lebih mudah dibaca |
| 6️⃣ | `!current \|\| student.score > current.score` | Dua kondisi digabung: jika belum ada data (`!current`) ATAU skor lebih tinggi, maka update |
| 7️⃣ | `return result` | Kembalikan object berisi top 1 per grup |

**Visualisasi — fokus: variabel `current` sebagai pembanding**

Data: `students` (4 objek)

| Langkah | `student` | `className` | `current` | Kondisi | `result` setelah |
|---------|-----------|-------------|-----------|---------|-----------------|
| 1 | `Dimitri (90)` | `foxes` | `undefined` | `!current` → ✅ | `{ foxes: {Dimitri, 90} }` |
| 2 | `Alexei (85)` | `wolves` | `undefined` | `!current` → ✅ | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` |
| 3 | `Sergei (74)` | `foxes` | `{Dimitri, 90}` | `74 > 90` → ❌ | tidak berubah |
| 4 | `Anastasia (78)` | `wolves` | `{Alexei, 85}` | `78 > 85` → ❌ | tidak berubah |

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const topOnePerGroup = (students) => {
  return students.reduce((result, { name, score, class: className }) => { // 1️⃣ reduce + destructuring
    const current = result[className]                                      // 2️⃣ Data terbaik saat ini
    if (!current || score > current.score) {                              // 3️⃣ Cek apakah perlu update
      result[className] = { name, score }                                 // 4️⃣ Simpan/update data terbaik
    }
    return result                                                          // 5️⃣ Kembalikan akumulator
  }, {})                                                                   // 6️⃣ Nilai awal: object kosong
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `students.reduce((result, { name, score, class: className }) =>` | `.reduce()` dengan destructuring langsung di parameter — mengambil `name`, `score`, dan `className` sekaligus |
| 2️⃣ | `const current = result[className]` | Ambil data terbaik yang sudah tersimpan untuk grup ini |
| 3️⃣ | `!current \|\| score > current.score` | Update jika grup belum ada atau skor lebih tinggi |
| 4️⃣ | `result[className] = { name, score }` | Simpan/timpa dengan data terbaik yang baru |
| 5️⃣ | `return result` | Wajib dikembalikan agar akumulator terbawa ke iterasi berikutnya |
| 6️⃣ | `}, {})` | Object kosong `{}` adalah nilai awal `result` |

**Visualisasi — fokus: akumulator `.reduce()` yang terus terbawa**

Data: `students` (4 objek)

| Iterasi | `name` | `className` | `result` masuk | `result` keluar |
|---------|--------|-------------|----------------|-----------------|
| 1 | `Dimitri` | `foxes` | `{}` | `{ foxes: {Dimitri, 90} }` |
| 2 | `Alexei` | `wolves` | `{ foxes: {Dimitri, 90} }` | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` |
| 3 | `Sergei` | `foxes` | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` | tidak berubah |
| 4 | `Anastasia` | `wolves` | `{ foxes: {Dimitri, 90}, wolves: {Alexei, 85} }` | tidak berubah |

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional. Semua logika terangkum dalam satu ekspresi tanpa variabel tambahan di luar.

---

## ⚠️ Jebakan Umum

### ❌ 1. Selalu overwrite tanpa membandingkan

```javascript
result[className] = { name, score } // ❌ Selalu menimpa, tidak cek mana yang lebih tinggi
```

**Masalah:** Data terakhir per grup yang tersimpan, bukan yang tertinggi.

✅ **Solusi:** Selalu cek dulu — update hanya jika skor lebih tinggi:
```javascript
if (!result[className] || score > result[className].score) {
  result[className] = { name, score }
}
```

---

### ❌ 2. Langsung compare tanpa cek keberadaan grup

```javascript
if (score > result[className].score) { // ❌ Error jika grup belum ada
```

**Masalah:** Jika `result[className]` belum ada, mengakses `.score` dari `undefined` akan throw error.

✅ **Solusi:** Cek keberadaan grup dulu dengan `!result[className]` sebelum membandingkan.

---

### ❌ 3. Lupa rename `class` saat destructuring

```javascript
const { class } = student // ❌ SyntaxError
```

✅ **Solusi:**
```javascript
const { class: className } = student // ✅
```

---

## 💡 Insight

> **Top 1 Per Group adalah Max Pattern yang berjalan paralel untuk setiap grup.**
> Alih-alih satu variabel `max`, kamu punya banyak `max` — satu untuk tiap grup, semuanya dikelola dalam satu object.

Perbandingan dengan pattern sebelumnya:

| | Max Pattern | Top 1 Per Group |
|--|-------------|-----------------|
| Jumlah grup | 1 (seluruh data) | Banyak (per kategori) |
| Hasil | Satu nilai | Object berisi satu nilai per grup |
| Kompleksitas | O(n) | O(n) — tetap satu loop |

---

## 📝 Pelajaran yang Didapat

- ✅ Top 1 Per Group adalah kombinasi Grouping + Max Pattern
- ✅ Cara mengelola banyak "max" sekaligus dalam satu object
- ✅ Pentingnya dua kondisi: `!result[className]` untuk grup baru, `score > ...` untuk update
- ✅ Destructuring `{ class: className }` untuk menghindari conflict dengan reserved word
- ✅ Tiga cara menulis solusi: destructuring, dot notation, `.reduce()`
- ✅ Efisiensi O(n) — cukup satu loop tanpa sorting
