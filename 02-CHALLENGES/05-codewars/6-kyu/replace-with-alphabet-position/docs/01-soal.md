# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Replace With Alphabet Position — Codewars](https://www.codewars.com/kata/546f922b54af40e1e90001da)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Welcome.
> 
> In this kata you are required to, given a string, replace every letter with its position in the alphabet.
> 
> If anything in the text isn't a letter, ignore it and don't return it.
> 
> "a" = 1, "b" = 2, etc.
> 
> Example
> Input = "The sunset sets at twelve o' clock."
> Output = "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Diberikan sebuah string, ubah setiap huruf di dalamnya menjadi angka yang merepresentasikan posisinya di alfabet. Jika ada karakter yang bukan huruf (spasi, tanda baca, angka, simbol), abaikan saja dan jangan sertakan dalam hasil. Hasil akhirnya berupa string angka yang dipisahkan oleh spasi.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu sedang membuat **sandi angka** (cipher sederhana). Kamu punya tabel: A=1, B=2, C=3, ..., Z=26. Tugasmu adalah menerjemahkan setiap huruf dalam kalimat menjadi angkanya berdasarkan tabel tersebut. Karakter selain huruf (seperti spasi, titik, koma, apostrof) dibuang saja karena tidak punya pasangan angka di tabel sandi.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `text` | `string` | Teks atau kalimat yang ingin diubah menjadi angka posisi alfabet. Bisa mengandung huruf besar, huruf kecil, spasi, angka, dan simbol. |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `string` | Sebuah string berisi deretan angka (dipisahkan oleh spasi), mewakili posisi alfabet dari setiap huruf pada input. Huruf besar dan kecil bernilai sama (A=a=1). |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Kalimat dengan tanda baca dan apostrof
alphabetPosition("The sunset sets at twelve o' clock.")
// → "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"
// Penjelasan:
// T=20, h=8, e=5, s=19, u=21, n=14, s=19, e=5, t=20, ...
// Spasi, apostrof ('), dan titik (.) diabaikan.

// Contoh 2 — Kalimat biasa
alphabetPosition("The narwhal bacons at midnight.")
// → "20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20"
// Penjelasan: Setiap huruf dikonversi, titik di akhir diabaikan.

// Contoh 3 — Edge case: string tanpa huruf
alphabetPosition("!@#$%^&*()") // → ""
// Penjelasan: Tidak ada huruf alfabet, jadi hasilnya string kosong.
```

---

## ⚠️ Catatan Khusus

- [x] Huruf besar dan kecil bernilai sama — `'A'` dan `'a'` sama-sama bernilai `1`
- [x] Karakter non-huruf (angka, spasi, tanda baca, simbol) **tidak dimasukkan** ke hasil akhir
- [x] Hasil akhir berupa `string`, bukan array — setiap angka dipisahkan oleh satu spasi
- [x] Jika tidak ada huruf sama sekali, hasilnya string kosong `""`

---

## 💡 Konsep Kunci

**1. ASCII Code**: Setiap karakter punya kode numerik. Huruf kecil `'a'` = 97, `'b'` = 98, ..., `'z'` = 122. Dengan mengurangi 96, kita dapat posisi alfabet (1–26).

**2. Case Insensitive**: Huruf besar dan kecil harus menghasilkan angka yang sama. Solusinya: konversi ke lowercase dulu sebelum diproses.

**3. Filtering Karakter**: Hanya huruf alfabet yang relevan. Bisa dicapai dengan pengecekan range manual (`>= 'a' && <= 'z'`) atau Regex (`/[a-z]/g`).

---

## 🔍 Strategi Pendekatan (Hints)

Beberapa cara yang bisa dipertimbangkan:
- Loop manual + cek range karakter + `charCodeAt()`
- Regex `match()` untuk extract huruf + `map()` untuk konversi
- `split()` + `filter()` + `map()` sebagai alternatif pipeline
- Menggunakan string alfabet sebagai lookup (`indexOf`)

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
