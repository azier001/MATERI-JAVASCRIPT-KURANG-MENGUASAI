# 📋 Garden Plot Insurance Assessment — Ringkasan Algoritma Semua Versi

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║       📋 RINGKASAN ALGORITMA — COMPLETE REFERENCE 📋                    ║
║         Versi Saya (3 if terpisah) · Versi Coddy (else if)              ║
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
- ✅ Perbandingan pendekatan `if` terpisah vs `else if`
- ✅ Quick reference untuk review

---

## 🧭 Quick Jump

| 🧩 Challenge | ✅ Versi 1 | ⚡ Versi 2 | 🧪 Test Cases | 📊 Perbandingan |
|:------------:|:---------:|:---------:|:-------------:|:---------------:|
| [Jump](#-deskripsi-challenge) | [Jump](#-versi-1-3-if-terpisah) | [Jump](#-versi-2-else-if-coddy) | [Jump](#-test-cases-lengkap) | [Jump](#-perbandingan-lengkap) |

---

# 🧩 DESKRIPSI CHALLENGE

## 📋 Soal

> ### 📋 Deskripsi
>
> Buat function **`assessPlot`** yang menerima dua parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `plotName` | `string` | Nama plot yang akan divalidasi |
> | `plotValue` | `number` | Nilai plot dalam dollar untuk dihitung biaya asuransinya |
>
> Fungsi melakukan **dua hal sekaligus**: validasi nama plot dan menghitung biaya asuransi.

---

## 🔍 Kriteria

> **1. Validasi nama plot (`isValid`)**
> Nama plot harus mengikuti aturan identifier JavaScript:
> - Hanya boleh mengandung huruf, angka, `_`, atau `$`
> - Tidak boleh diawali dengan angka
> → return `true` jika valid, `false` jika tidak
>
> **2. Hitung biaya asuransi (`cost`)**
> Menggunakan sistem tier:
> - 2% untuk $1.000 pertama
> - 3% untuk $4.000 berikutnya ($1.001 – $5.000)
> - 5% untuk sisa di atas $5.000
> → dibulatkan ke 2 desimal
>
> **3. Return objek** `{ isValid, cost }`

---

## 📊 Contoh-contoh

```javascript
// ✅ Normal case 1 — nilai di tier 1 dan 2
assessPlot("plot123", 2500)
// → { isValid: true, cost: 65 }
```

```javascript
// ✅ Normal case 2 — nilai melewati semua tier
assessPlot("myGarden", 7000)
// → { isValid: true, cost: 240 }
```

```javascript
// ✅ Edge case — nama tidak valid (diawali angka)
assessPlot("1garden", 2500)
// → { isValid: false, cost: 65 }
```

```javascript
// ✅ Edge case — nama dengan karakter tidak diizinkan
assessPlot("my-plot", 1000)
// → { isValid: false, cost: 20 }
```

---

### Simulasi Perhitungan Tier:

```
plotValue = 2500

Tier 1 : $1.000 × 2% = $20
Tier 2 : $1.500 × 3% = $45  ← (2500 - 1000)
Tier 3 : tidak kena
Total  : $65 ✅

─────────────────────────────────────

plotValue = 7000

Tier 1 : $1.000 × 2%  = $20
Tier 2 : $4.000 × 3%  = $120
Tier 3 : $2.000 × 5%  = $100  ← (7000 - 5000)
Total  : $240 ✅
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter 1 | `plotName` — string nama plot |
| Parameter 2 | `plotValue` — nilai plot dalam dollar |
| Output | Objek `{ isValid: boolean, cost: number }` |
| Validasi | Aturan identifier JavaScript via Regex |
| Perhitungan | Sistem tier kumulatif 3 tingkat |
| Pembulatan | `Math.round(cost * 100) / 100` |

---

> 💡 **Aturan Sederhana:** Validasi dan cost bersifat independen — keduanya selalu dihitung terlepas dari valid tidaknya nama plot.

---

## ⚡ Quick Test

```javascript
// Test 1 — nama valid, nilai di tier 1 dan 2
console.log(assessPlot("plot123", 2500))
// → { isValid: true, cost: 65 }
```

```javascript
// Test 2 — nama valid, nilai melewati semua tier
console.log(assessPlot("myGarden", 7000))
// → { isValid: true, cost: 240 }
```

```javascript
// Test 3 — nama tidak valid (diawali angka)
console.log(assessPlot("1garden", 2500))
// → { isValid: false, cost: 65 }
```

---

═══════════════════════════════════════════════════════════════════════

# ✅ VERSI 1: 3 if Terpisah

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Pemula%20%7C%20Bertahap-green?style=flat-square)
![Style](https://img.shields.io/badge/Style-Imperative-orange?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
function assessPlot(plotName, value) {
  const pattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  const isValid = pattern.test(plotName);
  let cost = 0;

  if (value > 1000) {
    cost += 1000 * 0.02;
  } else {
    cost += value * 0.02;
  }

  if (value > 5000) {
    cost += 4000 * 0.03;
  } else if (value > 1000) {
    cost += (value - 1000) * 0.03;
  }

  if (value > 5000) {
    cost += (value - 5000) * 0.05;
  }

  cost = Math.round(cost * 100) / 100;

  return { isValid, cost };
}
```

</details>

### **Konsep Inti:**
```
Validasi plotName dengan Regex → isValid
Siapkan variabel cost = 0
if #1 → hitung tier 1, tambahkan ke cost  (selalu diperiksa)
if #2 → hitung tier 2, tambahkan ke cost  (selalu diperiksa)
if #3 → hitung tier 3, tambahkan ke cost  (selalu diperiksa)
Bulatkan cost ke 2 desimal
Return { isValid, cost }
```

### **Step-by-Step (Detail):**

#### 🔵 Validasi Nama Plot:

1. **`const pattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/`**
   - Mendefinisikan pola Regex untuk identifier JavaScript yang valid
   - `^` — harus dimulai dari awal string
   - `[a-zA-Z_$]` — karakter **pertama**: huruf, `_`, atau `$`
   - `[a-zA-Z0-9_$]*` — karakter **selanjutnya**: huruf, angka, `_`, atau `$` (boleh nol atau lebih)
   - `$` — harus sampai akhir string

2. **`const isValid = pattern.test(plotName)`**
   - `.test()` mengecek apakah string cocok dengan pola Regex
   - Mengembalikan `true` atau `false`
   - Contoh:
   ```javascript
   pattern.test("plot123")  // true  ✅
   pattern.test("1garden")  // false ❌ — diawali angka
   pattern.test("my-plot")  // false ❌ — ada tanda -
   pattern.test("_plot")    // true  ✅
   pattern.test("$area")    // true  ✅
   ```

#### 🟡 Persiapan:

3. **`let cost = 0`**
   - Variabel akumulator untuk menampung hasil penjumlahan tier
   - Dideklarasikan dengan `let` karena nilainya akan berubah setiap tier
   - Dideklarasikan **di luar semua `if`** agar nilainya tidak direset
   - Dimulai dari `0` karena belum ada tier yang dihitung

#### 🔄 if #1 — Tier 1 (2% untuk $1.000 pertama):

4. **`if (value > 1000)`**
   - Jika nilai plot **lebih dari $1.000** → ambil $1.000 penuh × 2%
   - Jika nilai plot **$1.000 atau kurang** → ambil nilai apa adanya × 2%
   - Blok ini **selalu diperiksa** — tidak ada `else if` yang membuatnya terlewat

5. **`cost += 1000 * 0.02`** atau **`cost += value * 0.02`**
   - `+=` berarti `cost = cost + ...`
   - Hasilnya ditambahkan ke `cost`, bukan menggantikan

#### 🔄 if #2 — Tier 2 (3% untuk $1.001–$5.000):

6. **`if (value > 5000)`**
   - Jika nilai plot **lebih dari $5.000** → tier 2 kena penuh $4.000 × 3%

7. **`else if (value > 1000)`**
   - Jika nilai plot **di antara $1.000 dan $5.000** → kena sebagian
   - Yang dihitung: selisih dari batas $1.000 → `(value - 1000) * 0.03`
   - Jika nilai ≤ $1.000 → tidak masuk blok ini sama sekali (tier 2 = $0)

8. **Blok ini selalu diperiksa** — terpisah dari if #1, bukan bagian dari `else`

#### 🔄 if #3 — Tier 3 (5% di atas $5.000):

9. **`if (value > 5000)`**
   - Hanya jalan jika nilai plot **lebih dari $5.000**
   - Yang dihitung: selisih dari batas $5.000 → `(value - 5000) * 0.05`
   - Jika nilai ≤ $5.000 → blok ini dilewati sepenuhnya (tier 3 = $0)

10. **Blok ini selalu diperiksa** — terpisah dari if #1 dan if #2

#### 🟣 Pembulatan dan Return:

11. **`cost = Math.round(cost * 100) / 100`**
    - Membulatkan `cost` ke 2 desimal sebagai **number** (bukan string)
    - Kenapa bukan `.toFixed(2)`? Karena `.toFixed()` mengembalikan string

12. **`return { isValid, cost }`**
    - Shorthand dari `return { isValid: isValid, cost: cost }`
    - Mengembalikan objek dengan dua properti

### **Visualisasi untuk `plotValue = 2500`:**

```
cost = 0

─────────────────────────────────────────────
if #1: value > 1000? → 2500 > 1000 → true
  cost += 1000 * 0.02
  cost = 0 + 20 = 20
─────────────────────────────────────────────
if #2: value > 5000? → 2500 > 5000 → false
  else if: value > 1000? → 2500 > 1000 → true
    cost += (2500 - 1000) * 0.03
    cost = 20 + 45 = 65
─────────────────────────────────────────────
if #3: value > 5000? → 2500 > 5000 → false
  (dilewati, cost tetap 65)
─────────────────────────────────────────────

Math.round(65 * 100) / 100 → 65

return { isValid: true, cost: 65 } ✅
```

### **Keywords:**
- 🔵 **Regex** — pola `/^[a-zA-Z_$][a-zA-Z0-9_$]*$/` untuk validasi identifier JS
- 🔍 **`.test()`** — method Regex untuk mengecek apakah string cocok dengan pola
- ➕ **Accumulator** — variabel `cost` yang terus bertambah menggunakan `+=`
- 🔄 **3 if terpisah** — setiap blok selalu diperiksa, hasil dijumlahkan bertahap
- 📐 **Selisih batas** — tier dihitung dari `(value - batasBawah)`, bukan nilai mentah
- 🔢 **`Math.round()`** — pembulatan ke 2 desimal sebagai number

### **Kapan Pakai:**
- ✅ Belajar dan debugging — alur per tier paling eksplisit dan mudah dipahami
- ✅ Ingin memahami logika akumulasi `+=` secara bertahap
- ✅ Cocok saat pertama kali mengerjakan soal tier

### **Pitfalls (Jebakan Umum):**

**1) ❌ Mengecek `cost` bukan `value` di kondisi if**
```javascript
// ❌ SALAH — cost masih 0 saat dicek, kondisi tidak pernah true!
if (cost > 1000) {
  cost += 1000 * 0.02;
}

// ✅ BENAR — yang dicek adalah value (input dari luar)
if (value > 1000) {
  cost += 1000 * 0.02;
}
```

**2) ❌ Langsung assign tarif ke cost, bukan hasil perhitungan**
```javascript
// ❌ SALAH — cost diisi persentase, bukan hasil kali
if (value > 0 && value <= 1000) {
  cost = 0.02; // ini hanya tarif, bukan biaya!
}

// ✅ BENAR — cost diisi hasil perkalian
if (value <= 1000) {
  cost += value * 0.02;
}
```

**3) ❌ Tier 2 dan 3 tidak menghitung selisih dari batas**
```javascript
// ❌ SALAH — value mentah dipakai, bukan selisih dari batas tier
if (value > 1000) {
  cost += value * 0.03; // menghitung ulang dari 0, bukan dari 1000!
}

// ✅ BENAR — selisih dari batas bawah tier
if (value > 1000) {
  cost += (value - 1000) * 0.03;
}
```

**4) ❌ `return` masih pakai `cost: 0` bukan `cost`**
```javascript
// ❌ SALAH — selalu return 0
return { isValid, cost: 0 };

// ✅ BENAR — return variabel cost yang sudah dihitung
return { isValid, cost };
```

### **💡 Insight Penting:**

> **Kenapa pakai 3 `if` terpisah, bukan `else if`?**
> Karena cost perlu **dijumlahkan dari beberapa tier sekaligus**. Dengan 3 `if` terpisah, setiap blok selalu diperiksa dan hasilnya ditambahkan ke `cost` menggunakan `+=`. Jika pakai `else if`, program hanya masuk ke satu blok dan berhenti — tier lain tidak akan dihitung.

> **Kenapa tier 2 dan 3 pakai `(value - batas)`?**
> Karena setiap tier hanya menghitung bagian nilainya sendiri, bukan dari nol. Tier 2 mulai dari $1.000, jadi yang dihitung adalah `(value - 1000)`. Tier 3 mulai dari $5.000, jadi yang dihitung adalah `(value - 5000)`.

---

═══════════════════════════════════════════════════════════════════════

# ⚡ VERSI 2: else if (Coddy)

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Ringkas%20%7C%20Readable-blue?style=flat-square)
![Style](https://img.shields.io/badge/Style-Conditional-9cf?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
function assessPlot(plotName, plotValue) {
  const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  const isValid = identifierRegex.test(plotName);

  let cost = 0;

  if (plotValue <= 1000) {
    cost = plotValue * 0.02;
  } else if (plotValue <= 5000) {
    cost = 1000 * 0.02 + (plotValue - 1000) * 0.03;
  } else {
    cost = 1000 * 0.02 + 4000 * 0.03 + (plotValue - 5000) * 0.05;
  }

  cost = Math.round(cost * 100) / 100;

  return {
    isValid: isValid,
    cost: cost
  };
}
```

</details>

### **Konsep Inti:**
```
Validasi plotName dengan Regex → isValid
Siapkan variabel cost = 0
Cek nilai plot dengan else if — hanya SATU blok yang jalan:
  Jika plotValue ≤ 1000  → hitung tier 1 saja
  Jika plotValue ≤ 5000  → hitung tier 1 + tier 2 sekaligus
  Selain itu (> 5000)    → hitung tier 1 + tier 2 + tier 3 sekaligus
Bulatkan cost ke 2 desimal
Return { isValid: isValid, cost: cost }
```

### **Step-by-Step (Detail):**

#### 🔵 Validasi Nama Plot:

1. **`const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/`**
   - Sama persis dengan Versi 1, hanya nama variabelnya berbeda (`identifierRegex` vs `pattern`)
   - Pola Regex untuk memvalidasi identifier JavaScript yang valid

2. **`const isValid = identifierRegex.test(plotName)`**
   - `.test()` mengembalikan `true` jika nama valid, `false` jika tidak

#### 🟡 Persiapan:

3. **`let cost = 0`**
   - Variabel untuk menampung biaya asuransi
   - Di versi ini `cost` menggunakan `=` (assign langsung), bukan `+=`
   - Karena setiap blok langsung menghitung total sekaligus

#### 🔄 else if — Pilih Satu Blok:

4. **`if (plotValue <= 1000)`** — Blok Tier 1
   - Nilai plot tidak melebihi $1.000
   - **Hanya tier 1 yang kena** → `cost = plotValue * 0.02`
   - Contoh: `plotValue = 500` → `cost = 500 * 0.02 = 10`

5. **`else if (plotValue <= 5000)`** — Blok Tier 1 + 2
   - Nilai plot di antara $1.001 dan $5.000
   - Hanya masuk ke sini jika blok pertama **tidak** terpenuhi (plotValue > 1000)
   - **Tier 1 dan 2 dihitung sekaligus:**
     ```
     cost = 1000 * 0.02               → $20  (tier 1 penuh)
          + (plotValue - 1000) * 0.03 → sisa setelah $1000 (tier 2)
     ```
   - Contoh: `plotValue = 2500`
     ```
     cost = 1000 * 0.02 + (2500 - 1000) * 0.03
          = 20 + 45
          = 65
     ```

6. **`else`** — Blok Tier 1 + 2 + 3
   - Nilai plot di atas $5.000
   - Hanya masuk ke sini jika dua blok sebelumnya **tidak** terpenuhi (plotValue > 5000)
   - **Semua tier dihitung sekaligus:**
     ```
     cost = 1000 * 0.02               → $20   (tier 1 penuh)
          + 4000 * 0.03               → $120  (tier 2 penuh)
          + (plotValue - 5000) * 0.05 → sisa setelah $5000 (tier 3)
     ```
   - Contoh: `plotValue = 7000`
     ```
     cost = 1000 * 0.02 + 4000 * 0.03 + (7000 - 5000) * 0.05
          = 20 + 120 + 100
          = 240
     ```

#### 🟣 Pembulatan dan Return:

7. **`cost = Math.round(cost * 100) / 100`**
   - Sama dengan Versi 1

8. **`return { isValid: isValid, cost: cost }`**
   - Versi eksplisit (bukan shorthand)
   - Sama hasilnya dengan `return { isValid, cost }`

### **Visualisasi untuk `plotValue = 2500`:**

```
cost = 0

─────────────────────────────────────────────
if: plotValue <= 1000? → 2500 <= 1000 → false
  (lewati blok ini)
─────────────────────────────────────────────
else if: plotValue <= 5000? → 2500 <= 5000 → true
  cost = 1000 * 0.02 + (2500 - 1000) * 0.03
  cost = 20 + 45
  cost = 65
  (masuk ke sini → else tidak diperiksa lagi)
─────────────────────────────────────────────
else:
  (dilewati karena else if sudah true)
─────────────────────────────────────────────

Math.round(65 * 100) / 100 → 65

return { isValid: true, cost: 65 } ✅
```

### **Keywords:**
- 🔵 **Regex** — pola yang sama dengan Versi 1
- 🔍 **`.test()`** — method Regex untuk cek kecocokan string
- 🔀 **`else if`** — hanya satu blok yang dijalankan, sisanya dilewati
- 🧮 **Hitung langsung** — setiap blok langsung menghitung total semua tier yang kena
- 📐 **Selisih batas** — `(plotValue - 1000)` dan `(plotValue - 5000)` untuk menghitung bagian tier
- 🔢 **`Math.round()`** — pembulatan ke 2 desimal sebagai number

### **Kapan Pakai:**
- ✅ Ingin kode yang lebih ringkas dan mudah dibaca
- ✅ Logika tier sudah dipahami dengan baik
- ✅ Referensi solusi resmi / standar industri

### **Pitfalls (Jebakan Umum):**

**1) ❌ Salah urutan kondisi di `else if`**
```javascript
// ❌ SALAH — urutan terbalik, nilai 1001-5000 tidak pernah cocok
if (plotValue > 5000) { ... }
else if (plotValue <= 1000) { ... }
else { ... } // semua nilai 1001-5000 masuk sini — salah!

// ✅ BENAR — urutan dari yang paling kecil
if (plotValue <= 1000) { ... }
else if (plotValue <= 5000) { ... }
else { ... }
```

**2) ❌ Lupa menjumlahkan tier sebelumnya di blok `else if` dan `else`**
```javascript
// ❌ SALAH — tier 1 tidak dihitung di blok kedua dan ketiga
if (plotValue <= 1000) {
  cost = plotValue * 0.02;
} else if (plotValue <= 5000) {
  cost = (plotValue - 1000) * 0.03; // lupa tier 1!
} else {
  cost = (plotValue - 5000) * 0.05; // lupa tier 1 dan 2!
}

// ✅ BENAR — setiap blok akumulasi semua tier yang kena
if (plotValue <= 1000) {
  cost = plotValue * 0.02;
} else if (plotValue <= 5000) {
  cost = 1000 * 0.02 + (plotValue - 1000) * 0.03;
} else {
  cost = 1000 * 0.02 + 4000 * 0.03 + (plotValue - 5000) * 0.05;
}
```

**3) ❌ Pakai `+=` di versi `else if`**
```javascript
// ❌ SALAH — pakai += tapi hanya 1 blok yang jalan
if (plotValue <= 1000) {
  cost += plotValue * 0.02;
} else if (plotValue <= 5000) {
  cost += (plotValue - 1000) * 0.03; // tier 1 tidak pernah ditambahkan!
}

// ✅ BENAR — pakai = karena setiap blok menghitung total sekaligus
if (plotValue <= 1000) {
  cost = plotValue * 0.02;
} else if (plotValue <= 5000) {
  cost = 1000 * 0.02 + (plotValue - 1000) * 0.03;
}
```

### **💡 Insight Penting:**

> **Kenapa versi ini pakai `=` bukan `+=`?**
> Karena setiap blok `else if` langsung menghitung **total semua tier yang kena** sekaligus. Tidak ada akumulasi bertahap seperti di Versi 1. Hanya satu blok yang dijalankan, dan blok itu sudah mencakup semua perhitungan yang diperlukan.

> **Kenapa urutan kondisi dari kecil ke besar?**
> Karena `else if` berhenti di kondisi pertama yang benar. Jika urutan dibalik, nilai seperti 3000 tidak akan cocok dengan kondisi manapun dan jatuh ke `else` — hasil salah.

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
const testCases = [
  {
    name: "plot123",
    value: 2500,
    expected: { isValid: true, cost: 65 },
    desc: "Normal case — nama valid, nilai di tier 1 dan 2"
  },
  {
    name: "myGarden",
    value: 7000,
    expected: { isValid: true, cost: 240 },
    desc: "Normal case — nama valid, nilai melewati semua tier"
  },
  {
    name: "myGarden",
    value: 1000,
    expected: { isValid: true, cost: 20 },
    desc: "Edge case — nilai tepat di batas tier 1"
  },
  {
    name: "myGarden",
    value: 5000,
    expected: { isValid: true, cost: 140 },
    desc: "Edge case — nilai tepat di batas tier 2"
  },
  {
    name: "1garden",
    value: 2500,
    expected: { isValid: false, cost: 65 },
    desc: "Edge case — nama tidak valid (diawali angka)"
  },
  {
    name: "my-plot",
    value: 2500,
    expected: { isValid: false, cost: 65 },
    desc: "Edge case — nama tidak valid (ada tanda -)"
  }
]

testCases.forEach(({ name, value, expected, desc }, index) => {
  const result = assessPlot(name, value)
  const isValidMatch = result.isValid === expected.isValid
  const costMatch = result.cost === expected.cost
  const status = (isValidMatch && costMatch) ? '✅ PASS' : '❌ FAIL'

  console.log(`Test Case #${index + 1}: ${status} - ${desc}`)
  console.log(`  assessPlot("${name}", ${value}) → { isValid: ${result.isValid}, cost: ${result.cost} }`)

  if (status === '❌ FAIL') {
    console.log('  Expected:', expected)
    console.log('  Result  :', result)
  }
})
```

**Output yang diharapkan:**
```
Test Case #1: ✅ PASS - Normal case — nama valid, nilai di tier 1 dan 2
  assessPlot("plot123", 2500) → { isValid: true, cost: 65 }
Test Case #2: ✅ PASS - Normal case — nama valid, nilai melewati semua tier
  assessPlot("myGarden", 7000) → { isValid: true, cost: 240 }
Test Case #3: ✅ PASS - Edge case — nilai tepat di batas tier 1
  assessPlot("myGarden", 1000) → { isValid: true, cost: 20 }
Test Case #4: ✅ PASS - Edge case — nilai tepat di batas tier 2
  assessPlot("myGarden", 5000) → { isValid: true, cost: 140 }
Test Case #5: ✅ PASS - Edge case — nama tidak valid (diawali angka)
  assessPlot("1garden", 2500) → { isValid: false, cost: 65 }
Test Case #6: ✅ PASS - Edge case — nama tidak valid (ada tanda -)
  assessPlot("my-plot", 2500) → { isValid: false, cost: 65 }
```

---

═══════════════════════════════════════════════════════════════════════

# 📊 PERBANDINGAN LENGKAP

═══════════════════════════════════════════════════════════════════════

| Aspek | ✅ Versi 1 (3 if terpisah) | ⚡ Versi 2 (else if / Coddy) |
|-------|:-------------------------:|:---------------------------:|
| Jumlah blok kondisi | 3 blok `if` terpisah | 1 rantai `if-else if-else` |
| Blok yang dijalankan | Semua selalu diperiksa | Hanya 1 yang jalan |
| Cara hitung cost | Akumulasi bertahap (`+=`) | Dihitung langsung sekaligus (`=`) |
| Keterbacaan pemula | ✅ Lebih mudah dipahami | ⚠️ Perlu paham logika tier |
| Keterbacaan umum | ⚠️ Lebih panjang | ✅ Lebih ringkas |
| Hasil | Sama ✅ | Sama ✅ |

---

## 🔑 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────────┐
│  💡 Dua Solusi Menghasilkan Output yang Sama                        │
│     Perbedaan hanya pada pendekatan penghitungan tier               │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Validasi dan Cost Bersifat Independen                           │
│     isValid dan cost selalu dihitung, tidak saling mempengaruhi     │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Tier Dihitung dari Selisih Batas, Bukan Nilai Mentah            │
│     Tier 2: (value - 1000) * 0.03                                   │
│     Tier 3: (value - 5000) * 0.05                                   │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Pakai Math.round(), Bukan .toFixed()                            │
│     .toFixed() mengembalikan string, bukan number                   │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Pilih Sesuai Pemahaman                                          │
│     Masih belajar tier  → Versi 1 (3 if terpisah, akumulasi +=)     │
│     Sudah paham tier    → Versi 2 (else if, hitung sekaligus)       │
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Versi | Highlight |
|-------|-----------|
| ✅ **Versi 1 (3 if terpisah)** | Regex → `isValid` → `cost = 0` → if #1 `+=` tier1 → if #2 `+=` tier2 → if #3 `+=` tier3 → `Math.round` → `return { isValid, cost }` |
| ⚡ **Versi 2 (else if / Coddy)** | Regex → `isValid` → `cost = 0` → `if / else if / else` hitung total sekaligus → `Math.round` → `return { isValid, cost }` |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
