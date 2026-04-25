# ⚙️ Cara Kerja — Recursion — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Recursion-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Deep%20Dive-purple?style=for-the-badge)

---

## 📑 Daftar Isi

- 🔬 [Mekanisme di Balik Layar](#mekanisme)
- 📊 [Visualisasi Langkah demi Langkah](#visualisasi)
- 🧵 [Hubungan dengan Call Stack](#hubungan)
- ⚠️ [Gotcha & Perilaku Tidak Terduga](#gotcha)
- 🔗 [Navigation](#navigation)

---

<a name="mekanisme"></a>
## 🔬 Mekanisme di Balik Layar

Ketika JavaScript menjalankan fungsi rekursif, ini yang terjadi step by step:

**Step 1: Fungsi Dipanggil — Eksekusi Dimulai**

Setiap kali sebuah fungsi dipanggil, JavaScript membuat sebuah **Execution Context** baru dan menaruhnya di atas **Call Stack**. Call Stack adalah struktur data tipe "LIFO" (*Last In, First Out*) — yang terakhir masuk, yang pertama keluar.

```js
function total(n) {
  if (n === 1) return 1;
  return n + total(n - 1);
}

total(3); // ← Saat baris ini dijalankan, JavaScript mulai menumpuk Call Stack
```

**Step 2: Fase Turun (Recursive Descent) — Menumpuk Stack**

Setiap pemanggilan rekursif menambahkan satu "lapisan" baru ke Call Stack. Fungsi yang sudah dipanggil **tidak selesai dulu** — dia menunggu jawaban dari pemanggilan di bawahnya.

```js
// total(3) dipanggil → menunggu total(2)
// total(2) dipanggil → menunggu total(1)
// total(1) dipanggil → BASE CASE! return 1 (langsung selesai)
```

**Step 3: Base Case Tercapai — Titik Balik**

Saat kondisi base case terpenuhi, fungsi paling dalam di stack **mengembalikan nilai konkret** dan langsung dihapus dari stack. Inilah titik di mana rekursif "berbalik arah".

```js
if (n === 1) return 1; // ← total(1) selesai, return 1, keluar dari stack
```

**Step 4: Fase Naik (Unwinding) — Stack Mengempis**

Setelah base case selesai, nilai yang dikembalikan "naik" ke fungsi sebelumnya. Fungsi tersebut menerima nilainya, menyelesaikan perhitungannya, lalu keluar dari stack. Proses ini berlanjut hingga stack benar-benar kosong.

```js
// total(1) selesai → return 1 ke total(2)
// total(2) dapat 1, hitung 2 + 1 = 3 → return 3 ke total(3)
// total(3) dapat 3, hitung 3 + 3 = 6 → return 6 ke pemanggil awal
```

---

<a name="visualisasi"></a>
## 📊 Visualisasi Langkah demi Langkah

Kita gunakan `total(3)` sebagai contoh.

### 📉 Fase Turun — Call Stack Menumpuk

```
CALL STACK (membaca dari bawah ke atas):

Langkah 1: total(3) dipanggil
┌─────────────────────────┐
│  total(3) — menunggu... │ ← Active
├─────────────────────────┤
│  Global Context         │
└─────────────────────────┘

Langkah 2: total(3) memanggil total(2)
┌─────────────────────────┐
│  total(2) — menunggu... │ ← Active
├─────────────────────────┤
│  total(3) — menunggu... │
├─────────────────────────┤
│  Global Context         │
└─────────────────────────┘

Langkah 3: total(2) memanggil total(1)
┌─────────────────────────┐
│  total(1) — return 1 ✅  │ ← Active (BASE CASE!)
├─────────────────────────┤
│  total(2) — menunggu... │
├─────────────────────────┤
│  total(3) — menunggu... │
├─────────────────────────┤
│  Global Context         │
└─────────────────────────┘
```

### 📈 Fase Naik (Unwinding) — Call Stack Mengempis

```
Langkah 4: total(1) selesai, return 1 → naik ke total(2)
┌─────────────────────────┐
│  total(2): 2 + 1 = 3 ✅  │ ← Active (selesai!)
├─────────────────────────┤
│  total(3) — menunggu... │
├─────────────────────────┤
│  Global Context         │
└─────────────────────────┘

Langkah 5: total(2) selesai, return 3 → naik ke total(3)
┌─────────────────────────┐
│  total(3): 3 + 3 = 6 ✅  │ ← Active (selesai!)
├─────────────────────────┤
│  Global Context         │
└─────────────────────────┘

Langkah 6: total(3) selesai, return 6 → Stack bersih!
┌─────────────────────────┐
│  Global Context         │
└─────────────────────────┘

// Output: 6 ✅
```

### 🎯 Tracing Eksekusi: Pola "V-Shape"

Rekursif selalu membentuk pola **huruf V** — turun ke dasar, lalu naik kembali dengan membawa nilai.

```
total(3)
  │
  └── 3 + total(2)            ← Menunggu...
              │
              └── 2 + total(1)  ← Menunggu...
                        │
                        └── 1   ← BASE CASE! Mulai balik

                        └── 1
              └── 2 + 1 = 3
  └── 3 + 3   = 6

Hasil Akhir: 6 ✅
```

---

<a name="hubungan"></a>
## 🧵 Hubungan dengan Call Stack

### Rekursif + Call Stack

Call Stack adalah **jantung** dari cara kerja rekursif. Setiap pemanggilan fungsi baru = satu "piring" ditaruh di atas tumpukan. Setiap fungsi selesai = satu piring diambil.

```js
// Setiap baris ini menambah SATU piring ke Call Stack:
total(3)        // Piring 1
  total(2)      // Piring 2
    total(1)    // Piring 3 (paling atas, paling pertama selesai)
```

JavaScript Engine (V8 di Chrome/Node.js) mengalokasikan ukuran Call Stack yang terbatas di memori. Jika terlalu banyak "piring" ditumpuk melebihi batas tersebut, engine akan melempar error.

### Rekursif + Immutability (Functional Programming)

Berbeda dengan `for` loop yang harus mengubah variabel `counter`, rekursif **tidak pernah mengubah variabel yang sudah ada**. Setiap pemanggilan fungsi menerima nilai baru sebagai argumen — nilai lama tidak disentuh.

```js
// ❌ Loop — counter BERUBAH setiap iterasi (mutation)
for (let counter = 0; counter <= n; counter++) { /* ... */ }

// ✅ Rekursif — tidak ada yang berubah, hanya nilai baru yang diteruskan
function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1); // n tidak diubah, kita hanya MENERUSKAN nilai baru (n-1)
}
```

---

<a name="gotcha"></a>
## ⚠️ Gotcha & Perilaku Tidak Terduga

### Gotcha #1 — Lupa Base Case → Stack Overflow

**Yang biasanya diasumsikan:**
```js
// "Fungsi ini akan berhenti sendiri suatu saat..."
function panggilSaya() {
  console.log("Halo!");
  panggilSaya();
}
panggilSaya();
```

**Yang sebenarnya terjadi:**
```js
// ❌ RangeError: Maximum call stack size exceeded
// JavaScript terus menumpuk piring ke Call Stack
// sampai memori habis dan program crash
```

> 💡 **Kenapa?** Setiap pemanggilan fungsi menambah satu Execution Context ke Call Stack. Tanpa Base Case, tidak ada pemanggilan fungsi yang pernah selesai dan dikeluarkan dari stack — sehingga stack terus penuh sampai meledak.

---

### Gotcha #2 — Base Case Salah → Infinite Loop Tersembunyi

**Yang biasanya diasumsikan:**
```js
// "n === 0 sudah cukup sebagai batas"
function total(n) {
  if (n === 0) return 0;
  return n + total(n - 1);
}

total(3);  // ✅ Bekerja normal
total(-1); // ← Apa yang terjadi di sini?
```

**Yang sebenarnya terjadi:**
```js
total(-1)
// n === 0? Tidak (-1 tidak pernah sama dengan 0)
// Rekursif terus berjalan: total(-2), total(-3), total(-4)...
// ❌ RangeError: Maximum call stack size exceeded
```

> 💡 **Kenapa?** Base Case `n === 0` hanya menangkap nilai tepat `0`. Kalau nilai awal sudah di bawah 0 (negatif), kondisi `n === 0` tidak akan pernah terpenuhi. Solusinya: gunakan `n <= 0` atau `n < 0` untuk menangkap semua kasus batas.

**Solusi yang lebih aman:**
```js
function total(n) {
  if (n <= 0) return 0; // ✅ Menangkap 0 DAN semua angka negatif
  return n + total(n - 1);
}

total(-1); // return 0, aman!
```

---

### Gotcha #3 — Rekursif Tidak Selalu "Lebih Elegan"

**Yang biasanya diasumsikan:**
```js
// "Rekursif pasti lebih bagus dari loop"
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(100000); // ← Apa yang terjadi?
```

**Yang sebenarnya terjadi:**
```js
// ❌ RangeError: Maximum call stack size exceeded
// Karena Call Stack harus menampung 100.000 "piring" sekaligus
```

> 💡 **Kenapa?** Rekursif mengkonsumsi memori lebih banyak dari loop biasa karena setiap pemanggilan harus "mengingat" di mana dia berada di stack. Untuk iterasi dengan jumlah yang sudah diketahui dan besar, `for` loop jauh lebih aman dan efisien.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 01 — Pengantar Konsep](./01-pengantar-konsep_rekursif.md)**
- **📖 [Lanjut ke Part 03 — Sintaks & Penggunaan →](./03-sintaks-penggunaan_rekursif.md)**
