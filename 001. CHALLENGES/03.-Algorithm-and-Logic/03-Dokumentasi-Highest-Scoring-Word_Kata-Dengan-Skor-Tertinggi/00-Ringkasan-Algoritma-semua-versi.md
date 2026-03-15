# 📋 highestScoringWord — Ringkasan Algoritma Semua Versi

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║          📋 RINGKASAN ALGORITMA — COMPLETE REFERENCE 📋                 ║
║    Refactored · Nested Loop · .reduce() · .map()+.reduce()              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-30%20minutes-blue?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Versi](https://img.shields.io/badge/Versi-4%20Solusi-success?style=for-the-badge)

---

## 🎯 Tujuan

- ✅ Ringkasan challenge dan kriteria dalam satu tempat
- ✅ Ringkasan algoritma semua versi secara detail
- ✅ Quick reference untuk review atau ujian

---

## 🧭 Quick Jump

| 🧩 Challenge | ✅ Versi 1 | 🔄 Versi 2 | 🔀 Versi 3 | 🔀 Versi 4 | 🧪 Test Cases | 📊 Perbandingan |
|:------------:|:---------:|:---------:|:---------:|:---------:|:-------------:|:---------------:|
| [Jump](#-deskripsi-challenge) | [Jump](#-versi-1-refactored-nested-loop--helper-function) | [Jump](#-versi-2-nested-loop-tanpa-helper-function) | [Jump](#-versi-3-reduce) | [Jump](#-versi-4-map--reduce) | [Jump](#-test-cases-lengkap) | [Jump](#-perbandingan-lengkap) |

---

# 🧩 DESKRIPSI CHALLENGE

## 📋 Soal

> ### 📋 Deskripsi
>
> Diberikan sebuah function **`highestScoringWord(str)`** yang menerima satu parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `str` | `string` | Kalimat berisi kata-kata yang dipisah spasi |
>
> Setiap huruf memiliki nilai sesuai posisinya di alfabet:
>
> | Huruf | a | b | c | ... | x | y | z |
> |-------|---|---|---|-----|---|---|---|
> | Nilai | 1 | 2 | 3 | ... | 24 | 25 | 26 |
>
> **Skor sebuah kata** = jumlah nilai semua hurufnya.
>
> Buatlah function yang mengembalikan **kata dengan skor tertinggi** dari kalimat tersebut.

---

## 🔍 Kriteria

> **1.** Jika `str` kosong (`''`) atau falsy
> → return string kosong `''`
>
> **2.** Skor kata = jumlah nilai alfabet semua hurufnya (`a=1, b=2, ..., z=26`)
>
> **3.** Return **kata dengan skor tertinggi**
>
> **4.** Jika dua kata memiliki skor yang sama (tie)
> → return kata yang **paling awal** muncul di kalimat
>
> **5.** Semua huruf dijamin **lowercase** dan input selalu **valid**

---

## 📊 Contoh-contoh

```javascript
// ✅ Basic case 1
highestScoringWord('man i need a taxi up to ubud')
// → 'taxi'  (taxi = 20+1+24+9 = 54, tertinggi)

// ✅ Basic case 2
highestScoringWord('what time are we climbing up the volcano')
// → 'volcano'  (volcano = 22+15+12+3+1+14+15 = 82, tertinggi)

// ✅ Basic case 3
highestScoringWord('take me to semynak')
// → 'semynak'  (semynak = 19+5+13+25+14+1+11 = 88, tertinggi)

// ✅ Tie case — skor sama, pilih kata pertama
highestScoringWord('abc cab')
// → 'abc'  (abc = cab = 6, 'abc' muncul lebih awal)

// ✅ Edge case
highestScoringWord('')
// → ''
```

---

### Simulasi Perhitungan Skor: `'man i need a taxi'`

```
Kata   → Perhitungan                → Skor
─────────────────────────────────────────────
man    → m(13) + a(1)  + n(14)      → 28   ← sementara tertinggi
i      → i(9)                       → 9
need   → n(14)+ e(5)  + e(5) + d(4) → 33   ← sementara tertinggi
a      → a(1)                       → 1
taxi   → t(20)+ a(1)  + x(24)+ i(9) → 54   ← tertinggi ✅

return 'taxi'
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter | `str` — string kalimat berisi kata-kata |
| Sistem nilai | `a=1, b=2, ..., z=26` |
| Skor kata | Jumlah nilai semua huruf dalam kata |
| Jika tie | Kembalikan kata yang **paling awal** |
| Edge case | `str` falsy → return `''` |
| Return | String — kata dengan skor tertinggi |

---

> 💡 **Aturan Sederhana:** Pisah kalimat → loop setiap kata → hitung skor → track kata dengan skor tertinggi → return pemenang.

---

## ⚡ Quick Test — Tulis Fungsinya Sendiri Dulu, Lalu Test Satu per Satu!

> 💡 Tulis function `highestScoringWord` kamu sendiri terlebih dahulu, baru paste test di bawah ini satu per satu untuk ngecek hasilnya.

```javascript
// Test 1 — Edge case: input kosong
console.log(highestScoringWord(''))
// → ''
```

```javascript
// Test 2 — Basic case
console.log(highestScoringWord('man i need a taxi up to ubud'))
// → 'taxi'
```

```javascript
// Test 3 — Tie case
console.log(highestScoringWord('abc cab'))
// → 'abc'
```

```javascript
// Test 4 — Skor berdekatan
console.log(highestScoringWord('wyn nyx'))
// → 'nyx' (nyx=63 menang tipis atas wyn=62)
```

---

═══════════════════════════════════════════════════════════════════════

# ✅ VERSI 1: Refactored (Nested Loop + Helper Function)

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Pemula%20%7C%20Readable-green?style=flat-square)
![Style](https://img.shields.io/badge/Style-Imperative-orange?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

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

</details>

### **Konsep Inti:**
```
Jika str kosong/falsy → return ''
Pisah str menjadi array kata-kata → words
Loop setiap kata di words
  Hitung skor kata → getWordScore(word)
  Jika skor lebih tinggi dari highestScore → update highestScore dan result
Return result
```

### **Step-by-Step (Detail):**

#### 🟣 Definisi Fungsi Utama:

1. **`const highestScoringWord = (str)`**
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

9. **`const getWordScore = (word)`**
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

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!str) return ''` menangani input falsy di awal
- 🔧 **Helper Function** — `getWordScore()` memisahkan logika perhitungan skor
- 📦 **Single Responsibility** — tiap fungsi punya satu tugas yang jelas
- 🔢 **ASCII Conversion** — `charCodeAt(0) - 96` untuk konversi ke nilai alfabet
- 🏆 **Tracker Pattern** — `highestScore` dan `result` diupdate setiap kali ditemukan skor lebih tinggi

### **Kapan Pakai:**
- ✅ Belajar dan debugging
- ✅ Butuh kode yang paling mudah dibaca
- ✅ Ketika readability adalah prioritas utama

### **Pitfalls (Jebakan Umum):**

**1) ❌ Tidak ada guard clause**
```javascript
// ❌ Tanpa guard clause, input null/undefined akan error
const highestScoringWord = (str) => {
  const words = str.split(' ') // 💥 TypeError jika str adalah null
}

// ✅ Guard clause di awal mencegah error
if (!str) return ''
```

**2) ❌ Inisialisasi `highestScore = 0` bukan `-Infinity`**
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

### **💡 Insight Penting:**

> **Kenapa ekstrak `getWordScore()` sebagai helper function?**
> Prinsip *Single Responsibility* — setiap fungsi idealnya hanya punya satu tugas. Fungsi utama bertugas mencari kata dengan skor tertinggi, sedangkan `getWordScore()` bertugas menghitung skor satu kata. Hasilnya kode lebih mudah dibaca, ditest, dan digunakan ulang.

> **Kenapa `highestScore = -Infinity` bukan `highestScore = 0`?**
> Karena `-Infinity` menjamin bahwa kata pertama **selalu** mengupdate `result` di iterasi pertama, tanpa terkecuali.

> **Kenapa `>` bukan `>=` untuk handle tie?**
> Challenge menyatakan jika dua kata punya skor sama, kembalikan kata yang **paling awal**. Dengan `>`, kondisi tidak terpenuhi saat skor sama — sehingga `result` tidak terupdate dan kata pertama tetap terpilih secara otomatis.

---

═══════════════════════════════════════════════════════════════════════

# 🔄 VERSI 2: Nested Loop Tanpa Helper Function

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Ringkas%20%7C%20Readable-green?style=flat-square)
![Style](https://img.shields.io/badge/Style-Imperative-orange?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

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

</details>

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

### **Step-by-Step (Detail):**

#### 🟣 Definisi Fungsi:

1. **`const highestScoringWord = (sentence)`**
   - `sentence` — string berisi kata-kata yang dipisah spasi
   - **return** — string kata dengan skor alfabet tertinggi

#### 🛡️ Guard Clause:

2. **`if (!sentence) return ''`**
   - Jika `sentence` kosong (`''`), `null`, atau `undefined` → langsung return `''`

#### 🔧 Persiapan:

3. **`const words = sentence.split(' ')`**
   - Memisah string menjadi array kata-kata

4. **Inisialisasi variabel:**
   - `highestScore = -Infinity` — tracker skor tertinggi
   - `highestWord = ''` — penampung kata pemenang

#### 🔄 Di Dalam `for (const word of words)`:

5. **`let score = 0`**
   - Skor direset ke `0` setiap iterasi kata baru
   - Penting — jika tidak direset, skor akan terakumulasi antar kata ❌

#### 🔄 Di Dalam `for (const char of word)`:

6. **`score += char.charCodeAt(0) - 96`**
   - Konversi ASCII ke nilai alfabet (`a=1, b=2, ..., z=26`)

#### 🔵 Setelah Inner Loop:

7. **`if (score > highestScore)` — jika skor lebih tinggi:**
   - `highestScore = score`
   - `highestWord = word`

#### 🔵 Setelah Outer Loop:

8. **`return highestWord`**

---

### **Visualisasi untuk `'taxi'`:**

```
┌─────────────────────────────────────────────────────────────────┐
│  word = 'taxi', score = 0                                       │
│                                                                 │
│  char 't' → 116 - 96 = 20, score = 20                         │
│  char 'a' → 97  - 96 = 1,  score = 21                         │
│  char 'x' → 120 - 96 = 24, score = 45                         │
│  char 'i' → 105 - 96 = 9,  score = 54                         │
│                                                                 │
│  score (54) > highestScore (-Infinity) → ✅ update             │
│  highestScore = 54, highestWord = 'taxi'                        │
└─────────────────────────────────────────────────────────────────┘
```

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!sentence) return ''`
- 🔄 **Nested Loop** — outer untuk kata, inner untuk karakter
- 🔁 **Reset per Iterasi** — `let score = 0` di dalam outer loop
- 🔢 **ASCII Conversion** — `charCodeAt(0) - 96`
- 🏆 **Tracker Pattern** — `highestScore` dan `highestWord`

### **Kapan Pakai:**
- ✅ Ingin kode yang lebih ringkas tanpa helper function
- ✅ Logika sederhana dan hanya dipakai di satu tempat
- ✅ Sama mudahnya dibaca seperti Versi 1

### **Pitfalls (Jebakan Umum):**

**1) ❌ Lupa reset `score = 0` di setiap iterasi kata**
```javascript
// ❌ SALAH — score terakumulasi antar kata
for (const word of words) {
  // let score = 0 ← tidak ada!
  for (const char of word) {
    score += char.charCodeAt(0) - 96 // skor kata sebelumnya ikut terhitung ❌
  }
}

// ✅ BENAR
for (const word of words) {
  let score = 0  // ← reset di sini
  for (const char of word) {
    score += char.charCodeAt(0) - 96
  }
}
```

**2) ❌ Inisialisasi `highestScore = 0` bukan `-Infinity`**
```javascript
// ❌ Berbahaya — secara defensive programming kurang aman
let highestScore = 0

// ✅ Aman
let highestScore = -Infinity
```

### **💡 Insight Penting:**

> **Kapan tidak perlu helper function?**
> Jika logikanya sederhana dan hanya dipakai di satu tempat, tidak perlu diekstrak ke helper function. Versi ini lebih ringkas dan tetap mudah dibaca.

> **Perbedaan utama dari Versi 1?**
> Tidak ada `getWordScore()`. Inner loop langsung ada di dalam fungsi utama. Konsekuensinya, perlu reset `let score = 0` di setiap iterasi outer loop — hal yang tidak perlu dipikirkan di Versi 1.

---

═══════════════════════════════════════════════════════════════════════

# 🔀 VERSI 3: `.reduce()`

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Functional%20Style-purple?style=flat-square)
![Style](https://img.shields.io/badge/Style-Functional-9cf?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

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

</details>

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

### **Step-by-Step (Detail):**

#### 🟣 Definisi Helper Function:

1. **`const getWordScore = (word)`**
   - `word` — satu kata (string)
   - **return** — total skor alfabet kata tersebut

2. **`score += char.charCodeAt(0) - 96`**
   - Konversi ASCII ke nilai alfabet

3. **`return score`**

---

#### 🟣 Definisi Fungsi Utama:

4. **`const highestScoringWord = (str)`**
   - **return** — string kata dengan skor alfabet tertinggi

#### 🛡️ Guard Clause:

5. **`if (!str) return ''`**

#### 🔗 Chaining:

6. **`str.split(' ')`**
   - Contoh: `'taxi up to'` → `['taxi', 'up', 'to']`

7. **`.reduce((best, word) => ...)`**
   - Tidak ada initial value → kata pertama otomatis menjadi `best` ✅
   - Tidak perlu inisialisasi `-Infinity`!

8. **`getWordScore(word) > getWordScore(best) ? word : best`**
   - Jika `word` menang → `word` jadi `best` baru
   - Jika tie → `best` tetap → kata pertama terpilih ✅

---

### **Visualisasi untuk `'man i need a taxi'`:**

```
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

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!str) return ''`
- 🔗 **Method Chaining** — `.split().reduce()`
- ⚡ **`.reduce()` tanpa initial value** — kata pertama otomatis jadi `best`
- ❓ **Ternary Operator** — `kondisi ? nilaiJikaTrue : nilaiJikaFalse`

### **Kapan Pakai:**
- ✅ Familiar dengan `.reduce()`
- ✅ Ingin kode ringkas tanpa variabel tracker
- ✅ Gaya functional yang ekspresif

### **Pitfalls (Jebakan Umum):**

**1) ❌ Memberikan initial value `''` di `.reduce()`**
```javascript
// ❌ Berbahaya — '' akan selalu jadi best di iterasi pertama
str.split(' ').reduce((best, word) => ..., '') // ← initial value '' berbahaya

// ✅ Benar — tanpa initial value, kata pertama otomatis jadi best
str.split(' ').reduce((best, word) => ...)
```

**2) ❌ Menggunakan `>=` di ternary**
```javascript
// ❌ Salah — jika skor sama, kata TERAKHIR yang dipilih
getWordScore(word) >= getWordScore(best) ? word : best

// ✅ Benar — kata PERTAMA tetap terpilih saat tie
getWordScore(word) > getWordScore(best) ? word : best
```

### **💡 Insight Penting:**

> **Kenapa `.reduce()` tanpa initial value?**
> Jika tidak ada initial value, elemen pertama array otomatis menjadi nilai awal `best` — tanpa perlu `-Infinity` secara manual. Lebih ringkas dan elegan.

> **Kelemahan Versi 3?**
> `getWordScore()` dipanggil **dua kali per iterasi** — sekali untuk `word` dan sekali untuk `best`. Untuk input besar, ini bisa dioptimasi dengan Versi 4.

---

═══════════════════════════════════════════════════════════════════════

# 🔀 VERSI 4: `.map() + .reduce()`

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Full%20Functional%20%7C%20Efisien-purple?style=flat-square)
![Style](https://img.shields.io/badge/Style-Full%20Functional-9cf?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

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

</details>

### **Konsep Inti:**
```
Jika str kosong/falsy → return ''
Pisah str menjadi array kata-kata → .split(' ')
Map setiap kata menjadi object { word, score } → .map()
Reduce array object → ambil object dengan score tertinggi
Return .word dari object pemenang
```

### **Step-by-Step (Detail):**

#### 🟣 Definisi Helper Function:

1. **`const getWordScore = (word)`**
   - `word` — satu kata (string)
   - **return** — total skor alfabet kata tersebut

2. **`[...word]`**
   - Spread operator untuk mengubah string menjadi array karakter
   - Contoh: `'taxi'` → `['t', 'a', 'x', 'i']`

3. **`.reduce((score, char) => score + char.charCodeAt(0) - 96, 0)`**
   - Initial value `0` — skor dimulai dari nol
   - Setiap iterasi: tambahkan nilai alfabet karakter ke akumulator `score`

---

#### 🟣 Definisi Fungsi Utama:

4. **`const highestScoringWord = (str)`**
   - **return** — string kata dengan skor alfabet tertinggi

#### 🛡️ Guard Clause:

5. **`if (!str) return ''`**

#### 🔗 Chaining:

6. **`str.split(' ')`**
   - Contoh: `'taxi up to'` → `['taxi', 'up', 'to']`

7. **`.map(word => ({ word, score: getWordScore(word) }))`**
   - Setiap kata diubah menjadi object `{ word, score }`
   - `getWordScore()` dipanggil **sekali per kata** — lebih efisien dari Versi 3!
   - Contoh: `'taxi'` → `{ word: 'taxi', score: 54 }`

8. **`.reduce((best, current) => current.score > best.score ? current : best)`**
   - Tidak ada initial value → object pertama otomatis jadi `best`
   - Bandingkan `current.score` vs `best.score` — tidak perlu hitung ulang!
   - Jika tie → `best` tetap → kata pertama terpilih ✅

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

.word → 'taxi' ✅
```

### **Keywords:**
- 🛡️ **Guard Clause** — `if (!str) return ''`
- 🔗 **Method Chaining** — `.split().map().reduce()`
- 📦 **Object Mapping** — `.map()` mengubah setiap kata menjadi `{ word, score }`
- ⚡ **`.reduce()` tanpa initial value** — object pertama otomatis jadi `best`
- 🔀 **Spread Operator** — `[...word]` mengubah string menjadi array karakter
- ❓ **Ternary Operator** — `kondisi ? nilaiJikaTrue : nilaiJikaFalse`

### **Kapan Pakai:**
- ✅ Full functional style dari helper hingga fungsi utama
- ✅ Ingin `getWordScore()` hanya dipanggil sekali per kata
- ✅ Skor perlu disimpan dan dipakai ulang

### **Pitfalls (Jebakan Umum):**

**1) ❌ Lupa `.word` di akhir chain**
```javascript
// ❌ Salah — return object, bukan string
.reduce((best, current) => current.score > best.score ? current : best)
// → { word: 'taxi', score: 54 } ❌

// ✅ Benar — ambil properti word
.reduce((best, current) => current.score > best.score ? current : best).word
// → 'taxi' ✅
```

**2) ❌ Lupa initial value `0` di `getWordScore`**
```javascript
// ❌ Salah — karakter pertama jadi accumulator (string, bukan angka)
[...word].reduce((score, char) => score + char.charCodeAt(0) - 96)

// ✅ Benar — initial value 0
[...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0)
```

**3) ❌ Lupa kurung saat return object di `.map()`**
```javascript
// ❌ Salah — {} dibaca sebagai block, bukan object
.map(word => { word, score: getWordScore(word) }) // → undefined!

// ✅ Benar — bungkus dengan ()
.map(word => ({ word, score: getWordScore(word) }))
```

### **💡 Insight Penting:**

> **Kenapa `.map()` dulu sebelum `.reduce()`?**
> Dengan `.map()`, setiap kata dihitung skornya **sekali** lalu disimpan di object. Saat `.reduce()` berjalan, tidak perlu menghitung ulang — tinggal membandingkan angka. Ini lebih efisien dibanding Versi 3 yang memanggil `getWordScore()` dua kali per iterasi.

> **Kenapa `[...word]` bukan `word.split('')`?**
> Keduanya menghasilkan array karakter dan untuk kasus ini hasilnya sama. Namun `[...word]` lebih idiomatis di JavaScript modern dan lebih aman untuk karakter Unicode multi-byte.

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
const testCases = [
  { input: 'man i need a taxi up to ubud', expected: 'taxi', desc: 'taxi memiliki skor alfabet tertinggi' },
  { input: 'what time are we climbing up the volcano', expected: 'volcano', desc: 'volcano memiliki skor alfabet tertinggi' },
  { input: 'take me to semynak', expected: 'semynak', desc: 'semynak memiliki skor alfabet tertinggi' },
  { input: '', expected: '', desc: 'input kosong' },
  { input: 'a', expected: 'a', desc: 'hanya satu huruf' },
  { input: 'javascript', expected: 'javascript', desc: 'hanya satu kata' },
  { input: 'aa b', expected: 'aa', desc: 'skor sama, pilih kata pertama' },
  { input: 'abc cab', expected: 'abc', desc: 'skor sama, kata pertama dipilih' },
  { input: 'a bb ccc dddd', expected: 'dddd', desc: 'kata terpanjang memiliki skor terbesar' },
  { input: 'wyn nyx', expected: 'nyx', desc: 'skor sangat berdekatan, nyx(63) menang atas wyn(62)' }
]

testCases.forEach(({ input, expected, desc }, index) => {
  const result = highestScoringWord(input)
  const status = result === expected ? '✅ PASS' : '❌ FAIL'
  console.log(`Test Case #${index + 1}: ${status} - ${desc}`)
  if (status === '❌ FAIL') {
    console.log('Expected:', expected)
    console.log('Result  :', result)
  }
})
```

**Output yang diharapkan:**
```
Test Case #1:  ✅ PASS - taxi memiliki skor alfabet tertinggi
Test Case #2:  ✅ PASS - volcano memiliki skor alfabet tertinggi
Test Case #3:  ✅ PASS - semynak memiliki skor alfabet tertinggi
Test Case #4:  ✅ PASS - input kosong
Test Case #5:  ✅ PASS - hanya satu huruf
Test Case #6:  ✅ PASS - hanya satu kata
Test Case #7:  ✅ PASS - skor sama, pilih kata pertama
Test Case #8:  ✅ PASS - skor sama, kata pertama dipilih
Test Case #9:  ✅ PASS - kata terpanjang memiliki skor terbesar
Test Case #10: ✅ PASS - skor sangat berdekatan, nyx(63) menang atas wyn(62)
```

---

═══════════════════════════════════════════════════════════════════════

# 📊 PERBANDINGAN LENGKAP

═══════════════════════════════════════════════════════════════════════

| Aspek | ✅ Versi 1 | 🔄 Versi 2 | 🔀 Versi 3 | 🔀 Versi 4 |
|-------|:---------:|:---------:|:---------:|:---------:|
| Helper function | ✅ Ada | ❌ Tidak ada | ✅ Ada | ✅ Ada |
| Jumlah fungsi | 2 | 1 | 2 | 2 |
| Variabel tracker | `highestScore` + `result` | `highestScore` + `highestWord` | Tidak perlu | Tidak perlu |
| Loop utama | `for...of` | `for...of` nested | `.reduce()` | `.map()` + `.reduce()` |
| `getWordScore` dipanggil | 1x per kata | — | 2x per iterasi | 1x per kata |
| Reset `score = 0` | Di helper | Di inner loop | Tidak perlu | Tidak perlu |
| Gaya | Imperative | Imperative | Functional | Full functional |
| Kompleksitas waktu | O(n × m) | O(n × m) | O(n × m) | O(n × m) |
| Kemudahan baca | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Untuk pemula | ✅ Sangat cocok | ✅ Sangat cocok | ⚠️ Butuh pemahaman reduce | ⚠️ Butuh pemahaman map+reduce |

---

## 🎯 Decision Tree

```
Prioritas utama kamu apa?
│
├── READABILITY / BELAJAR
│   │
│   ├── Prefer helper function terpisah? ──▶ ✅ Versi 1
│   │                                         (nested loop + getWordScore())
│   │
│   └── Prefer satu fungsi saja?         ──▶ 🔄 Versi 2
│                                             (nested loop tanpa helper)
│
└── FUNCTIONAL PROGRAMMING STYLE
    │
    ├── Cukup kata pemenang saja?         ──▶ 🔀 Versi 3
    │                                         (.reduce() — ringkas dan elegan)
    │
    └── Ingin efisien + full functional?  ──▶ 🔀 Versi 4
                                              (.map() + .reduce() — skor dihitung sekali)

Default: ✅ Versi 1 — paling mudah dibaca dan di-debug ✅
```

---

## 🔑 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────────┐
│  💡 Semua Solusi Menghasilkan Output yang Sama                      │
│     Perbedaan hanya pada pendekatan, gaya, dan efisiensi            │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Tiga Hal yang Wajib Ada di Semua Versi                          │
│     1. Guard clause — if (!str) return ''                           │
│     2. ASCII conversion — charCodeAt(0) - 96                       │
│     3. Operator > bukan >= — agar kata pertama menang saat tie      │
├─────────────────────────────────────────────────────────────────────┤
│  💡 -Infinity vs Tanpa Initial Value                                │
│     Versi 1 & 2 pakai -Infinity sebagai inisialisasi highestScore   │
│     Versi 3 & 4 tidak perlu — .reduce() tanpa initial value         │
│     otomatis menjadikan elemen pertama sebagai nilai awal           │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Versi 3 vs Versi 4                                              │
│     Versi 3: getWordScore() dipanggil 2x per iterasi                │
│     Versi 4: .map() dulu → skor dihitung 1x per kata → lebih efisien│
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Versi | Highlight |
|-------|-----------|
| ✅ **Versi 1** | `getWordScore()` helper → `for...of words` → tracker `highestScore` + `result` |
| 🔄 **Versi 2** | Satu fungsi → `for...of words` → reset `score=0` per kata → tracker `highestScore` + `highestWord` |
| 🔀 **Versi 3** | `.split().reduce()` → tanpa initial value → ternary `word vs best` |
| 🔀 **Versi 4** | `.split().map({ word, score }).reduce()` → skor dihitung 1x → `.word` di akhir |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
