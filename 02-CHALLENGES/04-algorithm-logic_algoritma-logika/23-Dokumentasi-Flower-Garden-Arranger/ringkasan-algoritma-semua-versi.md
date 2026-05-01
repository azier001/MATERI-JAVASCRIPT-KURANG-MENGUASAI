# 📋 Ringkasan Algoritma — Semua Versi

> arrangeFlowerGarden — Flower Garden Arranger

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Versions](https://img.shields.io/badge/Versions-3-purple?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Cheat%20Sheet-orange?style=for-the-badge)

---

## 📑 Daftar Isi

- 🛡️ [V1 — User Imperative Approach](#v1)
- ⚡ [V2 — Mentor Declarative Approach](#v2)
- 🏫 [V3 — Coddy Explicit Approach](#v3)
- 🏆 [Rekomendasi](#rekomendasi)

---

<a name="v1"></a>
## 🛡️ V1 — User Imperative Approach — Pendekatan Imperatif User ⭐ Rekomendasi

**Ide utama:** Reverse bunga sebelum masuk grid, lalu bangun grid dengan `for` loop + `if...else` untuk menentukan bunga atau `"Empty"`.

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

| Kelebihan | Kekurangan |
|-----------|-----------|
| Mudah dibaca dan di-debug ⭐ | Kode lebih panjang dari V2 |
| Aman dari edge case (guard + immutable) | Membutuhkan variabel perantara (`garden`, `row`) |

> ✅ **Cocok untuk:** Pemula yang ingin memahami nested loop dan logika grid secara eksplisit.

---

<a name="v2"></a>
## ⚡ V2 — Mentor Declarative Approach — Pendekatan Deklaratif Mentor

**Ide utama:** Gunakan `Array.from()` untuk membuat grid secara deklaratif dan short-circuit `||` untuk fallback `"Empty"`.

```javascript
const arrangeFlowerGarden = (flowerNames, gridSize) => {
  const sorted = [...flowerNames].sort((a, b) => a.length - b.length);

  if (sorted.length > 0) {
    const lastIdx = sorted.length - 1;
    sorted[lastIdx] = [...sorted[lastIdx]].reverse().join('');
  }

  return Array.from({ length: gridSize }, (_, row) =>
    Array.from({ length: gridSize }, (_, col) => {
      const index = row * gridSize + col;
      return sorted[index] || 'Empty';
    })
  );
};
```

| Kelebihan | Kekurangan |
|-----------|-----------|
| Kode ringkas dan modern ⭐ | `Array.from` tidak familiar bagi pemula |
| Tanpa variabel perantara | Debug lebih sulit (satu expression besar) |

> ✅ **Cocok untuk:** Developer yang sudah paham `Array.from` dan ingin kode yang idiomatik.

---

<a name="v3"></a>
## 🏫 V3 — Coddy Explicit Approach — Pendekatan Eksplisit Coddy.tech

**Ide utama:** Pre-fill grid dengan `"Empty"`, timpa dengan bunga, lalu cari & balik bunga terpanjang di dalam grid.

```javascript
function arrangeFlowerGarden(flowerNames, gridSize) {
  const sortedFlowers = flowerNames.sort((a, b) => a.length - b.length);

  const garden = Array(gridSize).fill().map(() => Array(gridSize).fill("Empty"));

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

  const longestFlower = sortedFlowers[sortedFlowers.length - 1];

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

| Kelebihan | Kekurangan |
|-----------|-----------|
| Step-by-step sangat eksplisit | Double loop (kurang efisien) |
| Teknik pre-fill grid berguna untuk dipelajari | Mutasi array asli, bug nama kembar |

> ✅ **Cocok untuk:** Memahami strategi pre-fill grid, tapi jangan dipakai untuk production tanpa perbaikan.

---

<a name="rekomendasi"></a>
## 🏆 Rekomendasi

| Situasi | Versi yang Disarankan |
|---------|----------------------|
| Sedang belajar dasar-dasar array & loop | V1 — kontrol penuh, mudah di-debug |
| Ingin kode ringkas & modern | V2 — `Array.from` + short-circuit |
| Ingin memahami strategi pre-fill grid | V3 — pelajari tekniknya, tapi perbaiki bug-nya |
| Untuk production code / interview | V1 atau V2 — keduanya aman dari edge case |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](./README.md)**
- **📖 [Dokumentasi Lengkap — docs/](./docs/)**
