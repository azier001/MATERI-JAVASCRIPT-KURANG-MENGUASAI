# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Printer Errors — Codewars](https://www.codewars.com/kata/56541980fa08ab47a0000040)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> In a factory a printer prints labels for boxes. For one kind of boxes the printer has to use colors which, for the sake of simplicity, are named with letters from `a` to `m`.
>
> The colors used by the printer are recorded in a control string. For example a "good" control string would be `aaabbbbhaijjjm` meaning that the printer used three times color a, four times color b, one time color h then one time color a...
>
> Sometimes there are problems: lack of colors, technical malfunction and a "bad" control string is produced e.g. `aaaxbbbbyyhwawiwjjjwwm` with letters not from `a` to `m`.
>
> You have to write a function `printer_error` which given a string will return the error rate of the printer as a string representing a rational whose numerator is the number of errors and the denominator the length of the control string. Don't reduce this fraction to a simpler expression.
>
> The string has a length greater or equal to one and contains only letters from `a` to `z`.

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Kamu diminta untuk membuat fungsi `printerError` yang menerima sebuah string berisi huruf dari `a` sampai `z`. Huruf `a` sampai `m` dianggap **valid** (warna yang benar), sedangkan huruf `n` sampai `z` dianggap sebagai **error**. Fungsi harus mengembalikan *error rate* dalam format string pecahan `"jumlah_error/total_huruf"`. Jangan sederhanakan pecahannya.

### 🗣️ Penjelasan Sederhana

Bayangkan sebuah printer di pabrik mengeprint label warna untuk kotak-kotak produk. Warna yang benar itu dikodekan pakai huruf `a` sampai `m` (total 13 warna). Kalau printernya rusak atau tintanya habis, dia bisa mengeprint huruf lain dari `n` sampai `z` — huruf-huruf ini dianggap "salah cetak".

Tugas kita: **hitung ada berapa huruf yang salah**, lalu laporkan rasio kesalahannya berbanding dengan total semua huruf yang diprint.

Contohnya: "Ada 8 huruf salah dari total 22 huruf" → jawabannya `"8/22"`.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `s` | `String` | Control string dari printer (berisi huruf `a-z`, panjang ≥ 1) |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `String` | Rasio error dalam format pecahan `"jumlah_error/panjang_string"` (jangan disederhanakan) |

---

## 🎨 Visualisasi Alur

```
[Input] → printerError("aaaxbbbbyyhwawiwjjjwwm")

Langkah 1: Identifikasi huruf valid vs error
  Valid (a-m):  a, a, a, b, b, b, b, h, a, i, j, j, j, m  → 14 huruf
  Error (n-z):  x, y, y, w, w, w, w, w, w, w, w            → 8 huruf
                                                    Tunggu — mari kita trace lebih teliti ↓

Langkah 2: Trace karakter satu per satu
  a → ✅  |  a → ✅  |  a → ✅  |  x → ❌  |  b → ✅
  b → ✅  |  b → ✅  |  b → ✅  |  y → ❌  |  y → ❌
  h → ✅  |  w → ❌  |  a → ✅  |  w → ❌  |  i → ✅
  w → ❌  |  j → ✅  |  j → ✅  |  j → ✅  |  w → ❌
  w → ❌  |  m → ✅

  Total ❌ = 8
  Total karakter = 22

Langkah 3: Format hasil
  → "8/22"

[Output] → "8/22"
```

---

## 🧪 Contoh

```javascript
// Contoh 1 — Semua huruf valid (zero errors)
printerError("aaabbbbhaijjjm") // → "0/14"
// Penjelasan: Semua 14 huruf ada di rentang a-m. Tidak ada error.

// Contoh 2 — Ada huruf error
printerError("aaaxbbbbyyhwawiwjjjwwm") // → "8/22"
// Penjelasan: Dari 22 karakter, ada 8 huruf di luar a-m (x, y, y, w, w, w, w, w)

// Contoh 3 — Semua huruf error
printerError("nnnn") // → "4/4"
// Penjelasan: Semua 4 huruf adalah n (di luar a-m). Error 100%.

// Contoh 4 — String satu huruf (edge case)
printerError("a") // → "0/1"
// Penjelasan: Hanya 1 karakter dan itu valid. Tidak ada error.
```

---

## 🔢 Referensi Klasifikasi Huruf

> Tabel ini membantu memahami mana huruf yang valid dan mana yang error.

| Kategori | Huruf | Jumlah | Status |
|:--------:|:-----:|:------:|:------:|
| **Valid** | `a b c d e f g h i j k l m` | 13 huruf | ✅ Benar |
| **Error** | `n o p q r s t u v w x y z` | 13 huruf | ❌ Salah |

---

## ⚠️ Catatan Khusus

- [x] Hanya huruf kecil `a` sampai `z` yang akan diuji (tidak ada angka, spasi, atau simbol).
- [x] Panjang string **minimal 1 karakter** — tidak perlu handle string kosong.
- [x] Pecahan yang direturn **tidak boleh disederhanakan** (contoh: jangan ubah `"8/22"` menjadi `"4/11"`).
- [x] Batas valid/error adalah huruf `m` — huruf `m` masih termasuk **valid**.

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
