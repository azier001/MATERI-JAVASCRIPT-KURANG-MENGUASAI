# 📚 Min Product Pair - Part 1: Konsep Dasar

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║             📖 PART 1: KONSEP DASAR & PENJELASAN KODE 📖                ║
║                                                                          ║
║              Memahami Double Loop dan Pencarian Nilai Minimum            ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 📋 Tujuan | 🔍 Kode | 📖 Penjelasan | 🧩 Konsep | ✅ Ringkasan |
|:---------:|:-------:|:-------------:|:---------:|:-----------:|
| [Jump](#-tujuan-pembelajaran) | [Jump](#-kode-lengkap) | [Jump](#-penjelasan-baris-per-baris) | [Jump](#-konsep-penting) | [Jump](#-ringkasan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami kenapa `Infinity` dipakai sebagai nilai awal
- ✅ Paham cara kerja double loop untuk mengecek semua kombinasi
- ✅ Mengerti pola pencarian nilai minimum
- ✅ Siap mengerjakan challenge di Part 2

---

## 💻 Kode Lengkap

```javascript
const poleLengths = [7, 2, 9, 4, 3, 6];

let minProduct = Infinity;
let smallestPair = [];

for (let i = 0; i < poleLengths.length - 1; i++) {
  for (let j = i + 1; j < poleLengths.length; j++) {
    const currentProduct = poleLengths[i] * poleLengths[j];

    if (currentProduct < minProduct) {
      minProduct = currentProduct;
      smallestPair = [poleLengths[i], poleLengths[j]];
    }
  }
}

console.log("minProduct:", minProduct);
// → 6

console.log("smallestPair:", smallestPair);
// → [2, 3]
```

---

## 📖 Penjelasan Baris per Baris

### 1️⃣ Inisialisasi Variabel

```javascript
let minProduct = Infinity;
let smallestPair = [];
```

| Variabel | Nilai Awal | Alasan |
|----------|-----------|--------|
| `minProduct` | `Infinity` | Nilai apapun dari array **pasti lebih kecil** dari `Infinity`, sehingga perbandingan pertama selalu berhasil masuk ke blok `if` |
| `smallestPair` | `[]` | Array kosong sebagai wadah, akan diisi saat pasangan terkecil ditemukan |

> 💡 **Kenapa bukan `0` atau `null`?**
> Kalau `minProduct = 0`, maka tidak ada product yang lebih kecil dari `0` (karena semua elemen positif), sehingga `minProduct` tidak pernah terupdate.

---

### 2️⃣ Outer Loop (i)

```javascript
for (let i = 0; i < poleLengths.length - 1; i++)
```

| Bagian | Nilai | Penjelasan |
|--------|-------|------------|
| Start | `0` | Mulai dari elemen pertama |
| Stop | `length - 1` | Berhenti sebelum elemen terakhir, karena `i` selalu butuh `j` di sebelah kanannya |

---

### 3️⃣ Inner Loop (j)

```javascript
for (let j = i + 1; j < poleLengths.length; j++)
```

| Bagian | Nilai | Penjelasan |
|--------|-------|------------|
| Start | `i + 1` | Selalu satu langkah di depan `i`, menghindari elemen yang sama dan pasangan duplikat |
| Stop | `length` | Bisa mencapai elemen terakhir |

---

### 4️⃣ Menghitung Product & Menyimpan Minimum

```javascript
const currentProduct = poleLengths[i] * poleLengths[j];

if (currentProduct < minProduct) {
  minProduct = currentProduct;
  smallestPair = [poleLengths[i], poleLengths[j]];
}
```

Setiap iterasi, kalikan dua elemen yang sedang dibandingkan. Jika hasilnya lebih kecil dari `minProduct` saat ini, update keduanya.

---

## 🧩 Konsep Penting

### Semua Kombinasi Pasangan

Dengan array `[7, 2, 9, 4, 3, 6]`, double loop mengecek semua kombinasi berikut:

```
i=0 (7)  → j=1(2): 7×2=14  | j=2(9): 7×9=63  | j=3(4): 7×4=28  | j=4(3): 7×3=21  | j=5(6): 7×6=42
i=1 (2)  → j=2(9): 2×9=18  | j=3(4): 2×4=8   | j=4(3): 2×3=6 ✅| j=5(6): 2×6=12
i=2 (9)  → j=3(4): 9×4=36  | j=4(3): 9×3=27  | j=5(6): 9×6=54
i=3 (4)  → j=4(3): 4×3=12  | j=5(6): 4×6=24
i=4 (3)  → j=5(6): 3×6=18
```

> ✅ Product terkecil ditemukan: `2 × 3 = 6`

---

### Kenapa j Dimulai dari i + 1?

```
❌ Kalau j = 0:          ✅ Kalau j = i + 1:
   i=0, j=0 → 7×7 (sama!)   i=0, j=1 → 7×2 ✅
   i=0, j=1 → 7×2           i=1, j=2 → 2×9 ✅
   i=1, j=0 → 2×7 (duplikat) i=1, j=3 → 2×4 ✅
```

Dengan `j = i + 1`:
- Tidak ada elemen yang dipasangkan dengan dirinya sendiri
- Tidak ada pasangan yang dicek dua kali

---

### Visualisasi Proses Update minProduct

```
Iterasi       | currentProduct | minProduct (sebelum) | Update?
------------- | -------------- | -------------------- | -------
i=0, j=1      | 7 × 2  = 14   | Infinity             | ✅ → 14
i=0, j=2      | 7 × 9  = 63   | 14                   | ❌
i=0, j=3      | 7 × 4  = 28   | 14                   | ❌
i=0, j=4      | 7 × 3  = 21   | 14                   | ❌
i=0, j=5      | 7 × 6  = 42   | 14                   | ❌
i=1, j=2      | 2 × 9  = 18   | 14                   | ❌
i=1, j=3      | 2 × 4  = 8    | 14                   | ✅ → 8
i=1, j=4      | 2 × 3  = 6    | 8                    | ✅ → 6
i=1, j=5      | 2 × 6  = 12   | 6                    | ❌
...           | ...            | 6                    | ❌
```

> ✅ Final: `minProduct = 6`, `smallestPair = [2, 3]`

---

## ✅ Ringkasan

| Konsep | Detail |
|--------|--------|
| `Infinity` | Nilai awal yang pasti lebih besar dari semua product |
| `i < length - 1` | `i` tidak perlu sampai elemen terakhir karena butuh pasangan di kanannya |
| `j = i + 1` | Menghindari elemen sama dan pasangan duplikat |
| `if (currentProduct < minProduct)` | Update hanya jika ditemukan yang lebih kecil |
| `let` bukan `const` | `smallestPair` dan `minProduct` perlu di-reassign di dalam loop |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **🎋 [Lanjut ke Part 2: Challenge →](02-challenge.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
