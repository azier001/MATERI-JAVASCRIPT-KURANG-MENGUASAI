# 🌊 Poetic Numbers in the Coastal Cove

*Where rhythm meets mathematics, and waves whisper numbers in perfect harmony*

> 💡 **Info:** Ini adalah versi monolitik (gabungan 1 halaman). Untuk membaca dalam format modular, silakan kunjungi:
> - 📄 **[Bagian 1: Analisis & Blueprint](../README.md)**
> - 💻 **[Bagian 2: Solusi Lengkap & Evolusi](../02-solusi-evolusi.md)**

---

## 📚 Daftar Isi

| Bagian | Topik | Emoji |
|--------|-------|-------|
| [1. Pengantar Challenge](#1-pengantar-challenge) | Memahami "Poetic Numbers" | 🎯 |
| [2. Visualisasi & Analisis](#2-visualisasi--analisis) | Tabel Evaluasi Angka | 📊 |
| [3. Algoritma Tahan Lupa](#3-algoritma-tahan-lupa) | Step-by-Step Loop Visualization | 🔄 |
| [4. Blueprint & Kamus Variabel](#4-blueprint--kamus-variabel) | Kerangka Kode & Peran Variabel | 📐 |
| [5. Pendekatan Bertahap](#5-pendekatan-bertahap) | Dari Guard Clauses ke Solusi | 🪜 |
| [6. Evolusi Solusi](#6-evolusi-solusi) | Imperative vs Declarative | 🔀 |
| [7. Naming Convention](#7-naming-convention) | Clean Code Practices | ✨ |
| [8. Akurasi Logika](#8-akurasi-logika) | Gotchas & Common Mistakes | ⚠️ |
| [9. Solusi Final](#9-solusi-final) | 3 Versi Implementasi | 🏆 |

---

## 1. Pengantar Challenge

### 🎯 Definisi "Poetic Number"

Sebuah angka disebut **"poetic"** jika memenuhi **SEMUA** kriteria berikut:

| Kriteria | Deskripsi | Simbolisme |
|----------|-----------|------------|
| ✅ Habis dibagi 3 | `num % 3 === 0` | Irama ombak yang teratur |
| ❌ Tidak habis dibagi 5 | `num % 5 !== 0` | Ketiadaan legenda di teluk |
| ➕ Jumlah digit genap | `sumOfDigits(num) % 2 === 0` | Keseimbangan alam |

> **Analogi Penjaga Pintu (Guard Clauses)**  
> Bayangkan sebuah klub eksklusif dengan 3 penjaga:
> - **Penjaga 1**: "Apakah kamu kelipatan 3?" → Jika tidak, `continue` (tolak)
> - **Penjaga 2**: "Apakah kamu kelipatan 5?" → Jika ya, `continue` (tolak)
> - **Penjaga 3**: "Apakah jumlah digitmu genap?" → Jika ya, masuk ke array!

### 📝 Contoh Input/Output

```javascript
poeticNumbersInCove(1, 10)    // Output: [6]
poeticNumbersInCove(10, 30)   // Output: [24]
poeticNumbersInCove(1000, 1100) // Output: [1014, 1023, 1029, ...]
```

---

## 2. Visualisasi & Analisis

### 📊 Tabel Evaluasi Angka (Range 10-30)

Mari kita analisis **mengapa** angka tertentu lulus atau gagal:

| Angka | ÷3? | ÷5? | Digit Sum | Sum Genap? | Status | Alasan |
|-------|-----|-----|-----------|------------|--------|--------|
| 12 | ✅ Yes | ❌ No | 1+2=**3** | ❌ Ganjil | ❌ **GAGAL** | Jumlah digit ganjil |
| 15 | ✅ Yes | ✅ Yes | 1+5=6 | ✅ Genap | ❌ **GAGAL** | Habis dibagi 5 (legenda terlarang) |
| 18 | ✅ Yes | ❌ No | 1+8=**9** | ❌ Ganjil | ❌ **GAGAL** | Jumlah digit ganjil |
| 21 | ✅ Yes | ❌ No | 2+1=**3** | ❌ Ganjil | ❌ **GAGAL** | Jumlah digit ganjil |
| **24** | ✅ Yes | ❌ No | 2+4=**6** | ✅ Genap | ✅ **LULUS** | Memenuhi semua kriteria! |
| 27 | ✅ Yes | ❌ No | 2+7=**9** | ❌ Ganjil | ❌ **GAGAL** | Jumlah digit ganjil |
| 30 | ✅ Yes | ✅ Yes | 3+0=3 | ❌ Ganjil | ❌ **GAGAL** | Habis dibagi 5 DAN jumlah ganjil |

> [!IMPORTANT]
> **Insight Kunci**: Dari range 10-30, hanya **1 angka** (24) yang memenuhi semua kriteria. Ini menunjukkan betapa "eksklusif" nya poetic numbers!

### 🔍 Deep Dive: Mengapa 24 Istimewa?

```
24 ÷ 3 = 8   ✅ (Irama ombak sempurna)
24 ÷ 5 = 4.8 ❌ (Tidak ada legenda)
2 + 4 = 6    ✅ (Keseimbangan genap)
```

---

## 3. Algoritma Tahan Lupa

### 🔄 Visualisasi Step-by-Step: Menghitung Digit Sum (Angka 24)

**Konsep Matematika Murni:**

```
Ekstraksi digit terakhir: num % 10
Buang digit terakhir:     Math.floor(num / 10)
```

#### Iterasi Loop `while(tempNum > 0)`

| Step | `tempNum` | `tempNum % 10` | `digitSum` | `Math.floor(tempNum / 10)` | Penjelasan |
|------|-----------|----------------|------------|----------------------------|------------|
| **Awal** | 24 | - | 0 | - | Inisialisasi |
| **1** | 24 | **4** | 0 + 4 = **4** | 2 | Ambil digit terakhir (4) |
| **2** | 2 | **2** | 4 + 2 = **6** | 0 | Ambil digit terakhir (2) |
| **3** | 0 | - | 6 | - | Loop berhenti (`tempNum === 0`) |

**Hasil Akhir**: `digitSum = 6` (Genap ✅)

> [!TIP]
> **Trik Mengingat**: Bayangkan `tempNum` seperti tumpukan kartu. Setiap iterasi:
> 1. Ambil kartu paling bawah (`% 10`)
> 2. Buang kartu tersebut (`Math.floor(num / 10)`)
> 3. Ulangi sampai tumpukan kosong

### 📐 Visualisasi Matematika Murni

```
24 % 10 = 4        →  Digit terakhir
Math.floor(24/10) = 2  →  Sisa angka

2 % 10 = 2         →  Digit terakhir
Math.floor(2/10) = 0   →  Sisa angka (STOP)
```

---

## 4. Blueprint & Kamus Variabel

### 📐 Kerangka Kode Kosong (Template)

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];
  
  for (let num = start; num <= end; num++) {
    // 🚪 Guard Clause 1: Cek divisibilitas 3
    if (______) continue;
    
    // 🚪 Guard Clause 2: Cek divisibilitas 5
    if (______) continue;
    
    // 🧮 Hitung jumlah digit
    let digitSum = 0;
    let tempNum = num;
    
    while (______) {
      digitSum += ______;
      tempNum = ______;
    }
    
    // ✅ Cek jumlah digit genap
    if (______) {
      poeticNumbers.push(num);
    }
  }
  
  return poeticNumbers;
}
```

### 📖 Kamus Variabel

| Variabel | Tipe | Peran | Lifecycle | Contoh Nilai |
|----------|------|-------|-----------|--------------|
| `start` | `number` | Parameter awal range | Input function | `10` |
| `end` | `number` | Parameter akhir range | Input function | `30` |
| `poeticNumbers` | `number[]` | Menyimpan hasil akhir | Persistent (return value) | `[24]` |
| `num` | `number` | Iterator loop utama | Loop scope | `24` |
| `digitSum` | `number` | Akumulator jumlah digit | Per-iteration | `6` |
| `tempNum` | `number` | Salinan `num` untuk manipulasi | Per-iteration | `24 → 2 → 0` |

> [!IMPORTANT]
> **Mengapa `tempNum` Diperlukan?**  
> Kita tidak bisa memodifikasi `num` langsung karena masih digunakan untuk iterasi loop. `tempNum` adalah "kertas coret-coretan" yang aman untuk dimanipulasi.

---

## 5. Pendekatan Bertahap

### 🪜 Langkah Eksekusi (Dari Guard Clauses ke Solusi)

#### **Langkah 1**: Setup Awal

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];
  // Array kosong untuk menampung hasil
}
```

---

#### **Langkah 2**: Loop Melalui Range

```javascript
for (let num = start; num <= end; num++) {
  // Iterasi dari start hingga end (inclusive)
}
```

---

#### **Langkah 3**: Guard Clause - Divisibilitas 3

```javascript
if (num % 3 !== 0) continue;
// ❌ Jika TIDAK habis dibagi 3, skip angka ini
```

> [!TIP]
> **Optimasi**: `continue` langsung melompat ke iterasi berikutnya tanpa mengeksekusi kode di bawahnya.

---

#### **Langkah 4**: Guard Clause - Divisibilitas 5

```javascript
if (num % 5 === 0) continue;
// ❌ Jika habis dibagi 5, skip angka ini
```

---

#### **Langkah 5**: Hitung Jumlah Digit

```javascript
let digitSum = 0;
let tempNum = num;

while (tempNum > 0) {
  digitSum += tempNum % 10;  // Ambil digit terakhir
  tempNum = Math.floor(tempNum / 10);  // Buang digit terakhir
}
```

**Contoh Eksekusi (num = 24)**:
```
Iterasi 1: digitSum = 0 + 4 = 4, tempNum = 2
Iterasi 2: digitSum = 4 + 2 = 6, tempNum = 0
Loop berhenti
```

---

#### **Langkah 6**: Validasi Jumlah Digit Genap

```javascript
if (digitSum % 2 === 0) {
  poeticNumbers.push(num);
}
```

---

#### **Langkah 7**: Return Hasil

```javascript
return poeticNumbers;
```

---

## 6. Evolusi Solusi

### 🔀 Tabel Perbandingan: Imperative vs Declarative

| Aspek | **Imperative (While Loop)** | **Declarative (Reduce)** |
|-------|----------------------------|--------------------------|
| **Paradigma** | Prosedural, step-by-step | Functional, ekspresif |
| **Keterbacaan** | ⭐⭐⭐ (Perlu trace manual) | ⭐⭐⭐⭐⭐ (Self-documenting) |
| **Performa** | ⚡⚡⚡⚡⚡ (Optimal) | ⚡⚡⚡⚡ (Sedikit overhead) |
| **Mutabilitas** | `let` variables (mutable) | Immutable (no side effects) |
| **Debugging** | Mudah dengan breakpoint | Sulit trace intermediate values |
| **Use Case** | Performance-critical code | Readable, maintainable code |

### 📊 Contoh Kode: Hitung Digit Sum

#### Imperative (Matematika Murni)

```javascript
let digitSum = 0;
let tempNum = num;

while (tempNum > 0) {
  digitSum += tempNum % 10;
  tempNum = Math.floor(tempNum / 10);
}
```

**Kelebihan**: Cepat, efisien, mudah dipahami pemula  
**Kekurangan**: Verbose, butuh variabel mutable

---

#### Declarative (Functional)

```javascript
const digitSum = String(num)
  .split('')
  .reduce((sum, digit) => sum + Number(digit), 0);
```

**Kelebihan**: Concise, ekspresif, immutable  
**Kekurangan**: Konversi string overhead, sulit debug

---

> [!NOTE]
> **Rekomendasi**: Gunakan **Imperative** untuk challenge ini karena:
> 1. Lebih efisien (tidak ada konversi string)
> 2. Lebih mudah dipahami pemula
> 3. Sesuai dengan tema "loop optimization" dari challenge

---

## 7. Naming Convention

### ✨ Tabel Clean Code: Naming Best Practices

| ❌ **Bad Naming** | ✅ **Good Naming** | Alasan |
|-------------------|-------------------|--------|
| `result` | `poeticNumbers` | Deskriptif, menjelaskan isi array |
| `i` | `num` | Menjelaskan bahwa ini angka, bukan index |
| `number` | `digitStr` | Jelas bahwa ini string digit |
| `sum` | `digitSum` | Spesifik: jumlah digit, bukan jumlah umum |
| `temp` | `tempNum` | Menjelaskan tipe data (number) |
| `x`, `y`, `z` | `start`, `end` | Self-documenting parameters |

### 📝 Contoh Refactoring

#### ❌ Before (Poor Naming)

```javascript
function f(a, b) {
  const r = [];
  for (let i = a; i <= b; i++) {
    if (i % 3 !== 0) continue;
    if (i % 5 === 0) continue;
    
    let s = 0;
    let t = i;
    while (t > 0) {
      s += t % 10;
      t = Math.floor(t / 10);
    }
    
    if (s % 2 === 0) r.push(i);
  }
  return r;
}
```

**Masalah**: Tidak jelas apa yang dilakukan function ini tanpa membaca seluruh kode.

---

#### ✅ After (Clean Naming)

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];
  
  for (let num = start; num <= end; num++) {
    if (num % 3 !== 0) continue;
    if (num % 5 === 0) continue;
    
    let digitSum = 0;
    let tempNum = num;
    
    while (tempNum > 0) {
      digitSum += tempNum % 10;
      tempNum = Math.floor(tempNum / 10);
    }
    
    if (digitSum % 2 === 0) {
      poeticNumbers.push(num);
    }
  }
  
  return poeticNumbers;
}
```

**Keuntungan**: Setiap variabel menjelaskan dirinya sendiri (self-documenting code).

---

## 8. Akurasi Logika

### ⚠️ Gotchas & Common Mistakes

#### 🚨 Kesalahan 1: Infinite Loop

> [!CAUTION]
> **Bahaya**: Lupa update `tempNum` dalam loop

```javascript
// ❌ SALAH: Infinite Loop
let digitSum = 0;
let tempNum = num;

while (tempNum > 0) {
  digitSum += tempNum % 10;
  // ⚠️ LUPA: tempNum tidak pernah berubah!
}
```

**Akibat**: Loop tidak pernah berhenti karena `tempNum` selalu > 0.

**Solusi**:

```javascript
// ✅ BENAR
while (tempNum > 0) {
  digitSum += tempNum % 10;
  tempNum = Math.floor(tempNum / 10);  // ✅ Update tempNum
}
```

---

#### 🚨 Kesalahan 2: Variable Shadowing

> [!WARNING]
> **Bahaya**: Menggunakan `num` untuk manipulasi digit

```javascript
// ❌ SALAH: Memodifikasi iterator loop
for (let num = start; num <= end; num++) {
  let digitSum = 0;
  
  while (num > 0) {  // ⚠️ BAHAYA: num dimodifikasi!
    digitSum += num % 10;
    num = Math.floor(num / 10);  // ❌ num jadi 0, loop utama rusak
  }
}
```

**Akibat**: Loop utama hanya berjalan 1 kali karena `num` menjadi 0.

**Solusi**:

```javascript
// ✅ BENAR: Gunakan variabel terpisah
for (let num = start; num <= end; num++) {
  let digitSum = 0;
  let tempNum = num;  // ✅ Salinan untuk manipulasi
  
  while (tempNum > 0) {
    digitSum += tempNum % 10;
    tempNum = Math.floor(tempNum / 10);
  }
}
```

---

#### 🚨 Kesalahan 3: Urutan Guard Clauses Salah

```javascript
// ❌ SALAH: Cek digit sum dulu (tidak efisien)
let digitSum = 0;
let tempNum = num;
while (tempNum > 0) {
  digitSum += tempNum % 10;
  tempNum = Math.floor(tempNum / 10);
}

if (digitSum % 2 !== 0) continue;  // Cek terakhir
if (num % 3 !== 0) continue;       // Seharusnya cek pertama
if (num % 5 === 0) continue;
```

**Masalah**: Menghitung digit sum untuk angka yang sudah pasti gagal (tidak habis dibagi 3).

**Solusi**:

```javascript
// ✅ BENAR: Cek paling murah dulu
if (num % 3 !== 0) continue;  // ⚡ Cepat (1 operasi)
if (num % 5 === 0) continue;  // ⚡ Cepat (1 operasi)

// Baru hitung digit sum (lebih mahal)
let digitSum = 0;
let tempNum = num;
while (tempNum > 0) {
  digitSum += tempNum % 10;
  tempNum = Math.floor(tempNum / 10);
}
```

> [!TIP]
> **Prinsip Optimasi**: Lakukan pengecekan paling murah (cheap checks) terlebih dahulu untuk menghindari komputasi yang tidak perlu.

---

## 9. Solusi Final

### 🏆 Versi 1: Declarative (Reduce)

**Kelebihan**: Ekspresif, functional, immutable  
**Use Case**: Codebase modern dengan fokus readability

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];
  
  for (let num = start; num <= end; num++) {
    // Guard Clauses
    if (num % 3 !== 0) continue;
    if (num % 5 === 0) continue;
    
    // Hitung digit sum dengan reduce
    const digitSum = String(num)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
    
    if (digitSum % 2 === 0) {
      poeticNumbers.push(num);
    }
  }
  
  return poeticNumbers;
}
```

---

### 🏆 Versi 2: Matematika Murni (While Loop)

**Kelebihan**: Efisien, optimal, mudah dipahami  
**Use Case**: Performance-critical, educational purposes

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];
  
  for (let num = start; num <= end; num++) {
    // Guard Clauses
    if (num % 3 !== 0) continue;
    if (num % 5 === 0) continue;
    
    // Hitung digit sum dengan matematika murni
    let digitSum = 0;
    let tempNum = num;
    
    while (tempNum > 0) {
      digitSum += tempNum % 10;
      tempNum = Math.floor(tempNum / 10);
    }
    
    if (digitSum % 2 === 0) {
      poeticNumbers.push(num);
    }
  }
  
  return poeticNumbers;
}
```

---

### 🏆 Versi 3: Tradisional (For Loop untuk Digit)

**Kelebihan**: Familiar untuk pemula, eksplisit  
**Use Case**: Learning purposes, step-by-step debugging

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];
  
  for (let num = start; num <= end; num++) {
    // Guard Clauses
    if (num % 3 !== 0) continue;
    if (num % 5 === 0) continue;
    
    // Konversi ke string untuk iterasi
    const digits = String(num).split('');
    let digitSum = 0;
    
    for (let i = 0; i < digits.length; i++) {
      digitSum += Number(digits[i]);
    }
    
    if (digitSum % 2 === 0) {
      poeticNumbers.push(num);
    }
  }
  
  return poeticNumbers;
}
```

---

### 🧪 Test Cases

```javascript
// Test 1: Range kecil
console.log(poeticNumbersInCove(1, 10));
// Expected: [6]

// Test 2: Range medium
console.log(poeticNumbersInCove(10, 30));
// Expected: [24]

// Test 3: Range besar
console.log(poeticNumbersInCove(1000, 1100));
// Expected: [1014, 1023, 1029, 1032, 1038, 1041, 1047, 1056, 1074, 1083, 1089, 1092, 1098]

// Test 4: Edge case - start = end
console.log(poeticNumbersInCove(24, 24));
// Expected: [24]

// Test 5: Edge case - tidak ada poetic numbers
console.log(poeticNumbersInCove(1, 5));
// Expected: []
```

---

## 🎓 Kesimpulan

### Key Takeaways

1. **Guard Clauses**: Optimasi dengan menolak kandidat tidak valid secepat mungkin
2. **Matematika Murni**: `% 10` dan `Math.floor(num / 10)` untuk ekstraksi digit
3. **Variable Naming**: Self-documenting code mengurangi kebutuhan komentar
4. **Paradigma**: Pilih imperative untuk performa, declarative untuk readability
5. **Common Pitfalls**: Hindari infinite loop dan variable shadowing

### 📚 Referensi Lanjutan

- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [JavaScript: The Good Parts](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/)

---

> **💡 Pro Tip**: Simpan dokumentasi ini sebagai referensi untuk challenge serupa yang melibatkan:
> - Loop optimization dengan `break`/`continue`
> - Digit manipulation
> - Multiple validation criteria
> - Guard clause patterns

---

**⬅️ Kembali ke [Bagian 1: Analisis & Blueprint](../README.md) | [Bagian 2: Solusi Lengkap & Evolusi](../02-solusi-evolusi.md)**

---

*Dibuat dengan ❤️ untuk pembelajaran yang lebih baik*

---

> 📝 **Catatan Akhir:**
> Dokumentasi ini dibuat pada **25 Mei 2026** berdasarkan sesi mentoring langsung di **Google Antigravity** dengan JavaScript (ES6+). Sesi ini menghasilkan 3 versi solusi yang membahas berbagai pendekatan dari String Iteration, Matematika Murni, hingga manipulasi array Declarative menggunakan `.reduce()`.
