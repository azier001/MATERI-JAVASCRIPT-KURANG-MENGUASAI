# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Equal Sides Of An Array — Codewars](https://www.codewars.com/kata/5679aa472b8f57fb8c000047)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N.
>
> If there is no index that would make this happen, return -1.
>
> For example:
> Let's say you are given the array {1,2,3,4,3,2,1}:
> Your function will return the index 3, because the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.
>
> Let's look at another one.
> You are given the array {1,100,50,-51,1,1}:
> Your function will return the index 1, because the sum of left side of the index ({1}) and the sum of the right side of the index ({50,-51,1,1}) both equal 1.
>
> Last one:
> You are given the array {20,10,-80,10,10,15,35}
> At index 0 the left side is {}
> The right side is {10,-80,10,10,15,35}
> They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem)
> Index 0 is the place where the left side and right side are equal.
>
> Note: Please remember that in most languages the index of an array starts at 0.
> 
> Input
> An integer array of length 0 < arr < 1000. The numbers in the array can be any integer positive or negative.
> 
> Output
> The lowest index N where the side to the left of N is equal to the side to the right of N. If you do not find an index that fits these rules, then you will return -1.
> 
> Note
> If you are given an array with multiple answers, return the lowest correct index.

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Kamu akan diberikan sebuah array berisi bilangan bulat (integers). Tugasmu adalah menemukan sebuah **index N** di mana jumlah angka-angka di sebelah kiri N sama dengan jumlah angka-angka di sebelah kanan N.
> 
> Jika tidak ada index yang memenuhi kondisi ini, kembalikan `-1`.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu sedang menimbang barang. Index `N` adalah titik tumpunya. Kamu harus mencari titik tumpu mana (index ke berapa) yang membuat berat di sisi kiri sama dengan berat di sisi kanan. Angka di titik tumpu (index `N`) tidak ikut ditimbang. Jika tidak ada titik tumpu yang seimbang, kita nyatakan gagal dengan `-1`.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `arr` | `Array of Integers` | Kumpulan angka yang akan dicari titik seimbangnya. (Panjang 0 < arr < 1000, berisi angka positif/negatif) |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Number` | Index terendah `N` di mana jumlah sisi kiri dan kanan sama. Jika tidak ditemukan, return `-1`. |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Titik tengah array seimbang
findEvenIndex([1, 2, 3, 4, 3, 2, 1]) // → 3
// Penjelasan: Kiri dari index 3 adalah [1,2,3] (sum = 6), Kanan adalah [3,2,1] (sum = 6).

// Contoh 2 — Titik seimbang dengan angka negatif
findEvenIndex([1, 100, 50, -51, 1, 1]) // → 1
// Penjelasan: Kiri dari index 1 adalah [1] (sum = 1), Kanan adalah [50,-51,1,1] (sum = 1).

// Contoh 3 — Titik seimbang di awal (index 0)
findEvenIndex([20, 10, -80, 10, 10, 15, 35]) // → 0
// Penjelasan: Kiri index 0 adalah [] (sum = 0), Kanan adalah [10,-80,10,10,15,35] (sum = 0).

// Contoh 4 — Tidak ada titik seimbang
findEvenIndex([1, 2, 3, 4, 5, 6]) // → -1
// Penjelasan: Tidak ada index yang kiri dan kanannya sama.
```

---

## ⚠️ Catatan Khusus

- [ ] Jika sisi kiri atau kanan kosong, jumlahnya dianggap `0`.
- [ ] Angka di dalam array bisa positif atau negatif.
- [ ] Jika ada lebih dari satu jawaban (beberapa index memenuhi), kembalikan index yang paling rendah (paling awal / kiri).

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
