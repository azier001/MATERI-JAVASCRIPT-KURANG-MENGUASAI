# 🧠 Problem Solving Approach — Alur Berpikir

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20Sorting%20|%202D%20Array%20|%20String-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🔍 [Langkah 1 — Pahami Masalah](#langkah-1)
- 🔎 [Langkah 2 — Urutkan Bunga (Sorting)](#langkah-2)
- 📐 [Langkah 3 — Pahami Rumus Index Grid 2D](#langkah-3)
- 🧱 [Langkah 4 — Bangun Kebun (Grid Filling)](#langkah-4)
- 🔄 [Langkah 5 — Balik Bunga Terpanjang (Reverse)](#langkah-5)
- 🔗 [Langkah 6 — Gabungkan Menjadi Pseudocode](#langkah-6)
- ❌ [Kesalahan Pertama Saya](#kesalahan)

---

<a name="langkah-1"></a>
## 🔍 Langkah 1 — Pahami Masalah

Sebelum menulis kode, terjemahkan dulu masalahnya ke bahasa sederhana:

> *"Saya punya sekantong bunga dengan nama-nama berbeda. Saya harus mengurutkan bunga dari nama terpendek ke terpanjang, lalu menaruhnya satu per satu ke dalam petak kebun persegi. Bunga yang namanya paling panjang harus dibalik hurufnya. Petak yang tersisa diisi 'Empty'."*

4 pertanyaan kunci:
- **Apa yang harus dilakukan pertama kali?** → Urutkan bunga berdasarkan panjang nama (ascending).
- **Bagaimana cara mengisi grid 2D dari array 1D?** → Gunakan nested loop dan rumus index `(i * gridSize) + j`.
- **Bagaimana menentukan bunga mana yang harus dibalik?** → Bunga di index terakhir array yang sudah diurutkan (paling panjang).
- **Apa yang terjadi kalau bunga habis sebelum grid penuh?** → Sisa petak diisi string `"Empty"`.

---

<a name="langkah-2"></a>
## 🔎 Langkah 2 — Urutkan Bunga (Sorting)

Langkah pertama adalah mengurutkan bunga. Bayangkan kamu punya kartu-kartu nama bunga dan harus menyusunnya berdasarkan jumlah huruf:

```
SEBELUM SORT (acak):
┌──────────┐ ┌───────────────┐ ┌────────┐ ┌──────────┐
│   Rose   │ │   Sunflower   │ │  Lily  │ │  Tulip   │
│ (4 huruf)│ │  (9 huruf)    │ │(4 huruf)│ │(5 huruf) │
└──────────┘ └───────────────┘ └────────┘ └──────────┘

SESUDAH SORT (pendek → panjang):
┌────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐
│  Rose  │ │   Lily   │ │  Tulip   │ │   Sunflower   │
│(4 huruf)│ │(4 huruf) │ │(5 huruf) │ │  (9 huruf)    │
└────────┘ └──────────┘ └──────────┘ └───────────────┘
   idx 0      idx 1        idx 2          idx 3
```

Caranya: gunakan `Array.sort()` dengan callback `(a, b) => a.length - b.length`.

> 💡 **Kenapa `a.length - b.length`?** Jika hasilnya **negatif**, `a` tetap di depan `b`. Jadi bunga yang namanya lebih pendek otomatis bergeser ke depan — menghasilkan urutan ascending.

---

<a name="langkah-3"></a>
## 📐 Langkah 3 — Pahami Rumus Index Grid 2D

Ini bagian yang paling krusial. Kita punya bunga di array satu baris (1D), tapi harus memasukkannya ke dalam grid berbaris dan berkolom (2D).

**Analogi:** Bayangkan kamu mengisi **kotak cokelat** yang punya sekat-sekat. Kamu rogoh kantong cokelat satu per satu, lalu taruh ke sekat dari kiri ke kanan, baris demi baris.

```
Bunga di Array 1D:
Index:  0       1       2       3
      ["Rose", "Lily", "Tulip", "rewoflnuS"]

Mau diisi ke Grid 3x3:
         Kolom 0    Kolom 1    Kolom 2
       ┌──────────┬──────────┬──────────┐
Baris 0│  idx 0   │  idx 1   │  idx 2   │
       │  "Rose"  │  "Lily"  │ "Tulip"  │
       ├──────────┼──────────┼──────────┤
Baris 1│  idx 3   │  idx 4   │  idx 5   │
       │"rewoflnuS"│ "Empty" │ "Empty"  │
       ├──────────┼──────────┼──────────┤
Baris 2│  idx 6   │  idx 7   │  idx 8   │
       │ "Empty"  │ "Empty"  │ "Empty"  │
       └──────────┴──────────┴──────────┘

RUMUS: flowerIndex = (baris * gridSize) + kolom
  (0 * 3) + 0 = 0  →  "Rose"
  (0 * 3) + 1 = 1  →  "Lily"
  (0 * 3) + 2 = 2  →  "Tulip"
  (1 * 3) + 0 = 3  →  "rewoflnuS"
  (1 * 3) + 1 = 4  →  idx 4 >= 4 bunga → "Empty"
  ...dst
```

> 💡 **Rumus `(i * gridSize) + j`** adalah jembatan utama antara dunia 1D (array biasa) dan dunia 2D (grid/tabel). Konsep ini dipakai di banyak tempat: game board, pixel processing, spreadsheet, dll.

---

<a name="langkah-4"></a>
## 🧱 Langkah 4 — Bangun Kebun (Grid Filling)

Sekarang kita tahu rumusnya. Proses mengisi kebun bisa divisualisasikan seperti ini:

```
Untuk setiap petak di grid:
  ┌───────────────────────────────────────┐
  │  Hitung flowerIndex = (i * gridSize) + j  │
  │                                       │
  │  flowerIndex < jumlah bunga?          │
  │     ├── YA  → Taruh bunga             │
  │     └── TIDAK → Taruh "Empty"         │
  └───────────────────────────────────────┘
```

Kunci logika pengecekan:
- **BENAR:** `flowerIndex < sortedFlowers.length` — cek apakah stok bunga masih ada.
- **SALAH:** `flowerIndex < gridSize` — ini hanya membandingkan dengan ukuran sisi, bukan jumlah bunga!

---

<a name="langkah-5"></a>
## 🔄 Langkah 5 — Balik Bunga Terpanjang (Reverse)

Karena array sudah diurutkan ascending, bunga terpanjang **selalu** ada di index terakhir. Tidak perlu loop mencari lagi!

```
sortedFlowers = ["Rose", "Lily", "Tulip", "Sunflower"]
                   idx 0   idx 1   idx 2     idx 3 ← INI! (length - 1)

Proses reverse string:
  "Sunflower"
      │
      ├── .split('')    → ["S","u","n","f","l","o","w","e","r"]
      ├── .reverse()    → ["r","e","w","o","l","f","n","u","S"]
      └── .join('')     → "rewoflnuS" ✅
```

> 💡 **Timing penting!** Lakukan reverse **SEBELUM** memasukkan bunga ke grid. Prinsipnya: *"Jangan mencari barang yang baru saja kamu pegang."* Lebih efisien daripada memasukkan ke grid dulu lalu mencari lokasinya untuk dibalik.

---

<a name="langkah-6"></a>
## 🔗 Langkah 6 — Gabungkan Menjadi Pseudocode

```
FUNCTION arrangeFlowerGarden(flowerNames, gridSize):
  1. Salin flowerNames → sortedFlowers (agar data asli aman)
  2. Sort sortedFlowers berdasarkan panjang nama (ascending)
  3. JIKA sortedFlowers ada isinya:
       → Balik huruf bunga di index terakhir (terpanjang)
  4. Buat array kosong "garden"
  5. UNTUK setiap baris i (0 sampai gridSize-1):
       a. Buat array kosong "row"
       b. UNTUK setiap kolom j (0 sampai gridSize-1):
            - Hitung flowerIndex = (i * gridSize) + j
            - JIKA flowerIndex < jumlah bunga → push bunga
            - SELAIN ITU → push "Empty"
       c. Push row ke garden
  6. Return garden
```

Dari pseudocode ini, kita bisa membuat kode JavaScript yang sesungguhnya.
Masing-masing dibahas di **Part 3 sampai Part 5**.

---

<a name="kesalahan"></a>
## ❌ Kesalahan Pertama Saya

Saat pertama kali mencoba, saya membuat kesalahan pada kondisi pengecekan apakah bunga masih tersedia:

```javascript
// ❌ SALAH — membandingkan dengan gridSize, bukan jumlah bunga
if (flowerIndex < gridSize) {
  row.push(sortedFlowers[flowerIndex]);
} else {
  row.push('Empty');
}
```

**Masalah:** `gridSize` adalah ukuran sisi kebun (misal: 3), bukan jumlah bunga. Jika kita punya 5 bunga dan `gridSize = 3`, maka bunga ke-4 dan ke-5 (index 3 dan 4) tidak akan pernah tertanam karena `3 < 3` sudah `false`.

```javascript
// ✅ BENAR — bandingkan dengan panjang array bunga
if (flowerIndex < sortedFlowers.length) {
  row.push(sortedFlowers[flowerIndex]);
} else {
  row.push('Empty');
}
```

Detail lengkap dibahas di:
**📖 [Part 03 — V1 User Approach →](./03-v1-user-approach_pendekatan-user.md)**

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 01 — Challenge Overview](./01-challenge-overview_gambaran-tantangan.md)**
- **📖 [Lanjut ke Part 03 — V1 User Approach →](./03-v1-user-approach_pendekatan-user.md)**
