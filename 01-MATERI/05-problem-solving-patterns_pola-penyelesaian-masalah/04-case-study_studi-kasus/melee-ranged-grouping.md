# ⚔️ Melee Ranged Grouping
### Mengelompokkan Karakter ke Posisi Index yang Sudah Ditentukan

![Kategori](https://img.shields.io/badge/Kategori-Case%20Study-darkblue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Pemula-green)
![Topik](https://img.shields.io/badge/Topik-Fixed%20Grouping%20%7C%20Array%20%7C%20Ternary-orange)
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

Diberikan array of object berisi data karakter game. Setiap karakter memiliki tipe `"Melee"` atau `"Ranged"`. Kelompokkan **nama-nama** karakter ke dalam dua kelompok berdasarkan tipenya.

**Aturan mutlak dari soal:**
- Index `0` → karakter **Ranged**
- Index `1` → karakter **Melee**
- Output harus berupa **Array berisi dua Array**, bukan Object

---

## 🧠 Memahami Soal

**Input:**
- Array of object
- Setiap object memiliki properti: `name`, `type`

**Output:**
```javascript
[
  ['nama_ranged_1', 'nama_ranged_2'],   // index 0 → Ranged
  ['nama_melee_1', 'nama_melee_2']      // index 1 → Melee
]
```

> ⚠️ **Perhatikan:** Output berupa **Array**, bukan Object. Posisi index **mutlak** — Ranged HARUS di index 0, Melee HARUS di index 1. Ini berbeda dengan Basic Grouping yang menggunakan Object `{ key: [...] }`.

---

## 🧪 Test Cases

```javascript
const characters = [
  { name: 'Ashe', type: 'Ranged' },
  { name: 'Garen', type: 'Melee' },
  { name: 'Jinx', type: 'Ranged' },
  { name: 'Darius', type: 'Melee' },
  { name: 'Caitlyn', type: 'Ranged' },
  { name: 'Yasuo', type: 'Melee' }
]

meleeRangedGrouping(characters)
// [
//   ['Ashe', 'Jinx', 'Caitlyn'],     ← index 0: Ranged
//   ['Garen', 'Darius', 'Yasuo']     ← index 1: Melee
// ]

meleeRangedGrouping([])
// [[], []]
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Solusi |
|--------|-------------------|
| Array pre-defined `[[], []]` | Wadah tetap dengan posisi index yang sudah ditentukan |
| Iterasi (loop) | Menelusuri setiap karakter |
| Destructuring | Mengambil `name` dan `type` dari setiap objek |
| Ternary operator | Menentukan index tujuan (0 atau 1) |
| `push()` | Menambahkan nama ke dalam array yang sesuai |

---

## 🔄 Implementasi

```javascript
const meleeRangedGrouping = (chars) => {         // 1️⃣ Fungsi menerima array of object
  const result = [[], []]                        // 2️⃣ Siapkan wadah: 2 array kosong
                                                 //    index 0 = Ranged, index 1 = Melee

  for (const { name, type } of chars) {          // 3️⃣ Destructuring: ambil name dan type
    const index = type === 'Ranged' ? 0 : 1      // 4️⃣ Tentukan index tujuan
    result[index].push(name)                     // 5️⃣ Masukkan nama ke array yang sesuai
  }

  return result                                  // 6️⃣ Kembalikan array berisi dua kelompok
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const meleeRangedGrouping = (chars)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `const result = [[], []]` | **Inilah kuncinya** — Array dengan dua slot kosong yang sudah disiapkan. Index 0 untuk Ranged, index 1 untuk Melee. Posisi ini **tidak pernah berubah** |
| 3️⃣ | `{ name, type } of chars` | Destructuring mengambil hanya `name` dan `type` dari setiap objek |
| 4️⃣ | `type === 'Ranged' ? 0 : 1` | Ternary operator: jika tipe `Ranged` → index `0`, selain itu → index `1`. Ini memetakan tipe ke posisi index |
| 5️⃣ | `result[index].push(name)` | `push()` menambahkan `name` ke array di posisi `index`. Perhatikan: yang di-push adalah **`name`** saja, bukan seluruh objek |
| 6️⃣ | `return result` | Kembalikan array berisi dua kelompok yang sudah terisi |

**Hasil:**
```javascript
console.log(meleeRangedGrouping(characters))
// [ ['Ashe', 'Jinx', 'Caitlyn'], ['Garen', 'Darius', 'Yasuo'] ]

console.log(meleeRangedGrouping([]))
// [ [], [] ]
```

---

## 🧪 Visualisasi

**Data:** `characters` (6 objek)

| Langkah | Karakter | `type` | Index | Aksi | State `result` |
|---------|----------|--------|-------|------|----------------|
| init | — | — | — | Buat `[[], []]` | `[[], []]` |
| 1 | `Ashe` | `Ranged` | `0` | push ke `result[0]` | `[['Ashe'], []]` |
| 2 | `Garen` | `Melee` | `1` | push ke `result[1]` | `[['Ashe'], ['Garen']]` |
| 3 | `Jinx` | `Ranged` | `0` | push ke `result[0]` | `[['Ashe', 'Jinx'], ['Garen']]` |
| 4 | `Darius` | `Melee` | `1` | push ke `result[1]` | `[['Ashe', 'Jinx'], ['Garen', 'Darius']]` |
| 5 | `Caitlyn` | `Ranged` | `0` | push ke `result[0]` | `[['Ashe', 'Jinx', 'Caitlyn'], ['Garen', 'Darius']]` |
| 6 | `Yasuo` | `Melee` | `1` | push ke `result[1]` | `[['Ashe', 'Jinx', 'Caitlyn'], ['Garen', 'Darius', 'Yasuo']]` |

**Hasil akhir:**
```javascript
[
  ['Ashe', 'Jinx', 'Caitlyn'],     // index 0 → Ranged ✅
  ['Garen', 'Darius', 'Yasuo']     // index 1 → Melee ✅
]
```

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan if/else Eksplisit

```javascript
const meleeRangedGrouping = (chars) => {         // 1️⃣ Fungsi menerima array of object
  const result = [[], []]                        // 2️⃣ Wadah tetap: [Ranged, Melee]

  for (const { name, type } of chars) {          // 3️⃣ Telusuri setiap karakter
    if (type === 'Ranged') {                     // 4️⃣ Jika tipe Ranged...
      result[0].push(name)                       //    → masukkan ke index 0
    } else {                                     // 5️⃣ Jika bukan Ranged (= Melee)...
      result[1].push(name)                       //    → masukkan ke index 1
    }
  }

  return result                                  // 6️⃣ Kembalikan hasil
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const meleeRangedGrouping = (chars)` | Fungsi menerima array of object |
| 2️⃣ | `const result = [[], []]` | Wadah yang sama — dua slot tetap |
| 3️⃣ | `{ name, type } of chars` | Destructuring untuk ambil `name` dan `type` |
| 4️⃣ | `if (type === 'Ranged')` | Pengecekan eksplisit — lebih mudah dibaca untuk pemula |
| 5️⃣ | `else` | Semua yang bukan Ranged dianggap Melee |
| 6️⃣ | `return result` | Kembalikan array berisi dua kelompok |

> **Kapan pakai ini?**
> Ketika kamu ingin kode yang lebih **verbose** dan mudah dibaca. Cocok untuk tahap belajar karena alur logikanya sangat jelas.

---

### Versi 3 — Menggunakan `.reduce()`

```javascript
const meleeRangedGrouping = (chars) => {
  return chars.reduce((result, { name, type }) => {  // 1️⃣ reduce + destructuring parameter
    const index = type === 'Ranged' ? 0 : 1          // 2️⃣ Tentukan index
    result[index].push(name)                         // 3️⃣ Masukkan nama
    return result                                    // 4️⃣ Kembalikan akumulator
  }, [[], []])                                       // 5️⃣ Nilai awal: [[], []]
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `chars.reduce((result, { name, type }) => {` | `.reduce()` dengan destructuring langsung di parameter callback |
| 2️⃣ | `const index = type === 'Ranged' ? 0 : 1` | Ternary menentukan posisi index |
| 3️⃣ | `result[index].push(name)` | Push nama ke array yang sesuai |
| 4️⃣ | `return result` | Wajib dikembalikan agar akumulator terus terbawa |
| 5️⃣ | `}, [[], []])` | Nilai awal `[[], []]` — inilah yang membedakan dari reduce pada Object grouping yang menggunakan `{}` |

**Visualisasi — fokus: akumulator `result` yang terus terbawa**

Data: `characters` (3 elemen pertama)

| Iterasi | `{ name, type }` | `index` | `result` masuk | `result` keluar |
|---------|-------------------|---------|----------------|-----------------|
| 1 | `{ Ashe, Ranged }` | `0` | `[[], []]` | `[['Ashe'], []]` |
| 2 | `{ Garen, Melee }` | `1` | `[['Ashe'], []]` | `[['Ashe'], ['Garen']]` |
| 3 | `{ Jinx, Ranged }` | `0` | `[['Ashe'], ['Garen']]` | `[['Ashe', 'Jinx'], ['Garen']]` |

> **Kapan pakai ini?**
> Gaya fungsional yang ringkas. Semua logika grouping terangkum dalam satu ekspresi `.reduce()`.

---

## ⚠️ Jebakan Umum

### ❌ 1. Menggunakan Object padahal output harus Array

```javascript
const result = { ranged: [], melee: [] }  // ❌ Output jadi Object, bukan Array
```

**Masalah:** Soal meminta output berupa `[[], []]` (Array), bukan `{ ranged: [], melee: [] }` (Object). Meskipun logikanya benar, format output **salah**.

✅ **Solusi:** Gunakan Array pre-defined:
```javascript
const result = [[], []]
```

---

### ❌ 2. Index terbalik — Melee di index 0, Ranged di index 1

```javascript
const index = type === 'Melee' ? 0 : 1  // ❌ Melee jadi di index 0
```

**Masalah:** Soal mewajibkan Ranged di index 0, Melee di index 1. Jika terbalik, semua data tertukar posisinya.

✅ **Solusi:** Selalu cek aturan soal dan petakan dengan benar:
```javascript
const index = type === 'Ranged' ? 0 : 1  // ✅ Ranged → 0, Melee → 1
```

---

### ❌ 3. Push seluruh objek, bukan hanya `name`

```javascript
result[index].push({ name, type })  // ❌ Soal hanya minta nama
```

**Masalah:** Soal meminta array berisi **nama** saja, bukan array berisi objek.

✅ **Solusi:** Push hanya `name`:
```javascript
result[index].push(name)  // ✅ Hanya nama yang masuk
```

---

### ❌ 4. Lupa inisialisasi — langsung push ke index

```javascript
const result = []
result[0].push(name)  // ❌ Cannot read properties of undefined
```

**Masalah:** `result[0]` belum ada — harus diinisialisasi dulu sebagai array kosong.

✅ **Solusi:** Inisialisasi langsung:
```javascript
const result = [[], []]  // ✅ Kedua index sudah siap
```

---

## 💡 Insight

> ### 🗡️ Dynamic vs Fixed Grouping
>
> Grouping punya **dua senjata berbeda** — pilih berdasarkan kebutuhan soal:

| | Dynamic Grouping (Object) | Fixed Grouping (Array) |
|--|---------------------------|------------------------|
| **Wadah** | `const result = {}` | `const result = [[], []]` |
| **Kategori** | Fleksibel, terbentuk saat iterasi | Sudah ditentukan, posisi mutlak |
| **Akses** | `result[key]` (key = string) | `result[index]` (index = angka) |
| **Output** | `{ ranged: [...], melee: [...] }` | `[['...'], ['...']]` |
| **Kapan pakai** | Kategori tidak terbatas / tidak diketahui di awal | Soal meminta posisi index spesifik |

**Analogi:**
- **Dynamic Grouping** = Lemari dengan laci bertulisan nama → kamu bisa buat laci baru kapan saja
- **Fixed Grouping** = Rak sepatu dengan slot nomor → slot 0 dan slot 1 sudah ditentukan posisinya

> 📌 **Lihat juga:** Untuk memahami Dynamic Grouping (Object), baca [basic-grouping.md](../02-grouping_pengelompokan/basic-grouping.md)

---

## 📝 Pelajaran yang Didapat

- ✅ Tidak semua grouping menggunakan Object — ada kalanya **Array pre-defined** lebih tepat
- ✅ Kapan pakai Object (`{}`) vs Array (`[[], []]`) untuk grouping
- ✅ Posisi index yang **mutlak** = sinyal untuk menggunakan Fixed Grouping
- ✅ Pentingnya membaca **format output** soal dengan teliti sebelum coding
- ✅ Ternary operator sangat cocok untuk memetakan kategori ke index numerik
- ✅ Grouping punya dua senjata: 🪄 Object (fleksibel) dan 🗡️ Array (posisi tetap)

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Ternary Index

**Langkah 1** — Deklarasikan fungsi:
```javascript
const meleeRangedGrouping = (chars) => {

}
```
> Fungsi menerima satu parameter `chars` berupa array of object.

---

**Langkah 2** — Siapkan wadah dengan dua slot tetap:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]
}
```
> `[[], []]` membuat dua array kosong di posisi index 0 dan index 1. Ini **bukan** Object — ini Array berisi Array. Index 0 = Ranged, Index 1 = Melee.

---

**Langkah 3** — Buka loop dengan destructuring:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {

  }
}
```
> Destructuring mengambil `name` dan `type` dari setiap objek karakter.

---

**Langkah 4** — Tentukan index tujuan:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {
    const index = type === 'Ranged' ? 0 : 1
  }
}
```
> Ternary operator memetakan string `type` menjadi angka `index`. Ini adalah **jembatan** antara data (string) dan posisi (angka).

---

**Langkah 5** — Masukkan nama ke array yang sesuai:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {
    const index = type === 'Ranged' ? 0 : 1
    result[index].push(name)
  }
}
```
> `result[index]` mengakses array di posisi yang benar, lalu `push(name)` menambahkan nama ke dalamnya.

---

**Langkah 6** — Kembalikan hasil:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {
    const index = type === 'Ranged' ? 0 : 1
    result[index].push(name)
  }

  return result
}
```
> Fungsi selesai. `return result` mengembalikan array berisi dua kelompok yang sudah terisi.

**Hasil:**
```javascript
console.log(meleeRangedGrouping(characters))
// [ ['Ashe', 'Jinx', 'Caitlyn'], ['Garen', 'Darius', 'Yasuo'] ]

console.log(meleeRangedGrouping([]))
// [ [], [] ]
```

---

### Versi 2 — if/else Eksplisit

**Langkah 1** — Deklarasikan fungsi:
```javascript
const meleeRangedGrouping = (chars) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Siapkan wadah tetap:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]
}
```
> Wadah yang sama — dua slot tetap dengan posisi yang sudah ditentukan.

---

**Langkah 3** — Buka loop dan cek tipe:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {
    if (type === 'Ranged') {
      result[0].push(name)
    }
  }
}
```
> Jika tipe `Ranged`, masukkan nama ke index 0. Logikanya eksplisit — mudah dibaca.

---

**Langkah 4** — Tambahkan else untuk Melee:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {
    if (type === 'Ranged') {
      result[0].push(name)
    } else {
      result[1].push(name)
    }
  }
}
```
> `else` menangkap semua yang bukan Ranged — yaitu Melee. Dua cabang, dua tujuan.

---

**Langkah 5** — Kembalikan hasil:
```javascript
const meleeRangedGrouping = (chars) => {
  const result = [[], []]

  for (const { name, type } of chars) {
    if (type === 'Ranged') {
      result[0].push(name)
    } else {
      result[1].push(name)
    }
  }

  return result
}
```
> Fungsi selesai. Versi ini lebih panjang tapi lebih jelas untuk dipahami pemula.

**Hasil:**
```javascript
console.log(meleeRangedGrouping(characters))
// [ ['Ashe', 'Jinx', 'Caitlyn'], ['Garen', 'Darius', 'Yasuo'] ]

console.log(meleeRangedGrouping([]))
// [ [], [] ]
```
