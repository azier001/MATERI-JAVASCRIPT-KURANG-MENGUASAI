# 📋 Part 00 — Deskripsi Soal

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-5%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 📋 Soal | 📤 Output | 🔒 Constraints |
|:-------:|:---------:|:--------------:|
| [Jump](#-deskripsi-soal) | [Jump](#-contoh-input--output) | [Jump](#-constraints) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa yang diminta soal
- ✅ Memahami format input dan output yang diharapkan
- ✅ Memahami constraints yang berlaku
- ✅ Siap untuk melihat konsep dan pendekatan di Part 01

---

## 📋 Deskripsi Soal

> **Anagram Grouping**
>
> Anagram adalah kata atau frasa yang terbentuk dari susunan ulang huruf-huruf kata lain. Misalnya, `cinema` adalah anagram dari `iceman`.
>
> Tulis sebuah fungsi bernama **`anagramGrouping`** yang menerima sebuah array of strings sebagai input, dan mengembalikan array of arrays — di mana setiap sub-array berisi kata-kata yang merupakan anagram satu sama lain.

### 📝 Function Signature

```javascript
/**
 * Mengembalikan array of arrays, di mana setiap sub-array
 * berisi kata-kata yang merupakan anagram satu sama lain.
 *
 * @param {string[]} words - Array of strings berisi kata-kata
 * @returns {string[][]} - Array of arrays berisi grup anagram
 */
function anagramGrouping(words) {
  // kode di sini
}
```

---

## 📊 Contoh Input & Output

```javascript
// Contoh 1
anagramGrouping(['cat', 'act', 'dog', 'god', 'tac'])
// Output: [['cat', 'act', 'tac'], ['dog', 'god']]
```

```javascript
// Contoh 2
anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world'])
// Output: [['listen', 'silent', 'enlist'], ['hello'], ['world']]
```

> **Perhatikan:** Kata yang tidak punya anagram tetap muncul di output — tapi dalam sub-array yang hanya berisi dirinya sendiri. Contoh: `'hello'` dan `'world'` masing-masing berdiri sendiri.

---

## 🔒 Constraints

| Constraint | Detail |
|------------|--------|
| Isi array | Hanya huruf alfabet kecil (lowercase) |
| Karakter spesial | Tidak ada |
| Angka | Tidak ada |
| Huruf kapital | Tidak ada |

> 💡 Constraint "hanya huruf kecil" ini penting — karena berarti kita bisa pakai `.sort()` tanpa argumen tambahan dan hasilnya tetap konsisten.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 01: Konsep & Pendekatan →](01-concept-and-approach_konsep-dan-pendekatan.md)**

---

<div align="center">

Made with ❤️ for learners

</div>