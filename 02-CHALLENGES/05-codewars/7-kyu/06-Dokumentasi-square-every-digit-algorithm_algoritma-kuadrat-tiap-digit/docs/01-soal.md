# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Square Every Digit — Codewars](https://www.codewars.com/kata/square-every-digit)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Welcome. In this kata, you are asked to square every digit of a number and concatenate them.
>
> For example, if we run 9119 through the function, 811181 will come out, because 9^2 is 81 and 1^2 is 1. (81-1-1-81)
>
> Example #2: An input of 765 will/should return 493625 because 7^2 is 49, 6^2 is 36, and 5^2 is 25. (49-36-25)
>
> Note: The function accepts an integer and returns an integer.
>
> Happy Coding!

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Dalam challenge ini, kamu diminta untuk mengkuadratkan setiap digit dari sebuah angka dan menggabungkan hasilnya menjadi satu angka baru.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu punya mesin pemisah angka. Mesin ini akan mengambil angka seperti `765`, lalu memisahkannya menjadi `7`, `6`, dan `5`. Kemudian, masing-masing angka tersebut dikuadratkan:
- `7` dikuadratkan jadi `49`
- `6` dikuadratkan jadi `36`
- `5` dikuadratkan jadi `25`

Setelah itu, hasil kuadratnya ditempel lagi menjadi satu angka panjang: `493625`.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `num` | `Number` | Angka integer yang setiap digitnya akan dikuadratkan. |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Number` | Angka integer baru hasil penggabungan kuadrat setiap digit dari input. |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Angka kembar
squareDigits(9119) // → 811181
// Penjelasan: 9^2 = 81, 1^2 = 1. Digabungkan menjadi 81, 1, 1, 81 → 811181

// Contoh 2 — Angka berurutan turun
squareDigits(765) // → 493625
// Penjelasan: 7^2 = 49, 6^2 = 36, 5^2 = 25. Digabungkan menjadi 493625

// Contoh 3 — Angka 0
squareDigits(0) // → 0
// Penjelasan: 0^2 = 0. Mengembalikan 0.
```

---

## ⚠️ Catatan Khusus

- [x] Input selalu merupakan angka integer (bilangan bulat).
- [x] Output yang dikembalikan juga harus berupa angka (Number), bukan teks (String).
- [x] Fungsi harus bisa menangani angka 0.

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
