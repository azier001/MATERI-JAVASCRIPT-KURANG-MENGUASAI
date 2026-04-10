# 📅 18 Maret 2026 — Jurnal Belajar JavaScript

**Sumber Challenge:** [coddy.tech](https://coddy.tech)  
**Tingkat:** Easy  
**Kategori:** JavaScript Fundamentals / Basic Algorithms  
**Topik Utama:** Array, Loop, Functions  
**Topik Pendukung:** Accumulator Pattern, Index Formula, Array Methods (`.reduce()`)

---

## 📚 Daftar Isi

- 📋 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Memahami Soal](#memahami-soal)
- 🧪 [Test Cases](#test-cases)
- 🔄 [Eksplorasi Solusi](#eksplorasi-solusi)
- ⚖️ [Perbandingan Solusi](#perbandingan-solusi)
- 📝 [Pelajaran yang Didapat](#pelajaran-yang-didapat)

---

<a name="deskripsi-challenge"></a>
## 💸 Deskripsi Challenge: Calculating Financial Mistakes

> _"Setiap tahun kamu membuat kesalahan finansial. Semakin lama, semakin mahal harganya — biaya per kesalahan naik $100 setiap tahun. Tugasmu: hitung total kerugian dari semua kesalahan selama bertahun-tahun."_

---

### 🎯 Misi

Buat fungsi **`calculateFinancialMistakes`** yang menghitung total uang yang hilang akibat kesalahan finansial selama beberapa tahun.

```
Biaya per kesalahan naik $100 setiap tahun:

  Tahun 1       Tahun 2       Tahun 3
  $100/mistake  $200/mistake  $300/mistake
     │              │              │
     ▼              ▼              ▼
  3 mistakes    2 mistakes    1 mistake
  = $300        = $400        = $300
                                    │
                                    ▼
                              Total = $1000
```

---

### 📥 Input

| Parameter | Tipe | Deskripsi |
|---|---|---|
| `years` | `number` | Jumlah tahun |
| `mistakesPerYear` | `Array<number>` | Jumlah kesalahan tiap tahun |

---

### 📤 Output

| Kondisi | Return Value |
|---|---|
| Normal | Total uang yang hilang (number) |

---

### 💡 Contoh Nyata

```js
// Tahun 1: 3 × $100 = $300
// Tahun 2: 2 × $200 = $400
// Tahun 3: 1 × $300 = $300
calculateFinancialMistakes(3, [3, 2, 1])
// → 1000

// Tahun 1: 5 × $100 = $500
// Tahun 2: 5 × $200 = $1000
calculateFinancialMistakes(2, [5, 5])
// → 1500
```

---

<a name="memahami-soal"></a>
## 🧠 Memahami Soal

### Pola biaya per kesalahan

Biaya per kesalahan **naik $100 setiap tahun**, mulai dari $100 di tahun pertama:

```
Tahun 1 → $100 per mistake
Tahun 2 → $200 per mistake
Tahun 3 → $300 per mistake
Tahun n → n × $100 per mistake
```

### Rumus inti

```
totalLoss += mistakesPerYear[i] × (i + 1) × 100
```

> ⚠️ **Ingat:** index array dimulai dari `0`, tapi tahun dimulai dari `1`.  
> Jadi tahun ke-`i` (0-based) → biayanya `(i + 1) × 100`

### Cara berpikir menyelesaikan soal

1. Loop setiap tahun dari index `0` sampai `years - 1`
2. Hitung biaya per kesalahan di tahun itu: `(i + 1) × 100`
3. Kalikan dengan jumlah kesalahan di tahun itu: `mistakesPerYear[i]`
4. Tambahkan ke total keseluruhan
5. Return total setelah loop selesai

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Buatan Sendiri

**Test 1 — Satu tahun saja**
```js
console.log(calculateFinancialMistakes(1, [4]))
// Expected: 400
// Tahun 1: 4 × $100 = $400
```

**Test 2 — Tidak ada kesalahan**
```js
console.log(calculateFinancialMistakes(3, [0, 0, 0]))
// Expected: 0
```

**Test 3 — Kesalahan makin banyak tiap tahun**
```js
console.log(calculateFinancialMistakes(3, [1, 2, 3]))
// Expected: 100 + 400 + 900 = 1400
// Tahun 1: 1 × $100 = $100
// Tahun 2: 2 × $200 = $400
// Tahun 3: 3 × $300 = $900
```

**Test 4 — Kesalahan makin sedikit tiap tahun**
```js
console.log(calculateFinancialMistakes(3, [3, 2, 1]))
// Expected: 300 + 400 + 300 = 1000
```

**Test 5 — Jumlah kesalahan sama setiap tahun**
```js
console.log(calculateFinancialMistakes(4, [2, 2, 2, 2]))
// Expected: 200 + 400 + 600 + 800 = 2000
```

---

### Soal Asli

**Soal 1**
```js
console.log(calculateFinancialMistakes(3, [3, 2, 1]))
// Expected: 1000
```

**Soal 2**
```js
console.log(calculateFinancialMistakes(2, [5, 5]))
// Expected: 1500
```

**Soal 3**
```js
console.log(calculateFinancialMistakes(1, [10]))
// Expected: 1000
```

---

<a name="eksplorasi-solusi"></a>
## 🔄 Eksplorasi Solusi

### Versi 0 — Percobaan Pertama (for...of)

```js
function calculateFinancialMistakes(years, mistakesPerYear) {
  if (years < 1) return 0;          // (1) guard clause untuk input tidak valid

  let cost = 0;                      // (2) akumulator biaya per kesalahan
  let total = 0;                     // (3) akumulator total kerugian

  for (const mistakes of mistakesPerYear) {  // (4) iterasi langsung elemen array
    cost += 100;                              // (5) naikkan biaya $100 setiap iterasi
    total += mistakes * cost;                 // (6) tambahkan kerugian tahun ini
  }

  return total;
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `if (years < 1) return 0` | Guard clause — jika tahun kurang dari 1, langsung return 0 |
| 2 | `let cost = 0` | Akumulator biaya, akan naik $100 setiap iterasi |
| 3 | `let total = 0` | Wadah untuk total kerugian |
| 4 | `for (const mistakes of mistakesPerYear)` | Iterasi langsung ke nilai elemen — tidak perlu index |
| 5 | `cost += 100` | Sama seperti versi berikutnya — logika akumulasi benar ✅ |
| 6 | `mistakes * cost` | `mistakes` sudah tersedia langsung dari `for...of` |

**Alur eksekusi dengan `calculateFinancialMistakes(3, [3, 2, 1])`:**
```
mistakes=3: cost = 100, total = 0 + 3×100   = 300
mistakes=2: cost = 200, total = 300 + 2×200 = 700
mistakes=1: cost = 300, total = 700 + 1×300 = 1000
return 1000 ✅
```

**✅ Yang sudah benar:**
- Logika akumulasi `cost` dan `total` benar
- `for...of` membuat kode ringkas — tidak perlu index secara eksplisit

**⚠️ Yang bisa diperbaiki:**
- Parameter `years` tidak digunakan — iterasi dikontrol oleh panjang array, bukan `years`
- Jika `years = 2` tapi array punya 5 elemen, semua 5 elemen tetap dihitung — tidak terkontrol
- `for...of` tidak memberi akses ke index, sehingga tidak bisa dipakai jika index dibutuhkan

---

### Versi 1 — Running Total dengan Accumulator

```js
function calculateFinancialMistakes(years, mistakesPerYear) {
  let cost = 0;      // (1) akumulator biaya per kesalahan
  let total = 0;     // (2) akumulator total kerugian

  for (let i = 0; i < years; i++) {   // (3) loop sebanyak `years`
    cost += 100;                       // (4) naikkan biaya $100 setiap tahun
    total += mistakesPerYear[i] * cost; // (5) tambahkan kerugian tahun ini
  }

  return total;
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `let cost = 0` | Dimulai dari 0, akan naik $100 setiap iterasi |
| 2 | `let total = 0` | Wadah untuk menampung total kerugian |
| 3 | `for (let i = 0; i < years; i++)` | Loop dikontrol oleh parameter `years` |
| 4 | `cost += 100` | Dijalankan **sebelum** kalkulasi — jadi tahun 1 cost = 100, tahun 2 cost = 200, dst |
| 5 | `mistakesPerYear[i] * cost` | Kerugian tahun ini = jumlah kesalahan × biaya per kesalahan |

**Alur eksekusi dengan `calculateFinancialMistakes(3, [3, 2, 1])`:**
```
i=0: cost = 0+100 = 100,  total = 0 + 3×100 = 300
i=1: cost = 100+100 = 200, total = 300 + 2×200 = 700
i=2: cost = 200+100 = 300, total = 700 + 1×300 = 1000
return 1000 ✅
```

**✅ Kelebihan:**
- Mudah dipahami — ikuti alur pikiran yang natural
- Tidak perlu tahu rumus matematika khusus

**⚠️ Catatan:**
- Pakai dua variabel akumulator (`cost` dan `total`) — lebih banyak state yang perlu dilacak

---

### Versi 2 — Formula Langsung dari Index

```js
function calculateFinancialMistakes(years, mistakesPerYear) {
  let totalLoss = 0;                           // (1) satu akumulator saja

  for (let i = 0; i < years; i++) {
    const mistakeCost = (i + 1) * 100;         // (2) formula: tahun ke-(i+1), biaya (i+1)×$100
    const yearlyLoss = mistakesPerYear[i] * mistakeCost; // (3) kerugian tahun ini
    totalLoss += yearlyLoss;                   // (4) tambahkan ke total
  }

  return totalLoss;
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `let totalLoss = 0` | Satu akumulator — lebih sederhana dari Versi 1 |
| 2 | `(i + 1) * 100` | Rumus langsung dari index: `i=0` → tahun 1 → $100, `i=1` → tahun 2 → $200 |
| 3 | `mistakesPerYear[i] * mistakeCost` | Kerugian tahun ini dengan nama variabel yang deskriptif |
| 4 | `totalLoss += yearlyLoss` | Akumulasi ke total |

**Alur eksekusi dengan `calculateFinancialMistakes(3, [3, 2, 1])`:**
```
i=0: mistakeCost = (0+1)×100 = 100,  yearlyLoss = 3×100 = 300,  totalLoss = 300
i=1: mistakeCost = (1+1)×100 = 200,  yearlyLoss = 2×200 = 400,  totalLoss = 700
i=2: mistakeCost = (2+1)×100 = 300,  yearlyLoss = 1×300 = 300,  totalLoss = 1000
return 1000 ✅
```

**✅ Kelebihan:**
- Hanya satu akumulator (`totalLoss`)
- Naming deskriptif: `mistakeCost` dan `yearlyLoss` — kode terbaca seperti kalimat
- Ini yang disebut **self-documenting code**

**Perbedaan kunci dengan Versi 1:**
```js
// Versi 1 — akumulasi bertahap
cost += 100;  // cost: 100 → 200 → 300 (perlu dilacak terus)

// Versi 2 — formula langsung
const mistakeCost = (i + 1) * 100;  // dihitung fresh tiap iterasi, tidak ada state
```

---

### Versi 3 — Functional Style dengan `.reduce()`

```js
const calculateFinancialMistakes = (years, mistakesPerYear) => {
  return mistakesPerYear.reduce((total, mistakes, index) => { // (1) reduce dengan 3 argumen
    const mistakeCost = (index + 1) * 100;                    // (2) sama seperti Versi 2
    const yearlyLoss = mistakes * mistakeCost;                 // (3) pakai `mistakes` langsung
    return total + yearlyLoss;                                 // (4) return nilai accumulator baru
  }, 0);                                                       // (5) nilai awal total = 0
};
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `.reduce((total, mistakes, index) => ...)` | `total` = accumulator, `mistakes` = elemen saat ini, `index` = posisinya |
| 2 | `(index + 1) * 100` | Sama persis dengan Versi 2 — index dipakai sebagai pengganti `i` |
| 3 | `mistakes * mistakeCost` | Tidak perlu `mistakesPerYear[index]` — nilai sudah tersedia di parameter `mistakes` |
| 4 | `return total + yearlyLoss` | Di `.reduce()`, kita return nilai accumulator yang **baru** — bukan pakai `+=` |
| 5 | `}, 0)` | Nilai awal accumulator `total` = 0 |

**Alur eksekusi dengan `calculateFinancialMistakes(3, [3, 2, 1])`:**
```
index=0: mistakes=3, mistakeCost=100, yearlyLoss=300  → return 0+300   = 300
index=1: mistakes=2, mistakeCost=200, yearlyLoss=400  → return 300+400 = 700
index=2: mistakes=1, mistakeCost=300, yearlyLoss=300  → return 700+300 = 1000
hasil akhir: 1000 ✅
```

**Perbedaan kunci `.reduce()` vs `for` loop:**
```js
// for loop — kamu kendalikan iterasi sendiri
let total = 0;
for (let i = 0; i < years; i++) {
  total += mistakesPerYear[i] * (i + 1) * 100;
}
return total;

// .reduce() — JS yang kendalikan iterasi
return mistakesPerYear.reduce((total, mistakes, index) => {
  return total + mistakes * (index + 1) * 100;
}, 0);
```

**✅ Kelebihan:**
- Tidak ada variabel mutable di luar (`let total`) — lebih "pure"
- Gaya functional programming yang modern
- Cocok dipadukan dengan arrow function

**⚠️ Catatan:**
- Parameter `years` tidak digunakan — iterasi dikontrol oleh panjang array
- Untuk pemula, alur `.reduce()` perlu sedikit waktu untuk terbiasa

---

<a name="perbandingan-solusi"></a>
## ⚖️ Perbandingan Solusi

### 📊 Tabel Perbandingan

| Aspek | Versi 1 — Accumulator | Versi 2 — Index Formula | Versi 3 — `.reduce()` |
|---|---|---|---|
| Pendekatan | Imperative | Imperative | Declarative |
| Jumlah variabel mutable | 2 (`cost`, `total`) | 1 (`totalLoss`) | 0 |
| Pakai `years` | ✅ ya | ✅ ya | ❌ tidak |
| Keterbacaan pemula | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Gaya modern | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

> 💡 Secara logika, ketiga solusi **identik** dan menghasilkan output yang sama.

---

<a name="pelajaran-yang-didapat"></a>
## 📝 Pelajaran yang Didapat

### 1. Dua cara menghitung biaya per tahun

```js
// Cara 1 — Accumulator (tambah terus)
cost += 100;  // 100 → 200 → 300 → ...

// Cara 2 — Formula dari index (hitung langsung)
const mistakeCost = (i + 1) * 100;  // selalu fresh, tidak bergantung state sebelumnya
```

Cara 2 lebih **stateless** — tidak perlu melacak nilai `cost` dari iterasi sebelumnya.

---

### 2. `.reduce()` butuh tiga argumen callback

```js
array.reduce((accumulator, currentValue, index) => {
  // accumulator = nilai yang dikumpulkan
  // currentValue = elemen saat ini
  // index = posisi elemen saat ini (0-based)
  return accumulator + sesuatu;
}, nilaiAwal);
```

> ⚠️ Di dalam `.reduce()`, gunakan `return` — bukan `+=`.  
> `total += x` mengubah variabel. `return total + x` mengembalikan nilai baru.

---

### 3. Index 0-based vs tahun 1-based

```js
// Index array dimulai dari 0
// Tahun dimulai dari 1
// Konversi: tahun = index + 1

i = 0 → tahun 1 → biaya = (0+1) × 100 = $100
i = 1 → tahun 2 → biaya = (1+1) × 100 = $200
i = 2 → tahun 3 → biaya = (2+1) × 100 = $300
```

---

### 4. Self-documenting code dengan naming yang baik

```js
// ❌ Kurang deskriptif
total += mistakesPerYear[i] * cost;

// ✅ Self-documenting — terbaca seperti kalimat
const mistakeCost = (i + 1) * 100;
const yearlyLoss = mistakesPerYear[i] * mistakeCost;
totalLoss += yearlyLoss;
```

---

### 5. Imperative vs Declarative

| | Imperative | Declarative |
|---|---|---|
| Cara | `for` loop manual | `.reduce()`, `.map()`, `.filter()` |
| Kendali | Kamu yang iterasi sendiri | JS yang iterasi |
| Cocok untuk | Pemula, mudah di-debug | Kode ringkas dan modern |
| Contoh | `for (let i = 0; ...)` | `array.reduce(...)` |
