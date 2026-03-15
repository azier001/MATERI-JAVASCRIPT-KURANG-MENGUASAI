# 📚 highestScoringWord - PART 6: ALTERNATIF `.reduce()`

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║            🔄 PART 6: ALTERNATIF .reduce() 🔄                           ║
║                                                                          ║
║           Pendekatan Alternatif Menggunakan Method .reduce()             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📖 Konsep | ✅ Kode | 🧪 Test Cases | 📖 Algoritma | ⚠️ Pitfalls |
|:---------:|:-------:|:-------------:|:------------:|:-----------:|
| [Jump](#-apa-itu-reduce) | [Jump](#-kode-alternatif-reduce) | [Jump](#-test-cases) | [Jump](#-ringkasan-algoritma) | [Jump](#-pitfalls-jebakan-umum) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja `.reduce()` untuk mencari nilai terbaik
- ✅ Tahu keunggulan `.reduce()` dibanding nested loop
- ✅ Paham kenapa `.reduce()` tanpa initial value lebih tepat di sini
- ✅ Bisa mengimplementasikan solusi menggunakan `.reduce()`

---

## 📖 Apa itu `.reduce()`?

`.reduce()` adalah array method yang mengakumulasi semua elemen array menjadi **satu nilai tunggal**. Callback-nya menerima dua parameter utama: `accumulator` (nilai akumulasi saat ini) dan `current` (elemen saat ini).

```javascript
// Contoh sederhana — menjumlahkan semua angka
[1, 2, 3, 4].reduce((acc, current) => acc + current, 0)
// → 10

// Contoh mencari nilai terbesar
[3, 1, 4, 1, 5].reduce((best, current) => current > best ? current : best)
// → 5
```

Di challenge ini, kita gunakan `.reduce()` untuk mencari **kata dengan skor tertinggi** — accumulator-nya adalah kata terbaik saat ini (`best`), bukan angka.

---

## 📖 `.reduce()` Tanpa Initial Value

Trik kunci di versi ini — `.reduce()` dipanggil **tanpa initial value**:

```javascript
// Dengan initial value
['taxi', 'up', 'to'].reduce((best, word) => ..., '')
// iterasi 1: best = ''    , word = 'taxi'
// iterasi 2: best = 'taxi', word = 'up'
// iterasi 3: best = 'taxi', word = 'to'

// Tanpa initial value ← yang kita pakai
['taxi', 'up', 'to'].reduce((best, word) => ...)
// iterasi 1: best = 'taxi', word = 'up'   ← elemen pertama jadi best otomatis!
// iterasi 2: best = 'taxi', word = 'to'
```

> 💡 Tanpa initial value, elemen pertama array otomatis menjadi `best` — tidak perlu `-Infinity` lagi. Ini membuat kode lebih ringkas dan elegan.

---

## ✅ Kode Alternatif `.reduce()`

```javascript
const getWordScore = (word) => {
  let score = 0
  for (const char of word) {
    score += char.charCodeAt(0) - 96
  }
  return score
}

const highestScoringWord = (str) => {
  if (!str) return ''
  return str
    .split(' ')
    .reduce((best, word) =>
      getWordScore(word) > getWordScore(best) ? word : best
    )
}
```

### Perubahan dari Versi Refactoring:

| Sebelum (Part 4) | Sesudah (Part 6) | Keterangan |
|------------------|------------------|------------|
| `let highestScore = -Infinity` | Tidak ada | Tidak perlu — `best` sudah menyimpan kata terbaik |
| `let result = ''` | Tidak ada | Tidak perlu — `.reduce()` langsung return hasilnya |
| `for (const word of words)` | `.reduce((best, word) => ...)` | Loop diganti dengan `.reduce()` |
| `if (score > highestScore)` | `getWordScore(word) > getWordScore(best)` | Perbandingan langsung di ternary |

---

## 🧪 Test Cases

```javascript
// Basic cases
console.log(highestScoringWord('man i need a taxi up to ubud'));
// → 'taxi'

console.log(highestScoringWord('what time are we climbing up the volcano'));
// → 'volcano'

console.log(highestScoringWord('take me to semynak'));
// → 'semynak'
```

```javascript
// Edge cases
console.log(highestScoringWord(''));
// → ''

console.log(highestScoringWord('a'));
// → 'a'

console.log(highestScoringWord('javascript'));
// → 'javascript'
```

```javascript
// Tie cases — skor sama, pilih kata pertama
console.log(highestScoringWord('aa b'));
// → 'aa'

console.log(highestScoringWord('abc cab'));
// → 'abc'
```

```javascript
// Score cases
console.log(highestScoringWord('a bb ccc dddd'));
// → 'dddd'

console.log(highestScoringWord('wyn nyx'));
// → 'nyx' (nyx=63 menang tipis atas wyn=62)
```

---

## 📖 Ringkasan Algoritma

### **Konsep Inti:**
```
Jika str kosong/falsy → return ''
Pisah str menjadi array kata-kata → .split(' ')
Reduce array kata:
  Hitung skor word dan skor best
  Jika skor word lebih tinggi → word menjadi best baru
  Jika tidak → best tetap
Return best (kata dengan skor tertinggi)
```

---

### **Step-by-Step (Detail):**

#### 🟣 Definisi Helper Function:

1. `const getWordScore = (word)`
   - `word` — satu kata (string)
   - **return** — total skor alfabet kata tersebut

#### 🔄 Di Dalam `for (const char of word)`:

2. **`score += char.charCodeAt(0) - 96`**
   - `charCodeAt(0)` — ambil nilai ASCII karakter
   - `- 96` — konversi ke nilai alfabet (`a=1, b=2, ..., z=26`)
   - Contoh: `'a'.charCodeAt(0)` = 97, 97 - 96 = **1** ✅

3. **`return score`**

---

#### 🟣 Definisi Fungsi Utama:

4. `const highestScoringWord = (str)`
   - `str` — string berisi kata-kata yang dipisah spasi
   - **return** — string kata dengan skor alfabet tertinggi

#### 🛡️ Guard Clause:

5. **`if (!str) return ''`**
   - Jika `str` kosong (`''`), `null`, atau `undefined` → langsung return `''`
   - Mencegah error saat `.split()` dipanggil pada nilai falsy

#### 🔗 Chaining:

6. **`str.split(' ')`**
   - Memisah string menjadi array kata-kata
   - Contoh: `'taxi up to'` → `['taxi', 'up', 'to']`

7. **`.reduce((best, word) => ...)`**
   - Tidak ada initial value → kata pertama otomatis menjadi `best` di iterasi pertama
   - Setiap iterasi membandingkan `word` saat ini dengan `best` sebelumnya

8. **`getWordScore(word) > getWordScore(best) ? word : best`**
   - Hitung skor `word` dan skor `best`
   - Jika `word` menang → `word` menjadi `best` baru
   - Jika `best` menang atau skor sama → `best` tetap tidak berubah (tie → kata pertama terpilih ✅)

---

### **Visualisasi untuk `'man i need a taxi'`:**

```
str.split(' ')
→ ['man', 'i', 'need', 'a', 'taxi']

.reduce((best, word) => getWordScore(word) > getWordScore(best) ? word : best):

┌──────────────────────┬────────────────────────────────────────────┐
│ best                 │ word (current)                             │
├──────────────────────┼────────────────────────────────────────────┤
│ 'man' (otomatis)     │ 'i'    → 9 > 28?  ❌ best tetap 'man'     │
│ 'man'                │ 'need' → 33 > 28? ✅ best update 'need'   │
│ 'need'               │ 'a'    → 1 > 33?  ❌ best tetap 'need'    │
│ 'need'               │ 'taxi' → 54 > 33? ✅ best update 'taxi'   │
└──────────────────────┴────────────────────────────────────────────┘

return 'taxi' ✅
```

---

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!str) return ''` untuk menangani input falsy di awal
- 🔧 **Helper Function** — `getWordScore()` memisahkan logika perhitungan skor
- 🔗 **Method Chaining** — `.split().reduce()` dirangkai langsung tanpa variabel perantara
- ⚡ **`.reduce()` tanpa initial value** — elemen pertama array otomatis menjadi nilai awal `best`
- ❓ **Ternary Operator** — `kondisi ? nilaiJikaTrue : nilaiJikaFalse`
- 🔢 **ASCII Conversion** — `charCodeAt(0) - 96` untuk konversi ke nilai alfabet

---

### **Kompleksitas:**

| | Nilai | Penjelasan |
|---|---|---|
| Waktu | **O(n × m)** | n = jumlah kata, m = jumlah karakter per kata |
| Memori | **O(n)** | `.split()` menghasilkan array n kata |

---

### **Pitfalls (Jebakan Umum):**

**1) ❌ Memberikan initial value `''` di `.reduce()`**
```javascript
// ❌ Berbahaya — '' akan selalu jadi best di iterasi pertama
// getWordScore('') = 0, sehingga kata pertama yang punya skor > 0 menang
// tapi jika semua skor = 0 (tidak mungkin di challenge ini), akan return ''
str.split(' ').reduce((best, word) =>
  getWordScore(word) > getWordScore(best) ? word : best
, '') // ← initial value '' berbahaya

// ✅ Benar — tanpa initial value, kata pertama otomatis jadi best
str.split(' ').reduce((best, word) =>
  getWordScore(word) > getWordScore(best) ? word : best
)
```

**2) ❌ Menggunakan `>=` di ternary**
```javascript
// ❌ Salah — jika skor sama, kata TERAKHIR yang dipilih
getWordScore(word) >= getWordScore(best) ? word : best

// ✅ Benar — jika skor sama (tie), best tidak berubah → kata pertama tetap terpilih
getWordScore(word) > getWordScore(best) ? word : best
```

**3) ❌ Tidak ada guard clause sebelum `.reduce()`**
```javascript
// ❌ Jika str kosong, .split(' ') menghasilkan ['']
// .reduce() pada array 1 elemen tanpa initial value → return elemen itu langsung → ''
// Tapi jika str adalah null/undefined → .split() crash!
const highestScoringWord = (str) => {
  return str.split(' ').reduce(...) // 💥 TypeError jika str adalah null
}

// ✅ Guard clause mencegah error
if (!str) return ''
```

---

### **💡 Insight Penting:**

> **Kenapa `.reduce()` tanpa initial value?**
> Jika tidak ada initial value, elemen pertama array otomatis menjadi nilai awal `best` — tanpa perlu menginisialisasi `-Infinity` secara manual. Ini membuat kode lebih ringkas dan elegan.

> **Kenapa `getWordScore()` dipanggil dua kali per iterasi?**
> Di setiap iterasi, `getWordScore(word)` dan `getWordScore(best)` keduanya dihitung ulang. Untuk string pendek ini tidak masalah, tapi jika performa kritis, bisa dioptimasi dengan `.map() + .reduce()` seperti di Part 7.

> **Kapan pilih `.reduce()` vs nested loop?**
> `.reduce()` lebih ringkas dan ekspresif untuk pola "cari nilai terbaik dari array". Nested loop lebih eksplisit dan mudah di-debug saat belajar. Keduanya valid — pilih sesuai konteks dan keterbacaan.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 5: Alternatif Nested Loop Tanpa Helper Function](05-alternatif-nested-loop-tanpa-helper-function.md)**
- **📖 [Lanjut ke Part 7: Alternatif `.map() + .reduce()` →](07-alternatif-map-reduce.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
