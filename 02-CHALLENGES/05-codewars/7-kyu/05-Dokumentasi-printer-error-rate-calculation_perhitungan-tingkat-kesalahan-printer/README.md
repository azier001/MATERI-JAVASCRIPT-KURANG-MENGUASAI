# 🏷️ Printer Errors

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║                    ⚔️  Printer Errors  ⚔️                              ║
║                                                                          ║
║     Menghitung tingkat kesalahan (error rate) printer dari control       ║
║     string warna — kembalikan rasio huruf error terhadap total huruf    ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Level](https://img.shields.io/badge/Level-7%20kyu-red?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-✅%20Selesai-success?style=for-the-badge)

---

## 📌 Info Challenge

| Info | Detail |
|------|--------|
| **Platform** | [Codewars](https://www.codewars.com) |
| **Level** | 7 kyu |
| **Link Soal** | [Printer Errors](https://www.codewars.com/kata/56541980fa08ab47a0000040) |
| **Tanggal** | 14 May 2026 |
| **Konsep** | `String`, `Regex`, `.match()`, `.replace()`, `Template Literals` |

---

## 🎯 Ringkasan Soal

> *Diberikan sebuah control string berisi huruf `a-z`, hitung berapa banyak huruf yang **bukan** `a-m` (dianggap error), lalu kembalikan rasio error dalam format string pecahan `"jumlah_error/total_panjang"`. Jangan sederhanakan pecahan.*

**Input:** `String` (huruf a-z, panjang ≥ 1)  
**Output:** `String` (format pecahan `"error/panjang"`)

```javascript
// Contoh
printerError("aaabbbbhaijjjm")        // → "0/14"  (semua huruf valid a-m)
printerError("aaaxbbbbyyhwawiwjjjwwm") // → "8/22"  (ada 8 huruf error n-z)
```

---

## 📚 Dokumentasi Lengkap

| File | Isi |
|------|-----|
| [01-soal.md](docs/01-soal.md) | Deskripsi soal asli, parameter, contoh & edge case |
| [02-pendekatanku.md](docs/02-pendekatanku.md) | Proses berpikir, evolusi kode & penjelasan baris per baris |
| [03-refleksi.md](docs/03-refleksi.md) | Best practice komunitas, teknik `.replace()` & lesson learned |

---

*⬆️ [Kembali ke Level 7 kyu](../README.md)*  
*⬆️ [Kembali ke Index Codewars](../../README.md)*

---

> 📅 Dibuat: 14 May 2026 · 👤 azier001
