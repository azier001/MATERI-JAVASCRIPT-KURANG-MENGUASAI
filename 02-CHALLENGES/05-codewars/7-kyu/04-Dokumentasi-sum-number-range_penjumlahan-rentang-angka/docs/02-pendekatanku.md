# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

Soal ini meminta kita **menjumlahkan semua angka** di antara dua bilangan bulat `a` dan `b` (termasuk keduanya).

Dua masalah utama langsung teridentifikasi:

1. **Urutan tidak dijamin** — `a` bisa lebih besar dari `b`, jadi kita harus tentukan dulu mana batas bawah (min) dan batas atas (max).
2. **Cara menjumlahkan** — setelah tahu batasnya, kita bisa "berjalan" dari min ke max sambil mengakumulasi totalnya menggunakan `for` loop.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```text
1. Terima dua parameter: a dan b
2. Deklarasikan variabel min dan max
3. Cek apakah a lebih besar dari b:
   - Jika iya → min = b, max = a
   - Jika tidak → min = a, max = b
4. Buat variabel `total` dengan nilai awal 0
5. Gunakan for loop dari min hingga max (inklusif)
6. Pada setiap putaran, tambahkan index ke total
7. Kembalikan total
```

---

## 🎨 Visualisasi Alur

```
[Input] → getSum(-1, 2)

Langkah 1: Tentukan batas
  a = -1, b = 2
  Apakah a > b? → -1 > 2? → TIDAK
  → min = a = -1
  → max = b = 2

Langkah 2: Inisialisasi penampung
  total = 0

Langkah 3: For loop dari min (-1) sampai max (2)
  ┌────────┬───────┬────────────────────┐
  │ Putaran│  i    │  total += i        │
  ├────────┼───────┼────────────────────┤
  │   1    │  -1   │  0 + (-1) = -1     │
  │   2    │   0   │  -1 + 0  = -1      │
  │   3    │   1   │  -1 + 1  =  0      │
  │   4    │   2   │   0 + 2  =  2      │
  └────────┴───────┴────────────────────┘

Langkah 4: Return total
  → 2

[Output] → 2
```

---

## 🔄 Percobaan Pertama — `if-else` + `for` loop

Pendekatan paling mendasar: tentukan min/max dengan `if-else`, lalu jumlahkan dengan `for` loop.

```javascript
const getSum = (a, b) => {
  let min, max;

  if (a > b) {
    min = b;
    max = a;
  } else {
    min = a;
    max = b;
  }

  let total = 0;

  for (let i = min; i <= max; i++) {
    total += i;
  }

  return total;
};
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Sangat eksplisit, setiap langkah jelas terlihat |
| Keringkasan | ⭐⭐⭐ Cukup panjang (ada blok if-else 6 baris) |
| Pendekatan | Imperatif — cek kondisi manual, lalu loop akumulasi |

> 💡 **Catatan penting**: Awalnya loop menggunakan `i < max`, tapi ini menyebabkan angka terakhir (`max`) tidak ikut dijumlahkan. Setelah menyadari keyword "**including**" di soal, diperbaiki menjadi `i <= max`.

---

## ✅ Solusi Final — Versi yang Sama (Sudah Benar Sejak Awal)

Karena percobaan pertama langsung lulus, solusi final identik:

```javascript
const getSum = (a, b) => {
  let min, max;

  if (a > b) {
    min = b;
    max = a;
  } else {
    min = a;
    max = b;
  }

  let total = 0;

  for (let i = min; i <= max; i++) {
    total += i;
  }

  return total;
};
```

---

## 🔍 Penjelasan Baris per Baris

```javascript
const getSum = (a, b) => {       // Deklarasi fungsi dengan arrow function
  let min, max;                  // Siapkan wadah untuk batas bawah & atas
                                 // (belum diisi nilai — akan diisi oleh if-else)

  if (a > b) {                   // Cek: apakah a lebih besar dari b?
    min = b;                     //   Ya → b adalah angka terkecil
    max = a;                     //         a adalah angka terbesar
  } else {                       //   Tidak → (a <= b)
    min = a;                     //         a adalah angka terkecil
    max = b;                     //         b adalah angka terbesar
  }

  let total = 0;                 // Wadah penampung hasil, mulai dari 0

  for (let i = min; i <= max; i++) {  // Loop dari min sampai max (inklusif)
    total += i;                       // Tambahkan nilai i ke total
  }                                   // (total = total + i)

  return total;                  // Kembalikan hasil akhir penjumlahan
};
```

---

## 📈 Potensi Evolusi Solusi

```
V1 / Final (if-else + for loop)       Alternatif (Gauss Formula)
──────────────────────────────         ──────────────────────────
const getSum = (a, b) => {             const getSum = (a, b) =>
  let min, max;                    →     (Math.abs(a - b) + 1)
  if (a > b) { ... }                    * (a + b) / 2;
  else { ... }
  let total = 0;
  for (...) { total += i; }
  return total;
};
(19 baris)                             (2 baris, O(1))
```

> 💡 Solusi kita menggunakan **O(n) Time Complexity** (harus mengunjungi setiap angka satu per satu). Alternatif menggunakan rumus Gauss bisa mencapai **O(1)** — langsung dapat jawaban tanpa looping. Lihat detail di [03-refleksi.md](03-refleksi.md).

---

## 🧪 Verifikasi Manual

| Input `(a, b)` | `min` | `max` | Rentang | Hasil | Expected | Status |
|:--------------:|:-----:|:-----:|:-------:|:-----:|:--------:|:------:|
| `(1, 0)` | `0` | `1` | `[0, 1]` | `1` | `1` | ✅ |
| `(1, 2)` | `1` | `2` | `[1, 2]` | `3` | `3` | ✅ |
| `(2, 2)` | `2` | `2` | `[2]` | `2` | `2` | ✅ |
| `(-1, 0)` | `-1` | `0` | `[-1, 0]` | `-1` | `-1` | ✅ |
| `(-1, 2)` | `-1` | `2` | `[-1, 0, 1, 2]` | `2` | `2` | ✅ |

```javascript
console.log(getSum(1, 0));  // → 1 ✅
console.log(getSum(1, 2));  // → 3 ✅
console.log(getSum(2, 2));  // → 2 ✅
console.log(getSum(-1, 0)); // → -1 ✅
console.log(getSum(-1, 2)); // → 2 ✅
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
