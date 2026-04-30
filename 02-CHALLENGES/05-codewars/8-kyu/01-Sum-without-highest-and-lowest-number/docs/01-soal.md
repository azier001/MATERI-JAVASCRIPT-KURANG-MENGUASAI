# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-8%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Sum without highest and lowest number — Codewars](https://www.codewars.com/kata/576b93db1129fcf2200001e6)

---

## 📝 Deskripsi Soal

> Sum all the numbers of a given array ( cq. list ), except the highest and the lowest element ( by value, not by index! ).
>
> The highest or lowest element respectively is a single element at each edge, even if there are more than one with the same value.
>
> Mind the input validation.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `array` | `Array` | Kumpulan angka yang akan dijumlahkan. |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Number` | Hasil penjumlahan seluruh angka selain nilai tertinggi dan terendah. |

---

## 🧪 Contoh

```javascript
// Contoh 1
sumArray([ 6, 2, 1, 8, 10 ]) // → 16

// Contoh 2
sumArray([ 1, 1, 11, 2, 3 ]) // → 6

// Contoh 3 (edge case / invalid input)
sumArray([]) // → 0
sumArray(null) // → 0
```

---

## ⚠️ Catatan Khusus

- [ ] Evaluasi berdasarkan **nilai tertinggi dan terendah**, bukan berdasarkan index elemen pertama atau terakhir.
- [ ] Jika ada angka tertinggi/terendah yang memiliki duplikat, hanya kurangi satu angka tertinggi dan satu angka terendah tersebut.
- [ ] Validasi Input: Jika input kosong (null, None, dll.), array kosong, atau array hanya memiliki 1 elemen, fungsi harus mengembalikan `0`.

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
