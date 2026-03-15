# 📚 highestScoringWord - PART 2: PROSES PENGERJAAN

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║            🔨 PART 2: PROSES PENGERJAAN 🔨                              ║
║                                                                          ║
║           Dari Kode Awal Hingga Kode Final Step-by-Step                  ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-20%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 🏁 Kode Awal | 🔄 Step 1 | 🔄 Step 2 | 🔄 Step 3 | 🔄 Step 4 | ✅ Kode Final |
|:-----------:|:---------:|:---------:|:---------:|:---------:|:------------:|
| [Jump](#-kode-awal) | [Jump](#-step-1--pisah-string-menjadi-array-kata) | [Jump](#-step-2--hitung-skor-setiap-kata) | [Jump](#-step-3--bandingkan-dan-track-skor-tertinggi) | [Jump](#-step-4--tambah-guard-clause-dan-return) | [Jump](#-kode-final) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami proses berpikir dalam memecahkan soal ini
- ✅ Tahu kenapa string harus dipecah menjadi array kata terlebih dahulu
- ✅ Paham cara menghitung skor huruf menggunakan ASCII
- ✅ Mengerti cara melacak kata dengan skor tertinggi
- ✅ Bisa menambahkan guard clause untuk input edge case

---

## 🏁 Kode Awal

Ini adalah kode pertama yang ditulis sebelum ada bayangan solusi yang jelas:

```javascript
const highestScoringWord = (str) => {
  const splitted = str.split(' ')
  let minSum = -Infinity
  let candidate

  const filtered = splitted.filter((word, index) => {
    let sumWord = 0

    for (const char of word) {
      sumWord += char.charCodeAt(0)
    }

    if (sumWord > minSum) {
      minSum = sumWord
      candidate = word[index]  // ❌ bug: word[index] bukan word
    }
  })
}
```

### ❌ Masalah di Kode Awal

- `word[index]` — mengakses karakter ke-`index` dari string `word`, bukan kata itu sendiri
- `.filter()` dipakai tapi tidak pernah return — `filtered` selalu array kosong
- `charCodeAt(0)` tanpa `- 96` — menggunakan nilai ASCII mentah, bukan nilai alfabet
- Tidak ada `return` di fungsi utama

---

## 🔄 Step 1 — Pisah String Menjadi Array Kata

**Insight:** String input perlu dipecah menjadi array kata-kata agar bisa diiterasi satu per satu.

```javascript
const str = 'man i need a taxi up to ubud'
const words = str.split(' ')
console.log(words)
```

```
// Output:
['man', 'i', 'need', 'a', 'taxi', 'up', 'to', 'ubud']
```

✅ Setiap kata sudah terpisah dan siap diiterasi.

---

## 🔄 Step 2 — Hitung Skor Setiap Kata

**Insight:** Skor setiap kata dihitung dengan menjumlahkan nilai alfabet setiap hurufnya. Nilai alfabet didapat dari `charCodeAt(0) - 96` karena nilai ASCII `'a'` adalah 97.

```javascript
const word = 'taxi'
let score = 0

for (const char of word) {
  score += char.charCodeAt(0) - 96
}

console.log(score)
```

```
// Output:
// t=20, a=1, x=24, i=9
54
```

✅ Skor kata `'taxi'` = 54.

---

## 🔄 Step 3 — Bandingkan dan Track Skor Tertinggi

**Insight:** Kita butuh dua variabel tracker — `highestScore` untuk menyimpan skor tertinggi saat ini, dan `result` untuk menyimpan kata pemenangnya. Inisialisasi `highestScore` dengan `-Infinity` agar kata pertama selalu menang di iterasi pertama.

```javascript
const words = 'man i need a taxi up to ubud'.split(' ')
let highestScore = -Infinity
let result = ''

for (const word of words) {
  let score = 0

  for (const char of word) {
    score += char.charCodeAt(0) - 96
  }

  if (score > highestScore) {
    highestScore = score
    result = word
  }

  console.log(word, '->', score)
}

console.log('result:', result)
```

```
// Output:
man   -> 28
i     -> 9
need  -> 33
a     -> 1
taxi  -> 54
up    -> 37
to    -> 35
ubud  -> 45
result: taxi
```

✅ Kata dengan skor tertinggi berhasil ditemukan.

---

## 🔄 Step 4 — Tambah Guard Clause dan Return

**Insight:** Perlu guard clause `if (!str) return ''` untuk menangani input kosong atau falsy, agar fungsi tidak crash saat `.split()` dipanggil pada nilai tersebut.

```javascript
const highestScoringWord = (str) => {
  if (!str) return ''

  const words = str.split(' ')
  let highestScore = -Infinity
  let result = ''

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

  return result
}
```

✅ Semua test case lulus!

---

## ✅ Kode Final

Ini adalah kode final yang siap untuk submission:

```javascript
const highestScoringWord = (str) => {
  if (!str) return ''

  const words = str.split(' ')
  let highestScore = -Infinity
  let result = ''

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

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 1: Soal & Kriteria](01-soal-dan-kriteria.md)**
- **📖 [Lanjut ke Part 3: Kesalahan & Pelajaran →](03-kesalahan-dan-pelajaran.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
