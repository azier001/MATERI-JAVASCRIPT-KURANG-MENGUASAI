# 🏷️ Grasshopper - Grade book

```text
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║               ⚔️  GRASSHOPPER - GRADE BOOK  ⚔️                          ║
║                                                                          ║
║     Menghitung rata-rata dari tiga skor ujian dan mengonversinya         ║
║       menjadi nilai huruf berdasarkan tabel penilaian standar            ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Level](https://img.shields.io/badge/Level-8%20kyu-red?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-Fundamental-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-✅%20Selesai-success?style=for-the-badge)

---

## 📌 Informasi Tantangan

| Info | Detail |
|------|--------|
| **Platform** | [Codewars](https://www.codewars.com) |
| **Level** | 8 kyu |
| **Link Soal** | [Grasshopper - Grade book](https://www.codewars.com/kata/55cbd4ba903825f7970000f5) |
| **Tanggal** | 04 Mei 2026 |
| **Konsep Utama** | `Conditional Logic (if-else)`, `Arithmetic Operators`, `Waterfall Pattern` |

---

## 🎯 Abstraksi Tantangan

Tantangan ini menguji kemampuan menggabungkan **operasi aritmatika** (menghitung rata-rata) dengan **logika kondisional bertingkat** (mengklasifikasikan nilai ke dalam rentang huruf). Inti tantangannya terletak pada pemahaman bagaimana urutan pengecekan kondisi memengaruhi kebenaran hasil — sebuah pola klasik yang dikenal sebagai *Waterfall Logic*.

**Input:** `Number, Number, Number` (Tiga skor ujian)  
**Output:** `String` (Nilai huruf: 'A', 'B', 'C', 'D', atau 'F')

```javascript
// Demonstrasi Output
getGrade(95, 90, 93) // → 'A'
getGrade(70, 70, 100) // → 'B'
getGrade(44, 55, 52)  // → 'F'
```

---

## 📚 Struktur Dokumentasi

| File | Deskripsi Analisis |
|------|--------------------|
| [01-soal.md](docs/01-soal.md) | Dekonstruksi instruksi, parameter, tabel penilaian, dan edge case. |
| [02-pendekatanku.md](docs/02-pendekatanku.md) | Proses problem-solving, pseudocode, solusi final, dan penjelasan baris per baris. |
| [03-refleksi.md](docs/03-refleksi.md) | Bedah solusi komunitas, analisis perbandingan, dan lesson learned. |

---

*⬆️ [Kembali ke Repositori Utama](../README.md)*
