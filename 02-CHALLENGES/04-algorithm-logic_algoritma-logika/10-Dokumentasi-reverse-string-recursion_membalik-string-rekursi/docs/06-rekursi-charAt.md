# 📚 reverseString - PART 6: ALTERNATIF 2 — REKURSI + `charAt()`

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║        ✨ PART 6: ALTERNATIF 2 — REKURSI + charAt() ✨                   ║
║                                                                          ║
║           Rekursi dengan charAt() dan substring() yang Eksplisit         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 🔤 charAt() | ✂️ substring() | 📉 Fase Turun | 📈 Fase Naik | 🧪 Test Cases |
|:-----------:|:--------------:|:------------:|:------------:|:-------------:|
| [Jump](#-mengenal-chartat) | [Jump](#-mengenal-substring) | [Jump](#-fase-turun) | [Jump](#-fase-naik) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja `charAt()` untuk mengambil karakter
- ✅ Memahami cara kerja `substring()` untuk memotong string
- ✅ Tahu perbedaan `charAt()` vs `slice(-1)` dan `substring()` vs `slice()`
- ✅ Mengenali pitfall umum dan cara menghindarinya

---

## 🔤 Mengenal `charAt()`

`charAt()` adalah method untuk mengambil karakter di posisi index tertentu.

```javascript
const str = "hello"

str.charAt(0)  // → 'h'  (karakter pertama)
str.charAt(4)  // → 'o'  (karakter terakhir)
str.charAt(str.length - 1)  // → 'o'  (karakter terakhir secara dinamis)
```

Perbandingan dengan `slice(-1)`:

| Method | Contoh | Hasil | Keterangan |
|--------|--------|-------|------------|
| `str.charAt(str.length - 1)` | `"hello".charAt(4)` | `'o'` | Harus hitung index dulu |
| `str.slice(-1)` | `"hello".slice(-1)` | `'o'` | Index negatif langsung |

> Keduanya menghasilkan hal yang sama — `slice(-1)` lebih ringkas karena mendukung index negatif.

---

## ✂️ Mengenal `substring()`

`substring()` adalah method untuk mengambil sebagian string dari index awal sampai sebelum index akhir.

```javascript
const str = "hello"

str.substring(0, 4)  // → "hell"  (index 0 sampai sebelum 4)
str.substring(1, 3)  // → "el"   (index 1 sampai sebelum 3)
str.substring(0, str.length - 1)  // → "hell"  (semua kecuali karakter terakhir)
```

Perbandingan dengan `slice()`:

| Method | Contoh | Hasil | Index Negatif |
|--------|--------|-------|:-------------:|
| `str.substring(0, str.length - 1)` | `"hello".substring(0, 4)` | `"hell"` | ❌ Tidak didukung |
| `str.slice(0, -1)` | `"hello".slice(0, -1)` | `"hell"` | ✅ Didukung |

> `slice()` lebih fleksibel karena mendukung index negatif. `substring()` harus menghitung `str.length - 1` secara eksplisit.

---

## ✅ Kode Final

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}
```

**Cara membacanya:**
1. Jika `str` kosong → base case, langsung return `''`
2. Ambil **karakter terakhir** dengan `str.charAt(str.length - 1)`
3. Gabungkan dengan hasil `reverseString` dari **sisa string** tanpa karakter terakhir
4. Ulangi sampai `str` kosong

---

## 📉 Fase Turun

Fase turun adalah saat fungsi terus memanggil dirinya sendiri — setiap panggilan menerima string yang satu karakter lebih pendek.

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
//                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                    panggil ulang dengan str lebih pendek
}
```

```
reverseString("hello")   → belum selesai, nunggu reverseString("hell")
  reverseString("hell")  → belum selesai, nunggu reverseString("hel")
    reverseString("hel") → belum selesai, nunggu reverseString("he")
      reverseString("he")→ belum selesai, nunggu reverseString("h")
        reverseString("h")→ belum selesai, nunggu reverseString("")
          reverseString("")→ BASE CASE! langsung return ''
```

---

## 📈 Fase Naik

Fase naik adalah saat base case tercapai dan hasil mulai dikembalikan dari bawah ke atas, mengumpulkan karakter satu per satu.

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
//        ^^^^^^^^^^^^^^^^^^^^^^^^^^
//        karakter ini digabung dengan hasil yang naik dari bawah
}
```

```
reverseString("") selesai → kembalikan '' ke atas

reverseString("h") terima ''
  → charAt(0)='h' + '' = 'h' → kembalikan 'h' ke atas

reverseString("he") terima 'h'
  → charAt(1)='e' + 'h' = 'eh' → kembalikan 'eh' ke atas

reverseString("hel") terima 'eh'
  → charAt(2)='l' + 'eh' = 'leh' → kembalikan 'leh' ke atas

reverseString("hell") terima 'leh'
  → charAt(3)='l' + 'leh' = 'lleh' → kembalikan 'lleh' ke atas

reverseString("hello") terima 'lleh'
  → charAt(4)='o' + 'lleh' = 'olleh' ✅ SELESAI!
```

---

### Visualisasi Lengkap Fase Turun & Naik

```
FASE TURUN                                      FASE NAIK
──────────────────────────────────────────────────────────────
reverseString("hello")                          = 'olleh' ✅
  charAt(4)='o' + reverseString("hell")         = 'o' + 'lleh'
               charAt(3)='l' + reverseString("hel")  = 'l' + 'leh'
                              charAt(2)='l' + reverseString("he") = 'l' + 'eh'
                                             charAt(1)='e' + reverseString("h") = 'e' + 'h'
                                                            charAt(0)='h' + reverseString("") = 'h' + ''
                                                                           return ''  ← TITIK BALIK
```

---

## 📊 Tabel Iterasi

| Panggilan ke- | `str` masuk | `charAt(length-1)` | `substring(0, length-1)` dikirim | Return |
|:---:|---|:---:|---|---|
| 1 | `"hello"` | `'o'` | `"hell"` | `'o' + ...` |
| 2 | `"hell"`  | `'l'` | `"hel"`  | `'l' + ...` |
| 3 | `"hel"`   | `'l'` | `"he"`   | `'l' + ...` |
| 4 | `"he"`    | `'e'` | `"h"`    | `'e' + ...` |
| 5 | `"h"`     | `'h'` | `""`     | `'h' + ...` |
| 6 | `""`      | —     | —        | `''` ← base case |

---

## ⚠️ Pitfalls (Jebakan Umum)

**1) ❌ Salah hitung index di `charAt()`**
```javascript
// ❌ SALAH — charAt(str.length) selalu return '' karena out of bounds
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length) + reverseString(str.substring(0, str.length))
  //                  ^^^^^^^^^                                    ^^^^^^^^^
  //                  harusnya str.length - 1!
}
// reverseString("hello") → "" + "" + ... = "" bukan "olleh"

// ✅ BENAR — charAt(str.length - 1) menunjuk ke karakter terakhir
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}
```

**2) ❌ Posisi `charAt()` di belakang**
```javascript
// ❌ SALAH — karakter terakhir diletakkan di belakang hasil rekursi
return reverseString(str.substring(0, str.length - 1)) + str.charAt(str.length - 1)
// reverseString("hello") → "hello" bukan "olleh"

// ✅ BENAR — karakter terakhir diletakkan di depan hasil rekursi
return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
// reverseString("hello") → "olleh" ✅
```

**3) ❌ Tidak ada base case**
```javascript
// ❌ SALAH — rekursi tidak pernah berhenti → Maximum call stack exceeded
const reverseString = (str) => {
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}

// ✅ BENAR — base case menghentikan rekursi
const reverseString = (str) => {
  if (!str) return ''  // ← base case
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}
```

---

## 🧪 Test Cases

```javascript
// Edge case — string kosong
console.log(reverseString(''));
// → ''
```

```javascript
// Edge case — satu karakter
console.log(reverseString('a'));
// → 'a'
```

```javascript
// Normal case — kata biasa
console.log(reverseString('hello'));
// → 'olleh'

console.log(reverseString('world'));
// → 'dlrow'
```

```javascript
// Palindrome
console.log(reverseString('racecar'));
// → 'racecar'
```

```javascript
// Huruf campuran & angka sebagai string
console.log(reverseString('JavaScript'));
// → 'tpircSavaJ'

console.log(reverseString('12345'));
// → '54321'
```

---

## ⚡ Kompleksitas

| | Nilai | Penjelasan |
|---|---|---|
| Waktu | **O(n)** | Fungsi dipanggil sebanyak panjang string `n` |
| Memori | **O(n)** | Setiap panggilan rekursi disimpan di call stack |

---

## 💡 Insight Penting

> **Apa bedanya `charAt()` vs `slice(-1)`?**
> Secara hasil keduanya sama — sama-sama mengambil karakter terakhir. Tapi `slice(-1)` lebih ringkas karena mendukung index negatif. `charAt()` harus menghitung `str.length - 1` secara eksplisit, membuatnya lebih verbose tapi lebih mudah dipahami pemula yang belum familiar dengan index negatif.

> **Apa bedanya `substring()` vs `slice()`?**
> Untuk kasus ini hasilnya sama. Perbedaan utamanya: `slice()` mendukung index negatif (`slice(0, -1)`), sedangkan `substring()` tidak — index negatif di `substring()` dianggap `0`. Itulah kenapa `slice()` lebih fleksibel dan lebih sering dipakai di kode modern.

> **Kapan alternatif ini relevan?**
> Alternatif ini berguna sebagai bahan pembelajaran untuk memahami bahwa ada banyak cara mengakses karakter dan memotong string di JavaScript. Untuk kode produksi, solusi utama dengan `slice()` lebih disukai karena lebih ringkas dan idiomatis.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 5: Alternatif 1 — Rekursi + Index Parameter](05-rekursi-index.md)**
- **📖 [Lanjut ke Part 7: Perbandingan & Kesimpulan →](07-perbandingan-solusi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
