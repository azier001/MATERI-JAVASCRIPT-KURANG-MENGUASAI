# 🧪 Part 08 — Edge Cases

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-5%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 🧪 Edge Cases | 💡 Kenapa Penting |
|:-------------:|:-----------------:|
| [Jump](#-edge-cases) | [Jump](#-kenapa-edge-cases-penting) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami edge case yang mungkin terjadi di challenge ini
- ✅ Tahu kenapa kode kita sudah menangani edge case secara otomatis
- ✅ Terbiasa memikirkan edge case sebelum submit solusi

---

## 🧪 Edge Cases

### 1. Array Kosong

```javascript
console.log(anagramGrouping([]));
// → []
```

**Apa yang terjadi?**

`reduce`, `forEach`, dan `for...of` tidak akan berjalan sama sekali karena tidak ada elemen yang diiterasi. Hasilnya langsung return penampung kosong — `{}` untuk Object lalu diubah ke `[]`, atau `Map {}` lalu diubah ke `[]`.

✅ **Semua versi menangani ini secara otomatis — tidak perlu kondisi khusus.**

---

### 2. Kata Tunggal

```javascript
console.log(anagramGrouping(['cat']));
// → [['cat']]
```

**Apa yang terjadi?**

Hanya ada satu iterasi. `'cat'` menghasilkan key `'act'`, lalu masuk ke group sendiri. `Object.values()` atau `[...map.values()]` menghasilkan `[['cat']]`.

✅ **Semua versi menangani ini secara otomatis.**

---

### 3. Semua Kata adalah Anagram Satu Sama Lain

```javascript
console.log(anagramGrouping(['cat', 'act', 'tac']));
// → [['cat', 'act', 'tac']]
```

**Apa yang terjadi?**

Semua kata menghasilkan key yang sama (`'act'`), sehingga semua masuk ke satu group. Hasilnya array dengan satu sub-array berisi semua kata.

✅ **Semua versi menangani ini secara otomatis.**

---

### 4. Tidak Ada Kata yang Merupakan Anagram Satu Sama Lain

```javascript
console.log(anagramGrouping(['hello', 'world', 'foo']));
// → [['hello'], ['world'], ['foo']]
```

**Apa yang terjadi?**

Setiap kata menghasilkan key yang unik, sehingga masing-masing berdiri sendiri dalam sub-array-nya. Jumlah sub-array sama dengan jumlah kata.

✅ **Semua versi menangani ini secara otomatis.**

---

### 5. Kata dengan Satu Huruf

```javascript
console.log(anagramGrouping(['a', 'b', 'a']));
// → [['a', 'a'], ['b']]
```

**Apa yang terjadi?**

`'a'` di-sort tetap `'a'`, `'b'` di-sort tetap `'b'`. Dua `'a'` dikelompokkan bersama, `'b'` berdiri sendiri.

✅ **Semua versi menangani ini secara otomatis.**

---

## 💡 Kenapa Edge Cases Penting?

> Edge case adalah kondisi "batas" yang kadang terlewat saat kita fokus pada kasus normal. Memikirkan edge case sebelum submit adalah kebiasaan yang membedakan developer junior dan senior.

Untuk challenge ini, semua edge case **tertangani secara natural** tanpa perlu kondisi `if` tambahan — karena:

1. `reduce`/`forEach`/`for...of` pada array kosong langsung return penampung awal
2. Kata tunggal tetap dikelompokkan dalam sub-array
3. Derived key dari sorting huruf secara otomatis menangani semua variasi

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 07: Perbandingan Semua Solusi](07-comparison-all-solutions_perbandingan-semua-solusi.md)**
- **📖 [Lanjut ke Part 09: Ringkasan Algoritma →](09-algorithm-summary_ringkasan-algoritma.md)**

---

<div align="center">

Made with ❤️ for learners

</div>