# 🟠 Part 05 — Solusi: `for...of` + Map (dari Dokumentasi)

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🔄 Perbandingan | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:---------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-perbandingan-dengan-versi-04) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami penggunaan `for...of` sebagai alternatif `forEach`
- ✅ Memahami pola `if/else` untuk inisialisasi Map
- ✅ Memahami penggunaan `Array.from()` sebagai alternatif spread `[...]`
- ✅ Siap untuk melihat versi terakhir di Part 06

---

## 📄 Kode

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

> 💡 **Asal-usul:** Kode ini ditemukan dari sebuah dokumentasi eksternal saat eksplorasi berbagai pendekatan untuk challenge ini.

---

## 🔍 Penjelasan Per Bagian

### 1. Inisialisasi Map

```javascript
const anagramGroups = new Map();
```

Sama seperti versi sebelumnya — Map kosong sebagai tempat pengelompokan.

---

### 2. Loop dengan `for...of`

```javascript
for (const word of words) {
```

`for...of` adalah sintaks bawaan JavaScript untuk iterasi array. Hasilnya sama dengan `forEach`, hanya beda gaya penulisan. `for...of` lebih familiar bagi yang terbiasa dengan bahasa pemrograman lain.

---

### 3. Membuat derived key

```javascript
const sortedChars = word.split('').sort().join('');
```

Sama persis dengan versi sebelumnya — nama variabelnya saja yang berbeda (`sortedChars` vs `key`).

---

### 4. Pola `if/else` untuk inisialisasi

```javascript
if (anagramGroups.has(sortedChars)) {
  anagramGroups.get(sortedChars).push(word);
} else {
  anagramGroups.set(sortedChars, [word]);
}
```

Ini perbedaan utama dari versi Part 04. Versi ini pakai `if/else`:
- Kalau key **sudah ada** → langsung `.get()` dan `.push()`
- Kalau key **belum ada** → `.set()` dengan `[word]` langsung diisi sekaligus

Berbeda dengan versi Part 04 yang memisahkan inisialisasi dan push menjadi dua langkah terpisah.

---

### 5. Return dengan `Array.from()`

```javascript
return Array.from(anagramGroups.values());
```

`Array.from()` mengubah MapIterator menjadi array biasa — sama fungsinya dengan `[...map.values()]` di versi sebelumnya.

---

## 📊 Visualisasi Proses

```
Input: ['cat', 'act', 'dog', 'god', 'tac']
anagramGroups awal: Map {}

─────────────────────────────────────────
Iterasi 1 — word: 'cat'
  sortedChars : 'act'
  .has('act') : false → else → .set('act', ['cat'])
  anagramGroups: Map { 'act' => ['cat'] }
─────────────────────────────────────────
Iterasi 2 — word: 'act'
  sortedChars : 'act'
  .has('act') : true → .get('act').push('act')
  anagramGroups: Map { 'act' => ['cat', 'act'] }
─────────────────────────────────────────
Iterasi 3 — word: 'dog'
  sortedChars : 'dgo'
  .has('dgo') : false → else → .set('dgo', ['dog'])
  anagramGroups: Map { 'act' => ['cat', 'act'], 'dgo' => ['dog'] }
─────────────────────────────────────────
Iterasi 4 — word: 'god'
  sortedChars : 'dgo'
  .has('dgo') : true → .get('dgo').push('god')
  anagramGroups: Map { 'act' => ['cat', 'act'], 'dgo' => ['dog', 'god'] }
─────────────────────────────────────────
Iterasi 5 — word: 'tac'
  sortedChars : 'act'
  .has('act') : true → .get('act').push('tac')
  anagramGroups: Map { 'act' => ['cat', 'act', 'tac'], 'dgo' => ['dog', 'god'] }
─────────────────────────────────────────

Array.from(anagramGroups.values()):
  → [['cat', 'act', 'tac'], ['dog', 'god']] ✅
```

---

## 🔄 Perbandingan dengan Versi 04

```javascript
// Versi 04 — forEach + pola 2 langkah
words.forEach((word) => {
  const key = word.split('').sort().join('')
  if (!grouped.has(key)) grouped.set(key, [])  // langkah 1: init
  grouped.get(key).push(word)                   // langkah 2: push
})
return [...grouped.values()]

// Versi 05 — for...of + pola if/else
for (const word of words) {
  const sortedChars = word.split('').sort().join('');
  if (anagramGroups.has(sortedChars)) {
    anagramGroups.get(sortedChars).push(word);   // sudah ada → push
  } else {
    anagramGroups.set(sortedChars, [word]);       // belum ada → set sekaligus
  }
}
return Array.from(anagramGroups.values())
```

| Aspek | Versi 04 | Versi 05 |
|-------|----------|----------|
| Loop | `forEach` | `for...of` |
| Pola inisialisasi | 2 langkah terpisah | `if/else` |
| Set awal | `set(key, [])` lalu push | `set(key, [word])` langsung |
| Return | `[...map.values()]` | `Array.from(map.values())` |
| Hasil | Sama | Sama |

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ Lupa branch else — key baru tidak pernah dibuat!
if (anagramGroups.has(sortedChars)) {
  anagramGroups.get(sortedChars).push(word);
}
// ← tidak ada else, kata pertama di setiap group hilang!
```

```javascript
// ❌ Di branch else, lupa masukkan word — array kosong!
} else {
  anagramGroups.set(sortedChars, []);  // ← harusnya [word], bukan []
}
```

---

## 💡 Insight

> **`for...of` vs `forEach` — mana yang lebih baik?**
> Untuk use case ini keduanya setara. `for...of` lebih fleksibel karena bisa di-`break` atau di-`continue` di tengah loop — sesuatu yang tidak bisa dilakukan dengan `forEach`. `forEach` lebih idiomatik untuk gaya functional programming.

> **Pola `if/else` vs pola 2 langkah — mana yang lebih baik?**
> Pola `if/else` (versi ini) lebih eksplisit — kamu bisa lihat dengan jelas apa yang terjadi di kedua kondisi. Pola 2 langkah (versi 04) lebih ringkas karena tidak ada duplikasi `.get().push()`. Keduanya benar dan menghasilkan output yang sama.

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
- **📖 [← Part 04: Solusi — forEach + Map](04-solution-foreach-map_solusi-foreach-map.md)**
- **📖 [Lanjut ke Part 06: Solusi — for...of + Map (AI) →](06-solution-forof-map-ai_solusi-forof-map-ai.md)**

---

<div align="center">

Made with ❤️ for learners

</div>