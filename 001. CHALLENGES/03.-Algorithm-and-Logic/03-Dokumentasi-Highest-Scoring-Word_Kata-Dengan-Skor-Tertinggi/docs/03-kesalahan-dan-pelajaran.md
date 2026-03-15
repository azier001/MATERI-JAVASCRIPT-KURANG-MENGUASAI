# 📚 highestScoringWord - PART 3: KESALAHAN & PELAJARAN

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║            ⚠️  PART 3: KESALAHAN & PELAJARAN ⚠️                         ║
║                                                                          ║
║           Kesalahan yang Ditemukan dan Apa yang Bisa Dipelajari          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| ❌ Kesalahan 1 | ❌ Kesalahan 2 | ❌ Kesalahan 3 | ❌ Kesalahan 4 | 💡 Ringkasan |
|:-------------:|:-------------:|:-------------:|:-------------:|:-----------:|
| [Jump](#-kesalahan-1--wordindex-bukan-word) | [Jump](#-kesalahan-2--filter-tanpa-return) | [Jump](#-kesalahan-3--charcodeAt0-tanpa--96) | [Jump](#-kesalahan-4--tidak-ada-return-di-fungsi-utama) | [Jump](#-ringkasan-kesalahan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami 4 kesalahan umum yang sering terjadi di soal ini
- ✅ Tahu kenapa setiap kesalahan bisa menyebabkan bug
- ✅ Paham perbedaan `word[index]` dan `word` saat iterasi array
- ✅ Bisa menghindari kesalahan yang sama di soal berikutnya

---

## ❌ Kesalahan 1 — `word[index]` bukan `word`

### Apa yang Terjadi

Di kode awal, variabel `candidate` diisi dengan `word[index]` bukan `word`:

```javascript
// ❌ SALAH — word[index] mengakses karakter, bukan kata
const filtered = splitted.filter((word, index) => {
  // ...
  if (sumWord > minSum) {
    minSum = sumWord
    candidate = word[index] // ← bug di sini!
  }
})
```

### Kenapa Salah

`word` di sini adalah **string** (satu kata), dan `index` adalah **posisi kata di array**. Jadi `word[index]` bukan mengambil kata ke-`index`, melainkan mengakses **karakter ke-`index`** dari string `word`.

```
// Contoh saat iterasi ke-4 (index=4):
word  = 'taxi'     // kata ke-4
index = 4          // posisi di array

word[index] = word[4] = 'i'  ← karakter ke-4 dari 'taxi'!
// Padahal yang dimaksud adalah kata 'taxi' itu sendiri ❌
```

### ✅ Solusi

```javascript
// ✅ BENAR — simpan word langsung, bukan word[index]
if (sumWord > minSum) {
  minSum = sumWord
  candidate = word  // ← kata itu sendiri
}
```

---

## ❌ Kesalahan 2 — `.filter()` Tanpa Return

### Apa yang Terjadi

`.filter()` dipakai sebagai pengganti loop, tapi tidak pernah return nilai apapun:

```javascript
// ❌ SALAH — .filter() tanpa return
const filtered = splitted.filter((word, index) => {
  let sumWord = 0

  for (const char of word) {
    sumWord += char.charCodeAt(0)
  }

  if (sumWord > minSum) {
    minSum = sumWord
    candidate = word[index]
  }
  // tidak ada return true/false!
})
```

### Kenapa Salah

`.filter()` berfungsi untuk **menyaring array** berdasarkan kondisi — ia mengharapkan callback yang return `true` atau `false`. Jika tidak return apapun, callback dianggap return `undefined` (falsy), sehingga `filtered` selalu menjadi array kosong.

```
// ❌ Yang terjadi:
filtered = []  // selalu kosong karena tidak ada return!

// ✅ Penggunaan .filter() yang benar:
const evenNumbers = [1, 2, 3, 4].filter(n => n % 2 === 0)
// → [2, 4]
```

### ✅ Solusi

```javascript
// ✅ BENAR — ganti .filter() dengan for...of untuk kasus ini
for (const word of words) {
  let score = 0

  for (const char of word) {
    score += char.charCodeAt(0) - 96
  }

  if (score > highestScore) {
    highestScore = score
    result = word
  }
}
```

---

## ❌ Kesalahan 3 — `charCodeAt(0)` Tanpa `- 96`

### Apa yang Terjadi

Nilai ASCII digunakan langsung tanpa dikonversi ke nilai alfabet:

```javascript
// ❌ SALAH — menggunakan nilai ASCII mentah
for (const char of word) {
  sumWord += char.charCodeAt(0)  // tanpa - 96
}
```

### Kenapa Salah

Nilai ASCII huruf kecil dimulai dari 97 (`'a'` = 97), bukan dari 1. Tanpa pengurangan 96, skor yang dihitung tidak sesuai aturan challenge (`a=1, b=2, ..., z=26`). Akibatnya hasil perbandingan skor antar kata bisa meleset.

```
// ❌ Tanpa - 96 (nilai ASCII mentah):
'a' = 97, 'b' = 98, 'c' = 99, ...

// ✅ Dengan - 96 (nilai alfabet):
'a' = 1,  'b' = 2,  'c' = 3, ...

// Dampak nyata — perbandingan 'climbing' vs 'volcano':
// Tanpa - 96: climbing=837, volcano=754 → 'climbing' menang ❌
// Dengan - 96: climbing=84, volcano=82  → 'volcano' menang ✅
```

### ✅ Solusi

```javascript
// ✅ BENAR — kurangi 96 untuk konversi ke nilai alfabet
for (const char of word) {
  score += char.charCodeAt(0) - 96
}
```

---

## ❌ Kesalahan 4 — Tidak Ada `return` di Fungsi Utama

### Apa yang Terjadi

Fungsi selesai dieksekusi tapi tidak me-return apapun:

```javascript
// ❌ SALAH — tidak ada return
const highestScoringWord = (str) => {
  const splitted = str.split(' ')
  let minSum = -Infinity
  let candidate

  // ... semua logika ...

  // tidak ada return candidate!
}

console.log(highestScoringWord('man i need a taxi up to ubud'))
// → undefined ❌
```

### Kenapa Salah

Tanpa `return`, function JavaScript secara otomatis return `undefined`. Meskipun variabel `candidate` sudah berisi kata yang benar, nilainya tidak pernah dikembalikan ke pemanggil fungsi.

```
// ❌ Yang terjadi:
candidate = 'taxi'  // sudah benar di dalam fungsi
return undefined    // tapi tidak pernah dikembalikan!

// ✅ Yang seharusnya:
return candidate    // atau return result
```

### ✅ Solusi

```javascript
// ✅ BENAR — tambahkan return di akhir fungsi
const highestScoringWord = (str) => {
  // ... semua logika ...

  return result  // ← wajib ada!
}
```

---

## 💡 Ringkasan Kesalahan

| No | Kesalahan | Dampak | Solusi |
|----|-----------|--------|--------|
| 1 | `word[index]` bukan `word` | `candidate` berisi karakter, bukan kata | Gunakan `word` langsung |
| 2 | `.filter()` tanpa return | `filtered` selalu array kosong | Ganti dengan `for...of` |
| 3 | `charCodeAt(0)` tanpa `- 96` | Skor salah, hasil perbandingan meleset | Tambahkan `- 96` |
| 4 | Tidak ada `return` | Fungsi selalu return `undefined` | Tambahkan `return result` |

---

## 📚 Konsep yang Dipelajari

### Akses Karakter vs Kata
`word[index]` mengakses **karakter ke-`index`** dari string `word`. Untuk mengambil kata itu sendiri, cukup gunakan variabel `word` langsung tanpa index.

### Penggunaan `.filter()` yang Benar
`.filter()` adalah array method untuk **menyaring elemen** berdasarkan kondisi. Callback-nya harus return `true` (elemen lolos) atau `false` (elemen dibuang). Jika tidak perlu menyaring, gunakan `for...of` atau `.forEach()`.

### Konversi ASCII ke Nilai Alfabet
`charCodeAt(0)` mengembalikan nilai ASCII karakter. Karena `'a'` = 97, `'b'` = 98, dst — kita kurangi 96 agar `'a'` = 1, `'b'` = 2, sesuai aturan challenge.

### Guard Clause
Kondisi `if (!str) return ''` di awal function disebut **guard clause** — sebuah kondisi yang langsung return lebih awal untuk menangani edge case, sebelum logika utama dijalankan.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 2: Proses Pengerjaan](02-proses-pengerjaan.md)**
- **📖 [Lanjut ke Part 4: Refactoring & Clean Code →](04-refactoring-clean-code.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
