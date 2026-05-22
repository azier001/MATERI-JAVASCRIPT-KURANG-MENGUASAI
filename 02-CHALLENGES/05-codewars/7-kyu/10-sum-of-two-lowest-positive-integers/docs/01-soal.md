# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Sum of two lowest positive integers — Codewars](https://www.codewars.com/kata/sum-of-two-lowest-positive-integers)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 positive integers. No floats or non-positive integers will be passed.
> 
> For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.
> 
> [10, 343445353, 3453445, 3453545353453] should return 3453455.

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Buatlah sebuah fungsi yang mengembalikan jumlah dari dua angka positif terkecil yang ada di dalam sebuah array. Array tersebut akan selalu berisi minimal 4 bilangan bulat positif. Tidak akan ada bilangan pecahan (float) atau bilangan non-positif (negatif atau nol) yang dimasukkan.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu diberi sekumpulan angka (minimal 4 angka). Tugasmu adalah mencari dua angka yang nilainya paling kecil di antara semua angka tersebut, kemudian menjumlahkan kedua angka tersebut.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `numbers` | `Array<number>` | Array yang berisi minimal 4 bilangan bulat positif. |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `number` | Hasil penjumlahan dari dua angka terkecil di dalam array. |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Array acak
sumTwoSmallestNumbers([19, 5, 42, 2, 77]) // → 7
// Penjelasan: Dua angka terkecil adalah 2 dan 5. 2 + 5 = 7.

// Contoh 2 — Angka besar
sumTwoSmallestNumbers([10, 343445353, 3453445, 3453545353453]) // → 3453455
// Penjelasan: Dua angka terkecil adalah 10 dan 3453445. 10 + 3453445 = 3453455.
```

---

## ⚠️ Catatan Khusus

- [ ] Tidak perlu menghandle tipe data float/desimal.
- [ ] Tidak perlu menghandle angka negatif atau nol.
- [ ] Array dipastikan selalu memiliki minimal 4 elemen (tidak perlu mengecek apakah array kosong atau panjangnya kurang dari 4).

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
