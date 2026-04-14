# 📊 Part 05 — Perbandingan Semua Solusi

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📊 Tabel | 🔍 Detail | 🏆 Rekomendasi |
|:--------:|:---------:|:--------------:|
| [Jump](#-perbandingan-cepat) | [Jump](#-detail-per-solusi) | [Jump](#-rekomendasi) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami perbedaan antara ketiga solusi secara menyeluruh
- ✅ Memahami trade-off antara waktu dan memori
- ✅ Bisa memilih solusi yang tepat sesuai konteks
- ✅ Siap untuk melihat pitfalls di Part 06

---

## 📊 Perbandingan Cepat

| | Versi 1 — Sorting | Versi 2 — Set | Versi 3 — Set Ringkas |
|---|---|---|---|
| **Pendekatan** | Sort + Loop | Set + While | Set + While |
| **Time Complexity** | O(n log n) | O(n) | O(n) |
| **Space Complexity** | O(1) | O(n) | O(n) |
| **Handle duplikat** | `else if` manual | Otomatis (Set) | Otomatis (Set) |
| **Guard clause** | Perlu | Perlu | Tidak perlu |
| **Keterbacaan** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Efisiensi** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🔍 Detail Per Solusi

### Versi 1 — Sorting O(n log n)

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const sortedNums = nums.sort((a, b) => a - b)

  let currentLength = 1
  let longestLength = 1

  for (let i = 1; i < sortedNums.length; i++) {
    const diff = sortedNums[i] - sortedNums[i - 1]

    if (diff === 1) {
      currentLength++
    } else if (diff > 1) {
      currentLength = 1
    }

    if (currentLength > longestLength) longestLength = currentLength
  }

  return longestLength
}
```

**Kelebihan:**
- ✅ Mudah dipahami — alurnya natural (urutkan dulu, lalu hitung)
- ✅ Hemat memori — tidak butuh struktur data tambahan O(1)
- ✅ Cocok untuk pemula

**Kekurangan:**
- ❌ Lebih lambat — O(n log n) karena sorting
- ❌ Perlu menangani duplikat secara manual dengan `else if`
- ❌ Perlu guard clause untuk array kosong

---

### Versi 2 — Set O(n)

```javascript
const longestConsecutiveSequence = (nums) => {
  if (!nums.length) return 0

  const numSet = new Set(nums)

  let longestLength = 1

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentLength = 1
      let currentNum = num

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentLength++
      }

      if (currentLength > longestLength) {
        longestLength = currentLength
      }
    }
  }

  return longestLength
}
```

**Kelebihan:**
- ✅ Lebih cepat — O(n)
- ✅ Duplikat otomatis hilang di Set
- ✅ Eksplisit dan mudah dibaca

**Kekurangan:**
- ❌ Butuh memori ekstra O(n) untuk Set
- ❌ Masih perlu guard clause untuk array kosong

---

### Versi 3 — Set O(n) Ringkas

```javascript
function longestConsecutiveSequence(nums) {
  const numSet = new Set(nums)
  let longestSequence = 0

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentSequence = 1

      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentSequence++
      }

      longestSequence = Math.max(longestSequence, currentSequence)
    }
  }

  return longestSequence
}
```

**Kelebihan:**
- ✅ Lebih cepat — O(n)
- ✅ Duplikat otomatis hilang di Set
- ✅ Paling ringkas — tidak perlu guard clause
- ✅ `Math.max()` lebih elegan dari `if`

**Kekurangan:**
- ❌ Butuh memori ekstra O(n) untuk Set
- ❌ `longestSequence = 0` bisa membingungkan tanpa konteks

---

## 🏆 Rekomendasi

### Untuk belajar dan memahami konsep
→ **Versi 1 (Sorting)** — alurnya paling natural dan mudah diikuti

### Untuk interview atau production code
→ **Versi 3 (Set Ringkas)** — paling efisien dan paling ringkas

### Untuk keterbacaan maksimal
→ **Versi 2 (Set)** — eksplisit, mudah dibaca, dan efisien

---

## 🔄 Perbandingan Penanganan Edge Case

| Edge Case | Versi 1 | Versi 2 | Versi 3 |
|-----------|---------|---------|---------|
| Array kosong `[]` | Guard clause `if (!nums.length)` | Guard clause `if (!nums.length)` | Otomatis return `0` |
| Satu elemen `[5]` | `longestLength = 1` | `longestLength = 1` | `longestSequence = 0`, lalu `Math.max(0, 1) = 1` |
| Duplikat `[1,2,2,3]` | `else if (selisih === 0) continue` | Otomatis hilang di Set | Otomatis hilang di Set |

---

## 💡 Insight

> **Time-Space Trade-off**
> Versi 1 (Sorting) lebih hemat memori O(1) tapi lebih lambat O(n log n). Versi 2 dan 3 (Set) lebih cepat O(n) tapi butuh memori ekstra O(n) untuk Set. Ini adalah trade-off klasik antara waktu dan memori — pilih sesuai kebutuhan.

> **Kenapa Set bisa O(n) padahal ada `while` di dalam `for`?**
> Meskipun ada nested loop, setiap angka hanya dikunjungi **dua kali** — sekali di `for`, sekali di `while`. Ini karena `while` hanya berjalan dari titik awal urutan, bukan dari setiap angka. Total operasi tetap proporsional dengan n, bukan n².

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 04: Solusi — Set O(n) Ringkas](04-solution-set-on-concise_solusi-set-on-ringkas.md)**
- **📖 [Lanjut ke Part 06: Pitfalls & Jebakan Umum →](06-pitfalls_jebakan-umum.md)**

---

<div align="center">

Made with ❤️ for learners

</div>