# 🔢 Most Frequent
### Mencari Data yang Paling Sering Muncul

![Kategori](https://img.shields.io/badge/Kategori-Fundamentals-blue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Loop%20%7C%20Object%20%7C%20Frequency%20%7C%20Max-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Most Frequent Pattern |
| 2 | [🔗 Hubungan dengan Pattern Lain](#-hubungan-dengan-pattern-lain) | Keterkaitan dengan pattern sebelumnya |
| 3 | [🧠 Memahami Konsep](#-memahami-konsep) | Inti cara kerjanya |
| 4 | [🧪 Contoh Kasus](#-contoh-kasus) | Input & output yang diharapkan |
| 5 | [🧪 Test Cases](#-test-cases) | Berbagai skenario pengujian |
| 6 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 7 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 8 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 9 | [🔀 Versi Alternatif](#-versi-alternatif) | Versi handle tie & versi `.reduce()` |
| 10 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 11 | [💡 Insight](#-insight) | Catatan penting & use case |
| 12 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |
| 13 | [✍️ Latihan Menulis Ulang](#️-latihan-menulis-ulang) | Praktik bertahap |

---

## 📋 Deskripsi

**Most Frequent Pattern** adalah pola untuk mencari data yang paling sering muncul dari sekumpulan data.

Digunakan ketika:
- mencari **angka yang paling sering muncul** dalam array
- mencari **kata yang paling populer** dalam kalimat
- mencari **kategori yang paling dominan** dalam data

---

## 🔗 Hubungan dengan Pattern Lain

> Pattern ini **bukan pattern berdiri sendiri** — melainkan **gabungan dari dua pattern dasar**:

```
Frequency Counter  ──┐
                     ├──→ Most Frequent Pattern
Max Pattern        ──┘
```

| Tahap | Pattern yang Dipakai | Tujuan |
|-------|----------------------|--------|
| Loop pertama | Frequency Counter | Menghitung kemunculan setiap data |
| Loop kedua | Max Pattern | Mencari data dengan hitungan terbesar |

> Pastikan kamu sudah memahami `frequency-counter.md` dan `max-pattern.md` sebelum melanjutkan.

---

## 🧠 Memahami Konsep

> Inti dari Most Frequent Pattern:
> **Hitung dulu kemunculan setiap data, lalu cari mana yang paling banyak.**

Bayangkan kamu menghitung suara dalam pemilihan ketua kelas — kamu catat dulu berapa suara tiap kandidat, baru kemudian tentukan siapa pemenangnya.

Dua langkah utama:
1. **Hitung** → Frequency Counter → `{ data: jumlah }`
2. **Cari terbesar** → Max Pattern → siapa yang jumlahnya paling besar?

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const numbers = [1, 3, 2, 3, 1, 3, 2]
```

**Output yang diharapkan:**
```javascript
"angka yang paling sering adalah 3 dan muncul 3 kali"
```

---

## 🧪 Test Cases

```javascript
getMostFrequent([1, 3, 2, 3, 1, 3, 2])
// → "angka yang paling sering adalah 3 dan muncul 3 kali"

getMostFrequent([5, 5, 5, 5])
// → "angka yang paling sering adalah 5 dan muncul 4 kali"
// semua elemen sama → tetap bekerja dengan benar

getMostFrequent([1, 2, 3])
// → "angka yang paling sering adalah 1 dan muncul 1 kali"
// semua muncul sekali → ambil yang pertama ditemukan

getMostFrequent([])
// → null
// array kosong → kembalikan null
```

> **Catatan:** Versi 1 tidak handle kasus tie — jika ada dua angka dengan frekuensi sama, yang dikembalikan adalah yang **pertama ditemukan**. Lihat Versi 2 untuk handle tie secara eksplisit.

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi loop pertama | Menelusuri array dan menghitung frekuensi tiap data |
| Object sebagai map | Menyimpan pasangan `{ data: jumlah }` |
| Iterasi loop kedua | Menelusuri object hasil frekuensi |
| Variabel tracker | Menyimpan nilai terbesar sementara (`maxCount`) |
| Perbandingan nilai | Menentukan mana frekuensi yang lebih besar |
| `Number(key)` | Mengkonversi key string kembali ke number |

---

## 🔄 Implementasi

```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null                    // 1️⃣ Guard clause: array kosong

  const freq = {}

  // Tahap 1 — Hitung frekuensi (Frequency Counter)
  for (const num of arr) {                        // 2️⃣ Loop setiap elemen
    if (freq[num]) {                              // 3️⃣ Jika sudah ada
      freq[num]++                                 //    tambah hitungan
    } else {                                      // 4️⃣ Jika belum ada
      freq[num] = 1                               //    mulai dari 1
    }
  }

  let maxCount = 0                                // 5️⃣ Tracker jumlah terbesar
  let resultNumber = null                         // 6️⃣ Tracker data paling sering

  // Tahap 2 — Cari yang paling sering (Max Pattern)
  for (const key in freq) {                       // 7️⃣ Loop setiap key di freq
    if (freq[key] > maxCount) {                   // 8️⃣ Jika lebih besar dari max saat ini
      maxCount = freq[key]                        //    update maxCount
      resultNumber = Number(key)                  //    update hasil (konversi ke number)
    }
  }

  return `angka yang paling sering adalah ${resultNumber} dan muncul ${maxCount} kali`
}
```

**Penjelasan kode:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `if (!arr.length) return null` | Guard clause — jika array kosong, langsung kembalikan null |
| 2️⃣ | `for (const num of arr)` | Loop setiap elemen array |
| 3️⃣ | `if (freq[num])` | Cek apakah data sudah pernah muncul sebelumnya |
| 4️⃣ | `freq[num] = 1` | Mulai hitungan baru jika belum ada |
| 5️⃣ | `let maxCount = 0` | Tracker jumlah kemunculan terbesar |
| 6️⃣ | `let resultNumber = null` | Tracker data yang paling sering muncul |
| 7️⃣ | `for (const key in freq)` | Loop setiap key di object freq |
| 8️⃣ | `freq[key] > maxCount` | Bandingkan frekuensi — jika lebih besar, update tracker |
| | `Number(key)` | Key dalam object selalu string — konversi kembali ke number |

**Hasil:**
```javascript
getMostFrequent([1, 3, 2, 3, 1, 3, 2])
// → "angka yang paling sering adalah 3 dan muncul 3 kali"

getMostFrequent([])
// → null
```

---

## 🧪 Visualisasi

**Data:** `[1, 3, 2, 3, 1, 3, 2]`

**Tahap 1 — Frequency Counter:**

| Langkah | Elemen | Kondisi | Hasil `freq` |
|---------|--------|---------|--------------|
| 1 | `1` | belum ada → set `1` | `{ 1: 1 }` |
| 2 | `3` | belum ada → set `1` | `{ 1: 1, 3: 1 }` |
| 3 | `2` | belum ada → set `1` | `{ 1: 1, 3: 1, 2: 1 }` |
| 4 | `3` | sudah ada → `++` | `{ 1: 1, 3: 2, 2: 1 }` |
| 5 | `1` | sudah ada → `++` | `{ 1: 2, 3: 2, 2: 1 }` |
| 6 | `3` | sudah ada → `++` | `{ 1: 2, 3: 3, 2: 1 }` |
| 7 | `2` | sudah ada → `++` | `{ 1: 2, 3: 3, 2: 2 }` |

**Hasil freq:** `{ 1: 2, 3: 3, 2: 2 }`

---

**Tahap 2 — Max Pattern:**

| Langkah | Key | `freq[key]` | `maxCount` sebelum | Kondisi | `maxCount` setelah | `resultNumber` |
|---------|-----|-------------|--------------------|---------|--------------------|----------------|
| 1 | `'1'` | `2` | `0` | `2 > 0` → ✅ | `2` | `1` |
| 2 | `'3'` | `3` | `2` | `3 > 2` → ✅ | `3` | `3` |
| 3 | `'2'` | `2` | `3` | `2 > 3` → ❌ | `3` | `3` |

**Hasil akhir:** `"angka yang paling sering adalah 3 dan muncul 3 kali"` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Handle Tie (Seri)

Versi ini menangani kasus di mana **ada lebih dari satu data dengan frekuensi yang sama**.

```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return []                      // 1️⃣ Array kosong → kembalikan array kosong

  const freq = {}

  // Tahap 1 — Hitung frekuensi (lebih ringkas)
  for (const num of arr) {                        // 2️⃣ Loop setiap elemen
    freq[num] = (freq[num] || 0) + 1              // 3️⃣ Hitung frekuensi dengan pola ringkas
  }

  let maxCount = 0
  let resultNumbers = []                          // 4️⃣ Array untuk menampung semua pemenang

  // Tahap 2 — Cari yang paling sering (handle tie)
  for (const key in freq) {
    const count = freq[key]
    if (count > maxCount) {                       // 5️⃣ Ada yang lebih tinggi → reset
      maxCount = count
      resultNumbers = [Number(key)]
    } else if (count === maxCount) {              // 6️⃣ Sama tinggi → tambahkan (tie)
      resultNumbers.push(Number(key))
    }
  }

  return {
    numbers: resultNumbers,                       // 7️⃣ Semua angka yang seri
    count: maxCount                               //    jumlah kemunculannya
  }
}
```

**Perbedaan utama dengan Versi 1:**

| Aspek | Versi 1 | Versi 2 |
|-------|---------|---------|
| Output jika tie | Hanya satu (yang pertama ditemukan) | Array semua yang seri |
| Inisialisasi freq | `if/else` | `(freq[num] \|\| 0) + 1` |
| Handle tie | ❌ | ✅ `else if (count === maxCount)` |
| Tipe output | String | Object `{ numbers, count }` |
| Array kosong | `return null` | `return []` |

**Visualisasi kasus tie:**

**Data:** `[1, 2, 1, 2, 3]`

Setelah Tahap 1: `{ 1: 2, 2: 2, 3: 1 }`

| Langkah | Key | `count` | `maxCount` | Kondisi | `resultNumbers` |
|---------|-----|---------|------------|---------|-----------------|
| 1 | `'1'` | `2` | `0` | `2 > 0` → reset | `[1]` |
| 2 | `'2'` | `2` | `2` | `2 === 2` → push | `[1, 2]` |
| 3 | `'3'` | `1` | `2` | `1 > 2` → ❌ | `[1, 2]` |

**Hasil:** `{ numbers: [1, 2], count: 2 }` ✅

> **Kapan pakai ini?**
> Ketika data bisa memiliki frekuensi yang sama dan kamu perlu mengembalikan **semua** pemenang, bukan hanya satu.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null                              // 1️⃣ Guard clause: array kosong

  // Tahap 1 — Hitung frekuensi dengan reduce
  const freq = arr.reduce((acc, num) => {                  // 2️⃣ Loop setiap elemen array
    acc[num] = (acc[num] || 0) + 1                         // 3️⃣ Hitung frekuensi, simpan ke acc
    return acc                                             // 4️⃣ Kembalikan acc untuk iterasi berikutnya
  }, {})                                                   // 5️⃣ Nilai awal acc adalah object kosong

  // Tahap 2 — Cari yang paling sering dengan reduce
  const resultKey = Object.keys(freq).reduce((bestKey, key) => { // 6️⃣ Loop setiap key di freq
    return freq[key] > freq[bestKey] ? key : bestKey             // 7️⃣ Bandingkan — ambil yang lebih besar
  })                                                             // 8️⃣ Tanpa nilai awal → key pertama jadi bestKey awal

  return `angka yang paling sering adalah ${Number(resultKey)} dan muncul ${freq[resultKey]} kali`
}                                                          // 9️⃣ Konversi resultKey ke number
```

**Penjelasan kode:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `if (!arr.length) return null` | Guard clause — jika array kosong, langsung kembalikan null |
| 2️⃣ | `arr.reduce((acc, num) => ...)` | Pengganti loop pertama — menelusuri setiap elemen array |
| 3️⃣ | `acc[num] = (acc[num] \|\| 0) + 1` | Hitung frekuensi setiap elemen, simpan ke accumulator |
| 4️⃣ | `return acc` | Wajib dikembalikan agar accumulator terbawa ke iterasi berikutnya |
| 5️⃣ | `}, {})` | Nilai awal accumulator adalah object kosong `{}` |
| 6️⃣ | `Object.keys(freq).reduce(...)` | Pengganti loop kedua — menelusuri setiap key di object freq |
| 7️⃣ | `freq[key] > freq[bestKey] ? key : bestKey` | Ternary operator — jika frekuensi key lebih besar, jadikan bestKey baru |
| 8️⃣ | `reduce(...)` tanpa nilai awal | Key pertama otomatis menjadi `bestKey` di iterasi pertama |
| 9️⃣ | `Number(resultKey)` | Key selalu string — konversi ke number sebelum ditampilkan |

**Perbandingan struktur dengan Versi 1:**

| Bagian | Versi 1 (loop manual) | Versi 3 (reduce) |
|--------|----------------------|------------------|
| Tahap 1 | `for (const num of arr)` | `arr.reduce((acc, num) => ...)` |
| Tahap 2 | `for (const key in freq)` | `Object.keys(freq).reduce(...)` |
| Tracker | `let maxCount`, `let resultNumber` | Tidak perlu — terangkum dalam `bestKey` |
| Gaya | Imperatif | Fungsional |

**Visualisasi Tahap 1 — `arr.reduce()` membentuk `freq`:**

**Data:** `[1, 3, 2, 3, 1, 3, 2]`

| Iterasi | `num` | `acc` sebelum | Operasi | `acc` setelah |
|---------|-------|---------------|---------|---------------|
| 1 | `1` | `{}` | `(0\|\|0)+1` | `{ 1: 1 }` |
| 2 | `3` | `{ 1: 1 }` | `(0\|\|0)+1` | `{ 1: 1, 3: 1 }` |
| 3 | `2` | `{ 1: 1, 3: 1 }` | `(0\|\|0)+1` | `{ 1: 1, 3: 1, 2: 1 }` |
| 4 | `3` | `{ 1: 1, 3: 1, 2: 1 }` | `(1\|\|0)+1` | `{ 1: 1, 3: 2, 2: 1 }` |
| 5 | `1` | `{ 1: 1, 3: 2, 2: 1 }` | `(1\|\|0)+1` | `{ 1: 2, 3: 2, 2: 1 }` |
| 6 | `3` | `{ 1: 2, 3: 2, 2: 1 }` | `(2\|\|0)+1` | `{ 1: 2, 3: 3, 2: 1 }` |
| 7 | `2` | `{ 1: 2, 3: 3, 2: 1 }` | `(1\|\|0)+1` | `{ 1: 2, 3: 3, 2: 2 }` |

**Hasil freq:** `{ 1: 2, 3: 3, 2: 2 }`

**Visualisasi Tahap 2 — `Object.keys(freq).reduce()` mencari key terbesar:**

`Object.keys(freq)` → `['1', '3', '2']`

> Karena tidak ada nilai awal, `bestKey` = `'1'` (key pertama), loop mulai dari key kedua.

| Iterasi | `key` | `freq[key]` | `freq[bestKey]` | Kondisi | `bestKey` setelah |
|---------|-------|-------------|-----------------|---------|-------------------|
| 1 | `'3'` | `3` | `freq['1']` = `2` | `3 > 2` → ✅ | `'3'` |
| 2 | `'2'` | `2` | `freq['3']` = `3` | `2 > 3` → ❌ | `'3'` |

**`resultKey`** = `'3'` → `Number('3')` = `3`

**Hasil akhir:** `"angka yang paling sering adalah 3 dan muncul 3 kali"` ✅

**Hasil:**
```javascript
getMostFrequent([1, 3, 2, 3, 1, 3, 2])
// → "angka yang paling sering adalah 3 dan muncul 3 kali"

getMostFrequent([])
// → null
```

> **Kapan pakai ini?**
> Cocok untuk gaya fungsional. Semua logika terangkum tanpa variabel tracker eksplisit. Lebih ringkas tapi membutuhkan pemahaman `.reduce()` yang baik.

---

## ⚠️ Jebakan Umum

### ❌ 1. Lupa konversi key ke Number

```javascript
resultNumber = key // ❌ key selalu bertipe string
```

**Masalah:** Key dalam object selalu bertipe `string` — jika tidak dikonversi, hasilnya `"3"` bukan `3`.

✅ **Solusi:** Gunakan `Number(key)` atau `+key`

---

### ❌ 2. Inisialisasi `maxCount` dengan nilai yang salah

```javascript
let maxCount = -1 // ❌ bisa menyebabkan hasil tidak akurat
```

**Masalah:** Nilai awal yang tidak tepat bisa mengacaukan perbandingan pertama.

✅ **Solusi:** Selalu inisialisasi `maxCount = 0` karena frekuensi tidak mungkin negatif

---

### ❌ 3. Tidak handle tie

```javascript
if (freq[key] > maxCount) { ... }
// ❌ jika seri, hanya yang pertama ditemukan yang dikembalikan
```

**Masalah:** Jika ada dua data dengan frekuensi sama, hanya satu yang dikembalikan tanpa peringatan.

✅ **Solusi:** Tambahkan `else if (count === maxCount)` seperti di Versi 2 jika perlu handle tie

---

### ❌ 4. Mencoba hitung dan cari max dalam satu loop

```javascript
for (const num of arr) {
  freq[num] = (freq[num] || 0) + 1
  if (freq[num] > maxCount) { ... } // ❌ frekuensi belum final!
}
```

**Masalah:** Saat loop pertama belum selesai, frekuensi belum terhitung semua — hasil max bisa salah.

✅ **Solusi:** Selalu pisahkan menjadi **dua loop terpisah**

---

### ❌ 5. Tidak handle array kosong

```javascript
// Tanpa guard clause
for (const num of arr) { ... } // tidak error, tapi hasilnya tidak bermakna
```

**Masalah:** Fungsi tetap berjalan tapi menghasilkan output yang tidak bermakna.

✅ **Solusi:** Tambahkan `if (!arr.length) return null` di awal fungsi

---

## 💡 Insight

> **Pattern ini adalah bukti bahwa pattern dasar bisa digabungkan untuk menyelesaikan masalah yang lebih kompleks.**

Bisa dipakai untuk berbagai jenis data:

| Jenis Data | Contoh Penggunaan |
|------------|-------------------|
| Angka | Cari nilai ujian yang paling banyak didapat siswa |
| String | Cari huruf yang paling sering muncul dalam kata |
| Kategori | Cari genre film yang paling banyak ditonton |
| Properti objek | `freq[obj.city]` → cari kota asal pelanggan terbanyak |

**Kompleksitas:**
- Loop pertama → **O(n)**
- Loop kedua → **O(k)** — k adalah jumlah key unik, selalu ≤ n
- Total → **O(n)** — sangat efisien

---

## 📝 Pelajaran yang Didapat

- ✅ Most Frequent adalah **gabungan Frequency Counter + Max Pattern** — bukan pattern baru dari nol
- ✅ Selalu pisahkan menjadi **dua loop terpisah** — hitung dulu, cari max kemudian
- ✅ Key dalam object selalu `string` — gunakan `Number(key)` jika butuh angka
- ✅ Inisialisasi `maxCount = 0` karena frekuensi tidak pernah negatif
- ✅ Handle **tie/seri** dengan `else if (count === maxCount)` untuk hasil yang lebih akurat
- ✅ Tiga cara menulis solusi: dua loop manual, handle tie, `.reduce()`
- ✅ Pattern ini bisa diterapkan ke angka, string, maupun properti objek

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Dua Loop Manual

**Langkah 1** — Deklarasikan fungsi dan guard clause:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null
}
```
> Selalu tangani edge case di awal — jika array kosong, langsung kembalikan null.

---

**Langkah 2** — Siapkan object frekuensi:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = {}
}
```
> `freq` adalah object kosong yang akan menyimpan frekuensi setiap data.

---

**Langkah 3** — Buka loop pertama (Frequency Counter):
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = {}

  for (const num of arr) {
    if (freq[num]) {
      freq[num]++
    } else {
      freq[num] = 1
    }
  }
}
```
> Loop pertama selesai → `freq` sudah berisi frekuensi semua data.

---

**Langkah 4** — Siapkan variabel tracker:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = {}

  for (const num of arr) {
    if (freq[num]) {
      freq[num]++
    } else {
      freq[num] = 1
    }
  }

  let maxCount = 0
  let resultNumber = null
}
```
> `maxCount` menyimpan jumlah kemunculan terbesar sementara. `resultNumber` menyimpan data yang paling sering muncul.

---

**Langkah 5** — Buka loop kedua (Max Pattern):
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = {}

  for (const num of arr) {
    if (freq[num]) {
      freq[num]++
    } else {
      freq[num] = 1
    }
  }

  let maxCount = 0
  let resultNumber = null

  for (const key in freq) {
    if (freq[key] > maxCount) {
      maxCount = freq[key]
      resultNumber = Number(key)
    }
  }
}
```
> `for...in` menelusuri setiap key di object. Ingat: konversi `key` ke number dengan `Number(key)`.

---

**Langkah 6** — Kembalikan hasil:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = {}

  for (const num of arr) {
    if (freq[num]) {
      freq[num]++
    } else {
      freq[num] = 1
    }
  }

  let maxCount = 0
  let resultNumber = null

  for (const key in freq) {
    if (freq[key] > maxCount) {
      maxCount = freq[key]
      resultNumber = Number(key)
    }
  }

  return `angka yang paling sering adalah ${resultNumber} dan muncul ${maxCount} kali`
}
```

**Hasil:**
```javascript
getMostFrequent([1, 3, 2, 3, 1, 3, 2])
// → "angka yang paling sering adalah 3 dan muncul 3 kali"

getMostFrequent([])
// → null
```

---

### Versi 2 — Handle Tie

**Langkah 1** — Deklarasikan fungsi dan guard clause:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return []
}
```
> Versi ini mengembalikan array kosong (bukan null) karena outputnya berupa array.

---

**Langkah 2** — Hitung frekuensi dengan pola ringkas:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return []

  const freq = {}

  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1
  }
}
```
> Pola `(freq[num] || 0) + 1` lebih ringkas dari `if/else` — hasil sama persis.

---

**Langkah 3** — Siapkan tracker dengan array:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return []

  const freq = {}

  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1
  }

  let maxCount = 0
  let resultNumbers = []
}
```
> `resultNumbers` adalah array — bisa menampung lebih dari satu pemenang jika terjadi tie.

---

**Langkah 4** — Loop dengan handle tie:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return []

  const freq = {}

  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1
  }

  let maxCount = 0
  let resultNumbers = []

  for (const key in freq) {
    const count = freq[key]
    if (count > maxCount) {
      maxCount = count
      resultNumbers = [Number(key)]
    } else if (count === maxCount) {
      resultNumbers.push(Number(key))
    }
  }
}
```
> Kunci perbedaannya: `else if (count === maxCount)` — jika sama tinggi, tambahkan ke array. Jika lebih tinggi, reset array dengan pemenang baru.

---

**Langkah 5** — Kembalikan hasil:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return []

  const freq = {}

  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1
  }

  let maxCount = 0
  let resultNumbers = []

  for (const key in freq) {
    const count = freq[key]
    if (count > maxCount) {
      maxCount = count
      resultNumbers = [Number(key)]
    } else if (count === maxCount) {
      resultNumbers.push(Number(key))
    }
  }

  return {
    numbers: resultNumbers,
    count: maxCount
  }
}
```

**Hasil:**
```javascript
getMostFrequent([1, 2, 1, 2, 3])
// → { numbers: [1, 2], count: 2 }

getMostFrequent([1, 3, 2, 3, 1, 3, 2])
// → { numbers: [3], count: 3 }

getMostFrequent([])
// → []
```

---

### Versi 3 — `.reduce()`

**Langkah 1** — Deklarasikan fungsi dan guard clause:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null
}
```
> Sama seperti Versi 1 — array kosong langsung kembalikan null.

---

**Langkah 2** — Hitung frekuensi dengan `reduce` (Tahap 1):
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1
    return acc
  }, {})
}
```
> `arr.reduce()` menggantikan loop pertama. `acc` dimulai dari `{}`, lalu setiap elemen ditambahkan frekuensinya. Jangan lupa `return acc` — tanpa ini accumulator tidak terbawa ke iterasi berikutnya.

---

**Langkah 3** — Cari key dengan frekuensi terbesar dengan `reduce` (Tahap 2):
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1
    return acc
  }, {})

  const resultKey = Object.keys(freq).reduce((bestKey, key) => {
    return freq[key] > freq[bestKey] ? key : bestKey
  })
}
```
> `Object.keys(freq)` mengambil semua key sebagai array. `.reduce()` tanpa nilai awal → key pertama otomatis jadi `bestKey` awal, loop mulai dari key kedua. Ternary `? key : bestKey` — jika frekuensi key lebih besar, ganti bestKey.

---

**Langkah 4** — Kembalikan hasil:
```javascript
const getMostFrequent = (arr) => {
  if (!arr.length) return null

  const freq = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1
    return acc
  }, {})

  const resultKey = Object.keys(freq).reduce((bestKey, key) => {
    return freq[key] > freq[bestKey] ? key : bestKey
  })

  return `angka yang paling sering adalah ${Number(resultKey)} dan muncul ${freq[resultKey]} kali`
}
```
> `Number(resultKey)` — konversi key dari string ke number. `freq[resultKey]` — ambil jumlah kemunculannya langsung dari object freq.

**Hasil:**
```javascript
getMostFrequent([1, 3, 2, 3, 1, 3, 2])
// → "angka yang paling sering adalah 3 dan muncul 3 kali"

getMostFrequent([])
// → null
```
