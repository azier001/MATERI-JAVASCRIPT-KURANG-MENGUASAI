# 🔴 Part 06 — Solusi: `for...of` + Map (dari AI)

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🔄 Perbandingan | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:---------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-perbandingan-dengan-versi-05) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami perbedaan kecil antara versi 05 dan versi 06
- ✅ Memahami bahwa solusi yang sama bisa ditemukan secara independen
- ✅ Siap untuk melihat perbandingan semua versi di Part 07

---

## 📄 Kode

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

> 💡 **Asal-usul:** Kode ini didapatkan dari AI lain saat eksplorasi berbagai pendekatan untuk challenge ini.

---

## 🔍 Penjelasan Per Bagian

### 1. Inisialisasi Map

```javascript
const anagramMap = new Map();
```

Map kosong sebagai tempat pengelompokan — sama dengan versi-versi sebelumnya.

---

### 2. Loop dengan `for...of`

```javascript
for (const word of words) {
```

Sama seperti versi 05 — menggunakan `for...of` untuk iterasi array.

---

### 3. Membuat derived key

```javascript
const sortedWord = word.split('').sort().join('');
```

Sama persis — nama variabelnya `sortedWord` (vs `sortedChars` di versi 05, vs `key` di versi 04).

---

### 4. Pola inisialisasi — perpaduan versi 04 dan 05

```javascript
if (!anagramMap.has(sortedWord)) {
  anagramMap.set(sortedWord, []);
}

anagramMap.get(sortedWord).push(word);
```

Ini adalah **perpaduan** dari dua pola sebelumnya:
- Dari versi 04: inisialisasi dan push **dipisah** menjadi dua langkah
- Dari versi 05: menggunakan `for...of`

Perbedaannya dengan versi 04: di sini inisialisasi ditulis dalam blok `if` yang lebih eksplisit (dengan kurung kurawal `{}`), bukan one-liner.

---

### 5. Return dengan spread

```javascript
return [...anagramMap.values()];
```

Sama dengan versi 04 — menggunakan spread operator `[...]`.

---

## 📊 Visualisasi Proses

```
Input: ['cat', 'act', 'dog', 'god', 'tac']
anagramMap awal: Map {}

─────────────────────────────────────────
Iterasi 1 — word: 'cat'
  sortedWord  : 'act'
  .has('act') : false → .set('act', [])
  .get('act').push('cat')
  anagramMap  : Map { 'act' => ['cat'] }
─────────────────────────────────────────
Iterasi 2 — word: 'act'
  sortedWord  : 'act'
  .has('act') : true → skip
  .get('act').push('act')
  anagramMap  : Map { 'act' => ['cat', 'act'] }
─────────────────────────────────────────
Iterasi 3 — word: 'dog'
  sortedWord  : 'dgo'
  .has('dgo') : false → .set('dgo', [])
  .get('dgo').push('dog')
  anagramMap  : Map { 'act' => ['cat', 'act'], 'dgo' => ['dog'] }
─────────────────────────────────────────
Iterasi 4 — word: 'god'
  sortedWord  : 'dgo'
  .has('dgo') : true → skip
  .get('dgo').push('god')
  anagramMap  : Map { 'act' => ['cat', 'act'], 'dgo' => ['dog', 'god'] }
─────────────────────────────────────────
Iterasi 5 — word: 'tac'
  sortedWord  : 'act'
  .has('act') : true → skip
  .get('act').push('tac')
  anagramMap  : Map { 'act' => ['cat', 'act', 'tac'], 'dgo' => ['dog', 'god'] }
─────────────────────────────────────────

[...anagramMap.values()]:
  → [['cat', 'act', 'tac'], ['dog', 'god']] ✅
```

---

## 🔄 Perbandingan dengan Versi 05

```javascript
// Versi 05 — if/else, Array.from()
for (const word of words) {
  const sortedChars = word.split('').sort().join('');
  if (anagramGroups.has(sortedChars)) {
    anagramGroups.get(sortedChars).push(word);
  } else {
    anagramGroups.set(sortedChars, [word]);  // langsung isi [word]
  }
}
return Array.from(anagramGroups.values())

// Versi 06 — if tanpa else, spread
for (const word of words) {
  const sortedWord = word.split('').sort().join('');
  if (!anagramMap.has(sortedWord)) {
    anagramMap.set(sortedWord, []);          // init kosong dulu
  }
  anagramMap.get(sortedWord).push(word);     // push di luar if
}
return [...anagramMap.values()]
```

| Aspek | Versi 05 | Versi 06 |
|-------|----------|----------|
| Loop | `for...of` | `for...of` |
| Pola inisialisasi | `if/else` | `if` tanpa `else` |
| Set awal | `set(key, [word])` langsung | `set(key, [])` lalu push terpisah |
| Push | Di dalam `if` | Di luar `if` |
| Return | `Array.from()` | `[...spread]` |
| Hasil | Sama | Sama |

---

## 💡 Insight

> **Menarik — versi ini hampir identik dengan versi 04!**
> Versi 06 (dari AI) dan versi 04 (yang kita buat sendiri) menggunakan pola yang sama persis: `if (!map.has(key)) map.set(key, [])` lalu `map.get(key).push(word)`. Perbedaannya hanya di loop (`forEach` vs `for...of`) dan return (`[...spread]` sama). Ini membuktikan bahwa solusi yang baik bisa ditemukan secara independen oleh siapapun!

> **Mana yang lebih baik antara versi 05 dan 06?**
> Versi 05 sedikit lebih efisien karena tidak perlu memanggil `.get()` setelah `.set()` di kondisi `else` — langsung isi `[word]`. Tapi perbedaannya sangat kecil dan tidak berpengaruh secara praktis. Pilih yang lebih mudah kamu baca.

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
- **📖 [← Part 05: Solusi — for...of + Map (dokumentasi)](05-solution-forof-map-documentation_solusi-forof-map-dokumentasi.md)**
- **📖 [Lanjut ke Part 07: Perbandingan Semua Solusi →](07-comparison-all-solutions_perbandingan-semua-solusi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>