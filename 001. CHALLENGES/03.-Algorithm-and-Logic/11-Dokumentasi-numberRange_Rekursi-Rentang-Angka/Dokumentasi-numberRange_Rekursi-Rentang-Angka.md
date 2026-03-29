# 📐 numberRange — Rekursi Rentang Angka

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Topik](https://img.shields.io/badge/Topik-Rekursi-blueviolet?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Pemula-green?style=for-the-badge)

> Dokumentasi pribadi — challenge membuat rentang angka menggunakan rekursi.

---

## 📋 Daftar Isi

- 📌 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Konsep Rekursi](#konsep-rekursi)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 🧪 [Test Cases](#test-cases)
- ✅ [Solusi 1 — concat, Maju](#solusi-1)
- 🔄 [Solusi 2 — concat, Mundur](#solusi-2)
- ✨ [Solusi 3 — Spread Operator](#solusi-3)
- 📊 [Perbandingan Ketiga Solusi](#perbandingan)
- 🔁 [Rekursi vs For Loop](#rekursi-vs-for-loop)
- 🛡️ [Edge Cases](#edge-cases)
- ⚠️ [Pitfalls — Kesalahan Umum](#pitfalls)
- 📖 [Keywords](#keywords)
- ❓ [FAQ](#faq)
- 💡 [Insight](#insight)

---

<a name="deskripsi-challenge"></a>
## 📌 Deskripsi Challenge

Buatlah fungsi `numberRange` yang menerima `startNum` dan `endNum`, lalu mengembalikan array berisi semua angka dari `startNum` sampai `endNum` secara inklusif. Wajib menggunakan **rekursi**.

### 🔖 Function Signature

```typescript
function numberRange(startNum: number, endNum: number): number[];
```

### 🧪 Contoh Input & Output

| Input | Output |
|---|---|
| `numberRange(1, 5)` | `[1, 2, 3, 4, 5]` |
| `numberRange(3, 10)` | `[3, 4, 5, 6, 7, 8, 9, 10]` |
| `numberRange(7, 7)` | `[7]` |

---

<a name="konsep-rekursi"></a>
## 🧠 Konsep Rekursi

Sebelum lihat solusinya, penting banget paham dua bagian utama rekursi:

| Bagian | Penjelasan | Contoh di challenge ini |
|---|---|---|
| **Base Case** | Kondisi berhenti — kapan fungsi TIDAK memanggil dirinya lagi | `start === end` → return `[start]` |
| **Recursive Case** | Langkah yang terus berjalan sambil memanggil dirinya sendiri | `[start].concat(numberRange(start + 1, end))` |

> 💬 Bayangin rekursi seperti boneka matryoshka — setiap boneka membuka boneka yang lebih kecil di dalamnya, sampai boneka terkecil tidak bisa dibuka lagi. Itulah base case.

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke `numberRange`:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | `start` yang di-pass ke fungsi |
| ➡️ Bergerak ke mana? | Ke atas — `start + 1` setiap langkah |
| 🛑 Berhenti kapan? | Saat `start === end` (base case sudah tercapai) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:

- **Mulai dari `start`** → parameter fungsi kita adalah `start` dan `end`
- **Bergerak ke `start + 1`** → recursive call-nya adalah `numberRange(start + 1, end)`
- **Berhenti saat `start === end`** → base case-nya adalah `if (start === end) return [start]`

---

<a name="test-cases"></a>
## 🧪 Test Cases

Berikut test case yang bisa dicopy-paste langsung ke console atau editor untuk mencoba masing-masing solusi.

---

**Test Case 1 — Rentang normal dari 1**

```javascript
console.log(numberRange(1, 5));
// Expected output: [1, 2, 3, 4, 5]
```

---

**Test Case 2 — Rentang normal dari tengah**

```javascript
console.log(numberRange(3, 10));
// Expected output: [3, 4, 5, 6, 7, 8, 9, 10]
```

---

**Test Case 3 — Start sama dengan end (satu angka)**

```javascript
console.log(numberRange(7, 7));
// Expected output: [7]
```

---

**Test Case 4 — Start lebih besar dari end (edge case)**

```javascript
console.log(numberRange(5, 1));
// Expected output: [] (hanya jika menggunakan guard clause)
// Tanpa guard clause → Maximum call stack size exceeded ⚠️
```

---

<a name="solusi-1"></a>
## ✅ Solusi 1 — `concat`, Maju (start → end)

Membangun array dari depan ke belakang. Ambil `start` duluan, lalu sambung dengan hasil rekursi berikutnya.

```javascript
const numberRange = (start, end) => {
  // Base case: kalau start dan end sama, tidak perlu rekursi lagi
  if (start === end) return [start];

  // Recursive case: ambil start, sambung dengan hasil rekursi berikutnya
  return [start].concat(numberRange(start + 1, end));
};
```

### 🔍 Visualisasi `numberRange(1, 3)`

```
numberRange(1, 3)
└── [1].concat(numberRange(2, 3))
        └── [2].concat(numberRange(3, 3))
                └── [3]  ← base case
            [2].concat([3]) → [2, 3]
    [1].concat([2, 3]) → [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

---

<a name="solusi-2"></a>
## 🔄 Solusi 2 — `concat`, Mundur (end → start)

Kebalikan dari solusi 1 — kali ini kita kurangi `end` di setiap langkah, lalu tempel `end` di belakang hasil rekursi.

```javascript
const numberRange = (start, end) => {
  // Base case: kalau start dan end sama, kembalikan [end]
  if (start === end) return [end];

  // Recursive case: rekursi dulu, baru tempel end di belakang
  return numberRange(start, end - 1).concat(end);
};
```

### 🔍 Visualisasi `numberRange(1, 3)`

```
numberRange(1, 3)
└── numberRange(1, 2).concat(3)
        └── numberRange(1, 1).concat(2)
                └── [1]  ← base case
            [1].concat(2) → [1, 2]
    [1, 2].concat(3) → [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

> ⚠️ Hati-hati: kalau posisi `[end]` ditaruh di depan (bukan di belakang), hasilnya akan terbalik jadi `[3, 2, 1]`!

---

<a name="solusi-3"></a>
## ✨ Solusi 3 — Spread Operator

Versi paling ringkas dan modern. Logikanya sama seperti Solusi 2, tapi pakai `...` untuk menyebar elemen array.

```javascript
const numberRange = (start, end) => {
  // Base case: kalau start dan end sama, kembalikan [end]
  if (start === end) return [end];

  // Recursive case: spread hasil rekursi, lalu tempel end di belakang
  return [...numberRange(start, end - 1), end];
};
```

### 🔍 Visualisasi `numberRange(1, 3)`

```
numberRange(1, 3)
└── [...numberRange(1, 2), 3]
        └── [...numberRange(1, 1), 2]
                └── [1]  ← base case
            [...[1], 2] → [1, 2]
    [...[1, 2], 3] → [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

---

<a name="perbandingan"></a>
## 📊 Perbandingan Ketiga Solusi

| | Solusi 1 | Solusi 2 | Solusi 3 |
|---|---|---|---|
| **Arah rekursi** | Maju (start → end) | Mundur (end → start) | Mundur (end → start) |
| **Cara gabung** | `[start].concat(...)` | `(...).concat(end)` | `[...(...), end]` |
| **Base case** | `start === end` | `start === end` | `start === end` |
| **Gaya penulisan** | Klasik | Klasik | Modern |
| **Keterbacaan** | ✅ Mudah dipahami | ✅ Mudah dipahami | ✅✅ Paling ringkas |

---

<a name="rekursi-vs-for-loop"></a>
## 🔁 Rekursi vs For Loop

Kamu mungkin bertanya — *"kalau `for` loop lebih mudah, kenapa harus pakai rekursi?"*. Ini perbandingannya:

```javascript
// Versi for loop
const numberRange = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

// Versi rekursi (Solusi 1)
const numberRange = (start, end) => {
  if (start === end) return [start];
  return [start].concat(numberRange(start + 1, end));
};
```

| | For Loop | Rekursi |
|---|---|---|
| **Kemudahan dibaca** | ✅ Lebih mudah | ⚠️ Butuh waktu untuk terbiasa |
| **Performa** | ✅ Lebih efisien | ⚠️ Overhead call stack |
| **Cocok untuk** | Array sederhana | Struktur bercabang (tree, nested) |
| **Risiko** | Tidak ada | Stack overflow jika rentang terlalu besar |

> 💬 Rekursi bukan selalu pilihan terbaik untuk kasus sederhana seperti ini — tapi mempelajarinya di sini adalah latihan yang bagus untuk memahami pola rekursi yang akan sangat berguna di kasus yang lebih kompleks.

---

<a name="edge-cases"></a>
## 🛡️ Edge Cases

Solusi di atas bekerja dengan baik untuk input normal. Tapi bagaimana kalau inputnya tidak terduga?

### 1. `start === end` (rentang satu angka)

```javascript
numberRange(7, 7); // → [7] ✅
```
Sudah ditangani oleh base case.

---

### 2. `start > end` (start lebih besar dari end)

```javascript
numberRange(5, 1); // → ???
```

❌ **Masalah** — fungsi saat ini akan terus memanggil dirinya selamanya karena `start` tidak pernah sama dengan `end`, menyebabkan **stack overflow**!

✅ **Solusi** — tambahkan pengecekan di awal:

```javascript
const numberRange = (start, end) => {
  // Guard clause: kalau start lebih besar dari end, kembalikan array kosong
  if (start > end) return [];
  if (start === end) return [start];
  return [start].concat(numberRange(start + 1, end));
};

numberRange(5, 1); // → []
```

---

### 3. Input bukan angka

```javascript
numberRange("a", "z"); // → perilaku tidak terduga
numberRange(1.5, 3.5); // → [1.5, 2.5, 3.5] (berjalan, tapi mungkin tidak diharapkan)
```

> ⚠️ Challenge ini mengasumsikan input selalu berupa bilangan bulat yang valid. Untuk kode production, sebaiknya tambahkan validasi input.

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls — Kesalahan Umum

### 1. Menggunakan `+` untuk gabungkan array

❌ **Salah** — operator `+` tidak menggabungkan array, malah mengubahnya jadi string:
```javascript
return [start] + numberRange(start + 1, end);
// hasilnya: "12,3,4,5" ← string, bukan array!
```

✅ **Benar** — gunakan `concat` atau spread operator:
```javascript
return [start].concat(numberRange(start + 1, end));
// atau
return [...numberRange(start, end - 1), end];
```

---

### 2. Base case tidak mengembalikan array

❌ **Salah** — `return` tanpa nilai menghasilkan `undefined`:
```javascript
if (start === end) return;
// concat(undefined) akan error!
```

✅ **Benar** — selalu kembalikan array meski hanya satu elemen:
```javascript
if (start === end) return [start];
```

---

### 3. Posisi `[end]` terbalik di Solusi 2

❌ **Salah** — hasilnya terbalik:
```javascript
return [end].concat(numberRange(start, end - 1));
// numberRange(1,3) → [3, 2, 1]
```

✅ **Benar** — tempel `end` di belakang:
```javascript
return numberRange(start, end - 1).concat(end);
// numberRange(1,3) → [1, 2, 3]
```

---

<a name="keywords"></a>
## 📖 Keywords

| Istilah | Penjelasan |
|---|---|
| **Rekursi** | Teknik di mana fungsi memanggil dirinya sendiri |
| **Base Case** | Kondisi berhenti rekursi agar tidak looping selamanya |
| **Recursive Case** | Bagian fungsi yang memanggil dirinya sendiri dengan input yang lebih kecil |
| **`concat()`** | Method array untuk menggabungkan dua array menjadi satu |
| **Spread Operator (`...`)** | Sintaks untuk menyebarkan elemen array ke dalam array baru |
| **Call Stack** | Tumpukan pemanggilan fungsi — setiap rekursi menambah satu lapisan |
| **Inclusive** | Rentang yang menyertakan angka awal dan akhir (misal: 1 sampai 5 termasuk 1 dan 5) |

---

<a name="faq"></a>
## ❓ FAQ

**Q: Kenapa harus pakai rekursi? Bukankah `for` loop lebih mudah?**

Untuk kasus sederhana seperti ini, `for` loop memang lebih efisien. Tapi rekursi adalah pola penting yang wajib dipahami — terutama saat bekerja dengan struktur data bercabang seperti pohon (tree) atau array bersarang (nested array), di mana `for` loop biasa tidak cukup.

---

**Q: Kenapa `concat(end)` bisa bekerja padahal `end` bukan array?**

`concat()` di JavaScript cukup fleksibel — kalau argumennya bukan array, dia akan memperlakukannya sebagai satu elemen dan menambahkannya ke array. Jadi `[1, 2].concat(3)` menghasilkan `[1, 2, 3]`.

---

**Q: Apa itu stack overflow dalam konteks rekursi?**

Setiap kali fungsi memanggil dirinya sendiri, JavaScript menyimpan "catatan" pemanggilan itu di **call stack**. Kalau rekursi tidak pernah mencapai base case (misalnya `start > end` tanpa penanganan), call stack akan terus bertambah sampai penuh dan menyebabkan error `Maximum call stack size exceeded`.

---

**Q: Mana solusi yang paling direkomendasikan untuk dipakai sehari-hari?**

Untuk keterbacaan dan gaya modern, **Solusi 3 (spread operator)** paling direkomendasikan. Tapi untuk pemula yang baru belajar rekursi, **Solusi 1** lebih mudah dipahami karena alurnya mengikuti arah natural (kiri ke kanan).

---

**Q: Apakah ketiga solusi punya performa yang sama?**

Hampir sama untuk rentang kecil. Tapi secara teknis, spread operator (`...`) membuat array baru di setiap langkah rekursi, sehingga bisa sedikit lebih lambat untuk rentang yang sangat besar dibanding `concat`.

---

<a name="insight"></a>
## 💡 Insight

> Rekursi pada dasarnya adalah cara **memecah masalah besar menjadi masalah yang lebih kecil** sampai kita mencapai kasus yang paling sederhana (base case). Untuk `numberRange`, masalah besar "buat array 1 sampai 5" dipecah menjadi "ambil angka 1, lalu selesaikan masalah yang lebih kecil: buat array 2 sampai 5" — dan seterusnya sampai tersisa satu angka saja.

> Perbedaan antara Solusi 1 (maju) dan Solusi 2/3 (mundur) hanya soal **dari mana kita memulai pengurangan masalah** — dari `start` atau dari `end`. Keduanya valid, dan keduanya menghasilkan output yang sama.
