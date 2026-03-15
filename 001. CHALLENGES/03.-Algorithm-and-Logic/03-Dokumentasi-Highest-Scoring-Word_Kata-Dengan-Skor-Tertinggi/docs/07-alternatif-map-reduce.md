# 📚 highestScoringWord - PART 7: ALTERNATIF `.map() + .reduce()`

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║          🔄 PART 7: ALTERNATIF .map() + .reduce() 🔄                    ║
║                                                                          ║
║         Pendekatan Full Functional Menggunakan .map() + .reduce()        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-20%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📖 Konsep | ✅ Kode | 🧪 Test Cases | 📖 Algoritma | ⚠️ Pitfalls |
|:---------:|:-------:|:-------------:|:------------:|:-----------:|
| [Jump](#-perbedaan-dengan-versi-reduce) | [Jump](#-kode-alternatif-map--reduce) | [Jump](#-test-cases) | [Jump](#-ringkasan-algoritma) | [Jump](#-pitfalls-jebakan-umum) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami kenapa `.map()` dulu sebelum `.reduce()` lebih efisien
- ✅ Tahu cara mengubah array string menjadi array object dengan `.map()`
- ✅ Paham konsep method chaining `.split().map().reduce()`
- ✅ Bisa mengimplementasikan solusi full functional

---

## 📖 Perbedaan dengan Versi `.reduce()`

Masalah utama di Part 6 — `getWordScore()` dipanggil **dua kali per iterasi**:

```javascript
// Part 6 — getWordScore dipanggil 2x per iterasi
.reduce((best, word) =>
  getWordScore(word) > getWordScore(best) ? word : best
//  ↑ hitung ulang       ↑ hitung ulang lagi!
)
```

Versi ini memperbaikinya dengan `.map()` — hitung skor **sekali** per kata, simpan di object, lalu `.reduce()` tinggal membandingkan angka:

```javascript
// Part 7 — getWordScore dipanggil 1x per kata via .map()
.map(word => ({ word, score: getWordScore(word) }))
//                           ↑ dihitung sekali, disimpan di object

.reduce((best, current) =>
  current.score > best.score ? current : best
//  ↑ tinggal bandingkan angka, tidak perlu hitung ulang!
)
```

| | Part 6 — `.reduce()` | Part 7 — `.map() + .reduce()` |
|---|---|---|
| `getWordScore` dipanggil | 2x per iterasi | 1x per kata |
| `.reduce()` membandingkan | String langsung | Object `{ word, score }` |
| Memori tambahan | Tidak ada | Array object hasil `.map()` |
| Performa | Sedikit lebih boros | Lebih efisien |

---

## ✅ Kode Alternatif `.map() + .reduce()`

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

> 💡 Di versi ini, `getWordScore()` juga ikut direfactor — dari nested loop menjadi `[...word].reduce()` agar konsisten full functional.

### Perubahan dari Versi `.reduce()` (Part 6):

| Sebelum (Part 6) | Sesudah (Part 7) | Keterangan |
|------------------|------------------|------------|
| `for...of` di `getWordScore` | `[...word].reduce()` | Full functional di helper juga |
| `.reduce()` bandingkan string | `.map()` lalu `.reduce()` bandingkan object | Skor dihitung sekali |
| Return string langsung | Return `.word` dari object | Ambil properti word dari pemenang |

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
Map setiap kata menjadi object { word, score } → .map()
Reduce array object → ambil object dengan score tertinggi
Return .word dari object pemenang
```

---

### **Step-by-Step (Detail):**

#### 🟣 Definisi Helper Function:

1. `const getWordScore = (word)`
   - `word` — satu kata (string)
   - **return** — total skor alfabet kata tersebut

2. **`[...word]`**
   - Spread operator untuk mengubah string menjadi array karakter
   - Contoh: `'taxi'` → `['t', 'a', 'x', 'i']`

3. **`.reduce((score, char) => score + char.charCodeAt(0) - 96, 0)`**
   - Initial value `0` — skor dimulai dari nol
   - Setiap iterasi: tambahkan nilai alfabet karakter ke akumulator `score`
   - `charCodeAt(0) - 96` — konversi ASCII ke nilai alfabet (`a=1, b=2, ..., z=26`)

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

7. **`.map(word => ({ word, score: getWordScore(word) }))`**
   - Setiap kata diubah menjadi object `{ word, score }`
   - `getWordScore()` dipanggil **sekali per kata** — lebih efisien dari Part 6
   - Contoh: `'taxi'` → `{ word: 'taxi', score: 54 }`

8. **`.reduce((best, current) => current.score > best.score ? current : best)`**
   - Tidak ada initial value → object pertama otomatis menjadi `best`
   - Setiap iterasi membandingkan `current.score` dengan `best.score`
   - Jika skor sama (tie) → `best` tetap tidak berubah → object pertama terpilih ✅

9. **`.word`**
   - Ambil hanya properti `word` dari object pemenang
   - Contoh: `{ word: 'taxi', score: 54 }` → `'taxi'`

---

### **Visualisasi untuk `'man i need a taxi'`:**

```
str.split(' ')
→ ['man', 'i', 'need', 'a', 'taxi']

.map(word => ({ word, score: getWordScore(word) }))
→ [
    { word: 'man',  score: 28 },
    { word: 'i',    score: 9  },
    { word: 'need', score: 33 },
    { word: 'a',    score: 1  },
    { word: 'taxi', score: 54 }
  ]

.reduce(ambil score tertinggi):
┌─────────────────────┬──────────────────────────────────────────────┐
│ best                │ current                                      │
├─────────────────────┼──────────────────────────────────────────────┤
│ { man,  28 }        │ { i, 9 }    → 9 > 28?  ❌ best tetap        │
│ { man,  28 }        │ { need, 33} → 33 > 28? ✅ best update       │
│ { need, 33 }        │ { a, 1 }    → 1 > 33?  ❌ best tetap        │
│ { need, 33 }        │ { taxi, 54} → 54 > 33? ✅ best update       │
└─────────────────────┴──────────────────────────────────────────────┘

.word
→ 'taxi' ✅
```

---

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!str) return ''` untuk menangani input falsy di awal
- 🔧 **Helper Function** — `getWordScore()` memisahkan logika perhitungan skor
- 🔗 **Method Chaining** — `.split().map().reduce()` dirangkai tanpa variabel perantara
- 📦 **Object Mapping** — `.map()` mengubah setiap kata menjadi `{ word, score }`
- ⚡ **`.reduce()` tanpa initial value** — elemen pertama array otomatis menjadi `best`
- 🔀 **Spread Operator** — `[...word]` mengubah string menjadi array karakter
- ❓ **Ternary Operator** — `kondisi ? nilaiJikaTrue : nilaiJikaFalse`
- 🔢 **ASCII Conversion** — `charCodeAt(0) - 96` untuk konversi ke nilai alfabet

---

### **Kompleksitas:**

| | Nilai | Penjelasan |
|---|---|---|
| Waktu | **O(n × m)** | n = jumlah kata, m = jumlah karakter per kata |
| Memori | **O(n)** | `.map()` menghasilkan array baru n object |

---

### **Pitfalls (Jebakan Umum):**

**1) ❌ Lupa `.word` di akhir chain**
```javascript
// ❌ Salah — return object, bukan string
return str.split(' ')
  .map(word => ({ word, score: getWordScore(word) }))
  .reduce((best, current) =>
    current.score > best.score ? current : best
  )
// → { word: 'taxi', score: 54 } ❌

// ✅ Benar — ambil properti word dari object pemenang
  .reduce((best, current) =>
    current.score > best.score ? current : best
  ).word
// → 'taxi' ✅
```

**2) ❌ Lupa initial value `0` di `getWordScore`**
```javascript
// ❌ Salah — tanpa initial value, karakter pertama jadi accumulator (bukan angka)
[...word].reduce((score, char) => score + char.charCodeAt(0) - 96)
// iterasi pertama: score = 't' (string!), bukan 0

// ✅ Benar — initial value 0 memastikan score selalu bertipe number
[...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0)
```

**3) ❌ Menggunakan `>=` di ternary**
```javascript
// ❌ Salah — jika skor sama, kata TERAKHIR yang dipilih
current.score >= best.score ? current : best

// ✅ Benar — jika skor sama (tie), best tidak berubah → kata pertama tetap terpilih
current.score > best.score ? current : best
```

**4) ❌ Lupa kurung kurawal saat return object di `.map()`**
```javascript
// ❌ Salah — JavaScript mengira {} adalah block, bukan object
.map(word => { word, score: getWordScore(word) })
// → undefined per elemen!

// ✅ Benar — bungkus dengan kurung () agar {} dibaca sebagai object
.map(word => ({ word, score: getWordScore(word) }))
```

---

### **💡 Insight Penting:**

> **Kenapa `.map()` dulu sebelum `.reduce()`?**
> Dengan `.map()`, setiap kata dihitung skornya **sekali** lalu disimpan di object. Saat `.reduce()` berjalan, tidak perlu menghitung ulang — tinggal membandingkan `current.score` vs `best.score`. Ini lebih efisien dibanding Part 6 yang memanggil `getWordScore()` dua kali per iterasi.

> **Kenapa `[...word]` bukan `word.split('')`?**
> Keduanya menghasilkan array karakter dan untuk kasus ini hasilnya sama. Namun `[...word]` (spread operator) lebih idiomatis di JavaScript modern dan lebih aman untuk karakter Unicode multi-byte.

> **Kapan pilih Part 7 dibanding Part 6?**
> Pilih Part 7 jika skor perlu dipakai lebih dari sekali atau untuk input yang besar. Pilih Part 6 jika hanya perlu kata pemenang tanpa menyimpan skor — lebih ringkas dan memori lebih hemat.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 6: Alternatif `.reduce()`](06-alternatif-reduce.md)**
- **📖 [Lanjut ke Part 8: Perbandingan & Kesimpulan →](08-perbandingan-dan-kesimpulan.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
