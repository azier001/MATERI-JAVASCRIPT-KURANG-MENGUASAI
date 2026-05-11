# 🔁 V1 — If-Else Loop — Perulangan Manual

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Algorithm%20Logic-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V1-purple?style=for-the-badge)

---

## 📑 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- 💡 [Insight Penting](#insight)
- ⚖️ [Evaluasi Versi Ini](#evaluasi)

---

<a name="kode"></a>
## 💻 Kode Lengkap

Ini adalah solusi pertama yang dibangun secara bertahap — dari pengecekan batas bawah/atas sampai perulangan penjumlahan.

```js
const getSum = (a, b) => {
  let start;
  let end;

  if (a > b) {
    start = b;
    end = a;
  } else {
    start = a;
    end = b;
  }

  let sum = 0;

  for (let i = start; i <= end; i++) {
    sum += i;
  }

  return sum;
};
```

### 🎨 Visualisasi ASCII

```text
Target: getSum(-1, 2)

[Start]
  |
  V
  a = -1, b = 2
  Cek: a > b? (-1 > 2?) ❌
  → else: start = a = -1, end = b = 2
  |
  V
  sum = 0
  |
  V
  i = -1 → (i <= 2? ✅) → sum = 0 + (-1) = -1
  i =  0 → (i <= 2? ✅) → sum = -1 + 0  = -1
  i =  1 → (i <= 2? ✅) → sum = -1 + 1  =  0
  i =  2 → (i <= 2? ✅) → sum =  0 + 2  =  2
  i =  3 → (i <= 2? ❌ STOP!)
  |
  V
  return 2 ✅
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

```js
const getSum = (a, b) => {
```
🏗️ Membuat fungsi `getSum` menggunakan Arrow Function yang menerima dua parameter `a` dan `b`.

---

```js
let start;
let end;
```
📦 Mendeklarasikan dua variabel kosong yang akan menampung angka terkecil (`start`) dan terbesar (`end`).

---

```js
if (a > b) {
  start = b;
  end = a;
} else {
  start = a;
  end = b;
}
```
🔀 Blok penentuan batas. Jika `a` lebih besar dari `b`, maka `b` yang jadi titik mulai dan `a` jadi titik akhir. Sebaliknya, `a` yang jadi titik mulai. Ini memastikan `start` selalu berisi angka terkecil dan `end` selalu berisi angka terbesar.

---

```js
let sum = 0;
```
📦 Membuat variabel penampung hasil penjumlahan, dimulai dari nol.

---

```js
for (let i = start; i <= end; i++) {
  sum += i;
}
```
🔁 Perulangan yang berjalan dari `start` sampai `end` (inklusif berkat `<=`). Setiap angka `i` ditambahkan ke `sum`.

---

```js
return sum;
```
📤 Mengembalikan total penjumlahan sebagai output fungsi.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Kenapa pakai `<=` dan bukan `<`?

Karena kita ingin angka terakhir (`end`) ikut dijumlahkan. Kalau pakai `<`, angka terakhir akan terlewat.

> 💡 **Analogi:** "Kalau disuruh hitung orang di ruangan dari nomor 1 sampai 5, kamu harus hitung yang nomor 5 juga — bukan berhenti di nomor 4!"

### Kenapa harus cek `a > b` terlebih dahulu?

Karena `for` loop hanya bisa berjalan maju (dari kecil ke besar). Jika `start` lebih besar dari `end`, loop tidak akan berjalan sama sekali dan hasilnya `0` — yang jelas salah.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi: getSum(5, 2)

  a = 5, b = 2
  Cek: a > b? (5 > 2?) ✅ → start = 2, end = 5

  sum = 0

  Iterasi 1: i = 2
    sum = 0 + 2 = 2
    State: sum = 2

  Iterasi 2: i = 3
    sum = 2 + 3 = 5
    State: sum = 5

  Iterasi 3: i = 4
    sum = 5 + 4 = 9
    State: sum = 9

  Iterasi 4: i = 5
    sum = 9 + 5 = 14
    State: sum = 14

  i = 6 → (6 <= 5?) ❌ STOP

  Output: 14
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Kenapa solusi ini disebut "jujur"?**
> Karena kodenya melakukan persis apa yang diminta soal: berjalan dari angka terkecil ke terbesar, menjumlahkan satu per satu. Tidak ada trik matematika — murni brute force yang mudah dipahami.

> **Apa kelemahan utama pendekatan ini?**
> Jika jarak antara `a` dan `b` sangat besar (misal 1 dan 1.000.000.000), komputer harus melakukan 1 miliar iterasi. Ini memakan waktu dan sumber daya yang besar. Kompleksitas waktunya adalah **O(n)** — semakin besar rentang, semakin lama.

---

<a name="evaluasi"></a>
## ⚖️ Evaluasi Versi Ini

| Kelebihan | Kekurangan |
|-----------|------------|
| Mudah dipahami dan dibaca | Lambat untuk rentang angka yang sangat besar |
| Logika sangat eksplisit (step-by-step) | Blok `if-else` cukup panjang (8 baris) |
| Aman untuk semua edge case | Kompleksitas waktu O(n) |

> 💡 **Cocok digunakan ketika** kamu baru belajar dan ingin memahami alur logika penjumlahan deret secara mendasar, atau ketika rentang angkanya kecil.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02 — Problem Solving Approach](./02-problem-solving-approach.md)**
- **📖 [Lanjut ke Part 04 — V2 Math Min Max →](./04-version-v2-math-min-max.md)**
