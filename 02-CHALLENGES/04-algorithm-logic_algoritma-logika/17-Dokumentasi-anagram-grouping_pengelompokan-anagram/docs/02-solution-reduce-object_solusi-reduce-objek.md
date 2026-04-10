# 🔵 Part 02 — Solusi: `reduce` + Object

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja `reduce` untuk membangun object pengelompokan
- ✅ Memahami peran `Object.values()` untuk mengubah object ke array
- ✅ Memahami kenapa `return acc` wajib ada di dalam `reduce`
- ✅ Siap untuk melihat versi alternatif di Part 03

---

## 📄 Kode


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

## 🔍 Penjelasan Per Bagian

### 1. Menyiapkan `reduce` dengan initial value `{}`

```javascript
words.reduce((acc, word) => {
  // ...
}, {})
```

`reduce` dimulai dengan `acc = {}` — object kosong yang akan kita isi satu per satu. Setiap iterasi, `word` adalah kata yang sedang diproses.

---

### 2. Membuat derived key

```javascript
const key = word.split('').sort().join('')
```

Ini adalah inti dari solusi:
- `split('')` → pecah kata jadi array huruf → `['c','a','t']`
- `.sort()` → urutkan huruf → `['a','c','t']`
- `.join('')` → gabung kembali → `'act'`

Karena constraint soal menjamin semua huruf lowercase, `.sort()` tanpa argumen sudah cukup.

---

### 3. Lazy initialization — buat array kalau belum ada

```javascript
if (!acc[key]) acc[key] = []
```

Kalau `acc[key]` belum ada, buat dulu array kosong. Ini disebut **lazy initialization** — kita hanya membuat entry baru saat benar-benar dibutuhkan.

---

### 4. Masukkan kata ke dalam group yang sesuai

```javascript
acc[key].push(word)
```

Setelah `acc[key]` pasti ada, langsung `push` kata aslinya (bukan key-nya!).

---

### 5. Wajib `return acc`

```javascript
return acc
```

Ini **wajib** ada di dalam `reduce`. Tanpa ini, nilai `acc` di iterasi berikutnya menjadi `undefined` dan program crash. Berbeda dengan `forEach` di mana variabel penampung hidup di luar loop.

---

### 6. Ambil semua value dengan `Object.values()`

```javascript
return Object.values(result)
```

`result` saat ini adalah object seperti ini:
```javascript
{
  act: ['cat', 'act', 'tac'],
  dgo: ['dog', 'god']
}
```

`Object.values()` mengambil hanya value-nya saja, menghasilkan:
```javascript
[['cat', 'act', 'tac'], ['dog', 'god']]
```

---

## 📊 Visualisasi Proses

```
Input: ['cat', 'act', 'dog', 'god', 'tac']
acc awal: {}

─────────────────────────────────────────
Iterasi 1 — word: 'cat'
  key    : 'act'
  acc    : { act: ['cat'] }
─────────────────────────────────────────
Iterasi 2 — word: 'act'
  key    : 'act'
  acc    : { act: ['cat', 'act'] }
─────────────────────────────────────────
Iterasi 3 — word: 'dog'
  key    : 'dgo'
  acc    : { act: ['cat', 'act'], dgo: ['dog'] }
─────────────────────────────────────────
Iterasi 4 — word: 'god'
  key    : 'dgo'
  acc    : { act: ['cat', 'act'], dgo: ['dog', 'god'] }
─────────────────────────────────────────
Iterasi 5 — word: 'tac'
  key    : 'act'
  acc    : { act: ['cat', 'act', 'tac'], dgo: ['dog', 'god'] }
─────────────────────────────────────────

Object.values(result):
  → [['cat', 'act', 'tac'], ['dog', 'god']] ✅
```

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ Lupa return acc — program crash!
words.reduce((acc, word) => {
  const key = word.split('').sort().join('')
  if (!acc[key]) acc[key] = []
  acc[key].push(word)
  // return acc ← lupa ini!
}, {})
```

```javascript
// ❌ Push key bukan word — hasil salah!
acc[key].push(key)   // ← harusnya push(word)
```

```javascript
// ❌ Initial value array [] bukan object {} — hasil salah!
words.reduce((acc, word) => { ... }, [])  // ← harusnya {}
```

---

## 💡 Insight

> **Kenapa `return acc` wajib di `reduce` tapi tidak di `forEach`?**
> Karena `reduce` meneruskan nilai `acc` antar iterasi melalui return value. Jika tidak di-return, iterasi berikutnya menerima `undefined` sebagai `acc` dan crash. Di `forEach`, variabel penampung hidup di luar loop jadi tidak perlu di-return setiap iterasi.

> **Kenapa pakai `Object.values()` di akhir?**
> Karena `reduce` menghasilkan object `{}`, sedangkan output yang diminta adalah array of arrays `[]`. `Object.values()` adalah cara paling ringkas untuk mengambil semua value dari object tanpa key-nya.

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
- **📖 [← Part 01: Konsep & Pendekatan](01-concept-and-approach_konsep-dan-pendekatan.md)**
- **📖 [Lanjut ke Part 03: Solusi — forEach + Object →](03-solution-foreach-object_solusi-foreach-objek.md)**

---

<div align="center">

Made with ❤️ for learners

</div>