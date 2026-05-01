# 🌻 Flower Garden Arranger — `arrangeFlowerGarden`

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topics](https://img.shields.io/badge/Topics-Array%20|%20Sorting%20|%20String%20Reversal%20|%202D%20Array-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

> 📝 *Dokumentasi pribadi ini dibuat untuk membantu saya memahami dan mengingat
> kembali konsep-konsep yang dipelajari saat mengerjakan challenge Flower Garden Arranger.*

---

## 🧩 Deskripsi Challenge

Buat fungsi `arrangeFlowerGarden` yang menerima `flowerNames` (array nama bunga) dan `gridSize` (ukuran kebun persegi). Tugasnya adalah menata bunga ke dalam grid 2D berukuran `gridSize x gridSize`, dengan bunga diurutkan dari nama terpendek ke terpanjang. Nama bunga terpanjang harus dibalik (reverse) di dalam grid. Petak yang tersisa diisi dengan `"Empty"`.

```
Input: (["Rose", "Sunflower", "Lily", "Tulip"], 3)
  → Langkah 1: Urutkan berdasarkan panjang → ["Rose", "Lily", "Tulip", "Sunflower"]
  → Langkah 2: Balik bunga terpanjang → "Sunflower" menjadi "rewoflnuS"
  → Langkah 3: Susun ke grid 3x3, sisa diisi "Empty"
Output: [["Rose","Lily","Tulip"],["rewoflnuS","Empty","Empty"],["Empty","Empty","Empty"]] ✅
```

> ⚠️ **Catatan penting:** Jika ada beberapa bunga dengan panjang nama yang sama (terpanjang), yang dibalik adalah bunga **terakhir** dalam urutan sorted.

---

## 📤 Expected Output

| `flowerNames` | `gridSize` | Output |
|---------------|------------|--------|
| `["Rose", "Sunflower", "Lily", "Tulip"]` | `3` | `[["Rose","Lily","Tulip"],["rewoflnuS","Empty","Empty"],["Empty","Empty","Empty"]]` |
| `["Daisy", "Orchid"]` | `2` | `[["Daisy","Orchid"],["Empty","Empty"]]` → Orchid dibalik jadi `"dihcrO"` |
| `[]` | `2` | `[["Empty","Empty"],["Empty","Empty"]]` |
| `["Rose", "Lily"]` | `1` | `[["yliL"]]` → Hanya 1 petak, bunga terakhir yang terurut dibalik |

---

## ▶️ Coba Langsung

```javascript
console.log(arrangeFlowerGarden(["Rose", "Sunflower", "Lily", "Tulip"], 3));
// [["Rose","Lily","Tulip"],["rewoflnuS","Empty","Empty"],["Empty","Empty","Empty"]]
```

```javascript
console.log(arrangeFlowerGarden(["Daisy", "Orchid"], 2));
// [["Daisy","dihcrO"],["Empty","Empty"]]
```

```javascript
console.log(arrangeFlowerGarden([], 2));
// [["Empty","Empty"],["Empty","Empty"]]
```

---

## 💡 Konsep Kunci

- **Custom Sort (`Array.sort`)** — Mengurutkan array berdasarkan kriteria kustom menggunakan callback `(a, b) => a.length - b.length`.
- **2D Array (Nested Array)** — Memahami cara membuat dan mengisi array di dalam array untuk merepresentasikan grid.
- **Rumus Index Flat ke Grid** — Mengkonversi index 1D ke koordinat 2D menggunakan rumus `(i * gridSize) + j`.
- **String Reversal** — Membalik string menggunakan teknik `split('').reverse().join('')`.
- **Defensive Programming** — Melakukan pengecekan `length > 0` sebelum mengakses elemen array untuk menghindari error `undefined`.
- **Immutability (Spread Operator)** — Menggunakan `[...array]` untuk menyalin array agar data asli tidak termutasi oleh `.sort()`.

---

## 🏆 Solusi Rekomendasi

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

> ✅ Versi ini dipilih karena logikanya eksplisit dan mudah dipahami bagi pemula, dengan proteksi edge case array kosong dan tidak memutasi data asli.

---

## 📊 Quick Comparison: Semua Versi

| Versi | Pendekatan | Keunggulan |
|-------|-----------|------------|
| **V1 — User Approach** ⭐ | `for` loop imperatif + `if/else` guard | Mudah dibaca, aman dari edge case, immutable |
| **V2 — Mentor Approach** | `Array.from()` declarative | Kode lebih ringkas, gaya modern/idiomatik |
| **V3 — Coddy Approach** | Pre-fill grid + loop pencarian ulang | Step-by-step eksplisit, tapi kurang efisien (double loop) |

---

## 📂 Struktur Dokumentasi

| File | Topik |
|------|-------|
| 📄 [01-challenge-overview_gambaran-tantangan](./docs/01-challenge-overview_gambaran-tantangan.md) | Gambaran challenge & aturan main |
| 📄 [02-problem-solving-approach_alur-berpikir](./docs/02-problem-solving-approach_alur-berpikir.md) | Analogi & alur pemecahan masalah |
| 📄 [03-v1-user-approach_pendekatan-user](./docs/03-v1-user-approach_pendekatan-user.md) | Solusi V1 — Pendekatan User |
| 📄 [04-v2-mentor-approach_pendekatan-mentor](./docs/04-v2-mentor-approach_pendekatan-mentor.md) | Solusi V2 — Pendekatan Mentor |
| 📄 [05-v3-coddy-approach_pendekatan-coddy](./docs/05-v3-coddy-approach_pendekatan-coddy.md) | Solusi V3 — Pendekatan Coddy.tech |
| 📄 [06-all-versions-comparison_perbandingan-semua-versi](./docs/06-all-versions-comparison_perbandingan-semua-versi.md) | Perbandingan semua versi |
| 📄 [07-test-cases_kasus-pengujian](./docs/07-test-cases_kasus-pengujian.md) | Test cases & edge cases |
| 📄 [ringkasan-algoritma-semua-versi](./ringkasan-algoritma-semua-versi.md) | Cheat sheet ringkas semua versi |

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Mengurutkan array berdasarkan properti kustom (panjang string) menggunakan `Array.sort()`
- ✅ Membuat dan mengisi Array 2D (grid) menggunakan nested `for` loop
- ✅ Mengkonversi index flat (1D) ke koordinat baris-kolom (2D) dengan rumus `(i * gridSize) + j`
- ✅ Membalik string menggunakan teknik `split → reverse → join`
- ✅ Menerapkan defensive programming untuk menangani edge case (array kosong)
- ✅ Memahami pentingnya immutability dengan spread operator `[...]`

---

<div align="center">

📚 [Mulai dari Part 1 — Challenge Overview →](./docs/01-challenge-overview_gambaran-tantangan.md)

[Challenge Overview](./docs/01-challenge-overview_gambaran-tantangan.md) • [Alur Berpikir](./docs/02-problem-solving-approach_alur-berpikir.md) • [V1 User](./docs/03-v1-user-approach_pendekatan-user.md) • [V2 Mentor](./docs/04-v2-mentor-approach_pendekatan-mentor.md) • [V3 Coddy](./docs/05-v3-coddy-approach_pendekatan-coddy.md) • [Perbandingan](./docs/06-all-versions-comparison_perbandingan-semua-versi.md) • [Test Cases](./docs/07-test-cases_kasus-pengujian.md) • [Ringkasan](./ringkasan-algoritma-semua-versi.md)

Made with ❤️ for learners — **Happy Learning! 🚀**

</div>
