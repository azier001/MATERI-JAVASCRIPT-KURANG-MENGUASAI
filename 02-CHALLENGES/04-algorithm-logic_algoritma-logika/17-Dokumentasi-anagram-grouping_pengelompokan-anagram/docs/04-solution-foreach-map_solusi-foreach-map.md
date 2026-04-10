# 🟡 Part 04 — Solusi: `forEach` + Map

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🔄 Perbandingan | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:---------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-perbandingan-object-vs-map) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja `Map` sebagai struktur data pengelompokan
- ✅ Memahami method `Map`: `.has()`, `.get()`, `.set()`, `.values()`
- ✅ Memahami perbedaan Object `{}` vs `Map` untuk use case ini
- ✅ Siap untuk melihat versi `for...of` + Map di Part 05

---

## 📄 Kode

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

## 🔍 Penjelasan Per Bagian

### 1. Inisialisasi Map kosong

```javascript
const grouped = new Map()
```

`Map` adalah struktur data modern JavaScript — mirip dengan object `{}`, tapi punya method khusus dan lebih powerful. Dimulai dari Map kosong yang akan kita isi selama iterasi.

---

### 2. Cek key dengan `.has()`

```javascript
if (!grouped.has(key))
```

Berbeda dengan object yang pakai `!grouped[key]`, Map punya method `.has(key)` untuk mengecek apakah key sudah ada. Lebih eksplisit dan tidak ambigu.

---

### 3. Set entry baru dengan `.set()`

```javascript
grouped.set(key, [])
```

Kalau key belum ada, buat entry baru dengan value array kosong `[]`. Method `.set(key, value)` adalah cara Map menyimpan data.

---

### 4. Ambil value dengan `.get()` lalu push

```javascript
grouped.get(key).push(word)
```

`.get(key)` mengambil value (array) yang tersimpan di key tersebut, lalu langsung `.push(word)` ke dalamnya. Ini bisa dilakukan dalam satu baris karena `.get()` mengembalikan referensi ke array yang sama.

---

### 5. Return dengan spread `[...grouped.values()]`

```javascript
return [...grouped.values()]
```

- `.values()` → menghasilkan MapIterator berisi semua value
- `[...]` → spread operator, mengubah iterator menjadi array biasa

Hasilnya adalah array of arrays yang kita butuhkan.

---

## 📊 Visualisasi Proses

```
Input: ['cat', 'act', 'dog', 'god', 'tac']
grouped awal: Map {}

─────────────────────────────────────────
Iterasi 1 — word: 'cat'
  key     : 'act'
  grouped : Map { 'act' => ['cat'] }
─────────────────────────────────────────
Iterasi 2 — word: 'act'
  key     : 'act'
  grouped : Map { 'act' => ['cat', 'act'] }
─────────────────────────────────────────
Iterasi 3 — word: 'dog'
  key     : 'dgo'
  grouped : Map { 'act' => ['cat', 'act'], 'dgo' => ['dog'] }
─────────────────────────────────────────
Iterasi 4 — word: 'god'
  key     : 'dgo'
  grouped : Map { 'act' => ['cat', 'act'], 'dgo' => ['dog', 'god'] }
─────────────────────────────────────────
Iterasi 5 — word: 'tac'
  key     : 'act'
  grouped : Map { 'act' => ['cat', 'act', 'tac'], 'dgo' => ['dog', 'god'] }
─────────────────────────────────────────

[...grouped.values()]:
  → [['cat', 'act', 'tac'], ['dog', 'god']] ✅
```

---

## 🔄 Perbandingan Object vs Map

```javascript
// Versi Object {}
const grouped = {}
if (!grouped[key]) grouped[key] = []   // cek pakai !grouped[key]
grouped[key].push(word)                // akses pakai grouped[key]
return Object.values(grouped)          // ambil values pakai Object.values()

// Versi Map
const grouped = new Map()
if (!grouped.has(key)) grouped.set(key, [])  // cek pakai .has()
grouped.get(key).push(word)                   // akses pakai .get()
return [...grouped.values()]                  // ambil values pakai spread
```

| Aspek | Object `{}` | `Map` |
|-------|-------------|-------|
| Cek key | `!obj[key]` | `.has(key)` |
| Set value | `obj[key] = value` | `.set(key, value)` |
| Get value | `obj[key]` | `.get(key)` |
| Ambil semua value | `Object.values(obj)` | `[...map.values()]` |
| Hasil akhir | Sama | Sama |

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ Pakai sintaks object untuk Map — tidak akan bekerja!
grouped[key] = []        // ← harusnya grouped.set(key, [])
grouped[key].push(word)  // ← harusnya grouped.get(key).push(word)
```

```javascript
// ❌ Lupa spread operator — hasilnya MapIterator, bukan array!
return grouped.values()    // ← harusnya [...grouped.values()]
// atau
return Array.from(grouped.values())  // ← ini juga valid
```

---

## 💡 Insight

> **Apa bedanya `[...map.values()]` dengan `Array.from(map.values())`?**
> Keduanya menghasilkan output yang **sama persis** — hanya beda gaya penulisan. `[...]` lebih ringkas dan modern, `Array.from()` lebih eksplisit dan mudah dibaca pemula.

> **Kenapa Map lebih cocok dari Object untuk beberapa kasus?**
> Untuk challenge ini keduanya setara. Tapi secara umum, Map lebih cocok ketika: key-nya bukan string (misalnya object atau number), kamu butuh urutan insertion yang terjaga, atau kamu sering cek `.size` dan iterasi. Object lebih cocok untuk data yang strukturnya sudah diketahui sejak awal.

---

## 🧪 Test Cases

```javascript
// Edge case — array kosong
console.log(anagramGrouping([]));
// → []

// Normal case 1
console.log(anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']));
// → [['cat', 'act', 'tac'], ['dog', 'god']]

// Normal case 2 — ada kata yang berdiri sendiri
console.log(anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world']));
// → [['listen', 'silent', 'enlist'], ['hello'], ['world']]
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03: Solusi — forEach + Object](03-solution-foreach-object_solusi-foreach-objek.md)**
- **📖 [Lanjut ke Part 05: Solusi — for...of + Map (dokumentasi) →](05-solution-forof-map-documentation_solusi-forof-map-dokumentasi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>