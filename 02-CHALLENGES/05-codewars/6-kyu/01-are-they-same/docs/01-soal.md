# 📋 01 — Soal Asli

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Link](https://img.shields.io/badge/Codewars-Lihat%20Soal-red?logo=codewars)

---

## 🔗 Link Soal

[🔗 Are they the "same"? — Codewars](https://www.codewars.com/kata/550498447451fbbd7600041c)

---

## 📝 Deskripsi Soal (Bahasa Inggris — Asli)

> Given two arrays `a` and `b` write a function `comp(a, b)` that checks whether the two arrays have the "same" elements, with the same multiplicities (the multiplicity of a member is the number of times it appears). "Same" means, here, that the elements in `b` are the elements in `a` squared, regardless of the order.

## 📝 Deskripsi Soal (Bahasa Indonesia — Terjemahan)

> Diberikan dua array `a` dan `b`, buat fungsi `comp(a, b)` yang memeriksa apakah kedua array memiliki elemen yang "sama" dengan multiplisitas yang sama (multiplisitas adalah jumlah kemunculan suatu elemen). "Sama" di sini berarti elemen-elemen di `b` adalah elemen-elemen di `a` yang dikuadratkan, tanpa memperhatikan urutan.

### 🗣️ Penjelasan Sederhana

Bayangkan kamu punya dua keranjang angka. Keranjang pertama berisi angka-angka original, keranjang kedua harus berisi kuadrat dari angka-angka tersebut. Tugasmu adalah memastikan bahwa setiap angka di keranjang pertama memiliki pasangan kuadratnya di keranjang kedua, dan jumlah kemunculannya sama persis.

---

## 📦 Parameter

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `a` | `Array<number>` / `null` | Array pertama (original numbers) |
| `b` | `Array<number>` / `null` | Array kedua (squared numbers) |

---

## 🎯 Return

| Tipe | Deskripsi |
|------|-----------|
| `boolean` | `true` jika semua elemen di `b` adalah kuadrat dari elemen di `a` dengan multiplisitas sama; `false` jika tidak atau salah satu/kedua array `null` |

---

## 🧪 Contoh

```javascript
// Contoh 1 — Valid (return true)
a = [121, 144, 19, 161, 19, 144, 19, 11]
b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]
comp(a, b) // → true
// Penjelasan:
// 11² = 121 ✓
// 121² = 14641 ✓
// 144² = 20736 ✓ (muncul 2x di a, muncul 2x di b)
// 19² = 361 ✓ (muncul 3x di a, muncul 3x di b)
// 161² = 25921 ✓

// Contoh 2 — Invalid: elemen tidak match (return false)
a = [121, 144, 19, 161, 19, 144, 19, 11]
b = [132, 14641, 20736, 361, 25921, 361, 20736, 361]
comp(a, b) // → false
// 132 bukan kuadrat dari elemen manapun di a

// Contoh 3 — Array kosong (return true)
comp([], []) // → true

// Contoh 4 — Null handling (return false)
comp(null, [1, 4, 9]) // → false
comp([1, 2, 3], null) // → false
```

---

## ⚠️ Catatan Khusus

- [x] Urutan elemen tidak penting — `[1, 2, 3]` dan `[3, 2, 1]` dianggap sama
- [x] Multiplisitas harus sama persis — jika angka 19 muncul 3x di `a`, maka 361 harus muncul 3x di `b`
- [x] Handle edge cases: array kosong, `null`, `undefined`, panjang berbeda
- [x] Array bisa berisi integer positif dan negatif

---

## 💡 Konsep Kunci

**1. Multiplisitas**: Jumlah kemunculan suatu elemen dalam array. Multiplisitas harus sama persis di kedua array.

**2. Urutan Tidak Penting**: Array `[1, 2, 3]` dan `[3, 2, 1]` dianggap "sama" dalam konteks ini.

**3. Operasi Kuadrat**: Setiap elemen `x` di array `a` harus memiliki pasangan `x²` di array `b`.

---

## 🔍 Strategi Pendekatan (Hints)

Beberapa cara yang bisa dipertimbangkan:
- Sorting kedua array setelah transformasi
- Counting/frequency mapping
- Transformasi array kemudian perbandingan
- Validasi edge cases terlebih dahulu

---

*➡️ Lanjut ke [02-pendekatanku.md](02-pendekatanku.md)*
