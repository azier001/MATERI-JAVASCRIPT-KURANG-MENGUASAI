# 📋 01 — Spesifikasi Soal

![Level](https://img.shields.io/badge/Level-8%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Referensi Eksternal

[🔗 Codewars: Grasshopper - Grade book](https://www.codewars.com/kata/55cbd4ba903825f7970000f5)

---

## 📝 Deskripsi Masalah

Buatlah sebuah fungsi yang menerima **tiga skor ujian** sebagai argumen, menghitung **rata-ratanya**, dan mereturn **nilai huruf** yang sesuai berdasarkan tabel penilaian berikut:

| Rentang Nilai Rata-rata | Nilai Huruf |
|:-----------------------:|:-----------:|
| 90 ≤ score ≤ 100 | `'A'` |
| 80 ≤ score < 90 | `'B'` |
| 70 ≤ score < 80 | `'C'` |
| 60 ≤ score < 70 | `'D'` |
| 0 ≤ score < 60 | `'F'` |

*Asumsi:* Semua nilai yang diuji berada di antara 0 dan 100. Tidak perlu menangani nilai negatif atau nilai di atas 100.

---

## 📦 Definisi Parameter

| Parameter | Tipe Data | Deskripsi Fungsional |
|-----------|-----------|----------------------|
| `s1` | `Number` | Skor ujian pertama (0–100) |
| `s2` | `Number` | Skor ujian kedua (0–100) |
| `s3` | `Number` | Skor ujian ketiga (0–100) |

---

## 🎯 Ekspektasi Return

| Tipe Data | Deskripsi |
|-----------|-----------|
| `String` | Karakter tunggal ('A', 'B', 'C', 'D', atau 'F') yang merepresentasikan grade berdasarkan rata-rata ketiga skor. |

---

## 🧪 Skenario Pengujian (Test Cases)

```javascript
// Skenario 1: Rata-rata tinggi → Grade A
getGrade(95, 90, 93) // avg = 92.67 → 'A'

// Skenario 2: Rata-rata campuran → Grade B
getGrade(70, 70, 100) // avg = 80.00 → 'B'

// Skenario 3: Rata-rata rendah → Grade F
getGrade(44, 55, 52) // avg = 50.33 → 'F'

// Skenario 4: Tepat di batas bawah → Grade D
getGrade(60, 60, 60) // avg = 60.00 → 'D'

// Skenario 5: Nilai sempurna → Grade A
getGrade(100, 100, 100) // avg = 100.00 → 'A'
```

---

## ⚠️ Analisis Batasan & Edge Cases

- [x] **Boundary Values**: Angka-angka batas seperti `60`, `70`, `80`, `90` harus diklasifikasikan ke grade yang **tepat** sesuai tabel (inklusif di batas bawah).
- [x] **Operator Precedence**: Penjumlahan `s1 + s2 + s3` wajib dibungkus dengan *grouping operator* `()` agar dikerjakan sebelum pembagian `/`.
- [x] **No Defensive Coding Needed**: Soal menjamin nilai selalu berada di 0–100, sehingga tidak perlu validasi input tambahan.

---

## ➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)
