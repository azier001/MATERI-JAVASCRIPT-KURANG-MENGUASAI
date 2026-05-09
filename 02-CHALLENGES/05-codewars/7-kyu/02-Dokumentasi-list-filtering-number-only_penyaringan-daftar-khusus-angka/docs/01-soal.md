# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 List Filtering — Codewars](https://www.codewars.com/kata/53dbd5315a3c69571d00064a)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> *In this kata you will create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.*

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Buatlah sebuah fungsi yang menerima sebuah array (daftar) berisi campuran **angka bulat non-negatif** (0 ke atas) dan **string** (teks). Fungsi ini harus mengembalikan **array baru** yang isinya **hanya angka saja** — semua string dibuang.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu punya keranjang berisi buah-buahan (angka) dan mainan (string) yang tercampur. Tugasmu adalah memindahkan **hanya buah-buahan** ke keranjang baru. Mainan diabaikan.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `l` | `Array` | Sebuah array (daftar) yang isinya campuran antara angka bulat non-negatif (`0, 1, 2, ...`) dan string (`'a'`, `'hello'`, `'123'`, dll.) |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `Array` | Array baru yang **hanya berisi angka** — semua elemen bertipe string sudah dibuang, dan urutan angka tetap sama seperti posisi aslinya di array input |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Angka dan huruf biasa
filter_list([1, 2, 'a', 'b']) // → [1, 2]
// Penjelasan: 'a' dan 'b' adalah string, jadi dibuang. Sisa 1 dan 2.

// Contoh 2 — Angka 0 tetap disimpan
filter_list([1, 'a', 'b', 0, 15]) // → [1, 0, 15]
// Penjelasan: 0 adalah angka (non-negative integer), jadi tetap masuk.

// Contoh 3 — String yang MIRIP angka tetap dibuang
filter_list([1, 2, 'aasf', '1', '123', 123]) // → [1, 2, 123]
// Penjelasan: '1' dan '123' ditulis dalam tanda kutip = string, bukan angka!
//             Hanya 123 (tanpa kutip) yang benar-benar bertipe number.
```

---

## ⚠️ Catatan Khusus

- [x] Input **hanya berisi dua tipe data**: angka bulat non-negatif (`number`) dan teks (`string`)
- [x] **String yang isinya angka** (misal `'123'`) tetap dianggap **string** dan harus **dibuang** — jangan tertipu!
- [x] Angka **`0`** adalah angka non-negatif yang valid dan harus **tetap disimpan** (jangan dianggap `false`)
- [x] **Urutan elemen** yang tersisa harus **tetap sama** seperti posisi aslinya di array input
- [x] Fungsi harus mengembalikan **array baru** — bukan mengubah array aslinya

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
