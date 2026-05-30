# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Reverse words — Codewars](https://www.codewars.com/kata/5259b20d6021e9e14c0010d4)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Lengkapi fungsi yang menerima parameter berupa string, dan balikkan (reverse) setiap kata dalam string tersebut. Semua spasi di dalam string harus dipertahankan.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu punya sebuah kalimat, dan kamu ingin membaca setiap kata secara mundur dari belakang ke depan, tapi posisi urutan kata-katanya tetap sama. Spasi antar kata juga tidak boleh berubah. Misalnya kalimat "Halo dunia" menjadi "olaH ainud".

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `str` | `String` | String kalimat yang kata-katanya ingin kita balikkan |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `String` | String baru di mana setiap kata sudah terbalik urutan hurufnya |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Kalimat biasa
reverseWords('The quick brown fox jumps over the lazy dog.') // → 'ehT kciuq nworb xof spmuj revo eht yzal .god'
// Penjelasan: Setiap kata dibalikkan hurufnya, spasi tetap 1 di antara kata.

// Contoh 2 — Satu kata saja
reverseWords('apple') // → 'elppa'
// Penjelasan: Hanya ada satu kata, jadi langsung dibalikkan hurufnya.

// Contoh 3 — Spasi ganda (Double spaces)
reverseWords('  double  spaced  words  ') // → '  elbuod  decaps  sdrow  '
// Penjelasan: Spasi ganda dan spasi di awal/akhir tetap dipertahankan.
```

---

## ⚠️ Catatan Khusus

- [x] Spasi ganda atau banyak harus dipertahankan.
- [x] Spasi di awal dan akhir string (leading & trailing spaces) juga harus tetap ada.
- [x] Urutan kata-kata di dalam kalimat tidak boleh berubah.

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
