# 🌿 Botanical Glasshouse Rearrangement

![Level](https://img.shields.io/badge/Level-Easy-brightgreen?style=for-the-badge)
![Topik](https://img.shields.io/badge/Topik-Array%202D-blue?style=for-the-badge)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Coddy.tech-orange?style=for-the-badge)

> Simulasi penataan ulang tanaman dalam rumah kaca menggunakan serangkaian operasi pada array 2D.

---

## 📑 Daftar Isi

- 📖 [Deskripsi Challenge](#deskripsi-challenge)
- 📥 [Contoh Input & Output](#contoh-input-output)
- 🧠 [Pemahaman Soal](#pemahaman-soal)
- 🔬 [Visualisasi Step-by-Step](#visualisasi-step-by-step)
- 🏗️ [Algoritma](#algoritma)
- 💻 [Kode Final](#kode-final)
- ⚖️ [Perbandingan Solusi](#perbandingan-solusi)
- 📚 [Keywords](#keywords)
- ⚠️ [Pitfalls](#pitfalls)
- 📊 [Kompleksitas](#kompleksitas)
- ❓ [FAQ](#faq)

---

<a name="deskripsi-challenge"></a>
## 📖 Deskripsi Challenge

Buat fungsi `rearrangePlants(plants, operations)` yang mensimulasikan penataan ulang tanaman di sebuah rumah kaca.

Fungsi menerima:
- `plants` — array 2D berisi nama-nama tanaman (string)
- `operations` — jumlah kali operasi diulang

Setiap operasi terdiri dari **3 langkah berurutan**:

| Langkah | Operasi |
|--------|---------|
| 1️⃣ | Balik urutan tanaman di setiap baris |
| 2️⃣ | Tambahkan representasi binary dari panjang nama ke nama tanaman |
| 3️⃣ | Rotasi seluruh array 90° searah jarum jam |

---

<a name="contoh-input-output"></a>
## 📥 Contoh Input & Output

```js
// Input
plants = [["Rose", "Lily"], ["Fern", "Oak"]]
operations = 1

// Output
[["Oak11", "Lily100"], ["Fern100", "Rose100"]]
```

```js
// Input - 0 operasi, tidak ada perubahan
plants = [["Rose", "Lily"], ["Fern", "Oak"]]
operations = 0

// Output
[["Rose", "Lily"], ["Fern", "Oak"]]
```

---

<a name="pemahaman-soal"></a>
## 🧠 Pemahaman Soal

Bayangkan kamu punya rak tanaman berbentuk grid:

```
[ Rose ][ Lily ]
[ Fern ][ Oak  ]
```

Kamu diminta melakukan 3 hal secara berurutan, diulang sebanyak `operations` kali.

### Langkah 1 — Reverse tiap baris

Setiap baris dibalik urutannya. Baris pertama `["Rose", "Lily"]` menjadi `["Lily", "Rose"]`.

### Langkah 2 — Append binary dari panjang nama

Setiap nama tanaman ditambahkan representasi binary dari panjangnya di belakang.

Cara mendapatkan binary di JavaScript:

```js
// number.toString(2) → mengubah angka ke string binary
(4).toString(2)  // "100"
(3).toString(2)  // "11"
(7).toString(2)  // "111"
```

Contoh hasilnya:
```
"Rose"  → panjang 4 → binary "100"  → "Rose100"
"Lily"  → panjang 4 → binary "100"  → "Lily100"
"Oak"   → panjang 3 → binary "11"   → "Oak11"
"Fern"  → panjang 4 → binary "100"  → "Fern100"
```

### Langkah 3 — Rotasi 90° clockwise

Seluruh grid diputar 90° searah jarum jam. Ini bagian yang paling tricky — penjelasan lengkapnya ada di bagian visualisasi. 👇

---

<a name="visualisasi-step-by-step"></a>
## 🔬 Visualisasi Step-by-Step

Mari kita trace dengan `operations = 1`:

```
🌱 AWAL:
┌──────────┬──────────┐
│   Rose   │   Lily   │
├──────────┼──────────┤
│   Fern   │   Oak    │
└──────────┴──────────┘

─────────────────────────────────────────
⏩ LANGKAH 1 — Reverse tiap baris:
┌──────────┬──────────┐
│   Lily   │   Rose   │  ← baris 0 dibalik
├──────────┼──────────┤
│   Oak    │   Fern   │  ← baris 1 dibalik
└──────────┴──────────┘

─────────────────────────────────────────
⏩ LANGKAH 2 — Append binary:
┌────────────┬────────────┐
│  Lily100   │  Rose100   │  Lily(4)→100, Rose(4)→100
├────────────┼────────────┤
│   Oak11    │  Fern100   │  Oak(3)→11,  Fern(4)→100
└────────────┴────────────┘

─────────────────────────────────────────
⏩ LANGKAH 3 — Rotasi 90° clockwise:

Kolom 0 dari atas ke bawah:  ["Lily100", "Oak11"]
  → dibalik:                 ["Oak11", "Lily100"]   ← baris baru 0

Kolom 1 dari atas ke bawah:  ["Rose100", "Fern100"]
  → dibalik:                 ["Fern100", "Rose100"] ← baris baru 1

┌──────────┬────────────┐
│  Oak11   │  Lily100   │
├──────────┼────────────┤
│ Fern100  │  Rose100   │
└──────────┴────────────┘

✅ HASIL AKHIR:
[["Oak11", "Lily100"], ["Fern100", "Rose100"]]
```

### 🔄 Cara Kerja Rotasi 90° Clockwise

Pola yang perlu diingat:

```
Sebelum:        Sesudah (90° clockwise):
A  B            C  A
C  D    →       D  B

Kolom kiri  [A, C] → dibalik → [C, A] = baris atas baru
Kolom kanan [B, D] → dibalik → [D, B] = baris bawah baru
```

Rumusnya: **kolom ke-i dari kiri, diambil dari atas ke bawah, lalu dibalik = baris ke-i baru**.

---

<a name="algoritma"></a>
## 🏗️ Algoritma

```
📌 GUARD CLAUSE
   Jika plants kosong → kembalikan []

🔁 LOOP sebanyak operations kali:

   1️⃣  REVERSE BARIS
       Untuk setiap baris, balik urutannya

   2️⃣  APPEND BINARY
       Untuk setiap tanaman:
         → hitung panjang nama
         → ubah ke binary dengan .toString(2)
         → gabungkan: nama + binary

   3️⃣  ROTASI 90° CLOCKWISE
       Buat array baru sebanyak jumlah kolom
       Setiap elemen baru = kolom ke-i diambil dari semua baris, lalu dibalik

📤 RETURN result
```

---

<a name="kode-final"></a>
## 💻 Kode Final

### Fungsi bantu: `rotate`

Fungsi ini mengambil array 2D dan merotasinya 90° searah jarum jam.

```js
const rotate = (arr) => {
  // Array.from membuat array baru sebanyak jumlah kolom
  return Array.from({ length: arr[0].length }, (_, colIndex) => {
    // Ambil semua elemen di kolom ke-colIndex dari setiap baris
    // lalu balik urutannya
    return arr.map((row) => row[colIndex]).reverse()
  })
}
```

**Kenapa `arr[0].length`?**
Karena jumlah kolom = panjang baris pertama. Kita butuh ini untuk tahu berapa baris baru yang akan dibuat.

---

### Fungsi utama: `rearrangePlants`

```js
const rearrangePlants = (plants, operations) => {
  // Guard clause: langsung kembalikan [] jika array kosong
  if (plants.length === 0) return []

  let result = plants  // wadah yang akan diupdate tiap iterasi

  for (let i = 0; i < operations; i++) {

    // Langkah 1: Reverse tiap baris
    result = result.map((row) => row.reverse())

    // Langkah 2: Append binary dari panjang nama
    result = result.map((row) => {
      return row.map((plant) => {
        const length = plant.length
        const stringBinary = length.toString(2)
        return `${plant}${stringBinary}`
      })
    })

    // Langkah 3: Rotasi 90° clockwise
    result = rotate(result)
  }

  return result
}
```

**Kenapa `let result = plants`?**
Karena `result` perlu diupdate di setiap iterasi. Hasil iterasi ke-1 menjadi input iterasi ke-2, dan seterusnya.

---

### Test Cases

```js
const testCases = [
  {
    input: { plants: [['Rose', 'Lily'], ['Fern', 'Oak']], steps: 1 },
    expected: [["Oak11","Lily100"],["Fern100","Rose100"]],
    desc: "1 operasi"
  },
  {
    input: { plants: [['Rose', 'Lily'], ['Fern', 'Oak']], steps: 0 },
    expected: [["Rose","Lily"],["Fern","Oak"]],
    desc: "0 operasi (tidak ada perubahan)"
  },
  {
    input: { plants: [['Rose', 'Lily'], ['Fern', 'Oak']], steps: 2 },
    expected: [["Rose100111","Lily100111"],["Fern100111","Oak11101"]],
    desc: "2 operasi"
  },
  {
    input: { plants: [['Rose']], steps: 1 },
    expected: [["Rose100"]],
    desc: "Array hanya 1 elemen"
  },
  {
    input: { plants: [], steps: 1 },
    expected: [],
    desc: "Array kosong"
  },
  {
    input: { plants: [['Rose', 'Lily']], steps: 5 },
    expected: [["Lily1001111010111010010"],["Rose1001111010111010010"]],
    desc: "5 operasi"
  }
]

testCases.forEach(({ input, expected, desc }, index) => {
  const result = rearrangePlants(input.plants, input.steps)
  const status =
    JSON.stringify(result) === JSON.stringify(expected)
      ? '✅ PASS'
      : '❌ FAIL'

  console.log(`Test Case #${index + 1}: ${status} - ${desc}`)

  if (status === '❌ FAIL') {
    console.log('Input   :', input)
    console.log('Expected:', expected)
    console.log('Result  :', result)
  }
})
```

---

<a name="perbandingan-solusi"></a>
## ⚖️ Perbandingan Solusi

Ada dua perbedaan antara solusi saya dan solusi resmi dari Coddy.

### Perbedaan 1 — `padStart` vs tanpa `padStart`

**Solusi Coddy** menggunakan `.padStart(3, '0')`:
```js
plant + plant.length.toString(2).padStart(3, '0')
// "Oak" → panjang 3 → "11" → padStart → "011" → "Oak011"
```

**Solusi saya** tanpa `padStart`:
```js
`${plant}${length.toString(2)}`
// "Oak" → panjang 3 → "11" → "Oak11"
```

`padStart(3, '0')` memastikan binary selalu minimal 3 digit dengan padding `0` di depan jika kurang. Kedua versi diterima oleh platform — artinya soal tidak mewajibkan padding.

### Perbedaan 2 — Fungsi terpisah vs inline

**Solusi Coddy** menulis rotasi secara inline:
```js
plants = plants[0].map((_, colIndex) =>
  plants.map(row => row[colIndex]).reverse()
)
```

**Solusi saya** memisahkan rotasi ke fungsi `rotate`:
```js
const rotate = (arr) => {
  return Array.from({ length: arr[0].length }, (_, colIndex) => {
    return arr.map((row) => row[colIndex]).reverse()
  })
}
```

Keduanya menghasilkan output yang sama. Versi dengan fungsi terpisah lebih mudah dibaca dan di-debug, terutama saat baru belajar.

---

<a name="keywords"></a>
## 📚 Keywords

| Istilah | Penjelasan |
|--------|-----------|
| `Array 2D` | Array yang berisi array lain — seperti tabel baris dan kolom |
| `.map()` | Iterasi array dan menghasilkan array baru hasil transformasi |
| `.reverse()` | Membalik urutan elemen array (mengubah array asli / **mutasi**) |
| `.toString(2)` | Mengubah angka ke representasi string dalam basis tertentu — `2` berarti binary |
| `Array.from()` | Membuat array baru dari suatu panjang atau iterable |
| `padStart(n, '0')` | Menambah karakter `'0'` di depan string hingga panjangnya mencapai `n` |
| `Guard clause` | Pengecekan kondisi di awal fungsi untuk menghindari error atau logika yang tidak perlu |
| `Rotate 90° clockwise` | Memutar grid sehingga kolom kiri menjadi baris atas |
| `colIndex` | Indeks kolom yang sedang diproses saat rotasi |
| `Template literal` | Sintaks `` `${variable}` `` untuk menggabungkan string dan ekspresi |

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

> 💡 **Catatan pribadi:** Ini adalah kesalahan-kesalahan yang saya sendiri buat saat mengerjakan challenge ini. Dicatat agar tidak terulang lagi.

---

### 🪲 Pitfall #1 — Salah fungsi untuk konversi binary

**Situasi:** Saat diminta mengubah angka ke binary, saya menyebut `parseInt`.

```js
// ❌ Salah — parseInt justru kebalikannya: mengubah STRING ke NUMBER
parseInt("100", 2)  // → 4  (binary "100" dibaca sebagai angka 4)
```

```js
// ✅ Benar — toString(2) mengubah NUMBER ke STRING binary
(4).toString(2)  // → "100"
"Rose".length.toString(2)  // → "100"
```

> `parseInt` = string → number. `toString(2)` = number → string binary. Keduanya berlawanan arah!

---

### 🪲 Pitfall #2 — Map dengan dua parameter langsung ke array 2D

**Situasi:** Saya mencoba mengambil elemen dengan `plant[index]` di dalam `row.map`, padahal `plant` itu sudah berupa string, bukan array.

```js
// ❌ Salah — plant adalah string, plant[index] mengambil karakter dari string
row.map((plant, index) => {
  console.log(plant[index])  // mengambil huruf ke-index, bukan elemen array lain
})
```

```js
// ✅ Benar — untuk array 2D, perlu dua map bertingkat
plants.map((row) => {
  return row.map((plant) => {
    // di sini baru bisa akses satu nama tanaman
  })
})
```

---

### 🪲 Pitfall #3 — Mengambil diagonal saat rotasi

**Situasi:** Saya menulis `plants.map((row, index) => row[index])` dengan niat mengambil kolom, tapi yang diambil justru diagonal.

```js
// ❌ Salah — ini mengambil diagonal, bukan kolom
// baris 0 → row[0] = "A", baris 1 → row[1] = "D"
plants.map((row, index) => row[index])
```

```js
// ✅ Benar — gunakan colIndex yang tetap untuk semua baris
plants.map((row) => row[colIndex])
// baris 0 → row[0] = "A", baris 1 → row[0] = "C" → kolom pertama ["A", "C"]
```

> Kunci perbedaannya: `index` berubah seiring iterasi baris, sedangkan `colIndex` harus **tetap** untuk mengambil satu kolom penuh.

---

### 🪲 Pitfall #4 — Mengambil seluruh baris saat rotasi

**Situasi:** Setelah paham harus pakai `colIndex`, saya masih salah menulis `arr[colIndex]` yang mengambil seluruh baris, bukan satu elemen kolom.

```js
// ❌ Salah — arr[colIndex] mengambil seluruh baris ke-colIndex
Array.from({ length: arr[0].length }, (_, colIndex) => {
  return arr[colIndex]  // ini baris, bukan kolom!
})
```

```js
// ✅ Benar — gunakan map untuk ambil elemen kolom dari setiap baris
Array.from({ length: arr[0].length }, (_, colIndex) => {
  return arr.map((row) => row[colIndex]).reverse()
})
```

---

### 🪲 Pitfall #5 — `colIndex` dipakai sebelum tersedia

**Situasi:** Saya menulis `arr[colIndex].length` di luar callback `Array.from`, padahal `colIndex` baru ada di dalam callback.

```js
// ❌ Salah — colIndex belum tersedia di sini
Array.from({ length: arr[colIndex].length }, (_, colIndex) => { ... })
//                        ^^^^^^^^ ReferenceError!
```

```js
// ✅ Benar — gunakan arr[0].length untuk jumlah kolom
Array.from({ length: arr[0].length }, (_, colIndex) => { ... })
```

---

### 🪲 Pitfall #6 — Menggunakan `plants` bukan `result` di dalam loop

**Situasi:** Di dalam loop saya menulis `plants.map(...)` alih-alih `result.map(...)`, sehingga setiap iterasi selalu mulai dari array awal.

```js
// ❌ Salah — selalu mulai dari array awal, iterasi tidak berantai
for (let i = 0; i < operations; i++) {
  result = plants.map((row) => row.reverse())  // plants tidak pernah berubah!
}
```

```js
// ✅ Benar — pakai result agar setiap iterasi melanjutkan dari hasil sebelumnya
for (let i = 0; i < operations; i++) {
  result = result.map((row) => row.reverse())
}
```

---

### 🪲 Pitfall #7 — Tidak handle array kosong

**Situasi:** Fungsi `rotate` akan error jika dipanggil dengan array kosong karena `arr[0]` bernilai `undefined`.

```js
// ❌ Error saat plants = []
const rotate = (arr) => {
  return Array.from({ length: arr[0].length }, ...)
  //                          ^^^^ TypeError: Cannot read properties of undefined
}
```

```js
// ✅ Benar — tambahkan guard clause di rearrangePlants
if (plants.length === 0) return []
```

---

<a name="kompleksitas"></a>
## 📊 Kompleksitas

Misalkan `r` = jumlah baris, `c` = jumlah kolom, `k` = operations.

| | Kompleksitas | Penjelasan |
|--|-------------|-----------|
| **Time** | `O(k × r × c)` | Setiap operasi memproses semua elemen di grid |
| **Space** | `O(r × c)` | Menyimpan satu grid baru di setiap langkah transformasi |

---

<a name="faq"></a>
## ❓ FAQ

<details>
<summary>🤔 Kenapa perlu fungsi <code>rotate</code> terpisah?</summary>

Sebetulnya tidak wajib — kamu bisa tulis inline seperti solusi Coddy. Tapi memisahkannya ke fungsi sendiri punya keuntungan:
- Lebih mudah dibaca
- Lebih mudah di-debug
- Bisa dipakai ulang kalau ada challenge lain yang butuh rotasi

</details>

<details>
<summary>🤔 Apa bedanya <code>Array.from({ length: n })</code> dengan loop biasa?</summary>

Keduanya bisa dipakai. `Array.from` lebih ringkas dan langsung menghasilkan array baru. Loop biasa lebih eksplisit. Contoh ekuivalennya:

```js
// Dengan Array.from
Array.from({ length: 3 }, (_, i) => i * 2)  // [0, 2, 4]

// Dengan loop biasa
const result = []
for (let i = 0; i < 3; i++) {
  result.push(i * 2)
}
// [0, 2, 4]
```

</details>

<details>
<summary>🤔 Kenapa <code>.reverse()</code> bisa mengubah array asli?</summary>

Karena `.reverse()` bersifat **mutasi** — ia mengubah array yang dipanggil langsung, bukan membuat salinan baru. Dalam konteks challenge ini tidak masalah karena kita selalu assign ulang ke `result`. Tapi kalau kamu perlu array asli tetap utuh, gunakan `.slice().reverse()` atau `[...arr].reverse()`.

</details>

<details>
<summary>🤔 Kenapa nama tanaman makin panjang di setiap operasi?</summary>

Karena di setiap operasi, binary dari panjang nama **selalu ditambahkan** ke nama yang sudah ada, bukan menggantikannya. Jadi:
```
Operasi 1: "Rose" → "Rose100"      (panjang 4 → "100")
Operasi 2: "Rose100" → "Rose100111" (panjang 7 → "111")
```

</details>

<details>
<summary>🤔 Apakah urutan 3 langkah operasi bisa ditukar?</summary>

Tidak. Soal secara eksplisit menyatakan ketiga langkah harus dilakukan **secara berurutan**: reverse dulu, lalu append binary, lalu rotate. Mengubah urutannya akan menghasilkan output yang berbeda.

</details>
