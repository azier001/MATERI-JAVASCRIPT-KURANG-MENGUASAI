# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

Soal ini meminta kita **menjumlahkan dua angka** lalu mengembalikan hasilnya dalam bentuk **string biner**.

Dua langkah logika langsung terlintas:

1. **Penjumlahan** — jumlahkan `a + b` seperti biasa (aritmatika desimal)
2. **Konversi Basis** — ubah hasil penjumlahan dari desimal (basis 10) ke biner (basis 2)

Hal pertama yang terpikirkan adalah: apakah JavaScript punya cara bawaan untuk mengonversi angka ke biner? Jawabannya: **ada**, yaitu `.toString(radix)`.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```text
1. Terima dua parameter: a dan b
2. Jumlahkan a + b → simpan di variabel sum
3. Panggil sum.toString(2) untuk mengonversi ke biner
4. Kembalikan (return) hasilnya
```

---

## 🎨 Visualisasi Alur

```
[Input] → addBinary(5, 9)

Langkah 1: Penjumlahan
  a = 5, b = 9
  sum = 5 + 9 = 14

Langkah 2: Konversi ke Biner
  14 dalam biner?

  14 ÷ 2 = 7  sisa 0  ← bit paling kanan
   7 ÷ 2 = 3  sisa 1
   3 ÷ 2 = 1  sisa 1
   1 ÷ 2 = 0  sisa 1  ← bit paling kiri

  Baca sisa dari bawah ke atas: 1 1 1 0

Langkah 3: Return sebagai string
  → "1110"

[Output] → "1110"
```

---

## 🔄 Percobaan Pertama — Deklaratif (function declaration)

Pendekatan paling mendasar: jumlahkan dulu, lalu konversi dengan `.toString(2)`.

```javascript
function addBinary(a, b) {
  // 1. Jumlahkan kedua angka
  let sum = a + b;

  // 2. Konversi angka desimal ke biner (basis 2)
  return sum.toString(2);
}
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Sangat eksplisit, mudah dipahami pemula |
| Keringkasan | ⭐⭐⭐⭐ Cukup ringkas (2 baris body) |
| Pendekatan | Imperatif — menyimpan di variabel dulu, baru konversi |

> 💡 **Catatan**: `.toString(radix)` adalah method bawaan `Number` di JavaScript. Argumen `radix` menentukan basis bilangan tujuan (2 = biner, 8 = oktal, 16 = heksadesimal). Jika tidak diberi argumen, defaultnya adalah basis 10 (desimal).

---

## ✅ Solusi Final — One-liner dengan Arrow Function

Karena body fungsi hanya satu ekspresi, kita bisa menyederhanakannya menjadi *one-liner* menggunakan Arrow Function dengan implicit return.

```javascript
const addBinary = (a, b) => (a + b).toString(2);
```

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐ Sangat ringkas, butuh paham arrow function & chaining |
| Keringkasan | ⭐⭐⭐⭐⭐ Minimal dan elegan |
| Pendekatan | Deklaratif + Functional |

> 💡 **Kenapa pakai tanda kurung `(a + b)`?**
> Tanpa tanda kurung, `a + b.toString(2)` akan mengeksekusi `.toString(2)` pada `b` **terlebih dahulu** (karena operator `.` punya prioritas lebih tinggi dari `+`). Tanda kurung memastikan penjumlahan dilakukan **duluan**, baru hasilnya dikonversi.

---

## 🔍 Penjelasan Baris per Baris (Solusi Final)

```javascript
const addBinary = (a, b) => (a + b).toString(2);
//    ^^^^^^^^^^   ^^^^     ^^^^^^^ ^^^^^^^^^^^^
//    nama fungsi  param    jumlah  konversi ke
//                 input    a + b   string biner
//                          
//                          tanda kurung penting!
//                          memastikan penjumlahan
//                          dilakukan sebelum .toString()
```

---

## 📈 Evolusi Solusi

```
V1 (Function Declaration)           V2 / Final (Arrow One-liner)
────────────────────────             ────────────────────────
function addBinary(a, b) {           const addBinary = (a, b) =>
  let sum = a + b;              →     (a + b).toString(2);
  return sum.toString(2);
}
(4 baris)                            (1 baris)
```

Dari V1 ke V2, kita menghilangkan:
- Variabel bantuan `sum` (langsung chain penjumlahan)
- Keyword `function`, `return`, dan kurung kurawal `{}`

---

## 🧪 Verifikasi Manual

| Input `a` | Input `b` | `a + b` | `.toString(2)` | Expected | Status |
|:---------:|:---------:|:-------:|:--------------:|:--------:|:------:|
| 1 | 1 | 2 | `"10"` | `"10"` | ✅ |
| 5 | 9 | 14 | `"1110"` | `"1110"` | ✅ |
| 0 | 0 | 0 | `"0"` | `"0"` | ✅ |

```javascript
console.log(addBinary(1, 1)); // → "10" ✅
console.log(addBinary(5, 9)); // → "1110" ✅
console.log(addBinary(0, 0)); // → "0" ✅
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
