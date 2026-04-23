# 🗂️ Basic Grouping
### Mengelompokkan Data Berdasarkan Kategori

![Kategori](https://img.shields.io/badge/Kategori-Grouping-purple)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Loop%20%7C%20Object%20%7C%20Grouping-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Basic Grouping |
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

**Basic Grouping** adalah pola untuk mengelompokkan data ke dalam kategori-kategori tertentu.

Digunakan ketika:
- mengelompokkan angka berdasarkan **genap atau ganjil**
- mengelompokkan siswa berdasarkan **kelas**
- mengelompokkan produk berdasarkan **kategori**

> Grouping berbeda dengan Frequency Counter — Frequency Counter **menghitung** kemunculan, sedangkan Grouping **mengumpulkan** datanya ke dalam kelompok.

---

## 🧠 Memahami Konsep

> Inti dari basic grouping:
> **Tentukan kategori setiap elemen, lalu masukkan ke dalam kelompok yang sesuai.**

Bayangkan kamu memilah sekeranjang bola berdasarkan warna — setiap bola diperiksa satu per satu, lalu dimasukkan ke kotak yang sesuai warnanya.

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6]
```

**Output yang diharapkan:**
```javascript
{
  ganjil: [1, 3, 5],
  genap: [2, 4, 6]
}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi (loop) | Menelusuri setiap elemen array |
| Object sebagai wadah | Menyimpan kelompok data per kategori |
| Kondisi (if/else) | Menentukan elemen masuk ke kelompok mana |
| `push()` | Menambahkan elemen ke dalam array kelompok |

---

## 🔄 Implementasi

```javascript
const groupNumbers = (arr) => {       // 1️⃣ Fungsi menerima array sebagai input
  const result = {                    // 2️⃣ Siapkan wadah dengan dua grup
    ganjil: [],                       //    → grup untuk angka ganjil
    genap: []                         //    → grup untuk angka genap
  }

  for (const num of arr) {            // 3️⃣ Telusuri setiap elemen array
    if (num % 2 === 0) {              // 4️⃣ Cek sisa bagi: jika 0 → genap
      result.genap.push(num)          // 5️⃣ Masukkan ke grup genap
    } else {                          //    Jika tidak → ganjil
      result.ganjil.push(num)         // 6️⃣ Masukkan ke grup ganjil
    }
  }

  return result                       // 7️⃣ Kembalikan object berisi dua grup
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const groupNumbers = (arr)` | Fungsi menerima satu parameter: array yang akan dikelompokkan |
| 2️⃣ | `const result = { ganjil: [], genap: [] }` | Object dengan dua key, masing-masing berisi array kosong sebagai wadah grup |
| 3️⃣ | `for (const num of arr)` | Loop `for...of` menelusuri setiap elemen — `num` adalah nilai elemen saat ini |
| 4️⃣ | `num % 2 === 0` | Operator `%` menghitung sisa bagi. Jika sisa bagi 2 adalah `0`, angka tersebut genap |
| 5️⃣ | `result.genap.push(num)` | `push()` menambahkan `num` ke ujung array `genap` tanpa menimpa data sebelumnya |
| 6️⃣ | `result.ganjil.push(num)` | Sama seperti di atas, tapi untuk grup `ganjil` |
| 7️⃣ | `return result` | Mengembalikan object yang berisi semua elemen yang sudah dikelompokkan |

---

## 🧪 Visualisasi

**Data:** `[1, 2, 3, 4, 5, 6]`

| Langkah | Elemen | Kondisi | Masuk ke Grup |
|---------|--------|---------|---------------|
| 1 | `1` | `1 % 2 === 0` → ❌ | `ganjil: [1]` |
| 2 | `2` | `2 % 2 === 0` → ✅ | `genap: [2]` |
| 3 | `3` | `3 % 2 === 0` → ❌ | `ganjil: [1, 3]` |
| 4 | `4` | `4 % 2 === 0` → ✅ | `genap: [2, 4]` |
| 5 | `5` | `5 % 2 === 0` → ❌ | `ganjil: [1, 3, 5]` |
| 6 | `6` | `6 % 2 === 0` → ✅ | `genap: [2, 4, 6]` |

**Hasil akhir:**
```javascript
{
  ganjil: [1, 3, 5],
  genap: [2, 4, 6]
}
```

---

## 🔀 Versi Alternatif

### Versi 2 — Grup Dinamis (tanpa inisialisasi manual)

```javascript
const groupNumbers = (arr) => {             // 1️⃣ Fungsi menerima array sebagai input
  const result = {}                         // 2️⃣ Object kosong — grup terbentuk secara dinamis

  for (const num of arr) {                  // 3️⃣ Telusuri setiap elemen
    const key = num % 2 === 0              // 4️⃣ Tentukan nama grup berdasarkan kondisi
      ? 'genap'                             //    → jika genap, key = 'genap'
      : 'ganjil'                            //    → jika ganjil, key = 'ganjil'

    if (!result[key]) {                     // 5️⃣ Jika grup belum ada...
      result[key] = []                      //    ...buat array kosong terlebih dahulu
    }

    result[key].push(num)                   // 6️⃣ Masukkan elemen ke grup yang sesuai
  }

  return result                             // 7️⃣ Kembalikan hasil grouping
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const groupNumbers = (arr)` | Fungsi menerima array sebagai input |
| 2️⃣ | `const result = {}` | Object kosong — tidak ada grup yang disiapkan di awal, semua terbentuk saat iterasi |
| 3️⃣ | `for (const num of arr)` | Loop menelusuri setiap elemen satu per satu |
| 4️⃣ | `const key = num % 2 === 0 ? 'genap' : 'ganjil'` | Ternary operator menentukan nama key secara dinamis berdasarkan kondisi |
| 5️⃣ | `if (!result[key]) result[key] = []` | `!result[key]` bernilai `true` jika grup belum ada — jika belum, buat array kosong dulu |
| 6️⃣ | `result[key].push(num)` | Setelah grup dipastikan ada, baru elemen dimasukkan |
| 7️⃣ | `return result` | Kembalikan object berisi semua grup yang terbentuk |

**Visualisasi — fokus: pengecekan grup sebelum push**

Data: `[1, 2, 3]`

| Langkah | `num` | `key` | Grup Sudah Ada? | Aksi | State `result` |
|---------|-------|-------|-----------------|------|----------------|
| 1 | `1` | `ganjil` | ❌ Belum | Buat `[]`, push `1` | `{ ganjil: [1] }` |
| 2 | `2` | `genap` | ❌ Belum | Buat `[]`, push `2` | `{ ganjil: [1], genap: [2] }` |
| 3 | `3` | `ganjil` | ✅ Ada | Langsung push `3` | `{ ganjil: [1, 3], genap: [2] }` |

> **Kapan pakai ini?**
> Ketika kategori tidak diketahui di awal dan terbentuk secara dinamis saat iterasi. Ini adalah fondasi untuk grouping yang lebih fleksibel seperti mengelompokkan berdasarkan properti objek.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const groupNumbers = (arr) => {
  return arr.reduce((result, num) => {    // 1️⃣ reduce: telusuri array, kumpulkan ke result
    const key = num % 2 === 0            // 2️⃣ Tentukan nama grup
      ? 'genap'
      : 'ganjil'

    if (!result[key]) result[key] = []   // 3️⃣ Buat array grup jika belum ada
    result[key].push(num)                // 4️⃣ Masukkan elemen ke grup
    return result                        // 5️⃣ Kembalikan result untuk iterasi berikutnya
  }, {})                                 // 6️⃣ Nilai awal result adalah object kosong
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `arr.reduce((result, num) => {` | `.reduce()` menelusuri setiap elemen — `result` adalah akumulator, `num` adalah elemen saat ini |
| 2️⃣ | `const key = num % 2 === 0 ? 'genap' : 'ganjil'` | Tentukan nama grup secara dinamis menggunakan ternary operator |
| 3️⃣ | `if (!result[key]) result[key] = []` | Pastikan grup sudah ada sebelum `push()` |
| 4️⃣ | `result[key].push(num)` | Masukkan elemen ke dalam grup yang sesuai |
| 5️⃣ | `return result` | Wajib dikembalikan agar akumulator terus terbawa ke iterasi berikutnya |
| 6️⃣ | `}, {})` | Object kosong `{}` adalah nilai awal `result` sebelum iterasi pertama dimulai |

**Visualisasi — fokus: akumulator `result` yang terus terbawa**

Data: `[1, 2, 3]`

| Iterasi | `num` | `key` | `result` masuk | `result` keluar |
|---------|-------|-------|----------------|-----------------|
| 1 | `1` | `ganjil` | `{}` | `{ ganjil: [1] }` |
| 2 | `2` | `genap` | `{ ganjil: [1] }` | `{ ganjil: [1], genap: [2] }` |
| 3 | `3` | `ganjil` | `{ ganjil: [1], genap: [2] }` | `{ ganjil: [1, 3], genap: [2] }` |

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional. Semua logika grouping terangkum dalam satu ekspresi.

---

## ⚠️ Jebakan Umum

### ❌ 1. Lupa inisialisasi array di dalam grup

```javascript
const result = {}
result['ganjil'].push(1) // ❌ Cannot read properties of undefined
```

**Masalah:** `result['ganjil']` belum ada, tidak bisa langsung `push()`.

✅ **Solusi:** Cek dulu sebelum push:
```javascript
if (!result[key]) result[key] = []
result[key].push(num)
```

---

### ❌ 2. Menggunakan `=` instead of `push()`

```javascript
result[key] = num // ❌ Menimpa data sebelumnya
```

**Masalah:** Setiap iterasi menimpa nilai sebelumnya — hanya elemen terakhir yang tersimpan.

✅ **Solusi:** Gunakan `push()` untuk menambahkan ke array yang sudah ada.

---

### ❌ 3. Kategori hardcoded tapi data tidak sesuai

```javascript
const result = { ganjil: [], genap: [] }
// Lalu dipakai untuk data string → tidak cocok
```

✅ **Solusi:** Sesuaikan inisialisasi dengan jenis data, atau gunakan grup dinamis.

---

## 💡 Insight

> **Grouping adalah langkah pertama sebelum analisis lebih lanjut.**
> Setelah data dikelompokkan, kamu bisa menghitung, meranking, atau memfilter per grup dengan mudah.

Perbedaan kunci dengan Frequency Counter:

| | Frequency Counter | Basic Grouping |
|--|-------------------|----------------|
| Menyimpan | Jumlah (angka) | Data aslinya (array) |
| Hasil | `{ key: count }` | `{ key: [...items] }` |
| Tujuan | Menghitung | Mengumpulkan |

> 📌 **Variasi Grouping:** Tidak semua grouping menggunakan Object. Jika soal meminta posisi index yang **mutlak** (misal: Ranged wajib di index 0, Melee wajib di index 1), gunakan **Array pre-defined `[[], []]`** sebagai wadah. Lihat studi kasus: [melee-ranged-grouping.md](../04-case-study_studi-kasus/melee-ranged-grouping.md)

---

## 📝 Pelajaran yang Didapat

- ✅ Perbedaan grouping vs frequency counter
- ✅ Cara mengelompokkan data ke dalam object berisi array
- ✅ Pentingnya inisialisasi array sebelum `push()`
- ✅ Grup statis (inisialisasi manual) vs grup dinamis (terbentuk saat iterasi)
- ✅ Grouping adalah fondasi sebelum ranking dan analisis yang lebih kompleks
