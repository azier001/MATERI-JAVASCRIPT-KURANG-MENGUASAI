# 📋 Challenge Overview — Gambaran Challenge

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Algorithm%20Logic-blue?style=for-the-badge)

---

## 📑 Daftar Isi

- 🧩 [Deskripsi Challenge](#deskripsi)
- 📏 [Aturan Challenge](#aturan)
- 📤 [Contoh Input & Output](#contoh)
- 🧠 [Pemahaman Awal](#pemahaman)

---

<a name="deskripsi"></a>
## 🧩 Deskripsi Challenge

Bayangkan kamu seorang kasir yang diminta menghitung total nomor undian dari nomor awal sampai nomor akhir. Misalnya, bos bilang "Jumlahkan semua nomor undian dari 3 sampai 7!" — artinya kamu harus menjumlahkan 3 + 4 + 5 + 6 + 7. Tapi kadang si bos ceroboh dan menyebut nomor besar duluan: "Dari 7 sampai 3!" — tetap saja, hasilnya harus sama.

Secara teknis, kamu diminta membuat fungsi `getSum(a, b)` yang menerima dua bilangan bulat `a` dan `b` (bisa positif atau negatif), lalu mengembalikan **jumlah dari semua bilangan bulat di antara keduanya** (termasuk `a` dan `b` itu sendiri). Jika kedua angka sama, kembalikan salah satunya.

> ⚠️ **Catatan penting:** Urutan `a` dan `b` tidak dijamin! `a` bisa lebih besar, lebih kecil, atau sama dengan `b`. Kamu harus menentukan sendiri mana batas bawah dan batas atasnya.

---

<a name="aturan"></a>
## 📏 Aturan Challenge

| Aturan | Keterangan |
|--------|------------|
| 📦 Format Input | Dua bilangan bulat `a` dan `b` (bisa positif, negatif, atau nol) |
| 📤 Format Output | Satu bilangan bulat berupa total penjumlahan deret |
| 🔀 Urutan Tidak Dijamin | `a` bisa lebih besar dari `b`, atau sebaliknya |
| 🟰 Angka Sama | Jika `a == b`, kembalikan `a` atau `b` |

---

<a name="contoh"></a>
## 📤 Contoh Input & Output

```js
console.log(getSum(1, 0));
// Output: 1
```

```js
console.log(getSum(-1, 2));
// Output: 2
```

```js
console.log(getSum(1, 1));
// Output: 1
```

### Kenapa `getSum(-1, 2)` hasilnya `2`?

```
Mulai dengan a = -1, b = 2

Deret angka dari -1 sampai 2:

  -1 → tambahkan ke total → total = -1
   0 → tambahkan ke total → total = -1 + 0 = -1
   1 → tambahkan ke total → total = -1 + 1 = 0
   2 → tambahkan ke total → total = 0 + 2 = 2 ✅

Output: 2
```

> 💡 **Perhatikan:** Angka negatif dan nol tetap ikut dijumlahkan! Jangan abaikan mereka hanya karena nilainya kecil atau nol.

---

<a name="pemahaman"></a>
## 🧠 Pemahaman Awal

Sebelum menulis kode, ada 3 pertanyaan kunci yang harus dijawab:

**1. Bagaimana cara menentukan angka mana yang lebih kecil dan lebih besar?**
> Karena urutan `a` dan `b` tidak dijamin, kita perlu menentukan `min` (batas bawah) dan `max` (batas atas) terlebih dahulu. Bisa pakai `if-else`, `Math.min()` / `Math.max()`, atau `Math.abs()`.

**2. Bagaimana cara menjumlahkan semua angka dalam rentang tersebut?**
> Ada dua pendekatan: menggunakan **perulangan (loop)** dari `min` sampai `max`, atau menggunakan **Rumus Gauss (Deret Aritmatika)** yang menghitung hasilnya secara instan tanpa loop.

**3. Bagaimana jika kedua angka sama?**
> Tidak perlu penanganan khusus. Jika `a == b`, loop hanya berjalan sekali dan Rumus Gauss tetap menghasilkan angka itu sendiri.

```
getSum(a, b)
  │
  ├── a == b → return a                         ← EDGE CASE
  │
  └── a != b
        │
        ├── STEP 1: Tentukan min dan max
        ├── STEP 2: Jumlahkan semua angka dari min sampai max
        └── STEP 3: return total
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 02 — Problem Solving Approach →](./02-problem-solving-approach.md)**
