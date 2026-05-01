# 📋 01 — Spesifikasi Soal

![Level](https://img.shields.io/badge/Level-8%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Referensi Eksternal

[🔗 Codewars: Are You Playing Banjo?](https://www.codewars.com/kata/53af2b8861023f1d88000832)

---

## 📝 Deskripsi Masalah

Buatlah sebuah fungsi yang dapat menjawab pertanyaan "Are you playing banjo?".
Aturannya sederhana: Jika nama Anda dimulai dengan huruf **"R"** (kapital) atau **"r"** (huruf kecil), Anda diklasifikasikan sebagai pemain banjo!

Fungsi ini menerima sebuah nama sebagai satu-satunya argumen, dan wajib mereturn salah satu dari pola string berikut:
- `{name} plays banjo`
- `{name} does not play banjo`

*Asumsi:* Nama yang diberikan dijamin selalu berupa string yang valid.

---

## 📦 Definisi Parameter

| Parameter | Tipe Data | Deskripsi Fungsional |
|-----------|-----------|----------------------|
| `name` | `String` | Input teks yang mewakili nama entitas untuk dievaluasi huruf pertamanya. |

---

## 🎯 Ekspektasi Return

| Tipe Data | Deskripsi |
|-----------|-----------|
| `String` | String hasil interpolasi yang menggabungkan nama input dengan status kondisionalnya. |

---

## 🧪 Skenario Pengujian (Test Cases)

```javascript
// Skenario 1: Evaluasi karakter kapital yang cocok
areYouPlayingBanjo("Ringo") // → "Ringo plays banjo"

// Skenario 2: Evaluasi karakter yang tidak cocok
areYouPlayingBanjo("bravo") // → "bravo does not play banjo"

// Skenario 3: Edge case - Whitespace di awal string
areYouPlayingBanjo("  Ricky") // → "  Ricky plays banjo"
```

---

## ⚠️ Analisis Batasan & Edge Cases

- [x] **Case-Insensitive Constraint**: Algoritma harus tidak sensitif terhadap kapitalisasi pada karakter index `0` (R == r).
- [x] **String Formatting Strictness**: Spasi dan sintaks string balasan harus presisi, perbedaan satu spasi akan membuat *test case* gagal.
- [x] **Whitespace Defensive Programming**: Walaupun input diasumsikan valid, praktik terbaik menyarankan penambahan proteksi (seperti `.trim()`) untuk memitigasi kemungkinan *trailing* atau *leading whitespaces*.

---

## ➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)
