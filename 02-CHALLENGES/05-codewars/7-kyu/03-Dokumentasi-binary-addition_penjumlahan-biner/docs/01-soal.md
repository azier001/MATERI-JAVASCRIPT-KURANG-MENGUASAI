# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Binary Addition — Codewars](https://www.codewars.com/kata/551f37452ff852b7bd000139)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> *Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.*
> 
> *The binary number returned should be a string.*

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Buat sebuah fungsi yang menjumlahkan dua buah angka, lalu kembalikan hasil penjumlahannya dalam bentuk **biner** (basis 2). Konversi ke biner bisa dilakukan sebelum atau sesudah penjumlahan.
> 
> Angka biner yang dikembalikan **harus berupa tipe data string**.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu sedang menghitung apel. Kamu punya 1 apel dan temanmu punya 1 apel, totalnya 2 apel. Nah, komputer tidak mengenal angka 2 — komputer hanya mengenal 0 dan 1 (biner). Jadi kita harus mengubah hasil jumlahnya (angka desimal) ke dalam "bahasa komputer" (biner). Angka 2 dalam biner adalah `"10"`.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `a` | `Number` | Angka pertama yang akan dijumlahkan |
| `b` | `Number` | Angka kedua yang akan dijumlahkan |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `String` | Hasil penjumlahan `a + b` yang sudah dikonversi ke format biner (basis 2). Contoh: angka `2` dikembalikan sebagai `"10"` |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Penjumlahan kecil
addBinary(1, 1) // → "10"
// Penjelasan: 1 + 1 = 2 dalam desimal. 2 dalam biner = 10.

// Contoh 2 — Penjumlahan yang lebih besar
addBinary(5, 9) // → "1110"
// Penjelasan: 5 + 9 = 14 dalam desimal. 14 dalam biner = 1110.

// Contoh 3 — Edge case (nol)
addBinary(0, 0) // → "0"
// Penjelasan: 0 + 0 = 0 dalam desimal. 0 dalam biner tetap 0.
```

---

## 🔢 Referensi Konversi Desimal → Biner

> Tabel ini berguna untuk memverifikasi hasil secara manual.

| Desimal | Biner | Penjelasan Singkat |
|:-------:|:-----:|:-------------------|
| 0 | `0` | Tidak ada nilai |
| 1 | `1` | 1×2⁰ = 1 |
| 2 | `10` | 1×2¹ + 0×2⁰ = 2 |
| 5 | `101` | 1×2² + 0×2¹ + 1×2⁰ = 5 |
| 9 | `1001` | 1×2³ + 0×2² + 0×2¹ + 1×2⁰ = 9 |
| 14 | `1110` | 1×2³ + 1×2² + 1×2¹ + 0×2⁰ = 14 |

---

## ⚠️ Catatan Khusus

- [x] Tipe data kembalian (return value) **wajib** berupa `String`, bukan `Number`
- [x] Konversi ke biner bisa dilakukan **setelah** penjumlahan — ini pendekatan yang paling simpel
- [x] JavaScript memiliki built-in method `.toString(radix)` yang sangat mempermudah konversi basis bilangan
- [x] Perhatikan bahwa `(2).toString(2)` menghasilkan `"10"` (string), bukan angka `10`

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
