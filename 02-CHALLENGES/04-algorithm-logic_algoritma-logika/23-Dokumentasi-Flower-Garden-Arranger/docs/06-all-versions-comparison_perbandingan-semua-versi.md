# 📊 Perbandingan Semua Versi — All Versions Comparison

![Topic](https://img.shields.io/badge/Topic-Comparison-blue?style=for-the-badge)
![Versions](https://img.shields.io/badge/Versions-3-orange?style=for-the-badge)

---

## 📑 Daftar Isi

- 📋 [Semua Kode Sekilas](#semua-kode)
- 📊 [Tabel Perbandingan](#tabel-perbandingan)
- 🏆 [Rekomendasi](#rekomendasi)
- ✅ [Ringkasan](#ringkasan)

---

<a name="semua-kode"></a>
## 📋 Semua Kode Sekilas

### Versi 1 — User Imperative Approach ⭐ Rekomendasi

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

### Versi 2 — Mentor Declarative Approach

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

---

### Versi 3 — Coddy Explicit Approach

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

---

<a name="tabel-perbandingan"></a>
## 📊 Tabel Perbandingan

### Teknik & Pendekatan

| Aspek | V1 — User | V2 — Mentor | V3 — Coddy |
|-------|-----------|-------------|------------|
| **Gaya** | Imperatif (`for` loop) | Deklaratif (`Array.from`) | Imperatif eksplisit |
| **Buat Grid** | Loop + `push()` manual | `Array.from()` nested | `Array().fill().map()` pre-fill |
| **Isi Grid** | Rumus `(i*gridSize)+j` | Rumus `(row*gridSize)+col` | Counter `flowerIndex++` |
| **Fallback Empty** | `if...else` eksplisit | Short-circuit `\|\|` | Pre-fill `"Empty"` + overwrite |
| **Reverse Timing** | Sebelum masuk grid ⭐ | Sebelum masuk grid ⭐ | Setelah masuk grid (cari ulang) |

### Keamanan & Edge Case

| Aspek | V1 — User | V2 — Mentor | V3 — Coddy |
|-------|-----------|-------------|------------|
| **Immutability** | ✅ `[...array]` | ✅ `[...array]` | ❌ Mutasi langsung |
| **Guard Array Kosong** | ✅ `if (length > 0)` | ✅ `if (length > 0)` | ❌ Tidak ada guard |
| **Nama Kembar** | ✅ Aman (index langsung) | ✅ Aman (index langsung) | ❌ Balik semua kembar |

### Kelebihan & Kekurangan

| Versi | Kelebihan | Kekurangan |
|-------|-----------|-----------|
| V1 — User | Mudah dibaca, aman, immutable ⭐ | Lebih panjang dari V2 |
| V2 — Mentor | Ringkas, modern, idiomatik ⭐ | `Array.from` sulit bagi pemula |
| V3 — Coddy | Step-by-step sangat jelas | Double loop, mutasi, bug nama kembar |

---

<a name="rekomendasi"></a>
## 🏆 Rekomendasi

| Situasi | Versi yang Disarankan |
|---------|----------------------|
| Sedang belajar dasar-dasar array & loop | **V1 — User** — kontrol penuh, mudah di-debug |
| Ingin kode yang ringkas & modern | **V2 — Mentor** — `Array.from` + short-circuit |
| Ingin memahami strategi pre-fill grid | **V3 — Coddy** — pelajari tekniknya, tapi perbaiki bug-nya |
| Untuk production code / interview | **V1 atau V2** — keduanya aman dari edge case |

---

<a name="ringkasan"></a>
## ✅ Ringkasan

Semua versi menghasilkan output yang sama — yang berbeda hanya **cara berpikirnya**:

- **V1 & V3** — berpikir via **imperatif** (instruksi step-by-step, `for` loop manual)
- **V2** — berpikir via **deklaratif** (deskripsikan *apa* yang kamu mau, bukan *bagaimana* melakukannya)
- **V1 & V2** — berpikir **preventif** (balik bunga sebelum ditaruh — efisien)
- **V3** — berpikir **reaktif** (taruh dulu, baru cari & balik — kurang efisien)

> 💬 "Tidak ada versi yang paling benar — setiap versi mengajarkan cara berpikir yang berbeda. Yang terpenting adalah memahami *kenapa* suatu pendekatan dipilih, bukan hanya *apa* kodenya."

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 05 — V3 Coddy Approach](./05-v3-coddy-approach_pendekatan-coddy.md)**
- **📖 [Lanjut ke Part 07 — Test Cases →](./07-test-cases_kasus-pengujian.md)**
