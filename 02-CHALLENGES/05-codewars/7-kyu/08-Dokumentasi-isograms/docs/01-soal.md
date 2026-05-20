# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Isograms — Codewars](#)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Isogram adalah kata yang tidak memiliki huruf yang berulang, baik bersebelahan maupun tidak. Buatlah fungsi yang mengecek apakah sebuah string yang hanya berisi huruf adalah sebuah isogram. Asumsikan string kosong adalah isogram. Abaikan besar kecilnya huruf (case-insensitive).

### 🗣️ Penjelasan Sederhana

Bayangkan kamu sedang memeriksa daftar huruf dalam sebuah kata. Jika ada huruf yang muncul lebih dari satu kali (misalnya ada dua huruf 'a' atau 'A' dan 'a'), maka itu bukan isogram. Kata seperti "kucing" adalah isogram karena tidak ada huruf berulang, sedangkan "kuku" bukan isogram.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `str` | `String` | Kata atau kalimat yang akan diperiksa apakah merupakan isogram atau bukan. |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Boolean` | Mengembalikan `true` jika string adalah isogram, dan `false` jika bukan. |

---

## 🧪 Contoh

```javascript
// Contoh 1 — String tanpa huruf berulang
isIsogram("Dermatoglyphics") // → true
// Penjelasan: Tidak ada huruf yang diulang dalam kata "Dermatoglyphics".

// Contoh 2 — String dengan huruf berulang
isIsogram("aba") // → false
// Penjelasan: Huruf 'a' muncul dua kali.

// Contoh 3 — Edge case mengabaikan besar kecil huruf
isIsogram("moOse") // → false
// Penjelasan: Terdapat huruf 'o' dan 'O' yang dianggap huruf yang sama karena case-insensitive.
```

---

## ⚠️ Catatan Khusus

- [ ] Fungsi harus mengabaikan perbedaan huruf besar dan huruf kecil (case-insensitive).
- [ ] String kosong `""` dianggap sebagai isogram dan harus mengembalikan `true`.
- [ ] String hanya berisi karakter huruf (tidak ada spasi atau angka).

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
