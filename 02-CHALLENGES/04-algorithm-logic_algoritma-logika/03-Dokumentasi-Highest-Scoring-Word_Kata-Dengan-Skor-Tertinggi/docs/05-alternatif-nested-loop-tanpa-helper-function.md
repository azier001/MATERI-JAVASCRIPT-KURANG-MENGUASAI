# 📚 highestScoringWord - PART 5: ALTERNATIF `nested loop` TANPA HELPER FUNCTION

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║      🔄 PART 5: ALTERNATIF nested loop TANPA HELPER FUNCTION 🔄         ║
║                                                                          ║
║           Pendekatan Alternatif Semua Logika Dalam Satu Fungsi           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📖 Konsep | ✅ Kode | 🧪 Test Cases | 📖 Algoritma | ⚠️ Pitfalls |
|:---------:|:-------:|:-------------:|:------------:|:-----------:|
| [Jump](#-perbedaan-dengan-versi-refactoring) | [Jump](#-kode-alternatif-nested-loop-tanpa-helper-function) | [Jump](#-test-cases) | [Jump](#-ringkasan-algoritma) | [Jump](#-pitfalls-jebakan-umum) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami perbedaan antara versi dengan dan tanpa helper function
- ✅ Tahu kapan helper function diperlukan dan kapan tidak
- ✅ Paham trade-off antara ringkas vs single responsibility
- ✅ Bisa mengimplementasikan solusi tanpa helper function

---

## 📖 Perbedaan dengan Versi Refactoring

Versi ini adalah kode dari AI sebelah yang sudah diperbaiki inisialisasi `highestScore`-nya. Perbedaan utama dengan versi refactoring (Part 4) hanya satu — tidak ada `getWordScore()` sebagai helper function:

| | Part 4 — Dengan Helper Function | Part 5 — Tanpa Helper Function |
|---|---|---|
| `getWordScore()` | ✅ Ada | ❌ Tidak ada |
| Inner loop | Di dalam `getWordScore()` | Di dalam fungsi utama langsung |
| Jumlah fungsi | 2 fungsi | 1 fungsi |
| Panjang kode | Lebih panjang | Lebih ringkas |
| Single Responsibility | ✅ | ❌ |

```javascript
// Part 4 — fungsi utama memanggil helper
for (const word of words) {
  const score = getWordScore(word)  // ← delegasi ke helper
  // ...
}

// Part 5 — semua logika langsung di fungsi utama
for (const word of words) {
  let score = 0
  for (const char of word) {        // ← inner loop langsung di sini
    score += char.charCodeAt(0) - 96
  }
  // ...
}
```

> 💡 Tidak ada yang "lebih benar" — keduanya valid. Versi dengan helper function lebih mudah ditest dan digunakan ulang. Versi tanpa helper lebih ringkas untuk kasus sederhana.

---

## ✅ Kode Alternatif `nested loop` Tanpa Helper Function

```javascript
const highestScoringWord = (sentence) => {
  if (!sentence) return ''

  const words = sentence.split(' ')
  let highestScore = -Infinity
  let highestWord = ''

  for (const word of words) {
    let score = 0

    for (const char of word) {
      score += char.charCodeAt(0) - 96
    }

    if (score > highestScore) {
      highestScore = score
      highestWord = word
    }
  }

  return highestWord
}
```

### Perubahan dari Versi Refactoring:

| Sebelum (Part 4) | Sesudah (Part 5) | Keterangan |
|------------------|------------------|------------|
| `str` | `sentence` | Nama parameter lebih deskriptif |
| `result` | `highestWord` | Nama lebih eksplisit — jelas isinya kata tertinggi |
| `getWordScore(word)` | Inner loop langsung | Tidak ada helper function |
| 2 fungsi terpisah | 1 fungsi saja | Lebih ringkas |

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
Jika sentence kosong/falsy → return ''
Pisah sentence menjadi array kata-kata → words
Loop setiap kata di words
  Reset score = 0
  Loop setiap karakter di kata → akumulasi score
  Jika score lebih tinggi dari highestScore → update highestScore dan highestWord
Return highestWord
```

---

### **Step-by-Step (Detail):**

#### 🟣 Definisi Fungsi:

1. `const highestScoringWord = (sentence)`
   - `sentence` — string berisi kata-kata yang dipisah spasi
   - **return** — string kata dengan skor alfabet tertinggi

#### 🛡️ Guard Clause:

2. **`if (!sentence) return ''`**
   - Jika `sentence` kosong (`''`), `null`, atau `undefined` → langsung return `''`
   - Mencegah error saat `.split()` dipanggil pada nilai falsy

#### 🔧 Persiapan:

3. **`const words = sentence.split(' ')`**
   - Memisah string menjadi array kata-kata
   - Contoh: `'taxi up to'` → `['taxi', 'up', 'to']`

4. **Inisialisasi variabel:**
   - `highestScore = -Infinity` — tracker skor tertinggi, dimulai dari nilai terendah agar kata pertama pasti menang
   - `highestWord = ''` — penampung kata pemenang

#### 🔄 Di Dalam `for (const word of words)`:

5. **`let score = 0`**
   - Skor direset ke `0` setiap iterasi kata baru
   - Penting — jika tidak direset, skor akan terakumulasi antar kata ❌

#### 🔄 Di Dalam `for (const char of word)`:

6. **`score += char.charCodeAt(0) - 96`**
   - `charCodeAt(0)` — ambil nilai ASCII karakter
   - `- 96` — konversi ke nilai alfabet (`a=1, b=2, ..., z=26`)
   - Contoh: `'a'.charCodeAt(0)` = 97, 97 - 96 = **1** ✅

#### 🔵 Setelah Inner Loop:

7. **`if (score > highestScore)`**
   - Bandingkan skor kata ini dengan skor tertinggi saat ini
   - Jika skor sama (tie), kondisi `>` tidak terpenuhi → kata pertama tetap terpilih ✅

8. **Jika skor lebih tinggi:**
   - `highestScore = score` — update skor tertinggi
   - `highestWord = word` — update kata pemenang

#### 🔵 Setelah Outer Loop:

9. **`return highestWord`**

---

### **Visualisasi untuk `'taxi'`:**

```
┌─────────────────────────────────────────────────────────────────┐
│  word = 'taxi', score = 0                                       │
│                                                                 │
│  char 't' → charCodeAt(0) = 116, 116 - 96 = 20, score = 20    │
│  char 'a' → charCodeAt(0) = 97,  97  - 96 = 1,  score = 21    │
│  char 'x' → charCodeAt(0) = 120, 120 - 96 = 24, score = 45    │
│  char 'i' → charCodeAt(0) = 105, 105 - 96 = 9,  score = 54    │
│                                                                 │
│  score (54) > highestScore (-Infinity) → ✅ update             │
│  highestScore = 54, highestWord = 'taxi'                        │
└─────────────────────────────────────────────────────────────────┘

Input: 'man i need a taxi up to ubud'

┌────────┬───────┬───────────────────────────┐
│  Kata  │ Skor  │ Jadi highestWord?          │
├────────┼───────┼───────────────────────────┤
│ man    │  28   │ ✅ (28 > -Infinity)        │
│ i      │   9   │ ❌ (9 < 28)               │
│ need   │  33   │ ✅ (33 > 28)              │
│ a      │   1   │ ❌ (1 < 33)               │
│ taxi   │  54   │ ✅ (54 > 33)              │
│ up     │  37   │ ❌ (37 < 54)              │
│ to     │  35   │ ❌ (35 < 54)              │
│ ubud   │  45   │ ❌ (45 < 54)              │
└────────┴───────┴───────────────────────────┘

highestWord = 'taxi' ✅
```

---

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!sentence) return ''` untuk menangani input falsy di awal
- 🔄 **Nested Loop** — loop di dalam loop, outer untuk kata, inner untuk karakter
- 🔁 **Reset per Iterasi** — `let score = 0` di dalam outer loop agar skor tidak terakumulasi antar kata
- 🔢 **ASCII Conversion** — `charCodeAt(0) - 96` untuk konversi ke nilai alfabet
- 🏆 **Tracker Pattern** — `highestScore` dan `highestWord` diupdate setiap kali ditemukan skor lebih tinggi

---

### **Kompleksitas:**

| | Nilai | Penjelasan |
|---|---|---|
| Waktu | **O(n × m)** | n = jumlah kata, m = jumlah karakter per kata |
| Memori | **O(n)** | `words` menyimpan n kata hasil split |

---

### **Pitfalls (Jebakan Umum):**

**1) ❌ Lupa reset `score = 0` di setiap iterasi kata**
```javascript
// ❌ SALAH — score tidak direset, terakumulasi antar kata
for (const word of words) {
  // let score = 0 ← tidak ada!
  for (const char of word) {
    score += char.charCodeAt(0) - 96 // skor kata sebelumnya ikut terhitung ❌
  }
}

// ✅ BENAR — score direset setiap kata baru
for (const word of words) {
  let score = 0  // ← reset di sini
  for (const char of word) {
    score += char.charCodeAt(0) - 96
  }
}
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
if (score >= highestScore) { highestWord = word }

// ✅ Benar — jika skor sama (tie), kata PERTAMA tetap terpilih
if (score > highestScore) { highestWord = word }
```

**4) ❌ Menggunakan nilai ASCII langsung tanpa konversi**
```javascript
// ❌ Salah — menggunakan nilai ASCII mentah
score += char.charCodeAt(0)
// 'a' = 97, 'b' = 98, dst — tidak sesuai aturan a=1, b=2

// ✅ Benar — konversi ke nilai alfabet
score += char.charCodeAt(0) - 96
// 'a' = 1, 'b' = 2, dst ✅
```

---

### **💡 Insight Penting:**

> **Kapan tidak perlu helper function?**
> Jika logikanya sederhana dan hanya dipakai di satu tempat, tidak perlu diekstrak ke helper function. Versi ini lebih ringkas dan tetap mudah dibaca. Helper function lebih bermanfaat jika logika yang sama perlu dipakai di banyak tempat.

> **Kenapa `highestScore = -Infinity` bukan `highestScore = 0`?**
> Karena `-Infinity` menjamin bahwa kata pertama **selalu** mengupdate `highestWord` di iterasi pertama, tanpa terkecuali. Jika pakai `0`, ada risiko logika tidak bekerja dengan benar untuk kasus-kasus ekstrem.

> **Kenapa `>` bukan `>=` untuk handle tie?**
> Challenge menyatakan jika dua kata punya skor sama, kembalikan kata yang **paling awal**. Dengan `>`, kondisi tidak terpenuhi saat skor sama — sehingga `highestWord` tidak terupdate dan kata pertama tetap terpilih secara otomatis.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 4: Refactoring & Clean Code](04-refactoring-clean-code.md)**
- **📖 [Lanjut ke Part 6: Alternatif `.reduce()` →](06-alternatif-reduce.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
