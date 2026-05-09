# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

Soal ini meminta kita **menyaring** elemen dari array campuran (angka dan string) — hanya angka yang boleh lolos ke array baru.

Dua konsep langsung terlintas:

1. **Iterasi** — kita perlu memeriksa setiap elemen satu per satu
2. **Type Checking** — kita harus bisa membedakan angka dari string

Analoginya seperti memilah isi keranjang belanjaan: ada apel (angka) dan mainan (string). Kita hanya memindahkan apel ke keranjang baru.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Terima array campuran (angka dan string)
2. Buat array hasil (result) yang kosong
3. Untuk setiap elemen di dalam array:
   a. Cek: apakah typeof elemen === 'number'?
      → Ya  : masukkan ke result (push)
      → Tidak: abaikan, lanjut ke elemen berikutnya
4. Kembalikan array result
```

---

## 🎨 Visualisasi Alur

```
[Input] → [1, 2, 'a', 'b']

Siapkan Keranjang Baru: []

Cek indeks 0: Nilainya 1   → typeof 1   === 'number'? ✅ YA  → push
Keranjang Baru: [1]

Cek indeks 1: Nilainya 2   → typeof 2   === 'number'? ✅ YA  → push
Keranjang Baru: [1, 2]

Cek indeks 2: Nilainya 'a' → typeof 'a' === 'number'? ❌ TIDAK → skip
Keranjang Baru: [1, 2]

Cek indeks 3: Nilainya 'b' → typeof 'b' === 'number'? ❌ TIDAK → skip
Keranjang Baru: [1, 2]

[Output] → [1, 2]
```

---

## 🔄 Percobaan Pertama — Imperatif (`for` loop)

Pendekatan paling mendasar: iterasi manual dengan `for` loop, pengecekan `typeof`, dan akumulasi dengan `.push()`.

```javascript
const filter_list = (arr) => {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
      result.push(arr[i]);
    }
  }

  return result;
};
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Sangat eksplisit, mudah dipahami pemula |
| Keringkasan | ⭐⭐⭐ Cukup panjang (8 baris body) |
| Pendekatan | Imperatif — "bagaimana caranya?" |

> 💡 **Catatan**: `typeof` adalah operator bawaan JavaScript yang mengembalikan string berisi nama tipe data dari suatu nilai. Misalnya `typeof 42` menghasilkan `"number"` dan `typeof "hello"` menghasilkan `"string"`.

---

## 🔄 Percobaan Kedua — Deklaratif (`.filter()`)

Karena polanya adalah **penyaringan** (pilih elemen yang memenuhi kondisi), `.filter()` adalah alat yang tepat.

```javascript
const filter_list = (arr) => {
  return arr.filter(item => typeof item === 'number');
};
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Sangat jelas, niat kode langsung terbaca |
| Keringkasan | ⭐⭐⭐⭐ Jauh lebih ringkas dari V1 |
| Pendekatan | Deklaratif — "apa yang diinginkan?" |

> 💡 **Kenapa `.filter()` lebih tepat dari `for` loop di sini?**  
> `.filter()` dirancang khusus untuk **penyaringan** (memilih elemen yang memenuhi kondisi). Kita tidak perlu mengelola array `result` secara manual — `.filter()` sudah otomatis mengembalikan array baru. Kode lebih ekspresif dan niatnya lebih jelas.

---

## ✅ Solusi Final — One-liner dengan implicit return

Perbaikan dari V2: menghilangkan `{}` dan `return` karena body hanya satu ekspresi (implicit return).

```javascript
const filter_list = (arr) => arr.filter(item => typeof item === 'number');
```

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐ Sangat ringkas, butuh paham arrow function |
| Keringkasan | ⭐⭐⭐⭐⭐ Minimal dan elegan |
| Pendekatan | Deklaratif + Functional |

---

## 🔍 Penjelasan Baris per Baris (Solusi Final)

```javascript
const filter_list = (arr) => arr.filter(item => typeof item === 'number');
//    ^^^^^^^^^^^    ^^^     ^^^^^^^^^^  ^^^^    ^^^^^^^^^^^^^^^^^^^^^^
//    nama fungsi    param   method      setiap  kondisi:
//                   input   .filter()   elemen  apakah tipe datanya
//                           iterasi     di arr  adalah 'number'?
//                           & saring             
//                                       Jika true  → masuk array baru
//                                       Jika false → dibuang
```

---

## 🧪 Verifikasi Manual

Kita telusuri setiap elemen dari contoh soal:

| Elemen | `typeof` | `=== 'number'`? | Hasil |
|--------|----------|:----------------:|-------|
| `1` | `"number"` | ✅ | Masuk |
| `2` | `"number"` | ✅ | Masuk |
| `'aasf'` | `"string"` | ❌ | Dibuang |
| `'1'` | `"string"` | ❌ | Dibuang |
| `'123'` | `"string"` | ❌ | Dibuang |
| `123` | `"number"` | ✅ | Masuk |

```javascript
console.log(filter_list([1, 2, 'a', 'b']));                  // → [1, 2] ✅
console.log(filter_list([1, 'a', 'b', 0, 15]));              // → [1, 0, 15] ✅
console.log(filter_list([1, 2, 'aasf', '1', '123', 123]));   // → [1, 2, 123] ✅
```

---

## 📈 Evolusi Solusi

```
V1 (Imperatif)          V2 (Deklaratif)         V3 / Final
─────────────           ─────────────           ─────────────
for loop +              .filter() +             .filter() +
typeof check +     →    typeof check +     →    typeof check
result.push()           explicit return         implicit return
(8 baris body)          (1 baris body)          (one-liner)
```

Setiap iterasi menghilangkan satu lapisan "bising" (noise) dan membuat **niat kode makin terlihat jelas**.

---

## 💡 Alternatif: `Number.isInteger()`

Karena soal menyebutkan **non-negative integers**, ada pendekatan yang lebih strict:

```javascript
const filter_list = (arr) => arr.filter(Number.isInteger);
```

Perbedaan dengan `typeof === 'number'`:
- `typeof 3.14 === 'number'` → `true` (lolos, padahal bukan integer)
- `Number.isInteger(3.14)` → `false` (diblokir)
- `typeof NaN === 'number'` → `true` (lolos, padahal bukan angka valid)
- `Number.isInteger(NaN)` → `false` (diblokir)

Untuk soal ini keduanya memberikan hasil yang sama, tapi `Number.isInteger` lebih **defensif** jika ingin benar-benar memvalidasi bilangan bulat.

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
