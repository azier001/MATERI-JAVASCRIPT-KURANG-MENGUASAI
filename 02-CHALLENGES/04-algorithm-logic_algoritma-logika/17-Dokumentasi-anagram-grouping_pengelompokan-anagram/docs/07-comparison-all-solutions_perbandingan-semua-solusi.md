# 📊 Part 07 — Perbandingan Semua Solusi

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📊 Tabel | 🔍 Kode Semua Versi | 🎮 Decision Guide | 💡 Kesimpulan |
|:--------:|:-------------------:|:-----------------:|:-------------:|
| [Jump](#-perbandingan-semua-solusi) | [Jump](#-kode-semua-solusi) | [Jump](#-decision-guide) | [Jump](#-kesimpulan) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami perbedaan setiap solusi secara menyeluruh
- ✅ Tahu kapan menggunakan solusi yang mana
- ✅ Memahami trade-off antara Object dan Map
- ✅ Memahami trade-off antara `reduce`, `forEach`, dan `for...of`

---

## 📊 Perbandingan Semua Solusi

| Aspek | V1 — `reduce` + Object | V2 — `forEach` + Object | V3 — `forEach` + Map | V4 — `for...of` + Map | V5 — `for...of` + Map |
|-------|:----------------------:|:-----------------------:|:--------------------:|:---------------------:|:---------------------:|
| **Loop** | `reduce` | `forEach` | `forEach` | `for...of` | `for...of` |
| **Struktur data** | Object `{}` | Object `{}` | `Map` | `Map` | `Map` |
| **Pola inisialisasi** | 2 langkah | 2 langkah | 2 langkah | `if/else` | 2 langkah |
| **Set awal** | `obj[key] = []` | `obj[key] = []` | `.set(key, [])` | `.set(key, [word])` | `.set(key, [])` |
| **Ambil values** | `Object.values()` | `Object.values()` | `[...spread]` | `Array.from()` | `[...spread]` |
| **Perlu `return acc`** | ✅ Ya | ❌ Tidak | ❌ Tidak | ❌ Tidak | ❌ Tidak |
| **Kompleksitas Waktu** | O(n) | O(n) | O(n) | O(n) | O(n) |
| **Cocok untuk pemula** | ⚠️ Perlu paham `reduce` | ✅ Ya | ✅ Ya | ✅ Ya | ✅ Ya |

---

## 🔍 Kode Semua Solusi

### 🔵 Versi 1 — `reduce` + Object

```javascript
const anagramGrouping = (words) => {
  const result = words.reduce((acc, word) => {
    const key = word.split('').sort().join('')

    if (!acc[key]) acc[key] = []

    acc[key].push(word)

    return acc
  }, {})

  return Object.values(result)
}
```

---

### 🟢 Versi 2 — `forEach` + Object

```javascript
const anagramGrouping = (words) => {
  const grouped = {}

  words.forEach((word) => {
    const key = word.split('').sort().join('')

    if (!grouped[key]) grouped[key] = []

    grouped[key].push(word)
  })

  return Object.values(grouped)
}
```

---

### 🟡 Versi 3 — `forEach` + Map

```javascript
const anagramGrouping = (words) => {
  const grouped = new Map()

  words.forEach((word) => {
    const key = word.split('').sort().join('')

    if (!grouped.has(key)) grouped.set(key, [])

    grouped.get(key).push(word)
  })

  return [...grouped.values()]
}
```

---

### 🟠 Versi 4 — `for...of` + Map (dari dokumentasi)

```javascript
function anagramGrouping(words) {
  const anagramGroups = new Map();

  for (const word of words) {
    const sortedChars = word.split('').sort().join('');

    if (anagramGroups.has(sortedChars)) {
      anagramGroups.get(sortedChars).push(word);
    } else {
      anagramGroups.set(sortedChars, [word]);
    }
  }

  return Array.from(anagramGroups.values());
}
```

---

### 🔴 Versi 5 — `for...of` + Map (dari AI)

```javascript
function anagramGrouping(words) {
  const anagramMap = new Map();

  for (const word of words) {
    const sortedWord = word.split('').sort().join('');

    if (!anagramMap.has(sortedWord)) {
      anagramMap.set(sortedWord, []);
    }
    
    anagramMap.get(sortedWord).push(word);
  }

  return [...anagramMap.values()];
}
```

---

## 📈 Perbandingan Visual

```
Kemudahan Membaca (subjektif):
  V2 — forEach + Object    ✅✅✅✅  paling mudah, familiar untuk pemula
  V3 — forEach + Map       ✅✅✅✅  mudah, Map method cukup intuitif
  V5 — for...of + Map      ✅✅✅   mudah, pola 2 langkah jelas
  V4 — for...of + Map      ✅✅✅   mudah, tapi if/else sedikit verbose
  V1 — reduce + Object     ✅✅    perlu paham reduce & return acc

Keringkasan Kode:
  V1 — reduce + Object     ✅✅✅✅  paling ringkas, functional style
  V2 — forEach + Object    ✅✅✅   ringkas, tidak ada method ekstra
  V3 — forEach + Map       ✅✅✅   ringkas dengan Map
  V5 — for...of + Map      ✅✅    cukup ringkas
  V4 — for...of + Map      ✅✅    paling verbose karena if/else

Modernitas:
  V3,4,5 — Map             ✅✅✅✅  Map adalah struktur data modern
  V1,2   — Object          ✅✅    Object klasik tapi tetap valid
```

---

## 🎮 Decision Guide

### Saya Pemula → pakai **Versi 2 — `forEach` + Object**
- Tidak perlu memahami `reduce` atau `Map`
- Variabel `grouped` terlihat jelas di luar loop
- Alur paling mudah di-trace satu per satu
- → **[Lihat Part 03](03-solution-foreach-object_solusi-foreach-objek.md)**

### Saya ingin kode ringkas & functional → pakai **Versi 1 — `reduce` + Object**
- Paling sedikit baris kode
- Gaya functional programming
- → **[Lihat Part 02](02-solution-reduce-object_solusi-reduce-objek.md)**

### Saya ingin belajar Map → pakai **Versi 3 — `forEach` + Map**
- Paling mudah sebagai pengenalan `Map`
- Pola 2 langkah yang konsisten dengan versi Object
- → **[Lihat Part 04](04-solution-foreach-map_solusi-foreach-map.md)**

### Saya ingin versi paling eksplisit → pakai **Versi 4 — `for...of` + Map**
- `if/else` yang jelas menunjukkan dua kondisi berbeda
- `for...of` familiar bagi yang pernah pakai bahasa lain
- → **[Lihat Part 05](05-solution-forof-map-documentation_solusi-forof-map-dokumentasi.md)**

---

## 💡 Kesimpulan

> **Tidak ada solusi yang mutlak terbaik** — semua versi correct dan lulus semua test case. Yang membedakan adalah preferensi gaya penulisan dan struktur data yang digunakan.

> **Inti dari semua versi sama:** hitung derived key dengan sorting huruf, kelompokkan kata berdasarkan key, ambil semua value di akhir.

> **Object vs Map untuk use case ini:** keduanya setara. Object lebih familiar, Map lebih modern. Pilih sesuai preferensi.

> **Pelajaran terpenting:** konsep **derived key** — mengubah kata menjadi bentuk yang bisa dibandingkan — adalah pola yang sangat berguna dan sering muncul di berbagai problem pengelompokan data.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 06: Solusi — for...of + Map (AI)](06-solution-forof-map-ai_solusi-forof-map-ai.md)**
- **📖 [Lanjut ke Part 08: Edge Cases →](08-edge-cases_kasus-tepi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>