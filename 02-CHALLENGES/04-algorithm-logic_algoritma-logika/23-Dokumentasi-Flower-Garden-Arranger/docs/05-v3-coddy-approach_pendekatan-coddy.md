# 🏫 V3 — Coddy Explicit Approach — Pendekatan Eksplisit Coddy.tech

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20Pre--fill%20Grid%20|%20Search%20Loop-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V3-purple?style=for-the-badge)

---

## 📑 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- 💡 [Insight Penting](#insight)
- ⚠️ [Jebakan yang Ditemukan](#jebakan)
- ⚖️ [Evaluasi Versi Ini](#evaluasi)

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini berasal dari platform **Coddy.tech**. Pendekatannya sangat eksplisit — setiap langkah challenge dipisah menjadi blok kode tersendiri dengan loop-nya masing-masing.

```javascript
function arrangeFlowerGarden(flowerNames, gridSize) {
  // Sort flower names by length
  const sortedFlowers = flowerNames.sort((a, b) => a.length - b.length);

  // Create garden grid
  const garden = Array(gridSize).fill().map(() => Array(gridSize).fill("Empty"));

  // Place flowers in the grid
  let flowerIndex = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (flowerIndex < sortedFlowers.length) {
        garden[i][j] = sortedFlowers[flowerIndex];
        flowerIndex++;
      } else {
        break;
      }
    }
  }

  // Find the longest flower name
  const longestFlower = sortedFlowers[sortedFlowers.length - 1];

  // Reverse the longest flower name in the grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (garden[i][j] === longestFlower) {
        garden[i][j] = longestFlower.split('').reverse().join('');
      }
    }
  }

  return garden;
}
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

```javascript
const sortedFlowers = flowerNames.sort((a, b) => a.length - b.length);
```
📦 **Sort langsung tanpa salinan.** Perhatikan: tidak ada spread operator `[...]`, jadi array `flowerNames` asli akan termutasi.

---

```javascript
const garden = Array(gridSize).fill().map(() => Array(gridSize).fill("Empty"));
```
🏗️ **Pre-fill grid dengan "Empty".** Teknik ini membuat grid `gridSize x gridSize` yang setiap petaknya sudah berisi `"Empty"` sejak awal. Jadi nanti tinggal menimpa petak yang ada bunganya.

Cara kerjanya:
1. `Array(gridSize)` → buat array kosong berukuran `gridSize`
2. `.fill()` → isi dengan `undefined` (agar bisa di-iterate)
3. `.map(() => Array(gridSize).fill("Empty"))` → setiap elemen diganti array baru berisi `"Empty"`

---

```javascript
let flowerIndex = 0;
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    if (flowerIndex < sortedFlowers.length) {
      garden[i][j] = sortedFlowers[flowerIndex];
      flowerIndex++;
    } else {
      break;
    }
  }
}
```
🌸 **Timpa petak dengan bunga.** Variabel `flowerIndex` berfungsi sebagai "penunjuk" bunga ke berapa yang sedang ditanam. Setiap kali satu bunga ditaruh, `flowerIndex++` menggeser ke bunga berikutnya.

---

```javascript
const longestFlower = sortedFlowers[sortedFlowers.length - 1];
```
🔍 **Simpan nama bunga terpanjang.** Diambil dari index terakhir array yang sudah sorted.

---

```javascript
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    if (garden[i][j] === longestFlower) {
      garden[i][j] = longestFlower.split('').reverse().join('');
    }
  }
}
```
🔄 **Cari dan balik di dalam grid.** Loop ini menelusuri **seluruh grid** untuk mencari bunga yang namanya cocok dengan `longestFlower`, lalu membaliknya di tempat.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Apa itu Pre-fill Grid?

Strategi "isi dulu semua petak dengan default, lalu timpa yang perlu". Ini kebalikan dari V1 yang "cek dulu mau isi apa baru push".

```
V1 (Build on demand):     V3 (Pre-fill + overwrite):
  [] → push bunga/Empty     ["Empty","Empty","Empty"] → timpa [0] = bunga
```

> 💡 **Analogi:** V1 seperti menaruh pot kosong satu per satu dan mengisi sambil jalan. V3 seperti menyiapkan semua pot sudah berisi tanah, lalu mengganti tanahnya dengan bunga satu per satu.

### Kenapa pakai variabel `flowerIndex` terpisah?

Karena V3 tidak menggunakan rumus `(i * gridSize) + j`. Sebagai gantinya, dia memakai *counter* manual yang di-increment setiap kali bunga ditaruh. Ini lebih intuitif tapi membutuhkan variabel tambahan.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi:
   Input: flowerNames = ["Rose", "Sunflower", "Lily", "Tulip"], gridSize = 3

   STEP 1 — Sort (mutasi langsung):
     sortedFlowers = ["Rose", "Lily", "Tulip", "Sunflower"]
     ⚠️ flowerNames juga berubah!

   STEP 2 — Pre-fill grid 3x3:
     garden = [
       ["Empty", "Empty", "Empty"],
       ["Empty", "Empty", "Empty"],
       ["Empty", "Empty", "Empty"]
     ]

   STEP 3 — Timpa dengan bunga (flowerIndex dimulai dari 0):
     i=0, j=0 → flowerIndex=0 → garden[0][0] = "Rose",      flowerIndex=1
     i=0, j=1 → flowerIndex=1 → garden[0][1] = "Lily",      flowerIndex=2
     i=0, j=2 → flowerIndex=2 → garden[0][2] = "Tulip",     flowerIndex=3
     i=1, j=0 → flowerIndex=3 → garden[1][0] = "Sunflower", flowerIndex=4
     i=1, j=1 → flowerIndex=4 → 4 < 4? ❌ → break (keluar loop dalam)
     i=2, j=0 → flowerIndex=4 → 4 < 4? ❌ → break
     garden = [
       ["Rose", "Lily", "Tulip"],
       ["Sunflower", "Empty", "Empty"],
       ["Empty", "Empty", "Empty"]
     ]

   STEP 4 — Simpan longestFlower:
     longestFlower = "Sunflower"

   STEP 5 — Cari & balik di grid (LOOP ULANG seluruh grid):
     i=0, j=0 → "Rose" === "Sunflower"? ❌
     i=0, j=1 → "Lily" === "Sunflower"? ❌
     i=0, j=2 → "Tulip" === "Sunflower"? ❌
     i=1, j=0 → "Sunflower" === "Sunflower"? ✅ → garden[1][0] = "rewoflnuS"
     i=1, j=1 → "Empty" === "Sunflower"? ❌
     ... (lanjut sampai selesai meskipun sudah ketemu)

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

> **Kenapa V3 melakukan 2x nested loop?**
> Karena V3 memisahkan proses "menaruh bunga" dan "membalik bunga" menjadi dua tahap terpisah. Akibatnya, setelah bunga sudah ditaruh di grid, kode harus "mencari lagi" di mana bunga terpanjang berada. Ini tidak efisien karena kita sebenarnya sudah tahu lokasinya.

> **Apakah `break` di loop dalam juga menghentikan loop luar?**
> Tidak! `break` hanya menghentikan loop `for` yang paling dekat (loop `j`). Loop `i` tetap berjalan. Artinya, setelah bunga habis, loop `i` masih iterasi tapi langsung `break` lagi di loop `j` — pemborosan kecil.

---

<a name="jebakan"></a>
## ⚠️ 2 Jebakan yang Ditemukan

### Jebakan 1 — Mutasi Array Asli

```javascript
// ❌ V3 langsung sort tanpa salinan
const sortedFlowers = flowerNames.sort((a, b) => a.length - b.length);
```

`.sort()` mengubah array asli. Jika `flowerNames` digunakan di tempat lain setelah fungsi ini dipanggil, datanya sudah berubah urutan.

> 💡 **Pelajaran:** Selalu salin array dengan `[...array]` sebelum `.sort()` jika data asli masih dibutuhkan.

### Jebakan 2 — Bunga Kembar (Duplicate Names)

Jika ada dua bunga dengan nama yang sama dan merupakan nama terpanjang:

```javascript
// Contoh: flowerNames = ["Rose", "Sunflower", "Sunflower"]
// Setelah sort: ["Rose", "Sunflower", "Sunflower"]
// longestFlower = "Sunflower"

// Loop pencarian akan membalik SEMUA "Sunflower" di grid!
if (garden[i][j] === longestFlower) {
  garden[i][j] = longestFlower.split('').reverse().join(''); // ❌ Balik semua!
}
```

V1 dan V2 tidak punya masalah ini karena mereka langsung membalik elemen di index terakhir tanpa mencari.

---

<a name="evaluasi"></a>
## ⚖️ Evaluasi Versi Ini

| Kelebihan | Kekurangan |
|-----------|-----------|
| Step-by-step sangat eksplisit | Double loop (tidak efisien) |
| Pre-fill grid menghindari `if...else` saat mengisi | Mutasi array asli |
| Mudah di-debug per tahap | Bug potensial pada nama kembar |
| Cocok untuk pemula belajar alur | `break` tidak menghentikan loop luar |

> 💡 **Cocok digunakan ketika** kamu masih tahap belajar dan ingin melihat setiap proses secara terpisah. Untuk production code, gunakan V1 atau V2.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 04 — V2 Mentor Approach](./04-v2-mentor-approach_pendekatan-mentor.md)**
- **📖 [Lanjut ke Part 06 — Perbandingan Semua Versi →](./06-all-versions-comparison_perbandingan-semua-versi.md)**
