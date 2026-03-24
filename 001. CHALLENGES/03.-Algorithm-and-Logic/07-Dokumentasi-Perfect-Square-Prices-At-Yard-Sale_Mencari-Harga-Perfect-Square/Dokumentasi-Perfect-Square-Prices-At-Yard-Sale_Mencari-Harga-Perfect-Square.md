# 🔢 Perfect Square Prices at Yard Sale — Ringkasan Algoritma Semua Versi

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║       🔢 RINGKASAN ALGORITMA — COMPLETE REFERENCE 🔢                    ║
║         Versi Saya (Number.isInteger) · Versi Coddy (Math.floor)        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Versi](https://img.shields.io/badge/Versi-2%20Solusi-success?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Coddy-blue?style=for-the-badge)

---

## 🎯 Tujuan

- ✅ Ringkasan challenge dan kriteria dalam satu tempat
- ✅ Ringkasan algoritma 2 versi secara detail
- ✅ Perbandingan pendekatan `Number.isInteger` vs `Math.floor`
- ✅ Quick reference untuk review

---

## 🧭 Quick Jump

| 🧩 Challenge | ✅ Versi 1 | ⚡ Versi 2 | 🧪 Test Cases | 📊 Perbandingan |
|:------------:|:---------:|:---------:|:-------------:|:---------------:|
| [Jump](#-deskripsi-challenge) | [Jump](#-versi-1-numberisinteger-versi-saya) | [Jump](#-versi-2-mathfloor-coddy) | [Jump](#-test-cases-lengkap) | [Jump](#-perbandingan-lengkap) |

---

# 🧩 DESKRIPSI CHALLENGE

## 📋 Soal

> ### 📋 Deskripsi
>
> Buat function **`findPerfectPrices`** yang menerima satu parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `prices` | `array` | Array berisi harga-harga item yard sale |
>
> Fungsi menyaring harga-harga yang merupakan **perfect square**.

---

## 🔍 Kriteria

> **Apa itu Perfect Square?**
> Perfect square adalah angka yang merupakan hasil perkalian suatu bilangan bulat dengan dirinya sendiri.
> - 1 = 1×1
> - 4 = 2×2
> - 9 = 3×3
> - 16 = 4×4
> - 25 = 5×5
>
> **Return:** Array berisi harga-harga yang merupakan perfect square. Format: `[4, 9, 16]`

---

## 📊 Contoh-contoh

```javascript
// ✅ Normal case — beberapa harga adalah perfect square
console.log(findPerfectPrices([1, 2, 3, 4, 5, 6, 7, 8, 9]))
// → [1, 4, 9]
```

```javascript
// ✅ Normal case — mix harga besar dan kecil
console.log(findPerfectPrices([10, 16, 25, 30, 36]))
// → [16, 25, 36]
```

```javascript
// ✅ Edge case — tidak ada perfect square
console.log(findPerfectPrices([2, 3, 5, 7, 11]))
// → []
```

```javascript
// ✅ Edge case — semua adalah perfect square
console.log(findPerfectPrices([1, 4, 9, 16, 25]))
// → [1, 4, 9, 16, 25]
```

---

### Simulasi Pengecekan Perfect Square:

```
prices = [1, 2, 3, 4, 9]

√1 = 1.0   → bilangan bulat ✅ → masuk hasil
√2 = 1.414 → bukan bulat   ❌ → dibuang
√3 = 1.732 → bukan bulat   ❌ → dibuang
√4 = 2.0   → bilangan bulat ✅ → masuk hasil
√9 = 3.0   → bilangan bulat ✅ → masuk hasil

Hasil: [1, 4, 9] ✅
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter | `prices` — array berisi harga-harga |
| Output | Array berisi harga yang merupakan perfect square |
| Cara cek | Akar kuadrat dari harga harus bilangan bulat |
| Method utama | `Math.sqrt()` untuk menghitung akar kuadrat |
| Filter | `.filter()` untuk menyaring elemen array |

---

> 💡 **Aturan Sederhana:** Sebuah angka adalah perfect square jika hasil `Math.sqrt()`-nya adalah bilangan bulat.

---

## ⚡ Quick Test

```javascript
// Test 1 — mix harga
console.log(findPerfectPrices([1, 2, 3, 4, 5, 6, 7, 8, 9]))
// → [1, 4, 9]
```

```javascript
// Test 2 — harga besar
console.log(findPerfectPrices([10, 16, 25, 30, 36]))
// → [16, 25, 36]
```

```javascript
// Test 3 — tidak ada perfect square
console.log(findPerfectPrices([2, 3, 5, 7, 11]))
// → []
```

---

═══════════════════════════════════════════════════════════════════════

# ✅ VERSI 1: Number.isInteger (Versi Saya)

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Clean%20%7C%20Readable-green?style=flat-square)
![Style](https://img.shields.io/badge/Style-Declarative-orange?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
function findPerfectPrices(prices) {
    return prices.filter((price) => Number.isInteger(Math.sqrt(price)));
}
```

</details>

### **Konsep Inti:**
```
Iterasi setiap price di dalam prices menggunakan .filter()
Untuk setiap price:
  Hitung akar kuadratnya dengan Math.sqrt(price)
  Cek apakah hasilnya bilangan bulat dengan Number.isInteger()
  Jika true  → price lolos filter (masuk hasil)
  Jika false → price dibuang
Return array berisi price yang lolos
```

### **Step-by-Step (Detail):**

#### 🔵 Filter Array:

1. **`prices.filter((price) => ...)`**
   - `.filter()` mengiterasi setiap elemen array
   - Elemen yang membuat callback return `true` akan masuk ke array hasil
   - Elemen yang membuat callback return `false` akan dibuang
   - Tidak mengubah array asli

#### 🟡 Hitung Akar Kuadrat:

2. **`Math.sqrt(price)`**
   - Menghitung akar kuadrat dari `price`
   - Perfect square → hasilnya bilangan bulat (contoh: `Math.sqrt(9) = 3`)
   - Bukan perfect square → hasilnya desimal (contoh: `Math.sqrt(10) = 3.1622...`)

#### 🟢 Cek Bilangan Bulat:

3. **`Number.isInteger(Math.sqrt(price))`**
   - Mengecek apakah hasil `Math.sqrt()` adalah bilangan bulat
   - Return `true` jika bulat → price adalah perfect square
   - Return `false` jika desimal → price bukan perfect square
   - Contoh:
   ```javascript
   Number.isInteger(Math.sqrt(9))  // true  ✅ → 3 adalah bilangan bulat
   Number.isInteger(Math.sqrt(10)) // false ❌ → 3.1622... bukan bilangan bulat
   Number.isInteger(Math.sqrt(16)) // true  ✅ → 4 adalah bilangan bulat
   Number.isInteger(Math.sqrt(15)) // false ❌ → 3.8729... bukan bilangan bulat
   ```

### **Visualisasi untuk `prices = [1, 2, 3, 4, 9]`:**

```
.filter() iterasi satu per satu:

─────────────────────────────────────────────
price = 1
  Math.sqrt(1) = 1
  Number.isInteger(1) → true ✅ → masuk hasil
─────────────────────────────────────────────
price = 2
  Math.sqrt(2) = 1.4142...
  Number.isInteger(1.4142...) → false ❌ → dibuang
─────────────────────────────────────────────
price = 3
  Math.sqrt(3) = 1.7320...
  Number.isInteger(1.7320...) → false ❌ → dibuang
─────────────────────────────────────────────
price = 4
  Math.sqrt(4) = 2
  Number.isInteger(2) → true ✅ → masuk hasil
─────────────────────────────────────────────
price = 9
  Math.sqrt(9) = 3
  Number.isInteger(3) → true ✅ → masuk hasil
─────────────────────────────────────────────

Hasil: [1, 4, 9] ✅
```

### **Keywords:**
- 🔵 **`Math.sqrt()`** — menghitung akar kuadrat dari sebuah angka
- 🟢 **`Number.isInteger()`** — mengecek apakah angka adalah bilangan bulat
- 🔄 **`.filter()`** — menyaring elemen array berdasarkan kondisi
- ✨ **One-liner** — seluruh logika dalam satu baris yang ringkas dan readable

### **Kapan Pakai:**
- ✅ Ingin kode yang paling ringkas dan langsung terbaca maksudnya
- ✅ Solusi tanpa perlu variabel tambahan
- ✅ Cocok sebagai solusi final yang clean

### **Pitfalls (Jebakan Umum):**

**1) ❌ Terbalik — mengecek price bukan sqrt-nya**
```javascript
// ❌ SALAH — mengecek apakah price itu sendiri integer (semua harga pasti integer!)
return prices.filter((price) => Number.isInteger(price));

// ✅ BENAR — yang dicek adalah hasil Math.sqrt() dari price
return prices.filter((price) => Number.isInteger(Math.sqrt(price)));
```

**2) ❌ Hardcode daftar perfect square**
```javascript
// ❌ SALAH — hanya bisa sampai 15² = 225, gagal untuk harga besar
const squareNumbers = [0,1,2,...,15].map(n => n * n);
return prices.filter(price => squareNumbers.includes(price));

// ✅ BENAR — bisa handle angka sebesar apapun
return prices.filter((price) => Number.isInteger(Math.sqrt(price)));
```

**3) ❌ Lupa Math.sqrt() — langsung pakai Number.isInteger(price)**
```javascript
// ❌ SALAH — semua bilangan bulat akan lolos, bukan hanya perfect square
return prices.filter((price) => Number.isInteger(price));

// ✅ BENAR — Math.sqrt() dulu, baru cek isInteger
return prices.filter((price) => Number.isInteger(Math.sqrt(price)));
```

### **💡 Insight Penting:**

> **Kenapa `Number.isInteger(Math.sqrt(price))` bisa mengecek perfect square?**
> Karena definisi perfect square adalah angka yang akar kuadratnya merupakan bilangan bulat. `Math.sqrt(9) = 3` (bulat) → perfect square. `Math.sqrt(10) = 3.1622...` (desimal) → bukan perfect square. `Number.isInteger()` langsung mengecek properti ini dengan tepat.

> **Kenapa versi ini lebih baik dari hardcode?**
> Karena tidak ada batas angka. Hardcode sampai 15² hanya bisa menangani harga hingga 225. Versi ini bisa menangani harga berapapun — 900, 10000, 1000000 — selama akar kuadratnya bilangan bulat.

---

═══════════════════════════════════════════════════════════════════════

# ⚡ VERSI 2: Math.floor (Coddy)

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Eksplisit%20%7C%20Bertahap-blue?style=flat-square)
![Style](https://img.shields.io/badge/Style-Imperative-9cf?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
function findPerfectPrices(prices) {
    return prices.filter(price => {
        const sqrt = Math.sqrt(price);
        return sqrt === Math.floor(sqrt);
    });
}
```

</details>

### **Konsep Inti:**
```
Iterasi setiap price di dalam prices menggunakan .filter()
Untuk setiap price:
  Hitung akar kuadratnya → simpan ke variabel sqrt
  Bulatkan sqrt ke bawah dengan Math.floor()
  Bandingkan: apakah sqrt === Math.floor(sqrt)?
  Jika sama  → artinya sqrt sudah bulat → perfect square ✅
  Jika beda  → artinya sqrt punya desimal → bukan perfect square ❌
Return array berisi price yang lolos
```

### **Step-by-Step (Detail):**

#### 🔵 Filter Array:

1. **`prices.filter(price => { ... })`**
   - Sama dengan Versi 1, mengiterasi setiap elemen
   - Bedanya: callback menggunakan block `{}` karena ada beberapa baris

#### 🟡 Simpan Hasil Sqrt:

2. **`const sqrt = Math.sqrt(price)`**
   - Menghitung akar kuadrat dan menyimpannya ke variabel `sqrt`
   - Disimpan ke variabel agar tidak menghitung `Math.sqrt()` dua kali
   - Contoh: `price = 9` → `sqrt = 3`

#### 🟢 Bandingkan dengan Math.floor:

3. **`return sqrt === Math.floor(sqrt)`**
   - `Math.floor()` membulatkan angka ke bawah ke bilangan bulat terdekat
   - Jika `sqrt` sudah bilangan bulat → `Math.floor(sqrt)` sama dengan `sqrt` → `true`
   - Jika `sqrt` punya desimal → `Math.floor(sqrt)` lebih kecil dari `sqrt` → `false`
   - Contoh:
   ```javascript
   // sqrt = 3 (perfect square)
   Math.floor(3) === 3       // true  ✅ → 3 === 3

   // sqrt = 3.1622... (bukan perfect square)
   Math.floor(3.1622) === 3.1622 // false ❌ → 3 !== 3.1622
   ```

### **Visualisasi untuk `prices = [1, 2, 3, 4, 9]`:**

```
.filter() iterasi satu per satu:

─────────────────────────────────────────────
price = 1
  sqrt = Math.sqrt(1) = 1
  Math.floor(1) = 1
  1 === 1 → true ✅ → masuk hasil
─────────────────────────────────────────────
price = 2
  sqrt = Math.sqrt(2) = 1.4142...
  Math.floor(1.4142...) = 1
  1.4142... === 1 → false ❌ → dibuang
─────────────────────────────────────────────
price = 3
  sqrt = Math.sqrt(3) = 1.7320...
  Math.floor(1.7320...) = 1
  1.7320... === 1 → false ❌ → dibuang
─────────────────────────────────────────────
price = 4
  sqrt = Math.sqrt(4) = 2
  Math.floor(2) = 2
  2 === 2 → true ✅ → masuk hasil
─────────────────────────────────────────────
price = 9
  sqrt = Math.sqrt(9) = 3
  Math.floor(3) = 3
  3 === 3 → true ✅ → masuk hasil
─────────────────────────────────────────────

Hasil: [1, 4, 9] ✅
```

### **Keywords:**
- 🔵 **`Math.sqrt()`** — menghitung akar kuadrat dari sebuah angka
- 🟡 **`const sqrt`** — variabel untuk menyimpan hasil sqrt agar tidak dihitung dua kali
- 🟢 **`Math.floor()`** — membulatkan angka ke bawah ke bilangan bulat terdekat
- ⚖️ **`===`** — strict equality untuk membandingkan sqrt dengan floor-nya
- 🔄 **`.filter()`** — menyaring elemen array berdasarkan kondisi

### **Kapan Pakai:**
- ✅ Ingin kode yang lebih eksplisit dan mudah di-debug
- ✅ Lebih nyaman membaca langkah-langkah terpisah
- ✅ Referensi solusi resmi Coddy

### **Pitfalls (Jebakan Umum):**

**1) ❌ Lupa menyimpan sqrt ke variabel — menghitung dua kali**
```javascript
// ❌ TIDAK EFISIEN — Math.sqrt() dipanggil dua kali untuk angka yang sama
return Math.sqrt(price) === Math.floor(Math.sqrt(price));

// ✅ LEBIH BAIK — simpan dulu ke variabel, efisien
const sqrt = Math.sqrt(price);
return sqrt === Math.floor(sqrt);
```

**2) ❌ Pakai Math.ceil() atau Math.round() bukan Math.floor()**
```javascript
// ❌ SALAH — Math.ceil() membulatkan ke atas, hasil berbeda
return sqrt === Math.ceil(sqrt);  // Math.ceil(3.1) = 4, bukan 3

// ❌ SALAH — Math.round() membulatkan ke terdekat, bisa memberi false positive
return sqrt === Math.round(sqrt); // Math.round(3.5) = 4, bukan 3

// ✅ BENAR — Math.floor() selalu bulatkan ke bawah
return sqrt === Math.floor(sqrt);
```

**3) ❌ Pakai == bukan ===**
```javascript
// ⚠️ HINDARI — loose equality bisa menyebabkan bug tak terduga
return sqrt == Math.floor(sqrt);

// ✅ LEBIH AMAN — strict equality
return sqrt === Math.floor(sqrt);
```

### **💡 Insight Penting:**

> **Kenapa `sqrt === Math.floor(sqrt)` bisa mengecek perfect square?**
> `Math.floor()` membulatkan angka ke bawah. Jika `sqrt` sudah bilangan bulat (misal `3`), maka `Math.floor(3) = 3` — sama persis. Tapi jika `sqrt` punya desimal (misal `3.1622`), maka `Math.floor(3.1622) = 3` — berbeda. Perbandingan `===` mendeteksi perbedaan ini.

> **Apa bedanya `Math.floor` vs `Number.isInteger`?**
> Secara hasil, keduanya sama untuk kasus ini. `Number.isInteger()` lebih langsung dan ekspresif ("apakah ini integer?"). `Math.floor()` lebih eksplisit langkah-langkahnya ("bulatkan lalu bandingkan"). Pilih sesuai preferensi.

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
const testCases = [
  {
    prices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: [1, 4, 9],
    desc: "Normal case — mix angka kecil"
  },
  {
    prices: [10, 16, 25, 30, 36],
    expected: [16, 25, 36],
    desc: "Normal case — mix harga besar dan kecil"
  },
  {
    prices: [100, 144, 169, 200, 225],
    expected: [100, 144, 169, 225],
    desc: "Normal case — perfect square angka besar"
  },
  {
    prices: [2, 3, 5, 7, 11],
    expected: [],
    desc: "Edge case — tidak ada perfect square"
  },
  {
    prices: [1, 4, 9, 16, 25],
    expected: [1, 4, 9, 16, 25],
    desc: "Edge case — semua adalah perfect square"
  },
  {
    prices: [0],
    expected: [0],
    desc: "Edge case — angka 0 (0 = 0×0)"
  }
]

testCases.forEach(({ prices, expected, desc }, index) => {
  const result = findPerfectPrices(prices)
  const pass = JSON.stringify(result) === JSON.stringify(expected)
  const status = pass ? '✅ PASS' : '❌ FAIL'

  console.log(`Test Case #${index + 1}: ${status} - ${desc}`)
  console.log(`  findPerfectPrices([${prices}]) → [${result}]`)

  if (!pass) {
    console.log(`  Expected: [${expected}]`)
    console.log(`  Result  : [${result}]`)
  }
})
```

**Output yang diharapkan:**
```
Test Case #1: ✅ PASS - Normal case — mix angka kecil
  findPerfectPrices([1, 2, 3, 4, 5, 6, 7, 8, 9]) → [1, 4, 9]
Test Case #2: ✅ PASS - Normal case — mix harga besar dan kecil
  findPerfectPrices([10, 16, 25, 30, 36]) → [16, 25, 36]
Test Case #3: ✅ PASS - Normal case — perfect square angka besar
  findPerfectPrices([100, 144, 169, 200, 225]) → [100, 144, 169, 225]
Test Case #4: ✅ PASS - Edge case — tidak ada perfect square
  findPerfectPrices([2, 3, 5, 7, 11]) → []
Test Case #5: ✅ PASS - Edge case — semua adalah perfect square
  findPerfectPrices([1, 4, 9, 16, 25]) → [1, 4, 9, 16, 25]
Test Case #6: ✅ PASS - Edge case — angka 0 (0 = 0×0)
  findPerfectPrices([0]) → [0]
```

---

═══════════════════════════════════════════════════════════════════════

# 📊 PERBANDINGAN LENGKAP

═══════════════════════════════════════════════════════════════════════

| Aspek | ✅ Versi 1 (Number.isInteger) | ⚡ Versi 2 (Math.floor / Coddy) |
|-------|:-----------------------------:|:--------------------------------:|
| Panjang kode | 1 baris | 4 baris |
| Variabel tambahan | Tidak ada | `const sqrt` |
| Cara cek | `Number.isInteger()` langsung | Bandingkan `sqrt === Math.floor(sqrt)` |
| Keterbacaan | ✅ Sangat ekspresif | ✅ Lebih eksplisit langkah-langkahnya |
| Performa | Sama | Sama (sqrt tidak dihitung dua kali) |
| Hasil | Sama ✅ | Sama ✅ |

---

## 🔑 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────────┐
│  💡 Dua Solusi Menghasilkan Output yang Sama                        │
│     Perbedaan hanya pada cara mengecek bilangan bulat               │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Perfect Square = Akar Kuadratnya Bilangan Bulat                 │
│     Math.sqrt(9) = 3 → bulat → perfect square ✅                   │
│     Math.sqrt(10) = 3.1622... → desimal → bukan perfect square ❌  │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Jangan Hardcode Daftar Perfect Square                           │
│     Gunakan Math.sqrt() agar bisa handle angka sebesar apapun       │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Number.isInteger() vs Math.floor()                              │
│     Keduanya valid — pilih sesuai preferensi dan keterbacaan        │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Pilih Sesuai Gaya                                               │
│     Suka ringkas dan ekspresif  → Versi 1 (Number.isInteger)        │
│     Suka eksplisit dan bertahap → Versi 2 (Math.floor)              │
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Versi | Highlight |
|-------|-----------|
| ✅ **Versi 1 (Number.isInteger)** | `prices.filter(price => Number.isInteger(Math.sqrt(price)))` |
| ⚡ **Versi 2 (Math.floor / Coddy)** | `const sqrt = Math.sqrt(price)` → `return sqrt === Math.floor(sqrt)` |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
