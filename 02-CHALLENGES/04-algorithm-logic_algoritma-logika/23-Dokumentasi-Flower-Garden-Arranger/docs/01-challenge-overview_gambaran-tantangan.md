# 📋 Challenge Overview — Gambaran Challenge

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20Sorting%20|%202D%20Array%20|%20String-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🧩 [Deskripsi Challenge](#deskripsi)
- 📏 [Aturan Challenge](#aturan)
- 📤 [Contoh Input & Output](#contoh)
- 🧠 [Pemahaman Awal](#pemahaman)

---

<a name="deskripsi"></a>
## 🧩 Deskripsi Challenge

Bayangkan kamu seorang tukang kebun yang ingin menata berbagai bunga di sebuah kebun persegi pada sore hari yang tenang. Kamu punya sekantong bunga dengan nama-nama berbeda, dan sebuah petak tanah yang sudah dibagi menjadi kotak-kotak rapi. Tugasmu adalah menyusun bunga-bunga itu dari yang terkecil ke terbesar, lalu memberikan "aksi spesial" pada bunga yang paling megah (namanya paling panjang) — yaitu membalik namanya.

Secara teknis, buat fungsi `arrangeFlowerGarden(flowerNames, gridSize)` yang menerima dua parameter:
- **`flowerNames`** (array of strings) — daftar nama bunga yang akan ditata.
- **`gridSize`** (number) — ukuran sisi kebun persegi (grid `gridSize x gridSize`).

Fungsi ini harus mengurutkan bunga berdasarkan panjang nama, menyusunnya ke dalam grid 2D, membalik nama bunga terpanjang, dan mengembalikan grid tersebut sebagai array 2D. Petak yang tidak terisi bunga diisi dengan string `"Empty"`.

> ⚠️ **Catatan penting:** Jika ada beberapa bunga dengan panjang nama yang sama (dan merupakan yang terpanjang), yang dibalik adalah bunga **terakhir** dalam urutan sorted list.

---

<a name="aturan"></a>
## 📏 Aturan Challenge

| Aturan | Keterangan |
|--------|-----------|
| 📦 Format Input | `flowerNames`: array of strings, `gridSize`: integer |
| 📤 Format Output | Array 2D (nested array) berukuran `gridSize x gridSize` berisi string |
| 🔤 Pengurutan | Urutkan nama bunga dari yang **terpendek** ke **terpanjang** (ascending by `.length`) |
| 🔲 Grid Filling | Isi grid dari kiri ke kanan, atas ke bawah. Sisa petak diisi `"Empty"` |
| 🔄 Reverse | Balik nama bunga **terpanjang** (yang terakhir di sorted list) |
| 📭 Input Kosong | Jika `flowerNames` kosong, kembalikan grid penuh `"Empty"` |

---

<a name="contoh"></a>
## 📤 Contoh Input & Output

```javascript
console.log(arrangeFlowerGarden(["Rose", "Sunflower", "Lily", "Tulip"], 3));
// Output:
// [
//   ["Rose", "Lily", "Tulip"],
//   ["rewoflnuS", "Empty", "Empty"],
//   ["Empty", "Empty", "Empty"]
// ]
```

### Kenapa `arrangeFlowerGarden(["Rose", "Sunflower", "Lily", "Tulip"], 3)` hasilnya seperti itu?

```
Mulai dengan flowerNames = ["Rose", "Sunflower", "Lily", "Tulip"], gridSize = 3

STEP 1: Sort berdasarkan panjang nama
  "Rose" (4) → "Lily" (4) → "Tulip" (5) → "Sunflower" (9)
  Hasil: ["Rose", "Lily", "Tulip", "Sunflower"]

STEP 2: Balik bunga terpanjang (index terakhir)
  "Sunflower" → "rewoflnuS"
  Hasil: ["Rose", "Lily", "Tulip", "rewoflnuS"]

STEP 3: Isi grid 3x3 (total 9 petak, hanya 4 bunga)
  Baris 0: ["Rose", "Lily", "Tulip"]         ← index 0, 1, 2
  Baris 1: ["rewoflnuS", "Empty", "Empty"]   ← index 3, lalu sisa "Empty"
  Baris 2: ["Empty", "Empty", "Empty"]        ← semua "Empty"

Output: [["Rose","Lily","Tulip"],["rewoflnuS","Empty","Empty"],["Empty","Empty","Empty"]] ✅
```

```javascript
console.log(arrangeFlowerGarden(["Daisy", "Orchid"], 2));
// Output:
// [
//   ["Daisy", "dihcrO"],
//   ["Empty", "Empty"]
// ]
```

```javascript
console.log(arrangeFlowerGarden([], 2));
// Output:
// [
//   ["Empty", "Empty"],
//   ["Empty", "Empty"]
// ]
```

> 💡 **Perhatikan:** Ketika `flowerNames` kosong, grid tetap dibuat sesuai `gridSize` tapi seluruh isinya `"Empty"`. Fungsi tidak boleh crash atau return `undefined`.

---

<a name="pemahaman"></a>
## 🧠 Pemahaman Awal

Sebelum menulis kode, ada 5 pertanyaan kunci yang harus dijawab:

**1. Bagaimana cara mengurutkan array berdasarkan panjang string?**
> Gunakan `Array.sort()` dengan callback `(a, b) => a.length - b.length`. Jika hasilnya negatif, `a` diletakkan sebelum `b` — sehingga menghasilkan urutan ascending.

**2. Bagaimana cara membuat dan mengisi Array 2D?**
> Gunakan nested `for` loop. Loop luar untuk baris (`i`), loop dalam untuk kolom (`j`). Hubungan antara index 1D dan koordinat 2D dihitung dengan rumus `(i * gridSize) + j`.

**3. Bagaimana cara menentukan isi petak: bunga atau "Empty"?**
> Bandingkan `flowerIndex` dengan `sortedFlowers.length`. Jika masih dalam jangkauan, ambil bunga. Jika sudah melewati, isi `"Empty"`.

**4. Bagaimana cara menemukan dan membalik bunga terpanjang?**
> Karena array sudah diurutkan ascending, bunga terpanjang ada di index terakhir (`sortedFlowers.length - 1`). Balik dengan `split('').reverse().join('')`.

**5. Bagaimana menangani edge case array kosong?**
> Bungkus proses reverse dalam `if (sortedFlowers.length > 0)` agar tidak terjadi error `undefined.split()`. Loop akan otomatis mengisi semua petak dengan `"Empty"`.

```
arrangeFlowerGarden(flowerNames, gridSize)
  │
  ├── flowerNames kosong? → loop tetap jalan, semua petak "Empty"     ← EDGE CASE
  │
  └── flowerNames ada isinya?
        │
        ├── STEP 1: Sort by length (ascending)
        ├── STEP 2: Reverse bunga di index terakhir
        ├── STEP 3: Nested for loop → buat grid gridSize x gridSize
        │     ├── flowerIndex < sortedFlowers.length → push bunga
        │     └── flowerIndex >= sortedFlowers.length → push "Empty"
        └── STEP 4: return garden (2D array)
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 02 — Problem Solving Approach →](./02-problem-solving-approach_alur-berpikir.md)**
