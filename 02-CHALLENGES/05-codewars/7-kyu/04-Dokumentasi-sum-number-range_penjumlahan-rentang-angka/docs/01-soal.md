# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Beginner Series #3 Sum of Numbers — Codewars](https://www.codewars.com/kata/55f2b110f61eb01779000053)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> *Given two integers a and b, which can be positive or negative, find the sum of all the integers between and including them and return it. If the two numbers are equal return a or b.*
> 
> *Note: a and b are not ordered!*

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Diberikan dua bilangan bulat `a` dan `b` (bisa positif atau negatif), temukan jumlah dari semua bilangan bulat di antara dan **termasuk** kedua angka tersebut, lalu kembalikan hasilnya. Jika kedua angka sama, kembalikan `a` atau `b`.
>
> Catatan: `a` dan `b` **tidak selalu berurutan** — bisa saja `a` lebih besar dari `b` dan sebaliknya!

### 🗣️ Penjelasan Sederhana

Bayangkan kamu diminta menghitung total uang koin yang berjejer di lantai. Koin-koin itu bernomor dari angka `a` sampai `b`. Tugasmu sederhana: **jumlahkan semua nomor koin tersebut**. 

Masalahnya:
- Kamu **tidak tahu** koin mana yang di ujung kiri (terkecil) dan mana yang di ujung kanan (terbesar) — kamu harus cek sendiri.
- Nomor koin bisa **negatif** (misal: -3, -2, -1, 0, 1, 2).

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `a` | `Number` | Bilangan bulat pertama (bisa positif, negatif, atau nol) |
| `b` | `Number` | Bilangan bulat kedua (bisa positif, negatif, atau nol) |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Number` | Hasil penjumlahan semua bilangan bulat dari batas bawah hingga batas atas (inklusif) |

---

## 🎨 Visualisasi Alur

```
[Input] → getSum(-1, 2)

Langkah 1: Tentukan batas
  a = -1, b = 2
  min = -1 (angka terkecil)
  max =  2 (angka terbesar)

Langkah 2: Jumlahkan semua angka di rentang [min...max]
  -1 + 0 + 1 + 2
  = (-1 + 0) + (1 + 2)
  = -1 + 3
  = 2

Langkah 3: Return hasilnya
  → 2

[Output] → 2
```

---

## 🧪 Contoh

```javascript
// Contoh 1 — Kedua angka sama (edge case)
getSum(1, 1) // → 1
// Penjelasan: kedua angka sama, langsung kembalikan 1

// Contoh 2 — a lebih kecil dari b (sudah berurutan)
getSum(1, 2) // → 3
// Penjelasan: 1 + 2 = 3

// Contoh 3 — a lebih besar dari b (terbalik!)
getSum(1, 0) // → 1
// Penjelasan: min=0, max=1 → 0 + 1 = 1

// Contoh 4 — Melibatkan angka negatif
getSum(-1, 0) // → -1
// Penjelasan: -1 + 0 = -1

// Contoh 5 — Range dari negatif ke positif
getSum(-1, 2) // → 2
// Penjelasan: -1 + 0 + 1 + 2 = 2
```

---

## 🔢 Referensi Penjumlahan Rentang

> Tabel ini berguna untuk memverifikasi hasil secara manual.

| Input `(a, b)` | Rentang Angka | Penjumlahan | Hasil |
|:--------------:|:-------------:|:-----------:|:-----:|
| `(1, 1)` | `[1]` | `1` | `1` |
| `(1, 2)` | `[1, 2]` | `1 + 2` | `3` |
| `(0, 1)` | `[0, 1]` | `0 + 1` | `1` |
| `(1, 0)` | `[0, 1]` | `0 + 1` | `1` |
| `(-1, 0)` | `[-1, 0]` | `-1 + 0` | `-1` |
| `(-1, 2)` | `[-1, 0, 1, 2]` | `-1 + 0 + 1 + 2` | `2` |

---

## ⚠️ Catatan Khusus

- [x] Parameter `a` dan `b` **tidak dijamin berurutan** — `a` bisa lebih besar dari `b`. Kita harus menentukan batas bawah dan batas atas sendiri.
- [x] Angka bisa bernilai **negatif** — jangan berasumsi input selalu positif.
- [x] Jika `a == b`, cukup kembalikan angka tersebut (tidak perlu looping).
- [x] Kata kunci "**including**" artinya kedua ujung (`a` dan `b`) **ikut dijumlahkan** — gunakan `<=` bukan `<`.

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
