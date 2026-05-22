# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Sum of the first nth term of Series — Codewars](https://www.codewars.com/kata/555eded1ad94b00403000071)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Your task is to write a function which returns the n-th term of the following series, which is the sum of the first n terms of the sequence (n is the input parameter).
>
> Series: 1 + 1/4 + 1/7 + 1/10 + 1/13 + 1/16 + …
>
> You will need to figure out the rule of the series to complete this.
>
> **Rules:**
> - You need to round the answer to 2 decimal places and return it as String.
> - If the given value is 0 then it should return "0.00".
> - You will only be given Natural Numbers as arguments.
>
> **Examples:**
> - 1 --> 1 --> "1.00"
> - 2 --> 1 + 1/4 --> "1.25"
> - 5 --> 1 + 1/4 + 1/7 + 1/10 + 1/13 --> "1.57"

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Buatlah sebuah fungsi yang mengembalikan jumlah dari **n suku pertama** dari deret berikut:
>
> **1 + 1/4 + 1/7 + 1/10 + 1/13 + 1/16 + …**
>
> Kamu harus menemukan sendiri **pola/rumus** dari deret ini.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu sedang mengumpulkan koin. Koin pertama bernilai **1 penuh**. Koin kedua bernilai **1/4**. Koin ketiga bernilai **1/7**. Setiap koin berikutnya semakin kecil nilainya — penyebutnya naik **3** setiap kali (1, 4, 7, 10, 13, ...). Tugas kamu adalah menghitung total nilai dari **n koin pertama** yang kamu kumpulkan, lalu bulatkan hasilnya ke 2 angka desimal dan kembalikan sebagai teks (string).

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `n` | `number` | Jumlah suku yang ingin dijumlahkan (bilangan asli ≥ 0) |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `string` | Jumlah n suku pertama dari deret, dibulatkan 2 desimal (contoh: `"1.25"`) |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Hanya 1 suku
SeriesSum(1) // → "1.00"
// Penjelasan: Hanya suku pertama = 1/1 = 1. Dibulatkan → "1.00"

// Contoh 2 — 2 suku pertama
SeriesSum(2) // → "1.25"
// Penjelasan: 1 + 1/4 = 1.25. Dibulatkan → "1.25"

// Contoh 3 — 5 suku pertama
SeriesSum(5) // → "1.57"
// Penjelasan: 1 + 1/4 + 1/7 + 1/10 + 1/13 = 1.5698... → "1.57"

// Contoh 4 — Edge case: n = 0
SeriesSum(0) // → "0.00"
// Penjelasan: Tidak ada suku, hasilnya 0 → "0.00"
```

---

## ⚠️ Catatan Khusus

- [x] Pola penyebut: 1, 4, 7, 10, 13, ... → dimulai dari 1, naik 3 setiap suku → rumus penyebut suku ke-i = `1 + (i - 1) * 3` atau `3i - 2`
- [x] Hasil harus dikembalikan sebagai **String**, bukan Number
- [x] Jika `n = 0`, langsung return `"0.00"` — jangan sampai loop jalan dengan 0 iterasi lalu return angka tanpa format

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
