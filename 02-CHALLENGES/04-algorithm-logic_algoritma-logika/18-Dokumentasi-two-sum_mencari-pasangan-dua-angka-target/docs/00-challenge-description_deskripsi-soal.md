# 📋 Part 00 — Deskripsi Soal

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
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

> **Two Sum**
>
> Tulis sebuah fungsi bernama **`twoSum`** yang menerima sebuah array of integers dan sebuah integer target sebagai input, lalu mengembalikan array berisi **indeks** dari dua angka yang jika dijumlahkan menghasilkan nilai target.

### 📝 Function Signature

```javascript
/**
 * Mengembalikan array berisi indeks dari dua angka
 * yang jika dijumlahkan menghasilkan nilai target.
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Nilai target
 * @returns {number[]} - Array berisi dua indeks
 */
function twoSum(nums, target) {
  // kode di sini
}
```

---

## 📊 Contoh Input & Output

```javascript
// Contoh 1
twoSum([2, 7, 11, 15], 9)
// Output: [0, 1]
```

```javascript
// Contoh 2
twoSum([3, 2, 4], 6)
// Output: [1, 2]
```

```javascript
// Contoh 3
twoSum([3, 3], 6)
// Output: [0, 1]
```

> **Perhatikan:** Di beberapa referensi, output ditulis sebagai `[0, 1] (2 + 7 = 9)` — bagian `(2 + 7 = 9)` **bukan** format output yang harus dikembalikan fungsi. Itu hanya komentar penjelasan dari pembuat soal. Yang harus di-return adalah **array of indices** saja, contohnya `[0, 1]`.

---

## 🔒 Constraints

| Constraint | Detail |
|------------|--------|
| Input integer | Setiap input integer adalah unik |
| Pasangan valid | Dijamin selalu ada tepat satu pasangan yang valid |
| Return value | Array berisi tepat dua indeks |
| Urutan indeks | Indeks pertama selalu lebih kecil dari indeks kedua |

> 💡 Constraint "setiap input integer adalah unik" berarti tidak akan ada nilai duplikat di array — kecuali pada kasus seperti `[3, 3]` di mana dua angka yang sama memang diperlukan untuk mencapai target.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 01: Konsep & Pendekatan →](01-concept-and-approach_konsep-dan-pendekatan.md)**

---

<div align="center">

Made with ❤️ for learners

</div>