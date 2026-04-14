# 📋 Part 00 — Deskripsi Soal

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-5%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 📋 Soal | 📝 Signature | 📤 Output | 🔒 Constraints |
|:-------:|:------------:|:---------:|:--------------:|
| [Jump](#-deskripsi-soal) | [Jump](#-function-signature) | [Jump](#-contoh-input--output) | [Jump](#-constraints) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami apa yang diminta soal
- ✅ Memahami format input dan output yang diharapkan
- ✅ Memahami constraints yang berlaku
- ✅ Siap untuk melihat konsep dan pendekatan di Part 01

---

## 📋 Deskripsi Soal

> **Longest Consecutive Sequence**
>
> Tulis sebuah fungsi bernama **`longestConsecutiveSequence`** yang menerima sebuah array of integers sebagai input, lalu mengembalikan **panjang** dari urutan bilangan bulat berurutan terpanjang dalam array tersebut.
>
> Urutan berurutan (*consecutive sequence*) adalah urutan bilangan bulat di mana setiap angka berikutnya bernilai tepat satu lebih besar dari angka sebelumnya.

---

## 📝 Function Signature

```javascript
/**
 * Mengembalikan panjang urutan bilangan bulat berurutan terpanjang.
 *
 * @param {number[]} nums - Array of integers
 * @returns {number} - Panjang urutan berurutan terpanjang
 */
function longestConsecutiveSequence(nums) {
  // kode di sini
}
```

---

## 📊 Contoh Input & Output

```javascript
// Contoh 1
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));
// Output: 4
```

```javascript
// Contoh 2
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1]));
// Output: 10
```

> **Perhatikan:** Yang dikembalikan adalah **panjang** urutan (angka), bukan array urutannya. Contoh 1 mengembalikan `4` karena urutan `[1, 2, 3, 4]` panjangnya 4, bukan `[1, 2, 3, 4]` itu sendiri.

---

## 🔒 Constraints

| Constraint | Detail |
|------------|--------|
| Tipe input | Array hanya berisi bilangan bulat (integers) |
| Duplikat | Array boleh mengandung bilangan bulat duplikat |
| Array kosong | Kembalikan `0` jika array kosong |
| Urutan array | Array tidak harus terurut |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 01: Konsep & Pendekatan →](01-concept-and-approach_konsep-dan-pendekatan.md)**

---

<div align="center">

Made with ❤️ for learners

</div>