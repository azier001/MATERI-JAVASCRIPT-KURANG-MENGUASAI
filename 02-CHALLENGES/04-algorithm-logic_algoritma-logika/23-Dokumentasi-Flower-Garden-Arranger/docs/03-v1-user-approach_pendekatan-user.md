# 🛡️ V1 — User Imperative Approach — Pendekatan Imperatif User

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20Sorting%20|%202D%20Array%20|%20String-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V1-purple?style=for-the-badge)

---

## 📑 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- 💡 [Insight Penting](#insight)

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini adalah hasil akhir dari sesi mentoring — menggunakan gaya imperatif dengan `for` loop yang eksplisit dan mudah dibaca.

```javascript
function arrangeFlowerGarden(flowerNames, gridSize) {
  const sortedFlowers = [...flowerNames].sort((a, b) => a.length - b.length);

  if (sortedFlowers.length > 0) {
    sortedFlowers[sortedFlowers.length - 1] = sortedFlowers[
      sortedFlowers.length - 1
    ]
      .split('')
      .reverse()
      .join('');
  }

  let garden = [];

  for (let i = 0; i < gridSize; i++) {
    let row = [];

    for (let j = 0; j < gridSize; j++) {
      let flowerIndex = i * gridSize + j;

      if (flowerIndex < sortedFlowers.length) {
        row.push(sortedFlowers[flowerIndex]);
      } else {
        row.push('Empty');
      }
    }

    garden.push(row);
  }

  return garden;
}
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

```javascript
const sortedFlowers = [...flowerNames].sort((a, b) => a.length - b.length);
```
📦 **Salin & urutkan.** Spread operator `[...]` menyalin array agar data asli (`flowerNames`) tidak termutasi oleh `.sort()`. Callback `a.length - b.length` mengurutkan dari nama terpendek ke terpanjang.

---

```javascript
if (sortedFlowers.length > 0) {
  sortedFlowers[sortedFlowers.length - 1] = sortedFlowers[
    sortedFlowers.length - 1
  ]
    .split('')
    .reverse()
    .join('');
}
```
🔄 **Balik bunga terpanjang.** Guard `length > 0` mencegah error saat array kosong. Bunga di index terakhir (terpanjang) dibalik menggunakan teknik `split → reverse → join`.

---

```javascript
let garden = [];
```
🌱 **Siapkan kebun kosong.** Array ini akan menampung semua baris grid.

---

```javascript
for (let i = 0; i < gridSize; i++) {
  let row = [];
```
🔁 **Loop luar: buat baris.** Setiap iterasi `i` membuat satu baris baru dalam grid.

---

```javascript
  for (let j = 0; j < gridSize; j++) {
    let flowerIndex = i * gridSize + j;
```
🔁 **Loop dalam: isi kolom.** Rumus `(i * gridSize) + j` mengkonversi koordinat 2D (baris, kolom) menjadi index 1D di array bunga.

---

```javascript
    if (flowerIndex < sortedFlowers.length) {
      row.push(sortedFlowers[flowerIndex]);
    } else {
      row.push('Empty');
    }
```
🧱 **Logika pengisian.** Jika index masih dalam jangkauan array bunga, taruh bunga. Jika sudah habis, taruh `"Empty"`.

---

```javascript
  garden.push(row);
}

return garden;
```
📤 **Masukkan baris ke kebun, lalu kembalikan.** Setiap baris yang sudah terisi didorong ke `garden`. Setelah semua baris selesai, kembalikan grid 2D.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Kenapa pakai `[...flowerNames]` bukan langsung `flowerNames.sort()`?

Method `.sort()` di JavaScript bersifat **mutating** — dia mengubah array aslinya. Jika kita tidak menyalin dulu, parameter `flowerNames` yang dikirim pemanggil fungsi akan ikut berubah urutannya. Ini bisa menyebabkan bug yang sulit dilacak di program yang lebih besar.

> 💡 **Analogi:** "Kalau kamu mau mengurutkan kartu-kartu di tangan temanmu, jangan langsung acak-acak kartu aslinya. Fotocopy dulu, baru kamu urutkan salinannya."

### Kenapa reverse dilakukan SEBELUM masuk grid?

Kalau kita taruh bunga ke grid dulu baru cari lokasinya untuk dibalik, kita harus melakukan loop tambahan untuk mencari di baris dan kolom mana bunga itu berada. Ini pemborosan karena kita sebenarnya masih "memegang" bunga itu sebelum ditaruh.

> 💡 **Prinsip:** *"Jangan mencari barang yang baru saja kamu pegang."*

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi:
   Input: flowerNames = ["Rose", "Sunflower", "Lily", "Tulip"], gridSize = 3

   STEP 1 — Sort:
     sortedFlowers = ["Rose", "Lily", "Tulip", "Sunflower"]

   STEP 2 — Reverse index terakhir:
     sortedFlowers[3] = "Sunflower" → "rewoflnuS"
     sortedFlowers = ["Rose", "Lily", "Tulip", "rewoflnuS"]

   STEP 3 — Bangun Grid 3x3:

   i=0 (Baris 0):
     j=0 → flowerIndex = 0 → 0 < 4? ✅ → push "Rose"
     j=1 → flowerIndex = 1 → 1 < 4? ✅ → push "Lily"
     j=2 → flowerIndex = 2 → 2 < 4? ✅ → push "Tulip"
     row = ["Rose", "Lily", "Tulip"] → push ke garden

   i=1 (Baris 1):
     j=0 → flowerIndex = 3 → 3 < 4? ✅ → push "rewoflnuS"
     j=1 → flowerIndex = 4 → 4 < 4? ❌ → push "Empty"
     j=2 → flowerIndex = 5 → 5 < 4? ❌ → push "Empty"
     row = ["rewoflnuS", "Empty", "Empty"] → push ke garden

   i=2 (Baris 2):
     j=0 → flowerIndex = 6 → 6 < 4? ❌ → push "Empty"
     j=1 → flowerIndex = 7 → 7 < 4? ❌ → push "Empty"
     j=2 → flowerIndex = 8 → 8 < 4? ❌ → push "Empty"
     row = ["Empty", "Empty", "Empty"] → push ke garden

   Output:
   [
     ["Rose", "Lily", "Tulip"],
     ["rewoflnuS", "Empty", "Empty"],
     ["Empty", "Empty", "Empty"]
   ] ✅
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Kenapa `flowerIndex < sortedFlowers.length` dan bukan `flowerIndex < gridSize`?**
> Karena `gridSize` adalah ukuran sisi kebun (misal 3), bukan jumlah bunga (misal 4). Jika kita bandingkan dengan `gridSize`, bunga yang index-nya >= gridSize tidak akan pernah tertanam. Ini adalah kesalahan pertama yang saya temukan saat sesi mentoring.

> **Kenapa `if (sortedFlowers.length > 0)` penting?**
> Tanpa guard ini, saat `flowerNames` kosong, `sortedFlowers[-1]` menghasilkan `undefined`. Memanggil `.split('')` pada `undefined` akan menyebabkan `TypeError: Cannot read property 'split' of undefined`. Ini disebut **defensive programming**.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02 — Problem Solving Approach](./02-problem-solving-approach_alur-berpikir.md)**
- **📖 [Lanjut ke Part 04 — V2 Mentor Approach →](./04-v2-mentor-approach_pendekatan-mentor.md)**
