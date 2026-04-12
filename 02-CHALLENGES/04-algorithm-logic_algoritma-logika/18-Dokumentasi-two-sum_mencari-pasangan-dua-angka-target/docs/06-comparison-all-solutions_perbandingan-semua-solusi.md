# 📊 Part 06 — Perbandingan Semua Solusi

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📊 Tabel | 🔍 Kode Semua Versi | 📈 Perbandingan Visual | 🎮 Decision Guide | 💡 Kesimpulan |
|:--------:|:-------------------:|:----------------------:|:-----------------:|:-------------:|
| [Jump](#-perbandingan-semua-solusi) | [Jump](#-kode-semua-solusi) | [Jump](#-perbandingan-visual) | [Jump](#-decision-guide) | [Jump](#-kesimpulan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami perbedaan setiap solusi secara menyeluruh
- ✅ Memahami trade-off antara Time dan Space Complexity
- ✅ Memahami perbedaan Map vs Set dalam konteks Two Sum
- ✅ Tahu kapan menggunakan solusi yang mana

---

## 📊 Perbandingan Semua Solusi

| Aspek | V1 — Nested Loop | V2 — HashMap (sendiri) | V3 — HashMap (AI) | V4 — Set |
|-------|:----------------:|:----------------------:|:-----------------:|:--------:|
| **Loop** | `for` + `for` | `for` | `for` | `for` |
| **Struktur data** | — | `Map` | `Map` | `Set` |
| **Cara simpan** | — | `map.set(nums[i], i)` | `map.set(current, i)` | `set.add(nums[i])` |
| **Cara ambil indeks** | langsung `i`, `j` | `map.get(complement)` | `map.get(needed)` | `indexOf(complement)` |
| **Variabel ekstra** | — | `complement` | `current`, `needed` | `complement` |
| **Aman untuk duplikat** | ✅ | ✅ | ✅ | ⚠️ |
| **Time Complexity** | O(n²) | O(n) | O(n) | O(n) |
| **Space Complexity** | O(1) | O(n) | O(n) | O(n) |
| **Cocok untuk pemula** | ✅ Sangat mudah | ✅ Mudah | ✅ Mudah | ⚠️ Ada kelemahan |

---

## 🔍 Kode Semua Solusi

### 🔵 Versi 1 — Nested Loop

```javascript
const twoSum = (numbers, number) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === number) {
        return [i, j]
      }
    }
  }

  return []
}
```

---

### 🟢 Versi 2 — HashMap (versi sendiri)

```javascript
const twoSum = (numbers, number) => {
  const map = new Map()

  for (let i = 0; i < numbers.length; i++) {
    const complement = number - numbers[i]

    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(numbers[i], i)
  }

  return []
}
```

---

### 🟡 Versi 3 — HashMap (versi AI)

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const needed = target - current;

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(current, i);
  }

  return [];
}
```

---

### 🟠 Versi 4 — Set

```javascript
function twoSum(nums, target) {
  const numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }
    
    numSet.add(nums[i]);
  }

  return [];
}
```

---

## 📈 Perbandingan Visual

```
Kemudahan Membaca (subjektif):
  V1 — Nested Loop        ✅✅✅✅  paling mudah, tidak ada struktur data baru
  V3 — HashMap (AI)       ✅✅✅✅  mudah, nama variabel sangat deskriptif
  V2 — HashMap (sendiri)  ✅✅✅   mudah, sedikit lebih ringkas dari V3
  V4 — Set                ✅✅✅   mudah, tapi ada kelemahan tersembunyi

Efisiensi Waktu:
  V2 — HashMap (sendiri)  ✅✅✅✅  O(n) — satu loop
  V3 — HashMap (AI)       ✅✅✅✅  O(n) — satu loop
  V4 — Set                ✅✅✅   O(n) — satu loop, tapi indexOf O(n) tersembunyi
  V1 — Nested Loop        ✅✅    O(n²) — dua loop bersarang

Keamanan Input:
  V1 — Nested Loop        ✅✅✅✅  aman untuk semua kasus
  V2 — HashMap (sendiri)  ✅✅✅✅  aman untuk semua kasus
  V3 — HashMap (AI)       ✅✅✅✅  aman untuk semua kasus
  V4 — Set                ✅✅    hanya aman untuk input unik
```

---

## 🎮 Decision Guide

### Saya Pemula → pakai **Versi 1 — Nested Loop**
- Tidak perlu memahami Map atau Set
- Alur paling mudah di-trace satu per satu
- Cocok untuk memahami konsep dasar Two Sum
- → **[Lihat Part 02](02-solution-nested-loop_solusi-nested-loop.md)**

### Saya ingin solusi efisien → pakai **Versi 2 — HashMap (sendiri)**
- Satu loop, O(n)
- Kode ringkas dan bersih
- Aman untuk semua input
- → **[Lihat Part 03](03-solution-hashmap_solusi-hashmap.md)**

### Saya ingin kode paling readable → pakai **Versi 3 — HashMap (AI)**
- Nama variabel `current` dan `needed` sangat deskriptif
- Logika identik dengan Versi 2, hanya lebih eksplisit
- → **[Lihat Part 04](04-solution-hashmap-ai_solusi-hashmap-ai.md)**

### Saya ingin eksplorasi Set → pakai **Versi 4 — Set**
- Cocok untuk memahami perbedaan Set vs Map
- Gunakan hanya untuk input yang dijamin unik
- → **[Lihat Part 05](05-solution-set_solusi-set.md)**

---

## 💡 Kesimpulan

> **Tidak ada solusi yang mutlak terbaik** — semua versi correct dan lulus semua test case untuk challenge ini. Yang membedakan adalah efisiensi, keamanan input, dan gaya penulisan.

> **Inti dari semua versi sama:** hitung complement (`target - nums[i]`), cek apakah pasangan sudah ditemukan, simpan data untuk dicek di iterasi berikutnya.

> **Map vs Set untuk Two Sum:** Map lebih tepat karena menyimpan indeks langsung. Set hanya menyimpan nilai — akibatnya harus pakai `indexOf()` yang bisa bermasalah untuk input dengan duplikat.

> **Pelajaran terpenting:** konsep **complement** dan **time-space trade-off** — dua ide ini adalah kunci untuk memahami mengapa HashMap jauh lebih efisien dari Nested Loop, dan mengapa kita rela "membayar" dengan memori ekstra untuk mendapatkan kecepatan.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 05: Solusi — Set](05-solution-set_solusi-set.md)**
- **📖 [Lanjut ke Part 07: Pitfalls & Jebakan Umum →](07-pitfalls_jebakan-umum.md)**

---

<div align="center">

Made with ❤️ for learners

</div>