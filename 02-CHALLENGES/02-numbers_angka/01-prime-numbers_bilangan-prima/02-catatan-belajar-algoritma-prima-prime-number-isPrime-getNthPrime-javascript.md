# 📚 Catatan Belajar: Algoritma Prima (Prime Number) — `isPrime` & `getNthPrime` in JavaScript

> 🗓️ Dibuat dari sesi belajar challenge _Trading Post Order Calculator_ di Coddy  
> 🎯 Topik utama: Memahami bilangan prima, membuat `isPrime`, `getNthPrime`, dan mengintegrasikannya ke fungsi utama  
> 💻 Bahasa: JavaScript (ES6+)

---

## 📋 Daftar Isi

- [Challenge Overview](#challenge-overview)
- [Solusi Awal — Hardcoded Array](#solusi-awal)
- [Konsep Dasar Bilangan Prima](#konsep-dasar)
- [Fungsi isPrime](#isprime)
- [Fungsi getNthPrime](#getnthprime)
- [Fungsi Final calculateOrder](#calculateorder)
- [Perbandingan dengan Solusi Coddy](#perbandingan)

---

<a name="challenge-overview"></a>
## 🎯 Challenge Overview

### Apa yang diminta?

Buat fungsi `calculateOrder` yang menerima 4 parameter dan mengembalikan sebuah object dengan 3 properti.

### Input

| Parameter | Contoh | Keterangan |
|---|---|---|
| `orderHour` | `8` | Jam order (format 0–23) |
| `price` | `100` | Harga asli |
| `age` | `25` | Umur customer dalam **tahun** |
| `previousOrders` | `1` | Jumlah order sebelumnya |

### Output

| Properti | Keterangan |
|---|---|
| `total` | Harga setelah diskon (diskon 10% jika order sebelum jam 10) |
| `ageInDays` | Umur dalam hari (tahun × 365) |
| `loyaltyTier` | Bilangan prima ke-N, di mana N = `previousOrders` |

### Contoh Test Case

```
Input:  hour=8, price=100, age=25, previousOrders=1
Output: { total: 90, ageInDays: 9125, loyaltyTier: 2 }

Input:  hour=15, price=50, age=30, previousOrders=2
Output: { total: 50, ageInDays: 10950, loyaltyTier: 3 }

Input:  hour=9, price=75.5, age=18, previousOrders=3
Output: { total: 67.95, ageInDays: 6570, loyaltyTier: 5 }
```

### Verifikasi Manual (Test Case ke-3)

```
hour=9    → jam 9 < 10, kena diskon → 75.5 × 0.9 = 67.95 ✅
age=18    → 18 × 365 = 6570 hari ✅
orders=3  → prima ke-3 = 5 ✅
```

---

<a name="solusi-awal"></a>
## 🔧 Solusi Awal — Hardcoded Array

Waktu pertama kali mengerjakan challenge ini, cara paling simpel adalah menyimpan daftar bilangan prima langsung di dalam array.

```javascript
function calculateOrder(hour, price, age, previousOrders) {
  let total = 0;
  
  // Daftar prima disimpan manual
  const numbersPrime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  const ageInDays = age * 365;

  if (hour < 10) {
    total = price * 0.9;
  } else {
    total = price;
  }

  // Ambil prima ke-N langsung dari array
  const loyaltyTier = numbersPrime[previousOrders - 1];

  return { total, ageInDays, loyaltyTier };
}
```

### ⚠️ Kekurangan

Cara ini bekerja, tapi rapuh. Kalau `previousOrders` melebihi 10, array-nya tidak cukup dan hasilnya `undefined`. Solusinya? Buat fungsi yang bisa **generate bilangan prima secara dinamis** — seberapapun besar N-nya.

---

<a name="konsep-dasar"></a>
## 🧠 Konsep Dasar Bilangan Prima

### Apa itu bilangan prima?

> Bilangan prima adalah bilangan yang **hanya bisa dibagi oleh 1 dan dirinya sendiri**, dimulai dari angka 2.

Urutan bilangan prima: **2, 3, 5, 7, 11, 13, 17, 19, 23...**

Contoh:
- `7` → prima ✅ (hanya habis dibagi 1 dan 7)
- `8` → bukan prima ❌ (habis dibagi 1, 2, 4, dan 8)

### Kenapa loop hanya sampai `√num`?

Ini adalah optimasi penting. Daripada cek semua angka dari 2 sampai `num`, kita cukup cek sampai **akar kuadrat** dari `num`.

**Kenapa bisa begitu?** Setiap faktor selalu punya pasangannya:

```
Faktor-faktor dari 36:
1  × 36
2  × 18
3  × 12
4  × 9
6  × 6  ← titik tengah (√36 = 6)
9  × 4  ← mulai terbalik
12 × 3  ← sudah pernah dicek
18 × 2  ← sudah pernah dicek
```

Setelah melewati titik tengah (`√36 = 6`), pasangannya hanya **terbalik** — tidak ada informasi baru. Jadi cukup cek sampai `√num` saja!

```javascript
// Dua cara menulis kondisi yang sama:
i <= Math.sqrt(num)  // memanggil fungsi Math setiap iterasi
i * i <= num         // ✅ lebih cepat, tidak perlu memanggil fungsi
```

---

<a name="isprime"></a>
## ✅ Fungsi `isPrime`

### Cara kerjanya

Fungsi ini menerima satu angka dan mengembalikan `true` jika prima, `false` jika bukan.

Strateginya:
1. Handle **edge case** dulu (angka kecil seperti 0, 1, 2, 3)
2. **Eliminasi cepat** kelipatan 2 dan 3 tanpa loop
3. **Loop** dari 5 sampai `√num` untuk sisa pengecekan

```javascript
const isPrime = (num) => {
  // Angka 0 dan 1 bukan prima, angka 2 dan 3 adalah prima
  if (num <= 3) return num === 2 || num === 3;

  // Eliminasi cepat: kelipatan 2 atau 3 sudah pasti bukan prima
  if (num % 2 === 0 || num % 3 === 0) return false;

  // Cek dari 5 sampai √num, loncat 2 (skip angka genap)
  for (let i = 5; i * i <= num; i += 2) {
    if (num % i === 0) return false; // ketemu pembagi → bukan prima
  }

  return true; // lolos semua pengecekan → prima!
};
```

### 💡 Kenapa `i` mulai dari 5?

Karena kelipatan 2 dan 3 sudah dieliminasi di atas. Angka berikutnya yang perlu dicek adalah 5. Dengan `i += 2` kita skip semua angka genap otomatis.

---

### 📊 Ringkasan Algoritma `isPrime`

**Konsep Inti:**
```
Cek edge case dulu (0, 1, 2, 3)
Eliminasi kelipatan 2 dan 3
Loop dari 5 sampai √num
Jika ada yang habis dibagi → bukan prima
```

**Step-by-Step:**
1. `num <= 3` → return `true` hanya untuk 2 dan 3
2. `num % 2 === 0 || num % 3 === 0` → langsung `false`
3. Loop `i = 5` sampai `i * i <= num`, dengan `i += 2`
4. Jika `num % i === 0` → return `false`
5. Lolos semua → return `true`

**Keywords:**
- 🔁 **for loop** — kondisi: `i * i <= num`
- ➗ **modulo** — `num % i === 0`
- 📐 **sqrt optimization** — loop hanya sampai √num
- ⚡ **early return** — langsung `false` begitu pembagi ditemukan
- ⏱️ **O(√n)** complexity

**Pitfalls (Jebakan Umum):**

```javascript
// ❌ SALAH — 0 dan 1 akan dianggap prima
for (let i = 2; i * i <= num; i++)

// ✅ BENAR — handle edge case dulu
if (num <= 3) return num === 2 || num === 3;
```

```javascript
// ❌ SALAH — terlalu banyak iterasi
for (let i = 5; i <= num; i += 2)

// ✅ BENAR — cukup sampai √num
for (let i = 5; i * i <= num; i += 2)
```

> 💡 **Insight:** Faktor selalu berpasangan. Setelah √num, pasangan hanya terbalik — tidak perlu dicek ulang!

---

<a name="getnthprime"></a>
## 🔢 Fungsi `getNthPrime`

### Cara kerjanya

Fungsi ini menerima angka `n` dan mengembalikan **bilangan prima ke-N**.

Strateginya sederhana: mulai dari angka 2, hitung terus berapa prima yang sudah ditemukan, berhenti ketika hitungannya mencapai N.

```javascript
const getNthPrime = (n) => {
  let num = 2;   // mulai dari prima pertama
  let count = 0; // sudah berapa prima yang ditemukan

  while (count < n) {
    if (isPrime(num)) count++; // kalau prima, tambah counter
    if (count < n) num++;      // kalau belum selesai, cek angka berikutnya
  }

  return num; // num sekarang adalah prima ke-N
};
```

### 💡 Kenapa ada dua `if` terpisah?

Ini bagian yang paling penting! Urutan sangat berpengaruh:

```
Mencari prima ke-3 (jawaban: 5)

num=2 → prima! count=1 → count < 3, num++ → num=3
num=3 → prima! count=2 → count < 3, num++ → num=4
num=4 → bukan prima → count < 3, num++ → num=5
num=5 → prima! count=3 → count TIDAK < 3, num TIDAK naik

return 5 ✅
```

Kalau `num++` dipindah ke luar (selalu jalan), maka `num` akan jadi 6 dan hasilnya salah!

---

### 📊 Ringkasan Algoritma `getNthPrime`

**Konsep Inti:**
```
Mulai dari angka 2
Hitung berapa prima yang sudah ditemukan
Loop sampai count mencapai N
Return angka saat count = N
```

**Step-by-Step:**
1. Init `num = 2`, `count = 0`
2. **while loop** selama `count < n`
3. Cek `isPrime(num)` → jika prima, `count++`
4. Jika `count` belum mencapai `n`, naikkan `num++`
5. Repeat sampai `count === n`
6. Return `num`

**Keywords:**
- 🔁 **while loop** — kondisi: `count < n`
- 🔢 **counter pattern** — lacak berapa prima ditemukan
- 🔗 **function call** — memanggil `isPrime` sebagai helper
- ⏹️ **stop condition** — berhenti saat `count === n`

**Pitfalls (Jebakan Umum):**

```javascript
// ❌ SALAH — num keburu naik, hasil meleset
if (isPrime(num)) count++;
num++; // selalu jalan!

// ✅ BENAR — num naik hanya jika belum selesai
if (isPrime(num)) count++;
if (count < n) num++;
```

```javascript
// ❌ SALAH — 0 dan 1 bukan prima, count tidak pernah naik
let num = 0;

// ✅ BENAR — mulai dari prima pertama
let num = 2;
```

> 💡 **Insight:** Dua kondisi `if` terpisah itu krusial! `count++` dulu, baru cek apakah `num` perlu naik. Kalau dibalik, jawaban akan meleset satu angka.

---

<a name="calculateorder"></a>
## 🏪 Fungsi Final `calculateOrder`

Setelah punya `isPrime` dan `getNthPrime`, fungsi utamanya jadi sangat bersih. Tidak perlu tahu _cara_ mencari prima — cukup panggil `getNthPrime`.

```javascript
const isPrime = (num) => {
  if (num <= 3) return num === 2 || num === 3;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
};

const getNthPrime = (n) => {
  let num = 2;
  let count = 0;

  while (count < n) {
    if (isPrime(num)) count++;
    if (count < n) num++;
  }

  return num;
};

const calculateOrder = (hour, price, age, previousOrders) => {
  const total = hour < 10 ? price * 0.9 : price; // diskon 10% sebelum jam 10
  const ageInDays = age * 365;                    // konversi tahun → hari
  const loyaltyTier = getNthPrime(previousOrders); // prima ke-N

  return { total, ageInDays, loyaltyTier };
};
```

### Hal yang diperbaiki dari versi awal

- `let total = 0` dihilangkan, langsung pakai **ternary operator**
- `if/else` diganti ternary yang lebih ringkas
- Array hardcoded `numbersPrime` diganti `getNthPrime` yang dinamis
- Object return pakai **shorthand ES6** `{ total, ageInDays, loyaltyTier }`

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan dengan Solusi Coddy

Solusi Coddy menghasilkan output yang sama, tapi ada beberapa perbedaan pendekatan:

| Aspek | Versi Coddy | Versi Kita |
|---|---|---|
| Struktur fungsi | `isPrime` & `getNthPrime` di **dalam** `calculateOrder` | Di **luar** (separated) |
| Memory | Fungsi dibuat ulang setiap kali dipanggil | Fungsi dibuat sekali |
| Kondisi sqrt | `Math.sqrt(num)` dipanggil tiap iterasi | `i * i <= num` lebih cepat |
| Eliminasi awal | Hanya kelipatan 2 | Kelipatan 2 **dan** 3 |
| Return point | Di dalam loop | Di luar loop (satu titik) |
| Object return | `{ total: total, ... }` verbose | `{ total, ... }` shorthand ES6 |

### Mana yang lebih baik?

Secara fungsionalitas **keduanya benar**. Tapi versi kita sedikit lebih optimal karena:

- **Separated functions** → lebih mudah di-reuse dan di-test secara independen
- **`i * i`** → tidak perlu memanggil `Math.sqrt` di setiap iterasi loop
- **Eliminasi kelipatan 3** → lebih sedikit iterasi di dalam loop
- **Single return point** → alur kode lebih mudah dibaca

> 💡 **Prinsip yang dipelajari:** Pecah fungsi menjadi kecil-kecil itu best practice! `calculateOrder` tidak perlu tahu _cara_ cari prima — cukup panggil `getNthPrime`. Ini namanya **separation of concerns**.

---

_Selesai! Dokumentasi ini dibuat sebagai catatan pribadi dari sesi belajar algoritma bilangan prima dalam JavaScript._ 🎉
