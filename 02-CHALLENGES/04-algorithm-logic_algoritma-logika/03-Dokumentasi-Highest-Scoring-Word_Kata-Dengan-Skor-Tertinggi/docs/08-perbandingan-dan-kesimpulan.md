# 📚 highestScoringWord - PART 8: PERBANDINGAN & KESIMPULAN

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║            🏆 PART 8: PERBANDINGAN & KESIMPULAN 🏆                      ║
║                                                                          ║
║           Membandingkan Semua Solusi dan Memilih yang Terbaik            ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📊 Perbandingan | 🥇 Rekomendasi | 💡 Pola Umum | ✅ Kesimpulan |
|:--------------:|:--------------:|:------------:|:------------:|
| [Jump](#-perbandingan-semua-solusi) | [Jump](#-rekomendasi) | [Jump](#-pola-umum-yang-dipelajari) | [Jump](#-kesimpulan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Bisa membandingkan semua solusi secara objektif
- ✅ Tahu solusi mana yang paling cocok untuk konteks tertentu
- ✅ Memahami pola umum yang bisa diterapkan ke challenge lain
- ✅ Siap mengerjakan challenge JavaScript berikutnya

---

## 📊 Perbandingan Semua Solusi

### Kode Lengkap Semua Solusi

**Part 4 — Refactoring (Nested Loop + Helper Function)**
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

**Part 5 — Nested Loop Tanpa Helper Function**
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

---

**Part 6 — `.reduce()`**
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

---

**Part 7 — `.map() + .reduce()`**
```javascript
const getWordScore = (word) =>
  [...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0)

const highestScoringWord = (str) => {
  if (!str) return ''
  return str
    .split(' ')
    .map(word => ({ word, score: getWordScore(word) }))
    .reduce((best, current) =>
      current.score > best.score ? current : best
    ).word
}
```

---

### Tabel Perbandingan

| | Part 4 | Part 5 | Part 6 | Part 7 |
|---|---|---|---|---|
| **Pendekatan** | Nested loop + helper | Nested loop | `.reduce()` | `.map() + .reduce()` |
| **Helper function** | ✅ Ada | ❌ Tidak ada | ✅ Ada | ✅ Ada |
| **Jumlah fungsi** | 2 | 1 | 2 | 2 |
| **Variabel tracker** | `highestScore` + `result` | `highestScore` + `highestWord` | Tidak perlu | Tidak perlu |
| **`getWordScore` dipanggil** | 1x per kata | — | 2x per iterasi | 1x per kata |
| **Gaya** | Imperative | Imperative | Functional | Full functional |
| **Kompleksitas waktu** | O(n × m) | O(n × m) | O(n × m) | O(n × m) |
| **Kemudahan baca** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Cocok untuk** | Belajar & produksi | Belajar | Functional style | Full functional |

---

### Visualisasi Alur Semua Solusi

```
Input: 'man i need a taxi'

Part 4 & 5 — Nested Loop:
────────────────────────────────────────────────
words = ['man', 'i', 'need', 'a', 'taxi']
  ↓ loop setiap kata
  ↓ hitung score per kata
  ↓ bandingkan dengan highestScore
  ↓ update jika lebih tinggi
return 'taxi'

Part 6 — .reduce():
────────────────────────────────────────────────
'man i need a taxi'
  ↓ .split(' ') → ['man', 'i', 'need', 'a', 'taxi']
  ↓ .reduce() → bandingkan kata satu per satu
    best='man' vs 'i'    → man menang
    best='man' vs 'need' → need menang
    best='need' vs 'a'   → need menang
    best='need' vs 'taxi'→ taxi menang
return 'taxi'

Part 7 — .map() + .reduce():
────────────────────────────────────────────────
'man i need a taxi'
  ↓ .split(' ') → ['man', 'i', 'need', 'a', 'taxi']
  ↓ .map()      → [{man,28}, {i,9}, {need,33}, {a,1}, {taxi,54}]
  ↓ .reduce()   → bandingkan score object satu per satu
    best={man,28}  vs {i,9}    → man menang
    best={man,28}  vs {need,33}→ need menang
    best={need,33} vs {a,1}    → need menang
    best={need,33} vs {taxi,54}→ taxi menang
  ↓ .word
return 'taxi'
```

---

## 🥇 Rekomendasi

### Untuk Belajar & Pemula
→ **Part 4 atau Part 5** — Nested Loop

Alasan:
- Alur paling eksplisit dan mudah di-debug
- Mudah dipahami langkah demi langkah
- Tidak perlu memahami `.reduce()` terlebih dahulu

### Untuk Gaya Functional yang Ringkas
→ **Part 6** — `.reduce()`

Alasan:
- Tidak perlu variabel tracker `highestScore` dan `result`
- Kode lebih ringkas tanpa kehilangan keterbacaan
- Cocok jika sudah familiar dengan `.reduce()`

### Untuk Full Functional & Performa
→ **Part 7** — `.map() + .reduce()`

Alasan:
- `getWordScore()` hanya dipanggil sekali per kata
- Konsisten full functional dari helper hingga fungsi utama
- Cocok untuk input besar atau jika skor perlu dipakai ulang

---

## 💡 Pola Umum yang Dipelajari

### 1. Tracker Pattern
```javascript
// Pola untuk mencari nilai terbaik dengan loop
let highestScore = -Infinity
let result = ''

for (const item of items) {
  const score = calculateScore(item)
  if (score > highestScore) {
    highestScore = score
    result = item
  }
}
```
Pola ini bisa dipakai di banyak challenge lain — mencari nilai maksimum, minimum, atau elemen terbaik berdasarkan kriteria tertentu.

---

### 2. Guard Clause
```javascript
// Tangani edge case di awal — return lebih awal
if (!input) return defaultValue
```
Selalu tambahkan guard clause untuk input falsy, kosong, atau tidak valid sebelum logika utama dijalankan.

---

### 3. ASCII Conversion
```javascript
// Konversi karakter ke nilai alfabet
char.charCodeAt(0) - 96  // a=1, b=2, ..., z=26
char.charCodeAt(0) - 64  // A=1, B=2, ..., Z=26 (uppercase)
```
Pola ini berguna untuk challenge yang melibatkan nilai huruf atau enkripsi sederhana.

---

### 4. `.reduce()` untuk Mencari Nilai Terbaik
```javascript
// Pola reduce tanpa initial value untuk mencari elemen terbaik
array.reduce((best, current) =>
  getScore(current) > getScore(best) ? current : best
)
```
Lebih ringkas dari tracker pattern untuk kasus yang tidak perlu variabel tambahan.

---

### 5. `.map() + .reduce()` untuk Efisiensi
```javascript
// Hitung skor sekali dengan .map(), lalu compare dengan .reduce()
array
  .map(item => ({ item, score: getScore(item) }))
  .reduce((best, current) =>
    current.score > best.score ? current : best
  ).item
```
Gunakan pola ini jika fungsi perhitungan mahal (expensive) dan tidak ingin dipanggil dua kali per iterasi.

---

## ✅ Kesimpulan

Semua solusi menghasilkan output yang sama dan memiliki kompleksitas waktu **O(n × m)**. Tidak ada satu solusi yang "paling benar" — pilihan tergantung konteks:

| Konteks | Rekomendasi |
|---------|-------------|
| Baru belajar JavaScript | Part 4 atau Part 5 |
| Familiar dengan array methods | Part 6 |
| Ingin full functional & efisien | Part 7 |
| Tim yang mengutamakan readability | Part 4 |

### Satu Hal yang Berlaku di Semua Solusi

Apapun pendekatannya, tiga hal ini **selalu wajib ada**:

```javascript
// 1. Guard clause
if (!str) return ''

// 2. Konversi ASCII yang benar
char.charCodeAt(0) - 96  // bukan charCodeAt(0) saja!

// 3. Perbandingan yang tepat untuk handle tie
score > highestScore  // bukan >= agar kata pertama yang menang
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 7: Alternatif `.map() + .reduce()`](07-alternatif-map-reduce.md)**

---

<div align="center">

## 🎉 Selamat! Dokumentasi Selesai!

Kamu telah mempelajari **4 solusi berbeda** untuk challenge `highestScoringWord` —
dari nested loop hingga full functional dengan `.map() + .reduce()`.

---

Made with ❤️ for learners

**Happy Learning! 🚀**

</div>
