# 🧪 Part 08 — Test Cases

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 🧪 Test Cases | 🔍 Penjelasan | 📊 Hasil Semua Versi | 💡 Catatan |
|:-------------:|:-------------:|:--------------------:|:----------:|
| [Jump](#-test-cases-lengkap) | [Jump](#-penjelasan-setiap-test-case) | [Jump](#-hasil-semua-versi) | [Jump](#-catatan-penting) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami kenapa setiap test case dipilih
- ✅ Memahami hasil dari setiap versi solusi
- ✅ Memahami kenapa beberapa test case perlu diperbaiki
- ✅ Bisa menulis test cases sendiri untuk problem serupa

---

## 🧪 Test Cases Lengkap

```javascript
const testCases = [
  // Basic cases
  { input: [[2, 7, 11, 15], 9],         expected: [0, 1], desc: '2 + 7 = 9' },
  { input: [[3, 2, 4], 6],              expected: [1, 2], desc: '2 + 4 = 6' },
  { input: [[3, 3], 6],                 expected: [0, 1], desc: '3 + 3 = 6' },

  // Different positions
  { input: [[1, 8, 3, 7], 9],           expected: [0, 1], desc: '1 + 8 = 9 (awal & kedua)' },
  { input: [[10, 3, 7, 40], 17],        expected: [0, 2], desc: '10 + 7 = 17' },

  // Negative numbers
  { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], desc: '-3 + -5 = -8' },
  { input: [[-10, 20, 10, -20], 0],     expected: [0, 2], desc: '-10 + 10 = 0' },

  // Larger numbers
  { input: [[100, 200, 300, 400], 700], expected: [2, 3], desc: '300 + 400 = 700' },

  // Edge cases
  { input: [[0, 4, 3, 0], 0],           expected: [0, 3], desc: '0 + 0 = 0' },
  { input: [[1, 2], 3],                 expected: [0, 1], desc: 'array minimal' },
]
```

---

## 🔍 Penjelasan Setiap Test Case

### Basic Cases (#1 - #3)
Test case dari soal resmi — wajib lulus untuk semua versi.

| # | Array | Target | Expected | Kenapa |
|---|-------|--------|----------|--------|
| 1 | `[2, 7, 11, 15]` | `9` | `[0, 1]` | Pasangan di posisi awal |
| 2 | `[3, 2, 4]` | `6` | `[1, 2]` | Pasangan bukan di posisi awal |
| 3 | `[3, 3]` | `6` | `[0, 1]` | Dua angka identik — uji kasus duplikat |

---

### Different Positions (#4 - #5)
Menguji apakah solusi bisa menemukan pasangan di berbagai posisi.

| # | Array | Target | Expected | Kenapa |
|---|-------|--------|----------|--------|
| 4 | `[1, 8, 3, 7]` | `9` | `[0, 1]` | Pasangan di dua posisi pertama |
| 5 | `[10, 3, 7, 40]` | `17` | `[0, 2]` | Pasangan dengan jarak index |

> 💡 **Catatan:** Test case #4 dan #5 ini adalah **pengganti** dari test case awal yang bermasalah. Test case awal `[1, 5, 3, 7]` target `8` dan `[10, 20, 10, 40]` target `30` masing-masing punya **dua pasangan valid** — melanggar constraint soal yang menjamin hanya satu pasangan. Setelah dicek ulang, keduanya diganti dengan array yang hanya punya satu pasangan valid.

---

### Negative Numbers (#6 - #7)
Menguji apakah solusi bisa menangani angka negatif.

| # | Array | Target | Expected | Kenapa |
|---|-------|--------|----------|--------|
| 6 | `[-1, -2, -3, -4, -5]` | `-8` | `[2, 4]` | Dua angka negatif dijumlahkan |
| 7 | `[-10, 20, 10, -20]` | `0` | `[0, 2]` | Negatif + positif = 0 |

---

### Larger Numbers (#8)
Menguji apakah solusi bisa menangani angka besar.

| # | Array | Target | Expected | Kenapa |
|---|-------|--------|----------|--------|
| 8 | `[100, 200, 300, 400]` | `700` | `[2, 3]` | Pasangan di posisi akhir |

---

### Edge Cases (#9 - #10)
Menguji kondisi batas yang sering terlewat.

| # | Array | Target | Expected | Kenapa |
|---|-------|--------|----------|--------|
| 9 | `[0, 4, 3, 0]` | `0` | `[0, 3]` | Dua angka nol — uji kasus nol |
| 10 | `[1, 2]` | `3` | `[0, 1]` | Array minimal dua elemen |

---

## 📊 Hasil Semua Versi

```
========== Versi 1 - Nested Loop ==========
Test #1:  ✅ PASS - 2 + 7 = 9
Test #2:  ✅ PASS - 2 + 4 = 6
Test #3:  ✅ PASS - 3 + 3 = 6
Test #4:  ✅ PASS - 1 + 8 = 9 (awal & kedua)
Test #5:  ✅ PASS - 10 + 7 = 17
Test #6:  ✅ PASS - -3 + -5 = -8
Test #7:  ✅ PASS - -10 + 10 = 0
Test #8:  ✅ PASS - 300 + 400 = 700
Test #9:  ✅ PASS - 0 + 0 = 0
Test #10: ✅ PASS - array minimal

========== Versi 2 - HashMap (sendiri) ==========
Test #1:  ✅ PASS - 2 + 7 = 9
Test #2:  ✅ PASS - 2 + 4 = 6
Test #3:  ✅ PASS - 3 + 3 = 6
Test #4:  ✅ PASS - 1 + 8 = 9 (awal & kedua)
Test #5:  ✅ PASS - 10 + 7 = 17
Test #6:  ✅ PASS - -3 + -5 = -8
Test #7:  ✅ PASS - -10 + 10 = 0
Test #8:  ✅ PASS - 300 + 400 = 700
Test #9:  ✅ PASS - 0 + 0 = 0
Test #10: ✅ PASS - array minimal

========== Versi 3 - HashMap (AI) ==========
Test #1:  ✅ PASS - 2 + 7 = 9
Test #2:  ✅ PASS - 2 + 4 = 6
Test #3:  ✅ PASS - 3 + 3 = 6
Test #4:  ✅ PASS - 1 + 8 = 9 (awal & kedua)
Test #5:  ✅ PASS - 10 + 7 = 17
Test #6:  ✅ PASS - -3 + -5 = -8
Test #7:  ✅ PASS - -10 + 10 = 0
Test #8:  ✅ PASS - 300 + 400 = 700
Test #9:  ✅ PASS - 0 + 0 = 0
Test #10: ✅ PASS - array minimal

========== Versi 4 - Set ==========
Test #1:  ✅ PASS - 2 + 7 = 9
Test #2:  ✅ PASS - 2 + 4 = 6
Test #3:  ✅ PASS - 3 + 3 = 6
Test #4:  ✅ PASS - 1 + 8 = 9 (awal & kedua)
Test #5:  ✅ PASS - 10 + 7 = 17
Test #6:  ✅ PASS - -3 + -5 = -8
Test #7:  ✅ PASS - -10 + 10 = 0
Test #8:  ✅ PASS - 300 + 400 = 700
Test #9:  ✅ PASS - 0 + 0 = 0
Test #10: ✅ PASS - array minimal
```

Semua 4 versi lulus **10/10 test case**! ✅

---

## 💡 Catatan Penting

> **Kenapa test case #4 dan #5 diganti?**
> Test case awal `[1, 5, 3, 7]` target `8` punya dua pasangan valid: `1+7=[0,3]` dan `5+3=[1,2]`. Test case `[10, 20, 10, 40]` target `30` juga punya dua pasangan: `10+20=[0,1]` dan `20+10=[1,2]`. Ini melanggar constraint soal yang menjamin hanya ada **satu pasangan valid**. Akibatnya Versi 2, 3, dan 4 memberikan hasil yang berbeda dari expected — bukan karena kodenya salah, tapi karena test case-nya yang tidak valid.

> **Menulis test cases yang baik:**
> Pastikan setiap test case hanya punya **satu pasangan valid** jika soal menjamin demikian. Sebelum menetapkan expected value, selalu cek semua kemungkinan pasangan di array tersebut.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 07: Pitfalls & Jebakan Umum](07-pitfalls_jebakan-umum.md)**
- **📖 [Lanjut ke Part 09: Ringkasan Algoritma →](09-algorithm-summary_ringkasan-algoritma.md)**

---

<div align="center">

Made with ❤️ for learners

</div>