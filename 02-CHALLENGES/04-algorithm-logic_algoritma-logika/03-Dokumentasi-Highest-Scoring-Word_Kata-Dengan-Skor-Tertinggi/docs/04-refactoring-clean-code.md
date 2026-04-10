# 📚 highestScoringWord - PART 4: REFACTORING & CLEAN CODE

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║            ✨ PART 4: REFACTORING & CLEAN CODE ✨                        ║
║                                                                          ║
║           Dari Kode Final ke Kode yang Lebih Clean dan Readable          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 🔄 Penamaan | 🔄 Guard Clause | 🔄 Helper Function | ✅ Kode Refactoring | 📖 Algoritma |
|:-----------:|:---------------:|:-----------------:|:------------------:|:-----------:|
| [Jump](#-step-1--penamaan-variabel) | [Jump](#-step-2--guard-clause) | [Jump](#-step-3--ekstrak-helper-function) | [Jump](#-kode-refactoring-final) | [Jump](#-ringkasan-algoritma) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami pentingnya penamaan variabel yang deskriptif
- ✅ Tahu cara menulis guard clause yang ringkas
- ✅ Paham manfaat mengekstrak logika ke helper function
- ✅ Bisa membedakan kode yang clean vs tidak clean

---

## 🔄 Step 1 — Penamaan Variabel

Penamaan variabel yang baik membuat kode lebih mudah dibaca tanpa perlu komentar tambahan.

| Variabel Lama | Variabel Baru | Alasan |
|---------------|---------------|--------|
| `splitted` | `words` | Lebih natural — hasil `.split()` adalah array kata |
| `minSum` | `highestScore` | Nama mencerminkan isi — tracker skor **tertinggi** |
| `candidate` | `result` | Lebih umum dan jelas — ini nilai yang akan di-return |
| `sumWord` | `score` | Lebih ringkas, konteks sudah jelas dari loop |

### Kenapa `highestScore` Lebih Baik dari `minSum`?

```javascript
// ❌ Membingungkan — nama 'minSum' menyiratkan nilai minimum
// padahal isinya justru skor TERTINGGI
let minSum = -Infinity

// ✅ Jelas — nama langsung menyampaikan tujuannya
let highestScore = -Infinity
```

---

## 🔄 Step 2 — Guard Clause

Guard clause yang ringkas lebih clean untuk kondisi satu baris.

```javascript
// ❌ Belum ada guard clause — fungsi crash jika str kosong atau null
const highestScoringWord = (str) => {
  const words = str.split(' ') // 💥 error jika str adalah null!
  // ...
}

// ✅ Guard clause di awal menangani input falsy
if (!str) return ''
```

> 💡 `!str` menangkap semua nilai falsy sekaligus — `''`, `null`, `undefined`. Lebih defensif dibanding hanya mengecek `str === ''`.

---

## 🔄 Step 3 — Ekstrak Helper Function

Logika menghitung skor kata diekstrak ke helper function `getWordScore()` agar fungsi utama lebih bersih dan mudah dibaca.

```javascript
// ❌ Semua logika dalam satu fungsi — terlalu padat
const highestScoringWord = (str) => {
  if (!str) return ''
  const words = str.split(' ')
  let highestScore = -Infinity
  let result = ''

  for (const word of words) {
    let score = 0
    for (const char of word) {      // ← logika skor campur
      score += char.charCodeAt(0) - 96  //   dengan logika utama
    }
    if (score > highestScore) {
      highestScore = score
      result = word
    }
  }

  return result
}
```

```javascript
// ✅ Logika skor dipisah ke helper function
const getWordScore = (word) => {
  let score = 0
  for (const char of word) {
    score += char.charCodeAt(0) - 96
  }
  return score
}

const highestScoringWord = (str) => {
  if (!str) return ''
  const words = str.split(' ')
  let highestScore = -Infinity
  let result = ''

  for (const word of words) {
    const score = getWordScore(word)  // ← fungsi utama lebih bersih
    if (score > highestScore) {
      highestScore = score
      result = word
    }
  }

  return result
}
```

> 💡 Prinsip **Single Responsibility** — setiap fungsi idealnya hanya punya satu tugas. `getWordScore()` bertugas menghitung skor, `highestScoringWord()` bertugas mencari kata terbaik.

---

## ✅ Kode Refactoring Final

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

  const words = str.split(' ')
  let highestScore = -Infinity
  let result = ''

  for (const word of words) {
    const score = getWordScore(word)

    if (score > highestScore) {
      highestScore = score
      result = word
    }
  }

  return result
}
```

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
Pisah str menjadi array kata-kata → words
Loop setiap kata di words
  Hitung skor kata → getWordScore(word)
  Jika skor lebih tinggi dari highestScore → update highestScore dan result
Return result
```

---

### **Step-by-Step (Detail):**

#### 🟣 Definisi Fungsi Utama:

1. `const highestScoringWord = (str)`
   - `str` — string berisi kata-kata yang dipisah spasi
   - **return** — string kata dengan skor alfabet tertinggi

#### 🛡️ Guard Clause:

2. **`if (!str) return ''`**
   - Jika `str` kosong (`''`), `null`, atau `undefined` → langsung return `''`
   - Mencegah error saat `.split()` dipanggil pada nilai falsy

#### 🔧 Persiapan:

3. **`const words = str.split(' ')`**
   - Memisah string menjadi array kata-kata
   - Contoh: `'taxi up to'` → `['taxi', 'up', 'to']`

4. **Inisialisasi variabel:**
   - `highestScore = -Infinity` — tracker skor tertinggi, dimulai dari nilai terendah agar kata pertama pasti menang
   - `result = ''` — penampung kata pemenang

#### 🔄 Di Dalam `for (const word of words)`:

5. **`const score = getWordScore(word)`**
   - Hitung skor kata saat ini dengan memanggil helper function
   - Hasil skor disimpan di `score`

6. **`if (score > highestScore)`**
   - Bandingkan skor kata ini dengan skor tertinggi saat ini
   - Jika skor sama (tie), kondisi `>` tidak terpenuhi → kata pertama tetap terpilih ✅

7. **Jika skor lebih tinggi:**
   - `highestScore = score` — update skor tertinggi
   - `result = word` — update kata pemenang

#### 🔵 Setelah Loop:

8. **`return result`**

---

#### 🟣 Definisi Helper Function:

9. `const getWordScore = (word)`
   - `word` — satu kata (string)
   - **return** — total skor alfabet kata tersebut

#### 🔄 Di Dalam `for (const char of word)`:

10. **`score += char.charCodeAt(0) - 96`**
    - `charCodeAt(0)` — ambil nilai ASCII karakter
    - `- 96` — konversi ke nilai alfabet (`a=1, b=2, ..., z=26`)
    - Contoh: `'a'.charCodeAt(0)` = 97, 97 - 96 = **1** ✅

11. **`return score`**

---

### **Visualisasi untuk `'taxi'`:**

```
┌─────────────────────────────────────────────────────────────────┐
│  getWordScore('taxi')                                           │
│                                                                 │
│  char 't' → charCodeAt(0) = 116, 116 - 96 = 20                │
│  char 'a' → charCodeAt(0) = 97,  97  - 96 = 1                 │
│  char 'x' → charCodeAt(0) = 120, 120 - 96 = 24                │
│  char 'i' → charCodeAt(0) = 105, 105 - 96 = 9                 │
│                                                                 │
│  score = 20 + 1 + 24 + 9 = 54                                  │
└─────────────────────────────────────────────────────────────────┘

Input: 'man i need a taxi up to ubud'

┌────────┬───────┬──────────────────────┐
│  Kata  │ Skor  │ Jadi result?         │
├────────┼───────┼──────────────────────┤
│ man    │  28   │ ✅ (28 > -Infinity)  │
│ i      │   9   │ ❌ (9 < 28)          │
│ need   │  33   │ ✅ (33 > 28)         │
│ a      │   1   │ ❌ (1 < 33)          │
│ taxi   │  54   │ ✅ (54 > 33)         │
│ up     │  37   │ ❌ (37 < 54)         │
│ to     │  35   │ ❌ (35 < 54)         │
│ ubud   │  45   │ ❌ (45 < 54)         │
└────────┴───────┴──────────────────────┘

result = 'taxi' ✅
```

---

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!str) return ''` untuk menangani input falsy di awal
- 🔄 **Nested Loop** — loop di dalam loop, outer untuk kata, inner untuk karakter
- 🔧 **Helper Function** — `getWordScore()` memisahkan logika perhitungan skor agar fungsi utama lebih bersih
- 📦 **Single Responsibility** — tiap fungsi punya satu tugas yang jelas
- 🔢 **ASCII Conversion** — `charCodeAt(0) - 96` untuk konversi ke nilai alfabet
- 🏆 **Tracker Pattern** — `highestScore` dan `result` diupdate setiap kali ditemukan skor lebih tinggi

---

### **Kompleksitas:**

| | Nilai | Penjelasan |
|---|---|---|
| Waktu | **O(n × m)** | n = jumlah kata, m = jumlah karakter per kata |
| Memori | **O(n)** | `words` menyimpan n kata hasil split |

---

### **Pitfalls (Jebakan Umum):**

**1) ❌ Tidak ada guard clause**
```javascript
// ❌ Tanpa guard clause, input null/undefined akan error
const highestScoringWord = (str) => {
  const words = str.split(' ') // 💥 TypeError: Cannot read properties of null
}

// ✅ Guard clause di awal mencegah error
if (!str) return ''
```

**2) ❌ Inisialisasi `highestScore = 0` instead of `-Infinity`**
```javascript
// ❌ Berbahaya — secara defensive programming kurang aman
let highestScore = 0

// ✅ Aman — -Infinity memastikan kata pertama SELALU menang di iterasi pertama
let highestScore = -Infinity
```

**3) ❌ Menggunakan `>=` di kondisi perbandingan**
```javascript
// ❌ Salah — jika skor sama, kata TERAKHIR yang dipilih
if (score >= highestScore) { result = word }

// ✅ Benar — jika skor sama (tie), kata PERTAMA tetap terpilih
if (score > highestScore) { result = word }
```

---

### **💡 Insight Penting:**

> **Kenapa ekstrak `getWordScore()` sebagai helper function?**
> Prinsip *Single Responsibility* — setiap fungsi idealnya hanya punya satu tugas. Fungsi utama bertugas mencari kata dengan skor tertinggi, sedangkan `getWordScore()` bertugas menghitung skor satu kata. Hasilnya kode lebih mudah dibaca, ditest, dan digunakan ulang.

> **Kenapa `highestScore = -Infinity` bukan `highestScore = 0`?**
> Karena `-Infinity` menjamin bahwa kata pertama **selalu** mengupdate `result` di iterasi pertama, tanpa terkecuali. Jika pakai `0`, ada risiko logika tidak bekerja dengan benar untuk kasus-kasus ekstrem.

> **Kenapa `>` bukan `>=` untuk handle tie?**
> Challenge menyatakan jika dua kata punya skor sama, kembalikan kata yang **paling awal**. Dengan `>`, kondisi tidak terpenuhi saat skor sama — sehingga `result` tidak terupdate dan kata pertama tetap terpilih secara otomatis.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 3: Kesalahan & Pelajaran](03-kesalahan-dan-pelajaran.md)**
- **📖 [Lanjut ke Part 5: Alternatif Nested Loop Tanpa Helper Function →](05-alternatif-nested-loop-tanpa-helper-function.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
